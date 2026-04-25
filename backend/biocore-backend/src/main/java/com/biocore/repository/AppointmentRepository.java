package com.biocore.repository;

import com.biocore.entity.Appointment;
import com.biocore.enums.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    /** Returns booked (non-cancelled) time slots for a given clinic + date */
    @Query("SELECT a.scheduledTime FROM Appointment a " +
           "WHERE a.clinic.id = :clinicId AND a.scheduledDate = :date " +
           "AND a.status <> :cancelled")
    List<String> findBookedSlots(@Param("clinicId") Long clinicId,
                                 @Param("date") LocalDate date,
                                 @Param("cancelled") AppointmentStatus cancelled);

    /** Returns [scheduledTime, count] pairs for all booked slots in a clinic+date */
    @Query("SELECT a.scheduledTime, COUNT(a) FROM Appointment a " +
           "WHERE a.clinic.id = :clinicId AND a.scheduledDate = :date " +
           "AND a.status <> :cancelled GROUP BY a.scheduledTime")
    List<Object[]> findBookedCountsPerSlot(@Param("clinicId") Long clinicId,
                                            @Param("date") LocalDate date,
                                            @Param("cancelled") AppointmentStatus cancelled);

    /** Returns doctor IDs already booked for a specific slot */
    @Query("SELECT a.doctor.id FROM Appointment a " +
           "WHERE a.clinic.id = :clinicId AND a.scheduledDate = :date " +
           "AND a.scheduledTime = :time AND a.status <> :cancelled AND a.doctor IS NOT NULL")
    List<Long> findBookedDoctorIds(@Param("clinicId") Long clinicId,
                                    @Param("date") LocalDate date,
                                    @Param("time") String time,
                                    @Param("cancelled") AppointmentStatus cancelled);

    List<Appointment> findByPatientIdOrderByScheduledDateDescScheduledTimeDesc(Long patientId);

    Optional<Appointment> findByVoucherCode(String voucherCode);

    /** Count active (non-cancelled) appointments a patient already has at a given date+time. */
    @Query("SELECT COUNT(a) FROM Appointment a " +
           "WHERE a.patient.id = :patientId AND a.scheduledDate = :date " +
           "AND a.scheduledTime = :time AND a.status <> :cancelled")
    long countPatientBookingsAtSlot(@Param("patientId") Long patientId,
                                     @Param("date") LocalDate date,
                                     @Param("time") String time,
                                     @Param("cancelled") AppointmentStatus cancelled);

    /** All appointments for a specific doctor on a given date (any status except cancelled). */
    @Query("SELECT a FROM Appointment a " +
           "LEFT JOIN FETCH a.patient " +
           "LEFT JOIN FETCH a.clinic " +
           "WHERE a.doctor.id = :doctorId AND a.scheduledDate = :date " +
           "AND a.status <> :cancelled ORDER BY a.scheduledTime ASC")
    List<Appointment> findByDoctorAndDate(@Param("doctorId") Long doctorId,
                                           @Param("date") LocalDate date,
                                           @Param("cancelled") AppointmentStatus cancelled);
}
