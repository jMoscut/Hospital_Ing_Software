package com.biocore.dto;

import com.biocore.enums.PaymentMethod;
import lombok.Data;

import java.util.List;

@Data
public class PharmacySaleRequest {
    private Long patientId;
    private Long prescriptionId;
    private PaymentMethod paymentMethod;
    private List<ItemRequest> items;

    @Data
    public static class ItemRequest {
        private Long medicineId;
        private int quantity;
    }
}
