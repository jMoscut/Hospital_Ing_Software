import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse, Role } from '../models/user.model';
import { ApiResponse } from '../models/api-response.model';

const CLINIC_TYPE_KEY = 'biocore_clinic_type';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly TOKEN_KEY = 'biocore_token';
  private readonly USER_KEY = 'biocore_user';

  currentUser = signal<LoginResponse | null>(null);
  doctorClinicType = signal<string | null>(localStorage.getItem(CLINIC_TYPE_KEY));

  constructor(private http: HttpClient, private router: Router) {
    const stored = localStorage.getItem(this.USER_KEY);
    if (stored) {
      this.currentUser.set(JSON.parse(stored));
    }
  }

  login(credentials: LoginRequest): Observable<ApiResponse<LoginResponse>> {
    return this.http.post<ApiResponse<LoginResponse>>(
      `${environment.apiUrl}/auth/login`, credentials
    ).pipe(
      tap(response => {
        if (response.success && response.data) {
          localStorage.setItem(this.TOKEN_KEY, response.data.token);
          localStorage.setItem(this.USER_KEY, JSON.stringify(response.data));
          this.currentUser.set(response.data);
          if (response.data.role === 'DOCTOR') {
            this.fetchDoctorClinicType();
          }
        }
      })
    );
  }

  fetchDoctorClinicType(): void {
    this.http.get<ApiResponse<{ clinicType: string }>>(`${environment.apiUrl}/users/me/clinic-type`)
      .subscribe({ next: res => {
        if (res.success && res.data) {
          const ct = res.data.clinicType;
          localStorage.setItem(CLINIC_TYPE_KEY, ct);
          this.doctorClinicType.set(ct);
        }
      }, error: () => {} });
  }

  logout(): void {
    this.http.delete(`${environment.apiUrl}/users/me/session`).subscribe({ error: () => {} });
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(CLINIC_TYPE_KEY);
    this.currentUser.set(null);
    this.doctorClinicType.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  hasRole(...roles: Role[]): boolean {
    const user = this.currentUser();
    return user ? roles.includes(user.role) : false;
  }

  getUserId(): number | null {
    return this.currentUser()?.userId ?? null;
  }

  getPatientId(): number | null {
    return this.currentUser()?.patientId ?? null;
  }

  updateCurrentUser(updated: LoginResponse): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(updated));
    this.currentUser.set(updated);
  }

  changePassword(currentPassword: string, newPassword: string): Observable<ApiResponse<void>> {
    return this.http.put<ApiResponse<void>>(
      `${environment.apiUrl}/public/change-password`,
      { currentPassword, newPassword }
    );
  }

  changeUsername(newUsername: string, currentPassword: string): Observable<ApiResponse<void>> {
    return this.http.put<ApiResponse<void>>(
      `${environment.apiUrl}/public/change-username`,
      { newUsername, currentPassword }
    );
  }
}
