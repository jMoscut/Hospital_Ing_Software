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
     * CU 01 FA01 / FA02 CU 00: Enviar credenciales temporales al paciente (RN-P003)
     */
    public void sendWelcomeCredentials(String toEmail, String firstName, String username, String tempPassword) {
        if (toEmail == null || toEmail.isBlank()) return;
        try {
            String subject = "Bienvenido a BioCore Medical — Sus credenciales de acceso";
            String body = String.format(
                "Estimado(a) %s,\n\n" +
                "Su registro en el portal de BioCore Medical ha sido completado exitosamente.\n\n" +
                "Sus credenciales de acceso son:\n" +
                "  Usuario: %s\n" +
                "  Contraseña temporal: %s\n\n" +
                "IMPORTANTE: Esta contraseña tiene vigencia de 24 horas. " +
                "Al iniciar sesión por primera vez, el sistema le pedirá que la cambie.\n\n" +
                "Puede acceder al portal en: http://localhost:4200/login\n\n" +
                "Atentamente,\n" +
                "Hospital BioCore Medical",
                firstName, username, tempPassword
            );
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject(subject);
            message.setText(body);
            mailSender.send(message);
            log.info("Credenciales enviadas a {}", toEmail);
        } catch (Exception e) {
            log.error("Error al enviar credenciales de bienvenida: {}", e.getMessage());
        }
    }

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
