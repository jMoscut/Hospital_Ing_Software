package com.biocore.repository;

import com.biocore.entity.Prescription;
import com.biocore.enums.PrescriptionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {

    @Query("SELECT DISTINCT p FROM Prescription p " +
           "LEFT JOIN FETCH p.patient " +
           "LEFT JOIN FETCH p.doctor " +
           "LEFT JOIN FETCH p.ticket " +
           "LEFT JOIN FETCH p.items i " +
           "LEFT JOIN FETCH i.medicine " +
           "WHERE p.patient.id = :patientId " +
           "ORDER BY p.createdAt DESC")
    List<Prescription> findByPatientIdOrderByCreatedAtDesc(@Param("patientId") Long patientId);

    @Query("SELECT DISTINCT p FROM Prescription p " +
           "LEFT JOIN FETCH p.patient " +
           "LEFT JOIN FETCH p.doctor " +
           "LEFT JOIN FETCH p.ticket " +
           "LEFT JOIN FETCH p.items i " +
           "LEFT JOIN FETCH i.medicine " +
           "WHERE p.id = :id")
    Optional<Prescription> findByIdWithDetails(@Param("id") Long id);

    @Query("SELECT DISTINCT p FROM Prescription p " +
           "LEFT JOIN FETCH p.patient " +
           "LEFT JOIN FETCH p.doctor " +
           "LEFT JOIN FETCH p.ticket " +
           "LEFT JOIN FETCH p.items i " +
           "LEFT JOIN FETCH i.medicine " +
           "WHERE p.status IN :statuses")
    List<Prescription> findByStatusIn(@Param("statuses") List<PrescriptionStatus> statuses);

    List<Prescription> findByStatus(PrescriptionStatus status);
    List<Prescription> findByDoctorId(Long doctorId);
    List<Prescription> findByTicketId(Long ticketId);
    Optional<Prescription> findByCode(String code);

    @Query("SELECT DISTINCT p FROM Prescription p " +
           "LEFT JOIN FETCH p.patient " +
           "LEFT JOIN FETCH p.doctor " +
           "LEFT JOIN FETCH p.ticket " +
           "LEFT JOIN FETCH p.items i " +
           "LEFT JOIN FETCH i.medicine " +
           "WHERE p.patient.dpi = :dpi " +
           "ORDER BY p.createdAt DESC")
    List<Prescription> findByPatientDpi(@Param("dpi") String dpi);

    @Query("SELECT COALESCE(MAX(CAST(SUBSTRING(p.code, 5) AS int)), 0) FROM Prescription p WHERE p.code IS NOT NULL")
    int findMaxCodeNumber();
}
