import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PatientService } from '../../shared/services/patient.service';
import { EmergencyService } from '../../shared/services/payment.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Patient } from '../../core/models/patient.model';

@Component({
  selector: 'app-emergency',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule,
    MatCardModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatStepperModule, MatChipsModule, MatDividerModule,
    MatTabsModule, MatProgressSpinnerModule
  ],
  template: `
    <div class="page-container">
      <div class="page-header emergency-header">
        <div class="header-title">
          <mat-icon class="emergency-icon">emergency</mat-icon>
          <h1>Atención de Emergencia</h1>
        </div>
        <mat-chip class="urgent-chip">PRIORIDAD MÁXIMA</mat-chip>
      </div>

      <mat-tab-group animationDuration="200ms">

        <!-- TAB 1: Registrar Emergencia -->
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon style="font-size:18px;margin-right:6px;vertical-align:middle">add_alert</mat-icon>
            Nueva Emergencia
          </ng-template>

          <div style="padding:24px 0" *ngIf="!createdTicket">
            <mat-card>
              <mat-card-content>
                <mat-stepper [linear]="true" #stepper>

                  <!-- Paso 1: Identificar Paciente -->
                  <mat-step label="Identificar Paciente">
                    <div class="rn-note">
                      <mat-icon>info</mat-icon>
                      RN-E01: El personal debe registrar explícitamente el ingreso como Emergencia.
                    </div>

                    <div class="form-grid">
                      <mat-form-field appearance="outline">
                        <mat-label>DPI del Paciente (si disponible)</mat-label>
                        <mat-icon matPrefix>badge</mat-icon>
                        <input matInput [(ngModel)]="searchDpi" [ngModelOptions]="{standalone:true}"
                               placeholder="0000000000000" maxlength="13">
                      </mat-form-field>
                    </div>

                    <button mat-stroked-button color="primary" type="button"
                            (click)="searchPatient()" [disabled]="!searchDpi || searching">
                      <mat-spinner *ngIf="searching" diameter="18" style="display:inline-block;margin-right:6px"></mat-spinner>
                      {{ searching ? 'Buscando...' : 'Buscar en Sistema' }}
                    </button>

                    <div class="patient-found" *ngIf="foundPatient">
                      <mat-icon>check_circle</mat-icon>
                      <div>
                        <strong>{{ foundPatient.firstName }} {{ foundPatient.lastName }}</strong>
                        <div class="patient-meta">{{ foundPatient.patientCode }} · {{ foundPatient.dpi }}</div>
                        <div *ngIf="foundPatient.insuranceName" class="insurance-info">
                          Seguro: {{ foundPatient.insuranceName }} ({{ foundPatient.discountPercentage }}% descuento)
                        </div>
                      </div>
                    </div>

                    <div class="patient-unknown" *ngIf="dpiSearched && !foundPatient">
                      <mat-icon>person_add</mat-icon>
                      <span>Paciente no encontrado — se registrará un reporte de emergencia con datos mínimos.</span>
                    </div>

                    <div class="step-actions">
                      <button mat-raised-button color="warn" type="button" matStepperNext>
                        <mat-icon>emergency</mat-icon>
                        {{ foundPatient ? 'Continuar con paciente identificado →' : 'Registrar sin identificar →' }}
                      </button>
                    </div>
                  </mat-step>

                  <!-- Paso 2: Datos mínimos (solo si paciente no encontrado) -->
                  <mat-step [stepControl]="patientForm" label="Datos del Paciente">
                    <form [formGroup]="patientForm">
                      <div class="patient-ok" *ngIf="foundPatient">
                        <mat-icon>check_circle</mat-icon>
                        Paciente identificado: {{ foundPatient.firstName }} {{ foundPatient.lastName }}
                      </div>

                      <div *ngIf="!foundPatient">
                        <div class="rn-note rn-warn">
                          <mat-icon>warning</mat-icon>
                          RN-E04: Ingrese los datos que se puedan obtener. Se creará un reporte para completar registro luego.
                        </div>
                        <div class="form-grid">
                          <mat-form-field appearance="outline">
                            <mat-label>Nombre (aproximado si no se sabe)</mat-label>
                            <input matInput formControlName="firstName" placeholder="Paciente No Identificado">
                          </mat-form-field>
                          <mat-form-field appearance="outline">
                            <mat-label>Apellido</mat-label>
                            <input matInput formControlName="lastName">
                          </mat-form-field>
                          <mat-form-field appearance="outline">
                            <mat-label>Teléfono (opcional)</mat-label>
                            <input matInput formControlName="phone">
                          </mat-form-field>
                          <mat-form-field appearance="outline">
                            <mat-label>Correo (opcional — para recibo de pago)</mat-label>
                            <input matInput formControlName="email" type="email">
                          </mat-form-field>
                        </div>
                      </div>

                      <mat-form-field appearance="outline" class="full-width">
                        <mat-label>Motivo de Emergencia *</mat-label>
                        <mat-icon matPrefix>emergency</mat-icon>
                        <textarea matInput formControlName="motive" rows="3"
                                  placeholder="Describa el motivo de ingreso"></textarea>
                        <mat-error>El motivo es obligatorio</mat-error>
                      </mat-form-field>

                      <div class="step-actions">
                        <button mat-button type="button" matStepperPrevious>← Anterior</button>
                        <button mat-raised-button color="warn" type="button" matStepperNext
                                [disabled]="patientForm.invalid">
                          Continuar → Signos Vitales
                        </button>
                      </div>
                    </form>
                  </mat-step>

                  <!-- Paso 3: Signos Vitales -->
                  <mat-step [stepControl]="vitalsForm" label="Signos Vitales">
                    <form [formGroup]="vitalsForm">
                      <div class="rn-note rn-warn">
                        <mat-icon>monitor_heart</mat-icon>
                        RN-E03: Registrar signos vitales. Al finalizar se envía la orden de pago a caja.
                      </div>
                      <div class="vitals-grid">
                        <mat-form-field appearance="outline">
                          <mat-label>Presión Arterial</mat-label>
                          <input matInput formControlName="bloodPressure" placeholder="120/80">
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>Frec. Cardíaca (bpm)</mat-label>
                          <input matInput type="number" formControlName="heartRate">
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>Temperatura (°C)</mat-label>
                          <input matInput type="number" formControlName="temperature" step="0.1">
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>Peso (kg)</mat-label>
                          <input matInput type="number" formControlName="weight">
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>Talla (cm)</mat-label>
                          <input matInput type="number" formControlName="height">
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>SpO2 (%)</mat-label>
                          <input matInput type="number" formControlName="oxygenSaturation">
                        </mat-form-field>
                      </div>
                      <div class="step-actions">
                        <button mat-button type="button" matStepperPrevious>← Anterior</button>
                        <button mat-raised-button color="warn" type="button"
                                (click)="registerEmergency()" [disabled]="submitting">
                          <mat-spinner *ngIf="submitting" diameter="20" style="display:inline-block;margin-right:8px"></mat-spinner>
                          <mat-icon *ngIf="!submitting">emergency</mat-icon>
                          {{ submitting ? 'Registrando...' : 'Activar Emergencia' }}
                        </button>
                      </div>
                    </form>
                  </mat-step>

                </mat-stepper>
              </mat-card-content>
            </mat-card>
          </div>

          <!-- Resultado -->
          <div class="success-panel" *ngIf="createdTicket">
            <mat-icon class="success-icon">emergency</mat-icon>
            <h2>Emergencia Activada</h2>
            <p>Ticket: <strong>{{ createdTicket.ticketNumber }}</strong></p>
            <p>Clínica: <strong>{{ createdTicket.clinicName }}</strong></p>
            <div class="alert-box">
              <mat-icon>payments</mat-icon>
              <span>Orden de pago enviada a Caja — el cajero debe procesar el cobro para activar la cola de emergencias.</span>
            </div>
            <div *ngIf="reportId" class="report-box">
              <mat-icon>assignment_ind</mat-icon>
              <span>Paciente no identificado. Reporte de emergencia #{{ reportId }} creado — completar registro en pestaña <strong>Reportes</strong>.</span>
            </div>
            <mat-chip class="urgent-chip" style="font-size:1rem;margin-top:16px">URGENTE — PRIORIDAD MÁXIMA</mat-chip>
            <button mat-raised-button color="primary" type="button" (click)="reset()" style="margin-top:20px">
              <mat-icon>add</mat-icon> Nueva Emergencia
            </button>
          </div>
        </mat-tab>

        <!-- TAB 2: Reportes de Emergencia -->
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon style="font-size:18px;margin-right:6px;vertical-align:middle">assignment_ind</mat-icon>
            Reportes de Emergencia
          </ng-template>

          <div style="padding:24px 0">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
              <h3 style="margin:0;color:#c62828">Pacientes de Emergencia — Registro Pendiente</h3>
              <button mat-stroked-button color="primary" type="button" (click)="loadReports()">
                <mat-icon>refresh</mat-icon> Actualizar
              </button>
            </div>

            <div *ngIf="reports.length === 0" class="empty-state">
              <mat-icon>check_circle</mat-icon>
              <p>No hay reportes de emergencia con registro pendiente.</p>
            </div>

            <div *ngFor="let r of reports" class="report-card" [class.report-registered]="r.status === 'PATIENT_REGISTERED'">
              <div class="report-header">
                <div class="report-id">
                  <mat-icon>emergency</mat-icon>
                  <strong>Reporte #{{ r.id }}</strong>
                  <span class="report-ticket">Ticket: {{ r.ticketNumber }}</span>
                </div>
                <span class="report-status" [class.status-open]="r.status === 'OPEN'"
                      [class.status-paid]="r.status === 'PAID'"
                      [class.status-done]="r.status === 'PATIENT_REGISTERED'">
                  {{ r.status === 'OPEN' ? 'Sin pagar' : r.status === 'PAID' ? 'Pagado' : 'Registrado' }}
                </span>
              </div>
              <div class="report-info">
                <span><mat-icon style="font-size:16px;vertical-align:middle">person</mat-icon> {{ r.firstName }} {{ r.lastName }}</span>
                <span><mat-icon style="font-size:16px;vertical-align:middle">badge</mat-icon> {{ r.dpi }}</span>
                <span><mat-icon style="font-size:16px;vertical-align:middle">schedule</mat-icon> {{ r.createdAt | date:'dd/MM/yyyy HH:mm' }}</span>
              </div>
              <div class="report-motive">{{ r.motive }}</div>

              <!-- Registration form (only when not yet registered) -->
              <div *ngIf="r.status !== 'PATIENT_REGISTERED'" class="register-form">
                <mat-divider style="margin:12px 0"></mat-divider>
                <h4>Completar Registro del Paciente</h4>
                <div *ngIf="expandedReportId !== r.id">
                  <button mat-stroked-button color="primary" type="button" (click)="expandReport(r)">
                    <mat-icon>edit</mat-icon> Completar datos y crear cuenta
                  </button>
                </div>
                <div *ngIf="expandedReportId === r.id">
                  <div class="form-grid">
                    <mat-form-field appearance="outline">
                      <mat-label>Nombres *</mat-label>
                      <input matInput [(ngModel)]="regForm.firstName" [ngModelOptions]="{standalone:true}">
                    </mat-form-field>
                    <mat-form-field appearance="outline">
                      <mat-label>Apellidos *</mat-label>
                      <input matInput [(ngModel)]="regForm.lastName" [ngModelOptions]="{standalone:true}">
                    </mat-form-field>
                    <mat-form-field appearance="outline">
                      <mat-label>DPI (13 dígitos) *</mat-label>
                      <input matInput [(ngModel)]="regForm.dpi" [ngModelOptions]="{standalone:true}" maxlength="13">
                    </mat-form-field>
                    <mat-form-field appearance="outline">
                      <mat-label>Correo Electrónico *</mat-label>
                      <input matInput [(ngModel)]="regForm.email" [ngModelOptions]="{standalone:true}" type="email">
                    </mat-form-field>
                    <mat-form-field appearance="outline">
                      <mat-label>Teléfono</mat-label>
                      <input matInput [(ngModel)]="regForm.phone" [ngModelOptions]="{standalone:true}">
                    </mat-form-field>
                    <mat-form-field appearance="outline">
                      <mat-label>Dirección</mat-label>
                      <input matInput [(ngModel)]="regForm.address" [ngModelOptions]="{standalone:true}">
                    </mat-form-field>
                  </div>
                  <div class="reg-actions">
                    <button mat-button type="button" (click)="expandedReportId = null">Cancelar</button>
                    <button mat-raised-button color="primary" type="button"
                            (click)="completeRegistration(r.id)"
                            [disabled]="!regForm.firstName || !regForm.lastName || !regForm.dpi || !regForm.email || registering">
                      <mat-spinner *ngIf="registering" diameter="18" style="display:inline-block;margin-right:6px"></mat-spinner>
                      <mat-icon *ngIf="!registering">person_add</mat-icon>
                      {{ registering ? 'Registrando...' : 'Crear Cuenta y Enviar Credenciales' }}
                    </button>
                  </div>
                  <div class="reg-note">
                    <mat-icon>email</mat-icon>
                    Se enviará usuario y contraseña temporal al correo del paciente.
                  </div>
                </div>
              </div>

              <div *ngIf="r.status === 'PATIENT_REGISTERED'" class="registered-badge">
                <mat-icon>verified_user</mat-icon> Paciente registrado con cuenta activa
                <span *ngIf="r.hasAccount"> · Credenciales enviadas</span>
              </div>
            </div>
          </div>
        </mat-tab>

      </mat-tab-group>
    </div>
  `,
  styles: [`
    .emergency-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; }
    .header-title { display:flex; align-items:center; gap:8px; }
    .header-title h1 { font-size:1.6rem; font-weight:500; color:#c62828; margin:0; }
    .emergency-icon { font-size:32px; width:32px; height:32px; color:#c62828; }
    .urgent-chip { background:#c62828 !important; color:white !important; font-weight:700; }
    .rn-note { display:flex; align-items:center; gap:8px; background:#e3f2fd; color:#1565c0; padding:12px 16px; border-radius:8px; margin-bottom:16px; font-size:0.9rem; }
    .rn-warn { background:#ffebee !important; color:#c62828 !important; }
    .patient-found { display:flex; align-items:center; gap:12px; background:#e8f5e9; color:#2e7d32; padding:12px 16px; border-radius:8px; margin:16px 0; }
    .patient-meta { font-size:0.82rem; color:#555; margin-top:2px; }
    .patient-ok { display:flex; align-items:center; gap:8px; background:#e8f5e9; color:#2e7d32; padding:12px 16px; border-radius:8px; margin-bottom:16px; }
    .patient-unknown { display:flex; align-items:center; gap:8px; background:#fff3e0; color:#e65100; padding:12px 16px; border-radius:8px; margin:16px 0; font-size:0.87rem; }
    .insurance-info { font-size:0.82rem; margin-top:4px; }
    .form-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:12px; margin-bottom:12px; }
    .full-width { width:100%; margin-bottom:8px; }
    .vitals-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:16px; }
    .step-actions { display:flex; gap:12px; margin-top:16px; }
    .success-panel { text-align:center; padding:40px 24px; }
    .success-icon { font-size:64px; width:64px; height:64px; color:#c62828; margin-bottom:16px; }
    .success-panel h2 { color:#c62828; margin-bottom:16px; }
    .alert-box { display:flex; align-items:center; gap:10px; background:#fff8e1; border:1px solid #ffe082; border-radius:8px; padding:14px 20px; margin:16px auto; max-width:520px; font-size:0.9rem; color:#5d4037; }
    .report-box { display:flex; align-items:center; gap:10px; background:#e3f2fd; border-radius:8px; padding:14px 20px; margin:8px auto; max-width:520px; font-size:0.9rem; color:#1565c0; }
    .empty-state { text-align:center; padding:40px; color:#9e9e9e; }
    .empty-state mat-icon { font-size:48px; width:48px; height:48px; margin-bottom:8px; color:#c8e6c9; }
    .report-card { border:1px solid #e0e0e0; border-radius:10px; padding:16px; margin-bottom:16px; background:white; }
    .report-card.report-registered { border-color:#c8e6c9; background:#f9fff9; }
    .report-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; }
    .report-id { display:flex; align-items:center; gap:8px; color:#c62828; }
    .report-ticket { font-size:0.82rem; color:#757575; margin-left:8px; }
    .report-status { font-size:0.78rem; font-weight:700; padding:4px 10px; border-radius:12px; }
    .status-open { background:#ffebee; color:#c62828; }
    .status-paid { background:#fff3e0; color:#e65100; }
    .status-done { background:#e8f5e9; color:#2e7d32; }
    .report-info { display:flex; gap:20px; font-size:0.85rem; color:#555; margin-bottom:6px; flex-wrap:wrap; }
    .report-motive { font-size:0.87rem; color:#333; background:#f5f5f5; padding:8px 12px; border-radius:6px; }
    .register-form { margin-top:12px; }
    .register-form h4 { margin:8px 0 12px; color:#1D6C61; font-size:0.95rem; }
    .reg-actions { display:flex; gap:12px; margin-top:8px; }
    .reg-note { display:flex; align-items:center; gap:6px; font-size:0.8rem; color:#757575; margin-top:8px; }
    .registered-badge { display:flex; align-items:center; gap:6px; color:#2e7d32; font-size:0.87rem; margin-top:8px; }
  `]
})
export class EmergencyComponent implements OnInit {
  // Registration flow
  searchDpi = '';
  searching = false;
  dpiSearched = false;
  foundPatient: Patient | null = null;
  patientForm!: FormGroup;
  vitalsForm!: FormGroup;
  submitting = false;
  createdTicket: any = null;
  reportId: number | null = null;

