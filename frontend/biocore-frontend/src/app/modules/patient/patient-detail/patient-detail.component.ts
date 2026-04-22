import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { PatientService } from '../../../shared/services/patient.service';
import { LabService } from '../../../shared/services/lab.service';
import { PaymentService, InsuranceService } from '../../../shared/services/payment.service';
import { TicketService, PrescriptionService, VitalSignsService } from '../../../shared/services/ticket.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { Patient } from '../../../core/models/patient.model';

@Component({
  selector: 'app-patient-detail',
  standalone: true,
  imports: [
    CommonModule, RouterLink, ReactiveFormsModule,
    MatCardModule, MatTabsModule, MatIconModule, MatButtonModule,
    MatChipsModule, MatTableModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatExpansionModule, MatDividerModule
  ],
  template: `
    <div class="page-container" *ngIf="patient">
      <div class="page-header">
        <h1>
          <mat-icon>person</mat-icon>
          {{ patient.firstName }} {{ patient.lastName }}
        </h1>
        <div class="header-actions">
          <mat-chip color="primary">{{ patient.patientCode }}</mat-chip>
          <ng-container *ngIf="!editMode">
            <button mat-stroked-button color="primary" (click)="startEdit()">
              <mat-icon>edit</mat-icon> Editar
            </button>
            <button mat-button routerLink="/patients">
              <mat-icon>arrow_back</mat-icon> Volver
            </button>
          </ng-container>
          <ng-container *ngIf="editMode">
            <button mat-raised-button color="primary" (click)="saveEdit()" [disabled]="saving || editForm.invalid">
              <mat-icon>save</mat-icon> {{ saving ? 'Guardando...' : 'Guardar' }}
            </button>
            <button mat-button (click)="cancelEdit()">
              <mat-icon>close</mat-icon> Cancelar
            </button>
          </ng-container>
        </div>
      </div>

      <mat-tab-group>

        <!-- ── Tab 1: Información General ── -->
        <mat-tab label="Información General">
          <div class="tab-content">
            <form *ngIf="editMode" [formGroup]="editForm" class="edit-grid">
              <mat-form-field appearance="outline"><mat-label>Nombres *</mat-label><input matInput formControlName="firstName"></mat-form-field>
              <mat-form-field appearance="outline"><mat-label>Apellidos *</mat-label><input matInput formControlName="lastName"></mat-form-field>
              <mat-form-field appearance="outline"><mat-label>DPI *</mat-label><input matInput formControlName="dpi"></mat-form-field>
              <mat-form-field appearance="outline"><mat-label>Fecha de Nacimiento</mat-label><mat-icon matPrefix>cake</mat-icon><input matInput type="date" formControlName="birthDate"></mat-form-field>
              <mat-form-field appearance="outline"><mat-label>Teléfono</mat-label><input matInput formControlName="phone"></mat-form-field>
              <mat-form-field appearance="outline"><mat-label>Correo Electrónico</mat-label><input matInput formControlName="email"></mat-form-field>
              <mat-form-field appearance="outline"><mat-label>Dirección</mat-label><input matInput formControlName="address"></mat-form-field>
              <mat-form-field appearance="outline"><mat-label>Contacto de Emergencia</mat-label><input matInput formControlName="emergencyContact"></mat-form-field>
              <mat-form-field appearance="outline"><mat-label>Teléfono de Emergencia</mat-label><input matInput formControlName="emergencyPhone"></mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Seguro Médico</mat-label>
                <mat-select formControlName="insuranceId">
                  <mat-option [value]="null">Sin seguro</mat-option>
                  <mat-option *ngFor="let ins of insurances" [value]="ins.id">{{ ins.name }}</mat-option>
                </mat-select>
              </mat-form-field>
              <mat-form-field appearance="outline"><mat-label>No. de Póliza / Carné</mat-label><input matInput formControlName="insuranceNumber" placeholder="Opcional"></mat-form-field>
            </form>

            <div class="info-grid" *ngIf="!editMode">
              <div class="info-item"><mat-icon>badge</mat-icon><div><label>DPI</label><span>{{ patient.dpi }}</span></div></div>
              <div class="info-item"><mat-icon>cake</mat-icon><div><label>Fecha de Nacimiento</label><span>{{ patient.birthDate ? (patient.birthDate | date:'dd/MM/yyyy') : 'No registrada' }}</span></div></div>
              <div class="info-item"><mat-icon>phone</mat-icon><div><label>Teléfono</label><span>{{ patient.phone || 'No registrado' }}</span></div></div>
              <div class="info-item"><mat-icon>email</mat-icon><div><label>Correo</label><span>{{ patient.email || 'No registrado' }}</span></div></div>
              <div class="info-item"><mat-icon>home</mat-icon><div><label>Dirección</label><span>{{ patient.address || 'No registrada' }}</span></div></div>
              <div class="info-item"><mat-icon>contact_phone</mat-icon><div><label>Contacto de Emergencia</label><span>{{ patient.emergencyContact || 'No registrado' }}</span></div></div>
              <div class="info-item"><mat-icon>phone_forwarded</mat-icon><div><label>Teléfono de Emergencia</label><span>{{ patient.emergencyPhone || 'No registrado' }}</span></div></div>
              <div class="info-item">
                <mat-icon>health_and_safety</mat-icon>
                <div><label>Seguro Médico</label>
                  <span *ngIf="patient.insuranceName">{{ patient.insuranceName }} ({{ patient.discountPercentage }}% descuento)</span>
                  <span *ngIf="!patient.insuranceName" class="text-muted">Sin seguro</span>
                </div>
              </div>
              <div class="info-item" *ngIf="patient.insuranceNumber"><mat-icon>confirmation_number</mat-icon><div><label>No. de Póliza / Carné</label><span>{{ patient.insuranceNumber }}</span></div></div>
              <div class="info-item"><mat-icon>manage_accounts</mat-icon><div><label>Usuario del Portal</label><span *ngIf="patient.username">{{ patient.username }}</span><span *ngIf="!patient.username" class="text-muted">Sin cuenta</span></div></div>
              <div class="info-item"><mat-icon>calendar_today</mat-icon><div><label>Registrado</label><span>{{ patient.createdAt | date:'dd/MM/yyyy' }}</span></div></div>
            </div>
          </div>
        </mat-tab>

        <!-- ── Tab 2: Historial de Consultas ── -->
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon class="tab-icon">medical_services</mat-icon>
            Consultas ({{ completedTickets.length }})
          </ng-template>
          <div class="tab-content">

            <div *ngIf="completedTickets.length === 0" class="empty-state">
              <mat-icon>medical_services</mat-icon>
              <p>Sin consultas registradas</p>
            </div>

            <mat-accordion multi="false">
              <mat-expansion-panel *ngFor="let t of completedTickets"
                (opened)="onExpandTicket(t)"
                class="consult-panel">

                <!-- Panel header -->
                <mat-expansion-panel-header>
                  <mat-panel-title class="panel-title">
                    <span class="ticket-num-badge">{{ t.ticketNumber }}</span>
                    <div class="panel-meta">
                      <span class="panel-clinic">{{ t.clinicName }}</span>
                      <span class="panel-date">{{ t.completedAt ? (t.completedAt | date:'dd/MM/yyyy HH:mm') : (t.createdAt | date:'dd/MM/yyyy') }}</span>
                    </div>
                  </mat-panel-title>
                  <mat-panel-description class="panel-desc">
                    <span *ngIf="t.doctorName" class="panel-doctor">Dr. {{ t.doctorName }}</span>
                    <span [class]="'status-chip status-' + t.status.toLowerCase().replaceAll('_','-')">{{ statusLabel(t.status) }}</span>
                  </mat-panel-description>
                </mat-expansion-panel-header>

                <!-- ── Diagnosis ── -->
                <div class="detail-section">
                  <div class="section-title"><mat-icon>description</mat-icon> Diagnóstico / Notas</div>
                  <p class="diagnosis-text" *ngIf="t.notes">{{ t.notes }}</p>
                  <p class="no-data" *ngIf="!t.notes">Sin notas registradas</p>
                </div>

                <mat-divider></mat-divider>

                <!-- ── Vital Signs ── -->
                <div class="detail-section">
                  <div class="section-title"><mat-icon>monitor_heart</mat-icon> Signos Vitales</div>
                  <ng-container *ngIf="vitalsCache[t.id] as vs; else noVitals">
                    <div class="vitals-grid">
                      <div class="vital-item"><span class="vital-label">Presión Arterial</span><span class="vital-value">{{ vs.bloodPressure || '—' }}</span></div>
                      <div class="vital-item"><span class="vital-label">Frec. Cardíaca</span><span class="vital-value">{{ vs.heartRate ? vs.heartRate + ' bpm' : '—' }}</span></div>
                      <div class="vital-item"><span class="vital-label">Temperatura</span><span class="vital-value">{{ vs.temperature ? vs.temperature + ' °C' : '—' }}</span></div>
                      <div class="vital-item"><span class="vital-label">Peso</span><span class="vital-value">{{ vs.weight ? vs.weight + ' kg' : '—' }}</span></div>
                      <div class="vital-item"><span class="vital-label">Talla</span><span class="vital-value">{{ vs.height ? vs.height + ' cm' : '—' }}</span></div>
                      <div class="vital-item"><span class="vital-label">SatO₂</span><span class="vital-value">{{ vs.oxygenSaturation ? vs.oxygenSaturation + '%' : '—' }}</span></div>
                    </div>
                  </ng-container>
                  <ng-template #noVitals>
                    <p class="no-data">Sin signos vitales registrados</p>
                  </ng-template>
                </div>

                <mat-divider></mat-divider>

                <!-- ── Prescription ── -->
                <div class="detail-section">
                  <div class="section-title"><mat-icon>medication</mat-icon> Receta Médica</div>
                  <ng-container *ngIf="getPrescription(t.id) as rx">
                    <div class="rx-notes" *ngIf="rx.notes">{{ rx.notes }}</div>
                    <div class="medicine-list">
                      <div class="medicine-item" *ngFor="let item of rx.items">
                        <mat-icon style="font-size:16px;color:#1D6C61">medication</mat-icon>
                        <div class="med-info">
                          <span class="med-name">{{ item.medicineName }}</span>
                          <span class="med-detail">Cant: {{ item.quantity }} · {{ item.dosage }}</span>
                          <span class="med-instructions" *ngIf="item.instructions">{{ item.instructions }}</span>
                        </div>
                        <span class="dispatched-badge" *ngIf="item.dispatched">Despachado</span>
                      </div>
                    </div>
                    <div class="rx-status" [ngClass]="'rx-' + rx.status.toLowerCase()">
                      Estado receta: {{ rxStatusLabel(rx.status) }}
                    </div>
                  </ng-container>
                  <p class="no-data" *ngIf="!getPrescription(t.id)">Sin receta registrada</p>
                </div>

                <mat-divider></mat-divider>

                <!-- ── Lab Orders ── -->
                <div class="detail-section">
                  <div class="section-title"><mat-icon>science</mat-icon> Órdenes de Laboratorio</div>
                  <ng-container *ngIf="getLabOrders(t.id).length > 0; else noLab">
                    <div class="lab-item" *ngFor="let lo of getLabOrders(t.id)">
                      <mat-icon style="font-size:16px;color:#1565c0">biotech</mat-icon>
                      <div class="lab-info">
                        <span class="lab-name">{{ lo.labExamName || lo.sampleType }}</span>
                        <span class="lab-detail">Fecha: {{ lo.orderDate }} · Vence: {{ lo.expirationDate }}</span>
                        <span class="lab-notes" *ngIf="lo.notes">{{ lo.notes }}</span>
                      </div>
                      <span class="lab-status-badge"
                            [style.background]="lo.status==='COMPLETED'?'#e8f5e9':lo.status==='EXPIRED'?'#ffebee':'#fff3e0'"
                            [style.color]="lo.status==='COMPLETED'?'#2e7d32':lo.status==='EXPIRED'?'#c62828':'#e65100'">
                        {{ lo.status }}
                      </span>
                    </div>
                  </ng-container>
                  <ng-template #noLab><p class="no-data">Sin órdenes de laboratorio</p></ng-template>
                </div>

              </mat-expansion-panel>
            </mat-accordion>

          </div>
        </mat-tab>

        <!-- ── Tab 3: Laboratorios ── -->
        <mat-tab label="Laboratorios">
          <div class="tab-content">
            <div class="queue-ticket" *ngFor="let o of labOrders">
              <mat-icon style="color:#1565c0">science</mat-icon>
              <div class="ticket-info">
                <div class="ticket-patient">{{ o.sampleType }} · Dr. {{ o.doctorName }}</div>
                <div class="ticket-meta">{{ o.orderDate }} · Vence: {{ o.expirationDate }}</div>
              </div>
              <span [style.background]="o.status==='COMPLETED'?'#e8f5e9':o.status==='EXPIRED'?'#ffebee':'#fff3e0'"
                    style="padding:4px 12px;border-radius:12px;font-size:0.8rem;">{{ o.status }}</span>
            </div>
            <p *ngIf="labOrders.length === 0" class="text-center" style="color:#9e9e9e;padding:24px">Sin órdenes de laboratorio</p>
          </div>
        </mat-tab>

        <!-- ── Tab 4: Pagos ── -->
        <mat-tab label="Pagos">
          <div class="tab-content">
            <div class="queue-ticket" *ngFor="let p of payments">
              <mat-icon style="color:#2e7d32">payments</mat-icon>
              <div class="ticket-info">
                <div class="ticket-patient">{{ p.type }} · Q{{ p.netAmount }}</div>
                <div class="ticket-meta">{{ p.createdAt | date:'dd/MM/yyyy' }}<span *ngIf="p.invoiceNumber"> · {{ p.invoiceNumber }}</span></div>
              </div>
              <span [class]="p.status==='PAID'?'status-completed':'status-waiting'" style="padding:4px 12px;border-radius:12px;font-size:0.8rem;">{{ p.status }}</span>
            </div>
            <p *ngIf="payments.length === 0" class="text-center" style="color:#9e9e9e;padding:24px">Sin pagos registrados</p>
          </div>
        </mat-tab>

      </mat-tab-group>
    </div>
  `,
  styles: [`
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .page-header h1 { display: flex; align-items: center; gap: 8px; font-size: 1.6rem; font-weight: 500; color: #1565c0; }
    .header-actions { display: flex; align-items: center; gap: 12px; }
    .tab-content { padding: 24px 0; }
    .tab-icon { font-size: 18px; margin-right: 6px; vertical-align: middle; }

    /* Info */
    .info-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; }
    .info-item { display: flex; align-items: flex-start; gap: 12px; padding: 16px; background: #f8f9ff; border-radius: 8px; }
    .info-item mat-icon { color: #1565c0; margin-top: 2px; }
    .info-item label { display: block; font-size: 0.75rem; color: #757575; text-transform: uppercase; margin-bottom: 4px; }
    .info-item span { font-size: 0.95rem; font-weight: 500; }
    .text-muted { color: #9e9e9e !important; font-weight: 400 !important; }
    .edit-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; margin-bottom: 8px; }

    /* Consultation accordion */
    .consult-panel { margin-bottom: 10px; border-radius: 10px !important; }
    .panel-title { display: flex; align-items: center; gap: 12px; flex: 1; min-width: 0; }
    .ticket-num-badge { background: #1D6C61; color: white; padding: 4px 10px; border-radius: 8px; font-weight: 700; font-size: 1rem; white-space: nowrap; }
    .panel-meta { display: flex; flex-direction: column; gap: 2px; }
    .panel-clinic { font-weight: 600; font-size: 0.9rem; }
    .panel-date { font-size: 0.75rem; color: #757575; }
    .panel-desc { display: flex; align-items: center; gap: 12px; justify-content: flex-end; }
    .panel-doctor { font-size: 0.82rem; color: #1D6C61; }

    /* Status chips */
    .status-chip { padding: 3px 10px; border-radius: 10px; font-size: 0.75rem; font-weight: 600; }
    .status-completed { background: #e8f5e9; color: #2e7d32; }
    .status-absent { background: #ffebee; color: #c62828; }
    .status-waiting { background: #fff8e1; color: #f57f17; }
    .status-in-consultation { background: #e8f5e9; color: #2e7d32; }
    .status-being-called { background: #e3f2fd; color: #1565c0; }
    .status-cancelled-no-payment { background: #fce4ec; color: #880e4f; }

    /* Detail sections */
    .detail-section { padding: 16px 0; }
    .section-title { display: flex; align-items: center; gap: 8px; font-weight: 600; font-size: 0.9rem; color: #1D6C61; margin-bottom: 12px; }
    .diagnosis-text { font-size: 0.95rem; line-height: 1.6; color: #333; background: #f8f9ff; padding: 12px; border-radius: 8px; white-space: pre-wrap; }
    .no-data { color: #9e9e9e; font-size: 0.85rem; font-style: italic; }

    /* Vitals */
    .vitals-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 10px; }
    .vital-item { background: #f0faf8; border-radius: 8px; padding: 10px 12px; text-align: center; }
    .vital-label { display: block; font-size: 0.7rem; color: #757575; text-transform: uppercase; margin-bottom: 4px; }
    .vital-value { font-size: 1rem; font-weight: 700; color: #1D6C61; }

    /* Prescription */
    .rx-notes { font-size: 0.85rem; color: #555; margin-bottom: 10px; font-style: italic; }
    .medicine-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 10px; }
    .medicine-item { display: flex; align-items: flex-start; gap: 10px; background: #f8fff8; border-radius: 8px; padding: 10px 12px; border-left: 3px solid #1D6C61; }
    .med-info { flex: 1; }
    .med-name { font-weight: 600; font-size: 0.9rem; display: block; }
    .med-detail { font-size: 0.78rem; color: #757575; display: block; margin-top: 2px; }
    .med-instructions { font-size: 0.75rem; color: #9e9e9e; display: block; font-style: italic; }
    .dispatched-badge { background: #e8f5e9; color: #2e7d32; padding: 2px 8px; border-radius: 8px; font-size: 0.72rem; font-weight: 600; white-space: nowrap; }
    .rx-status { font-size: 0.78rem; font-weight: 600; display: inline-block; padding: 3px 10px; border-radius: 8px; }
    .rx-pending { background: #fff3e0; color: #e65100; }
    .rx-dispatched { background: #e8f5e9; color: #2e7d32; }
    .rx-partially_dispatched { background: #e3f2fd; color: #1565c0; }

    /* Lab */
    .lab-item { display: flex; align-items: flex-start; gap: 10px; background: #f0f4ff; border-radius: 8px; padding: 10px 12px; border-left: 3px solid #1565c0; margin-bottom: 6px; }
    .lab-info { flex: 1; }
    .lab-name { font-weight: 600; font-size: 0.9rem; display: block; }
    .lab-detail { font-size: 0.78rem; color: #757575; display: block; margin-top: 2px; }
    .lab-notes { font-size: 0.75rem; color: #9e9e9e; display: block; font-style: italic; }
    .lab-status-badge { padding: 2px 8px; border-radius: 8px; font-size: 0.72rem; font-weight: 600; white-space: nowrap; }

    /* Visit list (legacy tabs) */
    .queue-ticket { display: flex; align-items: center; gap: 16px; padding: 12px 16px; background: white; border-radius: 8px; margin-bottom: 8px; box-shadow: 0 1px 4px rgba(0,0,0,0.06); border: 1px solid #e8e8e8; }
    .ticket-info { flex: 1; }
    .ticket-patient { font-weight: 500; }
    .ticket-meta { font-size: 0.78rem; color: #757575; margin-top: 2px; }

    /* Empty */
    .empty-state { text-align: center; padding: 48px; color: #9e9e9e; }
    .empty-state mat-icon { font-size: 48px; width: 48px; height: 48px; color: #3EB9A8; opacity: 0.5; margin-bottom: 8px; display: block; }
  `]
})
export class PatientDetailComponent implements OnInit {
  patient: Patient | null = null;
  tickets: any[] = [];
  completedTickets: any[] = [];
  labOrders: any[] = [];
  payments: any[] = [];
  prescriptions: any[] = [];
  vitalsCache: Record<number, any> = {};
  patientId!: number;
  editMode = false;
  saving = false;
  editForm!: FormGroup;
  insurances: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private patientService: PatientService,
    private ticketService: TicketService,
    private prescriptionService: PrescriptionService,
    private vitalSignsService: VitalSignsService,
    private labService: LabService,
    private paymentService: PaymentService,
    private insuranceService: InsuranceService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.patientId = Number(this.route.snapshot.paramMap.get('id'));
    this.patientService.getById(this.patientId).subscribe(res => {
      if (res.success) {
        this.patient = res.data;
        this.loadRelated(this.patientId);
      }
    });
    this.insuranceService.getAll().subscribe(res => { if (res.success) this.insurances = res.data; });
  }

  loadRelated(id: number): void {
    this.ticketService.getByPatient(id).subscribe(res => {
      if (res.success) {
        this.tickets = res.data;
        this.completedTickets = res.data.filter((t: any) =>
          ['COMPLETED', 'IN_CONSULTATION', 'BEING_CALLED', 'ABSENT'].includes(t.status)
        );
      }
    });
    this.labService.getByPatient(id).subscribe(res => {
      if (res.success) this.labOrders = res.data;
    });
    this.paymentService.getByPatient(id).subscribe(res => {
      if (res.success) this.payments = res.data;
    });
    this.prescriptionService.getByPatient(id).subscribe(res => {
      if (res.success) this.prescriptions = res.data;
    });
  }

  onExpandTicket(ticket: any): void {
    if (this.vitalsCache[ticket.id] !== undefined) return;
    this.vitalSignsService.getByTicket(ticket.id).subscribe({
      next: res => { this.vitalsCache[ticket.id] = res.success ? res.data : null; },
      error: () => { this.vitalsCache[ticket.id] = null; }
    });
  }

  getPrescription(ticketId: number): any | null {
    return this.prescriptions.find(p => p.ticketId === ticketId) ?? null;
  }

  getLabOrders(ticketId: number): any[] {
    return this.labOrders.filter(o => o.ticketId === ticketId);
  }

  statusLabel(s: string): string {
    const m: Record<string, string> = {
      COMPLETED: 'Completado', ABSENT: 'Ausente', WAITING: 'En espera',
      IN_CONSULTATION: 'En consulta', BEING_CALLED: 'Siendo llamado',
      CANCELLED_NO_PAYMENT: 'Cancelado'
    };
    return m[s] ?? s;
  }

  rxStatusLabel(s: string): string {
    const m: Record<string, string> = {
      PENDING: 'Pendiente', DISPATCHED: 'Despachado', PARTIALLY_DISPATCHED: 'Parcial'
    };
    return m[s] ?? s;
  }

  startEdit(): void {
    if (!this.patient) return;
    this.editForm = this.fb.group({
      firstName:        [this.patient.firstName,        Validators.required],
      lastName:         [this.patient.lastName,         Validators.required],
      dpi:              [this.patient.dpi,              Validators.required],
      birthDate:        [this.patient.birthDate         || ''],
      phone:            [this.patient.phone             || ''],
      email:            [this.patient.email             || ''],
      address:          [this.patient.address           || ''],
      emergencyContact: [this.patient.emergencyContact  || ''],
      emergencyPhone:   [this.patient.emergencyPhone    || ''],
      insuranceId:      [this.patient.insuranceId       ?? null],
      insuranceNumber:  [this.patient.insuranceNumber   || '']
    });
    this.editMode = true;
  }

  cancelEdit(): void { this.editMode = false; }

  saveEdit(): void {
    if (this.editForm.invalid) return;
    this.saving = true;
    this.patientService.update(this.patientId, this.editForm.value).subscribe({
      next: res => {
        if (res.success) {
          this.patient = res.data;
          this.notification.success('Paciente actualizado exitosamente');
          this.editMode = false;
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
