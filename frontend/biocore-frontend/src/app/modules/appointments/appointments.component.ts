import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClinicService, TicketService } from '../../shared/services/ticket.service';
import { NotificationService } from '../../shared/services/notification.service';
import { AuthService } from '../../core/auth/auth.service';
import { Clinic, Ticket } from '../../core/models/ticket.model';

const NOTIF_KEY = 'biocore_notification_settings';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule,
    MatCardModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatTabsModule, MatProgressSpinnerModule, MatChipsModule, MatTooltipModule
  ],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1><mat-icon style="vertical-align:middle;margin-right:8px">queue</mat-icon>Monitoreo de Cola</h1>
        <div class="header-actions">
          <button mat-stroked-button color="primary" (click)="openCallScreen()" matTooltip="Abrir pantalla de sala de espera en nueva ventana">
            <mat-icon>tv</mat-icon> Pantalla de Sala
          </button>
          <button mat-stroked-button (click)="loadAll()">
            <mat-icon>refresh</mat-icon> Actualizar
          </button>
        </div>
      </div>

      <!-- BANNER: Turno siendo llamado actualmente (RN-CT04) -->
      <div class="calling-banner" *ngIf="calledTickets.length > 0">
        <div class="calling-label">
          <mat-icon>campaign</mat-icon> LLAMANDO AHORA
        </div>
        <div class="calling-tickets">
          <div class="calling-item" *ngFor="let t of calledTickets">
            <span class="calling-num">{{ t.ticketNumber }}</span>
            <span class="calling-name">{{ t.patientName }}</span>
            <span class="calling-clinic">→ {{ t.clinicName }}</span>
            <button mat-icon-button color="warn" (click)="markAbsent(t.id)" matTooltip="Marcar ausente">
              <mat-icon>person_off</mat-icon>
            </button>
          </div>
        </div>
      </div>

      <mat-tab-group animationDuration="200ms">

        <!-- TAB 1: Cola del día + llamado -->
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon class="tab-icon">today</mat-icon>
            Cola ({{ activeTickets.length }})
          </ng-template>
          <div class="tab-content">

            <!-- Panel de llamado (RN-CT02, RN-CT03, RN-CT04) -->
            <mat-card class="call-panel" *ngIf="canManage()">
              <mat-card-header>
                <mat-icon mat-card-avatar style="color:#1D6C61">campaign</mat-icon>
                <mat-card-title>Llamar Paciente</mat-card-title>
                <mat-card-subtitle>RN-CT03: orden cronológico · RN-CT04: visual + audio</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="call-controls">
                  <mat-form-field appearance="outline" class="call-clinic-field">
                    <mat-label>Clínica a llamar</mat-label>
                    <mat-icon matPrefix>local_hospital</mat-icon>
                    <mat-select [(ngModel)]="callClinicId" [ngModelOptions]="{standalone: true}">
                      <mat-option [value]="0" disabled>— Seleccione clínica —</mat-option>
                      <mat-option *ngFor="let c of clinics" [value]="c.id">{{ c.name }}</mat-option>
                    </mat-select>
                  </mat-form-field>
                  <button mat-raised-button color="primary"
                          [disabled]="!callClinicId || calling"
                          (click)="callNextTicket()">
                    <mat-spinner *ngIf="calling" diameter="20"></mat-spinner>
                    <mat-icon *ngIf="!calling">campaign</mat-icon>
                    {{ calling ? 'Llamando...' : 'Llamar Siguiente' }}
                  </button>
                </div>
                <p class="call-hint">
                  <mat-icon style="font-size:15px;vertical-align:middle">info</mat-icon>
                  Llama al primer paciente en espera de la clínica seleccionada. El turno se mostrará en la pantalla de sala de espera.
                </p>
              </mat-card-content>
            </mat-card>

            <div class="queue-toolbar">
              <mat-form-field appearance="outline" class="filter-field">
                <mat-label>Filtrar por clínica</mat-label>
                <mat-select [(ngModel)]="selectedClinicFilter" (selectionChange)="applyFilter()" [ngModelOptions]="{standalone: true}">
                  <mat-option [value]="0">Todas las clínicas</mat-option>
                  <mat-option *ngFor="let c of clinics" [value]="c.id">{{ c.name }}</mat-option>
                </mat-select>
              </mat-form-field>
              <div class="queue-stats">
                <span class="stat-chip waiting">{{ countByStatus('WAITING') }} en espera</span>
                <span class="stat-chip calling">{{ countByStatus('BEING_CALLED') }} siendo llamados</span>
                <span class="stat-chip consulting">{{ countByStatus('IN_CONSULTATION') }} en consulta</span>
              </div>
            </div>

            <div class="ticket-card" *ngFor="let t of filteredActive"
                 [class.being-called]="t.status === 'BEING_CALLED'">
              <div class="ticket-num">{{ t.ticketNumber }}</div>
              <div class="ticket-body">
                <div class="ticket-name">{{ t.patientName }}</div>
                <div class="ticket-sub">{{ t.clinicName }} · {{ t.type }}</div>
                <div class="ticket-sub" *ngIf="t.doctorName">Dr. {{ t.doctorName }}</div>
              </div>
              <div class="ticket-right">
                <span [class]="getStatusClass(t.status)" class="status-chip">{{ statusLabel(t.status) }}</span>
                <div class="ticket-time" *ngIf="t.createdAt">{{ t.createdAt | date:'HH:mm' }}</div>
              </div>
              <div class="ticket-actions">
                <button mat-icon-button color="warn" *ngIf="t.status === 'BEING_CALLED' && canManage()"
                        (click)="markAbsent(t.id)" matTooltip="Marcar ausente">
                  <mat-icon>person_off</mat-icon>
                </button>
              </div>
            </div>

            <div class="empty-state" *ngIf="filteredActive.length === 0">
              <mat-icon>event_available</mat-icon>
              <p>No hay citas activas en este momento</p>
            </div>
          </div>
        </mat-tab>

        <!-- TAB 2: Completados del día -->
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon class="tab-icon">task_alt</mat-icon>
            Completados ({{ completedTickets.length }})
          </ng-template>
          <div class="tab-content">
            <div class="ticket-card completed" *ngFor="let t of completedTickets">
              <div class="ticket-num">{{ t.ticketNumber }}</div>
              <div class="ticket-body">
                <div class="ticket-name">{{ t.patientName }}</div>
                <div class="ticket-sub">{{ t.clinicName }} · {{ t.type }}</div>
              </div>
              <span class="status-chip status-completed">Completado</span>
            </div>
            <div class="empty-state" *ngIf="completedTickets.length === 0">
              <mat-icon>task_alt</mat-icon>
              <p>Sin citas completadas hoy</p>
            </div>
          </div>
        </mat-tab>

      </mat-tab-group>
    </div>
  `,
  styles: [`
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px; }
    .page-header h1 { font-size: 1.6rem; font-weight: 500; color: #1D6C61; margin: 0; }
    .header-actions { display: flex; gap: 8px; }
    .tab-content { padding: 20px 0; }
    .tab-icon { font-size: 18px; margin-right: 6px; vertical-align: middle; }
    h3 { font-size: 1rem; font-weight: 600; color: #1D6C61; margin-bottom: 12px; margin-top: 4px; }

    /* Calling banner */
    .calling-banner {
      display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
      background: linear-gradient(90deg, #1D6C61, #3EB9A8);
      color: white; border-radius: 10px; padding: 12px 20px; margin-bottom: 20px;
      box-shadow: 0 4px 16px rgba(29,108,97,0.3);
    }
    .calling-label { display: flex; align-items: center; gap: 6px; font-weight: 700; font-size: 0.85rem; letter-spacing: 1px; text-transform: uppercase; white-space: nowrap; }
    .calling-tickets { display: flex; gap: 12px; flex-wrap: wrap; flex: 1; }
    .calling-item { display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.15); border-radius: 8px; padding: 6px 12px; }
    .calling-num { font-size: 1.4rem; font-weight: 700; }
    .calling-name { font-weight: 500; }
    .calling-clinic { font-size: 0.85rem; opacity: 0.9; }

    /* Call panel */
    .call-panel { margin-bottom: 16px; border-left: 4px solid #1D6C61; }
    .call-controls { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
    .call-clinic-field { flex: 1; min-width: 220px; }
    .call-hint { font-size: 0.78rem; color: #757575; margin: 6px 0 0; }

    /* Queue toolbar */
    .queue-toolbar { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; flex-wrap: wrap; }
    .filter-field { flex: 1; min-width: 200px; }
    .queue-stats { display: flex; gap: 8px; flex-wrap: wrap; }
    .stat-chip { padding: 4px 12px; border-radius: 12px; font-size: 0.78rem; font-weight: 500; }
    .waiting { background: #fff8e1; color: #f57f17; }
    .calling { background: #e3f2fd; color: #1565c0; }
    .consulting { background: #e8f5e9; color: #2e7d32; }

    /* Ticket cards */
    .ticket-card {
      display: flex; align-items: center; gap: 16px; padding: 14px 18px;
      background: white; border-radius: 10px; margin-bottom: 10px;
      box-shadow: 0 2px 8px rgba(29,108,97,0.07); border: 1px solid #e8e8e8;
      transition: border-color 0.2s;
    }
    .ticket-card.being-called { border-color: #3EB9A8; box-shadow: 0 2px 12px rgba(62,185,168,0.25); }
    .ticket-card.completed { opacity: 0.7; }
    .ticket-num { font-size: 1.5rem; font-weight: 700; color: #1D6C61; min-width: 85px; }
    .ticket-body { flex: 1; }
    .ticket-name { font-weight: 600; }
    .ticket-sub { font-size: 0.8rem; color: #757575; margin-top: 2px; }
    .ticket-right { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
    .ticket-time { font-size: 0.75rem; color: #9e9e9e; }
    .ticket-actions { display: flex; gap: 4px; }
    .status-chip { padding: 4px 12px; border-radius: 12px; font-size: 0.8rem; font-weight: 500; }

    /* Search */
    .search-row { display: flex; gap: 12px; align-items: center; margin-bottom: 12px; flex-wrap: wrap; }
    .search-field { flex: 1; min-width: 250px; }
    .search-results { margin-bottom: 12px; }
    .result-item {
      display: flex; align-items: center; gap: 12px; padding: 10px 14px;
      border-radius: 8px; cursor: pointer; border: 2px solid transparent;
      margin-bottom: 6px; background: #f8f9ff; transition: all 0.15s;
    }
    .result-item:hover { background: #e3f2fd; }
    .result-item.selected { border-color: #1D6C61; background: #d0f4ef; }
    .result-name { font-weight: 500; }
    .result-meta { font-size: 0.78rem; color: #757575; }
    .check-icon { color: #1D6C61; margin-left: auto; }
    .no-results { display: flex; align-items: center; gap: 8px; color: #757575; font-size: 0.85rem; padding: 8px 0; }
    .selected-patient-box {
      display: flex; align-items: center; gap: 12px;
      background: #e8f5e9; padding: 14px; border-radius: 8px; margin-bottom: 8px; color: #2e7d32;
    }
    .selected-patient-box mat-icon { font-size: 36px; width: 36px; height: 36px; }
    .selected-patient-box button { margin-left: auto; color: #757575; }
    .appt-form { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; margin-top: 8px; }
    .full-width { grid-column: 1 / -1; }

    .empty-state { text-align: center; padding: 48px; color: #9e9e9e; }
    .empty-state mat-icon { font-size: 48px; width: 48px; height: 48px; color: #3EB9A8; opacity: 0.5; margin-bottom: 8px; }
  `]
})
export class AppointmentsComponent implements OnInit, OnDestroy {
  clinics: Clinic[] = [];
  activeTickets: Ticket[] = [];
  filteredActive: Ticket[] = [];
  calledTickets: Ticket[] = [];
  completedTickets: Ticket[] = [];
  selectedClinicFilter = 0;
  callClinicId = 0;
  calling = false;


  private refreshInterval: any;
  private lastCalledIds = new Set<number>();

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService,
    private clinicService: ClinicService,
    private authService: AuthService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.clinicService.getAll().subscribe(res => { if (res.success) this.clinics = res.data; });
    this.loadAll();
    // Auto-refresh every 20 seconds
    this.refreshInterval = setInterval(() => this.loadAll(), 20000);
  }

  ngOnDestroy(): void {
    if (this.refreshInterval) clearInterval(this.refreshInterval);
    window.speechSynthesis?.cancel();
  }

  loadAll(): void {
    this.ticketService.getAll().subscribe({
      next: res => {
        if (!res.success) return;
        const all = res.data;
        this.activeTickets = all.filter(t => ['WAITING', 'BEING_CALLED', 'IN_CONSULTATION'].includes(t.status));
        this.calledTickets  = all.filter(t => t.status === 'BEING_CALLED');
        this.completedTickets = all.filter(t => t.status === 'COMPLETED');
        this.applyFilter();
      },
      error: () => {}
    });
  }

  applyFilter(): void {
    this.filteredActive = this.selectedClinicFilter === 0
      ? this.activeTickets
      : this.activeTickets.filter(t => t.clinicId === this.selectedClinicFilter);
  }

  countByStatus(status: string): number {
    return this.activeTickets.filter(t => t.status === status).length;
  }

  callNextTicket(): void {
    if (!this.callClinicId) return;
    this.calling = true;
    this.ticketService.callNext(this.callClinicId).subscribe({
      next: res => {
        if (res.success) {
          const t = res.data;
          this.announce(t);
          this.notification.success(`Llamando: ${t.ticketNumber} — ${t.patientName}`);
          this.loadAll();
        } else {
          this.notification.error(res.message || 'No hay pacientes en espera en esta clínica');
        }
        this.calling = false;
      },
      error: err => {
        this.notification.error(err.error?.message || 'No hay pacientes en espera');
        this.calling = false;
      }
    });
  }

  private announce(ticket: Ticket): void {
    const settings = this.getSettings();
    if (!settings.audioEnabled) return;

    if (settings.alertType === 'voice' && 'speechSynthesis' in window) {
      const text = `Se llama turno ${ticket.ticketNumber.replace(/-/g, ' ')}, `
        + `${ticket.patientName}, `
        + `favor dirigirse a ${ticket.clinicName}.`;

      window.speechSynthesis.cancel();
      let count = 0;
      const speakOnce = () => {
        if (count >= settings.repetitions) return;
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'es-ES';
        u.volume = settings.volume / 100;
        u.rate = 0.85;
        u.onend = () => {
          count++;
          if (count < settings.repetitions) setTimeout(speakOnce, 800);
        };
        window.speechSynthesis.speak(u);
      };
      speakOnce();
    } else if (settings.alertType === 'tone') {
      this.playTone();
    }
  }

  private playTone(): void {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.value = 880;
      gain.gain.value = 0.4;
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch { /* audio not available */ }
  }

  private getSettings() {
    const stored = localStorage.getItem(NOTIF_KEY);
    return stored
      ? { visualEnabled: true, audioEnabled: true, volume: 80, alertType: 'voice', displaySeconds: 10, repetitions: 2, ...JSON.parse(stored) }
      : { visualEnabled: true, audioEnabled: true, volume: 80, alertType: 'voice', displaySeconds: 10, repetitions: 2 };
  }

  openCallScreen(): void {
    window.open('/call-screen', '_blank', 'width=1280,height=720');
  }

  markAbsent(ticketId: number): void {
    this.ticketService.markAbsent(ticketId).subscribe({
      next: () => { this.notification.success('Paciente marcado como ausente'); this.loadAll(); },
      error: () => this.notification.error('Error al marcar ausente')
    });
  }

  canManage(): boolean {
    return this.authService.hasRole('ADMIN', 'HEALTH_STAFF', 'NURSE', 'DOCTOR');
  }

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
      IN_CONSULTATION: 'En Consulta', COMPLETED: 'Completado',
      ABSENT: 'Ausente', CANCELLED_NO_PAYMENT: 'Cancelado'
    };
    return m[s] ?? s;
  }
}
