package com.biocore.service;

import com.biocore.dto.PrescriptionRequest;
import com.biocore.entity.*;
import com.biocore.enums.PrescriptionStatus;
import com.biocore.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
    public Prescription create(PrescriptionRequest req) {
        Patient patient = patientRepository.findById(req.getPatientId())
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));
        User doctor = userRepository.findById(req.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Médico no encontrado"));
        Ticket ticket = req.getTicketId() != null
                ? ticketRepository.findById(req.getTicketId()).orElse(null) : null;

        Prescription prescription = Prescription.builder()
                .patient(patient)
                .doctor(doctor)
                .ticket(ticket)
                .notes(req.getNotes())
                .build();

        Prescription saved = prescriptionRepository.save(prescription);

        if (req.getItems() != null) {
            for (PrescriptionRequest.PrescriptionItemRequest itemReq : req.getItems()) {
                Medicine medicine = medicineRepository.findById(itemReq.getMedicineId())
                        .orElseThrow(() -> new RuntimeException("Medicamento no encontrado: " + itemReq.getMedicineId()));
                PrescriptionItem item = PrescriptionItem.builder()
                        .prescription(saved)
                        .medicine(medicine)
                        .quantity(itemReq.getQuantity())
                        .dosage(itemReq.getDosage())
                        .instructions(itemReq.getInstructions())
                        .build();
                prescriptionItemRepository.save(item);
            }
        }

        return prescriptionRepository.findById(saved.getId()).orElse(saved);
    }

    @Transactional(readOnly = true)
    public Prescription getById(Long id) {
        return prescriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Receta no encontrada: " + id));
    }

    @Transactional(readOnly = true)
    public List<Prescription> getByPatient(Long patientId) {
        return prescriptionRepository.findByPatientIdOrderByCreatedAtDesc(patientId);
    }

    @Transactional(readOnly = true)
    public List<Prescription> getPending() {
        return prescriptionRepository.findByStatus(PrescriptionStatus.PENDING);
    }

    /** RN-F01, RN-F02: Despachar medicamentos solo tras confirmación de pago */
    @Transactional
    public Prescription dispatch(Long prescriptionId, List<Long> itemIds) {
        Prescription prescription = getById(prescriptionId);

        for (PrescriptionItem item : prescription.getItems()) {
            if (itemIds.contains(item.getId())) {
                Medicine medicine = item.getMedicine();
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
