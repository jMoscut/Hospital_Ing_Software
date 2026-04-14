package com.biocore.repository;

import com.biocore.entity.VitalSigns;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VitalSignsRepository extends JpaRepository<VitalSigns, Long> {
    Optional<VitalSigns> findByTicketId(Long ticketId);
    boolean existsByTicketId(Long ticketId);
}
