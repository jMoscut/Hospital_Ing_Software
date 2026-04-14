package com.biocore.service;

import com.biocore.entity.LabOrder;
import com.biocore.entity.Patient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    /**
     * CU4 FA01: Notificación de resultados de laboratorio
     * RN-L02: Fecha DD/MM/AAAA y hora en formato 24 horas
     */
    public void sendLabResultNotification(Patient patient, LabOrder order, LocalDateTime availableAt) {
        if (patient.getEmail() == null || patient.getEmail().isBlank()) {
            log.warn("RN-L03: No se puede notificar, correo no registrado para paciente {}", patient.getPatientCode());
            return;
        }

        try {
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");

            String subject = "Notificación de Resultados - Laboratorio Hospital BioCore";
            String body = String.format(
                "Estimado(a) %s %s,\n\n" +
                "Le informamos que sus resultados de laboratorio fueron culminados el día %s " +
                "a las %s horas y adjuntamos el resultado de dichos exámenes en este correo.\n\n" +
                "Tipo de muestra: %s\n" +
                "Código de paciente: %s\n\n" +
                "Para cualquier consulta, agendar una nueva cita en la página y adjuntar laboratorios. " +
                "Favor presentar su ticket o código de paciente.\n\n" +
                "Atentamente,\n" +
                "Hospital BioCore Medical",
                patient.getFirstName(),
                patient.getLastName(),
                availableAt.format(dateFormatter),
                availableAt.format(timeFormatter),
                order.getSampleType().name(),
                patient.getPatientCode()
            );

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(patient.getEmail());
            message.setSubject(subject);
            message.setText(body);

            mailSender.send(message);
            log.info("Notificación enviada a {} para orden {}", patient.getEmail(), order.getId());
        } catch (Exception e) {
            log.error("Error al enviar notificación de laboratorio: {}", e.getMessage());
        }
    }
}
