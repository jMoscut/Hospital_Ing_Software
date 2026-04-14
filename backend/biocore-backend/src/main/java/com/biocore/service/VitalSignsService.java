package com.biocore.service;

import com.biocore.dto.VitalSignsRequest;
import com.biocore.entity.Ticket;
import com.biocore.entity.User;
import com.biocore.entity.VitalSigns;
import com.biocore.repository.TicketRepository;
import com.biocore.repository.UserRepository;
import com.biocore.repository.VitalSignsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VitalSignsService {

    private final VitalSignsRepository vitalSignsRepository;
    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;

    @Transactional
    public VitalSigns register(VitalSignsRequest req, Long registeredByUserId) {
        Ticket ticket = ticketRepository.findById(req.getTicketId())
                .orElseThrow(() -> new RuntimeException("Ticket no encontrado: " + req.getTicketId()));

        if (vitalSignsRepository.existsByTicketId(req.getTicketId())) {
            throw new RuntimeException("Ya existen signos vitales registrados para este ticket");
        }

        User registeredBy = userRepository.findById(registeredByUserId).orElse(null);

        VitalSigns vs = VitalSigns.builder()
                .ticket(ticket)
                .bloodPressure(req.getBloodPressure())
                .heartRate(req.getHeartRate())
                .temperature(req.getTemperature())
                .weight(req.getWeight())
                .height(req.getHeight())
                .oxygenSaturation(req.getOxygenSaturation())
                .registeredBy(registeredBy)
                .recordedAt(LocalDateTime.now())
                .build();

        return vitalSignsRepository.save(vs);
    }

    @Transactional(readOnly = true)
    public Optional<VitalSigns> getByTicket(Long ticketId) {
        return vitalSignsRepository.findByTicketId(ticketId);
    }
}
