package com.biocore.controller;

import com.biocore.dto.ApiResponse;
import com.biocore.dto.PharmacySaleDTO;
import com.biocore.dto.PharmacySaleRequest;
import com.biocore.enums.PaymentMethod;
import com.biocore.repository.PharmacySaleRepository;
import com.biocore.service.PharmacySaleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pharmacy/sales")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('PHARMACIST', 'ADMIN')")
public class PharmacySaleController {

    private final PharmacySaleService saleService;
    private final PharmacySaleRepository saleRepository;

    @GetMapping("/patient/{patientId}")
    @PreAuthorize("hasAnyRole('PHARMACIST', 'ADMIN', 'DOCTOR', 'HEALTH_STAFF', 'NURSE', 'PATIENT')")
    public ResponseEntity<ApiResponse<List<PharmacySaleDTO>>> getByPatient(@PathVariable Long patientId) {
        List<PharmacySaleDTO> sales = saleRepository.findByPatientIdOrderByCreatedAtDesc(patientId)
                .stream().map(PharmacySaleDTO::from).toList();
        return ResponseEntity.ok(ApiResponse.ok(sales));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<PharmacySaleDTO>> reserve(@RequestBody PharmacySaleRequest req) {
        try {
            return ResponseEntity.status(201).body(
                    ApiResponse.ok("Venta reservada", PharmacySaleDTO.from(saleService.reserve(req))));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PharmacySaleDTO>> getById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(ApiResponse.ok(PharmacySaleDTO.from(saleService.getById(id))));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<ApiResponse<PharmacySaleDTO>> cancel(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(ApiResponse.ok("Venta cancelada", PharmacySaleDTO.from(saleService.cancel(id))));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/{id}/complete")
    public ResponseEntity<ApiResponse<PharmacySaleDTO>> complete(
            @PathVariable Long id,
            @RequestParam PaymentMethod method,
            @RequestParam(required = false) Long patientId) {
        try {
            return ResponseEntity.ok(ApiResponse.ok("Pago completado",
                    PharmacySaleDTO.from(saleService.complete(id, method, patientId))));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}
