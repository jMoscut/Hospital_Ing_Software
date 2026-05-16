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
          <mat-icon>person_off</mat-icon>
          <div class="stat-number">{{ dashboard.patientsAbsent }}</div>
          <div class="stat-label">Ausentes</div>
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
    .page-header {
      display: flex; align-items: center; gap: 16px; margin-bottom: 28px;
      padding-bottom: 20px; border-bottom: 1px solid #C5CDD8;
    }
    .page-header h1 {
      font-size: 1.65rem; font-weight: 700; color: #243C2C; margin: 0; letter-spacing: -0.3px;
    }
    .realtime-badge {
      display: flex; align-items: center; gap: 6px;
      background: #EDE9C0; color: #59789F;
      padding: 5px 14px; border-radius: 20px; font-size: 0.8rem; font-weight: 600;
      border: 1px solid rgba(36,60,44,0.2); margin-left: auto;
    }
    .realtime-badge mat-icon { font-size: 14px !important; width: 14px !important; height: 14px !important; color: #7A9445; }

    .stat-card {
      padding: 28px 24px 24px; text-align: center; color: white;
      border-radius: 18px !important; border: none !important; position: relative; overflow: hidden;
      box-shadow: 0 4px 24px rgba(0,0,0,0.18) !important;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .stat-card:hover { transform: translateY(-4px); box-shadow: 0 10px 32px rgba(0,0,0,0.25) !important; }
    .stat-card::before {
      content: ''; position: absolute; top: -24px; right: -24px;
      width: 90px; height: 90px; border-radius: 50%;
      background: rgba(255,255,255,0.08); pointer-events: none;
    }
    .stat-card::after {
      content: ''; position: absolute; bottom: -32px; left: -16px;
      width: 100px; height: 100px; border-radius: 50%;
      background: rgba(255,255,255,0.05); pointer-events: none;
    }
    .stat-card mat-icon {
      font-size: 36px !important; width: 36px !important; height: 36px !important;
      display: block; margin: 0 auto 14px; opacity: 0.95;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
    }
    .stat-number { font-size: 3rem; font-weight: 800; line-height: 1; margin: 0 0 10px; letter-spacing: -1px; color: white !important; }
    .stat-label { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.8px; text-transform: uppercase; opacity: 0.88; color: white !important; }
    .stat-card, .stat-card * { color: white !important; }

    /* Bosque palette — each card a distinct color */
    .stat-blue   { background: linear-gradient(145deg, #1a2f22, #243C2C) !important; }  /* Dark Green — Pacientes Hoy */
    .stat-orange { background: linear-gradient(145deg, #3d5c80, #59789F) !important; }  /* Glaucous — En Espera */
    .stat-green  { background: linear-gradient(145deg, #5a6e30, #7A9445) !important; }  /* Moss Green — En Consulta */
    .stat-purple { background: linear-gradient(145deg, #243C2C, #59789F) !important; }  /* Dark+Glaucous — Atendidos */
    .stat-red    { background: linear-gradient(145deg, #9b1212, #c62828) !important; }  /* Red — Ausentes (semántico) */
    .stat-teal   { background: linear-gradient(145deg, #59789F, #7A9445) !important; }  /* Glaucous+Moss — Pagos Hoy */

    .quick-actions { display: flex; gap: 12px; flex-wrap: wrap; padding: 8px 0; }
    ::ng-deep .mat-mdc-card .mat-mdc-card-title { font-size: 1.1rem !important; font-weight: 600 !important; color: #243C2C !important; }

    .queue-ticket { transition: background 0.15s; }
    .queue-ticket:hover { background: #F0EDD5 !important; }
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
          patientsAttended: 0, patientsAbsent: 0, totalPaidToday: 0
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
  canAccessEmergency(): boolean { return this.authService.hasRole('HEALTH_STAFF', 'NURSE'); }

  ngOnDestroy(): void { this.sub?.unsubscribe(); }
}
