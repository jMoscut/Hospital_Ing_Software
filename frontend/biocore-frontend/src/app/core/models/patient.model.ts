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
  insuranceNumber?: string;
  active: boolean;
  createdAt: string;
  birthDate?: string;
  /** CU 01: true if the patient has a portal account linked */
  hasAccount?: boolean;
  userId?: number;
  username?: string;
  /** Transient — only present on creation when a temp password was generated */
  tempPassword?: string;
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
  insuranceNumber?: string;
}
