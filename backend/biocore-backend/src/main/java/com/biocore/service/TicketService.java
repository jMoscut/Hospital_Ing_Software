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

    @Transactional(readOnly = true)
    public List<TicketDTO> getAll() {
        return ticketRepository.findAll().stream()
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

    @Transactional
    public TicketDTO confirmArrival(Long ticketId) {
        Ticket ticket = getTicketOrThrow(ticketId);

        // RN-03: Verificar signos vitales registrados
        if (!vitalSignsRepository.existsByTicketId(ticketId)) {
            throw new RuntimeException("RN-03: Debe registrar los signos vitales del paciente antes de iniciar la consulta");
        }

        ticket.setStatus(TicketStatus.IN_CONSULTATION);
        ticket.setConsultationStartAt(LocalDateTime.now());
        return TicketDTO.from(ticketRepository.save(ticket));
    }

    @Transactional
    public TicketDTO complete(Long ticketId) {
        Ticket ticket = getTicketOrThrow(ticketId);
        ticket.setStatus(TicketStatus.COMPLETED);
        ticket.setCompletedAt(LocalDateTime.now());
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
