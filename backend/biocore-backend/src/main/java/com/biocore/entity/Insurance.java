package com.biocore.entity;

import com.biocore.enums.InsuranceName;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "insurances")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Insurance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, unique = true)
    private InsuranceName name;

    @Column(nullable = false, precision = 5, scale = 2)
    private BigDecimal discountPercentage;

    private String description;
}
