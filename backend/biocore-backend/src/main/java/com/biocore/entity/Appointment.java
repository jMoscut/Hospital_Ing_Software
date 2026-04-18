package com.biocore.entity;

import com.biocore.enums.AppointmentStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "appointments",
       uniqueConstraints = @UniqueConstraint(columnNames = {"clinic_id", "scheduled_date", "scheduled_time"}))
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clinic_id", nullable = false)
    private Clinic clinic;

    /** CONSULTA, LABORATORIO, CONTROL */
    @Column(nullable = false)
    private String type;

    @Column(name = "scheduled_date", nullable = false)
    private LocalDate scheduledDate;

    /** HH:mm for scheduled appointments; null for walk-in (immediate) */
    @Column(name = "scheduled_time", nullable = true, length = 10)
    private String scheduledTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private AppointmentStatus status = AppointmentStatus.PENDING_PAYMENT;

    /** Short unique code shown on the physical voucher, e.g. "A3X9K2" */
    @Column(name = "voucher_code", unique = true, length = 10)
    private String voucherCode;

    /** Fee charged for this appointment */
    @Column(precision = 8, scale = 2)
    @Builder.Default
    private BigDecimal amount = BigDecimal.valueOf(150.00);

    @Column(columnDefinition = "TEXT")
    private String notes;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
