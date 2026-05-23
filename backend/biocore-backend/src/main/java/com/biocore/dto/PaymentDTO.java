package com.biocore.dto;

import com.biocore.entity.Payment;
import com.biocore.enums.PaymentMethod;
import com.biocore.enums.PaymentStatus;
import com.biocore.enums.PaymentType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDTO {

    private Long id;
    private Long patientId;
    private Long ticketId;
    private PaymentType type;
    private BigDecimal amount;
    private BigDecimal discountAmount;
    private BigDecimal netAmount;
    private PaymentMethod method;
    private PaymentStatus status;
    private Long referenceId;
    private String invoiceNumber;
    private LocalDateTime createdAt;
    private LocalDateTime paidAt;

    public static PaymentDTO from(Payment p) {
        return PaymentDTO.builder()
                .id(p.getId())
                .patientId(p.getPatient() != null ? p.getPatient().getId() : null)
                .ticketId(p.getTicket() != null ? p.getTicket().getId() : null)
                .type(p.getType())
                .amount(p.getAmount())
                .discountAmount(p.getDiscountAmount())
                .netAmount(p.getNetAmount())
                .method(p.getMethod())
                .status(p.getStatus())
                .referenceId(p.getReferenceId())
                .invoiceNumber(p.getInvoiceNumber())
                .createdAt(p.getCreatedAt())
                .paidAt(p.getPaidAt())
                .build();
    }
}
