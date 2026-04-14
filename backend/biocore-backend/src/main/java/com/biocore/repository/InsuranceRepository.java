package com.biocore.repository;

import com.biocore.entity.Insurance;
import com.biocore.enums.InsuranceName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InsuranceRepository extends JpaRepository<Insurance, Long> {
    Optional<Insurance> findByName(InsuranceName name);
    boolean existsByName(InsuranceName name);
}
