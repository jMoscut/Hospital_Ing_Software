package com.biocore.service;

import com.biocore.dto.TicketCreateRequest;
import com.biocore.entity.Appointment;
import com.biocore.entity.Clinic;
import com.biocore.entity.Patient;
import com.biocore.enums.AppointmentStatus;
import com.biocore.repository.AppointmentRepository;
import com.biocore.repository.ClinicRepository;
import com.biocore.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
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

    private final AppointmentRepository appointmentRepository;
    private final ClinicRepository       clinicRepository;
    private final PatientRepository      patientRepository;
    private final TicketService          ticketService;

    /** Returns slots not yet booked for the given clinic + date. */
    @Transactional(readOnly = true)
    public List<String> getAvailableSlots(Long clinicId, LocalDate date) {
        List<String> booked = appointmentRepository.findBookedSlots(
                clinicId, date, AppointmentStatus.CANCELLED);
        return ALL_SLOTS.stream()
                .filter(s -> !booked.contains(s))
                .collect(Collectors.toList());
    }

    @Transactional
    public Map<String, Object> book(Long patientId, Long clinicId, String type,
                                    LocalDate scheduledDate, String scheduledTime, String notes) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));
        Clinic clinic = clinicRepository.findById(clinicId)
                .orElseThrow(() -> new RuntimeException("Clínica no encontrada"));

        if (scheduledTime != null) {
            List<String> booked = appointmentRepository.findBookedSlots(
                    clinicId, scheduledDate, AppointmentStatus.CANCELLED);
            if (booked.contains(scheduledTime)) {
                throw new RuntimeException("El horario " + scheduledTime + " ya no está disponible.");
            }
        }

        BigDecimal fee = TYPE_FEE.getOrDefault(type, BigDecimal.valueOf(150.00));
        String voucherCode = generateVoucherCode();

        Appointment appt = Appointment.builder()
                .patient(patient)
                .clinic(clinic)
                .type(type)
                .scheduledDate(scheduledDate)
                .scheduledTime(scheduledTime)
                .status(AppointmentStatus.PENDING_PAYMENT)
                .voucherCode(voucherCode)
                .amount(fee)
                .notes(notes)
                .build();

        Appointment saved = appointmentRepository.save(appt);

        // Build response from local vars to avoid lazy-proxy access on saved entity
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("id",            saved.getId());
        result.put("voucherCode",   voucherCode);
        result.put("patientId",     patient.getId());
        result.put("patientName",   patient.getFirstName() + " " + patient.getLastName());
        result.put("patientCode",   patient.getPatientCode());
        result.put("clinicId",      clinic.getId());
        result.put("clinicName",    clinic.getName());
        result.put("type",          type);
        result.put("scheduledDate", scheduledDate.toString());
        result.put("scheduledTime", scheduledTime);
        result.put("amount",        fee);
        result.put("status",        AppointmentStatus.PENDING_PAYMENT.name());
        result.put("createdAt",     saved.getCreatedAt() != null ? saved.getCreatedAt().toString() : null);
        return result;
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

        // Create ticket in queue
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

    private Map<String, Object> buildResponse(Appointment a) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("id",            a.getId());
        m.put("voucherCode",   a.getVoucherCode());
        m.put("patientId",     a.getPatient().getId());
        m.put("patientName",   a.getPatient().getFirstName() + " " + a.getPatient().getLastName());
        m.put("patientCode",   a.getPatient().getPatientCode());
        m.put("clinicId",      a.getClinic().getId());
        m.put("clinicName",    a.getClinic().getName());
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
