package com.biocore.controller;

import com.biocore.dto.ApiResponse;
import com.biocore.dto.PaymentCreateRequest;
import com.biocore.entity.Payment;
import com.biocore.enums.PaymentMethod;
import com.biocore.service.PaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<ApiResponse<List<Payment>>> getByPatient(@PathVariable Long patientId) {
        return ResponseEntity.ok(ApiResponse.ok(paymentService.getByPatient(patientId)));
    }

    @GetMapping("/pending/{patientId}")
    public ResponseEntity<ApiResponse<List<Payment>>> getPending(@PathVariable Long patientId) {
        return ResponseEntity.ok(ApiResponse.ok(paymentService.getPendingByPatient(patientId)));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('CASHIER', 'ADMIN')")
    public ResponseEntity<ApiResponse<Payment>> create(@Valid @RequestBody PaymentCreateRequest req) {
        try {
            return ResponseEntity.status(201).body(ApiResponse.ok("Orden de pago generada", paymentService.create(req)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    /** CU6: Procesar pago y generar factura */
    @PutMapping("/{id}/process")
    @PreAuthorize("hasAnyRole('CASHIER', 'ADMIN')")
    public ResponseEntity<ApiResponse<Payment>> process(@PathVariable Long id,
                                                         @RequestParam PaymentMethod method) {
        try {
            return ResponseEntity.ok(ApiResponse.ok("Pago procesado. Factura generada.", paymentService.process(id, method)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}
