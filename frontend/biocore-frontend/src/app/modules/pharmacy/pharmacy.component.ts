import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MedicineService, PrescriptionService, PharmacySaleService } from '../../shared/services/lab.service';
import { PatientService } from '../../shared/services/patient.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Medicine, Prescription, PharmacySale } from '../../core/models/lab.model';

interface CartItem {
  medicine: Medicine;
  quantity: number;
  subtotal: number;
}

@Component({
  selector: 'app-pharmacy',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MatCardModule, MatButtonModule, MatIconModule,
    MatTabsModule, MatTableModule, MatChipsModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatDividerModule, MatProgressSpinnerModule, RouterLink
  ],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Farmacia</h1>
      </div>

      <mat-tab-group animationDuration="200ms">

        <!-- ═══════════════════════════════════════════════════════════
             TAB 1: VENTA SIN RECETA (OTC)
        ════════════════════════════════════════════════════════════ -->
        <mat-tab label="Venta Libre (OTC)">
          <div class="tab-content otc-layout">

            <!-- Medicine catalogue -->
            <div class="catalogue-panel">
              <mat-card>
                <mat-card-header>
                  <mat-card-title>Catálogo de Medicamentos</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <div class="filter-row">
                    <mat-form-field appearance="outline" style="flex:1">
                      <mat-label>Buscar</mat-label>
                      <mat-icon matPrefix>search</mat-icon>
                      <input matInput [(ngModel)]="otcSearch" placeholder="Nombre o código...">
                    </mat-form-field>
                    <mat-form-field appearance="outline" style="width:160px">
                      <mat-label>Categoría</mat-label>
                      <mat-select [(ngModel)]="otcCategory">
                        <mat-option value="">Todas</mat-option>
                        <mat-option *ngFor="let c of categories" [value]="c">{{ c }}</mat-option>
                      </mat-select>
                    </mat-form-field>
                  </div>

                  <div *ngIf="loadingMeds" class="flex-center mt-16"><mat-spinner diameter="36"></mat-spinner></div>

                  <div class="medicine-grid" *ngIf="!loadingMeds">
                    <div class="medicine-card"
                         *ngFor="let m of filteredMedicines"
                         [class.out-of-stock]="m.stock === 0">
                      <div class="med-header">
                        <span class="med-code" *ngIf="m.code">{{ m.code }}</span>
                        <span class="med-name">{{ m.name }}</span>
                      </div>
                      <div class="med-meta">{{ m.presentation }} · {{ m.category }}</div>
                      <div class="med-footer">
                        <div>
                          <div class="med-price">Q{{ m.price | number:'1.2-2' }}</div>
                          <div class="med-stock" [class.low]="m.stock <= 10">Stock: {{ m.stock }} {{ m.unit }}</div>
                        </div>
                        <button mat-mini-fab color="primary"
                                [disabled]="m.stock === 0"
                                (click)="addToCart(m)"
                                title="Agregar al carrito">
                          <mat-icon>add_shopping_cart</mat-icon>
                        </button>
                      </div>
                    </div>
                    <div *ngIf="filteredMedicines.length === 0" class="empty-grid">
                      <mat-icon>medication</mat-icon><p>Sin resultados</p>
                    </div>
                  </div>
                </mat-card-content>
              </mat-card>
            </div>

            <!-- Cart -->
            <div class="cart-panel">
              <mat-card class="cart-card">
                <mat-card-header>
                  <mat-icon mat-card-avatar>shopping_cart</mat-icon>
                  <mat-card-title>Carrito</mat-card-title>
                  <mat-card-subtitle>{{ cart.length }} ítem(s)</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                  <div *ngIf="cart.length === 0" class="empty-cart">
                    <mat-icon>remove_shopping_cart</mat-icon>
                    <p>Carrito vacío</p>
                  </div>

                  <div class="cart-items" *ngIf="cart.length > 0">
                    <div class="cart-item" *ngFor="let item of cart; let i = index">
                      <div class="cart-item-info">
                        <div class="cart-item-name">{{ item.medicine.name }}</div>
                        <div class="cart-item-meta">{{ item.medicine.presentation }} · Q{{ item.medicine.price | number:'1.2-2' }} c/u</div>
                      </div>
                      <div class="cart-qty">
                        <button mat-icon-button (click)="decreaseQty(i)" [disabled]="item.quantity <= 1">
                          <mat-icon>remove</mat-icon>
                        </button>
                        <span>{{ item.quantity }}</span>
                        <button mat-icon-button (click)="increaseQty(i)" [disabled]="item.quantity >= item.medicine.stock">
                          <mat-icon>add</mat-icon>
                        </button>
                      </div>
                      <div class="cart-subtotal">Q{{ item.subtotal | number:'1.2-2' }}</div>
                      <button mat-icon-button color="warn" (click)="removeFromCart(i)">
                        <mat-icon>delete</mat-icon>
                      </button>
                    </div>

                    <mat-divider style="margin:12px 0"></mat-divider>
                    <div class="cart-total">
                      <span>Total:</span>
                      <strong>Q{{ cartTotal | number:'1.2-2' }}</strong>
                    </div>
                  </div>

                  <div class="cart-patient" *ngIf="cart.length > 0">
                    <mat-form-field appearance="outline" class="w-full">
                      <mat-label>Buscar Paciente (opcional)</mat-label>
                      <mat-icon matPrefix>person_search</mat-icon>
                      <input matInput [(ngModel)]="patientDpiSearch" placeholder="DPI del paciente"
                             maxlength="13" pattern="[0-9]*" inputmode="numeric"
                             (keypress)="$event.charCode >= 48 && $event.charCode <= 57 || $event.preventDefault()"
                             (keyup.enter)="patientDpiSearch.length === 13 && searchPatient()"
                             (ngModelChange)="patientNotFound = false; foundPatient = null; otcPaymentMode = ''; otcCashReceived = 0">
                      <button matSuffix mat-icon-button (click)="searchPatient()" [disabled]="patientDpiSearch.length !== 13">
                        <mat-icon>search</mat-icon>
                      </button>
                    </mat-form-field>
                    <div *ngIf="foundPatient" class="patient-found">
                      <mat-icon style="color:#2e7d32">check_circle</mat-icon>
                      <span>{{ foundPatient.firstName }} {{ foundPatient.lastName }} · {{ foundPatient.patientCode }}</span>
                      <button mat-icon-button (click)="foundPatient = null; patientNotFound = false; patientDpiSearch = ''; otcPaymentMode = ''; otcCashReceived = 0">
                        <mat-icon>close</mat-icon>
                      </button>
                    </div>
                    <div *ngIf="patientNotFound && !foundPatient" class="patient-not-found">
                      <mat-icon style="color:#e65100">person_off</mat-icon>
                      <span>Paciente con DPI <strong>{{ patientDpiSearch }}</strong> no registrado</span>
                      <button mat-stroked-button color="primary"
                              [routerLink]="['/patients/register']">
                        <mat-icon>person_add</mat-icon> Registrar Paciente
                      </button>
                    </div>

                    <!-- Payment method chooser -->
                    <div *ngIf="!foundPatient" class="patient-required-warn" style="margin-top:10px">
                      <mat-icon style="color:#9e9e9e;font-size:18px;width:18px;height:18px">info</mat-icon>
                      <span style="color:#757575;font-size:.875rem">Busca y selecciona un paciente para continuar con el pago</span>
                    </div>
                    <div class="pay-method-row" style="margin-top:12px" *ngIf="foundPatient">
                      <button mat-raised-button class="pay-btn"
                              [class.pay-active]="otcPaymentMode === 'pos'"
                              (click)="otcPaymentMode = 'pos'; otcCashReceived = 0">
                        <mat-icon>credit_card</mat-icon> POS
                      </button>
                      <button mat-raised-button class="pay-btn"
                              [class.pay-active]="otcPaymentMode === 'cash'"
                              (click)="otcPaymentMode = 'cash'; otcCashReceived = 0">
                        <mat-icon>payments</mat-icon> Efectivo
                      </button>
                    </div>

                    <!-- POS sub-options -->
                    <div *ngIf="otcPaymentMode === 'pos'" class="pos-options">
                      <button mat-raised-button color="primary" style="flex:1"
                              [disabled]="processing"
                              (click)="processOtcSale('DEBIT_CARD')">
                        <mat-icon>credit_card</mat-icon>
                        {{ processing ? 'Procesando...' : 'Débito — Q' + (cartTotal | number:'1.2-2') }}
                      </button>
                      <button mat-raised-button color="accent" style="flex:1"
                              [disabled]="processing"
                              (click)="processOtcSale('CREDIT_CARD')">
                        <mat-icon>credit_score</mat-icon>
                        {{ processing ? 'Procesando...' : 'Crédito — Q' + (cartTotal | number:'1.2-2') }}
                      </button>
                    </div>

                    <!-- Cash flow -->
                    <div *ngIf="otcPaymentMode === 'cash'" class="cash-flow">
                      <mat-form-field appearance="outline" class="w-full">
                        <mat-label>Monto recibido (Q)</mat-label>
                        <span matPrefix>Q&nbsp;</span>
                        <input matInput type="number" [(ngModel)]="otcCashReceived" min="0" step="0.50">
                      </mat-form-field>
                      <div class="change-row" *ngIf="otcCashReceived > 0">
                        <span>Total:</span><strong>Q{{ cartTotal | number:'1.2-2' }}</strong>
                        <span style="margin-left:12px">Vuelto:</span>
                        <strong [class.change-ok]="otcCashReceived >= cartTotal"
                                [class.change-short]="otcCashReceived < cartTotal">
                          Q{{ (otcCashReceived - cartTotal) | number:'1.2-2' }}
                        </strong>
                      </div>
                      <button mat-raised-button color="primary" class="w-full"
                              [disabled]="otcCashReceived < cartTotal || processing"
                              (click)="processOtcSale('CASH')">
                        <mat-icon>payments</mat-icon>
                        {{ processing ? 'Procesando...' : 'Confirmar Pago — Q' + (cartTotal | number:'1.2-2') }}
                      </button>
                    </div>
                  </div>
                </mat-card-content>
              </mat-card>

              <!-- Completed sale receipt -->
              <mat-card class="receipt-card" *ngIf="lastSale">
                <mat-card-header>
                  <mat-icon mat-card-avatar style="color:#2e7d32">receipt</mat-icon>
                  <mat-card-title>Venta Completada</mat-card-title>
                  <mat-card-subtitle>{{ lastSale.invoiceNumber }}</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                  <div class="receipt-row"><span>Código:</span><strong>{{ lastSale.saleCode }}</strong></div>
                  <div class="receipt-row"><span>Total:</span><strong>Q{{ lastSale.totalAmount | number:'1.2-2' }}</strong></div>
                  <div class="receipt-row" *ngIf="lastSale.discountAmount > 0">
                    <span>Descuento:</span><strong>Q{{ lastSale.discountAmount | number:'1.2-2' }}</strong>
                  </div>
                  <div class="receipt-row" *ngIf="lastSale.discountAmount > 0">
                    <span>Neto:</span><strong>Q{{ lastSale.netAmount | number:'1.2-2' }}</strong>
                  </div>
                  <div class="receipt-row"><span>Método:</span><strong>{{ lastSale.paymentMethod }}</strong></div>
                  <div *ngIf="lastSale.patientEmail" class="email-sent">
                    <mat-icon style="font-size:16px;width:16px;height:16px">email</mat-icon>
                    Comprobante enviado a {{ lastSale.patientEmail }}
                  </div>
                </mat-card-content>
              </mat-card>
            </div>
          </div>
        </mat-tab>

        <!-- ═══════════════════════════════════════════════════════════
             TAB 2: VENTA CON RECETA
        ════════════════════════════════════════════════════════════ -->
        <mat-tab label="Despacho con Receta">
          <div class="tab-content">

            <!-- Search bar -->
            <mat-card style="margin-bottom:16px">
              <mat-card-content style="padding-top:16px">
                <div class="rx-search-row">
                  <mat-form-field appearance="outline" style="flex:1">
                    <mat-label>Código de Receta (REC-XXXXX)</mat-label>
                    <mat-icon matPrefix>receipt_long</mat-icon>
                    <input matInput [(ngModel)]="rxCodeSearch" placeholder="REC-00001" (keyup.enter)="searchByCode()">
                  </mat-form-field>
                  <button mat-raised-button color="primary" (click)="searchByCode()" [disabled]="!rxCodeSearch || rxLoading">
                    <mat-icon>search</mat-icon> Buscar
                  </button>

                  <span style="color:#9e9e9e;padding:0 8px">ó</span>

                  <mat-form-field appearance="outline" style="flex:1">
                    <mat-label>DPI del Paciente</mat-label>
                    <mat-icon matPrefix>badge</mat-icon>
                    <input matInput [(ngModel)]="rxDpiSearch" placeholder="DPI del paciente" (keyup.enter)="searchByDpi()">
                  </mat-form-field>
                  <button mat-raised-button color="accent" (click)="searchByDpi()" [disabled]="!rxDpiSearch || rxLoading">
                    <mat-icon>person_search</mat-icon> Buscar por DPI
                  </button>
                </div>
              </mat-card-content>
            </mat-card>

            <div *ngIf="rxLoading" class="flex-center"><mat-spinner diameter="40"></mat-spinner></div>

            <!-- Results list -->
            <div *ngIf="rxResults.length > 0 && !selectedRx" class="rx-results">
              <div class="rx-result-item" *ngFor="let p of rxResults" (click)="selectRx(p)">
                <mat-icon>receipt_long</mat-icon>
                <div style="flex:1">
                  <div class="rx-code">{{ p.code || 'Sin código' }}</div>
                  <div class="rx-patient">{{ p.patientName }} · DPI: {{ p.patientDpi }}</div>
                  <div class="rx-meta">{{ p.items.length }} medicamento(s) · {{ p.createdAt | date:'dd/MM/yyyy' }}</div>
                </div>
                <span [class]="getRxStatusClass(p.status)">{{ p.status }}</span>
              </div>
            </div>

            <!-- Prescription detail -->
            <div *ngIf="selectedRx" class="rx-detail">
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
                <button mat-button (click)="selectedRx = null; rxResults = []">
                  <mat-icon>arrow_back</mat-icon> Volver
                </button>
                <h3 style="margin:0">Receta {{ selectedRx.code || '#' + selectedRx.id }}</h3>
                <span [class]="getRxStatusClass(selectedRx.status)" style="padding:2px 10px;border-radius:12px">
                  {{ selectedRx.status }}
                </span>
              </div>

              <div class="rx-detail-grid">
                <mat-card>
                  <mat-card-header><mat-card-title>Información</mat-card-title></mat-card-header>
                  <mat-card-content>
                    <div class="info-row"><mat-icon>person</mat-icon>{{ selectedRx.patientName }}</div>
                    <div class="info-row"><mat-icon>badge</mat-icon>DPI: {{ selectedRx.patientDpi }}</div>
                    <div class="info-row"><mat-icon>local_hospital</mat-icon>Dr. {{ selectedRx.doctorName }}</div>
                    <div class="info-row"><mat-icon>calendar_today</mat-icon>{{ selectedRx.createdAt | date:'dd/MM/yyyy HH:mm' }}</div>
                    <div *ngIf="selectedRx.notes" class="info-row"><mat-icon>notes</mat-icon>{{ selectedRx.notes }}</div>
                  </mat-card-content>
                </mat-card>

                <mat-card>
                  <mat-card-header><mat-card-title>Medicamentos Prescritos</mat-card-title></mat-card-header>
                  <mat-card-content>
                    <div class="rx-item" *ngFor="let item of selectedRx.items">
                      <div style="flex:1">
                        <div style="display:flex;align-items:center;gap:6px">
                          <span class="med-code" *ngIf="item.medicine?.code">{{ item.medicine?.code }}</span>
                          <strong>{{ item.medicineName || item.medicine?.name }}</strong>
                          <mat-icon style="font-size:16px;width:16px;color:#2e7d32" *ngIf="item.dispatched">check_circle</mat-icon>
                        </div>
                        <div class="rx-item-meta">
                          Cantidad: {{ item.quantity }}
                          <span *ngIf="item.dosage"> · {{ item.dosage }}</span>
                        </div>
                        <div *ngIf="item.medicine" class="stock-info"
                             [class.stock-warn]="item.medicine.stock < item.quantity">
                          Stock: {{ item.medicine.stock }}
                          <span *ngIf="item.medicine.stock < item.quantity"> ⚠ Insuficiente</span>
                        </div>
                      </div>
                      <div *ngIf="item.medicine && !item.dispatched" class="rx-item-price">
                        Q{{ item.medicine.price | number:'1.2-2' }} × {{ item.quantity }} =
                        <strong>Q{{ (item.medicine.price * item.quantity) | number:'1.2-2' }}</strong>
                      </div>
                    </div>

                    <mat-divider style="margin:12px 0"></mat-divider>
                    <div class="cart-total">
                      <span>Total estimado:</span>
                      <strong>Q{{ rxTotal | number:'1.2-2' }}</strong>
                    </div>
                  </mat-card-content>
                </mat-card>
              </div>

              <mat-card style="margin-top:16px" *ngIf="selectedRx.status !== 'DISPATCHED'">
                <mat-card-content style="padding:16px">
                  <div *ngIf="rxHasStockIssue" class="stock-warn-msg" style="margin-bottom:12px">
                    <mat-icon>warning</mat-icon> Stock insuficiente para algunos medicamentos
                  </div>

                  <!-- Payment chooser -->
                  <div class="pay-method-row" *ngIf="!rxHasStockIssue">
                    <button mat-raised-button class="pay-btn"
                            [class.pay-active]="rxPaymentMode === 'pos'"
                            (click)="rxPaymentMode = 'pos'; rxCashReceived = 0">
                      <mat-icon>credit_card</mat-icon> POS
                    </button>
                    <button mat-raised-button class="pay-btn"
                            [class.pay-active]="rxPaymentMode === 'cash'"
                            (click)="rxPaymentMode = 'cash'; rxCashReceived = 0">
                      <mat-icon>payments</mat-icon> Efectivo
                    </button>
                  </div>

                  <!-- POS sub-options -->
                  <div *ngIf="rxPaymentMode === 'pos'" class="pos-options" style="margin-top:12px">
                    <button mat-raised-button color="primary" style="flex:1"
                            [disabled]="rxProcessing"
                            (click)="processRxSale('DEBIT_CARD')">
                      <mat-icon>credit_card</mat-icon>
                      {{ rxProcessing ? 'Procesando...' : 'Débito — Q' + (rxTotal | number:'1.2-2') }}
                    </button>
                    <button mat-raised-button color="accent" style="flex:1"
                            [disabled]="rxProcessing"
                            (click)="processRxSale('CREDIT_CARD')">
                      <mat-icon>credit_score</mat-icon>
                      {{ rxProcessing ? 'Procesando...' : 'Crédito — Q' + (rxTotal | number:'1.2-2') }}
                    </button>
                  </div>

                  <!-- Cash flow -->
                  <div *ngIf="rxPaymentMode === 'cash'" class="cash-flow" style="margin-top:12px">
                    <mat-form-field appearance="outline" style="width:240px">
                      <mat-label>Monto recibido (Q)</mat-label>
                      <span matPrefix>Q&nbsp;</span>
                      <input matInput type="number" [(ngModel)]="rxCashReceived" min="0" step="0.50">
                    </mat-form-field>
                    <div class="change-row" *ngIf="rxCashReceived > 0">
                      <span>Total:</span><strong>Q{{ rxTotal | number:'1.2-2' }}</strong>
                      <span style="margin-left:12px">Vuelto:</span>
                      <strong [class.change-ok]="rxCashReceived >= rxTotal"
                              [class.change-short]="rxCashReceived < rxTotal">
                        Q{{ (rxCashReceived - rxTotal) | number:'1.2-2' }}
                      </strong>
                    </div>
                    <button mat-raised-button color="primary"
                            [disabled]="rxCashReceived < rxTotal || rxProcessing"
                            (click)="processRxSale('CASH')">
                      <mat-icon>payments</mat-icon>
                      {{ rxProcessing ? 'Procesando...' : 'Confirmar Pago — Q' + (rxTotal | number:'1.2-2') }}
                    </button>
                  </div>
                </mat-card-content>
              </mat-card>
            </div>

            <div *ngIf="!rxLoading && rxResults.length === 0 && rxSearched" class="empty-search">
              <mat-icon>search_off</mat-icon>
              <p>No se encontraron recetas</p>
            </div>
          </div>
        </mat-tab>

        <!-- ═══════════════════════════════════════════════════════════
             TAB 3: INVENTARIO
        ════════════════════════════════════════════════════════════ -->
        <mat-tab label="Inventario">
          <div class="tab-content">
            <div class="inventory-toolbar">
              <button mat-raised-button color="primary" (click)="openMedicineForm()">
                <mat-icon>add</mat-icon> Nuevo Medicamento
              </button>
              <mat-form-field appearance="outline" style="width:280px">
                <mat-label>Buscar en inventario</mat-label>
                <mat-icon matPrefix>search</mat-icon>
                <input matInput [(ngModel)]="inventorySearch" placeholder="Nombre o código...">
              </mat-form-field>
            </div>

            <mat-card>
              <mat-card-content>
                <table mat-table [dataSource]="filteredInventory" class="w-full">
                  <ng-container matColumnDef="code">
                    <th mat-header-cell *matHeaderCellDef>Código</th>
                    <td mat-cell *matCellDef="let m">
                      <span class="med-code" *ngIf="m.code">{{ m.code }}</span>
                      <span *ngIf="!m.code" style="color:#bbb">—</span>
                    </td>
                  </ng-container>
                  <ng-container matColumnDef="name">
                    <th mat-header-cell *matHeaderCellDef>Medicamento</th>
                    <td mat-cell *matCellDef="let m">
                      <strong>{{ m.name }}</strong>
                      <div class="med-meta">{{ m.presentation }}</div>
                    </td>
                  </ng-container>
                  <ng-container matColumnDef="category">
                    <th mat-header-cell *matHeaderCellDef>Categoría</th>
                    <td mat-cell *matCellDef="let m">
                      <span class="category-chip" *ngIf="m.category">{{ m.category }}</span>
                    </td>
                  </ng-container>
                  <ng-container matColumnDef="stock">
                    <th mat-header-cell *matHeaderCellDef>Stock</th>
                    <td mat-cell *matCellDef="let m">
                      <span [class.stock-low]="m.stock <= 10" [class.stock-ok]="m.stock > 10">
                        {{ m.stock }} <small>{{ m.unit }}</small>
                      </span>
                    </td>
                  </ng-container>
                  <ng-container matColumnDef="price">
                    <th mat-header-cell *matHeaderCellDef>Precio</th>
                    <td mat-cell *matCellDef="let m">Q{{ m.price | number:'1.2-2' }}</td>
                  </ng-container>
                  <ng-container matColumnDef="actions">
                    <th mat-header-cell *matHeaderCellDef>Acciones</th>
                    <td mat-cell *matCellDef="let m">
                      <button mat-icon-button color="primary" title="Editar" (click)="openMedicineForm(m)">
                        <mat-icon>edit</mat-icon>
                      </button>
                      <button mat-icon-button color="accent" title="Ajustar stock" (click)="openStockDialog(m)">
                        <mat-icon>inventory</mat-icon>
                      </button>
                      <button mat-icon-button color="warn" title="Eliminar" (click)="confirmDeleteMedicine(m)">
                        <mat-icon>delete</mat-icon>
                      </button>
                    </td>
                  </ng-container>
                  <tr mat-header-row *matHeaderRowDef="inventoryColumns"></tr>
                  <tr mat-row *matRowDef="let row; columns: inventoryColumns;"></tr>
                </table>
                <div *ngIf="filteredInventory.length === 0" class="empty-grid">
                  <mat-icon>medication</mat-icon><p>Sin medicamentos en inventario</p>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

      </mat-tab-group>
    </div>

    <!-- ═══ MEDICINE FORM DIALOG ════════════════════════════════════ -->
    <div class="overlay" *ngIf="medicineDialogOpen">
      <mat-card class="dialog-card">
        <mat-card-header>
          <mat-icon mat-card-avatar>medication</mat-icon>
          <mat-card-title>{{ editingMedicine ? 'Editar Medicamento' : 'Nuevo Medicamento' }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="medicineForm" class="medicine-form-grid">
            <mat-form-field appearance="outline">
              <mat-label>Código (ej. FAR-046)</mat-label>
              <input matInput formControlName="code" placeholder="FAR-XXX">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Nombre *</mat-label>
              <input matInput formControlName="name">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Presentación</mat-label>
              <input matInput formControlName="presentation" placeholder="Tableta, Jarabe...">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Categoría</mat-label>
              <input matInput formControlName="category" placeholder="Antibiótico, AINE...">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Unidad</mat-label>
              <input matInput formControlName="unit" placeholder="Tableta, ml, mg...">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Precio *</mat-label>
              <span matPrefix>Q&nbsp;</span>
              <input matInput type="number" formControlName="price" min="0">
            </mat-form-field>
            <mat-form-field appearance="outline" *ngIf="!editingMedicine">
              <mat-label>Stock inicial</mat-label>
              <input matInput type="number" formControlName="stock" min="0">
            </mat-form-field>
            <mat-form-field appearance="outline" style="grid-column:1/-1">
              <mat-label>Descripción</mat-label>
              <textarea matInput formControlName="description" rows="2"></textarea>
            </mat-form-field>
          </form>
        </mat-card-content>
        <mat-card-actions style="display:flex;gap:8px;padding:16px">
          <button mat-raised-button color="primary"
                  [disabled]="medicineForm.invalid || savingMedicine"
                  (click)="saveMedicine()">
            <mat-icon>save</mat-icon> {{ savingMedicine ? 'Guardando...' : 'Guardar' }}
          </button>
          <button mat-button (click)="medicineDialogOpen = false">Cancelar</button>
        </mat-card-actions>
      </mat-card>
    </div>

    <!-- ═══ STOCK ADJUST DIALOG ══════════════════════════════════════ -->
    <div class="overlay" *ngIf="stockDialogOpen">
      <mat-card class="dialog-card" style="width:360px">
        <mat-card-header>
          <mat-icon mat-card-avatar>inventory</mat-icon>
          <mat-card-title>Ajustar Stock</mat-card-title>
          <mat-card-subtitle *ngIf="adjustingMedicine">{{ adjustingMedicine.name }} · Actual: {{ adjustingMedicine.stock }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content style="padding:16px">
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Cantidad a agregar (negativo para restar)</mat-label>
            <input matInput type="number" [(ngModel)]="stockAdjust">
          </mat-form-field>
        </mat-card-content>
        <mat-card-actions style="display:flex;gap:8px;padding:16px">
          <button mat-raised-button color="primary" [disabled]="stockAdjust === 0 || savingStock" (click)="saveStock()">
            <mat-icon>save</mat-icon> {{ savingStock ? 'Guardando...' : 'Ajustar' }}
          </button>
          <button mat-button (click)="stockDialogOpen = false">Cancelar</button>
        </mat-card-actions>
      </mat-card>
    </div>

    <!-- ═══ DELETE MEDICINE CONFIRM ═══════════════════════════════════ -->
    <div class="overlay" *ngIf="deleteDialogOpen">
      <mat-card class="dialog-card" style="width:380px;max-height:unset">
        <mat-card-header>
          <mat-icon mat-card-avatar style="color:#c62828">warning</mat-icon>
          <mat-card-title>Eliminar Medicamento</mat-card-title>
          <mat-card-subtitle *ngIf="deletingMedicine">{{ deletingMedicine.name }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content style="padding:16px">
          <p>¿Desea desactivar este medicamento del catálogo?</p>
        </mat-card-content>
        <mat-card-actions style="display:flex;gap:8px;padding:16px">
          <button mat-raised-button color="warn" [disabled]="deleting" (click)="deleteMedicine()">
            <mat-icon>delete</mat-icon> {{ deleting ? 'Eliminando...' : 'Eliminar' }}
          </button>
          <button mat-button (click)="deleteDialogOpen = false">Cancelar</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .page-header h1 { font-size: 1.6rem; font-weight: 500; color: #1565c0; margin: 0; }
    .tab-content { padding: 24px 0; }
    .otc-layout { display: grid; grid-template-columns: 1fr 340px; gap: 24px; }
    .filter-row { display: flex; gap: 12px; margin-bottom: 8px; align-items: flex-end; }
    .medicine-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px; max-height: 520px; overflow-y: auto; }
    .medicine-card { border: 1px solid #e0e0e0; border-radius: 8px; padding: 12px; transition: box-shadow .2s; }
    .medicine-card:hover { box-shadow: 0 2px 8px rgba(0,0,0,.15); }
    .medicine-card.out-of-stock { opacity: .5; }
    .med-header { display: flex; flex-direction: column; gap: 2px; margin-bottom: 4px; }
    .med-name { font-weight: 600; font-size: .9rem; }
    .med-meta { font-size: .75rem; color: #757575; margin-bottom: 8px; }
    .med-footer { display: flex; justify-content: space-between; align-items: flex-end; }
    .med-price { font-size: 1rem; font-weight: 700; color: #1565c0; }
    .med-stock { font-size: .75rem; color: #555; }
    .med-stock.low { color: #c62828; font-weight: 600; }
    .cart-card { position: sticky; top: 16px; }
    .empty-cart { display: flex; flex-direction: column; align-items: center; padding: 32px; color: #9e9e9e; }
    .empty-cart mat-icon { font-size: 48px; width: 48px; height: 48px; }
    .cart-items { max-height: 300px; overflow-y: auto; }
    .cart-item { display: flex; align-items: center; gap: 8px; padding: 6px 0; border-bottom: 1px solid #f0f0f0; }
    .cart-item-info { flex: 1; }
    .cart-item-name { font-weight: 500; font-size: .88rem; }
    .cart-item-meta { font-size: .75rem; color: #777; }
    .cart-qty { display: flex; align-items: center; gap: 4px; }
    .cart-qty span { min-width: 20px; text-align: center; font-weight: 600; }
    .cart-subtotal { min-width: 70px; text-align: right; font-weight: 600; color: #1565c0; font-size: .88rem; }
    .cart-total { display: flex; justify-content: space-between; font-size: 1.1rem; padding: 4px 0; }
    .cart-patient { margin-top: 16px; display: flex; flex-direction: column; gap: 8px; }
    .patient-found { display: flex; align-items: center; gap: 8px; padding: 8px 12px; background: #e8f5e9; border-radius: 8px; font-size: .88rem; }
    .receipt-card { margin-top: 16px; border-left: 4px solid #2e7d32; }
    .receipt-row { display: flex; justify-content: space-between; padding: 4px 0; font-size: .9rem; }
    .email-sent { display: flex; align-items: center; gap: 6px; font-size: .8rem; color: #1565c0; margin-top: 8px; }
    .rx-search-row { display: flex; gap: 12px; align-items: flex-end; flex-wrap: wrap; }
    .rx-results { display: flex; flex-direction: column; gap: 8px; }
    .rx-result-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border: 1px solid #e0e0e0; border-radius: 8px; cursor: pointer; transition: background .2s; }
    .rx-result-item:hover { background: #f5f5f5; }
    .rx-code { font-family: monospace; font-weight: 700; color: #1565c0; }
    .rx-patient { font-size: .9rem; }
    .rx-meta { font-size: .8rem; color: #757575; }
    .rx-detail-grid { display: grid; grid-template-columns: 300px 1fr; gap: 16px; }
    .info-row { display: flex; align-items: center; gap: 8px; padding: 4px 0; font-size: .9rem; }
    .info-row mat-icon { font-size: 18px; width: 18px; height: 18px; color: #757575; }
    .rx-item { display: flex; align-items: flex-start; gap: 12px; padding: 8px; border-radius: 6px; background: #f8f9ff; margin-bottom: 6px; }
    .rx-item-meta { font-size: .82rem; color: #555; }
    .rx-item-price { font-size: .85rem; color: #1565c0; white-space: nowrap; }
    .stock-info { font-size: .78rem; color: #555; }
    .stock-warn { color: #c62828; font-weight: 600; }
    .stock-warn-msg { display: flex; align-items: center; gap: 6px; color: #c62828; font-size: .88rem; }
    .empty-search { display: flex; flex-direction: column; align-items: center; padding: 48px; color: #9e9e9e; }
    .empty-search mat-icon { font-size: 48px; width: 48px; height: 48px; }
    .inventory-toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
    .w-full { width: 100%; }
    .med-code { font-family: monospace; font-size: .75rem; color: #1D6C61; background: #d0f4ef; padding: 1px 6px; border-radius: 4px; }
    .category-chip { background: #e8f5f3; color: #1D6C61; padding: 2px 8px; border-radius: 8px; font-size: .78rem; }
    .stock-low { color: #c62828; font-weight: 700; }
    .stock-ok { color: #2e7d32; }
    .inventory-columns mat-header-cell { font-weight: 600; }
    .overlay { position: fixed; inset: 0; background: rgba(0,0,0,.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .dialog-card { width: 560px; max-height: 90vh; overflow-y: auto; }
    .medicine-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 8px; }
    .flex-center { display: flex; justify-content: center; padding: 32px; }
    .empty-grid { display: flex; flex-direction: column; align-items: center; padding: 32px; color: #9e9e9e; }
    .empty-grid mat-icon { font-size: 48px; width: 48px; height: 48px; margin-bottom: 8px; }
    .status-pending { background: #fff3e0; color: #e65100; padding: 2px 8px; border-radius: 8px; font-size: .75rem; }
    .status-dispatched { background: #e8f5e9; color: #2e7d32; padding: 2px 8px; border-radius: 8px; font-size: .75rem; }
    .status-partial { background: #e3f2fd; color: #1565c0; padding: 2px 8px; border-radius: 8px; font-size: .75rem; }
    .patient-not-found { display: flex; align-items: center; gap: 8px; padding: 10px 12px; background: #fff3e0; border-radius: 8px; border: 1px solid #ffcc80; font-size: .9rem; flex-wrap: wrap; }
    .patient-required-warn { display: flex; align-items: center; gap: 6px; padding: 8px 12px; background: #f5f5f5; border-radius: 8px; }
    .pay-method-row { display: flex; gap: 12px; margin-bottom: 4px; }
    .pay-btn { flex: 1; height: 48px; font-size: 1rem; border: 2px solid #e0e0e0; background: #fafafa; }
    .pay-btn.pay-active { border-color: #1565c0; background: #e3f2fd; color: #1565c0; }
    .pos-options { display: flex; gap: 12px; }
    .cash-flow { display: flex; flex-direction: column; gap: 8px; }
    .change-row { display: flex; align-items: center; gap: 8px; padding: 8px 12px; background: #f5f5f5; border-radius: 8px; font-size: .95rem; }
    .change-ok { color: #2e7d32; font-size: 1.1rem; }
    .change-short { color: #c62828; font-size: 1.1rem; }
  `]
})
export class PharmacyComponent implements OnInit {

  // ── Shared ──────────────────────────────────────────────────────────
  medicines: Medicine[] = [];
  categories: string[] = [];
  loadingMeds = true;
  inventoryColumns = ['code', 'name', 'category', 'stock', 'price', 'actions'];

  // ── Tab 1: OTC ───────────────────────────────────────────────────────
  otcSearch = '';
  otcCategory = '';
  cart: CartItem[] = [];
  patientDpiSearch = '';
  foundPatient: any = null;
  patientNotFound = false;
  otcPaymentMode: '' | 'pos' | 'cash' = '';
  otcCashReceived = 0;
  processing = false;
  lastSale: PharmacySale | null = null;

  // ── Tab 2: Prescription ──────────────────────────────────────────────
  rxCodeSearch = '';
  rxDpiSearch = '';
  rxResults: Prescription[] = [];
  selectedRx: Prescription | null = null;
  rxLoading = false;
  rxSearched = false;
  rxPaymentMode: '' | 'pos' | 'cash' = '';
  rxCashReceived = 0;
  rxProcessing = false;

  // ── Tab 3: Inventory ─────────────────────────────────────────────────
  inventorySearch = '';
  medicineDialogOpen = false;
  editingMedicine: Medicine | null = null;
  medicineForm!: FormGroup;
  savingMedicine = false;

  stockDialogOpen = false;
  adjustingMedicine: Medicine | null = null;
  stockAdjust = 0;
  savingStock = false;

  deleteDialogOpen = false;
  deletingMedicine: Medicine | null = null;
  deleting = false;

  constructor(
    private fb: FormBuilder,
    private medicineService: MedicineService,
    private prescriptionService: PrescriptionService,
    private pharmacySaleService: PharmacySaleService,
    private patientService: PatientService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadMedicines();
  }

  loadMedicines(): void {
    this.loadingMeds = true;
    this.medicineService.getAll().subscribe({
      next: res => {
        if (res.success) {
          this.medicines = res.data;
          this.categories = [...new Set(this.medicines.filter(m => m.category).map(m => m.category!))].sort();
        }
        this.loadingMeds = false;
      },
      error: () => { this.loadingMeds = false; }
    });
  }

  // ── Computed ────────────────────────────────────────────────────────
  get filteredMedicines(): Medicine[] {
    return this.medicines.filter(m => {
      const q = this.otcSearch.toLowerCase();
      const matchSearch = !q || m.name.toLowerCase().includes(q) || (m.code || '').toLowerCase().includes(q);
      const matchCat = !this.otcCategory || m.category === this.otcCategory;
      return matchSearch && matchCat;
    });
  }

  get filteredInventory(): Medicine[] {
    const q = this.inventorySearch.toLowerCase();
    if (!q) return this.medicines;
    return this.medicines.filter(m =>
      m.name.toLowerCase().includes(q) || (m.code || '').toLowerCase().includes(q)
    );
  }

  get cartTotal(): number {
    return this.cart.reduce((s, i) => s + i.subtotal, 0);
  }

  get rxTotal(): number {
    if (!this.selectedRx) return 0;
    return this.selectedRx.items
      .filter(i => !i.dispatched && i.medicine)
      .reduce((s, i) => s + (i.medicine!.price * i.quantity), 0);
  }

  get rxHasStockIssue(): boolean {
    if (!this.selectedRx) return false;
    return this.selectedRx.items.some(i => !i.dispatched && i.medicine && i.medicine.stock < i.quantity);
  }

  // ── Tab 1: OTC Methods ───────────────────────────────────────────────
  addToCart(m: Medicine): void {
    const existing = this.cart.find(i => i.medicine.id === m.id);
    if (existing) {
      if (existing.quantity < m.stock) {
        existing.quantity++;
        existing.subtotal = existing.medicine.price * existing.quantity;
      }
    } else {
      this.cart.push({ medicine: m, quantity: 1, subtotal: m.price });
    }
  }

  increaseQty(i: number): void {
    const item = this.cart[i];
    if (item.quantity < item.medicine.stock) {
      item.quantity++;
      item.subtotal = item.medicine.price * item.quantity;
    }
  }

  decreaseQty(i: number): void {
    const item = this.cart[i];
    if (item.quantity > 1) {
      item.quantity--;
      item.subtotal = item.medicine.price * item.quantity;
    }
  }

  removeFromCart(i: number): void {
    this.cart.splice(i, 1);
  }

  searchPatient(): void {
    if (!this.patientDpiSearch) return;
    this.patientNotFound = false;
    this.patientService.getByDpi(this.patientDpiSearch).subscribe({
      next: res => {
        if (res.success && res.data) {
          this.foundPatient = res.data;
          this.patientNotFound = false;
        } else {
          this.patientNotFound = true;
        }
      },
      error: () => { this.patientNotFound = true; }
    });
  }

  processOtcSale(method: string): void {
    if (!method || this.cart.length === 0) return;
    this.processing = true;
    const req = {
      patientId: this.foundPatient?.id ?? undefined,
      items: this.cart.map(i => ({ medicineId: i.medicine.id, quantity: i.quantity }))
    };
    this.pharmacySaleService.reserve(req).subscribe({
      next: reserveRes => {
        if (!reserveRes.success) {
          this.notification.error(reserveRes.message || 'Error al reservar');
          this.processing = false;
          return;
        }
        const saleId = reserveRes.data.id;
        this.pharmacySaleService.complete(saleId, method, this.foundPatient?.id).subscribe({
          next: completeRes => {
            if (completeRes.success) {
              this.lastSale = completeRes.data;
              this.notification.success('Venta procesada · ' + completeRes.data.invoiceNumber);
              this.cart = [];
              this.foundPatient = null;
              this.patientDpiSearch = '';
              this.otcPaymentMode = '';
              this.otcCashReceived = 0;
              this.loadMedicines();
            }
            this.processing = false;
          },
          error: err => {
            this.notification.error(err.error?.message || 'Error al procesar pago');
            this.pharmacySaleService.cancel(saleId).subscribe();
            this.processing = false;
          }
        });
      },
      error: err => {
        this.notification.error(err.error?.message || 'Error al reservar');
        this.processing = false;
      }
    });
  }

  // ── Tab 2: Prescription Methods ──────────────────────────────────────
  searchByCode(): void {
    if (!this.rxCodeSearch) return;
    this.rxLoading = true;
    this.rxSearched = true;
    this.rxResults = [];
    this.selectedRx = null;
    this.prescriptionService.getByCode(this.rxCodeSearch.trim().toUpperCase()).subscribe({
      next: res => {
        if (res.success && res.data) this.rxResults = [res.data];
        this.rxLoading = false;
      },
      error: () => { this.rxLoading = false; }
    });
  }

  searchByDpi(): void {
    if (!this.rxDpiSearch) return;
    this.rxLoading = true;
    this.rxSearched = true;
    this.rxResults = [];
    this.selectedRx = null;
    this.prescriptionService.getByDpi(this.rxDpiSearch.trim()).subscribe({
      next: res => {
        if (res.success) this.rxResults = res.data;
        this.rxLoading = false;
      },
      error: () => { this.rxLoading = false; }
    });
  }

  selectRx(p: Prescription): void {
    this.selectedRx = p;
    this.rxPaymentMode = '';
    this.rxCashReceived = 0;
  }

  processRxSale(method: string): void {
    if (!this.selectedRx || !method) return;
    this.rxProcessing = true;
    const undispatchedItems = this.selectedRx.items.filter(i => !i.dispatched && i.medicine);
    const req = {
      patientId: this.selectedRx.patientId,
      prescriptionId: this.selectedRx.id,
      items: undispatchedItems.map(i => ({ medicineId: i.medicine!.id, quantity: i.quantity }))
    };
    this.pharmacySaleService.reserve(req).subscribe({
      next: reserveRes => {
        if (!reserveRes.success) {
          this.notification.error(reserveRes.message || 'Error al reservar');
          this.rxProcessing = false;
          return;
        }
        const saleId = reserveRes.data.id;
        this.pharmacySaleService.complete(saleId, method).subscribe({
          next: completeRes => {
            if (completeRes.success) {
              this.notification.success('Despacho completado · ' + completeRes.data.invoiceNumber);
              this.selectedRx = null;
              this.rxResults = [];
              this.rxSearched = false;
              this.rxCodeSearch = '';
              this.rxDpiSearch = '';
              this.rxPaymentMode = '';
              this.rxCashReceived = 0;
              this.loadMedicines();
            }
            this.rxProcessing = false;
          },
          error: err => {
            this.notification.error(err.error?.message || 'Error al procesar pago');
            this.pharmacySaleService.cancel(saleId).subscribe();
            this.rxProcessing = false;
          }
        });
      },
      error: err => {
        this.notification.error(err.error?.message || 'Error al reservar medicamentos');
        this.rxProcessing = false;
      }
    });
  }

  getRxStatusClass(status: string): string {
    const map: Record<string, string> = {
      PENDING: 'status-pending',
      DISPATCHED: 'status-dispatched',
      PARTIALLY_DISPATCHED: 'status-partial'
    };
    return map[status] || '';
  }

  // ── Tab 3: Inventory Methods ─────────────────────────────────────────
  openMedicineForm(m?: Medicine): void {
    this.editingMedicine = m || null;
    this.medicineForm = this.fb.group({
      code:         [m?.code || ''],
      name:         [m?.name || '',         Validators.required],
      presentation: [m?.presentation || ''],
      category:     [m?.category || ''],
      unit:         [m?.unit || ''],
      price:        [m?.price || 0,         [Validators.required, Validators.min(0)]],
      stock:        [0],
      description:  [m?.description || '']
    });
    this.medicineDialogOpen = true;
  }

  saveMedicine(): void {
    if (this.medicineForm.invalid) return;
    this.savingMedicine = true;
    const data = this.medicineForm.value;
    const obs = this.editingMedicine
      ? this.medicineService.update(this.editingMedicine.id, data)
      : this.medicineService.create(data);
    obs.subscribe({
      next: res => {
        if (res.success) {
          this.notification.success(this.editingMedicine ? 'Medicamento actualizado' : 'Medicamento creado');
          this.medicineDialogOpen = false;
          this.loadMedicines();
        }
        this.savingMedicine = false;
      },
      error: err => {
        this.notification.error(err.error?.message || 'Error al guardar');
        this.savingMedicine = false;
      }
    });
  }

  openStockDialog(m: Medicine): void {
    this.adjustingMedicine = m;
    this.stockAdjust = 0;
    this.stockDialogOpen = true;
  }

  saveStock(): void {
    if (!this.adjustingMedicine || this.stockAdjust === 0) return;
    this.savingStock = true;
    this.medicineService.updateStock(this.adjustingMedicine.id, this.stockAdjust).subscribe({
      next: res => {
        if (res.success) {
          this.notification.success('Stock actualizado');
          this.stockDialogOpen = false;
          this.loadMedicines();
        }
        this.savingStock = false;
      },
      error: err => {
        this.notification.error(err.error?.message || 'Error al ajustar stock');
        this.savingStock = false;
      }
    });
  }

  confirmDeleteMedicine(m: Medicine): void {
    this.deletingMedicine = m;
    this.deleteDialogOpen = true;
  }

  deleteMedicine(): void {
    if (!this.deletingMedicine) return;
    this.deleting = true;
    this.medicineService.delete(this.deletingMedicine.id).subscribe({
      next: res => {
        if (res.success) {
          this.notification.success('Medicamento eliminado');
          this.deleteDialogOpen = false;
          this.loadMedicines();
        }
        this.deleting = false;
      },
      error: err => {
        this.notification.error(err.error?.message || 'Error al eliminar');
        this.deleting = false;
      }
    });
  }
}
