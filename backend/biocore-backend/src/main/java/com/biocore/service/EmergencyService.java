package com.biocore.service;

import com.biocore.dto.PatientCreateRequest;
import com.biocore.dto.TicketDTO;
import com.biocore.entity.Clinic;
import com.biocore.entity.Patient;
import com.biocore.entity.Ticket;
import com.biocore.enums.ClinicType;
import com.biocore.enums.TicketPriority;
import com.biocore.repository.ClinicRepository;
import com.biocore.repository.PatientRepository;
import com.biocore.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmergencyService {

    private final PatientRepository patientRepository;
    private final TicketRepository ticketRepository;
    private final ClinicRepository clinicRepository;
    private final PatientService patientService;
    private final TicketService ticketService;

    /**
     * CU7: Registrar emergencia
     * RN-E01: Personal debe marcar explícitamente como emergencia
     * RN-E02: Se coloca al frente de la cola (URGENT priority)
     * RN-E04: Si no hay datos, se registra con datos mínimos
     */
    @Transactional
    public TicketDTO registerEmergency(String dpi, String motive, PatientCreateRequest newPatientData) {
        Patient patient = null;

        if (dpi != null && !dpi.isBlank()) {
            Optional<Patient> existing = patientRepository.findByDpi(dpi);
            if (existing.isPresent()) {
                patient = existing.get();
            }
        }

        // FA01: Si no existe el paciente, registrar con datos mínimos (RN-E04)
        if (patient == null) {
            if (newPatientData == null) {
                throw new RuntimeException("RN-E04: Se requieren datos mínimos del paciente para el registro de emergencia");
            }
            // Si no tiene DPI, usar uno temporal
            if (newPatientData.getDpi() == null || newPatientData.getDpi().isBlank()) {
                newPatientData.setDpi("0000000000000");
            }
            try {
                patientService.create(newPatientData);
                patient = patientRepository.findByDpi(newPatientData.getDpi()).orElseThrow();
            } catch (Exception e) {
                throw new RuntimeException("Error al registrar paciente de emergencia: " + e.getMessage());
            }
        }

        // Obtener clínica de emergencias
        Clinic emergencyClinic = clinicRepository.findByType(ClinicType.EMERGENCY)
                .orElseThrow(() -> new RuntimeException("No existe clínica de emergencias configurada"));

        // Generar ticket número correlativo
        String ticketNumber = ticketService.generateTicketNumber(emergencyClinic.getId());

        // RN-E01: Marcado explícito como EMERGENCIA
        // RN-E02: Prioridad URGENT (se coloca al frente de la cola)
        Ticket ticket = Ticket.builder()
                .ticketNumber(ticketNumber)
                .patient(patient)
                .clinic(emergencyClinic)
                .priority(TicketPriority.URGENT)
                .type("EMERGENCIA")
                .notes(motive)
                .build();

        return TicketDTO.from(ticketRepository.save(ticket));
    }
}