  // Reports tab
  reports: any[] = [];
  expandedReportId: number | null = null;
  regForm: any = { firstName: '', lastName: '', dpi: '', email: '', phone: '', address: '' };
  registering = false;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private emergencyService: EmergencyService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.patientForm = this.fb.group({
      firstName: ['Paciente No Identificado', Validators.required],
      lastName: ['Emergencia', Validators.required],
      phone: [''],
      email: ['', Validators.email],
      motive: ['', Validators.required]
    });
    this.vitalsForm = this.fb.group({
      bloodPressure: [''],
      heartRate: [null],
      temperature: [null],
      weight: [null],
      height: [null],
      oxygenSaturation: [null]
    });
    this.loadReports();
  }

  searchPatient(): void {
    if (!this.searchDpi) return;
    this.searching = true;
    this.patientService.getByDpi(this.searchDpi).subscribe({
      next: res => {
        this.foundPatient = res.success && res.data ? res.data : null;
        this.dpiSearched = true;
        this.searching = false;
      },
      error: () => { this.foundPatient = null; this.dpiSearched = true; this.searching = false; }
    });
  }

  registerEmergency(): void {
    this.submitting = true;
    const pv = this.patientForm.value;
    const payload: any = {
      motive: pv.motive,
      dpi: this.foundPatient ? this.foundPatient.dpi : (this.searchDpi || null)
    };
    if (!this.foundPatient) {
      payload.firstName = pv.firstName;
      payload.lastName = pv.lastName;
      payload.phone = pv.phone || null;
      payload.email = pv.email || null;
    }

    this.emergencyService.register(payload).subscribe({
      next: res => {
        if (res.success) {
          this.createdTicket = res.data.ticket;
          this.reportId = res.data.reportId ?? null;
          // Register vitals
          const vv = this.vitalsForm.value;
          if (vv.bloodPressure || vv.heartRate || vv.temperature) {
            this.emergencyService.registerVitals(this.createdTicket.id, vv).subscribe({ error: () => {} });
          }
          this.notification.success('Emergencia registrada — orden de pago enviada a caja');
          if (this.reportId) this.loadReports();
        } else {
          this.notification.error(res.message || 'Error al registrar emergencia');
        }
        this.submitting = false;
      },
      error: (err) => {
        this.notification.error(err.error?.message || 'Error al registrar emergencia');
        this.submitting = false;
      }
    });
  }

  reset(): void {
    this.foundPatient = null;
    this.createdTicket = null;
    this.reportId = null;
    this.searchDpi = '';
    this.dpiSearched = false;
    this.patientForm.reset({ firstName: 'Paciente No Identificado', lastName: 'Emergencia' });
    this.vitalsForm.reset();
  }

  loadReports(): void {
    this.emergencyService.getReports().subscribe({
      next: res => { if (res.success) this.reports = res.data; },
      error: () => {}
    });
  }

  expandReport(r: any): void {
    this.expandedReportId = r.id;
    this.regForm = {
      firstName: r.firstName || '',
      lastName: r.lastName || '',
      dpi: r.dpi !== '0000000000000' ? (r.dpi || '') : '',
      email: r.email || '',
      phone: r.phone || '',
      address: ''
    };
  }

  completeRegistration(reportId: number): void {
    this.registering = true;
    this.emergencyService.completeRegistration(reportId, this.regForm).subscribe({
      next: res => {
        if (res.success) {
          this.notification.success('Paciente registrado. Credenciales enviadas al correo.');
          this.expandedReportId = null;
          this.loadReports();
        } else {
          this.notification.error(res.message || 'Error al registrar paciente');
        }
        this.registering = false;
      },
      error: err => {
        this.notification.error(err.error?.message || 'Error al registrar paciente');
        this.registering = false;
      }
    });
  }
}
