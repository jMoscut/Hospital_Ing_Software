package com.biocore.controller;

import com.biocore.dto.ApiResponse;
import com.biocore.dto.ClinicScheduleDTO;
import com.biocore.dto.ClinicScheduleRequest;
import com.biocore.service.ClinicScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clinic-schedules")
@RequiredArgsConstructor
public class ClinicScheduleController {

    private final ClinicScheduleService scheduleService;

    @GetMapping("/clinic/{clinicId}")
    public ResponseEntity<ApiResponse<List<ClinicScheduleDTO>>> getByClinic(@PathVariable Long clinicId) {
        return ResponseEntity.ok(ApiResponse.ok(scheduleService.getByClinic(clinicId)));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ClinicScheduleDTO>> create(@RequestBody ClinicScheduleRequest req) {
        try {
            return ResponseEntity.status(201).body(
                    ApiResponse.ok("Horario de laboratorio creado", scheduleService.create(req)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        try {
            scheduleService.delete(id);
            return ResponseEntity.ok(ApiResponse.ok("Horario eliminado", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}
