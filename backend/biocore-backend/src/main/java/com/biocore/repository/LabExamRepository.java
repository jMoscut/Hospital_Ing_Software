package com.biocore.repository;

import com.biocore.entity.LabExam;
import com.biocore.enums.SampleType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface LabExamRepository extends JpaRepository<LabExam, Long> {

    List<LabExam> findByActiveTrue();

    List<LabExam> findBySampleTypeAndActiveTrue(SampleType sampleType);

    List<LabExam> findByCategoryAndActiveTrue(String category);

    Optional<LabExam> findByCode(String code);

    boolean existsByCode(String code);

    @Query("SELECT DISTINCT e.category FROM LabExam e WHERE e.active = true ORDER BY e.category")
    List<String> findDistinctCategories();
}
