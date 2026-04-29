import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Payment, PaymentMethod, Dashboard } from '../../core/models/payment.model';
import { ApiResponse } from '../../core/models/api-response.model';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private url = `${environment.apiUrl}/payments`;

  constructor(private http: HttpClient) {}

  getByPatient(patientId: number): Observable<ApiResponse<Payment[]>> {
    return this.http.get<ApiResponse<Payment[]>>(`${this.url}/patient/${patientId}`);
  }

  getPending(patientId: number): Observable<ApiResponse<Payment[]>> {
    return this.http.get<ApiResponse<Payment[]>>(`${this.url}/pending/${patientId}`);
  }

  create(data: any): Observable<ApiResponse<Payment>> {
    return this.http.post<ApiResponse<Payment>>(this.url, data);
  }

  process(id: number, method: PaymentMethod): Observable<ApiResponse<Payment>> {
    return this.http.put<ApiResponse<Payment>>(`${this.url}/${id}/process?method=${method}`, {});
  }
}

@Injectable({ providedIn: 'root' })
export class ReportService {
  private url = `${environment.apiUrl}/reports`;

  constructor(private http: HttpClient) {}

  getDashboard(): Observable<ApiResponse<Dashboard>> {
    return this.http.get<ApiResponse<Dashboard>>(`${this.url}/dashboard`);
  }

  getPatientExpedient(patientCode: string): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.url}/patient/${patientCode}`);
  }
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private url = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(this.url);
  }

  create(data: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.url, data);
  }

  update(id: number, data: any): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.url}/${id}`, data);
  }

  delete(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.url}/${id}`);
  }

  assignClinic(doctorId: number, clinicId: number): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.url}/assign-clinic`, { doctorId, clinicId });
  }

  unassignClinic(doctorId: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.url}/${doctorId}/unassign-clinic`);
  }
}

@Injectable({ providedIn: 'root' })
export class EmergencyService {
  private url = `${environment.apiUrl}/emergency`;

  constructor(private http: HttpClient) {}

  register(data: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.url}/register`, data);
  }

  registerVitals(ticketId: number, data: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.url}/vitals/${ticketId}`, data);
  }

  getPendingPayments(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.url}/pending-payments`);
  }

  processPayment(ticketId: number, amount: number, method: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.url}/payment/${ticketId}/process`, { amount, method });
  }

  getReports(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.url}/reports`);
  }

  completeRegistration(reportId: number, data: any): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.url}/reports/${reportId}/register-patient`, data);
  }

  markAttended(ticketId: number): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.url}/tickets/${ticketId}/mark-attended`, {});
  }

  getMyEmergencyTickets(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.url}/my-tickets`);
  }

  submitMedicalReport(ticketId: number, data: { diagnosis: string; treatment: string; medications: string }): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.url}/tickets/${ticketId}/medical-report`, data);
  }
}

@Injectable({ providedIn: 'root' })
export class InsuranceService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${environment.apiUrl}/insurances`);
  }

  getAllPublic(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${environment.apiUrl}/public/insurances`);
  }
}
