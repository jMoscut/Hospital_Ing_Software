package com.biocore.dto;

import com.biocore.entity.LabOrder;
import com.biocore.entity.LabResult;
import com.biocore.entity.VitalSigns;
import com.biocore.enums.LabOrderStatus;
import com.biocore.enums.SampleType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
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
    private String patientDpi;
    private String patientEmail;
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

    // Vitals from associated ticket
    private String bloodPressure;
    private Integer heartRate;
    private BigDecimal temperature;
    private BigDecimal weight;
    private BigDecimal height;
    private Integer oxygenSaturation;

    // Result data
    private String resultNotes;
    private Boolean hasAttachment;

    public static LabOrderDTO from(LabOrder o) {
        return from(o, null, null);
    }

    public static LabOrderDTO from(LabOrder o, VitalSigns v, LabResult r) {
        LabOrderDTOBuilder b = LabOrderDTO.builder()
                .id(o.getId())
                .patientId(o.getPatient().getId())
                .patientName(o.getPatient().getFirstName() + " " + o.getPatient().getLastName())
                .patientDpi(o.getPatient().getDpi())
                .patientEmail(o.getPatient().getEmail())
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
                .notes(o.getNotes());

        if (v != null) {
            b.bloodPressure(v.getBloodPressure())
             .heartRate(v.getHeartRate())
             .temperature(v.getTemperature())
             .weight(v.getWeight())
             .height(v.getHeight())
             .oxygenSaturation(v.getOxygenSaturation());
        }

        if (r != null) {
            b.resultNotes(r.getResultNotes())
             .hasAttachment(r.getAttachmentPath() != null && !r.getAttachmentPath().isBlank());
        }

        return b.build();
    }
}
