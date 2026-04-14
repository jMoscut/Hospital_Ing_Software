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
    List<LabOrder> findByDoctorId(Long doctorId);
    List<LabOrder> findByStatus(LabOrderStatus status);
    List<LabOrder> findByStatusIn(List<LabOrderStatus> statuses);

    /** RN-L01: Órdenes expiradas (más de 30 días) */
    @Query("SELECT l FROM LabOrder l WHERE l.status NOT IN ('COMPLETED', 'EXPIRED') AND l.expirationDate < :today")
    List<LabOrder> findExpiredOrders(@Param("today") LocalDate today);
}
