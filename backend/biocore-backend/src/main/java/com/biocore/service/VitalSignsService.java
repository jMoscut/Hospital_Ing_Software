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

        User registeredBy = userRepository.findById(registeredByUserId).orElse(null);

        // Upsert: update existing record if one already exists (e.g. taken at reception)
        VitalSigns vs = vitalSignsRepository.findByTicketId(req.getTicketId())
                .orElseGet(() -> VitalSigns.builder().ticket(ticket).build());

        vs.setBloodPressure(req.getBloodPressure());
        vs.setHeartRate(req.getHeartRate());
        vs.setTemperature(req.getTemperature());
        vs.setWeight(req.getWeight());
        vs.setHeight(req.getHeight());
        vs.setOxygenSaturation(req.getOxygenSaturation());
        vs.setRegisteredBy(registeredBy);
        vs.setRecordedAt(LocalDateTime.now());

        return vitalSignsRepository.save(vs);
    }

    @Transactional(readOnly = true)
    public Optional<VitalSigns> getByTicket(Long ticketId) {
        return vitalSignsRepository.findByTicketId(ticketId);
    }
}
