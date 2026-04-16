import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../core/auth/auth.service';
import { TicketService } from '../../shared/services/ticket.service';
import { PrescriptionService } from '../../shared/services/lab.service';
import { LabService } from '../../shared/services/lab.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Ticket } from '../../core/models/ticket.model';
import { Prescription } from '../../core/models/lab.model';
import { LabOrder, SAMPLE_TYPE_LABELS } from '../../core/models/lab.model';

@Component({
  selector: 'app-mis-citas',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    MatCardModule, MatButtonModule, MatIconModule,
    MatTabsModule, MatChipsModule, MatProgressSpinnerModule
  ],
  template: `
    <div class="page-container">
      <div class="page-header">
        <div>
          <h1>Bienvenido, {{ userName }}</h1>
          <p class="subtitle">Portal del Paciente · BioCore Medical</p>
        </div>
        <button mat-stroked-button color="warn" (click)="logout()">
          <mat-icon>logout</mat-icon> Cerrar sesión
        </button>
      </div>

      <mat-tab-group animationDuration="200ms">

        <!-- TAB 1: Mis Turnos / Citas -->
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon class="tab-icon">confirmation_number</mat-icon>
            Mis Turnos ({{ tickets.length }})
          </ng-template>
          <div class="tab-content">
            <div *ngIf="loadingTickets" class="loading-state">
              <mat-spinner diameter="40"></mat-spinner>
              <p>Cargando turnos...</p>
            </div>

            <div class="ticket-card" *ngFor="let t of tickets">
              <div class="ticket-left">
                <div class="ticket-num">{{ t.ticketNumber }}</div>
                <div>
                  <div class="ticket-clinic">{{ t.clinicName }}</div>
                  <div class="ticket-type">{{ t.type }}</div>
                  <div class="ticket-date" *ngIf="t.createdAt">
                    {{ t.createdAt | date:'dd/MM/yyyy HH:mm' }}
                  </div>
                  <div class="ticket-doctor" *ngIf="t.doctorName">
                    Dr. {{ t.doctorName }}
                  </div>
                </div>
              </div>
              <span [class]="getStatusClass(t.status)" class="status-chip">
                {{ statusLabel(t.status) }}
              </span>
            </div>

            <div class="empty-state" *ngIf="!loadingTickets && tickets.length === 0">
              <mat-icon>event_available</mat-icon>
              <p>No tienes turnos registrados</p>
              <p class="hint">Preséntate en recepción para agendar tu cita.</p>
            </div>
          </div>
        </mat-tab>

        <!-- TAB 2: Mis Recetas -->
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon class="tab-icon">receipt_long</mat-icon>
            Mis Recetas ({{ prescriptions.length }})
          </ng-template>
          <div class="tab-content">
            <div *ngIf="loadingPrescriptions" class="loading-state">
              <mat-spinner diameter="40"></mat-spinner>
            </div>

            <mat-card class="rx-card" *ngFor="let rx of prescriptions">
              <mat-card-header>
                <mat-icon mat-card-avatar>medication</mat-icon>
                <mat-card-title>Receta #{{ rx.id }}</mat-card-title>
                <mat-card-subtitle>
                  {{ rx.createdAt | date:'dd/MM/yyyy' }}
                  <span *ngIf="rx.doctorName"> · Dr. {{ rx.doctorName }}</span>
                </mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="rx-items">
                  <div class="rx-item" *ngFor="let item of rx.items">
                    <mat-icon>medication_liquid</mat-icon>
                    <div>
                      <strong>{{ item.medicineName }}</strong>
                      <span class="rx-qty"> × {{ item.quantity }}</span>
                      <div class="rx-dosage" *ngIf="item.dosage">{{ item.dosage }}</div>
                    </div>
                    <span class="dispatched-badge" *ngIf="item.dispatched">Entregado</span>
                  </div>
                </div>
                <div class="rx-status">
                  <span [class]="getRxStatusClass(rx.status)">{{ rxStatusLabel(rx.status) }}</span>
                </div>
              </mat-card-content>
            </mat-card>

            <div class="empty-state" *ngIf="!loadingPrescriptions && prescriptions.length === 0">
              <mat-icon>receipt</mat-icon>
              <p>Sin recetas médicas registradas</p>
            </div>
          </div>
        </mat-tab>

        <!-- TAB 3: Mis Exámenes de Laboratorio -->
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon class="tab-icon">science</mat-icon>
            Laboratorio ({{ labOrders.length }})
          </ng-template>
          <div class="tab-content">
            <div *ngIf="loadingLab" class="loading-state">
              <mat-spinner diameter="40"></mat-spinner>
            </div>

            <div class="lab-card" *ngFor="let o of labOrders">
              <div class="lab-header">
                <div>
                  <strong>{{ o.labExamName || sampleLabel(o.sampleType) }}</strong>
                  <span class="lab-code" *ngIf="o.labExamCode">{{ o.labExamCode }}</span>
                </div>
                <span [class]="getLabStatusClass(o.status)" class="status-chip">
                  {{ labStatusLabel(o.status) }}
                </span>
              </div>
              <div class="lab-details">
                <div><mat-icon>calendar_today</mat-icon> Emitida: {{ o.orderDate }}</div>
                <div><mat-icon>event</mat-icon> Vence: {{ o.expirationDate }}</div>
                <div *ngIf="o.resultAvailableAt">
                  <mat-icon>notifications</mat-icon>
                  Resultados disponibles: {{ o.resultAvailableAt | date:'dd/MM/yyyy HH:mm' }}
                </div>
              </div>
            </div>

            <div class="empty-state" *ngIf="!loadingLab && labOrders.length === 0">
              <mat-icon>biotech</mat-icon>
              <p>Sin órdenes de laboratorio</p>
            </div>
          </div>
        </mat-tab>

      </mat-tab-group>
    </div>
  `,
  styles: [`
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .page-header h1 { font-size: 1.6rem; font-weight: 600; color: #1D6C61; margin: 0; }
    .subtitle { color: #757575; font-size: 0.9rem; margin: 4px 0 0; }
    .tab-content { padding: 24px 0; }
    .tab-icon { font-size: 18px; margin-right: 6px; vertical-align: middle; }

    .loading-state { display: flex; flex-direction: column; align-items: center; padding: 48px; gap: 16px; color: #9e9e9e; }

    .ticket-card {
      display: flex; align-items: center; justify-content: space-between;
      padding: 16px 20px; background: white; border-radius: 10px;
      margin-bottom: 12px; box-shadow: 0 2px 8px rgba(29,108,97,0.08);
      border-left: 4px solid #3EB9A8;
    }
    .ticket-left { display: flex; align-items: center; gap: 20px; }
    .ticket-num { font-size: 2rem; font-weight: 700; color: #1D6C61; min-width: 100px; }
    .ticket-clinic { font-weight: 600; font-size: 1rem; }
    .ticket-type { font-size: 0.82rem; color: #757575; }
    .ticket-date { font-size: 0.78rem; color: #9e9e9e; margin-top: 2px; }
    .ticket-doctor { font-size: 0.82rem; color: #1D6C61; }
    .status-chip { padding: 4px 14px; border-radius: 12px; font-size: 0.8rem; font-weight: 500; white-space: nowrap; }

    .rx-card { margin-bottom: 16px; }
    .rx-items { display: flex; flex-direction: column; gap: 10px; margin-top: 8px; }
    .rx-item { display: flex; align-items: flex-start; gap: 10px; padding: 8px; background: #f8f9ff; border-radius: 6px; }
    .rx-item mat-icon { color: #1D6C61; flex-shrink: 0; }
    .rx-qty { color: #757575; font-size: 0.85rem; }
    .rx-dosage { font-size: 0.8rem; color: #555; margin-top: 2px; }
    .dispatched-badge { margin-left: auto; background: #e8f5e9; color: #2e7d32; padding: 2px 8px; border-radius: 8px; font-size: 0.75rem; }
    .rx-status { margin-top: 12px; }

    .lab-card {
      padding: 16px; background: white; border-radius: 10px; margin-bottom: 12px;
      box-shadow: 0 2px 8px rgba(29,108,97,0.08); border: 1px solid #d4e8e5;
    }
    .lab-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
    .lab-code { background: #193A31; color: #3EB9A8; padding: 2px 8px; border-radius: 6px; font-size: 0.75rem; margin-left: 8px; }
    .lab-details { display: flex; flex-wrap: wrap; gap: 12px; font-size: 0.85rem; color: #555; }
    .lab-details div { display: flex; align-items: center; gap: 4px; }
    .lab-details mat-icon { font-size: 16px; width: 16px; height: 16px; color: #1D6C61; }

    .empty-state { text-align: center; padding: 48px; color: #9e9e9e; }
    .empty-state mat-icon { font-size: 56px; width: 56px; height: 56px; color: #3EB9A8; opacity: 0.4; margin-bottom: 8px; }
    .hint { font-size: 0.85rem; margin-top: 4px; }
  `]
})
export class MisCitasComponent implements OnInit {
  tickets: Ticket[] = [];
  prescriptions: Prescription[] = [];
  labOrders: LabOrder[] = [];
  loadingTickets = true;
  loadingPrescriptions = true;
  loadingLab = true;
  userName = '';

