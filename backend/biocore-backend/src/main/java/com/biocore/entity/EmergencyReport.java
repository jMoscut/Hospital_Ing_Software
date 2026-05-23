package com.biocore.entity;

import com.biocore.enums.EmergencyReportStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "emergency_reports")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmergencyReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** DPI ingresado al momento de la emergencia (puede ser temporal "0000000000000") */
    private String dpi;

    private String firstName;
    private String lastName;
    private String phone;
    private String email;
    private String motive;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private EmergencyReportStatus status = EmergencyReportStatus.OPEN;

    /** Paciente mínimo creado para el ticket (puede no tener cuenta de usuario) */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id")
    private Patient patient;

    /** Ticket de emergencia generado */
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ticket_id")
    private Ticket ticket;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
