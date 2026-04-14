package com.biocore.dto;

import com.biocore.enums.PaymentMethod;
import com.biocore.enums.PaymentType;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class PaymentCreateRequest {
    @NotNull private Long patientId;
    private Long ticketId;
    @NotNull private PaymentType type;
    @NotNull private BigDecimal amount;
    private PaymentMethod method;
    private Long referenceId;
}
