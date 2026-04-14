import {
  MatStep,
  MatStepper,
  MatStepperModule,
  MatStepperNext,
  MatStepperPrevious
} from "./chunk-CRIYVCGM.js";
import {
  MatDividerModule
} from "./chunk-HY6CPDTU.js";
import {
  PatientService
} from "./chunk-WKDVMIXT.js";
import {
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
  MatChip,
  MatChipsModule
} from "./chunk-IFZAJIVN.js";
import "./chunk-7TOHHRAU.js";
import {
  VitalSignsService
} from "./chunk-UTJYQ6K7.js";
import {
  EmergencyService
} from "./chunk-J5AYJ3WZ.js";
import "./chunk-TFS6RWUB.js";
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
  MatPrefix
} from "./chunk-SJJOW5UO.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  MaxLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NumberValueAccessor,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-2NM6KC74.js";
import {
  MatCard,
  MatCardContent,
  MatCardModule
} from "./chunk-IVAI7UHG.js";
import {
  CommonModule,
  MatButton,
  MatButtonModule,
  MatIcon,
  MatIconModule,
  NgIf,
  __spreadProps,
  __spreadValues,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-R33V2XU6.js";

// src/app/modules/emergency/emergency.component.ts
function EmergencyComponent_div_27_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 39);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" Seguro: ", ctx_r1.foundPatient.insuranceName, " (", ctx_r1.foundPatient.discountPercentage, "% descuento - FA02) ");
  }
}
function EmergencyComponent_div_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37)(1, "mat-icon");
    \u0275\u0275text(2, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, EmergencyComponent_div_27_div_6_Template, 2, 2, "div", 38);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("", ctx_r1.foundPatient.firstName, " ", ctx_r1.foundPatient.lastName, "");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.foundPatient.insuranceName);
  }
}
function EmergencyComponent_div_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26)(1, "mat-icon");
    \u0275\u0275text(2, "warning");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " RN-E04: Paciente no encontrado. Complete datos m\xEDnimos para no detener la atenci\xF3n. ");
    \u0275\u0275elementEnd();
  }
}
function EmergencyComponent_div_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40)(1, "mat-icon");
    \u0275\u0275text(2, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" Paciente identificado: ", ctx_r1.foundPatient.firstName, " ", ctx_r1.foundPatient.lastName, " ");
  }
}
function EmergencyComponent_div_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41)(1, "mat-form-field", 28)(2, "mat-label");
    \u0275\u0275text(3, "Nombre (aproximado)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "input", 42);
    \u0275\u0275elementStart(5, "mat-error");
    \u0275\u0275text(6, "Requerido");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "mat-form-field", 28)(8, "mat-label");
    \u0275\u0275text(9, "Apellido");
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "input", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "mat-form-field", 28)(12, "mat-label");
    \u0275\u0275text(13, "DPI (o descripci\xF3n f\xEDsica)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(14, "input", 44);
    \u0275\u0275elementEnd()();
  }
}
function EmergencyComponent_div_90_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 45)(1, "mat-icon", 46);
    \u0275\u0275text(2, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4, "Emergencia Registrada");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Ticket: ");
    \u0275\u0275elementStart(7, "strong");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "p");
    \u0275\u0275text(10, "Cl\xEDnica: ");
    \u0275\u0275elementStart(11, "strong");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "mat-chip", 47);
    \u0275\u0275text(14, "URGENTE - PRIORIDAD M\xC1XIMA (RN-E02)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 48);
    \u0275\u0275listener("click", function EmergencyComponent_div_90_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.reset());
    });
    \u0275\u0275elementStart(16, "mat-icon");
    \u0275\u0275text(17, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(18, " Nueva Emergencia ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.createdTicket.ticketNumber);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.createdTicket.clinicName);
  }
}
var EmergencyComponent = class _EmergencyComponent {
  constructor(fb, patientService, emergencyService, vitalSignsService, notification) {
    this.fb = fb;
    this.patientService = patientService;
    this.emergencyService = emergencyService;
    this.vitalSignsService = vitalSignsService;
    this.notification = notification;
    this.foundPatient = null;
    this.createdTicket = null;
    this.submitting = false;
  }
  ngOnInit() {
    this.dpiForm = this.fb.group({ dpi: [""] });
    this.patientForm = this.fb.group({
      firstName: ["Paciente", Validators.required],
      lastName: ["No Identificado", Validators.required],
      dpiNew: ["0000000000000"],
      motive: ["", Validators.required]
    });
    this.vitalsForm = this.fb.group({
      bloodPressure: [""],
      heartRate: [null],
      temperature: [null],
      weight: [null],
      height: [null],
      oxygenSaturation: [null]
    });
  }
  searchDpi() {
    const dpi = this.dpiForm.value.dpi;
    this.patientService.getByDpi(dpi).subscribe({
      next: (res) => {
        if (res.success) {
          this.foundPatient = res.data;
        }
      },
      error: () => {
        this.foundPatient = null;
      }
    });
  }
  registerEmergency() {
    this.submitting = true;
    const payload = { motive: this.patientForm.value.motive };
    if (this.foundPatient) {
      payload.dpi = this.foundPatient.dpi;
    } else {
      payload.newPatient = {
        dpi: this.patientForm.value.dpiNew || "0000000000000",
        firstName: this.patientForm.value.firstName,
        lastName: this.patientForm.value.lastName
      };
    }
    this.emergencyService.register(payload).subscribe({
      next: (res) => {
        if (res.success) {
          this.createdTicket = res.data;
          const vitals = this.vitalsForm.value;
          if (vitals.bloodPressure || vitals.heartRate) {
            this.vitalSignsService.register(__spreadProps(__spreadValues({}, vitals), {
              ticketId: res.data.id
            })).subscribe();
          }
          this.notification.success("Emergencia registrada con prioridad m\xE1xima (RN-E02)");
        }
        this.submitting = false;
      },
      error: () => {
        this.notification.error("Error al registrar emergencia");
        this.submitting = false;
      }
    });
  }
  reset() {
    this.foundPatient = null;
    this.createdTicket = null;
    this.dpiForm.reset();
    this.patientForm.reset({ firstName: "Paciente", lastName: "No Identificado", dpiNew: "0000000000000" });
    this.vitalsForm.reset();
  }
  static {
    this.\u0275fac = function EmergencyComponent_Factory(t) {
      return new (t || _EmergencyComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(PatientService), \u0275\u0275directiveInject(EmergencyService), \u0275\u0275directiveInject(VitalSignsService), \u0275\u0275directiveInject(NotificationService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EmergencyComponent, selectors: [["app-emergency"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 91, vars: 16, consts: [["stepper", ""], [1, "page-container"], [1, "page-header", "emergency-header"], [1, "header-title"], [1, "emergency-icon"], [1, "urgent-chip"], [3, "linear"], ["label", "Identificar Paciente", 3, "stepControl"], [3, "formGroup"], [1, "rn-note"], ["appearance", "outline", 1, "full-width"], ["matPrefix", ""], ["matInput", "", "formControlName", "dpi", "placeholder", "0000000000000", "maxlength", "13"], ["mat-stroked-button", "", "color", "primary", 3, "click", "disabled"], ["class", "patient-found", 4, "ngIf"], [1, "hint-text"], ["mat-raised-button", "", "color", "warn", "matStepperNext", "", 2, "margin-top", "16px"], ["label", "Datos del Paciente", 3, "stepControl"], ["class", "rn-note rn-warn", 4, "ngIf"], ["class", "patient-ok", 4, "ngIf"], ["class", "form-grid", 4, "ngIf"], ["matInput", "", "formControlName", "motive", "rows", "3", "placeholder", "Describa el motivo de ingreso"], [1, "step-actions"], ["mat-button", "", "matStepperPrevious", ""], ["mat-raised-button", "", "color", "warn", "matStepperNext", "", 3, "disabled"], ["label", "Signos Vitales (RN-E03)", 3, "stepControl"], [1, "rn-note", "rn-warn"], [1, "vitals-grid"], ["appearance", "outline"], ["matInput", "", "formControlName", "bloodPressure", "placeholder", "120/80"], ["matInput", "", "type", "number", "formControlName", "heartRate"], ["matInput", "", "type", "number", "formControlName", "temperature", "step", "0.1"], ["matInput", "", "type", "number", "formControlName", "weight"], ["matInput", "", "type", "number", "formControlName", "height"], ["matInput", "", "type", "number", "formControlName", "oxygenSaturation"], ["mat-raised-button", "", "color", "warn", 3, "click", "disabled"], ["class", "success-panel", 4, "ngIf"], [1, "patient-found"], ["class", "insurance-info", 4, "ngIf"], [1, "insurance-info"], [1, "patient-ok"], [1, "form-grid"], ["matInput", "", "formControlName", "firstName", "placeholder", "Paciente No Identificado"], ["matInput", "", "formControlName", "lastName"], ["matInput", "", "formControlName", "dpiNew", "placeholder", "0000000000000"], [1, "success-panel"], [1, "success-icon"], [1, "urgent-chip", 2, "font-size", "1rem"], ["mat-raised-button", "", "color", "primary", 2, "margin-top", "16px", 3, "click"]], template: function EmergencyComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "mat-icon", 4);
        \u0275\u0275text(4, "emergency");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "h1");
        \u0275\u0275text(6, "Atenci\xF3n de Emergencia (CU7)");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "mat-chip", 5);
        \u0275\u0275text(8, "PRIORIDAD M\xC1XIMA");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "mat-card")(10, "mat-card-content")(11, "mat-stepper", 6, 0)(13, "mat-step", 7)(14, "form", 8)(15, "div", 9)(16, "mat-icon");
        \u0275\u0275text(17, "info");
        \u0275\u0275elementEnd();
        \u0275\u0275text(18, " RN-E01: El personal debe registrar expl\xEDcitamente el ingreso como Emergencia. ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "mat-form-field", 10)(20, "mat-label");
        \u0275\u0275text(21, "DPI del Paciente (si disponible)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "mat-icon", 11);
        \u0275\u0275text(23, "badge");
        \u0275\u0275elementEnd();
        \u0275\u0275element(24, "input", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "button", 13);
        \u0275\u0275listener("click", function EmergencyComponent_Template_button_click_25_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.searchDpi());
        });
        \u0275\u0275text(26, " Buscar en Sistema ");
        \u0275\u0275elementEnd();
        \u0275\u0275template(27, EmergencyComponent_div_27_Template, 7, 3, "div", 14);
        \u0275\u0275elementStart(28, "p", 15);
        \u0275\u0275text(29, "Si el paciente no est\xE1 registrado, complete los datos en el siguiente paso (RN-E04)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "button", 16)(31, "mat-icon");
        \u0275\u0275text(32, "emergency");
        \u0275\u0275elementEnd();
        \u0275\u0275text(33, " Registrar Emergencia \u2192 ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(34, "mat-step", 17)(35, "form", 8);
        \u0275\u0275template(36, EmergencyComponent_div_36_Template, 4, 0, "div", 18)(37, EmergencyComponent_div_37_Template, 4, 2, "div", 19)(38, EmergencyComponent_div_38_Template, 15, 0, "div", 20);
        \u0275\u0275elementStart(39, "mat-form-field", 10)(40, "mat-label");
        \u0275\u0275text(41, "Motivo de Emergencia *");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(42, "mat-icon", 11);
        \u0275\u0275text(43, "emergency");
        \u0275\u0275elementEnd();
        \u0275\u0275element(44, "textarea", 21);
        \u0275\u0275elementStart(45, "mat-error");
        \u0275\u0275text(46, "El motivo es obligatorio");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(47, "div", 22)(48, "button", 23);
        \u0275\u0275text(49, "\u2190 Anterior");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(50, "button", 24);
        \u0275\u0275text(51, " Continuar \u2192 ");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(52, "mat-step", 25)(53, "form", 8)(54, "div", 26)(55, "mat-icon");
        \u0275\u0275text(56, "monitor_heart");
        \u0275\u0275elementEnd();
        \u0275\u0275text(57, " RN-E03: Los signos vitales son OBLIGATORIOS antes de asignar m\xE9dico. ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(58, "div", 27)(59, "mat-form-field", 28)(60, "mat-label");
        \u0275\u0275text(61, "Presi\xF3n Arterial");
        \u0275\u0275elementEnd();
        \u0275\u0275element(62, "input", 29);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(63, "mat-form-field", 28)(64, "mat-label");
        \u0275\u0275text(65, "Frec. Card\xEDaca (bpm)");
        \u0275\u0275elementEnd();
        \u0275\u0275element(66, "input", 30);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(67, "mat-form-field", 28)(68, "mat-label");
        \u0275\u0275text(69, "Temperatura (\xB0C)");
        \u0275\u0275elementEnd();
        \u0275\u0275element(70, "input", 31);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(71, "mat-form-field", 28)(72, "mat-label");
        \u0275\u0275text(73, "Peso (kg)");
        \u0275\u0275elementEnd();
        \u0275\u0275element(74, "input", 32);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(75, "mat-form-field", 28)(76, "mat-label");
        \u0275\u0275text(77, "Talla (cm)");
        \u0275\u0275elementEnd();
        \u0275\u0275element(78, "input", 33);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(79, "mat-form-field", 28)(80, "mat-label");
        \u0275\u0275text(81, "SpO2 (%)");
        \u0275\u0275elementEnd();
        \u0275\u0275element(82, "input", 34);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(83, "div", 22)(84, "button", 23);
        \u0275\u0275text(85, "\u2190 Anterior");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(86, "button", 35);
        \u0275\u0275listener("click", function EmergencyComponent_Template_button_click_86_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.registerEmergency());
        });
        \u0275\u0275elementStart(87, "mat-icon");
        \u0275\u0275text(88, "emergency");
        \u0275\u0275elementEnd();
        \u0275\u0275text(89);
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275template(90, EmergencyComponent_div_90_Template, 19, 2, "div", 36);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(11);
        \u0275\u0275property("linear", true);
        \u0275\u0275advance(2);
        \u0275\u0275property("stepControl", ctx.dpiForm);
        \u0275\u0275advance();
        \u0275\u0275property("formGroup", ctx.dpiForm);
        \u0275\u0275advance(11);
        \u0275\u0275property("disabled", !ctx.dpiForm.value.dpi);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.foundPatient);
        \u0275\u0275advance(7);
        \u0275\u0275property("stepControl", ctx.patientForm);
        \u0275\u0275advance();
        \u0275\u0275property("formGroup", ctx.patientForm);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.foundPatient);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.foundPatient);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.foundPatient);
        \u0275\u0275advance(12);
        \u0275\u0275property("disabled", ctx.patientForm.invalid);
        \u0275\u0275advance(2);
        \u0275\u0275property("stepControl", ctx.vitalsForm);
        \u0275\u0275advance();
        \u0275\u0275property("formGroup", ctx.vitalsForm);
        \u0275\u0275advance(33);
        \u0275\u0275property("disabled", ctx.submitting);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate1(" ", ctx.submitting ? "Registrando..." : "Activar Emergencia (RN-E02)", " ");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.createdTicket);
      }
    }, dependencies: [
      CommonModule,
      NgIf,
      ReactiveFormsModule,
      \u0275NgNoValidate,
      DefaultValueAccessor,
      NumberValueAccessor,
      NgControlStatus,
      NgControlStatusGroup,
      MaxLengthValidator,
      FormGroupDirective,
      FormControlName,
      MatCardModule,
      MatCard,
      MatCardContent,
      MatButtonModule,
      MatButton,
      MatIconModule,
      MatIcon,
      MatFormFieldModule,
      MatFormField,
      MatLabel,
      MatError,
      MatPrefix,
      MatInputModule,
      MatInput,
      MatSelectModule,
      MatStepperModule,
      MatStep,
      MatStepper,
      MatStepperNext,
      MatStepperPrevious,
      MatChipsModule,
      MatChip,
      MatDividerModule
    ], styles: ["\n\n.emergency-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\n.header-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.header-title[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.6rem;\n  font-weight: 500;\n  color: #c62828;\n  margin: 0;\n}\n.emergency-icon[_ngcontent-%COMP%] {\n  font-size: 32px;\n  width: 32px;\n  height: 32px;\n  color: #c62828;\n}\n.urgent-chip[_ngcontent-%COMP%] {\n  background: #c62828 !important;\n  color: white !important;\n  font-weight: 700;\n}\n.rn-note[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  background: #e3f2fd;\n  color: #1565c0;\n  padding: 12px 16px;\n  border-radius: 8px;\n  margin-bottom: 16px;\n}\n.rn-warn[_ngcontent-%COMP%] {\n  background: #ffebee !important;\n  color: #c62828 !important;\n}\n.patient-found[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  background: #e8f5e9;\n  color: #2e7d32;\n  padding: 12px 16px;\n  border-radius: 8px;\n  margin: 16px 0;\n}\n.patient-ok[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  background: #e8f5e9;\n  color: #2e7d32;\n  padding: 12px 16px;\n  border-radius: 8px;\n  margin-bottom: 16px;\n}\n.insurance-info[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  margin-top: 4px;\n}\n.hint-text[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #757575;\n  margin-top: 8px;\n}\n.form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 12px;\n  margin-bottom: 16px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-bottom: 8px;\n}\n.vitals-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n  margin-bottom: 16px;\n}\n.step-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  margin-top: 16px;\n}\n.success-panel[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px;\n}\n.success-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  color: #2e7d32;\n  margin-bottom: 16px;\n}\n.success-panel[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #2e7d32;\n  margin-bottom: 16px;\n}\n/*# sourceMappingURL=emergency.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EmergencyComponent, { className: "EmergencyComponent", filePath: "src\\app\\modules\\emergency\\emergency.component.ts", lineNumber: 203 });
})();
export {
  EmergencyComponent
};
//# sourceMappingURL=chunk-6UFR7OPT.js.map
