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
import { InsuranceService } from '../../../shared/services/payment.service';
import { NotificationService } from '../../../shared/services/notification.service';
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
        <h1>Registro / Edición de Paciente</h1>
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
                <h3>Identificación por DPI</h3>
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

                <div class="patient-found" *ngIf="existingPatient">
                  <mat-icon>check_circle</mat-icon>
                  <div>
                    <strong>Paciente encontrado:</strong> {{ existingPatient.firstName }} {{ existingPatient.lastName }}
                    <br><small>Código: {{ existingPatient.patientCode }}</small>
                  </div>
                  <button mat-raised-button color="accent" matStepperNext>Editar datos →</button>
                </div>

                <div class="patient-new" *ngIf="dpiSearched && !existingPatient">
                  <mat-icon>person_add</mat-icon>
                  <div>
                    <strong>Paciente no encontrado.</strong> Complete los datos para registrarlo.
                  </div>
                  <button mat-raised-button color="primary" matStepperNext>Registrar →</button>
                </div>
              </form>
            </mat-step>

            <!-- Paso 2: Datos del Paciente -->
            <mat-step [stepControl]="patientForm" label="Datos del Paciente">
              <form [formGroup]="patientForm">
                <h3>{{ existingPatient ? 'Editar datos del paciente' : 'Registrar nuevo paciente' }}</h3>

                <div class="form-grid">
                  <mat-form-field appearance="outline">
                    <mat-label>Nombres *</mat-label>
                    <input matInput formControlName="firstName">
                    <mat-error>Requerido</mat-error>
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                    <mat-label>Apellidos *</mat-label>
                    <input matInput formControlName="lastName">
                    <mat-error>Requerido</mat-error>
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                    <mat-label>Fecha de Nacimiento</mat-label>
                    <mat-icon matPrefix>cake</mat-icon>
                    <input matInput type="date" formControlName="birthDate">
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                    <mat-label>Teléfono</mat-label>
                    <input matInput formControlName="phone">
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                    <mat-label>Correo Electrónico</mat-label>
                    <input matInput formControlName="email" type="email">
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                    <mat-label>Dirección</mat-label>
                    <input matInput formControlName="address">
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                    <mat-label>Contacto de Emergencia</mat-label>
                    <input matInput formControlName="emergencyContact">
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                    <mat-label>Teléfono de Emergencia</mat-label>
                    <input matInput formControlName="emergencyPhone">
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                    <mat-label>Aseguradora (Opcional)</mat-label>
                    <mat-select formControlName="insuranceId">
                      <mat-option [value]="null">Sin seguro</mat-option>
                      <mat-option *ngFor="let ins of insurances" [value]="ins.id">
                        {{ ins.name }} ({{ ins.discountPercentage }}% descuento)
                      </mat-option>
                    </mat-select>
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                    <mat-label>No. de Póliza / Carné (Opcional)</mat-label>
                    <mat-icon matPrefix>confirmation_number</mat-icon>
                    <input matInput formControlName="insuranceNumber">
                  </mat-form-field>
                </div>

                <div class="step-actions">
                  <button mat-button matStepperPrevious>← Anterior</button>
                  <button mat-raised-button color="primary"
                          (click)="submit()" [disabled]="patientForm.invalid || submitting">
                    <mat-spinner *ngIf="submitting" diameter="20"></mat-spinner>
                    <mat-icon *ngIf="!submitting">save</mat-icon>
                    {{ submitting ? 'Guardando...' : (existingPatient ? 'Guardar cambios' : 'Registrar paciente') }}
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
    h3 { font-size: 1.1rem; font-weight: 500; color: #1D6C61; margin-bottom: 16px; }
    .hint-text { color: #757575; font-size: 0.85rem; margin-bottom: 16px; }
    .full-width { width: 100%; }
    .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px; margin-bottom: 16px; }
    .step-actions { display: flex; gap: 12px; margin-top: 16px; }
    .patient-found {
      display: flex; align-items: center; gap: 12px; margin-top: 16px;
      background: #e8f5e9; padding: 16px; border-radius: 8px; color: #2e7d32;
    }
    .patient-found mat-icon { font-size: 32px; width: 32px; height: 32px; }
    .patient-new {
      display: flex; align-items: center; gap: 12px; margin-top: 16px;
      background: #e3f2fd; padding: 16px; border-radius: 8px; color: #1565c0;
    }
    .patient-new mat-icon { font-size: 32px; width: 32px; height: 32px; }
  `]
})
export class PatientRegisterComponent implements OnInit {
  dpiForm!: FormGroup;
  patientForm!: FormGroup;
  insurances: any[] = [];
  existingPatient: Patient | null = null;
  dpiSearched = false;
  searching = false;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private insuranceService: InsuranceService,
    private notification: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dpiForm = this.fb.group({
      dpi: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]]
    });
    this.patientForm = this.fb.group({
      firstName:        ['', Validators.required],
      lastName:         ['', Validators.required],
      birthDate:        [''],
      phone:            [''],
      email:            ['', Validators.email],
      address:          [''],
      emergencyContact: [''],
      emergencyPhone:   [''],
      insuranceId:      [null],
      insuranceNumber:  ['']
    });

    this.insuranceService.getAll().subscribe(res => {
      if (res.success) this.insurances = res.data;
    });
  }

  searchByDpi(): void {
    const dpi = this.dpiForm.value.dpi;
    this.searching = true;
    this.dpiSearched = false;
    this.patientService.getByDpi(dpi).subscribe({
      next: res => {
        if (res.success && res.data) {
          this.existingPatient = res.data;
          this.patientForm.patchValue(res.data);
        } else {
          this.existingPatient = null;
          this.patientForm.reset();
        }
        this.dpiSearched = true;
        this.searching = false;
      },
      error: () => {
        this.existingPatient = null;
        this.patientForm.reset();
        this.dpiSearched = true;
        this.searching = false;
      }
    });
  }

  submit(): void {
    if (this.patientForm.invalid) return;
    this.submitting = true;
    const data = { ...this.patientForm.value, dpi: this.dpiForm.value.dpi };

    if (this.existingPatient) {
      this.patientService.update(this.existingPatient.id, data).subscribe({
        next: res => {
          if (res.success) {
            this.notification.success('Datos del paciente actualizados correctamente');
            this.router.navigate(['/patients']);
          } else {
            this.notification.error(res.message || 'Error al actualizar');
          }
          this.submitting = false;
        },
        error: err => {
          this.notification.error(err.error?.message || 'Error al actualizar paciente');
          this.submitting = false;
        }
      });
    } else {
      this.patientService.create(data).subscribe({
        next: res => {
          if (res.success) {
            this.notification.success(`Paciente ${res.data.patientCode} registrado exitosamente`);
            this.router.navigate(['/patients']);
          } else {
            this.notification.error(res.message || 'Error al registrar');
          }
          this.submitting = false;
        },
        error: err => {
          this.notification.error(err.error?.message || 'Error al registrar paciente');
          this.submitting = false;
        }
      });
    }
  }
}
