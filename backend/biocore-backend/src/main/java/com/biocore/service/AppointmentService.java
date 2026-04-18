package com.biocore.service;

import com.biocore.entity.Appointment;
import com.biocore.entity.Clinic;
import com.biocore.entity.Patient;
import com.biocore.enums.AppointmentStatus;
import com.biocore.repository.AppointmentRepository;
import com.biocore.repository.ClinicRepository;
import com.biocore.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private static final List<String> ALL_SLOTS =
            Arrays.asList("08:00","09:00","10:00","11:00","12:00","13:00",
                          "14:00","15:00","16:00","17:00","18:00");

    private final AppointmentRepository appointmentRepository;
    private final ClinicRepository clinicRepository;
    private final PatientRepository patientRepository;

    /** Returns slots that are still available (not yet booked) for the given clinic+date. */
    @Transactional(readOnly = true)
    public List<String> getAvailableSlots(Long clinicId, LocalDate date) {
        List<String> booked = appointmentRepository.findBookedSlots(
                clinicId, date, AppointmentStatus.CANCELLED);
        return ALL_SLOTS.stream()
                .filter(slot -> !booked.contains(slot))
                .collect(Collectors.toList());
    }

    @Transactional
    public Map<String, Object> book(Long patientId, Long clinicId, String type,
                                    LocalDate scheduledDate, String scheduledTime, String notes) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));
        Clinic clinic = clinicRepository.findById(clinicId)
                .orElseThrow(() -> new RuntimeException("Clínica no encontrada"));

        // Verify slot is still available
        List<String> booked = appointmentRepository.findBookedSlots(
                clinicId, scheduledDate, AppointmentStatus.CANCELLED);
        if (booked.contains(scheduledTime)) {
            throw new RuntimeException("El horario " + scheduledTime + " ya no está disponible para esa fecha.");
        }

        Appointment appt = Appointment.builder()
                .patient(patient)
                .clinic(clinic)
                .type(type)
                .scheduledDate(scheduledDate)
                .scheduledTime(scheduledTime)
                .status(AppointmentStatus.PENDING_PAYMENT)
                .notes(notes)
                .build();

        Appointment saved = appointmentRepository.save(appt);
        return Map.of(
                "id", saved.getId(),
                "patientId", patientId,
                "clinicId", clinicId,
                "scheduledDate", scheduledDate.toString(),
                "scheduledTime", scheduledTime,
                "status", saved.getStatus().name()
        );
    }

    @Transactional
    public Map<String, Object> confirmPayment(Long appointmentId, String paymentMethod, String amount) {
        Appointment appt = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));
        appt.setStatus(AppointmentStatus.CONFIRMED);
        appointmentRepository.save(appt);
        return Map.of(
                "id", appt.getId(),
                "status", AppointmentStatus.CONFIRMED.name(),
                "paymentMethod", paymentMethod != null ? paymentMethod : "ONLINE_CARD"
        );
    }

    @Transactional(readOnly = true)
    public List<Map<String, Object>> getByPatient(Long patientId) {
        return appointmentRepository
                .findByPatientIdOrderByScheduledDateDescScheduledTimeDesc(patientId)
                .stream()
                .map(a -> Map.<String, Object>of(
                        "id", a.getId(),
                        "clinicId", a.getClinic().getId(),
                        "clinicName", a.getClinic().getName(),
                        "type", a.getType(),
                        "scheduledDate", a.getScheduledDate().toString(),
                        "scheduledTime", a.getScheduledTime(),
                        "status", a.getStatus().name(),
                        "createdAt", a.getCreatedAt().toString()
                ))
                .collect(Collectors.toList());
    }
}
