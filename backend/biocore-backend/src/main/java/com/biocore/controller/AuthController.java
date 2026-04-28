package com.biocore.controller;

import com.biocore.dto.ApiResponse;
import com.biocore.dto.LoginRequest;
import com.biocore.dto.LoginResponse;
import com.biocore.security.CustomUserDetails;
import com.biocore.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /** RN-001: Autenticación obligatoria para usuarios internos */
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        try {
            LoginResponse response = authService.login(request);
            return ResponseEntity.ok(ApiResponse.ok("Login exitoso", response));
        } catch (Exception e) {
            return ResponseEntity.status(401)
                    .body(ApiResponse.error("Usuario o contraseña inválidos. Intente de nuevo."));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails != null) {
            authService.logout(userDetails.getUser().getId());
        }
        return ResponseEntity.ok(ApiResponse.ok("Sesión cerrada exitosamente", null));
    }
}
