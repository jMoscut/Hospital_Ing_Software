package com.biocore.dto;

import com.biocore.entity.Patient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private Long insuranceId;
    private String insuranceName;
    private Double discountPercentage;
    private boolean active;
    private LocalDateTime createdAt;

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
                .active(p.isActive())
                .createdAt(p.getCreatedAt())
                .build();
        if (p.getInsurance() != null) {
            dto.setInsuranceId(p.getInsurance().getId());
            dto.setInsuranceName(p.getInsurance().getName().name());
            dto.setDiscountPercentage(p.getInsurance().getDiscountPercentage().doubleValue());
        }
        return dto;
    }
}
