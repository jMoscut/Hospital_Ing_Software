package com.biocore.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "patients")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** RN-04: Código único auto-generado (PAT-0001) */
    @Column(nullable = false, unique = true)
    private String patientCode;

    /** RN-01: 13 dígitos numéricos, sin guiones ni espacios */
    @Column(nullable = false, unique = true, length = 13)
    private String dpi;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    private String address;

    private String phone;

    private String emergencyContact;

    private String emergencyPhone;

    /** RN-L03: Correo obligatorio para notificaciones de laboratorio */
    private String email;

    /** FA02 CU 00 / FA01 CU 01: Fecha de nacimiento */
    private LocalDate birthDate;

    /** Seguro médico (opcional) */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "insurance_id")
    private Insurance insurance;

    /** Número de póliza / carné del seguro del paciente */
    @Column(name = "insurance_number", length = 60)
    private String insuranceNumber;

    /**
     * Referencia al usuario del portal (rol PATIENT).
     * Nulo si el paciente no tiene cuenta en el portal.
     */
    @Column(name = "user_id")
    private Long userId;

    @Column(nullable = false)
    @Builder.Default
    private boolean active = true;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
