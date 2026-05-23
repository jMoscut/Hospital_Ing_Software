package com.biocore.service;

import com.biocore.dto.PharmacySaleRequest;
import com.biocore.entity.*;
import com.biocore.enums.PaymentMethod;
import com.biocore.enums.PharmacySaleStatus;
import com.biocore.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PharmacySaleService {

    private final PharmacySaleRepository saleRepository;
    private final PharmacySaleItemRepository saleItemRepository;
    private final MedicineRepository medicineRepository;
    private final PatientRepository patientRepository;
    private final PrescriptionRepository prescriptionRepository;
    private final PaymentRepository paymentRepository;
    private final EmailService emailService;

    /** Reserve stock and create PENDING sale. Called when customer adds items to cart and proceeds to pay. */
    @Transactional
    public PharmacySale reserve(PharmacySaleRequest req) {
        Patient patient = null;
        if (req.getPatientId() != null) {
            patient = patientRepository.findById(req.getPatientId())
                    .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));
        }

        Prescription prescription = null;
        if (req.getPrescriptionId() != null) {
            prescription = prescriptionRepository.findById(req.getPrescriptionId())
                    .orElseThrow(() -> new RuntimeException("Receta no encontrada"));
        }

        int nextCode = saleRepository.findMaxSaleCodeNumber() + 1;
        String saleCode = String.format("VTA-%05d", nextCode);

        PharmacySale sale = PharmacySale.builder()
                .saleCode(saleCode)
                .patient(patient)
                .prescription(prescription)
                .status(PharmacySaleStatus.RESERVED)
                .build();

        PharmacySale saved = saleRepository.save(sale);

        BigDecimal total = BigDecimal.ZERO;

        for (PharmacySaleRequest.ItemRequest itemReq : req.getItems()) {
            Medicine med = medicineRepository.findById(itemReq.getMedicineId())
                    .orElseThrow(() -> new RuntimeException("Medicamento no encontrado: " + itemReq.getMedicineId()));

            if (!med.isActive()) {
                throw new RuntimeException("Medicamento inactivo: " + med.getName());
            }
            if (med.getStock() < itemReq.getQuantity()) {
                throw new RuntimeException("Stock insuficiente para: " + med.getName()
                        + " (disponible: " + med.getStock() + ", solicitado: " + itemReq.getQuantity() + ")");
            }

            med.setStock(med.getStock() - itemReq.getQuantity());
            medicineRepository.save(med);

            BigDecimal subtotal = med.getPrice().multiply(BigDecimal.valueOf(itemReq.getQuantity()));

            PharmacySaleItem item = PharmacySaleItem.builder()
                    .sale(saved)
                    .medicine(med)
                    .quantity(itemReq.getQuantity())
                    .unitPrice(med.getPrice())
                    .subtotal(subtotal)
                    .build();
            saleItemRepository.save(item);
            total = total.add(subtotal);
        }

        BigDecimal discount = BigDecimal.ZERO;
        if (patient != null && patient.getInsurance() != null) {
            BigDecimal pct = patient.getInsurance().getDiscountPercentage();
            discount = total.multiply(pct).divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
        }

        saved.setTotalAmount(total);
        saved.setDiscountAmount(discount);
        saved.setNetAmount(total.subtract(discount));
        return saleRepository.save(saved);
    }

    /** Cancel a RESERVED sale — return stock. */
    @Transactional
    public PharmacySale cancel(Long saleId) {
        PharmacySale sale = getById(saleId);
        if (sale.getStatus() != PharmacySaleStatus.RESERVED) {
            throw new RuntimeException("Solo se pueden cancelar ventas en estado RESERVADO");
        }

        for (PharmacySaleItem item : sale.getItems()) {
            Medicine med = item.getMedicine();
            med.setStock(med.getStock() + item.getQuantity());
            medicineRepository.save(med);
        }

        sale.setStatus(PharmacySaleStatus.CANCELLED);
        return saleRepository.save(sale);
    }

    /** Complete payment for a RESERVED sale. */
    @Transactional
    public PharmacySale complete(Long saleId, PaymentMethod method, Long patientId) {
        PharmacySale sale = getById(saleId);
        if (sale.getStatus() != PharmacySaleStatus.RESERVED) {
            throw new RuntimeException("Solo se pueden completar ventas en estado RESERVADO");
        }

        // If patient wasn't set at reservation time (anonymous OTC), set now
        if (sale.getPatient() == null && patientId != null) {
            Patient patient = patientRepository.findById(patientId)
                    .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));
            sale.setPatient(patient);

            // Recalculate discount with patient insurance
            if (patient.getInsurance() != null) {
                BigDecimal pct = patient.getInsurance().getDiscountPercentage();
                BigDecimal discount = sale.getTotalAmount()
                        .multiply(pct).divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
                sale.setDiscountAmount(discount);
                sale.setNetAmount(sale.getTotalAmount().subtract(discount));
            }
        }

        // Generate invoice number using payment table sequence for consistency
        int nextInvoice = paymentRepository.findMaxInvoiceNumber() + 1;
        String invoiceNumber = String.format("FAC-%06d", nextInvoice);

        sale.setStatus(PharmacySaleStatus.COMPLETED);
        sale.setPaymentMethod(method);
        sale.setInvoiceNumber(invoiceNumber);
        sale.setPaidAt(LocalDateTime.now());

        PharmacySale completed = saleRepository.save(sale);

        if (completed.getPatient() != null
                && completed.getPatient().getEmail() != null
                && !completed.getPatient().getEmail().isBlank()) {
            emailService.sendPharmacyReceiptEmail(completed);
        }

        return completed;
    }

    @Transactional(readOnly = true)
    public PharmacySale getById(Long id) {
        return saleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Venta no encontrada: " + id));
    }
}
