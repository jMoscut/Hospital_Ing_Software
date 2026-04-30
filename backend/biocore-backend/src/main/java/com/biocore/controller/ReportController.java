package com.biocore.controller;

import com.biocore.dto.ApiResponse;
import com.biocore.dto.DashboardDTO;
import com.biocore.dto.PatientDTO;
import com.biocore.entity.Payment;
import com.biocore.entity.Patient;
import com.biocore.entity.Ticket;
import com.biocore.repository.LabOrderRepository;
import com.biocore.repository.PatientRepository;
import com.biocore.repository.PaymentRepository;
import com.biocore.repository.TicketRepository;
import com.biocore.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;
    private final PatientRepository patientRepository;
    private final TicketRepository ticketRepository;
    private final PaymentRepository paymentRepository;

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<DashboardDTO>> getDashboard() {
        return ResponseEntity.ok(ApiResponse.ok(reportService.getDashboard()));
    }

    /**
     * Búsqueda de expediente por código PAT-XXXX, DPI (13 dígitos) o nombre.
     * Devuelve lista cuando es búsqueda por nombre para que el frontend seleccione.
     */
    @GetMapping("/expedient/search")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR', 'HEALTH_STAFF', 'NURSE')")
    public ResponseEntity<ApiResponse<?>> searchExpedient(@RequestParam String q) {
        String trimmed = q.trim();

        // By patient code
        if (trimmed.toUpperCase().startsWith("PAT-")) {
            Optional<Patient> found = patientRepository.findByPatientCode(trimmed.toUpperCase());
            if (found.isPresent()) return ResponseEntity.ok(ApiResponse.ok(buildExpedient(found.get())));
            return ResponseEntity.status(404).body(ApiResponse.error("No existe paciente con código: " + trimmed));
        }

        // By DPI (13 digits)
        if (trimmed.matches("\\d{13}")) {
            Optional<Patient> found = patientRepository.findByDpi(trimmed);
            if (found.isPresent()) return ResponseEntity.ok(ApiResponse.ok(buildExpedient(found.get())));
            return ResponseEntity.status(404).body(ApiResponse.error("No existe paciente con DPI: " + trimmed));
        }

        // By name → return list (anonymized: code + name only)
        List<Patient> matches = patientRepository.search(trimmed);
        if (matches.isEmpty()) {
            return ResponseEntity.status(404).body(ApiResponse.error("No se encontraron pacientes con: " + trimmed));
        }
        List<Map<String, Object>> list = matches.stream().map(p -> {
            Map<String, Object> m = new HashMap<>();
            m.put("id", p.getId());
            m.put("patientCode", p.getPatientCode());
            m.put("firstName", p.getFirstName());
            m.put("lastName", p.getLastName());
            m.put("dpi", p.getDpi());
            return m;
        }).toList();
        return ResponseEntity.ok(ApiResponse.ok(list));
    }

    /** Keep backward-compatible endpoint */
    @GetMapping("/patient/{patientCode}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR', 'HEALTH_STAFF', 'NURSE')")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getPatientExpedient(@PathVariable String patientCode) {
        return patientRepository.findByPatientCode(patientCode)
                .map(p -> ResponseEntity.ok(ApiResponse.<Map<String, Object>>ok(buildExpedient(p))))
                .orElse(ResponseEntity.status(404).body(ApiResponse.error("Paciente no encontrado: " + patientCode)));
    }

    // ── Statistical reports (anonymized — no patient names in rows) ─────────

    @GetMapping("/patients-by-area")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getPatientsPerArea(
            @RequestParam(defaultValue = "day") String period) {
        return ResponseEntity.ok(ApiResponse.ok(reportService.getPatientsPerArea(period)));
    }

    @GetMapping("/pharmacy-sales")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getPharmacySales(
            @RequestParam(defaultValue = "day") String period) {
        return ResponseEntity.ok(ApiResponse.ok(reportService.getPharmacySales(period)));
    }

    @GetMapping("/doctor-productivity")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getDoctorProductivity(
            @RequestParam(defaultValue = "day") String period) {
        return ResponseEntity.ok(ApiResponse.ok(reportService.getDoctorProductivity(period)));
    }

    @GetMapping("/lab-exams")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getLabExams(
            @RequestParam(defaultValue = "day") String period) {
        return ResponseEntity.ok(ApiResponse.ok(reportService.getLabExams(period)));
    }

    // ────────────────────────────────────────────────────────────────────────

    private Map<String, Object> buildExpedient(Patient patient) {
        Map<String, Object> expedient = new HashMap<>();
        expedient.put("patient", PatientDTO.from(patient));
        expedient.put("tickets", ticketRepository.findByPatientId(patient.getId()));
        expedient.put("payments", paymentRepository.findByPatientIdOrderByCreatedAtDesc(patient.getId()));
        return expedient;
    }
}
