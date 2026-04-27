package com.biocore.service;

import com.biocore.dto.LabOrderRequest;
import com.biocore.entity.LabExam;
import com.biocore.entity.LabOrder;
import com.biocore.entity.LabResult;
import com.biocore.entity.Patient;
import com.biocore.entity.Ticket;
import com.biocore.entity.User;
import com.biocore.enums.LabOrderStatus;
import com.biocore.enums.SampleType;
import com.biocore.repository.LabExamRepository;
import com.biocore.repository.LabOrderRepository;
import com.biocore.repository.LabResultRepository;
import com.biocore.repository.PatientRepository;
import com.biocore.repository.TicketRepository;
import com.biocore.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class LabService {

    private final LabOrderRepository labOrderRepository;
    private final LabResultRepository labResultRepository;
    private final LabExamRepository labExamRepository;
    private final PatientRepository patientRepository;
    private final UserRepository userRepository;
    private final TicketRepository ticketRepository;
    private final EmailService emailService;

    @Transactional(readOnly = true)
    public List<LabOrder> getByPatient(Long patientId) {
        return labOrderRepository.findByPatientIdOrderByOrderDateDesc(patientId);
    }

    @Transactional(readOnly = true)
    public List<LabOrder> getPending() {
        return labOrderRepository.findByStatusIn(List.of(
                LabOrderStatus.PENDING, LabOrderStatus.SAMPLE_COLLECTED, LabOrderStatus.SCHEDULED));
    }

    @Transactional
    public LabOrder create(LabOrderRequest req) {
        Patient patient = patientRepository.findById(req.getPatientId())
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));
        User doctor = userRepository.findById(req.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Médico no encontrado"));

        Ticket ticket = null;
        if (req.getTicketId() != null) {
            ticket = ticketRepository.findById(req.getTicketId()).orElse(null);
        }

        // Resolver examen del catálogo y tipo de muestra
        LabExam labExam = null;
        SampleType sampleType = req.getSampleType();
        if (req.getLabExamId() != null) {
            labExam = labExamRepository.findById(req.getLabExamId())
                    .orElseThrow(() -> new RuntimeException("Examen de laboratorio no encontrado: " + req.getLabExamId()));
            // El tipo de muestra se deriva del examen si no se especificó explícitamente
            if (sampleType == null) {
                sampleType = labExam.getSampleType();
            }
        }
        if (sampleType == null) {
            throw new RuntimeException("Se requiere tipo de muestra o examen del catálogo");
        }

        LocalDate today = LocalDate.now(ZoneId.of("America/Guatemala"));
        // RN-L01: Vigencia 30 días calendario
        LocalDate expiration = today.plusDays(30);

        LabOrder order = LabOrder.builder()
                .patient(patient)
                .doctor(doctor)
                .ticket(ticket)
                .labExam(labExam)
                .sampleType(sampleType)
                .orderDate(today)
                .expirationDate(expiration)
                .notes(req.getNotes())
                .build();

        return labOrderRepository.save(order);
    }

    @Transactional
    public LabOrder collectSample(Long orderId) {
        LabOrder order = getOrThrow(orderId);
        order.setStatus(LabOrderStatus.SAMPLE_COLLECTED);
        return labOrderRepository.save(order);
    }

    @Transactional
    public LabOrder schedule(Long orderId, LocalDateTime scheduledAt) {
        LabOrder order = getOrThrow(orderId);
        order.setStatus(LabOrderStatus.SCHEDULED);
        order.setScheduledAt(scheduledAt);
        return labOrderRepository.save(order);
    }

    @Transactional
    public LabOrder complete(Long orderId, String notes, LocalDateTime resultAvailableAt, Long technicianId) {
        LabOrder order = getOrThrow(orderId);

        // RN-L03: Verificar correo registrado
        Patient patient = order.getPatient();
        if (patient.getEmail() == null || patient.getEmail().isBlank()) {
            throw new RuntimeException("RN-L03: El correo electrónico del paciente no está registrado. Actualícelo antes de completar.");
        }

        order.setStatus(LabOrderStatus.COMPLETED);
        order.setResultAvailableAt(resultAvailableAt);
        labOrderRepository.save(order);

        // Guardar resultado
        User technician = userRepository.findById(technicianId).orElse(null);
        LabResult result = LabResult.builder()
                .labOrder(order)
                .technician(technician)
                .resultNotes(notes)
                .resultDate(resultAvailableAt.toLocalDate())
                .build();
        labResultRepository.save(result);

        // CU4 FA01: Enviar notificación por email
        emailService.sendLabResultNotification(patient, order, resultAvailableAt);

        return order;
    }

    /** RN-L01: Scheduled job que marca órdenes expiradas (>30 días) */
    @Scheduled(cron = "0 0 1 * * *")
    @Transactional
    public void checkExpiredOrders() {
        List<LabOrder> expired = labOrderRepository.findExpiredOrders(LocalDate.now(ZoneId.of("America/Guatemala")));
        expired.forEach(order -> {
            order.setStatus(LabOrderStatus.EXPIRED);
            labOrderRepository.save(order);
            log.info("Orden {} marcada como EXPIRED", order.getId());
        });
    }

    private LabOrder getOrThrow(Long id) {
        return labOrderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Orden de laboratorio no encontrada: " + id));
    }
}
