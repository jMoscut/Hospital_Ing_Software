package com.biocore.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private String username;
    private String role;
    private String firstName;
    private String lastName;
    private Long userId;
    /** Poblado solo para rol PATIENT — permite al frontend consultar sus datos */
    private Long patientId;
    /** RN-P003: true si debe cambiar contraseña en el primer inicio de sesión */
    private boolean mustChangePassword;
}
