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
  MatTab,
  MatTabGroup,
  MatTabLabel,
  MatTabsModule
} from "./chunk-IFA7BXQN.js";
import {
  MatTableModule
} from "./chunk-SMV43QNY.js";
import {
  MatChipsModule
} from "./chunk-PA55PL57.js";
import {
  AppointmentService,
  ClinicService,
  TicketService,
  VitalSignsService
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
  FormsModule,
  MaxLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
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
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-XHW7K2DC.js";

// src/app/modules/health-staff/health-staff.component.ts
function HealthStaffComponent_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 15);
    \u0275\u0275text(1, "person_add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Recepci\xF3n de Pacientes ");
  }
}
function HealthStaffComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16)(1, "div", 17)(2, "mat-icon");
    \u0275\u0275text(3, "confirmation_number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "h3", 18);
    \u0275\u0275text(6, "Voucher Generado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 19);
    \u0275\u0275text(8, "Entregue al paciente para que pase a Caja.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 20);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 21)(12, "div")(13, "strong");
    \u0275\u0275text(14, "Paciente:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div")(17, "strong");
    \u0275\u0275text(18, "Cl\xEDnica:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div")(21, "strong");
    \u0275\u0275text(22, "Servicio:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div")(25, "strong");
    \u0275\u0275text(26, "Monto a pagar:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 22)(29, "mat-icon");
    \u0275\u0275text(30, "arrow_forward");
    \u0275\u0275elementEnd();
    \u0275\u0275text(31, " Presente el c\xF3digo en Caja para completar el pago e ingresar a la cola. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "button", 23);
    \u0275\u0275listener("click", function HealthStaffComponent_div_15_Template_button_click_32_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.resetRecepFlow());
    });
    \u0275\u0275elementStart(33, "mat-icon");
    \u0275\u0275text(34, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(35, " Nuevo Paciente ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r1.recepVoucher.voucherCode);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.recepVoucher.patientName, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.recepVoucher.clinicName, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.recepVoucher.type, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" Q", ctx_r1.recepVoucher.amount, "");
  }
}
function HealthStaffComponent_mat_stepper_16_mat_spinner_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 56);
  }
}
function HealthStaffComponent_mat_stepper_16_mat_icon_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "search");
    \u0275\u0275elementEnd();
  }
}
function HealthStaffComponent_mat_stepper_16_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 57)(1, "mat-icon");
    \u0275\u0275text(2, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "br");
    \u0275\u0275elementStart(7, "small");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 58);
    \u0275\u0275text(10, "Continuar \u2192");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("", ctx_r1.recepExistingPatient.firstName, " ", ctx_r1.recepExistingPatient.lastName, "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", ctx_r1.recepExistingPatient.patientCode, " \xB7 ", ctx_r1.recepExistingPatient.phone, "");
  }
}
function HealthStaffComponent_mat_stepper_16_div_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 59)(1, "mat-icon");
    \u0275\u0275text(2, "person_add");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "DPI no encontrado \u2014 complete los datos del nuevo paciente.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 58);
    \u0275\u0275text(6, "Continuar \u2192");
    \u0275\u0275elementEnd()();
  }
}
function HealthStaffComponent_mat_stepper_16_mat_form_field_48_mat_option_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 61);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ins_r4 = ctx.$implicit;
    \u0275\u0275property("value", ins_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ins_r4.name);
  }
}
function HealthStaffComponent_mat_stepper_16_mat_form_field_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-form-field", 38)(1, "mat-label");
    \u0275\u0275text(2, "Seguro M\xE9dico");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "mat-select", 60)(4, "mat-option", 61);
    \u0275\u0275text(5, "Sin seguro");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, HealthStaffComponent_mat_stepper_16_mat_form_field_48_mat_option_6_Template, 2, 2, "mat-option", 50);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.insurances);
  }
}
function HealthStaffComponent_mat_stepper_16_p_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 12);
    \u0275\u0275text(1, "Se generar\xE1 contrase\xF1a temporal y se enviar\xE1 al correo del paciente.");
    \u0275\u0275elementEnd();
  }
}
function HealthStaffComponent_mat_stepper_16_mat_option_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 61);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r5 = ctx.$implicit;
    \u0275\u0275property("value", c_r5.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r5.name);
  }
}
function HealthStaffComponent_mat_stepper_16_mat_spinner_85_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 56);
  }
}
function HealthStaffComponent_mat_stepper_16_mat_icon_86_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "receipt");
    \u0275\u0275elementEnd();
  }
}
function HealthStaffComponent_mat_stepper_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-stepper", 24, 0)(2, "mat-step", 25)(3, "form", 26)(4, "h3");
    \u0275\u0275text(5, "Identificar por DPI");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 12);
    \u0275\u0275text(7, "Ingrese el DPI del paciente para buscar su registro o crear uno nuevo.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "mat-form-field", 27)(9, "mat-label");
    \u0275\u0275text(10, "DPI del Paciente (13 d\xEDgitos)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "mat-icon", 28);
    \u0275\u0275text(12, "badge");
    \u0275\u0275elementEnd();
    \u0275\u0275element(13, "input", 29);
    \u0275\u0275elementStart(14, "mat-error");
    \u0275\u0275text(15, "El DPI debe tener exactamente 13 d\xEDgitos");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 30)(17, "button", 31);
    \u0275\u0275listener("click", function HealthStaffComponent_mat_stepper_16_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.recepSearchByDpi());
    });
    \u0275\u0275template(18, HealthStaffComponent_mat_stepper_16_mat_spinner_18_Template, 1, 0, "mat-spinner", 32)(19, HealthStaffComponent_mat_stepper_16_mat_icon_19_Template, 2, 0, "mat-icon", 33);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(21, HealthStaffComponent_mat_stepper_16_div_21_Template, 11, 4, "div", 34)(22, HealthStaffComponent_mat_stepper_16_div_22_Template, 7, 0, "div", 35);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "mat-step", 36)(24, "form", 26)(25, "h3");
    \u0275\u0275text(26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 37)(28, "mat-form-field", 38)(29, "mat-label");
    \u0275\u0275text(30, "Nombres *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(31, "input", 39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "mat-form-field", 38)(33, "mat-label");
    \u0275\u0275text(34, "Apellidos *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(35, "input", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "mat-form-field", 38)(37, "mat-label");
    \u0275\u0275text(38, "Tel\xE9fono");
    \u0275\u0275elementEnd();
    \u0275\u0275element(39, "input", 41);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "mat-form-field", 38)(41, "mat-label");
    \u0275\u0275text(42, "Correo Electr\xF3nico *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(43, "input", 42);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "mat-form-field", 38)(45, "mat-label");
    \u0275\u0275text(46, "Direcci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275element(47, "input", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275template(48, HealthStaffComponent_mat_stepper_16_mat_form_field_48_Template, 7, 2, "mat-form-field", 44);
    \u0275\u0275elementEnd();
    \u0275\u0275template(49, HealthStaffComponent_mat_stepper_16_p_49_Template, 2, 0, "p", 45);
    \u0275\u0275elementStart(50, "div", 30)(51, "button", 46);
    \u0275\u0275text(52, "\u2190 Anterior");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "button", 47);
    \u0275\u0275text(54, " Continuar \u2192 ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(55, "mat-step", 48)(56, "form", 26)(57, "h3");
    \u0275\u0275text(58, "Seleccionar Servicio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "div", 37)(60, "mat-form-field", 38)(61, "mat-label");
    \u0275\u0275text(62, "Cl\xEDnica *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "mat-icon", 28);
    \u0275\u0275text(64, "local_hospital");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "mat-select", 49);
    \u0275\u0275template(66, HealthStaffComponent_mat_stepper_16_mat_option_66_Template, 2, 2, "mat-option", 50);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(67, "mat-form-field", 38)(68, "mat-label");
    \u0275\u0275text(69, "Tipo de Servicio *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "mat-select", 51)(71, "mat-option", 52);
    \u0275\u0275text(72, "Consulta Externa (Q150)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "mat-option", 53);
    \u0275\u0275text(74, "Laboratorio (Q200)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "mat-option", 54);
    \u0275\u0275text(76, "Medicina General (Q100)");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(77, "mat-form-field", 27)(78, "mat-label");
    \u0275\u0275text(79, "Notas (opcional)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(80, "textarea", 55);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(81, "div", 30)(82, "button", 46);
    \u0275\u0275text(83, "\u2190 Anterior");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(84, "button", 31);
    \u0275\u0275listener("click", function HealthStaffComponent_mat_stepper_16_Template_button_click_84_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.bookWalkIn());
    });
    \u0275\u0275template(85, HealthStaffComponent_mat_stepper_16_mat_spinner_85_Template, 1, 0, "mat-spinner", 32)(86, HealthStaffComponent_mat_stepper_16_mat_icon_86_Template, 2, 0, "mat-icon", 33);
    \u0275\u0275text(87);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("linear", true);
    \u0275\u0275advance(2);
    \u0275\u0275property("stepControl", ctx_r1.recepDpiForm);
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r1.recepDpiForm);
    \u0275\u0275advance(14);
    \u0275\u0275property("disabled", ctx_r1.recepDpiForm.invalid || ctx_r1.recepSearching);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.recepSearching);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.recepSearching);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.recepSearching ? "Buscando..." : "Buscar", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.recepExistingPatient);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.recepIsNewPatient);
    \u0275\u0275advance();
    \u0275\u0275property("stepControl", ctx_r1.recepPatientForm);
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r1.recepPatientForm);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.recepExistingPatient ? "Paciente Encontrado" : "Nuevo Paciente");
    \u0275\u0275advance(5);
    \u0275\u0275property("readonly", !!ctx_r1.recepExistingPatient);
    \u0275\u0275advance(4);
    \u0275\u0275property("readonly", !!ctx_r1.recepExistingPatient);
    \u0275\u0275advance(4);
    \u0275\u0275property("readonly", !!ctx_r1.recepExistingPatient);
    \u0275\u0275advance(4);
    \u0275\u0275property("readonly", !!ctx_r1.recepExistingPatient);
    \u0275\u0275advance(4);
    \u0275\u0275property("readonly", !!ctx_r1.recepExistingPatient);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.recepExistingPatient);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.recepExistingPatient);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.recepPatientForm.invalid && !ctx_r1.recepExistingPatient);
    \u0275\u0275advance(2);
    \u0275\u0275property("stepControl", ctx_r1.recepServiceForm);
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r1.recepServiceForm);
    \u0275\u0275advance(10);
    \u0275\u0275property("ngForOf", ctx_r1.visitClinics);
    \u0275\u0275advance(18);
    \u0275\u0275property("disabled", ctx_r1.recepServiceForm.invalid || ctx_r1.recepSubmitting);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.recepSubmitting);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.recepSubmitting);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.recepSubmitting ? "Generando..." : "Generar Voucher de Pago", " ");
  }
}
function HealthStaffComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 62)(1, "mat-icon");
    \u0275\u0275text(2, "key");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "strong");
    \u0275\u0275text(5, "Credenciales enviadas al correo del paciente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "El paciente podr\xE1 cambiar la contrase\xF1a en su primer inicio de sesi\xF3n.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 63)(9, "span");
    \u0275\u0275text(10, "Usuario:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "code");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 63)(14, "span");
    \u0275\u0275text(15, "Contrase\xF1a temporal:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "code");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate(ctx_r1.recepNewCredentials.username);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.recepNewCredentials.tempPassword);
  }
}
function HealthStaffComponent_ng_template_19_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 65);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.calledTickets.length);
  }
}
function HealthStaffComponent_ng_template_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 15);
    \u0275\u0275text(1, "monitor_heart");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Signos Vitales ");
    \u0275\u0275template(3, HealthStaffComponent_ng_template_19_span_3_Template, 2, 1, "span", 64);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.calledTickets.length > 0);
  }
}
function HealthStaffComponent_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 66)(1, "mat-icon");
    \u0275\u0275text(2, "health_and_safety");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "No hay pacientes pendientes de signos vitales");
    \u0275\u0275elementEnd()();
  }
}
function HealthStaffComponent_div_24_ng_container_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "form", 75)(2, "mat-form-field", 38)(3, "mat-label");
    \u0275\u0275text(4, "Presi\xF3n Arterial");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "mat-icon", 28);
    \u0275\u0275text(6, "favorite");
    \u0275\u0275elementEnd();
    \u0275\u0275element(7, "input", 76);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "mat-form-field", 38)(9, "mat-label");
    \u0275\u0275text(10, "Frec. Card\xEDaca (bpm)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "input", 77);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "mat-form-field", 38)(13, "mat-label");
    \u0275\u0275text(14, "Temperatura (\xB0C)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(15, "input", 78);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "mat-form-field", 38)(17, "mat-label");
    \u0275\u0275text(18, "Peso (kg)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(19, "input", 79);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "mat-form-field", 38)(21, "mat-label");
    \u0275\u0275text(22, "Talla (cm)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(23, "input", 80);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "mat-form-field", 38)(25, "mat-label");
    \u0275\u0275text(26, "Saturaci\xF3n O\u2082 (%)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(27, "input", 81);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 82)(29, "button", 31);
    \u0275\u0275listener("click", function HealthStaffComponent_div_24_ng_container_11_Template_button_click_29_listener() {
      \u0275\u0275restoreView(_r6);
      const t_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sendToDoctor(t_r7));
    });
    \u0275\u0275elementStart(30, "mat-icon");
    \u0275\u0275text(31, "send");
    \u0275\u0275elementEnd();
    \u0275\u0275text(32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "button", 83);
    \u0275\u0275listener("click", function HealthStaffComponent_div_24_ng_container_11_Template_button_click_33_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.activeVitalsTicketId = null);
    });
    \u0275\u0275text(34, "Cancelar");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const t_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r1.vitalsFormMap[t_r7.id]);
    \u0275\u0275advance(28);
    \u0275\u0275property("disabled", ctx_r1.sendingVitals);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.sendingVitals ? "Enviando..." : "Registrar Signos Vitales y Enviar a Consultorio", " ");
  }
}
function HealthStaffComponent_div_24_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 84);
    \u0275\u0275listener("click", function HealthStaffComponent_div_24_ng_template_12_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const t_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openVitalsForm(t_r7));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "edit");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Tomar Signos Vitales ");
    \u0275\u0275elementEnd();
  }
}
function HealthStaffComponent_div_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 67)(1, "div", 68)(2, "div", 69);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 70)(5, "div", 71);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 72);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "span", 73);
    \u0275\u0275text(10, "Llamado por m\xE9dico");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(11, HealthStaffComponent_div_24_ng_container_11_Template, 35, 3, "ng-container", 74)(12, HealthStaffComponent_div_24_ng_template_12_Template, 4, 0, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r7 = ctx.$implicit;
    const showBtn_r9 = \u0275\u0275reference(13);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(t_r7.ticketNumber);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(t_r7.patientName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", t_r7.clinicName, " \xB7 ", t_r7.type, "");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.activeVitalsTicketId === t_r7.id)("ngIfElse", showBtn_r9);
  }
}
function HealthStaffComponent_ng_template_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 15);
    \u0275\u0275text(1, "event_available");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Citas Presenciales ");
  }
}
function HealthStaffComponent_div_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16)(1, "div", 17)(2, "mat-icon");
    \u0275\u0275text(3, "confirmation_number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "h3", 18);
    \u0275\u0275text(6, "Cita Agendada");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 19);
    \u0275\u0275text(8, "Entregue este voucher al paciente para que pase a Caja.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 20);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 21)(12, "div")(13, "strong");
    \u0275\u0275text(14, "Paciente:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div")(17, "strong");
    \u0275\u0275text(18, "Cl\xEDnica:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div")(21, "strong");
    \u0275\u0275text(22, "Tipo:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div")(25, "strong");
    \u0275\u0275text(26, "Fecha / Hora:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div")(29, "strong");
    \u0275\u0275text(30, "Monto a pagar:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 22)(33, "mat-icon");
    \u0275\u0275text(34, "arrow_forward");
    \u0275\u0275elementEnd();
    \u0275\u0275text(35, " El paciente debe presentar este c\xF3digo en Caja para completar el pago. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "button", 23);
    \u0275\u0275listener("click", function HealthStaffComponent_div_33_Template_button_click_36_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.resetApptFlow());
    });
    \u0275\u0275elementStart(37, "mat-icon");
    \u0275\u0275text(38, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(39, " Nueva Cita ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r1.apptVoucher.voucherCode);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.apptVoucher.patientName, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.apptVoucher.clinicName, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.apptVoucher.type, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", ctx_r1.apptVoucher.scheduledDate, " ", ctx_r1.apptVoucher.scheduledTime, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" Q", ctx_r1.apptVoucher.amount, "");
  }
}
function HealthStaffComponent_mat_stepper_34_mat_spinner_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 56);
  }
}
function HealthStaffComponent_mat_stepper_34_mat_icon_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "search");
    \u0275\u0275elementEnd();
  }
}
function HealthStaffComponent_mat_stepper_34_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 57)(1, "mat-icon");
    \u0275\u0275text(2, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "br");
    \u0275\u0275elementStart(7, "small");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 58);
    \u0275\u0275text(10, "Continuar \u2192");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("", ctx_r1.apptExistingPatient.firstName, " ", ctx_r1.apptExistingPatient.lastName, "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", ctx_r1.apptExistingPatient.patientCode, " \xB7 ", ctx_r1.apptExistingPatient.phone, "");
  }
}
function HealthStaffComponent_mat_stepper_34_div_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 59)(1, "mat-icon");
    \u0275\u0275text(2, "person_add");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "DPI no encontrado \u2014 complete los datos del nuevo paciente.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 58);
    \u0275\u0275text(6, "Continuar \u2192");
    \u0275\u0275elementEnd()();
  }
}
function HealthStaffComponent_mat_stepper_34_mat_form_field_52_mat_option_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 61);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ins_r12 = ctx.$implicit;
    \u0275\u0275property("value", ins_r12.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ins_r12.name);
  }
}
function HealthStaffComponent_mat_stepper_34_mat_form_field_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-form-field", 38)(1, "mat-label");
    \u0275\u0275text(2, "Seguro M\xE9dico");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "mat-select", 60)(4, "mat-option", 61);
    \u0275\u0275text(5, "Sin seguro");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, HealthStaffComponent_mat_stepper_34_mat_form_field_52_mat_option_6_Template, 2, 2, "mat-option", 50);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.insurances);
  }
}
function HealthStaffComponent_mat_stepper_34_p_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 12);
    \u0275\u0275text(1, " Se generar\xE1 una contrase\xF1a temporal y se enviar\xE1 al correo del paciente. ");
    \u0275\u0275elementEnd();
  }
}
function HealthStaffComponent_mat_stepper_34_mat_option_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 61);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r13 = ctx.$implicit;
    \u0275\u0275property("value", c_r13.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r13.name);
  }
}
function HealthStaffComponent_mat_stepper_34_mat_option_89_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 92);
    \u0275\u0275text(1, "Cargando horarios...");
    \u0275\u0275elementEnd();
  }
}
function HealthStaffComponent_mat_stepper_34_mat_option_90_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 92);
    \u0275\u0275text(1, " No hay horarios disponibles ");
    \u0275\u0275elementEnd();
  }
}
function HealthStaffComponent_mat_stepper_34_mat_option_91_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 61);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r14 = ctx.$implicit;
    \u0275\u0275property("value", s_r14);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r14);
  }
}
function HealthStaffComponent_mat_stepper_34_mat_spinner_100_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 56);
  }
}
function HealthStaffComponent_mat_stepper_34_mat_icon_101_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "event_available");
    \u0275\u0275elementEnd();
  }
}
function HealthStaffComponent_mat_stepper_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-stepper", 24, 2)(2, "mat-step", 85)(3, "form", 26)(4, "h3");
    \u0275\u0275text(5, "Buscar por DPI");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 12);
    \u0275\u0275text(7, "Si el DPI no tiene cuenta activa, se crear\xE1 un usuario y se enviar\xE1 la contrase\xF1a al correo del paciente.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "mat-form-field", 27)(9, "mat-label");
    \u0275\u0275text(10, "DPI (13 d\xEDgitos)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "mat-icon", 28);
    \u0275\u0275text(12, "badge");
    \u0275\u0275elementEnd();
    \u0275\u0275element(13, "input", 29);
    \u0275\u0275elementStart(14, "mat-error");
    \u0275\u0275text(15, "Ingrese los 13 d\xEDgitos del DPI");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 30)(17, "button", 31);
    \u0275\u0275listener("click", function HealthStaffComponent_mat_stepper_34_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.apptSearchByDpi());
    });
    \u0275\u0275template(18, HealthStaffComponent_mat_stepper_34_mat_spinner_18_Template, 1, 0, "mat-spinner", 32)(19, HealthStaffComponent_mat_stepper_34_mat_icon_19_Template, 2, 0, "mat-icon", 33);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(21, HealthStaffComponent_mat_stepper_34_div_21_Template, 11, 4, "div", 34)(22, HealthStaffComponent_mat_stepper_34_div_22_Template, 7, 0, "div", 35);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "mat-step", 36)(24, "form", 26)(25, "h3");
    \u0275\u0275text(26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 37)(28, "mat-form-field", 38)(29, "mat-label");
    \u0275\u0275text(30, "Nombres *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(31, "input", 39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "mat-form-field", 38)(33, "mat-label");
    \u0275\u0275text(34, "Apellidos *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(35, "input", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "mat-form-field", 38)(37, "mat-label");
    \u0275\u0275text(38, "Fecha de Nacimiento");
    \u0275\u0275elementEnd();
    \u0275\u0275element(39, "input", 86);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "mat-form-field", 38)(41, "mat-label");
    \u0275\u0275text(42, "Tel\xE9fono");
    \u0275\u0275elementEnd();
    \u0275\u0275element(43, "input", 41);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "mat-form-field", 38)(45, "mat-label");
    \u0275\u0275text(46, "Correo Electr\xF3nico *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(47, "input", 42);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "mat-form-field", 38)(49, "mat-label");
    \u0275\u0275text(50, "Direcci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275element(51, "input", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275template(52, HealthStaffComponent_mat_stepper_34_mat_form_field_52_Template, 7, 2, "mat-form-field", 44);
    \u0275\u0275elementEnd();
    \u0275\u0275template(53, HealthStaffComponent_mat_stepper_34_p_53_Template, 2, 0, "p", 45);
    \u0275\u0275elementStart(54, "div", 30)(55, "button", 46);
    \u0275\u0275text(56, "\u2190 Anterior");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "button", 47);
    \u0275\u0275text(58, " Continuar \u2192 ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(59, "mat-step", 87)(60, "form", 26)(61, "h3");
    \u0275\u0275text(62, "Seleccionar Fecha y Hora");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "div", 37)(64, "mat-form-field", 38)(65, "mat-label");
    \u0275\u0275text(66, "Cl\xEDnica *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(67, "mat-icon", 28);
    \u0275\u0275text(68, "local_hospital");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "mat-select", 88);
    \u0275\u0275listener("selectionChange", function HealthStaffComponent_mat_stepper_34_Template_mat_select_selectionChange_69_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onApptClinicChange($event.value));
    });
    \u0275\u0275template(70, HealthStaffComponent_mat_stepper_34_mat_option_70_Template, 2, 2, "mat-option", 50);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(71, "mat-form-field", 38)(72, "mat-label");
    \u0275\u0275text(73, "Tipo de Cita *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "mat-select", 51)(75, "mat-option", 52);
    \u0275\u0275text(76, "Consulta Externa (Q150)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(77, "mat-option", 53);
    \u0275\u0275text(78, "Laboratorio (Q200)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "mat-option", 54);
    \u0275\u0275text(80, "Medicina General (Q100)");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(81, "mat-form-field", 38)(82, "mat-label");
    \u0275\u0275text(83, "Fecha *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(84, "input", 89);
    \u0275\u0275listener("change", function HealthStaffComponent_mat_stepper_34_Template_input_change_84_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onApptDateChange());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(85, "mat-form-field", 38)(86, "mat-label");
    \u0275\u0275text(87, "Hora *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(88, "mat-select", 90);
    \u0275\u0275template(89, HealthStaffComponent_mat_stepper_34_mat_option_89_Template, 2, 0, "mat-option", 91)(90, HealthStaffComponent_mat_stepper_34_mat_option_90_Template, 2, 0, "mat-option", 91)(91, HealthStaffComponent_mat_stepper_34_mat_option_91_Template, 2, 2, "mat-option", 50);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(92, "mat-form-field", 27)(93, "mat-label");
    \u0275\u0275text(94, "Notas (opcional)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(95, "textarea", 55);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(96, "div", 30)(97, "button", 46);
    \u0275\u0275text(98, "\u2190 Anterior");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(99, "button", 31);
    \u0275\u0275listener("click", function HealthStaffComponent_mat_stepper_34_Template_button_click_99_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.bookAppointment());
    });
    \u0275\u0275template(100, HealthStaffComponent_mat_stepper_34_mat_spinner_100_Template, 1, 0, "mat-spinner", 32)(101, HealthStaffComponent_mat_stepper_34_mat_icon_101_Template, 2, 0, "mat-icon", 33);
    \u0275\u0275text(102);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("linear", true);
    \u0275\u0275advance(2);
    \u0275\u0275property("stepControl", ctx_r1.apptDpiForm);
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r1.apptDpiForm);
    \u0275\u0275advance(14);
    \u0275\u0275property("disabled", ctx_r1.apptDpiForm.invalid || ctx_r1.apptSearching);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.apptSearching);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.apptSearching);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.apptSearching ? "Buscando..." : "Buscar", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.apptExistingPatient);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.apptIsNewPatient);
    \u0275\u0275advance();
    \u0275\u0275property("stepControl", ctx_r1.apptPatientForm);
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r1.apptPatientForm);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.apptExistingPatient ? "Paciente Encontrado" : "Registrar Nuevo Paciente");
    \u0275\u0275advance(5);
    \u0275\u0275property("readonly", !!ctx_r1.apptExistingPatient);
    \u0275\u0275advance(4);
    \u0275\u0275property("readonly", !!ctx_r1.apptExistingPatient);
    \u0275\u0275advance(4);
    \u0275\u0275property("readonly", !!ctx_r1.apptExistingPatient);
    \u0275\u0275advance(4);
    \u0275\u0275property("readonly", !!ctx_r1.apptExistingPatient);
    \u0275\u0275advance(4);
    \u0275\u0275property("readonly", !!ctx_r1.apptExistingPatient);
    \u0275\u0275advance(4);
    \u0275\u0275property("readonly", !!ctx_r1.apptExistingPatient);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.apptExistingPatient);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.apptExistingPatient);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.apptPatientForm.invalid && !ctx_r1.apptExistingPatient);
    \u0275\u0275advance(2);
    \u0275\u0275property("stepControl", ctx_r1.apptCalendarForm);
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r1.apptCalendarForm);
    \u0275\u0275advance(10);
    \u0275\u0275property("ngForOf", ctx_r1.visitClinics);
    \u0275\u0275advance(14);
    \u0275\u0275property("min", ctx_r1.apptMinDate);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.apptLoadingSlots);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.apptLoadingSlots && ctx_r1.apptAvailableSlots.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.apptAvailableSlots);
    \u0275\u0275advance(8);
    \u0275\u0275property("disabled", ctx_r1.apptCalendarForm.invalid || ctx_r1.apptSubmitting);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.apptSubmitting);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.apptSubmitting);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.apptSubmitting ? "Agendando..." : "Agendar y Generar Voucher", " ");
  }
}
function HealthStaffComponent_div_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 62)(1, "mat-icon");
    \u0275\u0275text(2, "key");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "strong");
    \u0275\u0275text(5, "Credenciales enviadas al correo del paciente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "El paciente podr\xE1 cambiar la contrase\xF1a en su primer inicio de sesi\xF3n.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 63)(9, "span");
    \u0275\u0275text(10, "Usuario:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "code");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 63)(14, "span");
    \u0275\u0275text(15, "Contrase\xF1a temporal:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "code");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate(ctx_r1.apptNewCredentials.username);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.apptNewCredentials.tempPassword);
  }
}
var HealthStaffComponent = class _HealthStaffComponent {
  constructor(fb, patientService, clinicService, ticketService, vitalSignsService, appointmentService, insuranceService, notification) {
    this.fb = fb;
    this.patientService = patientService;
    this.clinicService = clinicService;
    this.ticketService = ticketService;
    this.vitalSignsService = vitalSignsService;
    this.appointmentService = appointmentService;
    this.insuranceService = insuranceService;
    this.notification = notification;
    this.recepExistingPatient = null;
    this.recepIsNewPatient = false;
    this.recepSearching = false;
    this.recepSubmitting = false;
    this.recepVoucher = null;
    this.recepNewCredentials = null;
    this.clinics = [];
    this.visitClinics = [];
    this.insurances = [];
    this.tickets = [];
    this.filteredTickets = [];
    this.filterClinicId = 0;
    this.calledTickets = [];
    this.activeVitalsTicketId = null;
    this.vitalsFormMap = {};
    this.sendingVitals = false;
    this.apptExistingPatient = null;
    this.apptIsNewPatient = false;
    this.apptSearching = false;
    this.apptSubmitting = false;
    this.apptAvailableSlots = [];
    this.apptLoadingSlots = false;
    this.apptVoucher = null;
    this.apptNewCredentials = null;
    this.apptMinDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  }
  ngOnInit() {
    this.recepDpiForm = this.fb.group({
      dpi: ["", [Validators.required, Validators.pattern(/^\d{13}$/)]]
    });
    this.recepPatientForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      phone: [""],
      email: ["", [Validators.required, Validators.email]],
      address: [""],
      insuranceId: [null]
    });
    this.recepServiceForm = this.fb.group({
      clinicId: [null, Validators.required],
      type: ["CONSULTA", Validators.required],
      notes: [""]
    });
    this.apptDpiForm = this.fb.group({
      dpi: ["", [Validators.required, Validators.pattern(/^\d{13}$/)]]
    });
    this.apptPatientForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      birthDate: [""],
      phone: [""],
      email: ["", [Validators.required, Validators.email]],
      address: [""],
      insuranceId: [null]
    });
    this.apptCalendarForm = this.fb.group({
      clinicId: [null, Validators.required],
      type: ["CONSULTA", Validators.required],
      scheduledDate: ["", Validators.required],
      scheduledTime: ["", Validators.required],
      notes: [""]
    });
    this.clinicService.getAll().subscribe((res) => {
      if (res.success) {
        this.clinics = res.data;
        const excluded = ["farmacia", "emergencia", "emergencias"];
        this.visitClinics = res.data.filter((c) => !excluded.some((x) => c.name.toLowerCase().includes(x)));
      }
    });
    this.insuranceService.getAll().subscribe((res) => {
      if (res.success)
        this.insurances = res.data;
    });
    this.loadTickets();
    this.loadCalledTickets();
    this.pollInterval = setInterval(() => this.loadCalledTickets(), 8e3);
  }
  ngOnDestroy() {
    clearInterval(this.pollInterval);
  }
  recepSearchByDpi() {
    const dpi = this.recepDpiForm.value.dpi;
    this.recepSearching = true;
    this.recepExistingPatient = null;
    this.recepIsNewPatient = false;
    this.patientService.getByDpi(dpi).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.recepExistingPatient = res.data;
          this.recepPatientForm.patchValue(res.data);
        } else {
          this.recepIsNewPatient = true;
          this.recepPatientForm.reset();
        }
        this.recepSearching = false;
      },
      error: () => {
        this.recepIsNewPatient = true;
        this.recepPatientForm.reset();
        this.recepSearching = false;
      }
    });
  }
  bookWalkIn() {
    this.recepSubmitting = true;
    const doBook = (patientId) => {
      const svc = this.recepServiceForm.value;
      this.appointmentService.book({
        patientId,
        clinicId: svc.clinicId,
        type: svc.type,
        notes: svc.notes || ""
        // no scheduledDate / scheduledTime → walk-in
      }).subscribe({
        next: (res) => {
          if (res.success) {
            this.recepVoucher = res.data;
            this.notification.success("Voucher generado. Paciente puede pasar a Caja.");
          } else {
            this.notification.error(res.message || "Error al generar voucher");
          }
          this.recepSubmitting = false;
        },
        error: (err) => {
          this.notification.error(err.error?.message || "Error al generar voucher");
          this.recepSubmitting = false;
        }
      });
    };
    if (this.recepExistingPatient) {
      this.recepNewCredentials = null;
      doBook(this.recepExistingPatient.id);
    } else {
      const data = __spreadProps(__spreadValues(__spreadValues({}, this.recepDpiForm.value), this.recepPatientForm.value), { createAccount: true });
      this.patientService.create(data).subscribe({
        next: (res) => {
          if (res.success) {
            if (res.data.tempPassword) {
              this.recepNewCredentials = {
                username: res.data.username ?? data.dpi,
                tempPassword: res.data.tempPassword
              };
            }
            doBook(res.data.id);
          } else {
            this.notification.error(res.message || "Error al registrar paciente");
            this.recepSubmitting = false;
          }
        },
        error: (err) => {
          this.notification.error(err.error?.message || "Error al registrar paciente");
          this.recepSubmitting = false;
        }
      });
    }
  }
  resetRecepFlow() {
    this.recepVoucher = null;
    this.recepNewCredentials = null;
    this.recepExistingPatient = null;
    this.recepIsNewPatient = false;
    this.recepDpiForm.reset();
    this.recepPatientForm.reset();
    this.recepServiceForm.reset({ type: "CONSULTA" });
  }
  loadCalledTickets() {
    this.ticketService.getAll().subscribe({
      next: (res) => {
        if (res.success) {
          this.calledTickets = res.data.filter((t) => t.status === "BEING_CALLED");
        }
      },
      error: () => {
      }
    });
  }
  openVitalsForm(ticket) {
    this.activeVitalsTicketId = ticket.id;
    if (!this.vitalsFormMap[ticket.id]) {
      this.vitalsFormMap[ticket.id] = this.fb.group({
        bloodPressure: [""],
        heartRate: [null],
        temperature: [null],
        weight: [null],
        height: [null],
        oxygenSaturation: [null]
      });
    }
  }
  sendToDoctor(ticket) {
    this.sendingVitals = true;
    const form = this.vitalsFormMap[ticket.id];
    const v = form?.value ?? {};
    const hasVitals = v.bloodPressure || v.heartRate || v.temperature || v.weight;
    const confirmAndSend = () => {
      this.ticketService.confirmArrival(ticket.id).subscribe({
        next: (res) => {
          if (res.success) {
            this.notification.success(`${ticket.patientName} enviado a consultorio`);
            this.activeVitalsTicketId = null;
            delete this.vitalsFormMap[ticket.id];
            this.loadCalledTickets();
            this.loadTickets();
          }
          this.sendingVitals = false;
        },
        error: (err) => {
          const msg = err.error?.message || "Error al enviar paciente";
          this.notification.error(msg);
          this.sendingVitals = false;
        }
      });
    };
    this.vitalSignsService.register({
      ticketId: ticket.id,
      bloodPressure: v.bloodPressure || null,
      heartRate: v.heartRate ? +v.heartRate : null,
      temperature: v.temperature ? +v.temperature : null,
      weight: v.weight ? +v.weight : null,
      height: v.height ? +v.height : null,
      oxygenSaturation: v.oxygenSaturation ? +v.oxygenSaturation : null
    }).subscribe({ next: () => confirmAndSend(), error: () => confirmAndSend() });
  }
  loadTickets() {
    this.ticketService.getAll().subscribe({
      next: (res) => {
        if (res.success) {
          this.tickets = res.data.filter((t) => t.status === "WAITING" || t.status === "BEING_CALLED" || t.status === "IN_CONSULTATION");
          this.filterTickets();
        }
      },
      error: () => {
      }
    });
  }
  filterTickets() {
    if (this.filterClinicId === 0) {
      this.filteredTickets = this.tickets;
    } else {
      this.filteredTickets = this.tickets.filter((t) => t.clinicId === this.filterClinicId);
    }
  }
  getStatusClass(status) {
    const m = {
      WAITING: "status-waiting",
      BEING_CALLED: "status-being-called",
      IN_CONSULTATION: "status-in-consultation",
      COMPLETED: "status-completed",
      ABSENT: "status-absent",
      CANCELLED_NO_PAYMENT: "status-absent"
    };
    return m[status] ?? "";
  }
  statusLabel(status) {
    const m = {
      WAITING: "En Espera",
      BEING_CALLED: "Siendo Llamado",
      IN_CONSULTATION: "En Consulta",
      COMPLETED: "Completado",
      ABSENT: "Ausente",
      CANCELLED_NO_PAYMENT: "Cancelado"
    };
    return m[status] ?? status;
  }
  // ── Citas Presenciales ────────────────────────────────────────────────────
  apptSearchByDpi() {
    const dpi = this.apptDpiForm.value.dpi;
    this.apptSearching = true;
    this.apptExistingPatient = null;
    this.apptIsNewPatient = false;
    this.patientService.getByDpi(dpi).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.apptExistingPatient = res.data;
          this.apptPatientForm.patchValue(res.data);
        } else {
          this.apptIsNewPatient = true;
          this.apptPatientForm.reset();
        }
        this.apptSearching = false;
      },
      error: () => {
        this.apptIsNewPatient = true;
        this.apptPatientForm.reset();
        this.apptSearching = false;
      }
    });
  }
  onApptClinicChange(clinicId) {
    this.apptCalendarForm.patchValue({ scheduledTime: "" });
    this.loadApptSlots();
  }
  onApptDateChange() {
    this.apptCalendarForm.patchValue({ scheduledTime: "" });
    this.loadApptSlots();
  }
  loadApptSlots() {
    const { clinicId, scheduledDate } = this.apptCalendarForm.value;
    if (!clinicId || !scheduledDate)
      return;
    this.apptLoadingSlots = true;
    this.apptAvailableSlots = [];
    this.appointmentService.getAvailableSlots(scheduledDate, clinicId).subscribe({
      next: (res) => {
        if (res.success)
          this.apptAvailableSlots = res.data;
        this.apptLoadingSlots = false;
      },
      error: () => {
        this.apptLoadingSlots = false;
      }
    });
  }
  bookAppointment() {
    this.apptSubmitting = true;
    const doBook = (patientId) => {
      const cal = this.apptCalendarForm.value;
      this.appointmentService.book({
        patientId,
        clinicId: cal.clinicId,
        type: cal.type,
        scheduledDate: cal.scheduledDate,
        scheduledTime: cal.scheduledTime,
        notes: cal.notes || ""
      }).subscribe({
        next: (res) => {
          console.log("BOOK RESPONSE:", JSON.stringify(res));
          if (res.success) {
            this.apptVoucher = res.data;
            this.notification.success("Cita agendada. Voucher generado.");
          } else {
            this.notification.error(res.message || "Error al agendar");
          }
          this.apptSubmitting = false;
        },
        error: (err) => {
          this.notification.error(err.error?.message || "Error al agendar la cita");
          this.apptSubmitting = false;
        }
      });
    };
    if (this.apptExistingPatient) {
      this.apptNewCredentials = null;
      doBook(this.apptExistingPatient.id);
    } else {
      const data = __spreadProps(__spreadValues(__spreadValues({}, this.apptDpiForm.value), this.apptPatientForm.value), {
        createAccount: true
      });
      this.patientService.create(data).subscribe({
        next: (res) => {
          if (res.success) {
            if (res.data.tempPassword) {
              this.apptNewCredentials = {
                username: res.data.username ?? data.dpi,
                tempPassword: res.data.tempPassword
              };
            }
            doBook(res.data.id);
          } else {
            this.notification.error(res.message || "Error al registrar paciente");
            this.apptSubmitting = false;
          }
        },
        error: (err) => {
          this.notification.error(err.error?.message || "Error al registrar paciente");
          this.apptSubmitting = false;
        }
      });
    }
  }
  resetApptFlow() {
    this.apptVoucher = null;
    this.apptNewCredentials = null;
    this.apptExistingPatient = null;
    this.apptIsNewPatient = false;
    this.apptAvailableSlots = [];
    this.apptDpiForm.reset();
    this.apptPatientForm.reset();
    this.apptCalendarForm.reset({ type: "CONSULTA" });
  }
  static {
    this.\u0275fac = function HealthStaffComponent_Factory(t) {
      return new (t || _HealthStaffComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(PatientService), \u0275\u0275directiveInject(ClinicService), \u0275\u0275directiveInject(TicketService), \u0275\u0275directiveInject(VitalSignsService), \u0275\u0275directiveInject(AppointmentService), \u0275\u0275directiveInject(InsuranceService), \u0275\u0275directiveInject(NotificationService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HealthStaffComponent, selectors: [["app-health-staff"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 36, vars: 8, consts: [["recepStepper", ""], ["showBtn", ""], ["apptStepper", ""], [1, "page-container"], [1, "page-header"], [2, "vertical-align", "middle", "margin-right", "8px"], ["animationDuration", "200ms"], ["mat-tab-label", ""], [1, "tab-content"], ["class", "voucher-box", 4, "ngIf"], [3, "linear", 4, "ngIf"], ["class", "credentials-box", "style", "margin-top:16px", 4, "ngIf"], [1, "hint-text"], ["class", "empty-state", 4, "ngIf"], ["class", "called-card", 4, "ngFor", "ngForOf"], [1, "tab-icon"], [1, "voucher-box"], [1, "voucher-header"], [2, "margin", "0"], [1, "hint-text", 2, "margin", "4px 0 0"], [1, "voucher-code"], [1, "voucher-details"], [1, "voucher-instruction"], ["mat-stroked-button", "", "color", "primary", 2, "margin-top", "16px", 3, "click"], [3, "linear"], ["label", "Identificaci\xF3n", 3, "stepControl"], [3, "formGroup"], ["appearance", "outline", 1, "wide"], ["matPrefix", ""], ["matInput", "", "formControlName", "dpi", "placeholder", "0000000000000", "maxlength", "13"], [1, "step-actions"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], ["diameter", "20", 4, "ngIf"], [4, "ngIf"], ["class", "found-box", 4, "ngIf"], ["class", "new-patient-notice", 4, "ngIf"], ["label", "Datos del Paciente", 3, "stepControl"], [1, "form-grid"], ["appearance", "outline"], ["matInput", "", "formControlName", "firstName", 3, "readonly"], ["matInput", "", "formControlName", "lastName", 3, "readonly"], ["matInput", "", "formControlName", "phone", 3, "readonly"], ["matInput", "", "formControlName", "email", 3, "readonly"], ["matInput", "", "formControlName", "address", 3, "readonly"], ["appearance", "outline", 4, "ngIf"], ["class", "hint-text", 4, "ngIf"], ["mat-button", "", "matStepperPrevious", ""], ["mat-raised-button", "", "color", "primary", "matStepperNext", "", 3, "disabled"], ["label", "Servicio", 3, "stepControl"], ["formControlName", "clinicId"], [3, "value", 4, "ngFor", "ngForOf"], ["formControlName", "type"], ["value", "CONSULTA"], ["value", "LABORATORIO"], ["value", "CONTROL"], ["matInput", "", "formControlName", "notes", "rows", "2"], ["diameter", "20"], [1, "found-box"], ["mat-raised-button", "", "color", "accent", "matStepperNext", ""], [1, "new-patient-notice"], ["formControlName", "insuranceId"], [3, "value"], [1, "credentials-box", 2, "margin-top", "16px"], [1, "cred-row"], ["class", "tab-badge", 4, "ngIf"], [1, "tab-badge"], [1, "empty-state"], [1, "called-card"], [1, "called-card-header"], [1, "ticket-number"], [1, "ticket-info"], [1, "ticket-patient"], [1, "ticket-meta"], [1, "status-chip", "status-being-called"], [4, "ngIf", "ngIfElse"], [1, "form-grid", "vitals-inline-form", 3, "formGroup"], ["matInput", "", "formControlName", "bloodPressure", "placeholder", "120/80"], ["matInput", "", "type", "number", "formControlName", "heartRate"], ["matInput", "", "type", "number", "formControlName", "temperature", "step", "0.1"], ["matInput", "", "type", "number", "formControlName", "weight", "step", "0.1"], ["matInput", "", "type", "number", "formControlName", "height"], ["matInput", "", "type", "number", "formControlName", "oxygenSaturation"], [1, "vitals-actions"], ["mat-button", "", 3, "click"], ["mat-stroked-button", "", "color", "primary", 2, "margin-top", "12px", 3, "click"], ["label", "Identificar Paciente", 3, "stepControl"], ["matInput", "", "type", "date", "formControlName", "birthDate", 3, "readonly"], ["label", "Seleccionar Cita", 3, "stepControl"], ["formControlName", "clinicId", 3, "selectionChange"], ["matInput", "", "type", "date", "formControlName", "scheduledDate", 3, "change", "min"], ["formControlName", "scheduledTime"], ["disabled", "", 4, "ngIf"], ["disabled", ""]], template: function HealthStaffComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 3)(1, "div", 4)(2, "h1")(3, "mat-icon", 5);
        \u0275\u0275text(4, "health_and_safety");
        \u0275\u0275elementEnd();
        \u0275\u0275text(5, "Personal de Salud");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "mat-tab-group", 6)(7, "mat-tab");
        \u0275\u0275template(8, HealthStaffComponent_ng_template_8_Template, 3, 0, "ng-template", 7);
        \u0275\u0275elementStart(9, "div", 8)(10, "mat-card")(11, "mat-card-header")(12, "mat-card-title");
        \u0275\u0275text(13, "Recepci\xF3n Walk-in");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(14, "mat-card-content");
        \u0275\u0275template(15, HealthStaffComponent_div_15_Template, 36, 5, "div", 9)(16, HealthStaffComponent_mat_stepper_16_Template, 88, 27, "mat-stepper", 10)(17, HealthStaffComponent_div_17_Template, 18, 2, "div", 11);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(18, "mat-tab");
        \u0275\u0275template(19, HealthStaffComponent_ng_template_19_Template, 4, 1, "ng-template", 7);
        \u0275\u0275elementStart(20, "div", 8)(21, "p", 12);
        \u0275\u0275text(22, "Pacientes llamados por el m\xE9dico que deben pasar por el \xE1rea de signos vitales antes de la consulta.");
        \u0275\u0275elementEnd();
        \u0275\u0275template(23, HealthStaffComponent_div_23_Template, 5, 0, "div", 13)(24, HealthStaffComponent_div_24_Template, 14, 6, "div", 14);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(25, "mat-tab");
        \u0275\u0275template(26, HealthStaffComponent_ng_template_26_Template, 3, 0, "ng-template", 7);
        \u0275\u0275elementStart(27, "div", 8)(28, "mat-card")(29, "mat-card-header")(30, "mat-card-title");
        \u0275\u0275text(31, "Agendar Cita Presencial");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(32, "mat-card-content");
        \u0275\u0275template(33, HealthStaffComponent_div_33_Template, 40, 7, "div", 9)(34, HealthStaffComponent_mat_stepper_34_Template, 103, 32, "mat-stepper", 10)(35, HealthStaffComponent_div_35_Template, 18, 2, "div", 11);
        \u0275\u0275elementEnd()()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(15);
        \u0275\u0275property("ngIf", ctx.recepVoucher);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.recepVoucher);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.recepNewCredentials);
        \u0275\u0275advance(6);
        \u0275\u0275property("ngIf", ctx.calledTickets.length === 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngForOf", ctx.calledTickets);
        \u0275\u0275advance(9);
        \u0275\u0275property("ngIf", ctx.apptVoucher);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.apptVoucher);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.apptNewCredentials);
      }
    }, dependencies: [
      CommonModule,
      NgForOf,
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
      FormsModule,
      MatCardModule,
      MatCard,
      MatCardContent,
      MatCardHeader,
      MatCardTitle,
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
      MatSelect,
      MatOption,
      MatTabsModule,
      MatTabLabel,
      MatTab,
      MatTabGroup,
      MatProgressSpinnerModule,
      MatProgressSpinner,
      MatTableModule,
      MatChipsModule,
      MatStepperModule,
      MatStep,
      MatStepper,
      MatStepperNext,
      MatStepperPrevious
    ], styles: ["\n\n.tab-content[_ngcontent-%COMP%] {\n  padding: 24px 0;\n}\n.tab-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  margin-right: 6px;\n  vertical-align: middle;\n}\nh3[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 500;\n  color: #1D6C61;\n  margin-bottom: 16px;\n}\nh4.section-subtitle[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  font-weight: 500;\n  color: #555;\n  margin: 16px 0 8px;\n  border-top: 1px solid #e0e0e0;\n  padding-top: 12px;\n}\n.hint-text[_ngcontent-%COMP%] {\n  color: #757575;\n  font-size: 0.85rem;\n  margin-bottom: 16px;\n}\n.wide[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 12px;\n  margin-bottom: 8px;\n}\n.step-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  margin-top: 16px;\n}\n.found-box[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  background: #e8f5e9;\n  padding: 16px;\n  border-radius: 8px;\n  color: #2e7d32;\n  margin-top: 16px;\n}\n.found-box[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 32px;\n  width: 32px;\n  height: 32px;\n}\n.queue-filters[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.ticket-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 12px 16px;\n  background: white;\n  border-radius: 8px;\n  margin-bottom: 8px;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);\n}\n.ticket-number[_ngcontent-%COMP%] {\n  font-size: 1.4rem;\n  font-weight: 700;\n  color: #1D6C61;\n  min-width: 80px;\n}\n.ticket-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.ticket-patient[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n.ticket-meta[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #757575;\n}\n.status-chip[_ngcontent-%COMP%] {\n  padding: 4px 12px;\n  border-radius: 12px;\n  font-size: 0.8rem;\n  font-weight: 500;\n}\n.credentials-box[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 16px;\n  background: #fff8e1;\n  border: 1px solid #ffe082;\n  border-radius: 8px;\n  padding: 16px 20px;\n  margin: 12px 0;\n}\n.credentials-box[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n  width: 28px;\n  height: 28px;\n  color: #f57f17;\n  flex-shrink: 0;\n  margin-top: 4px;\n}\n.credentials-box[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #e65100;\n  font-size: 0.95rem;\n}\n.credentials-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #555;\n  font-size: 0.82rem;\n  margin: 4px 0 10px;\n}\n.cred-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 0.9rem;\n  margin-bottom: 4px;\n}\n.cred-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #757575;\n  min-width: 140px;\n}\n.cred-row[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  background: #fff3e0;\n  padding: 2px 8px;\n  border-radius: 4px;\n  font-size: 1rem;\n  font-weight: 700;\n  letter-spacing: 0.5px;\n  color: #e65100;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 48px;\n  color: #9e9e9e;\n}\n.empty-state[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  color: #3EB9A8;\n  opacity: 0.5;\n  margin-bottom: 8px;\n}\n.reload-btn[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 24px;\n}\n.status-waiting[_ngcontent-%COMP%] {\n  background: #e3f2fd;\n  color: #1565c0;\n}\n.status-being-called[_ngcontent-%COMP%] {\n  background: #fff3e0;\n  color: #e65100;\n}\n.status-in-consultation[_ngcontent-%COMP%] {\n  background: #e8f5e9;\n  color: #2e7d32;\n}\n.status-completed[_ngcontent-%COMP%] {\n  background: #f5f5f5;\n  color: #616161;\n}\n.status-absent[_ngcontent-%COMP%] {\n  background: #ffebee;\n  color: #c62828;\n}\n.tab-badge[_ngcontent-%COMP%] {\n  background: #e53935;\n  color: white;\n  border-radius: 10px;\n  padding: 1px 7px;\n  font-size: 0.72rem;\n  font-weight: 700;\n  margin-left: 6px;\n}\n.called-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 10px;\n  padding: 16px 20px;\n  margin-bottom: 12px;\n  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.10);\n}\n.called-card-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 8px;\n}\n.vitals-inline-form[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  margin-bottom: 8px;\n}\n.vitals-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  margin-top: 4px;\n}\n.voucher-box[_ngcontent-%COMP%] {\n  background: #e8f5e9;\n  border: 1px solid #a5d6a7;\n  border-radius: 12px;\n  padding: 24px;\n  max-width: 520px;\n}\n.voucher-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 16px;\n}\n.voucher-header[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 40px;\n  width: 40px;\n  height: 40px;\n  color: #2e7d32;\n}\n.voucher-code[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  font-weight: 800;\n  letter-spacing: 6px;\n  color: #1b5e20;\n  text-align: center;\n  background: white;\n  padding: 12px;\n  border-radius: 8px;\n  margin: 12px 0;\n}\n.voucher-details[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  font-size: 0.92rem;\n  margin-bottom: 12px;\n}\n.voucher-instruction[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: #1565c0;\n  font-size: 0.9rem;\n  background: #e3f2fd;\n  padding: 10px 14px;\n  border-radius: 8px;\n}\n.new-patient-notice[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  background: #fff3e0;\n  padding: 14px;\n  border-radius: 8px;\n  color: #e65100;\n  margin-top: 16px;\n}\n/*# sourceMappingURL=health-staff.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HealthStaffComponent, { className: "HealthStaffComponent", filePath: "src\\app\\modules\\health-staff\\health-staff.component.ts", lineNumber: 549 });
})();
export {
  HealthStaffComponent
};
//# sourceMappingURL=chunk-RSTO2VDT.js.map
