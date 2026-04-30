import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { PatientService } from '../../shared/services/patient.service';
import { ClinicService, TicketService, VitalSignsService, AppointmentService } from '../../shared/services/ticket.service';
import { InsuranceService } from '../../shared/services/payment.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Clinic, Ticket } from '../../core/models/ticket.model';
import { Patient } from '../../core/models/patient.model';

function birthDateValidator(ctrl: AbstractControl): ValidationErrors | null {
  if (!ctrl.value) return null;
  const d = new Date(ctrl.value);
  if (isNaN(d.getTime())) return { invalidDate: true };
  const year = d.getFullYear();
  if (year < 1900 || d > new Date()) return { invalidDate: true };
  return null;
}

@Component({
  selector: 'app-health-staff',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule,
    MatCardModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatTabsModule, MatProgressSpinnerModule, MatTableModule,
    MatChipsModule, MatStepperModule
  ],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1><mat-icon style="vertical-align:middle;margin-right:8px">health_and_safety</mat-icon>Personal de Salud</h1>
      </div>

      <mat-tab-group animationDuration="200ms">

        <!-- TAB 1: Recepción Walk-in -->
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon class="tab-icon">person_add</mat-icon>
            Recepción
          </ng-template>
          <div class="tab-content">
            <mat-card>
              <mat-card-header>
                <mat-card-title>Recepción Walk-in</mat-card-title>
                <mat-card-subtitle>Identificar o registrar paciente por DPI</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>

                <!-- Estado: Guardado con éxito -->
                <div class="recep-success-box" *ngIf="recepSaved">
                  <mat-icon>check_circle</mat-icon>
                  <div>
                    <strong>{{ recepExistingPatient ? 'Datos actualizados correctamente' : 'Paciente registrado exitosamente' }}</strong>
                    <p *ngIf="recepNewCredentials">Credenciales enviadas al correo del paciente.</p>
                  </div>
                  <button mat-stroked-button color="primary" (click)="resetRecepFlow()">
                    <mat-icon>add</mat-icon> Nuevo Paciente
                  </button>
                </div>

                <!-- Credenciales nuevas -->
                <div class="credentials-box" *ngIf="recepNewCredentials && recepSaved" style="margin-top:12px">
                  <mat-icon>key</mat-icon>
                  <div>
                    <strong>Credenciales generadas y enviadas al correo</strong>
                    <p>El paciente podrá cambiar la contraseña en su primer inicio de sesión.</p>
                    <div class="cred-row"><span>Usuario:</span> <code>{{ recepNewCredentials.username }}</code></div>
                    <div class="cred-row"><span>Contraseña temporal:</span> <code>{{ recepNewCredentials.tempPassword }}</code></div>
                  </div>
                </div>

                <!-- Stepper 2 pasos -->
                <mat-stepper [linear]="true" #recepStepper *ngIf="!recepSaved">

                  <!-- Paso 1: DPI -->
                  <mat-step [stepControl]="recepDpiForm" label="Identificación">
                    <form [formGroup]="recepDpiForm">
                      <h3>Identificar por DPI</h3>
                      <p class="hint-text">Ingrese el DPI del paciente. Si tiene registro, se cargarán sus datos. Si no, podrá registrarlo.</p>
                      <mat-form-field appearance="outline" class="wide">
                        <mat-label>DPI del Paciente (13 dígitos)</mat-label>
                        <mat-icon matPrefix>badge</mat-icon>
                        <input matInput formControlName="dpi" placeholder="0000000000000" maxlength="13">
                        <mat-error>El DPI debe tener exactamente 13 dígitos</mat-error>
                      </mat-form-field>
                      <div class="step-actions">
                        <button mat-raised-button color="primary"
                                (click)="recepSearchByDpi()" [disabled]="recepDpiForm.invalid || recepSearching">
                          <mat-spinner *ngIf="recepSearching" diameter="20"></mat-spinner>
                          <mat-icon *ngIf="!recepSearching">search</mat-icon>
                          {{ recepSearching ? 'Buscando...' : 'Buscar' }}
                        </button>
                      </div>
                      <div class="found-box" *ngIf="recepExistingPatient">
                        <mat-icon>check_circle</mat-icon>
                        <div>
                          <strong>{{ recepExistingPatient.firstName }} {{ recepExistingPatient.lastName }}</strong>
                          <br><small>{{ recepExistingPatient.patientCode }} · {{ recepExistingPatient.phone }}</small>
                        </div>
                        <button mat-raised-button color="accent" matStepperNext>Ver y Editar →</button>
                      </div>
                      <div class="new-patient-notice" *ngIf="recepIsNewPatient">
                        <mat-icon>person_add</mat-icon>
                        <span>DPI no encontrado — complete los datos para registrar al paciente.</span>
                        <button mat-raised-button color="accent" matStepperNext>Registrar →</button>
                      </div>
                    </form>
                  </mat-step>

                  <!-- Paso 2: Datos del paciente (editables) -->
                  <mat-step [stepControl]="recepPatientForm" label="Datos del Paciente">
                    <form [formGroup]="recepPatientForm">
                      <h3>{{ recepExistingPatient ? 'Editar datos del paciente' : 'Registrar nuevo paciente' }}</h3>
                      <div class="form-grid">
                        <mat-form-field appearance="outline">
                          <mat-label>Nombres *</mat-label>
                          <input matInput formControlName="firstName">
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>Apellidos *</mat-label>
                          <input matInput formControlName="lastName">
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>Fecha de Nacimiento</mat-label>
                          <mat-icon matPrefix>cake</mat-icon>
                          <input matInput type="date" formControlName="birthDate" min="1900-01-01" [max]="today">
                          <mat-error>Fecha inválida (año entre 1900 y año actual)</mat-error>
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>Teléfono</mat-label>
                          <input matInput formControlName="phone" type="tel" maxlength="8"
                                 (keypress)="onlyDigits($event)">
                          <mat-hint>8 dígitos, no inicia en 0</mat-hint>
                          <mat-error>Teléfono inválido (8 dígitos, no inicia en 0)</mat-error>
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>Correo Electrónico *</mat-label>
                          <input matInput formControlName="email">
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>Dirección</mat-label>
                          <input matInput formControlName="address">
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>Seguro Médico</mat-label>
                          <mat-select formControlName="insuranceId">
                            <mat-option [value]="null">Sin seguro</mat-option>
                            <mat-option *ngFor="let ins of insurances" [value]="ins.id">{{ ins.name }}</mat-option>
                          </mat-select>
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>No. de Póliza / Carné (opcional)</mat-label>
                          <input matInput formControlName="insuranceNumber" placeholder="Ej. SEG-12345">
                        </mat-form-field>
                      </div>
                      <p class="hint-text" *ngIf="!recepExistingPatient">
                        Se generará usuario y contraseña temporales y se enviarán al correo del paciente.
                      </p>
                      <div class="step-actions">
                        <button mat-button matStepperPrevious>← Anterior</button>
                        <button mat-raised-button color="primary"
                                [disabled]="recepPatientForm.invalid || recepSaving"
                                (click)="saveRecepPatient()">
                          <mat-spinner *ngIf="recepSaving" diameter="20"></mat-spinner>
                          <mat-icon *ngIf="!recepSaving">{{ recepExistingPatient ? 'save' : 'person_add' }}</mat-icon>
                          {{ recepSaving ? 'Guardando...' : (recepExistingPatient ? 'Guardar cambios' : 'Registrar Paciente') }}
                        </button>
                      </div>
                    </form>
                  </mat-step>

                </mat-stepper>

              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <!-- TAB 2: Signos Vitales (Triage) -->
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon class="tab-icon">monitor_heart</mat-icon>
            Signos Vitales
            <span class="tab-badge" *ngIf="calledTickets.length > 0">{{ calledTickets.length }}</span>
          </ng-template>
          <div class="tab-content">

            <!-- Llamar siguiente paciente -->
            <div class="call-next-bar">
              <mat-form-field appearance="outline" style="min-width:200px;margin-bottom:0">
                <mat-label>Clínica</mat-label>
                <mat-select [(ngModel)]="selectedVitalsClinicId">
                  <mat-option *ngFor="let c of visitClinics" [value]="c.id">{{ c.name }}</mat-option>
                </mat-select>
              </mat-form-field>
              <button mat-raised-button color="primary" [disabled]="!selectedVitalsClinicId || callingVitals"
                      (click)="callNextToVitalSigns()">
                <mat-spinner *ngIf="callingVitals" diameter="18" style="display:inline-block;margin-right:6px"></mat-spinner>
                <mat-icon *ngIf="!callingVitals">campaign</mat-icon>
                {{ callingVitals ? 'Llamando...' : 'Llamar Siguiente' }}
              </button>
            </div>

            <p class="hint-text" style="margin-top:12px">Pacientes en área de signos vitales. Haga clic para registrar signos.</p>

            <div *ngIf="calledTickets.length === 0" class="empty-state">
              <mat-icon>health_and_safety</mat-icon>
              <p>No hay pacientes pendientes de signos vitales</p>
            </div>

            <div *ngFor="let t of calledTickets" class="called-card">
              <div class="called-card-header">
                <div class="ticket-number">{{ t.ticketNumber }}</div>
                <div class="ticket-info">
                  <div class="ticket-patient">{{ t.patientName }}</div>
                  <div class="ticket-meta">
                    {{ t.clinicName }} · {{ t.type }}
                    <span *ngIf="t.doctorName"> · Dr. {{ t.doctorName }}</span>
                  </div>
                  <div class="ticket-lab-info" *ngIf="t.type === 'LABORATORIO' && (t.labExamName || t.labSampleType)">
                    <span *ngIf="t.labExamName"><mat-icon style="font-size:13px;width:13px;height:13px;vertical-align:middle">science</mat-icon> {{ t.labExamName }}</span>
                    <span *ngIf="t.labSampleType"><mat-icon style="font-size:13px;width:13px;height:13px;vertical-align:middle">colorize</mat-icon> {{ t.labSampleType }}</span>
                  </div>
                  <div class="ticket-time" *ngIf="t.scheduledTime" style="font-size:0.75rem;color:#1D6C61;margin-top:2px">
                    <mat-icon style="font-size:11px;width:11px;height:11px;vertical-align:middle">schedule</mat-icon>
                    {{ t.scheduledTime }}
                  </div>
                </div>
                <span class="status-chip status-vitals">En Signos Vitales</span>
              </div>

              <!-- Vitals form inline -->
              <ng-container *ngIf="activeVitalsTicketId === t.id; else showVitalsBtn">
                <form [formGroup]="vitalsFormMap[t.id]" class="form-grid vitals-inline-form">
                  <mat-form-field appearance="outline">
                    <mat-label>Presión Arterial</mat-label>
                    <mat-icon matPrefix>favorite</mat-icon>
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
                    <input matInput type="number" formControlName="weight" step="0.1">
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                    <mat-label>Talla (cm)</mat-label>
                    <input matInput type="number" formControlName="height">
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                    <mat-label>Saturación O₂ (%)</mat-label>
                    <input matInput type="number" formControlName="oxygenSaturation">
                  </mat-form-field>
                </form>
                <div class="vitals-actions">
                  <button mat-raised-button color="primary" (click)="sendToDoctor(t)"
                          [disabled]="sendingVitals">
                    <mat-icon>{{ t.type === 'LABORATORIO' ? 'science' : 'send' }}</mat-icon>
                    {{ sendingVitals ? 'Registrando...' : (t.type === 'LABORATORIO' ? 'Registrar Signos Vitales' : 'Registrar y Enviar a Médico') }}
                  </button>
                  <button mat-stroked-button color="warn" (click)="markAbsent(t)"
                          [disabled]="sendingVitals">
                    <mat-icon>person_off</mat-icon> Ausente
                  </button>
                  <button mat-button (click)="activeVitalsTicketId = null">Cancelar</button>
                </div>
              </ng-container>
              <ng-template #showVitalsBtn>
                <div style="display:flex;gap:10px;margin-top:12px;flex-wrap:wrap" *ngIf="!samplePanels[t.id]">
                  <button mat-stroked-button color="primary" (click)="openVitalsForm(t)">
                    <mat-icon>edit</mat-icon> Tomar Signos Vitales
                  </button>
                  <button mat-stroked-button color="warn" (click)="markAbsent(t)">
                    <mat-icon>person_off</mat-icon> Ausente
                  </button>
                </div>
              </ng-template>

              <!-- Sample collection panel (LAB tickets, after vitals recorded) -->
              <ng-container *ngIf="samplePanels[t.id] && !samplePanels[t.id].done">
                <div class="sample-panel">
                  <div class="sample-info">
                    <mat-icon>biotech</mat-icon>
                    <div>
                      <strong>Recolección de Muestra — {{ t.patientName }}</strong>
                      <div class="sample-meta" *ngIf="t.notes">{{ t.notes.split('—')[0].trim() }}</div>
                      <div class="sample-meta">Signos vitales registrados ✓ — Recolecte la muestra física y confirme</div>
                    </div>
                  </div>
                  <div style="display:flex;gap:10px;margin-top:12px;flex-wrap:wrap">
                    <button mat-raised-button color="accent"
                            [disabled]="samplePanels[t.id].collecting"
                            (click)="collectSampleAction(t)">
                      <mat-spinner *ngIf="samplePanels[t.id].collecting" diameter="18" style="display:inline-block;margin-right:6px"></mat-spinner>
                      <mat-icon *ngIf="!samplePanels[t.id].collecting">science</mat-icon>
                      {{ samplePanels[t.id].collecting ? 'Enviando a Lab...' : 'Muestra Recolectada — Enviar a Lab' }}
                    </button>
                    <button mat-stroked-button color="warn" (click)="markAbsent(t)" [disabled]="samplePanels[t.id].collecting">
                      <mat-icon>person_off</mat-icon> Ausente
                    </button>
                  </div>
                </div>
              </ng-container>

              <!-- Sample receipt (after successful collection) -->
              <ng-container *ngIf="samplePanels[t.id]?.done">
                <div class="sample-receipt">
                  <mat-icon class="sample-receipt-icon">check_circle</mat-icon>
                  <div class="sample-receipt-body">
                    <strong>Muestra enviada a Laboratorio</strong>
                    <div class="sample-receipt-row"><mat-icon>qr_code</mat-icon><span>Código: <code>{{ samplePanels[t.id].receipt?.sampleCode }}</code></span></div>
                    <div class="sample-receipt-row"><mat-icon>person</mat-icon><span>{{ samplePanels[t.id].receipt?.patientName }}</span></div>
                    <div class="sample-receipt-row"><mat-icon>biotech</mat-icon><span>{{ samplePanels[t.id].receipt?.examName }}</span></div>
                    <div class="sample-receipt-row"><mat-icon>colorize</mat-icon><span>Tipo de muestra: {{ samplePanels[t.id].receipt?.sampleTypeLabel }}</span></div>
                  </div>
                  <button mat-raised-button color="primary" (click)="dismissSamplePanel(t.id)">
                    <mat-icon>done</mat-icon> Listo
                  </button>
                </div>
              </ng-container>

            </div>
          </div>
        </mat-tab>

        <!-- TAB: Cola del Día -->
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon class="tab-icon">queue</mat-icon>
            Cola del Día
            <span class="tab-badge" *ngIf="todayQueue.length > 0">{{ todayQueue.length }}</span>
          </ng-template>
          <div class="tab-content">
            <p class="hint-text">Cola completa del día — se actualiza automáticamente cada 8 segundos.</p>
            <div *ngIf="todayQueue.length === 0" class="empty-state">
              <mat-icon>event_available</mat-icon>
              <p>No hay pacientes en cola actualmente</p>
            </div>
            <div class="ticket-row" *ngFor="let t of todayQueue">
              <div class="ticket-number">{{ t.ticketNumber }}</div>
              <div class="ticket-info">
                <div class="ticket-patient">{{ t.patientName }}</div>
                <div class="ticket-meta">
                  {{ t.clinicName }} · {{ t.type }}
                  <span *ngIf="t.doctorName"> · Dr. {{ t.doctorName }}</span>
                </div>
                <div class="ticket-time" *ngIf="t.scheduledTime" style="font-size:0.75rem;color:#1D6C61;margin-top:2px">
                  <mat-icon style="font-size:11px;width:11px;height:11px;vertical-align:middle">schedule</mat-icon>
                  {{ t.scheduledTime }}
                </div>
              </div>
              <span [class]="'status-chip ' + getStatusClass(t.status)">{{ statusLabel(t.status) }}</span>
            </div>
          </div>
        </mat-tab>

      </mat-tab-group>
    </div>
  `,
  styles: [`
    .tab-content { padding: 24px 0; }
    .tab-icon { font-size: 18px; margin-right: 6px; vertical-align: middle; }
    h3 { font-size: 1.1rem; font-weight: 500; color: #1D6C61; margin-bottom: 16px; }
    h4.section-subtitle { font-size: 0.95rem; font-weight: 500; color: #555; margin: 16px 0 8px; border-top: 1px solid #e0e0e0; padding-top: 12px; }
    .hint-text { color: #757575; font-size: 0.85rem; margin-bottom: 16px; }
    .wide { width: 100%; }
    .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; margin-bottom: 8px; }
    .step-actions { display: flex; gap: 12px; margin-top: 16px; }

    .found-box {
      display: flex; align-items: center; gap: 12px;
      background: #e8f5e9; padding: 16px; border-radius: 8px; color: #2e7d32; margin-top: 16px;
    }
    .found-box mat-icon { font-size: 32px; width: 32px; height: 32px; }

    .queue-filters { margin-bottom: 16px; }
    .ticket-row {
      display: flex; align-items: center; gap: 16px; padding: 12px 16px;
      background: white; border-radius: 8px; margin-bottom: 8px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.08);
    }
    .ticket-number { font-size: 1.4rem; font-weight: 700; color: #1D6C61; min-width: 80px; }
    .ticket-info { flex: 1; }
    .ticket-patient { font-weight: 500; }
    .ticket-meta { font-size: 0.8rem; color: #757575; }
    .ticket-lab-info { font-size: 0.78rem; color: #1D6C61; margin-top: 2px; display: flex; gap: 10px; flex-wrap: wrap; }
    .status-chip { padding: 4px 12px; border-radius: 12px; font-size: 0.8rem; font-weight: 500; }

    .credentials-box {
      display: flex; align-items: flex-start; gap: 16px;
      background: #fff8e1; border: 1px solid #ffe082; border-radius: 8px;
      padding: 16px 20px; margin: 12px 0;
    }
    .credentials-box mat-icon { font-size: 28px; width: 28px; height: 28px; color: #f57f17; flex-shrink: 0; margin-top: 4px; }
    .credentials-box strong { color: #e65100; font-size: 0.95rem; }
    .credentials-box p { color: #555; font-size: 0.82rem; margin: 4px 0 10px; }
    .cred-row { display: flex; align-items: center; gap: 8px; font-size: 0.9rem; margin-bottom: 4px; }
    .cred-row span { color: #757575; min-width: 140px; }
    .cred-row code { background: #fff3e0; padding: 2px 8px; border-radius: 4px; font-size: 1rem; font-weight: 700; letter-spacing: 0.5px; color: #e65100; }

    .empty-state { text-align: center; padding: 48px; color: #9e9e9e; }
    .empty-state mat-icon { font-size: 48px; width: 48px; height: 48px; color: #3EB9A8; opacity: 0.5; margin-bottom: 8px; }
    .reload-btn { text-align: center; margin-top: 24px; }
    .status-waiting { background:#e3f2fd;color:#1565c0; }
    .status-vitals { background:#e0f7fa;color:#00838f; }
    .status-ready { background:#f3e5f5;color:#7b1fa2; }
    .status-being-called { background:#fff3e0;color:#e65100; }
    .status-in-consultation { background:#e8f5e9;color:#2e7d32; }
    .status-completed { background:#f5f5f5;color:#616161; }
    .status-absent { background:#ffebee;color:#c62828; }
    .selector-row { display:flex;align-items:center;gap:12px;flex-wrap:wrap; }
    .doctor-status-grid { display:flex;flex-wrap:wrap;gap:10px;margin-top:8px; }
    .doctor-chip { display:flex;align-items:center;gap:8px;padding:8px 14px;border-radius:20px;font-size:0.85rem; }
    .doctor-available { background:#e8f5e9;color:#2e7d32; }
    .doctor-busy { background:#ffebee;color:#c62828; }
    .doctor-name { font-weight:600; }
    .doctor-status-label { font-size:0.75rem; }
    .queue-filter-row { display:flex;align-items:center;gap:12px; }
    .tab-badge { background:#e53935;color:white;border-radius:10px;padding:1px 7px;font-size:0.72rem;font-weight:700;margin-left:6px; }
    .called-card { background:white;border-radius:10px;padding:16px 20px;margin-bottom:12px;box-shadow:0 1px 6px rgba(0,0,0,0.10); }
    .called-card-header { display:flex;align-items:center;gap:16px;margin-bottom:8px; }
    .vitals-inline-form { margin-top:12px;margin-bottom:8px; }
    .vitals-actions { display:flex;gap:12px;align-items:center;margin-top:4px; }
    .voucher-box { background:#e8f5e9;border:1px solid #a5d6a7;border-radius:12px;padding:24px;max-width:520px; }
    .voucher-header { display:flex;align-items:center;gap:12px;margin-bottom:16px; }
    .voucher-header mat-icon { font-size:40px;width:40px;height:40px;color:#2e7d32; }
    .voucher-code { font-size:2.5rem;font-weight:800;letter-spacing:6px;color:#1b5e20;text-align:center;background:white;padding:12px;border-radius:8px;margin:12px 0; }
    .voucher-details { display:flex;flex-direction:column;gap:6px;font-size:0.92rem;margin-bottom:12px; }
    .voucher-instruction { display:flex;align-items:center;gap:8px;color:#1565c0;font-size:0.9rem;background:#e3f2fd;padding:10px 14px;border-radius:8px; }
    .new-patient-notice { display:flex;align-items:center;gap:12px;background:#fff3e0;padding:14px;border-radius:8px;color:#e65100;margin-top:16px; }
    .recep-success-box { display:flex;align-items:center;gap:16px;background:#e8f5e9;border:1px solid #a5d6a7;border-radius:10px;padding:20px 24px;margin-bottom:16px; }
    .recep-success-box mat-icon { font-size:40px;width:40px;height:40px;color:#2e7d32;flex-shrink:0; }
    .recep-success-box strong { color:#1b5e20;font-size:1rem; }
    .recep-success-box p { color:#555;font-size:0.85rem;margin:4px 0 0; }
    /* Calendar HS */
    .calendar-nav { display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;background:#f0faf8;border-radius:10px;padding:6px 12px; }
    .month-label-hs { font-size:1rem;font-weight:700;color:#1D6C61; }
    .nav-btn { background:none;border:none;cursor:pointer;font-size:2rem;line-height:1;color:#1D6C61;padding:0 8px;border-radius:6px;transition:background 0.15s; }
    .nav-btn:hover { background:#d0f4ef; }
    .calendar-grid-hs { display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-bottom:16px; }
    .cal-weekday-hs { text-align:center;font-size:0.72rem;font-weight:700;color:#9e9e9e;padding:6px 0;text-transform:uppercase; }
    .cal-day { text-align:center;padding:10px 4px;border-radius:8px;font-size:0.9rem;cursor:pointer;transition:background 0.15s;user-select:none; }
    .cal-day.empty { cursor:default; }
    .cal-day.past { color:#ccc;cursor:not-allowed; }
    .cal-day:not(.past):not(.empty):hover { background:#d0f4ef; }
    .cal-day.today { border:2px solid #3EB9A8;font-weight:700; }
    .cal-day.selected { background:#1D6C61 !important;color:white;font-weight:700; }
    .slots-label-hs { display:flex;align-items:center;gap:8px;font-weight:600;color:#1D6C61;margin-bottom:10px;font-size:0.9rem; }
    .slots-grid-hs { display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:12px; }
    .slot-btn-hs { padding:12px 4px;border-radius:8px;border:2px solid #d0e8e5;background:white;cursor:pointer;font-size:0.9rem;font-weight:600;color:#1D6C61;transition:all 0.15s; }
    .slot-btn-hs:hover { background:#d0f4ef;border-color:#3EB9A8; }
    .slot-btn-hs.selected { background:#1D6C61;color:white;border-color:#1D6C61; }
    .call-next-bar { display:flex;align-items:center;gap:16px;padding:16px;background:#f5fafa;border-radius:10px;margin-bottom:4px; }
    .sample-panel { background:#fff8e1;border:1px solid #ffe082;border-radius:10px;padding:16px;margin-top:12px; }
    .sample-info { display:flex;align-items:flex-start;gap:12px; }
    .sample-info mat-icon { font-size:28px;width:28px;height:28px;color:#f57f17;flex-shrink:0;margin-top:2px; }
    .sample-meta { font-size:0.82rem;color:#757575;margin-top:4px; }
    .sample-receipt { display:flex;align-items:flex-start;gap:14px;background:#e8f5e9;border:1px solid #a5d6a7;border-radius:10px;padding:16px;margin-top:12px; }
    .sample-receipt-icon { font-size:36px;width:36px;height:36px;color:#2e7d32;flex-shrink:0;margin-top:2px; }
    .sample-receipt-body { flex:1;display:flex;flex-direction:column;gap:6px; }
    .sample-receipt-body strong { color:#1b5e20;font-size:0.95rem; }
    .sample-receipt-row { display:flex;align-items:center;gap:8px;font-size:0.85rem;color:#333; }
    .sample-receipt-row mat-icon { font-size:16px;width:16px;height:16px;color:#2e7d32;flex-shrink:0; }
    .sample-receipt-row code { background:#e0f2f1;padding:2px 8px;border-radius:4px;font-weight:700;color:#00695c;font-size:0.95rem; }
    /* Emergency tab */
    .emg-empty { display:flex;align-items:center;gap:12px;padding:40px;color:#9e9e9e;justify-content:center; }
    .emg-empty mat-icon { font-size:40px;width:40px;height:40px;opacity:0.4; }
    .emg-ticket-card { display:flex;align-items:flex-start;justify-content:space-between;gap:16px;background:#fff5f5;border:1px solid #ef9a9a;border-left:4px solid #c62828;border-radius:10px;padding:16px 20px;margin-bottom:12px; }
    .emg-ticket-left { flex:1;min-width:0; }
    .emg-urgente-badge { background:#c62828;color:white;font-size:0.7rem;font-weight:700;padding:2px 8px;border-radius:4px;letter-spacing:0.05em;display:inline-block;margin-bottom:6px; }
    .emg-ticket-num { font-size:1.8rem;font-weight:800;color:#b71c1c;line-height:1; }
    .emg-ticket-name { font-size:1rem;font-weight:600;color:#333;margin:4px 0; }
    .emg-ticket-notes { font-size:0.85rem;color:#555;background:#fce4ec;border-radius:6px;padding:4px 10px;margin-bottom:4px;display:inline-block; }
    .emg-ticket-status { font-size:0.82rem;color:#757575;margin-top:4px; }
    .emg-doctor { font-size:0.82rem;color:#555;display:flex;align-items:center;gap:4px;margin-top:4px; }
    .emg-ticket-actions { display:flex;flex-direction:column;align-items:flex-end;gap:8px;flex-shrink:0; }
  `]
})
export class HealthStaffComponent implements OnInit, OnDestroy {
  today = new Date().toISOString().split('T')[0];

  onlyDigits(e: KeyboardEvent): boolean {
    return /[0-9]/.test(e.key);
  }

  // Recepción walk-in (Tab 1)
  recepDpiForm!: FormGroup;
  recepPatientForm!: FormGroup;
  recepExistingPatient: Patient | null = null;
  recepIsNewPatient = false;
  recepSearching = false;
  recepSaving = false;
  recepSaved = false;
  recepNewCredentials: { username: string; tempPassword: string } | null = null;

  clinics: Clinic[] = [];
  visitClinics: Clinic[] = [];
  insurances: any[] = [];

  // Vitals tab
  calledTickets: Ticket[] = [];
  activeVitalsTicketId: number | null = null;
  vitalsFormMap: Record<number, FormGroup> = {};
  sendingVitals = false;
  selectedVitalsClinicId: number | null = null;
  callingVitals = false;
  samplePanels: Record<number, { collecting: boolean; done: boolean; receipt: any | null }> = {};
  private pollInterval: any;

  // Queue tab
  todayQueue: Ticket[] = [];
  loadingQueue = false;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private clinicService: ClinicService,
    private ticketService: TicketService,
    private vitalSignsService: VitalSignsService,
    private appointmentService: AppointmentService,
    private insuranceService: InsuranceService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.recepDpiForm = this.fb.group({
      dpi: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]]
    });
    this.recepPatientForm = this.fb.group({
      firstName:       ['', Validators.required],
      lastName:        ['', Validators.required],
      birthDate:       ['', [birthDateValidator]],
      phone:           ['', [Validators.pattern(/^[1-9]\d{0,7}$/)]],
      email:           ['', [Validators.required, Validators.email]],
      address:         [''],
      insuranceId:     [null],
      insuranceNumber: ['']
    });

    this.clinicService.getAll().subscribe(res => {
      if (res.success) {
        this.clinics = res.data;
        const excluded = ['farmacia', 'emergencia', 'emergencias'];
        this.visitClinics = res.data.filter((c: Clinic) =>
          !excluded.some(x => c.name.toLowerCase().includes(x))
        );
      }
    });
    this.insuranceService.getAll().subscribe(res => { if (res.success) this.insurances = res.data; });
    this.loadCalledTickets();
    this.loadTodayQueue();
    this.pollInterval = setInterval(() => {
      this.loadCalledTickets();
      this.loadTodayQueue();
    }, 8000);

  }

  ngOnDestroy(): void {
    clearInterval(this.pollInterval);
  }

  recepSearchByDpi(): void {
    const dpi = this.recepDpiForm.value.dpi;
    this.recepSearching = true;
    this.recepExistingPatient = null;
    this.recepIsNewPatient = false;
    this.patientService.getByDpi(dpi).subscribe({
      next: res => {
        if (res.success && res.data) {
          this.recepExistingPatient = res.data;
          this.recepPatientForm.patchValue(res.data);
        } else {
          this.recepIsNewPatient = true;
          this.recepPatientForm.reset();
        }
        this.recepSearching = false;
      },
      error: () => {
        this.recepIsNewPatient = true;
        this.recepPatientForm.reset();
        this.recepSearching = false;
      }
    });
  }

  saveRecepPatient(): void {
    this.recepSaving = true;
    if (this.recepExistingPatient) {
      // Update existing patient — include DPI (required by backend validation)
      const updateData = { ...this.recepPatientForm.value, dpi: this.recepExistingPatient.dpi };
      this.patientService.update(this.recepExistingPatient.id, updateData).subscribe({
        next: res => {
          if (res.success) {
            this.recepExistingPatient = res.data;
            this.recepSaved = true;
            this.notification.success('Datos del paciente actualizados');
          } else {
            this.notification.error(res.message || 'Error al actualizar paciente');
          }
          this.recepSaving = false;
        },
        error: err => {
          this.notification.error(err.error?.message || 'Error al actualizar paciente');
          this.recepSaving = false;
        }
      });
    } else {
      // Register new patient with account
      const data = { ...this.recepDpiForm.value, ...this.recepPatientForm.value, createAccount: true };
      this.patientService.create(data).subscribe({
        next: res => {
          if (res.success) {
            if ((res.data as any).tempPassword) {
              this.recepNewCredentials = {
                username: (res.data as any).username ?? data.dpi,
                tempPassword: (res.data as any).tempPassword
              };
            }
            this.recepSaved = true;
            this.notification.success('Paciente registrado exitosamente');
          } else {
            this.notification.error(res.message || 'Error al registrar paciente');
          }
          this.recepSaving = false;
        },
        error: err => {
          this.notification.error(err.error?.message || 'Error al registrar paciente');
          this.recepSaving = false;
        }
      });
    }
  }

  resetRecepFlow(): void {
    this.recepSaved = false;
    this.recepNewCredentials = null;
    this.recepExistingPatient = null;
    this.recepIsNewPatient = false;
    this.recepDpiForm.reset();
    this.recepPatientForm.reset();
  }

  callNextToVitalSigns(): void {
    if (!this.selectedVitalsClinicId) return;
    this.callingVitals = true;
    this.ticketService.callToVitalSigns(this.selectedVitalsClinicId).subscribe({
      next: res => {
        if (res.success) {
          this.notification.success(`${res.data.ticketNumber} llamado a signos vitales`);
          this.loadCalledTickets();
        }
        this.callingVitals = false;
      },
      error: err => {
        this.notification.error(err.error?.message || 'Error al llamar paciente');
        this.callingVitals = false;
      }
    });
  }

  loadCalledTickets(): void {
    this.ticketService.getTodayAllActive().subscribe({
      next: res => {
        if (res.success) {
          this.calledTickets = res.data.filter((t: Ticket) => t.status === 'CALLED_TO_VITAL_SIGNS');
        }
      },
      error: () => {}
    });
  }

  markAbsent(ticket: Ticket): void {
    this.ticketService.markAbsent(ticket.id).subscribe({
      next: res => {
        if (res.success) {
          this.notification.info(`${ticket.patientName} marcado como ausente`);
          this.activeVitalsTicketId = null;
          delete this.vitalsFormMap[ticket.id];
          this.loadCalledTickets();
        }
      },
      error: () => this.notification.error('Error al marcar ausente')
    });
  }

  openVitalsForm(ticket: Ticket): void {
    this.activeVitalsTicketId = ticket.id;
    if (!this.vitalsFormMap[ticket.id]) {
      this.vitalsFormMap[ticket.id] = this.fb.group({
        bloodPressure: [''],
        heartRate: [null],
        temperature: [null],
        weight: [null],
        height: [null],
        oxygenSaturation: [null]
      });
    }
  }

  sendToDoctor(ticket: Ticket): void {
    this.sendingVitals = true;
    const form = this.vitalsFormMap[ticket.id];
    const v = form?.value ?? {};

    const afterVitals = () => {
      if (ticket.type === 'LABORATORIO') {
        // For lab tickets: show sample collection panel instead of confirmArrival
        this.sendingVitals = false;
        this.activeVitalsTicketId = null;
        this.samplePanels[ticket.id] = { collecting: false, done: false, receipt: null };
      } else {
        this.ticketService.confirmArrival(ticket.id).subscribe({
          next: res => {
            if (res.success) {
              this.notification.success(`${ticket.patientName} enviado a consultorio`);
              this.activeVitalsTicketId = null;
              delete this.vitalsFormMap[ticket.id];
              this.loadCalledTickets();
            }
            this.sendingVitals = false;
          },
          error: (err) => {
            this.notification.error(err.error?.message || 'Error al enviar paciente');
            this.sendingVitals = false;
          }
        });
      }
    };

    this.vitalSignsService.register({
      ticketId: ticket.id,
      bloodPressure: v.bloodPressure || null,
      heartRate: v.heartRate ? +v.heartRate : null,
      temperature: v.temperature ? +v.temperature : null,
      weight: v.weight ? +v.weight : null,
      height: v.height ? +v.height : null,
      oxygenSaturation: v.oxygenSaturation ? +v.oxygenSaturation : null
    }).subscribe({ next: () => afterVitals(), error: () => afterVitals() });
  }

  collectSampleAction(ticket: Ticket): void {
    const panel = this.samplePanels[ticket.id];
    if (!panel) return;
    panel.collecting = true;
    this.ticketService.collectSample(ticket.id).subscribe({
      next: res => {
        if (res.success) {
          panel.receipt = res.data;
          panel.done = true;
          this.notification.success(`Muestra ${res.data.sampleCode} enviada a laboratorio`);
        } else {
          this.notification.error('Error al recolectar muestra');
        }
        panel.collecting = false;
      },
      error: err => {
        this.notification.error(err.error?.message || 'Error al recolectar muestra');
        panel.collecting = false;
      }
    });
  }

  dismissSamplePanel(ticketId: number): void {
    delete this.samplePanels[ticketId];
    delete this.vitalsFormMap[ticketId];
    this.loadCalledTickets();
  }

  getStatusClass(status: string): string {
    const m: Record<string, string> = {
      WAITING: 'status-waiting',
      CALLED_TO_VITAL_SIGNS: 'status-vitals',
      READY_FOR_DOCTOR: 'status-ready',
      BEING_CALLED: 'status-being-called',
      IN_CONSULTATION: 'status-in-consultation',
      COMPLETED: 'status-completed',
      ABSENT: 'status-absent',
      CANCELLED_NO_PAYMENT: 'status-absent'
    };
    return m[status] ?? '';
  }

  statusLabel(status: string): string {
    const m: Record<string, string> = {
      WAITING: 'En Espera',
      CALLED_TO_VITAL_SIGNS: 'En Signos Vitales',
      READY_FOR_DOCTOR: 'Listo para Médico',
      BEING_CALLED: 'Siendo Llamado',
      IN_CONSULTATION: 'En Consulta',
      COMPLETED: 'Completado',
      ABSENT: 'Ausente',
      CANCELLED_NO_PAYMENT: 'Cancelado'
    };
    return m[status] ?? status;
  }

  // ── Queue ──────────────────────────────────────────────────────────────────

  loadTodayQueue(): void {
    this.ticketService.getTodayAllActive().subscribe({
      next: res => {
        if (res.success) this.todayQueue = res.data;
      },
      error: () => {}
    });
  }

}
