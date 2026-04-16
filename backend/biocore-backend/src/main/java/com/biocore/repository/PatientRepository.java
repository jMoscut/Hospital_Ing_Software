package com.biocore.repository;

import com.biocore.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    Optional<Patient> findByDpi(String dpi);
    Optional<Patient> findByUserId(Long userId);
    Optional<Patient> findByPatientCode(String patientCode);
    boolean existsByDpi(String dpi);

    @Query("SELECT p FROM Patient p WHERE " +
           "LOWER(p.firstName) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
           "LOWER(p.lastName) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
           "p.dpi LIKE CONCAT('%', :q, '%') OR " +
           "p.patientCode LIKE CONCAT('%', :q, '%')")
    List<Patient> search(@Param("q") String query);

    @Query("SELECT COALESCE(MAX(CAST(SUBSTRING(p.patientCode, 5) AS int)), 0) FROM Patient p")
    int findMaxPatientCodeNumber();
}
