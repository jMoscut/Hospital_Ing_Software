package com.biocore.service;

import com.biocore.dto.AssignClinicRequest;
import com.biocore.dto.UserCreateRequest;
import com.biocore.dto.UserDTO;
import com.biocore.entity.Clinic;
import com.biocore.entity.DoctorClinicAssignment;
import com.biocore.entity.User;
import com.biocore.enums.Role;
import com.biocore.repository.ClinicRepository;
import com.biocore.repository.DoctorClinicAssignmentRepository;
import com.biocore.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final ClinicRepository clinicRepository;
    private final DoctorClinicAssignmentRepository assignmentRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public List<UserDTO> getAll() {
        return userRepository.findAll().stream()
                .map(u -> enrichWithClinic(UserDTO.from(u)))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public UserDTO getById(Long id) {
        User u = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado: " + id));
        return enrichWithClinic(UserDTO.from(u));
    }

    @Transactional
    public UserDTO create(UserCreateRequest req) {
        if (userRepository.existsByUsername(req.getUsername())) {
            throw new RuntimeException("El nombre de usuario ya existe: " + req.getUsername());
        }
        // RN-M05: Unicidad de colegiado
        if (req.getCollegiateNumber() != null && !req.getCollegiateNumber().isBlank()
                && userRepository.existsByCollegiateNumber(req.getCollegiateNumber())) {
            throw new RuntimeException("El número de colegiado ya está registrado: " + req.getCollegiateNumber());
        }

        User user = User.builder()
                .firstName(req.getFirstName())
                .lastName(req.getLastName())
                .username(req.getUsername())
                .password(passwordEncoder.encode(req.getPassword()))
                .email(req.getEmail())
                .specialty(req.getSpecialty())
                .collegiateNumber(req.getCollegiateNumber())
                .role(req.getRole())
                .active(true)
                .build();

        return UserDTO.from(userRepository.save(user));
    }

    @Transactional
    public UserDTO update(Long id, UserCreateRequest req) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado: " + id));

        user.setFirstName(req.getFirstName());
        user.setLastName(req.getLastName());
        user.setEmail(req.getEmail());
        user.setSpecialty(req.getSpecialty());
        user.setRole(req.getRole());

        if (req.getPassword() != null && !req.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(req.getPassword()));
        }

        return UserDTO.from(userRepository.save(user));
    }

    @Transactional
    public void delete(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado: " + id));
        user.setActive(false);
        userRepository.save(user);
    }

    @Transactional
    public UserDTO assignClinic(AssignClinicRequest req) {
        User doctor = userRepository.findById(req.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Médico no encontrado"));
        Clinic clinic = clinicRepository.findById(req.getClinicId())
                .orElseThrow(() -> new RuntimeException("Clínica no encontrada"));

        // RN-M02: Un médico solo puede estar en una clínica activa a la vez
        if (assignmentRepository.existsByDoctorIdAndActiveTrue(req.getDoctorId())) {
            throw new RuntimeException("El médico ya está asignado a una clínica activa. Desasígne primero.");
        }

        // RN-M01: La clínica no puede exceder su capacidad
        long current = assignmentRepository.countByClinicIdAndActiveTrue(req.getClinicId());
        if (current >= clinic.getMaxDoctors()) {
            throw new RuntimeException("La clínica ha alcanzado su capacidad máxima de " + clinic.getMaxDoctors() + " médicos");
        }

        DoctorClinicAssignment assignment = DoctorClinicAssignment.builder()
                .doctor(doctor)
                .clinic(clinic)
                .assignedAt(LocalDateTime.now())
                .active(true)
                .build();
        assignmentRepository.save(assignment);

        UserDTO dto = UserDTO.from(doctor);
        dto.setAssignedClinic(clinic.getName());
        dto.setAssignedClinicId(clinic.getId());
        return dto;
    }

    @Transactional
    public void unassignClinic(Long doctorId) {
        assignmentRepository.findByDoctorIdAndActiveTrue(doctorId).ifPresent(a -> {
            a.setActive(false);
            assignmentRepository.save(a);
        });
    }

    public List<UserDTO> getByClinic(Long clinicId) {
        return assignmentRepository.findActiveDoctorsByClinic(clinicId).stream()
                .map(a -> {
                    UserDTO dto = UserDTO.from(a.getDoctor());
                    dto.setAssignedClinic(a.getClinic().getName());
                    dto.setAssignedClinicId(a.getClinic().getId());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    private UserDTO enrichWithClinic(UserDTO dto) {
        if (dto.getRole() == Role.DOCTOR) {
            assignmentRepository.findByDoctorIdAndActiveTrue(dto.getId()).ifPresent(a -> {
                dto.setAssignedClinic(a.getClinic().getName());
                dto.setAssignedClinicId(a.getClinic().getId());
            });
        }
        return dto;
    }
}
