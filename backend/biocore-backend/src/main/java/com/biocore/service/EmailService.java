package com.biocore.service;

import com.biocore.entity.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class EmailService {

    private final RestTemplate http;

    @Value("${sendgrid.api.key}")
    private String apiKey;

    @Value("${sendgrid.from.email}")
    private String fromEmail;

    @Value("${sendgrid.from.name}")
    private String fromName;

    @Value("${app.frontend.url:http://localhost:4200}")
    private String frontendUrl;

    public EmailService(RestTemplateBuilder builder) {
        this.http = builder.build();
    }

    private void send(String to, String subject, String text) {
        if (to == null || to.isBlank()) return;
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);

            Map<String, Object> body = Map.of(
                "personalizations", List.of(Map.of("to", List.of(Map.of("email", to)))),
                "from", Map.of("email", fromEmail, "name", fromName),
                "subject", subject,
                "content", List.of(Map.of("type", "text/plain", "value", text))
            );

            ResponseEntity<String> resp = http.exchange(
                "https://api.sendgrid.com/v3/mail/send",
                HttpMethod.POST,
                new HttpEntity<>(body, headers),
                String.class
            );

            if (resp.getStatusCode().is2xxSuccessful()) {
                log.info("Email enviado a {}: {}", to, subject);
            } else {
                log.error("SendGrid error {}: {}", resp.getStatusCode(), resp.getBody());
            }
        } catch (Exception e) {
            log.error("Error al enviar email a {}: {} — {}", to, e.getClass().getSimpleName(), e.getMessage());
        }
    }

    public void sendWelcomeCredentials(String toEmail, String firstName, String username, String tempPassword) {
        String body = String.format(
            "Estimado(a) %s,\n\n" +
            "Su registro en el portal de BioCore Medical ha sido completado exitosamente.\n\n" +
            "Sus credenciales de acceso son:\n" +
            "  Usuario: %s\n" +
            "  Contraseña temporal: %s\n\n" +
            "IMPORTANTE: Esta contraseña tiene vigencia de 24 horas. " +
            "Al iniciar sesión por primera vez, el sistema le pedirá que la cambie.\n\n" +
            "Puede acceder al portal en: %s/login\n\n" +
            "Atentamente,\nHospital BioCore Medical",
            firstName, username, tempPassword, frontendUrl
        );
        send(toEmail, "Bienvenido a BioCore Medical — Sus credenciales de acceso", body);
    }

    public void sendPortalRegistrationConfirmation(String toEmail, String firstName, String username) {
        String body = String.format(
            "Estimado(a) %s,\n\n" +
            "Su registro en el portal de BioCore Medical ha sido completado exitosamente.\n\n" +
            "Su nombre de usuario es: %s\n\n" +
            "Puede iniciar sesión en: %s/login\n\n" +
            "Al llegar al hospital, presente su DPI en recepción para recibir su turno.\n\n" +
            "Atentamente,\nHospital BioCore Medical",
            firstName, username, frontendUrl
        );
        send(toEmail, "Registro Exitoso — BioCore Medical Portal", body);
    }

    public void sendLabResultNotification(Patient patient, LabOrder order, LocalDateTime availableAt, File pdfFile) {
        if (patient.getEmail() == null || patient.getEmail().isBlank()) {
            log.warn("RN-L03: No se puede notificar, correo no registrado para paciente {}", patient.getPatientCode());
            return;
        }
        DateTimeFormatter dateFmt = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        DateTimeFormatter timeFmt = DateTimeFormatter.ofPattern("HH:mm");
        String examName = order.getLabExam() != null ? order.getLabExam().getName() : order.getSampleType().name();

        String body = String.format(
            "Estimado(a) %s %s,\n\n" +
            "Sus resultados de laboratorio fueron culminados el día %s a las %s horas.\n\n" +
            "Examen: %s\nTipo de muestra: %s\nCódigo de paciente: %s\n\n" +
            "Para consultar sus resultados acuda al hospital con su DPI o código de paciente.\n\n" +
            "Atentamente,\nHospital BioCore Medical",
            patient.getFirstName(), patient.getLastName(),
            availableAt.format(dateFmt), availableAt.format(timeFmt),
            examName, order.getSampleType().name(), patient.getPatientCode()
        );
        send(patient.getEmail(), "Resultados de Laboratorio - Hospital BioCore Medical", body);
    }

    public void sendDiagnosisEmail(Patient patient, Ticket ticket,
                                   List<Prescription> prescriptions, List<LabOrder> labOrders) {
        if (patient.getEmail() == null || patient.getEmail().isBlank()) {
            log.warn("No se puede enviar diagnóstico, correo no registrado para paciente {}", patient.getPatientCode());
            return;
        }
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
                if (rx.getNotes() != null && !rx.getNotes().isBlank())
                    body.append(String.format("  Diagnóstico: %s\n", rx.getNotes()));
                for (var item : rx.getItems()) {
                    String med = item.getMedicine() != null
                            ? item.getMedicine().getName() : item.getCustomMedicineName();
                    body.append(String.format("  - %s | Cantidad: %d | Dosis: %s\n",
                            med, item.getQuantity(),
                            item.getDosage() != null ? item.getDosage() : "-"));
                    if (item.getInstructions() != null && !item.getInstructions().isBlank())
                        body.append(String.format("    Instrucciones: %s\n", item.getInstructions()));
                }
            }
            body.append("\n");
        }

        if (!labOrders.isEmpty()) {
            body.append("ÓRDENES DE LABORATORIO:\n");
            for (LabOrder lo : labOrders) {
                String examName = lo.getLabExam() != null ? lo.getLabExam().getName() : lo.getSampleType().name();
                body.append(String.format("  - %s | Vigencia hasta: %s\n", examName, lo.getExpirationDate()));
                if (lo.getNotes() != null && !lo.getNotes().isBlank())
                    body.append(String.format("    Notas: %s\n", lo.getNotes()));
            }
            body.append("\n");
        }

        body.append("Recuerde presentar este resumen al retirar su medicación o realizarse los exámenes.\n\n");
        body.append("Atentamente,\nHospital BioCore Medical");
        send(patient.getEmail(), "Resumen de Consulta — Hospital BioCore Medical", body.toString());
    }

    public void sendPaymentReceiptEmail(Patient patient, Payment payment) {
        if (patient.getEmail() == null || patient.getEmail().isBlank()) {
            log.warn("No se puede enviar comprobante, correo no registrado para paciente {}", patient.getPatientCode());
            return;
        }
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
        send(patient.getEmail(), "Comprobante de Pago — Hospital BioCore Medical", body);
    }

    public void sendEmergencyMedicalReport(Patient patient, String ticketNumber,
                                            String doctorName, String diagnosis,
                                            String treatment, String medications) {
        if (patient.getEmail() == null || patient.getEmail().isBlank()) return;
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
        StringBuilder body = new StringBuilder();
        body.append(String.format("Estimado(a) %s %s,\n\n", patient.getFirstName(), patient.getLastName()));
        body.append("Su reporte médico de emergencia ha sido cerrado. Detalle:\n\n");
        body.append(String.format("Ticket N°: %s\nMédico: %s\nFecha: %s\n\n",
                ticketNumber, doctorName, LocalDateTime.now().format(dtf)));
        if (diagnosis != null && !diagnosis.isBlank())
            body.append(String.format("DIAGNÓSTICO:\n%s\n\n", diagnosis));
        if (treatment != null && !treatment.isBlank())
            body.append(String.format("TRATAMIENTO:\n%s\n\n", treatment));
        if (medications != null && !medications.isBlank())
            body.append(String.format("MEDICAMENTOS INDICADOS:\n%s\n\n", medications));
        body.append("Conserve este reporte para sus registros médicos.\n\nAtentamente,\nHospital BioCore Medical");
        send(patient.getEmail(), "Reporte Médico de Emergencia — Hospital BioCore Medical", body.toString());
    }

    public void sendPharmacyReceiptEmail(PharmacySale sale) {
        Patient patient = sale.getPatient();
        if (patient == null || patient.getEmail() == null || patient.getEmail().isBlank()) return;
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
        StringBuilder body = new StringBuilder();
        body.append(String.format("Estimado(a) %s %s,\n\n", patient.getFirstName(), patient.getLastName()));
        body.append("Su compra en Farmacia BioCore Medical ha sido procesada exitosamente.\n\n");
        body.append(String.format("N° Factura:     %s\nCódigo venta:   %s\n",
                sale.getInvoiceNumber(), sale.getSaleCode()));
        if (sale.getPrescription() != null && sale.getPrescription().getCode() != null)
            body.append(String.format("Receta:         %s\n", sale.getPrescription().getCode()));
        body.append(String.format("Método de pago: %s\nFecha:          %s\n\n",
                sale.getPaymentMethod() != null ? sale.getPaymentMethod().name() : "-",
                sale.getPaidAt() != null ? sale.getPaidAt().format(dtf) : "-"));
        body.append("DETALLE DE MEDICAMENTOS:\n");
        for (PharmacySaleItem item : sale.getItems()) {
            body.append(String.format("  - %s | Cantidad: %d | Precio: Q%.2f | Subtotal: Q%.2f\n",
                    item.getMedicine().getName(), item.getQuantity(),
                    item.getUnitPrice(), item.getSubtotal()));
        }
        body.append(String.format("\nTotal:          Q%.2f\n", sale.getTotalAmount()));
        if (sale.getDiscountAmount().compareTo(java.math.BigDecimal.ZERO) > 0) {
            body.append(String.format("Descuento:      Q%.2f\nTotal pagado:   Q%.2f\n",
                    sale.getDiscountAmount(), sale.getNetAmount()));
        }
        body.append("\nGracias por su preferencia.\n\nAtentamente,\nFarmacia BioCore Medical");
        send(patient.getEmail(), "Comprobante Farmacia — Hospital BioCore Medical", body.toString());
    }

    public void sendAppointmentSummaryEmail(Patient patient, Appointment appt, String ticketNumber) {
        if (patient.getEmail() == null || patient.getEmail().isBlank()) {
            log.warn("No se puede enviar resumen de cita, correo no registrado para paciente {}", patient.getPatientCode());
            return;
        }
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
        send(patient.getEmail(), "Confirmación de Cita — Hospital BioCore Medical", body);
    }
}
