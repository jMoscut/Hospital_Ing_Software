import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
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
import { environment } from '../../../environments/environment';

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
                      El personal debe registrar explícitamente el ingreso como Emergencia.
                    </div>

                    <div class="form-grid">
                      <mat-form-field appearance="outline">
                        <mat-label>DPI del Paciente (si disponible)</mat-label>
                        <mat-icon matPrefix>badge</mat-icon>
                        <input matInput [(ngModel)]="searchDpi" [ngModelOptions]="{standalone:true}"
                               placeholder="0000000000000" maxlength="13"
                               (keypress)="onlyDigits($event)">
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
                          Ingrese los datos que se puedan obtener. Se creará un reporte para completar registro luego.
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
                            <input matInput formControlName="phone" type="tel" maxlength="8"
                                   (keypress)="onlyDigits($event)">
                            <mat-hint>8 dígitos</mat-hint>
                            <mat-error>8 dígitos, no inicia en 0</mat-error>
                          </mat-form-field>
                          <mat-form-field appearance="outline">
                            <mat-label>Correo (opcional — para recibo de pago)</mat-label>
                            <input matInput formControlName="email" type="email">
                            <mat-error>Correo inválido</mat-error>
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
                        Registrar signos vitales. Al finalizar se envía la orden de pago a caja.
                      </div>
                      <div class="vitals-grid">
                        <mat-form-field appearance="outline">
                          <mat-label>Presión Arterial</mat-label>
                          <input matInput formControlName="bloodPressure" placeholder="120/80"
                                 maxlength="7" (keypress)="onlyBP($event)">
                          <mat-hint>Formato: 120/80</mat-hint>
                          <mat-error>Formato xxx/xxx (solo números)</mat-error>
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>Frec. Cardíaca (bpm)</mat-label>
                          <input matInput inputmode="numeric" formControlName="heartRate"
                                 maxlength="3" (keypress)="onlyDigits($event)">
                          <mat-error>Máximo 3 dígitos</mat-error>
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>Temperatura (°C)</mat-label>
                          <input matInput inputmode="numeric" formControlName="temperature"
                                 maxlength="2" (keypress)="onlyDigits($event)">
                          <mat-hint>30–45 °C</mat-hint>
                          <mat-error>Debe estar entre 30 y 45 °C</mat-error>
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>Peso (kg)</mat-label>
                          <input matInput inputmode="numeric" formControlName="weight"
                                 maxlength="3" (keypress)="onlyDigits($event)">
                          <mat-error>Máximo 3 dígitos</mat-error>
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>Talla (cm)</mat-label>
                          <input matInput inputmode="numeric" formControlName="height"
                                 maxlength="3" (keypress)="onlyDigits($event)">
                          <mat-error>Máximo 3 dígitos</mat-error>
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>SpO2 (%)</mat-label>
                          <input matInput inputmode="numeric" formControlName="oxygenSaturation"
                                 maxlength="2" (keypress)="onlyDigits($event)">
                          <mat-error>Máximo 2 dígitos</mat-error>
                        </mat-form-field>
                      </div>
                      <div class="step-actions">
                        <button mat-button type="button" matStepperPrevious>← Anterior</button>
                        <button mat-raised-button color="warn" type="button"
                                (click)="registerEmergency()" [disabled]="submitting || vitalsForm.invalid">
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
                      <input matInput [(ngModel)]="regForm.dpi" [ngModelOptions]="{standalone:true}" maxlength="13"
                             (keypress)="onlyDigits($event)">
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

        <!-- TAB 3: Cola en Espera -->
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon style="font-size:18px;margin-right:6px;vertical-align:middle;color:#c62828">emergency</mat-icon>
            Cola Emergencias ({{ waitingQueue.length }})
          </ng-template>

          <div style="padding:24px 0">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
              <h3 style="margin:0;color:#c62828">Pacientes esperando atención</h3>
              <button mat-stroked-button color="warn" type="button" (click)="loadQueue()">
                <mat-icon>refresh</mat-icon> Actualizar
              </button>
            </div>

            <div *ngIf="loadingQueue" style="text-align:center;padding:32px">
              <mat-spinner diameter="40" style="margin:0 auto"></mat-spinner>
            </div>

            <div *ngIf="!loadingQueue && waitingQueue.length === 0" class="empty-state">
              <mat-icon style="color:#c8e6c9">check_circle</mat-icon>
              <p>Sin pacientes de emergencia en espera.</p>
            </div>

            <div *ngFor="let t of waitingQueue" class="queue-card">
              <div class="queue-card-left">
                <div class="queue-number">{{ t.ticketNumber }}</div>
                <div class="queue-info">
                  <div class="queue-patient">{{ t.patientName }}</div>
                  <div class="queue-clinic">{{ t.clinicName }}</div>
                  <div class="queue-time">{{ t.createdAt | date:'HH:mm' }}</div>
                </div>
              </div>
              <button mat-raised-button color="warn"
                      [disabled]="markingAttended[t.id]"
                      (click)="markAttended(t.id)">
                <mat-spinner *ngIf="markingAttended[t.id]" diameter="18" style="display:inline-block;margin-right:6px"></mat-spinner>
                <mat-icon *ngIf="!markingAttended[t.id]">how_to_reg</mat-icon>
                {{ markingAttended[t.id] ? 'Marcando...' : 'Paciente Atendido' }}
              </button>
            </div>
          </div>
        </mat-tab>

      </mat-tab-group>
    </div>
  `,
  styles: [`
    .emergency-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; padding-bottom:18px; border-bottom:1px solid #fdd; }
    .header-title { display:flex; align-items:center; gap:10px; }
    .header-title h1 { font-size:1.55rem; font-weight:700; color:#b71c1c; margin:0; letter-spacing:-0.3px; }
    .emergency-icon { font-size:32px; width:32px; height:32px; color:#c62828; }
    .urgent-chip { background:#c62828 !important; color:white !important; font-weight:700; }
    .rn-note { display:flex; align-items:center; gap:8px; background:#EDE9C0; color:#243C2C; padding:12px 16px; border-radius:10px; margin-bottom:16px; font-size:0.9rem; border:1px solid #C5CDD8; }
    .rn-warn { background:#ffebee !important; color:#c62828 !important; border-color:#ffcdd2 !important; }
    .patient-found { display:flex; align-items:center; gap:12px; background:linear-gradient(135deg,#EBF0DC,#F5F2DC); color:#243C2C; padding:14px 18px; border-radius:12px; margin:16px 0; border:1px solid #A9B6C4; }
    .patient-meta { font-size:0.82rem; color:#4a6560; margin-top:2px; }
    .patient-ok { display:flex; align-items:center; gap:8px; background:linear-gradient(135deg,#EBF0DC,#F5F2DC); color:#243C2C; padding:12px 16px; border-radius:10px; margin-bottom:16px; border:1px solid #A9B6C4; }
    .patient-unknown { display:flex; align-items:center; gap:8px; background:#fff3e0; color:#e65100; padding:12px 16px; border-radius:10px; margin:16px 0; font-size:0.87rem; border:1px solid #ffe082; }
    .insurance-info { font-size:0.82rem; margin-top:4px; }
    .form-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:12px; margin-bottom:12px; }
    .full-width { width:100%; margin-bottom:8px; }
    .vitals-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:16px; }
    .step-actions { display:flex; gap:12px; margin-top:16px; }
    .success-panel { text-align:center; padding:48px 24px; }
    .success-icon { font-size:72px; width:72px; height:72px; color:#c62828; margin-bottom:16px; filter:drop-shadow(0 4px 12px rgba(198,40,40,0.3)); }
    .success-panel h2 { color:#b71c1c; margin-bottom:16px; font-weight:700; }
    .alert-box { display:flex; align-items:center; gap:10px; background:#fff8e1; border:1px solid #ffe082; border-radius:10px; padding:14px 20px; margin:16px auto; max-width:520px; font-size:0.9rem; color:#5d4037; }
    .report-box { display:flex; align-items:center; gap:10px; background:#EDE9C0; border-radius:10px; padding:14px 20px; margin:8px auto; max-width:520px; font-size:0.9rem; color:#243C2C; border:1px solid #C5CDD8; }
    .empty-state { text-align:center; padding:48px; color:#9e9e9e; }
    .empty-state mat-icon { font-size:52px; width:52px; height:52px; margin-bottom:10px; color:#ef9a9a; display:block; margin:0 auto 10px; }
    .report-card { border:1px solid #D0D9E3; border-radius:14px; padding:18px 20px; margin-bottom:14px; background:white; box-shadow:0 2px 8px rgba(36,60,44,0.06); transition:box-shadow 0.2s; }
    .report-card:hover { box-shadow:0 4px 14px rgba(36,60,44,0.12); }
    .report-card.report-registered { border-color:#A9B6C4; background:#FAFAF5; }
    .report-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; }
    .report-id { display:flex; align-items:center; gap:8px; color:#c62828; font-weight:700; }
    .report-ticket { font-size:0.82rem; color:#6b8c84; margin-left:8px; }
    .report-status { font-size:0.75rem; font-weight:700; padding:4px 10px; border-radius:12px; }
    .status-open { background:#ffebee; color:#c62828; }
    .status-paid { background:#fff3e0; color:#e65100; }
    .status-done { background:#EBF0DC; color:#243C2C; }
    .report-info { display:flex; gap:20px; font-size:0.85rem; color:#4a6560; margin-bottom:6px; flex-wrap:wrap; }
    .report-motive { font-size:0.87rem; color:#2d4a47; background:#F5F2DC; padding:8px 12px; border-radius:8px; border:1px solid #C5CDD8; }
    .register-form { margin-top:12px; }
    .register-form h4 { margin:8px 0 12px; color:#243C2C; font-size:0.95rem; font-weight:700; }
    .reg-actions { display:flex; gap:12px; margin-top:8px; }
    .reg-note { display:flex; align-items:center; gap:6px; font-size:0.8rem; color:#6b8c84; margin-top:8px; }
    .registered-badge { display:flex; align-items:center; gap:6px; color:#243C2C; font-size:0.87rem; margin-top:8px; font-weight:600; }
    .queue-card { display:flex; align-items:center; justify-content:space-between; border:2px solid #ffcdd2; border-left:4px solid #c62828; border-radius:14px; padding:16px 20px; margin-bottom:12px; background:#fff8f8; transition:box-shadow 0.2s; }
    .queue-card:hover { box-shadow:0 4px 14px rgba(198,40,40,0.15); }
    .queue-card-left { display:flex; align-items:center; gap:16px; }
    .queue-number { font-size:1.7rem; font-weight:800; color:#c62828; min-width:64px; letter-spacing:-1px; }
    .queue-patient { font-weight:700; color:#243C2C; font-size:1rem; }
    .queue-clinic { font-size:0.82rem; color:#6b8c84; margin-top:2px; }
    .queue-time { font-size:0.78rem; color:#9e9e9e; margin-top:2px; }
  `]
})
export class EmergencyComponent implements OnInit, OnDestroy {
  onlyDigits(e: KeyboardEvent): boolean { return /[0-9]/.test(e.key); }
  onlyBP(e: KeyboardEvent): boolean {
    const char = e.key;
    if (!/[\d\/]/.test(char)) return false;
    const input = e.target as HTMLInputElement;
    const val = input.value;
    const slashIdx = val.indexOf('/');
    if (char === '/') return !val.includes('/') && val.length >= 1 && val.length <= 3;
    return slashIdx === -1 ? val.length < 3 : (val.length - slashIdx - 1) < 3;
  }

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

  // Queue tab
  waitingQueue: any[] = [];
  loadingQueue = false;
  markingAttended: Record<number, boolean> = {};
  private queuePoll: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private patientService: PatientService,
    private emergencyService: EmergencyService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.patientForm = this.fb.group({
      firstName: ['Paciente No Identificado', Validators.required],
      lastName: ['Emergencia', Validators.required],
      phone: ['', [Validators.pattern(/^[1-9]\d{7}$/)]],
      email: ['', [Validators.email]],
      motive: ['', Validators.required]
    });
    this.vitalsForm = this.fb.group({
      bloodPressure: ['', [Validators.pattern(/^\d{1,3}\/\d{1,3}$/)]],
      heartRate:     [null, [Validators.min(1), Validators.max(999)]],
      temperature:   ['', [(ctrl: any) => {
        if (!ctrl.value && ctrl.value !== 0) return null;
        const v = parseInt(ctrl.value, 10);
        if (isNaN(v) || v < 30 || v > 45) return { tempRange: true };
        return null;
      }]],
      weight:        [null, [Validators.min(1), Validators.max(999)]],
      height:        [null, [Validators.min(1), Validators.max(999)]],
      oxygenSaturation: [null, [Validators.min(1), Validators.max(99)]]
    });
    this.loadReports();
    this.loadQueue();
    this.queuePoll = setInterval(() => this.loadQueue(), 10000);
  }

  ngOnDestroy(): void {
    clearInterval(this.queuePoll);
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

  loadQueue(): void {
    this.loadingQueue = this.waitingQueue.length === 0;
    this.http.get<any>(`${environment.apiUrl}/tickets/queue/today`).subscribe({
      next: res => {
        if (res.success) {
          this.waitingQueue = (res.data as any[])
            .filter(t => t.status === 'WAITING' && t.priority === 'URGENT')
            .sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        }
        this.loadingQueue = false;
      },
      error: () => { this.loadingQueue = false; }
    });
  }

  markAttended(ticketId: number): void {
    this.markingAttended[ticketId] = true;
    this.emergencyService.markAttended(ticketId).subscribe({
      next: () => {
        this.notification.success('Paciente marcado como atendido');
        this.waitingQueue = this.waitingQueue.filter(t => t.id !== ticketId);
        delete this.markingAttended[ticketId];
      },
      error: err => {
        this.notification.error(err.error?.message || 'Error al marcar como atendido');
        delete this.markingAttended[ticketId];
      }
    });
  }
}
