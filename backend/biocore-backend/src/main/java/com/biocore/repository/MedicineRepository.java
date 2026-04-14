package com.biocore.repository;

import com.biocore.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Long> {
    List<Medicine> findByActiveTrue();
    List<Medicine> findByActiveTrueAndStockGreaterThan(int minStock);
    List<Medicine> findByActiveTrueAndStockLessThanEqual(int threshold);
}
