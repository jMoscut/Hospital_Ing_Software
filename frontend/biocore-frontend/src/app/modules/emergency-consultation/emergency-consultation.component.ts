import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { interval, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { EmergencyService } from '../../shared/services/payment.service';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-emergency-consultation',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatCardModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatDividerModule, MatProgressSpinnerModule
  ],
  template: `
    <div class="page-container">
      <div class="page-header">
        <mat-icon class="header-icon">emergency</mat-icon>
        <h1>Portal de Emergencias — Médico</h1>
        <span class="realtime-badge">
          <mat-icon>radio_button_checked</mat-icon> En tiempo real
        </span>
      </div>

      <p class="subtitle">Pacientes de emergencia atendidos hoy asignados a usted. El sistema los mueve aquí automáticamente desde la pantalla de llamado.</p>

      <!-- Loading -->
      <div class="flex-center mt-24" *ngIf="loading">
        <mat-spinner diameter="48"></mat-spinner>
      </div>

      <!-- Empty -->
      <mat-card class="empty-card" *ngIf="!loading && tickets.length === 0">
        <mat-icon class="big-icon">inbox</mat-icon>
        <p>No hay emergencias atendidas hoy.</p>
        <p class="hint">Los pacientes aparecerán aquí después de ser marcados como atendidos.</p>
      </mat-card>

      <!-- Ticket cards -->
      <div class="tickets-list" *ngIf="!loading">
        <mat-card class="ticket-card" *ngFor="let t of tickets" [class.closed]="t.reportClosed">
          <!-- Header -->
          <div class="ticket-header">
            <div class="ticket-number">{{ t.ticketNumber }}</div>
            <div class="ticket-info">
              <div class="patient-name">{{ t.patientName }}</div>
              <div class="patient-meta">
                DPI: {{ t.patientDpi }}
                <span *ngIf="t.patientEmail" class="email-chip">
                  <mat-icon style="font-size:12px;width:12px;height:12px;vertical-align:middle">email</mat-icon>
                  {{ t.patientEmail }}
                </span>
              </div>
              <div class="motive" *ngIf="t.motive">
                <mat-icon style="font-size:12px;width:12px;height:12px">info</mat-icon>
                Motivo: {{ t.motive }}
              </div>
            </div>
            <span class="status-chip" [class.open]="!t.reportClosed" [class.done]="t.reportClosed">
              <mat-icon style="font-size:14px;width:14px;height:14px;vertical-align:middle">
                {{ t.reportClosed ? 'check_circle' : 'pending' }}
              </mat-icon>
              {{ t.reportClosed ? 'Reporte Cerrado' : 'Pendiente Reporte' }}
            </span>
          </div>

          <mat-divider></mat-divider>

          <!-- Vital signs -->
          <div class="vitals-section" *ngIf="t.bloodPressure || t.heartRate || t.temperature || t.weight || t.height || t.oxygenSaturation">
            <div class="section-label">
              <mat-icon>monitor_heart</mat-icon> Signos Vitales
              <span class="recorded-by" *ngIf="t.vitalsRecordedAt">
                {{ t.vitalsRecordedAt | date:'HH:mm' }} — Personal de Salud
              </span>
            </div>
            <div class="vitals-grid">
              <div class="vital-item" *ngIf="t.bloodPressure">
                <span class="vital-label">Presión Arterial</span>
                <span class="vital-value">{{ t.bloodPressure }}</span>
              </div>
              <div class="vital-item" *ngIf="t.heartRate">
                <span class="vital-label">Frec. Cardíaca</span>
                <span class="vital-value">{{ t.heartRate }} <small>bpm</small></span>
              </div>
              <div class="vital-item" *ngIf="t.temperature">
                <span class="vital-label">Temperatura</span>
                <span class="vital-value">{{ t.temperature }} <small>°C</small></span>
              </div>
              <div class="vital-item" *ngIf="t.weight">
                <span class="vital-label">Peso</span>
                <span class="vital-value">{{ t.weight }} <small>kg</small></span>
              </div>
              <div class="vital-item" *ngIf="t.height">
                <span class="vital-label">Talla</span>
                <span class="vital-value">{{ t.height }} <small>cm</small></span>
              </div>
              <div class="vital-item" *ngIf="t.oxygenSaturation">
                <span class="vital-label">SpO₂</span>
                <span class="vital-value">{{ t.oxygenSaturation }} <small>%</small></span>
              </div>
            </div>
          </div>

          <div class="vitals-section no-vitals" *ngIf="!t.bloodPressure && !t.heartRate && !t.temperature && !t.weight && !t.height && !t.oxygenSaturation">
            <mat-icon>info_outline</mat-icon> Sin signos vitales registrados
          </div>

          <!-- Closed report summary -->
          <div class="report-closed-summary" *ngIf="t.reportClosed">
            <div class="section-label"><mat-icon>description</mat-icon> Reporte Médico</div>
            <div class="report-field" *ngIf="t.diagnosis">
              <span class="report-field-label">Diagnóstico:</span>
              <span class="report-field-value">{{ t.diagnosis }}</span>
            </div>
            <div class="report-field" *ngIf="t.treatment">
              <span class="report-field-label">Tratamiento:</span>
              <span class="report-field-value">{{ t.treatment }}</span>
            </div>
            <div class="report-field" *ngIf="t.medications">
              <span class="report-field-label">Medicamentos:</span>
              <span class="report-field-value">{{ t.medications }}</span>
            </div>
            <div class="report-meta">
              Cerrado: {{ t.reportClosedAt | date:'dd/MM/yyyy HH:mm' }}
              <span *ngIf="t.patientEmail"> · Email enviado a {{ t.patientEmail }}</span>
            </div>
          </div>

          <!-- Open report form -->
          <div class="report-form" *ngIf="!t.reportClosed">
            <div *ngIf="openReportId !== t.ticketId">
              <button mat-raised-button color="warn" (click)="openReport(t.ticketId)">
                <mat-icon>edit_note</mat-icon> Reporte de Paciente
              </button>
            </div>

            <div *ngIf="openReportId === t.ticketId" class="report-fields">
              <div class="section-label"><mat-icon>description</mat-icon> Reporte Médico</div>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Diagnóstico</mat-label>
                <textarea matInput rows="3" [(ngModel)]="form.diagnosis"
                          placeholder="Describa el diagnóstico del paciente"></textarea>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Tratamiento</mat-label>
                <textarea matInput rows="3" [(ngModel)]="form.treatment"
                          placeholder="Procedimientos y tratamientos aplicados"></textarea>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Medicamentos indicados</mat-label>
                <textarea matInput rows="3" [(ngModel)]="form.medications"
                          placeholder="Medicamentos prescritos, dosis e instrucciones"></textarea>
              </mat-form-field>

              <div class="form-actions">
                <button mat-button (click)="cancelReport()">Cancelar</button>
                <button mat-raised-button color="primary"
                        [disabled]="submitting || !form.diagnosis.trim()"
                        (click)="submitReport(t.ticketId)">
                  <mat-spinner diameter="18" *ngIf="submitting" style="display:inline-block;margin-right:6px"></mat-spinner>
                  <mat-icon *ngIf="!submitting">lock</mat-icon>
                  Cerrar Reporte
                </button>
              </div>

              <div class="email-notice" *ngIf="t.patientEmail">
                <mat-icon>email</mat-icon>
                Se enviará copia del reporte a <strong>{{ t.patientEmail }}</strong>
              </div>
            </div>
          </div>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .page-container { max-width: 900px; margin: 0 auto; padding: 24px; }
    .page-header { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
    .page-header h1 { font-size: 1.5rem; font-weight: 500; color: #b71c1c; margin: 0; }
    .header-icon { font-size: 32px; width: 32px; height: 32px; color: #b71c1c; }
    .realtime-badge { display: flex; align-items: center; gap: 4px; background: #e8f5e9; color: #2e7d32; padding: 4px 12px; border-radius: 16px; font-size: 0.8rem; margin-left: auto; }
    .realtime-badge mat-icon { font-size: 16px; width: 16px; height: 16px; }
    .subtitle { color: #757575; font-size: 0.9rem; margin-bottom: 24px; }
    .tickets-list { display: flex; flex-direction: column; gap: 20px; }

    .ticket-card { padding: 20px; border-left: 4px solid #ef5350; }
    .ticket-card.closed { border-left-color: #66bb6a; }

    .ticket-header { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 16px; }
    .ticket-number { font-size: 1.4rem; font-weight: 700; color: #b71c1c; min-width: 60px; }
    .ticket-info { flex: 1; }
    .patient-name { font-size: 1.05rem; font-weight: 600; }
    .patient-meta { font-size: 0.8rem; color: #757575; margin-top: 2px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
    .email-chip { background: #e3f2fd; color: #1565c0; padding: 1px 8px; border-radius: 10px; font-size: 0.75rem; display: flex; align-items: center; gap: 3px; }
    .motive { font-size: 0.8rem; color: #555; margin-top: 4px; display: flex; align-items: center; gap: 4px; }

    .status-chip { display: flex; align-items: center; gap: 4px; padding: 4px 12px; border-radius: 12px; font-size: 0.8rem; font-weight: 600; white-space: nowrap; }
    .status-chip.open { background: #fff3e0; color: #e65100; }
    .status-chip.done { background: #e8f5e9; color: #2e7d32; }

    .vitals-section { margin: 16px 0; }
    .no-vitals { display: flex; align-items: center; gap: 6px; color: #9e9e9e; font-size: 0.85rem; }
    .section-label { display: flex; align-items: center; gap: 6px; font-size: 0.85rem; font-weight: 600; color: #1D6C61; margin-bottom: 10px; }
    .recorded-by { font-size: 0.75rem; color: #9e9e9e; font-weight: 400; margin-left: auto; }
    .vitals-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
    .vital-item { background: #f5fffe; border: 1px solid #d0ede9; border-radius: 6px; padding: 8px 12px; }
    .vital-label { display: block; font-size: 0.7rem; color: #757575; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px; }
    .vital-value { font-size: 1.1rem; font-weight: 700; color: #1D6C61; }

    .report-form { margin-top: 16px; }
    .report-fields { margin-top: 12px; }
    .full-width { width: 100%; margin-bottom: 4px; }
    .form-actions { display: flex; gap: 12px; align-items: center; margin-top: 8px; }
    .email-notice { display: flex; align-items: center; gap: 6px; margin-top: 12px; font-size: 0.82rem; color: #1565c0; background: #e3f2fd; padding: 8px 12px; border-radius: 6px; }
    .email-notice mat-icon { font-size: 16px; width: 16px; height: 16px; }

    .report-closed-summary { margin-top: 16px; background: #f1f8e9; border: 1px solid #c5e1a5; border-radius: 8px; padding: 14px 16px; }
    .report-field { display: flex; gap: 8px; margin-bottom: 6px; font-size: 0.88rem; }
    .report-field-label { font-weight: 600; color: #33691e; min-width: 110px; }
    .report-field-value { color: #333; }
    .report-meta { font-size: 0.75rem; color: #689f38; margin-top: 8px; }

    .empty-card { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px; text-align: center; }
    .big-icon { font-size: 64px; width: 64px; height: 64px; color: #9e9e9e; margin-bottom: 16px; }
    .hint { font-size: 0.85rem; color: #9e9e9e; }
    .flex-center { display: flex; justify-content: center; }
    .mt-24 { margin-top: 24px; }
  `]
})
export class EmergencyConsultationComponent implements OnInit, OnDestroy {
  tickets: any[] = [];
  loading = true;
  openReportId: number | null = null;
  submitting = false;
  form = { diagnosis: '', treatment: '', medications: '' };

