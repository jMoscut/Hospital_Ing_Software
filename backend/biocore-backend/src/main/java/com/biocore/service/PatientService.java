package com.biocore.service;

import com.biocore.dto.PatientCreateRequest;
import com.biocore.dto.PatientDTO;
import com.biocore.entity.Insurance;
import com.biocore.entity.Patient;
import com.biocore.entity.User;
import com.biocore.enums.Role;
import com.biocore.repository.InsuranceRepository;
import com.biocore.repository.PatientRepository;
import com.biocore.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;
    private final InsuranceRepository insuranceRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Transactional(readOnly = true)
    public List<PatientDTO> getAll() {
        return patientRepository.findAll().stream()
                .map(PatientDTO::from)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public PatientDTO getById(Long id) {
        Patient p = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado con ID: " + id));
        PatientDTO dto = PatientDTO.from(p);
        if (p.getUserId() != null) {
            userRepository.findById(p.getUserId())
                    .ifPresent(u -> dto.setUsername(u.getUsername()));
        }
        return dto;
    }

    @Transactional(readOnly = true)
    public Optional<PatientDTO> getByDpi(String dpi) {
        return patientRepository.findByDpi(dpi).map(PatientDTO::from);
    }

    @Transactional(readOnly = true)
    public List<PatientDTO> search(String query) {
        return patientRepository.search(query).stream()
                .map(PatientDTO::from)
                .collect(Collectors.toList());
    }

    @Transactional
    public PatientDTO create(PatientCreateRequest req) {
        // RN-01: validación de DPI
        if (patientRepository.existsByDpi(req.getDpi())) {
            throw new RuntimeException("Ya existe un paciente con el DPI: " + req.getDpi());
        }

        Insurance insurance = null;
        if (req.getInsuranceId() != null) {
            insurance = insuranceRepository.findById(req.getInsuranceId())
                    .orElseThrow(() -> new RuntimeException("Seguro no encontrado"));
        }

        // RN-04: Generar código único correlativo
        int nextNum = patientRepository.findMaxPatientCodeNumber() + 1;
        String patientCode = String.format("PAT-%04d", nextNum);

        Patient patient = Patient.builder()
                .patientCode(patientCode)
                .dpi(req.getDpi())
                .firstName(req.getFirstName())
                .lastName(req.getLastName())
                .address(req.getAddress())
                .phone(req.getPhone())
                .emergencyContact(req.getEmergencyContact())
                .emergencyPhone(req.getEmergencyPhone())
                .email(req.getEmail())
                .birthDate(req.getBirthDate())
                .insurance(insurance)
                .insuranceNumber(req.getInsuranceNumber())
                .build();

        // ── Crear cuenta de portal ──────────────────────────────────────────────
        String tempPassword = null;

        boolean shouldCreateAccount = (req.getUsername() != null && !req.getUsername().isBlank())
                || req.isCreateAccount();

        if (shouldCreateAccount) {
            // Determinar username: si no viene del form, usar el DPI
            String username = (req.getUsername() != null && !req.getUsername().isBlank())
                    ? req.getUsername()
                    : req.getDpi();

            if (userRepository.existsByUsername(username)) {
                throw new RuntimeException("El nombre de usuario '" + username + "' ya está en uso.");
            }

            // Determinar contraseña: si no viene, generar temporal (RN-P003)
            boolean isTempPassword = (req.getPassword() == null || req.getPassword().isBlank());
            String rawPassword = isTempPassword ? generateTempPassword() : req.getPassword();

            User user = User.builder()
                    .firstName(req.getFirstName())
                    .lastName(req.getLastName())
                    .username(username)
                    .email(req.getEmail() != null ? req.getEmail() : "")
                    .password(passwordEncoder.encode(rawPassword))
                    .role(Role.PATIENT)
                    .mustChangePassword(isTempPassword)
                    .build();

            User savedUser = userRepository.save(user);
            patient.setUserId(savedUser.getId());

            if (isTempPassword) {
                tempPassword = rawPassword;
                // Enviar credenciales por correo si tiene email
                if (req.getEmail() != null && !req.getEmail().isBlank()) {
                    emailService.sendWelcomeCredentials(req.getEmail(), req.getFirstName(), username, rawPassword);
                }
            }
        }
        // ───────────────────────────────────────────────────────────────────────

        Patient savedPatient = patientRepository.save(patient);
        PatientDTO dto = PatientDTO.from(savedPatient);
        // Devolver contraseña temporal solo en el momento de creación (no se guarda en claro)
        dto.setTempPassword(tempPassword);
        return dto;
    }

    @Transactional
    public PatientDTO update(Long id, PatientCreateRequest req) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado con ID: " + id));

        patient.setFirstName(req.getFirstName());
        patient.setLastName(req.getLastName());
        patient.setAddress(req.getAddress());
        patient.setPhone(req.getPhone());
        patient.setEmergencyContact(req.getEmergencyContact());
        patient.setEmergencyPhone(req.getEmergencyPhone());
        patient.setEmail(req.getEmail());
        if (req.getBirthDate() != null) {
            patient.setBirthDate(req.getBirthDate());
        }

        if (req.getInsuranceId() != null) {
            Insurance insurance = insuranceRepository.findById(req.getInsuranceId())
                    .orElseThrow(() -> new RuntimeException("Seguro no encontrado"));
            patient.setInsurance(insurance);
        } else {
            patient.setInsurance(null);
        }
        patient.setInsuranceNumber(req.getInsuranceNumber());

        return PatientDTO.from(patientRepository.save(patient));
    }

    /** RN-P001: mín 8 chars, 1 mayúscula, 1 número. RN-P003: contraseña temporal */
    private String generateTempPassword() {
        String upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String lower = "abcdefghijklmnopqrstuvwxyz";
        String digits = "0123456789";
        Random rnd = new Random();

        StringBuilder sb = new StringBuilder();
        // Garantizar al menos 1 mayúscula y 2 dígitos (RN-P001)
        sb.append(upper.charAt(rnd.nextInt(upper.length())));
        sb.append(digits.charAt(rnd.nextInt(digits.length())));
        sb.append(digits.charAt(rnd.nextInt(digits.length())));
        // Completar hasta 8 caracteres con minúsculas
        for (int i = 0; i < 5; i++) {
            sb.append(lower.charAt(rnd.nextInt(lower.length())));
        }
        // Mezclar
        List<Character> chars = new ArrayList<>();
        for (char c : sb.toString().toCharArray()) chars.add(c);
        Collections.shuffle(chars);
        StringBuilder result = new StringBuilder();
        for (char c : chars) result.append(c);
        return result.toString();
    }
}
