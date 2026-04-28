import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Ticket, Clinic, VitalSigns } from '../../core/models/ticket.model';
import { ApiResponse } from '../../core/models/api-response.model';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private url = `${environment.apiUrl}/tickets`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<Ticket[]>> {
    return this.http.get<ApiResponse<Ticket[]>>(this.url);
  }

  getByClinic(clinicId: number): Observable<ApiResponse<Ticket[]>> {
    return this.http.get<ApiResponse<Ticket[]>>(`${this.url}/clinic/${clinicId}`);
  }

  getQueue(clinicId: number): Observable<ApiResponse<Ticket[]>> {
    return this.http.get<ApiResponse<Ticket[]>>(`${this.url}/queue/${clinicId}`);
  }

  getQueueForDoctor(clinicId: number, doctorId: number): Observable<ApiResponse<Ticket[]>> {
    return this.http.get<ApiResponse<Ticket[]>>(`${this.url}/queue/${clinicId}/doctor/${doctorId}`);
  }

  getTodayAllActive(): Observable<ApiResponse<Ticket[]>> {
    return this.http.get<ApiResponse<Ticket[]>>(`${this.url}/queue/today`);
  }

  create(data: any): Observable<ApiResponse<Ticket>> {
    return this.http.post<ApiResponse<Ticket>>(this.url, data);
  }

  callNext(clinicId: number): Observable<ApiResponse<Ticket>> {
    return this.http.put<ApiResponse<Ticket>>(`${this.url}/clinic/${clinicId}/call-next`, {});
  }

  callToVitalSigns(clinicId: number): Observable<ApiResponse<Ticket>> {
    return this.http.put<ApiResponse<Ticket>>(`${this.url}/clinic/${clinicId}/call-to-vital-signs`, {});
  }

  callToConsultation(ticketId: number): Observable<ApiResponse<Ticket>> {
    return this.http.put<ApiResponse<Ticket>>(`${this.url}/${ticketId}/call-to-consultation`, {});
  }

  confirmArrival(ticketId: number): Observable<ApiResponse<Ticket>> {
    return this.http.put<ApiResponse<Ticket>>(`${this.url}/${ticketId}/confirm-arrival`, {});
  }

  complete(ticketId: number): Observable<ApiResponse<Ticket>> {
    return this.http.put<ApiResponse<Ticket>>(`${this.url}/${ticketId}/complete`, {});
  }

  markAbsent(ticketId: number): Observable<ApiResponse<Ticket>> {
    return this.http.put<ApiResponse<Ticket>>(`${this.url}/${ticketId}/mark-absent`, {});
  }

  collectSample(ticketId: number): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.url}/${ticketId}/collect-sample`, {});
  }

  getDoctorAvailability(clinicId: number): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${environment.apiUrl}/users/doctors/availability?clinicId=${clinicId}`);
  }

  toggleDoctorAvailability(): Observable<ApiResponse<{ available: boolean }>> {
    return this.http.patch<ApiResponse<{ available: boolean }>>(`${environment.apiUrl}/users/me/toggle-availability`, {});
  }

  getStaffStatus(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${environment.apiUrl}/users/staff/status`);
  }

  getMe(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${environment.apiUrl}/users/me`);
  }

  clearSession(): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${environment.apiUrl}/users/me/session`);
  }

  getByPatient(patientId: number): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${environment.apiUrl}/tickets/patient/${patientId}`);
  }
}

@Injectable({ providedIn: 'root' })
export class PrescriptionService {
  constructor(private http: HttpClient) {}

  getByPatient(patientId: number): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${environment.apiUrl}/prescriptions/patient/${patientId}`);
  }
}

@Injectable({ providedIn: 'root' })
export class ClinicService {
  private url = `${environment.apiUrl}/clinics`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<Clinic[]>> {
    return this.http.get<ApiResponse<Clinic[]>>(this.url);
  }

  create(data: any): Observable<ApiResponse<Clinic>> {
    return this.http.post<ApiResponse<Clinic>>(this.url, data);
  }
}

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private url = `${environment.apiUrl}/appointments`;

  constructor(private http: HttpClient) {}

  getAvailableSlots(date: string, clinicId: number): Observable<ApiResponse<string[]>> {
    return this.http.get<ApiResponse<string[]>>(`${this.url}/available-slots?date=${date}&clinicId=${clinicId}`);
  }

  book(data: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.url, data);
  }

  confirmPayment(appointmentId: number, data: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.url}/${appointmentId}/confirm-payment`, data);
  }

  reserve(data: { patientId: number | null, clinicId: number | null, date: string, time: string }): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.url}/reserve`, data);
  }

  cancelReservation(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.url}/reserve/${id}`);
  }

  getByPatient(patientId: number): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.url}/patient/${patientId}`);
  }

  getByDoctor(doctorId: number, date: string): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.url}/doctor/${doctorId}?date=${date}`);
  }

  getAllByDoctor(doctorId: number): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.url}/doctor/${doctorId}/all`);
  }

  getByVoucherCode(code: string): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.url}/voucher/${code}`);
  }

  uploadDocuments(appointmentId: number, files: File[]): Observable<ApiResponse<any[]>> {
    const form = new FormData();
    files.forEach(f => form.append('files', f));
    return this.http.post<ApiResponse<any[]>>(`${this.url}/${appointmentId}/documents`, form);
  }

  getDocuments(appointmentId: number): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.url}/${appointmentId}/documents`);
  }
}

@Injectable({ providedIn: 'root' })
export class VitalSignsService {
  private url = `${environment.apiUrl}/vital-signs`;

  constructor(private http: HttpClient) {}

  register(data: any): Observable<ApiResponse<VitalSigns>> {
    return this.http.post<ApiResponse<VitalSigns>>(this.url, data);
  }

  getByTicket(ticketId: number): Observable<ApiResponse<VitalSigns>> {
    return this.http.get<ApiResponse<VitalSigns>>(`${this.url}/ticket/${ticketId}`);
  }
}

@Injectable({ providedIn: 'root' })
export class DoctorScheduleService {
  private url = `${environment.apiUrl}/schedules`;

  constructor(private http: HttpClient) {}

  getByDoctor(doctorId: number): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.url}/doctor/${doctorId}`);
  }

  getByClinic(clinicId: number): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.url}/clinic/${clinicId}`);
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
}
