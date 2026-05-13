package com.biocore.dto;

import lombok.*;

import java.time.DayOfWeek;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClinicScheduleRequest {
    private Long clinicId;
    private DayOfWeek dayOfWeek;
    private LocalDate specificDate;
    private String startTime;
    private String endTime;
}
