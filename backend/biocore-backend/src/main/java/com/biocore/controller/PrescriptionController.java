package com.biocore.controller;

import com.biocore.dto.ApiResponse;
import com.biocore.dto.PrescriptionRequest;
import com.biocore.entity.Prescription;
import com.biocore.service.PrescriptionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prescriptions")
@RequiredArgsConstructor
public class PrescriptionController {

    private final PrescriptionService prescriptionService;

    @PostMapping
    @PreAuthorize("hasAnyRole('DOCTOR', 'ADMIN')")
    public ResponseEntity<ApiResponse<Prescription>> create(@Valid @RequestBody PrescriptionRequest req) {
        try {
            return ResponseEntity.status(201).body(ApiResponse.ok("Receta generada", prescriptionService.create(req)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Prescription>> getById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(ApiResponse.ok(prescriptionService.getById(id)));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<ApiResponse<List<Prescription>>> getByPatient(@PathVariable Long patientId) {
        return ResponseEntity.ok(ApiResponse.ok(prescriptionService.getByPatient(patientId)));
    }

    @GetMapping("/pharmacy")
    @PreAuthorize("hasAnyRole('PHARMACIST', 'ADMIN')")
    public ResponseEntity<ApiResponse<List<Prescription>>> getPendingForPharmacy() {
        return ResponseEntity.ok(ApiResponse.ok(prescriptionService.getPending()));
    }

    /** CU8: Despachar medicamentos (RN-F01, RN-F02) */
    @PutMapping("/{id}/dispatch")
    @PreAuthorize("hasAnyRole('PHARMACIST', 'ADMIN')")
    public ResponseEntity<ApiResponse<Prescription>> dispatch(@PathVariable Long id,
                                                               @RequestBody List<Long> itemIds) {
        try {
            return ResponseEntity.ok(ApiResponse.ok("Medicamentos despachados", prescriptionService.dispatch(id, itemIds)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}
