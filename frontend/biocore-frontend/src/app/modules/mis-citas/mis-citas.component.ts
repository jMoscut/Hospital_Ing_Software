import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormsModule, FormBuilder, FormGroup, ValidationErrors, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../core/auth/auth.service';
import { TicketService, AppointmentService, ClinicService } from '../../shared/services/ticket.service';
import { PrescriptionService, LabService, LabExamService } from '../../shared/services/lab.service';
import { PatientService } from '../../shared/services/patient.service';
import { InsuranceService, EmergencyService, PharmacySaleService, PaymentService } from '../../shared/services/payment.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Ticket, Clinic } from '../../core/models/ticket.model';
import { Prescription, LabOrder, LabExam, SAMPLE_TYPE_LABELS } from '../../core/models/lab.model';
import { Patient } from '../../core/models/patient.model';
import { environment } from '../../../environments/environment';

type BookingStep = 'calendar' | 'payment' | 'confirmed';

const MONTH_NAMES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
                     'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const ALL_SLOTS = [
  '00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00',
  '08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00',
  '16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'
];
const BOOKING_CLINIC_KEYWORDS = ['consulta','medicina','general','externa'];
const LAB_CLINIC_KEYWORDS = ['laboratorio','lab'];
const TYPE_FEES: Record<string, string> = { CONSULTA: '150.00', CONTROL: '100.00' };

function birthDateValidator(ctrl: AbstractControl): ValidationErrors | null {
  const v: string = ctrl.value;
  if (!v) return null;
  const parts = v.split('-');
  if (parts.length !== 3) return { invalidDate: true };
  const yearStr = parts[0];
  const year = parseInt(yearStr, 10);
  if (isNaN(year) || yearStr.length !== 4) return { yearInvalid: true };
  if (year < 1900) return { yearTooEarly: true };
  const d = new Date(v);
  if (isNaN(d.getTime())) return { invalidDate: true };
  const todayStr = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Guatemala' }).format(new Date());
  if (v > todayStr) return { futureDate: true };
  return null;
}

