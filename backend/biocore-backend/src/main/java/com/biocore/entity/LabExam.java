package com.biocore.entity;

import com.biocore.enums.SampleType;
import jakarta.persistence.*;
import lombok.*;

/**
 * Catálogo de exámenes de laboratorio (LAB-001 … LAB-040).
 * Cada orden de laboratorio puede referirse a un examen del catálogo.
 */
@Entity
@Table(name = "lab_exams")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LabExam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Código único del catálogo: LAB-001, LAB-002, … */
    @Column(nullable = false, unique = true, length = 10)
    private String code;

    @Column(nullable = false)
    private String name;

    /** Tipo de muestra que requiere el examen */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SampleType sampleType;

    /** Categoría clínica: Hematología, Química Clínica, Serología, etc. */
    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    @Builder.Default
    private boolean active = true;
}
