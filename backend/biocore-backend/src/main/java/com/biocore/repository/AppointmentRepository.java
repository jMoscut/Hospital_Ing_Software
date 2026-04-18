package com.biocore.repository;

import com.biocore.entity.Appointment;
import com.biocore.enums.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    /** Returns all booked (non-cancelled) slots for a given clinic + date */
    @Query("SELECT a.scheduledTime FROM Appointment a " +
           "WHERE a.clinic.id = :clinicId AND a.scheduledDate = :date " +
           "AND a.status <> :cancelled")
    List<String> findBookedSlots(@Param("clinicId") Long clinicId,
                                 @Param("date") LocalDate date,
                                 @Param("cancelled") AppointmentStatus cancelled);

    List<Appointment> findByPatientIdOrderByScheduledDateDescScheduledTimeDesc(Long patientId);
}
