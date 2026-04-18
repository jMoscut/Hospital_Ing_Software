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
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-DU2QI7GP.js";
import {
  MatTab,
  MatTabGroup,
  MatTabLabel,
  MatTabsModule
} from "./chunk-IFA7BXQN.js";
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
  AppointmentService
} from "./chunk-ELYEA2RZ.js";
import {
  PaymentService
} from "./chunk-LDLLK6DA.js";
import {
  PatientService
} from "./chunk-SM4IRFQU.js";
import "./chunk-MHA7Y7AJ.js";
import {
  MatError,
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
  MaxLengthValidator,
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
function PaymentsComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 15);
    \u0275\u0275text(1, "payments");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Pagos Generales ");
  }
}
function PaymentsComponent_div_23_span_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" \u{1F512} ", ctx_r0.patient.insuranceName, " (", ctx_r0.patient.discountPercentage, "% desc.) ");
  }
}
function PaymentsComponent_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "div", 17)(2, "mat-icon");
    \u0275\u0275text(3, "person");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 18);
    \u0275\u0275text(8);
    \u0275\u0275template(9, PaymentsComponent_div_23_span_9_Template, 2, 2, "span", 19);
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
function PaymentsComponent_mat_card_24_div_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "div", 31)(2, "span");
    \u0275\u0275text(3, "Subtotal:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 32)(7, "span");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(11, "mat-divider");
    \u0275\u0275elementStart(12, "div", 33)(13, "strong");
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
function PaymentsComponent_mat_card_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card")(1, "mat-card-header")(2, "mat-card-title");
    \u0275\u0275text(3, "Registrar Cargo");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "mat-card-content")(5, "form", 21)(6, "mat-form-field", 7)(7, "mat-label");
    \u0275\u0275text(8, "Tipo de Servicio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "mat-select", 22)(10, "mat-option", 23);
    \u0275\u0275text(11, "Consulta M\xE9dica");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "mat-option", 24);
    \u0275\u0275text(13, "Laboratorio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "mat-option", 25);
    \u0275\u0275text(15, "Farmacia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "mat-option", 26);
    \u0275\u0275text(17, "Emergencia");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "mat-form-field", 7)(19, "mat-label");
    \u0275\u0275text(20, "Monto (Q)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(21, "input", 27);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(22, PaymentsComponent_mat_card_24_div_22_Template, 17, 5, "div", 28);
    \u0275\u0275elementStart(23, "button", 29);
    \u0275\u0275listener("click", function PaymentsComponent_mat_card_24_Template_button_click_23_listener() {
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
function PaymentsComponent_mat_card_25_div_5_span_6_Template(rf, ctx) {
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
function PaymentsComponent_mat_card_25_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 35)(1, "div", 36)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 37);
    \u0275\u0275text(5);
    \u0275\u0275template(6, PaymentsComponent_mat_card_25_div_5_span_6_Template, 2, 1, "span", 12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 38)(8, "mat-form-field", 39)(9, "mat-label");
    \u0275\u0275text(10, "M\xE9todo de Pago");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "mat-select", 40);
    \u0275\u0275twoWayListener("ngModelChange", function PaymentsComponent_mat_card_25_div_5_Template_mat_select_ngModelChange_11_listener($event) {
      const p_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.selectedMethods[p_r4.id], $event) || (ctx_r0.selectedMethods[p_r4.id] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(12, "mat-option", 41);
    \u0275\u0275text(13, "Efectivo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "mat-option", 42);
    \u0275\u0275text(15, "D\xE9bito");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "mat-option", 43);
    \u0275\u0275text(17, "Cr\xE9dito");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "button", 29);
    \u0275\u0275listener("click", function PaymentsComponent_mat_card_25_div_5_Template_button_click_18_listener() {
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
function PaymentsComponent_mat_card_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card")(1, "mat-card-header")(2, "mat-card-title");
    \u0275\u0275text(3, "Pagos Pendientes");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "mat-card-content");
    \u0275\u0275template(5, PaymentsComponent_mat_card_25_div_5_Template, 22, 7, "div", 34);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx_r0.pendingPayments);
  }
}
function PaymentsComponent_mat_card_26_th_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 54);
    \u0275\u0275text(1, "Factura");
    \u0275\u0275elementEnd();
  }
}
function PaymentsComponent_mat_card_26_td_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r5.invoiceNumber || "-");
  }
}
function PaymentsComponent_mat_card_26_th_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 54);
    \u0275\u0275text(1, "Servicio");
    \u0275\u0275elementEnd();
  }
}
function PaymentsComponent_mat_card_26_td_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r6.type);
  }
}
function PaymentsComponent_mat_card_26_th_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 54);
    \u0275\u0275text(1, "Neto");
    \u0275\u0275elementEnd();
  }
}
function PaymentsComponent_mat_card_26_td_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Q", p_r7.netAmount, "");
  }
}
function PaymentsComponent_mat_card_26_th_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 54);
    \u0275\u0275text(1, "M\xE9todo");
    \u0275\u0275elementEnd();
  }
}
function PaymentsComponent_mat_card_26_td_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r8.method);
  }
}
function PaymentsComponent_mat_card_26_th_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 54);
    \u0275\u0275text(1, "Fecha");
    \u0275\u0275elementEnd();
  }
}
function PaymentsComponent_mat_card_26_td_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55);
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
function PaymentsComponent_mat_card_26_tr_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 56);
  }
}
function PaymentsComponent_mat_card_26_tr_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 57);
  }
}
function PaymentsComponent_mat_card_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card")(1, "mat-card-header")(2, "mat-card-title");
    \u0275\u0275text(3, "Pagos Realizados");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "mat-card-content")(5, "table", 44);
    \u0275\u0275elementContainerStart(6, 45);
    \u0275\u0275template(7, PaymentsComponent_mat_card_26_th_7_Template, 2, 0, "th", 46)(8, PaymentsComponent_mat_card_26_td_8_Template, 2, 1, "td", 47);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(9, 48);
    \u0275\u0275template(10, PaymentsComponent_mat_card_26_th_10_Template, 2, 0, "th", 46)(11, PaymentsComponent_mat_card_26_td_11_Template, 2, 1, "td", 47);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(12, 49);
    \u0275\u0275template(13, PaymentsComponent_mat_card_26_th_13_Template, 2, 0, "th", 46)(14, PaymentsComponent_mat_card_26_td_14_Template, 2, 1, "td", 47);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(15, 50);
    \u0275\u0275template(16, PaymentsComponent_mat_card_26_th_16_Template, 2, 0, "th", 46)(17, PaymentsComponent_mat_card_26_td_17_Template, 2, 1, "td", 47);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(18, 51);
    \u0275\u0275template(19, PaymentsComponent_mat_card_26_th_19_Template, 2, 0, "th", 46)(20, PaymentsComponent_mat_card_26_td_20_Template, 3, 4, "td", 47);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(21, PaymentsComponent_mat_card_26_tr_21_Template, 1, 0, "tr", 52)(22, PaymentsComponent_mat_card_26_tr_22_Template, 1, 0, "tr", 53);
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
function PaymentsComponent_ng_template_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 15);
    \u0275\u0275text(1, "event_available");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Pago de Cita ");
  }
}
function PaymentsComponent_mat_card_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card", 58)(1, "mat-card-content")(2, "div", 59)(3, "mat-icon");
    \u0275\u0275text(4, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div")(6, "h3");
    \u0275\u0275text(7, "Pago Confirmado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9, "La cita ha entrado al sistema de cola de atenci\xF3n.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 60)(11, "strong");
    \u0275\u0275text(12, "Paciente:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 60)(15, "strong");
    \u0275\u0275text(16, "Cl\xEDnica:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 60)(19, "strong");
    \u0275\u0275text(20, "Fecha / Hora:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "button", 61);
    \u0275\u0275listener("click", function PaymentsComponent_mat_card_30_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.resetApptPayment());
    });
    \u0275\u0275elementStart(23, "mat-icon");
    \u0275\u0275text(24, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(25, " Procesar Otro Pago ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275textInterpolate1(" ", ctx_r0.apptDetails == null ? null : ctx_r0.apptDetails.patientName, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.apptDetails == null ? null : ctx_r0.apptDetails.clinicName, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", ctx_r0.apptDetails == null ? null : ctx_r0.apptDetails.scheduledDate, " ", ctx_r0.apptDetails == null ? null : ctx_r0.apptDetails.scheduledTime, "");
  }
}
function PaymentsComponent_mat_card_31_mat_spinner_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 64);
  }
}
function PaymentsComponent_mat_card_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card")(1, "mat-card-header")(2, "mat-card-title");
    \u0275\u0275text(3, "Buscar Cita por Voucher");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "mat-card-content")(5, "form", 6)(6, "mat-form-field", 7)(7, "mat-label");
    \u0275\u0275text(8, "C\xF3digo de Voucher");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "mat-icon", 8);
    \u0275\u0275text(10, "confirmation_number");
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "input", 62);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 29);
    \u0275\u0275listener("click", function PaymentsComponent_mat_card_31_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.lookupVoucher());
    });
    \u0275\u0275template(13, PaymentsComponent_mat_card_31_mat_spinner_13_Template, 1, 0, "mat-spinner", 63);
    \u0275\u0275text(14, " Buscar ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("formGroup", ctx_r0.voucherForm);
    \u0275\u0275advance(7);
    \u0275\u0275property("disabled", ctx_r0.voucherForm.invalid || ctx_r0.apptLooking);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.apptLooking);
  }
}
function PaymentsComponent_mat_card_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 65)(1, "mat-card-header")(2, "mat-card-title");
    \u0275\u0275text(3, "Detalles de la Cita");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "mat-card-content")(5, "div", 66)(6, "div", 60)(7, "mat-icon");
    \u0275\u0275text(8, "person");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span")(10, "strong");
    \u0275\u0275text(11, "Paciente:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 60)(14, "mat-icon");
    \u0275\u0275text(15, "local_hospital");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span")(17, "strong");
    \u0275\u0275text(18, "Cl\xEDnica:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 60)(21, "mat-icon");
    \u0275\u0275text(22, "medical_services");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span")(24, "strong");
    \u0275\u0275text(25, "Tipo:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 60)(28, "mat-icon");
    \u0275\u0275text(29, "event");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "span")(31, "strong");
    \u0275\u0275text(32, "Fecha / Hora:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(33);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 67)(35, "mat-icon");
    \u0275\u0275text(36, "payments");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "span")(38, "strong");
    \u0275\u0275text(39, "Monto:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(40);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate2(" ", ctx_r0.apptDetails.patientName, " (", ctx_r0.apptDetails.patientCode, ")");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", ctx_r0.apptDetails.clinicName, "");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", ctx_r0.apptDetails.type, "");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate2(" ", ctx_r0.apptDetails.scheduledDate, " ", ctx_r0.apptDetails.scheduledTime, "");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" Q", ctx_r0.apptDetails.amount, "");
  }
}
function PaymentsComponent_mat_card_33_mat_spinner_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 64);
  }
}
function PaymentsComponent_mat_card_33_mat_icon_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "lock");
    \u0275\u0275elementEnd();
  }
}
function PaymentsComponent_mat_card_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card", 65)(1, "mat-card-header")(2, "mat-card-title");
    \u0275\u0275text(3, "Datos de Pago con Tarjeta");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "mat-card-content")(5, "form", 68)(6, "mat-form-field", 69)(7, "mat-label");
    \u0275\u0275text(8, "Nombre en la Tarjeta *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "mat-icon", 8);
    \u0275\u0275text(10, "credit_card");
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "input", 70);
    \u0275\u0275elementStart(12, "mat-error");
    \u0275\u0275text(13, "Campo requerido");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "mat-form-field", 69)(15, "mat-label");
    \u0275\u0275text(16, "N\xFAmero de Tarjeta *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(17, "input", 71);
    \u0275\u0275elementStart(18, "mat-error");
    \u0275\u0275text(19, "Ingrese los 16 d\xEDgitos");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "mat-form-field", 7)(21, "mat-label");
    \u0275\u0275text(22, "Vencimiento (MM/AA) *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(23, "input", 72);
    \u0275\u0275elementStart(24, "mat-error");
    \u0275\u0275text(25, "Formato MM/AA");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "mat-form-field", 7)(27, "mat-label");
    \u0275\u0275text(28, "CVV *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(29, "input", 73);
    \u0275\u0275elementStart(30, "mat-error");
    \u0275\u0275text(31, "Campo requerido");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "mat-form-field", 7)(33, "mat-label");
    \u0275\u0275text(34, "M\xE9todo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "mat-select", 74)(36, "mat-option", 42);
    \u0275\u0275text(37, "D\xE9bito");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "mat-option", 43);
    \u0275\u0275text(39, "Cr\xE9dito");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(40, "button", 75);
    \u0275\u0275listener("click", function PaymentsComponent_mat_card_33_Template_button_click_40_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.confirmApptPayment());
    });
    \u0275\u0275template(41, PaymentsComponent_mat_card_33_mat_spinner_41_Template, 1, 0, "mat-spinner", 63)(42, PaymentsComponent_mat_card_33_mat_icon_42_Template, 2, 0, "mat-icon", 12);
    \u0275\u0275text(43);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("formGroup", ctx_r0.cardForm);
    \u0275\u0275advance(35);
    \u0275\u0275property("disabled", ctx_r0.cardForm.invalid || ctx_r0.apptConfirming);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.apptConfirming);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.apptConfirming);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.apptConfirming ? "Procesando..." : "Confirmar Pago \u2014 Q" + ctx_r0.apptDetails.amount, " ");
  }
}
var PaymentsComponent = class _PaymentsComponent {
  constructor(fb, patientService, paymentService, appointmentService, notification) {
    this.fb = fb;
    this.patientService = patientService;
    this.paymentService = paymentService;
    this.appointmentService = appointmentService;
    this.notification = notification;
    this.patient = null;
    this.pendingPayments = [];
    this.paidPayments = [];
    this.selectedMethods = {};
    this.columns = ["invoice", "type", "amount", "method", "date"];
    this.apptDetails = null;
    this.apptLooking = false;
    this.apptConfirming = false;
    this.apptPaid = false;
    this.searchForm = this.fb.group({ query: ["", Validators.required] });
    this.paymentForm = this.fb.group({
      type: ["CONSULTATION", Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]]
    });
    this.voucherForm = this.fb.group({
      code: ["", [Validators.required, Validators.minLength(6)]]
    });
    this.cardForm = this.fb.group({
      cardName: ["", Validators.required],
      cardNumber: ["", [Validators.required, Validators.pattern(/^\d{4} ?\d{4} ?\d{4} ?\d{4}$/)]],
      expiry: ["", [Validators.required, Validators.pattern(/^\d{2}\/\d{2}$/)]],
      cvv: ["", [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      paymentMethod: ["DEBIT_CARD", Validators.required]
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
  lookupVoucher() {
    const code = this.voucherForm.value.code?.toUpperCase();
    this.apptLooking = true;
    this.apptDetails = null;
    this.appointmentService.getByVoucherCode(code).subscribe({
      next: (res) => {
        if (res.success) {
          this.apptDetails = res.data;
          if (res.data.status === "CONFIRMED") {
            this.notification.error("Esta cita ya fue pagada.");
            this.apptDetails = null;
          }
        } else {
          this.notification.error("Voucher no encontrado");
        }
        this.apptLooking = false;
      },
      error: () => {
        this.notification.error("Voucher no encontrado");
        this.apptLooking = false;
      }
    });
  }
  confirmApptPayment() {
    this.apptConfirming = true;
    this.appointmentService.confirmPayment(this.apptDetails.id, {
      paymentMethod: this.cardForm.value.paymentMethod
    }).subscribe({
      next: (res) => {
        if (res.success) {
          this.apptPaid = true;
          this.notification.success("Pago confirmado. La cita entr\xF3 a la cola.");
        } else {
          this.notification.error(res.message || "Error al confirmar pago");
        }
        this.apptConfirming = false;
      },
      error: (err) => {
        this.notification.error(err.error?.message || "Error al procesar el pago");
        this.apptConfirming = false;
      }
    });
  }
  resetApptPayment() {
    this.apptPaid = false;
    this.apptDetails = null;
    this.voucherForm.reset();
    this.cardForm.reset({ paymentMethod: "DEBIT_CARD" });
  }
  static {
    this.\u0275fac = function PaymentsComponent_Factory(t) {
      return new (t || _PaymentsComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(PatientService), \u0275\u0275directiveInject(PaymentService), \u0275\u0275directiveInject(AppointmentService), \u0275\u0275directiveInject(NotificationService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PaymentsComponent, selectors: [["app-payments"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 34, vars: 9, consts: [[1, "page-container"], [1, "page-header"], ["animationDuration", "200ms"], ["mat-tab-label", ""], [2, "padding", "24px 0"], [1, "payments-layout"], [1, "search-row", 3, "formGroup"], ["appearance", "outline"], ["matPrefix", ""], ["matInput", "", "formControlName", "query", "placeholder", "0000000000000 o PAT-0001"], ["mat-raised-button", "", "color", "primary", 3, "click"], ["class", "patient-found", 4, "ngIf"], [4, "ngIf"], ["class", "appt-success-card", 4, "ngIf"], ["style", "margin-top:16px", 4, "ngIf"], [2, "font-size", "18px", "margin-right", "6px", "vertical-align", "middle"], [1, "patient-found"], [1, "patient-info"], [1, "patient-meta"], ["class", "insurance-badge", 4, "ngIf"], [1, "insurance-badge"], [1, "form-grid", 3, "formGroup"], ["formControlName", "type"], ["value", "CONSULTATION"], ["value", "LABORATORY"], ["value", "PHARMACY"], ["value", "EMERGENCY"], ["matInput", "", "type", "number", "formControlName", "amount", "step", "0.01"], ["class", "discount-summary", 4, "ngIf"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], [1, "discount-summary"], [1, "summary-row"], [1, "summary-row", "discount"], [1, "summary-row", "total"], ["class", "payment-row", 4, "ngFor", "ngForOf"], [1, "payment-row"], [1, "payment-info"], [1, "payment-meta"], [1, "payment-actions"], ["appearance", "outline", 2, "width", "160px"], [3, "ngModelChange", "ngModel", "ngModelOptions"], ["value", "CASH"], ["value", "DEBIT_CARD"], ["value", "CREDIT_CARD"], ["mat-table", "", 3, "dataSource"], ["matColumnDef", "invoice"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "type"], ["matColumnDef", "amount"], ["matColumnDef", "method"], ["matColumnDef", "date"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", ""], ["mat-header-row", ""], ["mat-row", ""], [1, "appt-success-card"], [1, "appt-success"], [1, "appt-detail-row"], ["mat-stroked-button", "", "color", "primary", 2, "margin-top", "16px", 3, "click"], ["matInput", "", "formControlName", "code", "placeholder", "A3X9K2", "maxlength", "10", 2, "text-transform", "uppercase"], ["diameter", "20", "style", "display:inline-block;margin-right:6px", 4, "ngIf"], ["diameter", "20", 2, "display", "inline-block", "margin-right", "6px"], [2, "margin-top", "16px"], [1, "appt-details-grid"], [1, "appt-detail-row", "appt-amount"], [1, "card-form-grid", 3, "formGroup"], ["appearance", "outline", 1, "card-full"], ["matInput", "", "formControlName", "cardName", "placeholder", "JUAN PEREZ"], ["matInput", "", "formControlName", "cardNumber", "placeholder", "0000 0000 0000 0000", "maxlength", "19"], ["matInput", "", "formControlName", "expiry", "placeholder", "12/28", "maxlength", "5"], ["matInput", "", "formControlName", "cvv", "placeholder", "123", "maxlength", "4", "type", "password"], ["formControlName", "paymentMethod"], ["mat-raised-button", "", "color", "primary", 2, "margin-top", "8px", 3, "click", "disabled"]], template: function PaymentsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
        \u0275\u0275text(3, "Caja y Facturaci\xF3n");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(4, "mat-tab-group", 2)(5, "mat-tab");
        \u0275\u0275template(6, PaymentsComponent_ng_template_6_Template, 3, 0, "ng-template", 3);
        \u0275\u0275elementStart(7, "div", 4)(8, "div", 5)(9, "mat-card")(10, "mat-card-header")(11, "mat-card-title");
        \u0275\u0275text(12, "Identificar Paciente");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(13, "mat-card-content")(14, "form", 6)(15, "mat-form-field", 7)(16, "mat-label");
        \u0275\u0275text(17, "DPI o C\xF3digo de Paciente");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "mat-icon", 8);
        \u0275\u0275text(19, "search");
        \u0275\u0275elementEnd();
        \u0275\u0275element(20, "input", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "button", 10);
        \u0275\u0275listener("click", function PaymentsComponent_Template_button_click_21_listener() {
          return ctx.searchPatient();
        });
        \u0275\u0275text(22, " Buscar ");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(23, PaymentsComponent_div_23_Template, 10, 5, "div", 11);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(24, PaymentsComponent_mat_card_24_Template, 27, 3, "mat-card", 12)(25, PaymentsComponent_mat_card_25_Template, 6, 1, "mat-card", 12)(26, PaymentsComponent_mat_card_26_Template, 23, 3, "mat-card", 12);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(27, "mat-tab");
        \u0275\u0275template(28, PaymentsComponent_ng_template_28_Template, 3, 0, "ng-template", 3);
        \u0275\u0275elementStart(29, "div", 4);
        \u0275\u0275template(30, PaymentsComponent_mat_card_30_Template, 26, 4, "mat-card", 13)(31, PaymentsComponent_mat_card_31_Template, 15, 3, "mat-card", 12)(32, PaymentsComponent_mat_card_32_Template, 41, 7, "mat-card", 14)(33, PaymentsComponent_mat_card_33_Template, 44, 5, "mat-card", 14);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(14);
        \u0275\u0275property("formGroup", ctx.searchForm);
        \u0275\u0275advance(9);
        \u0275\u0275property("ngIf", ctx.patient);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.patient);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.pendingPayments.length > 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.paidPayments.length > 0);
        \u0275\u0275advance(4);
        \u0275\u0275property("ngIf", ctx.apptPaid);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.apptPaid);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.apptDetails && !ctx.apptPaid);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.apptDetails && !ctx.apptPaid);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, DatePipe, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, MaxLengthValidator, FormGroupDirective, FormControlName, FormsModule, NgModel, MatCardModule, MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatButtonModule, MatButton, MatIconModule, MatIcon, MatFormFieldModule, MatFormField, MatLabel, MatError, MatPrefix, MatInputModule, MatInput, MatSelectModule, MatSelect, MatOption, MatTableModule, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatDividerModule, MatDivider, MatTabsModule, MatTabLabel, MatTab, MatTabGroup, MatProgressSpinnerModule, MatProgressSpinner], styles: ["\n\n.payments-layout[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.6rem;\n  font-weight: 500;\n  color: #1565c0;\n  margin: 0;\n}\n.search-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: flex-end;\n}\n.patient-found[_ngcontent-%COMP%] {\n  background: #e8f5e9;\n  border-radius: 8px;\n  padding: 16px;\n  margin-top: 12px;\n}\n.patient-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.patient-meta[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #555;\n  margin-top: 4px;\n}\n.insurance-badge[_ngcontent-%COMP%] {\n  background: #fff3e0;\n  color: #e65100;\n  padding: 2px 8px;\n  border-radius: 8px;\n  margin-left: 8px;\n  font-size: 0.8rem;\n}\n.form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 12px;\n  margin-bottom: 16px;\n}\n.discount-summary[_ngcontent-%COMP%] {\n  background: #f8f9ff;\n  border-radius: 8px;\n  padding: 16px;\n  margin-bottom: 16px;\n}\n.summary-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  padding: 4px 0;\n}\n.summary-row.discount[_ngcontent-%COMP%] {\n  color: #2e7d32;\n}\n.summary-row.total[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  margin-top: 8px;\n}\n.payment-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 12px;\n  background: #f8f9ff;\n  border-radius: 8px;\n  margin-bottom: 8px;\n}\n.payment-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.payment-meta[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #555;\n}\n.appt-details-grid[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.appt-detail-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 0.93rem;\n}\n.appt-detail-row[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n  color: #1565c0;\n}\n.appt-amount[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n}\n.card-form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 12px;\n}\n.card-full[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.appt-success-card[_ngcontent-%COMP%] {\n  border-left: 4px solid #2e7d32;\n}\n.appt-success[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  align-items: flex-start;\n}\n.appt-success[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  color: #2e7d32;\n}\n.appt-success[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 6px;\n  color: #1b5e20;\n}\n.appt-success[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #555;\n  margin: 0 0 12px;\n}\n/*# sourceMappingURL=payments.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PaymentsComponent, { className: "PaymentsComponent", filePath: "src\\app\\modules\\payments\\payments.component.ts", lineNumber: 334 });
})();
export {
  PaymentsComponent
};
//# sourceMappingURL=chunk-XUOIKGAX.js.map
