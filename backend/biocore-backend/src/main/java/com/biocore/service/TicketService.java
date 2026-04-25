package com.biocore.service;

import com.biocore.dto.TicketCreateRequest;
import com.biocore.dto.TicketDTO;
import com.biocore.entity.Clinic;
import com.biocore.entity.DoctorClinicAssignment;
import com.biocore.entity.Patient;
import com.biocore.entity.Ticket;
import com.biocore.entity.User;
import com.biocore.enums.TicketPriority;
import com.biocore.enums.TicketStatus;
import com.biocore.repository.ClinicRepository;
import com.biocore.repository.DoctorClinicAssignmentRepository;
import com.biocore.repository.PatientRepository;
import com.biocore.repository.TicketRepository;
import com.biocore.repository.UserRepository;
import com.biocore.repository.VitalSignsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;
    private final PatientRepository patientRepository;
    private final ClinicRepository clinicRepository;
    private final DoctorClinicAssignmentRepository assignmentRepository;
    private final VitalSignsRepository vitalSignsRepository;
    private final UserRepository userRepository;

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

    /** RN-C01: Cola ordenada por prioridad (URGENT primero) luego FIFO */
    @Transactional(readOnly = true)
    public List<TicketDTO> getQueue(Long clinicId) {
        return ticketRepository.findQueueByClinic(clinicId,
                List.of(TicketStatus.WAITING, TicketStatus.BEING_CALLED)).stream()
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

        // Asignar médico disponible automáticamente
        User assignedDoctor = getAvailableDoctor(req.getClinicId());

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
     *  Requires at least one available doctor assigned to the clinic. */
    @Transactional
    public TicketDTO callNextToVitalSigns(Long clinicId) {
        if (assignmentRepository.countAvailableDoctorsInClinic(clinicId) == 0) {
            throw new RuntimeException("No hay médicos disponibles en esta clínica. Espere a que un médico se marque disponible.");
        }

        List<Ticket> waitingTickets = ticketRepository.findQueueByClinic(clinicId,
                List.of(TicketStatus.WAITING));
        if (waitingTickets.isEmpty()) {
            throw new RuntimeException("No hay pacientes en espera para esta clínica");
        }

        Ticket next = waitingTickets.get(0);
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

        // Doctor becomes not available after completing consultation
        if (ticket.getDoctor() != null) {
            userRepository.findById(ticket.getDoctor().getId()).ifPresent(doc -> {
                doc.setAvailable(false);
                userRepository.save(doc);
            });
        }

        return TicketDTO.from(ticketRepository.save(ticket));
    }

    @Transactional
    public TicketDTO markAbsent(Long ticketId) {
        Ticket ticket = getTicketOrThrow(ticketId);
        ticket.setStatus(TicketStatus.ABSENT);
        return TicketDTO.from(ticketRepository.save(ticket));
    }

    private Ticket getTicketOrThrow(Long id) {
        return ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket no encontrado: " + id));
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
}
