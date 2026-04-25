export type TicketStatus = 'WAITING' | 'CALLED_TO_VITAL_SIGNS' | 'READY_FOR_DOCTOR' | 'BEING_CALLED' | 'IN_CONSULTATION' | 'COMPLETED' | 'ABSENT' | 'CANCELLED_NO_PAYMENT';
export type TicketPriority = 'NORMAL' | 'URGENT';

export interface Ticket {
  id: number;
  ticketNumber: string;
  patientId: number;
  patientName: string;
  patientCode: string;
  clinicId: number;
  clinicName: string;
  doctorId?: number;
  doctorName?: string;
  status: TicketStatus;
  priority: TicketPriority;
  type: string;
  notes?: string;
  scheduledDate?: string;
  scheduledTime?: string;
  createdAt: string;
  calledAt?: string;
  consultationStartAt?: string;
  completedAt?: string;
}

export interface Clinic {
  id: number;
  name: string;
  type: string;
  maxDoctors: number;
  active: boolean;
  description?: string;
}

export interface VitalSigns {
  id: number;
  ticketId: number;
  bloodPressure?: string;
  heartRate?: number;
  temperature?: number;
  weight?: number;
  height?: number;
  oxygenSaturation?: number;
  recordedAt: string;
}
