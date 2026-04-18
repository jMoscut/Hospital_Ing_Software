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
import { PatientService } from '../../../shared/services/patient.service';
import { LabService } from '../../../shared/services/lab.service';
import { PaymentService, InsuranceService } from '../../../shared/services/payment.service';
import { TicketService } from '../../../shared/services/ticket.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { Patient } from '../../../core/models/patient.model';

@Component({
  selector: 'app-patient-detail',
  standalone: true,
  imports: [
    CommonModule, RouterLink, ReactiveFormsModule,
    MatCardModule, MatTabsModule, MatIconModule, MatButtonModule,
    MatChipsModule, MatTableModule, MatFormFieldModule, MatInputModule, MatSelectModule
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
        <!-- Info General -->
        <mat-tab label="Información General">
          <div class="tab-content">

            <!-- Edit form -->
            <form *ngIf="editMode" [formGroup]="editForm" class="edit-grid">
              <mat-form-field appearance="outline">
                <mat-label>Nombres *</mat-label>
                <input matInput formControlName="firstName">
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Apellidos *</mat-label>
                <input matInput formControlName="lastName">
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>DPI *</mat-label>
                <input matInput formControlName="dpi">
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Teléfono</mat-label>
                <input matInput formControlName="phone">
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Correo Electrónico</mat-label>
                <input matInput formControlName="email">
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Dirección</mat-label>
                <input matInput formControlName="address">
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Contacto de Emergencia</mat-label>
                <input matInput formControlName="emergencyContact">
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Teléfono de Emergencia</mat-label>
                <input matInput formControlName="emergencyPhone">
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Seguro Médico</mat-label>
                <mat-select formControlName="insuranceId">
                  <mat-option [value]="null">Sin seguro</mat-option>
                  <mat-option *ngFor="let ins of insurances" [value]="ins.id">{{ ins.name }}</mat-option>
                </mat-select>
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>No. de Póliza / Carné de Seguro</mat-label>
                <input matInput formControlName="insuranceNumber" placeholder="Opcional">
              </mat-form-field>
            </form>

            <!-- Read-only view -->
            <div class="info-grid" *ngIf="!editMode">
              <div class="info-item">
                <mat-icon>badge</mat-icon>
                <div><label>DPI</label><span>{{ patient.dpi }}</span></div>
              </div>
              <div class="info-item">
                <mat-icon>cake</mat-icon>
                <div><label>Fecha de Nacimiento</label><span>{{ patient.birthDate ? (patient.birthDate | date:'dd/MM/yyyy') : 'No registrada' }}</span></div>
              </div>
              <div class="info-item">
                <mat-icon>phone</mat-icon>
                <div><label>Teléfono</label><span>{{ patient.phone || 'No registrado' }}</span></div>
              </div>
              <div class="info-item">
                <mat-icon>email</mat-icon>
                <div><label>Correo</label><span>{{ patient.email || 'No registrado' }}</span></div>
              </div>
              <div class="info-item">
                <mat-icon>home</mat-icon>
                <div><label>Dirección</label><span>{{ patient.address || 'No registrada' }}</span></div>
              </div>
              <div class="info-item">
                <mat-icon>contact_phone</mat-icon>
                <div>
                  <label>Contacto de Emergencia</label>
                  <span>{{ patient.emergencyContact || 'No registrado' }}</span>
                </div>
              </div>
              <div class="info-item">
                <mat-icon>phone_forwarded</mat-icon>
                <div>
                  <label>Teléfono de Emergencia</label>
                  <span>{{ patient.emergencyPhone || 'No registrado' }}</span>
                </div>
              </div>
              <div class="info-item">
                <mat-icon>health_and_safety</mat-icon>
                <div>
                  <label>Seguro Médico</label>
                  <span *ngIf="patient.insuranceName">{{ patient.insuranceName }} ({{ patient.discountPercentage }}% descuento)</span>
                  <span *ngIf="!patient.insuranceName" class="text-muted">Sin seguro</span>
                </div>
              </div>
              <div class="info-item" *ngIf="patient.insuranceNumber">
                <mat-icon>confirmation_number</mat-icon>
                <div><label>No. de Póliza / Carné</label><span>{{ patient.insuranceNumber }}</span></div>
              </div>
              <div class="info-item">
                <mat-icon>manage_accounts</mat-icon>
                <div>
                  <label>Usuario del Portal</label>
                  <span *ngIf="patient.username">{{ patient.username }}</span>
                  <span *ngIf="!patient.username" class="text-muted">Sin cuenta de portal</span>
                </div>
              </div>
              <div class="info-item">
                <mat-icon>calendar_today</mat-icon>
                <div><label>Registrado</label><span>{{ patient.createdAt | date:'dd/MM/yyyy' }}</span></div>
              </div>
            </div>
          </div>
        </mat-tab>

        <!-- Historial de Visitas -->
        <mat-tab label="Historial de Visitas">
          <div class="tab-content">
            <div class="queue-ticket" *ngFor="let t of tickets">
              <div class="ticket-number">{{ t.ticketNumber }}</div>
              <div class="ticket-info">
                <div class="ticket-patient">{{ t.clinicName }} · {{ t.type }}</div>
                <div class="ticket-meta">{{ t.createdAt | date:'dd/MM/yyyy HH:mm' }}</div>
              </div>
              <span [class]="'status-' + t.status.toLowerCase().replace('_', '-')"
                    style="padding:4px 12px;border-radius:12px;font-size:0.8rem;">
                {{ t.status }}
              </span>
            </div>
            <p *ngIf="tickets.length === 0" class="text-center" style="color:#9e9e9e;padding:24px">
              Sin visitas registradas
            </p>
          </div>
        </mat-tab>

        <!-- Laboratorios -->
        <mat-tab label="Laboratorios">
          <div class="tab-content">
            <div class="queue-ticket" *ngFor="let o of labOrders">
              <mat-icon style="color:#1565c0">science</mat-icon>
              <div class="ticket-info">
                <div class="ticket-patient">{{ o.sampleType }} · Dr. {{ o.doctorName }}</div>
                <div class="ticket-meta">{{ o.orderDate }} · Vence: {{ o.expirationDate }}</div>
              </div>
              <span [style.background]="o.status === 'COMPLETED' ? '#e8f5e9' : o.status === 'EXPIRED' ? '#ffebee' : '#fff3e0'"
                    style="padding:4px 12px;border-radius:12px;font-size:0.8rem;">
                {{ o.status }}
              </span>
            </div>
            <p *ngIf="labOrders.length === 0" class="text-center" style="color:#9e9e9e;padding:24px">
              Sin órdenes de laboratorio
            </p>
          </div>
        </mat-tab>

        <!-- Pagos -->
        <mat-tab label="Pagos">
          <div class="tab-content">
            <div class="queue-ticket" *ngFor="let p of payments">
              <mat-icon style="color:#2e7d32">payments</mat-icon>
              <div class="ticket-info">
                <div class="ticket-patient">{{ p.type }} · Q{{ p.netAmount }}</div>
                <div class="ticket-meta">
                  {{ p.createdAt | date:'dd/MM/yyyy' }}
                  <span *ngIf="p.invoiceNumber"> · {{ p.invoiceNumber }}</span>
                </div>
              </div>
              <span [class]="p.status === 'PAID' ? 'status-completed' : 'status-waiting'"
                    style="padding:4px 12px;border-radius:12px;font-size:0.8rem;">
                {{ p.status }}
              </span>
            </div>
            <p *ngIf="payments.length === 0" class="text-center" style="color:#9e9e9e;padding:24px">
              Sin pagos registrados
            </p>
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
    .info-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; }
    .info-item { display: flex; align-items: flex-start; gap: 12px; padding: 16px; background: #f8f9ff; border-radius: 8px; }
    .info-item mat-icon { color: #1565c0; margin-top: 2px; }
    .info-item label { display: block; font-size: 0.75rem; color: #757575; text-transform: uppercase; margin-bottom: 4px; }
    .info-item span { font-size: 0.95rem; font-weight: 500; }
    .text-muted { color: #9e9e9e !important; font-weight: 400 !important; }
    .edit-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; margin-bottom: 8px; }
  `]
})
export class PatientDetailComponent implements OnInit {
  patient: Patient | null = null;
  tickets: any[] = [];
  labOrders: any[] = [];
  payments: any[] = [];
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

  startEdit(): void {
    if (!this.patient) return;
    this.editForm = this.fb.group({
      firstName:        [this.patient.firstName, Validators.required],
      lastName:         [this.patient.lastName,  Validators.required],
      dpi:              [this.patient.dpi,        Validators.required],
      phone:            [this.patient.phone            || ''],
      email:            [this.patient.email            || ''],
      address:          [this.patient.address          || ''],
      emergencyContact: [this.patient.emergencyContact || ''],
      emergencyPhone:   [this.patient.emergencyPhone   || ''],
      insuranceId:      [this.patient.insuranceId      ?? null],
      insuranceNumber:  [this.patient.insuranceNumber  || '']
    });
    this.editMode = true;
  }

  cancelEdit(): void {
    this.editMode = false;
  }

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

  loadRelated(id: number): void {
    this.ticketService.getAll().subscribe(res => {
      if (res.success) this.tickets = res.data.filter((t: any) => t.patientId === id);
    });
    this.labService.getByPatient(id).subscribe(res => {
      if (res.success) this.labOrders = res.data;
    });
    this.paymentService.getByPatient(id).subscribe(res => {
      if (res.success) this.payments = res.data;
    });
  }
}
