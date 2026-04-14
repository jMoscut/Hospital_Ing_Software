package com.biocore.dto;

import com.biocore.enums.SampleType;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LabOrderRequest {
    @NotNull private Long patientId;
    @NotNull private Long doctorId;
    private Long ticketId;
    @NotNull private SampleType sampleType;
    private String notes;
}
