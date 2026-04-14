package com.biocore.controller;

import com.biocore.dto.ApiResponse;
import com.biocore.entity.Medicine;
import com.biocore.repository.MedicineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicines")
@RequiredArgsConstructor
public class MedicineController {

    private final MedicineRepository medicineRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Medicine>>> getAll() {
        return ResponseEntity.ok(ApiResponse.ok(medicineRepository.findByActiveTrue()));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'PHARMACIST')")
    public ResponseEntity<ApiResponse<Medicine>> create(@RequestBody Medicine medicine) {
        medicine.setActive(true);
        return ResponseEntity.status(201).body(ApiResponse.ok("Medicamento creado", medicineRepository.save(medicine)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'PHARMACIST')")
    public ResponseEntity<ApiResponse<Medicine>> update(@PathVariable Long id, @RequestBody Medicine data) {
        return medicineRepository.findById(id).map(med -> {
            med.setName(data.getName());
            med.setDescription(data.getDescription());
            med.setPrice(data.getPrice());
            med.setUnit(data.getUnit());
            return ResponseEntity.ok(ApiResponse.ok("Medicamento actualizado", medicineRepository.save(med)));
        }).orElse(ResponseEntity.status(404).body(ApiResponse.error("Medicamento no encontrado")));
    }

    @PutMapping("/{id}/stock")
    @PreAuthorize("hasAnyRole('ADMIN', 'PHARMACIST')")
    public ResponseEntity<ApiResponse<Medicine>> updateStock(@PathVariable Long id,
                                                              @RequestParam int quantity) {
        return medicineRepository.findById(id).map(med -> {
            med.setStock(med.getStock() + quantity);
            return ResponseEntity.ok(ApiResponse.ok("Stock actualizado", medicineRepository.save(med)));
        }).orElse(ResponseEntity.status(404).body(ApiResponse.error("Medicamento no encontrado")));
    }

    @GetMapping("/low-stock")
    @PreAuthorize("hasAnyRole('ADMIN', 'PHARMACIST')")
    public ResponseEntity<ApiResponse<List<Medicine>>> getLowStock(@RequestParam(defaultValue = "10") int threshold) {
        return ResponseEntity.ok(ApiResponse.ok(medicineRepository.findByActiveTrueAndStockLessThanEqual(threshold)));
    }
}