  private sub!: Subscription;

  constructor(
    private emergencyService: EmergencyService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.sub = interval(10000).pipe(startWith(0)).subscribe(() => this.loadTickets());
  }

  loadTickets(): void {
    this.emergencyService.getMyEmergencyTickets().subscribe({
      next: res => {
        if (res.success) this.tickets = res.data;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  openReport(ticketId: number): void {
    this.openReportId = ticketId;
    this.form = { diagnosis: '', treatment: '', medications: '' };
  }

  cancelReport(): void {
    this.openReportId = null;
    this.form = { diagnosis: '', treatment: '', medications: '' };
  }

  submitReport(ticketId: number): void {
    if (!this.form.diagnosis?.trim()) {
      this.notification.error('El diagnóstico es obligatorio');
      return;
    }
    this.submitting = true;
    this.emergencyService.submitMedicalReport(ticketId, this.form).subscribe({
      next: res => {
        if (res.success) {
          this.notification.success('Reporte cerrado exitosamente');
          this.openReportId = null;
          this.form = { diagnosis: '', treatment: '', medications: '' };
          this.loadTickets();
        }
        this.submitting = false;
      },
      error: err => {
        this.notification.error(err.error?.message || 'Error al cerrar reporte');
        this.submitting = false;
      }
    });
  }

  ngOnDestroy(): void { this.sub?.unsubscribe(); }
}
