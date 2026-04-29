package com.biocore.enums;

public enum EmergencyReportStatus {
    OPEN,               // registered, awaiting cashier payment
    PAID,               // payment processed, in emergency queue
    PATIENT_REGISTERED  // unregistered patient was later fully registered with account
}
