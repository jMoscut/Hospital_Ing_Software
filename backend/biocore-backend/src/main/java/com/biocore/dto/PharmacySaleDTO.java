package com.biocore.dto;

import com.biocore.entity.PharmacySale;
import com.biocore.entity.PharmacySaleItem;
import com.biocore.enums.PaymentMethod;
import com.biocore.enums.PharmacySaleStatus;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PharmacySaleDTO {

    private Long id;
    private String saleCode;
    private Long patientId;
    private String patientName;
    private String patientDpi;
    private String patientEmail;
    private Long prescriptionId;
    private String prescriptionCode;
    private PharmacySaleStatus status;
    private BigDecimal totalAmount;
    private BigDecimal discountAmount;
    private BigDecimal netAmount;
    private PaymentMethod paymentMethod;
    private String invoiceNumber;
    private LocalDateTime createdAt;
    private LocalDateTime paidAt;
    private List<ItemDTO> items;

    public static PharmacySaleDTO from(PharmacySale s) {
        return PharmacySaleDTO.builder()
                .id(s.getId())
                .saleCode(s.getSaleCode())
                .patientId(s.getPatient() != null ? s.getPatient().getId() : null)
                .patientName(s.getPatient() != null
                        ? s.getPatient().getFirstName() + " " + s.getPatient().getLastName() : null)
                .patientDpi(s.getPatient() != null ? s.getPatient().getDpi() : null)
                .patientEmail(s.getPatient() != null ? s.getPatient().getEmail() : null)
                .prescriptionId(s.getPrescription() != null ? s.getPrescription().getId() : null)
                .prescriptionCode(s.getPrescription() != null ? s.getPrescription().getCode() : null)
                .status(s.getStatus())
                .totalAmount(s.getTotalAmount())
                .discountAmount(s.getDiscountAmount())
                .netAmount(s.getNetAmount())
                .paymentMethod(s.getPaymentMethod())
                .invoiceNumber(s.getInvoiceNumber())
                .createdAt(s.getCreatedAt())
                .paidAt(s.getPaidAt())
                .items(s.getItems().stream().map(ItemDTO::from).collect(Collectors.toList()))
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
        private String medicineCode;
        private String presentation;
        private int quantity;
        private BigDecimal unitPrice;
        private BigDecimal subtotal;

        public static ItemDTO from(PharmacySaleItem item) {
            return ItemDTO.builder()
                    .id(item.getId())
                    .medicineId(item.getMedicine().getId())
                    .medicineName(item.getMedicine().getName())
                    .medicineCode(item.getMedicine().getCode())
                    .presentation(item.getMedicine().getPresentation())
                    .quantity(item.getQuantity())
                    .unitPrice(item.getUnitPrice())
                    .subtotal(item.getSubtotal())
                    .build();
        }
    }
}
