export type SampleType = 'URINE' | 'FECES' | 'BLOOD';
export type LabOrderStatus = 'PENDING' | 'SAMPLE_COLLECTED' | 'SCHEDULED' | 'PROCESSING' | 'COMPLETED' | 'EXPIRED';

export interface LabOrder {
  id: number;
  patientId: number;
  patientName?: string;
  doctorId: number;
  doctorName?: string;
  ticketId?: number;
  sampleType: SampleType;
  status: LabOrderStatus;
  orderDate: string;
  expirationDate: string;
  resultAvailableAt?: string;
  scheduledAt?: string;
  notes?: string;
}

export interface Medicine {
  id: number;
  name: string;
  description?: string;
  stock: number;
  price: number;
  unit?: string;
  active: boolean;
}

export type PrescriptionStatus = 'PENDING' | 'DISPATCHED' | 'PARTIALLY_DISPATCHED' | 'NOT_DISPATCHED';

export interface PrescriptionItem {
  id: number;
  medicineId: number;
  medicineName?: string;
  quantity: number;
  dosage?: string;
  instructions?: string;
  dispatched: boolean;
  medicine?: Medicine;
}

export interface Prescription {
  id: number;
  patientId: number;
  patientName?: string;
  doctorId: number;
  doctorName?: string;
  ticketId?: number;
  status: PrescriptionStatus;
  notes?: string;
  createdAt: string;
  items: PrescriptionItem[];
}
