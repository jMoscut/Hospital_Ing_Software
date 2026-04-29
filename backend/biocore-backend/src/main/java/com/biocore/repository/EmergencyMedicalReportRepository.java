package com.biocore.repository;

import com.biocore.entity.EmergencyMedicalReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmergencyMedicalReportRepository extends JpaRepository<EmergencyMedicalReport, Long> {
    Optional<EmergencyMedicalReport> findByTicketId(Long ticketId);
    boolean existsByTicketId(Long ticketId);
}
