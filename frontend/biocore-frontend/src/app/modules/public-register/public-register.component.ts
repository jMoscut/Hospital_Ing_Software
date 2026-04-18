import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { environment } from '../../../environments/environment';
import { InsuranceService } from '../../shared/services/payment.service';

@Component({
  selector: 'app-public-register',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterLink,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatIconModule, MatStepperModule,
    MatProgressSpinnerModule, MatToolbarModule, MatSelectModule
  ],
  template: `
    <mat-toolbar class="pub-header">
      <mat-icon>local_hospital</mat-icon>
      <span class="brand">BioCore Medical</span>
      <span class="spacer"></span>
      <button mat-button routerLink="/portal">
        <mat-icon>home</mat-icon> Inicio
      </button>
      <button mat-button routerLink="/login">
        <mat-icon>login</mat-icon> Ingresar
      </button>
    </mat-toolbar>

    <div class="register-page">
      <div class="register-container">
        <div class="register-header">
          <mat-icon class="header-icon">how_to_reg</mat-icon>
          <h1>Registro de Paciente en Línea</h1>
          <p>Regístrese desde casa y agilice su atención cuando llegue al hospital.</p>
        </div>

        <!-- Éxito -->
        <mat-card class="success-card" *ngIf="registered">
          <mat-icon class="success-icon">check_circle</mat-icon>
          <h2>¡Registro Exitoso!</h2>
          <p>Su código de paciente es:</p>
          <div class="patient-code">{{ patientCode }}</div>
          <div class="credentials-box">
            <p><strong>Sus credenciales de acceso al portal:</strong></p>
            <p>Usuario: <code>{{ registeredUsername }}</code></p>
            <p style="font-size:0.85rem;color:#757575">Al llegar al hospital, presente su código en recepción para recibir su turno.</p>
          </div>
          <div class="success-actions">
            <button mat-raised-button color="primary" routerLink="/login">
              <mat-icon>login</mat-icon> Iniciar Sesión
            </button>
            <button mat-stroked-button routerLink="/portal">
              <mat-icon>home</mat-icon> Volver al inicio
            </button>
          </div>
        </mat-card>

        <!-- Stepper de registro -->
        <mat-card *ngIf="!registered">
          <mat-card-content>
            <mat-stepper [linear]="true" #stepper>

              <!-- Paso 1: Datos Personales -->
              <mat-step [stepControl]="dataForm" label="Datos Personales">
                <form [formGroup]="dataForm">
                  <h3>Paso 1: Datos Personales</h3>
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
                      <mat-icon matPrefix>phone</mat-icon>
                      <input matInput formControlName="phone">
                    </mat-form-field>
                    <mat-form-field appearance="outline">
                      <mat-label>Correo Electrónico *</mat-label>
                      <mat-icon matPrefix>email</mat-icon>
                      <input matInput formControlName="email" type="email">
                      <mat-hint>Recibirá notificaciones de su cita aquí</mat-hint>
                      <mat-error>Correo inválido o requerido</mat-error>
                    </mat-form-field>
                    <mat-form-field appearance="outline" class="full-width">
                      <mat-label>Dirección</mat-label>
                      <mat-icon matPrefix>home</mat-icon>
                      <input matInput formControlName="address">
                    </mat-form-field>
                    <mat-form-field appearance="outline">
                      <mat-label>DPI (13 dígitos) *</mat-label>
                      <mat-icon matPrefix>badge</mat-icon>
                      <input matInput formControlName="dpi" maxlength="13" placeholder="0000000000000">
                      <mat-error>El DPI debe tener exactamente 13 dígitos</mat-error>
                    </mat-form-field>
                    <mat-form-field appearance="outline">
                      <mat-label>Número de Seguro (opcional)</mat-label>
                      <mat-icon matPrefix>health_and_safety</mat-icon>
                      <input matInput formControlName="insuranceNumber">
                    </mat-form-field>
                    <mat-form-field appearance="outline">
                      <mat-label>Aseguradora (opcional)</mat-label>
                      <mat-icon matPrefix>business</mat-icon>
                      <mat-select formControlName="insuranceId">
                        <mat-option [value]="null">Sin aseguradora</mat-option>
                        <mat-option *ngFor="let ins of insurances" [value]="ins.id">
                          {{ ins.name }}
                        </mat-option>
                      </mat-select>
                    </mat-form-field>
                  </div>
                  <div class="step-actions">
                    <button mat-raised-button color="primary" matStepperNext
                            [disabled]="dataForm.invalid">Continuar →</button>
                  </div>
                </form>
              </mat-step>

              <!-- Paso 2: Credenciales -->
              <mat-step [stepControl]="credentialsForm" label="Credenciales">
                <form [formGroup]="credentialsForm">
                  <h3>Paso 2: Crear Credenciales de Acceso</h3>
                  <p class="hint-text">Con estas credenciales podrá ingresar al portal para ver sus citas, recetas y resultados de laboratorio, y también para agendar citas en línea.</p>
                  <div class="form-grid">
                    <mat-form-field appearance="outline">
                      <mat-label>Nombre de Usuario *</mat-label>
                      <mat-icon matPrefix>account_circle</mat-icon>
                      <input matInput formControlName="username" placeholder="ej: juan.garcia">
                      <mat-hint>Sin espacios, solo letras, números y puntos</mat-hint>
                      <mat-error>Mínimo 4 caracteres, sin espacios</mat-error>
                    </mat-form-field>
                    <mat-form-field appearance="outline">
                      <mat-label>Contraseña *</mat-label>
                      <mat-icon matPrefix>lock</mat-icon>
                      <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password">
                      <button mat-icon-button matSuffix type="button" (click)="hidePassword = !hidePassword">
                        <mat-icon>{{ hidePassword ? 'visibility' : 'visibility_off' }}</mat-icon>
                      </button>
                      <mat-hint>Mín. 8 caracteres, 1 mayúscula y 1 número</mat-hint>
                      <mat-error>Mín. 8 caracteres, al menos 1 mayúscula y 1 número</mat-error>
                    </mat-form-field>
                  </div>
                  <div class="step-actions">
                    <button mat-button matStepperPrevious>← Anterior</button>
                    <button mat-raised-button color="primary" matStepperNext
                            [disabled]="credentialsForm.invalid">Continuar →</button>
                  </div>
                </form>
              </mat-step>

              <!-- Paso 3: Confirmar -->
              <mat-step label="Confirmar">
                <h3>Paso 3: Confirme su registro</h3>
                <div class="confirm-data">
                  <div class="confirm-row">
                    <span class="label">Nombre:</span>
                    <span>{{ dataForm.value.firstName }} {{ dataForm.value.lastName }}</span>
                  </div>
                  <div class="confirm-row"><span class="label">DPI:</span><span>{{ dataForm.value.dpi }}</span></div>
                  <div class="confirm-row"><span class="label">Correo:</span><span>{{ dataForm.value.email }}</span></div>
                  <div class="confirm-row"><span class="label">Teléfono:</span><span>{{ dataForm.value.phone || '—' }}</span></div>
                  <div class="confirm-row" *ngIf="dataForm.value.birthDate">
                    <span class="label">Nacimiento:</span><span>{{ dataForm.value.birthDate }}</span>
                  </div>
                  <div class="confirm-row" *ngIf="dataForm.value.insuranceId">
                    <span class="label">Aseguradora:</span>
                    <span>{{ getInsuranceName(dataForm.value.insuranceId) }}
                      <span *ngIf="dataForm.value.insuranceNumber"> — {{ dataForm.value.insuranceNumber }}</span>
                    </span>
                  </div>
                  <div class="confirm-row"><span class="label">Usuario:</span><span>{{ credentialsForm.value.username }}</span></div>
                </div>

                <div class="step-actions">
                  <button mat-button matStepperPrevious>← Anterior</button>
                  <button mat-raised-button color="primary"
                          [disabled]="submitting"
                          (click)="submit()">
                    <mat-spinner *ngIf="submitting" diameter="20"></mat-spinner>
                    <mat-icon *ngIf="!submitting">how_to_reg</mat-icon>
                    {{ submitting ? 'Registrando...' : 'Completar Registro' }}
                  </button>
                </div>

                <div class="error-msg" *ngIf="errorMsg">
                  <mat-icon>error</mat-icon> {{ errorMsg }}
                </div>
              </mat-step>
            </mat-stepper>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .pub-header { background: #193A31 !important; color: white; position: sticky; top: 0; z-index: 100; }
    .pub-header mat-icon { margin-right: 8px; color: #3EB9A8; }
    .brand { font-size: 1.2rem; font-weight: 700; }
    .spacer { flex: 1; }

    .register-page {
      min-height: calc(100vh - 64px);
      background: linear-gradient(135deg, #1E201F 0%, #193A31 50%, #1D6C61 100%);
      display: flex; align-items: flex-start; justify-content: center; padding: 48px 16px;
    }
    .register-container { width: 100%; max-width: 720px; }
    .register-header { text-align: center; color: white; margin-bottom: 32px; }
    .header-icon { font-size: 64px; width: 64px; height: 64px; color: #3EB9A8; margin-bottom: 12px; }
    .register-header h1 { font-size: 1.8rem; font-weight: 700; margin: 0 0 8px; }
    .register-header p { color: rgba(255,255,255,0.75); }

    h3 { font-size: 1.05rem; font-weight: 600; color: #1D6C61; margin-bottom: 12px; }
    .hint-text { color: #757575; font-size: 0.85rem; margin-bottom: 16px; }
    .full-width { width: 100%; }
    .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px; }
    .step-actions { display: flex; gap: 12px; margin-top: 16px; }

    .confirm-data { background: #f8f9ff; padding: 20px; border-radius: 8px; margin-bottom: 16px; }
    .confirm-row { display: flex; gap: 16px; padding: 8px 0; border-bottom: 1px solid #e0e0e0; }
    .confirm-row:last-child { border-bottom: none; }
    .label { font-weight: 600; min-width: 110px; color: #555; }

    .success-card { text-align: center; padding: 48px 32px; }
    .success-icon { font-size: 80px; width: 80px; height: 80px; color: #2e7d32; margin-bottom: 16px; }
    .success-card h2 { font-size: 1.8rem; color: #2e7d32; margin-bottom: 8px; }
    .patient-code {
      font-size: 2.5rem; font-weight: 700; color: #1D6C61; letter-spacing: 4px;
      background: #d0f4ef; padding: 16px 32px; border-radius: 12px;
      margin: 16px auto; display: inline-block;
    }
    .credentials-box {
      background: #f8f9ff; border: 1px solid #d0d4e0; border-radius: 8px;
      padding: 16px; margin: 16px 0; text-align: left;
    }
    .credentials-box code { background: #e8f5f3; color: #1D6C61; padding: 2px 8px; border-radius: 4px; font-size: 1rem; }
    .success-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 24px; }
    .error-msg { display: flex; align-items: center; gap: 8px; color: #c62828; margin-top: 16px; }
  `]
})
export class PublicRegisterComponent implements OnInit {
  dataForm!: FormGroup;
  credentialsForm!: FormGroup;

