package com.biocore.service;

import com.biocore.dto.PrescriptionDTO;
import com.biocore.dto.PrescriptionRequest;
import com.biocore.entity.*;
import com.biocore.enums.PrescriptionStatus;
import com.biocore.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;
    private final PrescriptionItemRepository prescriptionItemRepository;
    private final PatientRepository patientRepository;
    private final UserRepository userRepository;
    private final TicketRepository ticketRepository;
    private final MedicineRepository medicineRepository;

    @Transactional
    public PrescriptionDTO create(PrescriptionRequest req) {
        log.info(">>> create prescription patientId={} doctorId={} ticketId={} items={}",
                req.getPatientId(), req.getDoctorId(), req.getTicketId(),
                req.getItems() != null ? req.getItems().size() : 0);

        Patient patient = patientRepository.findById(req.getPatientId())
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));
        log.info("  [1] patient loaded: {}", patient.getId());

        User doctor = userRepository.findById(req.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Médico no encontrado"));
        log.info("  [2] doctor loaded: {}", doctor.getId());

        Ticket ticket = req.getTicketId() != null
                ? ticketRepository.findById(req.getTicketId()).orElse(null) : null;
        log.info("  [3] ticket: {}", ticket != null ? ticket.getId() : "null");

        int nextCode = prescriptionRepository.findMaxCodeNumber() + 1;
        String code = String.format("REC-%05d", nextCode);
        log.info("  [4] code generated: {}", code);

        Prescription prescription = Prescription.builder()
                .code(code)
                .patient(patient)
                .doctor(doctor)
                .ticket(ticket)
                .notes(req.getNotes())
                .build();

        Prescription saved = prescriptionRepository.save(prescription);
        log.info("  [5] prescription saved id={}", saved.getId());

        List<PrescriptionDTO.ItemDTO> itemDtos = new ArrayList<>();
        if (req.getItems() != null) {
            for (PrescriptionRequest.PrescriptionItemRequest itemReq : req.getItems()) {
                log.info("  [6] item medicineId={} qty={}", itemReq.getMedicineId(), itemReq.getQuantity());
                Medicine medicine = null;
                if (itemReq.getMedicineId() != null) {
                    medicine = medicineRepository.findById(itemReq.getMedicineId())
                            .orElseThrow(() -> new RuntimeException("Medicamento no encontrado: " + itemReq.getMedicineId()));
                    log.info("  [7] medicine loaded: {}", medicine.getName());
                }
                PrescriptionItem item = PrescriptionItem.builder()
                        .prescription(saved)
                        .medicine(medicine)
                        .customMedicineName(itemReq.getCustomMedicineName())
                        .quantity(itemReq.getQuantity() != null ? itemReq.getQuantity() : 1)
                        .dosage(itemReq.getDosage())
                        .instructions(itemReq.getInstructions())
                        .build();
                PrescriptionItem savedItem = prescriptionItemRepository.save(item);
                log.info("  [8] item saved id={}", savedItem.getId());
                itemDtos.add(PrescriptionDTO.ItemDTO.from(savedItem));
            }
        }

        log.info("  [9] building DTO with {} items", itemDtos.size());
        return PrescriptionDTO.builder()
                .id(saved.getId())
                .code(saved.getCode())
                .patientId(patient.getId())
                .patientName(patient.getFirstName() + " " + patient.getLastName())
                .patientDpi(patient.getDpi())
                .patientEmail(patient.getEmail())
                .doctorId(doctor.getId())
                .doctorName(doctor.getFirstName() + " " + doctor.getLastName())
                .ticketId(ticket != null ? ticket.getId() : null)
                .status(saved.getStatus())
                .notes(saved.getNotes())
                .createdAt(saved.getCreatedAt())
                .items(itemDtos)
                .build();
    }

    @Transactional(readOnly = true)
    public Prescription getById(Long id) {
        return prescriptionRepository.findByIdWithDetails(id)
                .orElseThrow(() -> new RuntimeException("Receta no encontrada: " + id));
    }

    @Transactional(readOnly = true)
    public List<Prescription> getByPatient(Long patientId) {
        return prescriptionRepository.findByPatientIdOrderByCreatedAtDesc(patientId);
    }

    @Transactional(readOnly = true)
    public Prescription getByCode(String code) {
        return prescriptionRepository.findByCode(code)
                .orElseThrow(() -> new RuntimeException("Receta no encontrada con código: " + code));
    }

    @Transactional(readOnly = true)
    public List<Prescription> getByPatientDpi(String dpi) {
        return prescriptionRepository.findByPatientDpi(dpi);
    }

    @Transactional(readOnly = true)
    public List<Prescription> getPending() {
        return prescriptionRepository.findByStatusIn(
                List.of(PrescriptionStatus.PENDING, PrescriptionStatus.PARTIALLY_DISPATCHED));
    }

    /** RN-F01, RN-F02: Despachar medicamentos solo tras confirmación de pago */
    @Transactional
    public Prescription dispatch(Long prescriptionId, List<Long> itemIds) {
        Prescription prescription = getById(prescriptionId);

        for (PrescriptionItem item : prescription.getItems()) {
            if (itemIds.contains(item.getId())) {
                Medicine medicine = item.getMedicine();
                if (medicine == null) {
                    // External/off-catalog medicine — no stock to deduct, mark dispatched directly
                    item.setDispatched(true);
                    prescriptionItemRepository.save(item);
                    continue;
                }
                // RN-F01: Verificar stock
                if (medicine.getStock() < item.getQuantity()) {
                    throw new RuntimeException("Stock insuficiente para: " + medicine.getName()
                            + " (disponible: " + medicine.getStock() + ", requerido: " + item.getQuantity() + ")");
                }
                medicine.setStock(medicine.getStock() - item.getQuantity());
                medicineRepository.save(medicine);
                item.setDispatched(true);
                prescriptionItemRepository.save(item);
            }
        }

        // Actualizar estado de la receta
        boolean allDispatched = prescription.getItems().stream().allMatch(PrescriptionItem::isDispatched);
        boolean anyDispatched = prescription.getItems().stream().anyMatch(PrescriptionItem::isDispatched);

        if (allDispatched) {
            prescription.setStatus(PrescriptionStatus.DISPATCHED);
        } else if (anyDispatched) {
            prescription.setStatus(PrescriptionStatus.PARTIALLY_DISPATCHED);
        }

        return prescriptionRepository.save(prescription);
    }
}
