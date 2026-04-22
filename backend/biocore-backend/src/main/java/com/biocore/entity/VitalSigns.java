package com.biocore.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "vital_signs")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VitalSigns {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** RN-03: Obligatorio antes de asignar a consulta */
    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ticket_id", nullable = false, unique = true)
    private Ticket ticket;

    /** Formato: "120/80" */
    private String bloodPressure;

    private Integer heartRate;

    @Column(precision = 4, scale = 1)
    private BigDecimal temperature;

    @Column(precision = 5, scale = 2)
    private BigDecimal weight;

    @Column(precision = 5, scale = 2)
    private BigDecimal height;

    private Integer oxygenSaturation;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "registered_by")
    private User registeredBy;

    @Column(nullable = false)
    private LocalDateTime recordedAt;
}
