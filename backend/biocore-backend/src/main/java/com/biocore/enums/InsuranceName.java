package com.biocore.enums;

import java.math.BigDecimal;

public enum InsuranceName {
    EL_ROBLE(new BigDecimal("10.00")),
    UNIVERSALES(new BigDecimal("20.00")),
    GT(new BigDecimal("25.00"));

    private final BigDecimal discountPercentage;

    InsuranceName(BigDecimal discountPercentage) {
        this.discountPercentage = discountPercentage;
    }

    public BigDecimal getDiscountPercentage() {
        return discountPercentage;
    }
}
