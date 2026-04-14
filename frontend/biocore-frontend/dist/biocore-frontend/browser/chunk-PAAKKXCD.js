import {
  MatProgressSpinnerModule
} from "./chunk-AY5RGERM.js";
import {
  NotificationService
} from "./chunk-7NN3FNQB.js";
import "./chunk-DMTJYVKR.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-KK4M4ZLY.js";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableModule
} from "./chunk-PQZQB5KY.js";
import "./chunk-7TOHHRAU.js";
import {
  ReportService
} from "./chunk-J5AYJ3WZ.js";
import "./chunk-TFS6RWUB.js";
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
  MatPrefix
} from "./chunk-SJJOW5UO.js";
import {
  DefaultValueAccessor,
  FormControl,
  FormControlDirective,
  NgControlStatus,
  ReactiveFormsModule
} from "./chunk-2NM6KC74.js";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardSubtitle,
  MatCardTitle
} from "./chunk-IVAI7UHG.js";
import {
  CommonModule,
  DatePipe,
  MatButton,
  MatButtonModule,
  MatIcon,
  MatIconModule,
  NgIf,
  interval,
  startWith,
  switchMap,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-R33V2XU6.js";

// src/app/modules/reporting/reporting.component.ts
var _c0 = () => [];
function ReportingComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "mat-card", 17)(2, "mat-icon");
    \u0275\u0275text(3, "today");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 18);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 19);
    \u0275\u0275text(7, "Pacientes Hoy");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "mat-card", 20)(9, "mat-icon");
    \u0275\u0275text(10, "hourglass_empty");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 18);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 19);
    \u0275\u0275text(14, "En Espera");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "mat-card", 21)(16, "mat-icon");
    \u0275\u0275text(17, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 18);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 19);
    \u0275\u0275text(21, "Atendidos");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "mat-card", 22)(23, "mat-icon");
    \u0275\u0275text(24, "cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 18);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 19);
    \u0275\u0275text(28, "Cancelados");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "mat-card", 23)(30, "mat-icon");
    \u0275\u0275text(31, "payments");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "div", 18);
    \u0275\u0275text(33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "div", 19);
    \u0275\u0275text(35, "Pagos Hoy");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.dashboard.totalPatientsToday);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.dashboard.patientsWaiting);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.dashboard.patientsAttended);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.dashboard.patientsCancelled);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.dashboard.totalPaidToday);
  }
}
function ReportingComponent_div_25_th_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 38);
    \u0275\u0275text(1, "Ticket");
    \u0275\u0275elementEnd();
  }
}
function ReportingComponent_div_25_td_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 39);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r2.ticketNumber);
  }
}
function ReportingComponent_div_25_th_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 38);
    \u0275\u0275text(1, "Cl\xEDnica");
    \u0275\u0275elementEnd();
  }
}
function ReportingComponent_div_25_td_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 39);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r3.clinicName);
  }
}
function ReportingComponent_div_25_th_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 38);
    \u0275\u0275text(1, "Estado");
    \u0275\u0275elementEnd();
  }
}
function ReportingComponent_div_25_td_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 39);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r4.status);
  }
}
function ReportingComponent_div_25_th_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 38);
    \u0275\u0275text(1, "Fecha");
    \u0275\u0275elementEnd();
  }
}
function ReportingComponent_div_25_td_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 39);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, t_r5.createdAt, "dd/MM/yyyy"));
  }
}
function ReportingComponent_div_25_tr_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 40);
  }
}
function ReportingComponent_div_25_tr_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 41);
  }
}
function ReportingComponent_div_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "h3");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 25)(4, "div", 26)(5, "span", 27);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 28);
    \u0275\u0275text(8, "Visitas");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 26)(10, "span", 27);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 28);
    \u0275\u0275text(13, "Pagos");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "table", 29);
    \u0275\u0275elementContainerStart(15, 30);
    \u0275\u0275template(16, ReportingComponent_div_25_th_16_Template, 2, 0, "th", 31)(17, ReportingComponent_div_25_td_17_Template, 2, 1, "td", 32);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(18, 33);
    \u0275\u0275template(19, ReportingComponent_div_25_th_19_Template, 2, 0, "th", 31)(20, ReportingComponent_div_25_td_20_Template, 2, 1, "td", 32);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(21, 34);
    \u0275\u0275template(22, ReportingComponent_div_25_th_22_Template, 2, 0, "th", 31)(23, ReportingComponent_div_25_td_23_Template, 2, 1, "td", 32);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(24, 35);
    \u0275\u0275template(25, ReportingComponent_div_25_th_25_Template, 2, 0, "th", 31)(26, ReportingComponent_div_25_td_26_Template, 3, 4, "td", 32);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(27, ReportingComponent_div_25_tr_27_Template, 1, 0, "tr", 36)(28, ReportingComponent_div_25_tr_28_Template, 1, 0, "tr", 37);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Expediente: ", ctx_r0.expedient.patient == null ? null : ctx_r0.expedient.patient.patientCode, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate((ctx_r0.expedient.tickets == null ? null : ctx_r0.expedient.tickets.length) || 0);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate((ctx_r0.expedient.payments == null ? null : ctx_r0.expedient.payments.length) || 0);
    \u0275\u0275advance(3);
    \u0275\u0275property("dataSource", ctx_r0.expedient.tickets || \u0275\u0275pureFunction0(6, _c0));
    \u0275\u0275advance(13);
    \u0275\u0275property("matHeaderRowDef", ctx_r0.ticketColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r0.ticketColumns);
  }
}
var ReportingComponent = class _ReportingComponent {
  constructor(reportService, notification) {
    this.reportService = reportService;
    this.notification = notification;
    this.dashboard = null;
    this.expedient = null;
    this.searchCtrl = new FormControl("");
    this.ticketColumns = ["ticket", "clinic", "status", "date"];
  }
  ngOnInit() {
    this.sub = interval(15e3).pipe(startWith(0), switchMap(() => this.reportService.getDashboard())).subscribe((res) => {
      if (res.success)
        this.dashboard = res.data;
    });
  }
  searchPatient() {
    const code = this.searchCtrl.value;
    if (!code)
      return;
    this.reportService.getPatientExpedient(code).subscribe({
      next: (res) => {
        if (res.success) {
          this.expedient = res.data;
        } else {
          this.notification.error("Paciente no encontrado");
        }
      },
      error: () => this.notification.error("Paciente no encontrado con c\xF3digo: " + code)
    });
  }
  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
  static {
    this.\u0275fac = function ReportingComponent_Factory(t) {
      return new (t || _ReportingComponent)(\u0275\u0275directiveInject(ReportService), \u0275\u0275directiveInject(NotificationService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ReportingComponent, selectors: [["app-reporting"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 48, vars: 4, consts: [[1, "page-container"], [1, "page-header"], [1, "realtime-badge"], ["class", "dashboard-grid", 4, "ngIf"], [1, "mt-24"], [1, "search-row"], ["appearance", "outline"], ["matPrefix", ""], ["matInput", "", "placeholder", "PAT-0001", 3, "formControl"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], ["class", "expedient-panel", 4, "ngIf"], [1, "export-buttons"], ["mat-raised-button", "", "color", "primary"], ["mat-raised-button", "", "color", "accent"], ["mat-raised-button", ""], [1, "hint-text", "mt-16"], [1, "dashboard-grid"], [1, "stat-card", 2, "background", "linear-gradient(135deg,#1565c0,#1976d2)", "color", "white"], [1, "stat-number"], [1, "stat-label"], [1, "stat-card", 2, "background", "linear-gradient(135deg,#e65100,#f57c00)", "color", "white"], [1, "stat-card", 2, "background", "linear-gradient(135deg,#2e7d32,#388e3c)", "color", "white"], [1, "stat-card", 2, "background", "linear-gradient(135deg,#b71c1c,#c62828)", "color", "white"], [1, "stat-card", 2, "background", "linear-gradient(135deg,#00695c,#00796b)", "color", "white"], [1, "expedient-panel"], [1, "exp-summary"], [1, "exp-stat"], [1, "exp-num"], [1, "exp-label"], ["mat-table", "", 1, "mt-16", 3, "dataSource"], ["matColumnDef", "ticket"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "clinic"], ["matColumnDef", "status"], ["matColumnDef", "date"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", ""], ["mat-header-row", ""], ["mat-row", ""]], template: function ReportingComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
        \u0275\u0275text(3, "Reporter\xEDa y Estad\xEDsticas (CU5)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "span", 2)(5, "mat-icon");
        \u0275\u0275text(6, "radio_button_checked");
        \u0275\u0275elementEnd();
        \u0275\u0275text(7, " Actualizaci\xF3n en tiempo real (RN-R03) ");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(8, ReportingComponent_div_8_Template, 36, 5, "div", 3);
        \u0275\u0275elementStart(9, "mat-card", 4)(10, "mat-card-header")(11, "mat-card-title");
        \u0275\u0275text(12, "B\xFAsqueda de Expediente por C\xF3digo (RN-R01)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "mat-card-subtitle");
        \u0275\u0275text(14, "RN-R02: Los reportes estad\xEDsticos no muestran nombres de pacientes");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(15, "mat-card-content")(16, "div", 5)(17, "mat-form-field", 6)(18, "mat-label");
        \u0275\u0275text(19, "C\xF3digo \xDAnico de Paciente");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "mat-icon", 7);
        \u0275\u0275text(21, "search");
        \u0275\u0275elementEnd();
        \u0275\u0275element(22, "input", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "button", 9);
        \u0275\u0275listener("click", function ReportingComponent_Template_button_click_23_listener() {
          return ctx.searchPatient();
        });
        \u0275\u0275text(24, " Buscar Expediente ");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(25, ReportingComponent_div_25_Template, 29, 7, "div", 10);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(26, "mat-card", 4)(27, "mat-card-header")(28, "mat-card-title");
        \u0275\u0275text(29, "Exportaci\xF3n de Reportes (RN-R04)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "mat-card-subtitle");
        \u0275\u0275text(31, "Solo el Administrador puede exportar reportes financieros");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(32, "mat-card-content")(33, "div", 11)(34, "button", 12)(35, "mat-icon");
        \u0275\u0275text(36, "picture_as_pdf");
        \u0275\u0275elementEnd();
        \u0275\u0275text(37, " Reporte de Productividad ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(38, "button", 13)(39, "mat-icon");
        \u0275\u0275text(40, "picture_as_pdf");
        \u0275\u0275elementEnd();
        \u0275\u0275text(41, " Reporte por \xC1rea ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(42, "button", 14)(43, "mat-icon");
        \u0275\u0275text(44, "picture_as_pdf");
        \u0275\u0275elementEnd();
        \u0275\u0275text(45, " Reporte de Farmacia ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(46, "p", 15);
        \u0275\u0275text(47, "* La exportaci\xF3n a PDF requiere integraci\xF3n con librer\xEDa PDF en el backend.");
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275property("ngIf", ctx.dashboard);
        \u0275\u0275advance(14);
        \u0275\u0275property("formControl", ctx.searchCtrl);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", !ctx.searchCtrl.value);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.expedient);
      }
    }, dependencies: [CommonModule, NgIf, DatePipe, ReactiveFormsModule, DefaultValueAccessor, NgControlStatus, FormControlDirective, MatCardModule, MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle, MatButtonModule, MatButton, MatIconModule, MatIcon, MatFormFieldModule, MatFormField, MatLabel, MatPrefix, MatInputModule, MatInput, MatTableModule, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatProgressSpinnerModule], styles: ["\n\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.6rem;\n  font-weight: 500;\n  color: #1565c0;\n  margin: 0;\n}\n.realtime-badge[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  background: #e8f5e9;\n  color: #2e7d32;\n  padding: 4px 12px;\n  border-radius: 16px;\n  font-size: 0.8rem;\n}\n.stat-card[_ngcontent-%COMP%] {\n  padding: 24px;\n  text-align: center;\n}\n.stat-card[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 36px;\n  width: 36px;\n  height: 36px;\n  opacity: 0.85;\n}\n.stat-number[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  font-weight: 700;\n  line-height: 1;\n  margin: 8px 0;\n}\n.stat-label[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  opacity: 0.9;\n}\n.search-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: flex-end;\n  margin-bottom: 16px;\n}\n.expedient-panel[_ngcontent-%COMP%] {\n  background: #f8f9ff;\n  border-radius: 8px;\n  padding: 16px;\n}\n.expedient-panel[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #1565c0;\n  margin-bottom: 12px;\n}\n.exp-summary[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 24px;\n  margin-bottom: 16px;\n}\n.exp-stat[_ngcontent-%COMP%] {\n  text-align: center;\n  background: white;\n  padding: 16px 24px;\n  border-radius: 8px;\n}\n.exp-num[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 2rem;\n  font-weight: 700;\n  color: #1565c0;\n}\n.exp-label[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #757575;\n}\n.mt-16[_ngcontent-%COMP%] {\n  margin-top: 16px;\n}\n.mt-24[_ngcontent-%COMP%] {\n  margin-top: 24px;\n}\n.export-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.hint-text[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #757575;\n}\n/*# sourceMappingURL=reporting.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ReportingComponent, { className: "ReportingComponent", filePath: "src\\app\\modules\\reporting\\reporting.component.ts", lineNumber: 163 });
})();
export {
  ReportingComponent
};
//# sourceMappingURL=chunk-PAAKKXCD.js.map
