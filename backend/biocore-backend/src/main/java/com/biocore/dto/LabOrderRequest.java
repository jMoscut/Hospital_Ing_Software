package com.biocore.dto;

import com.biocore.enums.SampleType;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LabOrderRequest {
    @NotNull private Long patientId;
    @NotNull private Long doctorId;
    private Long ticketId;
    /** Examen del catálogo (LAB-001…LAB-040). Si se provee, el sampleType se deriva del examen. */
    private Long labExamId;
    /** Requerido solo si no se especifica labExamId */
    private SampleType sampleType;
    private String notes;
}
