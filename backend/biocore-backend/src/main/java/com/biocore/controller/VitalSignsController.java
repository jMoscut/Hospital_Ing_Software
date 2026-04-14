package com.biocore.controller;

import com.biocore.dto.ApiResponse;
import com.biocore.dto.VitalSignsRequest;
import com.biocore.entity.VitalSigns;
import com.biocore.security.CustomUserDetails;
import com.biocore.service.VitalSignsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/vital-signs")
@RequiredArgsConstructor
public class VitalSignsController {

    private final VitalSignsService vitalSignsService;

    /** RN-03: Registro obligatorio de signos vitales */
    @PostMapping
    @PreAuthorize("hasAnyRole('HEALTH_STAFF', 'NURSE', 'DOCTOR', 'ADMIN')")
    public ResponseEntity<ApiResponse<VitalSigns>> register(@Valid @RequestBody VitalSignsRequest req,
                                                             @AuthenticationPrincipal CustomUserDetails userDetails) {
        try {
            VitalSigns vs = vitalSignsService.register(req, userDetails.getUser().getId());
            return ResponseEntity.status(201).body(ApiResponse.ok("Signos vitales registrados", vs));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/ticket/{ticketId}")
    public ResponseEntity<ApiResponse<VitalSigns>> getByTicket(@PathVariable Long ticketId) {
        Optional<VitalSigns> vs = vitalSignsService.getByTicket(ticketId);
        if (vs.isPresent()) {
            return ResponseEntity.ok(ApiResponse.ok(vs.get()));
        }
        return ResponseEntity.status(404).body(ApiResponse.error("No hay signos vitales para este ticket"));
    }
}
