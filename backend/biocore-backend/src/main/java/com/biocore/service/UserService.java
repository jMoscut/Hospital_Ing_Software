package com.biocore.service;

import com.biocore.dto.AssignClinicRequest;
import com.biocore.dto.UserCreateRequest;
import com.biocore.dto.UserUpdateRequest;
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
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
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

    /** Touch onlineAt then return profile — called from GET /me so doctor portal keeps heartbeat. */
    @Transactional
    public UserDTO touchAndGet(Long id) {
        User u = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado: " + id));
        u.setOnlineAt(java.time.LocalDateTime.now());
        userRepository.save(u);
        return enrichWithClinic(UserDTO.from(u));
    }

    /** Null onlineAt + set available=false on logout so user shows as FUERA_DE_TURNO immediately. */
    @Transactional
    public void clearSession(Long id) {
        userRepository.findById(id).ifPresent(u -> {
            u.setOnlineAt(null);
            u.setAvailable(false);
            userRepository.save(u);
        });
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
                .collegiateNumber(req.getCollegiateNumber() != null && !req.getCollegiateNumber().isBlank()
                        ? req.getCollegiateNumber() : null)
                .role(req.getRole())
                .active(true)
                .build();

        return UserDTO.from(userRepository.save(user));
    }

    @Transactional
    public UserDTO update(Long id, UserUpdateRequest req) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado: " + id));

        user.setFirstName(req.getFirstName());
        user.setLastName(req.getLastName());
        user.setEmail(req.getEmail());
        user.setSpecialty(req.getSpecialty());
        user.setCollegiateNumber(req.getCollegiateNumber() != null && !req.getCollegiateNumber().isBlank()
                ? req.getCollegiateNumber() : null);
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

    @Transactional
    public boolean toggleAvailability(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado: " + userId));
        user.setAvailable(!user.isAvailable());
        userRepository.save(user);
        return user.isAvailable();
    }

    @Transactional(readOnly = true)
    public List<Map<String, Object>> getAllStaffStatus() {
        List<Role> staffRoles = List.of(Role.DOCTOR, Role.LAB_TECHNICIAN);
        return userRepository.findAll().stream()
                .filter(u -> staffRoles.contains(u.getRole()))
                .map(u -> {
                    Map<String, Object> m = new LinkedHashMap<>();
                    m.put("id",        u.getId());
                    m.put("firstName", u.getFirstName());
                    m.put("lastName",  u.getLastName());
                    m.put("role",      u.getRole().name());
                    m.put("specialty", u.getSpecialty());
                    // Derive area
                    String area = "Sin asignación";
                    if (u.getRole() == Role.LAB_TECHNICIAN) {
                        area = "Laboratorio";
                    } else {
                        var assignment = assignmentRepository.findByDoctorIdAndActiveTrue(u.getId());
                        if (assignment.isPresent()) {
                            area = assignment.get().getClinic().getName();
                        }
                    }
                    m.put("area", area);
                    // Derive status — FUERA_DE_TURNO if portal hasn't polled in 2 min
                    String status;
                    java.time.LocalDateTime threshold = java.time.LocalDateTime.now().minusMinutes(2);
                    if (!u.isActive() || u.getOnlineAt() == null || u.getOnlineAt().isBefore(threshold)) {
                        status = "FUERA_DE_TURNO";
                    } else if (u.isAvailable()) {
                        status = "ACTIVO";
                    } else {
                        status = "INACTIVO";
                    }
                    m.put("status",    status);
                    m.put("available", u.isAvailable());
                    m.put("active",    u.isActive());
                    return m;
                })
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<Map<String, Object>> getDoctorAvailabilityByClinic(Long clinicId) {
        LocalDateTime threshold = LocalDateTime.now().minusMinutes(2);
        return assignmentRepository.findActiveDoctorsByClinic(clinicId).stream()
                .map(a -> {
                    User doc = a.getDoctor();
                    boolean online = doc.isActive()
                            && doc.getOnlineAt() != null
                            && doc.getOnlineAt().isAfter(threshold);
                    Map<String, Object> m = new LinkedHashMap<>();
                    m.put("id",        doc.getId());
                    m.put("firstName", doc.getFirstName());
                    m.put("lastName",  doc.getLastName());
                    m.put("specialty", doc.getSpecialty());
                    m.put("available", online && doc.isAvailable());
                    m.put("online",    online);
                    return m;
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
