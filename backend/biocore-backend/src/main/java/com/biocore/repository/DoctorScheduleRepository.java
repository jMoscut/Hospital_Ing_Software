package com.biocore.repository;

import com.biocore.entity.DoctorSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorScheduleRepository extends JpaRepository<DoctorSchedule, Long> {

    /** Active schedules for a clinic+date: considers recurring (dayOfWeek) and specific-date entries. */
    @Query("SELECT s FROM DoctorSchedule s JOIN FETCH s.doctor JOIN FETCH s.clinic " +
           "WHERE s.clinic.id = :clinicId AND s.active = true " +
           "AND (s.specificDate = :date OR (s.specificDate IS NULL AND s.dayOfWeek = :dayOfWeek))")
    List<DoctorSchedule> findForClinicAndDate(@Param("clinicId") Long clinicId,
                                               @Param("date") LocalDate date,
                                               @Param("dayOfWeek") DayOfWeek dayOfWeek);

    @Query("SELECT s FROM DoctorSchedule s JOIN FETCH s.clinic " +
           "WHERE s.doctor.id = :doctorId ORDER BY s.dayOfWeek, s.specificDate, s.startTime")
    List<DoctorSchedule> findByDoctorId(@Param("doctorId") Long doctorId);

    /** Upsert lookup: find existing recurring schedule for doctor+dayOfWeek */
    Optional<DoctorSchedule> findByDoctorIdAndDayOfWeekAndActiveTrue(Long doctorId, DayOfWeek dayOfWeek);

    /** Upsert lookup: find existing specific-date schedule for doctor+date */
    Optional<DoctorSchedule> findByDoctorIdAndSpecificDateAndActiveTrue(Long doctorId, LocalDate specificDate);

    @Query("SELECT s FROM DoctorSchedule s JOIN FETCH s.doctor JOIN FETCH s.clinic " +
           "WHERE s.clinic.id = :clinicId AND s.active = true " +
           "ORDER BY s.dayOfWeek, s.specificDate, s.startTime")
    List<DoctorSchedule> findActiveByClinicId(@Param("clinicId") Long clinicId);
}
