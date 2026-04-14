package com.biocore.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

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
}
