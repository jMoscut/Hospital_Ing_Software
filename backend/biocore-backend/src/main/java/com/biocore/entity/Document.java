package com.biocore.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "documents")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "appointment_id")
    private Appointment appointment;

    /** RN-05 / RN-L04: Solo PDF */
    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    private String filePath;

    /** RN-05: Máximo 20MB */
    private Long fileSize;

    @CreationTimestamp
    private LocalDateTime uploadedAt;
}