@Component({
  selector: 'app-mis-citas',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, RouterLink,
    MatCardModule, MatButtonModule, MatIconModule,
    MatTabsModule, MatChipsModule, MatProgressSpinnerModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatDividerModule
  ],
  template: `
    <div class="page-container">
      <div class="page-header">
        <div>
          <h1>Bienvenido, {{ userName }}</h1>
          <p class="subtitle">Portal del Paciente · BioCore Medical</p>
        </div>
        <button mat-stroked-button color="warn" (click)="logout()">
          <mat-icon>logout</mat-icon> Cerrar sesión
        </button>
      </div>

      <mat-tab-group animationDuration="200ms" [selectedIndex]="selectedTabIndex" (selectedIndexChange)="selectedTabIndex=$event">

        <!-- TAB 1: Agendar Cita -->
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon class="tab-icon">event_available</mat-icon>
            Agendar Cita
          </ng-template>
          <div class="tab-content">

            <!-- STEP: Calendar + Slots -->
            <ng-container *ngIf="bookingStep === 'calendar'">
              <mat-card class="booking-card">
                <mat-card-header>
                  <mat-icon mat-card-avatar>calendar_month</mat-icon>
                  <mat-card-title>Seleccionar fecha y horario</mat-card-title>
                  <mat-card-subtitle>Selecciona un día para ver los horarios disponibles</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>

                  <!-- Service & Clinic -->
                  <div class="selector-row">
                    <mat-form-field appearance="outline">
                      <mat-label>Tipo de servicio</mat-label>
                      <mat-select [(ngModel)]="selectedType" (ngModelChange)="onTypeChange($event)">
                        <mat-option value="CONSULTA">Consulta Médica — Q150</mat-option>
                        <mat-option value="LABORATORIO">Laboratorio</mat-option>
                        <mat-option value="CONTROL">Control / Seguimiento — Q100</mat-option>
                      </mat-select>
                    </mat-form-field>
                    <mat-form-field appearance="outline" *ngIf="selectedType !== 'LABORATORIO'">
                      <mat-label>Clínica / Área</mat-label>
                      <mat-select [(ngModel)]="selectedClinicId" (ngModelChange)="onClinicChange($event)">
                        <mat-option *ngFor="let c of bookingClinics" [value]="c.id">{{ c.name }}</mat-option>
                      </mat-select>
                    </mat-form-field>
                    <mat-form-field appearance="outline" *ngIf="selectedType === 'LABORATORIO'">
                      <mat-label>Examen de Laboratorio *</mat-label>
                      <mat-icon matPrefix>science</mat-icon>
                      <mat-select [(ngModel)]="selectedLabExamId" (ngModelChange)="onLabExamChange($event)">
                        <mat-option *ngFor="let e of labExams" [value]="e.id">
                          {{ e.name }} — Q{{ e.price }}
                        </mat-option>
                      </mat-select>
                    </mat-form-field>
                  </div>

                  <!-- Calendar navigation -->
                  <div class="calendar-nav">
                    <button class="nav-btn" type="button" (click)="prevMonth()">&#8249;</button>
                    <span class="month-label">{{ monthLabel }}</span>
                    <button class="nav-btn" type="button" (click)="nextMonth()">&#8250;</button>
                  </div>

                  <!-- Calendar grid -->
                  <div class="calendar-grid">
                    <div class="cal-weekday" *ngFor="let d of weekDays">{{ d }}</div>
                    <ng-container *ngFor="let day of calendarDays">
                      <div *ngIf="!day" class="cal-day empty"></div>
                      <div *ngIf="day"
                           [class]="getDayClass(day)"
                           (click)="!isPastDay(day) && selectDate(day)">
                        {{ day.getDate() }}
                      </div>
                    </ng-container>
                  </div>

                  <!-- Time slots -->
                  <ng-container *ngIf="selectedDate">
                    <div class="slots-label">
                      <mat-icon>access_time</mat-icon>
                      Horarios — {{ formatDate(selectedDate) }}
                      <mat-spinner *ngIf="loadingSlots" diameter="16" style="margin-left:8px"></mat-spinner>
                    </div>
                    <div class="slots-grid" *ngIf="!loadingSlots">
                      <button *ngFor="let slot of availableSlots"
                              type="button"
                              [class]="'slot-btn' + (selectedSlot === slot ? ' selected' : '')"
                              (click)="selectSlot(slot)">
                        {{ slot }}
                      </button>
                      <div *ngIf="availableSlots.length === 0" class="no-slots">
                        <mat-icon>event_busy</mat-icon>
                        No hay horarios disponibles para este día
                      </div>
                    </div>
                    <div class="reservation-timer" *ngIf="reservationTimeLeft > 0" [class.timer-low]="reservationLow">
                      <mat-icon>timer</mat-icon>
                      <span>Horario <strong>{{ selectedSlot }}</strong> reservado — expira en <strong>{{ reservationMinutes }}:{{ reservationSeconds }}</strong></span>
                    </div>
                  </ng-container>

                </mat-card-content>
                <mat-card-actions>
                  <button mat-raised-button color="primary"
                          [disabled]="!selectedDate || !selectedSlot || !selectedClinicId || (selectedType === 'LABORATORIO' && !selectedLabExamId)"
                          (click)="goToPayment()">
                    <mat-icon>payment</mat-icon> Continuar al pago
                  </button>
                </mat-card-actions>
              </mat-card>
            </ng-container>

            <!-- STEP: Payment -->
            <ng-container *ngIf="bookingStep === 'payment'">
              <div class="payment-layout">

                <!-- Payment card -->
                <mat-card class="booking-card payment-card">
                  <mat-card-header>
                    <mat-icon mat-card-avatar>payment</mat-icon>
                    <mat-card-title>Pago en Línea</mat-card-title>
                    <mat-card-subtitle>La cita se confirma al completar el pago</mat-card-subtitle>
                  </mat-card-header>
                  <mat-card-content>

                    <!-- Reservation countdown -->
                    <div class="reservation-timer" *ngIf="reservationTimeLeft > 0" [class.timer-low]="reservationLow" style="margin-bottom:16px">
                      <mat-icon>timer</mat-icon>
                      <span>Reserva expira en <strong>{{ reservationMinutes }}:{{ reservationSeconds }}</strong> — completa el pago antes</span>
                    </div>

                    <!-- Summary -->
                    <div class="appt-summary">
                      <div class="summary-row">
                        <mat-icon>event</mat-icon>
                        <span>{{ formatDate(selectedDate) }} a las <strong>{{ selectedSlot }}</strong></span>
                      </div>
                      <div class="summary-row">
                        <mat-icon>local_hospital</mat-icon>
                        <span>{{ getClinicName(selectedClinicId) }} — {{ typeLabel(selectedType) }}</span>
                      </div>
                      <div class="summary-row" *ngIf="discountPct > 0">
                        <mat-icon>receipt</mat-icon>
                        <span>Precio base: <strong>Q {{ consultationFee }}</strong></span>
                      </div>
                      <div class="summary-row" *ngIf="discountPct > 0" style="color:#2e7d32">
                        <mat-icon>discount</mat-icon>
                        <span>Descuento {{ discountPct }}% ({{ patientProfile?.insuranceName }}): <strong>-Q {{ discountAmountNum.toFixed(2) }}</strong></span>
                      </div>
                      <div class="summary-row total-row">
                        <mat-icon>payments</mat-icon>
                        <span>Total a pagar: <strong>Q {{ netFeeNum.toFixed(2) }}</strong></span>
                      </div>
                    </div>

                    <!-- Card form -->
                    <div class="card-form">
                      <h4><mat-icon>credit_card</mat-icon> Datos de tarjeta</h4>
                      <mat-form-field appearance="outline" class="full-width">
                        <mat-label>Nombre en la tarjeta *</mat-label>
                        <input matInput [(ngModel)]="card.name" placeholder="Nombre Apellido">
                      </mat-form-field>
                      <mat-form-field appearance="outline" class="full-width">
                        <mat-label>Número de tarjeta *</mat-label>
                        <input matInput [(ngModel)]="card.number" maxlength="19"
                               placeholder="0000 0000 0000 0000"
                               (input)="formatCardNumber()">
                        <mat-hint>16 dígitos requeridos</mat-hint>
                      </mat-form-field>
                      <div class="field-error-msg" *ngIf="cardNumberError">
                        <mat-icon style="font-size:16px;width:16px;height:16px">error_outline</mat-icon>
                        error de validación en el campo de tarjeta
                      </div>
                      <div class="card-row-2">
                        <mat-form-field appearance="outline">
                          <mat-label>Vencimiento *</mat-label>
                          <input matInput [(ngModel)]="card.expiry" maxlength="5" placeholder="MM/AA"
                                 (input)="formatExpiry()">
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>CVV *</mat-label>
                          <input matInput [(ngModel)]="card.cvv" maxlength="4"
                                 type="password" placeholder="•••">
                        </mat-form-field>
                      </div>
                      <div class="field-error-msg" *ngIf="expiryError">
                        <mat-icon style="font-size:16px;width:16px;height:16px">error_outline</mat-icon>
                        fecha de vencimiento inválida
                      </div>
                    </div>

                    <div class="error-msg" *ngIf="paymentError">
                      <mat-icon>error</mat-icon> {{ paymentError }}
                    </div>
                    <div class="hint-text" *ngIf="!cardValid()">
                      Complete todos los campos de la tarjeta para proceder.
                    </div>
                  </mat-card-content>
                  <mat-card-actions style="display:flex;gap:8px;align-items:center">
                    <button mat-button (click)="bookingStep = 'calendar'" [disabled]="paying">
                      ← Volver
                    </button>
                    <button mat-raised-button color="primary"
                            [disabled]="!cardValid() || paying || uploadErrors.length > 0"
                            (click)="pay()">
                      <mat-spinner *ngIf="paying" diameter="20" style="display:inline-block;margin-right:8px"></mat-spinner>
                      <mat-icon *ngIf="!paying">lock</mat-icon>
                      {{ paying ? 'Procesando pago...' : 'Pagar Q ' + netFeeNum.toFixed(2) }}
                    </button>
                  </mat-card-actions>
                </mat-card>

                <!-- Document upload card -->
                <mat-card class="upload-card">
                  <mat-card-header>
                    <mat-icon mat-card-avatar style="color:#1D6C61">upload_file</mat-icon>
                    <mat-card-title>Documentos</mat-card-title>
                    <mat-card-subtitle>Adjunte exámenes u otros archivos — opcional</mat-card-subtitle>
                  </mat-card-header>
                  <mat-card-content>

                    <!-- Drop zone -->
                    <div class="upload-zone"
                         [class.upload-zone-full]="uploadedDocs.length >= 5"
                         (click)="uploadedDocs.length < 5 && docInput.click()"
                         (dragover)="$event.preventDefault()"
                         (drop)="onDocDrop($event)">
                      <mat-icon class="upload-zone-icon">{{ uploadedDocs.length >= 5 ? 'block' : 'upload_file' }}</mat-icon>
                      <p class="upload-zone-text">
                        {{ uploadedDocs.length >= 5 ? 'Límite de 5 archivos alcanzado' : 'Haga clic o arrastre archivos PDF aquí' }}
                      </p>
                      <small class="upload-zone-hint">Máx. 5 archivos · 20 MB por archivo · solo PDF</small>
                    </div>
                    <input #docInput type="file" accept=".pdf,application/pdf" multiple hidden
                           (change)="addDocs($any($event.target).files)">

                    <!-- File list -->
                    <div class="doc-list" *ngIf="uploadedDocs.length > 0">
                      <div class="doc-item" *ngFor="let f of uploadedDocs; let i = index">
                        <mat-icon class="doc-icon">picture_as_pdf</mat-icon>
                        <div class="doc-meta">
                          <span class="doc-name">{{ f.name }}</span>
                          <span class="doc-size">{{ formatFileSize(f.size) }}</span>
                        </div>
                        <button mat-icon-button (click)="removeDoc(i)" style="flex-shrink:0">
                          <mat-icon style="color:#c62828;font-size:18px">close</mat-icon>
                        </button>
                      </div>
                    </div>

                    <!-- Validation errors -->
                    <div class="upload-errors" *ngIf="uploadErrors.length > 0">
                      <div class="upload-error-item" *ngFor="let e of uploadErrors">
                        <mat-icon>error_outline</mat-icon> {{ e }}
                      </div>
                    </div>

                    <p class="hint-text" style="margin-top:14px;display:flex;align-items:flex-start;gap:6px">
                      <mat-icon style="font-size:15px;width:15px;height:15px;flex-shrink:0;margin-top:2px">info</mat-icon>
                      Solo PDF válidos. No se aceptan archivos cifrados, con contraseña o vacíos.
                    </p>
                  </mat-card-content>
                </mat-card>

              </div>
            </ng-container>

            <!-- STEP: Confirmed -->
            <ng-container *ngIf="bookingStep === 'confirmed'">
              <mat-card class="booking-card confirmed-card">
                <mat-icon class="confirmed-icon">check_circle</mat-icon>
                <h2>¡Cita Confirmada!</h2>
                <p>Su cita ha sido agendada y el pago procesado exitosamente.</p>
                <div class="appt-summary confirmed-summary">
                  <div class="summary-row">
                    <mat-icon>event</mat-icon>
                    <span>{{ formatDate(selectedDate) }} a las <strong>{{ selectedSlot }}</strong></span>
                  </div>
                  <div class="summary-row">
                    <mat-icon>local_hospital</mat-icon>
                    <span>{{ getClinicName(selectedClinicId) }} — {{ typeLabel(selectedType) }}</span>
                  </div>
                  <div class="info-box">
                    <mat-icon>info</mat-icon>
                    <span>El día de su cita, su turno aparecerá automáticamente en el sistema a las {{ selectedSlot }}. Preséntese 10 minutos antes.</span>
                  </div>
                </div>
                <button mat-raised-button color="primary" (click)="resetBooking()" style="margin-top:24px">
                  <mat-icon>add</mat-icon> Agendar otra cita
                </button>
              </mat-card>
            </ng-container>

          </div>
        </mat-tab>

        <!-- TAB 2: Mis Citas -->
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon class="tab-icon">event_note</mat-icon>
            Mis Citas ({{ appointments.length }})
          </ng-template>
          <div class="tab-content">
            <div *ngIf="loadingAppointments" class="loading-state">
              <mat-spinner diameter="40"></mat-spinner><p>Cargando...</p>
            </div>
            <div class="appt-hist-card" *ngFor="let a of appointments">
              <div class="appt-hist-left">
                <div class="appt-hist-icon">
                  <mat-icon>{{ a.scheduledTime ? 'event' : 'walk' }}</mat-icon>
                </div>
                <div class="appt-hist-info">
                  <div class="appt-hist-date">
                    {{ a.scheduledDate | date:'dd/MM/yyyy' }}
                    <span *ngIf="a.scheduledTime" class="appt-hist-time">a las {{ a.scheduledTime }}</span>
                    <span *ngIf="!a.scheduledTime" class="appt-hist-presencial">Presencial</span>
                  </div>
                  <div class="appt-hist-clinic">{{ a.clinicName }}</div>
                  <div class="appt-hist-meta">
                    <span>{{ apptTypeLabel(a.type) }}</span>
                    <span *ngIf="a.doctorName"> · Dr. {{ a.doctorName }}</span>
                  </div>
                  <div class="appt-hist-voucher" *ngIf="a.voucherCode">
                    <mat-icon>receipt</mat-icon> {{ a.voucherCode }}
                  </div>
                </div>
              </div>
              <div class="appt-hist-right">
                <span [class]="getApptStatusClass(a.status)" class="status-chip">{{ apptStatusLabel(a.status) }}</span>
                <div class="appt-hist-amount">Q {{ a.amount }}</div>
              </div>
            </div>
            <div class="empty-state" *ngIf="!loadingAppointments && appointments.length === 0">
              <mat-icon>event_note</mat-icon>
              <p>No tienes citas registradas</p>
              <p class="hint">Agenda tu cita desde la pestaña "Agendar Cita".</p>
            </div>
          </div>
        </mat-tab>

        <!-- TAB 3: Mis Turnos -->
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon class="tab-icon">confirmation_number</mat-icon>
            Mis Turnos ({{ tickets.length }})
          </ng-template>
          <div class="tab-content">
            <div *ngIf="loadingTickets" class="loading-state">
              <mat-spinner diameter="40"></mat-spinner><p>Cargando...</p>
            </div>
            <!-- Reschedule inline panel -->
            <mat-card class="reschedule-panel" *ngIf="rescheduleTicket">
              <mat-card-header>
                <mat-icon mat-card-avatar>event_repeat</mat-icon>
                <mat-card-title>Reagendar Turno {{ rescheduleTicket.ticketNumber }}</mat-card-title>
                <mat-card-subtitle>{{ rescheduleTicket.clinicName }} · {{ rescheduleTicket.type }} · Sin costo adicional</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <!-- Calendar navigation -->
                <div class="calendar-nav">
                  <button class="nav-btn" type="button" (click)="rscdPrevMonth()">&#8249;</button>
                  <span class="month-label">{{ rscdMonthLabel }}</span>
                  <button class="nav-btn" type="button" (click)="rscdNextMonth()">&#8250;</button>
                </div>
                <!-- Calendar grid -->
                <div class="calendar-grid">
                  <div class="cal-weekday" *ngFor="let d of weekDays">{{ d }}</div>
                  <ng-container *ngFor="let day of rscdCalDays">
                    <div *ngIf="!day" class="cal-day empty"></div>
                    <div *ngIf="day"
                         [class]="getRscdDayClass(day)"
                         (click)="!isPastDay(day) && selectRscdDate(day)">
                      {{ day.getDate() }}
                    </div>
                  </ng-container>
                </div>
                <!-- Time slots -->
                <ng-container *ngIf="rscdDate">
                  <div class="slots-label">
                    <mat-icon>access_time</mat-icon>
                    Horarios — {{ formatDate(rscdDate) }}
                    <mat-spinner *ngIf="rscdLoadingSlots" diameter="16" style="margin-left:8px"></mat-spinner>
                  </div>
                  <div class="slots-grid" *ngIf="!rscdLoadingSlots">
                    <button *ngFor="let slot of rscdSlots"
                            type="button"
                            [class]="'slot-btn' + (rscdSlot === slot ? ' selected' : '')"
                            (click)="selectRscdSlot(slot)">
                      {{ slot }}
                    </button>
                    <div *ngIf="rscdSlots.length === 0" class="no-slots">
                      <mat-icon>event_busy</mat-icon>
                      No hay horarios disponibles para este día
                    </div>
                  </div>
                  <div class="reservation-timer" *ngIf="rscdReservationTimeLeft > 0" [class.timer-low]="rscdReservationLow">
                    <mat-icon>timer</mat-icon>
                    <span>Horario <strong>{{ rscdSlot }}</strong> reservado — expira en <strong>{{ rscdReservationMinutes }}:{{ rscdReservationSeconds }}</strong></span>
                  </div>
                </ng-container>
                <div class="error-msg" *ngIf="rscdError" style="margin-top:12px;color:#c62828">{{ rscdError }}</div>
              </mat-card-content>
              <mat-card-actions>
                <button mat-raised-button color="primary"
                        [disabled]="!rscdDate || !rscdSlot || rescheduling"
                        (click)="confirmReschedule()">
                  <mat-spinner *ngIf="rescheduling" diameter="18" style="margin-right:6px"></mat-spinner>
                  <mat-icon *ngIf="!rescheduling">check_circle</mat-icon>
                  Confirmar Reagendamiento
                </button>
                <button mat-button (click)="closeReschedule()" [disabled]="rescheduling">Cancelar</button>
              </mat-card-actions>
            </mat-card>

            <div class="ticket-card" *ngFor="let t of tickets">
              <div class="ticket-left">
                <div class="ticket-num">{{ t.ticketNumber }}</div>
                <div>
                  <div class="ticket-clinic">{{ t.clinicName }}</div>
                  <div class="ticket-type">{{ t.type }}</div>
                  <div class="ticket-date" *ngIf="t.scheduledDate">
                    <mat-icon style="font-size:13px;width:13px;height:13px;vertical-align:middle">event</mat-icon>
                    {{ t.scheduledDate | date:'dd/MM/yyyy' }}
                    <span *ngIf="t.scheduledTime"> a las {{ t.scheduledTime }}</span>
                  </div>
                  <div class="ticket-date" *ngIf="!t.scheduledDate && t.createdAt">{{ t.createdAt | date:'dd/MM/yyyy HH:mm' }}</div>
                  <div class="ticket-doctor" *ngIf="t.doctorName">Dr. {{ t.doctorName }}</div>
                </div>
              </div>
              <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px">
                <span [class]="getStatusClass(t.status, t.scheduledDate)" class="status-chip">{{ statusLabel(t.status, t.scheduledDate) }}</span>
                <button *ngIf="t.status === 'ABSENT_PENDING_RESCHEDULE'"
                        mat-raised-button color="accent"
                        style="font-size:0.75rem"
                        (click)="openReschedule(t)">
                  <mat-icon>event_repeat</mat-icon> Reagendar
                </button>
              </div>
            </div>
            <div class="empty-state" *ngIf="!loadingTickets && tickets.length === 0">
              <mat-icon>event_available</mat-icon>
              <p>No tienes turnos registrados</p>
              <p class="hint">Agenda tu cita desde la pestaña "Agendar Cita".</p>
            </div>
          </div>
        </mat-tab>

        <!-- TAB 3: Mis Recetas -->
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon class="tab-icon">receipt_long</mat-icon>
            Mis Recetas ({{ prescriptions.length }})
          </ng-template>
          <div class="tab-content">
            <div *ngIf="loadingPrescriptions" class="loading-state"><mat-spinner diameter="40"></mat-spinner></div>
            <mat-card class="rx-card" *ngFor="let rx of prescriptions">
              <mat-card-header>
                <mat-icon mat-card-avatar>medication</mat-icon>
                <mat-card-title>Receta #{{ rx.id }}</mat-card-title>
                <mat-card-subtitle>{{ rx.createdAt | date:'dd/MM/yyyy' }}<span *ngIf="rx.doctorName"> · Dr. {{ rx.doctorName }}</span></mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="rx-items">
                  <div class="rx-item" *ngFor="let item of rx.items">
                    <mat-icon>medication_liquid</mat-icon>
                    <div>
                      <strong>{{ item.medicineName }}</strong>
                      <span class="rx-qty"> × {{ item.quantity }}</span>
                      <div class="rx-dosage" *ngIf="item.dosage">{{ item.dosage }}</div>
                    </div>
                    <span class="dispatched-badge" *ngIf="item.dispatched">Entregado</span>
                  </div>
                </div>
                <div class="rx-status"><span [class]="getRxStatusClass(rx.status)">{{ rxStatusLabel(rx.status) }}</span></div>
              </mat-card-content>
            </mat-card>
            <div class="empty-state" *ngIf="!loadingPrescriptions && prescriptions.length === 0">
              <mat-icon>receipt</mat-icon><p>Sin recetas médicas</p>
            </div>
          </div>
        </mat-tab>

        <!-- TAB 4: Diagnósticos -->
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon class="tab-icon">edit_note</mat-icon>
            Diagnósticos ({{ diagnoses.length }})
          </ng-template>
          <div class="tab-content">
            <div *ngIf="loadingPrescriptions" class="loading-state"><mat-spinner diameter="40"></mat-spinner></div>

            <div [class]="'diag-card' + (rx._source==='emergency' ? ' diag-card-emergency' : '')" *ngFor="let rx of diagnoses">
              <div class="diag-header">
                <mat-icon [style.color]="rx._source==='emergency'?'#c62828':'#1D6C61'">{{ rx._source==='emergency' ? 'emergency' : 'stethoscope' }}</mat-icon>
                <div class="diag-meta">
                  <span class="diag-date">{{ rx.createdAt | date:'dd/MM/yyyy' }}
                    <span *ngIf="rx._source==='emergency'" style="background:#ffebee;color:#c62828;padding:1px 8px;border-radius:8px;font-size:0.72rem;margin-left:6px;font-weight:700">EMERGENCIA</span>
                  </span>
                  <span class="diag-doctor" *ngIf="rx.doctorName">Dr. {{ rx.doctorName }}</span>
                </div>
              </div>
              <ng-container *ngIf="rx._source==='emergency'">
                <div class="diag-notes" *ngIf="rx._diagnosis"><strong>Diagnóstico:</strong> {{ rx._diagnosis }}</div>
                <div class="diag-notes" *ngIf="rx._treatment" style="margin-top:6px"><strong>Tratamiento:</strong> {{ rx._treatment }}</div>
                <div class="diag-notes" *ngIf="rx._medications" style="margin-top:6px"><strong>Medicamentos:</strong> {{ rx._medications }}</div>
              </ng-container>
              <ng-container *ngIf="rx._source!=='emergency'">
                <div class="diag-notes" *ngIf="rx.clinicName" style="color:#757575;font-size:0.85rem;margin-bottom:4px">{{ rx.clinicName }}</div>
                <div class="diag-notes" *ngIf="rx.notes">{{ rx.notes }}</div>
                <div class="diag-meds" *ngIf="rx.items && rx.items.length > 0">
                  <div class="diag-meds-label"><mat-icon>medication</mat-icon> Medicamentos recetados</div>
                  <span class="med-chip" *ngFor="let item of rx.items">
                    {{ item.medicineName || item.customMedicineName }} ×{{ item.quantity }}
                    <small *ngIf="item.dosage"> — {{ item.dosage }}</small>
                  </span>
                </div>
              </ng-container>
            </div>

            <div class="empty-state" *ngIf="!loadingPrescriptions && diagnoses.length === 0">
              <mat-icon>edit_note</mat-icon>
              <p>Sin diagnósticos registrados</p>
              <p class="hint">Aquí aparecerán los diagnósticos de tus consultas médicas.</p>
            </div>
          </div>
        </mat-tab>

        <!-- TAB 5: Laboratorio -->
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon class="tab-icon">science</mat-icon>
            Laboratorio ({{ labOrders.length }})
          </ng-template>
          <div class="tab-content">
            <div *ngIf="loadingLab" class="loading-state"><mat-spinner diameter="40"></mat-spinner></div>

            <!-- Referencias pendientes de agendar -->
            <ng-container *ngIf="!loadingLab && labReferences.length > 0">
              <p class="section-label"><mat-icon style="font-size:16px;width:16px;height:16px;vertical-align:middle">assignment</mat-icon> Referencias médicas — pendientes de agendar</p>
              <div class="lab-card ref-pending-card" *ngFor="let r of labReferences">
                <div class="lab-header">
                  <div>
                    <strong>{{ r.labExamName || sampleLabel(r.sampleType) }}</strong>
                    <span class="lab-code" *ngIf="r.labExamCode">{{ r.labExamCode }}</span>
                  </div>
                  <span class="status-chip status-waiting">Pendiente de cita</span>
                </div>
                <div class="lab-details">
                  <div><mat-icon>person</mat-icon> Dr. {{ r.doctorName }}</div>
                  <div><mat-icon>calendar_today</mat-icon> Emitida: {{ r.orderDate }}</div>
                  <div><mat-icon>event</mat-icon> Vence: {{ r.expirationDate }}</div>
                  <div *ngIf="r.labExamPrice"><mat-icon>payments</mat-icon> Q{{ r.labExamPrice }}</div>
                </div>
                <div style="margin-top:10px">
                  <button mat-raised-button color="primary" (click)="bookFromReference(r)">
                    <mat-icon>event_available</mat-icon> Agendar Cita
                  </button>
                </div>
              </div>
            </ng-container>

            <!-- Historial de órdenes -->
            <ng-container *ngIf="!loadingLab">
              <p class="section-label" *ngIf="labOrders.length > labReferences.length">
                <mat-icon style="font-size:16px;width:16px;height:16px;vertical-align:middle">history</mat-icon> Historial
              </p>
              <div class="lab-card" *ngFor="let o of labOrders" [hidden]="o.status === 'PENDING' && !o.isUsed">
                <div class="lab-header">
                  <div>
                    <strong>{{ o.labExamName || sampleLabel(o.sampleType) }}</strong>
                    <span class="lab-code" *ngIf="o.labExamCode">{{ o.labExamCode }}</span>
                  </div>
                  <div style="display:flex;align-items:center;gap:8px">
                    <button *ngIf="o.hasAttachment" mat-icon-button style="color:#c62828" title="Ver PDF resultado" (click)="openLabPdf(o.id)">
                      <mat-icon>picture_as_pdf</mat-icon>
                    </button>
                    <span [class]="getLabStatusClass(o.status)" class="status-chip">{{ labStatusLabel(o.status) }}</span>
                  </div>
                </div>
                <div class="lab-details">
                  <div><mat-icon>calendar_today</mat-icon> {{ o.orderDate }}</div>
                  <div><mat-icon>event</mat-icon> Vence: {{ o.expirationDate }}</div>
                  <div *ngIf="o.resultAvailableAt"><mat-icon>notifications</mat-icon> {{ o.resultAvailableAt | date:'dd/MM/yyyy HH:mm' }}</div>
                  <div *ngIf="o.resultNotes"><mat-icon>notes</mat-icon> {{ o.resultNotes }}</div>
                </div>
              </div>
            </ng-container>

            <div class="empty-state" *ngIf="!loadingLab && labOrders.length === 0">
              <mat-icon>biotech</mat-icon><p>Sin órdenes de laboratorio</p>
            </div>
          </div>
        </mat-tab>

        <!-- TAB 6: Pagos -->
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon class="tab-icon">payments</mat-icon>
            Pagos
          </ng-template>
          <div class="tab-content">
            <ng-container *ngIf="confirmedAppointments().length > 0 || payments.length > 0 || pharmacySales.length > 0; else noPagos">

              <!-- Citas pagadas (online / caja) -->
              <div *ngIf="confirmedAppointments().length > 0" style="margin-bottom:20px">
                <p style="font-size:0.78rem;font-weight:700;color:#9e9e9e;text-transform:uppercase;margin-bottom:8px">Citas y Consultas</p>
                <div class="ticket-card" *ngFor="let a of confirmedAppointments()">
                  <div class="ticket-left">
                    <mat-icon style="color:#1565c0;font-size:32px;width:32px;height:32px">event</mat-icon>
                    <div>
                      <div class="ticket-clinic">{{ apptTypeLabel(a.type) }} · {{ a.clinicName }}</div>
                      <div class="ticket-type">Q{{ a.amount }}</div>
                      <div class="ticket-date">{{ a.scheduledDate | date:'dd/MM/yyyy' }}<span *ngIf="a.voucherCode"> · {{ a.voucherCode }}</span></div>
                    </div>
                  </div>
                  <span class="status-chip status-appt-confirmed">Pagado</span>
                </div>
              </div>

              <!-- Pagos caja (emergencias, lab, otros) -->
              <div *ngIf="payments.length > 0" style="margin-bottom:20px">
                <p style="font-size:0.78rem;font-weight:700;color:#9e9e9e;text-transform:uppercase;margin-bottom:8px">Pagos en Caja</p>
                <div class="ticket-card" *ngFor="let p of payments">
                  <div class="ticket-left">
                    <mat-icon style="color:#2e7d32;font-size:32px;width:32px;height:32px">receipt_long</mat-icon>
                    <div>
                      <div class="ticket-clinic">{{ p.type }}<span *ngIf="p.invoiceNumber"> · {{ p.invoiceNumber }}</span></div>
                      <div class="ticket-type">Q{{ p.netAmount }}</div>
                      <div class="ticket-date">{{ p.createdAt | date:'dd/MM/yyyy' }}</div>
                    </div>
                  </div>
                  <span class="status-chip" [class]="p.status==='PAID'?'status-appt-confirmed':'status-waiting'">{{ p.status === 'PAID' ? 'Pagado' : p.status }}</span>
                </div>
              </div>

              <!-- Farmacia -->
              <div *ngIf="pharmacySales.length > 0">
                <p style="font-size:0.78rem;font-weight:700;color:#9e9e9e;text-transform:uppercase;margin-bottom:8px">Ventas de Farmacia</p>
                <div class="ticket-card" *ngFor="let s of pharmacySales" style="border-left-color:#6a1b9a">
                  <div class="ticket-left">
                    <mat-icon style="color:#6a1b9a;font-size:32px;width:32px;height:32px">medication</mat-icon>
                    <div>
                      <div class="ticket-clinic">{{ s.saleCode || 'Venta farmacia' }}<span *ngIf="s.invoiceNumber"> · Factura {{ s.invoiceNumber }}</span></div>
                      <div class="ticket-type">Q{{ s.totalAmount }}</div>
                      <div class="ticket-date">{{ s.paidAt ? (s.paidAt | date:'dd/MM/yyyy') : (s.createdAt | date:'dd/MM/yyyy') }}</div>
                    </div>
                  </div>
                  <span class="status-chip" style="background:#f3e5f5;color:#6a1b9a">{{ s.status }}</span>
                </div>
              </div>

            </ng-container>
            <ng-template #noPagos>
              <div class="empty-state">
                <mat-icon>receipt_long</mat-icon>
                <p>Sin pagos registrados</p>
              </div>
            </ng-template>
          </div>
        </mat-tab>

        <!-- TAB 7: Mi Perfil -->
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon class="tab-icon">account_circle</mat-icon>
            Mi Perfil
          </ng-template>
          <div class="tab-content">
            <div *ngIf="loadingProfile" class="loading-state"><mat-spinner diameter="40"></mat-spinner></div>

            <ng-container *ngIf="!loadingProfile && patientProfile">

              <!-- Info Card -->
              <mat-card class="profile-card">
                <mat-card-header>
                  <div class="profile-avatar">{{ initials }}</div>
                  <mat-card-title>{{ patientProfile.firstName }} {{ patientProfile.lastName }}</mat-card-title>
                  <mat-card-subtitle>Código: <strong>{{ patientProfile.patientCode }}</strong></mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>

                  <!-- Read-only view -->
                  <div *ngIf="!profileEditMode">
                    <div style="display:flex;justify-content:flex-end;margin-bottom:12px">
                      <button mat-stroked-button color="primary" (click)="startProfileEdit()">
                        <mat-icon>edit</mat-icon> Editar información
                      </button>
                    </div>
                    <div class="profile-grid">
                      <div class="profile-field">
                        <span class="pf-label"><mat-icon>badge</mat-icon> DPI</span>
                        <span class="pf-value">{{ patientProfile.dpi }}</span>
                      </div>
                      <div class="profile-field">
                        <span class="pf-label"><mat-icon>cake</mat-icon> Fecha de nacimiento</span>
                        <span class="pf-value">{{ patientProfile.birthDate ? (patientProfile.birthDate | date:'dd/MM/yyyy') : 'No registrada' }}</span>
                      </div>
                      <div class="profile-field">
                        <span class="pf-label"><mat-icon>phone</mat-icon> Teléfono</span>
                        <span class="pf-value">{{ patientProfile.phone || 'No registrado' }}</span>
                      </div>
                      <div class="profile-field">
                        <span class="pf-label"><mat-icon>email</mat-icon> Correo</span>
                        <span class="pf-value">{{ patientProfile.email || 'No registrado' }}</span>
                      </div>
                      <div class="profile-field">
                        <span class="pf-label"><mat-icon>home</mat-icon> Dirección</span>
                        <span class="pf-value">{{ patientProfile.address || 'No registrada' }}</span>
                      </div>
                      <div class="profile-field">
                        <span class="pf-label"><mat-icon>emergency</mat-icon> Contacto emergencia</span>
                        <span class="pf-value">{{ patientProfile.emergencyContact || 'No registrado' }}
                          <span *ngIf="patientProfile.emergencyPhone"> · {{ patientProfile.emergencyPhone }}</span>
                        </span>
                      </div>
                      <div class="profile-field">
                        <span class="pf-label"><mat-icon>health_and_safety</mat-icon> Aseguradora</span>
                        <span class="pf-value" *ngIf="patientProfile.insuranceName">
                          {{ patientProfile.insuranceName }}
                          <span class="discount-badge" *ngIf="patientProfile.discountPercentage">{{ patientProfile.discountPercentage }}% descuento</span>
                        </span>
                        <span class="pf-value" *ngIf="!patientProfile.insuranceName" style="color:#9e9e9e">Sin seguro</span>
                      </div>
                      <div class="profile-field" *ngIf="patientProfile.insuranceNumber">
                        <span class="pf-label"><mat-icon>confirmation_number</mat-icon> No. de Póliza / Carné</span>
                        <span class="pf-value">{{ patientProfile.insuranceNumber }}</span>
                      </div>
                      <div class="profile-field">
                        <span class="pf-label"><mat-icon>manage_accounts</mat-icon> Usuario del portal</span>
                        <span class="pf-value">{{ patientProfile.username || 'Sin cuenta vinculada' }}</span>
                      </div>
                      <div class="profile-field">
                        <span class="pf-label"><mat-icon>calendar_today</mat-icon> Registrado</span>
                        <span class="pf-value">{{ patientProfile.createdAt | date:'dd/MM/yyyy' }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Edit form -->
                  <form [formGroup]="profileForm" class="profile-edit-grid" *ngIf="profileEditMode">
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
                      <input matInput formControlName="dpi" maxlength="13" (keypress)="onlyDigits($event)">
                    </mat-form-field>
                    <mat-form-field appearance="outline">
                      <mat-label>Fecha de Nacimiento</mat-label>
                      <mat-icon matPrefix>cake</mat-icon>
                      <input matInput type="date" formControlName="birthDate" min="1900-01-01" [max]="today">
                      <mat-error *ngIf="profileForm.get('birthDate')?.errors?.['yearTooEarly']">Año mínimo 1900</mat-error>
                      <mat-error *ngIf="profileForm.get('birthDate')?.errors?.['futureDate']">La fecha no puede ser futura</mat-error>
                      <mat-error *ngIf="profileForm.get('birthDate')?.errors?.['invalidDate']">Fecha inválida</mat-error>
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
                        <mat-option *ngFor="let ins of insurances" [value]="ins.id">
                          {{ ins.name }} ({{ ins.discountPercentage }}% descuento)
                        </mat-option>
                      </mat-select>
                    </mat-form-field>
                    <mat-form-field appearance="outline">
                      <mat-label>No. de Póliza / Carné (Opcional)</mat-label>
                      <input matInput formControlName="insuranceNumber">
                    </mat-form-field>
                  </form>
                </mat-card-content>

                <mat-card-actions *ngIf="profileEditMode" style="display:flex;gap:8px;padding:16px">
                  <button mat-raised-button color="primary" type="button" (click)="saveProfile()" [disabled]="profileForm.invalid || profileSaving">
                    <mat-icon>save</mat-icon> {{ profileSaving ? 'Guardando...' : 'Guardar cambios' }}
                  </button>
                  <button mat-button type="button" (click)="cancelProfileEdit()">
                    <mat-icon>close</mat-icon> Cancelar
                  </button>
                </mat-card-actions>
              </mat-card>

              <!-- Credentials Card -->
              <mat-card class="profile-card" style="margin-top:16px">
                <mat-card-header>
                  <mat-icon mat-card-avatar>lock</mat-icon>
                  <mat-card-title>Seguridad y Acceso</mat-card-title>
                  <mat-card-subtitle>Cambiar usuario o contraseña del portal</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>

                  <!-- Username change -->
                  <h4 class="cred-section-title"><mat-icon>manage_accounts</mat-icon> Nombre de usuario</h4>
                  <p style="color:#757575;font-size:0.85rem;margin-bottom:12px">
                    Usuario actual: <strong>{{ patientProfile.username || '—' }}</strong>
                  </p>
                  <form [formGroup]="usernameForm" class="cred-form">
                    <mat-form-field appearance="outline">
                      <mat-label>Nuevo nombre de usuario</mat-label>
                      <mat-icon matPrefix>person</mat-icon>
                      <input matInput formControlName="newUsername">
                    </mat-form-field>
                    <mat-form-field appearance="outline">
                      <mat-label>Contraseña actual (confirmación)</mat-label>
                      <mat-icon matPrefix>lock</mat-icon>
                      <input matInput type="password" formControlName="currentPasswordForUser">
                    </mat-form-field>
                    <button mat-stroked-button color="primary" type="button" (click)="saveUsername()"
                            [disabled]="usernameForm.invalid || usernameSaving">
                      <mat-icon>save</mat-icon> {{ usernameSaving ? 'Guardando...' : 'Cambiar usuario' }}
                    </button>
                  </form>

                  <mat-divider style="margin:24px 0"></mat-divider>

                  <!-- Password change -->
                  <h4 class="cred-section-title"><mat-icon>key</mat-icon> Contraseña</h4>
                  <form [formGroup]="passwordForm" class="cred-form">
                    <mat-form-field appearance="outline">
                      <mat-label>Contraseña actual</mat-label>
                      <mat-icon matPrefix>lock</mat-icon>
                      <input matInput type="password" formControlName="currentPassword">
                    </mat-form-field>
                    <mat-form-field appearance="outline">
                      <mat-label>Nueva contraseña</mat-label>
                      <mat-icon matPrefix>lock_open</mat-icon>
                      <input matInput type="password" formControlName="newPassword">
                      <mat-hint>Mínimo 8 caracteres, una mayúscula y un número</mat-hint>
                    </mat-form-field>
                    <mat-form-field appearance="outline">
                      <mat-label>Confirmar nueva contraseña</mat-label>
                      <mat-icon matPrefix>lock_open</mat-icon>
                      <input matInput type="password" formControlName="confirmPassword">
                      <mat-error *ngIf="passwordForm.errors?.['mismatch']">Las contraseñas no coinciden</mat-error>
                    </mat-form-field>
                    <button mat-raised-button color="primary" type="button" (click)="savePassword()"
                            [disabled]="passwordForm.invalid || passwordSaving">
                      <mat-icon>key</mat-icon> {{ passwordSaving ? 'Guardando...' : 'Cambiar contraseña' }}
                    </button>
                  </form>

                </mat-card-content>
              </mat-card>

              <!-- Historial de citas -->
              <mat-card class="profile-card" style="margin-top:16px">
                <mat-card-header>
                  <mat-icon mat-card-avatar>history</mat-icon>
                  <mat-card-title>Historial de Citas</mat-card-title>
                  <mat-card-subtitle>{{ tickets.length }} cita(s) registrada(s)</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                  <div class="history-row" *ngFor="let t of tickets">
                    <div class="history-left">
                      <span class="history-num">{{ t.ticketNumber }}</span>
                      <div>
                        <div class="history-clinic">{{ t.clinicName }}</div>
                        <div class="history-date" *ngIf="t.scheduledDate">
                          {{ t.scheduledDate | date:'dd/MM/yyyy' }}<span *ngIf="t.scheduledTime"> · {{ t.scheduledTime }}</span>
                        </div>
                        <div class="history-date" *ngIf="!t.scheduledDate">{{ t.createdAt | date:'dd/MM/yyyy HH:mm' }}</div>
                        <div class="history-doctor" *ngIf="t.doctorName">Dr. {{ t.doctorName }}</div>
                      </div>
                    </div>
                    <span [class]="getStatusClass(t.status, t.scheduledDate)" class="status-chip">{{ statusLabel(t.status, t.scheduledDate) }}</span>
                  </div>
                  <div class="empty-state" *ngIf="tickets.length === 0">
                    <mat-icon>event_busy</mat-icon><p>Sin historial de citas</p>
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
    /* ── PAGE HEADER ── */
    .page-header {
      display:flex; justify-content:space-between; align-items:center;
      margin-bottom:28px; padding-bottom:20px; border-bottom:1px solid #D0D9E3;
    }
    .page-header h1 {
      font-size:1.65rem; font-weight:700; margin:0; letter-spacing:-0.3px;
      background:linear-gradient(135deg,#243C2C,#59789F);
      -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
    }
    .subtitle { color:#6b8c84; font-size:0.88rem; margin:3px 0 0; font-weight:500; }
    .tab-content { padding:24px 0; }
    .tab-icon { font-size:18px; margin-right:6px; vertical-align:middle; }
    .loading-state { display:flex; flex-direction:column; align-items:center; padding:56px; gap:16px; color:#9e9e9e; }

    /* ── BOOKING ── */
    .booking-card { max-width:720px; }
    .selector-row { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:20px; align-items:center; }
    .lab-auto-info {
      display:flex; align-items:center; gap:8px; border-radius:10px;
      padding:12px 16px; color:#243C2C; font-size:0.9rem;
      background:linear-gradient(135deg,#EBF0DC,#F5F2DC);
      border:1px solid #C5CDD8;
    }
    .lab-auto-info mat-icon { color:#7A9445; }

    /* ── CALENDAR ── */
    .calendar-nav {
      display:flex; align-items:center; justify-content:space-between;
      margin-bottom:14px; background:#F5F2DC; border-radius:12px; padding:8px 16px;
      border:1px solid #C5CDD8;
    }
    .month-label { font-size:1rem; font-weight:700; color:#243C2C; letter-spacing:-0.2px; }
    .nav-btn {
      background:none; border:none; cursor:pointer;
      font-size:1.8rem; line-height:1; color:#59789F; padding:2px 10px;
      border-radius:8px; transition:background 0.15s;
    }
    .nav-btn:hover { background:#D8E4C8; }

    .calendar-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:4px; margin-bottom:20px; }
    .cal-weekday { text-align:center; font-size:0.7rem; font-weight:700; color:#8aada7; padding:8px 0; text-transform:uppercase; letter-spacing:0.5px; }
    .cal-day {
      text-align:center; padding:10px 4px; border-radius:10px;
      font-size:0.9rem; cursor:pointer; transition:all 0.15s; user-select:none;
    }
    .cal-day.empty { cursor:default; }
    .cal-day.past { color:#ccc; cursor:not-allowed; }
    .cal-day:not(.past):not(.empty):hover { background:#D8E4C8; color:#243C2C; }
    .cal-day.today { border:2px solid #7A9445; font-weight:700; color:#59789F; }
    .cal-day.selected { background:linear-gradient(135deg,#243C2C,#59789F) !important; color:white; font-weight:700; box-shadow:0 4px 12px rgba(36,60,44,0.3); }

    /* ── SLOTS ── */
    .slots-label { display:flex; align-items:center; gap:8px; font-weight:600; color:#243C2C; margin-bottom:14px; font-size:0.9rem; }
    .slots-label mat-icon { color:#59789F; }
    .slots-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; margin-bottom:8px; }
    .slot-btn {
      padding:12px 4px; border-radius:10px; border:2px solid #C5CDD8;
      background:white; cursor:pointer; font-size:0.88rem; font-weight:600;
      color:#59789F; transition:all 0.15s;
      box-shadow:0 1px 3px rgba(0,0,0,0.04);
    }
    .slot-btn:hover { background:#EDE9C0; border-color:#7A9445; transform:translateY(-1px); }
    .slot-btn.selected { background:linear-gradient(135deg,#243C2C,#59789F); color:white; border-color:#243C2C; box-shadow:0 4px 12px rgba(36,60,44,0.3); }
    .no-slots { grid-column:1/-1; display:flex; align-items:center; gap:8px; color:#9e9e9e; font-size:0.9rem; padding:16px; background:#fafafa; border-radius:10px; border:1px dashed #e0e0e0; }

    /* ── PAYMENT LAYOUT ── */
    .payment-layout { display:flex; gap:20px; align-items:flex-start; flex-wrap:wrap; }
    .payment-card { flex:1; min-width:300px; max-width:700px; }
    .upload-card { flex:0 0 320px; min-width:280px; }

    /* ── UPLOAD ZONE ── */
    .upload-zone {
      border:2px dashed #A9B6C4; border-radius:12px; padding:32px 16px;
      text-align:center; cursor:pointer; transition:all 0.2s;
      background:#F5F2DC; margin-bottom:16px;
    }
    .upload-zone:hover:not(.upload-zone-full) { border-color:#243C2C; background:#EDE9C0; }
    .upload-zone-full { cursor:default; opacity:0.6; }
    .upload-zone-icon { font-size:36px; width:36px; height:36px; color:#59789F; margin-bottom:10px; }
    .upload-zone-text { font-size:0.88rem; font-weight:600; color:#2d4a47; margin:0 0 4px; }
    .upload-zone-hint { font-size:0.75rem; color:#9e9e9e; }
    .doc-list { display:flex; flex-direction:column; gap:8px; margin-bottom:8px; }
    .doc-item {
      display:flex; align-items:center; gap:8px; padding:8px 12px;
      background:#F5F2DC; border-radius:10px; border:1px solid #C5CDD8;
    }
    .doc-icon { color:#c62828; font-size:22px; width:22px; height:22px; flex-shrink:0; }
    .doc-meta { flex:1; min-width:0; }
    .doc-name { font-size:0.82rem; font-weight:500; color:#212121; display:block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .doc-size { font-size:0.72rem; color:#9e9e9e; }
    .upload-errors { margin-top:8px; display:flex; flex-direction:column; gap:4px; }
    .upload-error-item { display:flex; align-items:flex-start; gap:6px; font-size:0.8rem; color:#c62828; }
    .upload-error-item mat-icon { font-size:16px; width:16px; height:16px; flex-shrink:0; margin-top:1px; }

    /* ── PAYMENT SUMMARY ── */
    .appt-summary { background:#F5F2DC; border:1px solid #C5CDD8; border-radius:12px; padding:16px 20px; margin-bottom:20px; }
    .summary-row { display:flex; align-items:center; gap:10px; padding:8px 0; font-size:0.95rem; }
    .summary-row mat-icon { color:#59789F; flex-shrink:0; }
    .total-row { border-top:1px solid #C5CDD8; margin-top:4px; padding-top:12px; font-size:1rem; font-weight:600; }
    .card-form h4 { display:flex; align-items:center; gap:8px; font-size:0.95rem; font-weight:600; color:#444; margin-bottom:14px; }
    .full-width { width:100%; }
    .card-row-2 { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
    .error-msg { display:flex; align-items:center; gap:8px; color:#c62828; font-size:0.88rem; margin:8px 0; background:#fff5f5; border-radius:8px; padding:8px 12px; border:1px solid #fdd; }
    .field-error-msg { display:flex; align-items:center; gap:6px; color:#c62828; font-size:0.82rem; margin:-6px 0 8px 2px; }
    .hint-text { color:#757575; font-size:0.82rem; margin-top:4px; }

    /* ── CONFIRMED ── */
    .confirmed-card { text-align:center; padding:40px 32px; }
    .confirmed-icon { font-size:72px; width:72px; height:72px; color:#243C2C; margin-bottom:16px; filter:drop-shadow(0 4px 12px rgba(36,60,44,0.3)); }
    .confirmed-card h2 { font-size:1.7rem; color:#243C2C; font-weight:700; margin-bottom:8px; }
    .confirmed-summary { max-width:440px; margin:20px auto 0; text-align:left; }
    .info-box { display:flex; align-items:flex-start; gap:10px; background:#e3f2fd; border-radius:10px; padding:14px 16px; margin-top:14px; font-size:0.85rem; color:#59789F; border:1px solid #bbdefb; }
    .info-box mat-icon { flex-shrink:0; margin-top:2px; }

    /* ── TICKET CARDS ── */
    .ticket-card {
      display:flex; align-items:center; justify-content:space-between;
      padding:16px 20px; background:white; border-radius:14px; margin-bottom:12px;
      box-shadow:0 2px 8px rgba(36,60,44,0.07), 0 1px 3px rgba(0,0,0,0.04);
      border:1px solid #D0D9E3; border-left:4px solid #7A9445;
      transition:box-shadow 0.2s, transform 0.2s;
    }
    .ticket-card:hover { box-shadow:0 4px 16px rgba(36,60,44,0.12); transform:translateY(-1px); }
    .ticket-left { display:flex; align-items:center; gap:20px; }
    .ticket-num { font-size:2rem; font-weight:800; color:#59789F; min-width:100px; letter-spacing:-1px; }
    .ticket-clinic { font-weight:600; color:#243C2C; }
    .ticket-type { font-size:0.82rem; color:#6b8c84; margin-top:2px; }
    .ticket-date { font-size:0.78rem; color:#9e9e9e; margin-top:3px; display:flex; align-items:center; gap:2px; }
    .ticket-doctor { font-size:0.82rem; color:#59789F; font-weight:500; margin-top:2px; }
    .status-chip { padding:4px 14px; border-radius:12px; font-size:0.78rem; font-weight:600; white-space:nowrap; }
    .status-waiting { background:#e3f2fd; color:#59789F; }
    .status-being-called { background:#fff3e0; color:#e65100; }
    .status-in-consultation { background:#EBF0DC; color:#243C2C; }
    .status-completed { background:#f5f5f5; color:#616161; }
    .status-absent { background:#ffebee; color:#c62828; }

    /* ── RESCHEDULE ── */
    .reschedule-panel { margin-bottom:20px; border-left:4px solid #e65100; border-radius:14px; }

    /* ── RECETAS ── */
    .rx-card { margin-bottom:16px; border-radius:14px !important; }
    .rx-items { display:flex; flex-direction:column; gap:10px; margin-top:8px; }
    .rx-item { display:flex; align-items:flex-start; gap:10px; padding:10px 12px; background:#F5F2DC; border-radius:10px; border:1px solid #C5CDD8; }
    .rx-item mat-icon { color:#59789F; flex-shrink:0; }
    .rx-qty { color:#6b8c84; font-size:0.85rem; }
    .rx-dosage { font-size:0.8rem; color:#555; margin-top:2px; }
    .dispatched-badge { margin-left:auto; background:#EBF0DC; color:#243C2C; padding:2px 10px; border-radius:10px; font-size:0.75rem; font-weight:600; }
    .rx-status { margin-top:12px; }

    /* ── LAB ── */
    .lab-card {
      padding:18px 20px; background:white; border-radius:14px; margin-bottom:12px;
      box-shadow:0 2px 8px rgba(36,60,44,0.07); border:1px solid #D0D9E3;
    }
    .ref-pending-card { border-left:4px solid #59789F; background:#F5F2DC; }
    .lab-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; }
    .lab-code { background:#243C2C; color:#59789F; padding:2px 8px; border-radius:6px; font-size:0.72rem; margin-left:8px; font-weight:600; }
    .lab-details { display:flex; flex-wrap:wrap; gap:12px; font-size:0.85rem; color:#555; }
    .lab-details div { display:flex; align-items:center; gap:4px; }
    .lab-details mat-icon { font-size:15px; width:15px; height:15px; color:#59789F; }
    .section-label { font-size:0.72rem; font-weight:700; color:#9e9e9e; text-transform:uppercase; letter-spacing:0.5px; margin:16px 0 10px; display:flex; align-items:center; gap:4px; }

    /* ── EMPTY STATE ── */
    .empty-state { text-align:center; padding:56px 24px; color:#9e9e9e; }
    .empty-state mat-icon { font-size:56px; width:56px; height:56px; color:#7A9445; opacity:0.35; margin-bottom:12px; display:block; margin:0 auto 12px; }
    .hint { font-size:0.85rem; margin-top:4px; color:#b0bec5; }

    /* ── DIAGNÓSTICOS ── */
    .diag-card {
      background:white; border-radius:14px; padding:20px 24px; margin-bottom:14px;
      box-shadow:0 2px 8px rgba(36,60,44,0.07); border:1px solid #D0D9E3;
      border-left:4px solid #59789F;
    }
    .diag-card-emergency { border-left-color:#c62828; }
    .diag-header { display:flex; align-items:center; gap:12px; margin-bottom:14px; }
    .diag-header mat-icon { font-size:28px; width:28px; height:28px; }
    .diag-meta { display:flex; flex-direction:column; }
    .diag-date { font-weight:700; font-size:0.92rem; color:#243C2C; }
    .diag-doctor { font-size:0.82rem; color:#59789F; margin-top:2px; }
    .diag-notes { font-size:0.92rem; color:#2d4a47; line-height:1.7; background:#F5F2DC; border-radius:10px; padding:12px 16px; margin-bottom:12px; white-space:pre-wrap; border:1px solid #C5CDD8; }
    .diag-meds { border-top:1px solid #D0D9E3; padding-top:12px; }
    .diag-meds-label { display:flex; align-items:center; gap:6px; font-size:0.78rem; font-weight:700; color:#6b8c84; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.4px; }
    .diag-meds-label mat-icon { font-size:15px; width:15px; height:15px; }
    .med-chip { display:inline-block; background:#EBF0DC; color:#243C2C; padding:4px 12px; border-radius:10px; font-size:0.8rem; margin:2px 4px 2px 0; font-weight:500; }

    /* ── PERFIL ── */
    .profile-card { max-width:720px; border-radius:16px !important; }
    .profile-avatar {
      width:56px; height:56px; border-radius:50%;
      background:linear-gradient(135deg,#243C2C,#59789F);
      color:white; display:flex; align-items:center; justify-content:center;
      font-size:1.4rem; font-weight:700; margin-right:14px; flex-shrink:0;
      box-shadow:0 4px 12px rgba(36,60,44,0.3);
    }
    .profile-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(280px,1fr)); gap:0; margin-top:8px; }
    .profile-field { display:flex; flex-direction:column; padding:12px 10px; border-bottom:1px solid #f0f4f3; }
    .pf-label { display:flex; align-items:center; gap:6px; font-size:0.7rem; font-weight:700; color:#8aada7; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:4px; }
    .pf-label mat-icon { font-size:13px; width:13px; height:13px; }
    .pf-value { font-size:0.93rem; color:#243C2C; padding-left:20px; }
    .discount-badge { background:#EBF0DC; color:#243C2C; padding:2px 10px; border-radius:10px; font-size:0.73rem; margin-left:8px; font-weight:600; }
    .history-row { display:flex; align-items:center; justify-content:space-between; padding:11px 4px; border-bottom:1px solid #f0f4f3; gap:12px; }
    .history-left { display:flex; align-items:center; gap:12px; }
    .history-num { font-size:1.05rem; font-weight:800; color:#59789F; min-width:70px; letter-spacing:-0.5px; }
    .history-clinic { font-weight:600; font-size:0.9rem; color:#243C2C; }
    .history-date { font-size:0.78rem; color:#9e9e9e; margin-top:2px; }
    .history-doctor { font-size:0.8rem; color:#59789F; margin-top:1px; }
    .profile-edit-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:12px; margin-top:8px; }
    .cred-section-title { display:flex; align-items:center; gap:8px; font-size:0.95rem; font-weight:700; color:#243C2C; margin-bottom:12px; }
    .cred-section-title mat-icon { font-size:20px; width:20px; height:20px; color:#59789F; }
    .cred-form { display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:12px; align-items:start; }
    .cred-form button { align-self:center; margin-top:4px; }

    /* ── CITAS HISTORY ── */
    .appt-hist-card {
      display:flex; align-items:flex-start; justify-content:space-between;
      padding:16px 20px; background:white; border-radius:14px; margin-bottom:12px;
      box-shadow:0 2px 8px rgba(36,60,44,0.07); border:1px solid #D0D9E3;
      border-left:4px solid #59789F; gap:12px;
      transition:box-shadow 0.2s;
    }
    .appt-hist-card:hover { box-shadow:0 4px 16px rgba(36,60,44,0.12); }
    .appt-hist-left { display:flex; align-items:flex-start; gap:16px; flex:1; min-width:0; }
    .appt-hist-icon { background: transparent; border-radius:50%; width:44px; height:44px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
    .appt-hist-icon mat-icon { color:#59789F; }
    .appt-hist-info { flex:1; min-width:0; }
    .appt-hist-date { font-weight:700; font-size:0.95rem; color:#243C2C; }
    .appt-hist-time { color:#59789F; margin-left:6px; font-weight:600; }
    .appt-hist-presencial { margin-left:6px; background:#fff3e0; color:#e65100; padding:1px 8px; border-radius:8px; font-size:0.78rem; font-weight:600; }
    .appt-hist-clinic { font-size:0.88rem; color:#4a6560; margin-top:3px; }
    .appt-hist-meta { font-size:0.8rem; color:#9e9e9e; margin-top:2px; }
    .appt-hist-voucher { display:flex; align-items:center; gap:4px; font-size:0.75rem; color:#9e9e9e; margin-top:4px; font-family:monospace; }
    .appt-hist-voucher mat-icon { font-size:14px; width:14px; height:14px; }
    .appt-hist-right { display:flex; flex-direction:column; align-items:flex-end; gap:8px; flex-shrink:0; }
    .appt-hist-amount { font-size:0.88rem; color:#59789F; font-weight:700; }
    .status-appt-pending { background:#fff8e1; color:#f57f17; }
    .status-appt-confirmed { background:#EBF0DC; color:#243C2C; }
    .status-appt-cancelled { background:#ffebee; color:#c62828; }
    .status-appt-expired { background:#f5f5f5; color:#9e9e9e; }

    /* ── RESERVATION TIMER ── */
    .reservation-timer {
      display:flex; align-items:center; gap:10px; border-radius:10px;
      padding:10px 16px; font-size:0.88rem; margin-top:14px; transition:all 0.3s;
      background:#EBF0DC; border:1px solid #C5CDD8; color:#243C2C;
    }
    .reservation-timer mat-icon { color:#7A9445; flex-shrink:0; }
    .reservation-timer.timer-low { background:#fff3e0; border-color:#ffe0b2; color:#e65100; animation:pulse-timer 1s infinite; }
    .reservation-timer.timer-low mat-icon { color:#e65100; }
    @keyframes pulse-timer { 0%,100% { opacity:1; } 50% { opacity:0.7; } }
  `]
})
export class MisCitasComponent implements OnInit, OnDestroy {
  onlyDigits(e: KeyboardEvent): boolean { return /[0-9]/.test(e.key); }

