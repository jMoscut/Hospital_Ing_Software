import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { PatientService } from '../../shared/services/patient.service';
import { EmergencyService } from '../../shared/services/payment.service';
import { VitalSignsService } from '../../shared/services/ticket.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Patient } from '../../core/models/patient.model';
import { Ticket } from '../../core/models/ticket.model';

@Component({
  selector: 'app-emergency',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatCardModule, MatButtonModule,
    MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatStepperModule, MatChipsModule, MatDividerModule
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

      <mat-card>
        <mat-card-content>
          <mat-stepper [linear]="true" #stepper>

            <!-- Paso 1: Identificar Paciente -->
            <mat-step [stepControl]="dpiForm" label="Identificar Paciente">
              <form [formGroup]="dpiForm">
                <div class="rn-note">
                  <mat-icon>info</mat-icon>
                  RN-E01: El personal debe registrar explícitamente el ingreso como Emergencia.
                </div>
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>DPI del Paciente (si disponible)</mat-label>
                  <mat-icon matPrefix>badge</mat-icon>
                  <input matInput formControlName="dpi" placeholder="0000000000000" maxlength="13">
                </mat-form-field>
                <button mat-stroked-button color="primary" (click)="searchDpi()" [disabled]="!dpiForm.value.dpi">
                  Buscar en Sistema
                </button>

                <div class="patient-found" *ngIf="foundPatient">
                  <mat-icon>check_circle</mat-icon>
                  <div>
                    <strong>{{ foundPatient.firstName }} {{ foundPatient.lastName }}</strong>
                    <div *ngIf="foundPatient.insuranceName" class="insurance-info">
                      Seguro: {{ foundPatient.insuranceName }} ({{ foundPatient.discountPercentage }}% descuento )
                    </div>
                  </div>
                </div>

                <p class="hint-text">Si el paciente no está registrado, complete los datos en el siguiente paso</p>
                <button mat-raised-button color="warn" matStepperNext style="margin-top:16px">
                  <mat-icon>emergency</mat-icon> Registrar Emergencia →
                </button>
              </form>
            </mat-step>

            <!-- Paso 2: Datos mínimos si no existe (RN-E04) -->
            <mat-step [stepControl]="patientForm" label="Datos del Paciente">
              <form [formGroup]="patientForm">
                <div class="rn-note rn-warn" *ngIf="!foundPatient">
                  <mat-icon>warning</mat-icon>
                  RN-E04: Paciente no encontrado. Complete datos mínimos para no detener la atención.
                </div>
                <div class="patient-ok" *ngIf="foundPatient">
                  <mat-icon>check_circle</mat-icon>
                  Paciente identificado: {{ foundPatient.firstName }} {{ foundPatient.lastName }}
                </div>

                <div class="form-grid" *ngIf="!foundPatient">
                  <mat-form-field appearance="outline">
                    <mat-label>Nombre (aproximado)</mat-label>
                    <input matInput formControlName="firstName" placeholder="Paciente No Identificado">
                    <mat-error>Requerido</mat-error>
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                    <mat-label>Apellido</mat-label>
                    <input matInput formControlName="lastName">
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                    <mat-label>DPI (o descripción física)</mat-label>
                    <input matInput formControlName="dpiNew" placeholder="0000000000000">
                  </mat-form-field>
                </div>

                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Motivo de Emergencia *</mat-label>
                  <mat-icon matPrefix>emergency</mat-icon>
                  <textarea matInput formControlName="motive" rows="3" placeholder="Describa el motivo de ingreso"></textarea>
                  <mat-error>El motivo es obligatorio</mat-error>
                </mat-form-field>

                <div class="step-actions">
                  <button mat-button matStepperPrevious>← Anterior</button>
                  <button mat-raised-button color="warn" matStepperNext
                          [disabled]="patientForm.invalid">
                    Continuar →
                  </button>
                </div>
              </form>
            </mat-step>

            <!-- Paso 3: Signos Vitales (RN-E03 Obligatorio) -->
            <mat-step [stepControl]="vitalsForm" label="Signos Vitales (RN-E03)">
              <form [formGroup]="vitalsForm">
                <div class="rn-note rn-warn">
                  <mat-icon>monitor_heart</mat-icon>
                  Los signos vitales son OBLIGATORIOS antes de asignar médico.
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
                  <button mat-button matStepperPrevious>← Anterior</button>
                  <button mat-raised-button color="warn"
                          (click)="registerEmergency()"
                          [disabled]="submitting">
                    <mat-icon>emergency</mat-icon>
                    {{ submitting ? 'Registrando...' : 'Activar Emergencia' }}
                  </button>
                </div>
              </form>
            </mat-step>

          </mat-stepper>

          <!-- Resultado -->
          <div class="success-panel" *ngIf="createdTicket">
            <mat-icon class="success-icon">check_circle</mat-icon>
            <h2>Emergencia Registrada</h2>
            <p>Ticket: <strong>{{ createdTicket.ticketNumber }}</strong></p>
            <p>Clínica: <strong>{{ createdTicket.clinicName }}</strong></p>
            <mat-chip class="urgent-chip" style="font-size:1rem">URGENTE - PRIORIDAD MÁXIMA</mat-chip>
            <button mat-raised-button color="primary" (click)="reset()" style="margin-top:16px">
              <mat-icon>add</mat-icon> Nueva Emergencia
            </button>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .emergency-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .header-title { display: flex; align-items: center; gap: 8px; }
    .header-title h1 { font-size: 1.6rem; font-weight: 500; color: #c62828; margin: 0; }
    .emergency-icon { font-size: 32px; width: 32px; height: 32px; color: #c62828; }
    .urgent-chip { background: #c62828 !important; color: white !important; font-weight: 700; }
    .rn-note { display: flex; align-items: center; gap: 8px; background: #e3f2fd; color: #1565c0; padding: 12px 16px; border-radius: 8px; margin-bottom: 16px; }
    .rn-warn { background: #ffebee !important; color: #c62828 !important; }
    .patient-found { display: flex; align-items: center; gap: 12px; background: #e8f5e9; color: #2e7d32; padding: 12px 16px; border-radius: 8px; margin: 16px 0; }
    .patient-ok { display: flex; align-items: center; gap: 8px; background: #e8f5e9; color: #2e7d32; padding: 12px 16px; border-radius: 8px; margin-bottom: 16px; }
    .insurance-info { font-size: 0.85rem; margin-top: 4px; }
    .hint-text { font-size: 0.85rem; color: #757575; margin-top: 8px; }
    .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px; margin-bottom: 16px; }
    .full-width { width: 100%; margin-bottom: 8px; }
    .vitals-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 16px; }
    .step-actions { display: flex; gap: 12px; margin-top: 16px; }
    .success-panel { text-align: center; padding: 40px; }
    .success-icon { font-size: 64px; width: 64px; height: 64px; color: #2e7d32; margin-bottom: 16px; }
    .success-panel h2 { color: #2e7d32; margin-bottom: 16px; }
  `]
})
export class EmergencyComponent implements OnInit {
  dpiForm!: FormGroup;
  patientForm!: FormGroup;
  vitalsForm!: FormGroup;
  foundPatient: Patient | null = null;
  createdTicket: Ticket | null = null;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private emergencyService: EmergencyService,
    private vitalSignsService: VitalSignsService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.dpiForm = this.fb.group({ dpi: [''] });
    this.patientForm = this.fb.group({
      firstName: ['Paciente', Validators.required],
      lastName: ['No Identificado', Validators.required],
      dpiNew: ['0000000000000'],
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
  }

  searchDpi(): void {
    const dpi = this.dpiForm.value.dpi;
    this.patientService.getByDpi(dpi).subscribe({
      next: res => {
        if (res.success) { this.foundPatient = res.data; }
      },
      error: () => { this.foundPatient = null; }
    });
  }

  registerEmergency(): void {
    this.submitting = true;
    const payload: any = { motive: this.patientForm.value.motive };

    if (this.foundPatient) {
      payload.dpi = this.foundPatient.dpi;
    } else {
      payload.newPatient = {
        dpi: this.patientForm.value.dpiNew || '0000000000000',
        firstName: this.patientForm.value.firstName,
        lastName: this.patientForm.value.lastName
      };
    }

    this.emergencyService.register(payload).subscribe({
      next: res => {
        if (res.success) {
          this.createdTicket = res.data;
          // Register vital signs if provided
          const vitals = this.vitalsForm.value;
          if (vitals.bloodPressure || vitals.heartRate) {
            this.vitalSignsService.register({
              ...vitals,
              ticketId: res.data.id
            }).subscribe();
          }
          this.notification.success('Emergencia registrada con prioridad máxima (RN-E02)');
        }
        this.submitting = false;
      },
      error: () => {
        this.notification.error('Error al registrar emergencia');
        this.submitting = false;
      }
    });
  }

  reset(): void {
    this.foundPatient = null;
    this.createdTicket = null;
    this.dpiForm.reset();
    this.patientForm.reset({ firstName: 'Paciente', lastName: 'No Identificado', dpiNew: '0000000000000' });
    this.vitalsForm.reset();
  }
}
