package com.biocore.dto;

import com.biocore.enums.TicketPriority;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TicketCreateRequest {
    @NotNull private Long patientId;
    /** RN-02: Clínica obligatoria */
    @NotNull private Long clinicId;
    private String notes;
    private String type;
    private TicketPriority priority;
}