  submitting = false;
  registered = false;
  patientCode = '';
  registeredUsername = '';
  errorMsg = '';
  hidePassword = true;
  insurances: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient, private insuranceService: InsuranceService) {}

  ngOnInit(): void {
    this.insuranceService.getAllPublic().subscribe({
      next: res => { if (res.success) this.insurances = res.data; },
      error: () => {}
    });
    this.dataForm = this.fb.group({
      firstName:       ['', Validators.required],
      lastName:        ['', Validators.required],
      birthDate:       [''],
      phone:           [''],
      email:           ['', [Validators.required, Validators.email]],
      address:         [''],
      dpi:             ['', [Validators.required, Validators.pattern(/^\d{13}$/)]],
      insuranceNumber: [''],
      insuranceId:     [null]
    });
    this.credentialsForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^\S+$/)]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9]).{8,}$/)
      ]]
    });
  }

  getInsuranceName(id: number): string {
    return this.insurances.find(i => i.id === id)?.name ?? '—';
  }

  submit(): void {
    this.submitting = true;
    this.errorMsg = '';
    const payload = {
      ...this.dataForm.value,
      username: this.credentialsForm.value.username,
      password: this.credentialsForm.value.password
    };
    this.http.post<any>(`${environment.apiUrl}/public/patients/register`, payload).subscribe({
      next: res => {
        if (res.success) {
          this.patientCode = res.data.patientCode;
          this.registeredUsername = this.credentialsForm.value.username;
          this.registered = true;
        } else {
          this.errorMsg = res.message || 'Error al registrar.';
        }
        this.submitting = false;
      },
      error: err => {
        this.errorMsg = err.error?.message || 'Error al registrar. Intente de nuevo.';
        this.submitting = false;
      }
    });
  }
}
