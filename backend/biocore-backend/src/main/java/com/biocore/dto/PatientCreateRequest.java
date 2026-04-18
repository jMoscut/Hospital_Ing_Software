package com.biocore.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.time.LocalDate;

@Data
public class PatientCreateRequest {
    /** RN-01: 13 dígitos numéricos */
    @NotBlank
    @Pattern(regexp = "\\d{13}", message = "El DPI debe contener exactamente 13 dígitos numéricos")
    private String dpi;

    @NotBlank private String firstName;
    @NotBlank private String lastName;
    private String address;
    private String phone;
    private String emergencyContact;
    private String emergencyPhone;
    private String email;
    private Long insuranceId;
    private String insuranceNumber;

    /** FA02 CU 00 / FA01 CU 01: Fecha de nacimiento */
    private LocalDate birthDate;

    /**
     * FA02 CU 00 (auto-registro): El paciente elige su propio usuario.
     * FA01 CU 01 (registro presencial): Si no se provee, el sistema usará el DPI como usuario.
     * Si es null/blank → no se crea cuenta de portal.
     */
    private String username;

    /**
     * FA02 CU 00 (auto-registro): Contraseña elegida por el paciente. RN-P001.
     * FA01 CU 01 (registro presencial): Si no se provee, el sistema genera contraseña temporal. RN-P003.
     */
    private String password;

    /**
     * FA01 CU 01: true = el personal de salud está registrando al paciente
     * y el sistema debe generar contraseña temporal y crear cuenta automáticamente.
     */
    private boolean createAccount = false;
}
