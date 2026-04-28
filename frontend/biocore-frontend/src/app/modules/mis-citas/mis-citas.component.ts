import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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
import { InsuranceService } from '../../shared/services/payment.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Ticket, Clinic } from '../../core/models/ticket.model';
import { Prescription, LabOrder, LabExam, SAMPLE_TYPE_LABELS } from '../../core/models/lab.model';
import { Patient } from '../../core/models/patient.model';

type BookingStep = 'calendar' | 'payment' | 'confirmed';

const MONTH_NAMES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
                     'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const ALL_SLOTS = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'];
const BOOKING_CLINIC_KEYWORDS = ['consulta','medicina','general','externa'];
const LAB_CLINIC_KEYWORDS = ['laboratorio','lab'];
const TYPE_FEES: Record<string, string> = { CONSULTA: '150.00', CONTROL: '100.00' };

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

      <mat-tab-group animationDuration="200ms">

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
                  <mat-card-subtitle>Citas disponibles todos los días de 8:00 a 18:00</mat-card-subtitle>
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
                      <div class="summary-row total-row">
                        <mat-icon>receipt</mat-icon>
                        <span>Total: <strong>Q {{ consultationFee }}</strong></span>
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
                        <mat-hint>Ingrese los números de su tarjeta</mat-hint>
                      </mat-form-field>
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
                            [disabled]="!cardValid() || paying"
                            (click)="pay()">
                      <mat-spinner *ngIf="paying" diameter="20" style="display:inline-block;margin-right:8px"></mat-spinner>
                      <mat-icon *ngIf="!paying">lock</mat-icon>
                      {{ paying ? 'Procesando pago...' : 'Pagar Q ' + consultationFee }}
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
              <span [class]="getStatusClass(t.status)" class="status-chip">{{ statusLabel(t.status) }}</span>
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

            <div class="diag-card" *ngFor="let rx of diagnoses">
              <div class="diag-header">
                <mat-icon>stethoscope</mat-icon>
                <div class="diag-meta">
                  <span class="diag-date">{{ rx.createdAt | date:'dd/MM/yyyy' }}</span>
                  <span class="diag-doctor" *ngIf="rx.doctorName">Dr. {{ rx.doctorName }}</span>
                </div>
              </div>
              <div class="diag-notes">{{ rx.notes }}</div>
              <div class="diag-meds" *ngIf="rx.items && rx.items.length > 0">
                <div class="diag-meds-label"><mat-icon>medication</mat-icon> Medicamentos recetados</div>
                <span class="med-chip" *ngFor="let item of rx.items">
                  {{ item.medicineName }} ×{{ item.quantity }}
                  <small *ngIf="item.dosage"> — {{ item.dosage }}</small>
                </span>
              </div>
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
            <div class="lab-card" *ngFor="let o of labOrders">
              <div class="lab-header">
                <div>
                  <strong>{{ o.labExamName || sampleLabel(o.sampleType) }}</strong>
                  <span class="lab-code" *ngIf="o.labExamCode">{{ o.labExamCode }}</span>
                </div>
                <span [class]="getLabStatusClass(o.status)" class="status-chip">{{ labStatusLabel(o.status) }}</span>
              </div>
              <div class="lab-details">
                <div><mat-icon>calendar_today</mat-icon> {{ o.orderDate }}</div>
                <div><mat-icon>event</mat-icon> Vence: {{ o.expirationDate }}</div>
                <div *ngIf="o.resultAvailableAt"><mat-icon>notifications</mat-icon> {{ o.resultAvailableAt | date:'dd/MM/yyyy HH:mm' }}</div>
              </div>
            </div>
            <div class="empty-state" *ngIf="!loadingLab && labOrders.length === 0">
              <mat-icon>biotech</mat-icon><p>Sin órdenes de laboratorio</p>
            </div>
          </div>
        </mat-tab>

        <!-- TAB 6: Mi Perfil -->
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
                      <input matInput formControlName="dpi">
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
                    <span [class]="getStatusClass(t.status)" class="status-chip">{{ statusLabel(t.status) }}</span>
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
    .page-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; }
    .page-header h1 { font-size:1.6rem; font-weight:600; color:#1D6C61; margin:0; }
    .subtitle { color:#757575; font-size:0.9rem; margin:4px 0 0; }
    .tab-content { padding:24px 0; }
    .tab-icon { font-size:18px; margin-right:6px; vertical-align:middle; }
    .loading-state { display:flex; flex-direction:column; align-items:center; padding:48px; gap:16px; color:#9e9e9e; }

    /* Booking */
    .booking-card { max-width:700px; }
    .selector-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:16px; align-items:center; }
    .lab-auto-info { display:flex; align-items:center; gap:8px; background:#e8f5e9; border-radius:8px; padding:12px 16px; color:#2e7d32; font-size:0.9rem; }
    .lab-auto-info mat-icon { color:#2e7d32; }

    /* Calendar */
    .calendar-nav {
      display:flex; align-items:center; justify-content:space-between;
      margin-bottom:12px; background:#f0faf8; border-radius:10px; padding:6px 12px;
    }
    .month-label { font-size:1rem; font-weight:700; color:#1D6C61; }
    .nav-btn {
      background:none; border:none; cursor:pointer;
      font-size:2rem; line-height:1; color:#1D6C61; padding:0 8px;
      border-radius:6px; transition:background 0.15s;
    }
    .nav-btn:hover { background:#d0f4ef; }

    .calendar-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:4px; margin-bottom:20px; }
    .cal-weekday { text-align:center; font-size:0.72rem; font-weight:700; color:#9e9e9e; padding:6px 0; text-transform:uppercase; }
    .cal-day {
      text-align:center; padding:10px 4px; border-radius:8px;
      font-size:0.9rem; cursor:pointer; transition:background 0.15s; user-select:none;
    }
    .cal-day.empty { cursor:default; }
    .cal-day.past { color:#ccc; cursor:not-allowed; }
    .cal-day:not(.past):not(.empty):hover { background:#d0f4ef; }
    .cal-day.today { border:2px solid #3EB9A8; font-weight:700; }
    .cal-day.selected { background:#1D6C61 !important; color:white; font-weight:700; }

    /* Slots */
    .slots-label { display:flex; align-items:center; gap:8px; font-weight:600; color:#1D6C61; margin-bottom:12px; font-size:0.9rem; }
    .slots-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; margin-bottom:8px; }
    .slot-btn {
      padding:12px 4px; border-radius:8px; border:2px solid #d0e8e5;
      background:white; cursor:pointer; font-size:0.9rem; font-weight:600;
      color:#1D6C61; transition:all 0.15s;
    }
    .slot-btn:hover { background:#d0f4ef; border-color:#3EB9A8; }
    .slot-btn.selected { background:#1D6C61; color:white; border-color:#1D6C61; }
    .no-slots { grid-column:1/-1; display:flex; align-items:center; gap:8px; color:#9e9e9e; font-size:0.9rem; padding:12px; }

    /* Payment layout */
    .payment-layout { display:flex; gap:20px; align-items:flex-start; flex-wrap:wrap; }
    .payment-card { flex:1; min-width:300px; max-width:700px; }
    .upload-card { flex:0 0 320px; min-width:280px; }

    /* Upload card */
    .upload-zone {
      border:2px dashed #b2dfdb; border-radius:10px; padding:28px 16px;
      text-align:center; cursor:pointer; transition:all 0.2s;
      background:#f7fdfc; margin-bottom:16px;
    }
    .upload-zone:hover:not(.upload-zone-full) { border-color:#1D6C61; background:#e8f5f3; }
    .upload-zone-full { cursor:default; opacity:0.6; }
    .upload-zone-icon { font-size:36px; width:36px; height:36px; color:#1D6C61; margin-bottom:8px; }
    .upload-zone-text { font-size:0.88rem; font-weight:600; color:#333; margin:0 0 4px; }
    .upload-zone-hint { font-size:0.75rem; color:#9e9e9e; }
    .doc-list { display:flex; flex-direction:column; gap:8px; margin-bottom:8px; }
    .doc-item {
      display:flex; align-items:center; gap:8px; padding:8px 10px;
      background:#f0faf8; border-radius:8px; border:1px solid #d0eae6;
    }
    .doc-icon { color:#c62828; font-size:22px; width:22px; height:22px; flex-shrink:0; }
    .doc-meta { flex:1; min-width:0; }
    .doc-name { font-size:0.82rem; font-weight:500; color:#212121; display:block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .doc-size { font-size:0.72rem; color:#9e9e9e; }
    .upload-errors { margin-top:8px; display:flex; flex-direction:column; gap:4px; }
    .upload-error-item { display:flex; align-items:flex-start; gap:6px; font-size:0.8rem; color:#c62828; }
    .upload-error-item mat-icon { font-size:16px; width:16px; height:16px; flex-shrink:0; margin-top:1px; }

    /* Payment */
    .appt-summary { background:#f0faf8; border:1px solid #b2dfdb; border-radius:10px; padding:16px; margin-bottom:20px; }
    .summary-row { display:flex; align-items:center; gap:10px; padding:8px 0; font-size:0.95rem; }
    .summary-row mat-icon { color:#1D6C61; flex-shrink:0; }
    .total-row { border-top:1px solid #b2dfdb; margin-top:4px; padding-top:12px; font-size:1rem; }
    .card-form h4 { display:flex; align-items:center; gap:8px; font-size:0.95rem; font-weight:600; color:#555; margin-bottom:12px; }
    .full-width { width:100%; }
    .card-row-2 { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
    .error-msg { display:flex; align-items:center; gap:8px; color:#c62828; font-size:0.88rem; margin:8px 0; }
    .hint-text { color:#757575; font-size:0.82rem; margin-top:4px; }

    /* Confirmed */
    .confirmed-card { text-align:center; padding:32px; }
    .confirmed-icon { font-size:72px; width:72px; height:72px; color:#2e7d32; margin-bottom:12px; }
    .confirmed-card h2 { font-size:1.6rem; color:#2e7d32; margin-bottom:8px; }
    .confirmed-summary { max-width:420px; margin:20px auto 0; text-align:left; }
    .info-box { display:flex; align-items:flex-start; gap:10px; background:#e3f2fd; border-radius:8px; padding:12px; margin-top:12px; font-size:0.85rem; color:#1565c0; }
    .info-box mat-icon { flex-shrink:0; margin-top:2px; }

    /* Tickets */
    .ticket-card { display:flex; align-items:center; justify-content:space-between; padding:16px 20px; background:white; border-radius:10px; margin-bottom:12px; box-shadow:0 2px 8px rgba(29,108,97,0.08); border-left:4px solid #3EB9A8; }
    .ticket-left { display:flex; align-items:center; gap:20px; }
    .ticket-num { font-size:2rem; font-weight:700; color:#1D6C61; min-width:100px; }
    .ticket-clinic { font-weight:600; }
    .ticket-type { font-size:0.82rem; color:#757575; }
    .ticket-date { font-size:0.78rem; color:#9e9e9e; margin-top:2px; }
    .ticket-doctor { font-size:0.82rem; color:#1D6C61; }
    .status-chip { padding:4px 14px; border-radius:12px; font-size:0.8rem; font-weight:500; white-space:nowrap; }
    .status-waiting { background:#e3f2fd; color:#1565c0; }
    .status-being-called { background:#fff3e0; color:#e65100; }
    .status-in-consultation { background:#e8f5e9; color:#2e7d32; }
    .status-completed { background:#f5f5f5; color:#616161; }
    .status-absent { background:#ffebee; color:#c62828; }

    /* Recetas */
    .rx-card { margin-bottom:16px; }
    .rx-items { display:flex; flex-direction:column; gap:10px; margin-top:8px; }
    .rx-item { display:flex; align-items:flex-start; gap:10px; padding:8px; background:#f8f9ff; border-radius:6px; }
    .rx-item mat-icon { color:#1D6C61; flex-shrink:0; }
    .rx-qty { color:#757575; font-size:0.85rem; }
    .rx-dosage { font-size:0.8rem; color:#555; margin-top:2px; }
    .dispatched-badge { margin-left:auto; background:#e8f5e9; color:#2e7d32; padding:2px 8px; border-radius:8px; font-size:0.75rem; }
    .rx-status { margin-top:12px; }

    /* Lab */
    .lab-card { padding:16px; background:white; border-radius:10px; margin-bottom:12px; box-shadow:0 2px 8px rgba(29,108,97,0.08); border:1px solid #d4e8e5; }
    .lab-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; }
    .lab-code { background:#193A31; color:#3EB9A8; padding:2px 8px; border-radius:6px; font-size:0.75rem; margin-left:8px; }
    .lab-details { display:flex; flex-wrap:wrap; gap:12px; font-size:0.85rem; color:#555; }
    .lab-details div { display:flex; align-items:center; gap:4px; }
    .lab-details mat-icon { font-size:16px; width:16px; height:16px; color:#1D6C61; }

    .empty-state { text-align:center; padding:48px; color:#9e9e9e; }
    .empty-state mat-icon { font-size:56px; width:56px; height:56px; color:#3EB9A8; opacity:0.4; margin-bottom:8px; }
    .hint { font-size:0.85rem; margin-top:4px; }

    /* Diagnósticos */
    .diag-card { background:white; border-radius:10px; padding:20px; margin-bottom:14px; box-shadow:0 2px 8px rgba(29,108,97,0.08); border-left:4px solid #1D6C61; }
    .diag-header { display:flex; align-items:center; gap:12px; margin-bottom:12px; }
    .diag-header mat-icon { font-size:28px; width:28px; height:28px; color:#1D6C61; }
    .diag-meta { display:flex; flex-direction:column; }
    .diag-date { font-weight:600; font-size:0.9rem; color:#333; }
    .diag-doctor { font-size:0.82rem; color:#1D6C61; }
    .diag-notes { font-size:0.95rem; color:#333; line-height:1.6; background:#f8fffe; border-radius:8px; padding:12px 16px; margin-bottom:12px; white-space:pre-wrap; }
    .diag-meds { border-top:1px solid #e0f0ee; padding-top:10px; }
    .diag-meds-label { display:flex; align-items:center; gap:6px; font-size:0.8rem; font-weight:600; color:#555; margin-bottom:8px; }
    .diag-meds-label mat-icon { font-size:16px; width:16px; height:16px; }
    .med-chip { display:inline-block; background:#e8f5e9; color:#2e7d32; padding:3px 10px; border-radius:10px; font-size:0.8rem; margin:2px 4px 2px 0; }

    /* Perfil */
    .profile-card { max-width:700px; }
    .profile-avatar { width:56px; height:56px; border-radius:50%; background:#1D6C61; color:white; display:flex; align-items:center; justify-content:center; font-size:1.4rem; font-weight:700; margin-right:12px; flex-shrink:0; }
    .profile-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(280px,1fr)); gap:0; margin-top:8px; }
    .profile-field { display:flex; flex-direction:column; padding:12px 8px; border-bottom:1px solid #f0f0f0; }
    .pf-label { display:flex; align-items:center; gap:6px; font-size:0.75rem; font-weight:600; color:#9e9e9e; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:4px; }
    .pf-label mat-icon { font-size:14px; width:14px; height:14px; }
    .pf-value { font-size:0.95rem; color:#333; padding-left:20px; }
    .discount-badge { background:#e8f5e9; color:#2e7d32; padding:2px 8px; border-radius:8px; font-size:0.75rem; margin-left:8px; }
    .history-row { display:flex; align-items:center; justify-content:space-between; padding:10px 0; border-bottom:1px solid #f5f5f5; gap:12px; }
    .history-left { display:flex; align-items:center; gap:12px; }
    .history-num { font-size:1.1rem; font-weight:700; color:#1D6C61; min-width:70px; }
    .history-clinic { font-weight:500; font-size:0.9rem; }
    .history-date { font-size:0.78rem; color:#9e9e9e; }
    .history-doctor { font-size:0.8rem; color:#1D6C61; }
    .profile-edit-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:12px; margin-top:8px; }
    .cred-section-title { display:flex; align-items:center; gap:8px; font-size:0.95rem; font-weight:600; color:#1D6C61; margin-bottom:12px; }
    .cred-section-title mat-icon { font-size:20px; width:20px; height:20px; }
    .cred-form { display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:12px; align-items:start; }
    .cred-form button { align-self:center; margin-top:4px; }

    /* Mis Citas history */
    .appt-hist-card { display:flex; align-items:flex-start; justify-content:space-between; padding:16px 20px; background:white; border-radius:10px; margin-bottom:12px; box-shadow:0 2px 8px rgba(29,108,97,0.08); border-left:4px solid #1D6C61; gap:12px; }
    .appt-hist-left { display:flex; align-items:flex-start; gap:16px; flex:1; min-width:0; }
    .appt-hist-icon { background:#e8f5f3; border-radius:50%; width:44px; height:44px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
    .appt-hist-icon mat-icon { color:#1D6C61; }
    .appt-hist-info { flex:1; min-width:0; }
    .appt-hist-date { font-weight:700; font-size:0.95rem; color:#333; }
    .appt-hist-time { color:#1D6C61; margin-left:6px; font-weight:600; }
    .appt-hist-presencial { margin-left:6px; background:#fff3e0; color:#e65100; padding:1px 8px; border-radius:8px; font-size:0.78rem; font-weight:600; }
    .appt-hist-clinic { font-size:0.88rem; color:#555; margin-top:2px; }
    .appt-hist-meta { font-size:0.8rem; color:#9e9e9e; margin-top:2px; }
    .appt-hist-voucher { display:flex; align-items:center; gap:4px; font-size:0.75rem; color:#9e9e9e; margin-top:4px; font-family:monospace; }
    .appt-hist-voucher mat-icon { font-size:14px; width:14px; height:14px; }
    .appt-hist-right { display:flex; flex-direction:column; align-items:flex-end; gap:8px; flex-shrink:0; }
    .appt-hist-amount { font-size:0.85rem; color:#555; font-weight:600; }
    .status-appt-pending { background:#fff8e1; color:#f57f17; }
    .status-appt-confirmed { background:#e8f5e9; color:#2e7d32; }
    .status-appt-cancelled { background:#ffebee; color:#c62828; }

    /* Reservation timer */
    .reservation-timer { display:flex; align-items:center; gap:8px; background:#e8f5e9; border-radius:8px; padding:10px 14px; color:#2e7d32; font-size:0.88rem; margin-top:12px; transition:background 0.3s; }
    .reservation-timer mat-icon { color:#2e7d32; flex-shrink:0; }
    .reservation-timer.timer-low { background:#fff3e0; color:#e65100; animation:pulse-timer 1s infinite; }
    .reservation-timer.timer-low mat-icon { color:#e65100; }
    @keyframes pulse-timer { 0%,100% { opacity:1; } 50% { opacity:0.7; } }
  `]
})
export class MisCitasComponent implements OnInit, OnDestroy {
  // Patient data
  tickets: Ticket[] = [];
  appointments: any[] = [];
  prescriptions: Prescription[] = [];
  diagnoses: Prescription[] = [];
  labOrders: LabOrder[] = [];
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

  // Profile edit
  profileEditMode = false;
  profileSaving = false;
  profileForm!: FormGroup;
  insurances: any[] = [];

  // Credentials
  usernameForm!: FormGroup;
  usernameSaving = false;
  passwordForm!: FormGroup;
  passwordSaving = false;

  constructor(
    private authService: AuthService,
    private ticketService: TicketService,
    private appointmentService: AppointmentService,
    private clinicService: ClinicService,
    private prescriptionService: PrescriptionService,
    private labService: LabService,
    private labExamService: LabExamService,
    private patientService: PatientService,
    private insuranceService: InsuranceService,
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
    const digits = this.card.number.replace(/\D/g, '').slice(0, 19);
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
      reader.readAsArrayBuffer(file.slice(0, 4096));
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

  cardValid(): boolean {
    const digits = this.card.number.replace(/\s/g, '');
    if (this.card.name.trim().length < 2) return false;
    if (digits.length < 13 || digits.length > 19) return false;
    if (!/^\d{3,4}$/.test(this.card.cvv)) return false;
    // Validate expiry MM/YY
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

    this.ticketService.getAll().subscribe({
      next: res => {
        if (res.success) {
          this.tickets = res.data.filter(t => t.patientId === patientId)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
        this.loadingTickets = false;
      },
      error: () => { this.loadingTickets = false; }
    });

    this.prescriptionService.getByPatient(patientId).subscribe({
      next: res => {
        if (res.success) {
          this.prescriptions = res.data;
          // Diagnoses = prescriptions that have a doctor's notes
          this.diagnoses = res.data
            .filter((rx: Prescription) => rx.notes && rx.notes.trim().length > 0)
            .sort((a: Prescription, b: Prescription) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
        this.loadingPrescriptions = false;
      },
      error: () => { this.loadingPrescriptions = false; }
    });

    this.labService.getByPatient(patientId).subscribe({
      next: res => { if (res.success) this.labOrders = res.data; this.loadingLab = false; },
      error: () => { this.loadingLab = false; }
    });

    this.patientService.getById(patientId).subscribe({
      next: res => { if (res.success) this.patientProfile = res.data; this.loadingProfile = false; },
      error: () => { this.loadingProfile = false; }
    });
  }

  // --- Profile edit ---
  startProfileEdit(): void {
    if (!this.patientProfile) return;
    const p = this.patientProfile;
    this.profileForm = this.fb.group({
      firstName:        [p.firstName,         Validators.required],
      lastName:         [p.lastName,          Validators.required],
      dpi:              [p.dpi,               Validators.required],
      birthDate:        [p.birthDate          || ''],
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
      IN_CONSULTATION: 'En Consulta', COMPLETED: 'Atendido',
      ABSENT: 'Ausente', CANCELLED_NO_PAYMENT: 'Cancelado'
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
