package com.biocore.controller;

import com.biocore.dto.ApiResponse;
import com.biocore.dto.PatientCreateRequest;
import com.biocore.dto.PatientDTO;
import com.biocore.service.PatientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/patients")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<PatientDTO>>> getAll() {
        return ResponseEntity.ok(ApiResponse.ok(patientService.getAll()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PatientDTO>> getById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(ApiResponse.ok(patientService.getById(id)));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/dpi/{dpi}")
    public ResponseEntity<ApiResponse<PatientDTO>> getByDpi(@PathVariable String dpi) {
        Optional<PatientDTO> patient = patientService.getByDpi(dpi);
        if (patient.isPresent()) {
            return ResponseEntity.ok(ApiResponse.ok(patient.get()));
        }
        return ResponseEntity.status(404).body(ApiResponse.error("No existe paciente con DPI: " + dpi));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<PatientDTO>>> search(@RequestParam String q) {
        return ResponseEntity.ok(ApiResponse.ok(patientService.search(q)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<PatientDTO>> create(@Valid @RequestBody PatientCreateRequest req) {
        try {
            return ResponseEntity.status(201).body(ApiResponse.ok("Paciente registrado exitosamente", patientService.create(req)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PatientDTO>> update(@PathVariable Long id,
                                                          @Valid @RequestBody PatientCreateRequest req) {
        try {
            return ResponseEntity.ok(ApiResponse.ok("Paciente actualizado", patientService.update(id, req)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('HEALTH_STAFF', 'ADMIN')")
    public ResponseEntity<ApiResponse<String>> delete(@PathVariable Long id) {
        try {
            patientService.deactivate(id);
            return ResponseEntity.ok(ApiResponse.ok("Paciente eliminado"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}
