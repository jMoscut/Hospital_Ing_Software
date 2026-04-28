package com.biocore.controller;

import com.biocore.dto.ApiResponse;
import com.biocore.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;

    /** Upload PDFs for a confirmed appointment (called by patient portal or cashier) */
    @PostMapping("/api/appointments/{id}/documents")
    @PreAuthorize("hasAnyRole('PATIENT', 'CASHIER', 'ADMIN')")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> upload(
            @PathVariable Long id,
            @RequestParam("files") MultipartFile[] files) {
        try {
            return ResponseEntity.ok(ApiResponse.ok(documentService.uploadForAppointment(id, files)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    /** List documents attached to an appointment */
    @GetMapping("/api/appointments/{id}/documents")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> list(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(ApiResponse.ok(documentService.getByAppointment(id)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    /** Serve a PDF file inline so the browser can render it */
    @GetMapping("/api/documents/{id}/file")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Resource> serveFile(@PathVariable Long id) {
        try {
            Resource resource = documentService.serveDocument(id);
            String fileName = documentService.getFileName(id);
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileName + "\"")
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
