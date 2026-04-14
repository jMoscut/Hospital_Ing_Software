export interface Insurance {
  id: number;
  name: 'EL_ROBLE' | 'UNIVERSALES' | 'GT';
  discountPercentage: number;
  description: string;
}

export interface Patient {
  id: number;
  patientCode: string;
  dpi: string;
  firstName: string;
  lastName: string;
  address?: string;
  phone?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  email?: string;
  insuranceId?: number;
  insuranceName?: string;
  discountPercentage?: number;
  active: boolean;
  createdAt: string;
}

export interface PatientCreateRequest {
  dpi: string;
  firstName: string;
  lastName: string;
  address?: string;
  phone?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  email?: string;
  insuranceId?: number;
}
