import {
  MatDividerModule
} from "./chunk-GODDNVHJ.js";
import {
  MatStep,
  MatStepper,
  MatStepperModule,
  MatStepperNext,
  MatStepperPrevious
} from "./chunk-M5ZRSNA3.js";
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
  ClinicService,
  TicketService
} from "./chunk-ELYEA2RZ.js";
import {
  InsuranceService
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
  MaxLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-2J4O7HWV.js";
import "./chunk-EURQNLKS.js";
import {
  MatCard,
  MatCardContent,
  MatCardModule
} from "./chunk-ZXMIIXBI.js";
import {
  Router,
  RouterLink
} from "./chunk-2UH3GGF7.js";
import {
  MatButton,
  MatButtonModule,
  MatIcon,
  MatIconModule,
  MatOption
} from "./chunk-KREJ5GPI.js";
import {
  CommonModule,
  NgForOf,
  NgIf,
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
} from "./chunk-XHW7K2DC.js";

// src/app/modules/patient/patient-register/patient-register.component.ts
function PatientRegisterComponent_mat_error_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " El DPI debe tener exactamente 13 d\xEDgitos num\xE9ricos ");
    \u0275\u0275elementEnd();
  }
}
function PatientRegisterComponent_mat_spinner_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 32);
  }
}
function PatientRegisterComponent_mat_icon_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "search");
    \u0275\u0275elementEnd();
  }
}
function PatientRegisterComponent_div_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33)(1, "mat-icon");
    \u0275\u0275text(2, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "strong");
    \u0275\u0275text(5, "Paciente encontrado:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6);
    \u0275\u0275element(7, "br");
    \u0275\u0275elementStart(8, "small");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "button", 34);
    \u0275\u0275text(11, "Continuar \u2192");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate2(" ", ctx_r1.existingPatient.firstName, " ", ctx_r1.existingPatient.lastName, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("C\xF3digo: ", ctx_r1.existingPatient.patientCode, "");
  }
}
function PatientRegisterComponent_mat_form_field_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-form-field", 17)(1, "mat-label");
    \u0275\u0275text(2, "Direcci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "input", 35);
    \u0275\u0275elementEnd();
  }
}
function PatientRegisterComponent_mat_form_field_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-form-field", 17)(1, "mat-label");
    \u0275\u0275text(2, "Contacto de Emergencia");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "input", 36);
    \u0275\u0275elementEnd();
  }
}
function PatientRegisterComponent_mat_option_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ins_r3 = ctx.$implicit;
    \u0275\u0275property("value", ins_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ins_r3.name, " (", ins_r3.discountPercentage, "% descuento) ");
  }
}
function PatientRegisterComponent_mat_option_78_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r4 = ctx.$implicit;
    \u0275\u0275property("value", c_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", c_r4.name, " ");
  }
}
function PatientRegisterComponent_mat_spinner_89_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 32);
  }
}
function PatientRegisterComponent_mat_icon_90_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "confirmation_number");
    \u0275\u0275elementEnd();
  }
}
var PatientRegisterComponent = class _PatientRegisterComponent {
  constructor(fb, patientService, clinicService, ticketService, insuranceService, notification, router) {
    this.fb = fb;
    this.patientService = patientService;
    this.clinicService = clinicService;
    this.ticketService = ticketService;
    this.insuranceService = insuranceService;
    this.notification = notification;
    this.router = router;
    this.clinics = [];
    this.insurances = [];
    this.existingPatient = null;
    this.searching = false;
    this.submitting = false;
  }
  ngOnInit() {
    this.dpiForm = this.fb.group({
      dpi: ["", [Validators.required, Validators.pattern(/^\d{13}$/)]]
    });
    this.patientForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      phone: [""],
      email: ["", Validators.email],
      address: [""],
      emergencyContact: [""],
      insuranceId: [null]
    });
    this.ticketForm = this.fb.group({
      clinicId: [null, Validators.required],
      notes: [""]
    });
    this.clinicService.getAll().subscribe((res) => {
      if (res.success)
        this.clinics = res.data;
    });
    this.insuranceService.getAll().subscribe((res) => {
      if (res.success)
        this.insurances = res.data;
    });
  }
  searchByDpi() {
    const dpi = this.dpiForm.value.dpi;
    this.searching = true;
    this.patientService.getByDpi(dpi).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.existingPatient = res.data;
          this.patientForm.patchValue(res.data);
        }
        this.searching = false;
      },
      error: () => {
        this.existingPatient = null;
        this.patientForm.reset();
        this.searching = false;
      }
    });
  }
  submit() {
    this.submitting = true;
    const createTicket = (patientId) => {
      this.ticketService.create({
        patientId,
        clinicId: this.ticketForm.value.clinicId,
        notes: this.ticketForm.value.notes,
        type: "CONSULTA"
      }).subscribe({
        next: (res) => {
          if (res.success) {
            this.notification.success(`Ticket ${res.data.ticketNumber} generado para ${res.data.patientName}`);
            this.router.navigate(["/patients"]);
          }
          this.submitting = false;
        },
        error: (err) => {
          this.notification.error("Error al generar ticket");
          this.submitting = false;
        }
      });
    };
    if (this.existingPatient) {
      createTicket(this.existingPatient.id);
    } else {
      const data = __spreadValues(__spreadValues({}, this.dpiForm.value), this.patientForm.value);
      this.patientService.create(data).subscribe({
        next: (res) => {
          if (res.success)
            createTicket(res.data.id);
        },
        error: () => {
          this.notification.error("Error al registrar paciente");
          this.submitting = false;
        }
      });
    }
  }
  static {
    this.\u0275fac = function PatientRegisterComponent_Factory(t) {
      return new (t || _PatientRegisterComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(PatientService), \u0275\u0275directiveInject(ClinicService), \u0275\u0275directiveInject(TicketService), \u0275\u0275directiveInject(InsuranceService), \u0275\u0275directiveInject(NotificationService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PatientRegisterComponent, selectors: [["app-patient-register"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 92, vars: 28, consts: [["stepper", ""], [1, "page-container"], [1, "page-header"], ["mat-button", "", "routerLink", "/patients"], [3, "linear"], ["label", "Identificaci\xF3n", 3, "stepControl"], [3, "formGroup"], [1, "hint-text"], ["appearance", "outline", 1, "full-width"], ["matPrefix", ""], ["matInput", "", "formControlName", "dpi", "placeholder", "0000000000000", "maxlength", "13"], [4, "ngIf"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], ["diameter", "20", 4, "ngIf"], ["class", "patient-found", 4, "ngIf"], ["label", "Datos del Paciente", 3, "stepControl"], [1, "form-grid"], ["appearance", "outline"], ["matInput", "", "formControlName", "firstName", 3, "readonly"], ["matInput", "", "formControlName", "lastName", 3, "readonly"], ["matInput", "", "formControlName", "phone", 3, "readonly"], ["matInput", "", "formControlName", "email", "type", "email", 3, "readonly"], ["appearance", "outline", 4, "ngIf"], ["formControlName", "insuranceId"], [3, "value"], [3, "value", 4, "ngFor", "ngForOf"], [1, "step-actions"], ["mat-button", "", "matStepperPrevious", ""], ["mat-raised-button", "", "color", "primary", "matStepperNext", "", 3, "disabled"], ["label", "Asignar Cl\xEDnica", 3, "stepControl"], ["formControlName", "clinicId"], ["matInput", "", "formControlName", "notes", "rows", "3"], ["diameter", "20"], [1, "patient-found"], ["mat-raised-button", "", "color", "accent", "matStepperNext", ""], ["matInput", "", "formControlName", "address"], ["matInput", "", "formControlName", "emergencyContact"]], template: function PatientRegisterComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "h1");
        \u0275\u0275text(3, "Registro de Paciente");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "button", 3)(5, "mat-icon");
        \u0275\u0275text(6, "arrow_back");
        \u0275\u0275elementEnd();
        \u0275\u0275text(7, " Volver ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "mat-card")(9, "mat-card-content")(10, "mat-stepper", 4, 0)(12, "mat-step", 5)(13, "form", 6)(14, "h3");
        \u0275\u0275text(15, "Paso 1: Identificaci\xF3n por DPI");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "p", 7);
        \u0275\u0275text(17, "El DPI debe contener exactamente 13 d\xEDgitos num\xE9ricos.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "mat-form-field", 8)(19, "mat-label");
        \u0275\u0275text(20, "DPI del Paciente");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "mat-icon", 9);
        \u0275\u0275text(22, "badge");
        \u0275\u0275elementEnd();
        \u0275\u0275element(23, "input", 10);
        \u0275\u0275template(24, PatientRegisterComponent_mat_error_24_Template, 2, 0, "mat-error", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "button", 12);
        \u0275\u0275listener("click", function PatientRegisterComponent_Template_button_click_25_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.searchByDpi());
        });
        \u0275\u0275template(26, PatientRegisterComponent_mat_spinner_26_Template, 1, 0, "mat-spinner", 13)(27, PatientRegisterComponent_mat_icon_27_Template, 2, 0, "mat-icon", 11);
        \u0275\u0275text(28);
        \u0275\u0275elementEnd();
        \u0275\u0275template(29, PatientRegisterComponent_div_29_Template, 12, 3, "div", 14);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(30, "mat-step", 15)(31, "form", 6)(32, "h3");
        \u0275\u0275text(33);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "div", 16)(35, "mat-form-field", 17)(36, "mat-label");
        \u0275\u0275text(37, "Nombres");
        \u0275\u0275elementEnd();
        \u0275\u0275element(38, "input", 18);
        \u0275\u0275elementStart(39, "mat-error");
        \u0275\u0275text(40, "Requerido");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(41, "mat-form-field", 17)(42, "mat-label");
        \u0275\u0275text(43, "Apellidos");
        \u0275\u0275elementEnd();
        \u0275\u0275element(44, "input", 19);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(45, "mat-form-field", 17)(46, "mat-label");
        \u0275\u0275text(47, "Tel\xE9fono");
        \u0275\u0275elementEnd();
        \u0275\u0275element(48, "input", 20);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(49, "mat-form-field", 17)(50, "mat-label");
        \u0275\u0275text(51, "Correo Electr\xF3nico");
        \u0275\u0275elementEnd();
        \u0275\u0275element(52, "input", 21);
        \u0275\u0275elementEnd();
        \u0275\u0275template(53, PatientRegisterComponent_mat_form_field_53_Template, 4, 0, "mat-form-field", 22)(54, PatientRegisterComponent_mat_form_field_54_Template, 4, 0, "mat-form-field", 22);
        \u0275\u0275elementStart(55, "mat-form-field", 17)(56, "mat-label");
        \u0275\u0275text(57, "Seguro M\xE9dico (Opcional)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(58, "mat-select", 23)(59, "mat-option", 24);
        \u0275\u0275text(60, "Sin seguro");
        \u0275\u0275elementEnd();
        \u0275\u0275template(61, PatientRegisterComponent_mat_option_61_Template, 2, 3, "mat-option", 25);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(62, "div", 26)(63, "button", 27);
        \u0275\u0275text(64, "\u2190 Anterior");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(65, "button", 28);
        \u0275\u0275text(66, " Continuar \u2192 ");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(67, "mat-step", 29)(68, "form", 6)(69, "h3");
        \u0275\u0275text(70, "Selecci\xF3n de Cl\xEDnica (Obligatorio)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(71, "div", 16)(72, "mat-form-field", 8)(73, "mat-label");
        \u0275\u0275text(74, "Cl\xEDnica de Destino *");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(75, "mat-icon", 9);
        \u0275\u0275text(76, "local_hospital");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(77, "mat-select", 30);
        \u0275\u0275template(78, PatientRegisterComponent_mat_option_78_Template, 2, 2, "mat-option", 25);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(79, "mat-error");
        \u0275\u0275text(80, "Debe seleccionar una cl\xEDnica");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(81, "mat-form-field", 8)(82, "mat-label");
        \u0275\u0275text(83, "Notas adicionales");
        \u0275\u0275elementEnd();
        \u0275\u0275element(84, "textarea", 31);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(85, "div", 26)(86, "button", 27);
        \u0275\u0275text(87, "\u2190 Anterior");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(88, "button", 12);
        \u0275\u0275listener("click", function PatientRegisterComponent_Template_button_click_88_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.submit());
        });
        \u0275\u0275template(89, PatientRegisterComponent_mat_spinner_89_Template, 1, 0, "mat-spinner", 13)(90, PatientRegisterComponent_mat_icon_90_Template, 2, 0, "mat-icon", 11);
        \u0275\u0275text(91);
        \u0275\u0275elementEnd()()()()()()()();
      }
      if (rf & 2) {
        let tmp_4_0;
        \u0275\u0275advance(10);
        \u0275\u0275property("linear", true);
        \u0275\u0275advance(2);
        \u0275\u0275property("stepControl", ctx.dpiForm);
        \u0275\u0275advance();
        \u0275\u0275property("formGroup", ctx.dpiForm);
        \u0275\u0275advance(11);
        \u0275\u0275property("ngIf", (tmp_4_0 = ctx.dpiForm.get("dpi")) == null ? null : tmp_4_0.hasError("pattern"));
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.dpiForm.invalid || ctx.searching);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.searching);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.searching);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.searching ? "Buscando..." : "Buscar Paciente", " ");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.existingPatient);
        \u0275\u0275advance();
        \u0275\u0275property("stepControl", ctx.patientForm);
        \u0275\u0275advance();
        \u0275\u0275property("formGroup", ctx.patientForm);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.existingPatient ? "Paciente Existente" : "Nuevo Paciente (FA01)");
        \u0275\u0275advance(5);
        \u0275\u0275property("readonly", !!ctx.existingPatient);
        \u0275\u0275advance(6);
        \u0275\u0275property("readonly", !!ctx.existingPatient);
        \u0275\u0275advance(4);
        \u0275\u0275property("readonly", !!ctx.existingPatient);
        \u0275\u0275advance(4);
        \u0275\u0275property("readonly", !!ctx.existingPatient);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.existingPatient);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.existingPatient);
        \u0275\u0275advance(5);
        \u0275\u0275property("value", null);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.insurances);
        \u0275\u0275advance(4);
        \u0275\u0275property("disabled", ctx.patientForm.invalid && !ctx.existingPatient);
        \u0275\u0275advance(2);
        \u0275\u0275property("stepControl", ctx.ticketForm);
        \u0275\u0275advance();
        \u0275\u0275property("formGroup", ctx.ticketForm);
        \u0275\u0275advance(10);
        \u0275\u0275property("ngForOf", ctx.clinics);
        \u0275\u0275advance(10);
        \u0275\u0275property("disabled", ctx.ticketForm.invalid || ctx.submitting);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.submitting);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.submitting);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.submitting ? "Generando..." : "Generar Ticket", " ");
      }
    }, dependencies: [
      CommonModule,
      NgForOf,
      NgIf,
      ReactiveFormsModule,
      \u0275NgNoValidate,
      DefaultValueAccessor,
      NgControlStatus,
      NgControlStatusGroup,
      MaxLengthValidator,
      FormGroupDirective,
      FormControlName,
      RouterLink,
      MatCardModule,
      MatCard,
      MatCardContent,
      MatFormFieldModule,
      MatFormField,
      MatLabel,
      MatError,
      MatPrefix,
      MatInputModule,
      MatInput,
      MatButtonModule,
      MatButton,
      MatIconModule,
      MatIcon,
      MatSelectModule,
      MatSelect,
      MatOption,
      MatProgressSpinnerModule,
      MatProgressSpinner,
      MatStepperModule,
      MatStep,
      MatStepper,
      MatStepperNext,
      MatStepperPrevious,
      MatDividerModule
    ], styles: ["\n\nh3[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 500;\n  color: #1565c0;\n  margin-bottom: 16px;\n}\n.hint-text[_ngcontent-%COMP%] {\n  color: #757575;\n  font-size: 0.85rem;\n  margin-bottom: 16px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 12px;\n  margin-bottom: 16px;\n}\n.step-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  margin-top: 16px;\n}\n.patient-found[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-top: 16px;\n  background: #e8f5e9;\n  padding: 16px;\n  border-radius: 8px;\n  color: #2e7d32;\n}\n.patient-found[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 32px;\n  width: 32px;\n  height: 32px;\n}\n/*# sourceMappingURL=patient-register.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PatientRegisterComponent, { className: "PatientRegisterComponent", filePath: "src\\app\\modules\\patient\\patient-register\\patient-register.component.ts", lineNumber: 177 });
})();
export {
  PatientRegisterComponent
};
//# sourceMappingURL=chunk-DXV3I747.js.map
