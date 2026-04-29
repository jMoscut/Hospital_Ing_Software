package com.biocore.dto;

import com.biocore.entity.EmergencyMedicalReport;
import com.biocore.entity.Ticket;
import com.biocore.entity.VitalSigns;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class EmergencyDoctorTicketDTO {

    // Ticket
    private Long ticketId;
    private String ticketNumber;
    private Long patientId;
    private String patientName;
    private String patientDpi;
    private String patientEmail;
    private String patientCode;
    private String motive;
    private LocalDateTime createdAt;
    private LocalDateTime completedAt;

    // Vital signs
    private String bloodPressure;
    private Integer heartRate;
    private BigDecimal temperature;
    private BigDecimal weight;
    private BigDecimal height;
    private Integer oxygenSaturation;
    private LocalDateTime vitalsRecordedAt;

    // Medical report (null if not yet submitted)
    private Long reportId;
    private String diagnosis;
    private String treatment;
    private String medications;
    private LocalDateTime reportClosedAt;
    private boolean reportClosed;

    public static EmergencyDoctorTicketDTO from(Ticket t, VitalSigns v, EmergencyMedicalReport r) {
        EmergencyDoctorTicketDTOBuilder b = EmergencyDoctorTicketDTO.builder()
                .ticketId(t.getId())
                .ticketNumber(t.getTicketNumber())
                .patientId(t.getPatient().getId())
                .patientName(t.getPatient().getFirstName() + " " + t.getPatient().getLastName())
                .patientDpi(t.getPatient().getDpi())
                .patientEmail(t.getPatient().getEmail())
                .patientCode(t.getPatient().getPatientCode())
                .motive(t.getNotes())
                .createdAt(t.getCreatedAt())
                .completedAt(t.getCompletedAt());

        if (v != null) {
            b.bloodPressure(v.getBloodPressure())
             .heartRate(v.getHeartRate())
             .temperature(v.getTemperature())
             .weight(v.getWeight())
             .height(v.getHeight())
             .oxygenSaturation(v.getOxygenSaturation())
             .vitalsRecordedAt(v.getRecordedAt());
        }

        if (r != null) {
            b.reportId(r.getId())
             .diagnosis(r.getDiagnosis())
             .treatment(r.getTreatment())
             .medications(r.getMedications())
             .reportClosedAt(r.getClosedAt())
             .reportClosed(r.getClosedAt() != null);
        } else {
            b.reportClosed(false);
        }

        return b.build();
    }
}
