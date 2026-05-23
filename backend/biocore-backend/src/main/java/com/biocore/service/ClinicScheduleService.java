package com.biocore.service;

import com.biocore.dto.ClinicScheduleDTO;
import com.biocore.dto.ClinicScheduleRequest;
import com.biocore.entity.Clinic;
import com.biocore.entity.ClinicSchedule;
import com.biocore.repository.ClinicRepository;
import com.biocore.repository.ClinicScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClinicScheduleService {

    private final ClinicScheduleRepository scheduleRepository;
    private final ClinicRepository clinicRepository;

    @Transactional(readOnly = true)
    public List<ClinicScheduleDTO> getByClinic(Long clinicId) {
        return scheduleRepository.findActiveByClinicId(clinicId).stream()
                .map(ClinicScheduleDTO::from).collect(Collectors.toList());
    }

    @Transactional
    public ClinicScheduleDTO create(ClinicScheduleRequest req) {
        Clinic clinic = clinicRepository.findById(req.getClinicId())
                .orElseThrow(() -> new RuntimeException("Clínica no encontrada"));
        if (req.getDayOfWeek() == null && req.getSpecificDate() == null) {
            throw new RuntimeException("Debe especificar día de semana o fecha específica");
        }
        if (req.getStartTime() == null || req.getEndTime() == null) {
            throw new RuntimeException("Debe especificar hora de inicio y fin");
        }

        Optional<ClinicSchedule> existing = req.getDayOfWeek() != null
                ? scheduleRepository.findByClinicIdAndDayOfWeekAndActiveTrue(clinic.getId(), req.getDayOfWeek())
                : scheduleRepository.findByClinicIdAndSpecificDateAndActiveTrue(clinic.getId(), req.getSpecificDate());

        if (existing.isPresent()) {
            ClinicSchedule s = existing.get();
            s.setStartTime(req.getStartTime());
            s.setEndTime(req.getEndTime());
            return ClinicScheduleDTO.from(scheduleRepository.save(s));
        }

        ClinicSchedule s = ClinicSchedule.builder()
                .clinic(clinic)
                .dayOfWeek(req.getDayOfWeek())
                .specificDate(req.getSpecificDate())
                .startTime(req.getStartTime())
                .endTime(req.getEndTime())
                .active(true)
                .build();
        return ClinicScheduleDTO.from(scheduleRepository.save(s));
    }

    @Transactional
    public void delete(Long id) {
        scheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Horario no encontrado"));
        scheduleRepository.deleteById(id);
    }

    /**
     * Generate 30-minute slots for a lab clinic on a given date based on its configured schedule.
     * Returns empty list if no schedule is configured for that day.
     */
    @Transactional(readOnly = true)
    public List<String> getLabSlotsForDate(Long clinicId, LocalDate date) {
        List<ClinicSchedule> schedules = scheduleRepository.findForClinicAndDate(
                clinicId, date, date.getDayOfWeek());
        if (schedules.isEmpty()) return List.of();
        ClinicSchedule s = schedules.get(0);
        return generateHalfHourSlots(s.getStartTime(), s.getEndTime());
    }

    private List<String> generateHalfHourSlots(String start, String end) {
        List<String> slots = new ArrayList<>();
        int startMin = toMinutes(start);
        int endMin   = toMinutes(end);
        for (int m = startMin; m < endMin; m += 30) {
            slots.add(String.format("%02d:%02d", m / 60, m % 60));
        }
        return slots;
    }

    private int toMinutes(String time) {
        String[] parts = time.split(":");
        return Integer.parseInt(parts[0]) * 60 + Integer.parseInt(parts[1]);
    }
}
