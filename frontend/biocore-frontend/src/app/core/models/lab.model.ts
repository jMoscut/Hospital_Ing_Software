export type SampleType = 'BLOOD' | 'URINE' | 'FECES' | 'NASAL_SWAB' | 'TISSUE' | 'CERVICAL_CELLS';
export type LabOrderStatus = 'PENDING' | 'SAMPLE_COLLECTED' | 'SCHEDULED' | 'PROCESSING' | 'COMPLETED' | 'EXPIRED';
export type PrescriptionStatus = 'PENDING' | 'DISPATCHED' | 'PARTIALLY_DISPATCHED' | 'NOT_DISPATCHED';

export const SAMPLE_TYPE_LABELS: Record<SampleType, string> = {
  BLOOD:          'Sangre',
  URINE:          'Orina',
  FECES:          'Heces',
  NASAL_SWAB:     'Hisopado Nasal',
  TISSUE:         'Tejido',
  CERVICAL_CELLS: 'Células Cervicales'
};

export interface LabExam {
  id: number;
  code: string;         // LAB-001
  name: string;
  sampleType: SampleType;
  category: string;
  active: boolean;
}

export interface LabOrder {
  id: number;
  patientId: number;
  patientName?: string;
  doctorId: number;
  doctorName?: string;
  ticketId?: number;
  labExamId?: number;
  labExamName?: string;   // populated from labExam.name
  labExamCode?: string;   // populated from labExam.code
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
  code?: string;          // FAR-001
  name: string;
  presentation?: string;  // Tableta, Jarabe, etc.
  category?: string;      // Antibiótico, AINE, etc.
  description?: string;
  stock: number;
  price: number;
  unit?: string;
  active: boolean;
}

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
