package com.biocore.service;

import com.biocore.dto.PatientCreateRequest;
import com.biocore.dto.PatientDTO;
import com.biocore.entity.Insurance;
import com.biocore.entity.Patient;
import com.biocore.repository.InsuranceRepository;
import com.biocore.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;
    private final InsuranceRepository insuranceRepository;

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
        return PatientDTO.from(p);
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
        // RN-01: validación de DPI (validada también en DTO con @Pattern)
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
                .insurance(insurance)
                .build();

        return PatientDTO.from(patientRepository.save(patient));
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

        if (req.getInsuranceId() != null) {
            Insurance insurance = insuranceRepository.findById(req.getInsuranceId())
                    .orElseThrow(() -> new RuntimeException("Seguro no encontrado"));
            patient.setInsurance(insurance);
        } else {
            patient.setInsurance(null);
        }

        return PatientDTO.from(patientRepository.save(patient));
    }
}
