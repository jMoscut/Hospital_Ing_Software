package com.biocore.service;

import com.biocore.dto.EmergencyDoctorTicketDTO;
import com.biocore.dto.EmergencyReportDTO;
import com.biocore.dto.PatientCreateRequest;
import com.biocore.dto.TicketDTO;
import com.biocore.entity.*;
import com.biocore.enums.*;
import com.biocore.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmergencyService {

    private final PatientRepository patientRepository;
    private final TicketRepository ticketRepository;
    private final ClinicRepository clinicRepository;
    private final PatientService patientService;
    private final TicketService ticketService;
    private final EmergencyReportRepository reportRepository;
    private final DoctorClinicAssignmentRepository assignmentRepository;
    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final VitalSignsRepository vitalSignsRepository;
    private final EmergencyMedicalReportRepository medicalReportRepository;

    /**
     * CU7: Registrar emergencia.
     * DPI encontrado → usa paciente existente.
     * DPI no encontrado → crea paciente mínimo (sin cuenta) + EmergencyReport.
     * Ticket creado con status=PENDING_PAYMENT y priority=URGENT.
     */
    @Transactional
    public Map<String, Object> registerEmergency(String dpi, String motive,
                                                  String firstName, String lastName,
                                                  String phone, String email) {
        Patient patient = null;
        boolean isExisting = false;

        if (dpi != null && !dpi.isBlank()) {
            Optional<Patient> existing = patientRepository.findByDpi(dpi);
            if (existing.isPresent()) {
                patient = existing.get();
                isExisting = true;
            }
        }

        Clinic emergencyClinic = clinicRepository.findByType(ClinicType.EMERGENCY)
                .orElseThrow(() -> new RuntimeException("No existe clínica de emergencias configurada"));

        EmergencyReport report = null;

        if (!isExisting) {
            // RN-E04: Crear paciente mínimo sin cuenta de usuario
            PatientCreateRequest req = new PatientCreateRequest();
            // Use real DPI if provided, else generate unique temp
            String effectiveDpi = (dpi != null && !dpi.isBlank()) ? dpi
                    : "E" + String.format("%012d", System.currentTimeMillis() % 1_000_000_000_000L);
            req.setDpi(effectiveDpi);
            req.setFirstName(firstName != null && !firstName.isBlank() ? firstName : "Paciente");
            req.setLastName(lastName != null && !lastName.isBlank() ? lastName : "No Identificado");
            req.setPhone(phone);
            req.setEmail(email);
            req.setCreateAccount(false);

            patientService.create(req);
            patient = patientRepository.findByDpi(effectiveDpi).orElseThrow();

            report = EmergencyReport.builder()
                    .dpi(effectiveDpi)
                    .firstName(patient.getFirstName())
                    .lastName(patient.getLastName())
                    .phone(phone)
                    .email(email)
                    .motive(motive)
                    .patient(patient)
                    .status(EmergencyReportStatus.OPEN)
                    .build();
        }

        String ticketNumber = ticketService.generateTicketNumber(emergencyClinic.getId());

        Ticket ticket = Ticket.builder()
                .ticketNumber(ticketNumber)
                .patient(patient)
                .clinic(emergencyClinic)
                .priority(TicketPriority.URGENT)
                .type("EMERGENCIA")
                .status(TicketStatus.PENDING_PAYMENT)
                .notes(motive)
                .build();

        Ticket saved = ticketRepository.save(ticket);

        if (report != null) {
            report.setTicket(saved);
            reportRepository.save(report);
        }

        Map<String, Object> result = new HashMap<>();
        result.put("ticket", TicketDTO.from(saved));
        result.put("isExistingPatient", isExisting);
        result.put("reportId", report != null ? report.getId() : null);
        return result;
    }

    /** Register vital signs for an emergency ticket */
    @Transactional
    public void registerVitals(Long ticketId, String bloodPressure, Integer heartRate,
                                Double temperature, Double weight, Double height, Double oxygenSaturation) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket no encontrado"));

        VitalSigns vitals = VitalSigns.builder()
                .ticket(ticket)
                .bloodPressure(bloodPressure)
                .heartRate(heartRate)
                .temperature(temperature != null ? java.math.BigDecimal.valueOf(temperature) : null)
                .weight(weight != null ? java.math.BigDecimal.valueOf(weight) : null)
                .height(height != null ? java.math.BigDecimal.valueOf(height) : null)
                .oxygenSaturation(oxygenSaturation != null ? oxygenSaturation.intValue() : null)
                .recordedAt(LocalDateTime.now())
                .build();

        vitalSignsRepository.save(vitals);
    }

    /** Returns all emergency tickets pending cashier payment */
    @Transactional(readOnly = true)
    public List<TicketDTO> getPendingPayments() {
        return ticketRepository.findPendingEmergencyPayments()
                .stream().map(TicketDTO::from).collect(Collectors.toList());
    }

    /**
     * Cashier processes emergency payment.
     * Creates Payment record, moves ticket to WAITING, auto-assigns doctor.
     */
    @Transactional
    public Map<String, Object> processPayment(Long ticketId, BigDecimal amount, String paymentMethod) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket de emergencia no encontrado"));

        if (ticket.getStatus() != TicketStatus.PENDING_PAYMENT) {
            throw new RuntimeException("Este ticket ya fue procesado");
        }

        Patient patient = ticket.getPatient();

        // Apply insurance discount if patient has one
        BigDecimal discountAmount = BigDecimal.ZERO;
        if (patient.getInsurance() != null) {
            BigDecimal discountPct = patient.getInsurance().getDiscountPercentage();
            discountAmount = amount.multiply(discountPct).divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
        }
        BigDecimal netAmount = amount.subtract(discountAmount);

        int nextInvoice = paymentRepository.findMaxInvoiceNumber() + 1;
        String invoiceNumber = String.format("FAC-%06d", nextInvoice);

        PaymentMethod method = parseMethod(paymentMethod);

        Payment payment = Payment.builder()
                .patient(patient)
                .ticket(ticket)
                .type(PaymentType.EMERGENCY)
                .amount(amount)
                .discountAmount(discountAmount)
                .netAmount(netAmount)
                .method(method)
                .status(PaymentStatus.PAID)
                .invoiceNumber(invoiceNumber)
                .paidAt(LocalDateTime.now())
                .build();
        paymentRepository.save(payment);

        // Move ticket to queue
        ticket.setStatus(TicketStatus.WAITING);
        ticketRepository.save(ticket);

        // Update emergency report status
        reportRepository.findByTicketId(ticketId).ifPresent(r -> {
            r.setStatus(EmergencyReportStatus.PAID);
            reportRepository.save(r);
        });

        // Auto-assign doctor (equitable: fewest emergency calls today)
        autoAssignDoctor(ticket);

        // Send email receipt if patient has email
        String patientEmail = patient.getEmail();
        if (patientEmail != null && !patientEmail.isBlank()) {
            emailService.sendPaymentReceiptEmail(patient, payment);
        }

        Map<String, Object> result = new HashMap<>();
        result.put("invoiceNumber", invoiceNumber);
        result.put("ticketNumber", ticket.getTicketNumber());
        result.put("patientName", patient.getFirstName() + " " + patient.getLastName());
        result.put("amount", amount);
        result.put("discountAmount", discountAmount);
        result.put("netAmount", netAmount);
        result.put("method", paymentMethod);
        result.put("hasEmail", patientEmail != null && !patientEmail.isBlank());
        result.put("email", patientEmail);
        return result;
    }

    /** Equitable doctor assignment: least emergency calls today among available doctors in emergency clinic */
    private void autoAssignDoctor(Ticket ticket) {
        try {
            List<DoctorClinicAssignment> available =
                    assignmentRepository.findAvailableDoctorsByClinic(ticket.getClinic().getId());
            if (available.isEmpty()) return;

            LocalDateTime todayStart = LocalDate.now().atStartOfDay(ZoneId.of("America/Guatemala")).toLocalDateTime();
            DoctorClinicAssignment chosen = available.stream()
                    .min(Comparator.comparingLong(a ->
                            ticketRepository.countEmergencyTicketsByDoctorToday(a.getDoctor().getId(), todayStart)))
                    .orElse(null);

            if (chosen == null) return;

            ticket.setDoctor(chosen.getDoctor());
            ticketRepository.save(ticket);

            chosen.getDoctor().setAvailable(false);
            userRepository.save(chosen.getDoctor());
        } catch (Exception e) {
            log.warn("No se pudo asignar médico automáticamente: {}", e.getMessage());
        }
    }

    /** Returns all emergency reports (for reports tab) */
    @Transactional(readOnly = true)
    public List<EmergencyReportDTO> getReports() {
        return reportRepository.findAllByOrderByCreatedAtDesc()
                .stream().map(EmergencyReportDTO::from).collect(Collectors.toList());
    }

    /**
     * Complete patient registration from an emergency report.
     * Updates patient data, creates user account, sends credentials email.
     */
    @Transactional
    public EmergencyReportDTO completeRegistration(Long reportId, String firstName, String lastName,
                                                    String dpi, String email, String phone,
                                                    String address, String birthDate) {
        EmergencyReport report = reportRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Reporte no encontrado"));

        Patient patient = report.getPatient();
        if (patient == null) throw new RuntimeException("No hay paciente asociado al reporte");

        if (patient.getUserId() != null) throw new RuntimeException("Este paciente ya tiene cuenta de usuario");

        // Update patient fields
        patient.setFirstName(firstName);
        patient.setLastName(lastName);
        if (dpi != null && !dpi.isBlank()) patient.setDpi(dpi);
        if (email != null && !email.isBlank()) patient.setEmail(email);
        if (phone != null && !phone.isBlank()) patient.setPhone(phone);
        if (address != null && !address.isBlank()) patient.setAddress(address);
        patientRepository.save(patient);

        // Create user account
        String username = (dpi != null && !dpi.isBlank()) ? dpi : patient.getDpi();
        String rawPassword = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        String encodedPassword = passwordEncoder.encode(rawPassword);

        User user = User.builder()
                .firstName(firstName)
                .lastName(lastName)
                .username(username)
                .password(encodedPassword)
                .email(email)
                .role(Role.PATIENT)
                .available(false)
                .build();
        User savedUser = userRepository.save(user);
        patient.setUserId(savedUser.getId());
        patientRepository.save(patient);

        // Send credentials email
        if (email != null && !email.isBlank()) {
            emailService.sendWelcomeCredentials(email, firstName, username, rawPassword);
        }

        report.setStatus(EmergencyReportStatus.PATIENT_REGISTERED);
        report.setEmail(email);
        report.setPhone(phone);
        reportRepository.save(report);

        return EmergencyReportDTO.from(report);
    }

    /** Health staff marks emergency as attended → COMPLETED, frees doctor */
    @Transactional
    public TicketDTO markAttended(Long ticketId) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket no encontrado"));
        ticket.setStatus(TicketStatus.COMPLETED);
        ticket.setCompletedAt(LocalDateTime.now());
        if (ticket.getDoctor() != null) {
            userRepository.findById(ticket.getDoctor().getId()).ifPresent(doc -> {
                doc.setAvailable(true);
                userRepository.save(doc);
            });
        }
        return TicketDTO.from(ticketRepository.save(ticket));
    }

    /** Emergency doctor: all today's COMPLETED emergency tickets (any doctor can report) */
    @Transactional(readOnly = true)
    public List<EmergencyDoctorTicketDTO> getDoctorEmergencyTickets(Long doctorId) {
        LocalDateTime todayStart = LocalDate.now().atStartOfDay(ZoneId.of("America/Guatemala")).toLocalDateTime();
        List<Ticket> tickets = ticketRepository.findTodayCompletedEmergency(todayStart);
        return tickets.stream().map(t -> {
            VitalSigns vitals = vitalSignsRepository.findByTicketId(t.getId()).orElse(null);
            EmergencyMedicalReport report = medicalReportRepository.findByTicketId(t.getId()).orElse(null);
            return EmergencyDoctorTicketDTO.from(t, vitals, report);
        }).collect(Collectors.toList());
    }

    /** Emergency doctor: submit (or update) the medical report for a ticket */
    @Transactional
    public EmergencyDoctorTicketDTO submitMedicalReport(Long ticketId, Long doctorId,
                                                         String diagnosis, String treatment,
                                                         String medications) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket no encontrado"));
        User doctor = userRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Médico no encontrado"));

        EmergencyMedicalReport report = medicalReportRepository.findByTicketId(ticketId)
                .orElse(EmergencyMedicalReport.builder().ticket(ticket).doctor(doctor).build());

        report.setDiagnosis(diagnosis);
        report.setTreatment(treatment);
        report.setMedications(medications);
        report.setClosedAt(LocalDateTime.now());
        report.setDoctor(doctor);
        EmergencyMedicalReport saved = medicalReportRepository.save(report);

        // Send email if patient has one and not yet sent
        Patient patient = ticket.getPatient();
        if (!report.isEmailSent() && patient.getEmail() != null && !patient.getEmail().isBlank()) {
            String doctorName = "Dr. " + doctor.getFirstName() + " " + doctor.getLastName();
            emailService.sendEmergencyMedicalReport(
                    patient, ticket.getTicketNumber(), doctorName, diagnosis, treatment, medications);
            saved.setEmailSent(true);
            medicalReportRepository.save(saved);
        }

        VitalSigns vitals = vitalSignsRepository.findByTicketId(ticketId).orElse(null);
        return EmergencyDoctorTicketDTO.from(ticket, vitals, saved);
    }

    private PaymentMethod parseMethod(String method) {
        try { return PaymentMethod.valueOf(method); }
        catch (Exception e) { return PaymentMethod.CASH; }
    }
}
