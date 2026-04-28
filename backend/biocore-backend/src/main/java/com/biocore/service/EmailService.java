package com.biocore.service;

import com.biocore.entity.Appointment;
import com.biocore.entity.LabOrder;
import com.biocore.entity.Patient;
import com.biocore.entity.Payment;
import com.biocore.entity.Prescription;
import com.biocore.entity.Ticket;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

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

    /**
     * CU3 FA02: Resumen de diagnóstico al completar consulta.
     * Incluye receta médica y órdenes de laboratorio.
     */
    public void sendDiagnosisEmail(Patient patient, Ticket ticket,
                                   List<Prescription> prescriptions, List<LabOrder> labOrders) {
        if (patient.getEmail() == null || patient.getEmail().isBlank()) {
            log.warn("No se puede enviar diagnóstico, correo no registrado para paciente {}", patient.getPatientCode());
            return;
        }
        try {
            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
            StringBuilder body = new StringBuilder();
            body.append(String.format("Estimado(a) %s %s,\n\n", patient.getFirstName(), patient.getLastName()));
            body.append("Su consulta médica ha sido completada. A continuación el resumen:\n\n");
            body.append(String.format("Ticket N°: %s\n", ticket.getTicketNumber()));
            if (ticket.getDoctor() != null) {
                body.append(String.format("Médico: Dr. %s %s\n",
                        ticket.getDoctor().getFirstName(), ticket.getDoctor().getLastName()));
            }
            body.append(String.format("Fecha: %s\n\n", LocalDateTime.now().format(dtf)));

            if (!prescriptions.isEmpty()) {
                body.append("RECETA MÉDICA:\n");
                for (Prescription rx : prescriptions) {
                    if (rx.getNotes() != null && !rx.getNotes().isBlank()) {
                        body.append(String.format("  Diagnóstico: %s\n", rx.getNotes()));
                    }
                    for (var item : rx.getItems()) {
                        String med = item.getMedicine() != null
                                ? item.getMedicine().getName() : item.getCustomMedicineName();
                        body.append(String.format("  - %s | Cantidad: %d | Dosis: %s\n",
                                med, item.getQuantity(),
                                item.getDosage() != null ? item.getDosage() : "-"));
                        if (item.getInstructions() != null && !item.getInstructions().isBlank()) {
                            body.append(String.format("    Instrucciones: %s\n", item.getInstructions()));
                        }
                    }
                }
                body.append("\n");
            }

            if (!labOrders.isEmpty()) {
                body.append("ÓRDENES DE LABORATORIO:\n");
                for (LabOrder lo : labOrders) {
                    String examName = lo.getLabExam() != null ? lo.getLabExam().getName() : lo.getSampleType().name();
                    body.append(String.format("  - %s | Vigencia hasta: %s\n",
                            examName, lo.getExpirationDate()));
                    if (lo.getNotes() != null && !lo.getNotes().isBlank()) {
                        body.append(String.format("    Notas: %s\n", lo.getNotes()));
                    }
                }
                body.append("\n");
            }

            body.append("Recuerde presentar este resumen al retirar su medicación o realizarse los exámenes.\n\n");
            body.append("Atentamente,\nHospital BioCore Medical");

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(patient.getEmail());
            message.setSubject("Resumen de Consulta — Hospital BioCore Medical");
            message.setText(body.toString());
            mailSender.send(message);
            log.info("Diagnóstico enviado a {} para ticket {}", patient.getEmail(), ticket.getTicketNumber());
        } catch (Exception e) {
            log.error("Error al enviar diagnóstico: {}", e.getMessage());
        }
    }

    /**
     * CU5: Comprobante de pago al paciente.
     */
    public void sendPaymentReceiptEmail(Patient patient, Payment payment) {
        if (patient.getEmail() == null || patient.getEmail().isBlank()) {
            log.warn("No se puede enviar comprobante, correo no registrado para paciente {}", patient.getPatientCode());
            return;
        }
        try {
            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
            String body = String.format(
                "Estimado(a) %s %s,\n\n" +
                "Su pago ha sido procesado exitosamente. Detalle:\n\n" +
                "N° Factura:       %s\n" +
                "Tipo de servicio: %s\n" +
                "Monto:            Q%.2f\n" +
                "Descuento:        Q%.2f\n" +
                "Total pagado:     Q%.2f\n" +
                "Método de pago:   %s\n" +
                "Fecha:            %s\n\n" +
                "Conserve este comprobante para sus registros.\n\n" +
                "Atentamente,\nHospital BioCore Medical",
                patient.getFirstName(), patient.getLastName(),
                payment.getInvoiceNumber(),
                payment.getType().name(),
                payment.getAmount(),
                payment.getDiscountAmount(),
                payment.getNetAmount(),
                payment.getMethod() != null ? payment.getMethod().name() : "-",
                payment.getPaidAt() != null ? payment.getPaidAt().format(dtf) : "-"
            );

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(patient.getEmail());
            message.setSubject("Comprobante de Pago — Hospital BioCore Medical");
            message.setText(body);
            mailSender.send(message);
            log.info("Comprobante enviado a {} factura {}", patient.getEmail(), payment.getInvoiceNumber());
        } catch (Exception e) {
            log.error("Error al enviar comprobante de pago: {}", e.getMessage());
        }
    }

    /**
     * CU1/CU2: Confirmación de cita y número de ticket al paciente.
     */
    public void sendAppointmentSummaryEmail(Patient patient, Appointment appt, String ticketNumber) {
        if (patient.getEmail() == null || patient.getEmail().isBlank()) {
            log.warn("No se puede enviar resumen de cita, correo no registrado para paciente {}", patient.getPatientCode());
            return;
        }
        try {
            DateTimeFormatter dateFmt = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            String doctorName = appt.getDoctor() != null
                    ? "Dr. " + appt.getDoctor().getFirstName() + " " + appt.getDoctor().getLastName()
                    : "Por asignar";
            String body = String.format(
                "Estimado(a) %s %s,\n\n" +
                "Su cita ha sido confirmada y su pago procesado. Detalle:\n\n" +
                "N° Ticket:        %s\n" +
                "Clínica:          %s\n" +
                "Médico:           %s\n" +
                "Fecha:            %s\n" +
                "Hora:             %s\n" +
                "Tipo:             %s\n\n" +
                "Preséntese con 15 minutos de anticipación. " +
                "Traiga su DPI y este número de ticket: %s\n\n" +
                "Atentamente,\nHospital BioCore Medical",
                patient.getFirstName(), patient.getLastName(),
                ticketNumber,
                appt.getClinic().getName(),
                doctorName,
                appt.getScheduledDate() != null ? appt.getScheduledDate().format(dateFmt) : "-",
                appt.getScheduledTime() != null ? appt.getScheduledTime() : "-",
                appt.getType(),
                ticketNumber
            );

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(patient.getEmail());
            message.setSubject("Confirmación de Cita — Hospital BioCore Medical");
            message.setText(body);
            mailSender.send(message);
            log.info("Confirmación de cita enviada a {} ticket {}", patient.getEmail(), ticketNumber);
        } catch (Exception e) {
            log.error("Error al enviar confirmación de cita: {}", e.getMessage());
        }
    }
}