  // Patient data
  tickets: Ticket[] = [];
  appointments: any[] = [];
  prescriptions: Prescription[] = [];
  diagnoses: any[] = [];
  labOrders: LabOrder[] = [];
  labReferences: LabOrder[] = [];
  selectedTabIndex = 0;
  labSelectedRefId: number | null = null;
  emergencyReports: any[] = [];
  pharmacySales: any[] = [];
  payments: any[] = [];
  patientProfile: Patient | null = null;
  loadingTickets = true;
  loadingAppointments = true;
  loadingPrescriptions = true;
  loadingLab = true;
  loadingProfile = true;
  userName = '';
  patientId: number | null = null;

  get initials(): string {
    const parts = this.userName.trim().split(' ');
    return parts.length >= 2
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : this.userName.slice(0, 2).toUpperCase();
  }

  // Booking
  bookingStep: BookingStep = 'calendar';
  clinics: Clinic[] = [];
  bookingClinics: Clinic[] = [];
  labClinics: Clinic[] = [];
  labExams: LabExam[] = [];
  selectedDate: Date | null = null;
  selectedSlot: string | null = null;
  selectedClinicId: number | null = null;
  selectedLabExamId: number | null = null;
  selectedType = 'CONSULTA';
  consultationFee = '150.00';
  paying = false;
  paymentError = '';
  uploadedDocs: File[] = [];
  uploadErrors: string[] = [];
  readonly allSlots = ALL_SLOTS;

