import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LabService, LabExamService } from '../../shared/services/lab.service';
import { TicketService } from '../../shared/services/ticket.service';
import { NotificationService } from '../../shared/services/notification.service';
import { LabOrder, LabExam, SAMPLE_TYPE_LABELS } from '../../core/models/lab.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-laboratory',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule,
    MatCardModule, MatButtonModule, MatIconModule, MatTabsModule,
    MatTableModule, MatChipsModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatBadgeModule, MatSlideToggleModule
  ],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1><mat-icon style="vertical-align:middle;margin-right:8px">science</mat-icon>Laboratorio</h1>
        <div class="availability-bar" [class.available]="meAvailable">
          <mat-icon>{{ meAvailable ? 'check_circle' : 'pause_circle' }}</mat-icon>
          <span>{{ meAvailable ? 'Disponible' : 'No disponible' }}</span>
          <mat-slide-toggle [checked]="meAvailable" (change)="toggleAvailability()" color="primary"></mat-slide-toggle>
        </div>
      </div>

      <mat-tab-group animationDuration="200ms">

        <!-- TAB 1: Órdenes pendientes -->
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon class="tab-icon">pending_actions</mat-icon>
            Pendientes ({{ pending.length }})
          </ng-template>
          <div class="tab-content">
            <div class="lab-order" *ngFor="let o of pending">
              <div class="order-header">
                <div class="order-title">
                  <strong>{{ o.patientName }}</strong>
                  <span class="code-badge">Orden #{{ o.id }}</span>
                  <span class="exam-badge" *ngIf="o.labExamCode">{{ o.labExamCode }}</span>
                  <span class="dpi-badge" *ngIf="o.patientDpi">DPI: {{ o.patientDpi }}</span>
                </div>
                <span [class]="getStatusClass(o.status)" class="status-chip">
                  {{ statusLabel(o.status) }}
                </span>
              </div>

              <div class="order-details">
                <div class="detail-item">
                  <mat-icon>biotech</mat-icon>
                  <span *ngIf="o.labExamName"><strong>{{ o.labExamName }}</strong></span>
                  <span *ngIf="!o.labExamName">{{ sampleLabel(o.sampleType) }}</span>
                </div>
                <div class="detail-item">
                  <mat-icon>water_drop</mat-icon>
                  <span>Muestra: {{ sampleLabel(o.sampleType) }}</span>
                </div>
                <div class="detail-item">
                  <mat-icon>calendar_today</mat-icon>
                  <span>Emitida: {{ o.orderDate }}</span>
                </div>
                <div class="detail-item" [class.expiring]="isExpiringSoon(o.expirationDate)">
                  <mat-icon>{{ isExpiringSoon(o.expirationDate) ? 'warning' : 'event' }}</mat-icon>
                  <span>Vence: {{ o.expirationDate }}
                    <strong *ngIf="isExpiringSoon(o.expirationDate)"> ⚠ Próximo a vencer</strong>
                  </span>
                </div>
                <div class="detail-item" *ngIf="o.scheduledAt">
                  <mat-icon>schedule</mat-icon>
                  <span>Cita: {{ o.scheduledAt | date:'dd/MM/yyyy HH:mm' }}</span>
                </div>
              </div>

              <!-- Vitales -->
              <div class="vitals-grid" *ngIf="hasVitals(o)">
                <div class="vitals-label"><mat-icon>monitor_heart</mat-icon> Signos Vitales</div>
                <div class="vitals-row">
                  <div class="vital-item" *ngIf="o.bloodPressure">
                    <span class="vital-icon">🩸</span>
                    <span class="vital-val">{{ o.bloodPressure }}</span>
                    <span class="vital-lbl">Presión</span>
                  </div>
                  <div class="vital-item" *ngIf="o.heartRate">
                    <span class="vital-icon">❤️</span>
                    <span class="vital-val">{{ o.heartRate }} bpm</span>
                    <span class="vital-lbl">F. Cardíaca</span>
                  </div>
                  <div class="vital-item" *ngIf="o.temperature">
                    <span class="vital-icon">🌡️</span>
                    <span class="vital-val">{{ o.temperature }}°C</span>
                    <span class="vital-lbl">Temp.</span>
                  </div>
                  <div class="vital-item" *ngIf="o.oxygenSaturation">
                    <span class="vital-icon">💨</span>
                    <span class="vital-val">{{ o.oxygenSaturation }}%</span>
                    <span class="vital-lbl">SpO₂</span>
                  </div>
                  <div class="vital-item" *ngIf="o.weight">
                    <span class="vital-icon">⚖️</span>
                    <span class="vital-val">{{ o.weight }} kg</span>
                    <span class="vital-lbl">Peso</span>
                  </div>
                  <div class="vital-item" *ngIf="o.height">
                    <span class="vital-icon">📏</span>
                    <span class="vital-val">{{ o.height }} m</span>
                    <span class="vital-lbl">Talla</span>
                  </div>
                </div>
              </div>

              <div class="order-actions">
                <button mat-stroked-button color="primary"
                        *ngIf="o.status === 'PENDING'"
                        (click)="collectSample(o.id)">
                  <mat-icon>colorize</mat-icon> Tomar Muestra
                </button>
                <button mat-stroked-button
                        *ngIf="o.status === 'PENDING' || o.status === 'SAMPLE_COLLECTED'"
                        (click)="openScheduleForm(o)">
                  <mat-icon>event</mat-icon> Programar Cita
                </button>
                <button mat-raised-button color="primary"
                        *ngIf="o.status === 'SAMPLE_COLLECTED' || o.status === 'SCHEDULED'"
                        (click)="openCompleteForm(o)">
                  <mat-icon>attach_file</mat-icon> Adjuntar Resultados
                </button>
              </div>

              <!-- Panel programar -->
              <div class="sub-panel" *ngIf="schedulingOrder?.id === o.id">
                <mat-form-field appearance="outline">
                  <mat-label>Fecha y hora de la cita</mat-label>
                  <input matInput type="datetime-local" [(ngModel)]="scheduleDateTime">
                </mat-form-field>
                <div class="sub-panel-actions">
                  <button mat-button (click)="schedulingOrder = null">Cancelar</button>
                  <button mat-raised-button color="primary"
                          [disabled]="!scheduleDateTime"
                          (click)="saveSchedule(o.id)">
                    <mat-icon>save</mat-icon> Confirmar Cita
                  </button>
                </div>
              </div>

              <!-- Panel adjuntar resultados -->
              <div class="sub-panel" *ngIf="selectedOrder?.id === o.id && showCompleteForm">
                <div class="file-upload-area" (click)="fileInput.click()" (dragover)="$event.preventDefault()" (drop)="onDrop($event)">
                  <mat-icon>picture_as_pdf</mat-icon>
                  <span *ngIf="!selectedFile">Haz clic o arrastra el PDF de resultados aquí</span>
                  <span *ngIf="selectedFile" class="file-selected">
                    <mat-icon style="color:#2e7d32">check_circle</mat-icon>
                    {{ selectedFile.name }} ({{ (selectedFile.size / 1024 / 1024).toFixed(2) }} MB)
                  </span>
                  <input #fileInput type="file" accept=".pdf,application/pdf" style="display:none" (change)="onFileSelected($event)">
                </div>
                <div class="file-error" *ngIf="fileError">{{ fileError }}</div>

                <mat-form-field appearance="outline" class="full-width" style="margin-top:12px">
                  <mat-label>Notas del técnico (opcional)</mat-label>
                  <textarea matInput [(ngModel)]="resultNotes" rows="3" placeholder="Observaciones adicionales sobre el resultado..."></textarea>
                </mat-form-field>

                <div class="email-notice" *ngIf="o.patientEmail">
                  <mat-icon>email</mat-icon>
                  Se enviará el PDF al correo: <strong>{{ o.patientEmail }}</strong>
                </div>
                <div class="email-warning" *ngIf="!o.patientEmail">
                  <mat-icon>warning</mat-icon>
                  El paciente no tiene correo registrado. No se podrá completar (RN-L03).
                </div>

                <div class="sub-panel-actions">
                  <button mat-button (click)="showCompleteForm = false; selectedFile = null; fileError = ''">Cancelar</button>
                  <button mat-raised-button color="primary"
                          [disabled]="!selectedFile || !!fileError || submitting"
                          (click)="completeOrder(o.id)">
                    <mat-icon>send</mat-icon> {{ submitting ? 'Enviando...' : 'Guardar y Enviar al Paciente' }}
                  </button>
                </div>
              </div>
            </div>
            <div class="empty-state" *ngIf="pending.length === 0">
              <mat-icon>check_circle_outline</mat-icon>
              <p>No hay órdenes pendientes</p>
            </div>
          </div>
        </mat-tab>

        <!-- TAB 2: Completadas -->
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon class="tab-icon">task_alt</mat-icon>
            Completadas ({{ completed.length }})
          </ng-template>
          <div class="tab-content">
            <div class="lab-order completed" *ngFor="let o of completed">
              <div class="order-header">
                <div class="order-title">
                  <strong>{{ o.patientName }}</strong>
                  <span class="code-badge">Orden #{{ o.id }}</span>
                  <span class="exam-badge" *ngIf="o.labExamCode">{{ o.labExamCode }}</span>
                </div>
                <span class="status-chip status-completed">Completado</span>
              </div>
              <div class="order-details">
                <div class="detail-item">
                  <mat-icon>biotech</mat-icon>
                  <span>{{ o.labExamName || sampleLabel(o.sampleType) }}</span>
                </div>
                <div class="detail-item">
                  <mat-icon>notifications_active</mat-icon>
                  <span>Completado: {{ o.resultAvailableAt | date:'dd/MM/yyyy HH:mm' }}</span>
                </div>
                <div class="detail-item" *ngIf="o.resultNotes">
                  <mat-icon>notes</mat-icon>
                  <span>{{ o.resultNotes }}</span>
                </div>
              </div>
              <div class="order-actions" *ngIf="o.hasAttachment">
                <a mat-stroked-button color="primary" [href]="getResultFileUrl(o.id)" target="_blank">
                  <mat-icon>picture_as_pdf</mat-icon> Ver PDF
                </a>
              </div>
            </div>
            <div class="empty-state" *ngIf="completed.length === 0">
              <mat-icon>science</mat-icon>
              <p>Sin resultados registrados</p>
            </div>
          </div>
        </mat-tab>

        <!-- TAB 3: Catálogo de Exámenes -->
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon class="tab-icon">menu_book</mat-icon>
            Catálogo ({{ labExams.length }})
          </ng-template>
          <div class="tab-content">
            <div class="catalog-filters">
              <mat-form-field appearance="outline">
                <mat-label>Filtrar por categoría</mat-label>
                <mat-select [(ngModel)]="selectedCategory" (selectionChange)="filterExams()">
                  <mat-option value="">Todas las categorías</mat-option>
                  <mat-option *ngFor="let cat of categories" [value]="cat">{{ cat }}</mat-option>
                </mat-select>
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Buscar</mat-label>
                <input matInput [(ngModel)]="searchQuery" (input)="filterExams()" placeholder="Nombre o código">
                <mat-icon matSuffix>search</mat-icon>
              </mat-form-field>
            </div>

            <table mat-table [dataSource]="filteredExams" class="catalog-table">
              <ng-container matColumnDef="code">
                <th mat-header-cell *matHeaderCellDef>Código</th>
                <td mat-cell *matCellDef="let e">
                  <span class="exam-badge">{{ e.code }}</span>
                </td>
              </ng-container>
              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef>Examen</th>
                <td mat-cell *matCellDef="let e"><strong>{{ e.name }}</strong></td>
              </ng-container>
              <ng-container matColumnDef="sampleType">
                <th mat-header-cell *matHeaderCellDef>Muestra</th>
                <td mat-cell *matCellDef="let e">{{ sampleLabel(e.sampleType) }}</td>
              </ng-container>
              <ng-container matColumnDef="category">
                <th mat-header-cell *matHeaderCellDef>Categoría</th>
                <td mat-cell *matCellDef="let e">
                  <span class="category-chip">{{ e.category }}</span>
                </td>
              </ng-container>
              <tr mat-header-row *matHeaderRowDef="catalogColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: catalogColumns;"></tr>
            </table>
          </div>
        </mat-tab>

      </mat-tab-group>
    </div>
  `,
  styles: [`
    .tab-content { padding: 24px 0; }
    .tab-icon { font-size: 18px; margin-right: 6px; vertical-align: middle; }
    .page-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; }
    .page-header h1 { font-size:1.6rem; font-weight:500; color:#1565c0; margin:0; }
    .availability-bar { display:flex; align-items:center; gap:10px; padding:8px 16px; border-radius:20px; background:#fce4ec; color:#c62828; font-size:0.88rem; font-weight:600; transition:all 0.3s; }
    .availability-bar mat-icon { font-size:20px; width:20px; height:20px; }
    .availability-bar.available { background:#e8f5e9; color:#2e7d32; }

    .lab-order {
      background: white; border-radius: 12px; padding: 20px; margin-bottom: 16px;
      box-shadow: 0 2px 8px rgba(29,108,97,0.08); border: 1px solid #d4e8e5;
    }
    .lab-order.completed { opacity: 0.85; }

    .order-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
    .order-title { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
    .order-title strong { font-size: 1rem; }

    .code-badge { background: #d0f4ef; color: #1D6C61; padding: 2px 8px; border-radius: 8px; font-size: 0.78rem; font-weight: 600; }
    .exam-badge { background: #193A31; color: #3EB9A8; padding: 2px 8px; border-radius: 8px; font-size: 0.78rem; font-weight: 600; }
    .dpi-badge { background: #e3f2fd; color: #1565c0; padding: 2px 8px; border-radius: 8px; font-size: 0.78rem; }
    .status-chip { padding: 4px 12px; border-radius: 12px; font-size: 0.8rem; font-weight: 500; }

    .order-details { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 14px; }
    .detail-item { display: flex; align-items: center; gap: 4px; font-size: 0.88rem; color: #444; }
    .detail-item mat-icon { font-size: 16px; width: 16px; height: 16px; color: #1D6C61; }
    .detail-item.expiring { color: #e65100; }
    .detail-item.expiring mat-icon { color: #e65100; }

    /* Vitals */
    .vitals-grid { background: #f0f7ff; border: 1px solid #bbdefb; border-radius: 8px; padding: 12px; margin-bottom: 14px; }
    .vitals-label { display:flex; align-items:center; gap:6px; font-size:0.82rem; font-weight:600; color:#1565c0; margin-bottom:10px; }
    .vitals-label mat-icon { font-size:16px; width:16px; height:16px; }
    .vitals-row { display:flex; flex-wrap:wrap; gap:12px; }
    .vital-item { display:flex; flex-direction:column; align-items:center; background:white; border-radius:8px; padding:8px 14px; min-width:80px; box-shadow:0 1px 3px rgba(0,0,0,0.08); }
    .vital-icon { font-size:1.1rem; }
    .vital-val { font-size:0.92rem; font-weight:700; color:#1a237e; }
    .vital-lbl { font-size:0.7rem; color:#666; }

    .order-actions { display: flex; gap: 8px; flex-wrap: wrap; }

    .sub-panel { margin-top: 16px; padding: 16px; background: #f0f7f6; border-radius: 8px; border: 1px solid #d4e8e5; }
    .sub-panel-actions { display: flex; gap: 8px; margin-top: 12px; }
    .full-width { width: 100%; }

    /* File upload */
    .file-upload-area {
      border: 2px dashed #b2dfdb; border-radius: 8px; padding: 24px;
      text-align: center; cursor: pointer; transition: all 0.2s;
      display:flex; flex-direction:column; align-items:center; gap:8px; color:#555;
    }
    .file-upload-area:hover { border-color: #1D6C61; background: #e8f5f3; }
    .file-upload-area mat-icon { font-size: 36px; width:36px; height:36px; color:#1D6C61; }
    .file-selected { display:flex; align-items:center; gap:6px; color:#2e7d32; font-weight:500; }
    .file-error { color: #c62828; font-size: 0.85rem; margin-top: 6px; }
    .email-notice { display:flex; align-items:center; gap:6px; color:#1565c0; font-size:0.85rem; margin-top:8px; }
    .email-notice mat-icon { font-size:16px; width:16px; height:16px; }
    .email-warning { display:flex; align-items:center; gap:6px; color:#e65100; font-size:0.85rem; margin-top:8px; }
    .email-warning mat-icon { font-size:16px; width:16px; height:16px; }

    /* Catálogo */
    .catalog-filters { display: flex; gap: 16px; margin-bottom: 16px; flex-wrap: wrap; }
    .catalog-filters mat-form-field { flex: 1; min-width: 200px; }
    .catalog-table { width: 100%; }
    .category-chip { background: #e8f5f3; color: #1D6C61; padding: 2px 8px; border-radius: 8px; font-size: 0.78rem; }

    .empty-state { text-align: center; padding: 48px; color: #9e9e9e; }
    .empty-state mat-icon { font-size: 48px; width: 48px; height: 48px; margin-bottom: 8px; color: #3EB9A8; opacity: 0.5; }
  `]
})
export class LaboratoryComponent implements OnInit, OnDestroy {
  pending: LabOrder[] = [];
  completed: LabOrder[] = [];
  labExams: LabExam[] = [];
  filteredExams: LabExam[] = [];
  categories: string[] = [];
  selectedCategory = '';
  searchQuery = '';

  selectedOrder: LabOrder | null = null;
  schedulingOrder: LabOrder | null = null;
  scheduleDateTime = '';
  showCompleteForm = false;
  selectedFile: File | null = null;
  fileError = '';
  resultNotes = '';
  submitting = false;

  catalogColumns = ['code', 'name', 'sampleType', 'category'];

  meAvailable = false;
  private heartbeatInterval: any;

  constructor(
    private fb: FormBuilder,
    private labService: LabService,
    private labExamService: LabExamService,
    private ticketService: TicketService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.load();
    this.loadCatalog();
    this.ticketService.getMe().subscribe(res => {
      if (res.success) this.meAvailable = res.data.available ?? false;
    });
    this.heartbeatInterval = setInterval(() => {
      this.ticketService.getMe().subscribe(res => {
        if (res.success) this.meAvailable = res.data.available ?? false;
      });
    }, 5000);
  }

  ngOnDestroy(): void {
    clearInterval(this.heartbeatInterval);
  }

  toggleAvailability(): void {
    this.ticketService.toggleDoctorAvailability().subscribe({
      next: res => {
        if (res.success) {
          this.meAvailable = res.data.available;
          this.notification.success(this.meAvailable ? 'Ahora estás disponible' : 'Marcado como no disponible');
        }
      },
      error: () => this.notification.error('Error al cambiar disponibilidad')
    });
  }

  load(): void {
    this.labService.getPending().subscribe({
      next: res => {
        if (res.success) {
          this.pending   = res.data.filter(o => o.status !== 'COMPLETED' && o.status !== 'EXPIRED');
          this.completed = res.data.filter(o => o.status === 'COMPLETED');
        }
      },
      error: () => this.notification.error('Error al cargar órdenes')
    });
  }

  loadCatalog(): void {
    this.labExamService.getAll().subscribe(res => {
      if (res.success) { this.labExams = res.data; this.filteredExams = res.data; }
    });
    this.labExamService.getCategories().subscribe(res => {
      if (res.success) this.categories = res.data;
    });
  }

  filterExams(): void {
    let result = this.labExams;
    if (this.selectedCategory) result = result.filter(e => e.category === this.selectedCategory);
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(e => e.name.toLowerCase().includes(q) || e.code.toLowerCase().includes(q));
    }
    this.filteredExams = result;
  }

  collectSample(id: number): void {
    this.labService.collectSample(id).subscribe({
      next: res => { if (res.success) { this.notification.success('Muestra recolectada'); this.load(); } },
      error: () => this.notification.error('Error al registrar muestra')
    });
  }

  openScheduleForm(order: LabOrder): void {
    this.schedulingOrder = order;
    this.scheduleDateTime = '';
  }

  saveSchedule(id: number): void {
    this.labService.schedule(id, this.scheduleDateTime).subscribe({
      next: () => { this.notification.success('Cita programada'); this.schedulingOrder = null; this.load(); },
      error: () => this.notification.error('Error al programar cita')
    });
  }

  openCompleteForm(order: LabOrder): void {
    this.selectedOrder = order;
    this.showCompleteForm = true;
    this.selectedFile = null;
    this.fileError = '';
    this.resultNotes = '';
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) this.validateAndSetFile(input.files[0]);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) this.validateAndSetFile(file);
  }

  private validateAndSetFile(file: File): void {
    this.fileError = '';
    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      this.fileError = 'Solo se permiten archivos PDF.';
      this.selectedFile = null;
      return;
    }
    if (file.size === 0) {
      this.fileError = 'El archivo está vacío.';
      this.selectedFile = null;
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      this.fileError = 'El archivo supera el límite de 20 MB.';
      this.selectedFile = null;
      return;
    }
    this.selectedFile = file;
  }

  completeOrder(id: number): void {
    if (!this.selectedFile) return;
    this.submitting = true;
    this.labService.complete(id, this.resultNotes, this.selectedFile).subscribe({
      next: res => {
        this.submitting = false;
        if (res.success) {
          this.notification.success('Resultado registrado. PDF enviado al paciente.');
          this.showCompleteForm = false;
          this.selectedFile = null;
          this.load();
        }
      },
      error: (err) => {
        this.submitting = false;
        const msg = err?.error?.message ?? 'Verifique que el paciente tenga correo registrado (RN-L03)';
        this.notification.error(msg);
      }
    });
  }

  getResultFileUrl(id: number): string {
    return this.labService.getResultFileUrl(id);
  }

  hasVitals(o: LabOrder): boolean {
    return !!(o.bloodPressure || o.heartRate || o.temperature || o.oxygenSaturation || o.weight || o.height);
  }

  isExpiringSoon(expirationDate: string): boolean {
    const diff = (new Date(expirationDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    return diff <= 5 && diff > 0;
  }

  sampleLabel(s: string): string {
    return (SAMPLE_TYPE_LABELS as any)[s] ?? s;
  }

  statusLabel(s: string): string {
    const m: Record<string, string> = {
      PENDING: 'Pendiente', SAMPLE_COLLECTED: 'Muestra Recolectada',
      SCHEDULED: 'Cita Programada', COMPLETED: 'Completado', EXPIRED: 'Expirado'
    };
    return m[s] ?? s;
  }

  getStatusClass(status: string): string {
    const m: Record<string, string> = {
      PENDING: 'status-waiting', SAMPLE_COLLECTED: 'status-being-called',
      SCHEDULED: 'status-in-consultation', COMPLETED: 'status-completed', EXPIRED: 'status-absent'
    };
    return m[status] ?? '';
  }
}
