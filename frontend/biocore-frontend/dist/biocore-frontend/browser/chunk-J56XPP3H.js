import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-AY5RGERM.js";
import {
  PatientService
} from "./chunk-WKDVMIXT.js";
import {
  RouterLink
} from "./chunk-ZOTSATNJ.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-KK4M4ZLY.js";
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
} from "./chunk-PQZQB5KY.js";
import {
  MatChip,
  MatChipsModule
} from "./chunk-IFZAJIVN.js";
import "./chunk-TFS6RWUB.js";
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
  MatPrefix
} from "./chunk-SJJOW5UO.js";
import {
  DefaultValueAccessor,
  FormControl,
  FormControlDirective,
  NgControlStatus,
  ReactiveFormsModule
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
  MatIconButton,
  MatIconModule,
  NgIf,
  debounceTime,
  distinctUntilChanged,
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
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate2
} from "./chunk-R33V2XU6.js";

// src/app/modules/patient/patient-list/patient-list.component.ts
var _c0 = (a0) => ["/patients", a0];
function PatientListComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275element(1, "mat-spinner", 10);
    \u0275\u0275elementEnd();
  }
}
function PatientListComponent_table_17_th_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 22);
    \u0275\u0275text(1, "C\xF3digo");
    \u0275\u0275elementEnd();
  }
}
function PatientListComponent_table_17_td_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 23)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r1 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r1.patientCode);
  }
}
function PatientListComponent_table_17_th_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 22);
    \u0275\u0275text(1, "DPI");
    \u0275\u0275elementEnd();
  }
}
function PatientListComponent_table_17_td_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r2.dpi);
  }
}
function PatientListComponent_table_17_th_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 22);
    \u0275\u0275text(1, "Nombre Completo");
    \u0275\u0275elementEnd();
  }
}
function PatientListComponent_table_17_td_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", p_r3.firstName, " ", p_r3.lastName, "");
  }
}
function PatientListComponent_table_17_th_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 22);
    \u0275\u0275text(1, "Tel\xE9fono");
    \u0275\u0275elementEnd();
  }
}
function PatientListComponent_table_17_td_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r4.phone || "-");
  }
}
function PatientListComponent_table_17_th_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 22);
    \u0275\u0275text(1, "Seguro");
    \u0275\u0275elementEnd();
  }
}
function PatientListComponent_table_17_td_15_mat_chip_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", p_r5.insuranceName, " (", p_r5.discountPercentage, "%) ");
  }
}
function PatientListComponent_table_17_td_15_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1, "Sin seguro");
    \u0275\u0275elementEnd();
  }
}
function PatientListComponent_table_17_td_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 23);
    \u0275\u0275template(1, PatientListComponent_table_17_td_15_mat_chip_1_Template, 2, 2, "mat-chip", 24)(2, PatientListComponent_table_17_td_15_span_2_Template, 2, 0, "span", 25);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", p_r5.insuranceName);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !p_r5.insuranceName);
  }
}
function PatientListComponent_table_17_th_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 22);
    \u0275\u0275text(1, "Acciones");
    \u0275\u0275elementEnd();
  }
}
function PatientListComponent_table_17_td_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 23)(1, "button", 28)(2, "mat-icon");
    \u0275\u0275text(3, "visibility");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const p_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(1, _c0, p_r6.id));
  }
}
function PatientListComponent_table_17_tr_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 29);
  }
}
function PatientListComponent_table_17_tr_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 30);
  }
  if (rf & 2) {
    const row_r7 = ctx.$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(1, _c0, row_r7.id));
  }
}
function PatientListComponent_table_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 11);
    \u0275\u0275elementContainerStart(1, 12);
    \u0275\u0275template(2, PatientListComponent_table_17_th_2_Template, 2, 0, "th", 13)(3, PatientListComponent_table_17_td_3_Template, 3, 1, "td", 14);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(4, 15);
    \u0275\u0275template(5, PatientListComponent_table_17_th_5_Template, 2, 0, "th", 13)(6, PatientListComponent_table_17_td_6_Template, 2, 1, "td", 14);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(7, 16);
    \u0275\u0275template(8, PatientListComponent_table_17_th_8_Template, 2, 0, "th", 13)(9, PatientListComponent_table_17_td_9_Template, 2, 2, "td", 14);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(10, 17);
    \u0275\u0275template(11, PatientListComponent_table_17_th_11_Template, 2, 0, "th", 13)(12, PatientListComponent_table_17_td_12_Template, 2, 1, "td", 14);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(13, 18);
    \u0275\u0275template(14, PatientListComponent_table_17_th_14_Template, 2, 0, "th", 13)(15, PatientListComponent_table_17_td_15_Template, 3, 2, "td", 14);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(16, 19);
    \u0275\u0275template(17, PatientListComponent_table_17_th_17_Template, 2, 0, "th", 13)(18, PatientListComponent_table_17_td_18_Template, 4, 3, "td", 14);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(19, PatientListComponent_table_17_tr_19_Template, 1, 0, "tr", 20)(20, PatientListComponent_table_17_tr_20_Template, 1, 3, "tr", 21);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r7 = \u0275\u0275nextContext();
    \u0275\u0275property("dataSource", ctx_r7.patients);
    \u0275\u0275advance(19);
    \u0275\u0275property("matHeaderRowDef", ctx_r7.columns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r7.columns);
  }
}
function PatientListComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "mat-icon", 32);
    \u0275\u0275text(2, "people_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 27);
    \u0275\u0275text(4, "No se encontraron pacientes");
    \u0275\u0275elementEnd()();
  }
}
var PatientListComponent = class _PatientListComponent {
  constructor(patientService) {
    this.patientService = patientService;
    this.patients = [];
    this.loading = true;
    this.searchCtrl = new FormControl("");
    this.columns = ["patientCode", "dpi", "name", "phone", "insurance", "actions"];
  }
  ngOnInit() {
    this.loadAll();
    this.searchCtrl.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe((q) => {
      if (q && q.length >= 2) {
        this.patientService.search(q).subscribe((res) => {
          if (res.success)
            this.patients = res.data;
        });
      } else if (!q) {
        this.loadAll();
      }
    });
  }
  loadAll() {
    this.loading = true;
    this.patientService.getAll().subscribe((res) => {
      if (res.success)
        this.patients = res.data;
      this.loading = false;
    });
  }
  static {
    this.\u0275fac = function PatientListComponent_Factory(t) {
      return new (t || _PatientListComponent)(\u0275\u0275directiveInject(PatientService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PatientListComponent, selectors: [["app-patient-list"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 19, vars: 4, consts: [[1, "page-container"], [1, "page-header"], ["mat-raised-button", "", "color", "primary", "routerLink", "/patients/register"], ["appearance", "outline", 1, "search-field"], ["matPrefix", ""], ["matInput", "", "placeholder", "Nombre, DPI o c\xF3digo...", 3, "formControl"], ["class", "flex-center mt-24", 4, "ngIf"], ["mat-table", "", "class", "w-full", 3, "dataSource", 4, "ngIf"], ["class", "text-center mt-16", 4, "ngIf"], [1, "flex-center", "mt-24"], ["diameter", "40"], ["mat-table", "", 1, "w-full", 3, "dataSource"], ["matColumnDef", "patientCode"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "dpi"], ["matColumnDef", "name"], ["matColumnDef", "phone"], ["matColumnDef", "insurance"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", "class", "clickable-row", 3, "routerLink", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", ""], ["color", "primary", 4, "ngIf"], ["style", "color:#9e9e9e", 4, "ngIf"], ["color", "primary"], [2, "color", "#9e9e9e"], ["mat-icon-button", "", "color", "primary", "title", "Ver detalle", 3, "routerLink"], ["mat-header-row", ""], ["mat-row", "", 1, "clickable-row", 3, "routerLink"], [1, "text-center", "mt-16"], [2, "font-size", "48px", "color", "#9e9e9e"]], template: function PatientListComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
        \u0275\u0275text(3, "Pacientes");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "button", 2)(5, "mat-icon");
        \u0275\u0275text(6, "person_add");
        \u0275\u0275elementEnd();
        \u0275\u0275text(7, " Registrar Paciente ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "mat-card")(9, "mat-card-content")(10, "mat-form-field", 3)(11, "mat-label");
        \u0275\u0275text(12, "Buscar paciente");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "mat-icon", 4);
        \u0275\u0275text(14, "search");
        \u0275\u0275elementEnd();
        \u0275\u0275element(15, "input", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275template(16, PatientListComponent_div_16_Template, 2, 0, "div", 6)(17, PatientListComponent_table_17_Template, 21, 3, "table", 7)(18, PatientListComponent_div_18_Template, 5, 0, "div", 8);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(15);
        \u0275\u0275property("formControl", ctx.searchCtrl);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && ctx.patients.length === 0);
      }
    }, dependencies: [
      CommonModule,
      NgIf,
      RouterLink,
      ReactiveFormsModule,
      DefaultValueAccessor,
      NgControlStatus,
      FormControlDirective,
      MatTableModule,
      MatTable,
      MatHeaderCellDef,
      MatHeaderRowDef,
      MatColumnDef,
      MatCellDef,
      MatRowDef,
      MatHeaderCell,
      MatCell,
      MatHeaderRow,
      MatRow,
      MatInputModule,
      MatInput,
      MatFormField,
      MatLabel,
      MatPrefix,
      MatFormFieldModule,
      MatButtonModule,
      MatButton,
      MatIconButton,
      MatIconModule,
      MatIcon,
      MatCardModule,
      MatCard,
      MatCardContent,
      MatChipsModule,
      MatChip,
      MatProgressSpinnerModule,
      MatProgressSpinner
    ], styles: ["\n\n.search-field[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 400px;\n  margin-bottom: 16px;\n}\n.w-full[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.clickable-row[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.clickable-row[_ngcontent-%COMP%]:hover {\n  background: #f5f5f5;\n}\n/*# sourceMappingURL=patient-list.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PatientListComponent, { className: "PatientListComponent", filePath: "src\\app\\modules\\patient\\patient-list\\patient-list.component.ts", lineNumber: 104 });
})();
export {
  PatientListComponent
};
//# sourceMappingURL=chunk-J56XPP3H.js.map
