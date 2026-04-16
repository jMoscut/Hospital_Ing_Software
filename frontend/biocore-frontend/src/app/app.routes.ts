import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'portal', pathMatch: 'full' },
  {
    path: 'portal',
    loadComponent: () => import('./modules/portal/portal.component').then(m => m.PortalComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./modules/portal/login/login.component').then(m => m.LoginComponent)
  },
  {
    // CU 00: Registro de paciente en línea (público, sin autenticación)
    path: 'register',
    loadComponent: () => import('./modules/public-register/public-register.component').then(m => m.PublicRegisterComponent)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./modules/portal/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'patients',
    canActivate: [authGuard],
    loadComponent: () => import('./modules/patient/patient-list/patient-list.component').then(m => m.PatientListComponent)
  },
  {
    path: 'patients/register',
    canActivate: [authGuard],
    loadComponent: () => import('./modules/patient/patient-register/patient-register.component').then(m => m.PatientRegisterComponent)
  },
  {
    path: 'patients/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./modules/patient/patient-detail/patient-detail.component').then(m => m.PatientDetailComponent)
  },
  {
    path: 'users',
    canActivate: [authGuard],
    loadComponent: () => import('./modules/user-management/user-management.component').then(m => m.UserManagementComponent)
  },
  {
    path: 'consultation',
    canActivate: [authGuard],
    loadComponent: () => import('./modules/consultation/consultation.component').then(m => m.ConsultationComponent)
  },
  {
    path: 'laboratory',
    canActivate: [authGuard],
    loadComponent: () => import('./modules/laboratory/laboratory.component').then(m => m.LaboratoryComponent)
  },
  {
    path: 'pharmacy',
    canActivate: [authGuard],
    loadComponent: () => import('./modules/pharmacy/pharmacy.component').then(m => m.PharmacyComponent)
  },
  {
    path: 'payments',
    canActivate: [authGuard],
    loadComponent: () => import('./modules/payments/payments.component').then(m => m.PaymentsComponent)
  },
  {
    path: 'emergency',
    canActivate: [authGuard],
    loadComponent: () => import('./modules/emergency/emergency.component').then(m => m.EmergencyComponent)
  },
  {
    // CU 01: Módulo de Personal de Salud (recepción + signos vitales)
    path: 'health-staff',
    canActivate: [authGuard],
    loadComponent: () => import('./modules/health-staff/health-staff.component').then(m => m.HealthStaffComponent)
  },
  {
    // CU 03: Agendación de citas
    path: 'appointments',
    canActivate: [authGuard],
    loadComponent: () => import('./modules/appointments/appointments.component').then(m => m.AppointmentsComponent)
  },
  {
    path: 'reports',
    canActivate: [authGuard],
    loadComponent: () => import('./modules/reporting/reporting.component').then(m => m.ReportingComponent)
  },
  {
    // CU 00: Portal del paciente — mis turnos, recetas y laboratorio
    path: 'mis-citas',
    canActivate: [authGuard],
    loadComponent: () => import('./modules/mis-citas/mis-citas.component').then(m => m.MisCitasComponent)
  },
  {
    // CU 03 RN-CT04: Pantalla de sala de espera (sin layout, para monitor dedicado)
    path: 'call-screen',
    canActivate: [authGuard],
    loadComponent: () => import('./modules/call-screen/call-screen.component').then(m => m.CallScreenComponent)
  },
  { path: '**', redirectTo: 'portal' }
];
