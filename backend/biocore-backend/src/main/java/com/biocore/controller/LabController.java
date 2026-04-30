package com.biocore.controller;

import com.biocore.dto.ApiResponse;
import com.biocore.dto.LabOrderDTO;
import com.biocore.dto.LabOrderRequest;
import com.biocore.security.CustomUserDetails;
import com.biocore.service.LabService;
import jakarta.validation.Valid;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/lab-orders")
@RequiredArgsConstructor
public class LabController {

    private final LabService labService;

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<ApiResponse<List<LabOrderDTO>>> getByPatient(@PathVariable Long patientId) {
        return ResponseEntity.ok(ApiResponse.ok(labService.getByPatient(patientId)));
    }

    @GetMapping("/pending")
    @PreAuthorize("hasAnyRole('LAB_TECHNICIAN', 'ADMIN')")
    public ResponseEntity<ApiResponse<List<LabOrderDTO>>> getPending() {
        return ResponseEntity.ok(ApiResponse.ok(labService.getPending()));
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

    @PutMapping(value = "/{id}/complete", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyRole('LAB_TECHNICIAN', 'ADMIN')")
    public ResponseEntity<ApiResponse<LabOrderDTO>> complete(
            @PathVariable Long id,
            @RequestPart("file") MultipartFile file,
            @RequestParam(value = "notes", required = false) String notes,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        try {
            return ResponseEntity.ok(ApiResponse.ok("Resultado registrado y notificación enviada",
                    LabOrderDTO.from(labService.complete(id, notes, file, userDetails.getUser().getId()))));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/{id}/result-file")
    public ResponseEntity<Resource> getResultFile(@PathVariable Long id) {
        try {
            File file = labService.getResultFile(id);
            Resource resource = new FileSystemResource(file);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"resultado_lab_" + id + ".pdf\"")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @Data
    static class ScheduleRequest {
        private LocalDateTime scheduledAt;
    }
}
