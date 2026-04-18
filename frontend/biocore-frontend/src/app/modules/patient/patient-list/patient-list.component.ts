import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatSelectModule } from '@angular/material/select';
import { PatientService } from '../../../shared/services/patient.service';
import { InsuranceService } from '../../../shared/services/payment.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { Patient } from '../../../core/models/patient.model';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    CommonModule, RouterLink, ReactiveFormsModule,
    MatTableModule, MatInputModule, MatFormFieldModule,
    MatButtonModule, MatIconModule, MatCardModule,
    MatChipsModule, MatProgressSpinnerModule, MatSelectModule
  ],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Pacientes</h1>
        <button mat-raised-button color="primary" routerLink="/patients/register">
          <mat-icon>person_add</mat-icon> Registrar Paciente
        </button>
      </div>

      <mat-card>
        <mat-card-content>
          <mat-form-field appearance="outline" class="search-field">
            <mat-label>Buscar paciente</mat-label>
            <mat-icon matPrefix>search</mat-icon>
            <input matInput [formControl]="searchCtrl" placeholder="Nombre, DPI o código...">
          </mat-form-field>

          <div class="flex-center mt-24" *ngIf="loading">
            <mat-spinner diameter="40"></mat-spinner>
          </div>

          <table mat-table [dataSource]="patients" *ngIf="!loading" class="w-full">
            <ng-container matColumnDef="patientCode">
              <th mat-header-cell *matHeaderCellDef>Código</th>
              <td mat-cell *matCellDef="let p">
                <strong>{{ p.patientCode }}</strong>
              </td>
            </ng-container>
            <ng-container matColumnDef="dpi">
              <th mat-header-cell *matHeaderCellDef>DPI</th>
              <td mat-cell *matCellDef="let p">{{ p.dpi }}</td>
            </ng-container>
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Nombre Completo</th>
              <td mat-cell *matCellDef="let p">{{ p.firstName }} {{ p.lastName }}</td>
            </ng-container>
            <ng-container matColumnDef="phone">
              <th mat-header-cell *matHeaderCellDef>Teléfono</th>
              <td mat-cell *matCellDef="let p">{{ p.phone || '-' }}</td>
            </ng-container>
            <ng-container matColumnDef="insurance">
              <th mat-header-cell *matHeaderCellDef>Seguro</th>
              <td mat-cell *matCellDef="let p">
                <mat-chip *ngIf="p.insuranceName" color="primary">
                  {{ p.insuranceName }} ({{ p.discountPercentage }}%)
                </mat-chip>
                <span *ngIf="!p.insuranceName" style="color:#9e9e9e">Sin seguro</span>
              </td>
            </ng-container>
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Acciones</th>
              <td mat-cell *matCellDef="let p">
                <button mat-icon-button color="primary" [routerLink]="['/patients', p.id]" title="Ver detalle">
                  <mat-icon>visibility</mat-icon>
                </button>
                <button mat-icon-button color="accent" (click)="openEdit(p); $event.stopPropagation()" title="Editar">
                  <mat-icon>edit</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="columns"></tr>
            <tr mat-row *matRowDef="let row; columns: columns;"
                class="clickable-row" [routerLink]="['/patients', row.id]"></tr>
          </table>

          <div class="text-center mt-16" *ngIf="!loading && patients.length === 0">
            <mat-icon style="font-size:48px;color:#9e9e9e">people_outline</mat-icon>
            <p style="color:#9e9e9e">No se encontraron pacientes</p>
          </div>
        </mat-card-content>
      </mat-card>
    </div>

    <!-- Edit dialog -->
    <div class="edit-overlay" *ngIf="editDialogOpen">
      <mat-card class="edit-dialog">
        <mat-card-header>
          <mat-icon mat-card-avatar>edit</mat-icon>
          <mat-card-title>Editar Paciente</mat-card-title>
          <mat-card-subtitle *ngIf="editingPatient">{{ editingPatient.patientCode }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="editForm" class="edit-form-grid">
            <mat-form-field appearance="outline">
              <mat-label>Nombres *</mat-label>
              <input matInput formControlName="firstName">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Apellidos *</mat-label>
              <input matInput formControlName="lastName">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>DPI *</mat-label>
              <input matInput formControlName="dpi">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Teléfono</mat-label>
              <input matInput formControlName="phone">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Correo Electrónico</mat-label>
              <input matInput formControlName="email">
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
              <mat-label>Seguro Médico</mat-label>
              <mat-select formControlName="insuranceId">
                <mat-option [value]="null">Sin seguro</mat-option>
                <mat-option *ngFor="let ins of insurances" [value]="ins.id">{{ ins.name }}</mat-option>
              </mat-select>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>No. de Póliza / Carné de Seguro</mat-label>
              <input matInput formControlName="insuranceNumber" placeholder="Opcional">
            </mat-form-field>
          </form>
        </mat-card-content>
        <mat-card-actions style="display:flex;gap:8px;padding:16px">
          <button mat-raised-button color="primary" (click)="saveEdit()" [disabled]="editForm.invalid || saving">
            <mat-icon>save</mat-icon> {{ saving ? 'Guardando...' : 'Guardar' }}
          </button>
          <button mat-button (click)="editDialogOpen = false">Cancelar</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .search-field { width: 100%; max-width: 400px; margin-bottom: 16px; }
    .w-full { width: 100%; }
    .clickable-row { cursor: pointer; }
    .clickable-row:hover { background: #f5f5f5; }
    .edit-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .edit-dialog { width: 560px; max-height: 90vh; overflow-y: auto; }
    .edit-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 8px; }
  `]
})
export class PatientListComponent implements OnInit {
  patients: Patient[] = [];
  loading = true;
  searchCtrl = new FormControl('');
  columns = ['patientCode', 'dpi', 'name', 'phone', 'insurance', 'actions'];

  editDialogOpen = false;
  editingPatient: Patient | null = null;
  editForm!: FormGroup;
  saving = false;
  insurances: any[] = [];

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private insuranceService: InsuranceService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadAll();
    this.insuranceService.getAll().subscribe(res => { if (res.success) this.insurances = res.data; });
    this.searchCtrl.valueChanges.pipe(
      debounceTime(400), distinctUntilChanged()
    ).subscribe(q => {
      if (q && q.length >= 2) {
        this.patientService.search(q).subscribe(res => {
          if (res.success) this.patients = res.data;
        });
      } else if (!q) {
        this.loadAll();
      }
    });
  }

  loadAll(): void {
    this.loading = true;
    this.patientService.getAll().subscribe({
      next: res => {
        if (res.success) this.patients = res.data;
        this.loading = false;
      },
      error: () => {
        this.notification.error('Error al cargar pacientes. Verifique que el backend esté corriendo.');
        this.loading = false;
      }
    });
  }

  openEdit(p: Patient): void {
    this.editingPatient = p;
    this.editForm = this.fb.group({
      firstName:        [p.firstName,            Validators.required],
      lastName:         [p.lastName,             Validators.required],
      dpi:              [p.dpi,                  Validators.required],
      phone:            [p.phone            || ''],
      email:            [p.email            || ''],
      address:          [p.address          || ''],
      emergencyContact: [p.emergencyContact || ''],
      emergencyPhone:   [p.emergencyPhone   || ''],
      insuranceId:      [p.insuranceId      ?? null],
      insuranceNumber:  [p.insuranceNumber  || '']
    });
    this.editDialogOpen = true;
  }

  saveEdit(): void {
    if (!this.editingPatient || this.editForm.invalid) return;
    this.saving = true;
    this.patientService.update(this.editingPatient.id, this.editForm.value).subscribe({
      next: res => {
        if (res.success) {
          this.notification.success('Paciente actualizado exitosamente');
          this.editDialogOpen = false;
          this.loadAll();
        } else {
          this.notification.error(res.message || 'Error al actualizar');
        }
        this.saving = false;
      },
      error: err => {
        this.notification.error(err.error?.message || 'Error al actualizar paciente');
        this.saving = false;
      }
    });
  }
}
