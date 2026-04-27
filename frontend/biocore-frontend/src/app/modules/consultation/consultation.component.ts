import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { interval, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { TicketService, VitalSignsService, AppointmentService } from '../../shared/services/ticket.service';
import { PrescriptionService, LabService, MedicineService, LabExamService } from '../../shared/services/lab.service';
import { AuthService } from '../../core/auth/auth.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Ticket, VitalSigns } from '../../core/models/ticket.model';
import { Medicine, LabExam } from '../../core/models/lab.model';

@Component({
  selector: 'app-consultation',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, MatCardModule, MatButtonModule,
    MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatDividerModule, MatProgressSpinnerModule, MatChipsModule,
    MatSlideToggleModule
  ],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Consulta Médica</h1>
        <div class="header-right">
          <span class="realtime-badge" *ngIf="assignedClinicId">
            <mat-icon>radio_button_checked</mat-icon> Clínica {{ assignedClinicName }}
          </span>
          <!-- Doctor availability toggle -->
          <div class="availability-bar" [class.available]="doctorAvailable">
            <mat-icon>{{ doctorAvailable ? 'check_circle' : 'pause_circle' }}</mat-icon>
            <span>{{ doctorAvailable ? 'Disponible' : 'No disponible' }}</span>
            <mat-slide-toggle [checked]="doctorAvailable" (change)="toggleAvailability()" color="primary"></mat-slide-toggle>
          </div>
          <button mat-raised-button color="warn" *ngIf="currentTicket && currentTicket.status === 'IN_CONSULTATION'"
                  (click)="markAbsent()" title="Paciente no se presentó">
            <mat-icon>person_off</mat-icon> Ausente
          </button>
        </div>
      </div>

      <div class="consultation-layout">
        <!-- COLA DE PACIENTES -->
        <div class="queue-panel">
          <!-- Pacientes listos para consulta (READY_FOR_DOCTOR) -->
          <mat-card style="margin-bottom:16px">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>assignment_turned_in</mat-icon> Listos para Consulta
              </mat-card-title>
              <mat-card-subtitle>{{ readyPatients.length }} paciente(s) con signos vitales registrados</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="ready-ticket" *ngFor="let t of readyPatients">
                <div class="ticket-number">{{ t.ticketNumber }}</div>
                <div class="ticket-info">
                  <div class="ticket-patient">{{ t.patientName }}</div>
                  <div class="ticket-meta">{{ t.type }}</div>
                </div>
                <button mat-raised-button color="primary" style="flex-shrink:0"
                        [disabled]="!!currentTicket"
                        (click)="callToConsultation(t)">
                  <mat-icon>campaign</mat-icon> Llamar
                </button>
              </div>
              <p *ngIf="readyPatients.length === 0" class="empty-msg">
                Sin pacientes listos — esperando signos vitales del personal de salud
              </p>
            </mat-card-content>
          </mat-card>

          <!-- Cola de espera general -->
          <mat-card>
            <mat-card-header>
              <mat-card-title>
                <mat-icon>queue</mat-icon> Cola de Espera
              </mat-card-title>
              <mat-card-subtitle>{{ queue.length }} paciente(s) esperando</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <p class="hint" *ngIf="!doctorAvailable" style="color:#e65100">
                <mat-icon style="font-size:14px;vertical-align:middle">info</mat-icon>
                Márquese disponible para que personal de salud pueda llamar pacientes
              </p>

              <mat-divider class="mb-16" *ngIf="queue.length > 0"></mat-divider>

              <!-- Lista de cola -->
              <div class="queue-ticket" *ngFor="let t of queue; let i = index">
                <div class="ticket-number" [class.urgent]="t.priority === 'URGENT'">
                  {{ t.ticketNumber }}
                </div>
                <div class="ticket-info">
                  <div class="ticket-patient">{{ t.patientName }}</div>
                  <div class="ticket-meta">
                    {{ t.type }}
                    <span *ngIf="t.doctorName"> · Dr. {{ t.doctorName }}</span>
                    <span class="emergency-badge" *ngIf="t.priority === 'URGENT'">URGENTE</span>
                  </div>
                  <div class="ticket-time" *ngIf="t.scheduledTime">
                    <mat-icon style="font-size:12px;width:12px;height:12px;vertical-align:middle">schedule</mat-icon>
                    {{ t.scheduledTime }}
                  </div>
                </div>
                <span class="pos-badge">#{{ i + 1 }}</span>
              </div>

              <p *ngIf="queue.length === 0" class="empty-msg">Sin pacientes en espera</p>
            </mat-card-content>
          </mat-card>
          <!-- Citas del día -->
          <mat-card style="margin-top:16px">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>event_available</mat-icon> Citas del Día
              </mat-card-title>
              <mat-card-subtitle>{{ todayAppointments.length }} cita(s) programada(s) para hoy</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div *ngFor="let a of todayAppointments" class="appt-row">
                <div class="appt-time">{{ a.scheduledTime }}</div>
                <div class="appt-info">
                  <div class="appt-patient">{{ a.patientName }}</div>
                  <div class="appt-type">{{ a.type }}</div>
                </div>
                <span [class]="'appt-chip ' + apptStatusClass(a.status)">{{ apptStatusLabel(a.status) }}</span>
              </div>
              <p *ngIf="todayAppointments.length === 0" class="empty-msg">Sin citas programadas para hoy</p>
            </mat-card-content>
          </mat-card>

          <!-- Calendario de Citas Asignadas -->
          <mat-card style="margin-top:16px">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>calendar_month</mat-icon> Calendario de Citas
              </mat-card-title>
              <mat-card-subtitle>{{ allAppointments.length }} cita(s) asignada(s) en total</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="cal-nav">
                <button class="cal-nav-btn" type="button" (click)="calPrevMonth()">&#8249;</button>
                <span class="cal-month-label">{{ calMonthLabel }}</span>
                <button class="cal-nav-btn" type="button" (click)="calNextMonth()">&#8250;</button>
              </div>
              <div class="cal-grid">
                <div class="cal-wd" *ngFor="let d of calWeekDays">{{ d }}</div>
                <ng-container *ngFor="let day of calendarDays">
                  <div *ngIf="!day" class="cal-day"></div>
                  <div *ngIf="day" [class]="calDayClass(day)" (click)="calSelectDate(day)">
                    {{ day.getDate() }}
                    <span class="cal-dot" *ngIf="calDayHasAppt(day)"></span>
                  </div>
                </ng-container>
              </div>
              <!-- Selected day appointments -->
              <div *ngIf="selectedCalDate" class="cal-day-detail">
                <div class="cal-day-title">
                  <mat-icon>event</mat-icon>
                  Citas del {{ selectedCalDate.getDate() }} de {{ calMonthNames[selectedCalDate.getMonth()] }}
                </div>
                <div *ngFor="let a of selectedDayAppts" class="appt-row">
                  <div class="appt-time">{{ a.scheduledTime }}</div>
                  <div class="appt-info">
                    <div class="appt-patient">{{ a.patientName }}</div>
                    <div class="appt-type">{{ a.type }}</div>
                  </div>
                  <span [class]="'appt-chip ' + apptStatusClass(a.status)">{{ apptStatusLabel(a.status) }}</span>
                </div>
                <p *ngIf="selectedDayAppts.length === 0" class="empty-msg">Sin citas este día</p>
              </div>
            </mat-card-content>
          </mat-card>

        </div> <!-- end queue-panel -->

        <!-- PANEL DE CONSULTA ACTIVA -->
        <div class="consultation-panel">
          <mat-card *ngIf="currentTicket">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>medical_services</mat-icon>
                Paciente: {{ currentTicket.patientName }}
              </mat-card-title>
              <mat-card-subtitle>
                Ticket: {{ currentTicket.ticketNumber }} · {{ currentTicket.clinicName }}
                <span class="emergency-badge ml-8" *ngIf="currentTicket.priority === 'URGENT'">URGENTE</span>
              </mat-card-subtitle>
            </mat-card-header>

            <mat-card-content>
              <!-- Signos vitales siendo tomados -->
              <div class="vitals-waiting" *ngIf="currentTicket.status === 'CALLED_TO_VITAL_SIGNS'">
                <mat-icon class="spin-icon">hourglass_top</mat-icon>
                <div>
                  <strong>Paciente en área de Signos Vitales</strong>
                  <p>Personal de salud está tomando los signos vitales.</p>
                </div>
              </div>

              <!-- Listo para llamar a consultorio -->
              <div class="ready-banner" *ngIf="currentTicket.status === 'READY_FOR_DOCTOR'">
                <mat-icon>assignment_turned_in</mat-icon>
                <div>
                  <strong>Signos Vitales registrados — Paciente listo</strong>
                  <p>Revise los signos vitales y llame al paciente a su consultorio.</p>
                </div>
                <button mat-raised-button color="primary" (click)="callToConsultation(currentTicket)">
                  <mat-icon>campaign</mat-icon> Llamar al Consultorio
                </button>
              </div>

              <!-- Paciente en camino al consultorio -->
              <div class="vitals-waiting" *ngIf="currentTicket.status === 'BEING_CALLED'"
                   style="background:#e3f2fd;border-color:#90caf9">
                <mat-icon style="color:#1565c0">directions_walk</mat-icon>
                <div>
                  <strong style="color:#1565c0">Paciente en camino al consultorio</strong>
                  <p>Confirme su llegada para iniciar la consulta.</p>
                </div>
                <button mat-raised-button color="accent" (click)="startConsultation()">
                  <mat-icon>play_circle</mat-icon> Iniciar Consulta
                </button>
              </div>

              <!-- Signos vitales recibidos de enfermería (RN-03: solo lectura para el médico) -->
              <div class="vitals-received" *ngIf="currentVitals">
                <div class="vitals-header">
                  <mat-icon>monitor_heart</mat-icon>
                  <strong>Signos Vitales</strong>
                  <span class="vitals-from">Registrado por Personal de Salud</span>
                </div>
                <div class="vitals-grid-display">
                  <div class="vital-item" *ngIf="currentVitals.bloodPressure">
                    <span class="vital-label">Presión Arterial</span>
                    <span class="vital-value">{{ currentVitals.bloodPressure }}</span>
                  </div>
                  <div class="vital-item" *ngIf="currentVitals.heartRate">
                    <span class="vital-label">Frec. Cardíaca</span>
                    <span class="vital-value">{{ currentVitals.heartRate }} <small>bpm</small></span>
                  </div>
                  <div class="vital-item" *ngIf="currentVitals.temperature">
                    <span class="vital-label">Temperatura</span>
                    <span class="vital-value">{{ currentVitals.temperature }} <small>°C</small></span>
                  </div>
                  <div class="vital-item" *ngIf="currentVitals.weight">
                    <span class="vital-label">Peso</span>
                    <span class="vital-value">{{ currentVitals.weight }} <small>kg</small></span>
                  </div>
                  <div class="vital-item" *ngIf="currentVitals.height">
                    <span class="vital-label">Talla</span>
                    <span class="vital-value">{{ currentVitals.height }} <small>cm</small></span>
                  </div>
                  <div class="vital-item" *ngIf="currentVitals.oxygenSaturation">
                    <span class="vital-label">SpO₂</span>
                    <span class="vital-value">{{ currentVitals.oxygenSaturation }} <small>%</small></span>
                  </div>
                </div>
              </div>

              <mat-divider class="mt-16 mb-16"></mat-divider>

              <!-- Diagnóstico + Receta -->
              <div *ngIf="currentTicket.status === 'IN_CONSULTATION'">
                <h4><mat-icon>edit_note</mat-icon> Diagnóstico y Receta</h4>
                <form [formGroup]="consultationForm">
                  <mat-form-field appearance="outline" class="full-width">
                    <mat-label>Diagnóstico</mat-label>
                    <textarea matInput formControlName="notes" rows="3"></textarea>
                  </mat-form-field>

                  <!-- Sección de receta: medicamentos -->
                  <h5><mat-icon style="vertical-align:middle;font-size:18px">medication</mat-icon> Medicamentos (Receta)</h5>
                  <div class="medicine-row" *ngFor="let item of prescriptionItems; let i = index">
                    <mat-form-field appearance="outline" style="flex:2">
                      <mat-label>Medicamento</mat-label>
                      <mat-select [(ngModel)]="item.medicineId" [ngModelOptions]="{standalone: true}">
                        <mat-option *ngFor="let m of medicines" [value]="m.id">
                          <span class="med-code" *ngIf="m.code">{{ m.code }}</span>
                          {{ m.name }}
                          <span class="med-stock" [class.low]="m.stock <= 10"> · Stock: {{ m.stock }}</span>
                        </mat-option>
                      </mat-select>
                    </mat-form-field>
                    <mat-form-field appearance="outline" style="width:90px">
                      <mat-label>Cant.</mat-label>
                      <input matInput type="number" min="1" [(ngModel)]="item.quantity" [ngModelOptions]="{standalone: true}">
                    </mat-form-field>
                    <mat-form-field appearance="outline" style="flex:1">
                      <mat-label>Dosificación</mat-label>
                      <input matInput [(ngModel)]="item.dosage" [ngModelOptions]="{standalone: true}" placeholder="ej. 1 tableta cada 8h">
                    </mat-form-field>
                    <button mat-icon-button color="warn" (click)="removeItem(i)" title="Quitar">
                      <mat-icon>delete</mat-icon>
                    </button>
                  </div>
                  <button mat-stroked-button (click)="addItem()" class="mb-16">
                    <mat-icon>add</mat-icon> Agregar Medicamento
                  </button>

                  <!-- Sección de órdenes de laboratorio -->
                  <mat-divider class="mb-16"></mat-divider>
                  <h5><mat-icon style="vertical-align:middle;font-size:18px">science</mat-icon> Órdenes de Laboratorio</h5>
                  <div class="lab-row" *ngFor="let lab of labOrderItems; let i = index">
                    <mat-form-field appearance="outline" style="flex:2">
                      <mat-label>Examen</mat-label>
                      <mat-select [(ngModel)]="lab.labExamId" [ngModelOptions]="{standalone: true}">
                        <mat-optgroup *ngFor="let cat of labCategories" [label]="cat">
                          <mat-option *ngFor="let e of getExamsByCategory(cat)" [value]="e.id">
                            <span class="exam-code">{{ e.code }}</span> {{ e.name }}
                          </mat-option>
                        </mat-optgroup>
                      </mat-select>
                    </mat-form-field>
                    <mat-form-field appearance="outline" style="flex:1">
                      <mat-label>Notas</mat-label>
                      <input matInput [(ngModel)]="lab.notes" [ngModelOptions]="{standalone: true}" placeholder="Indicaciones">
                    </mat-form-field>
                    <button mat-icon-button color="warn" (click)="removeLabItem(i)" title="Quitar">
                      <mat-icon>delete</mat-icon>
                    </button>
                  </div>
                  <button mat-stroked-button (click)="addLabItem()" class="mb-16">
                    <mat-icon>add</mat-icon> Agregar Orden de Laboratorio
                  </button>
                </form>

                <div class="action-buttons">
                  <button mat-raised-button color="primary" (click)="completeDiagnosis()">
                    <mat-icon>check_circle</mat-icon> Completar Consulta
                  </button>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Sin consulta activa -->
          <mat-card *ngIf="!currentTicket" class="empty-consultation">
            <mat-icon class="big-icon">stethoscope</mat-icon>
            <p>No hay consulta activa.</p>
            <p class="hint">Llame al siguiente paciente de la cola.</p>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .consultation-layout { display: grid; grid-template-columns: 320px 1fr; gap: 24px; }
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .page-header h1 { font-size: 1.6rem; font-weight: 500; color: #1565c0; margin: 0; }
    .header-right { display: flex; align-items: center; gap: 12px; }
    .realtime-badge { display: flex; align-items: center; gap: 4px; background: #e8f5e9; color: #2e7d32; padding: 4px 12px; border-radius: 16px; font-size: 0.8rem; }
    .call-btn { width: 100%; margin-bottom: 8px; }
    .last-called { background: #e3f2fd; border-radius: 8px; padding: 12px; font-size: 0.9rem; margin-top: 8px; }
    .last-called strong { font-size: 1.2rem; color: #1565c0; }
    .pos-badge { background: #e0e0e0; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700; }
    .ticket-number.urgent { color: #c62828; }
    .empty-msg { text-align: center; color: #9e9e9e; padding: 24px 0; }
    .hint { font-size: 0.8rem; color: #9e9e9e; margin: 4px 0; }
    .vitals-waiting { display:flex;align-items:flex-start;gap:12px;background:#fff8e1;border:1px solid #ffe082;border-radius:8px;padding:16px;margin-bottom:16px; }
    .vitals-waiting mat-icon { color:#f57f17;font-size:28px;width:28px;height:28px;flex-shrink:0;margin-top:2px; }
    .vitals-waiting strong { display:block;color:#e65100;margin-bottom:4px; }
    .vitals-waiting p { font-size:0.82rem;color:#666;margin:0; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .spin-icon { animation: spin 2s linear infinite; }
    .vitals-received { background:#e8f5e9;border:1px solid #a5d6a7;border-radius:8px;padding:16px;margin-bottom:16px; }
    .vitals-header { display:flex;align-items:center;gap:8px;margin-bottom:12px;color:#2e7d32; }
    .vitals-from { font-size:0.75rem;color:#66bb6a;margin-left:auto;background:#c8e6c9;padding:2px 8px;border-radius:10px; }
    .vitals-grid-display { display:grid;grid-template-columns:repeat(3,1fr);gap:8px; }
    .vital-item { background:white;border-radius:6px;padding:10px 12px; }
    .vital-label { display:block;font-size:0.72rem;color:#757575;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px; }
    .vital-value { font-size:1.2rem;font-weight:700;color:#1D6C61; }
    .full-width { width: 100%; }
    .medicine-row { display: flex; gap: 8px; align-items: center; margin-bottom: 8px; }
    .lab-row { display: flex; gap: 8px; align-items: center; margin-bottom: 8px; }
    .med-code { font-family: monospace; font-size: 0.75rem; color: #1D6C61; background: #d0f4ef; padding: 1px 5px; border-radius: 4px; margin-right: 4px; }
    .exam-code { font-family: monospace; font-size: 0.75rem; color: #3EB9A8; background: #193A31; padding: 1px 5px; border-radius: 4px; margin-right: 4px; }
    .med-stock { font-size: 0.78rem; color: #666; }
    .med-stock.low { color: #c62828; font-weight: 600; }
    .availability-bar { display:flex; align-items:center; gap:10px; padding:8px 16px; border-radius:20px; background:#fce4ec; color:#c62828; font-size:0.88rem; font-weight:600; transition:all 0.3s; }
    .availability-bar mat-icon { font-size:20px; width:20px; height:20px; }
    .availability-bar.available { background:#e8f5e9; color:#2e7d32; }
    .ready-ticket { display:flex; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid #f0f0f0; }
    .ready-ticket:last-child { border-bottom:none; }
    .ready-banner { display:flex; align-items:center; gap:12px; background:#e8f5e9; border:1px solid #a5d6a7; border-radius:8px; padding:16px; margin-bottom:16px; flex-wrap:wrap; }
    .ready-banner mat-icon { color:#2e7d32; font-size:28px; width:28px; height:28px; flex-shrink:0; }
    .ready-banner strong { display:block; color:#2e7d32; margin-bottom:4px; }
    .ready-banner p { font-size:0.82rem; color:#555; margin:0; }
    .action-buttons { display: flex; gap: 12px; }
    .empty-consultation { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px; text-align: center; }
    .big-icon { font-size: 64px; width: 64px; height: 64px; color: #9e9e9e; margin-bottom: 16px; }
    .success-msg { color: #2e7d32; font-size: 0.85rem; margin-left: 8px; }
    .ml-8 { margin-left: 8px; }
    .mt-16 { margin-top: 16px; }
    .mb-16 { margin-bottom: 16px; }
    h4 { font-size: 1rem; font-weight: 600; margin-bottom: 12px; }
    h5 { font-size: 0.9rem; font-weight: 600; color: #1D6C61; margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }
    .appt-row { display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid #f5f5f5; }
    .appt-row:last-child { border-bottom:none; }
    .appt-time { font-size:1.1rem;font-weight:700;color:#1D6C61;min-width:52px; }
    .appt-info { flex:1; }
    .appt-patient { font-weight:500;font-size:0.9rem; }
    .appt-type { font-size:0.78rem;color:#757575; }
    .appt-chip { padding:2px 10px;border-radius:10px;font-size:0.75rem;font-weight:500;white-space:nowrap; }
    .appt-pending { background:#fff3e0;color:#e65100; }
    .appt-confirmed { background:#e8f5e9;color:#2e7d32; }
    .appt-cancelled { background:#ffebee;color:#c62828; }
    /* Appointment calendar */
    .cal-nav { display:flex;align-items:center;justify-content:space-between;background:#f0faf8;border-radius:8px;padding:4px 10px;margin-bottom:8px; }
    .cal-month-label { font-size:0.9rem;font-weight:700;color:#1D6C61; }
    .cal-nav-btn { background:none;border:none;cursor:pointer;font-size:1.6rem;line-height:1;color:#1D6C61;padding:0 6px;border-radius:4px; }
    .cal-nav-btn:hover { background:#d0f4ef; }
    .cal-grid { display:grid;grid-template-columns:repeat(7,1fr);gap:2px;margin-bottom:8px; }
    .cal-wd { text-align:center;font-size:0.65rem;font-weight:700;color:#9e9e9e;padding:4px 0;text-transform:uppercase; }
    .cal-day { text-align:center;padding:6px 2px;border-radius:6px;font-size:0.82rem;cursor:pointer;position:relative;transition:background 0.15s;user-select:none; }
    .cal-day:not(:empty):hover { background:#e0f7f4; }
    .cal-today { border:2px solid #3EB9A8;font-weight:700; }
    .cal-selected { background:#1D6C61!important;color:white; }
    .cal-has-appt { font-weight:700;color:#1D6C61; }
    .cal-selected.cal-has-appt { color:white; }
    .cal-dot { display:block;width:5px;height:5px;background:#3EB9A8;border-radius:50%;margin:1px auto 0; }
    .cal-selected .cal-dot { background:white; }
    .cal-day-detail { background:#f8fffe;border:1px solid #d0ede9;border-radius:8px;padding:12px;margin-top:8px; }
    .cal-day-title { display:flex;align-items:center;gap:6px;font-weight:600;color:#1D6C61;font-size:0.88rem;margin-bottom:8px; }
    .cal-day-title mat-icon { font-size:16px;width:16px;height:16px; }
  `]
})
export class ConsultationComponent implements OnInit, OnDestroy {
  queue: Ticket[] = [];
  readyPatients: Ticket[] = [];
  currentTicket: Ticket | null = null;
  lastCalledTicket: Ticket | null = null;
  currentVitals: VitalSigns | null = null;
  medicines: Medicine[] = [];
  labExams: LabExam[] = [];
  labCategories: string[] = [];
  prescriptionItems: any[] = [];
  labOrderItems: any[] = [];
  consultationForm!: FormGroup;
  calling = false;
  doctorAvailable = false;
  assignedClinicId: number | null = null;
  assignedClinicName = '';
  todayAppointments: any[] = [];
  allAppointments: any[] = [];
  calYear = new Date().getFullYear();
  calMonth = new Date().getMonth();
  calendarDays: (Date | null)[] = [];
  selectedCalDate: Date | null = null;
  selectedDayAppts: any[] = [];
  readonly calWeekDays = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
  readonly calMonthNames = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  private sub!: Subscription;

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService,
    private vitalSignsService: VitalSignsService,
    private prescriptionService: PrescriptionService,
    private labService: LabService,
    private labExamService: LabExamService,
    private medicineService: MedicineService,
    private authService: AuthService,
    private notification: NotificationService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.consultationForm = this.fb.group({ notes: [''] });

    this.medicineService.getAll().subscribe(res => {
      if (res.success) this.medicines = res.data;
    });
    this.labExamService.getAll().subscribe(res => {
      if (res.success) {
        this.labExams = res.data;
        this.labCategories = [...new Set(res.data.map((e: LabExam) => e.category))].sort();
      }
    });

    // Poll queue every 5s (RN-M03)
    this.sub = interval(5000).pipe(startWith(0)).subscribe(() => {
      this.loadQueue();
      this.syncAvailability();
      this.loadTodayAppointments();
      this.loadAllAppointments();
      this.buildApptCalendar();
    });
  }

  loadQueue(): void {
    const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Guatemala' }).format(new Date());
    const isToday = (t: Ticket) => !t.scheduledDate || t.scheduledDate === today;
    this.ticketService.getAll().subscribe(res => {
      if (!res.success) return;

      const myId = this.authService.getUserId();
      const activeStatuses: string[] = ['CALLED_TO_VITAL_SIGNS', 'READY_FOR_DOCTOR', 'BEING_CALLED', 'IN_CONSULTATION'];
      const myTicket = res.data.find((t: Ticket) =>
        activeStatuses.includes(t.status) && t.doctorId === myId && isToday(t)
      );

      // READY_FOR_DOCTOR patients assigned to me (may include currentTicket)
      this.readyPatients = res.data.filter((t: Ticket) =>
        t.status === 'READY_FOR_DOCTOR' && t.doctorId === myId && isToday(t)
      );

      if (myTicket) {
        if (!this.assignedClinicId) {
          this.assignedClinicId = myTicket.clinicId;
          this.assignedClinicName = myTicket.clinicName;
        }

        const isNew     = !this.currentTicket || this.currentTicket.id !== myTicket.id;
        const changed   = this.currentTicket && this.currentTicket.status !== myTicket.status;

        if (isNew || changed) {
          this.currentTicket = myTicket;
          this.currentVitals = null;
          this.loadCurrentVitals();
        }
      } else if (!this.assignedClinicId && res.data.length > 0) {
        this.assignedClinicId = res.data[0]?.clinicId;
        this.assignedClinicName = res.data[0]?.clinicName;
      }

      if (this.assignedClinicId) this.loadClinicQueue();

      // Keep retrying vitals until they arrive
      if (this.currentTicket && !this.currentVitals) {
        this.loadCurrentVitals();
      }
    });
  }

  loadClinicQueue(): void {
    const myId = this.authService.getUserId();
    if (!this.assignedClinicId || !myId) return;
    this.ticketService.getQueueForDoctor(this.assignedClinicId, myId).subscribe(res => {
      if (res.success) this.queue = res.data;
    });
  }

  private syncAvailability(): void {
    this.ticketService.getMe().subscribe({
      next: res => { if (res.success) this.doctorAvailable = res.data.available; },
      error: () => {}
    });
  }

  toggleAvailability(): void {
    this.ticketService.toggleDoctorAvailability().subscribe({
      next: res => {
        if (res.success) {
          this.doctorAvailable = res.data.available;
          this.notification.info(this.doctorAvailable ? 'Marcado como disponible' : 'Marcado como no disponible');
        }
      },
      error: () => this.notification.error('Error al cambiar disponibilidad')
    });
  }

  callToConsultation(ticket: Ticket): void {
    this.ticketService.callToConsultation(ticket.id).subscribe({
      next: res => {
        if (res.success) {
          this.currentTicket = res.data;
          this.currentVitals = null;
          this.loadCurrentVitals();
          this.notification.info(`${res.data.ticketNumber} llamado al consultorio`);
        }
      },
      error: err => this.notification.error(err.error?.message || 'Error al llamar paciente')
    });
  }

  startConsultation(): void {
    if (!this.currentTicket) return;
    this.ticketService.confirmArrival(this.currentTicket.id).subscribe({
      next: res => {
        if (res.success) {
          this.currentTicket = res.data;
          this.notification.success('Consulta iniciada');
        }
      },
      error: err => this.notification.error(err.error?.message || 'Error al iniciar consulta')
    });
  }

  callNext(): void {
    if (!this.assignedClinicId) return;
    this.calling = true;
    this.ticketService.callNext(this.assignedClinicId).subscribe({
      next: res => {
        if (res.success) {
          this.lastCalledTicket = res.data;
          this.currentTicket = res.data;
          this.currentVitals = null;
          this.notification.info(`Llamando: ${res.data.ticketNumber} — dirija al paciente al área de Signos Vitales`);
        }
        this.calling = false;
      },
      error: () => {
        this.notification.error('Error al llamar paciente');
        this.calling = false;
      }
    });
  }

  private loadCurrentVitals(): void {
    if (!this.currentTicket) return;
    this.vitalSignsService.getByTicket(this.currentTicket.id).subscribe({
      next: res => { if (res.success) this.currentVitals = res.data; },
      error: () => {}
    });
  }

  addItem(): void { this.prescriptionItems.push({ medicineId: null, quantity: 1, dosage: '', instructions: '' }); }
  removeItem(i: number): void { this.prescriptionItems.splice(i, 1); }

  addLabItem(): void { this.labOrderItems.push({ labExamId: null, notes: '' }); }
  removeLabItem(i: number): void { this.labOrderItems.splice(i, 1); }

  getExamsByCategory(category: string): LabExam[] {
    return this.labExams.filter(e => e.category === category);
  }

  completeDiagnosis(): void {
    if (!this.currentTicket) return;
    const userId = this.authService.getUserId();

    const finalize = () => {
      this.ticketService.complete(this.currentTicket!.id).subscribe({
        next: () => {
          this.notification.success('Consulta completada');
          this.doctorAvailable = false;
          this.currentTicket = null;
          this.currentVitals = null;
          this.prescriptionItems = [];
          this.labOrderItems = [];
          this.consultationForm.reset();
          this.loadClinicQueue();
        }
      });
    };

    // Crear órdenes de laboratorio si hay
    const createLabOrders = (onDone: () => void) => {
      const validLabItems = this.labOrderItems.filter(l => l.labExamId);
      if (validLabItems.length === 0) { onDone(); return; }
      let pending = validLabItems.length;
      validLabItems.forEach(l => {
        this.labService.create({
          patientId: this.currentTicket!.patientId,
          doctorId: userId,
          ticketId: this.currentTicket!.id,
          labExamId: l.labExamId,
          notes: l.notes
        }).subscribe({
          next: () => { if (--pending === 0) { this.notification.success('Órdenes de laboratorio generadas'); onDone(); } },
          error: () => { if (--pending === 0) onDone(); }
        });
      });
    };

    // Crear receta si hay medicamentos
    if (this.prescriptionItems.length > 0) {
      this.prescriptionService.create({
        patientId: this.currentTicket.patientId,
        doctorId: userId,
        ticketId: this.currentTicket.id,
        notes: this.consultationForm.value.notes,
        items: this.prescriptionItems
      }).subscribe({
        next: () => { this.notification.success('Receta generada'); createLabOrders(finalize); },
        error: () => createLabOrders(finalize)
      });
    } else {
      createLabOrders(finalize);
    }
  }

  markAbsent(): void {
    if (!this.currentTicket) return;
    this.ticketService.markAbsent(this.currentTicket.id).subscribe({
      next: () => {
        this.notification.info('Paciente marcado como ausente');
        this.currentTicket = null;
        this.currentVitals = null;
        this.loadClinicQueue();
      }
    });
  }

  loadTodayAppointments(): void {
    const doctorId = this.authService.getUserId();
    if (!doctorId) return;
    const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Guatemala' }).format(new Date());
    this.appointmentService.getByDoctor(doctorId, today).subscribe({
      next: res => { if (res.success) this.todayAppointments = res.data; },
      error: () => {}
    });
  }

  loadAllAppointments(): void {
    const doctorId = this.authService.getUserId();
    if (!doctorId) return;
    this.appointmentService.getAllByDoctor(doctorId).subscribe({
      next: res => {
        if (res.success) {
          this.allAppointments = res.data;
          this.buildApptCalendar();
        }
      },
      error: () => {}
    });
  }

  buildApptCalendar(): void {
    const firstDay = new Date(this.calYear, this.calMonth, 1).getDay();
    const daysInMonth = new Date(this.calYear, this.calMonth + 1, 0).getDate();
    const days: (Date | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(this.calYear, this.calMonth, i));
    this.calendarDays = days;
  }

  calPrevMonth(): void {
    if (this.calMonth === 0) { this.calMonth = 11; this.calYear--; }
    else { this.calMonth--; }
    this.buildApptCalendar();
    this.selectedCalDate = null;
    this.selectedDayAppts = [];
  }

  calNextMonth(): void {
    if (this.calMonth === 11) { this.calMonth = 0; this.calYear++; }
    else { this.calMonth++; }
    this.buildApptCalendar();
    this.selectedCalDate = null;
    this.selectedDayAppts = [];
  }

  calSelectDate(day: Date): void {
    this.selectedCalDate = day;
    const dateStr = `${day.getFullYear()}-${String(day.getMonth()+1).padStart(2,'0')}-${String(day.getDate()).padStart(2,'0')}`;
    this.selectedDayAppts = this.allAppointments.filter(a => a.scheduledDate === dateStr);
  }

  calDayHasAppt(day: Date): boolean {
    const dateStr = `${day.getFullYear()}-${String(day.getMonth()+1).padStart(2,'0')}-${String(day.getDate()).padStart(2,'0')}`;
    return this.allAppointments.some(a => a.scheduledDate === dateStr);
  }

  calDayClass(day: Date): string {
    let cls = 'cal-day';
    const today = new Date(); today.setHours(0,0,0,0);
    if (day.getTime() === today.getTime()) cls += ' cal-today';
    if (this.selectedCalDate && day.getTime() === this.selectedCalDate.getTime()) cls += ' cal-selected';
    if (this.calDayHasAppt(day)) cls += ' cal-has-appt';
    return cls;
  }

  get calMonthLabel(): string { return `${this.calMonthNames[this.calMonth]} ${this.calYear}`; }

  apptStatusLabel(s: string): string {
    const m: Record<string,string> = {
      PENDING_PAYMENT: 'Pendiente pago', CONFIRMED: 'Confirmada', CANCELLED: 'Cancelada'
    };
    return m[s] ?? s;
  }

  apptStatusClass(s: string): string {
    const m: Record<string,string> = {
      PENDING_PAYMENT: 'appt-pending', CONFIRMED: 'appt-confirmed', CANCELLED: 'appt-cancelled'
    };
    return m[s] ?? '';
  }

  ngOnDestroy(): void { this.sub?.unsubscribe(); }
}
