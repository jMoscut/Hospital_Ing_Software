export type PaymentStatus = 'PENDING' | 'PAID' | 'CANCELLED';
export type PaymentMethod = 'CASH' | 'DEBIT_CARD' | 'CREDIT_CARD';
export type PaymentType = 'CONSULTATION' | 'LABORATORY' | 'PHARMACY' | 'EMERGENCY';

export interface Payment {
  id: number;
  patientId: number;
  patientName?: string;
  ticketId?: number;
  type: PaymentType;
  amount: number;
  discountAmount: number;
  netAmount: number;
  method?: PaymentMethod;
  status: PaymentStatus;
  referenceId?: number;
  invoiceNumber?: string;
  createdAt: string;
  paidAt?: string;
}

export interface Dashboard {
  totalPatientsToday: number;
  patientsWaiting: number;
  patientsInConsultation: number;
  patientsAttended: number;
  patientsCancelled: number;
  totalPaidToday: number;
}
