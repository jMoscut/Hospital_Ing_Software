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
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { UserService } from '../../shared/services/payment.service';
import { ClinicService } from '../../shared/services/ticket.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Clinic } from '../../core/models/ticket.model';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, MatCardModule, MatButtonModule,
    MatIconModule, MatTableModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatDialogModule, MatChipsModule, MatExpansionModule
  ],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Gestión de Personal</h1>
        <button mat-raised-button color="primary" (click)="showCreateForm = !showCreateForm">
          <mat-icon>person_add</mat-icon> Nuevo Usuario
        </button>
      </div>

      <!-- Formulario crear usuario (FA01) -->
      <mat-card class="mb-16" *ngIf="showCreateForm">
        <mat-card-header>
          <mat-card-title>Crear Nuevo Usuario</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="userForm" class="form-grid">
            <mat-form-field appearance="outline">
              <mat-label>Nombres</mat-label>
              <input matInput formControlName="firstName">
              <mat-error>Requerido</mat-error>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Apellidos</mat-label>
              <input matInput formControlName="lastName">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Usuario</mat-label>
              <input matInput formControlName="username">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Contraseña</mat-label>
              <input matInput type="password" formControlName="password">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Correo Electrónico</mat-label>
              <input matInput type="email" formControlName="email">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Rol</mat-label>
              <mat-select formControlName="role">
                <mat-option value="ADMIN">Administrador</mat-option>
                <mat-option value="DOCTOR">Médico</mat-option>
                <mat-option value="NURSE">Enfermero/a</mat-option>
                <mat-option value="LAB_TECHNICIAN">Técnico de Lab.</mat-option>
                <mat-option value="PHARMACIST">Farmacéutico</mat-option>
                <mat-option value="CASHIER">Cajero/a</mat-option>
                <mat-option value="HEALTH_STAFF">Personal de Salud</mat-option>
              </mat-select>
            </mat-form-field>
            <mat-form-field appearance="outline" *ngIf="userForm.value.role === 'DOCTOR'">
              <mat-label>Especialidad</mat-label>
              <input matInput formControlName="specialty">
            </mat-form-field>
            <mat-form-field appearance="outline" *ngIf="userForm.value.role === 'DOCTOR'">
              <mat-label>No. Colegiado (único)</mat-label>
              <input matInput formControlName="collegiateNumber">
            </mat-form-field>
          </form>
          <div style="display:flex;gap:12px">
            <button mat-raised-button color="primary" (click)="createUser()" [disabled]="userForm.invalid">
              <mat-icon>save</mat-icon> Guardar
            </button>
            <button mat-button (click)="showCreateForm = false">Cancelar</button>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Tabla de usuarios -->
      <mat-card>
        <mat-card-content>
          <table mat-table [dataSource]="users">
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Nombre</th>
              <td mat-cell *matCellDef="let u">{{ u.firstName }} {{ u.lastName }}</td>
            </ng-container>
            <ng-container matColumnDef="username">
              <th mat-header-cell *matHeaderCellDef>Usuario</th>
              <td mat-cell *matCellDef="let u">{{ u.username }}</td>
            </ng-container>
            <ng-container matColumnDef="role">
              <th mat-header-cell *matHeaderCellDef>Rol</th>
              <td mat-cell *matCellDef="let u">
                <mat-chip>{{ u.role }}</mat-chip>
              </td>
            </ng-container>
            <ng-container matColumnDef="specialty">
              <th mat-header-cell *matHeaderCellDef>Especialidad</th>
              <td mat-cell *matCellDef="let u">{{ u.specialty || '-' }}</td>
            </ng-container>
            <ng-container matColumnDef="clinic">
              <th mat-header-cell *matHeaderCellDef>Clínica Asignada</th>
              <td mat-cell *matCellDef="let u">
                <span *ngIf="u.assignedClinic" class="clinic-badge">{{ u.assignedClinic }}</span>
                <span *ngIf="!u.assignedClinic" style="color:#9e9e9e">-</span>
              </td>
            </ng-container>
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Acciones</th>
              <td mat-cell *matCellDef="let u">
                <!-- Asignar clínica (CU2) solo para médicos -->
                <button mat-icon-button color="primary" *ngIf="u.role === 'DOCTOR' && !u.assignedClinic"
                        (click)="openAssignDialog(u)" title="Asignar clínica (RN-M01, RN-M02)">
                  <mat-icon>add_location</mat-icon>
                </button>
                <button mat-icon-button color="warn" *ngIf="u.role === 'DOCTOR' && u.assignedClinic"
                        (click)="unassignClinic(u.id)" title="Desasignar clínica">
                  <mat-icon>location_off</mat-icon>
                </button>
                <button mat-icon-button color="warn" (click)="deleteUser(u.id)" title="Desactivar">
                  <mat-icon>person_off</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="columns"></tr>
            <tr mat-row *matRowDef="let row; columns: columns;"></tr>
          </table>
        </mat-card-content>
      </mat-card>

      <!-- Dialog de asignación de clínica -->
      <div class="assign-overlay" *ngIf="assignDialogOpen">
        <mat-card class="assign-dialog">
          <mat-card-header>
            <mat-card-title>Asignar Clínica</mat-card-title>
            <mat-card-subtitle>
              Médico: {{ selectedUser?.firstName }} {{ selectedUser?.lastName }}<br>
              Máximo de médicos por clínica. Solo una clínica activa.
            </mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Clínica de Destino</mat-label>
              <mat-select [(ngModel)]="selectedClinicId" [ngModelOptions]="{standalone: true}">
                <mat-option *ngFor="let c of clinics" [value]="c.id">
                  {{ c.name }} (max. {{ c.maxDoctors }} médicos)
                </mat-option>
              </mat-select>
            </mat-form-field>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" (click)="assignClinic()" [disabled]="!selectedClinicId">
              <mat-icon>check</mat-icon> Asignar
            </button>
            <button mat-button (click)="assignDialogOpen = false">Cancelar</button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .page-header h1 { font-size: 1.6rem; font-weight: 500; color: #1565c0; margin: 0; }
    .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 12px; margin-bottom: 16px; }
    .clinic-badge { background: #e3f2fd; color: #1565c0; padding: 2px 8px; border-radius: 8px; font-size: 0.8rem; }
    .mb-16 { margin-bottom: 16px; }
    .full-width { width: 100%; }
    .assign-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .assign-dialog { width: 400px; }
  `]
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  clinics: Clinic[] = [];
  showCreateForm = false;
  assignDialogOpen = false;
  selectedUser: any = null;
  selectedClinicId: number | null = null;
  userForm!: FormGroup;
  columns = ['name', 'username', 'role', 'specialty', 'clinic', 'actions'];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private clinicService: ClinicService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['DOCTOR', Validators.required],
      specialty: [''],
      collegiateNumber: ['']
    });

    this.load();
    this.clinicService.getAll().subscribe(res => {
      if (res.success) this.clinics = res.data;
    });
  }

  load(): void {
    this.userService.getAll().subscribe({
      next: res => {
        if (res.success) this.users = res.data.filter((u: any) => u.active);
      },
      error: () => this.notification.error('Error al cargar usuarios. Verifique que el backend esté corriendo.')
    });
  }

  createUser(): void {
    this.userService.create(this.userForm.value).subscribe({
      next: res => {
        if (res.success) {
          this.notification.success('Usuario creado exitosamente');
          this.showCreateForm = false;
          this.userForm.reset({ role: 'DOCTOR' });
          this.load();
        }
      },
      error: () => this.notification.error('Error al crear usuario (verifique colegiado duplicado)')
    });
  }

  openAssignDialog(user: any): void {
    this.selectedUser = user;
    this.selectedClinicId = null;
    this.assignDialogOpen = true;
  }

  assignClinic(): void {
    if (!this.selectedUser || !this.selectedClinicId) return;
    this.userService.assignClinic(this.selectedUser.id, this.selectedClinicId).subscribe({
      next: res => {
        if (res.success) {
          this.notification.success(`Médico asignado a ${res.data.assignedClinic} exitosamente`);
          this.assignDialogOpen = false;
          this.load();
        }
      },
      error: () => this.notification.error('Error: Verifique capacidad máxima (RN-M01) y asignación previa (RN-M02)')
    });
  }

  unassignClinic(userId: number): void {
    this.userService.unassignClinic(userId).subscribe({
      next: () => { this.notification.info('Médico desasignado de la clínica'); this.load(); }
    });
  }

  deleteUser(id: number): void {
    if (confirm('¿Desactivar este usuario?')) {
      this.userService.delete(id).subscribe({
        next: () => { this.notification.info('Usuario desactivado'); this.load(); }
      });
    }
  }
}
