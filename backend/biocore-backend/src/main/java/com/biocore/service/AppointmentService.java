package com.biocore.service;

import com.biocore.dto.TicketCreateRequest;
import com.biocore.entity.Appointment;
import com.biocore.entity.Clinic;
import com.biocore.entity.Patient;
import com.biocore.entity.SlotReservation;
import com.biocore.entity.User;
import com.biocore.enums.AppointmentStatus;
import com.biocore.enums.ClinicType;
import com.biocore.repository.AppointmentRepository;
import com.biocore.repository.ClinicRepository;
import com.biocore.repository.LabExamRepository;
import com.biocore.repository.PatientRepository;
import com.biocore.repository.SlotReservationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AppointmentService {

    private static final List<String> ALL_SLOTS =
            Arrays.asList("08:00","09:00","10:00","11:00","12:00","13:00",
                          "14:00","15:00","16:00","17:00","18:00");

    private static final int LAB_CAPACITY_PER_SLOT = 1;

    private static final List<String> LAB_SLOTS =
            Arrays.asList("08:00","08:30","09:00","09:30","10:00","10:30",
                          "11:00","11:30","12:00","12:30","13:00","13:30",
                          "14:00","14:30","15:00","15:30","16:00","16:30",
                          "17:00","17:30");

    private static final Map<String, BigDecimal> TYPE_FEE = Map.of(
            "CONSULTA", BigDecimal.valueOf(150.00),
            "CONTROL",  BigDecimal.valueOf(100.00)
    );

    private final AppointmentRepository      appointmentRepository;
    private final ClinicRepository           clinicRepository;
    private final PatientRepository          patientRepository;
    private final TicketService              ticketService;
    private final SlotReservationRepository  slotReservationRepository;
    private final DoctorScheduleService      doctorScheduleService;
    private final LabExamRepository          labExamRepository;
    private final EmailService               emailService;

    /**
     * Returns available time slots for a clinic+date.
     * Lab clinics use half-hour slots with count-based capacity (clinic.maxDoctors per slot).
     * Regular clinics use doctor-schedule-based capacity.
     */
    @Transactional(readOnly = true)
    public List<String> getAvailableSlots(Long clinicId, LocalDate date) {
        LocalDateTime now = LocalDateTime.now();
        Clinic clinic = clinicRepository.findById(clinicId).orElse(null);
        boolean isLab = isLabClinic(clinic);

        Map<String, Long> reserved = toCountMap(slotReservationRepository
                .countActiveReservationsPerSlot(clinicId, date, now));

        List<String> out = new ArrayList<>();

        if (isLab) {
            long cap = labCap(clinic);
            Map<String, Long> booked = toCountMap(appointmentRepository
                    .findBookedCountsPerSlot(clinicId, date, AppointmentStatus.CANCELLED));
            for (String slot : LAB_SLOTS) {
                long taken = booked.getOrDefault(slot, 0L) + reserved.getOrDefault(slot, 0L);
                if (taken < cap) out.add(slot);
            }
        } else {
            log.info("=== getAvailableSlots clinic={} date={} ===", clinicId, date);
            for (String slot : ALL_SLOTS) {
                long cap = doctorScheduleService.getDistinctDoctorCountForSlot(clinicId, date, slot);
                if (cap <= 0) continue;
                List<Long> bookedIds = appointmentRepository
                        .findBookedDoctorIds(clinicId, date, slot, AppointmentStatus.CANCELLED);
                long bookedDoctors = bookedIds.stream().distinct().count();
                long reservedCount = reserved.getOrDefault(slot, 0L);
                long free = cap - bookedDoctors - reservedCount;
                log.info("  slot={} cap={} bookedDoctorIds={} bookedDistinct={} reserved={} free={} → {}",
                        slot, cap, bookedIds, bookedDoctors, reservedCount, free, (free > 0 ? "SHOW" : "HIDE"));
                if (free > 0) out.add(slot);
            }
        }
        return out;
    }

    /** Temporarily reserve a slot for 10 minutes. */
    @Transactional
    public Map<String, Object> reserve(Long patientId, Long clinicId, LocalDate date, String time) {
        LocalDateTime now = LocalDateTime.now();

        // Patient cannot reserve a slot they already have an appointment at
        long existing = appointmentRepository.countPatientBookingsAtSlot(
                patientId, date, time, AppointmentStatus.CANCELLED);
        if (existing > 0) {
            throw new RuntimeException("Ya tienes una cita agendada para el " +
                    date + " a las " + time + ".");
        }

        Clinic clinic = clinicRepository.findById(clinicId)
                .orElseThrow(() -> new RuntimeException("Clínica no encontrada"));
        boolean isLab = isLabClinic(clinic);
        long reservedByOthers = slotReservationRepository
                .countActiveReservationsByOthersForSlot(clinicId, date, time, now, patientId);

        if (isLab) {
            long cap = labCap(clinic);
            Map<String, Long> booked = toCountMap(appointmentRepository
                    .findBookedCountsPerSlot(clinicId, date, AppointmentStatus.CANCELLED));
            long bookedCount = booked.getOrDefault(time, 0L);
            if (bookedCount + reservedByOthers >= cap) {
                throw new RuntimeException("El horario " + time + " ya no tiene disponibilidad.");
            }
        } else {
            Map<String, Long> capacity = doctorScheduleService.getCapacityPerSlot(clinicId, date);
            long cap = capacity.getOrDefault(time, 0L);
            if (cap <= 0) throw new RuntimeException("El horario " + time + " no está disponible.");

            Set<Long> bookedDoctorIds = new HashSet<>(appointmentRepository
                    .findBookedDoctorIds(clinicId, date, time, AppointmentStatus.CANCELLED));
            long bookedDoctors = bookedDoctorIds.size();

            if (bookedDoctors + reservedByOthers >= cap) {
                throw new RuntimeException("El horario " + time + " ya no tiene disponibilidad.");
            }
        }

        // Clear ALL of this patient's reservations for this date before creating a new one
        // Prevents multiple stale reservations from accumulating when frontend cancellation fails silently
        slotReservationRepository.deleteAllByPatientAndDate(patientId, date);
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
                                    LocalDate scheduledDate, String scheduledTime, String notes,
                                    Long labExamId) {
        log.info(">>> BOOK patient={} clinic={} type={} date={} time={}", patientId, clinicId, type, scheduledDate, scheduledTime);
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));
        Clinic clinic = clinicRepository.findById(clinicId)
                .orElseThrow(() -> new RuntimeException("Clínica no encontrada"));

        // Reject if patient already has an appointment at this date+time
        if (scheduledTime != null) {
            long existing = appointmentRepository.countPatientBookingsAtSlot(
                    patientId, scheduledDate, scheduledTime, AppointmentStatus.CANCELLED);
            log.info("    patient existing bookings at slot: {}", existing);
            if (existing > 0) {
                log.warn("    BOOK REJECTED — patient {} already has appointment at {} {}", patientId, scheduledDate, scheduledTime);
                throw new RuntimeException("Ya tienes una cita agendada para el " +
                        scheduledDate + " a las " + scheduledTime + ".");
            }
        }

        boolean isLab = isLabClinic(clinic);
        User assignedDoctor = null;
        if (scheduledTime != null) {
            if (isLab) {
                // Lab: capacity is count-based, no doctor assignment
                long cap = labCap(clinic);
                Map<String, Long> booked = toCountMap(appointmentRepository
                        .findBookedCountsPerSlot(clinicId, scheduledDate, AppointmentStatus.CANCELLED));
                long bookedCount = booked.getOrDefault(scheduledTime, 0L);
                if (bookedCount >= cap) {
                    throw new RuntimeException("El horario " + scheduledTime + " ya no tiene disponibilidad.");
                }
            } else {
                Set<Long> bookedDoctorIds = new HashSet<>(appointmentRepository
                        .findBookedDoctorIds(clinicId, scheduledDate, scheduledTime, AppointmentStatus.CANCELLED));
                List<User> available = doctorScheduleService.getAvailableDoctorsForSlot(
                        clinicId, scheduledDate, scheduledTime, bookedDoctorIds);
                log.info("    bookedDoctorIds={} availableDoctors={}", bookedDoctorIds,
                        available.stream().map(u -> u.getId()).toList());
                if (available.isEmpty()) {
                    log.warn("    BOOK REJECTED — no doctors available at {} {}", scheduledDate, scheduledTime);
                    throw new RuntimeException("El horario " + scheduledTime + " ya no tiene disponibilidad.");
                }
                // Equitable distribution: assign doctor with fewest appointments on this date
                final LocalDate fd = scheduledDate;
                assignedDoctor = available.stream()
                        .min(Comparator.comparingLong(doc -> appointmentRepository
                                .countByDoctorAndDate(doc.getId(), fd, AppointmentStatus.CANCELLED)))
                        .orElse(available.get(0));
                log.info("    assigned doctor: {} (load={})", assignedDoctor.getId(),
                        appointmentRepository.countByDoctorAndDate(assignedDoctor.getId(), fd, AppointmentStatus.CANCELLED));
            }
        }

        BigDecimal grossFee;
        com.biocore.entity.LabExam labExam = null;
        if ("LABORATORIO".equals(type) && labExamId != null) {
            labExam = labExamRepository.findById(labExamId).orElse(null);
        }
        if (labExam != null && labExam.getPrice() != null && labExam.getPrice().compareTo(BigDecimal.ZERO) > 0) {
            grossFee = labExam.getPrice();
        } else {
            grossFee = TYPE_FEE.getOrDefault(type, BigDecimal.valueOf(150.00));
        }

        // Apply insurance discount automatically
        BigDecimal discountAmount = BigDecimal.ZERO;
        if (patient.getInsurance() != null) {
            BigDecimal pct = patient.getInsurance().getDiscountPercentage();
            discountAmount = grossFee.multiply(pct).divide(BigDecimal.valueOf(100), 2, java.math.RoundingMode.HALF_UP);
        }
        BigDecimal fee = grossFee.subtract(discountAmount);

        String voucherCode = generateVoucherCode();

        String finalNotes = notes;
        if (labExam != null) {
            String examInfo = "[" + labExam.getCode() + "] " + labExam.getName();
            finalNotes = (notes != null && !notes.isBlank()) ? examInfo + " — " + notes : examInfo;
        }
        Appointment appt = Appointment.builder()
                .patient(patient).clinic(clinic).doctor(assignedDoctor)
                .type(type).scheduledDate(scheduledDate).scheduledTime(scheduledTime)
                .status(AppointmentStatus.PENDING_PAYMENT)
                .voucherCode(voucherCode).amount(fee).notes(finalNotes)
                .build();

        Appointment saved = appointmentRepository.save(appt);
        log.info("<<< BOOK SAVED id={} doctor={} voucher={}", saved.getId(),
                saved.getDoctor() != null ? saved.getDoctor().getId() : null, voucherCode);
        if (scheduledTime != null) {
            slotReservationRepository.deleteBySlot(clinicId, scheduledDate, scheduledTime, patientId);
        }

        return buildBookResponse(saved, patient, clinic, assignedDoctor, grossFee, discountAmount, fee, voucherCode, scheduledDate, scheduledTime, type);
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
        req.setDoctorId(appt.getDoctor() != null ? appt.getDoctor().getId() : null);
        req.setAppointmentId(appointmentId);
        req.setType(appt.getType());
        req.setNotes(appt.getNotes() != null && !appt.getNotes().isBlank()
                ? appt.getNotes()
                : "Cita agendada " + appt.getScheduledDate() + " " + appt.getScheduledTime());
        req.setScheduledDate(appt.getScheduledDate());
        req.setScheduledTime(appt.getScheduledTime());
        com.biocore.dto.TicketDTO ticket = ticketService.create(req);

        emailService.sendAppointmentSummaryEmail(appt.getPatient(), appt, ticket.getTicketNumber());

        Map<String, Object> response = buildResponse(appt);
        response.put("ticketNumber", ticket.getTicketNumber());
        return response;
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

    @Transactional(readOnly = true)
    public List<Map<String, Object>> getByDoctorAndDate(Long doctorId, LocalDate date) {
        return appointmentRepository
                .findByDoctorAndDate(doctorId, date, AppointmentStatus.CANCELLED)
                .stream().map(this::buildResponse).collect(Collectors.toList());
    }

    /** All non-cancelled appointments assigned to a doctor (for calendar view). */
    @Transactional(readOnly = true)
    public List<Map<String, Object>> getAllByDoctor(Long doctorId) {
        return appointmentRepository
                .findAllByDoctorId(doctorId, AppointmentStatus.CANCELLED)
                .stream().map(this::buildResponse).collect(Collectors.toList());
    }

    // ── helpers ──────────────────────────────────────────────────────────────

    private boolean isLabClinic(Clinic clinic) {
        if (clinic == null) return false;
        if (clinic.getType() == ClinicType.LABORATORY) return true;
        String name = clinic.getName() == null ? "" : clinic.getName().toLowerCase();
        return name.contains("laboratorio") || name.contains("lab");
    }

    private long labCap(Clinic clinic) {
        return LAB_CAPACITY_PER_SLOT;
    }

    private Map<String, Long> toCountMap(List<Object[]> rows) {
        Map<String, Long> m = new HashMap<>();
        for (Object[] row : rows) m.put((String) row[0], (Long) row[1]);
        return m;
    }

    private Map<String, Object> buildBookResponse(Appointment saved, Patient patient, Clinic clinic,
                                                    User doctor, BigDecimal grossFee, BigDecimal discountAmount,
                                                    BigDecimal netFee, String voucherCode,
                                                    LocalDate date, String time, String type) {
        Map<String, Object> r = new LinkedHashMap<>();
        r.put("id",                 saved.getId());
        r.put("voucherCode",        voucherCode);
        r.put("patientId",          patient.getId());
        r.put("patientName",        patient.getFirstName() + " " + patient.getLastName());
        r.put("patientCode",        patient.getPatientCode());
        r.put("clinicId",           clinic.getId());
        r.put("clinicName",         clinic.getName());
        r.put("doctorId",           doctor != null ? doctor.getId() : null);
        r.put("doctorName",         doctor != null ? doctor.getFirstName() + " " + doctor.getLastName() : null);
        r.put("type",               type);
        r.put("scheduledDate",      date.toString());
        r.put("scheduledTime",      time);
        r.put("grossAmount",        grossFee);
        r.put("discountAmount",     discountAmount);
        r.put("amount",             netFee);   // net fee (after discount)
        r.put("discountPercentage", patient.getInsurance() != null ? patient.getInsurance().getDiscountPercentage() : BigDecimal.ZERO);
        r.put("status",             AppointmentStatus.PENDING_PAYMENT.name());
        r.put("createdAt",          saved.getCreatedAt() != null ? saved.getCreatedAt().toString() : null);
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
        m.put("scheduledDate", a.getScheduledDate() != null ? a.getScheduledDate().toString() : null);
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
