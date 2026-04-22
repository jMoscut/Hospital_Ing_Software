package com.biocore.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "slot_reservations")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SlotReservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long clinicId;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false, length = 10)
    private String time;

    @Column(nullable = false)
    private Long patientId;

    @Column(nullable = false)
    private LocalDateTime expiresAt;
}
