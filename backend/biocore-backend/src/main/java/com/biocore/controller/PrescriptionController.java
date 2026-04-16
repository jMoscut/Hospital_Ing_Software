package com.biocore.controller;

import com.biocore.dto.ApiResponse;
import com.biocore.dto.PrescriptionDTO;
import com.biocore.dto.PrescriptionRequest;
import com.biocore.service.PrescriptionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/prescriptions")
@RequiredArgsConstructor
public class PrescriptionController {

    private final PrescriptionService prescriptionService;

    @PostMapping
    @PreAuthorize("hasAnyRole('DOCTOR', 'ADMIN')")
    public ResponseEntity<ApiResponse<PrescriptionDTO>> create(@Valid @RequestBody PrescriptionRequest req) {
        try {
            return ResponseEntity.status(201).body(
                    ApiResponse.ok("Receta generada", PrescriptionDTO.from(prescriptionService.create(req))));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PrescriptionDTO>> getById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(ApiResponse.ok(PrescriptionDTO.from(prescriptionService.getById(id))));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<ApiResponse<List<PrescriptionDTO>>> getByPatient(@PathVariable Long patientId) {
        List<PrescriptionDTO> dtos = prescriptionService.getByPatient(patientId)
                .stream().map(PrescriptionDTO::from).collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.ok(dtos));
    }

    @GetMapping("/pharmacy")
    @PreAuthorize("hasAnyRole('PHARMACIST', 'ADMIN')")
    public ResponseEntity<ApiResponse<List<PrescriptionDTO>>> getPendingForPharmacy() {
        List<PrescriptionDTO> dtos = prescriptionService.getPending()
                .stream().map(PrescriptionDTO::from).collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.ok(dtos));
    }

    /** CU8: Despachar medicamentos (RN-F01, RN-F02) */
    @PutMapping("/{id}/dispatch")
    @PreAuthorize("hasAnyRole('PHARMACIST', 'ADMIN')")
    public ResponseEntity<ApiResponse<PrescriptionDTO>> dispatch(@PathVariable Long id,
                                                                  @RequestBody List<Long> itemIds) {
        try {
            return ResponseEntity.ok(ApiResponse.ok("Medicamentos despachados",
                    PrescriptionDTO.from(prescriptionService.dispatch(id, itemIds))));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}
