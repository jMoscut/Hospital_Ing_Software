package com.biocore.enums;

public enum TicketStatus {
    PENDING_PAYMENT,          // emergency: created but cashier hasn't paid yet
    WAITING,
    CALLED_TO_VITAL_SIGNS,    // health staff called patient to vital signs area
    READY_FOR_DOCTOR,         // vital signs done, doctor hasn't called yet
    BEING_CALLED,             // doctor called patient to their room
    IN_CONSULTATION,
    COMPLETED,
    ABSENT,                   // final absence (second no-show or non-reschedulable)
    ABSENT_PENDING_RESCHEDULE, // first no-show — patient can reschedule once
    RESCHEDULED,              // original ticket replaced by a new rescheduled ticket
    CANCELLED_NO_PAYMENT
}
