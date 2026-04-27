package com.biocore.controller;

import com.biocore.dto.ApiResponse;
import com.biocore.dto.TicketCreateRequest;
import com.biocore.dto.TicketDTO;
import com.biocore.security.CustomUserDetails;
import com.biocore.service.TicketService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<TicketDTO>>> getAll() {
        return ResponseEntity.ok(ApiResponse.ok(ticketService.getAll()));
    }

    @GetMapping("/clinic/{clinicId}")
    public ResponseEntity<ApiResponse<List<TicketDTO>>> getByClinic(@PathVariable Long clinicId) {
        return ResponseEntity.ok(ApiResponse.ok(ticketService.getByClinic(clinicId)));
    }

    @GetMapping("/queue/{clinicId}")
    public ResponseEntity<ApiResponse<List<TicketDTO>>> getQueue(@PathVariable Long clinicId) {
        return ResponseEntity.ok(ApiResponse.ok(ticketService.getQueue(clinicId)));
    }

    /** Cola filtrada por doctor — solo tickets asignados a ese médico hoy. */
    @GetMapping("/queue/{clinicId}/doctor/{doctorId}")
    public ResponseEntity<ApiResponse<List<TicketDTO>>> getQueueForDoctor(
            @PathVariable Long clinicId, @PathVariable Long doctorId) {
        return ResponseEntity.ok(ApiResponse.ok(ticketService.getQueueForDoctor(clinicId, doctorId)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<TicketDTO>> create(@Valid @RequestBody TicketCreateRequest req) {
        try {
            return ResponseEntity.status(201).body(ApiResponse.ok("Ticket generado", ticketService.create(req)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    /** CU3: Médico o personal de salud llama al siguiente paciente (RN-C01, RN-C04) */
    @PutMapping("/clinic/{clinicId}/call-next")
    @PreAuthorize("hasAnyRole('DOCTOR', 'ADMIN', 'HEALTH_STAFF', 'NURSE')")
    public ResponseEntity<ApiResponse<TicketDTO>> callNext(@PathVariable Long clinicId,
                                                            @AuthenticationPrincipal CustomUserDetails userDetails) {
        try {
            Long doctorId = userDetails.getUser().getId();
            return ResponseEntity.ok(ApiResponse.ok("Paciente llamado", ticketService.callNext(clinicId, doctorId)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    /** CU3: Confirmar llegada del paciente (requiere signos vitales, RN-03) */
    @PutMapping("/{ticketId}/confirm-arrival")
    @PreAuthorize("hasAnyRole('DOCTOR', 'ADMIN', 'HEALTH_STAFF', 'NURSE')")
    public ResponseEntity<ApiResponse<TicketDTO>> confirmArrival(@PathVariable Long ticketId) {
        try {
            return ResponseEntity.ok(ApiResponse.ok("Consulta iniciada", ticketService.confirmArrival(ticketId)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PutMapping("/{ticketId}/complete")
    @PreAuthorize("hasAnyRole('DOCTOR', 'ADMIN')")
    public ResponseEntity<ApiResponse<TicketDTO>> complete(@PathVariable Long ticketId) {
        try {
            return ResponseEntity.ok(ApiResponse.ok("Consulta completada", ticketService.complete(ticketId)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    /** CU3 FA01: Paciente ausente (3 llamados sin respuesta) */
    @PutMapping("/{ticketId}/mark-absent")
    @PreAuthorize("hasAnyRole('DOCTOR', 'ADMIN', 'HEALTH_STAFF', 'NURSE')")
    public ResponseEntity<ApiResponse<TicketDTO>> markAbsent(@PathVariable Long ticketId) {
        try {
            return ResponseEntity.ok(ApiResponse.ok("Paciente marcado como ausente", ticketService.markAbsent(ticketId)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<ApiResponse<List<TicketDTO>>> getByPatient(@PathVariable Long patientId) {
        return ResponseEntity.ok(ApiResponse.ok(ticketService.getByPatient(patientId)));
    }

    /** Todos los tickets activos de hoy — para monitoreo de personal de salud */
    @GetMapping("/queue/today")
    @PreAuthorize("hasAnyRole('HEALTH_STAFF', 'NURSE', 'ADMIN', 'DOCTOR')")
    public ResponseEntity<ApiResponse<List<TicketDTO>>> getTodayAllActive() {
        return ResponseEntity.ok(ApiResponse.ok(ticketService.getTodayAllActive()));
    }

    /** Health staff calls next WAITING patient to vital signs area */
    @PutMapping("/clinic/{clinicId}/call-to-vital-signs")
    @PreAuthorize("hasAnyRole('HEALTH_STAFF', 'NURSE', 'ADMIN')")
    public ResponseEntity<ApiResponse<TicketDTO>> callNextToVitalSigns(@PathVariable Long clinicId) {
        try {
            return ResponseEntity.ok(ApiResponse.ok("Paciente llamado a signos vitales",
                    ticketService.callNextToVitalSigns(clinicId)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    /** Health staff marks sample physically collected for a LABORATORIO ticket.
     *  Creates LabOrder report for lab tech portal, completes ticket, frees lab tech. */
    @PutMapping("/{ticketId}/collect-sample")
    @PreAuthorize("hasAnyRole('HEALTH_STAFF', 'NURSE', 'ADMIN')")
    public ResponseEntity<ApiResponse<Map<String, Object>>> collectSample(@PathVariable Long ticketId) {
        try {
            return ResponseEntity.ok(ApiResponse.ok("Muestra recolectada y enviada a laboratorio",
                    ticketService.collectSample(ticketId)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    /** Doctor calls a READY_FOR_DOCTOR patient to their consultation room */
    @PutMapping("/{ticketId}/call-to-consultation")
    @PreAuthorize("hasAnyRole('DOCTOR', 'ADMIN')")
    public ResponseEntity<ApiResponse<TicketDTO>> callToConsultation(
            @PathVariable Long ticketId,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        try {
            Long doctorId = userDetails.getUser().getId();
            return ResponseEntity.ok(ApiResponse.ok("Paciente llamado al consultorio",
                    ticketService.callToConsultation(ticketId, doctorId)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}
