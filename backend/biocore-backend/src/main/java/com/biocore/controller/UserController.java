package com.biocore.controller;

import com.biocore.dto.ApiResponse;
import com.biocore.dto.AssignClinicRequest;
import com.biocore.dto.UserCreateRequest;
import com.biocore.dto.UserDTO;
import com.biocore.security.CustomUserDetails;
import com.biocore.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<UserDTO>>> getAll() {
        return ResponseEntity.ok(ApiResponse.ok(userService.getAll()));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<UserDTO>> getById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(ApiResponse.ok(userService.getById(id)));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<UserDTO>> create(@Valid @RequestBody UserCreateRequest req) {
        try {
            return ResponseEntity.status(201).body(ApiResponse.ok("Usuario creado exitosamente", userService.create(req)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<UserDTO>> update(@PathVariable Long id,
                                                        @Valid @RequestBody UserCreateRequest req) {
        try {
            return ResponseEntity.ok(ApiResponse.ok("Usuario actualizado", userService.update(id, req)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        try {
            userService.delete(id);
            return ResponseEntity.ok(ApiResponse.ok("Usuario desactivado", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    /** CU2: Asignar médico a clínica (RN-M01, RN-M02) */
    @PostMapping("/assign-clinic")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<UserDTO>> assignClinic(@Valid @RequestBody AssignClinicRequest req) {
        try {
            return ResponseEntity.ok(ApiResponse.ok("Médico asignado exitosamente a la clínica", userService.assignClinic(req)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/{id}/unassign-clinic")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> unassignClinic(@PathVariable Long id) {
        userService.unassignClinic(id);
        return ResponseEntity.ok(ApiResponse.ok("Médico desasignado de la clínica", null));
    }

    @GetMapping("/clinic/{clinicId}")
    public ResponseEntity<ApiResponse<List<UserDTO>>> getByClinic(@PathVariable Long clinicId) {
        return ResponseEntity.ok(ApiResponse.ok(userService.getByClinic(clinicId)));
    }

    /** Get current user's own profile — also updates onlineAt heartbeat */
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserDTO>> getMe(
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        try {
            return ResponseEntity.ok(ApiResponse.ok(userService.touchAndGet(userDetails.getUser().getId())));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    /** Clears onlineAt on logout so the user is immediately shown as FUERA_DE_TURNO */
    @DeleteMapping("/me/session")
    public ResponseEntity<ApiResponse<Void>> clearSession(
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        try {
            userService.clearSession(userDetails.getUser().getId());
            return ResponseEntity.ok(ApiResponse.ok(null));
        } catch (Exception e) {
            return ResponseEntity.ok(ApiResponse.ok(null)); // best-effort, never block logout
        }
    }

    /** Doctor toggles their own availability status */
    @PatchMapping("/me/toggle-availability")
    @PreAuthorize("hasAnyRole('DOCTOR', 'ADMIN', 'LAB_TECHNICIAN')")
    public ResponseEntity<ApiResponse<Map<String, Boolean>>> toggleAvailability(
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        try {
            boolean available = userService.toggleAvailability(userDetails.getUser().getId());
            return ResponseEntity.ok(ApiResponse.ok("Disponibilidad actualizada", Map.of("available", available)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    /** Health staff gets doctor availability for a clinic */
    @GetMapping("/doctors/availability")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getDoctorAvailability(
            @RequestParam Long clinicId) {
        return ResponseEntity.ok(ApiResponse.ok(userService.getDoctorAvailabilityByClinic(clinicId)));
    }

    /** All doctors + lab technicians with area and status (for queue monitoring) */
    @GetMapping("/staff/status")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getStaffStatus() {
        return ResponseEntity.ok(ApiResponse.ok(userService.getAllStaffStatus()));
    }
}
