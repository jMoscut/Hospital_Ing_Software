package com.biocore.dto;

import com.biocore.enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserCreateRequest {
    @NotBlank private String firstName;
    @NotBlank private String lastName;
    @NotBlank private String username;
    @NotBlank private String password;
    @Email @NotBlank private String email;
    private String specialty;
    private String collegiateNumber;
    @NotNull private Role role;
}
