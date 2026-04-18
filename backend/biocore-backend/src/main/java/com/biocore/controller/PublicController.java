package com.biocore.controller;

import com.biocore.dto.ApiResponse;
import com.biocore.dto.PatientCreateRequest;
import com.biocore.dto.PatientDTO;
import com.biocore.entity.Insurance;
import com.biocore.entity.User;
import com.biocore.repository.InsuranceRepository;
import com.biocore.repository.UserRepository;
import com.biocore.service.PatientService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

/**
 * Endpoints públicos (sin autenticación) + cambio de contraseña autenticado.
 * /api/public/** está en la whitelist del SecurityConfig.
 */
@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
public class PublicController {

    private final PatientService patientService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final InsuranceRepository insuranceRepository;

    /** Listado de aseguradoras para el formulario de registro público */
    @GetMapping("/insurances")
    public ResponseEntity<ApiResponse<List<Insurance>>> getInsurances() {
        return ResponseEntity.ok(ApiResponse.ok(insuranceRepository.findAll()));
    }

    /** Verificar si ya existe un paciente por DPI (para el formulario de registro) */
    @GetMapping("/patients/dpi/{dpi}")
    public ResponseEntity<ApiResponse<PatientDTO>> checkByDpi(@PathVariable String dpi) {
        return patientService.getByDpi(dpi)
                .map(p -> ResponseEntity.ok(ApiResponse.ok(p)))
                .orElse(ResponseEntity.status(404).body(ApiResponse.error("No existe paciente con DPI: " + dpi)));
    }

    /**
     * FA02 CU 00: Auto-registro del paciente en el portal.
     * Crea perfil de paciente + cuenta de usuario (rol PATIENT) con contraseña elegida.
     */
    @PostMapping("/patients/register")
    public ResponseEntity<ApiResponse<PatientDTO>> register(@Valid @RequestBody PatientCreateRequest req) {
        try {
            // FA02: el paciente proporciona su propio usuario y contraseña
            if (req.getUsername() == null || req.getUsername().isBlank()) {
                return ResponseEntity.badRequest().body(ApiResponse.error("Debe elegir un nombre de usuario."));
            }
            if (req.getPassword() == null || req.getPassword().isBlank()) {
                return ResponseEntity.badRequest().body(ApiResponse.error("Debe establecer una contraseña."));
            }
            // RN-P001: contraseña mín 8 chars, 1 mayúscula, 1 número
            if (!req.getPassword().matches(".*[A-Z].*") || !req.getPassword().matches(".*[0-9].*") || req.getPassword().length() < 8) {
                return ResponseEntity.badRequest().body(ApiResponse.error(
                        "La contraseña debe tener mínimo 8 caracteres, al menos una mayúscula y un número (RN-P001)."));
            }
            PatientDTO dto = patientService.create(req);
            return ResponseEntity.status(201).body(
                    ApiResponse.ok("Registro exitoso. Su código de paciente es: " + dto.getPatientCode(), dto));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    /**
     * RN-P003: Cambiar contraseña (requiere estar autenticado).
     * Disponible en /api/public/** pero requiere token válido en header.
     */
    @PutMapping("/change-password")
    public ResponseEntity<ApiResponse<Void>> changePassword(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody ChangePasswordRequest req) {
        try {
            User user = userRepository.findByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            if (!passwordEncoder.matches(req.getCurrentPassword(), user.getPassword())) {
                return ResponseEntity.badRequest().body(ApiResponse.error("Contraseña actual incorrecta."));
            }
            if (!req.getNewPassword().matches(".*[A-Z].*") || !req.getNewPassword().matches(".*[0-9].*") || req.getNewPassword().length() < 8) {
                return ResponseEntity.badRequest().body(ApiResponse.error(
                        "La nueva contraseña debe tener mínimo 8 caracteres, al menos una mayúscula y un número."));
            }
            user.setPassword(passwordEncoder.encode(req.getNewPassword()));
            user.setMustChangePassword(false);
            userRepository.save(user);
            return ResponseEntity.ok(ApiResponse.ok("Contraseña actualizada exitosamente.", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @Data
    static class ChangePasswordRequest {
        private String currentPassword;
        private String newPassword;
    }
}
