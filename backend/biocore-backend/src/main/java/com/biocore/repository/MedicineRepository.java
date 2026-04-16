package com.biocore.repository;

import com.biocore.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Long> {
    List<Medicine> findByActiveTrue();
    List<Medicine> findByActiveTrueAndStockGreaterThan(int minStock);
    List<Medicine> findByActiveTrueAndStockLessThanEqual(int threshold);
    List<Medicine> findByCategoryAndActiveTrue(String category);
    Optional<Medicine> findByCode(String code);
    boolean existsByCode(String code);

    @Query("SELECT DISTINCT m.category FROM Medicine m WHERE m.active = true AND m.category IS NOT NULL ORDER BY m.category")
    List<String> findDistinctCategories();
}
