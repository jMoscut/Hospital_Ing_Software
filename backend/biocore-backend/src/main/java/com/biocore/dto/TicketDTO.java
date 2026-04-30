package com.biocore.dto;

import com.biocore.entity.LabOrder;
import com.biocore.entity.Ticket;
import com.biocore.enums.SampleType;
import com.biocore.enums.TicketPriority;
import com.biocore.enums.TicketStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TicketDTO {
    private Long id;
    private String ticketNumber;
    private Long patientId;
    private Long appointmentId;
    private String patientName;
    private String patientCode;
    private String patientDpi;
    private Long clinicId;
    private String clinicName;
    private Long doctorId;
    private String doctorName;
    private TicketStatus status;
    private TicketPriority priority;
    private String type;
    private String notes;
    private LocalDate scheduledDate;
    private String scheduledTime;
    private LocalDateTime createdAt;
    private LocalDateTime calledAt;
    private LocalDateTime consultationStartAt;
    private LocalDateTime completedAt;
    private String labExamName;
    private String labSampleType;

    public static TicketDTO from(Ticket t) {
        return TicketDTO.builder()
                .id(t.getId())
                .ticketNumber(t.getTicketNumber())
                .patientId(t.getPatient().getId())
                .appointmentId(t.getAppointment() != null ? t.getAppointment().getId() : null)
                .patientName(t.getPatient().getFirstName() + " " + t.getPatient().getLastName())
                .patientCode(t.getPatient().getPatientCode())
                .patientDpi(t.getPatient().getDpi())
                .clinicId(t.getClinic().getId())
                .clinicName(t.getClinic().getName())
                .doctorId(t.getDoctor() != null ? t.getDoctor().getId() : null)
                .doctorName(t.getDoctor() != null ? t.getDoctor().getFirstName() + " " + t.getDoctor().getLastName() : null)
                .status(t.getStatus())
                .priority(t.getPriority())
                .type(t.getType())
                .notes(t.getNotes())
                .scheduledDate(t.getScheduledDate())
                .scheduledTime(t.getScheduledTime())
                .createdAt(t.getCreatedAt())
                .calledAt(t.getCalledAt())
                .consultationStartAt(t.getConsultationStartAt())
                .completedAt(t.getCompletedAt())
                .build();
    }

    public static TicketDTO from(Ticket t, LabOrder labOrder) {
        String examName = null;
        String sampleTypeName = null;
        if (labOrder != null) {
            if (labOrder.getLabExam() != null) examName = labOrder.getLabExam().getName();
            if (labOrder.getSampleType() != null) sampleTypeName = labOrder.getSampleType().name();
        }
        return TicketDTO.builder()
                .id(t.getId())
                .ticketNumber(t.getTicketNumber())
                .patientId(t.getPatient().getId())
                .appointmentId(t.getAppointment() != null ? t.getAppointment().getId() : null)
                .patientName(t.getPatient().getFirstName() + " " + t.getPatient().getLastName())
                .patientCode(t.getPatient().getPatientCode())
                .patientDpi(t.getPatient().getDpi())
                .clinicId(t.getClinic().getId())
                .clinicName(t.getClinic().getName())
                .doctorId(t.getDoctor() != null ? t.getDoctor().getId() : null)
                .doctorName(t.getDoctor() != null ? t.getDoctor().getFirstName() + " " + t.getDoctor().getLastName() : null)
                .status(t.getStatus())
                .priority(t.getPriority())
                .type(t.getType())
                .notes(t.getNotes())
                .scheduledDate(t.getScheduledDate())
                .scheduledTime(t.getScheduledTime())
                .createdAt(t.getCreatedAt())
                .calledAt(t.getCalledAt())
                .consultationStartAt(t.getConsultationStartAt())
                .completedAt(t.getCompletedAt())
                .labExamName(examName)
                .labSampleType(sampleTypeName)
                .build();
    }
}
