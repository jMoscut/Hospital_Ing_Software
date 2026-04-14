export type Role = 'ADMIN' | 'DOCTOR' | 'NURSE' | 'LAB_TECHNICIAN' | 'PHARMACIST' | 'CASHIER' | 'HEALTH_STAFF';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  specialty?: string;
  collegiateNumber?: string;
  role: Role;
  active: boolean;
  createdAt: string;
  assignedClinic?: string;
  assignedClinicId?: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  role: Role;
  firstName: string;
  lastName: string;
  userId: number;
}
