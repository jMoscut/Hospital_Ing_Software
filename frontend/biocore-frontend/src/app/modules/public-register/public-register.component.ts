import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
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

function birthDateValidator(ctrl: AbstractControl): ValidationErrors | null {
  const v: string = ctrl.value;
  if (!v) return null;
  const parts = v.split('-');
  if (parts.length !== 3) return { invalidDate: true };
  const yearStr = parts[0];
  const year = parseInt(yearStr, 10);
  if (isNaN(year) || yearStr.length !== 4) return { yearInvalid: true };
  if (year < 1900) return { yearTooEarly: true };
  const d = new Date(v);
  if (isNaN(d.getTime())) return { invalidDate: true };
  const todayStr = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Guatemala' }).format(new Date());
  if (v > todayStr) return { futureDate: true };
  return null;
}

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
                      <input matInput type="date" formControlName="birthDate" min="1900-01-01" [max]="today">
                      <mat-error>Fecha inválida (año entre 1900 y año actual)</mat-error>
                    </mat-form-field>
                    <mat-form-field appearance="outline">
                      <mat-label>Teléfono</mat-label>
                      <mat-icon matPrefix>phone</mat-icon>
                      <input matInput formControlName="phone" type="tel" maxlength="8"
                             (keypress)="onlyDigits($event)">
                      <mat-hint>8 dígitos, no inicia en 0</mat-hint>
                      <mat-error>Teléfono inválido (8 dígitos, no inicia en 0)</mat-error>
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
                      <input matInput formControlName="dpi" maxlength="13" placeholder="0000000000000"
                             (keypress)="onlyDigits($event)">
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
                      <mat-hint>Mín. 4 caracteres, solo letras y números</mat-hint>
                      <mat-error>Mín. 4 caracteres, solo letras y números, sin espacios</mat-error>
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
    .pub-header {
      background: linear-gradient(90deg, #243C2C, #243C2C) !important;
      color: white; position: sticky; top: 0; z-index: 100;
      box-shadow: 0 2px 12px rgba(0,0,0,0.2) !important;
    }
    .pub-header mat-icon { margin-right: 8px; color: #7A9445; }
    .brand { font-size: 1.2rem; font-weight: 700; letter-spacing: -0.2px; }
    .spacer { flex: 1; }

    .register-page {
      min-height: calc(100vh - 64px);
      background: linear-gradient(150deg, #243C2C 0%, #243C2C 45%, #3a5c3c 80%, #4a6c4e 100%);
      display: flex; align-items: flex-start; justify-content: center; padding: 56px 16px;
      position: relative; overflow: hidden;
    }
    .register-page::before {
      content: ''; position: absolute; top: -150px; right: -150px;
      width: 500px; height: 500px; border-radius: 50%;
      background: radial-gradient(circle, rgba(89,120,159,0.12) 0%, transparent 65%);
      pointer-events: none;
    }
    .register-container { width: 100%; max-width: 720px; position: relative; z-index: 1; }
    .register-header { text-align: center; color: white; margin-bottom: 36px; }
    .header-icon {
      font-size: 64px; width: 64px; height: 64px; color: #7A9445; margin-bottom: 16px;
      filter: drop-shadow(0 0 20px rgba(89,120,159,0.5));
    }
    .register-header h1 {
      font-size: 1.9rem; font-weight: 800; margin: 0 0 10px; letter-spacing: -0.5px;
      background: linear-gradient(135deg, #ffffff 40%, #A9B6C4 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .register-header p { color: rgba(255,255,255,0.7); font-size: 1rem; }

    h3 { font-size: 1.02rem; font-weight: 700; color: #243C2C; margin-bottom: 12px; }
    .hint-text { color: #6b8c84; font-size: 0.85rem; margin-bottom: 16px; }
    .full-width { width: 100%; }
    .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px; }
    .step-actions { display: flex; gap: 12px; margin-top: 16px; }

    .confirm-data { background: #FAFAF5; padding: 20px; border-radius: 12px; margin-bottom: 16px; border: 1px solid #C5CDD8; }
    .confirm-row { display: flex; gap: 16px; padding: 9px 0; border-bottom: 1px solid #D0D9E3; }
    .confirm-row:last-child { border-bottom: none; }
    .label { font-weight: 700; min-width: 110px; color: #4a6560; font-size: 0.88rem; }

    .success-card { text-align: center; padding: 48px 32px; border-radius: 16px !important; }
    .success-icon { font-size: 80px; width: 80px; height: 80px; color: #7A9445; margin-bottom: 16px; filter: drop-shadow(0 4px 12px rgba(122,148,69,0.3)); }
    .success-card h2 { font-size: 1.8rem; color: #1a4a1e; margin-bottom: 8px; font-weight: 800; }
    .patient-code {
      font-size: 2.5rem; font-weight: 800; color: #59789F; letter-spacing: 4px;
      background: #D8E4C8; padding: 16px 32px; border-radius: 14px;
      margin: 16px auto; display: inline-block; border: 1px solid #A9B6C4;
    }
    .credentials-box {
      background: #FAFAF5; border: 1px solid #C5CDD8; border-radius: 12px;
      padding: 16px 18px; margin: 16px 0; text-align: left;
    }
    .credentials-box code { background: #D8E4C8; color: #59789F; padding: 2px 8px; border-radius: 6px; font-size: 1rem; font-weight: 700; border: 1px solid #A9B6C4; }
    .success-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 24px; }
    .error-msg { display: flex; align-items: center; gap: 8px; color: #c62828; margin-top: 16px; background: #ffebee; padding: 8px 12px; border-radius: 8px; border: 1px solid #ffcdd2; }
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
  today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Guatemala' }).format(new Date());

  onlyDigits(e: KeyboardEvent): boolean {
    return /[0-9]/.test(e.key);
  }

  constructor(private fb: FormBuilder, private http: HttpClient, private insuranceService: InsuranceService) {}

  ngOnInit(): void {
    this.insuranceService.getAllPublic().subscribe({
      next: res => { if (res.success) this.insurances = res.data; },
      error: () => {}
    });
    this.dataForm = this.fb.group({
      firstName:       ['', Validators.required],
      lastName:        ['', Validators.required],
      birthDate:       ['', [birthDateValidator]],
      phone:           ['', [Validators.pattern(/^[1-9]\d{0,7}$/)]],
      email:           ['', [Validators.required, Validators.email]],
      address:         [''],
      dpi:             ['', [Validators.required, Validators.pattern(/^\d{13}$/)]],
      insuranceNumber: [''],
      insuranceId:     [null]
    });
    this.credentialsForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^[a-zA-Z0-9]+$/)]],
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
