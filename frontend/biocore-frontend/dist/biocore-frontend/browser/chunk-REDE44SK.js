import {
  AuthService
} from "./chunk-N3CSS5F2.js";
import {
  MatDivider,
  MatDividerModule
} from "./chunk-HY6CPDTU.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-AY5RGERM.js";
import {
  LabService,
  MedicineService,
  PrescriptionService
} from "./chunk-NYQQYANC.js";
import "./chunk-ZOTSATNJ.js";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-DDIHC4EZ.js";
import {
  NotificationService
} from "./chunk-7NN3FNQB.js";
import "./chunk-DMTJYVKR.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-KK4M4ZLY.js";
import {
  MatChipsModule
} from "./chunk-IFZAJIVN.js";
import "./chunk-7TOHHRAU.js";
import {
  TicketService,
  VitalSignsService
} from "./chunk-UTJYQ6K7.js";
import "./chunk-TFS6RWUB.js";
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel
} from "./chunk-SJJOW5UO.js";
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
  ɵNgNoValidate
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
  MatButton,
  MatButtonModule,
  MatIcon,
  MatIconButton,
  MatIconModule,
  MatOption,
  NgForOf,
  NgIf,
  __spreadProps,
  __spreadValues,
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
} from "./chunk-R33V2XU6.js";

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
    \u0275\u0275text(1, "RN-C04: Complete la consulta actual primero");
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
function ConsultationComponent_mat_card_28_button_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 35);
    \u0275\u0275listener("click", function ConsultationComponent_mat_card_28_button_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.confirmArrival());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "how_to_reg");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Confirmar Llegada del Paciente ");
    \u0275\u0275elementEnd();
  }
}
function ConsultationComponent_mat_card_28_div_11_span_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 47);
    \u0275\u0275text(1, "\u2713 Signos guardados");
    \u0275\u0275elementEnd();
  }
}
function ConsultationComponent_mat_card_28_div_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 36)(1, "h4")(2, "mat-icon");
    \u0275\u0275text(3, "monitor_heart");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Signos Vitales (RN-03: Obligatorio)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "form", 37)(6, "mat-form-field", 38)(7, "mat-label");
    \u0275\u0275text(8, "Presi\xF3n Arterial");
    \u0275\u0275elementEnd();
    \u0275\u0275element(9, "input", 39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "mat-form-field", 38)(11, "mat-label");
    \u0275\u0275text(12, "Frec. Card\xEDaca (bpm)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(13, "input", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "mat-form-field", 38)(15, "mat-label");
    \u0275\u0275text(16, "Temperatura (\xB0C)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(17, "input", 41);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "mat-form-field", 38)(19, "mat-label");
    \u0275\u0275text(20, "Peso (kg)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(21, "input", 42);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "mat-form-field", 38)(23, "mat-label");
    \u0275\u0275text(24, "Talla (cm)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(25, "input", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "mat-form-field", 38)(27, "mat-label");
    \u0275\u0275text(28, "SpO2 (%)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(29, "input", 44);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "button", 45);
    \u0275\u0275listener("click", function ConsultationComponent_mat_card_28_div_11_Template_button_click_30_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.saveVitals());
    });
    \u0275\u0275elementStart(31, "mat-icon");
    \u0275\u0275text(32, "save");
    \u0275\u0275elementEnd();
    \u0275\u0275text(33, " Guardar Signos Vitales ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(34, ConsultationComponent_mat_card_28_div_11_span_34_Template, 2, 0, "span", 46);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275property("formGroup", ctx_r0.vitalsForm);
    \u0275\u0275advance(25);
    \u0275\u0275property("disabled", ctx_r0.vitalsForm.invalid);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r0.vitalsSaved);
  }
}
function ConsultationComponent_mat_card_28_div_13_div_12_mat_option_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 62);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r10 = ctx.$implicit;
    \u0275\u0275property("value", m_r10.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", m_r10.name, " (Stock: ", m_r10.stock, ") ");
  }
}
function ConsultationComponent_mat_card_28_div_13_div_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 55)(1, "mat-form-field", 38)(2, "mat-label");
    \u0275\u0275text(3, "Medicamento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "mat-select", 56);
    \u0275\u0275twoWayListener("ngModelChange", function ConsultationComponent_mat_card_28_div_13_div_12_Template_mat_select_ngModelChange_4_listener($event) {
      const item_r9 = \u0275\u0275restoreView(_r8).$implicit;
      \u0275\u0275twoWayBindingSet(item_r9.medicineId, $event) || (item_r9.medicineId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275template(5, ConsultationComponent_mat_card_28_div_13_div_12_mat_option_5_Template, 2, 3, "mat-option", 57);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "mat-form-field", 58)(7, "mat-label");
    \u0275\u0275text(8, "Cantidad");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 59);
    \u0275\u0275twoWayListener("ngModelChange", function ConsultationComponent_mat_card_28_div_13_div_12_Template_input_ngModelChange_9_listener($event) {
      const item_r9 = \u0275\u0275restoreView(_r8).$implicit;
      \u0275\u0275twoWayBindingSet(item_r9.quantity, $event) || (item_r9.quantity = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "mat-form-field", 38)(11, "mat-label");
    \u0275\u0275text(12, "Dosificaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 60);
    \u0275\u0275twoWayListener("ngModelChange", function ConsultationComponent_mat_card_28_div_13_div_12_Template_input_ngModelChange_13_listener($event) {
      const item_r9 = \u0275\u0275restoreView(_r8).$implicit;
      \u0275\u0275twoWayBindingSet(item_r9.dosage, $event) || (item_r9.dosage = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "button", 61);
    \u0275\u0275listener("click", function ConsultationComponent_mat_card_28_div_13_div_12_Template_button_click_14_listener() {
      const i_r11 = \u0275\u0275restoreView(_r8).index;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.removeItem(i_r11));
    });
    \u0275\u0275elementStart(15, "mat-icon");
    \u0275\u0275text(16, "delete");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r9 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", item_r9.medicineId);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(7, _c0));
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.medicines);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", item_r9.quantity);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(8, _c0));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", item_r9.dosage);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(9, _c0));
  }
}
function ConsultationComponent_mat_card_28_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "h4")(2, "mat-icon");
    \u0275\u0275text(3, "edit_note");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Diagn\xF3stico y Receta");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "form", 48)(6, "mat-form-field", 49)(7, "mat-label");
    \u0275\u0275text(8, "Diagn\xF3stico");
    \u0275\u0275elementEnd();
    \u0275\u0275element(9, "textarea", 50);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "h5");
    \u0275\u0275text(11, "Medicamentos (Receta)");
    \u0275\u0275elementEnd();
    \u0275\u0275template(12, ConsultationComponent_mat_card_28_div_13_div_12_Template, 17, 10, "div", 51);
    \u0275\u0275elementStart(13, "button", 52);
    \u0275\u0275listener("click", function ConsultationComponent_mat_card_28_div_13_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.addItem());
    });
    \u0275\u0275elementStart(14, "mat-icon");
    \u0275\u0275text(15, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(16, " Agregar Medicamento ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 53)(18, "button", 54);
    \u0275\u0275listener("click", function ConsultationComponent_mat_card_28_div_13_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.completeDiagnosis());
    });
    \u0275\u0275elementStart(19, "mat-icon");
    \u0275\u0275text(20, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(21, " Completar Consulta ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275property("formGroup", ctx_r0.consultationForm);
    \u0275\u0275advance(7);
    \u0275\u0275property("ngForOf", ctx_r0.prescriptionItems);
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
    \u0275\u0275template(10, ConsultationComponent_mat_card_28_button_10_Template, 4, 0, "button", 32)(11, ConsultationComponent_mat_card_28_div_11_Template, 35, 3, "div", 33);
    \u0275\u0275element(12, "mat-divider", 12);
    \u0275\u0275template(13, ConsultationComponent_mat_card_28_div_13_Template, 22, 2, "div", 9);
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
    \u0275\u0275property("ngIf", ctx_r0.currentTicket.status !== "COMPLETED");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r0.currentTicket.status === "IN_CONSULTATION");
  }
}
function ConsultationComponent_mat_card_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 63)(1, "mat-icon", 64);
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
  constructor(fb, ticketService, vitalSignsService, prescriptionService, labService, medicineService, authService, notification) {
    this.fb = fb;
    this.ticketService = ticketService;
    this.vitalSignsService = vitalSignsService;
    this.prescriptionService = prescriptionService;
    this.labService = labService;
    this.medicineService = medicineService;
    this.authService = authService;
    this.notification = notification;
    this.queue = [];
    this.currentTicket = null;
    this.lastCalledTicket = null;
    this.medicines = [];
    this.prescriptionItems = [];
    this.vitalsSaved = false;
    this.calling = false;
    this.assignedClinicId = null;
    this.assignedClinicName = "";
  }
  ngOnInit() {
    this.vitalsForm = this.fb.group({
      bloodPressure: [""],
      heartRate: [null],
      temperature: [null],
      weight: [null],
      height: [null],
      oxygenSaturation: [null]
    });
    this.consultationForm = this.fb.group({ notes: [""] });
    this.medicineService.getAll().subscribe((res) => {
      if (res.success)
        this.medicines = res.data;
    });
    this.sub = interval(5e3).pipe(startWith(0)).subscribe(() => this.loadQueue());
  }
  loadQueue() {
    if (!this.assignedClinicId) {
      this.ticketService.getAll().subscribe((res) => {
        if (res.success && res.data.length > 0) {
          const myTicket = res.data.find((t) => t.status === "IN_CONSULTATION" && t.doctorId === this.authService.getUserId());
          if (myTicket) {
            this.assignedClinicId = myTicket.clinicId;
            this.assignedClinicName = myTicket.clinicName;
            this.currentTicket = myTicket;
          }
          const firstClinic = res.data[0]?.clinicId;
          if (!this.assignedClinicId && firstClinic) {
            this.assignedClinicId = firstClinic;
            this.assignedClinicName = res.data[0]?.clinicName;
          }
          if (this.assignedClinicId)
            this.loadClinicQueue();
        }
      });
    } else {
      this.loadClinicQueue();
    }
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
          this.vitalsSaved = false;
          this.notification.info(`Llamando: ${res.data.ticketNumber} - ${res.data.patientName}`);
        }
        this.calling = false;
      },
      error: (err) => {
        this.notification.error("Error al llamar paciente");
        this.calling = false;
      }
    });
  }
  confirmArrival() {
    if (!this.currentTicket)
      return;
    this.ticketService.confirmArrival(this.currentTicket.id).subscribe({
      next: (res) => {
        if (res.success) {
          this.currentTicket = res.data;
          this.notification.success("Consulta iniciada");
        }
      },
      error: (err) => this.notification.error("Registre los signos vitales primero (RN-03)")
    });
  }
  saveVitals() {
    if (!this.currentTicket)
      return;
    const data = __spreadProps(__spreadValues({}, this.vitalsForm.value), { ticketId: this.currentTicket.id });
    this.vitalSignsService.register(data).subscribe({
      next: (res) => {
        if (res.success) {
          this.vitalsSaved = true;
          this.notification.success("Signos vitales guardados");
        }
      },
      error: () => this.notification.error("Error al guardar signos vitales")
    });
  }
  addItem() {
    this.prescriptionItems.push({ medicineId: null, quantity: 1, dosage: "", instructions: "" });
  }
  removeItem(i) {
    this.prescriptionItems.splice(i, 1);
  }
  completeDiagnosis() {
    if (!this.currentTicket)
      return;
    const finalize = () => {
      this.ticketService.complete(this.currentTicket.id).subscribe({
        next: () => {
          this.notification.success("Consulta completada");
          this.currentTicket = null;
          this.prescriptionItems = [];
          this.consultationForm.reset();
          this.loadClinicQueue();
        }
      });
    };
    if (this.prescriptionItems.length > 0) {
      const userId = this.authService.getUserId();
      this.prescriptionService.create({
        patientId: this.currentTicket.patientId,
        doctorId: userId,
        ticketId: this.currentTicket.id,
        notes: this.consultationForm.value.notes,
        items: this.prescriptionItems
      }).subscribe({
        next: () => {
          this.notification.success("Receta generada");
          finalize();
        },
        error: () => finalize()
      });
    } else {
      finalize();
    }
  }
  markAbsent() {
    if (!this.currentTicket)
      return;
    this.ticketService.markAbsent(this.currentTicket.id).subscribe({
      next: () => {
        this.notification.info("Paciente marcado como ausente");
        this.currentTicket = null;
        this.loadClinicQueue();
      }
    });
  }
  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
  static {
    this.\u0275fac = function ConsultationComponent_Factory(t) {
      return new (t || _ConsultationComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(TicketService), \u0275\u0275directiveInject(VitalSignsService), \u0275\u0275directiveInject(PrescriptionService), \u0275\u0275directiveInject(LabService), \u0275\u0275directiveInject(MedicineService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(NotificationService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ConsultationComponent, selectors: [["app-consultation"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 30, vars: 12, consts: [[1, "page-container"], [1, "page-header"], [1, "header-right"], ["class", "realtime-badge", 4, "ngIf"], ["mat-raised-button", "", "color", "warn", "title", "FA01: Paciente no se present\xF3", 3, "click", 4, "ngIf"], [1, "consultation-layout"], [1, "queue-panel"], ["mat-raised-button", "", "color", "primary", 1, "call-btn", 3, "click", "disabled"], ["diameter", "20", 4, "ngIf"], [4, "ngIf"], ["class", "hint", 4, "ngIf"], ["class", "last-called", 4, "ngIf"], [1, "mt-16", "mb-16"], ["class", "queue-ticket", 4, "ngFor", "ngForOf"], ["class", "empty-msg", 4, "ngIf"], [1, "consultation-panel"], ["class", "empty-consultation", 4, "ngIf"], [1, "realtime-badge"], ["mat-raised-button", "", "color", "warn", "title", "FA01: Paciente no se present\xF3", 3, "click"], ["diameter", "20"], [1, "hint"], [1, "last-called"], [1, "queue-ticket"], [1, "ticket-number"], [1, "ticket-info"], [1, "ticket-patient"], [1, "ticket-meta"], ["class", "emergency-badge", 4, "ngIf"], [1, "pos-badge"], [1, "emergency-badge"], [1, "empty-msg"], ["class", "emergency-badge ml-8", 4, "ngIf"], ["mat-raised-button", "", "color", "accent", "class", "mb-16", 3, "click", 4, "ngIf"], ["class", "vitals-section", 4, "ngIf"], [1, "emergency-badge", "ml-8"], ["mat-raised-button", "", "color", "accent", 1, "mb-16", 3, "click"], [1, "vitals-section"], [1, "vitals-grid", 3, "formGroup"], ["appearance", "outline"], ["matInput", "", "formControlName", "bloodPressure", "placeholder", "120/80"], ["matInput", "", "type", "number", "formControlName", "heartRate"], ["matInput", "", "type", "number", "formControlName", "temperature", "step", "0.1"], ["matInput", "", "type", "number", "formControlName", "weight"], ["matInput", "", "type", "number", "formControlName", "height"], ["matInput", "", "type", "number", "formControlName", "oxygenSaturation"], ["mat-stroked-button", "", "color", "primary", 3, "click", "disabled"], ["class", "success-msg", 4, "ngIf"], [1, "success-msg"], [3, "formGroup"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "formControlName", "notes", "rows", "3"], ["class", "medicine-row", 4, "ngFor", "ngForOf"], ["mat-stroked-button", "", 1, "mb-16", 3, "click"], [1, "action-buttons"], ["mat-raised-button", "", "color", "primary", 3, "click"], [1, "medicine-row"], [3, "ngModelChange", "ngModel", "ngModelOptions"], [3, "value", 4, "ngFor", "ngForOf"], ["appearance", "outline", 2, "width", "100px"], ["matInput", "", "type", "number", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["matInput", "", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["mat-icon-button", "", "color", "warn", 3, "click"], [3, "value"], [1, "empty-consultation"], [1, "big-icon"]], template: function ConsultationComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
        \u0275\u0275text(3, "Consulta M\xE9dica (CU3)");
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
    }, dependencies: [CommonModule, NgForOf, NgIf, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, FormsModule, NgModel, MatCardModule, MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle, MatButtonModule, MatButton, MatIconButton, MatIconModule, MatIcon, MatFormFieldModule, MatFormField, MatLabel, MatInputModule, MatInput, MatSelectModule, MatSelect, MatOption, MatDividerModule, MatDivider, MatProgressSpinnerModule, MatProgressSpinner, MatChipsModule], styles: ["\n\n.consultation-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 320px 1fr;\n  gap: 24px;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.6rem;\n  font-weight: 500;\n  color: #1565c0;\n  margin: 0;\n}\n.header-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.realtime-badge[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  background: #e8f5e9;\n  color: #2e7d32;\n  padding: 4px 12px;\n  border-radius: 16px;\n  font-size: 0.8rem;\n}\n.call-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-bottom: 8px;\n}\n.last-called[_ngcontent-%COMP%] {\n  background: #e3f2fd;\n  border-radius: 8px;\n  padding: 12px;\n  font-size: 0.9rem;\n  margin-top: 8px;\n}\n.last-called[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  color: #1565c0;\n}\n.pos-badge[_ngcontent-%COMP%] {\n  background: #e0e0e0;\n  border-radius: 50%;\n  width: 28px;\n  height: 28px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.8rem;\n  font-weight: 700;\n}\n.ticket-number.urgent[_ngcontent-%COMP%] {\n  color: #c62828;\n}\n.empty-msg[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #9e9e9e;\n  padding: 24px 0;\n}\n.hint[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #9e9e9e;\n  margin: 4px 0;\n}\n.vitals-section[_ngcontent-%COMP%] {\n  background: #f8f9ff;\n  border-radius: 8px;\n  padding: 16px;\n  margin-bottom: 16px;\n}\n.vitals-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 12px;\n  color: #1565c0;\n}\n.vitals-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 8px;\n  margin-bottom: 12px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.medicine-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  margin-bottom: 8px;\n}\n.action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n}\n.empty-consultation[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 60px;\n  text-align: center;\n}\n.big-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  color: #9e9e9e;\n  margin-bottom: 16px;\n}\n.success-msg[_ngcontent-%COMP%] {\n  color: #2e7d32;\n  font-size: 0.85rem;\n  margin-left: 8px;\n}\n.ml-8[_ngcontent-%COMP%] {\n  margin-left: 8px;\n}\n.mt-16[_ngcontent-%COMP%] {\n  margin-top: 16px;\n}\n.mb-16[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\nh4[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 600;\n  margin-bottom: 12px;\n}\nh5[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: #1565c0;\n  margin-bottom: 8px;\n}\n/*# sourceMappingURL=consultation.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ConsultationComponent, { className: "ConsultationComponent", filePath: "src\\app\\modules\\consultation\\consultation.component.ts", lineNumber: 237 });
})();
export {
  ConsultationComponent
};
//# sourceMappingURL=chunk-REDE44SK.js.map
