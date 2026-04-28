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

    @GetMapping("/available-slots")
    public ResponseEntity<ApiResponse<List<String>>> getAvailableSlots(
            @RequestParam Long clinicId, @RequestParam String date) {
        try {
            return ResponseEntity.ok(ApiResponse.ok(
                    appointmentService.getAvailableSlots(clinicId, LocalDate.parse(date))));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> book(@RequestBody BookRequest req) {
        try {
            LocalDate date = (req.getScheduledDate() != null && !req.getScheduledDate().isBlank())
                    ? LocalDate.parse(req.getScheduledDate()) : LocalDate.now();
        Map<String, Object> result = appointmentService.book(
                    req.getPatientId(), req.getClinicId(), req.getType(),
                    date, req.getScheduledTime(), req.getNotes(), req.getLabExamId());
            return ResponseEntity.status(201).body(ApiResponse.ok("Cita agendada. Presente el voucher en Caja.", result));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    /** Cashier looks up appointment by voucher code before payment */
    @GetMapping("/voucher/{code}")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getByVoucher(@PathVariable String code) {
        try {
            return ResponseEntity.ok(ApiResponse.ok(appointmentService.getByVoucherCode(code)));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(ApiResponse.error(e.getMessage()));
        }
    }

    /** Cashier confirms payment → ticket enters queue */
    @PostMapping("/{id}/confirm-payment")
    public ResponseEntity<ApiResponse<Map<String, Object>>> confirmPayment(
            @PathVariable Long id, @RequestBody ConfirmPaymentRequest req) {
        try {
            return ResponseEntity.ok(ApiResponse.ok("Pago confirmado. El turno ha sido generado.",
                    appointmentService.confirmPayment(id, req.getPaymentMethod())));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getByPatient(
            @PathVariable Long patientId) {
        return ResponseEntity.ok(ApiResponse.ok(appointmentService.getByPatient(patientId)));
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getByDoctor(
            @PathVariable Long doctorId,
            @RequestParam(defaultValue = "") String date) {
        try {
            LocalDate d = date.isBlank() ? LocalDate.now() : LocalDate.parse(date);
            return ResponseEntity.ok(ApiResponse.ok(appointmentService.getByDoctorAndDate(doctorId, d)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    /** All appointments assigned to a doctor across all dates (for calendar view). */
    @GetMapping("/doctor/{doctorId}/all")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getAllByDoctor(
            @PathVariable Long doctorId) {
        return ResponseEntity.ok(ApiResponse.ok(appointmentService.getAllByDoctor(doctorId)));
    }

    /** Reserve a slot for 10 minutes while patient completes payment */
    @PostMapping("/reserve")
    public ResponseEntity<ApiResponse<Map<String, Object>>> reserve(@RequestBody ReserveRequest req) {
        try {
            LocalDate date = LocalDate.parse(req.getDate());
            Map<String, Object> result = appointmentService.reserve(
                    req.getPatientId(), req.getClinicId(), date, req.getTime());
            return ResponseEntity.ok(ApiResponse.ok("Horario reservado por 10 minutos.", result));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    /** Cancel/release a slot reservation */
    @DeleteMapping("/reserve/{id}")
    public ResponseEntity<ApiResponse<Void>> cancelReservation(@PathVariable Long id) {
        try {
            appointmentService.cancelReservation(id);
            return ResponseEntity.ok(ApiResponse.ok("Reservación cancelada.", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @Data static class ReserveRequest {
        private Long patientId;
        private Long clinicId;
        private String date;
        private String time;
    }

    @Data static class BookRequest {
        private Long patientId;
        private Long clinicId;
        private String type;
        private String scheduledDate;
        private String scheduledTime;
        private String notes;
        private Long labExamId;
    }

    @Data static class ConfirmPaymentRequest {
        private String paymentMethod;
        private String amount;
    }
}
