package com.biocore.service;

import com.biocore.dto.TicketCreateRequest;
import com.biocore.entity.Appointment;
import com.biocore.entity.Clinic;
import com.biocore.entity.Patient;
import com.biocore.entity.SlotReservation;
import com.biocore.entity.User;
import com.biocore.enums.AppointmentStatus;
import com.biocore.repository.AppointmentRepository;
import com.biocore.repository.ClinicRepository;
import com.biocore.repository.PatientRepository;
import com.biocore.repository.SlotReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private static final List<String> ALL_SLOTS =
            Arrays.asList("08:00","09:00","10:00","11:00","12:00","13:00",
                          "14:00","15:00","16:00","17:00","18:00");

    private static final Map<String, BigDecimal> TYPE_FEE = Map.of(
            "CONSULTA",    BigDecimal.valueOf(150.00),
            "LABORATORIO", BigDecimal.valueOf(200.00),
            "CONTROL",     BigDecimal.valueOf(100.00)
    );

    private final AppointmentRepository      appointmentRepository;
    private final ClinicRepository           clinicRepository;
    private final PatientRepository          patientRepository;
    private final TicketService              ticketService;
    private final SlotReservationRepository  slotReservationRepository;
    private final DoctorScheduleService      doctorScheduleService;

    /**
     * Returns available time slots for a clinic+date.
     * Availability = slots where scheduled-doctor capacity > booked + reserved count.
     * If no schedules configured for the clinic+date, returns empty list.
     */
    @Transactional(readOnly = true)
    public List<String> getAvailableSlots(Long clinicId, LocalDate date) {
        Map<String, Long> capacity = doctorScheduleService.getCapacityPerSlot(clinicId, date);
        if (capacity.isEmpty()) return List.of();

        Map<String, Long> booked   = toCountMap(appointmentRepository
                .findBookedCountsPerSlot(clinicId, date, AppointmentStatus.CANCELLED));
        Map<String, Long> reserved = toCountMap(slotReservationRepository
                .countActiveReservationsPerSlot(clinicId, date, LocalDateTime.now()));

        return ALL_SLOTS.stream()
                .filter(slot -> {
                    long cap  = capacity.getOrDefault(slot, 0L);
                    long used = booked.getOrDefault(slot, 0L) + reserved.getOrDefault(slot, 0L);
                    return cap > 0 && used < cap;
                })
                .collect(Collectors.toList());
    }

    /** Temporarily reserve a slot for 10 minutes. */
    @Transactional
    public Map<String, Object> reserve(Long patientId, Long clinicId, LocalDate date, String time) {
        LocalDateTime now = LocalDateTime.now();

        Map<String, Long> capacity = doctorScheduleService.getCapacityPerSlot(clinicId, date);
        long cap = capacity.getOrDefault(time, 0L);
        if (cap <= 0) throw new RuntimeException("El horario " + time + " no está disponible.");

        // Check how many are booked at this slot
        long booked = appointmentRepository
                .findBookedCountsPerSlot(clinicId, date, AppointmentStatus.CANCELLED)
                .stream().filter(r -> time.equals(r[0])).mapToLong(r -> (Long) r[1]).findFirst().orElse(0L);

        long reservedByOthers = slotReservationRepository
                .countActiveReservationsByOthersForSlot(clinicId, date, time, now, patientId);

        if (booked + reservedByOthers >= cap) {
            throw new RuntimeException("El horario " + time + " ya no tiene disponibilidad.");
        }

        slotReservationRepository.deleteBySlot(clinicId, date, time, patientId);
        slotReservationRepository.deleteExpired(now);

        LocalDateTime expiresAt = now.plusMinutes(10);
        SlotReservation saved = slotReservationRepository.save(
                SlotReservation.builder()
                        .clinicId(clinicId).date(date).time(time)
                        .patientId(patientId).expiresAt(expiresAt)
                        .build());
        return Map.of("id", saved.getId(), "expiresAt", expiresAt.toString());
    }

    @Transactional
    public void cancelReservation(Long reservationId) {
        slotReservationRepository.deleteById(reservationId);
    }

    @Transactional
    public Map<String, Object> book(Long patientId, Long clinicId, String type,
                                    LocalDate scheduledDate, String scheduledTime, String notes) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));
        Clinic clinic = clinicRepository.findById(clinicId)
                .orElseThrow(() -> new RuntimeException("Clínica no encontrada"));

        // Reject if patient already has an appointment at this date+time
        if (scheduledTime != null) {
            long existing = appointmentRepository.countPatientBookingsAtSlot(
                    patientId, scheduledDate, scheduledTime, AppointmentStatus.CANCELLED);
            if (existing > 0) {
                throw new RuntimeException("Ya tienes una cita agendada para el " +
                        scheduledDate + " a las " + scheduledTime + ".");
            }
        }

        User assignedDoctor = null;
        if (scheduledTime != null) {
            Set<Long> bookedDoctorIds = new HashSet<>(appointmentRepository
                    .findBookedDoctorIds(clinicId, scheduledDate, scheduledTime, AppointmentStatus.CANCELLED));
            List<User> available = doctorScheduleService.getAvailableDoctorsForSlot(
                    clinicId, scheduledDate, scheduledTime, bookedDoctorIds);
            if (available.isEmpty()) {
                throw new RuntimeException("El horario " + scheduledTime + " ya no tiene disponibilidad.");
            }
            assignedDoctor = available.get(0);
        }

        BigDecimal fee = TYPE_FEE.getOrDefault(type, BigDecimal.valueOf(150.00));
        String voucherCode = generateVoucherCode();

        Appointment appt = Appointment.builder()
                .patient(patient).clinic(clinic).doctor(assignedDoctor)
                .type(type).scheduledDate(scheduledDate).scheduledTime(scheduledTime)
                .status(AppointmentStatus.PENDING_PAYMENT)
                .voucherCode(voucherCode).amount(fee).notes(notes)
                .build();

        Appointment saved = appointmentRepository.save(appt);
        if (scheduledTime != null) {
            slotReservationRepository.deleteBySlot(clinicId, scheduledDate, scheduledTime, patientId);
        }

        return buildBookResponse(saved, patient, clinic, assignedDoctor, fee, voucherCode, scheduledDate, scheduledTime, type);
    }

    /** Cashier confirms payment → appointment CONFIRMED → ticket enters queue. */
    @Transactional
    public Map<String, Object> confirmPayment(Long appointmentId, String paymentMethod) {
        Appointment appt = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));
        if (appt.getStatus() == AppointmentStatus.CONFIRMED) {
            throw new RuntimeException("Esta cita ya fue pagada.");
        }
        appt.setStatus(AppointmentStatus.CONFIRMED);
        appointmentRepository.save(appt);

        TicketCreateRequest req = new TicketCreateRequest();
        req.setPatientId(appt.getPatient().getId());
        req.setClinicId(appt.getClinic().getId());
        req.setType(appt.getType());
        req.setNotes("Cita agendada " + appt.getScheduledDate() + " " + appt.getScheduledTime());
        ticketService.create(req);

        return buildResponse(appt);
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getByVoucherCode(String code) {
        Appointment appt = appointmentRepository.findByVoucherCode(code.toUpperCase())
                .orElseThrow(() -> new RuntimeException("Voucher no encontrado: " + code));
        return buildResponse(appt);
    }

    @Transactional(readOnly = true)
    public List<Map<String, Object>> getByPatient(Long patientId) {
        return appointmentRepository
                .findByPatientIdOrderByScheduledDateDescScheduledTimeDesc(patientId)
                .stream().map(this::buildResponse).collect(Collectors.toList());
    }

    // ── helpers ──────────────────────────────────────────────────────────────

    private Map<String, Long> toCountMap(List<Object[]> rows) {
        Map<String, Long> m = new HashMap<>();
        for (Object[] row : rows) m.put((String) row[0], (Long) row[1]);
        return m;
    }

    private Map<String, Object> buildBookResponse(Appointment saved, Patient patient, Clinic clinic,
                                                    User doctor, BigDecimal fee, String voucherCode,
                                                    LocalDate date, String time, String type) {
        Map<String, Object> r = new LinkedHashMap<>();
        r.put("id",            saved.getId());
        r.put("voucherCode",   voucherCode);
        r.put("patientId",     patient.getId());
        r.put("patientName",   patient.getFirstName() + " " + patient.getLastName());
        r.put("patientCode",   patient.getPatientCode());
        r.put("clinicId",      clinic.getId());
        r.put("clinicName",    clinic.getName());
        r.put("doctorId",      doctor != null ? doctor.getId() : null);
        r.put("doctorName",    doctor != null ? doctor.getFirstName() + " " + doctor.getLastName() : null);
        r.put("type",          type);
        r.put("scheduledDate", date.toString());
        r.put("scheduledTime", time);
        r.put("amount",        fee);
        r.put("status",        AppointmentStatus.PENDING_PAYMENT.name());
        r.put("createdAt",     saved.getCreatedAt() != null ? saved.getCreatedAt().toString() : null);
        return r;
    }

    private Map<String, Object> buildResponse(Appointment a) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("id",            a.getId());
        m.put("voucherCode",   a.getVoucherCode());
        m.put("patientId",     a.getPatient().getId());
        m.put("patientName",   a.getPatient().getFirstName() + " " + a.getPatient().getLastName());
        m.put("patientCode",   a.getPatient().getPatientCode());
        m.put("clinicId",      a.getClinic().getId());
        m.put("clinicName",    a.getClinic().getName());
        m.put("doctorId",      a.getDoctor() != null ? a.getDoctor().getId() : null);
        m.put("doctorName",    a.getDoctor() != null ?
                               a.getDoctor().getFirstName() + " " + a.getDoctor().getLastName() : null);
        m.put("type",          a.getType());
        m.put("scheduledDate", a.getScheduledDate().toString());
        m.put("scheduledTime", a.getScheduledTime());
        m.put("amount",        a.getAmount());
        m.put("status",        a.getStatus().name());
        m.put("createdAt",     a.getCreatedAt() != null ? a.getCreatedAt().toString() : null);
        return m;
    }

    private String generateVoucherCode() {
        String chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        Random rnd = new Random();
        String code;
        do {
            StringBuilder sb = new StringBuilder(6);
            for (int i = 0; i < 6; i++) sb.append(chars.charAt(rnd.nextInt(chars.length())));
            code = sb.toString();
        } while (appointmentRepository.findByVoucherCode(code).isPresent());
        return code;
    }
}
