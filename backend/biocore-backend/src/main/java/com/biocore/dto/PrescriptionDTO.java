package com.biocore.dto;

import com.biocore.entity.Medicine;
import com.biocore.entity.Prescription;
import com.biocore.entity.PrescriptionItem;
import com.biocore.enums.PrescriptionStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PrescriptionDTO {

    private Long id;
    private Long patientId;
    private String patientName;
    private Long doctorId;
    private String doctorName;
    private Long ticketId;
    private PrescriptionStatus status;
    private String notes;
    private LocalDateTime createdAt;
    private List<ItemDTO> items;

    public static PrescriptionDTO from(Prescription p) {
        return PrescriptionDTO.builder()
                .id(p.getId())
                .patientId(p.getPatient().getId())
                .patientName(p.getPatient().getFirstName() + " " + p.getPatient().getLastName())
                .doctorId(p.getDoctor().getId())
                .doctorName(p.getDoctor().getFirstName() + " " + p.getDoctor().getLastName())
                .ticketId(p.getTicket() != null ? p.getTicket().getId() : null)
                .status(p.getStatus())
                .notes(p.getNotes())
                .createdAt(p.getCreatedAt())
                .items(p.getItems().stream().map(ItemDTO::from).collect(Collectors.toList()))
                .build();
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ItemDTO {
        private Long id;
        private Long medicineId;
        private String medicineName;
        private int quantity;
        private String dosage;
        private String instructions;
        private boolean dispatched;
        private Medicine medicine;

        public static ItemDTO from(PrescriptionItem item) {
            return ItemDTO.builder()
                    .id(item.getId())
                    .medicineId(item.getMedicine().getId())
                    .medicineName(item.getMedicine().getName())
                    .quantity(item.getQuantity())
                    .dosage(item.getDosage())
                    .instructions(item.getInstructions())
                    .dispatched(item.isDispatched())
                    .medicine(item.getMedicine())
                    .build();
        }
    }
}
