package com.biocore.dto;

import com.biocore.entity.User;
import com.biocore.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String specialty;
    private String collegiateNumber;
    private Role role;
    private boolean active;
    private LocalDateTime createdAt;
    private String assignedClinic;
    private Long assignedClinicId;

    public static UserDTO from(User u) {
        return UserDTO.builder()
                .id(u.getId())
                .firstName(u.getFirstName())
                .lastName(u.getLastName())
                .username(u.getUsername())
                .email(u.getEmail())
                .specialty(u.getSpecialty())
                .collegiateNumber(u.getCollegiateNumber())
                .role(u.getRole())
                .active(u.isActive())
                .createdAt(u.getCreatedAt())
                .build();
    }
}
