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
    .login-page { display: flex; min-height: 100vh; }
    .login-left {
      flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center;
      background: linear-gradient(135deg, #193A31, #1D6C61);
      color: white; padding: 60px 40px;
    }
    .login-brand { text-align: center; margin-bottom: 48px; }
    .brand-icon { font-size: 80px; width: 80px; height: 80px; color: #3EB9A8; margin-bottom: 16px; }
    .login-brand h1 { font-size: 2rem; font-weight: 700; margin-bottom: 8px; }
    .login-brand p { color: rgba(255,255,255,0.75); font-size: 1rem; }
    .login-features { display: flex; flex-direction: column; gap: 16px; margin-bottom: 40px; }
    .feature { display: flex; align-items: center; gap: 12px; font-size: 1rem; }
    .feature mat-icon { color: #3EB9A8; }
    .patient-link { text-align: center; }
    .patient-link p { color: rgba(255,255,255,0.7); margin-bottom: 12px; }
    .register-btn { color: white !important; border-color: rgba(255,255,255,0.5) !important; }

    .login-right {
      flex: 0 0 460px; display: flex; align-items: center; justify-content: center;
      background: #f5f7fa; padding: 40px;
    }
    .login-card { width: 100%; max-width: 400px; padding: 8px; }
    .full-width { width: 100%; margin-bottom: 8px; }
    .submit-btn { height: 48px; font-size: 1rem; margin-top: 8px; display: flex; align-items: center; justify-content: center; gap: 8px; }
    .error-alert {
      display: flex; align-items: center; gap: 8px;
      background: #ffebee; color: #c62828; border-radius: 8px;
      padding: 12px 16px; margin-bottom: 16px; font-size: 0.9rem;
    }
    .info-alert {
      display: flex; align-items: center; gap: 8px;
      background: #fff3e0; color: #e65100; border-radius: 8px;
      padding: 12px 16px; margin-bottom: 16px; font-size: 0.85rem;
    }
    @media (max-width: 768px) {
      .login-left { display: none; }
      .login-right { flex: 1; }
    }
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
