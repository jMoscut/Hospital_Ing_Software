package com.biocore.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "medicines")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Código de catálogo (FAR-001 … FAR-045) */
    @Column(unique = true, length = 10)
    private String code;

    @Column(nullable = false)
    private String name;

    /** Tableta, Cápsula, Jarabe, Inyectable, Crema, Sobre, Inhalador, Vial, Frasco, etc. */
    private String presentation;

    /** Antibiótico, AINE, Analgésico, Gastrointestinal, etc. */
    private String category;

    @Column(columnDefinition = "TEXT")
    private String description;

    /** RN-F01: Stock disponible en inventario */
    @Column(nullable = false)
    @Builder.Default
    private int stock = 0;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    /** Tableta, ml, mg, etc. — unidad de dispensación */
    private String unit;

    @Column(nullable = false)
    @Builder.Default
    private boolean active = true;
}
