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
  ClinicService,
  TicketService,
  VitalSignsService
} from "./chunk-VSICXZFN.js";
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
  NgForOf,
  NgIf,
  __spreadValues,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
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
  ɵɵpureFunction0,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-XHW7K2DC.js";

// src/app/modules/health-staff/health-staff.component.ts
var _c0 = () => ({ standalone: true });
function HealthStaffComponent_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 55);
    \u0275\u0275text(1, "person_add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Recepci\xF3n de Pacientes ");
  }
}
function HealthStaffComponent_mat_spinner_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 56);
  }
}
function HealthStaffComponent_mat_icon_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "search");
    \u0275\u0275elementEnd();
  }
}
function HealthStaffComponent_div_36_Template(rf, ctx) {
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
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("", ctx_r1.existingPatient.firstName, " ", ctx_r1.existingPatient.lastName, "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", ctx_r1.existingPatient.patientCode, " \xB7 ", ctx_r1.existingPatient.phone, "");
  }
}
function HealthStaffComponent_mat_form_field_66_mat_option_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 51);
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
function HealthStaffComponent_mat_form_field_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-form-field", 22)(1, "mat-label");
    \u0275\u0275text(2, "Seguro M\xE9dico");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "mat-select", 59)(4, "mat-option", 51);
    \u0275\u0275text(5, "Sin seguro");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, HealthStaffComponent_mat_form_field_66_mat_option_6_Template, 2, 2, "mat-option", 34);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("value", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.insurances);
  }
}
function HealthStaffComponent_mat_option_83_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 51);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r4 = ctx.$implicit;
    \u0275\u0275property("value", c_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r4.name);
  }
}
function HealthStaffComponent_mat_spinner_127_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 56);
  }
}
function HealthStaffComponent_mat_icon_128_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "confirmation_number");
    \u0275\u0275elementEnd();
  }
}
function HealthStaffComponent_div_130_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 60)(1, "mat-icon");
    \u0275\u0275text(2, "key");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "strong");
    \u0275\u0275text(5, "Credenciales de acceso al portal generadas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "El turno fue registrado. Comunique estas credenciales al paciente. Deber\xE1 cambiar la contrase\xF1a en su primer inicio de sesi\xF3n.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 61)(9, "span");
    \u0275\u0275text(10, "Usuario:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "code");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 61)(14, "span");
    \u0275\u0275text(15, "Contrase\xF1a temporal:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "code");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate(ctx_r1.newPatientCredentials.username);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.newPatientCredentials.tempPassword);
  }
}
function HealthStaffComponent_ng_template_132_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 63);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.calledTickets.length);
  }
}
function HealthStaffComponent_ng_template_132_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 55);
    \u0275\u0275text(1, "monitor_heart");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Signos Vitales ");
    \u0275\u0275template(3, HealthStaffComponent_ng_template_132_span_3_Template, 2, 1, "span", 62);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.calledTickets.length > 0);
  }
}
function HealthStaffComponent_div_136_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 64)(1, "mat-icon");
    \u0275\u0275text(2, "health_and_safety");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "No hay pacientes pendientes de signos vitales");
    \u0275\u0275elementEnd()();
  }
}
function HealthStaffComponent_div_137_ng_container_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "form", 73)(2, "mat-form-field", 22)(3, "mat-label");
    \u0275\u0275text(4, "Presi\xF3n Arterial");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "mat-icon", 13);
    \u0275\u0275text(6, "favorite");
    \u0275\u0275elementEnd();
    \u0275\u0275element(7, "input", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "mat-form-field", 22)(9, "mat-label");
    \u0275\u0275text(10, "Frec. Card\xEDaca (bpm)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "input", 74);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "mat-form-field", 22)(13, "mat-label");
    \u0275\u0275text(14, "Temperatura (\xB0C)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(15, "input", 75);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "mat-form-field", 22)(17, "mat-label");
    \u0275\u0275text(18, "Peso (kg)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(19, "input", 76);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "mat-form-field", 22)(21, "mat-label");
    \u0275\u0275text(22, "Talla (cm)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(23, "input", 77);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "mat-form-field", 22)(25, "mat-label");
    \u0275\u0275text(26, "Saturaci\xF3n O\u2082 (%)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(27, "input", 78);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 79)(29, "button", 16);
    \u0275\u0275listener("click", function HealthStaffComponent_div_137_ng_container_11_Template_button_click_29_listener() {
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
    \u0275\u0275elementStart(33, "button", 80);
    \u0275\u0275listener("click", function HealthStaffComponent_div_137_ng_container_11_Template_button_click_33_listener() {
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
function HealthStaffComponent_div_137_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 81);
    \u0275\u0275listener("click", function HealthStaffComponent_div_137_ng_template_12_Template_button_click_0_listener() {
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
function HealthStaffComponent_div_137_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 65)(1, "div", 66)(2, "div", 67);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 68)(5, "div", 69);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 70);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "span", 71);
    \u0275\u0275text(10, "Llamado por m\xE9dico");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(11, HealthStaffComponent_div_137_ng_container_11_Template, 35, 3, "ng-container", 72)(12, HealthStaffComponent_div_137_ng_template_12_Template, 4, 0, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
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
function HealthStaffComponent_ng_template_139_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 55);
    \u0275\u0275text(1, "queue");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Cola del D\xEDa (", ctx_r1.tickets.length, ") ");
  }
}
function HealthStaffComponent_mat_option_148_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 51);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r10 = ctx.$implicit;
    \u0275\u0275property("value", c_r10.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r10.name);
  }
}
function HealthStaffComponent_div_149_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 82)(1, "div", 67);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 68)(4, "div", 69);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 70);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "span", 83);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r11 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r11.ticketNumber);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(t_r11.patientName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", t_r11.clinicName, " \xB7 ", t_r11.type, "");
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getStatusClass(t_r11.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.statusLabel(t_r11.status), " ");
  }
}
function HealthStaffComponent_div_150_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 64)(1, "mat-icon");
    \u0275\u0275text(2, "queue");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "No hay pacientes en cola");
    \u0275\u0275elementEnd()();
  }
}
var HealthStaffComponent = class _HealthStaffComponent {
  constructor(fb, patientService, clinicService, ticketService, vitalSignsService, insuranceService, notification) {
    this.fb = fb;
    this.patientService = patientService;
    this.clinicService = clinicService;
    this.ticketService = ticketService;
    this.vitalSignsService = vitalSignsService;
    this.insuranceService = insuranceService;
    this.notification = notification;
    this.clinics = [];
    this.insurances = [];
    this.tickets = [];
    this.filteredTickets = [];
    this.filterClinicId = 0;
    this.existingPatient = null;
    this.searching = false;
    this.submitting = false;
    this.newPatientCredentials = null;
    this.calledTickets = [];
    this.activeVitalsTicketId = null;
    this.vitalsFormMap = {};
    this.sendingVitals = false;
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
      type: ["CONSULTA"],
      bloodPressure: [""],
      heartRate: [""],
      temperature: [""],
      weight: [""],
      height: [""],
      oxygenSaturation: [""]
    });
    this.clinicService.getAll().subscribe((res) => {
      if (res.success)
        this.clinics = res.data;
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
  submitAll(stepper) {
    this.submitting = true;
    const createTicketAndVitalSigns = (patientId) => {
      const tv = this.ticketForm.value;
      this.ticketService.create({
        patientId,
        clinicId: tv.clinicId,
        type: tv.type,
        notes: ""
      }).subscribe({
        next: (ticketRes) => {
          if (ticketRes.success) {
            const ticketId = ticketRes.data.id;
            const hasVitals = tv.bloodPressure || tv.heartRate || tv.temperature || tv.weight;
            if (hasVitals) {
              this.vitalSignsService.register({
                ticketId,
                patientId,
                bloodPressure: tv.bloodPressure,
                heartRate: tv.heartRate ? +tv.heartRate : null,
                temperature: tv.temperature ? +tv.temperature : null,
                weight: tv.weight ? +tv.weight : null,
                height: tv.height ? +tv.height : null,
                oxygenSaturation: tv.oxygenSaturation ? +tv.oxygenSaturation : null
              }).subscribe({ error: () => {
              } });
            }
            this.notification.success(`Turno ${ticketRes.data.ticketNumber} generado para ${ticketRes.data.patientName}`);
            stepper.reset();
            this.existingPatient = null;
            this.loadTickets();
          }
          this.submitting = false;
        },
        error: () => {
          this.notification.error("Error al generar turno");
          this.submitting = false;
        }
      });
    };
    if (this.existingPatient) {
      this.newPatientCredentials = null;
      createTicketAndVitalSigns(this.existingPatient.id);
    } else {
      const data = __spreadValues(__spreadValues({}, this.dpiForm.value), this.patientForm.value);
      this.patientService.create(data).subscribe({
        next: (res) => {
          if (res.success) {
            if (res.data.tempPassword) {
              this.newPatientCredentials = {
                username: res.data.username ?? data.dpi,
                tempPassword: res.data.tempPassword
              };
            } else {
              this.newPatientCredentials = null;
            }
            createTicketAndVitalSigns(res.data.id);
          } else {
            this.notification.error(res.message || "Error al registrar paciente");
            this.submitting = false;
          }
        },
        error: (err) => {
          const msg = err.error?.message || err.message || "Error al registrar paciente";
          this.notification.error(msg);
          this.submitting = false;
        }
      });
    }
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
  static {
    this.\u0275fac = function HealthStaffComponent_Factory(t) {
      return new (t || _HealthStaffComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(PatientService), \u0275\u0275directiveInject(ClinicService), \u0275\u0275directiveInject(TicketService), \u0275\u0275directiveInject(VitalSignsService), \u0275\u0275directiveInject(InsuranceService), \u0275\u0275directiveInject(NotificationService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HealthStaffComponent, selectors: [["app-health-staff"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 156, vars: 36, consts: [["stepper", ""], ["showBtn", ""], [1, "page-container"], [1, "page-header"], [2, "vertical-align", "middle", "margin-right", "8px"], ["animationDuration", "200ms"], ["mat-tab-label", ""], [1, "tab-content"], [3, "linear"], ["label", "Identificaci\xF3n", 3, "stepControl"], [3, "formGroup"], [1, "hint-text"], ["appearance", "outline", 1, "wide"], ["matPrefix", ""], ["matInput", "", "formControlName", "dpi", "placeholder", "0000000000000", "maxlength", "13"], [1, "step-actions"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], ["diameter", "20", 4, "ngIf"], [4, "ngIf"], ["class", "found-box", 4, "ngIf"], ["label", "Datos del Paciente", 3, "stepControl"], [1, "form-grid"], ["appearance", "outline"], ["matInput", "", "formControlName", "firstName", 3, "readonly"], ["matInput", "", "formControlName", "lastName", 3, "readonly"], ["matInput", "", "formControlName", "phone", 3, "readonly"], ["matInput", "", "formControlName", "email", 3, "readonly"], ["matInput", "", "formControlName", "address", 3, "readonly"], ["matInput", "", "formControlName", "emergencyContact", 3, "readonly"], ["appearance", "outline", 4, "ngIf"], ["mat-button", "", "matStepperPrevious", ""], ["mat-raised-button", "", "color", "primary", "matStepperNext", "", 3, "disabled"], ["label", "Turno y Signos Vitales", 3, "stepControl"], ["formControlName", "clinicId"], [3, "value", 4, "ngFor", "ngForOf"], ["formControlName", "type"], ["value", "CONSULTA"], ["value", "CONTROL"], ["value", "EMERGENCIA"], [1, "section-subtitle"], ["matInput", "", "formControlName", "bloodPressure", "placeholder", "120/80"], ["matInput", "", "formControlName", "heartRate", "type", "number"], ["matInput", "", "formControlName", "temperature", "type", "number", "step", "0.1"], ["matInput", "", "formControlName", "weight", "type", "number", "step", "0.1"], ["matInput", "", "formControlName", "height", "type", "number"], ["matInput", "", "formControlName", "oxygenSaturation", "type", "number"], ["class", "credentials-box", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "called-card", 4, "ngFor", "ngForOf"], [1, "queue-filters"], [3, "ngModelChange", "selectionChange", "ngModel", "ngModelOptions"], [3, "value"], ["class", "ticket-row", 4, "ngFor", "ngForOf"], [1, "reload-btn"], ["mat-stroked-button", "", "color", "primary", 3, "click"], [1, "tab-icon"], ["diameter", "20"], [1, "found-box"], ["mat-raised-button", "", "color", "accent", "matStepperNext", ""], ["formControlName", "insuranceId"], [1, "credentials-box"], [1, "cred-row"], ["class", "tab-badge", 4, "ngIf"], [1, "tab-badge"], [1, "empty-state"], [1, "called-card"], [1, "called-card-header"], [1, "ticket-number"], [1, "ticket-info"], [1, "ticket-patient"], [1, "ticket-meta"], [1, "status-chip", "status-being-called"], [4, "ngIf", "ngIfElse"], [1, "form-grid", "vitals-inline-form", 3, "formGroup"], ["matInput", "", "type", "number", "formControlName", "heartRate"], ["matInput", "", "type", "number", "formControlName", "temperature", "step", "0.1"], ["matInput", "", "type", "number", "formControlName", "weight", "step", "0.1"], ["matInput", "", "type", "number", "formControlName", "height"], ["matInput", "", "type", "number", "formControlName", "oxygenSaturation"], [1, "vitals-actions"], ["mat-button", "", 3, "click"], ["mat-stroked-button", "", "color", "primary", 2, "margin-top", "12px", 3, "click"], [1, "ticket-row"], [1, "status-chip"]], template: function HealthStaffComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "h1")(3, "mat-icon", 4);
        \u0275\u0275text(4, "health_and_safety");
        \u0275\u0275elementEnd();
        \u0275\u0275text(5, "Personal de Salud");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "mat-tab-group", 5)(7, "mat-tab");
        \u0275\u0275template(8, HealthStaffComponent_ng_template_8_Template, 3, 0, "ng-template", 6);
        \u0275\u0275elementStart(9, "div", 7)(10, "mat-card")(11, "mat-card-header")(12, "mat-card-title");
        \u0275\u0275text(13, "Registrar Paciente y Asignar Turno");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(14, "mat-card-content")(15, "mat-stepper", 8, 0)(17, "mat-step", 9)(18, "form", 10)(19, "h3");
        \u0275\u0275text(20, "Identificar por DPI");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "p", 11);
        \u0275\u0275text(22, "Ingrese el DPI del paciente para buscar su registro o crear uno nuevo.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "mat-form-field", 12)(24, "mat-label");
        \u0275\u0275text(25, "DPI del Paciente (13 d\xEDgitos)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "mat-icon", 13);
        \u0275\u0275text(27, "badge");
        \u0275\u0275elementEnd();
        \u0275\u0275element(28, "input", 14);
        \u0275\u0275elementStart(29, "mat-error");
        \u0275\u0275text(30, "El DPI debe tener exactamente 13 d\xEDgitos");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(31, "div", 15)(32, "button", 16);
        \u0275\u0275listener("click", function HealthStaffComponent_Template_button_click_32_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.searchByDpi());
        });
        \u0275\u0275template(33, HealthStaffComponent_mat_spinner_33_Template, 1, 0, "mat-spinner", 17)(34, HealthStaffComponent_mat_icon_34_Template, 2, 0, "mat-icon", 18);
        \u0275\u0275text(35);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(36, HealthStaffComponent_div_36_Template, 11, 4, "div", 19);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(37, "mat-step", 20)(38, "form", 10)(39, "h3");
        \u0275\u0275text(40);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(41, "div", 21)(42, "mat-form-field", 22)(43, "mat-label");
        \u0275\u0275text(44, "Nombres *");
        \u0275\u0275elementEnd();
        \u0275\u0275element(45, "input", 23);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(46, "mat-form-field", 22)(47, "mat-label");
        \u0275\u0275text(48, "Apellidos *");
        \u0275\u0275elementEnd();
        \u0275\u0275element(49, "input", 24);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(50, "mat-form-field", 22)(51, "mat-label");
        \u0275\u0275text(52, "Tel\xE9fono");
        \u0275\u0275elementEnd();
        \u0275\u0275element(53, "input", 25);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(54, "mat-form-field", 22)(55, "mat-label");
        \u0275\u0275text(56, "Correo Electr\xF3nico");
        \u0275\u0275elementEnd();
        \u0275\u0275element(57, "input", 26);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(58, "mat-form-field", 22)(59, "mat-label");
        \u0275\u0275text(60, "Direcci\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275element(61, "input", 27);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(62, "mat-form-field", 22)(63, "mat-label");
        \u0275\u0275text(64, "Contacto de Emergencia");
        \u0275\u0275elementEnd();
        \u0275\u0275element(65, "input", 28);
        \u0275\u0275elementEnd();
        \u0275\u0275template(66, HealthStaffComponent_mat_form_field_66_Template, 7, 2, "mat-form-field", 29);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(67, "div", 15)(68, "button", 30);
        \u0275\u0275text(69, "\u2190 Anterior");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(70, "button", 31);
        \u0275\u0275text(71, " Continuar \u2192 ");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(72, "mat-step", 32)(73, "form", 10)(74, "h3");
        \u0275\u0275text(75, "Asignar Turno y Registrar Signos Vitales");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(76, "div", 21)(77, "mat-form-field", 12)(78, "mat-label");
        \u0275\u0275text(79, "Cl\xEDnica de Destino *");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(80, "mat-icon", 13);
        \u0275\u0275text(81, "local_hospital");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(82, "mat-select", 33);
        \u0275\u0275template(83, HealthStaffComponent_mat_option_83_Template, 2, 2, "mat-option", 34);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(84, "mat-form-field", 12)(85, "mat-label");
        \u0275\u0275text(86, "Tipo de Consulta");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(87, "mat-select", 35)(88, "mat-option", 36);
        \u0275\u0275text(89, "Consulta General");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(90, "mat-option", 37);
        \u0275\u0275text(91, "Control");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(92, "mat-option", 38);
        \u0275\u0275text(93, "Emergencia");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(94, "h4", 39);
        \u0275\u0275text(95, "Signos Vitales (Opcional)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(96, "div", 21)(97, "mat-form-field", 22)(98, "mat-label");
        \u0275\u0275text(99, "Presi\xF3n Arterial");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(100, "mat-icon", 13);
        \u0275\u0275text(101, "favorite");
        \u0275\u0275elementEnd();
        \u0275\u0275element(102, "input", 40);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(103, "mat-form-field", 22)(104, "mat-label");
        \u0275\u0275text(105, "Frecuencia Card\xEDaca (bpm)");
        \u0275\u0275elementEnd();
        \u0275\u0275element(106, "input", 41);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(107, "mat-form-field", 22)(108, "mat-label");
        \u0275\u0275text(109, "Temperatura (\xB0C)");
        \u0275\u0275elementEnd();
        \u0275\u0275element(110, "input", 42);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(111, "mat-form-field", 22)(112, "mat-label");
        \u0275\u0275text(113, "Peso (kg)");
        \u0275\u0275elementEnd();
        \u0275\u0275element(114, "input", 43);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(115, "mat-form-field", 22)(116, "mat-label");
        \u0275\u0275text(117, "Talla (cm)");
        \u0275\u0275elementEnd();
        \u0275\u0275element(118, "input", 44);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(119, "mat-form-field", 22)(120, "mat-label");
        \u0275\u0275text(121, "Saturaci\xF3n O\u2082 (%)");
        \u0275\u0275elementEnd();
        \u0275\u0275element(122, "input", 45);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(123, "div", 15)(124, "button", 30);
        \u0275\u0275text(125, "\u2190 Anterior");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(126, "button", 16);
        \u0275\u0275listener("click", function HealthStaffComponent_Template_button_click_126_listener() {
          \u0275\u0275restoreView(_r1);
          const stepper_r5 = \u0275\u0275reference(16);
          return \u0275\u0275resetView(ctx.submitAll(stepper_r5));
        });
        \u0275\u0275template(127, HealthStaffComponent_mat_spinner_127_Template, 1, 0, "mat-spinner", 17)(128, HealthStaffComponent_mat_icon_128_Template, 2, 0, "mat-icon", 18);
        \u0275\u0275text(129);
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275template(130, HealthStaffComponent_div_130_Template, 18, 2, "div", 46);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(131, "mat-tab");
        \u0275\u0275template(132, HealthStaffComponent_ng_template_132_Template, 4, 1, "ng-template", 6);
        \u0275\u0275elementStart(133, "div", 7)(134, "p", 11);
        \u0275\u0275text(135, "Pacientes llamados por el m\xE9dico que deben pasar por el \xE1rea de signos vitales antes de la consulta.");
        \u0275\u0275elementEnd();
        \u0275\u0275template(136, HealthStaffComponent_div_136_Template, 5, 0, "div", 47)(137, HealthStaffComponent_div_137_Template, 14, 6, "div", 48);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(138, "mat-tab");
        \u0275\u0275template(139, HealthStaffComponent_ng_template_139_Template, 3, 1, "ng-template", 6);
        \u0275\u0275elementStart(140, "div", 7)(141, "div", 49)(142, "mat-form-field", 22)(143, "mat-label");
        \u0275\u0275text(144, "Filtrar por cl\xEDnica");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(145, "mat-select", 50);
        \u0275\u0275twoWayListener("ngModelChange", function HealthStaffComponent_Template_mat_select_ngModelChange_145_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.filterClinicId, $event) || (ctx.filterClinicId = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275listener("selectionChange", function HealthStaffComponent_Template_mat_select_selectionChange_145_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.filterTickets());
        });
        \u0275\u0275elementStart(146, "mat-option", 51);
        \u0275\u0275text(147, "Todas las cl\xEDnicas");
        \u0275\u0275elementEnd();
        \u0275\u0275template(148, HealthStaffComponent_mat_option_148_Template, 2, 2, "mat-option", 34);
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(149, HealthStaffComponent_div_149_Template, 10, 7, "div", 52)(150, HealthStaffComponent_div_150_Template, 5, 0, "div", 47);
        \u0275\u0275elementStart(151, "div", 53)(152, "button", 54);
        \u0275\u0275listener("click", function HealthStaffComponent_Template_button_click_152_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.loadTickets());
        });
        \u0275\u0275elementStart(153, "mat-icon");
        \u0275\u0275text(154, "refresh");
        \u0275\u0275elementEnd();
        \u0275\u0275text(155, " Actualizar Cola ");
        \u0275\u0275elementEnd()()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(15);
        \u0275\u0275property("linear", true);
        \u0275\u0275advance(2);
        \u0275\u0275property("stepControl", ctx.dpiForm);
        \u0275\u0275advance();
        \u0275\u0275property("formGroup", ctx.dpiForm);
        \u0275\u0275advance(14);
        \u0275\u0275property("disabled", ctx.dpiForm.invalid || ctx.searching);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.searching);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.searching);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.searching ? "Buscando..." : "Buscar", " ");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.existingPatient);
        \u0275\u0275advance();
        \u0275\u0275property("stepControl", ctx.patientForm);
        \u0275\u0275advance();
        \u0275\u0275property("formGroup", ctx.patientForm);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.existingPatient ? "Paciente Registrado" : "Nuevo Paciente");
        \u0275\u0275advance(5);
        \u0275\u0275property("readonly", !!ctx.existingPatient);
        \u0275\u0275advance(4);
        \u0275\u0275property("readonly", !!ctx.existingPatient);
        \u0275\u0275advance(4);
        \u0275\u0275property("readonly", !!ctx.existingPatient);
        \u0275\u0275advance(4);
        \u0275\u0275property("readonly", !!ctx.existingPatient);
        \u0275\u0275advance(4);
        \u0275\u0275property("readonly", !!ctx.existingPatient);
        \u0275\u0275advance(4);
        \u0275\u0275property("readonly", !!ctx.existingPatient);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.existingPatient);
        \u0275\u0275advance(4);
        \u0275\u0275property("disabled", ctx.patientForm.invalid && !ctx.existingPatient);
        \u0275\u0275advance(2);
        \u0275\u0275property("stepControl", ctx.ticketForm);
        \u0275\u0275advance();
        \u0275\u0275property("formGroup", ctx.ticketForm);
        \u0275\u0275advance(10);
        \u0275\u0275property("ngForOf", ctx.clinics);
        \u0275\u0275advance(43);
        \u0275\u0275property("disabled", ctx.ticketForm.invalid || ctx.submitting);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.submitting);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.submitting);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.submitting ? "Registrando..." : "Generar Turno", " ");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.newPatientCredentials);
        \u0275\u0275advance(6);
        \u0275\u0275property("ngIf", ctx.calledTickets.length === 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngForOf", ctx.calledTickets);
        \u0275\u0275advance(8);
        \u0275\u0275twoWayProperty("ngModel", ctx.filterClinicId);
        \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(35, _c0));
        \u0275\u0275advance();
        \u0275\u0275property("value", 0);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.clinics);
        \u0275\u0275advance();
        \u0275\u0275property("ngForOf", ctx.filteredTickets);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.filteredTickets.length === 0);
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
      NgModel,
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
    ], styles: ["\n\n.tab-content[_ngcontent-%COMP%] {\n  padding: 24px 0;\n}\n.tab-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  margin-right: 6px;\n  vertical-align: middle;\n}\nh3[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 500;\n  color: #1D6C61;\n  margin-bottom: 16px;\n}\nh4.section-subtitle[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  font-weight: 500;\n  color: #555;\n  margin: 16px 0 8px;\n  border-top: 1px solid #e0e0e0;\n  padding-top: 12px;\n}\n.hint-text[_ngcontent-%COMP%] {\n  color: #757575;\n  font-size: 0.85rem;\n  margin-bottom: 16px;\n}\n.wide[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 12px;\n  margin-bottom: 8px;\n}\n.step-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  margin-top: 16px;\n}\n.found-box[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  background: #e8f5e9;\n  padding: 16px;\n  border-radius: 8px;\n  color: #2e7d32;\n  margin-top: 16px;\n}\n.found-box[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 32px;\n  width: 32px;\n  height: 32px;\n}\n.queue-filters[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.ticket-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 12px 16px;\n  background: white;\n  border-radius: 8px;\n  margin-bottom: 8px;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);\n}\n.ticket-number[_ngcontent-%COMP%] {\n  font-size: 1.4rem;\n  font-weight: 700;\n  color: #1D6C61;\n  min-width: 80px;\n}\n.ticket-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.ticket-patient[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n.ticket-meta[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #757575;\n}\n.status-chip[_ngcontent-%COMP%] {\n  padding: 4px 12px;\n  border-radius: 12px;\n  font-size: 0.8rem;\n  font-weight: 500;\n}\n.credentials-box[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 16px;\n  background: #fff8e1;\n  border: 1px solid #ffe082;\n  border-radius: 8px;\n  padding: 16px 20px;\n  margin: 12px 0;\n}\n.credentials-box[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n  width: 28px;\n  height: 28px;\n  color: #f57f17;\n  flex-shrink: 0;\n  margin-top: 4px;\n}\n.credentials-box[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #e65100;\n  font-size: 0.95rem;\n}\n.credentials-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #555;\n  font-size: 0.82rem;\n  margin: 4px 0 10px;\n}\n.cred-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 0.9rem;\n  margin-bottom: 4px;\n}\n.cred-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #757575;\n  min-width: 140px;\n}\n.cred-row[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  background: #fff3e0;\n  padding: 2px 8px;\n  border-radius: 4px;\n  font-size: 1rem;\n  font-weight: 700;\n  letter-spacing: 0.5px;\n  color: #e65100;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 48px;\n  color: #9e9e9e;\n}\n.empty-state[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  color: #3EB9A8;\n  opacity: 0.5;\n  margin-bottom: 8px;\n}\n.reload-btn[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 24px;\n}\n.status-waiting[_ngcontent-%COMP%] {\n  background: #e3f2fd;\n  color: #1565c0;\n}\n.status-being-called[_ngcontent-%COMP%] {\n  background: #fff3e0;\n  color: #e65100;\n}\n.status-in-consultation[_ngcontent-%COMP%] {\n  background: #e8f5e9;\n  color: #2e7d32;\n}\n.status-completed[_ngcontent-%COMP%] {\n  background: #f5f5f5;\n  color: #616161;\n}\n.status-absent[_ngcontent-%COMP%] {\n  background: #ffebee;\n  color: #c62828;\n}\n.tab-badge[_ngcontent-%COMP%] {\n  background: #e53935;\n  color: white;\n  border-radius: 10px;\n  padding: 1px 7px;\n  font-size: 0.72rem;\n  font-weight: 700;\n  margin-left: 6px;\n}\n.called-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 10px;\n  padding: 16px 20px;\n  margin-bottom: 12px;\n  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.10);\n}\n.called-card-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 8px;\n}\n.vitals-inline-form[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  margin-bottom: 8px;\n}\n.vitals-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  margin-top: 4px;\n}\n/*# sourceMappingURL=health-staff.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HealthStaffComponent, { className: "HealthStaffComponent", filePath: "src\\app\\modules\\health-staff\\health-staff.component.ts", lineNumber: 386 });
})();
export {
  HealthStaffComponent
};
//# sourceMappingURL=chunk-LZ2O7SBS.js.map
