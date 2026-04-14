package com.biocore.repository;

import com.biocore.entity.Clinic;
import com.biocore.enums.ClinicType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClinicRepository extends JpaRepository<Clinic, Long> {
    List<Clinic> findByActiveTrue();
    Optional<Clinic> findByType(ClinicType type);
}
