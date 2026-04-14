import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PatientService } from '../../../shared/services/patient.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { Patient } from '../../../core/models/patient.model';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    CommonModule, RouterLink, ReactiveFormsModule,
    MatTableModule, MatInputModule, MatFormFieldModule,
    MatButtonModule, MatIconModule, MatCardModule,
    MatChipsModule, MatProgressSpinnerModule
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
  `,
  styles: [`
    .search-field { width: 100%; max-width: 400px; margin-bottom: 16px; }
    .w-full { width: 100%; }
    .clickable-row { cursor: pointer; }
    .clickable-row:hover { background: #f5f5f5; }
  `]
})
export class PatientListComponent implements OnInit {
  patients: Patient[] = [];
  loading = true;
  searchCtrl = new FormControl('');
  columns = ['patientCode', 'dpi', 'name', 'phone', 'insurance', 'actions'];

  constructor(private patientService: PatientService, private notification: NotificationService) {}

  ngOnInit(): void {
    this.loadAll();
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
      error: err => {
        this.notification.error('Error al cargar pacientes. Verifique que el backend esté corriendo.');
        this.loading = false;
      }
    });
  }
}
