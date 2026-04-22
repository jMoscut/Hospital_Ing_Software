package com.biocore.dto;

import lombok.*;

import java.time.DayOfWeek;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DoctorScheduleRequest {
    private Long doctorId;
    private Long clinicId;
    /** For recurring weekly schedules. Set one of dayOfWeek OR specificDate. */
    private DayOfWeek dayOfWeek;
    /** For one-time date overrides. Set one of dayOfWeek OR specificDate. */
    private LocalDate specificDate;
    private String startTime;
    private String endTime;
}
