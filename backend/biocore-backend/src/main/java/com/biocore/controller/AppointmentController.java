package com.biocore.controller;

import com.biocore.dto.ApiResponse;
import com.biocore.service.AppointmentService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    /**
     * Returns available (not yet booked) time slots for a given clinic and date.
     * Used by the patient portal calendar to disable already-taken slots.
     */
    @GetMapping("/available-slots")
    public ResponseEntity<ApiResponse<List<String>>> getAvailableSlots(
            @RequestParam Long clinicId,
            @RequestParam String date) {
        try {
            LocalDate localDate = LocalDate.parse(date);
            List<String> slots = appointmentService.getAvailableSlots(clinicId, localDate);
            return ResponseEntity.ok(ApiResponse.ok(slots));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> book(@RequestBody BookRequest req) {
        try {
            LocalDate date = LocalDate.parse(req.getScheduledDate());
            Map<String, Object> result = appointmentService.book(
                    req.getPatientId(), req.getClinicId(), req.getType(),
                    date, req.getScheduledTime(), req.getNotes());
            return ResponseEntity.status(201).body(ApiResponse.ok("Cita agendada", result));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/{id}/confirm-payment")
    public ResponseEntity<ApiResponse<Map<String, Object>>> confirmPayment(
            @PathVariable Long id,
            @RequestBody ConfirmPaymentRequest req) {
        try {
            Map<String, Object> result = appointmentService.confirmPayment(
                    id, req.getPaymentMethod(), req.getAmount());
            return ResponseEntity.ok(ApiResponse.ok("Pago confirmado", result));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getByPatient(
            @PathVariable Long patientId) {
        return ResponseEntity.ok(ApiResponse.ok(appointmentService.getByPatient(patientId)));
    }

    @Data
    static class BookRequest {
        private Long patientId;
        private Long clinicId;
        private String type;
        private String scheduledDate;
        private String scheduledTime;
        private String notes;
    }

    @Data
    static class ConfirmPaymentRequest {
        private String paymentMethod;
        private String amount;
    }
}
