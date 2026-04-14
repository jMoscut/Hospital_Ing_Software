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
    path: 'reports',
    canActivate: [authGuard],
    loadComponent: () => import('./modules/reporting/reporting.component').then(m => m.ReportingComponent)
  },
  { path: '**', redirectTo: 'portal' }
];
