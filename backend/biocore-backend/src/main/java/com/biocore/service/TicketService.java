package com.biocore.service;

import com.biocore.dto.TicketCreateRequest;
import com.biocore.dto.TicketDTO;
import com.biocore.entity.Clinic;
import com.biocore.entity.DoctorClinicAssignment;
import com.biocore.entity.LabExam;
import com.biocore.entity.LabOrder;
import com.biocore.entity.Patient;
import com.biocore.entity.Ticket;
import com.biocore.entity.User;
import com.biocore.enums.LabOrderStatus;
import com.biocore.enums.Role;
import com.biocore.enums.SampleType;
import com.biocore.enums.TicketPriority;
import com.biocore.enums.TicketStatus;
import com.biocore.repository.ClinicRepository;
import com.biocore.repository.DoctorClinicAssignmentRepository;
import com.biocore.repository.LabExamRepository;
import com.biocore.repository.LabOrderRepository;
import com.biocore.repository.PatientRepository;
import com.biocore.repository.TicketRepository;
import com.biocore.repository.UserRepository;
import com.biocore.repository.VitalSignsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;
    private final PatientRepository patientRepository;
    private final ClinicRepository clinicRepository;
    private final DoctorClinicAssignmentRepository assignmentRepository;
    private final VitalSignsRepository vitalSignsRepository;
    private final UserRepository userRepository;
    private final LabOrderRepository labOrderRepository;
    private final LabExamRepository labExamRepository;

    @Transactional(readOnly = true)
    public List<TicketDTO> getAll() {
        return ticketRepository.findAll().stream()
                .map(TicketDTO::from)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<TicketDTO> getByPatient(Long patientId) {
        return ticketRepository.findByPatientId(patientId).stream()
                .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                .map(TicketDTO::from)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<TicketDTO> getByClinic(Long clinicId) {
        return ticketRepository.findByClinicId(clinicId).stream()
                .map(TicketDTO::from)
                .collect(Collectors.toList());
    }

    private static final ZoneId GT  = ZoneId.of("America/Guatemala");
    private static final ZoneId UTC = java.time.ZoneOffset.UTC;

    private LocalDate today() { return LocalDate.now(GT); }

    /** Midnight Guatemala expressed as UTC LocalDateTime — used to compare UTC createdAt values. */
    private LocalDateTime todayStart() {
        return today().atStartOfDay(GT).withZoneSameInstant(UTC).toLocalDateTime();
    }

    /** RN-C01: Cola ordenada por prioridad (URGENT primero) luego FIFO.
     *  Solo tickets de hoy o walk-in creados hoy. */
    @Transactional(readOnly = true)
    public List<TicketDTO> getQueue(Long clinicId) {
        return ticketRepository.findQueueByClinic(clinicId,
                List.of(TicketStatus.WAITING, TicketStatus.BEING_CALLED),
                today(), todayStart()).stream()
                .map(TicketDTO::from)
                .collect(Collectors.toList());
    }

    /** Cola filtrada por doctor: solo tickets asignados a ese médico, de hoy. */
    @Transactional(readOnly = true)
    public List<TicketDTO> getQueueForDoctor(Long clinicId, Long doctorId) {
        return ticketRepository.findQueueByClinicAndDoctor(clinicId, doctorId,
                List.of(TicketStatus.WAITING, TicketStatus.BEING_CALLED,
                        TicketStatus.CALLED_TO_VITAL_SIGNS, TicketStatus.READY_FOR_DOCTOR),
                today(), todayStart()).stream()
                .map(TicketDTO::from)
                .collect(Collectors.toList());
    }

    @Transactional
    public TicketDTO create(TicketCreateRequest req) {
        Patient patient = patientRepository.findById(req.getPatientId())
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));

        // RN-02: Clínica obligatoria
        Clinic clinic = clinicRepository.findById(req.getClinicId())
                .orElseThrow(() -> new RuntimeException("Clínica no encontrada"));

        // Use doctor from appointment if provided, else assign available one
        User assignedDoctor = null;
        if (req.getDoctorId() != null) {
            assignedDoctor = userRepository.findById(req.getDoctorId()).orElse(null);
        }
        if (assignedDoctor == null) {
            assignedDoctor = getAvailableDoctor(req.getClinicId());
        }

        // Generar número de ticket correlativo
        String ticketNumber = generateTicketNumber();

        TicketPriority priority = req.getPriority() != null ? req.getPriority() : TicketPriority.NORMAL;
        String type = req.getType() != null ? req.getType() : "CONSULTA";

        Ticket ticket = Ticket.builder()
                .ticketNumber(ticketNumber)
                .patient(patient)
                .clinic(clinic)
                .doctor(assignedDoctor)
                .priority(priority)
                .type(type)
                .notes(req.getNotes())
                .scheduledDate(req.getScheduledDate())
                .scheduledTime(req.getScheduledTime())
                .build();

        return TicketDTO.from(ticketRepository.save(ticket));
    }

    /** Todos los tickets de hoy (activos + completados) — para monitoreo (todas las clínicas). */
    @Transactional(readOnly = true)
    public List<TicketDTO> getTodayAllActive() {
        List<TicketStatus> statuses = List.of(
                TicketStatus.WAITING, TicketStatus.CALLED_TO_VITAL_SIGNS,
                TicketStatus.READY_FOR_DOCTOR, TicketStatus.BEING_CALLED,
                TicketStatus.IN_CONSULTATION, TicketStatus.COMPLETED);
        return ticketRepository.findTodayAllActive(statuses, today(), todayStart()).stream()
                .map(TicketDTO::from)
                .collect(Collectors.toList());
    }

    /** RN-C04: No puede llamarse nuevo paciente si hay consulta activa */
    @Transactional
    public TicketDTO callNext(Long clinicId, Long doctorId) {
        // Verificar si el médico tiene consulta activa
        Optional<Ticket> activeConsultation = ticketRepository.findByDoctorIdAndStatus(doctorId, TicketStatus.IN_CONSULTATION);
        if (activeConsultation.isPresent()) {
            throw new RuntimeException("RN-C04: No puede llamar al siguiente paciente mientras tiene una consulta activa");
        }

        // RN-C01: Seleccionar siguiente: URGENT primero, luego cronológico
        List<TicketDTO> queue = getQueue(clinicId);
        if (queue.isEmpty()) {
            throw new RuntimeException("No hay pacientes en espera para esta clínica");
        }

        Ticket nextTicket = ticketRepository.findById(queue.get(0).getId())
                .orElseThrow(() -> new RuntimeException("Ticket no encontrado"));

        nextTicket.setStatus(TicketStatus.BEING_CALLED);
        nextTicket.setCalledAt(LocalDateTime.now());

        return TicketDTO.from(ticketRepository.save(nextTicket));
    }

    /** Health staff calls next WAITING patient to the vital signs area.
     *  For LABORATORIO tickets: checks that at least one LAB_TECHNICIAN is online+available.
     *  For regular tickets: reserves the pre-assigned doctor or picks an available one. */
    @Transactional
    public TicketDTO callNextToVitalSigns(Long clinicId) {
        List<Ticket> waitingTickets = ticketRepository.findQueueByClinic(clinicId,
                List.of(TicketStatus.WAITING), today(), todayStart());
        if (waitingTickets.isEmpty()) {
            throw new RuntimeException("No hay pacientes en espera para esta clínica");
        }

        Ticket next = waitingTickets.get(0);

        if ("LABORATORIO".equals(next.getType())) {
            LocalDateTime threshold = LocalDateTime.now().minusMinutes(2);
            List<User> onlineTechs = userRepository.findByRoleAndActiveTrue(Role.LAB_TECHNICIAN).stream()
                    .filter(u -> u.isAvailable() && u.getOnlineAt() != null && u.getOnlineAt().isAfter(threshold))
                    .collect(Collectors.toList());
            if (onlineTechs.isEmpty()) {
                throw new RuntimeException("No hay técnicos de laboratorio disponibles actualmente. Espere a que uno se marque disponible y en turno.");
            }
            // Equitable distribution: assign tech with fewest lab orders today
            LocalDate todayDate = today();
            User availableLabTech = onlineTechs.stream()
                    .min(Comparator.comparingLong(tech ->
                            labOrderRepository.findByDoctorId(tech.getId()).stream()
                                    .filter(o -> todayDate.equals(o.getOrderDate()))
                                    .count()))
                    .orElse(onlineTechs.get(0));
            availableLabTech.setAvailable(false);
            userRepository.save(availableLabTech);
            next.setDoctor(availableLabTech);
        } else {
            User doctorToReserve;
            if (next.getDoctor() != null) {
                doctorToReserve = userRepository.findById(next.getDoctor().getId())
                        .orElseThrow(() -> new RuntimeException("Doctor asignado no encontrado"));
            } else {
                List<DoctorClinicAssignment> availableDoctors = assignmentRepository.findAvailableDoctorsByClinic(clinicId);
                if (availableDoctors.isEmpty()) {
                    throw new RuntimeException("No hay médicos disponibles en esta clínica. Espere a que un médico se marque disponible.");
                }
                doctorToReserve = availableDoctors.get(0).getDoctor();
                next.setDoctor(doctorToReserve);
            }
            doctorToReserve.setAvailable(false);
            userRepository.save(doctorToReserve);
        }

        next.setStatus(TicketStatus.CALLED_TO_VITAL_SIGNS);
        next.setCalledAt(LocalDateTime.now());
        return TicketDTO.from(ticketRepository.save(next));
    }

    /** Status-aware confirm:
     *  CALLED_TO_VITAL_SIGNS + vitals present → READY_FOR_DOCTOR
     *  BEING_CALLED (doctor called to room)   → IN_CONSULTATION */
    @Transactional
    public TicketDTO confirmArrival(Long ticketId) {
        Ticket ticket = getTicketOrThrow(ticketId);

        if (ticket.getStatus() == TicketStatus.CALLED_TO_VITAL_SIGNS) {
            if (!vitalSignsRepository.existsByTicketId(ticketId)) {
                throw new RuntimeException("RN-03: Debe registrar los signos vitales antes de continuar");
            }
            ticket.setStatus(TicketStatus.READY_FOR_DOCTOR);
        } else if (ticket.getStatus() == TicketStatus.BEING_CALLED) {
            ticket.setStatus(TicketStatus.IN_CONSULTATION);
            ticket.setConsultationStartAt(LocalDateTime.now());
        } else {
            throw new RuntimeException("Estado inválido para confirmar llegada: " + ticket.getStatus());
        }

        return TicketDTO.from(ticketRepository.save(ticket));
    }

    /** Doctor calls a READY_FOR_DOCTOR patient to their room (shows on call screen). */
    @Transactional
    public TicketDTO callToConsultation(Long ticketId, Long doctorId) {
        Ticket ticket = getTicketOrThrow(ticketId);
        if (ticket.getStatus() != TicketStatus.READY_FOR_DOCTOR) {
            throw new RuntimeException("El paciente no está listo para ser llamado a consulta");
        }

        // Assign/confirm doctor on ticket
        if (ticket.getDoctor() == null || !ticket.getDoctor().getId().equals(doctorId)) {
            userRepository.findById(doctorId).ifPresent(ticket::setDoctor);
        }

        ticket.setStatus(TicketStatus.BEING_CALLED);
        ticket.setCalledAt(LocalDateTime.now());

        // Doctor is no longer available while attending a patient
        userRepository.findById(doctorId).ifPresent(doc -> {
            doc.setAvailable(false);
            userRepository.save(doc);
        });

        return TicketDTO.from(ticketRepository.save(ticket));
    }

    @Transactional
    public TicketDTO complete(Long ticketId) {
        Ticket ticket = getTicketOrThrow(ticketId);
        ticket.setStatus(TicketStatus.COMPLETED);
        ticket.setCompletedAt(LocalDateTime.now());

        // Doctor becomes available again after completing consultation
        if (ticket.getDoctor() != null) {
            userRepository.findById(ticket.getDoctor().getId()).ifPresent(doc -> {
                doc.setAvailable(true);
                userRepository.save(doc);
            });
        }

        return TicketDTO.from(ticketRepository.save(ticket));
    }

    @Transactional
    public TicketDTO markAbsent(Long ticketId) {
        Ticket ticket = getTicketOrThrow(ticketId);
        ticket.setStatus(TicketStatus.ABSENT);
        // Free the assigned doctor so the next patient can be called
        if (ticket.getDoctor() != null) {
            userRepository.findById(ticket.getDoctor().getId()).ifPresent(doc -> {
                doc.setAvailable(true);
                userRepository.save(doc);
            });
        }
        return TicketDTO.from(ticketRepository.save(ticket));
    }

    private Ticket getTicketOrThrow(Long id) {
        return ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket no encontrado: " + id));
    }

    /** Health staff marks physical sample collected for a LABORATORIO ticket.
     *  Creates a LabOrder report (SAMPLE_COLLECTED) for the lab technician portal,
     *  completes the ticket, and frees the assigned lab tech. */
    @Transactional
    public Map<String, Object> collectSample(Long ticketId) {
        Ticket ticket = getTicketOrThrow(ticketId);

        if (ticket.getStatus() != TicketStatus.CALLED_TO_VITAL_SIGNS) {
            throw new RuntimeException("El ticket no está en estado de signos vitales");
        }
        if (!"LABORATORIO".equals(ticket.getType())) {
            throw new RuntimeException("Este ticket no es de tipo laboratorio");
        }
        if (!vitalSignsRepository.existsByTicketId(ticketId)) {
            throw new RuntimeException("Debe registrar los signos vitales antes de recolectar la muestra");
        }

        // Parse exam code from ticket notes: [LAB-001] Exam Name — ...
        LabExam labExam = null;
        String notes = ticket.getNotes() != null ? ticket.getNotes() : "";
        Pattern p = Pattern.compile("\\[([A-Z]+-\\d+)\\]");
        Matcher m = p.matcher(notes);
        if (m.find()) {
            labExam = labExamRepository.findByCode(m.group(1)).orElse(null);
        }

        SampleType sampleType = labExam != null ? labExam.getSampleType() : SampleType.BLOOD;
        String examName   = labExam != null ? labExam.getName() : "Análisis de Laboratorio";
        String examCode   = labExam != null ? labExam.getCode() : "—";

        // Lab tech assigned during callNextToVitalSigns — used as LabOrder.doctor (required FK)
        User labTech = ticket.getDoctor();
        if (labTech == null) {
            labTech = userRepository.findByRoleAndActiveTrue(Role.LAB_TECHNICIAN)
                    .stream().findFirst()
                    .orElseThrow(() -> new RuntimeException("No hay técnico de laboratorio disponible"));
        }

        LocalDate today = LocalDate.now(GT);
        // Create LabOrder with SAMPLE_COLLECTED — this is the report sent to lab tech portal
        LabOrder order = LabOrder.builder()
                .patient(ticket.getPatient())
                .doctor(labTech)
                .ticket(ticket)
                .labExam(labExam)
                .sampleType(sampleType)
                .status(LabOrderStatus.SAMPLE_COLLECTED)
                .orderDate(today)
                .expirationDate(today.plusDays(30))
                .build();
        order = labOrderRepository.save(order);

        // Use order ID to build unique sample code
        String sampleCode = "MUE-" + today.getYear() + "-" + String.format("%04d", order.getId());
        order.setNotes(sampleCode);
        labOrderRepository.save(order);

        // Free lab tech
        labTech.setAvailable(true);
        userRepository.save(labTech);

        // Complete the ticket — patient leaves after giving sample
        ticket.setStatus(TicketStatus.COMPLETED);
        ticket.setCompletedAt(LocalDateTime.now());
        ticketRepository.save(ticket);

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("sampleCode",      sampleCode);
        result.put("patientName",     ticket.getPatient().getFirstName() + " " + ticket.getPatient().getLastName());
        result.put("examName",        examName);
        result.put("examCode",        examCode);
        result.put("sampleType",      sampleType.name());
        result.put("sampleTypeLabel", sampleTypeLabel(sampleType));
        result.put("collectedAt",     LocalDateTime.now().toString());
        return result;
    }

    private String sampleTypeLabel(SampleType t) {
        return switch (t) {
            case BLOOD          -> "Sangre";
            case URINE          -> "Orina";
            case FECES          -> "Heces";
            case NASAL_SWAB     -> "Hisopado Nasal";
            case TISSUE         -> "Tejido";
            case CERVICAL_CELLS -> "Células Cervicales";
        };
    }

    public String generateTicketNumber(Long clinicId) {
        return generateTicketNumber();
    }

    private String generateTicketNumber() {
        Optional<String> maxOpt = ticketRepository.findMaxTicketNumber();
        if (maxOpt.isEmpty()) return "A001";
        String max = maxOpt.get();
        try {
            char letter = max.charAt(0);
            int num = Integer.parseInt(max.substring(1));
            num++;
            if (num > 999) {
                letter = (char)(letter + 1);
                num = 1;
            }
            return String.format("%c%03d", letter, num);
        } catch (Exception e) {
            return "A001";
        }
    }

    private User getAvailableDoctor(Long clinicId) {
        List<DoctorClinicAssignment> assignments = assignmentRepository.findActiveDoctorsByClinic(clinicId);
        if (!assignments.isEmpty()) {
            return assignments.get(0).getDoctor();
        }
        return null;
    }

    /** También corre al iniciar el backend — limpia tickets viejos que quedaron activos. */
    @EventListener(ApplicationReadyEvent.class)
    public void expireStaleTicketsOnStartup() {
        log.info("Startup: running stale ticket expiration...");
        expireStaleTickets();
    }

    /** Corre a medianoche Guatemala: marca ABSENT tickets sin atender de días anteriores
     *  (agendados o walk-in) y resetea disponibilidad de todos los doctores. */
    @Scheduled(cron = "0 0 6 * * *") // 00:00 Guatemala = 06:00 UTC
    @Transactional
    public void expireStaleTickets() {
        LocalDate today = today();
        LocalDateTime todayStart = todayStart();
        List<TicketStatus> activeStatuses = List.of(
                TicketStatus.WAITING, TicketStatus.BEING_CALLED,
                TicketStatus.CALLED_TO_VITAL_SIGNS, TicketStatus.READY_FOR_DOCTOR);
        List<Ticket> stale = ticketRepository.findStaleScheduledTickets(today, todayStart, activeStatuses);
        stale.forEach(t -> t.setStatus(TicketStatus.ABSENT));
        ticketRepository.saveAll(stale);
        if (!stale.isEmpty()) log.info("Expired {} stale tickets from previous days", stale.size());

        // Reset all doctors to unavailable — must manually mark available each shift
        List<User> activeDoctors = userRepository.findByRoleAndAvailable(com.biocore.enums.Role.DOCTOR, true);
        activeDoctors.forEach(d -> d.setAvailable(false));
        userRepository.saveAll(activeDoctors);
        if (!activeDoctors.isEmpty()) log.info("Reset availability for {} doctors at start of day", activeDoctors.size());
    }
}
