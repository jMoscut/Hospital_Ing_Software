package com.biocore.enums;

public enum TicketStatus {
    WAITING,
    CALLED_TO_VITAL_SIGNS,  // health staff called patient to vital signs area
    READY_FOR_DOCTOR,       // vital signs done, doctor hasn't called yet
    BEING_CALLED,           // doctor called patient to their room
    IN_CONSULTATION,
    COMPLETED,
    ABSENT,
    CANCELLED_NO_PAYMENT
}
