import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { PatientService } from '../../../shared/services/patient.service';
import { LabService } from '../../../shared/services/lab.service';
import { PaymentService } from '../../../shared/services/payment.service';
import { TicketService } from '../../../shared/services/ticket.service';
import { Patient } from '../../../core/models/patient.model';

@Component({
  selector: 'app-patient-detail',
  standalone: true,
  imports: [
    CommonModule, RouterLink, MatCardModule, MatTabsModule,
    MatIconModule, MatButtonModule, MatChipsModule, MatTableModule
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
          <button mat-raised-button color="primary" routerLink="/patients/register">
            <mat-icon>add</mat-icon> Nueva Cita
          </button>
          <button mat-button routerLink="/patients">
            <mat-icon>arrow_back</mat-icon> Volver
          </button>
        </div>
      </div>

      <mat-tab-group>
        <!-- Info General -->
        <mat-tab label="Información General">
          <div class="tab-content">
            <div class="info-grid">
              <div class="info-item">
                <mat-icon>badge</mat-icon>
                <div><label>DPI</label><span>{{ patient.dpi }}</span></div>
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
                <div><label>Contacto Emergencia</label><span>{{ patient.emergencyContact || 'No registrado' }}</span></div>
              </div>
              <div class="info-item">
                <mat-icon>health_and_safety</mat-icon>
                <div>
                  <label>Seguro Médico</label>
                  <span *ngIf="patient.insuranceName">{{ patient.insuranceName }} ({{ patient.discountPercentage }}% descuento)</span>
                  <span *ngIf="!patient.insuranceName" class="text-muted">Sin seguro</span>
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
  `]
})
export class PatientDetailComponent implements OnInit {
  patient: Patient | null = null;
  tickets: any[] = [];
  labOrders: any[] = [];
  payments: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private ticketService: TicketService,
    private labService: LabService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.patientService.getById(id).subscribe(res => {
      if (res.success) {
        this.patient = res.data;
        this.loadRelated(id);
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
