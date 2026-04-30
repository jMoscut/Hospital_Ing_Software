package com.biocore.service;

import com.biocore.dto.LabOrderDTO;
import com.biocore.dto.LabOrderRequest;
import com.biocore.entity.LabExam;
import com.biocore.entity.LabOrder;
import com.biocore.entity.LabResult;
import com.biocore.entity.Patient;
import com.biocore.entity.Ticket;
import com.biocore.entity.User;
import com.biocore.entity.VitalSigns;
import com.biocore.enums.LabOrderStatus;
import com.biocore.enums.SampleType;
import com.biocore.repository.LabExamRepository;
import com.biocore.repository.LabOrderRepository;
import com.biocore.repository.LabResultRepository;
import com.biocore.repository.PatientRepository;
import com.biocore.repository.TicketRepository;
import com.biocore.repository.UserRepository;
import com.biocore.repository.VitalSignsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.stream.Collectors;

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
    private final VitalSignsRepository vitalSignsRepository;
    private final EmailService emailService;

    @Value("${app.upload.dir}")
    private String uploadDir;

    @Transactional(readOnly = true)
    public List<LabOrderDTO> getByPatient(Long patientId) {
        return labOrderRepository.findByPatientIdOrderByOrderDateDesc(patientId)
                .stream().map(o -> {
                    LabResult r = labResultRepository.findByLabOrderId(o.getId()).orElse(null);
                    return LabOrderDTO.from(o, null, r);
                }).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<LabOrderDTO> getPending() {
        return labOrderRepository.findByStatusIn(List.of(
                LabOrderStatus.PENDING, LabOrderStatus.SAMPLE_COLLECTED, LabOrderStatus.SCHEDULED))
                .stream().map(o -> {
                    VitalSigns v = o.getTicket() != null
                            ? vitalSignsRepository.findByTicketId(o.getTicket().getId()).orElse(null)
                            : null;
                    LabResult r = labResultRepository.findByLabOrderId(o.getId()).orElse(null);
                    return LabOrderDTO.from(o, v, r);
                }).collect(Collectors.toList());
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
    public LabOrder complete(Long orderId, String notes, MultipartFile file, Long technicianId) {
        LabOrder order = getOrThrow(orderId);

        // RN-L03: Verificar correo registrado
        Patient patient = order.getPatient();
        if (patient.getEmail() == null || patient.getEmail().isBlank()) {
            throw new RuntimeException("RN-L03: El correo electrónico del paciente no está registrado. Actualícelo antes de completar.");
        }

        // Validar PDF
        if (file == null || file.isEmpty()) {
            throw new RuntimeException("Debe adjuntar el PDF con los resultados.");
        }
        String originalName = file.getOriginalFilename() != null ? file.getOriginalFilename() : "";
        if (!originalName.toLowerCase().endsWith(".pdf") &&
                !"application/pdf".equalsIgnoreCase(file.getContentType())) {
            throw new RuntimeException("El archivo debe ser un PDF.");
        }

        // Guardar archivo en disco
        String attachmentPath = saveFile(file, orderId);

        LocalDateTime now = LocalDateTime.now(ZoneId.of("America/Guatemala"));
        order.setStatus(LabOrderStatus.COMPLETED);
        order.setResultAvailableAt(now);
        labOrderRepository.save(order);

        User technician = userRepository.findById(technicianId).orElse(null);
        LabResult result = labResultRepository.findByLabOrderId(orderId).orElse(null);
        if (result == null) {
            result = LabResult.builder()
                    .labOrder(order)
                    .technician(technician)
                    .resultNotes(notes)
                    .resultDate(now.toLocalDate())
                    .attachmentPath(attachmentPath)
                    .notificationSentAt(now)
                    .build();
        } else {
            result.setTechnician(technician);
            result.setResultNotes(notes);
            result.setResultDate(now.toLocalDate());
            result.setAttachmentPath(attachmentPath);
            result.setNotificationSentAt(now);
        }
        labResultRepository.save(result);

        // CU4 FA01: Enviar notificación con PDF adjunto
        emailService.sendLabResultNotification(patient, order, now, new File(attachmentPath));

        return order;
    }

    public File getResultFile(Long orderId) {
        LabResult result = labResultRepository.findByLabOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("No hay resultado para esta orden"));
        if (result.getAttachmentPath() == null) {
            throw new RuntimeException("Esta orden no tiene PDF adjunto");
        }
        File file = new File(result.getAttachmentPath());
        if (!file.exists()) throw new RuntimeException("Archivo no encontrado en servidor");
        return file;
    }

    private String saveFile(MultipartFile file, Long orderId) {
        try {
            Path dir = Paths.get(uploadDir, "lab-orders", orderId.toString());
            Files.createDirectories(dir);
            String safe = System.currentTimeMillis() + "_resultado_lab.pdf";
            Path dest = dir.resolve(safe);
            Files.copy(file.getInputStream(), dest, StandardCopyOption.REPLACE_EXISTING);
            return dest.toAbsolutePath().toString();
        } catch (Exception e) {
            throw new RuntimeException("Error al guardar el archivo: " + e.getMessage());
        }
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
