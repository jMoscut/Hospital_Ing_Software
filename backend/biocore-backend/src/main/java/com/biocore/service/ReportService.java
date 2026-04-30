package com.biocore.service;

import com.biocore.dto.DashboardDTO;
import com.biocore.entity.PharmacySale;
import com.biocore.enums.TicketStatus;
import com.biocore.repository.LabOrderRepository;
import com.biocore.repository.PaymentRepository;
import com.biocore.repository.PharmacySaleRepository;
import com.biocore.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final TicketRepository ticketRepository;
    private final PaymentRepository paymentRepository;
    private final PharmacySaleRepository pharmacySaleRepository;
    private final LabOrderRepository labOrderRepository;

    @Transactional(readOnly = true)
    public DashboardDTO getDashboard() {
        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();

        long total = ticketRepository.countSince(startOfDay);
        long waiting = ticketRepository.countByStatusSince(TicketStatus.WAITING, startOfDay)
                     + ticketRepository.countByStatusSince(TicketStatus.BEING_CALLED, startOfDay);
        long inConsultation = ticketRepository.countByStatusSince(TicketStatus.IN_CONSULTATION, startOfDay);
        long attended = ticketRepository.countByStatusSince(TicketStatus.COMPLETED, startOfDay);
        long cancelled = ticketRepository.countByStatusSince(TicketStatus.CANCELLED_NO_PAYMENT, startOfDay)
                        + ticketRepository.countByStatusSince(TicketStatus.ABSENT, startOfDay);
        long paidToday = paymentRepository.countPaidSince(startOfDay);

        return DashboardDTO.builder()
                .totalPatientsToday(total)
                .patientsWaiting(waiting)
                .patientsInConsultation(inConsultation)
                .patientsAttended(attended)
                .patientsCancelled(cancelled)
                .totalPaidToday(paidToday)
                .build();
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getPatientsPerArea(String period) {
        LocalDateTime[] range = getRange(period);
        List<Object[]> rows = ticketRepository.countByClinicBetween(range[0], range[1]);

        List<Map<String, Object>> data = rows.stream().map(r -> {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("area", r[0]);
            m.put("count", r[1]);
            return m;
        }).collect(Collectors.toList());

        long total = data.stream().mapToLong(m -> ((Number) m.get("count")).longValue()).sum();

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("period", period);
        result.put("from", range[0].toString());
        result.put("to", range[1].toString());
        result.put("total", total);
        result.put("rows", data);
        return result;
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getPharmacySales(String period) {
        LocalDateTime[] range = getRange(period);
        List<PharmacySale> sales = pharmacySaleRepository.findCompletedBetween(range[0], range[1]);

        DateTimeFormatter dayFmt = DateTimeFormatter.ofPattern("dd/MM/yyyy");

        // Aggregate by day
        Map<String, long[]> byDay = new LinkedHashMap<>();
        for (PharmacySale s : sales) {
            if (s.getPaidAt() == null) continue;
            String day = s.getPaidAt().toLocalDate().format(dayFmt);
            byDay.computeIfAbsent(day, k -> new long[]{0, 0});
            byDay.get(day)[0]++;
            byDay.get(day)[1] += s.getNetAmount().multiply(BigDecimal.valueOf(100)).longValue();
        }

        List<Map<String, Object>> rows = byDay.entrySet().stream().map(e -> {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("date", e.getKey());
            m.put("count", e.getValue()[0]);
            m.put("total", BigDecimal.valueOf(e.getValue()[1]).movePointLeft(2));
            return m;
        }).collect(Collectors.toList());

        BigDecimal grandTotal = sales.stream()
                .map(PharmacySale::getNetAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("period", period);
        result.put("from", range[0].toString());
        result.put("to", range[1].toString());
        result.put("totalSales", sales.size());
        result.put("grandTotal", grandTotal);
        result.put("rows", rows);
        return result;
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getDoctorProductivity(String period) {
        LocalDateTime[] range = getRange(period);
        List<Object[]> rows = ticketRepository.countByDoctorBetween(range[0], range[1]);

        List<Map<String, Object>> data = rows.stream().map(r -> {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("doctor", r[0]);
            m.put("consultations", r[1]);
            m.put("clinic", r[2]);
            return m;
        }).collect(Collectors.toList());

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("period", period);
        result.put("from", range[0].toString());
        result.put("to", range[1].toString());
        result.put("rows", data);
        return result;
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getLabExams(String period) {
        LocalDateTime[] range = getRange(period);
        LocalDate from = range[0].toLocalDate();
        LocalDate to = range[1].toLocalDate();
        List<Object[]> rows = labOrderRepository.countByExamBetween(from, to);

        List<Map<String, Object>> data = rows.stream().map(r -> {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("exam", r[0]);
            m.put("count", r[1]);
            return m;
        }).collect(Collectors.toList());

        long total = data.stream().mapToLong(m -> ((Number) m.get("count")).longValue()).sum();

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("period", period);
        result.put("from", from.toString());
        result.put("to", to.toString());
        result.put("total", total);
        result.put("rows", data);
        return result;
    }

    private LocalDateTime[] getRange(String period) {
        LocalDateTime to = LocalDateTime.now();
        LocalDateTime from = switch (period) {
            case "week"  -> LocalDate.now().minusDays(6).atStartOfDay();
            case "month" -> LocalDate.now().withDayOfMonth(1).atStartOfDay();
            case "year"  -> LocalDate.now().withDayOfYear(1).atStartOfDay();
            default      -> LocalDate.now().atStartOfDay();
        };
        return new LocalDateTime[]{from, to};
    }
}
