package com.biocore.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardDTO {
    private long totalPatientsToday;
    private long patientsWaiting;
    private long patientsInConsultation;
    private long patientsAttended;
    private long patientsCancelled;
    private long totalPaidToday;
}
