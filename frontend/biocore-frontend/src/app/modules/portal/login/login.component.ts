import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterLink,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatDialogModule
  ],
  template: `
    <div class="login-page">
      <div class="login-left">
        <div class="login-brand">
          <mat-icon class="brand-icon">local_hospital</mat-icon>
          <h1>BioCore Medical</h1>
          <p>Sistema Integral de Gestión Hospitalaria</p>
        </div>
        <div class="login-features">
          <div class="feature"><mat-icon>security</mat-icon><span>Acceso seguro y protegido</span></div>
          <div class="feature"><mat-icon>speed</mat-icon><span>Atención rápida y eficiente</span></div>
          <div class="feature"><mat-icon>medical_services</mat-icon><span>Gestión completa de pacientes</span></div>
        </div>
        <div class="patient-link">
          <p>¿Es paciente nuevo?</p>
          <a mat-stroked-button routerLink="/register" class="register-btn">
            <mat-icon>person_add</mat-icon> Registrarse en línea
          </a>
        </div>
      </div>

      <div class="login-right">

        <!-- Formulario de login -->
        <mat-card class="login-card" *ngIf="!showChangePassword">
          <mat-card-header>
            <mat-icon mat-card-avatar>lock</mat-icon>
            <mat-card-title>Iniciar Sesión</mat-card-title>
            <mat-card-subtitle>Ingresa tus credenciales de acceso</mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <div class="error-alert" *ngIf="errorMessage">
              <mat-icon>error_outline</mat-icon>
              {{ errorMessage }}
            </div>

            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Usuario</mat-label>
                <mat-icon matPrefix>person</mat-icon>
                <input matInput formControlName="username" placeholder="Nombre de usuario" autocomplete="username">
                <mat-error>Usuario requerido</mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Contraseña</mat-label>
                <mat-icon matPrefix>lock</mat-icon>
                <input matInput [type]="hidePassword ? 'password' : 'text'"
                       formControlName="password" autocomplete="current-password">
                <button mat-icon-button matSuffix type="button" (click)="hidePassword = !hidePassword">
                  <mat-icon>{{ hidePassword ? 'visibility' : 'visibility_off' }}</mat-icon>
                </button>
                <mat-error>Contraseña requerida</mat-error>
              </mat-form-field>

              <button mat-raised-button color="primary" type="submit"
                      class="full-width submit-btn"
                      [disabled]="loginForm.invalid || loading">
                <mat-spinner *ngIf="loading" diameter="20"></mat-spinner>
                <mat-icon *ngIf="!loading">login</mat-icon>
                {{ loading ? 'Ingresando...' : 'Ingresar' }}
              </button>
            </form>
          </mat-card-content>

          <mat-card-actions>
            <a mat-button routerLink="/portal">
              <mat-icon>arrow_back</mat-icon> Volver al Portal
            </a>
          </mat-card-actions>
        </mat-card>

        <!-- RN-P003: Cambiar contraseña temporal -->
        <mat-card class="login-card" *ngIf="showChangePassword">
          <mat-card-header>
            <mat-icon mat-card-avatar style="color:#e65100">password</mat-icon>
            <mat-card-title>Cambiar Contraseña</mat-card-title>
            <mat-card-subtitle>Su contraseña temporal ha expirado. Debe establecer una nueva.</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="info-alert">
              <mat-icon>info</mat-icon>
              La contraseña debe tener mínimo 8 caracteres, al menos una mayúscula y un número.
            </div>

            <div class="error-alert" *ngIf="changeError">
              <mat-icon>error_outline</mat-icon> {{ changeError }}
            </div>

            <form [formGroup]="changeForm" (ngSubmit)="submitPasswordChange()">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Contraseña actual (temporal)</mat-label>
                <mat-icon matPrefix>lock_open</mat-icon>
                <input matInput type="password" formControlName="currentPassword">
                <mat-error>Requerida</mat-error>
              </mat-form-field>
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Nueva contraseña</mat-label>
                <mat-icon matPrefix>lock</mat-icon>
                <input matInput [type]="hideNew ? 'password' : 'text'" formControlName="newPassword">
                <button mat-icon-button matSuffix type="button" (click)="hideNew = !hideNew">
                  <mat-icon>{{ hideNew ? 'visibility' : 'visibility_off' }}</mat-icon>
                </button>
                <mat-hint>Mín. 8 caracteres, 1 mayúscula, 1 número</mat-hint>
                <mat-error>Contraseña inválida (mín. 8 chars, 1 mayúscula, 1 número)</mat-error>
              </mat-form-field>

              <button mat-raised-button color="primary" type="submit"
                      class="full-width submit-btn" [disabled]="changeForm.invalid || changingPassword">
                <mat-spinner *ngIf="changingPassword" diameter="20"></mat-spinner>
                <mat-icon *ngIf="!changingPassword">save</mat-icon>
                {{ changingPassword ? 'Guardando...' : 'Guardar Nueva Contraseña' }}
              </button>
            </form>
          </mat-card-content>
        </mat-card>

      </div>
    </div>
  `,
  styles: [`
    * { box-sizing: border-box; }

    .login-page { display: flex; min-height: 100vh; }

    /* ── LEFT PANEL ── */
    .login-left {
      flex: 1;
      display: flex; flex-direction: column; justify-content: center; align-items: flex-start;
      background: linear-gradient(150deg, #243C2C 0%, #243C2C 45%, #243C2C 100%);
      color: white; padding: 64px 56px;
      position: relative; overflow: hidden;
    }
    .login-left::before {
      content: ''; position: absolute; top: -100px; right: -100px;
      width: 380px; height: 380px; border-radius: 50%;
      background: radial-gradient(circle, rgba(89,120,159,0.18) 0%, transparent 70%);
      pointer-events: none;
    }
    .login-left::after {
      content: ''; position: absolute; bottom: -120px; left: -80px;
      width: 420px; height: 420px; border-radius: 50%;
      background: radial-gradient(circle, rgba(89,120,159,0.10) 0%, transparent 70%);
      pointer-events: none;
    }

    .login-brand { margin-bottom: 52px; position: relative; z-index: 1; }
    .brand-icon {
      font-size: 72px !important; width: 72px !important; height: 72px !important;
      color: #7A9445; margin-bottom: 20px; display: block;
      filter: drop-shadow(0 0 20px rgba(89,120,159,0.5));
    }
    .login-brand h1 {
      font-size: 2.2rem; font-weight: 700; letter-spacing: -0.5px;
      margin: 0 0 8px;
      background: linear-gradient(135deg, #ffffff 30%, #a8e6df 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .login-brand p { color: rgba(255,255,255,0.55); font-size: 0.95rem; margin: 0; letter-spacing: 0.3px; }

    .login-features { display: flex; flex-direction: column; gap: 18px; margin-bottom: 48px; position: relative; z-index: 1; }
    .feature { display: flex; align-items: center; gap: 14px; font-size: 0.93rem; color: rgba(255,255,255,0.82); }
    .feature mat-icon {
      color: #7A9445; font-size: 18px !important; width: 18px !important; height: 18px !important;
      background: transparent; flex-shrink: 0;
    }

    .patient-link { padding-top: 36px; border-top: 1px solid rgba(255,255,255,0.08); position: relative; z-index: 1; }
    .patient-link p { color: rgba(255,255,255,0.45); margin-bottom: 14px; font-size: 0.875rem; }
    .register-btn {
      color: #7A9445 !important; border-color: rgba(89,120,159,0.35) !important;
      border-radius: 10px !important; padding: 0 20px !important; height: 42px !important;
      font-size: 0.9rem !important; font-weight: 500 !important;
      transition: all 0.2s ease !important;
    }
    .register-btn:hover { background: rgba(89,120,159,0.12) !important; border-color: #7A9445 !important; }

    /* ── RIGHT PANEL ── */
    .login-right {
      flex: 0 0 500px; display: flex; align-items: center; justify-content: center;
      background: #f2f5f4; padding: 48px 40px;
    }
    .login-card {
      width: 100%; max-width: 420px;
      border-radius: 20px !important;
      box-shadow: 0 8px 40px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06) !important;
      padding: 12px 8px;
      border: 1px solid rgba(0,0,0,0.05) !important;
      background: white !important;
    }

    ::ng-deep .login-card .mat-mdc-card-header { padding-bottom: 20px; border-bottom: 1px solid #f0f0f0; margin-bottom: 4px; }
    ::ng-deep .login-card .mat-mdc-card-title { font-size: 1.35rem !important; font-weight: 700 !important; color: #243C2C !important; }
    ::ng-deep .login-card .mat-mdc-card-subtitle { color: #6b7280 !important; font-size: 0.875rem !important; margin-top: 3px !important; }

    .full-width { width: 100%; margin-bottom: 6px; }
    .submit-btn {
      height: 52px !important; font-size: 1rem !important; font-weight: 600 !important;
      border-radius: 12px !important; margin-top: 12px !important; letter-spacing: 0.3px !important;
      display: flex !important; align-items: center !important; justify-content: center !important; gap: 8px !important;
      width: 100% !important;
    }

    .error-alert {
      display: flex; align-items: center; gap: 10px;
      background: #fef2f2; color: #dc2626;
      border: 1px solid #fecaca; border-radius: 10px;
      padding: 12px 16px; margin-bottom: 20px; font-size: 0.875rem; font-weight: 500;
    }
    .info-alert {
      display: flex; align-items: center; gap: 10px;
      background: #fff7ed; color: #c2410c;
      border: 1px solid #fed7aa; border-radius: 10px;
      padding: 12px 16px; margin-bottom: 20px; font-size: 0.85rem;
    }

    ::ng-deep .login-card .mat-mdc-card-actions { padding-top: 12px !important; border-top: 1px solid #f4f4f4 !important; margin-top: 4px !important; }

    @media (max-width: 900px) { .login-left { display: none; } .login-right { flex: 1; background: white; } }
    @media (max-width: 480px) { .login-right { padding: 24px 16px; } }
  `]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  changeForm!: FormGroup;
  loading = false;
  errorMessage = '';
  hidePassword = true;
  hideNew = true;
  showChangePassword = false;
  changingPassword = false;
  changeError = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.redirectByRole();
    }
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.changeForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9]).{8,}$/)
      ]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;
    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: res => {
        if (res.success) {
          // RN-P003: si tiene contraseña temporal, mostrar pantalla de cambio
          if (res.data?.mustChangePassword) {
            this.showChangePassword = true;
            this.loading = false;
            return;
          }
          this.redirectByRole();
        } else {
          this.errorMessage = 'Usuario o contraseña inválidos.';
        }
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Usuario o contraseña inválidos.';
        this.loading = false;
      }
    });
  }

  submitPasswordChange(): void {
    if (this.changeForm.invalid) return;
    this.changingPassword = true;
    this.changeError = '';

    const { currentPassword, newPassword } = this.changeForm.value;

    this.authService.changePassword(currentPassword, newPassword).subscribe({
      next: res => {
        if (res.success) {
          // Actualizar flag en sesión local
          const user = this.authService.currentUser();
          if (user) {
            const updated = { ...user, mustChangePassword: false };
            this.authService.updateCurrentUser(updated);
          }
          this.showChangePassword = false;
          this.redirectByRole();
        } else {
          this.changeError = res.message || 'Error al cambiar contraseña.';
        }
        this.changingPassword = false;
      },
      error: err => {
        this.changeError = err.error?.message || 'Error al cambiar contraseña.';
        this.changingPassword = false;
      }
    });
  }

  private redirectByRole(): void {
    const user = this.authService.currentUser();
    if (user?.role === 'PATIENT') {
      this.router.navigate(['/mis-citas']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}
