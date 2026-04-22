package com.biocore.repository;

import com.biocore.entity.DoctorClinicAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorClinicAssignmentRepository extends JpaRepository<DoctorClinicAssignment, Long> {
    Optional<DoctorClinicAssignment> findByDoctorIdAndActiveTrue(Long doctorId);
    List<DoctorClinicAssignment> findByClinicIdAndActiveTrue(Long clinicId);
    long countByClinicIdAndActiveTrue(Long clinicId);
    boolean existsByDoctorIdAndActiveTrue(Long doctorId);

    @Query("SELECT a FROM DoctorClinicAssignment a JOIN FETCH a.doctor d WHERE a.clinic.id = :clinicId AND a.active = true")
    List<DoctorClinicAssignment> findActiveDoctorsByClinic(@Param("clinicId") Long clinicId);

    @Query("SELECT COUNT(a) FROM DoctorClinicAssignment a JOIN a.doctor d WHERE a.clinic.id = :clinicId AND a.active = true AND d.available = true")
    long countAvailableDoctorsInClinic(@Param("clinicId") Long clinicId);

    @Query("SELECT a FROM DoctorClinicAssignment a WHERE a.doctor.id = :doctorId ORDER BY a.assignedAt DESC")
    List<DoctorClinicAssignment> findAllByDoctorId(@Param("doctorId") Long doctorId);
}
