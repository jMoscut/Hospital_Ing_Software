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

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    /** RN-F01: Stock disponible en inventario */
    @Column(nullable = false)
    @Builder.Default
    private int stock = 0;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    /** Tableta, Cápsula, ml, mg, etc. */
    private String unit;

    @Column(nullable = false)
    @Builder.Default
    private boolean active = true;
}
