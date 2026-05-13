package com.biocore.dto;

import com.biocore.entity.ClinicSchedule;
import lombok.*;

import java.time.DayOfWeek;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClinicScheduleDTO {
    private Long id;
    private Long clinicId;
    private String clinicName;
    private DayOfWeek dayOfWeek;
    private LocalDate specificDate;
    private String startTime;
    private String endTime;
    private boolean active;

    public static ClinicScheduleDTO from(ClinicSchedule s) {
        return ClinicScheduleDTO.builder()
                .id(s.getId())
                .clinicId(s.getClinic().getId())
                .clinicName(s.getClinic().getName())
                .dayOfWeek(s.getDayOfWeek())
                .specificDate(s.getSpecificDate())
                .startTime(s.getStartTime())
                .endTime(s.getEndTime())
                .active(s.isActive())
                .build();
    }
}
