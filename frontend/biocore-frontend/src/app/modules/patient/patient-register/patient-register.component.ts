import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';
import { PatientService } from '../../../shared/services/patient.service';
import { ClinicService, TicketService } from '../../../shared/services/ticket.service';
import { InsuranceService } from '../../../shared/services/payment.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { Clinic } from '../../../core/models/ticket.model';
import { Patient } from '../../../core/models/patient.model';

@Component({
  selector: 'app-patient-register',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterLink,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatIconModule, MatSelectModule,
    MatProgressSpinnerModule, MatStepperModule, MatDividerModule
  ],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Registro de Paciente</h1>
        <button mat-button routerLink="/patients">
          <mat-icon>arrow_back</mat-icon> Volver
        </button>
      </div>

      <mat-card>
        <mat-card-content>
          <mat-stepper [linear]="true" #stepper>

            <!-- Paso 1: Buscar por DPI -->
            <mat-step [stepControl]="dpiForm" label="Identificación">
              <form [formGroup]="dpiForm">
                <h3>Paso 1: Identificación por DPI</h3>
                <p class="hint-text">El DPI debe contener exactamente 13 dígitos numéricos.</p>
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>DPI del Paciente</mat-label>
                  <mat-icon matPrefix>badge</mat-icon>
                  <input matInput formControlName="dpi" placeholder="0000000000000" maxlength="13">
                  <mat-error *ngIf="dpiForm.get('dpi')?.hasError('pattern')">
                    El DPI debe tener exactamente 13 dígitos numéricos
                  </mat-error>
                </mat-form-field>
                <button mat-raised-button color="primary" (click)="searchByDpi()" [disabled]="dpiForm.invalid || searching">
                  <mat-spinner *ngIf="searching" diameter="20"></mat-spinner>
                  <mat-icon *ngIf="!searching">search</mat-icon>
                  {{ searching ? 'Buscando...' : 'Buscar Paciente' }}
                </button>

                <!-- Paciente encontrado -->
                <div class="patient-found" *ngIf="existingPatient">
                  <mat-icon>check_circle</mat-icon>
                  <div>
                    <strong>Paciente encontrado:</strong> {{ existingPatient.firstName }} {{ existingPatient.lastName }}
                    <br><small>Código: {{ existingPatient.patientCode }}</small>
                  </div>
                  <button mat-raised-button color="accent" matStepperNext>Continuar →</button>
                </div>
              </form>
            </mat-step>

            <!-- Paso 2: Datos del Paciente (si es nuevo) -->
            <mat-step [stepControl]="patientForm" label="Datos del Paciente">
              <form [formGroup]="patientForm">
                <h3>{{ existingPatient ? 'Paciente Existente' : 'Nuevo Paciente (FA01)' }}</h3>

                <div class="form-grid">
                  <mat-form-field appearance="outline">
                    <mat-label>Nombres</mat-label>
                    <input matInput formControlName="firstName" [readonly]="!!existingPatient">
                    <mat-error>Requerido</mat-error>
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                    <mat-label>Apellidos</mat-label>
                    <input matInput formControlName="lastName" [readonly]="!!existingPatient">
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                    <mat-label>Teléfono</mat-label>
                    <input matInput formControlName="phone" [readonly]="!!existingPatient">
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                    <mat-label>Correo Electrónico</mat-label>
                    <input matInput formControlName="email" type="email" [readonly]="!!existingPatient">
                  </mat-form-field>
                  <mat-form-field appearance="outline" *ngIf="!existingPatient">
                    <mat-label>Dirección</mat-label>
                    <input matInput formControlName="address">
                  </mat-form-field>
                  <mat-form-field appearance="outline" *ngIf="!existingPatient">
                    <mat-label>Contacto de Emergencia</mat-label>
                    <input matInput formControlName="emergencyContact">
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                    <mat-label>Seguro Médico (Opcional)</mat-label>
                    <mat-select formControlName="insuranceId">
                      <mat-option [value]="null">Sin seguro</mat-option>
                      <mat-option *ngFor="let ins of insurances" [value]="ins.id">
                        {{ ins.name }} ({{ ins.discountPercentage }}% descuento)
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

            <!-- Paso 3: Asignación de Clínica + Ticket -->
            <mat-step [stepControl]="ticketForm" label="Asignar Clínica">
              <form [formGroup]="ticketForm">
                <h3>Selección de Clínica (Obligatorio)</h3>
                <div class="form-grid">
                  <mat-form-field appearance="outline" class="full-width">
                    <mat-label>Clínica de Destino *</mat-label>
                    <mat-icon matPrefix>local_hospital</mat-icon>
                    <mat-select formControlName="clinicId">
                      <mat-option *ngFor="let c of clinics" [value]="c.id">
                        {{ c.name }}
                      </mat-option>
                    </mat-select>
                    <mat-error>Debe seleccionar una clínica</mat-error>
                  </mat-form-field>
                  <mat-form-field appearance="outline" class="full-width">
                    <mat-label>Notas adicionales</mat-label>
                    <textarea matInput formControlName="notes" rows="3"></textarea>
                  </mat-form-field>
                </div>

                <div class="step-actions">
                  <button mat-button matStepperPrevious>← Anterior</button>
                  <button mat-raised-button color="primary"
                          (click)="submit()" [disabled]="ticketForm.invalid || submitting">
                    <mat-spinner *ngIf="submitting" diameter="20"></mat-spinner>
                    <mat-icon *ngIf="!submitting">confirmation_number</mat-icon>
                    {{ submitting ? 'Generando...' : 'Generar Ticket' }}
                  </button>
                </div>
              </form>
            </mat-step>

          </mat-stepper>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    h3 { font-size: 1.1rem; font-weight: 500; color: #1565c0; margin-bottom: 16px; }
    .hint-text { color: #757575; font-size: 0.85rem; margin-bottom: 16px; }
    .full-width { width: 100%; }
    .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px; margin-bottom: 16px; }
    .step-actions { display: flex; gap: 12px; margin-top: 16px; }
    .patient-found {
      display: flex; align-items: center; gap: 12px; margin-top: 16px;
      background: #e8f5e9; padding: 16px; border-radius: 8px; color: #2e7d32;
    }
    .patient-found mat-icon { font-size: 32px; width: 32px; height: 32px; }
  `]
})
export class PatientRegisterComponent implements OnInit {
  dpiForm!: FormGroup;
  patientForm!: FormGroup;
  ticketForm!: FormGroup;
  clinics: Clinic[] = [];
  insurances: any[] = [];
  existingPatient: Patient | null = null;
  searching = false;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private clinicService: ClinicService,
    private ticketService: TicketService,
    private insuranceService: InsuranceService,
    private notification: NotificationService,
    private router: Router
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
      notes: ['']
    });

    this.clinicService.getAll().subscribe(res => {
      if (res.success) this.clinics = res.data;
    });
    this.insuranceService.getAll().subscribe(res => {
      if (res.success) this.insurances = res.data;
    });
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

  submit(): void {
    this.submitting = true;
    const createTicket = (patientId: number) => {
      this.ticketService.create({
        patientId,
        clinicId: this.ticketForm.value.clinicId,
        notes: this.ticketForm.value.notes,
        type: 'CONSULTA'
      }).subscribe({
        next: res => {
          if (res.success) {
            this.notification.success(`Ticket ${res.data.ticketNumber} generado para ${res.data.patientName}`);
            this.router.navigate(['/patients']);
          }
          this.submitting = false;
        },
        error: err => {
          this.notification.error('Error al generar ticket');
          this.submitting = false;
        }
      });
    };

    if (this.existingPatient) {
      createTicket(this.existingPatient.id);
    } else {
      const data = { ...this.dpiForm.value, ...this.patientForm.value };
      this.patientService.create(data).subscribe({
        next: res => { if (res.success) createTicket(res.data.id); },
        error: () => { this.notification.error('Error al registrar paciente'); this.submitting = false; }
      });
    }
  }
}
