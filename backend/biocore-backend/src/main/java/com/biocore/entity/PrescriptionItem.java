package com.biocore.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "prescription_items")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PrescriptionItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prescription_id", nullable = false)
    private Prescription prescription;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medicine_id", nullable = true)
    private Medicine medicine;

    /** Free-text name for off-catalog medicines (medicine == null when this is set) */
    @Column(name = "custom_medicine_name")
    private String customMedicineName;

    @Column(nullable = false)
    private int quantity;

    private String dosage;

    @Column(columnDefinition = "TEXT")
    private String instructions;

    /** RN-F02: true solo si ya se procesó el pago y se despachó */
    @Column(nullable = false)
    @Builder.Default
    private boolean dispatched = false;
}
