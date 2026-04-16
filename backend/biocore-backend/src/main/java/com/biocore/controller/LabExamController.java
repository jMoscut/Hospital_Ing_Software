package com.biocore.controller;

import com.biocore.dto.ApiResponse;
import com.biocore.entity.LabExam;
import com.biocore.enums.SampleType;
import com.biocore.repository.LabExamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lab-exams")
@RequiredArgsConstructor
public class LabExamController {

    private final LabExamRepository labExamRepository;

    /** Todos los exámenes activos del catálogo */
    @GetMapping
    public ResponseEntity<ApiResponse<List<LabExam>>> getAll() {
        return ResponseEntity.ok(ApiResponse.ok(labExamRepository.findByActiveTrue()));
    }

    /** Categorías disponibles */
    @GetMapping("/categories")
    public ResponseEntity<ApiResponse<List<String>>> getCategories() {
        return ResponseEntity.ok(ApiResponse.ok(labExamRepository.findDistinctCategories()));
    }

    /** Exámenes por tipo de muestra */
    @GetMapping("/sample-type/{sampleType}")
    public ResponseEntity<ApiResponse<List<LabExam>>> getBySampleType(@PathVariable SampleType sampleType) {
        return ResponseEntity.ok(ApiResponse.ok(labExamRepository.findBySampleTypeAndActiveTrue(sampleType)));
    }

    /** Exámenes por categoría */
    @GetMapping("/category/{category}")
    public ResponseEntity<ApiResponse<List<LabExam>>> getByCategory(@PathVariable String category) {
        return ResponseEntity.ok(ApiResponse.ok(labExamRepository.findByCategoryAndActiveTrue(category)));
    }

    /** Crear examen (solo ADMIN) */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<LabExam>> create(@RequestBody LabExam exam) {
        exam.setActive(true);
        return ResponseEntity.status(201).body(ApiResponse.ok("Examen creado", labExamRepository.save(exam)));
    }

    /** Actualizar examen (solo ADMIN) */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<LabExam>> update(@PathVariable Long id, @RequestBody LabExam data) {
        return labExamRepository.findById(id).map(exam -> {
            exam.setName(data.getName());
            exam.setCategory(data.getCategory());
            exam.setSampleType(data.getSampleType());
            exam.setActive(data.isActive());
            return ResponseEntity.ok(ApiResponse.ok("Examen actualizado", labExamRepository.save(exam)));
        }).orElse(ResponseEntity.status(404).body(ApiResponse.error("Examen no encontrado")));
    }
}
