package com.biocore.config;

import com.biocore.entity.Clinic;
import com.biocore.entity.Insurance;
import com.biocore.entity.User;
import com.biocore.enums.ClinicType;
import com.biocore.enums.InsuranceName;
import com.biocore.enums.Role;
import com.biocore.repository.ClinicRepository;
import com.biocore.repository.InsuranceRepository;
import com.biocore.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final InsuranceRepository insuranceRepository;
    private final ClinicRepository clinicRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        initAdmin();
        initInsurances();
        initClinics();
    }

    private void initAdmin() {
        if (!userRepository.existsByUsername("admin")) {
            User admin = User.builder()
                    .firstName("Administrador")
                    .lastName("Sistema")
                    .username("admin")
                    .password(passwordEncoder.encode("admin123"))
                    .email("admin@biocore.hospital.gt")
                    .role(Role.ADMIN)
                    .active(true)
                    .build();
            userRepository.save(admin);
            log.info("Admin por defecto creado: admin / admin123");
        }
    }

    private void initInsurances() {
        // RN-P01: El Roble 10%, Universales 20%, G&T 25%
        if (!insuranceRepository.existsByName(InsuranceName.EL_ROBLE)) {
            insuranceRepository.save(Insurance.builder()
                    .name(InsuranceName.EL_ROBLE)
                    .discountPercentage(new BigDecimal("10.00"))
                    .description("Seguro El Roble - Descuento 10%")
                    .build());
        }
        if (!insuranceRepository.existsByName(InsuranceName.UNIVERSALES)) {
            insuranceRepository.save(Insurance.builder()
                    .name(InsuranceName.UNIVERSALES)
                    .discountPercentage(new BigDecimal("20.00"))
                    .description("Seguros Universales - Descuento 20%")
                    .build());
        }
        if (!insuranceRepository.existsByName(InsuranceName.GT)) {
            insuranceRepository.save(Insurance.builder()
                    .name(InsuranceName.GT)
                    .discountPercentage(new BigDecimal("25.00"))
                    .description("Seguros G&T - Descuento 25%")
                    .build());
        }
        log.info("Seguros médicos inicializados");
    }

    private void initClinics() {
        if (clinicRepository.count() == 0) {
            clinicRepository.save(Clinic.builder()
                    .name("Consulta Externa")
                    .type(ClinicType.EXTERNAL_CONSULTATION)
                    .maxDoctors(5)
                    .description("Clínica de consulta externa general")
                    .build());
            clinicRepository.save(Clinic.builder()
                    .name("Medicina General")
                    .type(ClinicType.GENERAL_MEDICINE)
                    .maxDoctors(3)
                    .description("Clínica de medicina general")
                    .build());
            clinicRepository.save(Clinic.builder()
                    .name("Laboratorio")
                    .type(ClinicType.LABORATORY)
                    .maxDoctors(4)
                    .description("Laboratorio clínico")
                    .build());
            clinicRepository.save(Clinic.builder()
                    .name("Farmacia")
                    .type(ClinicType.PHARMACY)
                    .maxDoctors(2)
                    .description("Farmacia del hospital")
                    .build());
            clinicRepository.save(Clinic.builder()
                    .name("Emergencias")
                    .type(ClinicType.EMERGENCY)
                    .maxDoctors(6)
                    .description("Área de emergencias")
                    .build());
            log.info("Clínicas por defecto inicializadas");
        }
    }
}
