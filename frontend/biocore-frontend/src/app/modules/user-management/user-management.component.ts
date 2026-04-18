import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UserService } from '../../shared/services/payment.service';
import { ClinicService } from '../../shared/services/ticket.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Clinic } from '../../core/models/ticket.model';

interface NotifSettings {
  visualEnabled: boolean;
  audioEnabled: boolean;
  volume: number;        // 0–100
  alertType: 'voice' | 'tone';
  displaySeconds: number;
  repetitions: number;
}

const NOTIF_KEY = 'biocore_notification_settings';

function defaultSettings(): NotifSettings {
  return { visualEnabled: true, audioEnabled: true, volume: 80, alertType: 'voice', displaySeconds: 10, repetitions: 2 };
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule,
    MatCardModule, MatButtonModule, MatIconModule, MatTableModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatChipsModule, MatTabsModule, MatSlideToggleModule
  ],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1><mat-icon style="vertical-align:middle;margin-right:8px">manage_accounts</mat-icon>Gestión de Personal</h1>
      </div>

      <mat-tab-group animationDuration="200ms">

        <!-- TAB 1: Personal -->
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon class="tab-icon">people</mat-icon>
            Personal ({{ users.length }})
          </ng-template>
          <div class="tab-content">

            <!-- Crear usuario (FA01) -->
            <mat-card class="mb-16">
              <mat-card-header>
                <mat-icon mat-card-avatar>person_add</mat-icon>
                <mat-card-title>Nuevo Usuario</mat-card-title>
                <mat-card-subtitle>FA01 · Registrar personal médico o administrativo</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <form [formGroup]="userForm" class="form-grid">
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
                    <mat-label>Usuario *</mat-label>
                    <input matInput formControlName="username">
                    <mat-error>Requerido</mat-error>
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                    <mat-label>Contraseña *</mat-label>
                    <input matInput type="password" formControlName="password">
                    <mat-hint>Mín. 8 caracteres</mat-hint>
                    <mat-error>Mín. 8 caracteres</mat-error>
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                    <mat-label>Correo Electrónico *</mat-label>
                    <input matInput type="email" formControlName="email">
                    <mat-error>Correo inválido</mat-error>
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                    <mat-label>Rol *</mat-label>
                    <mat-select formControlName="role">
                      <mat-option value="ADMIN">Administrador</mat-option>
                      <mat-option value="DOCTOR">Médico</mat-option>
                      <mat-option value="HEALTH_STAFF">Personal de Salud / Enfermería</mat-option>
                      <mat-option value="LAB_TECHNICIAN">Técnico de Laboratorio</mat-option>
                      <mat-option value="PHARMACIST">Farmacéutico/a</mat-option>
                      <mat-option value="CASHIER">Cajero/a</mat-option>
                    </mat-select>
                    <mat-error>Requerido</mat-error>
                  </mat-form-field>
                  <!-- Auto-assignment info for non-doctor roles -->
                  <div class="auto-area-info" *ngIf="getAutoArea(userForm.value.role) as area">
                    <mat-icon>info_outline</mat-icon>
                    Este rol se asigna automáticamente a: <strong>{{ area }}</strong>
                  </div>
                  <mat-form-field appearance="outline" *ngIf="userForm.value.role === 'DOCTOR'">
                    <mat-label>Especialidad</mat-label>
                    <input matInput formControlName="specialty">
                  </mat-form-field>
                  <mat-form-field appearance="outline"
                    *ngIf="['DOCTOR','LAB_TECHNICIAN','HEALTH_STAFF'].includes(userForm.value.role)">
                    <mat-label>N° Colegiado {{ isCollegiateRequired() ? '*' : '(opcional)' }}</mat-label>
                    <input matInput formControlName="collegiateNumber">
                    <mat-error>Requerido para este rol (RN-M05: debe ser único)</mat-error>
                  </mat-form-field>
                </form>
                <div class="error-msg" *ngIf="createError">
                  <mat-icon>error_outline</mat-icon> {{ createError }}
                </div>
                <div style="display:flex;gap:12px;margin-top:8px">
                  <button mat-raised-button color="primary" (click)="createUser()"
                          [disabled]="userForm.invalid || creating">
                    <mat-icon>save</mat-icon> {{ creating ? 'Guardando...' : 'Guardar Usuario' }}
                  </button>
                  <button mat-button (click)="userForm.reset({role:'DOCTOR'}); createError=''">
                    Limpiar
                  </button>
                </div>
              </mat-card-content>
            </mat-card>

            <!-- Tabla de usuarios -->
            <mat-card>
              <mat-card-header>
                <mat-card-title>Personal Registrado</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <table mat-table [dataSource]="users" class="user-table">
                  <ng-container matColumnDef="name">
                    <th mat-header-cell *matHeaderCellDef>Nombre</th>
                    <td mat-cell *matCellDef="let u">
                      <strong>{{ u.firstName }} {{ u.lastName }}</strong>
                      <div style="font-size:0.75rem;color:#9e9e9e">{{ u.username }}</div>
                    </td>
                  </ng-container>
                  <ng-container matColumnDef="role">
                    <th mat-header-cell *matHeaderCellDef>Rol</th>
                    <td mat-cell *matCellDef="let u">
                      <span [class]="getRoleClass(u.role)" class="role-chip">{{ roleLabel(u.role) }}</span>
                    </td>
                  </ng-container>
                  <ng-container matColumnDef="specialty">
                    <th mat-header-cell *matHeaderCellDef>Especialidad / Colegiado</th>
                    <td mat-cell *matCellDef="let u">
                      <span *ngIf="u.specialty">{{ u.specialty }}</span>
                      <span *ngIf="u.collegiateNumber" class="collegiate-badge">{{ u.collegiateNumber }}</span>
                      <span *ngIf="!u.specialty && !u.collegiateNumber" style="color:#bbb">—</span>
                    </td>
                  </ng-container>
                  <ng-container matColumnDef="clinic">
                    <th mat-header-cell *matHeaderCellDef>Área / Clínica</th>
                    <td mat-cell *matCellDef="let u">
                      <!-- Doctor with assigned clinic -->
                      <span *ngIf="u.role === 'DOCTOR' && u.assignedClinic" class="clinic-badge">
                        <mat-icon style="font-size:14px;vertical-align:middle">local_hospital</mat-icon>
                        {{ u.assignedClinic }}
                      </span>
                      <!-- Doctor without clinic -->
                      <span *ngIf="u.role === 'DOCTOR' && !u.assignedClinic" class="unassigned-badge">Sin asignar</span>
                      <!-- Non-doctor: auto area -->
                      <span *ngIf="u.role !== 'DOCTOR'" class="area-badge">
                        <mat-icon style="font-size:13px;vertical-align:middle">place</mat-icon>
                        {{ getAutoArea(u.role) }}
                      </span>
                    </td>
                  </ng-container>
                  <ng-container matColumnDef="actions">
                    <th mat-header-cell *matHeaderCellDef>Acciones</th>
                    <td mat-cell *matCellDef="let u">
                      <!-- FA04 / FA03: Asignar o reasignar clínica a médicos -->
                      <button mat-icon-button color="primary" *ngIf="u.role === 'DOCTOR'"
                              (click)="openAssignDialog(u)"
                              [title]="u.assignedClinic ? 'Reasignar clínica (FA03)' : 'Asignar clínica (FA04)'">
                        <mat-icon>{{ u.assignedClinic ? 'sync_alt' : 'add_location' }}</mat-icon>
                      </button>
                      <button mat-icon-button color="warn" (click)="deleteUser(u.id)" title="Desactivar usuario">
                        <mat-icon>person_off</mat-icon>
                      </button>
                    </td>
                  </ng-container>

                  <tr mat-header-row *matHeaderRowDef="columns"></tr>
                  <tr mat-row *matRowDef="let row; columns: columns;"></tr>
                </table>
                <div class="empty-state" *ngIf="users.length === 0">
                  <mat-icon>people</mat-icon>
                  <p>No hay usuarios registrados</p>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <!-- TAB 2: Configuración de Notificaciones (FA02) -->
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon class="tab-icon">notifications</mat-icon>
            Notificaciones
          </ng-template>
          <div class="tab-content">
            <mat-card>
              <mat-card-header>
                <mat-icon mat-card-avatar>notifications_active</mat-icon>
                <mat-card-title>Configuración de Notificaciones</mat-card-title>
                <mat-card-subtitle>FA02 · Pantallas de llamado y sistema de audio (RN-N01, RN-N02)</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>

                <div class="notif-section">
                  <h3><mat-icon>tv</mat-icon> Notificaciones Visuales</h3>
                  <div class="notif-row">
                    <div>
                      <strong>Activar pantalla de llamado</strong>
                      <p>Muestra el turno del paciente en la pantalla de sala de espera [RN-N01]</p>
                    </div>
                    <mat-slide-toggle [(ngModel)]="notifSettings.visualEnabled"
                                      (change)="saveSettings()" color="primary">
                      {{ notifSettings.visualEnabled ? 'Activa' : 'Inactiva' }}
                    </mat-slide-toggle>
                  </div>
                  <div class="notif-row" *ngIf="notifSettings.visualEnabled">
                    <div>
                      <strong>Tiempo de visualización del llamado</strong>
                      <p>Segundos que permanece visible en pantalla el turno llamado</p>
                    </div>
                    <div class="notif-input">
                      <input type="number" class="number-input" [(ngModel)]="notifSettings.displaySeconds"
                             (change)="saveSettings()" min="3" max="60">
                      <span>seg</span>
                    </div>
                  </div>
                </div>

                <div class="notif-section">
                  <h3><mat-icon>volume_up</mat-icon> Notificaciones Auditivas</h3>
                  <div class="notif-row">
                    <div>
                      <strong>Activar sistema de audio</strong>
                      <p>Anuncia en voz alta el turno y clínica del paciente [RN-N02]</p>
                    </div>
                    <mat-slide-toggle [(ngModel)]="notifSettings.audioEnabled"
                                      (change)="saveSettings()" color="primary">
                      {{ notifSettings.audioEnabled ? 'Activo' : 'Inactivo' }}
                    </mat-slide-toggle>
                  </div>
                  <div class="notif-row" *ngIf="notifSettings.audioEnabled">
                    <div>
                      <strong>Volumen del audio</strong>
                      <p>Porcentaje de volumen (0 = silencio, 100 = máximo)</p>
                    </div>
                    <div class="notif-input">
                      <input type="range" min="0" max="100" step="5" [(ngModel)]="notifSettings.volume"
                             (change)="saveSettings()" class="volume-slider">
                      <span>{{ notifSettings.volume }}%</span>
                    </div>
                  </div>
                  <div class="notif-row" *ngIf="notifSettings.audioEnabled">
                    <div>
                      <strong>Tipo de alerta</strong>
                      <p>Voz sintetizada anuncia nombre y turno; tono emite un beep</p>
                    </div>
                    <mat-select [(ngModel)]="notifSettings.alertType" (selectionChange)="saveSettings()"
                                class="notif-select">
                      <mat-option value="voice">Voz sintetizada</mat-option>
                      <mat-option value="tone">Tono de alerta</mat-option>
                    </mat-select>
                  </div>
                  <div class="notif-row" *ngIf="notifSettings.audioEnabled">
                    <div>
                      <strong>Repeticiones del llamado</strong>
                      <p>Número de veces que se repite el anuncio al llamar al paciente</p>
                    </div>
                    <div class="notif-input">
                      <input type="number" class="number-input" [(ngModel)]="notifSettings.repetitions"
                             (change)="saveSettings()" min="1" max="5">
                      <span>veces</span>
                    </div>
                  </div>
                  <div class="notif-row" *ngIf="notifSettings.audioEnabled">
                    <button mat-stroked-button color="primary" (click)="testAudio()">
                      <mat-icon>play_circle</mat-icon> Probar audio
                    </button>
                  </div>
                </div>

                <div class="save-row">
                  <mat-icon style="color:#2e7d32">check_circle</mat-icon>
                  <span>Los cambios se guardan automáticamente y se aplican en tiempo real [RN-N03]</span>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

      </mat-tab-group>
    </div>

    <!-- Dialog de asignación / reasignación de clínica -->
    <div class="assign-overlay" *ngIf="assignDialogOpen">
      <mat-card class="assign-dialog">
        <mat-card-header>
          <mat-icon mat-card-avatar>{{ selectedUser?.assignedClinic ? 'sync_alt' : 'add_location' }}</mat-icon>
          <mat-card-title>{{ selectedUser?.assignedClinic ? 'Reasignar Clínica' : 'Asignar Clínica' }}</mat-card-title>
          <mat-card-subtitle>
            Dr. {{ selectedUser?.firstName }} {{ selectedUser?.lastName }}
            <span *ngIf="selectedUser?.assignedClinic"> · Actual: {{ selectedUser?.assignedClinic }}</span>
          </mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p class="hint-text">RN-M01: Máx. de médicos por clínica. RN-M02: Solo una clínica activa por médico.</p>
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Clínica de Destino</mat-label>
            <mat-select [(ngModel)]="selectedClinicId" [ngModelOptions]="{standalone: true}">
              <mat-option *ngFor="let c of clinics" [value]="c.id">
                {{ c.name }} <span style="color:#9e9e9e;font-size:0.8rem">(máx. {{ c.maxDoctors }} médicos)</span>
              </mat-option>
            </mat-select>
          </mat-form-field>
        </mat-card-content>
        <mat-card-actions style="display:flex;justify-content:space-between;align-items:center">
          <div style="display:flex;gap:8px">
            <button mat-raised-button color="primary" (click)="assignClinic()" [disabled]="!selectedClinicId || assigning">
              <mat-icon>check</mat-icon> {{ assigning ? 'Guardando...' : 'Confirmar' }}
            </button>
            <button mat-button (click)="assignDialogOpen = false">Cancelar</button>
          </div>
          <button mat-stroked-button color="warn" *ngIf="selectedUser?.assignedClinic"
                  (click)="unassignClinic()" [disabled]="assigning"
                  title="Quitar al médico de su clínica actual">
            <mat-icon>location_off</mat-icon> Desasignar
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .tab-content { padding: 24px 0; }
    .tab-icon { font-size: 18px; margin-right: 6px; vertical-align: middle; }
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .page-header h1 { font-size: 1.6rem; font-weight: 500; color: #1D6C61; margin: 0; }
    .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; margin-bottom: 8px; }
    .mb-16 { margin-bottom: 16px; }
    .full-width { width: 100%; }
    .hint-text { font-size: 0.82rem; color: #757575; margin-bottom: 12px; }

    .user-table { width: 100%; }
    .role-chip { padding: 3px 10px; border-radius: 10px; font-size: 0.78rem; font-weight: 600; }
    .role-doctor { background: #e3f2fd; color: #1565c0; }
    .role-admin { background: #fce4ec; color: #c62828; }
    .role-nurse { background: #f3e5f5; color: #6a1b9a; }
    .role-lab { background: #e8f5e9; color: #2e7d32; }
    .role-pharmacy { background: #fff3e0; color: #e65100; }
    .role-cashier { background: #f5f5f5; color: #424242; }
    .role-staff { background: #e0f7fa; color: #006064; }
    .clinic-badge { background: #d0f4ef; color: #1D6C61; padding: 3px 10px; border-radius: 10px; font-size: 0.78rem; }
    .unassigned-badge { background: #fff3e0; color: #e65100; padding: 3px 10px; border-radius: 10px; font-size: 0.78rem; }
    .collegiate-badge { background: #e8eaf6; color: #3949ab; padding: 2px 8px; border-radius: 6px; font-size: 0.75rem; margin-left: 6px; }
    .area-badge { background: #e8f5e9; color: #2e7d32; padding: 3px 10px; border-radius: 10px; font-size: 0.78rem; display:inline-flex;align-items:center;gap:4px; }
    .auto-area-info { display:flex;align-items:center;gap:6px;background:#e8f5e9;color:#2e7d32;border-radius:8px;padding:8px 12px;font-size:0.82rem;margin-top:-4px; }
    .error-msg { display: flex; align-items: center; gap: 8px; color: #c62828; font-size: 0.88rem; margin-top: 4px; }

    .empty-state { text-align: center; padding: 32px; color: #9e9e9e; }
    .empty-state mat-icon { font-size: 40px; width: 40px; height: 40px; }

    /* Notification settings */
    .notif-section { margin-bottom: 32px; }
    .notif-section h3 { display: flex; align-items: center; gap: 8px; font-size: 1rem; font-weight: 600; color: #1D6C61; margin-bottom: 16px; border-bottom: 1px solid #e0e0e0; padding-bottom: 8px; }
    .notif-row { display: flex; align-items: center; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #f5f5f5; gap: 16px; }
    .notif-row > div { flex: 1; }
    .notif-row strong { font-size: 0.92rem; }
    .notif-row p { font-size: 0.78rem; color: #757575; margin: 2px 0 0; }
    .notif-input { display: flex; align-items: center; gap: 8px; }
    .number-input { width: 64px; padding: 6px 10px; border: 1px solid #bbb; border-radius: 6px; font-size: 1rem; text-align: center; }
    .volume-slider { width: 140px; accent-color: #1D6C61; }
    .notif-select { width: 180px; }
    .save-row { display: flex; align-items: center; gap: 8px; color: #2e7d32; font-size: 0.85rem; margin-top: 24px; background: #e8f5e9; padding: 12px 16px; border-radius: 8px; }

    /* Assign dialog */
    .assign-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .assign-dialog { width: 420px; }
  `]
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  clinics: Clinic[] = [];
  assignDialogOpen = false;
  selectedUser: any = null;
  selectedClinicId: number | null = null;
  assigning = false;
  userForm!: FormGroup;
  createError = '';
  creating = false;
  columns = ['name', 'role', 'specialty', 'clinic', 'actions'];
  notifSettings: NotifSettings = defaultSettings();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private clinicService: ClinicService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    const stored = localStorage.getItem(NOTIF_KEY);
    if (stored) this.notifSettings = { ...defaultSettings(), ...JSON.parse(stored) };

    this.userForm = this.fb.group({
      firstName:        ['', Validators.required],
      lastName:         ['', Validators.required],
      username:         ['', Validators.required],
      password:         ['', [Validators.required, Validators.minLength(8)]],
      email:            ['', [Validators.required, Validators.email]],
      role:             ['DOCTOR', Validators.required],
      specialty:        [''],
      collegiateNumber: ['']
    });

    // Collegiate required for DOCTOR, HEALTH_STAFF, LAB_TECHNICIAN (RN-M05)
    this.userForm.get('role')?.valueChanges.subscribe(role => {
      const ctrl = this.userForm.get('collegiateNumber')!;
      if (this.isCollegiateRequired(role)) {
        ctrl.setValidators([Validators.required]);
      } else {
        ctrl.clearValidators();
      }
      ctrl.updateValueAndValidity();
    });

    this.load();
    // Only the 3 consultation clinics are valid for doctor assignment
    const allowedClinics = ['Consulta Externa', 'Medicina General', 'Emergencias'];
    this.clinicService.getAll().subscribe(res => {
      if (res.success) this.clinics = res.data.filter((c: Clinic) => allowedClinics.includes(c.name));
    });
  }

  isCollegiateRequired(role?: string): boolean {
    const r = role ?? this.userForm?.value?.role;
    return ['DOCTOR', 'LAB_TECHNICIAN', 'HEALTH_STAFF'].includes(r);
  }

  getAutoArea(role: string): string {
    const m: Record<string, string> = {
      HEALTH_STAFF: 'Signos Vitales / Recepción',
      LAB_TECHNICIAN: 'Laboratorio Clínico',
      PHARMACIST: 'Farmacia',
      CASHIER: 'Caja / Pagos',
      ADMIN: 'Administración'
    };
    return m[role] ?? '';
  }

  load(): void {
    this.userService.getAll().subscribe({
      next: res => { if (res.success) this.users = res.data.filter((u: any) => u.active && u.role !== 'PATIENT'); },
      error: () => this.notification.error('Error al cargar usuarios')
    });
  }

  createUser(): void {
    this.creating = true;
    this.createError = '';
    this.userService.create(this.userForm.value).subscribe({
      next: res => {
        if (res.success) {
          this.notification.success('Usuario creado exitosamente');
          this.userForm.reset({ role: 'DOCTOR' });
          this.load();
        } else {
          this.createError = res.message || 'Error al crear usuario';
        }
        this.creating = false;
      },
      error: err => {
        this.createError = err.error?.message || 'Error al crear usuario (verifique colegiado duplicado)';
        this.creating = false;
      }
    });
  }

  openAssignDialog(user: any): void {
    this.selectedUser = user;
    this.selectedClinicId = null;
    this.assignDialogOpen = true;
  }

  assignClinic(): void {
    if (!this.selectedUser || !this.selectedClinicId) return;
    this.assigning = true;

    const doAssign = () => {
      this.userService.assignClinic(this.selectedUser.id, this.selectedClinicId!).subscribe({
        next: res => {
          if (res.success) {
            this.notification.success(`Dr. ${this.selectedUser.firstName} asignado a ${res.data.assignedClinic}`);
            this.assignDialogOpen = false;
            this.load();
          } else {
            this.notification.error(res.message || 'Error en la asignación');
          }
          this.assigning = false;
        },
        error: err => { this.notification.error(err.error?.message || 'Error: Verifique capacidad (RN-M01)'); this.assigning = false; }
      });
    };

    // Si ya tiene clínica, primero desasignar y luego reasignar
    if (this.selectedUser.assignedClinic) {
      this.userService.unassignClinic(this.selectedUser.id).subscribe({
        next: () => doAssign(),
        error: () => doAssign()  // continuar aunque falle el unassign
      });
    } else {
      doAssign();
    }
  }

  unassignClinic(): void {
    if (!this.selectedUser) return;
    if (!confirm(`¿Quitar a Dr. ${this.selectedUser.firstName} de ${this.selectedUser.assignedClinic}?`)) return;
    this.assigning = true;
    this.userService.unassignClinic(this.selectedUser.id).subscribe({
      next: () => {
        this.notification.info(`Dr. ${this.selectedUser.firstName} desasignado`);
        this.assignDialogOpen = false;
        this.load();
        this.assigning = false;
      },
      error: err => { this.notification.error(err.error?.message || 'Error al desasignar'); this.assigning = false; }
    });
  }

  deleteUser(id: number): void {
    if (!confirm('¿Desactivar este usuario?')) return;
    this.userService.delete(id).subscribe({
      next: () => { this.notification.info('Usuario desactivado'); this.load(); },
      error: () => this.notification.error('Error al desactivar usuario')
    });
  }

  saveSettings(): void {
    localStorage.setItem(NOTIF_KEY, JSON.stringify(this.notifSettings));
  }

  testAudio(): void {
    if (!('speechSynthesis' in window)) {
      this.notification.info('El navegador no soporta síntesis de voz');
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(
      'Prueba de audio. Turno A-cero-cero-uno. Por favor dirigirse a Clínica de Consulta Externa.'
    );
    utter.lang = 'es-ES';
    utter.volume = this.notifSettings.volume / 100;
    utter.rate = 0.85;
    window.speechSynthesis.speak(utter);
  }

  roleLabel(r: string): string {
    const m: Record<string, string> = {
      ADMIN: 'Administrador', DOCTOR: 'Médico',
      HEALTH_STAFF: 'Personal Salud / Enf.',
      LAB_TECHNICIAN: 'Lab. Técnico', PHARMACIST: 'Farmacéutico',
      CASHIER: 'Cajero/a', PATIENT: 'Paciente'
    };
    return m[r] ?? r;
  }

  getRoleClass(r: string): string {
    const m: Record<string, string> = {
      ADMIN: 'role-admin', DOCTOR: 'role-doctor',
      HEALTH_STAFF: 'role-staff',
      LAB_TECHNICIAN: 'role-lab', PHARMACIST: 'role-pharmacy',
      CASHIER: 'role-cashier'
    };
    return m[r] ?? '';
  }
}
