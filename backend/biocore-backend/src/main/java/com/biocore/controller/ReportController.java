package com.biocore.controller;

import com.biocore.dto.ApiResponse;
import com.biocore.dto.DashboardDTO;
import com.biocore.dto.PatientDTO;
import com.biocore.entity.Payment;
import com.biocore.entity.Ticket;
import com.biocore.repository.PatientRepository;
import com.biocore.repository.PaymentRepository;
import com.biocore.repository.TicketRepository;
import com.biocore.service.PatientService;
import com.biocore.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class ReportController {

    private final ReportService reportService;
    private final PatientService patientService;
    private final PatientRepository patientRepository;
    private final TicketRepository ticketRepository;
    private final PaymentRepository paymentRepository;

    /** CU5: Dashboard en tiempo real (RN-R03) */
    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<DashboardDTO>> getDashboard() {
        return ResponseEntity.ok(ApiResponse.ok(reportService.getDashboard()));
    }

    /** CU5 FA01: Buscar expediente de paciente por código único (RN-R01) */
    @GetMapping("/patient/{patientCode}")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getPatientExpedient(@PathVariable String patientCode) {
        return patientRepository.findByPatientCode(patientCode).map(patient -> {
            Map<String, Object> expedient = new HashMap<>();
            // RN-R02: No se incluyen datos nominativos en estadísticas
            expedient.put("patient", PatientDTO.from(patient));
            expedient.put("tickets", ticketRepository.findByPatientId(patient.getId()));
            expedient.put("payments", paymentRepository.findByPatientIdOrderByCreatedAtDesc(patient.getId()));
            return ResponseEntity.ok(ApiResponse.<Map<String, Object>>ok(expedient));
        }).orElse(ResponseEntity.status(404).body(ApiResponse.error("Paciente no encontrado con código: " + patientCode)));
    }

    @GetMapping("/tickets/clinic/{clinicId}")
    public ResponseEntity<ApiResponse<List<Ticket>>> getByClinic(@PathVariable Long clinicId) {
        return ResponseEntity.ok(ApiResponse.ok(ticketRepository.findByClinicId(clinicId)));
    }

    @GetMapping("/payments")
    public ResponseEntity<ApiResponse<List<Payment>>> getAllPayments() {
        return ResponseEntity.ok(ApiResponse.ok(paymentRepository.findAll()));
    }
}
