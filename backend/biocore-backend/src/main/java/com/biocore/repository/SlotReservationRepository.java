package com.biocore.repository;

import com.biocore.entity.SlotReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SlotReservationRepository extends JpaRepository<SlotReservation, Long> {

    /** Active reserved slots for a clinic+date (all patients) */
    @Query("SELECT r.time FROM SlotReservation r " +
           "WHERE r.clinicId = :clinicId AND r.date = :date AND r.expiresAt > :now")
    List<String> findActiveReservedSlots(@Param("clinicId") Long clinicId,
                                         @Param("date") LocalDate date,
                                         @Param("now") LocalDateTime now);

    /** Active reserved slots by OTHER patients (to check conflict before reserving) */
    @Query("SELECT r.time FROM SlotReservation r " +
           "WHERE r.clinicId = :clinicId AND r.date = :date " +
           "AND r.expiresAt > :now AND r.patientId <> :patientId")
    List<String> findActiveReservedSlotsByOthers(@Param("clinicId") Long clinicId,
                                                  @Param("date") LocalDate date,
                                                  @Param("now") LocalDateTime now,
                                                  @Param("patientId") Long patientId);

    @Modifying
    @Query("DELETE FROM SlotReservation r " +
           "WHERE r.clinicId = :clinicId AND r.date = :date " +
           "AND r.time = :time AND r.patientId = :patientId")
    void deleteBySlot(@Param("clinicId") Long clinicId, @Param("date") LocalDate date,
                      @Param("time") String time, @Param("patientId") Long patientId);

    @Modifying
    @Query("DELETE FROM SlotReservation r WHERE r.expiresAt <= :now")
    void deleteExpired(@Param("now") LocalDateTime now);

    /** Returns [time, count] pairs of active reservations for a clinic+date */
    @Query("SELECT r.time, COUNT(r) FROM SlotReservation r " +
           "WHERE r.clinicId = :clinicId AND r.date = :date AND r.expiresAt > :now GROUP BY r.time")
    List<Object[]> countActiveReservationsPerSlot(@Param("clinicId") Long clinicId,
                                                   @Param("date") LocalDate date,
                                                   @Param("now") LocalDateTime now);

    /** Count active reservations by OTHER patients for a specific time slot */
    @Query("SELECT COUNT(r) FROM SlotReservation r " +
           "WHERE r.clinicId = :clinicId AND r.date = :date AND r.time = :time " +
           "AND r.expiresAt > :now AND r.patientId <> :patientId")
    long countActiveReservationsByOthersForSlot(@Param("clinicId") Long clinicId,
                                                  @Param("date") LocalDate date,
                                                  @Param("time") String time,
                                                  @Param("now") LocalDateTime now,
                                                  @Param("patientId") Long patientId);
}
