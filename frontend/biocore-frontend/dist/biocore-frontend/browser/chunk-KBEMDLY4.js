import {
  AuthService
} from "./chunk-O6PUWTRR.js";
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
  LabExamService,
  LabService,
  MedicineService,
  PrescriptionService
} from "./chunk-6SNY3ZGW.js";
import {
  MatChipsModule
} from "./chunk-PA55PL57.js";
import {
  TicketService,
  VitalSignsService
} from "./chunk-ELYEA2RZ.js";
import "./chunk-MHA7Y7AJ.js";
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel
} from "./chunk-QEMZUU6G.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
  NumberValueAccessor,
  ReactiveFormsModule,
  ɵNgNoValidate
} from "./chunk-2J4O7HWV.js";
import "./chunk-EURQNLKS.js";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardSubtitle,
  MatCardTitle
} from "./chunk-ZXMIIXBI.js";
import "./chunk-2UH3GGF7.js";
import {
  MatButton,
  MatButtonModule,
  MatIcon,
  MatIconButton,
  MatIconModule,
  MatOptgroup,
  MatOption
} from "./chunk-KREJ5GPI.js";
import {
  CommonModule,
  NgForOf,
  NgIf,
  interval,
  startWith,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
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

// src/app/modules/consultation/consultation.component.ts
var _c0 = () => ({ standalone: true });
function ConsultationComponent_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 17)(1, "mat-icon");
    \u0275\u0275text(2, "radio_button_checked");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" Cl\xEDnica ", ctx_r0.assignedClinicName, " ");
  }
}
function ConsultationComponent_button_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function ConsultationComponent_button_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.markAbsent());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "person_off");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Paciente Ausente ");
    \u0275\u0275elementEnd();
  }
}
function ConsultationComponent_mat_spinner_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 19);
  }
}
function ConsultationComponent_mat_icon_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "campaign");
    \u0275\u0275elementEnd();
  }
}
function ConsultationComponent_p_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 20);
    \u0275\u0275text(1, "Complete la consulta actual primero");
    \u0275\u0275elementEnd();
  }
}
function ConsultationComponent_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "small");
    \u0275\u0275text(2, "\xDAltimo llamado:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.lastCalledTicket.ticketNumber);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" - ", ctx_r0.lastCalledTicket.patientName, " ");
  }
}
function ConsultationComponent_div_25_span_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 29);
    \u0275\u0275text(1, "URGENTE");
    \u0275\u0275elementEnd();
  }
}
function ConsultationComponent_div_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22)(1, "div", 23);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 24)(4, "div", 25);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 26);
    \u0275\u0275text(7);
    \u0275\u0275template(8, ConsultationComponent_div_25_span_8_Template, 2, 0, "span", 27);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "span", 28);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r3 = ctx.$implicit;
    const i_r4 = ctx.index;
    \u0275\u0275advance();
    \u0275\u0275classProp("urgent", t_r3.priority === "URGENT");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", t_r3.ticketNumber, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(t_r3.patientName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", t_r3.type, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", t_r3.priority === "URGENT");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("#", i_r4 + 1, "");
  }
}
function ConsultationComponent_p_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 30);
    \u0275\u0275text(1, "Sin pacientes en espera");
    \u0275\u0275elementEnd();
  }
}
function ConsultationComponent_mat_card_28_span_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 34);
    \u0275\u0275text(1, "URGENTE");
    \u0275\u0275elementEnd();
  }
}
function ConsultationComponent_mat_card_28_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "mat-icon", 36);
    \u0275\u0275text(2, "hourglass_top");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "strong");
    \u0275\u0275text(5, "Paciente en \xE1rea de Signos Vitales");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "El personal de salud est\xE1 tomando los signos vitales. La consulta habilitar\xE1 autom\xE1ticamente al recibir los datos.");
    \u0275\u0275elementEnd()()();
  }
}
function ConsultationComponent_mat_card_28_div_11_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42)(1, "span", 43);
    \u0275\u0275text(2, "Presi\xF3n Arterial");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 44);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.currentVitals.bloodPressure);
  }
}
function ConsultationComponent_mat_card_28_div_11_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42)(1, "span", 43);
    \u0275\u0275text(2, "Frec. Card\xEDaca");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 44);
    \u0275\u0275text(4);
    \u0275\u0275elementStart(5, "small");
    \u0275\u0275text(6, "bpm");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r0.currentVitals.heartRate, " ");
  }
}
function ConsultationComponent_mat_card_28_div_11_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42)(1, "span", 43);
    \u0275\u0275text(2, "Temperatura");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 44);
    \u0275\u0275text(4);
    \u0275\u0275elementStart(5, "small");
    \u0275\u0275text(6, "\xB0C");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r0.currentVitals.temperature, " ");
  }
}
function ConsultationComponent_mat_card_28_div_11_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42)(1, "span", 43);
    \u0275\u0275text(2, "Peso");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 44);
    \u0275\u0275text(4);
    \u0275\u0275elementStart(5, "small");
    \u0275\u0275text(6, "kg");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r0.currentVitals.weight, " ");
  }
}
function ConsultationComponent_mat_card_28_div_11_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42)(1, "span", 43);
    \u0275\u0275text(2, "Talla");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 44);
    \u0275\u0275text(4);
    \u0275\u0275elementStart(5, "small");
    \u0275\u0275text(6, "cm");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r0.currentVitals.height, " ");
  }
}
function ConsultationComponent_mat_card_28_div_11_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42)(1, "span", 43);
    \u0275\u0275text(2, "SpO\u2082");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 44);
    \u0275\u0275text(4);
    \u0275\u0275elementStart(5, "small");
    \u0275\u0275text(6, "%");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r0.currentVitals.oxygenSaturation, " ");
  }
}
function ConsultationComponent_mat_card_28_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37)(1, "div", 38)(2, "mat-icon");
    \u0275\u0275text(3, "monitor_heart");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "strong");
    \u0275\u0275text(5, "Signos Vitales");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 39);
    \u0275\u0275text(7, "Registrado por Personal de Salud");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 40);
    \u0275\u0275template(9, ConsultationComponent_mat_card_28_div_11_div_9_Template, 5, 1, "div", 41)(10, ConsultationComponent_mat_card_28_div_11_div_10_Template, 7, 1, "div", 41)(11, ConsultationComponent_mat_card_28_div_11_div_11_Template, 7, 1, "div", 41)(12, ConsultationComponent_mat_card_28_div_11_div_12_Template, 7, 1, "div", 41)(13, ConsultationComponent_mat_card_28_div_11_div_13_Template, 7, 1, "div", 41)(14, ConsultationComponent_mat_card_28_div_11_div_14_Template, 7, 1, "div", 41);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(9);
    \u0275\u0275property("ngIf", ctx_r0.currentVitals.bloodPressure);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.currentVitals.heartRate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.currentVitals.temperature);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.currentVitals.weight);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.currentVitals.height);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.currentVitals.oxygenSaturation);
  }
}
function ConsultationComponent_mat_card_28_div_13_div_14_mat_option_5_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 67);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(m_r8.code);
  }
}
function ConsultationComponent_mat_card_28_div_13_div_14_mat_option_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 64);
    \u0275\u0275template(1, ConsultationComponent_mat_card_28_div_13_div_14_mat_option_5_span_1_Template, 2, 1, "span", 65);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 66);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const m_r8 = ctx.$implicit;
    \u0275\u0275property("value", m_r8.id);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", m_r8.code);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", m_r8.name, " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("low", m_r8.stock <= 10);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \xB7 Stock: ", m_r8.stock, "");
  }
}
function ConsultationComponent_mat_card_28_div_13_div_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 55)(1, "mat-form-field", 56)(2, "mat-label");
    \u0275\u0275text(3, "Medicamento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "mat-select", 57);
    \u0275\u0275twoWayListener("ngModelChange", function ConsultationComponent_mat_card_28_div_13_div_14_Template_mat_select_ngModelChange_4_listener($event) {
      const item_r7 = \u0275\u0275restoreView(_r6).$implicit;
      \u0275\u0275twoWayBindingSet(item_r7.medicineId, $event) || (item_r7.medicineId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275template(5, ConsultationComponent_mat_card_28_div_13_div_14_mat_option_5_Template, 5, 6, "mat-option", 58);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "mat-form-field", 59)(7, "mat-label");
    \u0275\u0275text(8, "Cant.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 60);
    \u0275\u0275twoWayListener("ngModelChange", function ConsultationComponent_mat_card_28_div_13_div_14_Template_input_ngModelChange_9_listener($event) {
      const item_r7 = \u0275\u0275restoreView(_r6).$implicit;
      \u0275\u0275twoWayBindingSet(item_r7.quantity, $event) || (item_r7.quantity = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "mat-form-field", 61)(11, "mat-label");
    \u0275\u0275text(12, "Dosificaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 62);
    \u0275\u0275twoWayListener("ngModelChange", function ConsultationComponent_mat_card_28_div_13_div_14_Template_input_ngModelChange_13_listener($event) {
      const item_r7 = \u0275\u0275restoreView(_r6).$implicit;
      \u0275\u0275twoWayBindingSet(item_r7.dosage, $event) || (item_r7.dosage = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "button", 63);
    \u0275\u0275listener("click", function ConsultationComponent_mat_card_28_div_13_div_14_Template_button_click_14_listener() {
      const i_r9 = \u0275\u0275restoreView(_r6).index;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.removeItem(i_r9));
    });
    \u0275\u0275elementStart(15, "mat-icon");
    \u0275\u0275text(16, "delete");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", item_r7.medicineId);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(7, _c0));
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.medicines);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", item_r7.quantity);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(8, _c0));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", item_r7.dosage);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(9, _c0));
  }
}
function ConsultationComponent_mat_card_28_div_13_div_24_mat_optgroup_5_mat_option_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 64)(1, "span", 72);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r12 = ctx.$implicit;
    \u0275\u0275property("value", e_r12.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r12.code);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", e_r12.name, " ");
  }
}
function ConsultationComponent_mat_card_28_div_13_div_24_mat_optgroup_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-optgroup", 71);
    \u0275\u0275template(1, ConsultationComponent_mat_card_28_div_13_div_24_mat_optgroup_5_mat_option_1_Template, 4, 3, "mat-option", 58);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cat_r13 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275property("label", cat_r13);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.getExamsByCategory(cat_r13));
  }
}
function ConsultationComponent_mat_card_28_div_13_div_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 68)(1, "mat-form-field", 56)(2, "mat-label");
    \u0275\u0275text(3, "Examen");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "mat-select", 57);
    \u0275\u0275twoWayListener("ngModelChange", function ConsultationComponent_mat_card_28_div_13_div_24_Template_mat_select_ngModelChange_4_listener($event) {
      const lab_r11 = \u0275\u0275restoreView(_r10).$implicit;
      \u0275\u0275twoWayBindingSet(lab_r11.labExamId, $event) || (lab_r11.labExamId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275template(5, ConsultationComponent_mat_card_28_div_13_div_24_mat_optgroup_5_Template, 2, 2, "mat-optgroup", 69);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "mat-form-field", 61)(7, "mat-label");
    \u0275\u0275text(8, "Notas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 70);
    \u0275\u0275twoWayListener("ngModelChange", function ConsultationComponent_mat_card_28_div_13_div_24_Template_input_ngModelChange_9_listener($event) {
      const lab_r11 = \u0275\u0275restoreView(_r10).$implicit;
      \u0275\u0275twoWayBindingSet(lab_r11.notes, $event) || (lab_r11.notes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "button", 63);
    \u0275\u0275listener("click", function ConsultationComponent_mat_card_28_div_13_div_24_Template_button_click_10_listener() {
      const i_r14 = \u0275\u0275restoreView(_r10).index;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.removeLabItem(i_r14));
    });
    \u0275\u0275elementStart(11, "mat-icon");
    \u0275\u0275text(12, "delete");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const lab_r11 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", lab_r11.labExamId);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(5, _c0));
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.labCategories);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", lab_r11.notes);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(6, _c0));
  }
}
function ConsultationComponent_mat_card_28_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "h4")(2, "mat-icon");
    \u0275\u0275text(3, "edit_note");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Diagn\xF3stico y Receta");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "form", 45)(6, "mat-form-field", 46)(7, "mat-label");
    \u0275\u0275text(8, "Diagn\xF3stico");
    \u0275\u0275elementEnd();
    \u0275\u0275element(9, "textarea", 47);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "h5")(11, "mat-icon", 48);
    \u0275\u0275text(12, "medication");
    \u0275\u0275elementEnd();
    \u0275\u0275text(13, " Medicamentos (Receta)");
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, ConsultationComponent_mat_card_28_div_13_div_14_Template, 17, 10, "div", 49);
    \u0275\u0275elementStart(15, "button", 50);
    \u0275\u0275listener("click", function ConsultationComponent_mat_card_28_div_13_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.addItem());
    });
    \u0275\u0275elementStart(16, "mat-icon");
    \u0275\u0275text(17, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(18, " Agregar Medicamento ");
    \u0275\u0275elementEnd();
    \u0275\u0275element(19, "mat-divider", 51);
    \u0275\u0275elementStart(20, "h5")(21, "mat-icon", 48);
    \u0275\u0275text(22, "science");
    \u0275\u0275elementEnd();
    \u0275\u0275text(23, " \xD3rdenes de Laboratorio");
    \u0275\u0275elementEnd();
    \u0275\u0275template(24, ConsultationComponent_mat_card_28_div_13_div_24_Template, 13, 7, "div", 52);
    \u0275\u0275elementStart(25, "button", 50);
    \u0275\u0275listener("click", function ConsultationComponent_mat_card_28_div_13_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.addLabItem());
    });
    \u0275\u0275elementStart(26, "mat-icon");
    \u0275\u0275text(27, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(28, " Agregar Orden de Laboratorio ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 53)(30, "button", 54);
    \u0275\u0275listener("click", function ConsultationComponent_mat_card_28_div_13_Template_button_click_30_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.completeDiagnosis());
    });
    \u0275\u0275elementStart(31, "mat-icon");
    \u0275\u0275text(32, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(33, " Completar Consulta ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275property("formGroup", ctx_r0.consultationForm);
    \u0275\u0275advance(9);
    \u0275\u0275property("ngForOf", ctx_r0.prescriptionItems);
    \u0275\u0275advance(10);
    \u0275\u0275property("ngForOf", ctx_r0.labOrderItems);
  }
}
function ConsultationComponent_mat_card_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card")(1, "mat-card-header")(2, "mat-card-title")(3, "mat-icon");
    \u0275\u0275text(4, "medical_services");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "mat-card-subtitle");
    \u0275\u0275text(7);
    \u0275\u0275template(8, ConsultationComponent_mat_card_28_span_8_Template, 2, 0, "span", 31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "mat-card-content");
    \u0275\u0275template(10, ConsultationComponent_mat_card_28_div_10_Template, 8, 0, "div", 32)(11, ConsultationComponent_mat_card_28_div_11_Template, 15, 6, "div", 33);
    \u0275\u0275element(12, "mat-divider", 12);
    \u0275\u0275template(13, ConsultationComponent_mat_card_28_div_13_Template, 34, 3, "div", 9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" Paciente: ", ctx_r0.currentTicket.patientName, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" Ticket: ", ctx_r0.currentTicket.ticketNumber, " \xB7 ", ctx_r0.currentTicket.clinicName, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.currentTicket.priority === "URGENT");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r0.currentTicket.status === "BEING_CALLED");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.currentVitals);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r0.currentTicket.status === "IN_CONSULTATION");
  }
}
function ConsultationComponent_mat_card_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 73)(1, "mat-icon", 74);
    \u0275\u0275text(2, "stethoscope");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "No hay consulta activa.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 20);
    \u0275\u0275text(6, "Llame al siguiente paciente de la cola.");
    \u0275\u0275elementEnd()();
  }
}
var ConsultationComponent = class _ConsultationComponent {
  constructor(fb, ticketService, vitalSignsService, prescriptionService, labService, labExamService, medicineService, authService, notification) {
    this.fb = fb;
    this.ticketService = ticketService;
    this.vitalSignsService = vitalSignsService;
    this.prescriptionService = prescriptionService;
    this.labService = labService;
    this.labExamService = labExamService;
    this.medicineService = medicineService;
    this.authService = authService;
    this.notification = notification;
    this.queue = [];
    this.currentTicket = null;
    this.lastCalledTicket = null;
    this.currentVitals = null;
    this.medicines = [];
    this.labExams = [];
    this.labCategories = [];
    this.prescriptionItems = [];
    this.labOrderItems = [];
    this.calling = false;
    this.assignedClinicId = null;
    this.assignedClinicName = "";
  }
  ngOnInit() {
    this.consultationForm = this.fb.group({ notes: [""] });
    this.medicineService.getAll().subscribe((res) => {
      if (res.success)
        this.medicines = res.data;
    });
    this.labExamService.getAll().subscribe((res) => {
      if (res.success) {
        this.labExams = res.data;
        this.labCategories = [...new Set(res.data.map((e) => e.category))].sort();
      }
    });
    this.sub = interval(5e3).pipe(startWith(0)).subscribe(() => this.loadQueue());
  }
  loadQueue() {
    this.ticketService.getAll().subscribe((res) => {
      if (!res.success)
        return;
      const myId = this.authService.getUserId();
      const myTicket = res.data.find((t) => (t.status === "IN_CONSULTATION" || t.status === "BEING_CALLED") && t.doctorId === myId);
      if (myTicket) {
        if (!this.assignedClinicId) {
          this.assignedClinicId = myTicket.clinicId;
          this.assignedClinicName = myTicket.clinicName;
        }
        const isNew = !this.currentTicket || this.currentTicket.id !== myTicket.id;
        const changed = this.currentTicket && this.currentTicket.status !== myTicket.status;
        if (isNew || changed) {
          this.currentTicket = myTicket;
          this.currentVitals = null;
          this.loadCurrentVitals();
        }
      } else if (!this.assignedClinicId && res.data.length > 0) {
        this.assignedClinicId = res.data[0]?.clinicId;
        this.assignedClinicName = res.data[0]?.clinicName;
      }
      if (this.assignedClinicId)
        this.loadClinicQueue();
      if (this.currentTicket && !this.currentVitals) {
        this.loadCurrentVitals();
      }
    });
  }
  loadClinicQueue() {
    this.ticketService.getQueue(this.assignedClinicId).subscribe((res) => {
      if (res.success)
        this.queue = res.data;
    });
  }
  callNext() {
    if (!this.assignedClinicId)
      return;
    this.calling = true;
    this.ticketService.callNext(this.assignedClinicId).subscribe({
      next: (res) => {
        if (res.success) {
          this.lastCalledTicket = res.data;
          this.currentTicket = res.data;
          this.currentVitals = null;
          this.notification.info(`Llamando: ${res.data.ticketNumber} \u2014 dirija al paciente al \xE1rea de Signos Vitales`);
        }
        this.calling = false;
      },
      error: () => {
        this.notification.error("Error al llamar paciente");
        this.calling = false;
      }
    });
  }
  loadCurrentVitals() {
    if (!this.currentTicket)
      return;
    this.vitalSignsService.getByTicket(this.currentTicket.id).subscribe({
      next: (res) => {
        if (res.success)
          this.currentVitals = res.data;
      },
      error: () => {
      }
    });
  }
  addItem() {
    this.prescriptionItems.push({ medicineId: null, quantity: 1, dosage: "", instructions: "" });
  }
  removeItem(i) {
    this.prescriptionItems.splice(i, 1);
  }
  addLabItem() {
    this.labOrderItems.push({ labExamId: null, notes: "" });
  }
  removeLabItem(i) {
    this.labOrderItems.splice(i, 1);
  }
  getExamsByCategory(category) {
    return this.labExams.filter((e) => e.category === category);
  }
  completeDiagnosis() {
    if (!this.currentTicket)
      return;
    const userId = this.authService.getUserId();
    const finalize = () => {
      this.ticketService.complete(this.currentTicket.id).subscribe({
        next: () => {
          this.notification.success("Consulta completada");
          this.currentTicket = null;
          this.currentVitals = null;
          this.prescriptionItems = [];
          this.labOrderItems = [];
          this.consultationForm.reset();
          this.loadClinicQueue();
        }
      });
    };
    const createLabOrders = (onDone) => {
      const validLabItems = this.labOrderItems.filter((l) => l.labExamId);
      if (validLabItems.length === 0) {
        onDone();
        return;
      }
      let pending = validLabItems.length;
      validLabItems.forEach((l) => {
        this.labService.create({
          patientId: this.currentTicket.patientId,
          doctorId: userId,
          ticketId: this.currentTicket.id,
          labExamId: l.labExamId,
          notes: l.notes
        }).subscribe({
          next: () => {
            if (--pending === 0) {
              this.notification.success("\xD3rdenes de laboratorio generadas");
              onDone();
            }
          },
          error: () => {
            if (--pending === 0)
              onDone();
          }
        });
      });
    };
    if (this.prescriptionItems.length > 0) {
      this.prescriptionService.create({
        patientId: this.currentTicket.patientId,
        doctorId: userId,
        ticketId: this.currentTicket.id,
        notes: this.consultationForm.value.notes,
        items: this.prescriptionItems
      }).subscribe({
        next: () => {
          this.notification.success("Receta generada");
          createLabOrders(finalize);
        },
        error: () => createLabOrders(finalize)
      });
    } else {
      createLabOrders(finalize);
    }
  }
  markAbsent() {
    if (!this.currentTicket)
      return;
    this.ticketService.markAbsent(this.currentTicket.id).subscribe({
      next: () => {
        this.notification.info("Paciente marcado como ausente");
        this.currentTicket = null;
        this.currentVitals = null;
        this.loadClinicQueue();
      }
    });
  }
  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
  static {
    this.\u0275fac = function ConsultationComponent_Factory(t) {
      return new (t || _ConsultationComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(TicketService), \u0275\u0275directiveInject(VitalSignsService), \u0275\u0275directiveInject(PrescriptionService), \u0275\u0275directiveInject(LabService), \u0275\u0275directiveInject(LabExamService), \u0275\u0275directiveInject(MedicineService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(NotificationService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ConsultationComponent, selectors: [["app-consultation"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 30, vars: 12, consts: [[1, "page-container"], [1, "page-header"], [1, "header-right"], ["class", "realtime-badge", 4, "ngIf"], ["mat-raised-button", "", "color", "warn", "title", "Paciente no se present\xF3", 3, "click", 4, "ngIf"], [1, "consultation-layout"], [1, "queue-panel"], ["mat-raised-button", "", "color", "primary", 1, "call-btn", 3, "click", "disabled"], ["diameter", "20", 4, "ngIf"], [4, "ngIf"], ["class", "hint", 4, "ngIf"], ["class", "last-called", 4, "ngIf"], [1, "mt-16", "mb-16"], ["class", "queue-ticket", 4, "ngFor", "ngForOf"], ["class", "empty-msg", 4, "ngIf"], [1, "consultation-panel"], ["class", "empty-consultation", 4, "ngIf"], [1, "realtime-badge"], ["mat-raised-button", "", "color", "warn", "title", "Paciente no se present\xF3", 3, "click"], ["diameter", "20"], [1, "hint"], [1, "last-called"], [1, "queue-ticket"], [1, "ticket-number"], [1, "ticket-info"], [1, "ticket-patient"], [1, "ticket-meta"], ["class", "emergency-badge", 4, "ngIf"], [1, "pos-badge"], [1, "emergency-badge"], [1, "empty-msg"], ["class", "emergency-badge ml-8", 4, "ngIf"], ["class", "vitals-waiting", 4, "ngIf"], ["class", "vitals-received", 4, "ngIf"], [1, "emergency-badge", "ml-8"], [1, "vitals-waiting"], [1, "spin-icon"], [1, "vitals-received"], [1, "vitals-header"], [1, "vitals-from"], [1, "vitals-grid-display"], ["class", "vital-item", 4, "ngIf"], [1, "vital-item"], [1, "vital-label"], [1, "vital-value"], [3, "formGroup"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "formControlName", "notes", "rows", "3"], [2, "vertical-align", "middle", "font-size", "18px"], ["class", "medicine-row", 4, "ngFor", "ngForOf"], ["mat-stroked-button", "", 1, "mb-16", 3, "click"], [1, "mb-16"], ["class", "lab-row", 4, "ngFor", "ngForOf"], [1, "action-buttons"], ["mat-raised-button", "", "color", "primary", 3, "click"], [1, "medicine-row"], ["appearance", "outline", 2, "flex", "2"], [3, "ngModelChange", "ngModel", "ngModelOptions"], [3, "value", 4, "ngFor", "ngForOf"], ["appearance", "outline", 2, "width", "90px"], ["matInput", "", "type", "number", "min", "1", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["appearance", "outline", 2, "flex", "1"], ["matInput", "", "placeholder", "ej. 1 tableta cada 8h", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["mat-icon-button", "", "color", "warn", "title", "Quitar", 3, "click"], [3, "value"], ["class", "med-code", 4, "ngIf"], [1, "med-stock"], [1, "med-code"], [1, "lab-row"], [3, "label", 4, "ngFor", "ngForOf"], ["matInput", "", "placeholder", "Indicaciones", 3, "ngModelChange", "ngModel", "ngModelOptions"], [3, "label"], [1, "exam-code"], [1, "empty-consultation"], [1, "big-icon"]], template: function ConsultationComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
        \u0275\u0275text(3, "Consulta M\xE9dica");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "div", 2);
        \u0275\u0275template(5, ConsultationComponent_span_5_Template, 4, 1, "span", 3)(6, ConsultationComponent_button_6_Template, 4, 0, "button", 4);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "div", 5)(8, "div", 6)(9, "mat-card")(10, "mat-card-header")(11, "mat-card-title")(12, "mat-icon");
        \u0275\u0275text(13, "queue");
        \u0275\u0275elementEnd();
        \u0275\u0275text(14, " Cola de Espera ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "mat-card-subtitle");
        \u0275\u0275text(16);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(17, "mat-card-content")(18, "button", 7);
        \u0275\u0275listener("click", function ConsultationComponent_Template_button_click_18_listener() {
          return ctx.callNext();
        });
        \u0275\u0275template(19, ConsultationComponent_mat_spinner_19_Template, 1, 0, "mat-spinner", 8)(20, ConsultationComponent_mat_icon_20_Template, 2, 0, "mat-icon", 9);
        \u0275\u0275text(21, " Llamar Siguiente Paciente ");
        \u0275\u0275elementEnd();
        \u0275\u0275template(22, ConsultationComponent_p_22_Template, 2, 0, "p", 10)(23, ConsultationComponent_div_23_Template, 6, 2, "div", 11);
        \u0275\u0275element(24, "mat-divider", 12);
        \u0275\u0275template(25, ConsultationComponent_div_25_Template, 11, 7, "div", 13)(26, ConsultationComponent_p_26_Template, 2, 0, "p", 14);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(27, "div", 15);
        \u0275\u0275template(28, ConsultationComponent_mat_card_28_Template, 14, 7, "mat-card", 9)(29, ConsultationComponent_mat_card_29_Template, 7, 0, "mat-card", 16);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", ctx.assignedClinicId);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.currentTicket);
        \u0275\u0275advance(10);
        \u0275\u0275textInterpolate1("", ctx.queue.length, " paciente(s) esperando");
        \u0275\u0275advance(2);
        \u0275\u0275property("disabled", !ctx.assignedClinicId || !!ctx.currentTicket || ctx.queue.length === 0 || ctx.calling);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.calling);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.calling);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", !!ctx.currentTicket);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.lastCalledTicket);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.queue);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.queue.length === 0);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.currentTicket);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.currentTicket);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, FormGroupDirective, FormControlName, FormsModule, NgModel, MatCardModule, MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle, MatButtonModule, MatButton, MatIconButton, MatIconModule, MatIcon, MatFormFieldModule, MatFormField, MatLabel, MatInputModule, MatInput, MatSelectModule, MatSelect, MatOption, MatOptgroup, MatDividerModule, MatDivider, MatProgressSpinnerModule, MatProgressSpinner, MatChipsModule], styles: ["\n\n.consultation-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 320px 1fr;\n  gap: 24px;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.6rem;\n  font-weight: 500;\n  color: #1565c0;\n  margin: 0;\n}\n.header-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.realtime-badge[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  background: #e8f5e9;\n  color: #2e7d32;\n  padding: 4px 12px;\n  border-radius: 16px;\n  font-size: 0.8rem;\n}\n.call-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-bottom: 8px;\n}\n.last-called[_ngcontent-%COMP%] {\n  background: #e3f2fd;\n  border-radius: 8px;\n  padding: 12px;\n  font-size: 0.9rem;\n  margin-top: 8px;\n}\n.last-called[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  color: #1565c0;\n}\n.pos-badge[_ngcontent-%COMP%] {\n  background: #e0e0e0;\n  border-radius: 50%;\n  width: 28px;\n  height: 28px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.8rem;\n  font-weight: 700;\n}\n.ticket-number.urgent[_ngcontent-%COMP%] {\n  color: #c62828;\n}\n.empty-msg[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #9e9e9e;\n  padding: 24px 0;\n}\n.hint[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #9e9e9e;\n  margin: 4px 0;\n}\n.vitals-waiting[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  background: #fff8e1;\n  border: 1px solid #ffe082;\n  border-radius: 8px;\n  padding: 16px;\n  margin-bottom: 16px;\n}\n.vitals-waiting[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #f57f17;\n  font-size: 28px;\n  width: 28px;\n  height: 28px;\n  flex-shrink: 0;\n  margin-top: 2px;\n}\n.vitals-waiting[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  color: #e65100;\n  margin-bottom: 4px;\n}\n.vitals-waiting[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: #666;\n  margin: 0;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.spin-icon[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 2s linear infinite;\n}\n.vitals-received[_ngcontent-%COMP%] {\n  background: #e8f5e9;\n  border: 1px solid #a5d6a7;\n  border-radius: 8px;\n  padding: 16px;\n  margin-bottom: 16px;\n}\n.vitals-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 12px;\n  color: #2e7d32;\n}\n.vitals-from[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #66bb6a;\n  margin-left: auto;\n  background: #c8e6c9;\n  padding: 2px 8px;\n  border-radius: 10px;\n}\n.vitals-grid-display[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 8px;\n}\n.vital-item[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 6px;\n  padding: 10px 12px;\n}\n.vital-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.72rem;\n  color: #757575;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-bottom: 4px;\n}\n.vital-value[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  font-weight: 700;\n  color: #1D6C61;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.medicine-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  margin-bottom: 8px;\n}\n.lab-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  margin-bottom: 8px;\n}\n.med-code[_ngcontent-%COMP%] {\n  font-family: monospace;\n  font-size: 0.75rem;\n  color: #1D6C61;\n  background: #d0f4ef;\n  padding: 1px 5px;\n  border-radius: 4px;\n  margin-right: 4px;\n}\n.exam-code[_ngcontent-%COMP%] {\n  font-family: monospace;\n  font-size: 0.75rem;\n  color: #3EB9A8;\n  background: #193A31;\n  padding: 1px 5px;\n  border-radius: 4px;\n  margin-right: 4px;\n}\n.med-stock[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: #666;\n}\n.med-stock.low[_ngcontent-%COMP%] {\n  color: #c62828;\n  font-weight: 600;\n}\n.action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n}\n.empty-consultation[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 60px;\n  text-align: center;\n}\n.big-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  color: #9e9e9e;\n  margin-bottom: 16px;\n}\n.success-msg[_ngcontent-%COMP%] {\n  color: #2e7d32;\n  font-size: 0.85rem;\n  margin-left: 8px;\n}\n.ml-8[_ngcontent-%COMP%] {\n  margin-left: 8px;\n}\n.mt-16[_ngcontent-%COMP%] {\n  margin-top: 16px;\n}\n.mb-16[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\nh4[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 600;\n  margin-bottom: 12px;\n}\nh5[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: #1D6C61;\n  margin-bottom: 8px;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n/*# sourceMappingURL=consultation.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ConsultationComponent, { className: "ConsultationComponent", filePath: "src\\app\\modules\\consultation\\consultation.component.ts", lineNumber: 283 });
})();
export {
  ConsultationComponent
};
//# sourceMappingURL=chunk-KBEMDLY4.js.map
