import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { interval, Subscription } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';
import { ReportService } from '../../../shared/services/payment.service';
import { TicketService } from '../../../shared/services/ticket.service';
import { AuthService } from '../../../core/auth/auth.service';
import { Dashboard } from '../../../core/models/payment.model';
import { Ticket } from '../../../core/models/ticket.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, RouterLink, MatCardModule, MatIconModule,
    MatButtonModule, MatProgressSpinnerModule, MatChipsModule
  ],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Dashboard</h1>
        <span class="realtime-badge">
          <mat-icon>radio_button_checked</mat-icon> En tiempo real
        </span>
      </div>

      <!-- Stats Cards -->
      <div class="dashboard-grid" *ngIf="dashboard">
        <mat-card class="stat-card stat-blue">
          <mat-icon>today</mat-icon>
          <div class="stat-number">{{ dashboard.totalPatientsToday }}</div>
          <div class="stat-label">Pacientes Hoy</div>
        </mat-card>
        <mat-card class="stat-card stat-orange">
          <mat-icon>hourglass_empty</mat-icon>
          <div class="stat-number">{{ dashboard.patientsWaiting }}</div>
          <div class="stat-label">En Espera</div>
        </mat-card>
        <mat-card class="stat-card stat-green">
          <mat-icon>medical_services</mat-icon>
          <div class="stat-number">{{ dashboard.patientsInConsultation }}</div>
          <div class="stat-label">En Consulta</div>
        </mat-card>
        <mat-card class="stat-card stat-purple">
          <mat-icon>check_circle</mat-icon>
          <div class="stat-number">{{ dashboard.patientsAttended }}</div>
          <div class="stat-label">Atendidos</div>
        </mat-card>
        <mat-card class="stat-card stat-red">
          <mat-icon>cancel</mat-icon>
          <div class="stat-number">{{ dashboard.patientsCancelled }}</div>
          <div class="stat-label">Cancelados</div>
        </mat-card>
        <mat-card class="stat-card stat-teal">
          <mat-icon>payments</mat-icon>
          <div class="stat-number">{{ dashboard.totalPaidToday }}</div>
          <div class="stat-label">Pagos Hoy</div>
        </mat-card>
      </div>

      <!-- Loading -->
      <div class="flex-center mt-24" *ngIf="!dashboard">
        <mat-spinner diameter="48"></mat-spinner>
      </div>

      <!-- Quick Actions -->
      <mat-card class="mt-24">
        <mat-card-header>
          <mat-card-title>Acciones Rápidas</mat-card-title>
        </mat-card-header>
        <mat-card-content class="quick-actions">
          <button mat-raised-button color="primary" routerLink="/patients/register">
            <mat-icon>person_add</mat-icon> Registrar Paciente
          </button>
          <button mat-raised-button color="accent" routerLink="/emergency"
                  *ngIf="canAccessEmergency()">
            <mat-icon>emergency</mat-icon> Emergencia
          </button>
          <button mat-raised-button routerLink="/patients">
            <mat-icon>search</mat-icon> Buscar Paciente
          </button>
          <button mat-raised-button routerLink="/reports" *ngIf="isAdmin()">
            <mat-icon>bar_chart</mat-icon> Reportes
          </button>
        </mat-card-content>
      </mat-card>

      <!-- Active Tickets -->
      <mat-card class="mt-24" *ngIf="activeTickets.length > 0">
        <mat-card-header>
          <mat-card-title>Pacientes Siendo Llamados</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="queue-ticket" *ngFor="let ticket of activeTickets">
            <div class="ticket-number">{{ ticket.ticketNumber }}</div>
            <div class="ticket-info">
              <div class="ticket-patient">{{ ticket.patientName }}</div>
              <div class="ticket-meta">{{ ticket.clinicName }} · {{ ticket.type }}</div>
            </div>
            <span class="status-being-called" style="padding:4px 12px;border-radius:12px;font-size:0.8rem;">
              Siendo Llamado
            </span>
            <span class="emergency-badge" *ngIf="ticket.priority === 'URGENT'">URGENTE</span>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .page-header { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
    .page-header h1 { font-size: 1.6rem; font-weight: 500; color: #1565c0; margin: 0; }
    .realtime-badge {
      display: flex; align-items: center; gap: 4px;
      background: #e8f5e9; color: #2e7d32; padding: 4px 12px;
      border-radius: 16px; font-size: 0.8rem; font-weight: 500;
    }
    .realtime-badge mat-icon { font-size: 16px; width: 16px; height: 16px; }
    .stat-card { padding: 24px; text-align: center; color: white; }
    .stat-card mat-icon { font-size: 36px; width: 36px; height: 36px; opacity: 0.85; }
    .stat-number { font-size: 2.5rem; font-weight: 700; line-height: 1; margin: 8px 0; }
    .stat-label { font-size: 0.85rem; opacity: 0.9; }
    .stat-blue { background: linear-gradient(135deg, #1565c0, #1976d2); }
    .stat-orange { background: linear-gradient(135deg, #e65100, #f57c00); }
    .stat-green { background: linear-gradient(135deg, #2e7d32, #388e3c); }
    .stat-purple { background: linear-gradient(135deg, #6a1b9a, #7b1fa2); }
    .stat-red { background: linear-gradient(135deg, #b71c1c, #c62828); }
    .stat-teal { background: linear-gradient(135deg, #00695c, #00796b); }
    .quick-actions { display: flex; gap: 12px; flex-wrap: wrap; padding: 8px 0; }
  `]
})
export class DashboardComponent implements OnInit, OnDestroy {
  dashboard: Dashboard | null = null;
  activeTickets: Ticket[] = [];
  private sub!: Subscription;

  constructor(
    private reportService: ReportService,
    private ticketService: TicketService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // RN-R03: Actualización en tiempo real cada 10 segundos
    this.sub = interval(10000).pipe(startWith(0),
      switchMap(() => this.reportService.getDashboard())
    ).subscribe({
      next: res => { if (res.success) this.dashboard = res.data; },
      error: () => {
        // Si el endpoint falla, mostrar dashboard vacío en vez de spinner infinito
        this.dashboard = {
          totalPatientsToday: 0, patientsWaiting: 0, patientsInConsultation: 0,
          patientsAttended: 0, patientsCancelled: 0, totalPaidToday: 0
        } as any;
      }
    });

    this.loadActiveTickets();
  }

  loadActiveTickets(): void {
    const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Guatemala' }).format(new Date());
    this.ticketService.getAll().subscribe({
      next: res => {
        if (res.success) {
          this.activeTickets = res.data.filter(t =>
            t.status === 'BEING_CALLED' &&
            (!t.scheduledDate || t.scheduledDate === today)
          );
        }
      },
      error: () => { this.activeTickets = []; }
    });
  }

  isAdmin(): boolean { return this.authService.hasRole('ADMIN'); }
  canAccessEmergency(): boolean { return this.authService.hasRole('ADMIN', 'HEALTH_STAFF', 'NURSE'); }

  ngOnDestroy(): void { this.sub?.unsubscribe(); }
}
