package com.biocore.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {
    @NotBlank(message = "Usuario es requerido")
    private String username;

    @NotBlank(message = "Contraseña es requerida")
    private String password;
}
