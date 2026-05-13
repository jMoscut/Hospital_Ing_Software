package com.biocore.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "clinic_schedules")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClinicSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clinic_id", nullable = false)
    private Clinic clinic;

    /** Recurring weekly schedule day. Null if specificDate is used. */
    @Enumerated(EnumType.STRING)
    @Column(name = "day_of_week", length = 10)
    private DayOfWeek dayOfWeek;

    /** One-time specific date. Null if dayOfWeek is used. */
    @Column(name = "specific_date")
    private LocalDate specificDate;

    /** Inclusive start time, e.g. "08:00" */
    @Column(name = "start_time", nullable = false, length = 5)
    private String startTime;

    /** Exclusive end time — last 30-min slot starts before this time */
    @Column(name = "end_time", nullable = false, length = 5)
    private String endTime;

    @Column(nullable = false)
    @Builder.Default
    private boolean active = true;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
