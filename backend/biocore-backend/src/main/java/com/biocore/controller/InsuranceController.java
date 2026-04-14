package com.biocore.controller;

import com.biocore.dto.ApiResponse;
import com.biocore.entity.Insurance;
import com.biocore.repository.InsuranceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/insurances")
@RequiredArgsConstructor
public class InsuranceController {

    private final InsuranceRepository insuranceRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Insurance>>> getAll() {
        return ResponseEntity.ok(ApiResponse.ok(insuranceRepository.findAll()));
    }
}
