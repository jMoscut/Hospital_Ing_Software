import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { LabService } from '../../shared/services/lab.service';
import { NotificationService } from '../../shared/services/notification.service';
import { LabOrder } from '../../core/models/lab.model';

@Component({
  selector: 'app-laboratory',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatCardModule, MatButtonModule,
    MatIconModule, MatTabsModule, MatTableModule, MatChipsModule,
    MatFormFieldModule, MatInputModule, MatDialogModule
  ],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Laboratorio</h1>
      </div>

      <mat-tab-group>
        <!-- Pendientes -->
        <mat-tab label="Pendientes ({{ pending.length }})">
          <div class="tab-content">
            <div class="lab-order" *ngFor="let o of pending">
              <div class="order-header">
                <div>
                  <strong>{{ o.patientName }}</strong>
                  <span class="code-badge">Orden #{{ o.id }}</span>
                </div>
                <span [class]="getStatusClass(o.status)"
                      style="padding:4px 12px;border-radius:12px;font-size:0.8rem">
                  {{ o.status }}
                </span>
              </div>
              <div class="order-details">
                <mat-icon>science</mat-icon>
                <span>Muestra: <strong>{{ o.sampleType }}</strong></span>
                <mat-icon>calendar_today</mat-icon>
                <span>Orden: {{ o.orderDate }}</span>
                <mat-icon style="color:#e65100">warning</mat-icon>
                <span [style.color]="isExpiringSoon(o.expirationDate) ? '#e65100' : 'inherit'">
                  Vence: {{ o.expirationDate }}
                  <strong *ngIf="isExpiringSoon(o.expirationDate)"> ⚠ Próximo a expirar</strong>
                </span>
              </div>
              <div class="order-actions">
                <button mat-stroked-button color="primary"
                        *ngIf="o.status === 'PENDING'"
                        (click)="collectSample(o.id)">
                  <mat-icon>colorize</mat-icon> Tomar Muestra
                </button>
                <button mat-stroked-button color="accent"
                        *ngIf="o.status === 'PENDING' || o.status === 'SAMPLE_COLLECTED'"
                        (click)="openScheduleDialog(o)">
                  <mat-icon>schedule</mat-icon> Programar Cita
                </button>
                <button mat-raised-button color="primary"
                        *ngIf="o.status === 'SAMPLE_COLLECTED' || o.status === 'SCHEDULED'"
                        (click)="openCompleteDialog(o)">
                  <mat-icon>check_circle</mat-icon> Registrar Resultado
                </button>
              </div>

              <!-- Panel de completar resultado -->
              <div class="complete-panel" *ngIf="selectedOrder?.id === o.id && showCompleteForm">
                <form [formGroup]="completeForm">
                  <mat-form-field appearance="outline" class="full-width">
                    <mat-label>Notas del Resultado</mat-label>
                    <textarea matInput formControlName="notes" rows="3"></textarea>
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                    <mat-label>Fecha y Hora de Disponibilidad</mat-label>
                    <input matInput type="datetime-local" formControlName="resultAvailableAt">
                  </mat-form-field>
                  <div class="form-actions">
                    <button mat-button (click)="showCompleteForm = false">Cancelar</button>
                    <button mat-raised-button color="primary"
                            (click)="completeOrder(o.id)" [disabled]="completeForm.invalid">
                      <mat-icon>send</mat-icon> Guardar y Notificar (Email)
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <p *ngIf="pending.length === 0" class="empty-msg">No hay órdenes pendientes</p>
          </div>
        </mat-tab>

        <!-- Completadas -->
        <mat-tab label="Completadas ({{ completed.length }})">
          <div class="tab-content">
            <div class="lab-order" *ngFor="let o of completed">
              <div class="order-header">
                <div><strong>Orden #{{ o.id }}</strong></div>
                <span style="background:#e8f5e9;color:#2e7d32;padding:4px 12px;border-radius:12px;font-size:0.8rem">
                  COMPLETADO
                </span>
              </div>
              <div class="order-details">
                <mat-icon>science</mat-icon>
                <span>{{ o.sampleType }}</span>
                <mat-icon>schedule</mat-icon>
                <span>Disponible: {{ o.resultAvailableAt | date:'dd/MM/yyyy HH:mm' }}</span>
              </div>
            </div>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .tab-content { padding: 24px 0; }
    .lab-order { background: white; border-radius: 12px; padding: 20px; margin-bottom: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
    .order-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
    .code-badge { background: #e3f2fd; color: #1565c0; padding: 2px 8px; border-radius: 8px; font-size: 0.8rem; margin-left: 8px; }
    .order-details { display: flex; align-items: center; gap: 8px; color: #555; font-size: 0.9rem; flex-wrap: wrap; margin-bottom: 12px; }
    .order-actions { display: flex; gap: 8px; flex-wrap: wrap; }
    .complete-panel { margin-top: 16px; padding: 16px; background: #f8f9ff; border-radius: 8px; }
    .full-width { width: 100%; }
    .form-actions { display: flex; gap: 8px; margin-top: 8px; }
    .empty-msg { text-align: center; color: #9e9e9e; padding: 40px; }
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .page-header h1 { font-size: 1.6rem; font-weight: 500; color: #1565c0; margin: 0; }
  `]
})
export class LaboratoryComponent implements OnInit {
  pending: LabOrder[] = [];
  completed: LabOrder[] = [];
  selectedOrder: LabOrder | null = null;
  showCompleteForm = false;
  completeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private labService: LabService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.completeForm = this.fb.group({
      notes: [''],
      resultAvailableAt: ['', Validators.required]
    });
    this.load();
  }

  load(): void {
    this.labService.getPending().subscribe(res => {
      if (res.success) {
        this.pending = res.data.filter(o => o.status !== 'COMPLETED' && o.status !== 'EXPIRED');
        this.completed = res.data.filter(o => o.status === 'COMPLETED');
      }
    });
  }

  collectSample(id: number): void {
    this.labService.collectSample(id).subscribe({
      next: res => { if (res.success) { this.notification.success('Muestra recolectada'); this.load(); } },
      error: () => this.notification.error('Error al registrar muestra')
    });
  }

  openScheduleDialog(order: LabOrder): void {
    const dt = prompt('Fecha y hora de la cita programada (formato: YYYY-MM-DDTHH:MM)');
    if (dt) {
      this.labService.schedule(order.id, dt).subscribe({
        next: () => { this.notification.success('Cita programada'); this.load(); }
      });
    }
  }

  openCompleteDialog(order: LabOrder): void {
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
      error: err => this.notification.error('Error: Verifique que el paciente tenga correo registrado (RN-L03)')
    });
  }

  isExpiringSoon(expirationDate: string): boolean {
    const exp = new Date(expirationDate);
    const diff = (exp.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    return diff <= 5 && diff > 0;
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      'PENDING': 'status-waiting',
      'SAMPLE_COLLECTED': 'status-being-called',
      'SCHEDULED': 'status-in-consultation',
      'COMPLETED': 'status-completed',
      'EXPIRED': 'status-absent'
    };
    return map[status] || '';
  }
}
