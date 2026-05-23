package com.biocore.repository;

import com.biocore.entity.EmergencyReport;
import com.biocore.enums.EmergencyReportStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmergencyReportRepository extends JpaRepository<EmergencyReport, Long> {
    List<EmergencyReport> findByStatusOrderByCreatedAtDesc(EmergencyReportStatus status);
    List<EmergencyReport> findAllByOrderByCreatedAtDesc();
    Optional<EmergencyReport> findByTicketId(Long ticketId);
    List<EmergencyReport> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(String first, String last);
}
