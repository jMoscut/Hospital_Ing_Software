package com.biocore.dto;

import com.biocore.entity.EmergencyReport;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EmergencyReportDTO {
    private Long id;
    private String dpi;
    private String firstName;
    private String lastName;
    private String phone;
    private String email;
    private String motive;
    private String status;
    private Long patientId;
    private String patientCode;
    private Long ticketId;
    private String ticketNumber;
    private LocalDateTime createdAt;
    private boolean hasAccount;

    public static EmergencyReportDTO from(EmergencyReport r) {
        EmergencyReportDTO dto = new EmergencyReportDTO();
        dto.setId(r.getId());
        dto.setDpi(r.getDpi());
        dto.setFirstName(r.getFirstName());
        dto.setLastName(r.getLastName());
        dto.setPhone(r.getPhone());
        dto.setEmail(r.getEmail());
        dto.setMotive(r.getMotive());
        dto.setStatus(r.getStatus().name());
        dto.setCreatedAt(r.getCreatedAt());
        if (r.getPatient() != null) {
            dto.setPatientId(r.getPatient().getId());
            dto.setPatientCode(r.getPatient().getPatientCode());
            dto.setHasAccount(r.getPatient().getUserId() != null);
        }
        if (r.getTicket() != null) {
            dto.setTicketId(r.getTicket().getId());
            dto.setTicketNumber(r.getTicket().getTicketNumber());
        }
        return dto;
    }
}
