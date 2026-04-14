import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { PrescriptionService, MedicineService } from '../../shared/services/lab.service';
import { PaymentService } from '../../shared/services/payment.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Prescription } from '../../core/models/lab.model';

@Component({
  selector: 'app-pharmacy',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, MatButtonModule, MatIconModule,
    MatTabsModule, MatTableModule, MatChipsModule
  ],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Farmacia</h1>
      </div>

      <div class="pharmacy-layout">
        <!-- Lista de recetas pendientes -->
        <div class="prescriptions-panel">
          <mat-card>
            <mat-card-header>
              <mat-card-title>Recetas Pendientes</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="prescription-item"
                   *ngFor="let p of prescriptions"
                   [class.selected]="selectedPrescription?.id === p.id"
                   (click)="selectPrescription(p)">
                <mat-icon>receipt_long</mat-icon>
                <div>
                  <div class="patient-name">{{ p.patientName }}</div>
                  <div class="rx-meta">Receta #{{ p.id }} · {{ p.items.length }} ítem(s)</div>
                  <div class="rx-meta">{{ p.createdAt | date:'dd/MM/yyyy HH:mm' }}</div>
                </div>
                <span [class]="getStatusClass(p.status)" style="padding:2px 8px;border-radius:8px;font-size:0.75rem">
                  {{ p.status }}
                </span>
              </div>
              <p *ngIf="prescriptions.length === 0" class="empty-msg">Sin recetas pendientes</p>
            </mat-card-content>
          </mat-card>
        </div>

        <!-- Detalle de receta seleccionada -->
        <div class="prescription-detail">
          <mat-card *ngIf="selectedPrescription">
            <mat-card-header>
              <mat-card-title>Detalle de Receta #{{ selectedPrescription.id }}</mat-card-title>
              <mat-card-subtitle>
                Paciente: {{ selectedPrescription.patientName }}
              </mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="medicine-item" *ngFor="let item of selectedPrescription.items">
                <div class="medicine-info">
                  <strong>{{ item.medicine?.name }}</strong>
                  <div class="medicine-meta">
                    Cantidad: {{ item.quantity }} {{ item.medicine?.unit }}
                    <span *ngIf="item.dosage"> · {{ item.dosage }}</span>
                  </div>
                  <!-- RN-F01: Verificar stock -->
                  <div class="stock-info">
                    Stock disponible:
                    <strong [style.color]="item.medicine && item.medicine.stock >= item.quantity ? '#2e7d32' : '#c62828'">
                      {{ item.medicine?.stock ?? 0 }}
                    </strong>
                    <span *ngIf="item.medicine && item.medicine.stock < item.quantity" class="stock-warn">
                      ⚠ Stock insuficiente (RN-F01)
                    </span>
                  </div>
                </div>
                <div class="item-actions">
                  <mat-icon *ngIf="item.dispatched" style="color:#2e7d32">check_circle</mat-icon>
                  <button mat-icon-button color="primary"
                          *ngIf="!item.dispatched && item.medicine && item.medicine.stock >= item.quantity"
                          (click)="toggleCartItem(item.id)">
                    <mat-icon [style.color]="cartItems.has(item.id) ? '#1565c0' : ''">
                      {{ cartItems.has(item.id) ? 'shopping_cart' : 'add_shopping_cart' }}
                    </mat-icon>
                  </button>
                </div>
              </div>

              <div class="dispatch-actions">
                <!-- RN-F02: Solo despachar tras pago -->
                <div class="payment-note">
                  <mat-icon>info</mat-icon>
                  Los medicamentos solo se despachan tras confirmar el pago.
                </div>
                <button mat-raised-button color="primary"
                        [disabled]="cartItems.size === 0"
                        (click)="dispatch()">
                  <mat-icon>local_shipping</mat-icon>
                  Despachar Seleccionados ({{ cartItems.size }})
                </button>
              </div>
            </mat-card-content>
          </mat-card>

          <mat-card *ngIf="!selectedPrescription" class="empty-panel">
            <mat-icon class="big-icon">medication</mat-icon>
            <p>Seleccione una receta de la lista</p>
          </mat-card>
        </div>
      </div>

      <!-- Inventario -->
      <mat-card class="mt-24">
        <mat-card-header>
          <mat-card-title>Inventario de Medicamentos</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="medicines">
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Medicamento</th>
              <td mat-cell *matCellDef="let m">{{ m.name }}</td>
            </ng-container>
            <ng-container matColumnDef="stock">
              <th mat-header-cell *matHeaderCellDef>Stock</th>
              <td mat-cell *matCellDef="let m">
                <span [style.color]="m.stock <= 10 ? '#c62828' : '#2e7d32'"
                      [style.fontWeight]="m.stock <= 10 ? '700' : '400'">
                  {{ m.stock }} {{ m.unit }}
                </span>
              </td>
            </ng-container>
            <ng-container matColumnDef="price">
              <th mat-header-cell *matHeaderCellDef>Precio</th>
              <td mat-cell *matCellDef="let m">Q{{ m.price }}</td>
            </ng-container>
            <tr mat-header-row *matHeaderRowDef="inventoryColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: inventoryColumns;"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .pharmacy-layout { display: grid; grid-template-columns: 320px 1fr; gap: 24px; }
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .page-header h1 { font-size: 1.6rem; font-weight: 500; color: #1565c0; margin: 0; }
    .prescription-item { display: flex; align-items: flex-start; gap: 12px; padding: 12px; border-radius: 8px; cursor: pointer; border: 2px solid transparent; margin-bottom: 8px; transition: all 0.2s; }
    .prescription-item:hover { background: #f5f5f5; }
    .prescription-item.selected { border-color: #1565c0; background: #e3f2fd; }
    .patient-name { font-weight: 500; }
    .rx-meta { font-size: 0.8rem; color: #757575; }
    .medicine-item { display: flex; justify-content: space-between; align-items: flex-start; padding: 12px; border-radius: 8px; margin-bottom: 8px; background: #f8f9ff; }
    .medicine-meta { font-size: 0.85rem; color: #555; margin: 4px 0; }
    .stock-info { font-size: 0.8rem; }
    .stock-warn { color: #c62828; font-weight: 500; margin-left: 4px; }
    .dispatch-actions { margin-top: 16px; display: flex; flex-direction: column; gap: 8px; }
    .payment-note { display: flex; align-items: center; gap: 8px; background: #e3f2fd; padding: 8px 12px; border-radius: 8px; font-size: 0.85rem; color: #1565c0; }
    .empty-panel { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px; }
    .big-icon { font-size: 64px; width: 64px; height: 64px; color: #9e9e9e; margin-bottom: 16px; }
    .empty-msg { text-align: center; color: #9e9e9e; padding: 24px; }
    .mt-24 { margin-top: 24px; }
    .item-actions { display: flex; align-items: center; }
  `]
})
export class PharmacyComponent implements OnInit {
  prescriptions: Prescription[] = [];
  selectedPrescription: Prescription | null = null;
  medicines: any[] = [];
  cartItems = new Set<number>();
  inventoryColumns = ['name', 'stock', 'price'];

  constructor(
    private prescriptionService: PrescriptionService,
    private medicineService: MedicineService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.load();
    this.medicineService.getAll().subscribe(res => {
      if (res.success) this.medicines = res.data;
    });
  }

  load(): void {
    this.prescriptionService.getPendingForPharmacy().subscribe(res => {
      if (res.success) this.prescriptions = res.data;
    });
  }

  selectPrescription(p: Prescription): void {
    this.selectedPrescription = p;
    this.cartItems.clear();
  }

  toggleCartItem(itemId: number): void {
    if (this.cartItems.has(itemId)) { this.cartItems.delete(itemId); }
    else { this.cartItems.add(itemId); }
  }

  dispatch(): void {
    if (!this.selectedPrescription) return;
    const itemIds = Array.from(this.cartItems);
    this.prescriptionService.dispatch(this.selectedPrescription.id, itemIds).subscribe({
      next: res => {
        if (res.success) {
          this.notification.success('Medicamentos despachados exitosamente');
          this.cartItems.clear();
          this.load();
          this.selectedPrescription = null;
        }
      },
      error: () => this.notification.error('Error al despachar (RN-F01: Verifique stock)')
    });
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      'PENDING': 'status-waiting',
      'DISPATCHED': 'status-completed',
      'PARTIALLY_DISPATCHED': 'status-being-called',
      'NOT_DISPATCHED': 'status-absent'
    };
    return map[status] || '';
  }
}
