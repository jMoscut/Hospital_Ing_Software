package com.biocore.repository;

import com.biocore.entity.LabOrder;
import com.biocore.enums.LabOrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface LabOrderRepository extends JpaRepository<LabOrder, Long> {
    List<LabOrder> findByPatientIdOrderByOrderDateDesc(Long patientId);
    List<LabOrder> findByTicketId(Long ticketId);
    List<LabOrder> findByDoctorId(Long doctorId);
    List<LabOrder> findByStatus(LabOrderStatus status);
    List<LabOrder> findByStatusIn(List<LabOrderStatus> statuses);

    /** RN-L01: Órdenes expiradas (más de 30 días) */
    @Query("SELECT l FROM LabOrder l WHERE l.status NOT IN ('COMPLETED', 'EXPIRED') AND l.expirationDate < :today")
    List<LabOrder> findExpiredOrders(@Param("today") LocalDate today);

    /** Report: most requested lab exams in date range */
    @Query("SELECT COALESCE(l.labExam.name, CAST(l.sampleType AS string)), COUNT(l) " +
           "FROM LabOrder l WHERE l.orderDate >= :from AND l.orderDate <= :to " +
           "GROUP BY l.labExam.name, l.sampleType ORDER BY COUNT(l) DESC")
    List<Object[]> countByExamBetween(@Param("from") LocalDate from, @Param("to") LocalDate to);
}
