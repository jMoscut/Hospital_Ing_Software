import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PatientService } from '../../shared/services/patient.service';
import { PaymentService } from '../../shared/services/payment.service';
import { AppointmentService } from '../../shared/services/ticket.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Patient } from '../../core/models/patient.model';
import { Payment } from '../../core/models/payment.model';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, MatCardModule, MatButtonModule,
    MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatTableModule, MatDividerModule, MatTabsModule, MatProgressSpinnerModule
  ],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Caja y Facturación</h1>
      </div>

      <mat-tab-group animationDuration="200ms">

        <!-- TAB 1: Pagos Generales -->
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon style="font-size:18px;margin-right:6px;vertical-align:middle">payments</mat-icon>
            Pagos Generales
          </ng-template>
          <div style="padding:24px 0">
      <div class="payments-layout">
        <!-- Búsqueda de Paciente -->
        <mat-card>
          <mat-card-header>
            <mat-card-title>Identificar Paciente</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <form [formGroup]="searchForm" class="search-row">
              <mat-form-field appearance="outline">
                <mat-label>DPI o Código de Paciente</mat-label>
                <mat-icon matPrefix>search</mat-icon>
                <input matInput formControlName="query" placeholder="0000000000000 o PAT-0001">
              </mat-form-field>
              <button mat-raised-button color="primary" (click)="searchPatient()">
                Buscar
              </button>
            </form>

            <!-- Paciente encontrado -->
            <div class="patient-found" *ngIf="patient">
              <div class="patient-info">
                <mat-icon>person</mat-icon>
                <div>
                  <strong>{{ patient.firstName }} {{ patient.lastName }}</strong>
                  <div class="patient-meta">
                    {{ patient.patientCode }} · {{ patient.dpi }}
                    <span *ngIf="patient.insuranceName" class="insurance-badge">
                      🔒 {{ patient.insuranceName }} ({{ patient.discountPercentage }}% desc.)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Registrar Nuevo Pago -->
        <mat-card *ngIf="patient">
          <mat-card-header>
            <mat-card-title>Registrar Cargo</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <form [formGroup]="paymentForm" class="form-grid">
              <mat-form-field appearance="outline">
                <mat-label>Tipo de Servicio</mat-label>
                <mat-select formControlName="type">
                  <mat-option value="CONSULTATION">Consulta Médica</mat-option>
                  <mat-option value="LABORATORY">Laboratorio</mat-option>
                  <mat-option value="PHARMACY">Farmacia</mat-option>
                  <mat-option value="EMERGENCY">Emergencia</mat-option>
                </mat-select>
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Monto (Q)</mat-label>
                <input matInput type="number" formControlName="amount" step="0.01">
              </mat-form-field>
            </form>

            <!-- Cálculo de descuento (RN-P01, RN-P02) -->
            <div class="discount-summary" *ngIf="paymentForm.value.amount && patient?.discountPercentage">
              <div class="summary-row">
                <span>Subtotal:</span><span>Q{{ paymentForm.value.amount }}</span>
              </div>
              <div class="summary-row discount">
                <span>Descuento ({{ patient?.discountPercentage }}% - {{ patient?.insuranceName }}):</span>
                <span>-Q{{ getDiscount() }}</span>
              </div>
              <mat-divider></mat-divider>
              <div class="summary-row total">
                <strong>Total Neto:</strong><strong>Q{{ getNetAmount() }}</strong>
              </div>
            </div>

            <button mat-raised-button color="primary" (click)="createPayment()"
                    [disabled]="paymentForm.invalid">
              <mat-icon>add</mat-icon> Generar Orden de Pago
            </button>
          </mat-card-content>
        </mat-card>

        <!-- Pagos Pendientes -->
        <mat-card *ngIf="pendingPayments.length > 0">
          <mat-card-header>
            <mat-card-title>Pagos Pendientes</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="payment-row" *ngFor="let p of pendingPayments">
              <div class="payment-info">
                <strong>{{ p.type }}</strong>
                <div class="payment-meta">
                  Total: Q{{ p.netAmount }}
                  <span *ngIf="p.discountAmount > 0"> (descuento: Q{{ p.discountAmount }})</span>
                </div>
              </div>
              <div class="payment-actions">
                <mat-form-field appearance="outline" style="width:160px">
                  <mat-label>Método de Pago</mat-label>
                  <mat-select [(ngModel)]="selectedMethods[p.id]" [ngModelOptions]="{standalone: true}">
                    <mat-option value="CASH">Efectivo</mat-option>
                    <mat-option value="DEBIT_CARD">Débito</mat-option>
                    <mat-option value="CREDIT_CARD">Crédito</mat-option>
                  </mat-select>
                </mat-form-field>
                <button mat-raised-button color="primary"
                        [disabled]="!selectedMethods[p.id]"
                        (click)="processPayment(p)">
                  <mat-icon>payments</mat-icon> Cobrar
                </button>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Historial de Pagos -->
        <mat-card *ngIf="paidPayments.length > 0">
          <mat-card-header>
            <mat-card-title>Pagos Realizados</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <table mat-table [dataSource]="paidPayments">
              <ng-container matColumnDef="invoice">
                <th mat-header-cell *matHeaderCellDef>Factura</th>
                <td mat-cell *matCellDef="let p">{{ p.invoiceNumber || '-' }}</td>
              </ng-container>
              <ng-container matColumnDef="type">
                <th mat-header-cell *matHeaderCellDef>Servicio</th>
                <td mat-cell *matCellDef="let p">{{ p.type }}</td>
              </ng-container>
              <ng-container matColumnDef="amount">
                <th mat-header-cell *matHeaderCellDef>Neto</th>
                <td mat-cell *matCellDef="let p">Q{{ p.netAmount }}</td>
              </ng-container>
              <ng-container matColumnDef="method">
                <th mat-header-cell *matHeaderCellDef>Método</th>
                <td mat-cell *matCellDef="let p">{{ p.method }}</td>
              </ng-container>
              <ng-container matColumnDef="date">
                <th mat-header-cell *matHeaderCellDef>Fecha</th>
                <td mat-cell *matCellDef="let p">{{ p.paidAt | date:'dd/MM/yyyy HH:mm' }}</td>
              </ng-container>
              <tr mat-header-row *matHeaderRowDef="columns"></tr>
              <tr mat-row *matRowDef="let row; columns: columns;"></tr>
            </table>
          </mat-card-content>
        </mat-card>
      </div>
          </div>
        </mat-tab>

        <!-- TAB 2: Pago de Cita -->
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon style="font-size:18px;margin-right:6px;vertical-align:middle">event_available</mat-icon>
            Pago de Cita
          </ng-template>
          <div style="padding:24px 0">

            <!-- Success screen -->
            <mat-card *ngIf="apptPaid" class="appt-success-card">
              <mat-card-content>
                <div class="appt-success">
                  <mat-icon>check_circle</mat-icon>
                  <div>
                    <h3>Pago Confirmado</h3>
                    <p>La cita ha entrado al sistema de cola de atención.</p>
                    <div class="appt-detail-row"><strong>Paciente:</strong> {{ apptDetails?.patientName }}</div>
                    <div class="appt-detail-row"><strong>Clínica:</strong> {{ apptDetails?.clinicName }}</div>
                    <div class="appt-detail-row"><strong>Fecha / Hora:</strong> {{ apptDetails?.scheduledDate }} {{ apptDetails?.scheduledTime }}</div>
                  </div>
                </div>
                <button mat-stroked-button color="primary" style="margin-top:16px" (click)="resetApptPayment()">
                  <mat-icon>add</mat-icon> Procesar Otro Pago
                </button>
              </mat-card-content>
            </mat-card>

            <!-- Voucher lookup -->
            <mat-card *ngIf="!apptPaid">
              <mat-card-header><mat-card-title>Buscar Cita por Voucher</mat-card-title></mat-card-header>
              <mat-card-content>
                <form [formGroup]="voucherForm" class="search-row">
                  <mat-form-field appearance="outline">
                    <mat-label>Código de Voucher</mat-label>
                    <mat-icon matPrefix>confirmation_number</mat-icon>
                    <input matInput formControlName="code" placeholder="A3X9K2" maxlength="10"
                           style="text-transform:uppercase">
                  </mat-form-field>
                  <button mat-raised-button color="primary"
                          (click)="lookupVoucher()" [disabled]="voucherForm.invalid || apptLooking">
                    <mat-spinner *ngIf="apptLooking" diameter="20" style="display:inline-block;margin-right:6px"></mat-spinner>
                    Buscar
                  </button>
                </form>
              </mat-card-content>
            </mat-card>

            <!-- Appointment details -->
            <mat-card *ngIf="apptDetails && !apptPaid" style="margin-top:16px">
              <mat-card-header><mat-card-title>Detalles de la Cita</mat-card-title></mat-card-header>
              <mat-card-content>
                <div class="appt-details-grid">
                  <div class="appt-detail-row"><mat-icon>person</mat-icon><span><strong>Paciente:</strong> {{ apptDetails.patientName }} ({{ apptDetails.patientCode }})</span></div>
                  <div class="appt-detail-row"><mat-icon>local_hospital</mat-icon><span><strong>Clínica:</strong> {{ apptDetails.clinicName }}</span></div>
                  <div class="appt-detail-row"><mat-icon>medical_services</mat-icon><span><strong>Tipo:</strong> {{ apptDetails.type }}</span></div>
                  <div class="appt-detail-row"><mat-icon>event</mat-icon><span><strong>Fecha / Hora:</strong> {{ apptDetails.scheduledDate }} {{ apptDetails.scheduledTime }}</span></div>
                  <div class="appt-detail-row appt-amount"><mat-icon>payments</mat-icon><span><strong>Monto:</strong> Q{{ apptDetails.amount }}</span></div>
                </div>
              </mat-card-content>
            </mat-card>

            <!-- Payment form -->
            <mat-card *ngIf="apptDetails && !apptPaid" style="margin-top:16px">
              <mat-card-header><mat-card-title>Datos de Pago con Tarjeta</mat-card-title></mat-card-header>
              <mat-card-content>
                <form [formGroup]="cardForm" class="card-form-grid">
                  <mat-form-field appearance="outline" class="card-full">
                    <mat-label>Nombre en la Tarjeta *</mat-label>
                    <mat-icon matPrefix>credit_card</mat-icon>
                    <input matInput formControlName="cardName" placeholder="JUAN PEREZ">
                    <mat-error>Campo requerido</mat-error>
                  </mat-form-field>
                  <mat-form-field appearance="outline" class="card-full">
                    <mat-label>Número de Tarjeta *</mat-label>
                    <input matInput formControlName="cardNumber" placeholder="0000 0000 0000 0000" maxlength="19">
                    <mat-error>Ingrese los 16 dígitos</mat-error>
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                    <mat-label>Vencimiento (MM/AA) *</mat-label>
                    <input matInput formControlName="expiry" placeholder="12/28" maxlength="5">
                    <mat-error>Formato MM/AA</mat-error>
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                    <mat-label>CVV *</mat-label>
                    <input matInput formControlName="cvv" placeholder="123" maxlength="4" type="password">
                    <mat-error>Campo requerido</mat-error>
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                    <mat-label>Método</mat-label>
                    <mat-select formControlName="paymentMethod">
                      <mat-option value="DEBIT_CARD">Débito</mat-option>
                      <mat-option value="CREDIT_CARD">Crédito</mat-option>
                    </mat-select>
                  </mat-form-field>
                </form>
                <button mat-raised-button color="primary" style="margin-top:8px"
                        [disabled]="cardForm.invalid || apptConfirming"
                        (click)="confirmApptPayment()">
                  <mat-spinner *ngIf="apptConfirming" diameter="20" style="display:inline-block;margin-right:6px"></mat-spinner>
                  <mat-icon *ngIf="!apptConfirming">lock</mat-icon>
                  {{ apptConfirming ? 'Procesando...' : 'Confirmar Pago — Q' + apptDetails.amount }}
                </button>
              </mat-card-content>
            </mat-card>

          </div>
        </mat-tab>

      </mat-tab-group>
    </div>
  `,
  styles: [`
    .payments-layout { display: flex; flex-direction: column; gap: 24px; }
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .page-header h1 { font-size: 1.6rem; font-weight: 500; color: #1565c0; margin: 0; }
    .search-row { display: flex; gap: 12px; align-items: flex-end; }
    .patient-found { background: #e8f5e9; border-radius: 8px; padding: 16px; margin-top: 12px; }
    .patient-info { display: flex; align-items: center; gap: 12px; }
    .patient-meta { font-size: 0.85rem; color: #555; margin-top: 4px; }
    .insurance-badge { background: #fff3e0; color: #e65100; padding: 2px 8px; border-radius: 8px; margin-left: 8px; font-size: 0.8rem; }
    .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-bottom: 16px; }
    .discount-summary { background: #f8f9ff; border-radius: 8px; padding: 16px; margin-bottom: 16px; }
    .summary-row { display: flex; justify-content: space-between; padding: 4px 0; }
    .summary-row.discount { color: #2e7d32; }
    .summary-row.total { font-size: 1.1rem; margin-top: 8px; }
    .payment-row { display: flex; justify-content: space-between; align-items: center; padding: 12px; background: #f8f9ff; border-radius: 8px; margin-bottom: 8px; }
    .payment-actions { display: flex; align-items: center; gap: 8px; }
    .payment-meta { font-size: 0.85rem; color: #555; }
    .appt-details-grid { display:flex;flex-direction:column;gap:10px; }
    .appt-detail-row { display:flex;align-items:center;gap:10px;font-size:0.93rem; }
    .appt-detail-row mat-icon { font-size:20px;width:20px;height:20px;color:#1565c0; }
    .appt-amount { font-size:1.1rem; }
    .card-form-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px; }
    .card-full { grid-column:1/-1; }
    .appt-success-card { border-left:4px solid #2e7d32; }
    .appt-success { display:flex;gap:16px;align-items:flex-start; }
    .appt-success mat-icon { font-size:48px;width:48px;height:48px;color:#2e7d32; }
    .appt-success h3 { margin:0 0 6px;color:#1b5e20; }
    .appt-success p { color:#555;margin:0 0 12px; }
  `]
})
export class PaymentsComponent {
  searchForm: FormGroup;
  paymentForm: FormGroup;
  patient: Patient | null = null;
  pendingPayments: Payment[] = [];
  paidPayments: Payment[] = [];
  selectedMethods: Record<number, string> = {};
  columns = ['invoice', 'type', 'amount', 'method', 'date'];

  // Pago de Cita tab
  voucherForm: FormGroup;
  cardForm: FormGroup;
  apptDetails: any = null;
  apptLooking = false;
  apptConfirming = false;
  apptPaid = false;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private paymentService: PaymentService,
    private appointmentService: AppointmentService,
    private notification: NotificationService
  ) {
    this.searchForm = this.fb.group({ query: ['', Validators.required] });
    this.paymentForm = this.fb.group({
      type: ['CONSULTATION', Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]]
    });
    this.voucherForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.cardForm = this.fb.group({
      cardName: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{4} ?\d{4} ?\d{4} ?\d{4}$/)]],
      expiry: ['', [Validators.required, Validators.pattern(/^\d{2}\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      paymentMethod: ['DEBIT_CARD', Validators.required]
    });
  }

  searchPatient(): void {
    const q = this.searchForm.value.query;
    const obs = q.match(/^\d{13}$/)
      ? this.patientService.getByDpi(q)
      : this.patientService.search(q);

    (obs as any).subscribe({
      next: (res: any) => {
        const p = Array.isArray(res.data) ? res.data[0] : res.data;
        if (p) {
          this.patient = p;
          this.loadPayments(p.id);
        } else {
          this.notification.error('Paciente no encontrado');
        }
      },
      error: () => this.notification.error('Paciente no encontrado')
    });
  }

  loadPayments(patientId: number): void {
    this.paymentService.getByPatient(patientId).subscribe(res => {
      if (res.success) {
        this.pendingPayments = res.data.filter(p => p.status === 'PENDING');
        this.paidPayments = res.data.filter(p => p.status === 'PAID');
        this.selectedMethods = {};
      }
    });
  }

  getDiscount(): string {
    const amount = this.paymentForm.value.amount || 0;
    const pct = this.patient?.discountPercentage || 0;
    return (amount * pct / 100).toFixed(2);
  }

  getNetAmount(): string {
    const amount = this.paymentForm.value.amount || 0;
    const discount = parseFloat(this.getDiscount());
    return (amount - discount).toFixed(2);
  }

  createPayment(): void {
    if (!this.patient) return;
    const data = {
      patientId: this.patient.id,
      type: this.paymentForm.value.type,
      amount: this.paymentForm.value.amount
    };
    this.paymentService.create(data).subscribe({
      next: res => {
        if (res.success) {
          this.notification.success('Orden de pago generada');
          this.loadPayments(this.patient!.id);
          this.paymentForm.reset({ type: 'CONSULTATION' });
        }
      }
    });
  }

  processPayment(payment: Payment): void {
    const method = this.selectedMethods[payment.id] as any;
    this.paymentService.process(payment.id, method).subscribe({
      next: res => {
        if (res.success) {
          this.notification.success(`Pago procesado. Factura: ${res.data.invoiceNumber}`);
          this.loadPayments(this.patient!.id);
        }
      }
    });
  }

  lookupVoucher(): void {
    const code = this.voucherForm.value.code?.toUpperCase();
    this.apptLooking = true;
    this.apptDetails = null;
    this.appointmentService.getByVoucherCode(code).subscribe({
      next: res => {
        if (res.success) {
          this.apptDetails = res.data;
          if (res.data.status === 'CONFIRMED') {
            this.notification.error('Esta cita ya fue pagada.');
            this.apptDetails = null;
          }
        } else {
          this.notification.error('Voucher no encontrado');
        }
        this.apptLooking = false;
      },
      error: () => {
        this.notification.error('Voucher no encontrado');
        this.apptLooking = false;
      }
    });
  }

  confirmApptPayment(): void {
    this.apptConfirming = true;
    this.appointmentService.confirmPayment(this.apptDetails.id, {
      paymentMethod: this.cardForm.value.paymentMethod
    }).subscribe({
      next: res => {
        if (res.success) {
          this.apptPaid = true;
          this.notification.success('Pago confirmado. La cita entró a la cola.');
        } else {
          this.notification.error(res.message || 'Error al confirmar pago');
        }
        this.apptConfirming = false;
      },
      error: err => {
        this.notification.error(err.error?.message || 'Error al procesar el pago');
        this.apptConfirming = false;
      }
    });
  }

  resetApptPayment(): void {
    this.apptPaid = false;
    this.apptDetails = null;
    this.voucherForm.reset();
    this.cardForm.reset({ paymentMethod: 'DEBIT_CARD' });
  }
}
