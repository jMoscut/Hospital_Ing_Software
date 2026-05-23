package com.biocore.controller;

import com.biocore.dto.ApiResponse;
import com.biocore.dto.EmergencyDoctorTicketDTO;
import com.biocore.dto.EmergencyReportDTO;
import com.biocore.dto.TicketDTO;
import com.biocore.entity.EmergencyMedicalReport;
import com.biocore.repository.EmergencyMedicalReportRepository;
import com.biocore.security.CustomUserDetails;
import com.biocore.service.EmergencyService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/emergency")
@RequiredArgsConstructor
public class EmergencyController {

    private final EmergencyService emergencyService;
    private final EmergencyMedicalReportRepository emergencyReportRepository;

    /** CU7: Register emergency — creates ticket PENDING_PAYMENT + URGENT */
    @PostMapping("/register")
    @PreAuthorize("hasAnyRole('HEALTH_STAFF', 'NURSE', 'ADMIN')")
    public ResponseEntity<ApiResponse<Map<String, Object>>> register(@RequestBody RegisterRequest req) {
        try {
            Map<String, Object> result = emergencyService.registerEmergency(
                    req.getDpi(), req.getMotive(),
                    req.getFirstName(), req.getLastName(),
                    req.getPhone(), req.getEmail());
            return ResponseEntity.status(201).body(ApiResponse.ok("Emergencia registrada. Pendiente de pago en caja.", result));
        } catch (Exception e) {
            log.error("Error registrando emergencia: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    /** Register vital signs for an emergency ticket */
    @PostMapping("/vitals/{ticketId}")
    @PreAuthorize("hasAnyRole('HEALTH_STAFF', 'NURSE', 'ADMIN')")
    public ResponseEntity<ApiResponse<Void>> registerVitals(
            @PathVariable Long ticketId, @RequestBody VitalsRequest req) {
        try {
            emergencyService.registerVitals(ticketId,
                    req.getBloodPressure(), req.getHeartRate(),
                    req.getTemperature(), req.getWeight(),
                    req.getHeight(), req.getOxygenSaturation());
            return ResponseEntity.ok(ApiResponse.ok("Signos vitales registrados", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    /** Cashier: list all emergency tickets pending payment */
    @GetMapping("/pending-payments")
    @PreAuthorize("hasAnyRole('CASHIER', 'ADMIN')")
    public ResponseEntity<ApiResponse<List<TicketDTO>>> getPendingPayments() {
        return ResponseEntity.ok(ApiResponse.ok(emergencyService.getPendingPayments()));
    }

    /** Cashier: process emergency payment — amount entered by cashier */
    @PostMapping("/payment/{ticketId}/process")
    @PreAuthorize("hasAnyRole('CASHIER', 'ADMIN')")
    public ResponseEntity<ApiResponse<Map<String, Object>>> processPayment(
            @PathVariable Long ticketId, @RequestBody PaymentRequest req) {
        try {
            return ResponseEntity.ok(ApiResponse.ok("Pago procesado",
                    emergencyService.processPayment(ticketId, req.getAmount(), req.getMethod())));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    /** All emergency reports (for staff reports tab) */
    @GetMapping("/reports")
    @PreAuthorize("hasAnyRole('HEALTH_STAFF', 'NURSE', 'ADMIN', 'CASHIER')")
    public ResponseEntity<ApiResponse<List<EmergencyReportDTO>>> getReports() {
        return ResponseEntity.ok(ApiResponse.ok(emergencyService.getReports()));
    }

    /** Complete patient registration from emergency report — creates user + sends credentials */
    @PutMapping("/reports/{reportId}/register-patient")
    @PreAuthorize("hasAnyRole('HEALTH_STAFF', 'NURSE', 'ADMIN')")
    public ResponseEntity<ApiResponse<EmergencyReportDTO>> completeRegistration(
            @PathVariable Long reportId, @RequestBody CompleteRegistrationRequest req) {
        try {
            return ResponseEntity.ok(ApiResponse.ok("Paciente registrado exitosamente",
                    emergencyService.completeRegistration(reportId,
                            req.getFirstName(), req.getLastName(), req.getDpi(),
                            req.getEmail(), req.getPhone(), req.getAddress(), req.getBirthDate())));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    /** Emergency doctor: today's COMPLETED emergency tickets assigned to them */
    @GetMapping("/my-tickets")
    @PreAuthorize("hasAnyRole('DOCTOR', 'ADMIN')")
    public ResponseEntity<ApiResponse<List<EmergencyDoctorTicketDTO>>> getMyTickets(
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        Long doctorId = userDetails.getUser().getId();
        return ResponseEntity.ok(ApiResponse.ok(emergencyService.getDoctorEmergencyTickets(doctorId)));
    }

    /** Emergency doctor: submit / close the medical report for a ticket */
    @PostMapping("/tickets/{ticketId}/medical-report")
    @PreAuthorize("hasAnyRole('DOCTOR', 'ADMIN')")
    public ResponseEntity<ApiResponse<EmergencyDoctorTicketDTO>> submitMedicalReport(
            @PathVariable Long ticketId,
            @RequestBody MedicalReportRequest req,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        try {
            Long doctorId = userDetails.getUser().getId();
            EmergencyDoctorTicketDTO result = emergencyService.submitMedicalReport(
                    ticketId, doctorId, req.getDiagnosis(), req.getTreatment(), req.getMedications());
            return ResponseEntity.ok(ApiResponse.ok("Reporte cerrado exitosamente", result));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    /** Emergency medical reports for a patient (Diagnósticos tab) */
    @GetMapping("/patient/{patientId}/medical-reports")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR', 'HEALTH_STAFF', 'NURSE', 'PATIENT')")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getPatientMedicalReports(
            @PathVariable Long patientId) {
        List<Map<String, Object>> result = emergencyReportRepository
                .findByTicketPatientIdOrderByCreatedAtDesc(patientId)
                .stream().map(r -> {
                    Map<String, Object> m = new LinkedHashMap<>();
                    m.put("id", r.getId());
                    m.put("ticketId", r.getTicket().getId());
                    m.put("diagnosis", r.getDiagnosis());
                    m.put("treatment", r.getTreatment());
                    m.put("medications", r.getMedications());
                    m.put("doctorName", r.getDoctor().getFirstName() + " " + r.getDoctor().getLastName());
                    m.put("closedAt", r.getClosedAt());
                    m.put("createdAt", r.getCreatedAt());
                    return m;
                }).collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    /** Health staff marks emergency as attended → COMPLETED */
    @PutMapping("/tickets/{ticketId}/mark-attended")
    @PreAuthorize("hasAnyRole('HEALTH_STAFF', 'NURSE', 'DOCTOR', 'ADMIN')")
    public ResponseEntity<ApiResponse<TicketDTO>> markAttended(@PathVariable Long ticketId) {
        try {
            return ResponseEntity.ok(ApiResponse.ok("Emergencia marcada como atendida",
                    emergencyService.markAttended(ticketId)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    // ── Request DTOs ──────────────────────────────────────────────────────────

    @Data static class RegisterRequest {
        private String dpi;
        private String motive;
        private String firstName;
        private String lastName;
        private String phone;
        private String email;
    }

    @Data static class VitalsRequest {
        private String bloodPressure;
        private Integer heartRate;
        private Double temperature;
        private Double weight;
        private Double height;
        private Double oxygenSaturation;
    }

    @Data static class PaymentRequest {
        private BigDecimal amount;
        private String method; // CASH | POS_CARD | DEBIT_CARD | CREDIT_CARD
    }

    @Data static class CompleteRegistrationRequest {
        private String firstName;
        private String lastName;
        private String dpi;
        private String email;
        private String phone;
        private String address;
        private String birthDate;
    }

    @Data static class MedicalReportRequest {
        private String diagnosis;
        private String treatment;
        private String medications;
    }
}