  constructor(
    private authService: AuthService,
    private ticketService: TicketService,
    private prescriptionService: PrescriptionService,
    private labService: LabService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    const user = this.authService.currentUser();
    this.userName = user ? `${user.firstName} ${user.lastName}` : 'Paciente';
    const patientId = this.authService.getPatientId();
    if (!patientId) {
      this.loadingTickets = false;
      this.loadingPrescriptions = false;
      this.loadingLab = false;
      this.notification.error('No se encontró el perfil de paciente vinculado a esta cuenta.');
      return;
    }
    this.loadData(patientId);
  }

  loadData(patientId: number): void {
    this.ticketService.getAll().subscribe({
      next: res => {
        if (res.success) {
          this.tickets = res.data.filter(t => t.patientId === patientId)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
        this.loadingTickets = false;
      },
      error: () => { this.loadingTickets = false; }
    });

    this.prescriptionService.getByPatient(patientId).subscribe({
      next: res => {
        if (res.success) this.prescriptions = res.data;
        this.loadingPrescriptions = false;
      },
      error: () => { this.loadingPrescriptions = false; }
    });

    this.labService.getByPatient(patientId).subscribe({
      next: res => {
        if (res.success) this.labOrders = res.data;
        this.loadingLab = false;
      },
      error: () => { this.loadingLab = false; }
    });
  }

  logout(): void { this.authService.logout(); }

  sampleLabel(s: string): string { return (SAMPLE_TYPE_LABELS as any)[s] ?? s; }

  getStatusClass(s: string): string {
    const m: Record<string, string> = {
      WAITING: 'status-waiting', BEING_CALLED: 'status-being-called',
      IN_CONSULTATION: 'status-in-consultation', COMPLETED: 'status-completed',
      ABSENT: 'status-absent', CANCELLED_NO_PAYMENT: 'status-absent'
    };
    return m[s] ?? '';
  }

  statusLabel(s: string): string {
    const m: Record<string, string> = {
      WAITING: 'En Espera', BEING_CALLED: 'Siendo Llamado',
      IN_CONSULTATION: 'En Consulta', COMPLETED: 'Atendido',
      ABSENT: 'Ausente', CANCELLED_NO_PAYMENT: 'Cancelado'
    };
    return m[s] ?? s;
  }

  getRxStatusClass(s: string): string {
    const m: Record<string, string> = {
      PENDING: 'status-waiting', DISPATCHED: 'status-completed',
      PARTIALLY_DISPATCHED: 'status-being-called', NOT_DISPATCHED: 'status-absent'
    };
    return m[s] ?? '';
  }

  rxStatusLabel(s: string): string {
    const m: Record<string, string> = {
      PENDING: 'Pendiente de entrega', DISPATCHED: 'Entregada completa',
      PARTIALLY_DISPATCHED: 'Entrega parcial', NOT_DISPATCHED: 'No despachada'
    };
    return m[s] ?? s;
  }

  getLabStatusClass(s: string): string {
    const m: Record<string, string> = {
      PENDING: 'status-waiting', SAMPLE_COLLECTED: 'status-being-called',
      SCHEDULED: 'status-in-consultation', COMPLETED: 'status-completed', EXPIRED: 'status-absent'
    };
    return m[s] ?? '';
  }

  labStatusLabel(s: string): string {
    const m: Record<string, string> = {
      PENDING: 'Pendiente', SAMPLE_COLLECTED: 'Muestra tomada',
      SCHEDULED: 'Cita programada', COMPLETED: 'Resultados listos', EXPIRED: 'Expirada'
    };
    return m[s] ?? s;
  }
}
