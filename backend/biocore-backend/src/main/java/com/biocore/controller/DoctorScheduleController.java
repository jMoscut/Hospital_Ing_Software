package com.biocore.controller;

import com.biocore.dto.ApiResponse;
import com.biocore.dto.DoctorScheduleDTO;
import com.biocore.dto.DoctorScheduleRequest;
import com.biocore.service.DoctorScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schedules")
@RequiredArgsConstructor
public class DoctorScheduleController {

    private final DoctorScheduleService scheduleService;

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<ApiResponse<List<DoctorScheduleDTO>>> getByDoctor(@PathVariable Long doctorId) {
        return ResponseEntity.ok(ApiResponse.ok(scheduleService.getByDoctor(doctorId)));
    }

    @GetMapping("/clinic/{clinicId}")
    public ResponseEntity<ApiResponse<List<DoctorScheduleDTO>>> getByClinic(@PathVariable Long clinicId) {
        return ResponseEntity.ok(ApiResponse.ok(scheduleService.getByClinic(clinicId)));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<DoctorScheduleDTO>> create(@RequestBody DoctorScheduleRequest req) {
        try {
            return ResponseEntity.status(201).body(ApiResponse.ok("Horario creado", scheduleService.create(req)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<DoctorScheduleDTO>> update(@PathVariable Long id,
                                                                   @RequestBody DoctorScheduleRequest req) {
        try {
            return ResponseEntity.ok(ApiResponse.ok("Horario actualizado", scheduleService.update(id, req)));
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