  get grossFeeNum(): number { return parseFloat(this.consultationFee) || 0; }
  get discountPct(): number { return (this.patientProfile as any)?.discountPercentage ?? 0; }
  get discountAmountNum(): number { return Math.round(this.grossFeeNum * this.discountPct) / 100; }
  get netFeeNum(): number { return this.grossFeeNum - this.discountAmountNum; }

  // Slots
  availableSlots: string[] = [];
  loadingSlots = false;

  // Calendar
  calYear = 0;
  calMonth = 0;
  calendarDays: (Date | null)[] = [];
  readonly weekDays = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];

  // Card
  card = { name: '', number: '', expiry: '', cvv: '' };

  // Slot reservation
  reservationId: number | null = null;
  reservationTimeLeft = 0;
  private reservationTimer: any = null;
  private slotPollTimer: any = null;

  get reservationMinutes(): number { return Math.floor(this.reservationTimeLeft / 60); }
  get reservationSeconds(): string { return (this.reservationTimeLeft % 60).toString().padStart(2, '0'); }
  get reservationLow(): boolean { return this.reservationTimeLeft > 0 && this.reservationTimeLeft <= 120; }

  // Reschedule
  rescheduleTicket: any | null = null;
  rscdDate: Date | null = null;
  rscdSlot: string | null = null;
  rscdSlots: string[] = [];
  rscdLoadingSlots = false;
  rscdYear = 0;
  rscdMonth = 0;
  rscdCalDays: (Date | null)[] = [];
  rescheduling = false;
  rscdError = '';
  rscdReservationId: number | null = null;
  rscdReservationTimeLeft = 0;
  private rscdReservationTimer: any = null;
  private rscdSlotPollTimer: any = null;

  get rscdMonthLabel(): string { return `${MONTH_NAMES[this.rscdMonth]} ${this.rscdYear}`; }
  get rscdReservationMinutes(): number { return Math.floor(this.rscdReservationTimeLeft / 60); }
  get rscdReservationSeconds(): string { return (this.rscdReservationTimeLeft % 60).toString().padStart(2, '0'); }
  get rscdReservationLow(): boolean { return this.rscdReservationTimeLeft > 0 && this.rscdReservationTimeLeft <= 120; }

  // Profile edit
  profileEditMode = false;
  profileSaving = false;
  profileForm!: FormGroup;
  today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Guatemala' }).format(new Date());
  todayStr = this.today;
  insurances: any[] = [];

  // Credentials
  usernameForm!: FormGroup;
  usernameSaving = false;
  passwordForm!: FormGroup;
  passwordSaving = false;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private ticketService: TicketService,
    private appointmentService: AppointmentService,
    private clinicService: ClinicService,
    private prescriptionService: PrescriptionService,
    private labService: LabService,
    private labExamService: LabExamService,
    private patientService: PatientService,
    private insuranceService: InsuranceService,
    private paymentService: PaymentService,
    private emergencyService: EmergencyService,
    private pharmacySaleService: PharmacySaleService,
    private notification: NotificationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const user = this.authService.currentUser();
    this.userName = user ? `${user.firstName} ${user.lastName}` : 'Paciente';
    this.card.name = this.userName;
    this.patientId = this.authService.getPatientId();

    const now = new Date();
    this.calYear = now.getFullYear();
    this.calMonth = now.getMonth();
    this.buildCalendar();

    this.usernameForm = this.fb.group({
      newUsername: ['', Validators.required],
      currentPasswordForUser: ['', Validators.required]
    });
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: (g: any) => {
      const np = g.get('newPassword')?.value;
      const cp = g.get('confirmPassword')?.value;
      return np && cp && np !== cp ? { mismatch: true } : null;
    } });

    this.insuranceService.getAll().subscribe(res => { if (res.success) this.insurances = res.data; });
    this.labExamService.getAll().subscribe(res => { if (res.success) this.labExams = res.data; });

    this.clinicService.getAll().subscribe(res => {
      if (res.success) {
        this.clinics = res.data;
        this.labClinics = res.data.filter((c: Clinic) =>
          c.type === 'LABORATORY' ||
          LAB_CLINIC_KEYWORDS.some(k => c.name.toLowerCase().includes(k))
        );
        this.bookingClinics = res.data.filter((c: Clinic) =>
          c.type === 'GENERAL_MEDICINE' || c.type === 'EXTERNAL_CONSULTATION'
        );
        if (this.bookingClinics.length === 0) {
          this.bookingClinics = res.data.filter((c: Clinic) =>
            !LAB_CLINIC_KEYWORDS.some(k => c.name.toLowerCase().includes(k))
          );
        }
      }
    });

    if (this.patientId) this.loadData(this.patientId);
    else {
      this.loadingTickets = false;
      this.loadingAppointments = false;
      this.loadingPrescriptions = false;
      this.loadingLab = false;
      this.loadingProfile = false;
    }
  }

  // --- Calendar ---
  get monthLabel(): string {
    return `${MONTH_NAMES[this.calMonth]} ${this.calYear}`;
  }

  buildCalendar(): void {
    const firstDay = new Date(this.calYear, this.calMonth, 1).getDay();
    const daysInMonth = new Date(this.calYear, this.calMonth + 1, 0).getDate();
    const days: (Date | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(this.calYear, this.calMonth, i));
    this.calendarDays = days;
  }

  prevMonth(): void {
    if (this.calMonth === 0) { this.calMonth = 11; this.calYear--; }
    else { this.calMonth--; }
    this.buildCalendar();
  }

  nextMonth(): void {
    if (this.calMonth === 11) { this.calMonth = 0; this.calYear++; }
    else { this.calMonth++; }
    this.buildCalendar();
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

  isPastDay(d: Date): boolean {
    const today = this.getCATodayStr();
    const dayStr = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    return dayStr < today;
  }

  getDayClass(day: Date): string {
    let cls = 'cal-day';
    if (this.isPastDay(day)) { cls += ' past'; return cls; }
    const today = new Date(); today.setHours(0, 0, 0, 0);
    if (day.getTime() === today.getTime()) cls += ' today';
    if (this.selectedDate && day.getTime() === this.selectedDate.getTime()) cls += ' selected';
    return cls;
  }

  // --- Reschedule ---
  openReschedule(ticket: any): void {
    this.rescheduleTicket = ticket;
    this.rscdError = '';
    this.rscdDate = null;
    this.rscdSlot = null;
    this.rscdSlots = [];
    const now = new Date();
    this.rscdYear = now.getFullYear();
    this.rscdMonth = now.getMonth();
    this.rscdBuildCalendar();
  }

  closeReschedule(): void {
    if (this.rscdReservationId) {
      this.appointmentService.cancelReservation(this.rscdReservationId).subscribe({ error: () => {} });
    }
    this.rscdClearReservation();
    this.rscdStopSlotPoll();
    this.rescheduleTicket = null;
    this.rscdDate = null;
    this.rscdSlot = null;
  }

  rscdClearReservation(): void {
    if (this.rscdReservationTimer) { clearInterval(this.rscdReservationTimer); this.rscdReservationTimer = null; }
    this.rscdReservationTimeLeft = 0;
    this.rscdReservationId = null;
  }

  rscdStopSlotPoll(): void {
    if (this.rscdSlotPollTimer) { clearInterval(this.rscdSlotPollTimer); this.rscdSlotPollTimer = null; }
  }

  rscdStartSlotPoll(): void {
    this.rscdStopSlotPoll();
    this.rscdSlotPollTimer = setInterval(() => {
      if (this.rscdDate && this.rescheduleTicket?.clinicId) {
        const dateStr = `${this.rscdDate.getFullYear()}-${String(this.rscdDate.getMonth()+1).padStart(2,'0')}-${String(this.rscdDate.getDate()).padStart(2,'0')}`;
        this.appointmentService.getAvailableSlots(dateStr, this.rescheduleTicket.clinicId).subscribe({
          next: res => {
            if (res.success) {
              this.rscdSlots = this.filterRscdSlots(res.data, this.rscdDate!);
              if (this.rscdSlot && !this.rscdSlots.includes(this.rscdSlot)) {
                if (this.rscdReservationId) {
                  this.rscdSlots = [this.rscdSlot, ...this.rscdSlots];
                } else {
                  this.rscdSlot = null;
                }
              }
            }
          },
          error: () => {}
        });
      }
    }, 5000);
  }

  selectRscdSlot(slot: string): void {
    if (this.rscdSlot === slot) return;
    if (this.rscdReservationId) {
      this.appointmentService.cancelReservation(this.rscdReservationId).subscribe({ error: () => {} });
      this.rscdClearReservation();
    }
    this.rscdSlot = slot;
    if (!this.rscdDate || !this.rescheduleTicket?.clinicId || !this.patientId) return;
    const dateStr = `${this.rscdDate.getFullYear()}-${String(this.rscdDate.getMonth()+1).padStart(2,'0')}-${String(this.rscdDate.getDate()).padStart(2,'0')}`;
    this.appointmentService.reserve({
      patientId: this.patientId,
      clinicId: this.rescheduleTicket.clinicId,
      date: dateStr,
      time: slot
    }).subscribe({
      next: res => {
        if (res.success) {
          this.rscdReservationId = res.data.id;
          const secondsLeft = Math.max(0, Math.floor((new Date(res.data.expiresAt).getTime() - Date.now()) / 1000));
          this.rscdReservationTimeLeft = secondsLeft;
          this.rscdReservationTimer = setInterval(() => {
            this.rscdReservationTimeLeft--;
            if (this.rscdReservationTimeLeft <= 0) {
              this.rscdClearReservation();
              this.rscdSlot = null;
              this.notification.error('La reserva expiró. Selecciona nuevamente.');
              if (this.rscdDate && this.rescheduleTicket?.clinicId) this.selectRscdDate(this.rscdDate);
            }
          }, 1000);
        }
      },
      error: err => {
        this.notification.error(err?.error?.message || 'No se pudo reservar el horario');
        this.rscdSlot = null;
        if (this.rscdDate) this.selectRscdDate(this.rscdDate);
      }
    });
  }

  rscdBuildCalendar(): void {
    const firstDay = new Date(this.rscdYear, this.rscdMonth, 1).getDay();
    const daysInMonth = new Date(this.rscdYear, this.rscdMonth + 1, 0).getDate();
    const days: (Date | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(this.rscdYear, this.rscdMonth, i));
    this.rscdCalDays = days;
  }

  rscdPrevMonth(): void {
    if (this.rscdMonth === 0) { this.rscdMonth = 11; this.rscdYear--; }
    else { this.rscdMonth--; }
    this.rscdBuildCalendar();
  }

  rscdNextMonth(): void {
    if (this.rscdMonth === 11) { this.rscdMonth = 0; this.rscdYear++; }
    else { this.rscdMonth++; }
    this.rscdBuildCalendar();
  }

  getRscdDayClass(day: Date): string {
    let cls = 'cal-day';
    if (this.isPastDay(day)) { cls += ' past'; return cls; }
    const today = new Date(); today.setHours(0, 0, 0, 0);
    if (day.getTime() === today.getTime()) cls += ' today';
    if (this.rscdDate && day.getTime() === this.rscdDate.getTime()) cls += ' selected';
    return cls;
  }

  selectRscdDate(day: Date): void {
    if (this.rscdReservationId) {
      this.appointmentService.cancelReservation(this.rscdReservationId).subscribe({ error: () => {} });
      this.rscdClearReservation();
    }
    this.rscdDate = day;
    this.rscdSlot = null;
    this.rscdSlots = [];
    if (!this.rescheduleTicket?.clinicId) return;
    this.rscdLoadingSlots = true;
    const dateStr = `${day.getFullYear()}-${String(day.getMonth()+1).padStart(2,'0')}-${String(day.getDate()).padStart(2,'0')}`;
    this.appointmentService.getAvailableSlots(dateStr, this.rescheduleTicket.clinicId).subscribe({
      next: res => { this.rscdSlots = res.success ? this.filterRscdSlots(res.data, day) : []; this.rscdLoadingSlots = false; },
      error: () => { this.rscdSlots = []; this.rscdLoadingSlots = false; }
    });
    this.rscdStartSlotPoll();
  }

  confirmReschedule(): void {
    if (!this.rescheduleTicket || !this.rscdDate || !this.rscdSlot) return;
    this.rescheduling = true;
    this.rscdError = '';
    const dateStr = `${this.rscdDate.getFullYear()}-${String(this.rscdDate.getMonth()+1).padStart(2,'0')}-${String(this.rscdDate.getDate()).padStart(2,'0')}`;
    this.http.put<any>(`${environment.apiUrl}/tickets/${this.rescheduleTicket.id}/reschedule`,
      { newDate: dateStr, newTime: this.rscdSlot }).subscribe({
      next: res => {
        this.rescheduling = false;
        if (res.success) {
          this.notification.success('Cita reagendada correctamente');
          this.closeReschedule();
          if (this.patientId) this.loadData(this.patientId);
        } else {
          this.rscdError = res.message || 'Error al reagendar';
        }
      },
      error: err => {
        this.rescheduling = false;
        this.rscdError = err?.error?.message || 'Error al reagendar';
      }
    });
  }

  selectDate(day: Date): void {
    if (this.reservationId) {
      this.appointmentService.cancelReservation(this.reservationId).subscribe({ error: () => {} });
      this.clearReservationTimer();
    }
    this.selectedDate = day;
    this.selectedSlot = null;
    this.loadSlots();
    this.startSlotPolling();
  }

  onClinicChange(clinicId: number): void {
    this.selectedClinicId = clinicId;
    this.selectedSlot = null;
    if (this.selectedDate) {
      this.loadSlots();
      this.startSlotPolling();
    }
  }

  private filterSlotsForToday(slots: string[]): string[] {
    if (!this.selectedDate) return slots;
    const selectedStr = `${this.selectedDate.getFullYear()}-${String(this.selectedDate.getMonth()+1).padStart(2,'0')}-${String(this.selectedDate.getDate()).padStart(2,'0')}`;
    if (selectedStr !== this.getCATodayStr()) return slots;
    const cutoff = this.getCAMinutesNow() + 30; // hide slots within 30min of now
    return slots.filter(slot => {
      const [h, m] = slot.split(':').map(Number);
      return h * 60 + m > cutoff;
    });
  }

  private filterRscdSlots(slots: string[], forDate: Date): string[] {
    const selStr = `${forDate.getFullYear()}-${String(forDate.getMonth()+1).padStart(2,'0')}-${String(forDate.getDate()).padStart(2,'0')}`;
    if (selStr !== this.getCATodayStr()) return slots;
    const cutoff = this.getCAMinutesNow() + 30;
    return slots.filter(slot => {
      const [h, m] = slot.split(':').map(Number);
      return h * 60 + m > cutoff;
    });
  }

  loadSlots(silent = false): void {
    if (!this.selectedDate || !this.selectedClinicId) {
      this.availableSlots = [];
      return;
    }
    if (!silent) this.loadingSlots = true;
    const dateStr = `${this.selectedDate.getFullYear()}-${String(this.selectedDate.getMonth()+1).padStart(2,'0')}-${String(this.selectedDate.getDate()).padStart(2,'0')}`;
    this.appointmentService.getAvailableSlots(dateStr, this.selectedClinicId).subscribe({
      next: res => {
        if (res.success) {
          this.availableSlots = this.filterSlotsForToday(res.data);
          if (this.selectedSlot && !this.availableSlots.includes(this.selectedSlot)) {
            if (this.reservationId) {
              // Slot is reserved by this user — backend excludes it from available list; add it back
              this.availableSlots = [this.selectedSlot, ...this.availableSlots];
            } else {
              this.selectedSlot = null;
              this.notification.error('El horario seleccionado ya no está disponible.');
            }
          }
        }
        this.loadingSlots = false;
      },
      error: () => {
        this.loadingSlots = false;
      }
    });
  }

  selectSlot(slot: string): void {
    if (this.selectedSlot === slot) return;
    if (this.reservationId) {
      this.appointmentService.cancelReservation(this.reservationId).subscribe({ error: () => {} });
      this.clearReservationTimer();
    }
    this.selectedSlot = slot;
    this.reserveSlot(slot);
  }

  reserveSlot(slot: string): void {
    if (!this.selectedDate || !this.selectedClinicId || !this.patientId) return;
    const d = this.selectedDate;
    const dateStr = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    this.appointmentService.reserve({
      patientId: this.patientId,
      clinicId: this.selectedClinicId,
      date: dateStr,
      time: slot
    }).subscribe({
      next: res => {
        if (res.success) {
          this.reservationId = res.data.id;
          const expiresAt = new Date(res.data.expiresAt);
          const secondsLeft = Math.max(0, Math.floor((expiresAt.getTime() - Date.now()) / 1000));
          this.startReservationTimer(secondsLeft);
        }
      },
      error: err => {
        this.notification.error(err.error?.message || 'No se pudo reservar el horario');
        this.selectedSlot = null;
        this.loadSlots();
      }
    });
  }

  startReservationTimer(seconds: number): void {
    if (this.reservationTimer) {
      clearInterval(this.reservationTimer);
      this.reservationTimer = null;
    }
    this.reservationTimeLeft = seconds;
    this.reservationTimer = setInterval(() => {
      this.reservationTimeLeft--;
      if (this.reservationTimeLeft <= 0) {
        this.clearReservationTimer();
        this.onReservationExpired();
      }
    }, 1000);
  }

  clearReservationTimer(): void {
    if (this.reservationTimer) {
      clearInterval(this.reservationTimer);
      this.reservationTimer = null;
    }
    this.reservationTimeLeft = 0;
    this.reservationId = null;
  }

  startSlotPolling(): void {
    this.stopSlotPolling();
    this.slotPollTimer = setInterval(() => {
      if (this.bookingStep === 'calendar' && this.selectedDate && this.selectedClinicId) {
        this.loadSlots(true); // silent — no spinner
      } else {
        this.stopSlotPolling();
      }
    }, 5000);
  }

  stopSlotPolling(): void {
    if (this.slotPollTimer) {
      clearInterval(this.slotPollTimer);
      this.slotPollTimer = null;
    }
  }

  onReservationExpired(): void {
    this.notification.error('La reserva del horario expiró. Selecciona nuevamente.');
    this.selectedSlot = null;
    this.bookingStep = 'calendar';
    if (this.selectedDate) {
      this.loadSlots();
      this.startSlotPolling();
    }
  }

  ngOnDestroy(): void {
    if (this.reservationId) {
      this.appointmentService.cancelReservation(this.reservationId).subscribe({ error: () => {} });
    }
    this.clearReservationTimer();
    this.stopSlotPolling();
    if (this.rscdReservationId) {
      this.appointmentService.cancelReservation(this.rscdReservationId).subscribe({ error: () => {} });
    }
    this.rscdClearReservation();
    this.rscdStopSlotPoll();
  }

  formatDate(d: Date | null): string {
    if (!d) return '';
    const days = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
    return `${days[d.getDay()]} ${d.getDate()} de ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
  }

  goToPayment(): void {
    this.paymentError = '';
    this.bookingStep = 'payment';
  }

  // --- Payment ---
  formatCardNumber(): void {
    const digits = this.card.number.replace(/\D/g, '').slice(0, 16);
    this.card.number = digits.replace(/(.{4})/g, '$1 ').trim();
  }

  formatExpiry(): void {
    let v = this.card.expiry.replace(/\D/g, '').slice(0, 4);
    if (v.length >= 3) v = v.slice(0,2) + '/' + v.slice(2);
    this.card.expiry = v;
  }

  formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  async addDocs(files: FileList | null): Promise<void> {
    if (!files) return;
    this.uploadErrors = [];
    const MAX_SIZE = 20 * 1024 * 1024;
    const MAX_FILES = 5;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (this.uploadedDocs.length >= MAX_FILES) {
        this.uploadErrors.push(`Límite de ${MAX_FILES} archivos alcanzado. "${file.name}" no agregado.`);
        continue;
      }
      if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
        this.uploadErrors.push(`"${file.name}": solo se aceptan archivos PDF.`);
        continue;
      }
      if (file.size === 0) {
        this.uploadErrors.push(`"${file.name}": el archivo está vacío.`);
        continue;
      }
      if (file.size > MAX_SIZE) {
        this.uploadErrors.push(`"${file.name}": excede el límite de 20 MB (${this.formatFileSize(file.size)}).`);
        continue;
      }
      if (this.uploadedDocs.some(d => d.name === file.name && d.size === file.size)) {
        this.uploadErrors.push(`"${file.name}": archivo ya agregado.`);
        continue;
      }

      const validationError = await this.validatePdfContent(file);
      if (validationError) {
        this.uploadErrors.push(`"${file.name}": ${validationError}`);
        continue;
      }

      this.uploadedDocs.push(file);
    }
  }

  private validatePdfContent(file: File): Promise<string | null> {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const buf = e.target?.result as ArrayBuffer;
        const bytes = new Uint8Array(buf);
        // Check %PDF- header (first 5 bytes)
        const header = String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3], bytes[4]);
        if (!header.startsWith('%PDF')) {
          resolve('no es un archivo PDF válido.');
          return;
        }
        // Check for /Encrypt keyword → encrypted/password-protected
        const text = new TextDecoder('latin1').decode(buf);
        if (/\/Encrypt\s/.test(text)) {
          resolve('el archivo está cifrado o protegido con contraseña.');
          return;
        }
        resolve(null);
      };
      reader.onerror = () => resolve('no se pudo leer el archivo.');
      reader.readAsArrayBuffer(file);
    });
  }

  onDocDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      this.addDocs(event.dataTransfer.files);
    }
  }

  removeDoc(index: number): void {
    this.uploadedDocs.splice(index, 1);
    this.uploadErrors = [];
  }

  get cardNumberError(): boolean {
    const digits = this.card.number.replace(/\s/g, '');
    return digits.length > 0 && digits.length !== 16;
  }

  get expiryError(): boolean {
    if (!this.card.expiry || this.card.expiry.length < 5) return false;
    const m = this.card.expiry.match(/^(\d{2})\/(\d{2})$/);
    if (!m) return true;
    const mm = parseInt(m[1]), yy = parseInt(m[2]);
    if (mm < 1 || mm > 12) return true;
    const now = new Date();
    const curYY = now.getFullYear() % 100, curMM = now.getMonth() + 1;
    return yy < curYY || (yy === curYY && mm < curMM);
  }

  cardValid(): boolean {
    const digits = this.card.number.replace(/\s/g, '');
    if (this.card.name.trim().length < 2) return false;
    if (digits.length !== 16) return false;
    if (!/^\d{3,4}$/.test(this.card.cvv)) return false;
    const expiryMatch = this.card.expiry.match(/^(\d{2})\/(\d{2})$/);
    if (!expiryMatch) return false;
    const mm = parseInt(expiryMatch[1]);
    const yy = parseInt(expiryMatch[2]);
    if (mm < 1 || mm > 12) return false;
    const now = new Date();
    const curYY = now.getFullYear() % 100;
    const curMM = now.getMonth() + 1;
    if (yy < curYY) return false;
    if (yy === curYY && mm < curMM) return false;
    return true;
  }

  pay(): void {
    if (!this.cardValid()) return;
    this.paying = true;
    this.paymentError = '';

    const d = this.selectedDate!;
    const dateStr = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;

    this.appointmentService.book({
      patientId: this.patientId,
      clinicId: this.selectedClinicId,
      type: this.selectedType,
      scheduledDate: dateStr,
      scheduledTime: this.selectedSlot,
      notes: 'Cita agendada en línea',
      labExamId: this.selectedLabExamId ?? undefined
    }).subscribe({
      next: res => {
        if (res.success) {
          const apptId = res.data?.id;
          if (apptId) {
            this.appointmentService.confirmPayment(apptId, {
              paymentMethod: 'ONLINE_CARD',
              amount: this.consultationFee
            }).subscribe({
              next: () => {
                if (this.uploadedDocs.length > 0) {
                  this.appointmentService.uploadDocuments(apptId, this.uploadedDocs).subscribe({ error: () => {} });
                }
              },
              error: () => {}
            });
          }
          if (this.labSelectedRefId) {
            this.labService.markUsed(this.labSelectedRefId).subscribe({ error: () => {} });
            this.labSelectedRefId = null;
          }
          this.paying = false;
          this.clearReservationTimer();
          this.stopSlotPolling();
          this.bookingStep = 'confirmed';
          this.notification.success('¡Cita confirmada!');
          if (this.patientId) {
            this.appointmentService.getByPatient(this.patientId).subscribe({
              next: res => { if (res.success) this.appointments = res.data; }
            });
            this.loadData(this.patientId);
          }
        } else {
          this.paying = false;
          this.paymentError = res.message || 'Error al procesar la cita. Intente nuevamente.';
        }
      },
      error: err => {
        this.paying = false;
        const msg = err.error?.message || 'El horario ya no está disponible. Selecciona otro horario.';
        this.paymentError = msg;
        this.notification.error(msg);
        // Volver al calendario — el horario ya no está disponible
        this.bookingStep = 'calendar';
        this.selectedSlot = null;
        if (this.reservationId) {
          this.appointmentService.cancelReservation(this.reservationId).subscribe({ error: () => {} });
        }
        this.clearReservationTimer();
        this.loadSlots();
        this.startSlotPolling();
      }
    });
  }

  resetBooking(): void {
    if (this.reservationId) {
      this.appointmentService.cancelReservation(this.reservationId).subscribe({ error: () => {} });
    }
    this.clearReservationTimer();
    this.bookingStep = 'calendar';
    this.selectedDate = null;
    this.selectedSlot = null;
    this.selectedClinicId = null;
    this.selectedType = 'CONSULTA';
    this.consultationFee = '150.00';
    this.selectedLabExamId = null;
    this.labSelectedRefId = null;
    this.availableSlots = [];
    this.card = { name: this.userName, number: '', expiry: '', cvv: '' };
    this.paymentError = '';
    this.uploadedDocs = [];
    this.uploadErrors = [];
    const now = new Date();
    this.calYear = now.getFullYear();
    this.calMonth = now.getMonth();
    this.buildCalendar();
  }

  bookFromReference(ref: LabOrder): void {
    this.resetBooking();
    this.selectedType = 'LABORATORIO';
    this.selectedLabExamId = ref.labExamId ?? null;
    this.consultationFee = ref.labExamPrice != null ? ref.labExamPrice.toFixed(2) : '0.00';
    this.labSelectedRefId = ref.id;
    if (this.labClinics.length > 0) {
      this.selectedClinicId = this.labClinics[0].id;
    }
    this.selectedTabIndex = 0;
  }

  getClinicName(id: number | null): string {
    return this.clinics.find(c => c.id === id)?.name ?? '—';
  }

  typeLabel(t: string): string {
    const m: Record<string, string> = { CONSULTA: 'Consulta Médica', LABORATORIO: 'Laboratorio', CONTROL: 'Control' };
    return m[t] ?? t;
  }

  onTypeChange(type: string): void {
    this.selectedType = type;
    this.consultationFee = TYPE_FEES[type] ?? '150.00';
    this.selectedClinicId = null;
    this.selectedSlot = null;
    this.selectedLabExamId = null;
    if (type === 'LABORATORIO' && this.labClinics.length > 0) {
      this.selectedClinicId = this.labClinics[0].id;
      if (this.selectedDate) this.loadSlots();
    }
  }

  onLabExamChange(examId: number): void {
    const exam = this.labExams.find(e => e.id === examId);
    if (exam) this.consultationFee = exam.price.toFixed(2);
  }

  apptTypeLabel(t: string): string {
    const m: Record<string, string> = { CONSULTA: 'Consulta Médica', LABORATORIO: 'Laboratorio', CONTROL: 'Control / Seguimiento' };
    return m[t] ?? t;
  }

  apptStatusLabel(s: string): string {
    const m: Record<string, string> = { PENDING_PAYMENT: 'Pago Pendiente', CONFIRMED: 'Confirmada', CANCELLED: 'Cancelada' };
    return m[s] ?? s;
  }

  confirmedAppointments(): any[] {
    return this.appointments.filter(a => a.status === 'CONFIRMED');
  }

  getApptStatusClass(s: string): string {
    const m: Record<string, string> = { PENDING_PAYMENT: 'status-appt-pending', CONFIRMED: 'status-appt-confirmed', CANCELLED: 'status-appt-cancelled' };
    return m[s] ?? '';
  }

  // --- Patient data ---
  loadData(patientId: number): void {
    this.appointmentService.getByPatient(patientId).subscribe({
      next: res => {
        if (res.success) this.appointments = res.data;
        this.loadingAppointments = false;
      },
      error: () => { this.loadingAppointments = false; }
    });

    this.ticketService.getByPatient(patientId).subscribe({
      next: res => {
        if (res.success) {
          this.tickets = res.data
            .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          this.mergeDiagnoses();
        }
        this.loadingTickets = false;
      },
      error: () => { this.loadingTickets = false; }
    });

    this.prescriptionService.getByPatient(patientId).subscribe({
      next: res => {
        if (res.success) {
          this.prescriptions = res.data;
          this.mergeDiagnoses();
        }
        this.loadingPrescriptions = false;
      },
      error: () => { this.loadingPrescriptions = false; }
    });

    this.emergencyService.getMedicalReportsByPatient(patientId).subscribe({
      next: res => {
        if (res.success) {
          this.emergencyReports = res.data;
          this.mergeDiagnoses();
        }
      },
      error: () => {}
    });

    this.pharmacySaleService.getByPatient(patientId).subscribe({
      next: res => { if (res.success) this.pharmacySales = res.data; },
      error: () => {}
    });

    this.paymentService.getByPatient(patientId).subscribe({
      next: res => { if (res.success) this.payments = res.data; },
      error: () => {}
    });

    this.labService.getByPatient(patientId).subscribe({
      next: res => {
        if (res.success) {
          this.labOrders = res.data;
          this.labReferences = res.data.filter((o: LabOrder) => o.status === 'PENDING' && !o.isUsed);
        }
        this.loadingLab = false;
      },
      error: () => { this.loadingLab = false; }
    });

    this.patientService.getById(patientId).subscribe({
      next: res => { if (res.success) this.patientProfile = res.data; this.loadingProfile = false; },
      error: () => { this.loadingProfile = false; }
    });
  }

  openLabPdf(orderId: number): void {
    this.http.get(`${environment.apiUrl}/lab-orders/${orderId}/result-file`, { responseType: 'blob' }).subscribe({
      next: blob => {
        const url = URL.createObjectURL(blob);
        const win = window.open(url, '_blank');
        win?.addEventListener('load', () => URL.revokeObjectURL(url), { once: true });
      },
      error: () => this.notification.error('No se pudo abrir el PDF')
    });
  }

  mergeDiagnoses(): void {
    const fromRx = this.prescriptions
      .map((rx: any) => ({ ...rx, _source: 'rx' }));

    const rxTicketIds = new Set(this.prescriptions.map((rx: any) => rx.ticketId).filter(Boolean));
    const fromTickets = this.tickets
      .filter((t: any) => t.status === 'COMPLETED' && !rxTicketIds.has(t.id))
      .map((t: any) => ({
        _source: 'ticket',
        createdAt: t.createdAt,
        doctorName: t.doctorName,
        notes: null,
        items: [],
        ticketNumber: t.ticketNumber,
        clinicName: t.clinicName
      }));

    const fromEm = this.emergencyReports.map((r: any) => ({
      _source: 'emergency',
      createdAt: r.createdAt,
      doctorName: r.doctorName,
      notes: [r.diagnosis, r.treatment, r.medications].filter(Boolean).join('\n\n'),
      _diagnosis: r.diagnosis,
      _treatment: r.treatment,
      _medications: r.medications,
      items: []
    }));
    this.diagnoses = [...fromRx, ...fromTickets, ...fromEm]
      .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  // --- Profile edit ---
  startProfileEdit(): void {
    if (!this.patientProfile) return;
    const p = this.patientProfile;
    this.profileForm = this.fb.group({
      firstName:        [p.firstName,         Validators.required],
      lastName:         [p.lastName,          Validators.required],
      dpi:              [p.dpi,               Validators.required],
      birthDate:        [p.birthDate          || '', [birthDateValidator]],
      phone:            [p.phone             || ''],
      email:            [p.email             || ''],
      address:          [p.address           || ''],
      emergencyContact: [p.emergencyContact  || ''],
      emergencyPhone:   [p.emergencyPhone    || ''],
      insuranceId:      [p.insuranceId       ?? null],
      insuranceNumber:  [p.insuranceNumber   || '']
    });
    this.profileEditMode = true;
  }

  cancelProfileEdit(): void {
    this.profileEditMode = false;
  }

  saveProfile(): void {
    if (!this.patientId || this.profileForm.invalid) return;
    this.profileSaving = true;
    const updateData = { ...this.profileForm.value, dpi: this.patientProfile!.dpi };
    this.patientService.update(this.patientId, updateData).subscribe({
      next: res => {
        if (res.success) {
          this.patientProfile = res.data;
          this.notification.success('Perfil actualizado exitosamente');
          this.profileEditMode = false;
        } else {
          this.notification.error(res.message || 'Error al actualizar');
        }
        this.profileSaving = false;
      },
      error: err => {
        this.notification.error(err.error?.message || 'Error al actualizar perfil');
        this.profileSaving = false;
      }
    });
  }

  saveUsername(): void {
    if (this.usernameForm.invalid) return;
    this.usernameSaving = true;
    const { newUsername, currentPasswordForUser } = this.usernameForm.value;
    this.authService.changeUsername(newUsername, currentPasswordForUser).subscribe({
      next: res => {
        if (res.success) {
          this.notification.success('Usuario actualizado. Por favor inicia sesión nuevamente.');
          this.usernameForm.reset();
          setTimeout(() => this.authService.logout(), 2000);
        } else {
          this.notification.error(res.message || 'Error al cambiar usuario');
        }
        this.usernameSaving = false;
      },
      error: err => {
        this.notification.error(err.error?.message || 'Error al cambiar usuario');
        this.usernameSaving = false;
      }
    });
  }

  savePassword(): void {
    if (this.passwordForm.invalid) return;
    const { currentPassword, newPassword } = this.passwordForm.value;
    this.passwordSaving = true;
    this.authService.changePassword(currentPassword, newPassword).subscribe({
      next: res => {
        if (res.success) {
          this.notification.success('Contraseña actualizada exitosamente');
          this.passwordForm.reset();
        } else {
          this.notification.error(res.message || 'Error al cambiar contraseña');
        }
        this.passwordSaving = false;
      },
      error: err => {
        this.notification.error(err.error?.message || 'Error al cambiar contraseña');
        this.passwordSaving = false;
      }
    });
  }

  logout(): void { this.authService.logout(); }
  sampleLabel(s: string): string { return (SAMPLE_TYPE_LABELS as any)[s] ?? s; }

  getStatusClass(s: string, scheduledDate?: string): string {
    if (s === 'WAITING' && scheduledDate && scheduledDate < this.todayStr) return 'status-appt-expired';
    const m: Record<string, string> = {
      WAITING: 'status-waiting', BEING_CALLED: 'status-being-called',
      IN_CONSULTATION: 'status-in-consultation', COMPLETED: 'status-completed',
      ABSENT: 'status-absent', CANCELLED_NO_PAYMENT: 'status-absent',
      ABSENT_PENDING_RESCHEDULE: 'status-being-called', RESCHEDULED: 'status-completed',
      CALLED_TO_VITAL_SIGNS: 'status-being-called', READY_FOR_DOCTOR: 'status-in-consultation',
      PENDING_PAYMENT: 'status-waiting'
    };
    return m[s] ?? '';
  }

  statusLabel(s: string, scheduledDate?: string): string {
    if (s === 'WAITING' && scheduledDate && scheduledDate < this.todayStr) return 'Expirada';
    const m: Record<string, string> = {
      WAITING: 'En Espera', BEING_CALLED: 'Siendo Llamado',
      IN_CONSULTATION: 'En Consulta', COMPLETED: 'Atendido',
      ABSENT: 'Expirado', CANCELLED_NO_PAYMENT: 'Cancelado',
      ABSENT_PENDING_RESCHEDULE: 'Pendiente Reagendar', RESCHEDULED: 'Reagendado',
      CALLED_TO_VITAL_SIGNS: 'Signos Vitales', READY_FOR_DOCTOR: 'Esperando Doctor',
      PENDING_PAYMENT: 'Pendiente Pago'
    };
    return m[s] ?? s;
  }

  getRxStatusClass(s: string): string {
    const m: Record<string, string> = {
      PENDING: 'status-waiting', DISPATCHED: 'status-completed',
      PARTIALLY_DISPATCHED: 'status-being-called', NOT_DISPATCHED: 'status-absent'
    };
    return m[s] ?? '';
  }

  rxStatusLabel(s: string): string {
    const m: Record<string, string> = {
      PENDING: 'Pendiente', DISPATCHED: 'Entregada', PARTIALLY_DISPATCHED: 'Parcial', NOT_DISPATCHED: 'No despachada'
    };
    return m[s] ?? s;
  }

  getLabStatusClass(s: string): string {
    const m: Record<string, string> = {
      PENDING: 'status-waiting', SAMPLE_COLLECTED: 'status-being-called',
      SCHEDULED: 'status-in-consultation', COMPLETED: 'status-completed', EXPIRED: 'status-absent'
    };
    return m[s] ?? '';
  }

  labStatusLabel(s: string): string {
    const m: Record<string, string> = {
      PENDING: 'Pendiente', SAMPLE_COLLECTED: 'Muestra tomada',
      SCHEDULED: 'Programada', COMPLETED: 'Resultados listos', EXPIRED: 'Expirada'
    };
    return m[s] ?? s;
  }
}
