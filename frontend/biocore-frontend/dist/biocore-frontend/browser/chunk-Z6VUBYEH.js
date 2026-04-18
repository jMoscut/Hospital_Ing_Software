import {
  SAMPLE_TYPE_LABELS
} from "./chunk-3ZPA2CFB.js";
import {
  AuthService
} from "./chunk-O6PUWTRR.js";
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
  LabService,
  PrescriptionService
} from "./chunk-6SNY3ZGW.js";
import {
  MatTab,
  MatTabGroup,
  MatTabLabel,
  MatTabsModule
} from "./chunk-IFA7BXQN.js";
import {
  MatChipsModule
} from "./chunk-PA55PL57.js";
import {
  AppointmentService,
  ClinicService,
  TicketService
} from "./chunk-ELYEA2RZ.js";
import {
  PatientService
} from "./chunk-SM4IRFQU.js";
import "./chunk-MHA7Y7AJ.js";
import {
  MatFormField,
  MatFormFieldModule,
  MatHint,
  MatLabel
} from "./chunk-QEMZUU6G.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  NgControlStatus,
  NgModel
} from "./chunk-2J4O7HWV.js";
import "./chunk-EURQNLKS.js";
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
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
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
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

// src/app/modules/mis-citas/mis-citas.component.ts
function MisCitasComponent_ng_template_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 14);
    \u0275\u0275text(1, "event_available");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Agendar Cita ");
  }
}
function MisCitasComponent_ng_container_15_mat_option_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r3 = ctx.$implicit;
    \u0275\u0275property("value", c_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r3.name);
  }
}
function MisCitasComponent_ng_container_15_div_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const d_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(d_r4);
  }
}
function MisCitasComponent_ng_container_15_ng_container_35_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 35);
  }
}
function MisCitasComponent_ng_container_15_ng_container_35_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 36);
    \u0275\u0275listener("click", function MisCitasComponent_ng_container_15_ng_container_35_div_2_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const day_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(!ctx_r1.isPastDay(day_r6) && ctx_r1.selectDate(day_r6));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const day_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r1.getDayClass(day_r6));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", day_r6.getDate(), " ");
  }
}
function MisCitasComponent_ng_container_15_ng_container_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, MisCitasComponent_ng_container_15_ng_container_35_div_1_Template, 1, 0, "div", 33)(2, MisCitasComponent_ng_container_15_ng_container_35_div_2_Template, 2, 3, "div", 34);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const day_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !day_r6);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", day_r6);
  }
}
function MisCitasComponent_ng_container_15_ng_container_36_mat_spinner_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 40);
  }
}
function MisCitasComponent_ng_container_15_ng_container_36_div_6_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 44);
    \u0275\u0275listener("click", function MisCitasComponent_ng_container_15_ng_container_36_div_6_button_1_Template_button_click_0_listener() {
      const slot_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.selectSlot(slot_r8));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const slot_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275classMap("slot-btn" + (ctx_r1.selectedSlot === slot_r8 ? " selected" : ""));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", slot_r8, " ");
  }
}
function MisCitasComponent_ng_container_15_ng_container_36_div_6_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45)(1, "mat-icon");
    \u0275\u0275text(2, "event_busy");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " No hay horarios disponibles para este d\xEDa ");
    \u0275\u0275elementEnd();
  }
}
function MisCitasComponent_ng_container_15_ng_container_36_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41);
    \u0275\u0275template(1, MisCitasComponent_ng_container_15_ng_container_36_div_6_button_1_Template, 2, 3, "button", 42)(2, MisCitasComponent_ng_container_15_ng_container_36_div_6_div_2_Template, 4, 0, "div", 43);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.availableSlots);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.availableSlots.length === 0);
  }
}
function MisCitasComponent_ng_container_15_ng_container_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 37)(2, "mat-icon");
    \u0275\u0275text(3, "access_time");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275template(5, MisCitasComponent_ng_container_15_ng_container_36_mat_spinner_5_Template, 1, 0, "mat-spinner", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, MisCitasComponent_ng_container_15_ng_container_36_div_6_Template, 3, 2, "div", 39);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" Horarios \u2014 ", ctx_r1.formatDate(ctx_r1.selectedDate), " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.loadingSlots);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.loadingSlots);
  }
}
function MisCitasComponent_ng_container_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "mat-card", 15)(2, "mat-card-header")(3, "mat-icon", 16);
    \u0275\u0275text(4, "calendar_month");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "mat-card-title");
    \u0275\u0275text(6, "Seleccionar fecha y horario");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "mat-card-subtitle");
    \u0275\u0275text(8, "Citas disponibles todos los d\xEDas de 8:00 a 18:00");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "mat-card-content")(10, "div", 17)(11, "mat-form-field", 18)(12, "mat-label");
    \u0275\u0275text(13, "Tipo de servicio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "mat-select", 19);
    \u0275\u0275twoWayListener("ngModelChange", function MisCitasComponent_ng_container_15_Template_mat_select_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.selectedType, $event) || (ctx_r1.selectedType = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(15, "mat-option", 20);
    \u0275\u0275text(16, "Consulta M\xE9dica");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "mat-option", 21);
    \u0275\u0275text(18, "Laboratorio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "mat-option", 22);
    \u0275\u0275text(20, "Control / Seguimiento");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "mat-form-field", 18)(22, "mat-label");
    \u0275\u0275text(23, "Cl\xEDnica / \xC1rea");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "mat-select", 19);
    \u0275\u0275twoWayListener("ngModelChange", function MisCitasComponent_ng_container_15_Template_mat_select_ngModelChange_24_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.selectedClinicId, $event) || (ctx_r1.selectedClinicId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function MisCitasComponent_ng_container_15_Template_mat_select_ngModelChange_24_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onClinicChange($event));
    });
    \u0275\u0275template(25, MisCitasComponent_ng_container_15_mat_option_25_Template, 2, 2, "mat-option", 23);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "div", 24)(27, "button", 25);
    \u0275\u0275listener("click", function MisCitasComponent_ng_container_15_Template_button_click_27_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.prevMonth());
    });
    \u0275\u0275text(28, "\u2039");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "span", 26);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "button", 25);
    \u0275\u0275listener("click", function MisCitasComponent_ng_container_15_Template_button_click_31_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.nextMonth());
    });
    \u0275\u0275text(32, "\u203A");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div", 27);
    \u0275\u0275template(34, MisCitasComponent_ng_container_15_div_34_Template, 2, 1, "div", 28)(35, MisCitasComponent_ng_container_15_ng_container_35_Template, 3, 2, "ng-container", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275template(36, MisCitasComponent_ng_container_15_ng_container_36_Template, 7, 3, "ng-container", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "mat-card-actions")(38, "button", 30);
    \u0275\u0275listener("click", function MisCitasComponent_ng_container_15_Template_button_click_38_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goToPayment());
    });
    \u0275\u0275elementStart(39, "mat-icon");
    \u0275\u0275text(40, "payment");
    \u0275\u0275elementEnd();
    \u0275\u0275text(41, " Continuar al pago ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(14);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.selectedType);
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.selectedClinicId);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.bookingClinics);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.monthLabel);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r1.weekDays);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.calendarDays);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.selectedDate);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.selectedDate || !ctx_r1.selectedSlot || !ctx_r1.selectedClinicId);
  }
}
function MisCitasComponent_ng_container_16_div_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 61)(1, "mat-icon");
    \u0275\u0275text(2, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.paymentError, " ");
  }
}
function MisCitasComponent_ng_container_16_div_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 62);
    \u0275\u0275text(1, " Complete todos los campos de la tarjeta para proceder. ");
    \u0275\u0275elementEnd();
  }
}
function MisCitasComponent_ng_container_16_mat_spinner_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 63);
  }
}
function MisCitasComponent_ng_container_16_mat_icon_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "lock");
    \u0275\u0275elementEnd();
  }
}
function MisCitasComponent_ng_container_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "mat-card", 15)(2, "mat-card-header")(3, "mat-icon", 16);
    \u0275\u0275text(4, "payment");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "mat-card-title");
    \u0275\u0275text(6, "Pago en L\xEDnea");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "mat-card-subtitle");
    \u0275\u0275text(8, "La cita se confirma al completar el pago");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "mat-card-content")(10, "div", 46)(11, "div", 47)(12, "mat-icon");
    \u0275\u0275text(13, "event");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275text(15);
    \u0275\u0275elementStart(16, "strong");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div", 47)(19, "mat-icon");
    \u0275\u0275text(20, "local_hospital");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span");
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 48)(24, "mat-icon");
    \u0275\u0275text(25, "receipt");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "span");
    \u0275\u0275text(27, "Total: ");
    \u0275\u0275elementStart(28, "strong");
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(30, "div", 49)(31, "h4")(32, "mat-icon");
    \u0275\u0275text(33, "credit_card");
    \u0275\u0275elementEnd();
    \u0275\u0275text(34, " Datos de tarjeta");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "mat-form-field", 50)(36, "mat-label");
    \u0275\u0275text(37, "Nombre en la tarjeta *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "input", 51);
    \u0275\u0275twoWayListener("ngModelChange", function MisCitasComponent_ng_container_16_Template_input_ngModelChange_38_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.card.name, $event) || (ctx_r1.card.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "mat-form-field", 50)(40, "mat-label");
    \u0275\u0275text(41, "N\xFAmero de tarjeta *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "input", 52);
    \u0275\u0275twoWayListener("ngModelChange", function MisCitasComponent_ng_container_16_Template_input_ngModelChange_42_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.card.number, $event) || (ctx_r1.card.number = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function MisCitasComponent_ng_container_16_Template_input_input_42_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.formatCardNumber());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "mat-hint");
    \u0275\u0275text(44, "Ingrese los n\xFAmeros de su tarjeta");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "div", 53)(46, "mat-form-field", 18)(47, "mat-label");
    \u0275\u0275text(48, "Vencimiento *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "input", 54);
    \u0275\u0275twoWayListener("ngModelChange", function MisCitasComponent_ng_container_16_Template_input_ngModelChange_49_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.card.expiry, $event) || (ctx_r1.card.expiry = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(50, "mat-form-field", 18)(51, "mat-label");
    \u0275\u0275text(52, "CVV *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "input", 55);
    \u0275\u0275twoWayListener("ngModelChange", function MisCitasComponent_ng_container_16_Template_input_ngModelChange_53_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.card.cvv, $event) || (ctx_r1.card.cvv = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275template(54, MisCitasComponent_ng_container_16_div_54_Template, 4, 1, "div", 56)(55, MisCitasComponent_ng_container_16_div_55_Template, 2, 0, "div", 57);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "mat-card-actions", 58)(57, "button", 59);
    \u0275\u0275listener("click", function MisCitasComponent_ng_container_16_Template_button_click_57_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.bookingStep = "calendar");
    });
    \u0275\u0275text(58, " \u2190 Volver ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "button", 30);
    \u0275\u0275listener("click", function MisCitasComponent_ng_container_16_Template_button_click_59_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.pay());
    });
    \u0275\u0275template(60, MisCitasComponent_ng_container_16_mat_spinner_60_Template, 1, 0, "mat-spinner", 60)(61, MisCitasComponent_ng_container_16_mat_icon_61_Template, 2, 0, "mat-icon", 7);
    \u0275\u0275text(62);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(15);
    \u0275\u0275textInterpolate1("", ctx_r1.formatDate(ctx_r1.selectedDate), " a las ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.selectedSlot);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("", ctx_r1.getClinicName(ctx_r1.selectedClinicId), " \u2014 ", ctx_r1.typeLabel(ctx_r1.selectedType), "");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("Q ", ctx_r1.consultationFee, "");
    \u0275\u0275advance(9);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.card.name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.card.number);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.card.expiry);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.card.cvv);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.paymentError);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.cardValid());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.paying);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.cardValid() || ctx_r1.paying);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.paying);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.paying);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.paying ? "Procesando pago..." : "Pagar Q " + ctx_r1.consultationFee, " ");
  }
}
function MisCitasComponent_ng_container_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "mat-card", 64)(2, "mat-icon", 65);
    \u0275\u0275text(3, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2");
    \u0275\u0275text(5, "\xA1Cita Confirmada!");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "Su cita ha sido agendada y el pago procesado exitosamente.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 66)(9, "div", 47)(10, "mat-icon");
    \u0275\u0275text(11, "event");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span");
    \u0275\u0275text(13);
    \u0275\u0275elementStart(14, "strong");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "div", 47)(17, "mat-icon");
    \u0275\u0275text(18, "local_hospital");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span");
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 67)(22, "mat-icon");
    \u0275\u0275text(23, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span");
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "button", 68);
    \u0275\u0275listener("click", function MisCitasComponent_ng_container_17_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.resetBooking());
    });
    \u0275\u0275elementStart(27, "mat-icon");
    \u0275\u0275text(28, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(29, " Agendar otra cita ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275textInterpolate1("", ctx_r1.formatDate(ctx_r1.selectedDate), " a las ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.selectedSlot);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("", ctx_r1.getClinicName(ctx_r1.selectedClinicId), " \u2014 ", ctx_r1.typeLabel(ctx_r1.selectedType), "");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("El d\xEDa de su cita, su turno aparecer\xE1 autom\xE1ticamente en el sistema a las ", ctx_r1.selectedSlot, ". Pres\xE9ntese 10 minutos antes.");
  }
}
function MisCitasComponent_ng_template_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 14);
    \u0275\u0275text(1, "confirmation_number");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Mis Turnos (", ctx_r1.tickets.length, ") ");
  }
}
function MisCitasComponent_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 69);
    \u0275\u0275element(1, "mat-spinner", 70);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Cargando...");
    \u0275\u0275elementEnd()();
  }
}
function MisCitasComponent_div_22_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 79);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, t_r11.createdAt, "dd/MM/yyyy HH:mm"));
  }
}
function MisCitasComponent_div_22_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 80);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Dr. ", t_r11.doctorName, "");
  }
}
function MisCitasComponent_div_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 71)(1, "div", 72)(2, "div", 73);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "div", 74);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 75);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, MisCitasComponent_div_22_div_9_Template, 3, 4, "div", 76)(10, MisCitasComponent_div_22_div_10_Template, 2, 1, "div", 77);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "span", 78);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r11 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(t_r11.ticketNumber);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(t_r11.clinicName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r11.type);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", t_r11.createdAt);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", t_r11.doctorName);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getStatusClass(t_r11.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.statusLabel(t_r11.status));
  }
}
function MisCitasComponent_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 81)(1, "mat-icon");
    \u0275\u0275text(2, "event_available");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "No tienes turnos registrados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 82);
    \u0275\u0275text(6, 'Agenda tu cita desde la pesta\xF1a "Agendar Cita".');
    \u0275\u0275elementEnd()();
  }
}
function MisCitasComponent_ng_template_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 14);
    \u0275\u0275text(1, "receipt_long");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Mis Recetas (", ctx_r1.prescriptions.length, ") ");
  }
}
function MisCitasComponent_div_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 69);
    \u0275\u0275element(1, "mat-spinner", 70);
    \u0275\u0275elementEnd();
  }
}
function MisCitasComponent_mat_card_28_span_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const rx_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \xB7 Dr. ", rx_r12.doctorName, "");
  }
}
function MisCitasComponent_mat_card_28_div_12_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 91);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r13 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r13.dosage);
  }
}
function MisCitasComponent_mat_card_28_div_12_span_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 92);
    \u0275\u0275text(1, "Entregado");
    \u0275\u0275elementEnd();
  }
}
function MisCitasComponent_mat_card_28_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 87)(1, "mat-icon");
    \u0275\u0275text(2, "medication_liquid");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 88);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, MisCitasComponent_mat_card_28_div_12_div_8_Template, 2, 1, "div", 89);
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, MisCitasComponent_mat_card_28_div_12_span_9_Template, 2, 0, "span", 90);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r13 = ctx.$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(item_r13.medicineName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" \xD7 ", item_r13.quantity, "");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r13.dosage);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r13.dispatched);
  }
}
function MisCitasComponent_mat_card_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 83)(1, "mat-card-header")(2, "mat-icon", 16);
    \u0275\u0275text(3, "medication");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "mat-card-title");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "mat-card-subtitle");
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "date");
    \u0275\u0275template(9, MisCitasComponent_mat_card_28_span_9_Template, 2, 1, "span", 7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "mat-card-content")(11, "div", 84);
    \u0275\u0275template(12, MisCitasComponent_mat_card_28_div_12_Template, 10, 4, "div", 85);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 86)(14, "span");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const rx_r12 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("Receta #", rx_r12.id, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(8, 7, rx_r12.createdAt, "dd/MM/yyyy"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", rx_r12.doctorName);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", rx_r12.items);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r1.getRxStatusClass(rx_r12.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.rxStatusLabel(rx_r12.status));
  }
}
function MisCitasComponent_div_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 81)(1, "mat-icon");
    \u0275\u0275text(2, "receipt");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Sin recetas m\xE9dicas");
    \u0275\u0275elementEnd()();
  }
}
function MisCitasComponent_ng_template_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 14);
    \u0275\u0275text(1, "edit_note");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Diagn\xF3sticos (", ctx_r1.diagnoses.length, ") ");
  }
}
function MisCitasComponent_div_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 69);
    \u0275\u0275element(1, "mat-spinner", 70);
    \u0275\u0275elementEnd();
  }
}
function MisCitasComponent_div_34_span_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 100);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const rx_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Dr. ", rx_r14.doctorName, "");
  }
}
function MisCitasComponent_div_34_div_11_span_5_small_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r15 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u2014 ", item_r15.dosage, "");
  }
}
function MisCitasComponent_div_34_div_11_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 104);
    \u0275\u0275text(1);
    \u0275\u0275template(2, MisCitasComponent_div_34_div_11_span_5_small_2_Template, 2, 1, "small", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r15 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", item_r15.medicineName, " \xD7", item_r15.quantity, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r15.dosage);
  }
}
function MisCitasComponent_div_34_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 101)(1, "div", 102)(2, "mat-icon");
    \u0275\u0275text(3, "medication");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Medicamentos recetados");
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, MisCitasComponent_div_34_div_11_span_5_Template, 3, 3, "span", 103);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const rx_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", rx_r14.items);
  }
}
function MisCitasComponent_div_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 93)(1, "div", 94)(2, "mat-icon");
    \u0275\u0275text(3, "stethoscope");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 95)(5, "span", 96);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, MisCitasComponent_div_34_span_8_Template, 2, 1, "span", 97);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 98);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, MisCitasComponent_div_34_div_11_Template, 6, 1, "div", 99);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const rx_r14 = ctx.$implicit;
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(7, 4, rx_r14.createdAt, "dd/MM/yyyy"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", rx_r14.doctorName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(rx_r14.notes);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", rx_r14.items && rx_r14.items.length > 0);
  }
}
function MisCitasComponent_div_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 81)(1, "mat-icon");
    \u0275\u0275text(2, "edit_note");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Sin diagn\xF3sticos registrados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 82);
    \u0275\u0275text(6, "Aqu\xED aparecer\xE1n los diagn\xF3sticos de tus consultas m\xE9dicas.");
    \u0275\u0275elementEnd()();
  }
}
function MisCitasComponent_ng_template_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 14);
    \u0275\u0275text(1, "science");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Laboratorio (", ctx_r1.labOrders.length, ") ");
  }
}
function MisCitasComponent_div_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 69);
    \u0275\u0275element(1, "mat-spinner", 70);
    \u0275\u0275elementEnd();
  }
}
function MisCitasComponent_div_40_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 109);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r16 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(o_r16.labExamCode);
  }
}
function MisCitasComponent_div_40_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "mat-icon");
    \u0275\u0275text(2, "notifications");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r16 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(4, 1, o_r16.resultAvailableAt, "dd/MM/yyyy HH:mm"), "");
  }
}
function MisCitasComponent_div_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 105)(1, "div", 106)(2, "div")(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, MisCitasComponent_div_40_span_5_Template, 2, 1, "span", 107);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 78);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 108)(9, "div")(10, "mat-icon");
    \u0275\u0275text(11, "calendar_today");
    \u0275\u0275elementEnd();
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div")(14, "mat-icon");
    \u0275\u0275text(15, "event");
    \u0275\u0275elementEnd();
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275template(17, MisCitasComponent_div_40_div_17_Template, 5, 4, "div", 7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const o_r16 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(o_r16.labExamName || ctx_r1.sampleLabel(o_r16.sampleType));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", o_r16.labExamCode);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getLabStatusClass(o_r16.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.labStatusLabel(o_r16.status));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", o_r16.orderDate, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" Vence: ", o_r16.expirationDate, "");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", o_r16.resultAvailableAt);
  }
}
function MisCitasComponent_div_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 81)(1, "mat-icon");
    \u0275\u0275text(2, "biotech");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Sin \xF3rdenes de laboratorio");
    \u0275\u0275elementEnd()();
  }
}
function MisCitasComponent_ng_template_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 14);
    \u0275\u0275text(1, "account_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Mi Perfil ");
  }
}
function MisCitasComponent_div_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 69);
    \u0275\u0275element(1, "mat-spinner", 70);
    \u0275\u0275elementEnd();
  }
}
function MisCitasComponent_ng_container_46_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 114)(1, "span", 115)(2, "mat-icon");
    \u0275\u0275text(3, "badge");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " DPI");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 116);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.patientProfile.dpi);
  }
}
function MisCitasComponent_ng_container_46_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 114)(1, "span", 115)(2, "mat-icon");
    \u0275\u0275text(3, "cake");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Fecha de nacimiento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 116);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(7, 1, ctx_r1.patientProfile.birthDate, "dd/MM/yyyy"));
  }
}
function MisCitasComponent_ng_container_46_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 114)(1, "span", 115)(2, "mat-icon");
    \u0275\u0275text(3, "phone");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Tel\xE9fono");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 116);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.patientProfile.phone);
  }
}
function MisCitasComponent_ng_container_46_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 114)(1, "span", 115)(2, "mat-icon");
    \u0275\u0275text(3, "email");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Correo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 116);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.patientProfile.email);
  }
}
function MisCitasComponent_ng_container_46_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 114)(1, "span", 115)(2, "mat-icon");
    \u0275\u0275text(3, "home");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Direcci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 116);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.patientProfile.address);
  }
}
function MisCitasComponent_ng_container_46_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 114)(1, "span", 115)(2, "mat-icon");
    \u0275\u0275text(3, "emergency");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Contacto emergencia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 116);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate2("", ctx_r1.patientProfile.emergencyContact, " ", ctx_r1.patientProfile.emergencyPhone, "");
  }
}
function MisCitasComponent_ng_container_46_div_19_span_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 120);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.patientProfile.discountPercentage, "% descuento");
  }
}
function MisCitasComponent_ng_container_46_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 114)(1, "span", 115)(2, "mat-icon");
    \u0275\u0275text(3, "health_and_safety");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Aseguradora");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 116);
    \u0275\u0275text(6);
    \u0275\u0275template(7, MisCitasComponent_ng_container_46_div_19_span_7_Template, 2, 1, "span", 119);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", ctx_r1.patientProfile.insuranceName, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.patientProfile.discountPercentage);
  }
}
function MisCitasComponent_ng_container_46_div_37_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 127);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r17 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Dr. ", t_r17.doctorName, "");
  }
}
function MisCitasComponent_ng_container_46_div_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 121)(1, "div", 122)(2, "span", 123);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "div", 124);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 125);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, MisCitasComponent_ng_container_46_div_37_div_10_Template, 2, 1, "div", 126);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "span", 78);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r17 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(t_r17.ticketNumber);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(t_r17.clinicName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(9, 7, t_r17.createdAt, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", t_r17.doctorName);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getStatusClass(t_r17.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.statusLabel(t_r17.status));
  }
}
function MisCitasComponent_ng_container_46_div_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 81)(1, "mat-icon");
    \u0275\u0275text(2, "event_busy");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Sin historial de citas");
    \u0275\u0275elementEnd()();
  }
}
function MisCitasComponent_ng_container_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "mat-card", 110)(2, "mat-card-header")(3, "div", 111);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "mat-card-title");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "mat-card-subtitle");
    \u0275\u0275text(8, "C\xF3digo: ");
    \u0275\u0275elementStart(9, "strong");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "mat-card-content")(12, "div", 112);
    \u0275\u0275template(13, MisCitasComponent_ng_container_46_div_13_Template, 7, 1, "div", 113)(14, MisCitasComponent_ng_container_46_div_14_Template, 8, 4, "div", 113)(15, MisCitasComponent_ng_container_46_div_15_Template, 7, 1, "div", 113)(16, MisCitasComponent_ng_container_46_div_16_Template, 7, 1, "div", 113)(17, MisCitasComponent_ng_container_46_div_17_Template, 7, 1, "div", 113)(18, MisCitasComponent_ng_container_46_div_18_Template, 7, 2, "div", 113)(19, MisCitasComponent_ng_container_46_div_19_Template, 8, 2, "div", 113);
    \u0275\u0275elementStart(20, "div", 114)(21, "span", 115)(22, "mat-icon");
    \u0275\u0275text(23, "calendar_today");
    \u0275\u0275elementEnd();
    \u0275\u0275text(24, " Registrado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span", 116);
    \u0275\u0275text(26);
    \u0275\u0275pipe(27, "date");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(28, "mat-card", 117)(29, "mat-card-header")(30, "mat-icon", 16);
    \u0275\u0275text(31, "history");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "mat-card-title");
    \u0275\u0275text(33, "Historial de Citas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "mat-card-subtitle");
    \u0275\u0275text(35);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "mat-card-content");
    \u0275\u0275template(37, MisCitasComponent_ng_container_46_div_37_Template, 13, 10, "div", 118)(38, MisCitasComponent_ng_container_46_div_38_Template, 5, 0, "div", 10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.initials);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r1.patientProfile.firstName, " ", ctx_r1.patientProfile.lastName, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.patientProfile.patientCode);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.patientProfile.dpi);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.patientProfile.birthDate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.patientProfile.phone);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.patientProfile.email);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.patientProfile.address);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.patientProfile.emergencyContact);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.patientProfile.insuranceName);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(27, 15, ctx_r1.patientProfile.createdAt, "dd/MM/yyyy"));
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1("", ctx_r1.tickets.length, " cita(s) registrada(s)");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.tickets);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.tickets.length === 0);
  }
}
var MONTH_NAMES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre"
];
var ALL_SLOTS = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
var BOOKING_CLINIC_KEYWORDS = ["consulta", "medicina", "laboratorio", "lab", "general", "externa"];
var MisCitasComponent = class _MisCitasComponent {
  get initials() {
    const parts = this.userName.trim().split(" ");
    return parts.length >= 2 ? (parts[0][0] + parts[1][0]).toUpperCase() : this.userName.slice(0, 2).toUpperCase();
  }
  constructor(authService, ticketService, appointmentService, clinicService, prescriptionService, labService, patientService, notification) {
    this.authService = authService;
    this.ticketService = ticketService;
    this.appointmentService = appointmentService;
    this.clinicService = clinicService;
    this.prescriptionService = prescriptionService;
    this.labService = labService;
    this.patientService = patientService;
    this.notification = notification;
    this.tickets = [];
    this.prescriptions = [];
    this.diagnoses = [];
    this.labOrders = [];
    this.patientProfile = null;
    this.loadingTickets = true;
    this.loadingPrescriptions = true;
    this.loadingLab = true;
    this.loadingProfile = true;
    this.userName = "";
    this.patientId = null;
    this.bookingStep = "calendar";
    this.clinics = [];
    this.bookingClinics = [];
    this.selectedDate = null;
    this.selectedSlot = null;
    this.selectedClinicId = null;
    this.selectedType = "CONSULTA";
    this.consultationFee = "150.00";
    this.paying = false;
    this.paymentError = "";
    this.allSlots = ALL_SLOTS;
    this.availableSlots = ALL_SLOTS;
    this.loadingSlots = false;
    this.calYear = 0;
    this.calMonth = 0;
    this.calendarDays = [];
    this.weekDays = ["Dom", "Lun", "Mar", "Mi\xE9", "Jue", "Vie", "S\xE1b"];
    this.card = { name: "", number: "", expiry: "", cvv: "" };
  }
  ngOnInit() {
    const user = this.authService.currentUser();
    this.userName = user ? `${user.firstName} ${user.lastName}` : "Paciente";
    this.card.name = this.userName;
    this.patientId = this.authService.getPatientId();
    const now = /* @__PURE__ */ new Date();
    this.calYear = now.getFullYear();
    this.calMonth = now.getMonth();
    this.buildCalendar();
    this.clinicService.getAll().subscribe((res) => {
      if (res.success) {
        this.clinics = res.data;
        this.bookingClinics = res.data.filter((c) => BOOKING_CLINIC_KEYWORDS.some((k) => c.name.toLowerCase().includes(k)));
        if (this.bookingClinics.length === 0)
          this.bookingClinics = res.data;
      }
    });
    if (this.patientId)
      this.loadData(this.patientId);
    else {
      this.loadingTickets = false;
      this.loadingPrescriptions = false;
      this.loadingLab = false;
      this.loadingProfile = false;
    }
  }
  // --- Calendar ---
  get monthLabel() {
    return `${MONTH_NAMES[this.calMonth]} ${this.calYear}`;
  }
  buildCalendar() {
    const firstDay = new Date(this.calYear, this.calMonth, 1).getDay();
    const daysInMonth = new Date(this.calYear, this.calMonth + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < firstDay; i++)
      days.push(null);
    for (let i = 1; i <= daysInMonth; i++)
      days.push(new Date(this.calYear, this.calMonth, i));
    this.calendarDays = days;
  }
  prevMonth() {
    if (this.calMonth === 0) {
      this.calMonth = 11;
      this.calYear--;
    } else {
      this.calMonth--;
    }
    this.buildCalendar();
  }
  nextMonth() {
    if (this.calMonth === 11) {
      this.calMonth = 0;
      this.calYear++;
    } else {
      this.calMonth++;
    }
    this.buildCalendar();
  }
  isPastDay(d) {
    const today = /* @__PURE__ */ new Date();
    today.setHours(0, 0, 0, 0);
    return d < today;
  }
  getDayClass(day) {
    let cls = "cal-day";
    if (this.isPastDay(day)) {
      cls += " past";
      return cls;
    }
    const today = /* @__PURE__ */ new Date();
    today.setHours(0, 0, 0, 0);
    if (day.getTime() === today.getTime())
      cls += " today";
    if (this.selectedDate && day.getTime() === this.selectedDate.getTime())
      cls += " selected";
    return cls;
  }
  selectDate(day) {
    this.selectedDate = day;
    this.selectedSlot = null;
    this.loadSlots();
  }
  onClinicChange(clinicId) {
    this.selectedClinicId = clinicId;
    this.selectedSlot = null;
    if (this.selectedDate)
      this.loadSlots();
  }
  loadSlots() {
    if (!this.selectedDate || !this.selectedClinicId) {
      this.availableSlots = ALL_SLOTS;
      return;
    }
    this.loadingSlots = true;
    const dateStr = this.selectedDate.toISOString().split("T")[0];
    this.appointmentService.getAvailableSlots(dateStr, this.selectedClinicId).subscribe({
      next: (res) => {
        this.availableSlots = res.success ? res.data : ALL_SLOTS;
        if (this.selectedSlot && !this.availableSlots.includes(this.selectedSlot)) {
          this.selectedSlot = null;
        }
        this.loadingSlots = false;
      },
      error: () => {
        this.availableSlots = ALL_SLOTS;
        this.loadingSlots = false;
      }
    });
  }
  selectSlot(slot) {
    this.selectedSlot = slot;
  }
  formatDate(d) {
    if (!d)
      return "";
    const days = ["domingo", "lunes", "martes", "mi\xE9rcoles", "jueves", "viernes", "s\xE1bado"];
    return `${days[d.getDay()]} ${d.getDate()} de ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
  }
  goToPayment() {
    this.paymentError = "";
    this.bookingStep = "payment";
  }
  // --- Payment ---
  formatCardNumber() {
    const digits = this.card.number.replace(/\D/g, "").slice(0, 16);
    this.card.number = digits.replace(/(.{4})/g, "$1 ").trim();
  }
  cardValid() {
    const digits = this.card.number.replace(/\s/g, "");
    return this.card.name.trim().length >= 2 && digits.length >= 8 && this.card.expiry.length >= 3 && this.card.cvv.length >= 1;
  }
  pay() {
    if (!this.cardValid())
      return;
    this.paying = true;
    this.paymentError = "";
    setTimeout(() => {
      const dateStr = this.selectedDate.toISOString().split("T")[0];
      this.appointmentService.book({
        patientId: this.patientId,
        clinicId: this.selectedClinicId,
        type: this.selectedType,
        scheduledDate: dateStr,
        scheduledTime: this.selectedSlot,
        notes: "Cita agendada en l\xEDnea"
      }).subscribe({
        next: (res) => {
          if (res.success) {
            const apptId = res.data?.id;
            if (apptId) {
              this.appointmentService.confirmPayment(apptId, {
                paymentMethod: "ONLINE_CARD",
                amount: this.consultationFee
              }).subscribe({ error: () => {
              } });
            }
          }
          this.paying = false;
          this.bookingStep = "confirmed";
          this.notification.success("\xA1Cita confirmada!");
          if (this.patientId)
            this.loadData(this.patientId);
        },
        error: () => {
          this.paying = false;
          this.bookingStep = "confirmed";
          this.notification.success("\xA1Cita agendada exitosamente!");
        }
      });
    }, 1500);
  }
  resetBooking() {
    this.bookingStep = "calendar";
    this.selectedDate = null;
    this.selectedSlot = null;
    this.selectedClinicId = null;
    this.selectedType = "CONSULTA";
    this.availableSlots = ALL_SLOTS;
    this.card = { name: this.userName, number: "", expiry: "", cvv: "" };
    this.paymentError = "";
    const now = /* @__PURE__ */ new Date();
    this.calYear = now.getFullYear();
    this.calMonth = now.getMonth();
    this.buildCalendar();
  }
  getClinicName(id) {
    return this.clinics.find((c) => c.id === id)?.name ?? "\u2014";
  }
  typeLabel(t) {
    const m = { CONSULTA: "Consulta M\xE9dica", LABORATORIO: "Laboratorio", CONTROL: "Control" };
    return m[t] ?? t;
  }
  // --- Patient data ---
  loadData(patientId) {
    this.ticketService.getAll().subscribe({
      next: (res) => {
        if (res.success) {
          this.tickets = res.data.filter((t) => t.patientId === patientId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
        this.loadingTickets = false;
      },
      error: () => {
        this.loadingTickets = false;
      }
    });
    this.prescriptionService.getByPatient(patientId).subscribe({
      next: (res) => {
        if (res.success) {
          this.prescriptions = res.data;
          this.diagnoses = res.data.filter((rx) => rx.notes && rx.notes.trim().length > 0).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
        this.loadingPrescriptions = false;
      },
      error: () => {
        this.loadingPrescriptions = false;
      }
    });
    this.labService.getByPatient(patientId).subscribe({
      next: (res) => {
        if (res.success)
          this.labOrders = res.data;
        this.loadingLab = false;
      },
      error: () => {
        this.loadingLab = false;
      }
    });
    this.patientService.getById(patientId).subscribe({
      next: (res) => {
        if (res.success)
          this.patientProfile = res.data;
        this.loadingProfile = false;
      },
      error: () => {
        this.loadingProfile = false;
      }
    });
  }
  logout() {
    this.authService.logout();
  }
  sampleLabel(s) {
    return SAMPLE_TYPE_LABELS[s] ?? s;
  }
  getStatusClass(s) {
    const m = {
      WAITING: "status-waiting",
      BEING_CALLED: "status-being-called",
      IN_CONSULTATION: "status-in-consultation",
      COMPLETED: "status-completed",
      ABSENT: "status-absent",
      CANCELLED_NO_PAYMENT: "status-absent"
    };
    return m[s] ?? "";
  }
  statusLabel(s) {
    const m = {
      WAITING: "En Espera",
      BEING_CALLED: "Siendo Llamado",
      IN_CONSULTATION: "En Consulta",
      COMPLETED: "Atendido",
      ABSENT: "Ausente",
      CANCELLED_NO_PAYMENT: "Cancelado"
    };
    return m[s] ?? s;
  }
  getRxStatusClass(s) {
    const m = {
      PENDING: "status-waiting",
      DISPATCHED: "status-completed",
      PARTIALLY_DISPATCHED: "status-being-called",
      NOT_DISPATCHED: "status-absent"
    };
    return m[s] ?? "";
  }
  rxStatusLabel(s) {
    const m = {
      PENDING: "Pendiente",
      DISPATCHED: "Entregada",
      PARTIALLY_DISPATCHED: "Parcial",
      NOT_DISPATCHED: "No despachada"
    };
    return m[s] ?? s;
  }
  getLabStatusClass(s) {
    const m = {
      PENDING: "status-waiting",
      SAMPLE_COLLECTED: "status-being-called",
      SCHEDULED: "status-in-consultation",
      COMPLETED: "status-completed",
      EXPIRED: "status-absent"
    };
    return m[s] ?? "";
  }
  labStatusLabel(s) {
    const m = {
      PENDING: "Pendiente",
      SAMPLE_COLLECTED: "Muestra tomada",
      SCHEDULED: "Programada",
      COMPLETED: "Resultados listos",
      EXPIRED: "Expirada"
    };
    return m[s] ?? s;
  }
  static {
    this.\u0275fac = function MisCitasComponent_Factory(t) {
      return new (t || _MisCitasComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(TicketService), \u0275\u0275directiveInject(AppointmentService), \u0275\u0275directiveInject(ClinicService), \u0275\u0275directiveInject(PrescriptionService), \u0275\u0275directiveInject(LabService), \u0275\u0275directiveInject(PatientService), \u0275\u0275directiveInject(NotificationService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MisCitasComponent, selectors: [["app-mis-citas"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 47, vars: 18, consts: [[1, "page-container"], [1, "page-header"], [1, "subtitle"], ["mat-stroked-button", "", "color", "warn", 3, "click"], ["animationDuration", "200ms"], ["mat-tab-label", ""], [1, "tab-content"], [4, "ngIf"], ["class", "loading-state", 4, "ngIf"], ["class", "ticket-card", 4, "ngFor", "ngForOf"], ["class", "empty-state", 4, "ngIf"], ["class", "rx-card", 4, "ngFor", "ngForOf"], ["class", "diag-card", 4, "ngFor", "ngForOf"], ["class", "lab-card", 4, "ngFor", "ngForOf"], [1, "tab-icon"], [1, "booking-card"], ["mat-card-avatar", ""], [1, "selector-row"], ["appearance", "outline"], [3, "ngModelChange", "ngModel"], ["value", "CONSULTA"], ["value", "LABORATORIO"], ["value", "CONTROL"], [3, "value", 4, "ngFor", "ngForOf"], [1, "calendar-nav"], ["type", "button", 1, "nav-btn", 3, "click"], [1, "month-label"], [1, "calendar-grid"], ["class", "cal-weekday", 4, "ngFor", "ngForOf"], [4, "ngFor", "ngForOf"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], [3, "value"], [1, "cal-weekday"], ["class", "cal-day empty", 4, "ngIf"], [3, "class", "click", 4, "ngIf"], [1, "cal-day", "empty"], [3, "click"], [1, "slots-label"], ["diameter", "16", "style", "margin-left:8px", 4, "ngIf"], ["class", "slots-grid", 4, "ngIf"], ["diameter", "16", 2, "margin-left", "8px"], [1, "slots-grid"], ["type", "button", 3, "class", "click", 4, "ngFor", "ngForOf"], ["class", "no-slots", 4, "ngIf"], ["type", "button", 3, "click"], [1, "no-slots"], [1, "appt-summary"], [1, "summary-row"], [1, "summary-row", "total-row"], [1, "card-form"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "placeholder", "Nombre Apellido", 3, "ngModelChange", "ngModel"], ["matInput", "", "maxlength", "19", "placeholder", "0000 0000 0000 0000", 3, "ngModelChange", "input", "ngModel"], [1, "card-row-2"], ["matInput", "", "maxlength", "5", "placeholder", "MM/AA", 3, "ngModelChange", "ngModel"], ["matInput", "", "maxlength", "4", "type", "password", "placeholder", "\u2022\u2022\u2022", 3, "ngModelChange", "ngModel"], ["class", "error-msg", 4, "ngIf"], ["class", "hint-text", 4, "ngIf"], [2, "display", "flex", "gap", "8px", "align-items", "center"], ["mat-button", "", 3, "click", "disabled"], ["diameter", "20", "style", "display:inline-block;margin-right:8px", 4, "ngIf"], [1, "error-msg"], [1, "hint-text"], ["diameter", "20", 2, "display", "inline-block", "margin-right", "8px"], [1, "booking-card", "confirmed-card"], [1, "confirmed-icon"], [1, "appt-summary", "confirmed-summary"], [1, "info-box"], ["mat-raised-button", "", "color", "primary", 2, "margin-top", "24px", 3, "click"], [1, "loading-state"], ["diameter", "40"], [1, "ticket-card"], [1, "ticket-left"], [1, "ticket-num"], [1, "ticket-clinic"], [1, "ticket-type"], ["class", "ticket-date", 4, "ngIf"], ["class", "ticket-doctor", 4, "ngIf"], [1, "status-chip"], [1, "ticket-date"], [1, "ticket-doctor"], [1, "empty-state"], [1, "hint"], [1, "rx-card"], [1, "rx-items"], ["class", "rx-item", 4, "ngFor", "ngForOf"], [1, "rx-status"], [1, "rx-item"], [1, "rx-qty"], ["class", "rx-dosage", 4, "ngIf"], ["class", "dispatched-badge", 4, "ngIf"], [1, "rx-dosage"], [1, "dispatched-badge"], [1, "diag-card"], [1, "diag-header"], [1, "diag-meta"], [1, "diag-date"], ["class", "diag-doctor", 4, "ngIf"], [1, "diag-notes"], ["class", "diag-meds", 4, "ngIf"], [1, "diag-doctor"], [1, "diag-meds"], [1, "diag-meds-label"], ["class", "med-chip", 4, "ngFor", "ngForOf"], [1, "med-chip"], [1, "lab-card"], [1, "lab-header"], ["class", "lab-code", 4, "ngIf"], [1, "lab-details"], [1, "lab-code"], [1, "profile-card"], [1, "profile-avatar"], [1, "profile-grid"], ["class", "profile-field", 4, "ngIf"], [1, "profile-field"], [1, "pf-label"], [1, "pf-value"], [1, "profile-card", 2, "margin-top", "16px"], ["class", "history-row", 4, "ngFor", "ngForOf"], ["class", "discount-badge", 4, "ngIf"], [1, "discount-badge"], [1, "history-row"], [1, "history-left"], [1, "history-num"], [1, "history-clinic"], [1, "history-date"], ["class", "history-doctor", 4, "ngIf"], [1, "history-doctor"]], template: function MisCitasComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1");
        \u0275\u0275text(4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 2);
        \u0275\u0275text(6, "Portal del Paciente \xB7 BioCore Medical");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "button", 3);
        \u0275\u0275listener("click", function MisCitasComponent_Template_button_click_7_listener() {
          return ctx.logout();
        });
        \u0275\u0275elementStart(8, "mat-icon");
        \u0275\u0275text(9, "logout");
        \u0275\u0275elementEnd();
        \u0275\u0275text(10, " Cerrar sesi\xF3n ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(11, "mat-tab-group", 4)(12, "mat-tab");
        \u0275\u0275template(13, MisCitasComponent_ng_template_13_Template, 3, 0, "ng-template", 5);
        \u0275\u0275elementStart(14, "div", 6);
        \u0275\u0275template(15, MisCitasComponent_ng_container_15_Template, 42, 8, "ng-container", 7)(16, MisCitasComponent_ng_container_16_Template, 63, 16, "ng-container", 7)(17, MisCitasComponent_ng_container_17_Template, 30, 5, "ng-container", 7);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(18, "mat-tab");
        \u0275\u0275template(19, MisCitasComponent_ng_template_19_Template, 3, 1, "ng-template", 5);
        \u0275\u0275elementStart(20, "div", 6);
        \u0275\u0275template(21, MisCitasComponent_div_21_Template, 4, 0, "div", 8)(22, MisCitasComponent_div_22_Template, 13, 8, "div", 9)(23, MisCitasComponent_div_23_Template, 7, 0, "div", 10);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(24, "mat-tab");
        \u0275\u0275template(25, MisCitasComponent_ng_template_25_Template, 3, 1, "ng-template", 5);
        \u0275\u0275elementStart(26, "div", 6);
        \u0275\u0275template(27, MisCitasComponent_div_27_Template, 2, 0, "div", 8)(28, MisCitasComponent_mat_card_28_Template, 16, 10, "mat-card", 11)(29, MisCitasComponent_div_29_Template, 5, 0, "div", 10);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(30, "mat-tab");
        \u0275\u0275template(31, MisCitasComponent_ng_template_31_Template, 3, 1, "ng-template", 5);
        \u0275\u0275elementStart(32, "div", 6);
        \u0275\u0275template(33, MisCitasComponent_div_33_Template, 2, 0, "div", 8)(34, MisCitasComponent_div_34_Template, 12, 7, "div", 12)(35, MisCitasComponent_div_35_Template, 7, 0, "div", 10);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(36, "mat-tab");
        \u0275\u0275template(37, MisCitasComponent_ng_template_37_Template, 3, 1, "ng-template", 5);
        \u0275\u0275elementStart(38, "div", 6);
        \u0275\u0275template(39, MisCitasComponent_div_39_Template, 2, 0, "div", 8)(40, MisCitasComponent_div_40_Template, 18, 8, "div", 13)(41, MisCitasComponent_div_41_Template, 5, 0, "div", 10);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(42, "mat-tab");
        \u0275\u0275template(43, MisCitasComponent_ng_template_43_Template, 3, 0, "ng-template", 5);
        \u0275\u0275elementStart(44, "div", 6);
        \u0275\u0275template(45, MisCitasComponent_div_45_Template, 2, 0, "div", 8)(46, MisCitasComponent_ng_container_46_Template, 39, 18, "ng-container", 7);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate1("Bienvenido, ", ctx.userName, "");
        \u0275\u0275advance(11);
        \u0275\u0275property("ngIf", ctx.bookingStep === "calendar");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.bookingStep === "payment");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.bookingStep === "confirmed");
        \u0275\u0275advance(4);
        \u0275\u0275property("ngIf", ctx.loadingTickets);
        \u0275\u0275advance();
        \u0275\u0275property("ngForOf", ctx.tickets);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loadingTickets && ctx.tickets.length === 0);
        \u0275\u0275advance(4);
        \u0275\u0275property("ngIf", ctx.loadingPrescriptions);
        \u0275\u0275advance();
        \u0275\u0275property("ngForOf", ctx.prescriptions);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loadingPrescriptions && ctx.prescriptions.length === 0);
        \u0275\u0275advance(4);
        \u0275\u0275property("ngIf", ctx.loadingPrescriptions);
        \u0275\u0275advance();
        \u0275\u0275property("ngForOf", ctx.diagnoses);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loadingPrescriptions && ctx.diagnoses.length === 0);
        \u0275\u0275advance(4);
        \u0275\u0275property("ngIf", ctx.loadingLab);
        \u0275\u0275advance();
        \u0275\u0275property("ngForOf", ctx.labOrders);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loadingLab && ctx.labOrders.length === 0);
        \u0275\u0275advance(4);
        \u0275\u0275property("ngIf", ctx.loadingProfile);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loadingProfile && ctx.patientProfile);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, DatePipe, FormsModule, DefaultValueAccessor, NgControlStatus, MaxLengthValidator, NgModel, MatCardModule, MatCard, MatCardActions, MatCardAvatar, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle, MatButtonModule, MatButton, MatIconModule, MatIcon, MatTabsModule, MatTabLabel, MatTab, MatTabGroup, MatChipsModule, MatProgressSpinnerModule, MatProgressSpinner, MatFormFieldModule, MatFormField, MatLabel, MatHint, MatInputModule, MatInput, MatSelectModule, MatSelect, MatOption], styles: ["\n\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.6rem;\n  font-weight: 600;\n  color: #1D6C61;\n  margin: 0;\n}\n.subtitle[_ngcontent-%COMP%] {\n  color: #757575;\n  font-size: 0.9rem;\n  margin: 4px 0 0;\n}\n.tab-content[_ngcontent-%COMP%] {\n  padding: 24px 0;\n}\n.tab-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  margin-right: 6px;\n  vertical-align: middle;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 48px;\n  gap: 16px;\n  color: #9e9e9e;\n}\n.booking-card[_ngcontent-%COMP%] {\n  max-width: 700px;\n}\n.selector-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n  margin-bottom: 16px;\n}\n.calendar-nav[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 12px;\n  background: #f0faf8;\n  border-radius: 10px;\n  padding: 6px 12px;\n}\n.month-label[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 700;\n  color: #1D6C61;\n}\n.nav-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  font-size: 2rem;\n  line-height: 1;\n  color: #1D6C61;\n  padding: 0 8px;\n  border-radius: 6px;\n  transition: background 0.15s;\n}\n.nav-btn[_ngcontent-%COMP%]:hover {\n  background: #d0f4ef;\n}\n.calendar-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  gap: 4px;\n  margin-bottom: 20px;\n}\n.cal-weekday[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 0.72rem;\n  font-weight: 700;\n  color: #9e9e9e;\n  padding: 6px 0;\n  text-transform: uppercase;\n}\n.cal-day[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 10px 4px;\n  border-radius: 8px;\n  font-size: 0.9rem;\n  cursor: pointer;\n  transition: background 0.15s;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.cal-day.empty[_ngcontent-%COMP%] {\n  cursor: default;\n}\n.cal-day.past[_ngcontent-%COMP%] {\n  color: #ccc;\n  cursor: not-allowed;\n}\n.cal-day[_ngcontent-%COMP%]:not(.past):not(.empty):hover {\n  background: #d0f4ef;\n}\n.cal-day.today[_ngcontent-%COMP%] {\n  border: 2px solid #3EB9A8;\n  font-weight: 700;\n}\n.cal-day.selected[_ngcontent-%COMP%] {\n  background: #1D6C61 !important;\n  color: white;\n  font-weight: 700;\n}\n.slots-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-weight: 600;\n  color: #1D6C61;\n  margin-bottom: 12px;\n  font-size: 0.9rem;\n}\n.slots-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 8px;\n  margin-bottom: 8px;\n}\n.slot-btn[_ngcontent-%COMP%] {\n  padding: 12px 4px;\n  border-radius: 8px;\n  border: 2px solid #d0e8e5;\n  background: white;\n  cursor: pointer;\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: #1D6C61;\n  transition: all 0.15s;\n}\n.slot-btn[_ngcontent-%COMP%]:hover {\n  background: #d0f4ef;\n  border-color: #3EB9A8;\n}\n.slot-btn.selected[_ngcontent-%COMP%] {\n  background: #1D6C61;\n  color: white;\n  border-color: #1D6C61;\n}\n.no-slots[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: #9e9e9e;\n  font-size: 0.9rem;\n  padding: 12px;\n}\n.appt-summary[_ngcontent-%COMP%] {\n  background: #f0faf8;\n  border: 1px solid #b2dfdb;\n  border-radius: 10px;\n  padding: 16px;\n  margin-bottom: 20px;\n}\n.summary-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 8px 0;\n  font-size: 0.95rem;\n}\n.summary-row[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #1D6C61;\n  flex-shrink: 0;\n}\n.total-row[_ngcontent-%COMP%] {\n  border-top: 1px solid #b2dfdb;\n  margin-top: 4px;\n  padding-top: 12px;\n  font-size: 1rem;\n}\n.card-form[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 0.95rem;\n  font-weight: 600;\n  color: #555;\n  margin-bottom: 12px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.card-row-2[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n}\n.error-msg[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: #c62828;\n  font-size: 0.88rem;\n  margin: 8px 0;\n}\n.hint-text[_ngcontent-%COMP%] {\n  color: #757575;\n  font-size: 0.82rem;\n  margin-top: 4px;\n}\n.confirmed-card[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 32px;\n}\n.confirmed-icon[_ngcontent-%COMP%] {\n  font-size: 72px;\n  width: 72px;\n  height: 72px;\n  color: #2e7d32;\n  margin-bottom: 12px;\n}\n.confirmed-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.6rem;\n  color: #2e7d32;\n  margin-bottom: 8px;\n}\n.confirmed-summary[_ngcontent-%COMP%] {\n  max-width: 420px;\n  margin: 20px auto 0;\n  text-align: left;\n}\n.info-box[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  background: #e3f2fd;\n  border-radius: 8px;\n  padding: 12px;\n  margin-top: 12px;\n  font-size: 0.85rem;\n  color: #1565c0;\n}\n.info-box[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  margin-top: 2px;\n}\n.ticket-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 20px;\n  background: white;\n  border-radius: 10px;\n  margin-bottom: 12px;\n  box-shadow: 0 2px 8px rgba(29, 108, 97, 0.08);\n  border-left: 4px solid #3EB9A8;\n}\n.ticket-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 20px;\n}\n.ticket-num[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 700;\n  color: #1D6C61;\n  min-width: 100px;\n}\n.ticket-clinic[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.ticket-type[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: #757575;\n}\n.ticket-date[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: #9e9e9e;\n  margin-top: 2px;\n}\n.ticket-doctor[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: #1D6C61;\n}\n.status-chip[_ngcontent-%COMP%] {\n  padding: 4px 14px;\n  border-radius: 12px;\n  font-size: 0.8rem;\n  font-weight: 500;\n  white-space: nowrap;\n}\n.status-waiting[_ngcontent-%COMP%] {\n  background: #e3f2fd;\n  color: #1565c0;\n}\n.status-being-called[_ngcontent-%COMP%] {\n  background: #fff3e0;\n  color: #e65100;\n}\n.status-in-consultation[_ngcontent-%COMP%] {\n  background: #e8f5e9;\n  color: #2e7d32;\n}\n.status-completed[_ngcontent-%COMP%] {\n  background: #f5f5f5;\n  color: #616161;\n}\n.status-absent[_ngcontent-%COMP%] {\n  background: #ffebee;\n  color: #c62828;\n}\n.rx-card[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.rx-items[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  margin-top: 8px;\n}\n.rx-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  padding: 8px;\n  background: #f8f9ff;\n  border-radius: 6px;\n}\n.rx-item[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #1D6C61;\n  flex-shrink: 0;\n}\n.rx-qty[_ngcontent-%COMP%] {\n  color: #757575;\n  font-size: 0.85rem;\n}\n.rx-dosage[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #555;\n  margin-top: 2px;\n}\n.dispatched-badge[_ngcontent-%COMP%] {\n  margin-left: auto;\n  background: #e8f5e9;\n  color: #2e7d32;\n  padding: 2px 8px;\n  border-radius: 8px;\n  font-size: 0.75rem;\n}\n.rx-status[_ngcontent-%COMP%] {\n  margin-top: 12px;\n}\n.lab-card[_ngcontent-%COMP%] {\n  padding: 16px;\n  background: white;\n  border-radius: 10px;\n  margin-bottom: 12px;\n  box-shadow: 0 2px 8px rgba(29, 108, 97, 0.08);\n  border: 1px solid #d4e8e5;\n}\n.lab-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 10px;\n}\n.lab-code[_ngcontent-%COMP%] {\n  background: #193A31;\n  color: #3EB9A8;\n  padding: 2px 8px;\n  border-radius: 6px;\n  font-size: 0.75rem;\n  margin-left: 8px;\n}\n.lab-details[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  font-size: 0.85rem;\n  color: #555;\n}\n.lab-details[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.lab-details[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n  color: #1D6C61;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 48px;\n  color: #9e9e9e;\n}\n.empty-state[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 56px;\n  width: 56px;\n  height: 56px;\n  color: #3EB9A8;\n  opacity: 0.4;\n  margin-bottom: 8px;\n}\n.hint[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  margin-top: 4px;\n}\n.diag-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 10px;\n  padding: 20px;\n  margin-bottom: 14px;\n  box-shadow: 0 2px 8px rgba(29, 108, 97, 0.08);\n  border-left: 4px solid #1D6C61;\n}\n.diag-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 12px;\n}\n.diag-header[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n  width: 28px;\n  height: 28px;\n  color: #1D6C61;\n}\n.diag-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.diag-date[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 0.9rem;\n  color: #333;\n}\n.diag-doctor[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: #1D6C61;\n}\n.diag-notes[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  color: #333;\n  line-height: 1.6;\n  background: #f8fffe;\n  border-radius: 8px;\n  padding: 12px 16px;\n  margin-bottom: 12px;\n  white-space: pre-wrap;\n}\n.diag-meds[_ngcontent-%COMP%] {\n  border-top: 1px solid #e0f0ee;\n  padding-top: 10px;\n}\n.diag-meds-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: #555;\n  margin-bottom: 8px;\n}\n.diag-meds-label[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n}\n.med-chip[_ngcontent-%COMP%] {\n  display: inline-block;\n  background: #e8f5e9;\n  color: #2e7d32;\n  padding: 3px 10px;\n  border-radius: 10px;\n  font-size: 0.8rem;\n  margin: 2px 4px 2px 0;\n}\n.profile-card[_ngcontent-%COMP%] {\n  max-width: 700px;\n}\n.profile-avatar[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  border-radius: 50%;\n  background: #1D6C61;\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.4rem;\n  font-weight: 700;\n  margin-right: 12px;\n  flex-shrink: 0;\n}\n.profile-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 0;\n  margin-top: 8px;\n}\n.profile-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  padding: 12px 8px;\n  border-bottom: 1px solid #f0f0f0;\n}\n.pf-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #9e9e9e;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-bottom: 4px;\n}\n.pf-label[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n  width: 14px;\n  height: 14px;\n}\n.pf-value[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  color: #333;\n  padding-left: 20px;\n}\n.discount-badge[_ngcontent-%COMP%] {\n  background: #e8f5e9;\n  color: #2e7d32;\n  padding: 2px 8px;\n  border-radius: 8px;\n  font-size: 0.75rem;\n  margin-left: 8px;\n}\n.history-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 10px 0;\n  border-bottom: 1px solid #f5f5f5;\n  gap: 12px;\n}\n.history-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.history-num[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: #1D6C61;\n  min-width: 70px;\n}\n.history-clinic[_ngcontent-%COMP%] {\n  font-weight: 500;\n  font-size: 0.9rem;\n}\n.history-date[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: #9e9e9e;\n}\n.history-doctor[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #1D6C61;\n}\n/*# sourceMappingURL=mis-citas.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MisCitasComponent, { className: "MisCitasComponent", filePath: "src\\app\\modules\\mis-citas\\mis-citas.component.ts", lineNumber: 595 });
})();
export {
  MisCitasComponent
};
//# sourceMappingURL=chunk-Z6VUBYEH.js.map
