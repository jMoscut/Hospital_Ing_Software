import {
  MatToolbar,
  MatToolbarModule
} from "./chunk-QYPJIECG.js";
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
  MatInput,
  MatInputModule
} from "./chunk-ZDRD2YW4.js";
import "./chunk-SRE6VCYJ.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-DU2QI7GP.js";
import {
  InsuranceService
} from "./chunk-LDLLK6DA.js";
import "./chunk-MHA7Y7AJ.js";
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatHint,
  MatLabel,
  MatPrefix,
  MatSuffix
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
import {
  environment
} from "./chunk-EURQNLKS.js";
import {
  MatCard,
  MatCardContent,
  MatCardModule
} from "./chunk-ZXMIIXBI.js";
import {
  RouterLink
} from "./chunk-2UH3GGF7.js";
import {
  MatButton,
  MatButtonModule,
  MatIcon,
  MatIconButton,
  MatIconModule,
  MatOption
} from "./chunk-KREJ5GPI.js";
import {
  CommonModule,
  HttpClient,
  NgForOf,
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
} from "./chunk-XHW7K2DC.js";

// src/app/modules/public-register/public-register.component.ts
function PublicRegisterComponent_mat_card_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 12)(1, "mat-icon", 13);
    \u0275\u0275text(2, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4, "\xA1Registro Exitoso!");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Su c\xF3digo de paciente es:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 14);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 15)(10, "p")(11, "strong");
    \u0275\u0275text(12, "Sus credenciales de acceso al portal:");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "p");
    \u0275\u0275text(14, "Usuario: ");
    \u0275\u0275elementStart(15, "code");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "p", 16);
    \u0275\u0275text(18, "Al llegar al hospital, presente su c\xF3digo en recepci\xF3n para recibir su turno.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 17)(20, "button", 18)(21, "mat-icon");
    \u0275\u0275text(22, "login");
    \u0275\u0275elementEnd();
    \u0275\u0275text(23, " Iniciar Sesi\xF3n ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "button", 19)(25, "mat-icon");
    \u0275\u0275text(26, "home");
    \u0275\u0275elementEnd();
    \u0275\u0275text(27, " Volver al inicio ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.patientCode);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.registeredUsername);
  }
}
function PublicRegisterComponent_mat_card_24_mat_option_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ins_r3 = ctx.$implicit;
    \u0275\u0275property("value", ins_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ins_r3.name, " ");
  }
}
function PublicRegisterComponent_mat_card_24_div_134_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48)(1, "span", 49);
    \u0275\u0275text(2, "Nacimiento:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.dataForm.value.birthDate);
  }
}
function PublicRegisterComponent_mat_card_24_div_135_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u2014 ", ctx_r0.dataForm.value.insuranceNumber, "");
  }
}
function PublicRegisterComponent_mat_card_24_div_135_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48)(1, "span", 49);
    \u0275\u0275text(2, "Aseguradora:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275template(5, PublicRegisterComponent_mat_card_24_div_135_span_5_Template, 2, 1, "span", 11);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r0.getInsuranceName(ctx_r0.dataForm.value.insuranceId), " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.dataForm.value.insuranceNumber);
  }
}
function PublicRegisterComponent_mat_card_24_mat_spinner_145_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 54);
  }
}
function PublicRegisterComponent_mat_card_24_mat_icon_146_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "how_to_reg");
    \u0275\u0275elementEnd();
  }
}
function PublicRegisterComponent_mat_card_24_div_148_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 55)(1, "mat-icon");
    \u0275\u0275text(2, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.errorMsg, " ");
  }
}
function PublicRegisterComponent_mat_card_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card")(1, "mat-card-content")(2, "mat-stepper", 20, 0)(4, "mat-step", 21)(5, "form", 22)(6, "h3");
    \u0275\u0275text(7, "Paso 1: Datos Personales");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 23)(9, "mat-form-field", 24)(10, "mat-label");
    \u0275\u0275text(11, "Nombres *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(12, "input", 25);
    \u0275\u0275elementStart(13, "mat-error");
    \u0275\u0275text(14, "Requerido");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "mat-form-field", 24)(16, "mat-label");
    \u0275\u0275text(17, "Apellidos *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(18, "input", 26);
    \u0275\u0275elementStart(19, "mat-error");
    \u0275\u0275text(20, "Requerido");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "mat-form-field", 24)(22, "mat-label");
    \u0275\u0275text(23, "Fecha de Nacimiento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "mat-icon", 27);
    \u0275\u0275text(25, "cake");
    \u0275\u0275elementEnd();
    \u0275\u0275element(26, "input", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "mat-form-field", 24)(28, "mat-label");
    \u0275\u0275text(29, "Tel\xE9fono");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "mat-icon", 27);
    \u0275\u0275text(31, "phone");
    \u0275\u0275elementEnd();
    \u0275\u0275element(32, "input", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "mat-form-field", 24)(34, "mat-label");
    \u0275\u0275text(35, "Correo Electr\xF3nico *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "mat-icon", 27);
    \u0275\u0275text(37, "email");
    \u0275\u0275elementEnd();
    \u0275\u0275element(38, "input", 30);
    \u0275\u0275elementStart(39, "mat-hint");
    \u0275\u0275text(40, "Recibir\xE1 notificaciones de su cita aqu\xED");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "mat-error");
    \u0275\u0275text(42, "Correo inv\xE1lido o requerido");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "mat-form-field", 31)(44, "mat-label");
    \u0275\u0275text(45, "Direcci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "mat-icon", 27);
    \u0275\u0275text(47, "home");
    \u0275\u0275elementEnd();
    \u0275\u0275element(48, "input", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "mat-form-field", 24)(50, "mat-label");
    \u0275\u0275text(51, "DPI (13 d\xEDgitos) *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "mat-icon", 27);
    \u0275\u0275text(53, "badge");
    \u0275\u0275elementEnd();
    \u0275\u0275element(54, "input", 33);
    \u0275\u0275elementStart(55, "mat-error");
    \u0275\u0275text(56, "El DPI debe tener exactamente 13 d\xEDgitos");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(57, "mat-form-field", 24)(58, "mat-label");
    \u0275\u0275text(59, "N\xFAmero de Seguro (opcional)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "mat-icon", 27);
    \u0275\u0275text(61, "health_and_safety");
    \u0275\u0275elementEnd();
    \u0275\u0275element(62, "input", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "mat-form-field", 24)(64, "mat-label");
    \u0275\u0275text(65, "Aseguradora (opcional)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "mat-icon", 27);
    \u0275\u0275text(67, "business");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "mat-select", 35)(69, "mat-option", 36);
    \u0275\u0275text(70, "Sin aseguradora");
    \u0275\u0275elementEnd();
    \u0275\u0275template(71, PublicRegisterComponent_mat_card_24_mat_option_71_Template, 2, 2, "mat-option", 37);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(72, "div", 38)(73, "button", 39);
    \u0275\u0275text(74, "Continuar \u2192");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(75, "mat-step", 40)(76, "form", 22)(77, "h3");
    \u0275\u0275text(78, "Paso 2: Crear Credenciales de Acceso");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "p", 41);
    \u0275\u0275text(80, "Con estas credenciales podr\xE1 ingresar al portal para ver sus citas, recetas y resultados de laboratorio, y tambi\xE9n para agendar citas en l\xEDnea.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(81, "div", 23)(82, "mat-form-field", 24)(83, "mat-label");
    \u0275\u0275text(84, "Nombre de Usuario *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(85, "mat-icon", 27);
    \u0275\u0275text(86, "account_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275element(87, "input", 42);
    \u0275\u0275elementStart(88, "mat-hint");
    \u0275\u0275text(89, "Sin espacios, solo letras, n\xFAmeros y puntos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(90, "mat-error");
    \u0275\u0275text(91, "M\xEDnimo 4 caracteres, sin espacios");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(92, "mat-form-field", 24)(93, "mat-label");
    \u0275\u0275text(94, "Contrase\xF1a *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(95, "mat-icon", 27);
    \u0275\u0275text(96, "lock");
    \u0275\u0275elementEnd();
    \u0275\u0275element(97, "input", 43);
    \u0275\u0275elementStart(98, "button", 44);
    \u0275\u0275listener("click", function PublicRegisterComponent_mat_card_24_Template_button_click_98_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.hidePassword = !ctx_r0.hidePassword);
    });
    \u0275\u0275elementStart(99, "mat-icon");
    \u0275\u0275text(100);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(101, "mat-hint");
    \u0275\u0275text(102, "M\xEDn. 8 caracteres, 1 may\xFAscula y 1 n\xFAmero");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(103, "mat-error");
    \u0275\u0275text(104, "M\xEDn. 8 caracteres, al menos 1 may\xFAscula y 1 n\xFAmero");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(105, "div", 38)(106, "button", 45);
    \u0275\u0275text(107, "\u2190 Anterior");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(108, "button", 39);
    \u0275\u0275text(109, "Continuar \u2192");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(110, "mat-step", 46)(111, "h3");
    \u0275\u0275text(112, "Paso 3: Confirme su registro");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(113, "div", 47)(114, "div", 48)(115, "span", 49);
    \u0275\u0275text(116, "Nombre:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(117, "span");
    \u0275\u0275text(118);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(119, "div", 48)(120, "span", 49);
    \u0275\u0275text(121, "DPI:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(122, "span");
    \u0275\u0275text(123);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(124, "div", 48)(125, "span", 49);
    \u0275\u0275text(126, "Correo:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(127, "span");
    \u0275\u0275text(128);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(129, "div", 48)(130, "span", 49);
    \u0275\u0275text(131, "Tel\xE9fono:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(132, "span");
    \u0275\u0275text(133);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(134, PublicRegisterComponent_mat_card_24_div_134_Template, 5, 1, "div", 50)(135, PublicRegisterComponent_mat_card_24_div_135_Template, 6, 2, "div", 50);
    \u0275\u0275elementStart(136, "div", 48)(137, "span", 49);
    \u0275\u0275text(138, "Usuario:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(139, "span");
    \u0275\u0275text(140);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(141, "div", 38)(142, "button", 45);
    \u0275\u0275text(143, "\u2190 Anterior");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(144, "button", 51);
    \u0275\u0275listener("click", function PublicRegisterComponent_mat_card_24_Template_button_click_144_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.submit());
    });
    \u0275\u0275template(145, PublicRegisterComponent_mat_card_24_mat_spinner_145_Template, 1, 0, "mat-spinner", 52)(146, PublicRegisterComponent_mat_card_24_mat_icon_146_Template, 2, 0, "mat-icon", 11);
    \u0275\u0275text(147);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(148, PublicRegisterComponent_mat_card_24_div_148_Template, 4, 1, "div", 53);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("linear", true);
    \u0275\u0275advance(2);
    \u0275\u0275property("stepControl", ctx_r0.dataForm);
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r0.dataForm);
    \u0275\u0275advance(64);
    \u0275\u0275property("value", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r0.insurances);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.dataForm.invalid);
    \u0275\u0275advance(2);
    \u0275\u0275property("stepControl", ctx_r0.credentialsForm);
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r0.credentialsForm);
    \u0275\u0275advance(21);
    \u0275\u0275property("type", ctx_r0.hidePassword ? "password" : "text");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.hidePassword ? "visibility" : "visibility_off");
    \u0275\u0275advance(8);
    \u0275\u0275property("disabled", ctx_r0.credentialsForm.invalid);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate2("", ctx_r0.dataForm.value.firstName, " ", ctx_r0.dataForm.value.lastName, "");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.dataForm.value.dpi);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.dataForm.value.email);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.dataForm.value.phone || "\u2014");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.dataForm.value.birthDate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.dataForm.value.insuranceId);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.credentialsForm.value.username);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r0.submitting);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.submitting);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.submitting);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.submitting ? "Registrando..." : "Completar Registro", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.errorMsg);
  }
}
var PublicRegisterComponent = class _PublicRegisterComponent {
  constructor(fb, http, insuranceService) {
    this.fb = fb;
    this.http = http;
    this.insuranceService = insuranceService;
    this.submitting = false;
    this.registered = false;
    this.patientCode = "";
    this.registeredUsername = "";
    this.errorMsg = "";
    this.hidePassword = true;
    this.insurances = [];
  }
  ngOnInit() {
    this.insuranceService.getAllPublic().subscribe({
      next: (res) => {
        if (res.success)
          this.insurances = res.data;
      },
      error: () => {
      }
    });
    this.dataForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      birthDate: [""],
      phone: [""],
      email: ["", [Validators.required, Validators.email]],
      address: [""],
      dpi: ["", [Validators.required, Validators.pattern(/^\d{13}$/)]],
      insuranceNumber: [""],
      insuranceId: [null]
    });
    this.credentialsForm = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(4), Validators.pattern(/^\S+$/)]],
      password: ["", [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9]).{8,}$/)
      ]]
    });
  }
  getInsuranceName(id) {
    return this.insurances.find((i) => i.id === id)?.name ?? "\u2014";
  }
  submit() {
    this.submitting = true;
    this.errorMsg = "";
    const payload = __spreadProps(__spreadValues({}, this.dataForm.value), {
      username: this.credentialsForm.value.username,
      password: this.credentialsForm.value.password
    });
    this.http.post(`${environment.apiUrl}/public/patients/register`, payload).subscribe({
      next: (res) => {
        if (res.success) {
          this.patientCode = res.data.patientCode;
          this.registeredUsername = this.credentialsForm.value.username;
          this.registered = true;
        } else {
          this.errorMsg = res.message || "Error al registrar.";
        }
        this.submitting = false;
      },
      error: (err) => {
        this.errorMsg = err.error?.message || "Error al registrar. Intente de nuevo.";
        this.submitting = false;
      }
    });
  }
  static {
    this.\u0275fac = function PublicRegisterComponent_Factory(t) {
      return new (t || _PublicRegisterComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(HttpClient), \u0275\u0275directiveInject(InsuranceService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PublicRegisterComponent, selectors: [["app-public-register"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 25, vars: 2, consts: [["stepper", ""], [1, "pub-header"], [1, "brand"], [1, "spacer"], ["mat-button", "", "routerLink", "/portal"], ["mat-button", "", "routerLink", "/login"], [1, "register-page"], [1, "register-container"], [1, "register-header"], [1, "header-icon"], ["class", "success-card", 4, "ngIf"], [4, "ngIf"], [1, "success-card"], [1, "success-icon"], [1, "patient-code"], [1, "credentials-box"], [2, "font-size", "0.85rem", "color", "#757575"], [1, "success-actions"], ["mat-raised-button", "", "color", "primary", "routerLink", "/login"], ["mat-stroked-button", "", "routerLink", "/portal"], [3, "linear"], ["label", "Datos Personales", 3, "stepControl"], [3, "formGroup"], [1, "form-grid"], ["appearance", "outline"], ["matInput", "", "formControlName", "firstName"], ["matInput", "", "formControlName", "lastName"], ["matPrefix", ""], ["matInput", "", "type", "date", "formControlName", "birthDate"], ["matInput", "", "formControlName", "phone"], ["matInput", "", "formControlName", "email", "type", "email"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "formControlName", "address"], ["matInput", "", "formControlName", "dpi", "maxlength", "13", "placeholder", "0000000000000"], ["matInput", "", "formControlName", "insuranceNumber"], ["formControlName", "insuranceId"], [3, "value"], [3, "value", 4, "ngFor", "ngForOf"], [1, "step-actions"], ["mat-raised-button", "", "color", "primary", "matStepperNext", "", 3, "disabled"], ["label", "Credenciales", 3, "stepControl"], [1, "hint-text"], ["matInput", "", "formControlName", "username", "placeholder", "ej: juan.garcia"], ["matInput", "", "formControlName", "password", 3, "type"], ["mat-icon-button", "", "matSuffix", "", "type", "button", 3, "click"], ["mat-button", "", "matStepperPrevious", ""], ["label", "Confirmar"], [1, "confirm-data"], [1, "confirm-row"], [1, "label"], ["class", "confirm-row", 4, "ngIf"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], ["diameter", "20", 4, "ngIf"], ["class", "error-msg", 4, "ngIf"], ["diameter", "20"], [1, "error-msg"]], template: function PublicRegisterComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "mat-toolbar", 1)(1, "mat-icon");
        \u0275\u0275text(2, "local_hospital");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "span", 2);
        \u0275\u0275text(4, "BioCore Medical");
        \u0275\u0275elementEnd();
        \u0275\u0275element(5, "span", 3);
        \u0275\u0275elementStart(6, "button", 4)(7, "mat-icon");
        \u0275\u0275text(8, "home");
        \u0275\u0275elementEnd();
        \u0275\u0275text(9, " Inicio ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "button", 5)(11, "mat-icon");
        \u0275\u0275text(12, "login");
        \u0275\u0275elementEnd();
        \u0275\u0275text(13, " Ingresar ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(14, "div", 6)(15, "div", 7)(16, "div", 8)(17, "mat-icon", 9);
        \u0275\u0275text(18, "how_to_reg");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "h1");
        \u0275\u0275text(20, "Registro de Paciente en L\xEDnea");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "p");
        \u0275\u0275text(22, "Reg\xEDstrese desde casa y agilice su atenci\xF3n cuando llegue al hospital.");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(23, PublicRegisterComponent_mat_card_23_Template, 28, 2, "mat-card", 10)(24, PublicRegisterComponent_mat_card_24_Template, 149, 24, "mat-card", 11);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(23);
        \u0275\u0275property("ngIf", ctx.registered);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.registered);
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
      MatHint,
      MatError,
      MatPrefix,
      MatSuffix,
      MatInputModule,
      MatInput,
      MatButtonModule,
      MatButton,
      MatIconButton,
      MatIconModule,
      MatIcon,
      MatStepperModule,
      MatStep,
      MatStepper,
      MatStepperNext,
      MatStepperPrevious,
      MatProgressSpinnerModule,
      MatProgressSpinner,
      MatToolbarModule,
      MatToolbar,
      MatSelectModule,
      MatSelect,
      MatOption
    ], styles: ["\n\n.pub-header[_ngcontent-%COMP%] {\n  background: #193A31 !important;\n  color: white;\n  position: sticky;\n  top: 0;\n  z-index: 100;\n}\n.pub-header[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  margin-right: 8px;\n  color: #3EB9A8;\n}\n.brand[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  font-weight: 700;\n}\n.spacer[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.register-page[_ngcontent-%COMP%] {\n  min-height: calc(100vh - 64px);\n  background:\n    linear-gradient(\n      135deg,\n      #1E201F 0%,\n      #193A31 50%,\n      #1D6C61 100%);\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n  padding: 48px 16px;\n}\n.register-container[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 720px;\n}\n.register-header[_ngcontent-%COMP%] {\n  text-align: center;\n  color: white;\n  margin-bottom: 32px;\n}\n.header-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  color: #3EB9A8;\n  margin-bottom: 12px;\n}\n.register-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.8rem;\n  font-weight: 700;\n  margin: 0 0 8px;\n}\n.register-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.75);\n}\nh3[_ngcontent-%COMP%] {\n  font-size: 1.05rem;\n  font-weight: 600;\n  color: #1D6C61;\n  margin-bottom: 12px;\n}\n.hint-text[_ngcontent-%COMP%] {\n  color: #757575;\n  font-size: 0.85rem;\n  margin-bottom: 16px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 12px;\n}\n.step-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  margin-top: 16px;\n}\n.confirm-data[_ngcontent-%COMP%] {\n  background: #f8f9ff;\n  padding: 20px;\n  border-radius: 8px;\n  margin-bottom: 16px;\n}\n.confirm-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  padding: 8px 0;\n  border-bottom: 1px solid #e0e0e0;\n}\n.confirm-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  min-width: 110px;\n  color: #555;\n}\n.success-card[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 48px 32px;\n}\n.success-icon[_ngcontent-%COMP%] {\n  font-size: 80px;\n  width: 80px;\n  height: 80px;\n  color: #2e7d32;\n  margin-bottom: 16px;\n}\n.success-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.8rem;\n  color: #2e7d32;\n  margin-bottom: 8px;\n}\n.patient-code[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  font-weight: 700;\n  color: #1D6C61;\n  letter-spacing: 4px;\n  background: #d0f4ef;\n  padding: 16px 32px;\n  border-radius: 12px;\n  margin: 16px auto;\n  display: inline-block;\n}\n.credentials-box[_ngcontent-%COMP%] {\n  background: #f8f9ff;\n  border: 1px solid #d0d4e0;\n  border-radius: 8px;\n  padding: 16px;\n  margin: 16px 0;\n  text-align: left;\n}\n.credentials-box[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  background: #e8f5f3;\n  color: #1D6C61;\n  padding: 2px 8px;\n  border-radius: 4px;\n  font-size: 1rem;\n}\n.success-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  justify-content: center;\n  flex-wrap: wrap;\n  margin-top: 24px;\n}\n.error-msg[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: #c62828;\n  margin-top: 16px;\n}\n/*# sourceMappingURL=public-register.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PublicRegisterComponent, { className: "PublicRegisterComponent", filePath: "src\\app\\modules\\public-register\\public-register.component.ts", lineNumber: 261 });
})();
export {
  PublicRegisterComponent
};
//# sourceMappingURL=chunk-G6NO5NTB.js.map
