package com.biocore.repository;

import com.biocore.entity.PharmacySale;
import com.biocore.enums.PharmacySaleStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface PharmacySaleRepository extends JpaRepository<PharmacySale, Long> {
    Optional<PharmacySale> findBySaleCode(String saleCode);
    List<PharmacySale> findByStatus(PharmacySaleStatus status);
    List<PharmacySale> findByPatientIdOrderByCreatedAtDesc(Long patientId);

    @Query("SELECT COALESCE(MAX(CAST(SUBSTRING(s.saleCode, 5) AS int)), 0) FROM PharmacySale s WHERE s.saleCode IS NOT NULL")
    int findMaxSaleCodeNumber();

    @Query("SELECT COALESCE(MAX(CAST(SUBSTRING(s.invoiceNumber, 5) AS int)), 0) FROM PharmacySale s WHERE s.invoiceNumber IS NOT NULL")
    int findMaxInvoiceNumber();

    /** Report: completed sales in date range */
    @Query("SELECT s FROM PharmacySale s WHERE s.status = 'COMPLETED' AND s.paidAt >= :from AND s.paidAt < :to ORDER BY s.paidAt")
    List<PharmacySale> findCompletedBetween(@Param("from") LocalDateTime from, @Param("to") LocalDateTime to);
}
