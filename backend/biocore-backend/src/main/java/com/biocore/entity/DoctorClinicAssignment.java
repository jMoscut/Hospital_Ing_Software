package com.biocore.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "doctor_clinic_assignments")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DoctorClinicAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** RN-M02: Un médico solo puede estar en una clínica activa a la vez */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    private User doctor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clinic_id", nullable = false)
    private Clinic clinic;

    @Column(nullable = false)
    private LocalDateTime assignedAt;

    /** RN-M03: Asignación activa en tiempo real */
    @Column(nullable = false)
    @Builder.Default
    private boolean active = true;
}
