package com.biocore.service;

import com.biocore.dto.DoctorScheduleDTO;
import com.biocore.dto.DoctorScheduleRequest;
import com.biocore.entity.Clinic;
import com.biocore.entity.DoctorSchedule;
import com.biocore.entity.User;
import com.biocore.enums.AppointmentStatus;
import com.biocore.repository.AppointmentRepository;
import com.biocore.repository.ClinicRepository;
import com.biocore.repository.DoctorScheduleRepository;
import com.biocore.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DoctorScheduleService {

    static final List<String> ALL_SLOTS =
            Arrays.asList("08:00","09:00","10:00","11:00","12:00","13:00",
                          "14:00","15:00","16:00","17:00","18:00");

    private final DoctorScheduleRepository scheduleRepository;
    private final UserRepository userRepository;
    private final ClinicRepository clinicRepository;
    private final AppointmentRepository appointmentRepository;

    @Transactional(readOnly = true)
    public List<DoctorScheduleDTO> getByDoctor(Long doctorId) {
        return scheduleRepository.findByDoctorId(doctorId).stream()
                .map(DoctorScheduleDTO::from).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<DoctorScheduleDTO> getByClinic(Long clinicId) {
        return scheduleRepository.findActiveByClinicId(clinicId).stream()
                .map(DoctorScheduleDTO::from).collect(Collectors.toList());
    }

    /** Upsert: if a schedule already exists for this doctor+day, update it; otherwise create. */
    @Transactional
    public DoctorScheduleDTO create(DoctorScheduleRequest req) {
        User doctor = userRepository.findById(req.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Médico no encontrado"));
        Clinic clinic = clinicRepository.findById(req.getClinicId())
                .orElseThrow(() -> new RuntimeException("Clínica no encontrada"));
        if (req.getDayOfWeek() == null && req.getSpecificDate() == null) {
            throw new RuntimeException("Debe especificar día de semana o fecha específica");
        }

        Optional<DoctorSchedule> existing = req.getDayOfWeek() != null
                ? scheduleRepository.findByDoctorIdAndDayOfWeekAndActiveTrue(doctor.getId(), req.getDayOfWeek())
                : scheduleRepository.findByDoctorIdAndSpecificDateAndActiveTrue(doctor.getId(), req.getSpecificDate());

        if (existing.isPresent()) {
            DoctorSchedule s = existing.get();
            if (hasAppointments(s)) {
                throw new RuntimeException("No se puede modificar: existen citas agendadas para este horario");
            }
            s.setStartTime(req.getStartTime());
            s.setEndTime(req.getEndTime());
            s.setLunchStartTime(req.getLunchStartTime());
            s.setLunchEndTime(req.getLunchEndTime());
            return DoctorScheduleDTO.from(scheduleRepository.save(s));
        }

        DoctorSchedule s = DoctorSchedule.builder()
                .doctor(doctor).clinic(clinic)
                .dayOfWeek(req.getDayOfWeek()).specificDate(req.getSpecificDate())
                .startTime(req.getStartTime()).endTime(req.getEndTime())
                .lunchStartTime(req.getLunchStartTime()).lunchEndTime(req.getLunchEndTime())
                .active(true).build();
        return DoctorScheduleDTO.from(scheduleRepository.save(s));
    }

    @Transactional
    public DoctorScheduleDTO update(Long id, DoctorScheduleRequest req) {
        DoctorSchedule s = scheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Horario no encontrado"));
        if (hasAppointments(s)) {
            throw new RuntimeException("No se puede modificar: existen citas agendadas para este horario");
        }
        s.setDayOfWeek(req.getDayOfWeek());
        s.setSpecificDate(req.getSpecificDate());
        s.setStartTime(req.getStartTime());
        s.setEndTime(req.getEndTime());
        s.setLunchStartTime(req.getLunchStartTime());
        s.setLunchEndTime(req.getLunchEndTime());
        return DoctorScheduleDTO.from(scheduleRepository.save(s));
    }

    @Transactional
    public void delete(Long id) {
        DoctorSchedule s = scheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Horario no encontrado"));
        if (hasAppointments(s)) {
            throw new RuntimeException("No se puede eliminar: existen citas agendadas para este horario");
        }
        scheduleRepository.deleteById(id);
    }

    /** True if this schedule has ≥1 non-cancelled appointment (today onwards for recurring, exact date for specific). */
    private boolean hasAppointments(DoctorSchedule s) {
        Long doctorId = s.getDoctor().getId();
        LocalDate today = LocalDate.now();
        if (s.getSpecificDate() != null) {
            return appointmentRepository.countByDoctorAndDate(doctorId, s.getSpecificDate(),
                    AppointmentStatus.CANCELLED) > 0;
        }
        return appointmentRepository.findAllByDoctorId(doctorId, AppointmentStatus.CANCELLED)
                .stream()
                .anyMatch(a -> !a.getScheduledDate().isBefore(today)
                            && a.getScheduledDate().getDayOfWeek() == s.getDayOfWeek());
    }

    /**
     * Returns slot → doctor count (capacity) for the given clinic+date.
     * Only slots with at least one scheduled doctor are included.
     */
    @Transactional(readOnly = true)
    public Map<String, Long> getCapacityPerSlot(Long clinicId, LocalDate date) {
        List<DoctorSchedule> schedules = scheduleRepository.findForClinicAndDate(
                clinicId, date, date.getDayOfWeek());
        Map<String, Long> capacity = new LinkedHashMap<>();
        for (String slot : ALL_SLOTS) {
            // Count DISTINCT doctors — a doctor with both recurring + specific date schedules must not double-count.
            // Exclude doctors whose lunch break covers this slot.
            long count = schedules.stream()
                    .filter(s -> s.getStartTime().compareTo(slot) <= 0
                              && s.getEndTime().compareTo(slot) > 0
                              && !isLunchSlot(s, slot))
                    .map(s -> s.getDoctor().getId())
                    .distinct()
                    .count();
            if (count > 0) capacity.put(slot, count);
        }
        return capacity;
    }

    /** Distinct doctor count scheduled at this exact slot, excluding doctors on lunch break. */
    @Transactional(readOnly = true)
    public long getDistinctDoctorCountForSlot(Long clinicId, LocalDate date, String slot) {
        return scheduleRepository.findForClinicAndDate(clinicId, date, date.getDayOfWeek()).stream()
                .filter(s -> s.getStartTime().compareTo(slot) <= 0
                          && s.getEndTime().compareTo(slot) > 0
                          && !isLunchSlot(s, slot))
                .map(s -> s.getDoctor().getId())
                .distinct()
                .count();
    }

    /**
     * Returns doctors scheduled for clinic+date+time, excluding already-booked doctor IDs
     * and doctors whose lunch break covers this slot.
     */
    @Transactional(readOnly = true)
    public List<User> getAvailableDoctorsForSlot(Long clinicId, LocalDate date, String time,
                                                   Set<Long> bookedDoctorIds) {
        List<DoctorSchedule> schedules = scheduleRepository.findForClinicAndDate(
                clinicId, date, date.getDayOfWeek());
        return schedules.stream()
                .filter(s -> s.getStartTime().compareTo(time) <= 0
                          && s.getEndTime().compareTo(time) > 0
                          && !isLunchSlot(s, time)
                          && !bookedDoctorIds.contains(s.getDoctor().getId()))
                .map(DoctorSchedule::getDoctor)
                .collect(Collectors.toMap(User::getId, d -> d, (a, b) -> a, LinkedHashMap::new))
                .values().stream().collect(Collectors.toList());
    }

    /** Returns true if the given slot falls within the schedule's lunch break. */
    private boolean isLunchSlot(DoctorSchedule s, String slot) {
        if (s.getLunchStartTime() == null || s.getLunchEndTime() == null) return false;
        return s.getLunchStartTime().compareTo(slot) <= 0
            && s.getLunchEndTime().compareTo(slot) > 0;
    }
}
