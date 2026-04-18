import {
  LabService
} from "./chunk-6SNY3ZGW.js";
import {
  MatTab,
  MatTabGroup,
  MatTabsModule
} from "./chunk-IFA7BXQN.js";
import {
  MatTableModule
} from "./chunk-SMV43QNY.js";
import {
  MatChip,
  MatChipsModule
} from "./chunk-PA55PL57.js";
import {
  TicketService
} from "./chunk-VSICXZFN.js";
import {
  PaymentService
} from "./chunk-LDLLK6DA.js";
import {
  PatientService
} from "./chunk-SM4IRFQU.js";
import "./chunk-MHA7Y7AJ.js";
import "./chunk-QEMZUU6G.js";
import "./chunk-2J4O7HWV.js";
import "./chunk-EURQNLKS.js";
import {
  MatCardModule
} from "./chunk-ZXMIIXBI.js";
import {
  ActivatedRoute,
  RouterLink
} from "./chunk-2UH3GGF7.js";
import {
  MatButton,
  MatButtonModule,
  MatIcon,
  MatIconModule
} from "./chunk-KREJ5GPI.js";
import {
  CommonModule,
  DatePipe,
  NgForOf,
  NgIf,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-XHW7K2DC.js";

// src/app/modules/patient/patient-detail/patient-detail.component.ts
function PatientDetailComponent_div_0_span_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", ctx_r0.patient.insuranceName, " (", ctx_r0.patient.discountPercentage, "% descuento)");
  }
}
function PatientDetailComponent_div_0_span_68_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 18);
    \u0275\u0275text(1, "Sin seguro");
    \u0275\u0275elementEnd();
  }
}
function PatientDetailComponent_div_0_div_80_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 20);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 21)(4, "div", 22);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 23);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "span", 24);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r2.ticketNumber);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", t_r2.clinicName, " \xB7 ", t_r2.type, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(8, 7, t_r2.createdAt, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(2);
    \u0275\u0275classMap("status-" + t_r2.status.toLowerCase().replace("_", "-"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", t_r2.status, " ");
  }
}
function PatientDetailComponent_div_0_p_81_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 25);
    \u0275\u0275text(1, " Sin visitas registradas ");
    \u0275\u0275elementEnd();
  }
}
function PatientDetailComponent_div_0_div_84_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "mat-icon", 26);
    \u0275\u0275text(2, "science");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 21)(4, "div", 22);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 23);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "span", 24);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const o_r3 = ctx.$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("", o_r3.sampleType, " \xB7 Dr. ", o_r3.doctorName, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", o_r3.orderDate, " \xB7 Vence: ", o_r3.expirationDate, "");
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", o_r3.status === "COMPLETED" ? "#e8f5e9" : o_r3.status === "EXPIRED" ? "#ffebee" : "#fff3e0");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", o_r3.status, " ");
  }
}
function PatientDetailComponent_div_0_p_85_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 25);
    \u0275\u0275text(1, " Sin \xF3rdenes de laboratorio ");
    \u0275\u0275elementEnd();
  }
}
function PatientDetailComponent_div_0_div_88_span_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \xB7 ", p_r4.invoiceNumber, "");
  }
}
function PatientDetailComponent_div_0_div_88_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "mat-icon", 27);
    \u0275\u0275text(2, "payments");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 21)(4, "div", 22);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 23);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "date");
    \u0275\u0275template(9, PatientDetailComponent_div_0_div_88_span_9_Template, 2, 1, "span", 11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "span", 24);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r4 = ctx.$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("", p_r4.type, " \xB7 Q", p_r4.netAmount, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(8, 7, p_r4.createdAt, "dd/MM/yyyy"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", p_r4.invoiceNumber);
    \u0275\u0275advance();
    \u0275\u0275classMap(p_r4.status === "PAID" ? "status-completed" : "status-waiting");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", p_r4.status, " ");
  }
}
function PatientDetailComponent_div_0_p_89_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 25);
    \u0275\u0275text(1, " Sin pagos registrados ");
    \u0275\u0275elementEnd();
  }
}
function PatientDetailComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "h1")(3, "mat-icon");
    \u0275\u0275text(4, "person");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 3)(7, "mat-chip", 4);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 5)(10, "mat-icon");
    \u0275\u0275text(11, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(12, " Nueva Cita ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 6)(14, "mat-icon");
    \u0275\u0275text(15, "arrow_back");
    \u0275\u0275elementEnd();
    \u0275\u0275text(16, " Volver ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "mat-tab-group")(18, "mat-tab", 7)(19, "div", 8)(20, "div", 9)(21, "div", 10)(22, "mat-icon");
    \u0275\u0275text(23, "badge");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div")(25, "label");
    \u0275\u0275text(26, "DPI");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "span");
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(29, "div", 10)(30, "mat-icon");
    \u0275\u0275text(31, "phone");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "div")(33, "label");
    \u0275\u0275text(34, "Tel\xE9fono");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "span");
    \u0275\u0275text(36);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(37, "div", 10)(38, "mat-icon");
    \u0275\u0275text(39, "email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "div")(41, "label");
    \u0275\u0275text(42, "Correo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "span");
    \u0275\u0275text(44);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(45, "div", 10)(46, "mat-icon");
    \u0275\u0275text(47, "home");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "div")(49, "label");
    \u0275\u0275text(50, "Direcci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "span");
    \u0275\u0275text(52);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(53, "div", 10)(54, "mat-icon");
    \u0275\u0275text(55, "contact_phone");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "div")(57, "label");
    \u0275\u0275text(58, "Contacto Emergencia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "span");
    \u0275\u0275text(60);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(61, "div", 10)(62, "mat-icon");
    \u0275\u0275text(63, "health_and_safety");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(64, "div")(65, "label");
    \u0275\u0275text(66, "Seguro M\xE9dico");
    \u0275\u0275elementEnd();
    \u0275\u0275template(67, PatientDetailComponent_div_0_span_67_Template, 2, 2, "span", 11)(68, PatientDetailComponent_div_0_span_68_Template, 2, 0, "span", 12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(69, "div", 10)(70, "mat-icon");
    \u0275\u0275text(71, "calendar_today");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(72, "div")(73, "label");
    \u0275\u0275text(74, "Registrado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "span");
    \u0275\u0275text(76);
    \u0275\u0275pipe(77, "date");
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(78, "mat-tab", 13)(79, "div", 8);
    \u0275\u0275template(80, PatientDetailComponent_div_0_div_80_Template, 11, 10, "div", 14)(81, PatientDetailComponent_div_0_p_81_Template, 2, 0, "p", 15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(82, "mat-tab", 16)(83, "div", 8);
    \u0275\u0275template(84, PatientDetailComponent_div_0_div_84_Template, 10, 7, "div", 14)(85, PatientDetailComponent_div_0_p_85_Template, 2, 0, "p", 15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(86, "mat-tab", 17)(87, "div", 8);
    \u0275\u0275template(88, PatientDetailComponent_div_0_div_88_Template, 12, 10, "div", 14)(89, PatientDetailComponent_div_0_p_89_Template, 2, 0, "p", 15);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2(" ", ctx_r0.patient.firstName, " ", ctx_r0.patient.lastName, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.patient.patientCode);
    \u0275\u0275advance(20);
    \u0275\u0275textInterpolate(ctx_r0.patient.dpi);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.patient.phone || "No registrado");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.patient.email || "No registrado");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.patient.address || "No registrada");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.patient.emergencyContact || "No registrado");
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", ctx_r0.patient.insuranceName);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.patient.insuranceName);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(77, 17, ctx_r0.patient.createdAt, "dd/MM/yyyy"));
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r0.tickets);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.tickets.length === 0);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r0.labOrders);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.labOrders.length === 0);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r0.payments);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.payments.length === 0);
  }
}
var PatientDetailComponent = class _PatientDetailComponent {
  constructor(route, patientService, ticketService, labService, paymentService) {
    this.route = route;
    this.patientService = patientService;
    this.ticketService = ticketService;
    this.labService = labService;
    this.paymentService = paymentService;
    this.patient = null;
    this.tickets = [];
    this.labOrders = [];
    this.payments = [];
  }
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.patientService.getById(id).subscribe((res) => {
      if (res.success) {
        this.patient = res.data;
        this.loadRelated(id);
      }
    });
  }
  loadRelated(id) {
    this.ticketService.getAll().subscribe((res) => {
      if (res.success)
        this.tickets = res.data.filter((t) => t.patientId === id);
    });
    this.labService.getByPatient(id).subscribe((res) => {
      if (res.success)
        this.labOrders = res.data;
    });
    this.paymentService.getByPatient(id).subscribe((res) => {
      if (res.success)
        this.payments = res.data;
    });
  }
  static {
    this.\u0275fac = function PatientDetailComponent_Factory(t) {
      return new (t || _PatientDetailComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(PatientService), \u0275\u0275directiveInject(TicketService), \u0275\u0275directiveInject(LabService), \u0275\u0275directiveInject(PaymentService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PatientDetailComponent, selectors: [["app-patient-detail"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 1, vars: 1, consts: [["class", "page-container", 4, "ngIf"], [1, "page-container"], [1, "page-header"], [1, "header-actions"], ["color", "primary"], ["mat-raised-button", "", "color", "primary", "routerLink", "/patients/register"], ["mat-button", "", "routerLink", "/patients"], ["label", "Informaci\xF3n General"], [1, "tab-content"], [1, "info-grid"], [1, "info-item"], [4, "ngIf"], ["class", "text-muted", 4, "ngIf"], ["label", "Historial de Visitas"], ["class", "queue-ticket", 4, "ngFor", "ngForOf"], ["class", "text-center", "style", "color:#9e9e9e;padding:24px", 4, "ngIf"], ["label", "Laboratorios"], ["label", "Pagos"], [1, "text-muted"], [1, "queue-ticket"], [1, "ticket-number"], [1, "ticket-info"], [1, "ticket-patient"], [1, "ticket-meta"], [2, "padding", "4px 12px", "border-radius", "12px", "font-size", "0.8rem"], [1, "text-center", 2, "color", "#9e9e9e", "padding", "24px"], [2, "color", "#1565c0"], [2, "color", "#2e7d32"]], template: function PatientDetailComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, PatientDetailComponent_div_0_Template, 90, 20, "div", 0);
      }
      if (rf & 2) {
        \u0275\u0275property("ngIf", ctx.patient);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, DatePipe, RouterLink, MatCardModule, MatTabsModule, MatTab, MatTabGroup, MatIconModule, MatIcon, MatButtonModule, MatButton, MatChipsModule, MatChip, MatTableModule], styles: ["\n\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 1.6rem;\n  font-weight: 500;\n  color: #1565c0;\n}\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.tab-content[_ngcontent-%COMP%] {\n  padding: 24px 0;\n}\n.info-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 16px;\n}\n.info-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  padding: 16px;\n  background: #f8f9ff;\n  border-radius: 8px;\n}\n.info-item[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #1565c0;\n  margin-top: 2px;\n}\n.info-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.75rem;\n  color: #757575;\n  text-transform: uppercase;\n  margin-bottom: 4px;\n}\n.info-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  font-weight: 500;\n}\n.text-muted[_ngcontent-%COMP%] {\n  color: #9e9e9e !important;\n  font-weight: 400 !important;\n}\n/*# sourceMappingURL=patient-detail.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PatientDetailComponent, { className: "PatientDetailComponent", filePath: "src\\app\\modules\\patient\\patient-detail\\patient-detail.component.ts", lineNumber: 160 });
})();
export {
  PatientDetailComponent
};
//# sourceMappingURL=chunk-7CV4FVFG.js.map
