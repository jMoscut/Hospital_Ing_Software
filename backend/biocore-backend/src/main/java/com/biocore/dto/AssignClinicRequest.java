package com.biocore.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AssignClinicRequest {
    @NotNull private Long doctorId;
    @NotNull private Long clinicId;
}
