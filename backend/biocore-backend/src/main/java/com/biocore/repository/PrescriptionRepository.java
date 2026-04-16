package com.biocore.repository;

import com.biocore.entity.Prescription;
import com.biocore.enums.PrescriptionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
    List<Prescription> findByPatientIdOrderByCreatedAtDesc(Long patientId);
    List<Prescription> findByStatus(PrescriptionStatus status);
    List<Prescription> findByStatusIn(List<PrescriptionStatus> statuses);
    List<Prescription> findByDoctorId(Long doctorId);
    List<Prescription> findByTicketId(Long ticketId);
}
