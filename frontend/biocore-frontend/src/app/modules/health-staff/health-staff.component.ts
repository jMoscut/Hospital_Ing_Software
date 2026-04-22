import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { PatientService } from '../../shared/services/patient.service';
import { ClinicService, TicketService, VitalSignsService, AppointmentService } from '../../shared/services/ticket.service';
import { InsuranceService } from '../../shared/services/payment.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Clinic, Ticket } from '../../core/models/ticket.model';
import { Patient } from '../../core/models/patient.model';

@Component({
  selector: 'app-health-staff',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule,
    MatCardModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatTabsModule, MatProgressSpinnerModule, MatTableModule,
    MatChipsModule, MatStepperModule
  ],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1><mat-icon style="vertical-align:middle;margin-right:8px">health_and_safety</mat-icon>Personal de Salud</h1>
      </div>

      <mat-tab-group animationDuration="200ms">

        <!-- TAB 1: Recepción de Pacientes -->
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon class="tab-icon">person_add</mat-icon>
            Recepción
          </ng-template>
          <div class="tab-content">
            <mat-card>
              <mat-card-header>
                <mat-card-title>Recepción Walk-in</mat-card-title>
              </mat-card-header>
              <mat-card-content>

                <!-- Voucher generado -->
                <div class="voucher-box" *ngIf="recepVoucher">
                  <div class="voucher-header">
                    <mat-icon>confirmation_number</mat-icon>
                    <div>
                      <h3 style="margin:0">Voucher Generado</h3>
                      <p class="hint-text" style="margin:4px 0 0">Entregue al paciente para que pase a Caja.</p>
                    </div>
                  </div>
                  <div class="voucher-code">{{ recepVoucher.voucherCode }}</div>
                  <div class="voucher-details">
                    <div><strong>Paciente:</strong> {{ recepVoucher.patientName }}</div>
                    <div><strong>Clínica:</strong> {{ recepVoucher.clinicName }}</div>
                    <div><strong>Servicio:</strong> {{ recepVoucher.type }}</div>
                    <div><strong>Monto a pagar:</strong> Q{{ recepVoucher.amount }}</div>
                  </div>
                  <div class="voucher-instruction">
                    <mat-icon>arrow_forward</mat-icon> Presente el código en Caja para completar el pago e ingresar a la cola.
                  </div>
                  <button mat-stroked-button color="primary" style="margin-top:16px" (click)="resetRecepFlow()">
                    <mat-icon>add</mat-icon> Nuevo Paciente
                  </button>
                </div>

                <!-- Stepper walk-in -->
                <mat-stepper [linear]="true" #recepStepper *ngIf="!recepVoucher">

                  <!-- Paso 1: DPI -->
                  <mat-step [stepControl]="recepDpiForm" label="Identificación">
                    <form [formGroup]="recepDpiForm">
                      <h3>Identificar por DPI</h3>
                      <p class="hint-text">Ingrese el DPI del paciente para buscar su registro o crear uno nuevo.</p>
                      <mat-form-field appearance="outline" class="wide">
                        <mat-label>DPI del Paciente (13 dígitos)</mat-label>
                        <mat-icon matPrefix>badge</mat-icon>
                        <input matInput formControlName="dpi" placeholder="0000000000000" maxlength="13">
                        <mat-error>El DPI debe tener exactamente 13 dígitos</mat-error>
                      </mat-form-field>
                      <div class="step-actions">
                        <button mat-raised-button color="primary"
                                (click)="recepSearchByDpi()" [disabled]="recepDpiForm.invalid || recepSearching">
                          <mat-spinner *ngIf="recepSearching" diameter="20"></mat-spinner>
                          <mat-icon *ngIf="!recepSearching">search</mat-icon>
                          {{ recepSearching ? 'Buscando...' : 'Buscar' }}
                        </button>
                      </div>
                      <div class="found-box" *ngIf="recepExistingPatient">
                        <mat-icon>check_circle</mat-icon>
                        <div>
                          <strong>{{ recepExistingPatient.firstName }} {{ recepExistingPatient.lastName }}</strong>
                          <br><small>{{ recepExistingPatient.patientCode }} · {{ recepExistingPatient.phone }}</small>
                        </div>
                        <button mat-raised-button color="accent" matStepperNext>Continuar →</button>
                      </div>
                      <div class="new-patient-notice" *ngIf="recepIsNewPatient">
                        <mat-icon>person_add</mat-icon>
                        <span>DPI no encontrado — complete los datos del nuevo paciente.</span>
                        <button mat-raised-button color="accent" matStepperNext>Continuar →</button>
                      </div>
                    </form>
                  </mat-step>

                  <!-- Paso 2: Datos del paciente -->
                  <mat-step [stepControl]="recepPatientForm" label="Datos del Paciente">
                    <form [formGroup]="recepPatientForm">
                      <h3>{{ recepExistingPatient ? 'Paciente Encontrado' : 'Nuevo Paciente' }}</h3>
                      <div class="form-grid">
                        <mat-form-field appearance="outline">
                          <mat-label>Nombres *</mat-label>
                          <input matInput formControlName="firstName" [readonly]="!!recepExistingPatient">
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>Apellidos *</mat-label>
                          <input matInput formControlName="lastName" [readonly]="!!recepExistingPatient">
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>Fecha de Nacimiento</mat-label>
                          <mat-icon matPrefix>cake</mat-icon>
                          <input matInput type="date" formControlName="birthDate" [readonly]="!!recepExistingPatient">
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>Teléfono</mat-label>
                          <input matInput formControlName="phone" [readonly]="!!recepExistingPatient">
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>Correo Electrónico *</mat-label>
                          <input matInput formControlName="email" [readonly]="!!recepExistingPatient">
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>Dirección</mat-label>
                          <input matInput formControlName="address" [readonly]="!!recepExistingPatient">
                        </mat-form-field>
                        <mat-form-field appearance="outline" *ngIf="!recepExistingPatient">
                          <mat-label>Seguro Médico</mat-label>
                          <mat-select formControlName="insuranceId">
                            <mat-option [value]="null">Sin seguro</mat-option>
                            <mat-option *ngFor="let ins of insurances" [value]="ins.id">{{ ins.name }}</mat-option>
                          </mat-select>
                        </mat-form-field>
                        <mat-form-field appearance="outline" *ngIf="!recepExistingPatient">
                          <mat-label>No. de Póliza / Carné (opcional)</mat-label>
                          <input matInput formControlName="insuranceNumber" placeholder="Ej. SEG-12345">
                        </mat-form-field>
                      </div>
                      <p class="hint-text" *ngIf="!recepExistingPatient">Se generará contraseña temporal y se enviará al correo del paciente.</p>
                      <div class="step-actions">
                        <button mat-button matStepperPrevious>← Anterior</button>
                        <button mat-raised-button color="primary" matStepperNext
                                [disabled]="recepPatientForm.invalid && !recepExistingPatient">
                          Continuar →
                        </button>
                      </div>
                    </form>
                  </mat-step>

                  <!-- Paso 3: Servicio -->
                  <mat-step [stepControl]="recepServiceForm" label="Servicio">
                    <form [formGroup]="recepServiceForm">
                      <h3>Seleccionar Servicio</h3>
                      <div class="form-grid">
                        <mat-form-field appearance="outline">
                          <mat-label>Clínica *</mat-label>
                          <mat-icon matPrefix>local_hospital</mat-icon>
                          <mat-select formControlName="clinicId">
                            <mat-option *ngFor="let c of visitClinics" [value]="c.id">{{ c.name }}</mat-option>
                          </mat-select>
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>Tipo de Servicio *</mat-label>
                          <mat-select formControlName="type">
                            <mat-option value="CONSULTA">Consulta Externa (Q150)</mat-option>
                            <mat-option value="LABORATORIO">Laboratorio (Q200)</mat-option>
                            <mat-option value="CONTROL">Medicina General (Q100)</mat-option>
                          </mat-select>
                        </mat-form-field>
                        <mat-form-field appearance="outline" class="wide">
                          <mat-label>Notas (opcional)</mat-label>
                          <textarea matInput formControlName="notes" rows="2"></textarea>
                        </mat-form-field>
                      </div>
                      <div class="step-actions">
                        <button mat-button matStepperPrevious>← Anterior</button>
                        <button mat-raised-button color="primary"
                                [disabled]="recepServiceForm.invalid || recepSubmitting"
                                (click)="bookWalkIn()">
                          <mat-spinner *ngIf="recepSubmitting" diameter="20"></mat-spinner>
                          <mat-icon *ngIf="!recepSubmitting">receipt</mat-icon>
                          {{ recepSubmitting ? 'Generando...' : 'Generar Voucher de Pago' }}
                        </button>
                      </div>
                    </form>
                  </mat-step>

                </mat-stepper>

                <div class="credentials-box" *ngIf="recepNewCredentials" style="margin-top:16px">
                  <mat-icon>key</mat-icon>
                  <div>
                    <strong>Credenciales enviadas al correo del paciente</strong>
                    <p>El paciente podrá cambiar la contraseña en su primer inicio de sesión.</p>
                    <div class="cred-row"><span>Usuario:</span> <code>{{ recepNewCredentials.username }}</code></div>
                    <div class="cred-row"><span>Contraseña temporal:</span> <code>{{ recepNewCredentials.tempPassword }}</code></div>
                  </div>
                </div>

              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <!-- TAB 2: Signos Vitales (Triage) -->
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon class="tab-icon">monitor_heart</mat-icon>
            Signos Vitales
            <span class="tab-badge" *ngIf="calledTickets.length > 0">{{ calledTickets.length }}</span>
          </ng-template>
          <div class="tab-content">

            <p class="hint-text">Pacientes llamados al área de signos vitales. Haga clic en un paciente para registrar sus signos.</p>

            <div *ngIf="calledTickets.length === 0" class="empty-state">
              <mat-icon>health_and_safety</mat-icon>
              <p>No hay pacientes pendientes de signos vitales</p>
            </div>

            <div *ngFor="let t of calledTickets" class="called-card">
              <div class="called-card-header">
                <div class="ticket-number">{{ t.ticketNumber }}</div>
                <div class="ticket-info">
                  <div class="ticket-patient">{{ t.patientName }}</div>
                  <div class="ticket-meta">{{ t.clinicName }} · {{ t.type }}</div>
                </div>
                <span class="status-chip status-vitals">En Signos Vitales</span>
              </div>

              <!-- Vitals form inline -->
              <ng-container *ngIf="activeVitalsTicketId === t.id; else showVitalsBtn">
                <form [formGroup]="vitalsFormMap[t.id]" class="form-grid vitals-inline-form">
                  <mat-form-field appearance="outline">
                    <mat-label>Presión Arterial</mat-label>
                    <mat-icon matPrefix>favorite</mat-icon>
                    <input matInput formControlName="bloodPressure" placeholder="120/80">
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                    <mat-label>Frec. Cardíaca (bpm)</mat-label>
                    <input matInput type="number" formControlName="heartRate">
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                    <mat-label>Temperatura (°C)</mat-label>
                    <input matInput type="number" formControlName="temperature" step="0.1">
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                    <mat-label>Peso (kg)</mat-label>
                    <input matInput type="number" formControlName="weight" step="0.1">
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                    <mat-label>Talla (cm)</mat-label>
                    <input matInput type="number" formControlName="height">
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                    <mat-label>Saturación O₂ (%)</mat-label>
                    <input matInput type="number" formControlName="oxygenSaturation">
                  </mat-form-field>
                </form>
                <div class="vitals-actions">
                  <button mat-raised-button color="primary" (click)="sendToDoctor(t)"
                          [disabled]="sendingVitals">
                    <mat-icon>send</mat-icon>
                    {{ sendingVitals ? 'Enviando...' : 'Registrar y Enviar a Médico' }}
                  </button>
                  <button mat-button (click)="activeVitalsTicketId = null">Cancelar</button>
                </div>
              </ng-container>
              <ng-template #showVitalsBtn>
                <button mat-stroked-button color="primary" (click)="openVitalsForm(t)" style="margin-top:12px">
                  <mat-icon>edit</mat-icon> Tomar Signos Vitales
                </button>
              </ng-template>
            </div>
          </div>
        </mat-tab>

        <!-- TAB 4: Citas Presenciales -->
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon class="tab-icon">event_available</mat-icon>
            Citas Presenciales
          </ng-template>
          <div class="tab-content">
            <mat-card>
              <mat-card-header>
                <mat-card-title>Agendar Cita Presencial</mat-card-title>
              </mat-card-header>
              <mat-card-content>

                <!-- Voucher Result (Step 4) -->
                <div class="voucher-box" *ngIf="apptVoucher">
                  <div class="voucher-header">
                    <mat-icon>confirmation_number</mat-icon>
                    <div>
                      <h3 style="margin:0">Cita Agendada</h3>
                      <p class="hint-text" style="margin:4px 0 0">Entregue este voucher al paciente para que pase a Caja.</p>
                    </div>
                  </div>
                  <div class="voucher-code">{{ apptVoucher.voucherCode }}</div>
                  <div class="voucher-details">
                    <div><strong>Paciente:</strong> {{ apptVoucher.patientName }}</div>
                    <div><strong>Clínica:</strong> {{ apptVoucher.clinicName }}</div>
                    <div><strong>Tipo:</strong> {{ apptVoucher.type }}</div>
                    <div><strong>Fecha / Hora:</strong> {{ apptVoucher.scheduledDate }} {{ apptVoucher.scheduledTime }}</div>
                    <div><strong>Monto a pagar:</strong> Q{{ apptVoucher.amount }}</div>
                  </div>
                  <div class="voucher-instruction">
                    <mat-icon>arrow_forward</mat-icon> El paciente debe presentar este código en Caja para completar el pago.
                  </div>
                  <button mat-stroked-button color="primary" style="margin-top:16px" (click)="resetApptFlow()">
                    <mat-icon>add</mat-icon> Nueva Cita
                  </button>
                </div>

                <!-- Stepper (Steps 1–3) -->
                <mat-stepper [linear]="true" #apptStepper *ngIf="!apptVoucher">

                  <!-- Step 1: DPI -->
                  <mat-step [stepControl]="apptDpiForm" label="Identificar Paciente">
                    <form [formGroup]="apptDpiForm">
                      <h3>Buscar por DPI</h3>
                      <p class="hint-text">Si el DPI no tiene cuenta activa, se creará un usuario y se enviará la contraseña al correo del paciente.</p>
                      <mat-form-field appearance="outline" class="wide">
                        <mat-label>DPI (13 dígitos)</mat-label>
                        <mat-icon matPrefix>badge</mat-icon>
                        <input matInput formControlName="dpi" placeholder="0000000000000" maxlength="13">
                        <mat-error>Ingrese los 13 dígitos del DPI</mat-error>
                      </mat-form-field>
                      <div class="step-actions">
                        <button mat-raised-button color="primary"
                                (click)="apptSearchByDpi()" [disabled]="apptDpiForm.invalid || apptSearching">
                          <mat-spinner *ngIf="apptSearching" diameter="20"></mat-spinner>
                          <mat-icon *ngIf="!apptSearching">search</mat-icon>
                          {{ apptSearching ? 'Buscando...' : 'Buscar' }}
                        </button>
                      </div>
                      <div class="found-box" *ngIf="apptExistingPatient">
                        <mat-icon>check_circle</mat-icon>
                        <div>
                          <strong>{{ apptExistingPatient.firstName }} {{ apptExistingPatient.lastName }}</strong>
                          <br><small>{{ apptExistingPatient.patientCode }} · {{ apptExistingPatient.phone }}</small>
                        </div>
                        <button mat-raised-button color="accent" matStepperNext>Continuar →</button>
                      </div>
                      <div class="new-patient-notice" *ngIf="apptIsNewPatient">
                        <mat-icon>person_add</mat-icon>
                        <span>DPI no encontrado — complete los datos del nuevo paciente.</span>
                        <button mat-raised-button color="accent" matStepperNext>Continuar →</button>
                      </div>
                    </form>
                  </mat-step>

                  <!-- Step 2: Patient Data -->
                  <mat-step [stepControl]="apptPatientForm" label="Datos del Paciente">
                    <form [formGroup]="apptPatientForm">
                      <h3>{{ apptExistingPatient ? 'Paciente Encontrado' : 'Registrar Nuevo Paciente' }}</h3>
                      <div class="form-grid">
                        <mat-form-field appearance="outline">
                          <mat-label>Nombres *</mat-label>
                          <input matInput formControlName="firstName" [readonly]="!!apptExistingPatient">
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>Apellidos *</mat-label>
                          <input matInput formControlName="lastName" [readonly]="!!apptExistingPatient">
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>Fecha de Nacimiento</mat-label>
                          <input matInput type="date" formControlName="birthDate" [readonly]="!!apptExistingPatient">
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>Teléfono</mat-label>
                          <input matInput formControlName="phone" [readonly]="!!apptExistingPatient">
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>Correo Electrónico *</mat-label>
                          <input matInput formControlName="email" [readonly]="!!apptExistingPatient">
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>Dirección</mat-label>
                          <input matInput formControlName="address" [readonly]="!!apptExistingPatient">
                        </mat-form-field>
                        <mat-form-field appearance="outline" *ngIf="!apptExistingPatient">
                          <mat-label>Seguro Médico</mat-label>
                          <mat-select formControlName="insuranceId">
                            <mat-option [value]="null">Sin seguro</mat-option>
                            <mat-option *ngFor="let ins of insurances" [value]="ins.id">{{ ins.name }}</mat-option>
                          </mat-select>
                        </mat-form-field>
                        <mat-form-field appearance="outline" *ngIf="!apptExistingPatient">
                          <mat-label>No. de Póliza / Carné (opcional)</mat-label>
                          <input matInput formControlName="insuranceNumber" placeholder="Ej. SEG-12345">
                        </mat-form-field>
                      </div>
                      <p class="hint-text" *ngIf="!apptExistingPatient">
                        Se generará una contraseña temporal y se enviará al correo del paciente.
                      </p>
                      <div class="step-actions">
                        <button mat-button matStepperPrevious>← Anterior</button>
                        <button mat-raised-button color="primary" matStepperNext
                                [disabled]="apptPatientForm.invalid && !apptExistingPatient">
                          Continuar →
                        </button>
                      </div>
                    </form>
                  </mat-step>

                  <!-- Step 3: Calendar -->
                  <mat-step [stepControl]="apptCalendarForm" label="Seleccionar Cita">
                    <form [formGroup]="apptCalendarForm">
                      <h3>Seleccionar Fecha y Hora</h3>
                      <div class="form-grid">
                        <mat-form-field appearance="outline">
                          <mat-label>Clínica *</mat-label>
                          <mat-icon matPrefix>local_hospital</mat-icon>
                          <mat-select formControlName="clinicId" (selectionChange)="onApptClinicChange($event.value)">
                            <mat-option *ngFor="let c of visitClinics" [value]="c.id">{{ c.name }}</mat-option>
                          </mat-select>
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>Tipo de Cita *</mat-label>
                          <mat-select formControlName="type">
                            <mat-option value="CONSULTA">Consulta Externa (Q150)</mat-option>
                            <mat-option value="LABORATORIO">Laboratorio (Q200)</mat-option>
                            <mat-option value="CONTROL">Medicina General (Q100)</mat-option>
                          </mat-select>
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>Fecha *</mat-label>
                          <input matInput type="date" formControlName="scheduledDate"
                                 [min]="apptMinDate"
                                 (change)="onApptDateChange()">
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                          <mat-label>Hora *</mat-label>
                          <mat-select formControlName="scheduledTime">
                            <mat-option *ngIf="apptLoadingSlots" disabled>Cargando horarios...</mat-option>
                            <mat-option *ngIf="!apptLoadingSlots && apptAvailableSlots.length === 0" disabled>
                              No hay horarios disponibles
                            </mat-option>
                            <mat-option *ngFor="let s of apptAvailableSlots" [value]="s">{{ s }}</mat-option>
                          </mat-select>
                        </mat-form-field>
                        <mat-form-field appearance="outline" class="wide">
                          <mat-label>Notas (opcional)</mat-label>
                          <textarea matInput formControlName="notes" rows="2"></textarea>
                        </mat-form-field>
                      </div>
                      <div class="step-actions">
                        <button mat-button matStepperPrevious>← Anterior</button>
                        <button mat-raised-button color="primary"
                                [disabled]="apptCalendarForm.invalid || apptSubmitting"
                                (click)="bookAppointment()">
                          <mat-spinner *ngIf="apptSubmitting" diameter="20"></mat-spinner>
                          <mat-icon *ngIf="!apptSubmitting">event_available</mat-icon>
                          {{ apptSubmitting ? 'Agendando...' : 'Agendar y Generar Voucher' }}
                        </button>
                      </div>
                    </form>
                  </mat-step>

                </mat-stepper>

                <!-- Temp credentials shown after new patient created -->
                <div class="credentials-box" *ngIf="apptNewCredentials" style="margin-top:16px">
                  <mat-icon>key</mat-icon>
                  <div>
                    <strong>Credenciales enviadas al correo del paciente</strong>
                    <p>El paciente podrá cambiar la contraseña en su primer inicio de sesión.</p>
                    <div class="cred-row"><span>Usuario:</span> <code>{{ apptNewCredentials.username }}</code></div>
                    <div class="cred-row"><span>Contraseña temporal:</span> <code>{{ apptNewCredentials.tempPassword }}</code></div>
                  </div>
                </div>

              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

      </mat-tab-group>
    </div>
  `,
  styles: [`
    .tab-content { padding: 24px 0; }
    .tab-icon { font-size: 18px; margin-right: 6px; vertical-align: middle; }
    h3 { font-size: 1.1rem; font-weight: 500; color: #1D6C61; margin-bottom: 16px; }
    h4.section-subtitle { font-size: 0.95rem; font-weight: 500; color: #555; margin: 16px 0 8px; border-top: 1px solid #e0e0e0; padding-top: 12px; }
    .hint-text { color: #757575; font-size: 0.85rem; margin-bottom: 16px; }
    .wide { width: 100%; }
    .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; margin-bottom: 8px; }
    .step-actions { display: flex; gap: 12px; margin-top: 16px; }

    .found-box {
      display: flex; align-items: center; gap: 12px;
      background: #e8f5e9; padding: 16px; border-radius: 8px; color: #2e7d32; margin-top: 16px;
    }
    .found-box mat-icon { font-size: 32px; width: 32px; height: 32px; }

    .queue-filters { margin-bottom: 16px; }
    .ticket-row {
      display: flex; align-items: center; gap: 16px; padding: 12px 16px;
      background: white; border-radius: 8px; margin-bottom: 8px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.08);
    }
    .ticket-number { font-size: 1.4rem; font-weight: 700; color: #1D6C61; min-width: 80px; }
    .ticket-info { flex: 1; }
    .ticket-patient { font-weight: 500; }
    .ticket-meta { font-size: 0.8rem; color: #757575; }
    .status-chip { padding: 4px 12px; border-radius: 12px; font-size: 0.8rem; font-weight: 500; }

    .credentials-box {
      display: flex; align-items: flex-start; gap: 16px;
      background: #fff8e1; border: 1px solid #ffe082; border-radius: 8px;
      padding: 16px 20px; margin: 12px 0;
    }
    .credentials-box mat-icon { font-size: 28px; width: 28px; height: 28px; color: #f57f17; flex-shrink: 0; margin-top: 4px; }
    .credentials-box strong { color: #e65100; font-size: 0.95rem; }
    .credentials-box p { color: #555; font-size: 0.82rem; margin: 4px 0 10px; }
    .cred-row { display: flex; align-items: center; gap: 8px; font-size: 0.9rem; margin-bottom: 4px; }
    .cred-row span { color: #757575; min-width: 140px; }
    .cred-row code { background: #fff3e0; padding: 2px 8px; border-radius: 4px; font-size: 1rem; font-weight: 700; letter-spacing: 0.5px; color: #e65100; }

    .empty-state { text-align: center; padding: 48px; color: #9e9e9e; }
    .empty-state mat-icon { font-size: 48px; width: 48px; height: 48px; color: #3EB9A8; opacity: 0.5; margin-bottom: 8px; }
    .reload-btn { text-align: center; margin-top: 24px; }
    .status-waiting { background:#e3f2fd;color:#1565c0; }
    .status-vitals { background:#e0f7fa;color:#00838f; }
    .status-ready { background:#f3e5f5;color:#7b1fa2; }
    .status-being-called { background:#fff3e0;color:#e65100; }
    .status-in-consultation { background:#e8f5e9;color:#2e7d32; }
    .status-completed { background:#f5f5f5;color:#616161; }
    .status-absent { background:#ffebee;color:#c62828; }
    .selector-row { display:flex;align-items:center;gap:12px;flex-wrap:wrap; }
    .doctor-status-grid { display:flex;flex-wrap:wrap;gap:10px;margin-top:8px; }
    .doctor-chip { display:flex;align-items:center;gap:8px;padding:8px 14px;border-radius:20px;font-size:0.85rem; }
    .doctor-available { background:#e8f5e9;color:#2e7d32; }
    .doctor-busy { background:#ffebee;color:#c62828; }
    .doctor-name { font-weight:600; }
    .doctor-status-label { font-size:0.75rem; }
    .queue-filter-row { display:flex;align-items:center;gap:12px; }
    .tab-badge { background:#e53935;color:white;border-radius:10px;padding:1px 7px;font-size:0.72rem;font-weight:700;margin-left:6px; }
    .called-card { background:white;border-radius:10px;padding:16px 20px;margin-bottom:12px;box-shadow:0 1px 6px rgba(0,0,0,0.10); }
    .called-card-header { display:flex;align-items:center;gap:16px;margin-bottom:8px; }
    .vitals-inline-form { margin-top:12px;margin-bottom:8px; }
    .vitals-actions { display:flex;gap:12px;align-items:center;margin-top:4px; }
    .voucher-box { background:#e8f5e9;border:1px solid #a5d6a7;border-radius:12px;padding:24px;max-width:520px; }
    .voucher-header { display:flex;align-items:center;gap:12px;margin-bottom:16px; }
    .voucher-header mat-icon { font-size:40px;width:40px;height:40px;color:#2e7d32; }
    .voucher-code { font-size:2.5rem;font-weight:800;letter-spacing:6px;color:#1b5e20;text-align:center;background:white;padding:12px;border-radius:8px;margin:12px 0; }
    .voucher-details { display:flex;flex-direction:column;gap:6px;font-size:0.92rem;margin-bottom:12px; }
    .voucher-instruction { display:flex;align-items:center;gap:8px;color:#1565c0;font-size:0.9rem;background:#e3f2fd;padding:10px 14px;border-radius:8px; }
    .new-patient-notice { display:flex;align-items:center;gap:12px;background:#fff3e0;padding:14px;border-radius:8px;color:#e65100;margin-top:16px; }
  `]
})
export class HealthStaffComponent implements OnInit, OnDestroy {
  // Recepción walk-in (Tab 1)
  recepDpiForm!: FormGroup;
  recepPatientForm!: FormGroup;
  recepServiceForm!: FormGroup;
  recepExistingPatient: Patient | null = null;
  recepIsNewPatient = false;
  recepSearching = false;
  recepSubmitting = false;
  recepVoucher: any = null;
  recepNewCredentials: { username: string; tempPassword: string } | null = null;

  clinics: Clinic[] = [];
  visitClinics: Clinic[] = [];
  insurances: any[] = [];

  // Vitals tab
  calledTickets: Ticket[] = [];
  activeVitalsTicketId: number | null = null;
  vitalsFormMap: Record<number, FormGroup> = {};
  sendingVitals = false;
  private pollInterval: any;

  // Citas Presenciales tab
  apptDpiForm!: FormGroup;
  apptPatientForm!: FormGroup;
  apptCalendarForm!: FormGroup;
  apptExistingPatient: Patient | null = null;
  apptIsNewPatient = false;
  apptSearching = false;
  apptSubmitting = false;
  apptAvailableSlots: string[] = [];
  apptLoadingSlots = false;
  apptVoucher: any = null;
  apptNewCredentials: { username: string; tempPassword: string } | null = null;
  apptMinDate = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private clinicService: ClinicService,
    private ticketService: TicketService,
    private vitalSignsService: VitalSignsService,
    private appointmentService: AppointmentService,
    private insuranceService: InsuranceService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.recepDpiForm = this.fb.group({
      dpi: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]]
    });
    this.recepPatientForm = this.fb.group({
      firstName:       ['', Validators.required],
      lastName:        ['', Validators.required],
      birthDate:       [''],
      phone:           [''],
      email:           ['', [Validators.required, Validators.email]],
      address:         [''],
      insuranceId:     [null],
      insuranceNumber: ['']
    });
    this.recepServiceForm = this.fb.group({
      clinicId: [null, Validators.required],
      type:     ['CONSULTA', Validators.required],
      notes:    ['']
    });

    this.apptDpiForm = this.fb.group({
      dpi: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]]
    });
    this.apptPatientForm = this.fb.group({
      firstName:       ['', Validators.required],
      lastName:        ['', Validators.required],
      birthDate:       [''],
      phone:           [''],
      email:           ['', [Validators.required, Validators.email]],
      address:         [''],
      insuranceId:     [null],
      insuranceNumber: ['']
    });
    this.apptCalendarForm = this.fb.group({
      clinicId: [null, Validators.required],
      type: ['CONSULTA', Validators.required],
      scheduledDate: ['', Validators.required],
      scheduledTime: ['', Validators.required],
      notes: ['']
    });

    this.clinicService.getAll().subscribe(res => {
      if (res.success) {
        this.clinics = res.data;
        const excluded = ['farmacia', 'emergencia', 'emergencias'];
        this.visitClinics = res.data.filter((c: Clinic) =>
          !excluded.some(x => c.name.toLowerCase().includes(x))
        );
      }
    });
    this.insuranceService.getAll().subscribe(res => { if (res.success) this.insurances = res.data; });
    this.loadCalledTickets();
    this.pollInterval = setInterval(() => this.loadCalledTickets(), 8000);
  }

  ngOnDestroy(): void {
    clearInterval(this.pollInterval);
  }

  recepSearchByDpi(): void {
    const dpi = this.recepDpiForm.value.dpi;
    this.recepSearching = true;
    this.recepExistingPatient = null;
    this.recepIsNewPatient = false;
    this.patientService.getByDpi(dpi).subscribe({
      next: res => {
        if (res.success && res.data) {
          this.recepExistingPatient = res.data;
          this.recepPatientForm.patchValue(res.data);
        } else {
          this.recepIsNewPatient = true;
          this.recepPatientForm.reset();
        }
        this.recepSearching = false;
      },
      error: () => {
        this.recepIsNewPatient = true;
        this.recepPatientForm.reset();
        this.recepSearching = false;
      }
    });
  }

  bookWalkIn(): void {
    this.recepSubmitting = true;
    const doBook = (patientId: number) => {
      const svc = this.recepServiceForm.value;
      this.appointmentService.book({
        patientId,
        clinicId: svc.clinicId,
        type: svc.type,
        notes: svc.notes || ''
        // no scheduledDate / scheduledTime → walk-in
      }).subscribe({
        next: res => {
          if (res.success) {
            this.recepVoucher = res.data;
            this.notification.success('Voucher generado. Paciente puede pasar a Caja.');
          } else {
            this.notification.error(res.message || 'Error al generar voucher');
          }
          this.recepSubmitting = false;
        },
        error: err => {
          this.notification.error(err.error?.message || 'Error al generar voucher');
          this.recepSubmitting = false;
        }
      });
    };

    if (this.recepExistingPatient) {
      this.recepNewCredentials = null;
      doBook(this.recepExistingPatient.id);
    } else {
      const data = { ...this.recepDpiForm.value, ...this.recepPatientForm.value, createAccount: true };
      this.patientService.create(data).subscribe({
        next: res => {
          if (res.success) {
            if ((res.data as any).tempPassword) {
              this.recepNewCredentials = {
                username: (res.data as any).username ?? data.dpi,
                tempPassword: (res.data as any).tempPassword
              };
            }
            doBook(res.data.id);
          } else {
            this.notification.error(res.message || 'Error al registrar paciente');
            this.recepSubmitting = false;
          }
        },
        error: err => {
          this.notification.error(err.error?.message || 'Error al registrar paciente');
          this.recepSubmitting = false;
        }
      });
    }
  }

  resetRecepFlow(): void {
    this.recepVoucher = null;
    this.recepNewCredentials = null;
    this.recepExistingPatient = null;
    this.recepIsNewPatient = false;
    this.recepDpiForm.reset();
    this.recepPatientForm.reset();
    this.recepServiceForm.reset({ type: 'CONSULTA' });
  }

  loadCalledTickets(): void {
    this.ticketService.getAll().subscribe({
      next: res => {
        if (res.success) {
          this.calledTickets = res.data.filter((t: Ticket) => t.status === 'CALLED_TO_VITAL_SIGNS');
        }
      },
      error: () => {}
    });
  }

  openVitalsForm(ticket: Ticket): void {
    this.activeVitalsTicketId = ticket.id;
    if (!this.vitalsFormMap[ticket.id]) {
      this.vitalsFormMap[ticket.id] = this.fb.group({
        bloodPressure: [''],
        heartRate: [null],
        temperature: [null],
        weight: [null],
        height: [null],
        oxygenSaturation: [null]
      });
    }
  }

  sendToDoctor(ticket: Ticket): void {
    this.sendingVitals = true;
    const form = this.vitalsFormMap[ticket.id];
    const v = form?.value ?? {};
    const confirmAndSend = () => {
      this.ticketService.confirmArrival(ticket.id).subscribe({
        next: res => {
          if (res.success) {
            this.notification.success(`${ticket.patientName} enviado a consultorio`);
            this.activeVitalsTicketId = null;
            delete this.vitalsFormMap[ticket.id];
            this.loadCalledTickets();
          }
          this.sendingVitals = false;
        },
        error: (err) => {
          const msg = err.error?.message || 'Error al enviar paciente';
          this.notification.error(msg);
          this.sendingVitals = false;
        }
      });
    };

    // Always register vitals (upsert on backend); even empty values satisfy RN-03
    this.vitalSignsService.register({
      ticketId: ticket.id,
      bloodPressure: v.bloodPressure || null,
      heartRate: v.heartRate ? +v.heartRate : null,
      temperature: v.temperature ? +v.temperature : null,
      weight: v.weight ? +v.weight : null,
      height: v.height ? +v.height : null,
      oxygenSaturation: v.oxygenSaturation ? +v.oxygenSaturation : null
    }).subscribe({ next: () => confirmAndSend(), error: () => confirmAndSend() });
  }

  getStatusClass(status: string): string {
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
    return m[status] ?? '';
  }

  statusLabel(status: string): string {
    const m: Record<string, string> = {
      WAITING: 'En Espera',
      CALLED_TO_VITAL_SIGNS: 'En Signos Vitales',
      READY_FOR_DOCTOR: 'Listo para Médico',
      BEING_CALLED: 'Siendo Llamado',
      IN_CONSULTATION: 'En Consulta',
      COMPLETED: 'Completado',
      ABSENT: 'Ausente',
      CANCELLED_NO_PAYMENT: 'Cancelado'
    };
    return m[status] ?? status;
  }

  // ── Citas Presenciales ────────────────────────────────────────────────────

  apptSearchByDpi(): void {
    const dpi = this.apptDpiForm.value.dpi;
    this.apptSearching = true;
    this.apptExistingPatient = null;
    this.apptIsNewPatient = false;
    this.patientService.getByDpi(dpi).subscribe({
      next: res => {
        if (res.success && res.data) {
          this.apptExistingPatient = res.data;
          this.apptPatientForm.patchValue(res.data);
        } else {
          this.apptIsNewPatient = true;
          this.apptPatientForm.reset();
        }
        this.apptSearching = false;
      },
      error: () => {
        this.apptIsNewPatient = true;
        this.apptPatientForm.reset();
        this.apptSearching = false;
      }
    });
  }

  onApptClinicChange(_clinicId: number): void {
    this.apptCalendarForm.patchValue({ scheduledTime: '' });
    this.loadApptSlots();
  }

  onApptDateChange(): void {
    this.apptCalendarForm.patchValue({ scheduledTime: '' });
    this.loadApptSlots();
  }

  loadApptSlots(): void {
    const { clinicId, scheduledDate } = this.apptCalendarForm.value;
    if (!clinicId || !scheduledDate) return;
    this.apptLoadingSlots = true;
    this.apptAvailableSlots = [];
    this.appointmentService.getAvailableSlots(scheduledDate, clinicId).subscribe({
      next: res => {
        if (res.success) this.apptAvailableSlots = res.data;
        this.apptLoadingSlots = false;
      },
      error: () => { this.apptLoadingSlots = false; }
    });
  }

  bookAppointment(): void {
    this.apptSubmitting = true;
    const doBook = (patientId: number) => {
      const cal = this.apptCalendarForm.value;
      this.appointmentService.book({
        patientId,
        clinicId: cal.clinicId,
        type: cal.type,
        scheduledDate: cal.scheduledDate,
        scheduledTime: cal.scheduledTime,
        notes: cal.notes || ''
      }).subscribe({
        next: res => {
          console.log('BOOK RESPONSE:', JSON.stringify(res));
          if (res.success) {
            this.apptVoucher = res.data;
            this.notification.success('Cita agendada. Voucher generado.');
          } else {
            this.notification.error(res.message || 'Error al agendar');
          }
          this.apptSubmitting = false;
        },
        error: err => {
          this.notification.error(err.error?.message || 'Error al agendar la cita');
          this.apptSubmitting = false;
        }
      });
    };

    if (this.apptExistingPatient) {
      this.apptNewCredentials = null;
      doBook(this.apptExistingPatient.id);
    } else {
      const data = {
        ...this.apptDpiForm.value,
        ...this.apptPatientForm.value,
        createAccount: true
      };
      this.patientService.create(data).subscribe({
        next: res => {
          if (res.success) {
            if ((res.data as any).tempPassword) {
              this.apptNewCredentials = {
                username: (res.data as any).username ?? data.dpi,
                tempPassword: (res.data as any).tempPassword
              };
            }
            doBook(res.data.id);
          } else {
            this.notification.error(res.message || 'Error al registrar paciente');
            this.apptSubmitting = false;
          }
        },
        error: err => {
          this.notification.error(err.error?.message || 'Error al registrar paciente');
          this.apptSubmitting = false;
        }
      });
    }
  }

  resetApptFlow(): void {
    this.apptVoucher = null;
    this.apptNewCredentials = null;
    this.apptExistingPatient = null;
    this.apptIsNewPatient = false;
    this.apptAvailableSlots = [];
    this.apptDpiForm.reset();
    this.apptPatientForm.reset();
    this.apptCalendarForm.reset({ type: 'CONSULTA' });
  }
}
