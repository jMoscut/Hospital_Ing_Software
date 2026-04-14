import {
  MatTab,
  MatTabGroup,
  MatTabsModule
} from "./chunk-SORBTICD.js";
import {
  LabService
} from "./chunk-NYQQYANC.js";
import {
  MatDialogModule
} from "./chunk-M64FBFD4.js";
import {
  NotificationService
} from "./chunk-7NN3FNQB.js";
import "./chunk-DMTJYVKR.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-KK4M4ZLY.js";
import {
  MatTableModule
} from "./chunk-PQZQB5KY.js";
import {
  MatChipsModule
} from "./chunk-IFZAJIVN.js";
import "./chunk-7TOHHRAU.js";
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
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-2NM6KC74.js";
import {
  MatCardModule
} from "./chunk-IVAI7UHG.js";
import {
  CommonModule,
  DatePipe,
  MatButton,
  MatButtonModule,
  MatIcon,
  MatIconModule,
  NgForOf,
  NgIf,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpropertyInterpolate1,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-R33V2XU6.js";

// src/app/modules/laboratory/laboratory.component.ts
function LaboratoryComponent_div_7_strong_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "strong");
    \u0275\u0275text(1, " \u26A0 Pr\xF3ximo a expirar");
    \u0275\u0275elementEnd();
  }
}
function LaboratoryComponent_div_7_button_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function LaboratoryComponent_div_7_button_26_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const o_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.collectSample(o_r2.id));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "colorize");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Tomar Muestra ");
    \u0275\u0275elementEnd();
  }
}
function LaboratoryComponent_div_7_button_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function LaboratoryComponent_div_7_button_27_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const o_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openScheduleDialog(o_r2));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "schedule");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Programar Cita ");
    \u0275\u0275elementEnd();
  }
}
function LaboratoryComponent_div_7_button_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 20);
    \u0275\u0275listener("click", function LaboratoryComponent_div_7_button_28_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const o_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openCompleteDialog(o_r2));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Registrar Resultado ");
    \u0275\u0275elementEnd();
  }
}
function LaboratoryComponent_div_7_div_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21)(1, "form", 22)(2, "mat-form-field", 23)(3, "mat-label");
    \u0275\u0275text(4, "Notas del Resultado");
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "textarea", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "mat-form-field", 25)(7, "mat-label");
    \u0275\u0275text(8, "Fecha y Hora de Disponibilidad (RN-L02)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(9, "input", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 27)(11, "button", 28);
    \u0275\u0275listener("click", function LaboratoryComponent_div_7_div_29_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.showCompleteForm = false);
    });
    \u0275\u0275text(12, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 29);
    \u0275\u0275listener("click", function LaboratoryComponent_div_7_div_29_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r6);
      const o_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.completeOrder(o_r2.id));
    });
    \u0275\u0275elementStart(14, "mat-icon");
    \u0275\u0275text(15, "send");
    \u0275\u0275elementEnd();
    \u0275\u0275text(16, " Guardar y Notificar (Email) ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r2.completeForm);
    \u0275\u0275advance(12);
    \u0275\u0275property("disabled", ctx_r2.completeForm.invalid);
  }
}
function LaboratoryComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 7)(2, "div")(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 8);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span", 9);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 10)(10, "mat-icon");
    \u0275\u0275text(11, "science");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span");
    \u0275\u0275text(13, "Muestra: ");
    \u0275\u0275elementStart(14, "strong");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "mat-icon");
    \u0275\u0275text(17, "calendar_today");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "mat-icon", 11);
    \u0275\u0275text(21, "warning");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span");
    \u0275\u0275text(23);
    \u0275\u0275template(24, LaboratoryComponent_div_7_strong_24_Template, 2, 0, "strong", 12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 13);
    \u0275\u0275template(26, LaboratoryComponent_div_7_button_26_Template, 4, 0, "button", 14)(27, LaboratoryComponent_div_7_button_27_Template, 4, 0, "button", 15)(28, LaboratoryComponent_div_7_button_28_Template, 4, 0, "button", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275template(29, LaboratoryComponent_div_7_div_29_Template, 17, 2, "div", 17);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(o_r2.patientName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Orden #", o_r2.id, "");
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r2.getStatusClass(o_r2.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", o_r2.status, " ");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(o_r2.sampleType);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Orden: ", o_r2.orderDate, "");
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("color", ctx_r2.isExpiringSoon(o_r2.expirationDate) ? "#e65100" : "inherit");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Vence: ", o_r2.expirationDate, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.isExpiringSoon(o_r2.expirationDate));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", o_r2.status === "PENDING");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", o_r2.status === "PENDING" || o_r2.status === "SAMPLE_COLLECTED");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", o_r2.status === "SAMPLE_COLLECTED" || o_r2.status === "SCHEDULED");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (ctx_r2.selectedOrder == null ? null : ctx_r2.selectedOrder.id) === o_r2.id && ctx_r2.showCompleteForm);
  }
}
function LaboratoryComponent_p_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 30);
    \u0275\u0275text(1, "No hay \xF3rdenes pendientes");
    \u0275\u0275elementEnd();
  }
}
function LaboratoryComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 7)(2, "div")(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "span", 31);
    \u0275\u0275text(6, " COMPLETADO ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 10)(8, "mat-icon");
    \u0275\u0275text(9, "science");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "mat-icon");
    \u0275\u0275text(13, "schedule");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "date");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const o_r7 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Orden #", o_r7.id, "");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(o_r7.sampleType);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Disponible: ", \u0275\u0275pipeBind2(16, 3, o_r7.resultAvailableAt, "dd/MM/yyyy HH:mm"), "");
  }
}
var LaboratoryComponent = class _LaboratoryComponent {
  constructor(fb, labService, notification) {
    this.fb = fb;
    this.labService = labService;
    this.notification = notification;
    this.pending = [];
    this.completed = [];
    this.selectedOrder = null;
    this.showCompleteForm = false;
  }
  ngOnInit() {
    this.completeForm = this.fb.group({
      notes: [""],
      resultAvailableAt: ["", Validators.required]
    });
    this.load();
  }
  load() {
    this.labService.getPending().subscribe((res) => {
      if (res.success) {
        this.pending = res.data.filter((o) => o.status !== "COMPLETED" && o.status !== "EXPIRED");
        this.completed = res.data.filter((o) => o.status === "COMPLETED");
      }
    });
  }
  collectSample(id) {
    this.labService.collectSample(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.notification.success("Muestra recolectada");
          this.load();
        }
      },
      error: () => this.notification.error("Error al registrar muestra")
    });
  }
  openScheduleDialog(order) {
    const dt = prompt("Fecha y hora de la cita programada (formato: YYYY-MM-DDTHH:MM)");
    if (dt) {
      this.labService.schedule(order.id, dt).subscribe({
        next: () => {
          this.notification.success("Cita programada");
          this.load();
        }
      });
    }
  }
  openCompleteDialog(order) {
    this.selectedOrder = order;
    this.showCompleteForm = true;
    this.completeForm.reset();
  }
  completeOrder(id) {
    const { notes, resultAvailableAt } = this.completeForm.value;
    this.labService.complete(id, notes, resultAvailableAt).subscribe({
      next: (res) => {
        if (res.success) {
          this.notification.success("Resultado registrado. Notificaci\xF3n enviada al paciente.");
          this.showCompleteForm = false;
          this.load();
        }
      },
      error: (err) => this.notification.error("Error: Verifique que el paciente tenga correo registrado (RN-L03)")
    });
  }
  isExpiringSoon(expirationDate) {
    const exp = new Date(expirationDate);
    const diff = (exp.getTime() - Date.now()) / (1e3 * 60 * 60 * 24);
    return diff <= 5 && diff > 0;
  }
  getStatusClass(status) {
    const map = {
      "PENDING": "status-waiting",
      "SAMPLE_COLLECTED": "status-being-called",
      "SCHEDULED": "status-in-consultation",
      "COMPLETED": "status-completed",
      "EXPIRED": "status-absent"
    };
    return map[status] || "";
  }
  static {
    this.\u0275fac = function LaboratoryComponent_Factory(t) {
      return new (t || _LaboratoryComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(LabService), \u0275\u0275directiveInject(NotificationService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LaboratoryComponent, selectors: [["app-laboratory"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 12, vars: 7, consts: [[1, "page-container"], [1, "page-header"], [3, "label"], [1, "tab-content"], ["class", "lab-order", 4, "ngFor", "ngForOf"], ["class", "empty-msg", 4, "ngIf"], [1, "lab-order"], [1, "order-header"], [1, "code-badge"], [2, "padding", "4px 12px", "border-radius", "12px", "font-size", "0.8rem"], [1, "order-details"], [2, "color", "#e65100"], [4, "ngIf"], [1, "order-actions"], ["mat-stroked-button", "", "color", "primary", 3, "click", 4, "ngIf"], ["mat-stroked-button", "", "color", "accent", 3, "click", 4, "ngIf"], ["mat-raised-button", "", "color", "primary", 3, "click", 4, "ngIf"], ["class", "complete-panel", 4, "ngIf"], ["mat-stroked-button", "", "color", "primary", 3, "click"], ["mat-stroked-button", "", "color", "accent", 3, "click"], ["mat-raised-button", "", "color", "primary", 3, "click"], [1, "complete-panel"], [3, "formGroup"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "formControlName", "notes", "rows", "3"], ["appearance", "outline"], ["matInput", "", "type", "datetime-local", "formControlName", "resultAvailableAt"], [1, "form-actions"], ["mat-button", "", 3, "click"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], [1, "empty-msg"], [2, "background", "#e8f5e9", "color", "#2e7d32", "padding", "4px 12px", "border-radius", "12px", "font-size", "0.8rem"]], template: function LaboratoryComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
        \u0275\u0275text(3, "Laboratorio (CU4)");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(4, "mat-tab-group")(5, "mat-tab", 2)(6, "div", 3);
        \u0275\u0275template(7, LaboratoryComponent_div_7_Template, 30, 15, "div", 4)(8, LaboratoryComponent_p_8_Template, 2, 0, "p", 5);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "mat-tab", 2)(10, "div", 3);
        \u0275\u0275template(11, LaboratoryComponent_div_11_Template, 17, 6, "div", 4);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275propertyInterpolate1("label", "Pendientes (", ctx.pending.length, ")");
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.pending);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.pending.length === 0);
        \u0275\u0275advance();
        \u0275\u0275propertyInterpolate1("label", "Completadas (", ctx.completed.length, ")");
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.completed);
      }
    }, dependencies: [
      CommonModule,
      NgForOf,
      NgIf,
      DatePipe,
      ReactiveFormsModule,
      \u0275NgNoValidate,
      DefaultValueAccessor,
      NgControlStatus,
      NgControlStatusGroup,
      FormGroupDirective,
      FormControlName,
      MatCardModule,
      MatButtonModule,
      MatButton,
      MatIconModule,
      MatIcon,
      MatTabsModule,
      MatTab,
      MatTabGroup,
      MatTableModule,
      MatChipsModule,
      MatFormFieldModule,
      MatFormField,
      MatLabel,
      MatInputModule,
      MatInput,
      MatDialogModule
    ], styles: ["\n\n.tab-content[_ngcontent-%COMP%] {\n  padding: 24px 0;\n}\n.lab-order[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 20px;\n  margin-bottom: 16px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n}\n.order-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 12px;\n}\n.code-badge[_ngcontent-%COMP%] {\n  background: #e3f2fd;\n  color: #1565c0;\n  padding: 2px 8px;\n  border-radius: 8px;\n  font-size: 0.8rem;\n  margin-left: 8px;\n}\n.order-details[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: #555;\n  font-size: 0.9rem;\n  flex-wrap: wrap;\n  margin-bottom: 12px;\n}\n.order-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.complete-panel[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  padding: 16px;\n  background: #f8f9ff;\n  border-radius: 8px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  margin-top: 8px;\n}\n.empty-msg[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #9e9e9e;\n  padding: 40px;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.6rem;\n  font-weight: 500;\n  color: #1565c0;\n  margin: 0;\n}\n/*# sourceMappingURL=laboratory.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LaboratoryComponent, { className: "LaboratoryComponent", filePath: "src\\app\\modules\\laboratory\\laboratory.component.ts", lineNumber: 137 });
})();
export {
  LaboratoryComponent
};
//# sourceMappingURL=chunk-4VTUDYUK.js.map
