package com.biocore.repository;

import com.biocore.entity.ClinicSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ClinicScheduleRepository extends JpaRepository<ClinicSchedule, Long> {

    @Query("SELECT s FROM ClinicSchedule s JOIN FETCH s.clinic " +
           "WHERE s.clinic.id = :clinicId AND s.active = true " +
           "AND (s.specificDate = :date OR (s.specificDate IS NULL AND s.dayOfWeek = :dayOfWeek))")
    List<ClinicSchedule> findForClinicAndDate(@Param("clinicId") Long clinicId,
                                              @Param("date") LocalDate date,
                                              @Param("dayOfWeek") DayOfWeek dayOfWeek);

    @Query("SELECT s FROM ClinicSchedule s JOIN FETCH s.clinic " +
           "WHERE s.clinic.id = :clinicId AND s.active = true " +
           "ORDER BY s.dayOfWeek, s.specificDate, s.startTime")
    List<ClinicSchedule> findActiveByClinicId(@Param("clinicId") Long clinicId);

    Optional<ClinicSchedule> findByClinicIdAndDayOfWeekAndActiveTrue(Long clinicId, DayOfWeek dayOfWeek);

    Optional<ClinicSchedule> findByClinicIdAndSpecificDateAndActiveTrue(Long clinicId, LocalDate specificDate);
}
