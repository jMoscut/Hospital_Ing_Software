package com.biocore.service;

import com.biocore.dto.PaymentCreateRequest;
import com.biocore.entity.Patient;
import com.biocore.entity.Payment;
import com.biocore.entity.Ticket;
import com.biocore.enums.PaymentMethod;
import com.biocore.enums.PaymentStatus;
import com.biocore.repository.PatientRepository;
import com.biocore.repository.PaymentRepository;
import com.biocore.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final PatientRepository patientRepository;
    private final TicketRepository ticketRepository;

    @Transactional(readOnly = true)
    public List<Payment> getByPatient(Long patientId) {
        return paymentRepository.findByPatientIdOrderByCreatedAtDesc(patientId);
    }

    /** RN-P03: Verificar pagos pendientes */
    @Transactional(readOnly = true)
    public List<Payment> getPendingByPatient(Long patientId) {
        return paymentRepository.findByPatientIdAndStatus(patientId, PaymentStatus.PENDING);
    }

    @Transactional
    public Payment create(PaymentCreateRequest req) {
        Patient patient = patientRepository.findById(req.getPatientId())
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));

        Ticket ticket = req.getTicketId() != null
                ? ticketRepository.findById(req.getTicketId()).orElse(null) : null;

        BigDecimal amount = req.getAmount();
        BigDecimal discountAmount = BigDecimal.ZERO;

        // RN-P01/P02: Aplicar descuento por seguro automáticamente
        if (patient.getInsurance() != null) {
            BigDecimal discountPct = patient.getInsurance().getDiscountPercentage();
            discountAmount = amount.multiply(discountPct).divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
        }

        BigDecimal netAmount = amount.subtract(discountAmount);

        Payment payment = Payment.builder()
                .patient(patient)
                .ticket(ticket)
                .type(req.getType())
                .amount(amount)
                .discountAmount(discountAmount)
                .netAmount(netAmount)
                .method(req.getMethod())
                .referenceId(req.getReferenceId())
                .build();

        return paymentRepository.save(payment);
    }

    @Transactional
    public Payment process(Long paymentId, PaymentMethod method) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Pago no encontrado: " + paymentId));

        if (payment.getStatus() == PaymentStatus.PAID) {
            throw new RuntimeException("Este pago ya fue procesado");
        }

        // Generar número de factura
        int nextInvoice = paymentRepository.findMaxInvoiceNumber() + 1;
        String invoiceNumber = String.format("FAC-%06d", nextInvoice);

        payment.setMethod(method);
        payment.setStatus(PaymentStatus.PAID);
        payment.setPaidAt(LocalDateTime.now());
        payment.setInvoiceNumber(invoiceNumber);

        return paymentRepository.save(payment);
    }
}
