package com.biocore.repository;

import com.biocore.entity.Payment;
import com.biocore.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByPatientIdOrderByCreatedAtDesc(Long patientId);
    List<Payment> findByStatus(PaymentStatus status);
    List<Payment> findByTicketId(Long ticketId);

    /** RN-P03: Verificar si hay pagos pendientes para bloquear cierre */
    List<Payment> findByPatientIdAndStatus(Long patientId, PaymentStatus status);

    @Query("SELECT COUNT(p) FROM Payment p WHERE p.status = 'PAID' AND p.paidAt >= :from")
    long countPaidSince(@Param("from") LocalDateTime from);

    @Query("SELECT COALESCE(MAX(CAST(SUBSTRING(p.invoiceNumber, 5) AS int)), 0) FROM Payment p WHERE p.invoiceNumber IS NOT NULL")
    int findMaxInvoiceNumber();
}
