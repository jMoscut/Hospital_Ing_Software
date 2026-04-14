package com.biocore.controller;

import com.biocore.dto.ApiResponse;
import com.biocore.entity.Clinic;
import com.biocore.repository.ClinicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clinics")
@RequiredArgsConstructor
public class ClinicController {

    private final ClinicRepository clinicRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Clinic>>> getAll() {
        return ResponseEntity.ok(ApiResponse.ok(clinicRepository.findByActiveTrue()));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Clinic>> create(@RequestBody Clinic clinic) {
        clinic.setActive(true);
        return ResponseEntity.status(201).body(ApiResponse.ok("Clínica creada", clinicRepository.save(clinic)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Clinic>> update(@PathVariable Long id, @RequestBody Clinic data) {
        return clinicRepository.findById(id).map(clinic -> {
            clinic.setName(data.getName());
            clinic.setMaxDoctors(data.getMaxDoctors());
            clinic.setDescription(data.getDescription());
            return ResponseEntity.ok(ApiResponse.ok("Clínica actualizada", clinicRepository.save(clinic)));
        }).orElse(ResponseEntity.status(404).body(ApiResponse.error("Clínica no encontrada")));
    }
}
