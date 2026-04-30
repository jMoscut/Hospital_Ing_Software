import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { interval, Subscription } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { ReportService } from '../../shared/services/payment.service';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-reporting',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatCardModule, MatButtonModule,
    MatIconModule, MatFormFieldModule, MatInputModule, MatTableModule,
    MatTabsModule, MatProgressSpinnerModule, MatSelectModule, MatChipsModule
  ],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Reportería y Estadísticas</h1>
      </div>

      <mat-tab-group animationDuration="150ms">

        <!-- ══ TAB: PACIENTES POR ÁREA ════════════════════════════════ -->
        <mat-tab label="Pacientes por Área">
          <div class="tab-content">
            <mat-card>
              <mat-card-header>
                <mat-icon mat-card-avatar>local_hospital</mat-icon>
                <mat-card-title>Pacientes Ingresados por Área</mat-card-title>
                <mat-card-subtitle>Reporte estadístico — sin datos identificativos</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="report-controls">
                  <mat-form-field appearance="outline" style="width:180px">
                    <mat-label>Período</mat-label>
                    <mat-select [(ngModel)]="areaPeriod">
                      <mat-option value="day">Hoy</mat-option>
                      <mat-option value="week">Esta Semana</mat-option>
                      <mat-option value="month">Este Mes</mat-option>
                      <mat-option value="year">Este Año</mat-option>
                    </mat-select>
                  </mat-form-field>
                  <button mat-raised-button color="primary" (click)="loadAreaReport()" [disabled]="areaLoading">
                    <mat-icon>bar_chart</mat-icon> Generar
                  </button>
                  <button mat-stroked-button (click)="printReport('area')" *ngIf="areaData" [disabled]="areaLoading">
                    <mat-icon>picture_as_pdf</mat-icon> Exportar PDF
                  </button>
                </div>

                <div class="flex-center mt-16" *ngIf="areaLoading"><mat-spinner diameter="36"></mat-spinner></div>

                <div *ngIf="areaData && !areaLoading" id="report-area">
                  <div class="report-meta">
                    <span>Total pacientes: <strong>{{ areaData.total }}</strong></span>
                    <span style="color:#9e9e9e">{{ areaData.from | date:'dd/MM/yyyy' }} — {{ areaData.to | date:'dd/MM/yyyy' }}</span>
                  </div>
                  <table mat-table [dataSource]="areaData.rows" class="mt-16 report-table">
                    <ng-container matColumnDef="area">
                      <th mat-header-cell *matHeaderCellDef>Área / Clínica</th>
                      <td mat-cell *matCellDef="let r">{{ r.area }}</td>
                    </ng-container>
                    <ng-container matColumnDef="count">
                      <th mat-header-cell *matHeaderCellDef>Pacientes</th>
                      <td mat-cell *matCellDef="let r"><strong>{{ r.count }}</strong></td>
                    </ng-container>
                    <ng-container matColumnDef="pct">
                      <th mat-header-cell *matHeaderCellDef>%</th>
                      <td mat-cell *matCellDef="let r">{{ areaData.total > 0 ? ((r.count / areaData.total) * 100 | number:'1.1-1') : 0 }}%</td>
                    </ng-container>
                    <tr mat-header-row *matHeaderRowDef="areaColumns"></tr>
                    <tr mat-row *matRowDef="let row; columns: areaColumns;"></tr>
                  </table>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <!-- ══ TAB: VENTAS FARMACIA ═══════════════════════════════════ -->
        <mat-tab label="Ventas Farmacia">
          <div class="tab-content">
            <mat-card>
              <mat-card-header>
                <mat-icon mat-card-avatar>medication</mat-icon>
                <mat-card-title>Ventas de Farmacia</mat-card-title>
                <mat-card-subtitle>Reporte estadístico — sin datos identificativos</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="report-controls">
                  <mat-form-field appearance="outline" style="width:180px">
                    <mat-label>Período</mat-label>
                    <mat-select [(ngModel)]="salePeriod">
                      <mat-option value="day">Hoy</mat-option>
                      <mat-option value="week">Esta Semana</mat-option>
                      <mat-option value="month">Este Mes</mat-option>
                      <mat-option value="year">Este Año</mat-option>
                    </mat-select>
                  </mat-form-field>
                  <button mat-raised-button color="primary" (click)="loadSaleReport()" [disabled]="saleLoading">
                    <mat-icon>bar_chart</mat-icon> Generar
                  </button>
                  <button mat-stroked-button (click)="printReport('sale')" *ngIf="saleData" [disabled]="saleLoading">
                    <mat-icon>picture_as_pdf</mat-icon> Exportar PDF
                  </button>
                </div>

                <div class="flex-center mt-16" *ngIf="saleLoading"><mat-spinner diameter="36"></mat-spinner></div>

                <div *ngIf="saleData && !saleLoading" id="report-sale">
                  <div class="report-meta">
                    <span>Total ventas: <strong>{{ saleData.totalSales }}</strong></span>
                    <span>Ingresos netos: <strong style="color:#2e7d32">Q{{ saleData.grandTotal | number:'1.2-2' }}</strong></span>
                    <span style="color:#9e9e9e">{{ saleData.from | date:'dd/MM/yyyy' }} — {{ saleData.to | date:'dd/MM/yyyy' }}</span>
                  </div>
                  <table mat-table [dataSource]="saleData.rows" class="mt-16 report-table">
                    <ng-container matColumnDef="date">
                      <th mat-header-cell *matHeaderCellDef>Fecha</th>
                      <td mat-cell *matCellDef="let r">{{ r.date }}</td>
                    </ng-container>
                    <ng-container matColumnDef="count">
                      <th mat-header-cell *matHeaderCellDef>Ventas</th>
                      <td mat-cell *matCellDef="let r"><strong>{{ r.count }}</strong></td>
                    </ng-container>
                    <ng-container matColumnDef="total">
                      <th mat-header-cell *matHeaderCellDef>Total (Q)</th>
                      <td mat-cell *matCellDef="let r"><strong>Q{{ r.total | number:'1.2-2' }}</strong></td>
                    </ng-container>
                    <tr mat-header-row *matHeaderRowDef="saleColumns"></tr>
                    <tr mat-row *matRowDef="let row; columns: saleColumns;"></tr>
                  </table>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <!-- ══ TAB: PRODUCTIVIDAD MÉDICA ══════════════════════════════ -->
        <mat-tab label="Productividad Médica">
          <div class="tab-content">
            <mat-card>
              <mat-card-header>
                <mat-icon mat-card-avatar>medical_services</mat-icon>
                <mat-card-title>Productividad por Médico</mat-card-title>
                <mat-card-subtitle>Consultas completadas — reporte estadístico</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="report-controls">
                  <mat-form-field appearance="outline" style="width:180px">
                    <mat-label>Período</mat-label>
                    <mat-select [(ngModel)]="docPeriod">
                      <mat-option value="day">Hoy</mat-option>
                      <mat-option value="week">Esta Semana</mat-option>
                      <mat-option value="month">Este Mes</mat-option>
                      <mat-option value="year">Este Año</mat-option>
                    </mat-select>
                  </mat-form-field>
                  <button mat-raised-button color="primary" (click)="loadDocReport()" [disabled]="docLoading">
                    <mat-icon>bar_chart</mat-icon> Generar
                  </button>
                  <button mat-stroked-button (click)="printReport('doc')" *ngIf="docData" [disabled]="docLoading">
                    <mat-icon>picture_as_pdf</mat-icon> Exportar PDF
                  </button>
                </div>

                <div class="flex-center mt-16" *ngIf="docLoading"><mat-spinner diameter="36"></mat-spinner></div>

                <div *ngIf="docData && !docLoading" id="report-doc">
                  <div class="report-meta">
                    <span style="color:#9e9e9e">{{ docData.from | date:'dd/MM/yyyy' }} — {{ docData.to | date:'dd/MM/yyyy' }}</span>
                  </div>
                  <table mat-table [dataSource]="docData.rows" class="mt-16 report-table">
                    <ng-container matColumnDef="doctor">
                      <th mat-header-cell *matHeaderCellDef>Médico</th>
                      <td mat-cell *matCellDef="let r"><strong>{{ r.doctor }}</strong></td>
                    </ng-container>
                    <ng-container matColumnDef="clinic">
                      <th mat-header-cell *matHeaderCellDef>Clínica</th>
                      <td mat-cell *matCellDef="let r">{{ r.clinic }}</td>
                    </ng-container>
                    <ng-container matColumnDef="consultations">
                      <th mat-header-cell *matHeaderCellDef>Consultas</th>
                      <td mat-cell *matCellDef="let r"><strong>{{ r.consultations }}</strong></td>
                    </ng-container>
                    <tr mat-header-row *matHeaderRowDef="docColumns"></tr>
                    <tr mat-row *matRowDef="let row; columns: docColumns;"></tr>
                  </table>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <!-- ══ TAB: EXÁMENES LAB ══════════════════════════════════════ -->
        <mat-tab label="Exámenes de Laboratorio">
          <div class="tab-content">
            <mat-card>
              <mat-card-header>
                <mat-icon mat-card-avatar>science</mat-icon>
                <mat-card-title>Exámenes Más Requeridos</mat-card-title>
                <mat-card-subtitle>Reporte estadístico — sin datos identificativos</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="report-controls">
                  <mat-form-field appearance="outline" style="width:180px">
                    <mat-label>Período</mat-label>
                    <mat-select [(ngModel)]="labPeriod">
                      <mat-option value="day">Hoy</mat-option>
                      <mat-option value="week">Esta Semana</mat-option>
                      <mat-option value="month">Este Mes</mat-option>
                      <mat-option value="year">Este Año</mat-option>
                    </mat-select>
                  </mat-form-field>
                  <button mat-raised-button color="primary" (click)="loadLabReport()" [disabled]="labLoading">
                    <mat-icon>bar_chart</mat-icon> Generar
                  </button>
                  <button mat-stroked-button (click)="printReport('lab')" *ngIf="labData" [disabled]="labLoading">
                    <mat-icon>picture_as_pdf</mat-icon> Exportar PDF
                  </button>
                </div>

                <div class="flex-center mt-16" *ngIf="labLoading"><mat-spinner diameter="36"></mat-spinner></div>

                <div *ngIf="labData && !labLoading" id="report-lab">
                  <div class="report-meta">
                    <span>Total órdenes: <strong>{{ labData.total }}</strong></span>
                    <span style="color:#9e9e9e">{{ labData.from | date:'dd/MM/yyyy' }} — {{ labData.to | date:'dd/MM/yyyy' }}</span>
                  </div>
                  <table mat-table [dataSource]="labData.rows" class="mt-16 report-table">
                    <ng-container matColumnDef="rank">
                      <th mat-header-cell *matHeaderCellDef>#</th>
                      <td mat-cell *matCellDef="let r; let i = index">{{ i + 1 }}</td>
                    </ng-container>
                    <ng-container matColumnDef="exam">
                      <th mat-header-cell *matHeaderCellDef>Examen</th>
                      <td mat-cell *matCellDef="let r"><strong>{{ r.exam }}</strong></td>
                    </ng-container>
                    <ng-container matColumnDef="count">
                      <th mat-header-cell *matHeaderCellDef>Solicitudes</th>
                      <td mat-cell *matCellDef="let r"><strong>{{ r.count }}</strong></td>
                    </ng-container>
                    <ng-container matColumnDef="pct">
                      <th mat-header-cell *matHeaderCellDef>%</th>
                      <td mat-cell *matCellDef="let r">{{ labData.total > 0 ? ((r.count / labData.total) * 100 | number:'1.1-1') : 0 }}%</td>
                    </ng-container>
                    <tr mat-header-row *matHeaderRowDef="labColumns"></tr>
                    <tr mat-row *matRowDef="let row; columns: labColumns;"></tr>
                  </table>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

      </mat-tab-group>
    </div>
  `,
  styles: [`
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .page-header h1 { font-size: 1.6rem; font-weight: 500; color: #1565c0; margin: 0; }
    .tab-content { padding: 24px 0; }
    .search-row { display: flex; gap: 12px; align-items: flex-end; margin-bottom: 8px; }
    .report-controls { display: flex; gap: 12px; align-items: flex-end; margin-bottom: 8px; flex-wrap: wrap; }
    .report-meta { display: flex; gap: 24px; align-items: center; flex-wrap: wrap; padding: 12px 0; font-size:.9rem; }
    .report-table { width: 100%; }
    .mt-16 { margin-top: 16px; }
    .flex-center { display: flex; justify-content: center; padding: 32px; }

    /* Expedient */
    .expedient-panel { background: #f8f9ff; border-radius: 8px; padding: 16px; margin-top: 8px; }
    .exp-header { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 16px; }
    .exp-code { font-family: monospace; font-size: 1.1rem; font-weight: 700; color: #1565c0; }
    .exp-name { font-size: 1rem; color: #333; }
    .exp-summary { display: flex; gap: 24px; margin-bottom: 16px; }
    .exp-stat { text-align: center; background: white; padding: 16px 24px; border-radius: 8px; }
    .exp-num { display: block; font-size: 2rem; font-weight: 700; color: #1565c0; }
    .exp-label { font-size: 0.8rem; color: #757575; }
    .exp-list { border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; margin-top: 8px; }
    .exp-list-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; cursor: pointer; border-bottom: 1px solid #f0f0f0; font-size: .9rem; }
    .exp-list-item:last-child { border-bottom: none; }
    .exp-list-item:hover { background: #e3f2fd; }

    @media print {
      body > * { display: none !important; }
      .print-section { display: block !important; }
    }
  `]
})
export class ReportingComponent implements OnInit, OnDestroy {
  private sub!: Subscription;

  // Expedient
  expSearch = '';
  expLoading = false;
  expedient: any = null;
  expList: any[] = [];
  ticketColumns = ['ticket', 'clinic', 'status', 'date'];

  // Patients per area
  areaPeriod = 'day';
  areaLoading = false;
  areaData: any = null;
  areaColumns = ['area', 'count', 'pct'];

  // Pharmacy sales
  salePeriod = 'day';
  saleLoading = false;
  saleData: any = null;
  saleColumns = ['date', 'count', 'total'];

  // Doctor productivity
  docPeriod = 'day';
  docLoading = false;
  docData: any = null;
  docColumns = ['doctor', 'clinic', 'consultations'];

  // Lab exams
  labPeriod = 'day';
  labLoading = false;
  labData: any = null;
  labColumns = ['rank', 'exam', 'count', 'pct'];

  constructor(
    private reportService: ReportService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.sub = this.reportService.getDashboard().subscribe();
  }

  searchExpedient(): void {
    if (!this.expSearch.trim()) return;
    this.expLoading = true;
    this.expedient = null;
    this.expList = [];
    this.reportService.searchExpedient(this.expSearch.trim()).subscribe({
      next: res => {
        if (res.success) {
          // Single expedient vs list
          if (Array.isArray(res.data)) {
            this.expList = res.data;
          } else {
            this.expedient = res.data;
          }
        } else {
          this.notification.error(res.message || 'No encontrado');
        }
        this.expLoading = false;
      },
      error: err => {
        this.notification.error(err.error?.message || 'Paciente no encontrado');
        this.expLoading = false;
      }
    });
  }

  loadExpedientById(patientCode: string): void {
    this.expLoading = true;
    this.reportService.getPatientExpedient(patientCode).subscribe({
      next: res => {
        if (res.success) { this.expedient = res.data; this.expList = []; }
        this.expLoading = false;
      },
      error: () => { this.notification.error('Error al cargar expediente'); this.expLoading = false; }
    });
  }

  loadAreaReport(): void {
    this.areaLoading = true;
    this.reportService.getPatientsPerArea(this.areaPeriod).subscribe({
      next: res => { if (res.success) this.areaData = res.data; this.areaLoading = false; },
      error: () => { this.notification.error('Error al cargar reporte'); this.areaLoading = false; }
    });
  }

  loadSaleReport(): void {
    this.saleLoading = true;
    this.reportService.getPharmacySales(this.salePeriod).subscribe({
      next: res => { if (res.success) this.saleData = res.data; this.saleLoading = false; },
      error: () => { this.notification.error('Error al cargar reporte'); this.saleLoading = false; }
    });
  }

  loadDocReport(): void {
    this.docLoading = true;
    this.reportService.getDoctorProductivity(this.docPeriod).subscribe({
      next: res => { if (res.success) this.docData = res.data; this.docLoading = false; },
      error: () => { this.notification.error('Error al cargar reporte'); this.docLoading = false; }
    });
  }

  loadLabReport(): void {
    this.labLoading = true;
    this.reportService.getLabExams(this.labPeriod).subscribe({
      next: res => { if (res.success) this.labData = res.data; this.labLoading = false; },
      error: () => { this.notification.error('Error al cargar reporte'); this.labLoading = false; }
    });
  }

  printReport(type: string): void {
    const ids: Record<string, string> = {
      area: 'report-area', sale: 'report-sale', doc: 'report-doc', lab: 'report-lab'
    };
    const el = document.getElementById(ids[type]);
    if (!el) return;
    const win = window.open('', '_blank', 'width=900,height=700');
    if (!win) return;
    win.document.write(`
      <html><head><title>Reporte BioCore</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 24px; }
        h2 { color: #193A31; }
        table { border-collapse: collapse; width: 100%; margin-top: 16px; }
        th { background: #193A31; color: white; padding: 8px 12px; text-align: left; }
        td { padding: 8px 12px; border-bottom: 1px solid #e0e0e0; }
        tr:nth-child(even) { background: #f9f9f9; }
        .meta { color: #555; margin-bottom: 8px; font-size: .9rem; }
        .anon-note { color: #888; font-size: .8rem; margin-top: 16px; border-top: 1px solid #eee; padding-top: 8px; }
        @media print { .no-print { display: none; } }
      </style></head><body>
      <h2>BioCore Medical — Reporte</h2>
      <p class="anon-note">⚠ Reporte estadístico anonimizado. No contiene datos personales identificables.</p>
      ${el.innerHTML}
      <p class="anon-note">Generado: ${new Date().toLocaleString('es-GT')}</p>
      <script>window.onload = () => { window.print(); }<\/script>
      </body></html>
    `);
    win.document.close();
  }

  printExpedient(): void {
    if (!this.expedient) return;
    const win = window.open('', '_blank', 'width=900,height=700');
    if (!win) return;
    const p = this.expedient.patient;
    const tickets = (this.expedient.tickets || [])
      .map((t: any) => `<tr><td>${t.ticketNumber || ''}</td><td>${t.clinicName || ''}</td><td>${t.status}</td><td>${new Date(t.createdAt).toLocaleDateString('es-GT')}</td></tr>`)
      .join('');
    win.document.write(`
      <html><head><title>Expediente ${p?.patientCode}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 24px; }
        h2 { color: #193A31; }
        table { border-collapse: collapse; width: 100%; margin-top: 16px; }
        th { background: #193A31; color: white; padding: 8px 12px; text-align: left; }
        td { padding: 8px 12px; border-bottom: 1px solid #e0e0e0; }
        @media print { .no-print { display: none; } }
      </style></head><body>
      <h2>Expediente Clínico — ${p?.patientCode}</h2>
      <p><strong>Paciente:</strong> ${p?.firstName} ${p?.lastName} &nbsp;|&nbsp; <strong>DPI:</strong> ${p?.dpi}</p>
      <table><thead><tr><th>Ticket</th><th>Área</th><th>Estado</th><th>Fecha</th></tr></thead>
      <tbody>${tickets}</tbody></table>
      <p style="color:#888;font-size:.8rem;margin-top:16px">Impreso: ${new Date().toLocaleString('es-GT')}</p>
      <script>window.onload = () => { window.print(); }<\/script>
      </body></html>
    `);
    win.document.close();
  }

  ngOnDestroy(): void { this.sub?.unsubscribe(); }
}
