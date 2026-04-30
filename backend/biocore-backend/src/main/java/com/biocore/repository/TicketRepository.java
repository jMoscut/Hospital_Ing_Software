package com.biocore.repository;

import com.biocore.entity.Ticket;
import com.biocore.enums.TicketPriority;
import com.biocore.enums.TicketStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByStatus(TicketStatus status);
    List<Ticket> findByClinicId(Long clinicId);
    List<Ticket> findByPatientId(Long patientId);
    List<Ticket> findByDoctorId(Long doctorId);

    /** RN-C01: Cola ordenada: URGENT primero, luego por creación.
     *  Scheduled tickets: solo scheduledDate = today.
     *  Walk-in (scheduledDate IS NULL): solo createdAt >= todayStart (Guatemala midnight). */
    @Query("SELECT t FROM Ticket t WHERE t.clinic.id = :clinicId AND t.status IN :statuses " +
           "AND (t.scheduledDate = :today OR (t.scheduledDate IS NULL AND t.createdAt >= :todayStart)) " +
           "ORDER BY CASE t.priority WHEN 'URGENT' THEN 0 ELSE 1 END, t.createdAt ASC")
    List<Ticket> findQueueByClinic(@Param("clinicId") Long clinicId,
                                   @Param("statuses") List<TicketStatus> statuses,
                                   @Param("today") LocalDate today,
                                   @Param("todayStart") LocalDateTime todayStart);

    /** Tickets agendados en fecha pasada O walk-ins de días anteriores que siguen activos → marcar ABSENT */
    @Query("SELECT t FROM Ticket t WHERE t.status IN :statuses " +
           "AND (t.scheduledDate < :today OR (t.scheduledDate IS NULL AND t.createdAt < :todayStart))")
    List<Ticket> findStaleScheduledTickets(@Param("today") LocalDate today,
                                            @Param("todayStart") LocalDateTime todayStart,
                                            @Param("statuses") List<TicketStatus> statuses);

    /** Cola filtrada por doctor: solo tickets asignados a ese doctor, de hoy, en espera. */
    @Query("SELECT t FROM Ticket t WHERE t.clinic.id = :clinicId AND t.doctor.id = :doctorId " +
           "AND t.status IN :statuses " +
           "AND (t.scheduledDate = :today OR (t.scheduledDate IS NULL AND t.createdAt >= :todayStart)) " +
           "ORDER BY CASE t.priority WHEN 'URGENT' THEN 0 ELSE 1 END, t.createdAt ASC")
    List<Ticket> findQueueByClinicAndDoctor(@Param("clinicId") Long clinicId,
                                             @Param("doctorId") Long doctorId,
                                             @Param("statuses") List<TicketStatus> statuses,
                                             @Param("today") LocalDate today,
                                             @Param("todayStart") LocalDateTime todayStart);

    /** Todos los tickets activos de hoy en todas las clínicas — para monitoreo de personal de salud. */
    @Query("SELECT t FROM Ticket t WHERE t.status IN :statuses " +
           "AND (t.scheduledDate = :today OR (t.scheduledDate IS NULL AND t.createdAt >= :todayStart)) " +
           "ORDER BY t.clinic.id ASC, CASE t.priority WHEN 'URGENT' THEN 0 ELSE 1 END, t.createdAt ASC")
    List<Ticket> findTodayAllActive(@Param("statuses") List<TicketStatus> statuses,
                                     @Param("today") LocalDate today,
                                     @Param("todayStart") LocalDateTime todayStart);

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

    /** Emergency payment queue for cashier: EMERGENCIA tickets pending payment */
    @Query("SELECT t FROM Ticket t WHERE t.type = 'EMERGENCIA' AND t.status = 'PENDING_PAYMENT' ORDER BY t.createdAt ASC")
    List<Ticket> findPendingEmergencyPayments();

    /** Count today's emergency tickets handled by a doctor — for equitable assignment */
    @Query("SELECT COUNT(t) FROM Ticket t WHERE t.doctor.id = :doctorId AND t.type = 'EMERGENCIA' " +
           "AND t.createdAt >= :todayStart")
    long countEmergencyTicketsByDoctorToday(@Param("doctorId") Long doctorId,
                                             @Param("todayStart") LocalDateTime todayStart);

    /** Today's COMPLETED emergency tickets (all, for emergency doctor portal) */
    @Query("SELECT t FROM Ticket t WHERE t.type = 'EMERGENCIA' " +
           "AND t.status = 'COMPLETED' AND t.createdAt >= :todayStart ORDER BY t.createdAt ASC")
    List<Ticket> findTodayCompletedEmergency(@Param("todayStart") LocalDateTime todayStart);

    /** Report: patients per clinic/area in date range */
    @Query("SELECT t.clinic.name, COUNT(t) FROM Ticket t " +
           "WHERE t.createdAt >= :from AND t.createdAt < :to " +
           "GROUP BY t.clinic.name ORDER BY COUNT(t) DESC")
    List<Object[]> countByClinicBetween(@Param("from") LocalDateTime from, @Param("to") LocalDateTime to);

    /** Report: completed consultations per doctor in date range */
    @Query("SELECT CONCAT(t.doctor.firstName, ' ', t.doctor.lastName), COUNT(t), t.clinic.name " +
           "FROM Ticket t WHERE t.createdAt >= :from AND t.createdAt < :to " +
           "AND t.doctor IS NOT NULL AND t.status = 'COMPLETED' " +
           "GROUP BY t.doctor.id, t.doctor.firstName, t.doctor.lastName, t.clinic.name " +
           "ORDER BY COUNT(t) DESC")
    List<Object[]> countByDoctorBetween(@Param("from") LocalDateTime from, @Param("to") LocalDateTime to);
}
