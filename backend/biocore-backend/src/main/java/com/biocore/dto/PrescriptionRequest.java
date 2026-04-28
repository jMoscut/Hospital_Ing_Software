package com.biocore.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class PrescriptionRequest {
    @NotNull private Long patientId;
    @NotNull private Long doctorId;
    private Long ticketId;
    private String notes;
    private List<PrescriptionItemRequest> items;

    @Data
    public static class PrescriptionItemRequest {
        private Long medicineId;
        private String customMedicineName;
        @NotNull private Integer quantity;
        private String dosage;
        private String instructions;
    }
}
