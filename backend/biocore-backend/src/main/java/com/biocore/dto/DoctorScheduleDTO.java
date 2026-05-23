package com.biocore.dto;

import com.biocore.entity.DoctorSchedule;
import lombok.*;

import java.time.DayOfWeek;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DoctorScheduleDTO {
    private Long id;
    private Long doctorId;
    private String doctorName;
    private Long clinicId;
    private String clinicName;
    private DayOfWeek dayOfWeek;
    private LocalDate specificDate;
    private String startTime;
    private String endTime;
    private String lunchStartTime;
    private String lunchEndTime;
    private boolean active;

    public static DoctorScheduleDTO from(DoctorSchedule s) {
        return DoctorScheduleDTO.builder()
                .id(s.getId())
                .doctorId(s.getDoctor().getId())
                .doctorName(s.getDoctor().getFirstName() + " " + s.getDoctor().getLastName())
                .clinicId(s.getClinic().getId())
                .clinicName(s.getClinic().getName())
                .dayOfWeek(s.getDayOfWeek())
                .specificDate(s.getSpecificDate())
                .startTime(s.getStartTime())
                .endTime(s.getEndTime())
                .lunchStartTime(s.getLunchStartTime())
                .lunchEndTime(s.getLunchEndTime())
                .active(s.isActive())
                .build();
    }
}
