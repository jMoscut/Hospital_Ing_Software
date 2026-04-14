import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterLink,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatIconModule, MatProgressSpinnerModule
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
          <div class="feature"><mat-icon>security</mat-icon><span>Acceso seguro</span></div>
          <div class="feature"><mat-icon>speed</mat-icon><span>Atención rápida y eficiente</span></div>
          <div class="feature"><mat-icon>medical_services</mat-icon><span>Gestión completa de pacientes</span></div>
        </div>
      </div>

      <div class="login-right">
        <mat-card class="login-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>lock</mat-icon>
            <mat-card-title>Iniciar Sesión</mat-card-title>
            <mat-card-subtitle>Ingresa tus credenciales de acceso</mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <!-- FA01: Mensaje de error -->
            <div class="error-alert" *ngIf="errorMessage">
              <mat-icon>error_outline</mat-icon>
              {{ errorMessage }}
            </div>

            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Usuario</mat-label>
                <mat-icon matPrefix>person</mat-icon>
                <input matInput formControlName="username" placeholder="Ingresa tu usuario" autocomplete="username">
                <mat-error *ngIf="loginForm.get('username')?.hasError('required')">
                  Usuario es requerido
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Contraseña</mat-label>
                <mat-icon matPrefix>lock</mat-icon>
                <input matInput [type]="hidePassword ? 'password' : 'text'"
                       formControlName="password" placeholder="Ingresa tu contraseña"
                       autocomplete="current-password">
                <button mat-icon-button matSuffix type="button" (click)="hidePassword = !hidePassword">
                  <mat-icon>{{ hidePassword ? 'visibility' : 'visibility_off' }}</mat-icon>
                </button>
                <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
                  Contraseña es requerida
                </mat-error>
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
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      display: flex; min-height: 100vh;
    }
    .login-left {
      flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center;
      background: linear-gradient(135deg, #1a237e, #1565c0);
      color: white; padding: 60px 40px;
    }
    .login-brand { text-align: center; margin-bottom: 48px; }
    .brand-icon { font-size: 80px; width: 80px; height: 80px; color: #64b5f6; margin-bottom: 16px; }
    .login-brand h1 { font-size: 2rem; font-weight: 700; margin-bottom: 8px; }
    .login-brand p { color: rgba(255,255,255,0.75); font-size: 1rem; }
    .login-features { display: flex; flex-direction: column; gap: 16px; }
    .feature { display: flex; align-items: center; gap: 12px; font-size: 1rem; }
    .feature mat-icon { color: #64b5f6; }

    .login-right {
      flex: 0 0 440px; display: flex; align-items: center; justify-content: center;
      background: #f5f7fa; padding: 40px;
    }
    .login-card { width: 100%; max-width: 380px; padding: 8px; }
    .full-width { width: 100%; margin-bottom: 8px; }
    .submit-btn { height: 48px; font-size: 1rem; margin-top: 8px; display: flex; align-items: center; justify-content: center; gap: 8px; }
    .error-alert {
      display: flex; align-items: center; gap: 8px;
      background: #ffebee; color: #c62828; border-radius: 8px;
      padding: 12px 16px; margin-bottom: 16px; font-size: 0.9rem;
    }
    @media (max-width: 768px) {
      .login-left { display: none; }
      .login-right { flex: 1; }
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';
  hidePassword = true;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        if (res.success) {
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Usuario o contraseña inválidos. Intente de nuevo.';
        }
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Usuario o contraseña inválidos. Intente de nuevo.';
        this.loading = false;
      }
    });
  }
}
