package com.biocore.service;

import com.biocore.entity.Appointment;
import com.biocore.entity.Document;
import com.biocore.repository.AppointmentRepository;
import com.biocore.repository.DocumentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DocumentService {

    @Value("${app.upload.dir}")
    private String uploadDir;

    private final DocumentRepository documentRepository;
    private final AppointmentRepository appointmentRepository;

    @Transactional
    public List<Map<String, Object>> uploadForAppointment(Long appointmentId, MultipartFile[] files) throws IOException {
        Appointment appt = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));

        Path dir = Paths.get(uploadDir, "appointments", appointmentId.toString());
        Files.createDirectories(dir);

        return List.of(files).stream().map(file -> {
            try {
                String original = file.getOriginalFilename();
                String safeName = System.currentTimeMillis() + "_" +
                        (original != null ? original.replaceAll("[^a-zA-Z0-9._-]", "_") : "document.pdf");
                Path dest = dir.resolve(safeName);
                file.transferTo(dest);

                Document doc = Document.builder()
                        .patient(appt.getPatient())
                        .appointment(appt)
                        .fileName(original != null ? original : safeName)
                        .filePath(dest.toAbsolutePath().toString())
                        .fileSize(file.getSize())
                        .build();
                return toMap(documentRepository.save(doc));
            } catch (IOException e) {
                throw new RuntimeException("Error al guardar archivo: " + file.getOriginalFilename(), e);
            }
        }).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<Map<String, Object>> getByAppointment(Long appointmentId) {
        return documentRepository.findByAppointmentId(appointmentId)
                .stream().map(this::toMap).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Resource serveDocument(Long documentId) {
        Document doc = documentRepository.findById(documentId)
                .orElseThrow(() -> new RuntimeException("Documento no encontrado"));
        Path path = Paths.get(doc.getFilePath());
        if (!Files.exists(path)) throw new RuntimeException("Archivo no encontrado en disco");
        return new FileSystemResource(path);
    }

    @Transactional(readOnly = true)
    public String getFileName(Long documentId) {
        return documentRepository.findById(documentId)
                .map(Document::getFileName)
                .orElse("document.pdf");
    }

    private Map<String, Object> toMap(Document d) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("id", d.getId());
        m.put("fileName", d.getFileName());
        m.put("fileSize", d.getFileSize());
        m.put("uploadedAt", d.getUploadedAt());
        return m;
    }
}
