package com.biocore.controller;

import com.biocore.dto.ApiResponse;
import com.biocore.dto.PatientCreateRequest;
import com.biocore.dto.TicketDTO;
import com.biocore.service.EmergencyService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/emergency")
@RequiredArgsConstructor
public class EmergencyController {

    private final EmergencyService emergencyService;

    /**
     * CU7: Registrar ingreso de emergencia
     * RN-E01: Personal debe marcar explícitamente como emergencia
     * RN-E02: Prioridad máxima en cola
     */
    @PostMapping("/register")
    @PreAuthorize("hasAnyRole('HEALTH_STAFF', 'NURSE', 'ADMIN')")
    public ResponseEntity<ApiResponse<TicketDTO>> register(@RequestBody EmergencyRequest req) {
        try {
            TicketDTO ticket = emergencyService.registerEmergency(req.getDpi(), req.getMotive(), req.getNewPatient());
            return ResponseEntity.status(201).body(ApiResponse.ok(
                    "Emergencia registrada. Ticket generado con prioridad máxima.", ticket));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @Data
    static class EmergencyRequest {
        private String dpi;
        private String motive;
        private PatientCreateRequest newPatient;
    }
}
