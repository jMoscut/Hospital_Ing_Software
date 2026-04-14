import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { interval, Subscription } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { ReportService } from '../../shared/services/payment.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Dashboard } from '../../core/models/payment.model';

@Component({
  selector: 'app-reporting',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatCardModule, MatButtonModule,
    MatIconModule, MatFormFieldModule, MatInputModule, MatTableModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Reportería y Estadísticas</h1>
        <span class="realtime-badge">
          <mat-icon>radio_button_checked</mat-icon> Actualización en tiempo real
        </span>
      </div>

      <!-- Dashboard en tiempo real -->
      <div class="dashboard-grid" *ngIf="dashboard">
        <mat-card class="stat-card" style="background:linear-gradient(135deg,#1565c0,#1976d2);color:white">
          <mat-icon>today</mat-icon>
          <div class="stat-number">{{ dashboard.totalPatientsToday }}</div>
          <div class="stat-label">Pacientes Hoy</div>
        </mat-card>
        <mat-card class="stat-card" style="background:linear-gradient(135deg,#e65100,#f57c00);color:white">
          <mat-icon>hourglass_empty</mat-icon>
          <div class="stat-number">{{ dashboard.patientsWaiting }}</div>
          <div class="stat-label">En Espera</div>
        </mat-card>
        <mat-card class="stat-card" style="background:linear-gradient(135deg,#2e7d32,#388e3c);color:white">
          <mat-icon>check_circle</mat-icon>
          <div class="stat-number">{{ dashboard.patientsAttended }}</div>
          <div class="stat-label">Atendidos</div>
        </mat-card>
        <mat-card class="stat-card" style="background:linear-gradient(135deg,#b71c1c,#c62828);color:white">
          <mat-icon>cancel</mat-icon>
          <div class="stat-number">{{ dashboard.patientsCancelled }}</div>
          <div class="stat-label">Cancelados</div>
        </mat-card>
        <mat-card class="stat-card" style="background:linear-gradient(135deg,#00695c,#00796b);color:white">
          <mat-icon>payments</mat-icon>
          <div class="stat-number">{{ dashboard.totalPaidToday }}</div>
          <div class="stat-label">Pagos Hoy</div>
        </mat-card>
      </div>

      <!-- Búsqueda de Expediente (FA01: RN-R01) -->
      <mat-card class="mt-24">
        <mat-card-header>
          <mat-card-title>Búsqueda de Expediente por Código</mat-card-title>
          <mat-card-subtitle>Los reportes estadísticos no muestran nombres de pacientes</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="search-row">
            <mat-form-field appearance="outline">
              <mat-label>Código Único de Paciente</mat-label>
              <mat-icon matPrefix>search</mat-icon>
              <input matInput [formControl]="searchCtrl" placeholder="PAT-0001">
            </mat-form-field>
            <button mat-raised-button color="primary" (click)="searchPatient()" [disabled]="!searchCtrl.value">
              Buscar Expediente
            </button>
          </div>

          <div class="expedient-panel" *ngIf="expedient">
            <h3>Expediente: {{ expedient.patient?.patientCode }}</h3>
            <div class="exp-summary">
              <div class="exp-stat">
                <span class="exp-num">{{ expedient.tickets?.length || 0 }}</span>
                <span class="exp-label">Visitas</span>
              </div>
              <div class="exp-stat">
                <span class="exp-num">{{ expedient.payments?.length || 0 }}</span>
                <span class="exp-label">Pagos</span>
              </div>
            </div>

            <!-- Historial de visitas (anonimizado) -->
            <table mat-table [dataSource]="expedient.tickets || []" class="mt-16">
              <ng-container matColumnDef="ticket">
                <th mat-header-cell *matHeaderCellDef>Ticket</th>
                <td mat-cell *matCellDef="let t">{{ t.ticketNumber }}</td>
              </ng-container>
              <ng-container matColumnDef="clinic">
                <th mat-header-cell *matHeaderCellDef>Clínica</th>
                <td mat-cell *matCellDef="let t">{{ t.clinicName }}</td>
              </ng-container>
              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>Estado</th>
                <td mat-cell *matCellDef="let t">{{ t.status }}</td>
              </ng-container>
              <ng-container matColumnDef="date">
                <th mat-header-cell *matHeaderCellDef>Fecha</th>
                <td mat-cell *matCellDef="let t">{{ t.createdAt | date:'dd/MM/yyyy' }}</td>
              </ng-container>
              <tr mat-header-row *matHeaderRowDef="ticketColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: ticketColumns;"></tr>
            </table>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Info de exportación -->
      <mat-card class="mt-24">
        <mat-card-header>
          <mat-card-title>Exportación de Reportes</mat-card-title>
          <mat-card-subtitle>Solo el Administrador puede exportar reportes financieros</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="export-buttons">
            <button mat-raised-button color="primary">
              <mat-icon>picture_as_pdf</mat-icon> Reporte de Productividad
            </button>
            <button mat-raised-button color="accent">
              <mat-icon>picture_as_pdf</mat-icon> Reporte por Área
            </button>
            <button mat-raised-button>
              <mat-icon>picture_as_pdf</mat-icon> Reporte de Farmacia
            </button>
          </div>
          <p class="hint-text mt-16">* La exportación a PDF requiere integración con librería PDF en el backend.</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .page-header h1 { font-size: 1.6rem; font-weight: 500; color: #1565c0; margin: 0; }
    .realtime-badge { display: flex; align-items: center; gap: 4px; background: #e8f5e9; color: #2e7d32; padding: 4px 12px; border-radius: 16px; font-size: 0.8rem; }
    .stat-card { padding: 24px; text-align: center; }
    .stat-card mat-icon { font-size: 36px; width: 36px; height: 36px; opacity: 0.85; }
    .stat-number { font-size: 2.5rem; font-weight: 700; line-height: 1; margin: 8px 0; }
    .stat-label { font-size: 0.85rem; opacity: 0.9; }
    .search-row { display: flex; gap: 12px; align-items: flex-end; margin-bottom: 16px; }
    .expedient-panel { background: #f8f9ff; border-radius: 8px; padding: 16px; }
    .expedient-panel h3 { color: #1565c0; margin-bottom: 12px; }
    .exp-summary { display: flex; gap: 24px; margin-bottom: 16px; }
    .exp-stat { text-align: center; background: white; padding: 16px 24px; border-radius: 8px; }
    .exp-num { display: block; font-size: 2rem; font-weight: 700; color: #1565c0; }
    .exp-label { font-size: 0.8rem; color: #757575; }
    .mt-16 { margin-top: 16px; }
    .mt-24 { margin-top: 24px; }
    .export-buttons { display: flex; gap: 12px; flex-wrap: wrap; }
    .hint-text { font-size: 0.85rem; color: #757575; }
  `]
})
export class ReportingComponent implements OnInit, OnDestroy {
  dashboard: Dashboard | null = null;
  expedient: any = null;
  searchCtrl = new FormControl('');
  ticketColumns = ['ticket', 'clinic', 'status', 'date'];
  private sub!: Subscription;

  constructor(
    private reportService: ReportService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    // RN-R03: Actualización en tiempo real
    this.sub = interval(15000).pipe(
      startWith(0),
      switchMap(() => this.reportService.getDashboard())
    ).subscribe(res => {
      if (res.success) this.dashboard = res.data;
    });
  }

  searchPatient(): void {
    const code = this.searchCtrl.value;
    if (!code) return;
    this.reportService.getPatientExpedient(code).subscribe({
      next: res => {
        if (res.success) {
          this.expedient = res.data;
        } else {
          this.notification.error('Paciente no encontrado');
        }
      },
      error: () => this.notification.error('Paciente no encontrado con código: ' + code)
    });
  }

  ngOnDestroy(): void { this.sub?.unsubscribe(); }
}
