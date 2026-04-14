import {
  AuthService
} from "./chunk-N3CSS5F2.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-AY5RGERM.js";
import {
  RouterLink
} from "./chunk-ZOTSATNJ.js";
import {
  MatChipsModule
} from "./chunk-IFZAJIVN.js";
import {
  TicketService
} from "./chunk-UTJYQ6K7.js";
import {
  ReportService
} from "./chunk-J5AYJ3WZ.js";
import "./chunk-SJJOW5UO.js";
import "./chunk-2NM6KC74.js";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle
} from "./chunk-IVAI7UHG.js";
import {
  CommonModule,
  MatButton,
  MatButtonModule,
  MatIcon,
  MatIconModule,
  NgForOf,
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
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate2
} from "./chunk-R33V2XU6.js";

// src/app/modules/portal/dashboard/dashboard.component.ts
function DashboardComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "mat-card", 13)(2, "mat-icon");
    \u0275\u0275text(3, "today");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 14);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 15);
    \u0275\u0275text(7, "Pacientes Hoy");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "mat-card", 16)(9, "mat-icon");
    \u0275\u0275text(10, "hourglass_empty");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 14);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 15);
    \u0275\u0275text(14, "En Espera");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "mat-card", 17)(16, "mat-icon");
    \u0275\u0275text(17, "medical_services");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 14);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 15);
    \u0275\u0275text(21, "En Consulta");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "mat-card", 18)(23, "mat-icon");
    \u0275\u0275text(24, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 14);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 15);
    \u0275\u0275text(28, "Atendidos");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "mat-card", 19)(30, "mat-icon");
    \u0275\u0275text(31, "cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "div", 14);
    \u0275\u0275text(33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "div", 15);
    \u0275\u0275text(35, "Cancelados");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "mat-card", 20)(37, "mat-icon");
    \u0275\u0275text(38, "payments");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "div", 14);
    \u0275\u0275text(40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "div", 15);
    \u0275\u0275text(42, "Pagos Hoy");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.dashboard.totalPatientsToday);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.dashboard.patientsWaiting);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.dashboard.patientsInConsultation);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.dashboard.patientsAttended);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.dashboard.patientsCancelled);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.dashboard.totalPaidToday);
  }
}
function DashboardComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275element(1, "mat-spinner", 22);
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_button_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 23)(1, "mat-icon");
    \u0275\u0275text(2, "emergency");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Emergencia ");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_button_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 24)(1, "mat-icon");
    \u0275\u0275text(2, "bar_chart");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Reportes ");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_mat_card_25_div_5_span_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 33);
    \u0275\u0275text(1, "URGENTE");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_mat_card_25_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26)(1, "div", 27);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 28)(4, "div", 29);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 30);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "span", 31);
    \u0275\u0275text(9, " Siendo Llamado ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, DashboardComponent_mat_card_25_div_5_span_10_Template, 2, 0, "span", 32);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ticket_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ticket_r2.ticketNumber);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ticket_r2.patientName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ticket_r2.clinicName, " \xB7 ", ticket_r2.type, "");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ticket_r2.priority === "URGENT");
  }
}
function DashboardComponent_mat_card_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 5)(1, "mat-card-header")(2, "mat-card-title");
    \u0275\u0275text(3, "Pacientes Siendo Llamados");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "mat-card-content");
    \u0275\u0275template(5, DashboardComponent_mat_card_25_div_5_Template, 11, 5, "div", 25);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx_r0.activeTickets);
  }
}
var DashboardComponent = class _DashboardComponent {
  constructor(reportService, ticketService, authService) {
    this.reportService = reportService;
    this.ticketService = ticketService;
    this.authService = authService;
    this.dashboard = null;
    this.activeTickets = [];
  }
  ngOnInit() {
    this.sub = interval(1e4).pipe(startWith(0), switchMap(() => this.reportService.getDashboard())).subscribe((res) => {
      if (res.success)
        this.dashboard = res.data;
    });
    this.loadActiveTickets();
  }
  loadActiveTickets() {
    this.ticketService.getAll().subscribe((res) => {
      if (res.success) {
        this.activeTickets = res.data.filter((t) => t.status === "BEING_CALLED");
      }
    });
  }
  isAdmin() {
    return this.authService.hasRole("ADMIN");
  }
  canAccessEmergency() {
    return this.authService.hasRole("ADMIN", "HEALTH_STAFF", "NURSE");
  }
  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
  static {
    this.\u0275fac = function DashboardComponent_Factory(t) {
      return new (t || _DashboardComponent)(\u0275\u0275directiveInject(ReportService), \u0275\u0275directiveInject(TicketService), \u0275\u0275directiveInject(AuthService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-dashboard"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 26, vars: 5, consts: [[1, "page-container"], [1, "page-header"], [1, "realtime-badge"], ["class", "dashboard-grid", 4, "ngIf"], ["class", "flex-center mt-24", 4, "ngIf"], [1, "mt-24"], [1, "quick-actions"], ["mat-raised-button", "", "color", "primary", "routerLink", "/patients/register"], ["mat-raised-button", "", "color", "accent", "routerLink", "/emergency", 4, "ngIf"], ["mat-raised-button", "", "routerLink", "/patients"], ["mat-raised-button", "", "routerLink", "/reports", 4, "ngIf"], ["class", "mt-24", 4, "ngIf"], [1, "dashboard-grid"], [1, "stat-card", "stat-blue"], [1, "stat-number"], [1, "stat-label"], [1, "stat-card", "stat-orange"], [1, "stat-card", "stat-green"], [1, "stat-card", "stat-purple"], [1, "stat-card", "stat-red"], [1, "stat-card", "stat-teal"], [1, "flex-center", "mt-24"], ["diameter", "48"], ["mat-raised-button", "", "color", "accent", "routerLink", "/emergency"], ["mat-raised-button", "", "routerLink", "/reports"], ["class", "queue-ticket", 4, "ngFor", "ngForOf"], [1, "queue-ticket"], [1, "ticket-number"], [1, "ticket-info"], [1, "ticket-patient"], [1, "ticket-meta"], [1, "status-being-called", 2, "padding", "4px 12px", "border-radius", "12px", "font-size", "0.8rem"], ["class", "emergency-badge", 4, "ngIf"], [1, "emergency-badge"]], template: function DashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
        \u0275\u0275text(3, "Dashboard");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "span", 2)(5, "mat-icon");
        \u0275\u0275text(6, "radio_button_checked");
        \u0275\u0275elementEnd();
        \u0275\u0275text(7, " En tiempo real ");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(8, DashboardComponent_div_8_Template, 43, 6, "div", 3)(9, DashboardComponent_div_9_Template, 2, 0, "div", 4);
        \u0275\u0275elementStart(10, "mat-card", 5)(11, "mat-card-header")(12, "mat-card-title");
        \u0275\u0275text(13, "Acciones R\xE1pidas");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(14, "mat-card-content", 6)(15, "button", 7)(16, "mat-icon");
        \u0275\u0275text(17, "person_add");
        \u0275\u0275elementEnd();
        \u0275\u0275text(18, " Registrar Paciente ");
        \u0275\u0275elementEnd();
        \u0275\u0275template(19, DashboardComponent_button_19_Template, 4, 0, "button", 8);
        \u0275\u0275elementStart(20, "button", 9)(21, "mat-icon");
        \u0275\u0275text(22, "search");
        \u0275\u0275elementEnd();
        \u0275\u0275text(23, " Buscar Paciente ");
        \u0275\u0275elementEnd();
        \u0275\u0275template(24, DashboardComponent_button_24_Template, 4, 0, "button", 10);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(25, DashboardComponent_mat_card_25_Template, 6, 1, "mat-card", 11);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275property("ngIf", ctx.dashboard);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.dashboard);
        \u0275\u0275advance(10);
        \u0275\u0275property("ngIf", ctx.canAccessEmergency());
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", ctx.isAdmin());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.activeTickets.length > 0);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, RouterLink, MatCardModule, MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatIconModule, MatIcon, MatButtonModule, MatButton, MatProgressSpinnerModule, MatProgressSpinner, MatChipsModule], styles: ["\n\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.6rem;\n  font-weight: 500;\n  color: #1565c0;\n  margin: 0;\n}\n.realtime-badge[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  background: #e8f5e9;\n  color: #2e7d32;\n  padding: 4px 12px;\n  border-radius: 16px;\n  font-size: 0.8rem;\n  font-weight: 500;\n}\n.realtime-badge[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n}\n.stat-card[_ngcontent-%COMP%] {\n  padding: 24px;\n  text-align: center;\n  color: white;\n}\n.stat-card[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 36px;\n  width: 36px;\n  height: 36px;\n  opacity: 0.85;\n}\n.stat-number[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  font-weight: 700;\n  line-height: 1;\n  margin: 8px 0;\n}\n.stat-label[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  opacity: 0.9;\n}\n.stat-blue[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #1565c0,\n      #1976d2);\n}\n.stat-orange[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #e65100,\n      #f57c00);\n}\n.stat-green[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #2e7d32,\n      #388e3c);\n}\n.stat-purple[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #6a1b9a,\n      #7b1fa2);\n}\n.stat-red[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #b71c1c,\n      #c62828);\n}\n.stat-teal[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #00695c,\n      #00796b);\n}\n.quick-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n  padding: 8px 0;\n}\n/*# sourceMappingURL=dashboard.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "src\\app\\modules\\portal\\dashboard\\dashboard.component.ts", lineNumber: 137 });
})();
export {
  DashboardComponent
};
//# sourceMappingURL=chunk-SUUEFPBO.js.map
