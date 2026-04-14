package com.biocore.service;

import com.biocore.dto.DashboardDTO;
import com.biocore.enums.TicketStatus;
import com.biocore.repository.PaymentRepository;
import com.biocore.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final TicketRepository ticketRepository;
    private final PaymentRepository paymentRepository;

    /** CU5: Dashboard en tiempo real (RN-R03) */
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
}
