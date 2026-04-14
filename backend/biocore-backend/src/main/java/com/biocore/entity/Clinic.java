package com.biocore.entity;

import com.biocore.enums.ClinicType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "clinics")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Clinic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ClinicType type;

    /** RN-M01: Capacidad máxima de médicos simultáneos */
    @Column(nullable = false)
    @Builder.Default
    private int maxDoctors = 3;

    @Column(nullable = false)
    @Builder.Default
    private boolean active = true;

    private String description;
}
