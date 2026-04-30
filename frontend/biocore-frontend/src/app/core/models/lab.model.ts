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
  price: number;
  active: boolean;
}

export interface LabOrder {
  id: number;
  patientId: number;
  patientName?: string;
  patientDpi?: string;
  patientEmail?: string;
  doctorId: number;
  doctorName?: string;
  ticketId?: number;
  labExamId?: number;
  labExamName?: string;
  labExamCode?: string;
  sampleType: SampleType;
  status: LabOrderStatus;
  orderDate: string;
  expirationDate: string;
  resultAvailableAt?: string;
  scheduledAt?: string;
  notes?: string;
  // Vitals
  bloodPressure?: string;
  heartRate?: number;
  temperature?: number;
  weight?: number;
  height?: number;
  oxygenSaturation?: number;
  // Result
  resultNotes?: string;
  hasAttachment?: boolean;
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
  code?: string;
  patientId: number;
  patientName?: string;
  patientDpi?: string;
  patientEmail?: string;
  doctorId: number;
  doctorName?: string;
  ticketId?: number;
  status: PrescriptionStatus;
  notes?: string;
  createdAt: string;
  items: PrescriptionItem[];
}

export type PharmacySaleStatus = 'RESERVED' | 'COMPLETED' | 'CANCELLED';

export interface PharmacySaleItem {
  id: number;
  medicineId: number;
  medicineName: string;
  medicineCode?: string;
  presentation?: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface PharmacySale {
  id: number;
  saleCode: string;
  patientId?: number;
  patientName?: string;
  patientDpi?: string;
  patientEmail?: string;
  prescriptionId?: number;
  prescriptionCode?: string;
  status: PharmacySaleStatus;
  totalAmount: number;
  discountAmount: number;
  netAmount: number;
  paymentMethod?: string;
  invoiceNumber?: string;
  createdAt: string;
  paidAt?: string;
  items: PharmacySaleItem[];
}
