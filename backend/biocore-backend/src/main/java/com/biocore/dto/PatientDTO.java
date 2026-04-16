package com.biocore.dto;

import com.biocore.entity.Patient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatientDTO {
    private Long id;
    private String patientCode;
    private String dpi;
    private String firstName;
    private String lastName;
    private String address;
    private String phone;
    private String emergencyContact;
    private String emergencyPhone;
    private String email;
    private LocalDate birthDate;
    private Long insuranceId;
    private String insuranceName;
    private Double discountPercentage;
    private boolean active;
    private LocalDateTime createdAt;
    /** true si el paciente tiene cuenta de portal (rol PATIENT) */
    private boolean hasAccount;
    private Long userId;
    /**
     * Solo se popula al crear una cuenta nueva con contraseña temporal (CU 01 FA01).
     * No se persiste — solo para mostrar al personal en el momento del registro.
     */
    private String tempPassword;

    public static PatientDTO from(Patient p) {
        PatientDTO dto = PatientDTO.builder()
                .id(p.getId())
                .patientCode(p.getPatientCode())
                .dpi(p.getDpi())
                .firstName(p.getFirstName())
                .lastName(p.getLastName())
                .address(p.getAddress())
                .phone(p.getPhone())
                .emergencyContact(p.getEmergencyContact())
                .emergencyPhone(p.getEmergencyPhone())
                .email(p.getEmail())
                .birthDate(p.getBirthDate())
                .active(p.isActive())
                .createdAt(p.getCreatedAt())
                .hasAccount(p.getUserId() != null)
                .userId(p.getUserId())
                .build();
        if (p.getInsurance() != null) {
            dto.setInsuranceId(p.getInsurance().getId());
            dto.setInsuranceName(p.getInsurance().getName().name());
            dto.setDiscountPercentage(p.getInsurance().getDiscountPercentage().doubleValue());
        }
        return dto;
    }
}
