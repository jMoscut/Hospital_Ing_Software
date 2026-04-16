package com.biocore.controller;

import com.biocore.dto.ApiResponse;
import com.biocore.dto.LabOrderDTO;
import com.biocore.dto.LabOrderRequest;
import com.biocore.security.CustomUserDetails;
import com.biocore.service.LabService;
import jakarta.validation.Valid;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/lab-orders")
@RequiredArgsConstructor
public class LabController {

    private final LabService labService;

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<ApiResponse<List<LabOrderDTO>>> getByPatient(@PathVariable Long patientId) {
        List<LabOrderDTO> dtos = labService.getByPatient(patientId)
                .stream().map(LabOrderDTO::from).collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.ok(dtos));
    }

    @GetMapping("/pending")
    @PreAuthorize("hasAnyRole('LAB_TECHNICIAN', 'ADMIN')")
    public ResponseEntity<ApiResponse<List<LabOrderDTO>>> getPending() {
        List<LabOrderDTO> dtos = labService.getPending()
                .stream().map(LabOrderDTO::from).collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.ok(dtos));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('DOCTOR', 'ADMIN')")
    public ResponseEntity<ApiResponse<LabOrderDTO>> create(@Valid @RequestBody LabOrderRequest req) {
        try {
            return ResponseEntity.status(201).body(
                    ApiResponse.ok("Orden de laboratorio generada", LabOrderDTO.from(labService.create(req))));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PutMapping("/{id}/collect-sample")
    @PreAuthorize("hasAnyRole('LAB_TECHNICIAN', 'HEALTH_STAFF', 'ADMIN')")
    public ResponseEntity<ApiResponse<LabOrderDTO>> collectSample(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(ApiResponse.ok("Muestra recolectada", LabOrderDTO.from(labService.collectSample(id))));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PutMapping("/{id}/schedule")
    @PreAuthorize("hasAnyRole('LAB_TECHNICIAN', 'ADMIN')")
    public ResponseEntity<ApiResponse<LabOrderDTO>> schedule(@PathVariable Long id,
                                                              @RequestBody ScheduleRequest req) {
        try {
            return ResponseEntity.ok(ApiResponse.ok("Cita programada", LabOrderDTO.from(labService.schedule(id, req.getScheduledAt()))));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PutMapping("/{id}/complete")
    @PreAuthorize("hasAnyRole('LAB_TECHNICIAN', 'ADMIN')")
    public ResponseEntity<ApiResponse<LabOrderDTO>> complete(@PathVariable Long id,
                                                              @RequestBody CompleteLabRequest req,
                                                              @AuthenticationPrincipal CustomUserDetails userDetails) {
        try {
            return ResponseEntity.ok(ApiResponse.ok("Resultado registrado y notificación enviada",
                    LabOrderDTO.from(labService.complete(id, req.getNotes(), req.getResultAvailableAt(), userDetails.getUser().getId()))));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @Data
    static class ScheduleRequest {
        private LocalDateTime scheduledAt;
    }

    @Data
    static class CompleteLabRequest {
        private String notes;
        private LocalDateTime resultAvailableAt;
    }
}
