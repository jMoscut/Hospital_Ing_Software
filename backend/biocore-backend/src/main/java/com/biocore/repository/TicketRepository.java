package com.biocore.repository;

import com.biocore.entity.Ticket;
import com.biocore.enums.TicketPriority;
import com.biocore.enums.TicketStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByStatus(TicketStatus status);
    List<Ticket> findByClinicId(Long clinicId);
    List<Ticket> findByPatientId(Long patientId);
    List<Ticket> findByDoctorId(Long doctorId);

    /** RN-C01: Cola ordenada: URGENT primero, luego por creación */
    @Query("SELECT t FROM Ticket t WHERE t.clinic.id = :clinicId AND t.status IN :statuses " +
           "ORDER BY CASE t.priority WHEN 'URGENT' THEN 0 ELSE 1 END, t.createdAt ASC")
    List<Ticket> findQueueByClinic(@Param("clinicId") Long clinicId,
                                   @Param("statuses") List<TicketStatus> statuses);

    /** RN-C04: Verificar si el médico tiene consulta activa */
    Optional<Ticket> findByDoctorIdAndStatus(Long doctorId, TicketStatus status);

    @Query("SELECT COUNT(t) FROM Ticket t WHERE t.status = :status AND t.createdAt >= :from")
    long countByStatusSince(@Param("status") TicketStatus status, @Param("from") LocalDateTime from);

    @Query("SELECT COUNT(t) FROM Ticket t WHERE t.createdAt >= :from")
    long countSince(@Param("from") LocalDateTime from);

    @Query("SELECT t FROM Ticket t WHERE t.clinic.id = :clinicId AND t.status = :status")
    List<Ticket> findByClinicIdAndStatus(@Param("clinicId") Long clinicId,
                                          @Param("status") TicketStatus status);

    @Query("SELECT MAX(t.ticketNumber) FROM Ticket t")
    Optional<String> findMaxTicketNumber();
}
