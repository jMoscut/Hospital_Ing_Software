import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { ClinicService, TicketService, VitalSignsService } from '../../shared/services/ticket.service';
import { InsuranceService } from '../../shared/services/payment.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Clinic, Ticket } from '../../core/models/ticket.model';
import { Patient } from '../../core/models/patient.model';

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

        <!-- TAB 1: Recepción de Pacientes -->
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon class="tab-icon">person_add</mat-icon>
            Recepción de Pacientes
          </ng-template>
          <div class="tab-content">
            <mat-card>
              <mat-card-header>
                <mat-card-title>Registrar Paciente y Asignar Turno</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <mat-stepper [linear]="true" #stepper>

                  <!-- Paso 1: Identificación -->
                  <mat-step [stepControl]="dpiForm" label="Identificación">
                    <form [formGroup]="dpiForm">
                      <h3>Identificar por DPI</h3>
                      <p class="hint-text">Ingrese el DPI del paciente para buscar su registro o crear uno nuevo.</p>
                      <mat-form-field appearance="outline" class="wide">
                        <mat-label>DPI del Paciente (13 dígitos)</mat-label>
                        <mat-icon matPrefix>badge</mat-icon>
                        <input matInput formControlName="dpi" placeholder="0000000000000" maxlength="13">
                        <mat-error>El DPI debe tener exactamente 13 dígitos</mat-error>
                      </mat-form-field>
                      <div class="step-actions">
                        <button mat-raised-button color="primary"
                                (click)="searchByDpi()" [disabled]="dpiForm.invalid || searching">
                          <mat-spinner *ngIf="searching" diameter="20"></mat-spinner>
                          <mat-icon *ngIf="!searching">search</mat-icon>
                          {{ searching ? 'Buscando...' : 'Buscar' }}
                        </button>
                      </div>

                      <div class="found-box" *ngIf="existingPatient">
                        <mat-icon>check_circle</mat-icon>
                        <div>
                          <strong>{{ existingPatient.firstName }} {{ existingPatient.lastName }}</strong>
                          <br><small>{{ existingPatient.patientCode }} · {{ existingPatient.phone }}</small>
                        </div>
                        <button mat-raised-button color="accent" matStepperNext>Continuar →</button>
                      </div>
                    </form>
                  </mat-step>

                  <!-- Paso 2: Datos del paciente (solo si es nuevo) -->
                  <mat-step [stepControl]="patientForm" label="Datos del Paciente">
                    <form [formGroup]="patientForm">
                      <h3>{{ existingPatient ? 'Paciente Registrado' : 'Nuevo Paciente' }}</h3>
                      <div class="form-grid">
                        <mat-form-field appearance="outline">
                          <mat-label>Nombres *</mat-label>
                          <input matInput formControlName="firstName" [readonly]="!!existingPatient">
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>Apellidos *</mat-label>
                          <input matInput formControlName="lastName" [readonly]="!!existingPatient">
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>Teléfono</mat-label>
                          <input matInput formControlName="phone" [readonly]="!!existingPatient">
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>Correo Electrónico</mat-label>
                          <input matInput formControlName="email" [readonly]="!!existingPatient">
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>Dirección</mat-label>
                          <input matInput formControlName="address" [readonly]="!!existingPatient">
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>Contacto de Emergencia</mat-label>
                          <input matInput formControlName="emergencyContact" [readonly]="!!existingPatient">
                        </mat-form-field>
                        <mat-form-field appearance="outline" *ngIf="!existingPatient">
                          <mat-label>Seguro Médico</mat-label>
                          <mat-select formControlName="insuranceId">
                            <mat-option [value]="null">Sin seguro</mat-option>
                            <mat-option *ngFor="let ins of insurances" [value]="ins.id">
                              {{ ins.name }}
                            </mat-option>
                          </mat-select>
                        </mat-form-field>
                      </div>
                      <div class="step-actions">
                        <button mat-button matStepperPrevious>← Anterior</button>
                        <button mat-raised-button color="primary" matStepperNext
                                [disabled]="patientForm.invalid && !existingPatient">
                          Continuar →
                        </button>
                      </div>
                    </form>
                  </mat-step>

                  <!-- Paso 3: Asignar Clínica + Signos Vitales -->
                  <mat-step [stepControl]="ticketForm" label="Turno y Signos Vitales">
                    <form [formGroup]="ticketForm">
                      <h3>Asignar Turno y Registrar Signos Vitales</h3>
                      <div class="form-grid">
                        <mat-form-field appearance="outline" class="wide">
                          <mat-label>Clínica de Destino *</mat-label>
                          <mat-icon matPrefix>local_hospital</mat-icon>
                          <mat-select formControlName="clinicId">
                            <mat-option *ngFor="let c of clinics" [value]="c.id">{{ c.name }}</mat-option>
                          </mat-select>
                        </mat-form-field>
                        <mat-form-field appearance="outline" class="wide">
                          <mat-label>Tipo de Consulta</mat-label>
                          <mat-select formControlName="type">
                            <mat-option value="CONSULTA">Consulta General</mat-option>
                            <mat-option value="CONTROL">Control</mat-option>
                            <mat-option value="EMERGENCIA">Emergencia</mat-option>
                          </mat-select>
                        </mat-form-field>
                      </div>

                      <h4 class="section-subtitle">Signos Vitales (Opcional)</h4>
                      <div class="form-grid">
                        <mat-form-field appearance="outline">
                          <mat-label>Presión Arterial</mat-label>
                          <mat-icon matPrefix>favorite</mat-icon>
                          <input matInput formControlName="bloodPressure" placeholder="120/80">
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>Frecuencia Cardíaca (bpm)</mat-label>
                          <input matInput formControlName="heartRate" type="number">
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>Temperatura (°C)</mat-label>
                          <input matInput formControlName="temperature" type="number" step="0.1">
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>Peso (kg)</mat-label>
                          <input matInput formControlName="weight" type="number" step="0.1">
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>Talla (cm)</mat-label>
                          <input matInput formControlName="height" type="number">
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>Saturación O₂ (%)</mat-label>
                          <input matInput formControlName="oxygenSaturation" type="number">
                        </mat-form-field>
                      </div>

                      <div class="step-actions">
                        <button mat-button matStepperPrevious>← Anterior</button>
                        <button mat-raised-button color="primary"
                                [disabled]="ticketForm.invalid || submitting"
                                (click)="submitAll(stepper)">
                          <mat-spinner *ngIf="submitting" diameter="20"></mat-spinner>
                          <mat-icon *ngIf="!submitting">confirmation_number</mat-icon>
                          {{ submitting ? 'Registrando...' : 'Generar Turno' }}
                        </button>
                      </div>
                    </form>
                  </mat-step>

                </mat-stepper>

                <!-- CU 01: Credenciales temporales generadas para el nuevo paciente -->
                <div class="credentials-box" *ngIf="newPatientCredentials">
                  <mat-icon>key</mat-icon>
                  <div>
                    <strong>Credenciales de acceso al portal generadas</strong>
                    <p>El turno fue registrado. Comunique estas credenciales al paciente. Deberá cambiar la contraseña en su primer inicio de sesión.</p>
                    <div class="cred-row"><span>Usuario:</span> <code>{{ newPatientCredentials.username }}</code></div>
                    <div class="cred-row"><span>Contraseña temporal:</span> <code>{{ newPatientCredentials.tempPassword }}</code></div>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <!-- TAB 2: Triage — Signos Vitales para pacientes llamados por médico -->
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon class="tab-icon">monitor_heart</mat-icon>
            Signos Vitales
            <span class="tab-badge" *ngIf="calledTickets.length > 0">{{ calledTickets.length }}</span>
          </ng-template>
          <div class="tab-content">
            <p class="hint-text">Pacientes llamados por el médico que deben pasar por el área de signos vitales antes de la consulta.</p>

            <div *ngIf="calledTickets.length === 0" class="empty-state">
              <mat-icon>health_and_safety</mat-icon>
              <p>No hay pacientes pendientes de signos vitales</p>
            </div>

            <div *ngFor="let t of calledTickets" class="called-card">
              <div class="called-card-header">
                <div class="ticket-number">{{ t.ticketNumber }}</div>
                <div class="ticket-info">
                  <div class="ticket-patient">{{ t.patientName }}</div>
                  <div class="ticket-meta">{{ t.clinicName }} · {{ t.type }}</div>
                </div>
                <span class="status-chip status-being-called">Llamado por médico</span>
              </div>

              <!-- Vitals form inline -->
              <ng-container *ngIf="activeVitalsTicketId === t.id; else showBtn">
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
                    <mat-icon>send</mat-icon>
                    {{ sendingVitals ? 'Enviando...' : 'Registrar Signos Vitales y Enviar a Consultorio' }}
                  </button>
                  <button mat-button (click)="activeVitalsTicketId = null">Cancelar</button>
                </div>
              </ng-container>
              <ng-template #showBtn>
                <button mat-stroked-button color="primary" (click)="openVitalsForm(t)" style="margin-top:12px">
                  <mat-icon>edit</mat-icon> Tomar Signos Vitales
                </button>
              </ng-template>
            </div>
          </div>
        </mat-tab>

        <!-- TAB 3: Cola del Día -->
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon class="tab-icon">queue</mat-icon>
            Cola del Día ({{ tickets.length }})
          </ng-template>
          <div class="tab-content">
            <div class="queue-filters">
              <mat-form-field appearance="outline">
                <mat-label>Filtrar por clínica</mat-label>
                <mat-select [(ngModel)]="filterClinicId" (selectionChange)="filterTickets()" [ngModelOptions]="{standalone: true}">
                  <mat-option [value]="0">Todas las clínicas</mat-option>
                  <mat-option *ngFor="let c of clinics" [value]="c.id">{{ c.name }}</mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <div class="ticket-row" *ngFor="let t of filteredTickets">
              <div class="ticket-number">{{ t.ticketNumber }}</div>
              <div class="ticket-info">
                <div class="ticket-patient">{{ t.patientName }}</div>
                <div class="ticket-meta">{{ t.clinicName }} · {{ t.type }}</div>
              </div>
              <span [class]="getStatusClass(t.status)" class="status-chip">
                {{ statusLabel(t.status) }}
              </span>
            </div>

            <div class="empty-state" *ngIf="filteredTickets.length === 0">
              <mat-icon>queue</mat-icon>
              <p>No hay pacientes en cola</p>
            </div>

            <div class="reload-btn">
              <button mat-stroked-button color="primary" (click)="loadTickets()">
                <mat-icon>refresh</mat-icon> Actualizar Cola
              </button>
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
    .status-being-called { background:#fff3e0;color:#e65100; }
    .status-in-consultation { background:#e8f5e9;color:#2e7d32; }
    .status-completed { background:#f5f5f5;color:#616161; }
    .status-absent { background:#ffebee;color:#c62828; }
    .tab-badge { background:#e53935;color:white;border-radius:10px;padding:1px 7px;font-size:0.72rem;font-weight:700;margin-left:6px; }
    .called-card { background:white;border-radius:10px;padding:16px 20px;margin-bottom:12px;box-shadow:0 1px 6px rgba(0,0,0,0.10); }
    .called-card-header { display:flex;align-items:center;gap:16px;margin-bottom:8px; }
    .vitals-inline-form { margin-top:12px;margin-bottom:8px; }
    .vitals-actions { display:flex;gap:12px;align-items:center;margin-top:4px; }
  `]
})
export class HealthStaffComponent implements OnInit, OnDestroy {
  dpiForm!: FormGroup;
  patientForm!: FormGroup;
  ticketForm!: FormGroup;

  clinics: Clinic[] = [];
  insurances: any[] = [];
  tickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];
  filterClinicId = 0;

  existingPatient: Patient | null = null;
  searching = false;
  submitting = false;
  newPatientCredentials: { username: string; tempPassword: string } | null = null;

  // Vitals tab
  calledTickets: Ticket[] = [];
  activeVitalsTicketId: number | null = null;
  vitalsFormMap: Record<number, FormGroup> = {};
  sendingVitals = false;
  private pollInterval: any;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private clinicService: ClinicService,
    private ticketService: TicketService,
    private vitalSignsService: VitalSignsService,
    private insuranceService: InsuranceService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.dpiForm = this.fb.group({
      dpi: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]]
    });
    this.patientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: [''],
      email: ['', Validators.email],
      address: [''],
      emergencyContact: [''],
      insuranceId: [null]
    });
    this.ticketForm = this.fb.group({
      clinicId: [null, Validators.required],
      type: ['CONSULTA'],
      bloodPressure: [''],
      heartRate: [''],
      temperature: [''],
      weight: [''],
      height: [''],
      oxygenSaturation: ['']
    });

    this.clinicService.getAll().subscribe(res => { if (res.success) this.clinics = res.data; });
    this.insuranceService.getAll().subscribe(res => { if (res.success) this.insurances = res.data; });
    this.loadTickets();
    this.loadCalledTickets();
    this.pollInterval = setInterval(() => this.loadCalledTickets(), 8000);
  }

  ngOnDestroy(): void {
    clearInterval(this.pollInterval);
  }

  searchByDpi(): void {
    const dpi = this.dpiForm.value.dpi;
    this.searching = true;
    this.patientService.getByDpi(dpi).subscribe({
      next: res => {
        if (res.success && res.data) {
          this.existingPatient = res.data;
          this.patientForm.patchValue(res.data);
        }
        this.searching = false;
      },
      error: () => {
        this.existingPatient = null;
        this.patientForm.reset();
        this.searching = false;
      }
    });
  }

  submitAll(stepper: any): void {
    this.submitting = true;

    const createTicketAndVitalSigns = (patientId: number) => {
      const tv = this.ticketForm.value;
      this.ticketService.create({
        patientId,
        clinicId: tv.clinicId,
        type: tv.type,
        notes: ''
      }).subscribe({
        next: ticketRes => {
          if (ticketRes.success) {
            const ticketId = ticketRes.data.id;
            const hasVitals = tv.bloodPressure || tv.heartRate || tv.temperature || tv.weight;
            if (hasVitals) {
              this.vitalSignsService.register({
                ticketId,
                patientId,
                bloodPressure: tv.bloodPressure,
                heartRate: tv.heartRate ? +tv.heartRate : null,
                temperature: tv.temperature ? +tv.temperature : null,
                weight: tv.weight ? +tv.weight : null,
                height: tv.height ? +tv.height : null,
                oxygenSaturation: tv.oxygenSaturation ? +tv.oxygenSaturation : null
              }).subscribe({ error: () => {} });
            }
            this.notification.success(`Turno ${ticketRes.data.ticketNumber} generado para ${ticketRes.data.patientName}`);
            stepper.reset();
            this.existingPatient = null;
            this.loadTickets();
          }
          this.submitting = false;
        },
        error: () => { this.notification.error('Error al generar turno'); this.submitting = false; }
      });
    };

    if (this.existingPatient) {
      this.newPatientCredentials = null;
      createTicketAndVitalSigns(this.existingPatient.id);
    } else {
      const data = { ...this.dpiForm.value, ...this.patientForm.value };
      this.patientService.create(data).subscribe({
        next: res => {
          if (res.success) {
            // CU 01: mostrar credenciales temporales si el backend las generó
            if (res.data.tempPassword) {
              this.newPatientCredentials = {
                username: res.data.username ?? data.dpi,
                tempPassword: res.data.tempPassword
              };
            } else {
              this.newPatientCredentials = null;
            }
            createTicketAndVitalSigns(res.data.id);
          } else {
            this.notification.error(res.message || 'Error al registrar paciente');
            this.submitting = false;
          }
        },
        error: err => {
          const msg = err.error?.message || err.message || 'Error al registrar paciente';
          this.notification.error(msg);
          this.submitting = false;
        }
      });
    }
  }

  loadCalledTickets(): void {
    this.ticketService.getAll().subscribe({
      next: res => {
        if (res.success) {
          this.calledTickets = res.data.filter((t: Ticket) => t.status === 'BEING_CALLED');
        }
      },
      error: () => {}
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
    const hasVitals = v.bloodPressure || v.heartRate || v.temperature || v.weight;

    const confirmAndSend = () => {
      this.ticketService.confirmArrival(ticket.id).subscribe({
        next: res => {
          if (res.success) {
            this.notification.success(`${ticket.patientName} enviado a consultorio`);
            this.activeVitalsTicketId = null;
            delete this.vitalsFormMap[ticket.id];
            this.loadCalledTickets();
            this.loadTickets();
          }
          this.sendingVitals = false;
        },
        error: (err) => {
          const msg = err.error?.message || 'Error al enviar paciente';
          this.notification.error(msg);
          this.sendingVitals = false;
        }
      });
    };

    // Always register vitals (upsert on backend); even empty values satisfy RN-03
    this.vitalSignsService.register({
      ticketId: ticket.id,
      bloodPressure: v.bloodPressure || null,
      heartRate: v.heartRate ? +v.heartRate : null,
      temperature: v.temperature ? +v.temperature : null,
      weight: v.weight ? +v.weight : null,
      height: v.height ? +v.height : null,
      oxygenSaturation: v.oxygenSaturation ? +v.oxygenSaturation : null
    }).subscribe({ next: () => confirmAndSend(), error: () => confirmAndSend() });
  }

  loadTickets(): void {
    this.ticketService.getAll().subscribe({
      next: res => {
        if (res.success) {
          this.tickets = res.data.filter(t =>
            t.status === 'WAITING' || t.status === 'BEING_CALLED' || t.status === 'IN_CONSULTATION'
          );
          this.filterTickets();
        }
      },
      error: () => {}
    });
  }

  filterTickets(): void {
    if (this.filterClinicId === 0) {
      this.filteredTickets = this.tickets;
    } else {
      this.filteredTickets = this.tickets.filter(t => t.clinicId === this.filterClinicId);
    }
  }

  getStatusClass(status: string): string {
    const m: Record<string, string> = {
      WAITING: 'status-waiting', BEING_CALLED: 'status-being-called',
      IN_CONSULTATION: 'status-in-consultation', COMPLETED: 'status-completed',
      ABSENT: 'status-absent', CANCELLED_NO_PAYMENT: 'status-absent'
    };
    return m[status] ?? '';
  }

  statusLabel(status: string): string {
    const m: Record<string, string> = {
      WAITING: 'En Espera', BEING_CALLED: 'Siendo Llamado',
      IN_CONSULTATION: 'En Consulta', COMPLETED: 'Completado',
      ABSENT: 'Ausente', CANCELLED_NO_PAYMENT: 'Cancelado'
    };
    return m[status] ?? status;
  }
}
