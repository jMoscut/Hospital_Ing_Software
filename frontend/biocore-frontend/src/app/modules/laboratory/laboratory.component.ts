import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { LabService, LabExamService } from '../../shared/services/lab.service';
import { NotificationService } from '../../shared/services/notification.service';
import { LabOrder, LabExam, SAMPLE_TYPE_LABELS } from '../../core/models/lab.model';

@Component({
  selector: 'app-laboratory',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule,
    MatCardModule, MatButtonModule, MatIconModule, MatTabsModule,
    MatTableModule, MatChipsModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatBadgeModule
  ],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1><mat-icon style="vertical-align:middle;margin-right:8px">science</mat-icon>Laboratorio</h1>
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
                  <mat-icon>check_circle</mat-icon> Registrar Resultado
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

              <!-- Panel registrar resultado -->
              <div class="sub-panel" *ngIf="selectedOrder?.id === o.id && showCompleteForm">
                <form [formGroup]="completeForm">
                  <mat-form-field appearance="outline" class="full-width">
                    <mat-label>Notas del resultado</mat-label>
                    <textarea matInput formControlName="notes" rows="3"></textarea>
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                    <mat-label>Disponible a partir de</mat-label>
                    <input matInput type="datetime-local" formControlName="resultAvailableAt">
                  </mat-form-field>
                </form>
                <div class="sub-panel-actions">
                  <button mat-button (click)="showCompleteForm = false">Cancelar</button>
                  <button mat-raised-button color="primary"
                          [disabled]="completeForm.invalid"
                          (click)="completeOrder(o.id)">
                    <mat-icon>send</mat-icon> Guardar y Notificar al Paciente
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
                  <span>Resultados disponibles: {{ o.resultAvailableAt | date:'dd/MM/yyyy HH:mm' }}</span>
                </div>
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

    /* Orden de laboratorio */
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
    .status-chip { padding: 4px 12px; border-radius: 12px; font-size: 0.8rem; font-weight: 500; }

    .order-details { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 14px; }
    .detail-item { display: flex; align-items: center; gap: 4px; font-size: 0.88rem; color: #444; }
    .detail-item mat-icon { font-size: 16px; width: 16px; height: 16px; color: #1D6C61; }
    .detail-item.expiring { color: #e65100; }
    .detail-item.expiring mat-icon { color: #e65100; }

    .order-actions { display: flex; gap: 8px; flex-wrap: wrap; }

    /* Sub-panel (programar / completar) */
    .sub-panel { margin-top: 16px; padding: 16px; background: #f0f7f6; border-radius: 8px; border: 1px solid #d4e8e5; }
    .sub-panel-actions { display: flex; gap: 8px; margin-top: 12px; }
    .full-width { width: 100%; }

    /* Catálogo */
    .catalog-filters { display: flex; gap: 16px; margin-bottom: 16px; flex-wrap: wrap; }
    .catalog-filters mat-form-field { flex: 1; min-width: 200px; }
    .catalog-table { width: 100%; }
    .category-chip { background: #e8f5f3; color: #1D6C61; padding: 2px 8px; border-radius: 8px; font-size: 0.78rem; }

    /* Empty state */
    .empty-state { text-align: center; padding: 48px; color: #9e9e9e; }
    .empty-state mat-icon { font-size: 48px; width: 48px; height: 48px; margin-bottom: 8px; color: #3EB9A8; opacity: 0.5; }
  `]
})
export class LaboratoryComponent implements OnInit {
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
  completeForm!: FormGroup;

  catalogColumns = ['code', 'name', 'sampleType', 'category'];

  constructor(
    private fb: FormBuilder,
    private labService: LabService,
    private labExamService: LabExamService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.completeForm = this.fb.group({
      notes: [''],
      resultAvailableAt: ['', Validators.required]
    });
    this.load();
    this.loadCatalog();
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
      if (res.success) {
        this.labExams = res.data;
        this.filteredExams = res.data;
      }
    });
    this.labExamService.getCategories().subscribe(res => {
      if (res.success) this.categories = res.data;
    });
  }

  filterExams(): void {
    let result = this.labExams;
    if (this.selectedCategory) {
      result = result.filter(e => e.category === this.selectedCategory);
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(e =>
        e.name.toLowerCase().includes(q) || e.code.toLowerCase().includes(q)
      );
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
    this.completeForm.reset();
  }

  completeOrder(id: number): void {
    const { notes, resultAvailableAt } = this.completeForm.value;
    this.labService.complete(id, notes, resultAvailableAt).subscribe({
      next: res => {
        if (res.success) {
          this.notification.success('Resultado registrado. Notificación enviada al paciente.');
          this.showCompleteForm = false;
          this.load();
        }
      },
      error: () => this.notification.error('Verifique que el paciente tenga correo registrado (Regla L03)')
    });
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
