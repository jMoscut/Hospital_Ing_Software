import {
  MatDivider,
  MatDividerModule
} from "./chunk-GODDNVHJ.js";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-BYCBEEAC.js";
import {
  NotificationService
} from "./chunk-4BLU4O7B.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-ZDRD2YW4.js";
import "./chunk-SRE6VCYJ.js";
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
} from "./chunk-SMV43QNY.js";
import {
  PaymentService
} from "./chunk-LDLLK6DA.js";
import {
  PatientService
} from "./chunk-SM4IRFQU.js";
import "./chunk-MHA7Y7AJ.js";
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
  MatPrefix
} from "./chunk-QEMZUU6G.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
  NumberValueAccessor,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-2J4O7HWV.js";
import "./chunk-EURQNLKS.js";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle
} from "./chunk-ZXMIIXBI.js";
import {
  MatButton,
  MatButtonModule,
  MatIcon,
  MatIconModule,
  MatOption
} from "./chunk-KREJ5GPI.js";
import {
  CommonModule,
  DatePipe,
  NgForOf,
  NgIf,
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
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-XHW7K2DC.js";

// src/app/modules/payments/payments.component.ts
var _c0 = () => ({ standalone: true });
function PaymentsComponent_div_19_span_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" \u{1F512} ", ctx_r0.patient.insuranceName, " (", ctx_r0.patient.discountPercentage, "% desc.) ");
  }
}
function PaymentsComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "div", 11)(2, "mat-icon");
    \u0275\u0275text(3, "person");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 12);
    \u0275\u0275text(8);
    \u0275\u0275template(9, PaymentsComponent_div_19_span_9_Template, 2, 2, "span", 13);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate2("", ctx_r0.patient.firstName, " ", ctx_r0.patient.lastName, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ctx_r0.patient.patientCode, " \xB7 ", ctx_r0.patient.dpi, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.patient.insuranceName);
  }
}
function PaymentsComponent_mat_card_20_div_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "div", 25)(2, "span");
    \u0275\u0275text(3, "Subtotal:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 26)(7, "span");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(11, "mat-divider");
    \u0275\u0275elementStart(12, "div", 27)(13, "strong");
    \u0275\u0275text(14, "Total Neto:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "strong");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("Q", ctx_r0.paymentForm.value.amount, "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("Descuento (", ctx_r0.patient == null ? null : ctx_r0.patient.discountPercentage, "% - ", ctx_r0.patient == null ? null : ctx_r0.patient.insuranceName, "):");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("-Q", ctx_r0.getDiscount(), "");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("Q", ctx_r0.getNetAmount(), "");
  }
}
function PaymentsComponent_mat_card_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card")(1, "mat-card-header")(2, "mat-card-title");
    \u0275\u0275text(3, "Registrar Cargo");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "mat-card-content")(5, "form", 15)(6, "mat-form-field", 4)(7, "mat-label");
    \u0275\u0275text(8, "Tipo de Servicio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "mat-select", 16)(10, "mat-option", 17);
    \u0275\u0275text(11, "Consulta M\xE9dica");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "mat-option", 18);
    \u0275\u0275text(13, "Laboratorio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "mat-option", 19);
    \u0275\u0275text(15, "Farmacia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "mat-option", 20);
    \u0275\u0275text(17, "Emergencia");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "mat-form-field", 4)(19, "mat-label");
    \u0275\u0275text(20, "Monto (Q)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(21, "input", 21);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(22, PaymentsComponent_mat_card_20_div_22_Template, 17, 5, "div", 22);
    \u0275\u0275elementStart(23, "button", 23);
    \u0275\u0275listener("click", function PaymentsComponent_mat_card_20_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.createPayment());
    });
    \u0275\u0275elementStart(24, "mat-icon");
    \u0275\u0275text(25, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(26, " Generar Orden de Pago ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("formGroup", ctx_r0.paymentForm);
    \u0275\u0275advance(17);
    \u0275\u0275property("ngIf", ctx_r0.paymentForm.value.amount && (ctx_r0.patient == null ? null : ctx_r0.patient.discountPercentage));
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.paymentForm.invalid);
  }
}
function PaymentsComponent_mat_card_21_div_5_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" (descuento: Q", p_r4.discountAmount, ")");
  }
}
function PaymentsComponent_mat_card_21_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 29)(1, "div", 30)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 31);
    \u0275\u0275text(5);
    \u0275\u0275template(6, PaymentsComponent_mat_card_21_div_5_span_6_Template, 2, 1, "span", 9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 32)(8, "mat-form-field", 33)(9, "mat-label");
    \u0275\u0275text(10, "M\xE9todo de Pago");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "mat-select", 34);
    \u0275\u0275twoWayListener("ngModelChange", function PaymentsComponent_mat_card_21_div_5_Template_mat_select_ngModelChange_11_listener($event) {
      const p_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.selectedMethods[p_r4.id], $event) || (ctx_r0.selectedMethods[p_r4.id] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(12, "mat-option", 35);
    \u0275\u0275text(13, "Efectivo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "mat-option", 36);
    \u0275\u0275text(15, "D\xE9bito");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "mat-option", 37);
    \u0275\u0275text(17, "Cr\xE9dito");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "button", 23);
    \u0275\u0275listener("click", function PaymentsComponent_mat_card_21_div_5_Template_button_click_18_listener() {
      const p_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.processPayment(p_r4));
    });
    \u0275\u0275elementStart(19, "mat-icon");
    \u0275\u0275text(20, "payments");
    \u0275\u0275elementEnd();
    \u0275\u0275text(21, " Cobrar ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const p_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r4.type);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Total: Q", p_r4.netAmount, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", p_r4.discountAmount > 0);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.selectedMethods[p_r4.id]);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(6, _c0));
    \u0275\u0275advance(7);
    \u0275\u0275property("disabled", !ctx_r0.selectedMethods[p_r4.id]);
  }
}
function PaymentsComponent_mat_card_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card")(1, "mat-card-header")(2, "mat-card-title");
    \u0275\u0275text(3, "Pagos Pendientes");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "mat-card-content");
    \u0275\u0275template(5, PaymentsComponent_mat_card_21_div_5_Template, 22, 7, "div", 28);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx_r0.pendingPayments);
  }
}
function PaymentsComponent_mat_card_22_th_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 48);
    \u0275\u0275text(1, "Factura");
    \u0275\u0275elementEnd();
  }
}
function PaymentsComponent_mat_card_22_td_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 49);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r5.invoiceNumber || "-");
  }
}
function PaymentsComponent_mat_card_22_th_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 48);
    \u0275\u0275text(1, "Servicio");
    \u0275\u0275elementEnd();
  }
}
function PaymentsComponent_mat_card_22_td_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 49);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r6.type);
  }
}
function PaymentsComponent_mat_card_22_th_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 48);
    \u0275\u0275text(1, "Neto");
    \u0275\u0275elementEnd();
  }
}
function PaymentsComponent_mat_card_22_td_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 49);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Q", p_r7.netAmount, "");
  }
}
function PaymentsComponent_mat_card_22_th_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 48);
    \u0275\u0275text(1, "M\xE9todo");
    \u0275\u0275elementEnd();
  }
}
function PaymentsComponent_mat_card_22_td_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 49);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r8.method);
  }
}
function PaymentsComponent_mat_card_22_th_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 48);
    \u0275\u0275text(1, "Fecha");
    \u0275\u0275elementEnd();
  }
}
function PaymentsComponent_mat_card_22_td_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 49);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, p_r9.paidAt, "dd/MM/yyyy HH:mm"));
  }
}
function PaymentsComponent_mat_card_22_tr_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 50);
  }
}
function PaymentsComponent_mat_card_22_tr_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 51);
  }
}
function PaymentsComponent_mat_card_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card")(1, "mat-card-header")(2, "mat-card-title");
    \u0275\u0275text(3, "Pagos Realizados");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "mat-card-content")(5, "table", 38);
    \u0275\u0275elementContainerStart(6, 39);
    \u0275\u0275template(7, PaymentsComponent_mat_card_22_th_7_Template, 2, 0, "th", 40)(8, PaymentsComponent_mat_card_22_td_8_Template, 2, 1, "td", 41);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(9, 42);
    \u0275\u0275template(10, PaymentsComponent_mat_card_22_th_10_Template, 2, 0, "th", 40)(11, PaymentsComponent_mat_card_22_td_11_Template, 2, 1, "td", 41);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(12, 43);
    \u0275\u0275template(13, PaymentsComponent_mat_card_22_th_13_Template, 2, 0, "th", 40)(14, PaymentsComponent_mat_card_22_td_14_Template, 2, 1, "td", 41);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(15, 44);
    \u0275\u0275template(16, PaymentsComponent_mat_card_22_th_16_Template, 2, 0, "th", 40)(17, PaymentsComponent_mat_card_22_td_17_Template, 2, 1, "td", 41);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(18, 45);
    \u0275\u0275template(19, PaymentsComponent_mat_card_22_th_19_Template, 2, 0, "th", 40)(20, PaymentsComponent_mat_card_22_td_20_Template, 3, 4, "td", 41);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(21, PaymentsComponent_mat_card_22_tr_21_Template, 1, 0, "tr", 46)(22, PaymentsComponent_mat_card_22_tr_22_Template, 1, 0, "tr", 47);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("dataSource", ctx_r0.paidPayments);
    \u0275\u0275advance(16);
    \u0275\u0275property("matHeaderRowDef", ctx_r0.columns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r0.columns);
  }
}
var PaymentsComponent = class _PaymentsComponent {
  constructor(fb, patientService, paymentService, notification) {
    this.fb = fb;
    this.patientService = patientService;
    this.paymentService = paymentService;
    this.notification = notification;
    this.patient = null;
    this.pendingPayments = [];
    this.paidPayments = [];
    this.selectedMethods = {};
    this.columns = ["invoice", "type", "amount", "method", "date"];
    this.searchForm = this.fb.group({ query: ["", Validators.required] });
    this.paymentForm = this.fb.group({
      type: ["CONSULTATION", Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]]
    });
  }
  searchPatient() {
    const q = this.searchForm.value.query;
    const obs = q.match(/^\d{13}$/) ? this.patientService.getByDpi(q) : this.patientService.search(q);
    obs.subscribe({
      next: (res) => {
        const p = Array.isArray(res.data) ? res.data[0] : res.data;
        if (p) {
          this.patient = p;
          this.loadPayments(p.id);
        } else {
          this.notification.error("Paciente no encontrado");
        }
      },
      error: () => this.notification.error("Paciente no encontrado")
    });
  }
  loadPayments(patientId) {
    this.paymentService.getByPatient(patientId).subscribe((res) => {
      if (res.success) {
        this.pendingPayments = res.data.filter((p) => p.status === "PENDING");
        this.paidPayments = res.data.filter((p) => p.status === "PAID");
        this.selectedMethods = {};
      }
    });
  }
  getDiscount() {
    const amount = this.paymentForm.value.amount || 0;
    const pct = this.patient?.discountPercentage || 0;
    return (amount * pct / 100).toFixed(2);
  }
  getNetAmount() {
    const amount = this.paymentForm.value.amount || 0;
    const discount = parseFloat(this.getDiscount());
    return (amount - discount).toFixed(2);
  }
  createPayment() {
    if (!this.patient)
      return;
    const data = {
      patientId: this.patient.id,
      type: this.paymentForm.value.type,
      amount: this.paymentForm.value.amount
    };
    this.paymentService.create(data).subscribe({
      next: (res) => {
        if (res.success) {
          this.notification.success("Orden de pago generada");
          this.loadPayments(this.patient.id);
          this.paymentForm.reset({ type: "CONSULTATION" });
        }
      }
    });
  }
  processPayment(payment) {
    const method = this.selectedMethods[payment.id];
    this.paymentService.process(payment.id, method).subscribe({
      next: (res) => {
        if (res.success) {
          this.notification.success(`Pago procesado. Factura: ${res.data.invoiceNumber}`);
          this.loadPayments(this.patient.id);
        }
      }
    });
  }
  static {
    this.\u0275fac = function PaymentsComponent_Factory(t) {
      return new (t || _PaymentsComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(PatientService), \u0275\u0275directiveInject(PaymentService), \u0275\u0275directiveInject(NotificationService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PaymentsComponent, selectors: [["app-payments"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 23, vars: 5, consts: [[1, "page-container"], [1, "page-header"], [1, "payments-layout"], [1, "search-row", 3, "formGroup"], ["appearance", "outline"], ["matPrefix", ""], ["matInput", "", "formControlName", "query", "placeholder", "0000000000000 o PAT-0001"], ["mat-raised-button", "", "color", "primary", 3, "click"], ["class", "patient-found", 4, "ngIf"], [4, "ngIf"], [1, "patient-found"], [1, "patient-info"], [1, "patient-meta"], ["class", "insurance-badge", 4, "ngIf"], [1, "insurance-badge"], [1, "form-grid", 3, "formGroup"], ["formControlName", "type"], ["value", "CONSULTATION"], ["value", "LABORATORY"], ["value", "PHARMACY"], ["value", "EMERGENCY"], ["matInput", "", "type", "number", "formControlName", "amount", "step", "0.01"], ["class", "discount-summary", 4, "ngIf"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], [1, "discount-summary"], [1, "summary-row"], [1, "summary-row", "discount"], [1, "summary-row", "total"], ["class", "payment-row", 4, "ngFor", "ngForOf"], [1, "payment-row"], [1, "payment-info"], [1, "payment-meta"], [1, "payment-actions"], ["appearance", "outline", 2, "width", "160px"], [3, "ngModelChange", "ngModel", "ngModelOptions"], ["value", "CASH"], ["value", "DEBIT_CARD"], ["value", "CREDIT_CARD"], ["mat-table", "", 3, "dataSource"], ["matColumnDef", "invoice"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "type"], ["matColumnDef", "amount"], ["matColumnDef", "method"], ["matColumnDef", "date"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", ""], ["mat-header-row", ""], ["mat-row", ""]], template: function PaymentsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
        \u0275\u0275text(3, "Caja y Facturaci\xF3n");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(4, "div", 2)(5, "mat-card")(6, "mat-card-header")(7, "mat-card-title");
        \u0275\u0275text(8, "Identificar Paciente");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "mat-card-content")(10, "form", 3)(11, "mat-form-field", 4)(12, "mat-label");
        \u0275\u0275text(13, "DPI o C\xF3digo de Paciente");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "mat-icon", 5);
        \u0275\u0275text(15, "search");
        \u0275\u0275elementEnd();
        \u0275\u0275element(16, "input", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "button", 7);
        \u0275\u0275listener("click", function PaymentsComponent_Template_button_click_17_listener() {
          return ctx.searchPatient();
        });
        \u0275\u0275text(18, " Buscar ");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(19, PaymentsComponent_div_19_Template, 10, 5, "div", 8);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(20, PaymentsComponent_mat_card_20_Template, 27, 3, "mat-card", 9)(21, PaymentsComponent_mat_card_21_Template, 6, 1, "mat-card", 9)(22, PaymentsComponent_mat_card_22_Template, 23, 3, "mat-card", 9);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(10);
        \u0275\u0275property("formGroup", ctx.searchForm);
        \u0275\u0275advance(9);
        \u0275\u0275property("ngIf", ctx.patient);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.patient);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.pendingPayments.length > 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.paidPayments.length > 0);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, DatePipe, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, FormsModule, NgModel, MatCardModule, MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatButtonModule, MatButton, MatIconModule, MatIcon, MatFormFieldModule, MatFormField, MatLabel, MatPrefix, MatInputModule, MatInput, MatSelectModule, MatSelect, MatOption, MatTableModule, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatDividerModule, MatDivider], styles: ["\n\n.payments-layout[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.6rem;\n  font-weight: 500;\n  color: #1565c0;\n  margin: 0;\n}\n.search-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: flex-end;\n}\n.patient-found[_ngcontent-%COMP%] {\n  background: #e8f5e9;\n  border-radius: 8px;\n  padding: 16px;\n  margin-top: 12px;\n}\n.patient-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.patient-meta[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #555;\n  margin-top: 4px;\n}\n.insurance-badge[_ngcontent-%COMP%] {\n  background: #fff3e0;\n  color: #e65100;\n  padding: 2px 8px;\n  border-radius: 8px;\n  margin-left: 8px;\n  font-size: 0.8rem;\n}\n.form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 12px;\n  margin-bottom: 16px;\n}\n.discount-summary[_ngcontent-%COMP%] {\n  background: #f8f9ff;\n  border-radius: 8px;\n  padding: 16px;\n  margin-bottom: 16px;\n}\n.summary-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  padding: 4px 0;\n}\n.summary-row.discount[_ngcontent-%COMP%] {\n  color: #2e7d32;\n}\n.summary-row.total[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  margin-top: 8px;\n}\n.payment-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 12px;\n  background: #f8f9ff;\n  border-radius: 8px;\n  margin-bottom: 8px;\n}\n.payment-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.payment-meta[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #555;\n}\n/*# sourceMappingURL=payments.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PaymentsComponent, { className: "PaymentsComponent", filePath: "src\\app\\modules\\payments\\payments.component.ts", lineNumber: 199 });
})();
export {
  PaymentsComponent
};
//# sourceMappingURL=chunk-UZVVNZ5X.js.map
