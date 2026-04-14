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

  create(data: any): Observable<ApiResponse<Ticket>> {
    return this.http.post<ApiResponse<Ticket>>(this.url, data);
  }

  callNext(clinicId: number): Observable<ApiResponse<Ticket>> {
    return this.http.put<ApiResponse<Ticket>>(`${this.url}/clinic/${clinicId}/call-next`, {});
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
