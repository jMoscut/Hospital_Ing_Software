import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { MatRadioModule } from '@angular/material/radio';
import { PatientService } from '../../shared/services/patient.service';
import { PaymentService, InsuranceService } from '../../shared/services/payment.service';
import { AppointmentService, ClinicService } from '../../shared/services/ticket.service';
import { LabExamService } from '../../shared/services/lab.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Patient } from '../../core/models/patient.model';
import { Payment } from '../../core/models/payment.model';
import { Clinic } from '../../core/models/ticket.model';
import { LabExam } from '../../core/models/lab.model';

const MONTH_NAMES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
                     'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const TYPE_FEE: Record<string, number> = { CONSULTA: 150, CONTROL: 100 };
const LAB_KEYWORDS = ['laboratorio','lab'];
const BOOKING_CLINIC_KEYWORDS = ['consulta','medicina','general','externa'];

type CitStep = 'dpi' | 'patient' | 'calendar' | 'payment' | 'receipt';
type LabStep = 'dpi' | 'patient' | 'calendar' | 'payment' | 'receipt';
type PayMode = 'TARJETA' | 'EFECTIVO';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule,
    MatCardModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatTableModule, MatDividerModule, MatTabsModule,
    MatProgressSpinnerModule, MatRadioModule
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
              <mat-card>
                <mat-card-header><mat-card-title>Identificar Paciente</mat-card-title></mat-card-header>
                <mat-card-content>
                  <form [formGroup]="searchForm" class="search-row">
                    <mat-form-field appearance="outline">
                      <mat-label>DPI o Código de Paciente</mat-label>
                      <mat-icon matPrefix>search</mat-icon>
                      <input matInput formControlName="query" placeholder="0000000000000 o PAT-0001">
                    </mat-form-field>
                    <button mat-raised-button color="primary" (click)="searchPatient()">Buscar</button>
                  </form>
                  <div class="patient-found" *ngIf="patient">
                    <div class="patient-info">
                      <mat-icon>person</mat-icon>
                      <div>
                        <strong>{{ patient.firstName }} {{ patient.lastName }}</strong>
                        <div class="patient-meta">
                          {{ patient.patientCode }} · {{ patient.dpi }}
                          <span *ngIf="patient.insuranceName" class="insurance-badge">
                            {{ patient.insuranceName }} ({{ patient.discountPercentage }}% desc.)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </mat-card-content>
              </mat-card>

              <mat-card *ngIf="patient">
                <mat-card-header><mat-card-title>Registrar Cargo</mat-card-title></mat-card-header>
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
                  <div class="discount-summary" *ngIf="paymentForm.value.amount && patient?.discountPercentage">
                    <div class="summary-row"><span>Subtotal:</span><span>Q{{ paymentForm.value.amount }}</span></div>
                    <div class="summary-row discount"><span>Descuento ({{ patient?.discountPercentage }}%):</span><span>-Q{{ getDiscount() }}</span></div>
                    <mat-divider></mat-divider>
                    <div class="summary-row total"><strong>Total Neto:</strong><strong>Q{{ getNetAmount() }}</strong></div>
                  </div>
                  <button mat-raised-button color="primary" (click)="createPayment()" [disabled]="paymentForm.invalid">
                    <mat-icon>add</mat-icon> Generar Orden de Pago
                  </button>
                </mat-card-content>
              </mat-card>

              <mat-card *ngIf="pendingPayments.length > 0">
                <mat-card-header><mat-card-title>Pagos Pendientes</mat-card-title></mat-card-header>
                <mat-card-content>
                  <div class="payment-row" *ngFor="let p of pendingPayments">
                    <div class="payment-info">
                      <strong>{{ p.type }}</strong>
                      <div class="payment-meta">Total: Q{{ p.netAmount }}<span *ngIf="p.discountAmount > 0"> (descuento: Q{{ p.discountAmount }})</span></div>
                    </div>
                    <div class="payment-actions">
                      <mat-form-field appearance="outline" style="width:160px">
                        <mat-label>Método</mat-label>
                        <mat-select [(ngModel)]="selectedMethods[p.id]" [ngModelOptions]="{standalone: true}">
                          <mat-option value="CASH">Efectivo</mat-option>
                          <mat-option value="DEBIT_CARD">Débito</mat-option>
                          <mat-option value="CREDIT_CARD">Crédito</mat-option>
                        </mat-select>
                      </mat-form-field>
                      <button mat-raised-button color="primary" [disabled]="!selectedMethods[p.id]" (click)="processPayment(p)">
                        <mat-icon>payments</mat-icon> Cobrar
                      </button>
                    </div>
                  </div>
                </mat-card-content>
              </mat-card>

              <mat-card *ngIf="paidPayments.length > 0">
                <mat-card-header><mat-card-title>Pagos Realizados</mat-card-title></mat-card-header>
                <mat-card-content>
                  <table mat-table [dataSource]="paidPayments">
                    <ng-container matColumnDef="invoice"><th mat-header-cell *matHeaderCellDef>Factura</th><td mat-cell *matCellDef="let p">{{ p.invoiceNumber || '-' }}</td></ng-container>
                    <ng-container matColumnDef="type"><th mat-header-cell *matHeaderCellDef>Servicio</th><td mat-cell *matCellDef="let p">{{ p.type }}</td></ng-container>
                    <ng-container matColumnDef="amount"><th mat-header-cell *matHeaderCellDef>Neto</th><td mat-cell *matCellDef="let p">Q{{ p.netAmount }}</td></ng-container>
                    <ng-container matColumnDef="method"><th mat-header-cell *matHeaderCellDef>Método</th><td mat-cell *matCellDef="let p">{{ p.method }}</td></ng-container>
                    <ng-container matColumnDef="date"><th mat-header-cell *matHeaderCellDef>Fecha</th><td mat-cell *matCellDef="let p">{{ p.paidAt | date:'dd/MM/yyyy HH:mm' }}</td></ng-container>
                    <tr mat-header-row *matHeaderRowDef="columns"></tr>
                    <tr mat-row *matRowDef="let row; columns: columns;"></tr>
                  </table>
                </mat-card-content>
              </mat-card>
            </div>
          </div>
        </mat-tab>

        <!-- TAB 2: Citas Presenciales -->
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon style="font-size:18px;margin-right:6px;vertical-align:middle">event_available</mat-icon>
            Citas Presenciales
          </ng-template>
          <div class="tab-content">

            <!-- RECEIPT -->
            <ng-container *ngIf="citStep === 'receipt' && citReceipt">
              <mat-card class="receipt-card">
                <mat-card-content>
                  <div class="receipt-header">
                    <mat-icon class="receipt-icon">check_circle</mat-icon>
                    <div>
                      <h2>Cita Registrada y Pagada</h2>
                      <p>El turno ha entrado al sistema de cola.</p>
                    </div>
                  </div>
                  <div class="receipt-body">
                    <div class="receipt-row"><mat-icon>confirmation_number</mat-icon><span><strong>Turno:</strong> {{ citReceipt.ticketNumber }}</span></div>
                    <div class="receipt-row"><mat-icon>person</mat-icon><span><strong>Paciente:</strong> {{ citReceipt.patientName }}</span></div>
                    <div class="receipt-row"><mat-icon>local_hospital</mat-icon><span><strong>Clínica:</strong> {{ citReceipt.clinicName }}</span></div>
                    <div class="receipt-row"><mat-icon>medical_services</mat-icon><span><strong>Tipo:</strong> {{ citTypeLabel(citReceipt.type) }}</span></div>
                    <div class="receipt-row"><mat-icon>event</mat-icon><span><strong>Fecha:</strong> {{ citReceipt.scheduledDate }}</span></div>
                    <div class="receipt-row"><mat-icon>access_time</mat-icon><span><strong>Hora:</strong> {{ citReceipt.scheduledTime }}</span></div>
                    <mat-divider style="margin:12px 0"></mat-divider>
                    <div class="receipt-row receipt-total"><mat-icon>payments</mat-icon><span><strong>Monto cobrado:</strong> Q{{ citReceipt.amount }}</span></div>
                    <div class="receipt-row" *ngIf="citReceipt.payMode === 'EFECTIVO'"><mat-icon>money</mat-icon><span><strong>Efectivo recibido:</strong> Q{{ citReceipt.cashReceived }}</span></div>
                    <div class="receipt-row receipt-change" *ngIf="citReceipt.change > 0"><mat-icon>change_circle</mat-icon><span><strong>Vuelto:</strong> Q{{ citReceipt.change.toFixed(2) }}</span></div>
                    <div class="receipt-row"><mat-icon>credit_card</mat-icon><span><strong>Método:</strong> {{ citReceipt.payMode === 'TARJETA' ? 'Tarjeta (POS)' : 'Efectivo' }}</span></div>
                  </div>
                  <div class="cred-box" *ngIf="citNewCredentials">
                    <mat-icon>key</mat-icon>
                    <div>
                      <strong>Credenciales enviadas al correo del paciente</strong>
                      <div class="cred-row"><span>Usuario:</span> <code>{{ citNewCredentials.username }}</code></div>
                      <div class="cred-row"><span>Contraseña temporal:</span> <code>{{ citNewCredentials.tempPassword }}</code></div>
                    </div>
                  </div>
                  <button mat-raised-button color="primary" style="margin-top:24px" (click)="citReset()">
                    <mat-icon>add</mat-icon> Nueva Cita
                  </button>
                </mat-card-content>
              </mat-card>
            </ng-container>

            <!-- STEP: DPI -->
            <ng-container *ngIf="citStep === 'dpi'">
              <mat-card>
                <mat-card-header>
                  <mat-card-title>Paso 1 — Identificar Paciente</mat-card-title>
                  <mat-card-subtitle>Buscar por DPI</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                  <form [formGroup]="citDpiForm">
                    <mat-form-field appearance="outline" class="wide">
                      <mat-label>DPI del Paciente (13 dígitos)</mat-label>
                      <mat-icon matPrefix>badge</mat-icon>
                      <input matInput formControlName="dpi" placeholder="0000000000000" maxlength="13">
                      <mat-error>El DPI debe tener exactamente 13 dígitos</mat-error>
                    </mat-form-field>
                    <div class="step-actions">
                      <button mat-raised-button color="primary"
                              (click)="citSearchByDpi()" [disabled]="citDpiForm.invalid || citSearching">
                        <mat-spinner *ngIf="citSearching" diameter="20"></mat-spinner>
                        <mat-icon *ngIf="!citSearching">search</mat-icon>
                        {{ citSearching ? 'Buscando...' : 'Buscar' }}
                      </button>
                    </div>
                    <div class="found-box" *ngIf="citExistingPatient">
                      <mat-icon>check_circle</mat-icon>
                      <div>
                        <strong>{{ citExistingPatient.firstName }} {{ citExistingPatient.lastName }}</strong>
                        <br><small>{{ citExistingPatient.patientCode }} · {{ citExistingPatient.phone }}</small>
                      </div>
                      <button mat-raised-button color="accent" (click)="citStep = 'patient'">Ver y Editar →</button>
                    </div>
                    <div class="new-patient-notice" *ngIf="citIsNewPatient">
                      <mat-icon>person_add</mat-icon>
                      <span>DPI no encontrado — complete los datos para registrar al paciente.</span>
                      <button mat-raised-button color="accent" (click)="citStep = 'patient'">Registrar →</button>
                    </div>
                  </form>
                </mat-card-content>
              </mat-card>
            </ng-container>

            <!-- STEP: Patient Data -->
            <ng-container *ngIf="citStep === 'patient'">
              <mat-card>
                <mat-card-header>
                  <mat-card-title>Paso 2 — {{ citExistingPatient ? 'Datos del Paciente' : 'Registrar Nuevo Paciente' }}</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <form [formGroup]="citPatientForm">
                    <div class="form-grid">
                      <mat-form-field appearance="outline">
                        <mat-label>Nombres *</mat-label>
                        <input matInput formControlName="firstName">
                      </mat-form-field>
                      <mat-form-field appearance="outline">
                        <mat-label>Apellidos *</mat-label>
                        <input matInput formControlName="lastName">
                      </mat-form-field>
                      <mat-form-field appearance="outline">
                        <mat-label>Fecha de Nacimiento</mat-label>
                        <mat-icon matPrefix>cake</mat-icon>
                        <input matInput type="date" formControlName="birthDate">
                      </mat-form-field>
                      <mat-form-field appearance="outline">
                        <mat-label>Teléfono</mat-label>
                        <input matInput formControlName="phone">
                      </mat-form-field>
                      <mat-form-field appearance="outline">
                        <mat-label>Correo Electrónico *</mat-label>
                        <input matInput formControlName="email">
                      </mat-form-field>
                      <mat-form-field appearance="outline">
                        <mat-label>Dirección</mat-label>
                        <input matInput formControlName="address">
                      </mat-form-field>
                      <mat-form-field appearance="outline">
                        <mat-label>Seguro Médico</mat-label>
                        <mat-select formControlName="insuranceId">
                          <mat-option [value]="null">Sin seguro</mat-option>
                          <mat-option *ngFor="let ins of insurances" [value]="ins.id">{{ ins.name }}</mat-option>
                        </mat-select>
                      </mat-form-field>
                      <mat-form-field appearance="outline">
                        <mat-label>No. de Póliza / Carné (opcional)</mat-label>
                        <input matInput formControlName="insuranceNumber">
                      </mat-form-field>
                    </div>
                    <p class="hint-text" *ngIf="!citExistingPatient">
                      Se generará usuario y contraseña temporales enviados al correo del paciente.
                    </p>
                    <div class="step-actions">
                      <button mat-button (click)="citStep = 'dpi'">← Anterior</button>
                      <button mat-raised-button color="primary"
                              [disabled]="citPatientForm.invalid || citSaving"
                              (click)="citSaveAndContinue()">
                        <mat-spinner *ngIf="citSaving" diameter="20"></mat-spinner>
                        <mat-icon *ngIf="!citSaving">arrow_forward</mat-icon>
                        {{ citSaving ? 'Guardando...' : (citExistingPatient ? 'Guardar y Continuar' : 'Registrar y Continuar') }}
                      </button>
                    </div>
                  </form>
                </mat-card-content>
              </mat-card>
            </ng-container>

            <!-- STEP: Calendar -->
            <ng-container *ngIf="citStep === 'calendar'">
              <mat-card>
                <mat-card-header>
                  <mat-card-title>Paso 3 — Seleccionar Cita</mat-card-title>
                  <mat-card-subtitle>Paciente: {{ citExistingPatient?.firstName }} {{ citExistingPatient?.lastName }}</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>

                  <!-- Type + Clinic -->
                  <div class="form-grid" style="margin-bottom:16px">
                    <mat-form-field appearance="outline">
                      <mat-label>Tipo de Servicio *</mat-label>
                      <mat-icon matPrefix>medical_services</mat-icon>
                      <mat-select [(ngModel)]="citType" (ngModelChange)="citUpdateFee()" [ngModelOptions]="{standalone:true}">
                        <mat-option value="CONSULTA">Consulta Médica — Q150</mat-option>
                        <mat-option value="CONTROL">Control / Seguimiento — Q100</mat-option>
                      </mat-select>
                    </mat-form-field>
                    <mat-form-field appearance="outline">
                      <mat-label>Área *</mat-label>
                      <mat-icon matPrefix>local_hospital</mat-icon>
                      <mat-select [(ngModel)]="citSelectedClinicId" (ngModelChange)="citOnClinicChange($event)" [ngModelOptions]="{standalone:true}">
                        <mat-option *ngFor="let c of citClinics" [value]="c.id">{{ c.name }}</mat-option>
                      </mat-select>
                    </mat-form-field>
                  </div>

                  <!-- Calendar nav -->
                  <div class="calendar-nav">
                    <button class="nav-btn" type="button" (click)="citPrevMonth()">&#8249;</button>
                    <span class="month-label">{{ citMonthLabel }}</span>
                    <button class="nav-btn" type="button" (click)="citNextMonth()">&#8250;</button>
                  </div>
                  <!-- Calendar grid -->
                  <div class="calendar-grid">
                    <div class="cal-weekday" *ngFor="let d of weekDays">{{ d }}</div>
                    <ng-container *ngFor="let day of citCalendarDays">
                      <div *ngIf="!day" class="cal-day empty"></div>
                      <div *ngIf="day" [class]="citGetDayClass(day)" (click)="!citIsPastDay(day) && citSelectDate(day)">
                        {{ day.getDate() }}
                      </div>
                    </ng-container>
                  </div>

                  <!-- Slots -->
                  <ng-container *ngIf="citSelectedDate">
                    <div class="slots-label">
                      <mat-icon>access_time</mat-icon>
                      {{ citFormatDate(citSelectedDate) }}
                      <mat-spinner *ngIf="citLoadingSlots" diameter="16" style="margin-left:8px"></mat-spinner>
                    </div>
                    <div class="slots-grid" *ngIf="!citLoadingSlots">
                      <button *ngFor="let slot of citAvailableSlots"
                              type="button"
                              [class]="'slot-btn' + (citSelectedSlot === slot ? ' selected' : '')"
                              (click)="citSelectSlot(slot)">{{ slot }}</button>
                      <div *ngIf="citAvailableSlots.length === 0" class="no-slots">
                        <mat-icon>event_busy</mat-icon> No hay horarios disponibles para este día
                      </div>
                    </div>
                    <div class="reservation-timer" *ngIf="citReservationTimeLeft > 0" [class.timer-low]="citReservationLow">
                      <mat-icon>timer</mat-icon>
                      <span>Horario <strong>{{ citSelectedSlot }}</strong> reservado — expira en <strong>{{ citReservationMinutes }}:{{ citReservationSeconds }}</strong></span>
                    </div>
                  </ng-container>

                  <div class="step-actions" style="margin-top:16px">
                    <button mat-button (click)="citStep = 'patient'">← Anterior</button>
                    <button mat-raised-button color="primary"
                            [disabled]="!citSelectedDate || !citSelectedSlot || !citSelectedClinicId"
                            (click)="citStep = 'payment'">
                      <mat-icon>payments</mat-icon> Continuar al Pago →
                    </button>
                  </div>
                </mat-card-content>
              </mat-card>
            </ng-container>

            <!-- STEP: Payment -->
            <ng-container *ngIf="citStep === 'payment'">
              <mat-card>
                <mat-card-header>
                  <mat-card-title>Paso 4 — Cobro</mat-card-title>
                </mat-card-header>
                <mat-card-content>

                  <!-- Reservation countdown -->
                  <div class="reservation-timer" *ngIf="citReservationTimeLeft > 0" [class.timer-low]="citReservationLow" style="margin-bottom:16px">
                    <mat-icon>timer</mat-icon>
                    <span>Reserva expira en <strong>{{ citReservationMinutes }}:{{ citReservationSeconds }}</strong> — completa el pago antes</span>
                  </div>

                  <!-- Summary -->
                  <div class="pay-summary">
                    <div class="pay-summary-row"><mat-icon>person</mat-icon><span>{{ citExistingPatient?.firstName }} {{ citExistingPatient?.lastName }}</span></div>
                    <div class="pay-summary-row"><mat-icon>local_hospital</mat-icon><span>{{ citClinicName }}</span></div>
                    <div class="pay-summary-row"><mat-icon>medical_services</mat-icon><span>{{ citTypeLabel(citType) }}</span></div>
                    <div class="pay-summary-row"><mat-icon>event</mat-icon><span>{{ citFormatDate(citSelectedDate) }} a las <strong>{{ citSelectedSlot }}</strong></span></div>
                    <div class="pay-summary-row pay-total"><mat-icon>payments</mat-icon><span>Monto a cobrar: <strong>Q{{ citFee }}</strong></span></div>
                  </div>

                  <!-- Method selection -->
                  <h3 style="margin:20px 0 12px">Método de Pago</h3>
                  <div class="pay-method-grid">
                    <button type="button" [class]="'pay-method-btn' + (citPayMode === 'TARJETA' ? ' active' : '')"
                            (click)="citPayMode = 'TARJETA'; citCashReceived = null">
                      <mat-icon>credit_card</mat-icon>
                      <span>Tarjeta (POS)</span>
                    </button>
                    <button type="button" [class]="'pay-method-btn' + (citPayMode === 'EFECTIVO' ? ' active' : '')"
                            (click)="citPayMode = 'EFECTIVO'">
                      <mat-icon>money</mat-icon>
                      <span>Efectivo</span>
                    </button>
                  </div>

                  <!-- TARJETA: POS simulation -->
                  <div class="pos-area" *ngIf="citPayMode === 'TARJETA'">
                    <div class="pos-device">
                      <mat-icon>point_of_sale</mat-icon>
                      <span>Terminal POS</span>
                      <small>Presente la tarjeta en el lector y confirme</small>
                    </div>
                    <button mat-raised-button color="primary" style="width:100%;font-size:1.05rem;padding:14px"
                            [disabled]="citBooking" (click)="citBookAndPay()">
                      <mat-spinner *ngIf="citBooking" diameter="22" style="display:inline-block;margin-right:10px"></mat-spinner>
                      <mat-icon *ngIf="!citBooking">point_of_sale</mat-icon>
                      {{ citBooking ? 'Procesando...' : 'Cobrar Q' + citFee + ' con POS' }}
                    </button>
                  </div>

                  <!-- EFECTIVO: amount input + change -->
                  <div class="cash-area" *ngIf="citPayMode === 'EFECTIVO'">
                    <mat-form-field appearance="outline" class="wide">
                      <mat-label>Efectivo recibido (Q)</mat-label>
                      <mat-icon matPrefix>money</mat-icon>
                      <input matInput type="number" [(ngModel)]="citCashReceived" [ngModelOptions]="{standalone:true}"
                             min="0" step="0.01" (ngModelChange)="citComputeChange()">
                    </mat-form-field>
                    <div class="change-display" *ngIf="citCashReceived !== null && citCashReceived >= citFee">
                      <mat-icon>change_circle</mat-icon>
                      <span>Vuelto a entregar: <strong>Q{{ citChange.toFixed(2) }}</strong></span>
                    </div>
                    <div class="insufficient-notice" *ngIf="citCashReceived !== null && citCashReceived < citFee">
                      <mat-icon>warning</mat-icon>
                      <span>Efectivo insuficiente. Faltan Q{{ (citFee - citCashReceived).toFixed(2) }}</span>
                    </div>
                    <button mat-raised-button color="primary" style="width:100%;margin-top:12px;font-size:1.05rem;padding:14px"
                            [disabled]="citBooking || citCashReceived === null || citCashReceived < citFee"
                            (click)="citBookAndPay()">
                      <mat-spinner *ngIf="citBooking" diameter="22" style="display:inline-block;margin-right:10px"></mat-spinner>
                      <mat-icon *ngIf="!citBooking">payments</mat-icon>
                      {{ citBooking ? 'Procesando...' : 'Confirmar Pago en Efectivo' }}
                    </button>
                  </div>

                  <div class="step-actions" style="margin-top:16px">
                    <button mat-button (click)="citStep = 'calendar'" [disabled]="citBooking">← Anterior</button>
                  </div>
                </mat-card-content>
              </mat-card>
            </ng-container>

          </div>
        </mat-tab>

        <!-- TAB 3: Laboratorios -->
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon style="font-size:18px;margin-right:6px;vertical-align:middle">biotech</mat-icon>
            Laboratorios
          </ng-template>
          <div class="tab-content">

            <!-- RECEIPT -->
            <ng-container *ngIf="labStep === 'receipt' && labReceipt">
              <mat-card class="receipt-card">
                <mat-card-content>
                  <div class="receipt-header">
                    <mat-icon class="receipt-icon">check_circle</mat-icon>
                    <div>
                      <h2>Cita de Laboratorio Registrada</h2>
                      <p>El turno ha entrado al sistema de cola.</p>
                    </div>
                  </div>
                  <div class="receipt-body">
                    <div class="receipt-row"><mat-icon>confirmation_number</mat-icon><span><strong>Turno:</strong> {{ labReceipt.ticketNumber }}</span></div>
                    <div class="receipt-row"><mat-icon>person</mat-icon><span><strong>Paciente:</strong> {{ labReceipt.patientName }}</span></div>
                    <div class="receipt-row"><mat-icon>biotech</mat-icon><span><strong>Examen:</strong> {{ labReceipt.examName }}</span></div>
                    <div class="receipt-row"><mat-icon>event</mat-icon><span><strong>Fecha:</strong> {{ labReceipt.scheduledDate }}</span></div>
                    <div class="receipt-row"><mat-icon>access_time</mat-icon><span><strong>Hora:</strong> {{ labReceipt.scheduledTime }}</span></div>
                    <mat-divider style="margin:12px 0"></mat-divider>
                    <div class="receipt-row receipt-total"><mat-icon>payments</mat-icon><span><strong>Monto cobrado:</strong> Q{{ labReceipt.amount }}</span></div>
                    <div class="receipt-row" *ngIf="labReceipt.payMode === 'EFECTIVO'"><mat-icon>money</mat-icon><span><strong>Efectivo recibido:</strong> Q{{ labReceipt.cashReceived }}</span></div>
                    <div class="receipt-row receipt-change" *ngIf="labReceipt.change > 0"><mat-icon>change_circle</mat-icon><span><strong>Vuelto:</strong> Q{{ labReceipt.change.toFixed(2) }}</span></div>
                    <div class="receipt-row"><mat-icon>credit_card</mat-icon><span><strong>Método:</strong> {{ labReceipt.payMode === 'TARJETA' ? 'Tarjeta (POS)' : 'Efectivo' }}</span></div>
                  </div>
                  <div class="cred-box" *ngIf="labNewCredentials">
                    <mat-icon>key</mat-icon>
                    <div>
                      <strong>Credenciales enviadas al correo del paciente</strong>
                      <div class="cred-row"><span>Usuario:</span> <code>{{ labNewCredentials.username }}</code></div>
                      <div class="cred-row"><span>Contraseña temporal:</span> <code>{{ labNewCredentials.tempPassword }}</code></div>
                    </div>
                  </div>
                  <button mat-raised-button color="primary" style="margin-top:24px" (click)="labReset()">
                    <mat-icon>add</mat-icon> Nueva Cita
                  </button>
                </mat-card-content>
              </mat-card>
            </ng-container>

            <!-- STEP: DPI -->
            <ng-container *ngIf="labStep === 'dpi'">
              <mat-card>
                <mat-card-header>
                  <mat-card-title>Paso 1 — Identificar Paciente</mat-card-title>
                  <mat-card-subtitle>Buscar por DPI</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                  <form [formGroup]="labDpiForm">
                    <mat-form-field appearance="outline" class="wide">
                      <mat-label>DPI del Paciente (13 dígitos)</mat-label>
                      <mat-icon matPrefix>badge</mat-icon>
                      <input matInput formControlName="dpi" placeholder="0000000000000" maxlength="13">
                      <mat-error>El DPI debe tener exactamente 13 dígitos</mat-error>
                    </mat-form-field>
                    <div class="step-actions">
                      <button mat-raised-button color="primary"
                              (click)="labSearchByDpi()" [disabled]="labDpiForm.invalid || labSearching">
                        <mat-spinner *ngIf="labSearching" diameter="20"></mat-spinner>
                        <mat-icon *ngIf="!labSearching">search</mat-icon>
                        {{ labSearching ? 'Buscando...' : 'Buscar' }}
                      </button>
                    </div>
                    <div class="found-box" *ngIf="labExistingPatient">
                      <mat-icon>check_circle</mat-icon>
                      <div>
                        <strong>{{ labExistingPatient.firstName }} {{ labExistingPatient.lastName }}</strong>
                        <br><small>{{ labExistingPatient.patientCode }} · {{ labExistingPatient.phone }}</small>
                      </div>
                      <button mat-raised-button color="accent" (click)="labStep = 'patient'">Ver y Editar →</button>
                    </div>
                    <div class="new-patient-notice" *ngIf="labIsNewPatient">
                      <mat-icon>person_add</mat-icon>
                      <span>DPI no encontrado — complete los datos para registrar al paciente.</span>
                      <button mat-raised-button color="accent" (click)="labStep = 'patient'">Registrar →</button>
                    </div>
                  </form>
                </mat-card-content>
              </mat-card>
            </ng-container>

            <!-- STEP: Patient Data -->
            <ng-container *ngIf="labStep === 'patient'">
              <mat-card>
                <mat-card-header>
                  <mat-card-title>Paso 2 — {{ labExistingPatient ? 'Datos del Paciente' : 'Registrar Nuevo Paciente' }}</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <form [formGroup]="labPatientForm">
                    <div class="form-grid">
                      <mat-form-field appearance="outline">
                        <mat-label>Nombres *</mat-label>
                        <input matInput formControlName="firstName">
                      </mat-form-field>
                      <mat-form-field appearance="outline">
                        <mat-label>Apellidos *</mat-label>
                        <input matInput formControlName="lastName">
                      </mat-form-field>
                      <mat-form-field appearance="outline">
                        <mat-label>Fecha de Nacimiento</mat-label>
                        <mat-icon matPrefix>cake</mat-icon>
                        <input matInput type="date" formControlName="birthDate">
                      </mat-form-field>
                      <mat-form-field appearance="outline">
                        <mat-label>Teléfono</mat-label>
                        <input matInput formControlName="phone">
                      </mat-form-field>
                      <mat-form-field appearance="outline">
                        <mat-label>Correo Electrónico *</mat-label>
                        <input matInput formControlName="email">
                      </mat-form-field>
                      <mat-form-field appearance="outline">
                        <mat-label>Dirección</mat-label>
                        <input matInput formControlName="address">
                      </mat-form-field>
                      <mat-form-field appearance="outline">
                        <mat-label>Seguro Médico</mat-label>
                        <mat-select formControlName="insuranceId">
                          <mat-option [value]="null">Sin seguro</mat-option>
                          <mat-option *ngFor="let ins of insurances" [value]="ins.id">{{ ins.name }}</mat-option>
                        </mat-select>
                      </mat-form-field>
                      <mat-form-field appearance="outline">
                        <mat-label>No. de Póliza / Carné (opcional)</mat-label>
                        <input matInput formControlName="insuranceNumber">
                      </mat-form-field>
                    </div>
                    <p class="hint-text" *ngIf="!labExistingPatient">
                      Se generará usuario y contraseña temporales enviados al correo del paciente.
                    </p>
                    <div class="step-actions">
                      <button mat-button (click)="labStep = 'dpi'">← Anterior</button>
                      <button mat-raised-button color="primary"
                              [disabled]="labPatientForm.invalid || labSaving"
                              (click)="labSaveAndContinue()">
                        <mat-spinner *ngIf="labSaving" diameter="20"></mat-spinner>
                        <mat-icon *ngIf="!labSaving">arrow_forward</mat-icon>
                        {{ labSaving ? 'Guardando...' : (labExistingPatient ? 'Guardar y Continuar' : 'Registrar y Continuar') }}
                      </button>
                    </div>
                  </form>
                </mat-card-content>
              </mat-card>
            </ng-container>

            <!-- STEP: Calendar -->
            <ng-container *ngIf="labStep === 'calendar'">
              <mat-card>
                <mat-card-header>
                  <mat-card-title>Paso 3 — Seleccionar Cita de Laboratorio</mat-card-title>
                  <mat-card-subtitle>Paciente: {{ labExistingPatient?.firstName }} {{ labExistingPatient?.lastName }}</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                  <div class="form-grid" style="margin-bottom:16px">
                    <mat-form-field appearance="outline">
                      <mat-label>Examen de Laboratorio *</mat-label>
                      <mat-icon matPrefix>biotech</mat-icon>
                      <mat-select [(ngModel)]="labSelectedExam" (ngModelChange)="labUpdateFee()" [ngModelOptions]="{standalone:true}">
                        <mat-option *ngFor="let e of labExams" [value]="e">{{ e.name }} — Q{{ e.price }}</mat-option>
                      </mat-select>
                    </mat-form-field>
                    <mat-form-field appearance="outline">
                      <mat-label>Área de Laboratorio *</mat-label>
                      <mat-icon matPrefix>local_hospital</mat-icon>
                      <mat-select [(ngModel)]="labSelectedClinicId" (ngModelChange)="labOnClinicChange($event)" [ngModelOptions]="{standalone:true}">
                        <mat-option *ngFor="let c of labClinics" [value]="c.id">{{ c.name }}</mat-option>
                      </mat-select>
                    </mat-form-field>
                  </div>

                  <div class="calendar-nav">
                    <button class="nav-btn" type="button" (click)="labPrevMonth()">&#8249;</button>
                    <span class="month-label">{{ labMonthLabel }}</span>
                    <button class="nav-btn" type="button" (click)="labNextMonth()">&#8250;</button>
                  </div>
                  <div class="calendar-grid">
                    <div class="cal-weekday" *ngFor="let d of weekDays">{{ d }}</div>
                    <ng-container *ngFor="let day of labCalendarDays">
                      <div *ngIf="!day" class="cal-day empty"></div>
                      <div *ngIf="day" [class]="labGetDayClass(day)" (click)="!labIsPastDay(day) && labSelectDate(day)">
                        {{ day.getDate() }}
                      </div>
                    </ng-container>
                  </div>

                  <ng-container *ngIf="labSelectedDate">
                    <div class="slots-label">
                      <mat-icon>access_time</mat-icon>
                      {{ labFormatDate(labSelectedDate) }}
                      <mat-spinner *ngIf="labLoadingSlots" diameter="16" style="margin-left:8px"></mat-spinner>
                    </div>
                    <div class="slots-grid" *ngIf="!labLoadingSlots">
                      <button *ngFor="let slot of labAvailableSlots"
                              type="button"
                              [class]="'slot-btn' + (labSelectedSlot === slot ? ' selected' : '')"
                              (click)="labSelectSlot(slot)">{{ slot }}</button>
                      <div *ngIf="labAvailableSlots.length === 0" class="no-slots">
                        <mat-icon>event_busy</mat-icon> No hay horarios disponibles para este día
                      </div>
                    </div>
                    <div class="reservation-timer" *ngIf="labReservationTimeLeft > 0" [class.timer-low]="labReservationLow">
                      <mat-icon>timer</mat-icon>
                      <span>Horario <strong>{{ labSelectedSlot }}</strong> reservado — expira en <strong>{{ labReservationMinutes }}:{{ labReservationSeconds }}</strong></span>
                    </div>
                  </ng-container>

                  <div class="step-actions" style="margin-top:16px">
                    <button mat-button (click)="labStep = 'patient'">← Anterior</button>
                    <button mat-raised-button color="primary"
                            [disabled]="!labSelectedDate || !labSelectedSlot || !labSelectedClinicId || !labSelectedExam"
                            (click)="labStep = 'payment'">
                      <mat-icon>payments</mat-icon> Continuar al Pago →
                    </button>
                  </div>
                </mat-card-content>
              </mat-card>
            </ng-container>

            <!-- STEP: Payment -->
            <ng-container *ngIf="labStep === 'payment'">
              <mat-card>
                <mat-card-header>
                  <mat-card-title>Paso 4 — Cobro</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <div class="reservation-timer" *ngIf="labReservationTimeLeft > 0" [class.timer-low]="labReservationLow" style="margin-bottom:16px">
                    <mat-icon>timer</mat-icon>
                    <span>Reserva expira en <strong>{{ labReservationMinutes }}:{{ labReservationSeconds }}</strong> — completa el pago antes</span>
                  </div>

                  <div class="pay-summary">
                    <div class="pay-summary-row"><mat-icon>person</mat-icon><span>{{ labExistingPatient?.firstName }} {{ labExistingPatient?.lastName }}</span></div>
                    <div class="pay-summary-row"><mat-icon>local_hospital</mat-icon><span>{{ labClinicName }}</span></div>
                    <div class="pay-summary-row"><mat-icon>biotech</mat-icon><span>{{ labSelectedExam?.name }}</span></div>
                    <div class="pay-summary-row"><mat-icon>event</mat-icon><span>{{ labFormatDate(labSelectedDate) }} a las <strong>{{ labSelectedSlot }}</strong></span></div>
                    <div class="pay-summary-row pay-total"><mat-icon>payments</mat-icon><span>Monto a cobrar: <strong>Q{{ labFee }}</strong></span></div>
                  </div>

                  <h3 style="margin:20px 0 12px">Método de Pago</h3>
                  <div class="pay-method-grid">
                    <button type="button" [class]="'pay-method-btn' + (labPayMode === 'TARJETA' ? ' active' : '')"
                            (click)="labPayMode = 'TARJETA'; labCashReceived = null">
                      <mat-icon>credit_card</mat-icon>
                      <span>Tarjeta (POS)</span>
                    </button>
                    <button type="button" [class]="'pay-method-btn' + (labPayMode === 'EFECTIVO' ? ' active' : '')"
                            (click)="labPayMode = 'EFECTIVO'">
                      <mat-icon>money</mat-icon>
                      <span>Efectivo</span>
                    </button>
                  </div>

                  <div class="pos-area" *ngIf="labPayMode === 'TARJETA'">
                    <div class="pos-device">
                      <mat-icon>point_of_sale</mat-icon>
                      <span>Terminal POS</span>
                      <small>Presente la tarjeta en el lector y confirme</small>
                    </div>
                    <button mat-raised-button color="primary" style="width:100%;font-size:1.05rem;padding:14px"
                            [disabled]="labBooking" (click)="labBookAndPay()">
                      <mat-spinner *ngIf="labBooking" diameter="22" style="display:inline-block;margin-right:10px"></mat-spinner>
                      <mat-icon *ngIf="!labBooking">point_of_sale</mat-icon>
                      {{ labBooking ? 'Procesando...' : 'Cobrar Q' + labFee + ' con POS' }}
                    </button>
                  </div>

                  <div class="cash-area" *ngIf="labPayMode === 'EFECTIVO'">
                    <mat-form-field appearance="outline" class="wide">
                      <mat-label>Efectivo recibido (Q)</mat-label>
                      <mat-icon matPrefix>money</mat-icon>
                      <input matInput type="number" [(ngModel)]="labCashReceived" [ngModelOptions]="{standalone:true}"
                             min="0" step="0.01" (ngModelChange)="labComputeChange()">
                    </mat-form-field>
                    <div class="change-display" *ngIf="labCashReceived !== null && labCashReceived >= labFee">
                      <mat-icon>change_circle</mat-icon>
                      <span>Vuelto a entregar: <strong>Q{{ labChange.toFixed(2) }}</strong></span>
                    </div>
                    <div class="insufficient-notice" *ngIf="labCashReceived !== null && labCashReceived < labFee">
                      <mat-icon>warning</mat-icon>
                      <span>Efectivo insuficiente. Faltan Q{{ (labFee - labCashReceived).toFixed(2) }}</span>
                    </div>
                    <button mat-raised-button color="primary" style="width:100%;margin-top:12px;font-size:1.05rem;padding:14px"
                            [disabled]="labBooking || labCashReceived === null || labCashReceived < labFee"
                            (click)="labBookAndPay()">
                      <mat-spinner *ngIf="labBooking" diameter="22" style="display:inline-block;margin-right:10px"></mat-spinner>
                      <mat-icon *ngIf="!labBooking">payments</mat-icon>
                      {{ labBooking ? 'Procesando...' : 'Confirmar Pago en Efectivo' }}
                    </button>
                  </div>

                  <div class="step-actions" style="margin-top:16px">
                    <button mat-button (click)="labStep = 'calendar'" [disabled]="labBooking">← Anterior</button>
                  </div>
                </mat-card-content>
              </mat-card>
            </ng-container>

          </div>
        </mat-tab>

      </mat-tab-group>
    </div>
  `,
  styles: [`
    .payments-layout { display:flex; flex-direction:column; gap:24px; }
    .page-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; }
    .page-header h1 { font-size:1.6rem; font-weight:500; color:#1565c0; margin:0; }
    .tab-content { padding:24px 0; }
    .hint-text { color:#757575; font-size:0.85rem; margin-bottom:16px; }
    .wide { width:100%; }
    .form-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:12px; margin-bottom:8px; }
    .step-actions { display:flex; gap:12px; margin-top:16px; }

    /* Pagos Generales */
    .search-row { display:flex; gap:12px; align-items:flex-end; }
    .patient-found { background:#e8f5e9; border-radius:8px; padding:16px; margin-top:12px; }
    .patient-info { display:flex; align-items:center; gap:12px; }
    .patient-meta { font-size:0.85rem; color:#555; margin-top:4px; }
    .insurance-badge { background:#fff3e0; color:#e65100; padding:2px 8px; border-radius:8px; margin-left:8px; font-size:0.8rem; }
    .discount-summary { background:#f8f9ff; border-radius:8px; padding:16px; margin-bottom:16px; }
    .summary-row { display:flex; justify-content:space-between; padding:4px 0; }
    .summary-row.discount { color:#2e7d32; }
    .summary-row.total { font-size:1.1rem; margin-top:8px; }
    .payment-row { display:flex; justify-content:space-between; align-items:center; padding:12px; background:#f8f9ff; border-radius:8px; margin-bottom:8px; }
    .payment-actions { display:flex; align-items:center; gap:8px; }
    .payment-meta { font-size:0.85rem; color:#555; }

    /* DPI / patient */
    .found-box { display:flex; align-items:center; gap:12px; background:#e8f5e9; padding:16px; border-radius:8px; color:#2e7d32; margin-top:16px; }
    .found-box mat-icon { font-size:32px; width:32px; height:32px; }
    .new-patient-notice { display:flex; align-items:center; gap:12px; background:#fff3e0; padding:14px; border-radius:8px; color:#e65100; margin-top:16px; }

    /* Calendar */
    .calendar-nav { display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; background:#f0faf8; border-radius:10px; padding:6px 12px; }
    .month-label { font-size:1rem; font-weight:700; color:#1D6C61; }
    .nav-btn { background:none; border:none; cursor:pointer; font-size:2rem; line-height:1; color:#1D6C61; padding:0 8px; border-radius:6px; }
    .nav-btn:hover { background:#d0f4ef; }
    .calendar-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:4px; margin-bottom:16px; }
    .cal-weekday { text-align:center; font-size:0.72rem; font-weight:700; color:#9e9e9e; padding:6px 0; text-transform:uppercase; }
    .cal-day { text-align:center; padding:10px 4px; border-radius:8px; font-size:0.9rem; cursor:pointer; transition:background 0.15s; user-select:none; }
    .cal-day.empty { cursor:default; }
    .cal-day.past { color:#ccc; cursor:not-allowed; }
    .cal-day:not(.past):not(.empty):hover { background:#d0f4ef; }
    .cal-day.today { border:2px solid #3EB9A8; font-weight:700; }
    .cal-day.selected { background:#1D6C61 !important; color:white; font-weight:700; }
    .slots-label { display:flex; align-items:center; gap:8px; font-weight:600; color:#1D6C61; margin-bottom:10px; font-size:0.9rem; }
    .slots-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; margin-bottom:8px; }
    .slot-btn { padding:12px 4px; border-radius:8px; border:2px solid #d0e8e5; background:white; cursor:pointer; font-size:0.9rem; font-weight:600; color:#1D6C61; transition:all 0.15s; }
    .slot-btn:hover { background:#d0f4ef; border-color:#3EB9A8; }
    .slot-btn.selected { background:#1D6C61; color:white; border-color:#1D6C61; }
    .no-slots { display:flex; align-items:center; gap:8px; color:#9e9e9e; font-size:0.88rem; }

    /* Payment step */
    .pay-summary { background:#f0faf8; border:1px solid #b2dfdb; border-radius:10px; padding:16px; margin-bottom:8px; }
    .pay-summary-row { display:flex; align-items:center; gap:10px; padding:6px 0; font-size:0.93rem; }
    .pay-summary-row mat-icon { color:#1D6C61; flex-shrink:0; font-size:20px; width:20px; height:20px; }
    .pay-total { font-size:1.05rem; border-top:1px solid #b2dfdb; margin-top:4px; padding-top:10px; }
    .pay-method-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:20px; }
    .pay-method-btn { display:flex; flex-direction:column; align-items:center; gap:8px; padding:20px; border-radius:12px; border:2px solid #d0e8e5; background:white; cursor:pointer; font-size:0.95rem; font-weight:600; color:#555; transition:all 0.15s; }
    .pay-method-btn mat-icon { font-size:36px; width:36px; height:36px; color:#9e9e9e; }
    .pay-method-btn:hover { border-color:#3EB9A8; color:#1D6C61; }
    .pay-method-btn.active { border-color:#1D6C61; background:#f0faf8; color:#1D6C61; }
    .pay-method-btn.active mat-icon { color:#1D6C61; }
    .pos-area { background:#f8f9ff; border-radius:10px; padding:20px; text-align:center; }
    .pos-device { display:flex; flex-direction:column; align-items:center; gap:6px; margin-bottom:20px; color:#555; }
    .pos-device mat-icon { font-size:56px; width:56px; height:56px; color:#1565c0; }
    .pos-device span { font-size:1rem; font-weight:600; color:#1565c0; }
    .pos-device small { color:#9e9e9e; font-size:0.82rem; }
    .cash-area { background:#f0faf8; border-radius:10px; padding:20px; }
    .change-display { display:flex; align-items:center; gap:8px; background:#e8f5e9; border-radius:8px; padding:12px 16px; color:#2e7d32; font-size:1rem; margin-top:8px; }
    .change-display mat-icon { color:#2e7d32; }
    .insufficient-notice { display:flex; align-items:center; gap:8px; background:#fff3e0; border-radius:8px; padding:12px 16px; color:#e65100; font-size:0.9rem; margin-top:8px; }
    .insufficient-notice mat-icon { color:#e65100; }

    /* Receipt */
    .receipt-card { max-width:560px; border-left:4px solid #2e7d32; }
    .receipt-header { display:flex; align-items:center; gap:16px; margin-bottom:20px; }
    .receipt-icon { font-size:52px; width:52px; height:52px; color:#2e7d32; flex-shrink:0; }
    .receipt-header h2 { margin:0 0 4px; color:#1b5e20; font-size:1.4rem; }
    .receipt-header p { margin:0; color:#555; font-size:0.9rem; }
    .receipt-body { display:flex; flex-direction:column; gap:8px; background:#f8fffe; border-radius:10px; padding:16px; }
    .receipt-row { display:flex; align-items:center; gap:10px; font-size:0.93rem; }
    .receipt-row mat-icon { color:#1D6C61; font-size:20px; width:20px; height:20px; flex-shrink:0; }
    .receipt-total { font-size:1.05rem; border-top:1px solid #d4e8e5; padding-top:10px; margin-top:4px; }
    .receipt-change { color:#2e7d32; font-weight:600; }
    .receipt-change mat-icon { color:#2e7d32; }
    .cred-box { display:flex; align-items:flex-start; gap:14px; background:#fff8e1; border:1px solid #ffe082; border-radius:8px; padding:14px 18px; margin-top:16px; }
    .cred-box mat-icon { font-size:26px; width:26px; height:26px; color:#f57f17; flex-shrink:0; margin-top:2px; }
    .cred-row { display:flex; align-items:center; gap:8px; font-size:0.88rem; margin-top:4px; }
    .cred-row span { color:#757575; min-width:140px; }
    .cred-row code { background:#fff3e0; padding:2px 8px; border-radius:4px; font-weight:700; color:#e65100; }
    h3 { font-size:1rem; font-weight:600; color:#1D6C61; margin:0; }
    .reservation-timer { display:flex; align-items:center; gap:8px; background:#e8f5e9; border-radius:8px; padding:10px 14px; color:#2e7d32; font-size:0.88rem; margin-top:12px; }
    .reservation-timer mat-icon { color:#2e7d32; flex-shrink:0; }
    .reservation-timer.timer-low { background:#fff3e0; color:#e65100; animation:pulse-timer 1s infinite; }
    .reservation-timer.timer-low mat-icon { color:#e65100; }
    @keyframes pulse-timer { 0%,100% { opacity:1; } 50% { opacity:0.7; } }
  `]
})
export class PaymentsComponent implements OnInit, OnDestroy {

  // ── Pagos Generales ────────────────────────────────────────────────────────
  searchForm: FormGroup;
  paymentForm: FormGroup;
  patient: Patient | null = null;
  pendingPayments: Payment[] = [];
  paidPayments: Payment[] = [];
  selectedMethods: Record<number, string> = {};
  columns = ['invoice', 'type', 'amount', 'method', 'date'];

  // ── Citas Presenciales ─────────────────────────────────────────────────────
  citStep: CitStep = 'dpi';
  citDpiForm!: FormGroup;
  citPatientForm!: FormGroup;

  citExistingPatient: Patient | null = null;
  citIsNewPatient = false;
  citSearching = false;
  citSaving = false;
  citNewCredentials: { username: string; tempPassword: string } | null = null;

  citClinics: Clinic[] = [];
  insurances: any[] = [];

  // Calendar
  citCalYear = 0;
  citCalMonth = 0;
  citCalendarDays: (Date | null)[] = [];
  citSelectedDate: Date | null = null;
  citSelectedSlot: string | null = null;
  citSelectedClinicId: number | null = null;
  citAvailableSlots: string[] = [];
  citLoadingSlots = false;
  citType = 'CONSULTA';
  citFee = 150;
  private citSlotPollTimer: any = null;

  readonly weekDays = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];

  get citMonthLabel(): string {
    return `${MONTH_NAMES[this.citCalMonth]} ${this.citCalYear}`;
  }

  get citClinicName(): string {
    return this.citClinics.find(c => c.id === this.citSelectedClinicId)?.name ?? '—';
  }

  // Reservation
  citReservationId: number | null = null;
  citReservationTimeLeft = 0;
  private citReservationTimer: any = null;
  get citReservationMinutes(): number { return Math.floor(this.citReservationTimeLeft / 60); }
  get citReservationSeconds(): string { return (this.citReservationTimeLeft % 60).toString().padStart(2, '0'); }
  get citReservationLow(): boolean { return this.citReservationTimeLeft > 0 && this.citReservationTimeLeft <= 120; }

  // Payment
  citPayMode: PayMode | null = null;
  citCashReceived: number | null = null;
  citChange = 0;
  citBooking = false;
  citReceipt: any = null;

  // ── Laboratorios ───────────────────────────────────────────────────────────
  labStep: LabStep = 'dpi';
  labDpiForm!: FormGroup;
  labPatientForm!: FormGroup;

  labExistingPatient: Patient | null = null;
  labIsNewPatient = false;
  labSearching = false;
  labSaving = false;
  labNewCredentials: { username: string; tempPassword: string } | null = null;

  labClinics: Clinic[] = [];
  labExams: LabExam[] = [];
  labSelectedExam: LabExam | null = null;
  labFee = 0;

  labCalYear = 0;
  labCalMonth = 0;
  labCalendarDays: (Date | null)[] = [];
  labSelectedDate: Date | null = null;
  labSelectedSlot: string | null = null;
  labSelectedClinicId: number | null = null;
  labAvailableSlots: string[] = [];
  labLoadingSlots = false;
  private labSlotPollTimer: any = null;

  get labMonthLabel(): string { return `${MONTH_NAMES[this.labCalMonth]} ${this.labCalYear}`; }
  get labClinicName(): string { return this.labClinics.find(c => c.id === this.labSelectedClinicId)?.name ?? '—'; }

  labReservationId: number | null = null;
  labReservationTimeLeft = 0;
  private labReservationTimer: any = null;
  get labReservationMinutes(): number { return Math.floor(this.labReservationTimeLeft / 60); }
  get labReservationSeconds(): string { return (this.labReservationTimeLeft % 60).toString().padStart(2, '0'); }
  get labReservationLow(): boolean { return this.labReservationTimeLeft > 0 && this.labReservationTimeLeft <= 120; }

  labPayMode: PayMode | null = null;
  labCashReceived: number | null = null;
  labChange = 0;
  labBooking = false;
  labReceipt: any = null;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private paymentService: PaymentService,
    private appointmentService: AppointmentService,
    private clinicService: ClinicService,
    private insuranceService: InsuranceService,
    private labExamService: LabExamService,
    private notification: NotificationService
  ) {
    this.searchForm = this.fb.group({ query: ['', Validators.required] });
    this.paymentForm = this.fb.group({
      type: ['CONSULTATION', Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    this.citDpiForm = this.fb.group({
      dpi: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]]
    });
    this.citPatientForm = this.fb.group({
      firstName:       ['', Validators.required],
      lastName:        ['', Validators.required],
      birthDate:       [''],
      phone:           [''],
      email:           ['', [Validators.required, Validators.email]],
      address:         [''],
      insuranceId:     [null],
      insuranceNumber: ['']
    });

    this.labDpiForm = this.fb.group({
      dpi: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]]
    });
    this.labPatientForm = this.fb.group({
      firstName:       ['', Validators.required],
      lastName:        ['', Validators.required],
      birthDate:       [''],
      phone:           [''],
      email:           ['', [Validators.required, Validators.email]],
      address:         [''],
      insuranceId:     [null],
      insuranceNumber: ['']
    });

    this.clinicService.getAll().subscribe(res => {
      if (res.success) {
        this.citClinics = res.data.filter((c: Clinic) =>
          BOOKING_CLINIC_KEYWORDS.some(k => c.name.toLowerCase().includes(k))
        );
        if (this.citClinics.length === 0) {
          this.citClinics = res.data.filter((c: Clinic) =>
            !LAB_KEYWORDS.some(k => c.name.toLowerCase().includes(k))
          );
        }
        this.labClinics = res.data.filter((c: Clinic) =>
          LAB_KEYWORDS.some(k => c.name.toLowerCase().includes(k))
        );
        if (this.labClinics.length === 0) this.labClinics = res.data;
      }
    });
    this.insuranceService.getAll().subscribe(res => {
      if (res.success) this.insurances = res.data;
    });
    this.labExamService.getAll().subscribe(res => {
      if (res.success) this.labExams = res.data.filter((e: LabExam) => e.active);
    });

    const now = new Date();
    this.citCalYear = now.getFullYear();
    this.citCalMonth = now.getMonth();
    this.citBuildCalendar();
    this.labCalYear = now.getFullYear();
    this.labCalMonth = now.getMonth();
    this.labBuildCalendar();
  }

  ngOnDestroy(): void {
    if (this.citReservationId) {
      this.appointmentService.cancelReservation(this.citReservationId).subscribe({ error: () => {} });
    }
    this.citClearReservationTimer();
    this.citStopSlotPolling();
    if (this.labReservationId) {
      this.appointmentService.cancelReservation(this.labReservationId).subscribe({ error: () => {} });
    }
    this.labClearReservationTimer();
    this.labStopSlotPolling();
  }

  // ── Pagos Generales methods ────────────────────────────────────────────────

  searchPatient(): void {
    const q = this.searchForm.value.query;
    const obs = q.match(/^\d{13}$/)
      ? this.patientService.getByDpi(q)
      : this.patientService.search(q);
    (obs as any).subscribe({
      next: (res: any) => {
        const p = Array.isArray(res.data) ? res.data[0] : res.data;
        if (p) { this.patient = p; this.loadPayments(p.id); }
        else this.notification.error('Paciente no encontrado');
      },
      error: () => this.notification.error('Paciente no encontrado')
    });
  }

  loadPayments(patientId: number): void {
    this.paymentService.getByPatient(patientId).subscribe(res => {
      if (res.success) {
        this.pendingPayments = res.data.filter(p => p.status === 'PENDING');
        this.paidPayments   = res.data.filter(p => p.status === 'PAID');
        this.selectedMethods = {};
      }
    });
  }

  getDiscount(): string {
    const amount = this.paymentForm.value.amount || 0;
    return (amount * (this.patient?.discountPercentage || 0) / 100).toFixed(2);
  }

  getNetAmount(): string {
    return (+(this.paymentForm.value.amount || 0) - +this.getDiscount()).toFixed(2);
  }

  createPayment(): void {
    if (!this.patient) return;
    this.paymentService.create({ patientId: this.patient.id, ...this.paymentForm.value }).subscribe({
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
    this.paymentService.process(payment.id, this.selectedMethods[payment.id] as any).subscribe({
      next: res => {
        if (res.success) {
          this.notification.success(`Pago procesado. Factura: ${res.data.invoiceNumber}`);
          this.loadPayments(this.patient!.id);
        }
      }
    });
  }

  // ── Citas Presenciales: DPI ────────────────────────────────────────────────

  citSearchByDpi(): void {
    const dpi = this.citDpiForm.value.dpi;
    this.citSearching = true;
    this.citExistingPatient = null;
    this.citIsNewPatient = false;
    this.patientService.getByDpi(dpi).subscribe({
      next: res => {
        if (res.success && res.data) {
          this.citExistingPatient = res.data;
          this.citPatientForm.patchValue(res.data);
        } else {
          this.citIsNewPatient = true;
          this.citPatientForm.reset();
        }
        this.citSearching = false;
      },
      error: () => {
        this.citIsNewPatient = true;
        this.citPatientForm.reset();
        this.citSearching = false;
      }
    });
  }

  // ── Citas Presenciales: Patient save ──────────────────────────────────────

  citSaveAndContinue(): void {
    this.citSaving = true;
    if (this.citExistingPatient) {
      const data = { ...this.citPatientForm.value, dpi: this.citExistingPatient.dpi };
      this.patientService.update(this.citExistingPatient.id, data).subscribe({
        next: res => {
          if (res.success) { this.citExistingPatient = res.data; this.citStep = 'calendar'; }
          else this.notification.error(res.message || 'Error al actualizar');
          this.citSaving = false;
        },
        error: err => { this.notification.error(err.error?.message || 'Error'); this.citSaving = false; }
      });
    } else {
      const data = { ...this.citDpiForm.value, ...this.citPatientForm.value, createAccount: true };
      this.patientService.create(data).subscribe({
        next: res => {
          if (res.success) {
            if ((res.data as any).tempPassword) {
              this.citNewCredentials = {
                username: (res.data as any).username ?? data.dpi,
                tempPassword: (res.data as any).tempPassword
              };
            }
            this.citExistingPatient = res.data;
            this.citStep = 'calendar';
          } else {
            this.notification.error(res.message || 'Error al registrar paciente');
          }
          this.citSaving = false;
        },
        error: err => { this.notification.error(err.error?.message || 'Error'); this.citSaving = false; }
      });
    }
  }

  // ── Citas Presenciales: Calendar ──────────────────────────────────────────

  citBuildCalendar(): void {
    const firstDay = new Date(this.citCalYear, this.citCalMonth, 1).getDay();
    const daysInMonth = new Date(this.citCalYear, this.citCalMonth + 1, 0).getDate();
    const days: (Date | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(this.citCalYear, this.citCalMonth, i));
    this.citCalendarDays = days;
  }

  citPrevMonth(): void {
    if (this.citCalMonth === 0) { this.citCalMonth = 11; this.citCalYear--; }
    else this.citCalMonth--;
    this.citBuildCalendar();
  }

  citNextMonth(): void {
    if (this.citCalMonth === 11) { this.citCalMonth = 0; this.citCalYear++; }
    else this.citCalMonth++;
    this.citBuildCalendar();
  }

  private getCATodayStr(): string {
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Guatemala' }).format(new Date());
  }

  private getCAMinutesNow(): number {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Guatemala', hour: '2-digit', minute: '2-digit', hour12: false
    }).formatToParts(new Date());
    const h = parseInt(parts.find(p => p.type === 'hour')!.value);
    const m = parseInt(parts.find(p => p.type === 'minute')!.value);
    return h * 60 + m;
  }

  citIsPastDay(d: Date): boolean {
    const today = this.getCATodayStr();
    const ds = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    return ds < today;
  }

  citGetDayClass(day: Date): string {
    let cls = 'cal-day';
    if (this.citIsPastDay(day)) return cls + ' past';
    const today = this.getCATodayStr();
    const ds = `${day.getFullYear()}-${String(day.getMonth()+1).padStart(2,'0')}-${String(day.getDate()).padStart(2,'0')}`;
    if (ds === today) cls += ' today';
    if (this.citSelectedDate && day.getTime() === this.citSelectedDate.getTime()) cls += ' selected';
    return cls;
  }

  citSelectDate(day: Date): void {
    if (this.citReservationId) {
      this.appointmentService.cancelReservation(this.citReservationId).subscribe({ error: () => {} });
      this.citClearReservationTimer();
    }
    this.citSelectedDate = day;
    this.citSelectedSlot = null;
    this.citLoadSlots();
    this.citStartSlotPolling();
  }

  citSelectSlot(slot: string): void {
    if (this.citSelectedSlot === slot) return;
    if (this.citReservationId) {
      this.appointmentService.cancelReservation(this.citReservationId).subscribe({ error: () => {} });
      this.citClearReservationTimer();
    }
    this.citSelectedSlot = slot;
    this.citReserveSlot(slot);
  }

  citOnClinicChange(id: number): void {
    this.citSelectedClinicId = id;
    this.citSelectedSlot = null;
    if (this.citReservationId) {
      this.appointmentService.cancelReservation(this.citReservationId).subscribe({ error: () => {} });
      this.citClearReservationTimer();
    }
    if (this.citSelectedDate) { this.citLoadSlots(); this.citStartSlotPolling(); }
  }

  citUpdateFee(): void {
    this.citFee = TYPE_FEE[this.citType] ?? 150;
  }

  citLoadSlots(silent = false): void {
    if (!this.citSelectedDate || !this.citSelectedClinicId) return;
    if (!silent) this.citLoadingSlots = true;
    const d = this.citSelectedDate;
    const dateStr = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    this.appointmentService.getAvailableSlots(dateStr, this.citSelectedClinicId).subscribe({
      next: res => {
        if (res.success) {
          const allSlots = res.data;
          const today = this.getCATodayStr();
          const selStr = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
          if (selStr === today) {
            const cutoff = this.getCAMinutesNow() + 30;
            this.citAvailableSlots = allSlots.filter((slot: string) => {
              const [h, m] = slot.split(':').map(Number);
              return h * 60 + m > cutoff;
            });
          } else {
            this.citAvailableSlots = allSlots;
          }
          if (this.citSelectedSlot && !this.citAvailableSlots.includes(this.citSelectedSlot)) {
            this.citSelectedSlot = null;
          }
        }
        this.citLoadingSlots = false;
      },
      error: () => { this.citLoadingSlots = false; }
    });
  }

  citStartSlotPolling(): void {
    this.citStopSlotPolling();
    this.citSlotPollTimer = setInterval(() => {
      if (this.citStep === 'calendar' && this.citSelectedDate && this.citSelectedClinicId) {
        this.citLoadSlots(true);
      } else {
        this.citStopSlotPolling();
      }
    }, 5000);
  }

  citStopSlotPolling(): void {
    if (this.citSlotPollTimer) { clearInterval(this.citSlotPollTimer); this.citSlotPollTimer = null; }
  }

  citFormatDate(d: Date | null): string {
    if (!d) return '';
    const days = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
    return `${days[d.getDay()]} ${d.getDate()} de ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
  }

  // ── Citas Presenciales: Reservation ──────────────────────────────────────

  citReserveSlot(slot: string): void {
    if (!this.citSelectedDate || !this.citSelectedClinicId || !this.citExistingPatient) return;
    const d = this.citSelectedDate;
    const dateStr = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    this.appointmentService.reserve({
      patientId: this.citExistingPatient.id,
      clinicId: this.citSelectedClinicId,
      date: dateStr,
      time: slot
    }).subscribe({
      next: res => {
        if (res.success) {
          this.citReservationId = res.data.id;
          const expiresAt = new Date(res.data.expiresAt);
          const secondsLeft = Math.max(0, Math.floor((expiresAt.getTime() - Date.now()) / 1000));
          this.citStartReservationTimer(secondsLeft);
        }
      },
      error: err => {
        this.notification.error(err.error?.message || 'No se pudo reservar el horario');
        this.citSelectedSlot = null;
        this.citLoadSlots();
      }
    });
  }

  citStartReservationTimer(seconds: number): void {
    this.citClearReservationTimer();
    this.citReservationTimeLeft = seconds;
    this.citReservationTimer = setInterval(() => {
      this.citReservationTimeLeft--;
      if (this.citReservationTimeLeft <= 0) {
        this.citClearReservationTimer();
        this.citOnReservationExpired();
      }
    }, 1000);
  }

  citClearReservationTimer(): void {
    if (this.citReservationTimer) { clearInterval(this.citReservationTimer); this.citReservationTimer = null; }
    this.citReservationTimeLeft = 0;
    this.citReservationId = null;
  }

  citOnReservationExpired(): void {
    this.notification.error('La reserva del horario expiró. Seleccione nuevamente.');
    this.citSelectedSlot = null;
    this.citStep = 'calendar';
    if (this.citSelectedDate) { this.citLoadSlots(); this.citStartSlotPolling(); }
  }

  // ── Citas Presenciales: Payment ────────────────────────────────────────────

  citComputeChange(): void {
    this.citChange = this.citCashReceived !== null ? Math.max(0, this.citCashReceived - this.citFee) : 0;
  }

  citTypeLabel(t: string): string {
    return { CONSULTA: 'Consulta Externa', CONTROL: 'Medicina General' }[t] ?? t;
  }

  citBookAndPay(): void {
    if (!this.citExistingPatient || !this.citSelectedClinicId || !this.citSelectedDate || !this.citSelectedSlot) return;
    this.citBooking = true;
    this.citStopSlotPolling();

    const d = this.citSelectedDate;
    const dateStr = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    const paymentMethod = this.citPayMode === 'TARJETA' ? 'POS_CARD' : 'CASH';

    this.appointmentService.book({
      patientId: this.citExistingPatient.id,
      clinicId: this.citSelectedClinicId,
      type: this.citType,
      scheduledDate: dateStr,
      scheduledTime: this.citSelectedSlot,
      notes: 'Cita presencial registrada en caja'
    }).subscribe({
      next: bookRes => {
        if (!bookRes.success) {
          this.notification.error(bookRes.message || 'Error al agendar cita');
          this.citBooking = false;
          return;
        }
        const apptId = bookRes.data.id;
        this.appointmentService.confirmPayment(apptId, { paymentMethod }).subscribe({
          next: confRes => {
            if (confRes.success) {
              this.citReceipt = {
                ticketNumber:  confRes.data.ticketNumber ?? '—',
                patientName:   bookRes.data.patientName,
                clinicName:    bookRes.data.clinicName,
                type:          this.citType,
                scheduledDate: dateStr,
                scheduledTime: this.citSelectedSlot,
                amount:        this.citFee,
                payMode:       this.citPayMode,
                cashReceived:  this.citCashReceived,
                change:        this.citChange
              };
              this.citStep = 'receipt';
              this.notification.success('Cita confirmada y turno asignado.');
            } else {
              this.notification.error(confRes.message || 'Error al confirmar pago');
            }
            this.citBooking = false;
          },
          error: err => {
            this.notification.error(err.error?.message || 'Error al confirmar pago');
            this.citBooking = false;
          }
        });
      },
      error: err => {
        this.notification.error(err.error?.message || 'Horario no disponible. Seleccione otro.');
        this.citSelectedSlot = null;
        this.citLoadSlots();
        this.citStartSlotPolling();
        this.citStep = 'calendar';
        this.citBooking = false;
      }
    });
  }

  citReset(): void {
    if (this.citReservationId) {
      this.appointmentService.cancelReservation(this.citReservationId).subscribe({ error: () => {} });
    }
    this.citClearReservationTimer();
    this.citStep = 'dpi';
    this.citExistingPatient = null;
    this.citIsNewPatient = false;
    this.citNewCredentials = null;
    this.citReceipt = null;
    this.citSelectedDate = null;
    this.citSelectedSlot = null;
    this.citSelectedClinicId = null;
    this.citAvailableSlots = [];
    this.citPayMode = null;
    this.citCashReceived = null;
    this.citChange = 0;
    this.citType = 'CONSULTA';
    this.citFee = 150;
    this.citDpiForm.reset();
    this.citPatientForm.reset();
    this.citStopSlotPolling();
    const now = new Date();
    this.citCalYear = now.getFullYear();
    this.citCalMonth = now.getMonth();
    this.citBuildCalendar();
  }

  // ── Laboratorios: DPI ──────────────────────────────────────────────────────

  labSearchByDpi(): void {
    const dpi = this.labDpiForm.value.dpi;
    this.labSearching = true;
    this.labExistingPatient = null;
    this.labIsNewPatient = false;
    this.patientService.getByDpi(dpi).subscribe({
      next: res => {
        if (res.success && res.data) {
          this.labExistingPatient = res.data;
          this.labPatientForm.patchValue(res.data);
        } else {
          this.labIsNewPatient = true;
          this.labPatientForm.reset();
        }
        this.labSearching = false;
      },
      error: () => {
        this.labIsNewPatient = true;
        this.labPatientForm.reset();
        this.labSearching = false;
      }
    });
  }

  // ── Laboratorios: Patient save ─────────────────────────────────────────────

  labSaveAndContinue(): void {
    this.labSaving = true;
    if (this.labExistingPatient) {
      const data = { ...this.labPatientForm.value, dpi: this.labExistingPatient.dpi };
      this.patientService.update(this.labExistingPatient.id, data).subscribe({
        next: res => {
          if (res.success) { this.labExistingPatient = res.data; this.labStep = 'calendar'; }
          else this.notification.error(res.message || 'Error al actualizar');
          this.labSaving = false;
        },
        error: err => { this.notification.error(err.error?.message || 'Error'); this.labSaving = false; }
      });
    } else {
      const data = { ...this.labDpiForm.value, ...this.labPatientForm.value, createAccount: true };
      this.patientService.create(data).subscribe({
        next: res => {
          if (res.success) {
            if ((res.data as any).tempPassword) {
              this.labNewCredentials = {
                username: (res.data as any).username ?? data.dpi,
                tempPassword: (res.data as any).tempPassword
              };
            }
            this.labExistingPatient = res.data;
            this.labStep = 'calendar';
          } else {
            this.notification.error(res.message || 'Error al registrar paciente');
          }
          this.labSaving = false;
        },
        error: err => { this.notification.error(err.error?.message || 'Error'); this.labSaving = false; }
      });
    }
  }

  // ── Laboratorios: Calendar ─────────────────────────────────────────────────

  labBuildCalendar(): void {
    const firstDay = new Date(this.labCalYear, this.labCalMonth, 1).getDay();
    const daysInMonth = new Date(this.labCalYear, this.labCalMonth + 1, 0).getDate();
    const days: (Date | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(this.labCalYear, this.labCalMonth, i));
    this.labCalendarDays = days;
  }

  labPrevMonth(): void {
    if (this.labCalMonth === 0) { this.labCalMonth = 11; this.labCalYear--; }
    else this.labCalMonth--;
    this.labBuildCalendar();
  }

  labNextMonth(): void {
    if (this.labCalMonth === 11) { this.labCalMonth = 0; this.labCalYear++; }
    else this.labCalMonth++;
    this.labBuildCalendar();
  }

  labIsPastDay(d: Date): boolean {
    const today = this.getCATodayStr();
    const ds = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    return ds < today;
  }

  labGetDayClass(day: Date): string {
    let cls = 'cal-day';
    if (this.labIsPastDay(day)) return cls + ' past';
    const today = this.getCATodayStr();
    const ds = `${day.getFullYear()}-${String(day.getMonth()+1).padStart(2,'0')}-${String(day.getDate()).padStart(2,'0')}`;
    if (ds === today) cls += ' today';
    if (this.labSelectedDate && day.getTime() === this.labSelectedDate.getTime()) cls += ' selected';
    return cls;
  }

  labSelectDate(day: Date): void {
    if (this.labReservationId) {
      this.appointmentService.cancelReservation(this.labReservationId).subscribe({ error: () => {} });
      this.labClearReservationTimer();
    }
    this.labSelectedDate = day;
    this.labSelectedSlot = null;
    this.labLoadSlots();
    this.labStartSlotPolling();
  }

  labSelectSlot(slot: string): void {
    if (this.labSelectedSlot === slot) return;
    if (this.labReservationId) {
      this.appointmentService.cancelReservation(this.labReservationId).subscribe({ error: () => {} });
      this.labClearReservationTimer();
    }
    this.labSelectedSlot = slot;
    this.labReserveSlot(slot);
  }

  labOnClinicChange(id: number): void {
    this.labSelectedClinicId = id;
    this.labSelectedSlot = null;
    if (this.labReservationId) {
      this.appointmentService.cancelReservation(this.labReservationId).subscribe({ error: () => {} });
      this.labClearReservationTimer();
    }
    if (this.labSelectedDate) { this.labLoadSlots(); this.labStartSlotPolling(); }
  }

  labUpdateFee(): void {
    this.labFee = this.labSelectedExam?.price ?? 0;
  }

  labLoadSlots(silent = false): void {
    if (!this.labSelectedDate || !this.labSelectedClinicId) return;
    if (!silent) this.labLoadingSlots = true;
    const d = this.labSelectedDate;
    const dateStr = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    this.appointmentService.getAvailableSlots(dateStr, this.labSelectedClinicId).subscribe({
      next: res => {
        if (res.success) {
          const allSlots = res.data;
          const today = this.getCATodayStr();
          const selStr = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
          if (selStr === today) {
            const cutoff = this.getCAMinutesNow() + 30;
            this.labAvailableSlots = allSlots.filter((slot: string) => {
              const [h, m] = slot.split(':').map(Number);
              return h * 60 + m > cutoff;
            });
          } else {
            this.labAvailableSlots = allSlots;
          }
          if (this.labSelectedSlot && !this.labAvailableSlots.includes(this.labSelectedSlot)) {
            this.labSelectedSlot = null;
          }
        }
        this.labLoadingSlots = false;
      },
      error: () => { this.labLoadingSlots = false; }
    });
  }

  labStartSlotPolling(): void {
    this.labStopSlotPolling();
    this.labSlotPollTimer = setInterval(() => {
      if (this.labStep === 'calendar' && this.labSelectedDate && this.labSelectedClinicId) {
        this.labLoadSlots(true);
      } else {
        this.labStopSlotPolling();
      }
    }, 5000);
  }

  labStopSlotPolling(): void {
    if (this.labSlotPollTimer) { clearInterval(this.labSlotPollTimer); this.labSlotPollTimer = null; }
  }

  labFormatDate(d: Date | null): string {
    if (!d) return '';
    const days = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
    return `${days[d.getDay()]} ${d.getDate()} de ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
  }

  // ── Laboratorios: Reservation ─────────────────────────────────────────────

  labReserveSlot(slot: string): void {
    if (!this.labSelectedDate || !this.labSelectedClinicId || !this.labExistingPatient) return;
    const d = this.labSelectedDate;
    const dateStr = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    this.appointmentService.reserve({
      patientId: this.labExistingPatient.id,
      clinicId: this.labSelectedClinicId,
      date: dateStr,
      time: slot
    }).subscribe({
      next: res => {
        if (res.success) {
          this.labReservationId = res.data.id;
          const expiresAt = new Date(res.data.expiresAt);
          const secondsLeft = Math.max(0, Math.floor((expiresAt.getTime() - Date.now()) / 1000));
          this.labStartReservationTimer(secondsLeft);
        }
      },
      error: err => {
        this.notification.error(err.error?.message || 'No se pudo reservar el horario');
        this.labSelectedSlot = null;
        this.labLoadSlots();
      }
    });
  }

  labStartReservationTimer(seconds: number): void {
    this.labClearReservationTimer();
    this.labReservationTimeLeft = seconds;
    this.labReservationTimer = setInterval(() => {
      this.labReservationTimeLeft--;
      if (this.labReservationTimeLeft <= 0) {
        this.labClearReservationTimer();
        this.labOnReservationExpired();
      }
    }, 1000);
  }

  labClearReservationTimer(): void {
    if (this.labReservationTimer) { clearInterval(this.labReservationTimer); this.labReservationTimer = null; }
    this.labReservationTimeLeft = 0;
    this.labReservationId = null;
  }

  labOnReservationExpired(): void {
    this.notification.error('La reserva del horario expiró. Seleccione nuevamente.');
    this.labSelectedSlot = null;
    this.labStep = 'calendar';
    if (this.labSelectedDate) { this.labLoadSlots(); this.labStartSlotPolling(); }
  }

  // ── Laboratorios: Payment ──────────────────────────────────────────────────

  labComputeChange(): void {
    this.labChange = this.labCashReceived !== null ? Math.max(0, this.labCashReceived - this.labFee) : 0;
  }

  labBookAndPay(): void {
    if (!this.labExistingPatient || !this.labSelectedClinicId || !this.labSelectedDate || !this.labSelectedSlot || !this.labSelectedExam) return;
    this.labBooking = true;
    this.labStopSlotPolling();

    const d = this.labSelectedDate;
    const dateStr = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    const paymentMethod = this.labPayMode === 'TARJETA' ? 'POS_CARD' : 'CASH';

    this.appointmentService.book({
      patientId: this.labExistingPatient.id,
      clinicId: this.labSelectedClinicId,
      type: 'LABORATORIO',
      scheduledDate: dateStr,
      scheduledTime: this.labSelectedSlot,
      notes: `Examen: ${this.labSelectedExam.name} — Cita de laboratorio registrada en caja`
    }).subscribe({
      next: bookRes => {
        if (!bookRes.success) {
          this.notification.error(bookRes.message || 'Error al agendar cita');
          this.labBooking = false;
          return;
        }
        const apptId = bookRes.data.id;
        this.appointmentService.confirmPayment(apptId, { paymentMethod }).subscribe({
          next: confRes => {
            if (confRes.success) {
              this.labReceipt = {
                ticketNumber:  confRes.data.ticketNumber ?? '—',
                patientName:   bookRes.data.patientName,
                examName:      this.labSelectedExam!.name,
                scheduledDate: dateStr,
                scheduledTime: this.labSelectedSlot,
                amount:        this.labFee,
                payMode:       this.labPayMode,
                cashReceived:  this.labCashReceived,
                change:        this.labChange
              };
              this.labStep = 'receipt';
              this.notification.success('Cita de laboratorio confirmada y turno asignado.');
            } else {
              this.notification.error(confRes.message || 'Error al confirmar pago');
            }
            this.labBooking = false;
          },
          error: err => {
            this.notification.error(err.error?.message || 'Error al confirmar pago');
            this.labBooking = false;
          }
        });
      },
      error: err => {
        this.notification.error(err.error?.message || 'Horario no disponible. Seleccione otro.');
        this.labSelectedSlot = null;
        this.labLoadSlots();
        this.labStartSlotPolling();
        this.labStep = 'calendar';
        this.labBooking = false;
      }
    });
  }

  labReset(): void {
    if (this.labReservationId) {
      this.appointmentService.cancelReservation(this.labReservationId).subscribe({ error: () => {} });
    }
    this.labClearReservationTimer();
    this.labStep = 'dpi';
    this.labExistingPatient = null;
    this.labIsNewPatient = false;
    this.labNewCredentials = null;
    this.labReceipt = null;
    this.labSelectedDate = null;
    this.labSelectedSlot = null;
    this.labSelectedClinicId = null;
    this.labAvailableSlots = [];
    this.labPayMode = null;
    this.labCashReceived = null;
    this.labChange = 0;
    this.labSelectedExam = null;
    this.labFee = 0;
    this.labDpiForm.reset();
    this.labPatientForm.reset();
    this.labStopSlotPolling();
    const now = new Date();
    this.labCalYear = now.getFullYear();
    this.labCalMonth = now.getMonth();
    this.labBuildCalendar();
  }
}
