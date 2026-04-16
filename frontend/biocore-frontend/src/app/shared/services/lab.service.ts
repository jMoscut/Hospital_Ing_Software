import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LabExam, LabOrder, Medicine, Prescription } from '../../core/models/lab.model';
import { ApiResponse } from '../../core/models/api-response.model';

@Injectable({ providedIn: 'root' })
export class LabService {
  private url = `${environment.apiUrl}/lab-orders`;

  constructor(private http: HttpClient) {}

  getByPatient(patientId: number): Observable<ApiResponse<LabOrder[]>> {
    return this.http.get<ApiResponse<LabOrder[]>>(`${this.url}/patient/${patientId}`);
  }

  getPending(): Observable<ApiResponse<LabOrder[]>> {
    return this.http.get<ApiResponse<LabOrder[]>>(`${this.url}/pending`);
  }

  create(data: any): Observable<ApiResponse<LabOrder>> {
    return this.http.post<ApiResponse<LabOrder>>(this.url, data);
  }

  collectSample(id: number): Observable<ApiResponse<LabOrder>> {
    return this.http.put<ApiResponse<LabOrder>>(`${this.url}/${id}/collect-sample`, {});
  }

  schedule(id: number, scheduledAt: string): Observable<ApiResponse<LabOrder>> {
    return this.http.put<ApiResponse<LabOrder>>(`${this.url}/${id}/schedule`, { scheduledAt });
  }

  complete(id: number, notes: string, resultAvailableAt: string): Observable<ApiResponse<LabOrder>> {
    return this.http.put<ApiResponse<LabOrder>>(`${this.url}/${id}/complete`, { notes, resultAvailableAt });
  }
}

@Injectable({ providedIn: 'root' })
export class LabExamService {
  private url = `${environment.apiUrl}/lab-exams`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<LabExam[]>> {
    return this.http.get<ApiResponse<LabExam[]>>(this.url);
  }

  getCategories(): Observable<ApiResponse<string[]>> {
    return this.http.get<ApiResponse<string[]>>(`${this.url}/categories`);
  }

  getByCategory(category: string): Observable<ApiResponse<LabExam[]>> {
    return this.http.get<ApiResponse<LabExam[]>>(`${this.url}/category/${encodeURIComponent(category)}`);
  }
}

@Injectable({ providedIn: 'root' })
export class MedicineService {
  private url = `${environment.apiUrl}/medicines`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<Medicine[]>> {
    return this.http.get<ApiResponse<Medicine[]>>(this.url);
  }

  create(data: any): Observable<ApiResponse<Medicine>> {
    return this.http.post<ApiResponse<Medicine>>(this.url, data);
  }

  update(id: number, data: any): Observable<ApiResponse<Medicine>> {
    return this.http.put<ApiResponse<Medicine>>(`${this.url}/${id}`, data);
  }

  updateStock(id: number, quantity: number): Observable<ApiResponse<Medicine>> {
    return this.http.put<ApiResponse<Medicine>>(`${this.url}/${id}/stock?quantity=${quantity}`, {});
  }

  getLowStock(threshold: number = 10): Observable<ApiResponse<Medicine[]>> {
    return this.http.get<ApiResponse<Medicine[]>>(`${this.url}/low-stock?threshold=${threshold}`);
  }
}

@Injectable({ providedIn: 'root' })
export class PrescriptionService {
  private url = `${environment.apiUrl}/prescriptions`;

  constructor(private http: HttpClient) {}

  create(data: any): Observable<ApiResponse<Prescription>> {
    return this.http.post<ApiResponse<Prescription>>(this.url, data);
  }

  getById(id: number): Observable<ApiResponse<Prescription>> {
    return this.http.get<ApiResponse<Prescription>>(`${this.url}/${id}`);
  }

  getByPatient(patientId: number): Observable<ApiResponse<Prescription[]>> {
    return this.http.get<ApiResponse<Prescription[]>>(`${this.url}/patient/${patientId}`);
  }

  getPendingForPharmacy(): Observable<ApiResponse<Prescription[]>> {
    return this.http.get<ApiResponse<Prescription[]>>(`${this.url}/pharmacy`);
  }

  dispatch(id: number, itemIds: number[]): Observable<ApiResponse<Prescription>> {
    return this.http.put<ApiResponse<Prescription>>(`${this.url}/${id}/dispatch`, itemIds);
  }
}
