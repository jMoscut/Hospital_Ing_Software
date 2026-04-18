import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { interval, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { TicketService, VitalSignsService } from '../../shared/services/ticket.service';
import { PrescriptionService, LabService, MedicineService, LabExamService } from '../../shared/services/lab.service';
import { AuthService } from '../../core/auth/auth.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Ticket, VitalSigns } from '../../core/models/ticket.model';
import { Medicine, LabExam } from '../../core/models/lab.model';

@Component({
  selector: 'app-consultation',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, MatCardModule, MatButtonModule,
    MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatDividerModule, MatProgressSpinnerModule, MatChipsModule
  ],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Consulta Médica</h1>
        <div class="header-right">
          <span class="realtime-badge" *ngIf="assignedClinicId">
            <mat-icon>radio_button_checked</mat-icon> Clínica {{ assignedClinicName }}
          </span>
          <button mat-raised-button color="warn" *ngIf="currentTicket"
                  (click)="markAbsent()" title="Paciente no se presentó">
            <mat-icon>person_off</mat-icon> Paciente Ausente
          </button>
        </div>
      </div>

      <div class="consultation-layout">
        <!-- COLA DE PACIENTES -->
        <div class="queue-panel">
          <mat-card>
            <mat-card-header>
              <mat-card-title>
                <mat-icon>queue</mat-icon> Cola de Espera
              </mat-card-title>
              <mat-card-subtitle>{{ queue.length }} paciente(s) esperando</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <!-- Llamar siguiente (RN-C04) -->
              <button mat-raised-button color="primary" class="call-btn"
                      (click)="callNext()" [disabled]="!assignedClinicId || !!currentTicket || queue.length === 0 || calling">
                <mat-spinner *ngIf="calling" diameter="20"></mat-spinner>
                <mat-icon *ngIf="!calling">campaign</mat-icon>
                Llamar Siguiente Paciente
              </button>
              <p class="hint" *ngIf="!!currentTicket">Complete la consulta actual primero</p>

              <!-- RN-C03: Último llamado visible -->
              <div class="last-called" *ngIf="lastCalledTicket">
                <small>Último llamado:</small>
                <strong>{{ lastCalledTicket.ticketNumber }}</strong> - {{ lastCalledTicket.patientName }}
              </div>

              <mat-divider class="mt-16 mb-16"></mat-divider>

              <!-- Lista de cola -->
              <div class="queue-ticket" *ngFor="let t of queue; let i = index">
                <div class="ticket-number" [class.urgent]="t.priority === 'URGENT'">
                  {{ t.ticketNumber }}
                </div>
                <div class="ticket-info">
                  <div class="ticket-patient">{{ t.patientName }}</div>
                  <div class="ticket-meta">
                    {{ t.type }}
                    <span class="emergency-badge" *ngIf="t.priority === 'URGENT'">URGENTE</span>
                  </div>
                </div>
                <span class="pos-badge">#{{ i + 1 }}</span>
              </div>

              <p *ngIf="queue.length === 0" class="empty-msg">Sin pacientes en espera</p>
            </mat-card-content>
          </mat-card>
        </div>

        <!-- PANEL DE CONSULTA ACTIVA -->
        <div class="consultation-panel">
          <mat-card *ngIf="currentTicket">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>medical_services</mat-icon>
                Paciente: {{ currentTicket.patientName }}
              </mat-card-title>
              <mat-card-subtitle>
                Ticket: {{ currentTicket.ticketNumber }} · {{ currentTicket.clinicName }}
                <span class="emergency-badge ml-8" *ngIf="currentTicket.priority === 'URGENT'">URGENTE</span>
              </mat-card-subtitle>
            </mat-card-header>

            <mat-card-content>
              <!-- Esperando vitales de enfermería -->
              <div class="vitals-waiting" *ngIf="currentTicket.status === 'BEING_CALLED'">
                <mat-icon class="spin-icon">hourglass_top</mat-icon>
                <div>
                  <strong>Paciente en área de Signos Vitales</strong>
                  <p>El personal de salud está tomando los signos vitales. La consulta habilitará automáticamente al recibir los datos.</p>
                </div>
              </div>

              <!-- Signos vitales recibidos de enfermería (RN-03: solo lectura para el médico) -->
              <div class="vitals-received" *ngIf="currentVitals">
                <div class="vitals-header">
                  <mat-icon>monitor_heart</mat-icon>
                  <strong>Signos Vitales</strong>
                  <span class="vitals-from">Registrado por Personal de Salud</span>
                </div>
                <div class="vitals-grid-display">
                  <div class="vital-item" *ngIf="currentVitals.bloodPressure">
                    <span class="vital-label">Presión Arterial</span>
                    <span class="vital-value">{{ currentVitals.bloodPressure }}</span>
                  </div>
                  <div class="vital-item" *ngIf="currentVitals.heartRate">
                    <span class="vital-label">Frec. Cardíaca</span>
                    <span class="vital-value">{{ currentVitals.heartRate }} <small>bpm</small></span>
                  </div>
                  <div class="vital-item" *ngIf="currentVitals.temperature">
                    <span class="vital-label">Temperatura</span>
                    <span class="vital-value">{{ currentVitals.temperature }} <small>°C</small></span>
                  </div>
                  <div class="vital-item" *ngIf="currentVitals.weight">
                    <span class="vital-label">Peso</span>
                    <span class="vital-value">{{ currentVitals.weight }} <small>kg</small></span>
                  </div>
                  <div class="vital-item" *ngIf="currentVitals.height">
                    <span class="vital-label">Talla</span>
                    <span class="vital-value">{{ currentVitals.height }} <small>cm</small></span>
                  </div>
                  <div class="vital-item" *ngIf="currentVitals.oxygenSaturation">
                    <span class="vital-label">SpO₂</span>
                    <span class="vital-value">{{ currentVitals.oxygenSaturation }} <small>%</small></span>
                  </div>
                </div>
              </div>

              <mat-divider class="mt-16 mb-16"></mat-divider>

              <!-- Diagnóstico + Receta -->
              <div *ngIf="currentTicket.status === 'IN_CONSULTATION'">
                <h4><mat-icon>edit_note</mat-icon> Diagnóstico y Receta</h4>
                <form [formGroup]="consultationForm">
                  <mat-form-field appearance="outline" class="full-width">
                    <mat-label>Diagnóstico</mat-label>
                    <textarea matInput formControlName="notes" rows="3"></textarea>
                  </mat-form-field>

                  <!-- Sección de receta: medicamentos -->
                  <h5><mat-icon style="vertical-align:middle;font-size:18px">medication</mat-icon> Medicamentos (Receta)</h5>
                  <div class="medicine-row" *ngFor="let item of prescriptionItems; let i = index">
                    <mat-form-field appearance="outline" style="flex:2">
                      <mat-label>Medicamento</mat-label>
                      <mat-select [(ngModel)]="item.medicineId" [ngModelOptions]="{standalone: true}">
                        <mat-option *ngFor="let m of medicines" [value]="m.id">
                          <span class="med-code" *ngIf="m.code">{{ m.code }}</span>
                          {{ m.name }}
                          <span class="med-stock" [class.low]="m.stock <= 10"> · Stock: {{ m.stock }}</span>
                        </mat-option>
                      </mat-select>
                    </mat-form-field>
                    <mat-form-field appearance="outline" style="width:90px">
                      <mat-label>Cant.</mat-label>
                      <input matInput type="number" min="1" [(ngModel)]="item.quantity" [ngModelOptions]="{standalone: true}">
                    </mat-form-field>
                    <mat-form-field appearance="outline" style="flex:1">
                      <mat-label>Dosificación</mat-label>
                      <input matInput [(ngModel)]="item.dosage" [ngModelOptions]="{standalone: true}" placeholder="ej. 1 tableta cada 8h">
                    </mat-form-field>
                    <button mat-icon-button color="warn" (click)="removeItem(i)" title="Quitar">
                      <mat-icon>delete</mat-icon>
                    </button>
                  </div>
                  <button mat-stroked-button (click)="addItem()" class="mb-16">
                    <mat-icon>add</mat-icon> Agregar Medicamento
                  </button>

                  <!-- Sección de órdenes de laboratorio -->
                  <mat-divider class="mb-16"></mat-divider>
                  <h5><mat-icon style="vertical-align:middle;font-size:18px">science</mat-icon> Órdenes de Laboratorio</h5>
                  <div class="lab-row" *ngFor="let lab of labOrderItems; let i = index">
                    <mat-form-field appearance="outline" style="flex:2">
                      <mat-label>Examen</mat-label>
                      <mat-select [(ngModel)]="lab.labExamId" [ngModelOptions]="{standalone: true}">
                        <mat-optgroup *ngFor="let cat of labCategories" [label]="cat">
                          <mat-option *ngFor="let e of getExamsByCategory(cat)" [value]="e.id">
                            <span class="exam-code">{{ e.code }}</span> {{ e.name }}
                          </mat-option>
                        </mat-optgroup>
                      </mat-select>
                    </mat-form-field>
                    <mat-form-field appearance="outline" style="flex:1">
                      <mat-label>Notas</mat-label>
                      <input matInput [(ngModel)]="lab.notes" [ngModelOptions]="{standalone: true}" placeholder="Indicaciones">
                    </mat-form-field>
                    <button mat-icon-button color="warn" (click)="removeLabItem(i)" title="Quitar">
                      <mat-icon>delete</mat-icon>
                    </button>
                  </div>
                  <button mat-stroked-button (click)="addLabItem()" class="mb-16">
                    <mat-icon>add</mat-icon> Agregar Orden de Laboratorio
                  </button>
                </form>

                <div class="action-buttons">
                  <button mat-raised-button color="primary" (click)="completeDiagnosis()">
                    <mat-icon>check_circle</mat-icon> Completar Consulta
                  </button>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Sin consulta activa -->
          <mat-card *ngIf="!currentTicket" class="empty-consultation">
            <mat-icon class="big-icon">stethoscope</mat-icon>
            <p>No hay consulta activa.</p>
            <p class="hint">Llame al siguiente paciente de la cola.</p>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .consultation-layout { display: grid; grid-template-columns: 320px 1fr; gap: 24px; }
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .page-header h1 { font-size: 1.6rem; font-weight: 500; color: #1565c0; margin: 0; }
    .header-right { display: flex; align-items: center; gap: 12px; }
    .realtime-badge { display: flex; align-items: center; gap: 4px; background: #e8f5e9; color: #2e7d32; padding: 4px 12px; border-radius: 16px; font-size: 0.8rem; }
    .call-btn { width: 100%; margin-bottom: 8px; }
    .last-called { background: #e3f2fd; border-radius: 8px; padding: 12px; font-size: 0.9rem; margin-top: 8px; }
    .last-called strong { font-size: 1.2rem; color: #1565c0; }
    .pos-badge { background: #e0e0e0; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700; }
    .ticket-number.urgent { color: #c62828; }
    .empty-msg { text-align: center; color: #9e9e9e; padding: 24px 0; }
    .hint { font-size: 0.8rem; color: #9e9e9e; margin: 4px 0; }
    .vitals-waiting { display:flex;align-items:flex-start;gap:12px;background:#fff8e1;border:1px solid #ffe082;border-radius:8px;padding:16px;margin-bottom:16px; }
    .vitals-waiting mat-icon { color:#f57f17;font-size:28px;width:28px;height:28px;flex-shrink:0;margin-top:2px; }
    .vitals-waiting strong { display:block;color:#e65100;margin-bottom:4px; }
    .vitals-waiting p { font-size:0.82rem;color:#666;margin:0; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .spin-icon { animation: spin 2s linear infinite; }
    .vitals-received { background:#e8f5e9;border:1px solid #a5d6a7;border-radius:8px;padding:16px;margin-bottom:16px; }
    .vitals-header { display:flex;align-items:center;gap:8px;margin-bottom:12px;color:#2e7d32; }
    .vitals-from { font-size:0.75rem;color:#66bb6a;margin-left:auto;background:#c8e6c9;padding:2px 8px;border-radius:10px; }
    .vitals-grid-display { display:grid;grid-template-columns:repeat(3,1fr);gap:8px; }
    .vital-item { background:white;border-radius:6px;padding:10px 12px; }
    .vital-label { display:block;font-size:0.72rem;color:#757575;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px; }
    .vital-value { font-size:1.2rem;font-weight:700;color:#1D6C61; }
    .full-width { width: 100%; }
    .medicine-row { display: flex; gap: 8px; align-items: center; margin-bottom: 8px; }
    .lab-row { display: flex; gap: 8px; align-items: center; margin-bottom: 8px; }
    .med-code { font-family: monospace; font-size: 0.75rem; color: #1D6C61; background: #d0f4ef; padding: 1px 5px; border-radius: 4px; margin-right: 4px; }
    .exam-code { font-family: monospace; font-size: 0.75rem; color: #3EB9A8; background: #193A31; padding: 1px 5px; border-radius: 4px; margin-right: 4px; }
    .med-stock { font-size: 0.78rem; color: #666; }
    .med-stock.low { color: #c62828; font-weight: 600; }
    .action-buttons { display: flex; gap: 12px; }
    .empty-consultation { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px; text-align: center; }
    .big-icon { font-size: 64px; width: 64px; height: 64px; color: #9e9e9e; margin-bottom: 16px; }
    .success-msg { color: #2e7d32; font-size: 0.85rem; margin-left: 8px; }
    .ml-8 { margin-left: 8px; }
    .mt-16 { margin-top: 16px; }
    .mb-16 { margin-bottom: 16px; }
    h4 { font-size: 1rem; font-weight: 600; margin-bottom: 12px; }
    h5 { font-size: 0.9rem; font-weight: 600; color: #1D6C61; margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }
  `]
})
export class ConsultationComponent implements OnInit, OnDestroy {
  queue: Ticket[] = [];
  currentTicket: Ticket | null = null;
  lastCalledTicket: Ticket | null = null;
  currentVitals: VitalSigns | null = null;
  medicines: Medicine[] = [];
  labExams: LabExam[] = [];
  labCategories: string[] = [];
  prescriptionItems: any[] = [];
  labOrderItems: any[] = [];
  consultationForm!: FormGroup;
  calling = false;
  assignedClinicId: number | null = null;
  assignedClinicName = '';
  private sub!: Subscription;

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService,
    private vitalSignsService: VitalSignsService,
    private prescriptionService: PrescriptionService,
    private labService: LabService,
    private labExamService: LabExamService,
    private medicineService: MedicineService,
    private authService: AuthService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.consultationForm = this.fb.group({ notes: [''] });

    this.medicineService.getAll().subscribe(res => {
      if (res.success) this.medicines = res.data;
    });
    this.labExamService.getAll().subscribe(res => {
      if (res.success) {
        this.labExams = res.data;
        this.labCategories = [...new Set(res.data.map((e: LabExam) => e.category))].sort();
      }
    });

    // Poll queue every 5s (RN-M03)
    this.sub = interval(5000).pipe(startWith(0)).subscribe(() => this.loadQueue());
  }

  loadQueue(): void {
    this.ticketService.getAll().subscribe(res => {
      if (!res.success) return;

      const myId = this.authService.getUserId();
      const myTicket = res.data.find((t: Ticket) =>
        (t.status === 'IN_CONSULTATION' || t.status === 'BEING_CALLED') &&
        t.doctorId === myId
      );

      if (myTicket) {
        if (!this.assignedClinicId) {
          this.assignedClinicId = myTicket.clinicId;
          this.assignedClinicName = myTicket.clinicName;
        }

        const isNew     = !this.currentTicket || this.currentTicket.id !== myTicket.id;
        const changed   = this.currentTicket && this.currentTicket.status !== myTicket.status;

        if (isNew || changed) {
          this.currentTicket = myTicket;
          this.currentVitals = null;
          this.loadCurrentVitals();
        }
      } else if (!this.assignedClinicId && res.data.length > 0) {
        this.assignedClinicId = res.data[0]?.clinicId;
        this.assignedClinicName = res.data[0]?.clinicName;
      }

      if (this.assignedClinicId) this.loadClinicQueue();

      // Keep retrying vitals until they arrive
      if (this.currentTicket && !this.currentVitals) {
        this.loadCurrentVitals();
      }
    });
  }

  loadClinicQueue(): void {
    this.ticketService.getQueue(this.assignedClinicId!).subscribe(res => {
      if (res.success) this.queue = res.data;
    });
  }

  callNext(): void {
    if (!this.assignedClinicId) return;
    this.calling = true;
    this.ticketService.callNext(this.assignedClinicId).subscribe({
      next: res => {
        if (res.success) {
          this.lastCalledTicket = res.data;
          this.currentTicket = res.data;
          this.currentVitals = null;
          this.notification.info(`Llamando: ${res.data.ticketNumber} — dirija al paciente al área de Signos Vitales`);
        }
        this.calling = false;
      },
      error: () => {
        this.notification.error('Error al llamar paciente');
        this.calling = false;
      }
    });
  }

  private loadCurrentVitals(): void {
    if (!this.currentTicket) return;
    this.vitalSignsService.getByTicket(this.currentTicket.id).subscribe({
      next: res => { if (res.success) this.currentVitals = res.data; },
      error: () => {}
    });
  }

  addItem(): void { this.prescriptionItems.push({ medicineId: null, quantity: 1, dosage: '', instructions: '' }); }
  removeItem(i: number): void { this.prescriptionItems.splice(i, 1); }

  addLabItem(): void { this.labOrderItems.push({ labExamId: null, notes: '' }); }
  removeLabItem(i: number): void { this.labOrderItems.splice(i, 1); }

  getExamsByCategory(category: string): LabExam[] {
    return this.labExams.filter(e => e.category === category);
  }

  completeDiagnosis(): void {
    if (!this.currentTicket) return;
    const userId = this.authService.getUserId();

    const finalize = () => {
      this.ticketService.complete(this.currentTicket!.id).subscribe({
        next: () => {
          this.notification.success('Consulta completada');
          this.currentTicket = null;
          this.currentVitals = null;
          this.prescriptionItems = [];
          this.labOrderItems = [];
          this.consultationForm.reset();
          this.loadClinicQueue();
        }
      });
    };

    // Crear órdenes de laboratorio si hay
    const createLabOrders = (onDone: () => void) => {
      const validLabItems = this.labOrderItems.filter(l => l.labExamId);
      if (validLabItems.length === 0) { onDone(); return; }
      let pending = validLabItems.length;
      validLabItems.forEach(l => {
        this.labService.create({
          patientId: this.currentTicket!.patientId,
          doctorId: userId,
          ticketId: this.currentTicket!.id,
          labExamId: l.labExamId,
          notes: l.notes
        }).subscribe({
          next: () => { if (--pending === 0) { this.notification.success('Órdenes de laboratorio generadas'); onDone(); } },
          error: () => { if (--pending === 0) onDone(); }
        });
      });
    };

    // Crear receta si hay medicamentos
    if (this.prescriptionItems.length > 0) {
      this.prescriptionService.create({
        patientId: this.currentTicket.patientId,
        doctorId: userId,
        ticketId: this.currentTicket.id,
        notes: this.consultationForm.value.notes,
        items: this.prescriptionItems
      }).subscribe({
        next: () => { this.notification.success('Receta generada'); createLabOrders(finalize); },
        error: () => createLabOrders(finalize)
      });
    } else {
      createLabOrders(finalize);
    }
  }

  markAbsent(): void {
    if (!this.currentTicket) return;
    this.ticketService.markAbsent(this.currentTicket.id).subscribe({
      next: () => {
        this.notification.info('Paciente marcado como ausente');
        this.currentTicket = null;
        this.currentVitals = null;
        this.loadClinicQueue();
      }
    });
  }

  ngOnDestroy(): void { this.sub?.unsubscribe(); }
}
