package com.biocore.dto;

import com.biocore.entity.LabOrder;
import com.biocore.enums.LabOrderStatus;
import com.biocore.enums.SampleType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LabOrderDTO {

    private Long id;
    private Long patientId;
    private String patientName;
    private Long doctorId;
    private String doctorName;
    private Long ticketId;
    private Long labExamId;
    private String labExamName;
    private String labExamCode;
    private SampleType sampleType;
    private LabOrderStatus status;
    private LocalDate orderDate;
    private LocalDate expirationDate;
    private LocalDateTime resultAvailableAt;
    private LocalDateTime scheduledAt;
    private String notes;

    public static LabOrderDTO from(LabOrder o) {
        return LabOrderDTO.builder()
                .id(o.getId())
                .patientId(o.getPatient().getId())
                .patientName(o.getPatient().getFirstName() + " " + o.getPatient().getLastName())
                .doctorId(o.getDoctor().getId())
                .doctorName(o.getDoctor().getFirstName() + " " + o.getDoctor().getLastName())
                .ticketId(o.getTicket() != null ? o.getTicket().getId() : null)
                .labExamId(o.getLabExam() != null ? o.getLabExam().getId() : null)
                .labExamName(o.getLabExam() != null ? o.getLabExam().getName() : null)
                .labExamCode(o.getLabExam() != null ? o.getLabExam().getCode() : null)
                .sampleType(o.getSampleType())
                .status(o.getStatus())
                .orderDate(o.getOrderDate())
                .expirationDate(o.getExpirationDate())
                .resultAvailableAt(o.getResultAvailableAt())
                .scheduledAt(o.getScheduledAt())
                .notes(o.getNotes())
                .build();
    }
}
