package com.biocore.service;

import com.biocore.dto.LoginRequest;
import com.biocore.dto.LoginResponse;
import com.biocore.enums.Role;
import com.biocore.repository.PatientRepository;
import com.biocore.security.CustomUserDetails;
import com.biocore.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final PatientRepository patientRepository;

    public LoginResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        String token = jwtUtil.generateToken(userDetails);

        // Si es paciente, obtener su patientId para que el frontend pueda cargar sus datos
        Long patientId = null;
        if (userDetails.getUser().getRole() == Role.PATIENT) {
            patientId = patientRepository.findByUserId(userDetails.getUser().getId())
                    .map(p -> p.getId())
                    .orElse(null);
        }

        return LoginResponse.builder()
                .token(token)
                .username(userDetails.getUsername())
                .role(userDetails.getUser().getRole().name())
                .firstName(userDetails.getUser().getFirstName())
                .lastName(userDetails.getUser().getLastName())
                .userId(userDetails.getUser().getId())
                .patientId(patientId)
                .mustChangePassword(userDetails.getUser().isMustChangePassword())
                .build();
    }
}
