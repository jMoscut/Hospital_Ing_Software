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

      <!-- BANNER: Turnos activos siendo llamados -->
      <div class="calling-banner" *ngIf="calledTickets.length > 0">
        <div class="calling-label">
          <mat-icon>campaign</mat-icon> LLAMANDO AHORA
        </div>
        <div class="calling-tickets">
          <div class="calling-item" *ngFor="let t of calledTickets">
            <span class="calling-num">{{ t.ticketNumber }}</span>
            <span class="calling-name">{{ t.patientName }}</span>
            <span class="calling-dest" *ngIf="t.status === 'CALLED_TO_VITAL_SIGNS'">→ Signos Vitales</span>
            <span class="calling-dest" *ngIf="t.status === 'BEING_CALLED'">→ {{ t.clinicName }}</span>
            <mat-icon class="calling-icon-vs" *ngIf="t.status === 'CALLED_TO_VITAL_SIGNS'" matTooltip="En Signos Vitales">monitor_heart</mat-icon>
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

            <!-- Panel de llamado a signos vitales -->
            <mat-card class="call-panel" *ngIf="canManage()">
              <mat-card-header>
                <mat-icon mat-card-avatar style="color:#1D6C61">monitor_heart</mat-icon>
                <mat-card-title>Llamar a Signos Vitales</mat-card-title>
                <mat-card-subtitle>Requiere al menos un médico disponible en la clínica seleccionada</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="call-controls">
                  <mat-form-field appearance="outline" class="call-clinic-field">
                    <mat-label>Clínica</mat-label>
                    <mat-icon matPrefix>local_hospital</mat-icon>
                    <mat-select [(ngModel)]="callClinicId" [ngModelOptions]="{standalone: true}"
                                (ngModelChange)="onClinicChange($event)">
                      <mat-option [value]="0" disabled>— Seleccione clínica —</mat-option>
                      <mat-option *ngFor="let c of visitClinics" [value]="c.id">{{ c.name }}</mat-option>
                    </mat-select>
                  </mat-form-field>
                  <button mat-raised-button color="primary"
                          [disabled]="!callClinicId || !canCallNext || calling"
                          (click)="callNextToVitalSigns()">
                    <mat-spinner *ngIf="calling" diameter="20"></mat-spinner>
                    <mat-icon *ngIf="!calling">campaign</mat-icon>
                    {{ calling ? 'Llamando...' : 'Llamar Siguiente Paciente' }}
                  </button>
                </div>
                <!-- Availability status -->
                <div *ngIf="callClinicId">
                  <ng-container *ngIf="!isLabClinic">
                    <p class="call-hint warn-hint" *ngIf="!anyDoctorAvailable">
                      <mat-icon style="font-size:15px;vertical-align:middle">warning</mat-icon>
                      Ningún médico disponible — espere a que un médico se marque disponible
                    </p>
                    <div class="doctor-chips" *ngIf="doctorStatuses.length > 0">
                      <div class="doctor-chip" *ngFor="let d of doctorStatuses"
                           [class.avail]="d.available" [class.busy]="!d.available">
                        <mat-icon style="font-size:14px">{{ d.available ? 'check_circle' : 'cancel' }}</mat-icon>
                        Dr. {{ d.firstName }} {{ d.lastName }}
                        <span class="avail-label">{{ d.available ? 'Disponible' : 'Ocupado' }}</span>
                      </div>
                    </div>
                  </ng-container>
                  <ng-container *ngIf="isLabClinic">
                    <p class="call-hint warn-hint" *ngIf="!anyLabTechAvailable">
                      <mat-icon style="font-size:15px;vertical-align:middle">warning</mat-icon>
                      Ningún técnico de laboratorio disponible — espere a que uno se marque disponible
                    </p>
                    <div class="doctor-chips" *ngIf="anyLabTechAvailable">
                      <ng-container *ngFor="let s of staffList">
                        <div class="doctor-chip avail" *ngIf="s.role === 'LAB_TECHNICIAN' && s.status === 'ACTIVO'">
                          <mat-icon style="font-size:14px">check_circle</mat-icon>
                          {{ s.firstName }} {{ s.lastName }}
                          <span class="avail-label">Disponible</span>
                        </div>
                      </ng-container>
                    </div>
                  </ng-container>
                </div>
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
                <span class="stat-chip vitals">{{ countByStatus('CALLED_TO_VITAL_SIGNS') }} signos vitales</span>
                <span class="stat-chip ready">{{ countByStatus('READY_FOR_DOCTOR') }} listo médico</span>
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

        <!-- TAB 2: Personal médico -->
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon class="tab-icon">badge</mat-icon>
            Personal ({{ staffList.length }})
          </ng-template>
          <div class="tab-content">
            <div class="staff-toolbar">
              <mat-form-field appearance="outline" class="staff-filter-field">
                <mat-label>Filtrar por estado</mat-label>
                <mat-select [(ngModel)]="staffStatusFilter" (ngModelChange)="applyStaffFilter()" [ngModelOptions]="{standalone: true}">
                  <mat-option value="">Todos</mat-option>
                  <mat-option value="ACTIVO">Activo</mat-option>
                  <mat-option value="INACTIVO">Inactivo</mat-option>
                  <mat-option value="FUERA_DE_TURNO">Fuera de turno</mat-option>
                </mat-select>
              </mat-form-field>
              <div class="staff-summary">
                <span class="stat-chip" style="background:#e8f5e9;color:#2e7d32">{{ countStaffByStatus('ACTIVO') }} activos</span>
                <span class="stat-chip" style="background:#fff8e1;color:#f57f17">{{ countStaffByStatus('INACTIVO') }} inactivos</span>
                <span class="stat-chip" style="background:#f5f5f5;color:#616161">{{ countStaffByStatus('FUERA_DE_TURNO') }} fuera de turno</span>
              </div>
            </div>

            <div class="staff-grid">
              <div class="staff-card" *ngFor="let s of filteredStaff" [ngClass]="'staff-' + s.status.toLowerCase()">
                <div class="staff-card-top">
                  <div class="staff-avatar">
                    <mat-icon>{{ s.role === 'LAB_TECHNICIAN' ? 'science' : 'stethoscope' }}</mat-icon>
                  </div>
                  <div class="staff-info">
                    <div class="staff-name">{{ s.firstName }} {{ s.lastName }}</div>
                    <div class="staff-role">{{ s.role === 'DOCTOR' ? 'Médico' : 'Técnico de Laboratorio' }}</div>
                  </div>
                </div>
                <div class="staff-card-bottom">
                  <div class="staff-area">
                    <mat-icon>location_on</mat-icon>
                    <span>{{ s.area }}</span>
                  </div>
                  <div class="staff-status-badge" [ngClass]="'badge-' + s.status.toLowerCase()">
                    <span class="status-dot"></span>
                    {{ staffStatusLabel(s.status) }}
                  </div>
                </div>
              </div>
            </div>

            <div class="empty-state" *ngIf="filteredStaff.length === 0">
              <mat-icon>badge</mat-icon>
              <p>No hay personal registrado</p>
            </div>
          </div>
        </mat-tab>

        <!-- TAB 3: Completados del día -->
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
    .vitals { background: #e0f7fa; color: #00838f; }
    .ready { background: #f3e5f5; color: #7b1fa2; }
    .calling { background: #e3f2fd; color: #1565c0; }
    .consulting { background: #e8f5e9; color: #2e7d32; }
    .calling-dest { font-size: 0.85rem; opacity: 0.9; }
    .calling-icon-vs { font-size: 16px; opacity: 0.8; }
    .warn-hint { color: #e65100 !important; }
    .doctor-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
    .doctor-chip { display: flex; align-items: center; gap: 5px; padding: 5px 12px; border-radius: 16px; font-size: 0.82rem; font-weight: 500; }
    .doctor-chip.avail { background: #e8f5e9; color: #2e7d32; }
    .doctor-chip.busy { background: #ffebee; color: #c62828; }
    .avail-label { font-size: 0.72rem; opacity: 0.8; margin-left: 2px; }

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
    .status-waiting { background:#fff8e1;color:#f57f17; }
    .status-vitals { background:#e0f7fa;color:#00838f; }
    .status-ready { background:#f3e5f5;color:#7b1fa2; }
    .status-being-called { background:#e3f2fd;color:#1565c0; }
    .status-in-consultation { background:#e8f5e9;color:#2e7d32; }
    .status-completed { background:#f5f5f5;color:#616161; }
    .status-absent { background:#ffebee;color:#c62828; }

    /* Staff panel */
    .staff-toolbar { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; flex-wrap: wrap; }
    .staff-filter-field { min-width: 200px; }
    .staff-summary { display: flex; gap: 8px; flex-wrap: wrap; }
    .staff-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 14px; }
    .staff-card {
      display: flex; flex-direction: column; gap: 12px;
      background: white; border-radius: 12px; padding: 16px 18px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.07); border: 1px solid #e8e8e8;
      border-left: 5px solid #e0e0e0;
    }
    .staff-card.staff-activo { border-left-color: #43a047; }
    .staff-card.staff-inactivo { border-left-color: #fb8c00; }
    .staff-card.staff-fuera_de_turno { border-left-color: #9e9e9e; opacity: 0.75; }
    .staff-card-top { display: flex; align-items: center; gap: 12px; }
    .staff-card-bottom { display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap; }
    .staff-avatar {
      width: 46px; height: 46px; border-radius: 50%; flex-shrink: 0;
      background: #e8f5e9; display: flex; align-items: center; justify-content: center;
      color: #1D6C61;
    }
    .staff-card.staff-inactivo .staff-avatar { background: #fff3e0; color: #e65100; }
    .staff-card.staff-fuera_de_turno .staff-avatar { background: #f5f5f5; color: #9e9e9e; }
    .staff-info { flex: 1; min-width: 0; }
    .staff-name { font-weight: 700; font-size: 0.97rem; color: #212121; line-height: 1.3; word-break: break-word; }
    .staff-role { font-size: 0.78rem; color: #757575; margin-top: 3px; }
    .staff-area { display: flex; align-items: center; gap: 4px; font-size: 0.8rem; color: #1D6C61; font-weight: 500; flex-shrink: 0; }
    .staff-area mat-icon { font-size: 15px; width: 15px; height: 15px; }
    .staff-status-badge {
      display: flex; align-items: center; gap: 5px;
      padding: 4px 10px; border-radius: 12px; font-size: 0.75rem; font-weight: 600;
      flex-shrink: 0;
    }
    .badge-activo { background: #e8f5e9; color: #2e7d32; }
    .badge-inactivo { background: #fff3e0; color: #e65100; }
    .badge-fuera_de_turno { background: #f5f5f5; color: #757575; }
    .status-dot { width: 8px; height: 8px; border-radius: 50%; background: currentColor; display: inline-block; }
  `]
})
export class AppointmentsComponent implements OnInit, OnDestroy {
  clinics: Clinic[] = [];
  visitClinics: Clinic[] = [];
  activeTickets: Ticket[] = [];
  filteredActive: Ticket[] = [];
  calledTickets: Ticket[] = [];
  completedTickets: Ticket[] = [];
  selectedClinicFilter = 0;
  callClinicId = 0;
  calling = false;
  doctorStatuses: any[] = [];

  staffList: any[] = [];
  filteredStaff: any[] = [];
  staffStatusFilter = '';

  private refreshInterval: any;
  private staffInterval: any;
  private doctorInterval: any;
  private lastCalledIds = new Set<number>();

  get anyDoctorAvailable(): boolean {
    return this.doctorStatuses.some(d => d.available);
  }

  get isLabClinic(): boolean {
    if (!this.callClinicId) return false;
    const clinic = this.visitClinics.find(c => c.id === this.callClinicId);
    if (!clinic) return false;
    const name = clinic.name.toLowerCase();
    return name.includes('laboratorio') || name.includes('lab');
  }

  get anyLabTechAvailable(): boolean {
    return this.staffList.some(s => s.role === 'LAB_TECHNICIAN' && s.status === 'ACTIVO');
  }

  get canCallNext(): boolean {
    return this.isLabClinic ? this.anyLabTechAvailable : this.anyDoctorAvailable;
  }

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService,
    private clinicService: ClinicService,
    private authService: AuthService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.clinicService.getAll().subscribe(res => {
      if (res.success) {
        this.clinics = res.data;
        const excluded = ['farmacia', 'emergencia', 'emergencias'];
        this.visitClinics = res.data.filter((c: Clinic) =>
          !excluded.some(x => c.name.toLowerCase().includes(x))
        );
      }
    });
    this.loadAll();
    this.loadStaff();
    this.refreshInterval = setInterval(() => this.loadAll(), 5000);
    this.staffInterval   = setInterval(() => this.loadStaff(), 5000);
    this.doctorInterval  = setInterval(() => {
      if (this.callClinicId) this.refreshDoctorChips();
    }, 5000);
  }

  ngOnDestroy(): void {
    clearInterval(this.refreshInterval);
    clearInterval(this.staffInterval);
    clearInterval(this.doctorInterval);
    window.speechSynthesis?.cancel();
  }

  loadAll(): void {
    this.ticketService.getTodayAllActive().subscribe({
      next: res => {
        if (!res.success) return;
        const all = res.data;
        this.activeTickets = all.filter((t: Ticket) =>
          ['WAITING','CALLED_TO_VITAL_SIGNS','READY_FOR_DOCTOR','BEING_CALLED','IN_CONSULTATION'].includes(t.status));
        this.calledTickets = all.filter((t: Ticket) =>
          t.status === 'CALLED_TO_VITAL_SIGNS' || t.status === 'BEING_CALLED');
        this.completedTickets = all.filter((t: Ticket) => t.status === 'COMPLETED');
        this.applyFilter();
        this.announceNewCalls(this.calledTickets);
      },
      error: () => {}
    });
  }

  onClinicChange(clinicId: number): void {
    if (!clinicId) { this.doctorStatuses = []; return; }
    this.refreshDoctorChips();
  }

  private refreshDoctorChips(): void {
    this.ticketService.getDoctorAvailability(this.callClinicId).subscribe({
      next: res => { if (res.success) this.doctorStatuses = res.data; },
      error: () => {}
    });
  }

  callNextToVitalSigns(): void {
    if (!this.callClinicId) return;
    this.calling = true;
    this.ticketService.callToVitalSigns(this.callClinicId).subscribe({
      next: res => {
        if (res.success) {
          this.notification.info(`Paciente ${res.data.ticketNumber} llamado a Signos Vitales`);
          this.loadAll();
          this.refreshDoctorChips();
        } else {
          this.notification.error(res.message || 'No hay pacientes en espera');
        }
        this.calling = false;
      },
      error: err => {
        this.notification.error(err.error?.message || 'No hay médicos disponibles o no hay pacientes en espera');
        this.calling = false;
      }
    });
  }

  private announceNewCalls(current: Ticket[]): void {
    const currentIds = new Set(current.map(t => t.id));
    current.forEach(t => {
      if (!this.lastCalledIds.has(t.id)) this.announce(t);
    });
    this.lastCalledIds = currentIds;
  }

  applyFilter(): void {
    this.filteredActive = this.selectedClinicFilter === 0
      ? this.activeTickets
      : this.activeTickets.filter(t => t.clinicId === this.selectedClinicFilter);
  }

  countByStatus(status: string): number {
    return this.activeTickets.filter(t => t.status === status).length;
  }

  private announce(ticket: Ticket): void {
    const settings = this.getSettings();
    if (!settings.audioEnabled) return;

    const destination = ticket.status === 'CALLED_TO_VITAL_SIGNS'
      ? 'el área de signos vitales'
      : ticket.clinicName;

    if (settings.alertType === 'voice' && 'speechSynthesis' in window) {
      const text = `Se llama turno ${ticket.ticketNumber.split('').join(' ')}, `
        + `${ticket.patientName}, `
        + `favor dirigirse a ${destination}.`;

      window.speechSynthesis.cancel();
      let count = 0;
      const speakOnce = () => {
        if (count >= (settings.repetitions ?? 2)) return;
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'es-ES';
        u.volume = (settings.volume ?? 80) / 100;
        u.rate = 0.85;
        u.onend = () => { count++; if (count < settings.repetitions) setTimeout(speakOnce, 800); };
        window.speechSynthesis.speak(u);
      };
      setTimeout(speakOnce, 150);
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

  loadStaff(): void {
    this.ticketService.getStaffStatus().subscribe({
      next: res => {
        if (res.success) {
          this.staffList = res.data;
          this.applyStaffFilter();
        }
      },
      error: () => {}
    });
  }

  applyStaffFilter(): void {
    this.filteredStaff = this.staffStatusFilter
      ? this.staffList.filter(s => s.status === this.staffStatusFilter)
      : [...this.staffList];
  }

  countStaffByStatus(status: string): number {
    return this.staffList.filter(s => s.status === status).length;
  }

  staffStatusLabel(status: string): string {
    const m: Record<string, string> = {
      ACTIVO: 'Activo',
      INACTIVO: 'Inactivo',
      FUERA_DE_TURNO: 'Fuera de turno'
    };
    return m[status] ?? status;
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
      WAITING: 'status-waiting',
      CALLED_TO_VITAL_SIGNS: 'status-vitals',
      READY_FOR_DOCTOR: 'status-ready',
      BEING_CALLED: 'status-being-called',
      IN_CONSULTATION: 'status-in-consultation',
      COMPLETED: 'status-completed',
      ABSENT: 'status-absent',
      CANCELLED_NO_PAYMENT: 'status-absent'
    };
    return m[s] ?? '';
  }

  statusLabel(s: string): string {
    const m: Record<string, string> = {
      WAITING: 'En Espera',
      CALLED_TO_VITAL_SIGNS: 'Signos Vitales',
      READY_FOR_DOCTOR: 'Listo p/ Médico',
      BEING_CALLED: 'Siendo Llamado',
      IN_CONSULTATION: 'En Consulta',
      COMPLETED: 'Completado',
      ABSENT: 'Ausente',
      CANCELLED_NO_PAYMENT: 'Cancelado'
    };
    return m[s] ?? s;
  }
}
