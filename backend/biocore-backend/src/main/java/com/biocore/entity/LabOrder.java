package com.biocore.entity;

import com.biocore.enums.LabOrderStatus;
import com.biocore.enums.SampleType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "lab_orders")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LabOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    private User doctor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ticket_id")
    private Ticket ticket;

    /** Examen específico del catálogo (LAB-001 … LAB-040). Opcional. */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lab_exam_id")
    private LabExam labExam;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SampleType sampleType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private LabOrderStatus status = LabOrderStatus.PENDING;

    @Column(nullable = false)
    private LocalDate orderDate;

    /** RN-L01: Vigencia 30 días calendario */
    @Column(nullable = false)
    private LocalDate expirationDate;

    /** RN-L02: Fecha/hora de disponibilidad de resultados */
    private LocalDateTime resultAvailableAt;

    /** Para exámenes con cita programada (Escenario B CU4) */
    private LocalDateTime scheduledAt;

    @Column(columnDefinition = "TEXT")
    private String notes;
}
