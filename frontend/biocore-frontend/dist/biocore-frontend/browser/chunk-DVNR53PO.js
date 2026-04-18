import {
  NotificationService
} from "./chunk-4BLU4O7B.js";
import "./chunk-SRE6VCYJ.js";
import {
  MedicineService,
  PrescriptionService
} from "./chunk-6SNY3ZGW.js";
import {
  MatTabsModule
} from "./chunk-IFA7BXQN.js";
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
} from "./chunk-SMV43QNY.js";
import {
  MatChipsModule
} from "./chunk-PA55PL57.js";
import "./chunk-MHA7Y7AJ.js";
import "./chunk-QEMZUU6G.js";
import "./chunk-2J4O7HWV.js";
import "./chunk-EURQNLKS.js";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardSubtitle,
  MatCardTitle
} from "./chunk-ZXMIIXBI.js";
import {
  MatButton,
  MatButtonModule,
  MatIcon,
  MatIconButton,
  MatIconModule
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
  ɵɵclassProp,
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
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3
} from "./chunk-XHW7K2DC.js";

// src/app/modules/pharmacy/pharmacy.component.ts
function PharmacyComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275listener("click", function PharmacyComponent_div_11_Template_div_click_0_listener() {
      const p_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectPrescription(p_r2));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "receipt_long");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "div", 21);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 22);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 22);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "span", 23);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("selected", (ctx_r2.selectedPrescription == null ? null : ctx_r2.selectedPrescription.id) === p_r2.id);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(p_r2.patientName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("Receta #", p_r2.id, " \xB7 ", p_r2.items.length, " \xEDtem(s)");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(10, 9, p_r2.createdAt, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r2.getStatusClass(p_r2.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", p_r2.status, " ");
  }
}
function PharmacyComponent_p_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 24);
    \u0275\u0275text(1, "Sin recetas pendientes");
    \u0275\u0275elementEnd();
  }
}
function PharmacyComponent_mat_card_14_div_7_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 39);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r5.medicine == null ? null : item_r5.medicine.code);
  }
}
function PharmacyComponent_mat_card_14_div_7_span_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \xB7 ", item_r5.dosage, "");
  }
}
function PharmacyComponent_mat_card_14_div_7_span_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 40);
    \u0275\u0275text(1, " \u26A0 Stock insuficiente (RN-F01) ");
    \u0275\u0275elementEnd();
  }
}
function PharmacyComponent_mat_card_14_div_7_mat_icon_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 41);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function PharmacyComponent_mat_card_14_div_7_button_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 42);
    \u0275\u0275listener("click", function PharmacyComponent_mat_card_14_div_7_button_16_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const item_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.toggleCartItem(item_r5.id));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", ctx_r2.cartItems.has(item_r5.id) ? "#1565c0" : "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.cartItems.has(item_r5.id) ? "shopping_cart" : "add_shopping_cart", " ");
  }
}
function PharmacyComponent_mat_card_14_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "div", 30)(2, "div", 31);
    \u0275\u0275template(3, PharmacyComponent_mat_card_14_div_7_span_3_Template, 2, 1, "span", 32);
    \u0275\u0275elementStart(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 33);
    \u0275\u0275text(7);
    \u0275\u0275template(8, PharmacyComponent_mat_card_14_div_7_span_8_Template, 2, 1, "span", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 34);
    \u0275\u0275text(10, " Stock disponible: ");
    \u0275\u0275elementStart(11, "strong");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275template(13, PharmacyComponent_mat_card_14_div_7_span_13_Template, 2, 0, "span", 35);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 36);
    \u0275\u0275template(15, PharmacyComponent_mat_card_14_div_7_mat_icon_15_Template, 2, 0, "mat-icon", 37)(16, PharmacyComponent_mat_card_14_div_7_button_16_Template, 3, 3, "button", 38);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_8_0;
    const item_r5 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", item_r5.medicine == null ? null : item_r5.medicine.code);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r5.medicine == null ? null : item_r5.medicine.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3(" ", item_r5.medicine == null ? null : item_r5.medicine.presentation, " \xB7 Cantidad: ", item_r5.quantity, " ", item_r5.medicine == null ? null : item_r5.medicine.unit, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r5.dosage);
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("color", item_r5.medicine && item_r5.medicine.stock >= item_r5.quantity ? "#2e7d32" : "#c62828");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (tmp_8_0 = item_r5.medicine == null ? null : item_r5.medicine.stock) !== null && tmp_8_0 !== void 0 ? tmp_8_0 : 0, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r5.medicine && item_r5.medicine.stock < item_r5.quantity);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", item_r5.dispatched);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !item_r5.dispatched && item_r5.medicine && item_r5.medicine.stock >= item_r5.quantity);
  }
}
function PharmacyComponent_mat_card_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card")(1, "mat-card-header")(2, "mat-card-title");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "mat-card-subtitle");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "mat-card-content");
    \u0275\u0275template(7, PharmacyComponent_mat_card_14_div_7_Template, 17, 12, "div", 25);
    \u0275\u0275elementStart(8, "div", 26)(9, "div", 27)(10, "mat-icon");
    \u0275\u0275text(11, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275text(12, " Los medicamentos solo se despachan tras confirmar el pago. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 28);
    \u0275\u0275listener("click", function PharmacyComponent_mat_card_14_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.dispatch());
    });
    \u0275\u0275elementStart(14, "mat-icon");
    \u0275\u0275text(15, "local_shipping");
    \u0275\u0275elementEnd();
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Detalle de Receta #", ctx_r2.selectedPrescription.id, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Paciente: ", ctx_r2.selectedPrescription.patientName, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r2.selectedPrescription.items);
    \u0275\u0275advance(6);
    \u0275\u0275property("disabled", ctx_r2.cartItems.size === 0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" Despachar Seleccionados (", ctx_r2.cartItems.size, ") ");
  }
}
function PharmacyComponent_mat_card_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 43)(1, "mat-icon", 44);
    \u0275\u0275text(2, "medication");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Seleccione una receta de la lista");
    \u0275\u0275elementEnd()();
  }
}
function PharmacyComponent_th_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 45);
    \u0275\u0275text(1, "C\xF3digo");
    \u0275\u0275elementEnd();
  }
}
function PharmacyComponent_td_24_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 39);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(m_r7.code);
  }
}
function PharmacyComponent_td_24_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 48);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function PharmacyComponent_td_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 46);
    \u0275\u0275template(1, PharmacyComponent_td_24_span_1_Template, 2, 1, "span", 32)(2, PharmacyComponent_td_24_span_2_Template, 2, 0, "span", 47);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", m_r7.code);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !m_r7.code);
  }
}
function PharmacyComponent_th_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 45);
    \u0275\u0275text(1, "Medicamento");
    \u0275\u0275elementEnd();
  }
}
function PharmacyComponent_td_27_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(m_r8.presentation);
  }
}
function PharmacyComponent_td_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 46)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, PharmacyComponent_td_27_div_3_Template, 2, 1, "div", 49);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r8 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r8.name);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", m_r8.presentation);
  }
}
function PharmacyComponent_th_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 45);
    \u0275\u0275text(1, "Categor\xEDa");
    \u0275\u0275elementEnd();
  }
}
function PharmacyComponent_td_30_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 52);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(m_r9.category);
  }
}
function PharmacyComponent_td_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 46);
    \u0275\u0275template(1, PharmacyComponent_td_30_span_1_Template, 2, 1, "span", 51);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", m_r9.category);
  }
}
function PharmacyComponent_th_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 45);
    \u0275\u0275text(1, "Stock");
    \u0275\u0275elementEnd();
  }
}
function PharmacyComponent_td_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 46)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 53);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const m_r10 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classProp("stock-low", m_r10.stock <= 10)("stock-ok", m_r10.stock > 10);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", m_r10.stock, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r10.unit);
  }
}
function PharmacyComponent_th_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 45);
    \u0275\u0275text(1, "Precio");
    \u0275\u0275elementEnd();
  }
}
function PharmacyComponent_td_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 46);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r11 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Q", m_r11.price, "");
  }
}
function PharmacyComponent_tr_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 54);
  }
}
function PharmacyComponent_tr_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 55);
  }
}
var PharmacyComponent = class _PharmacyComponent {
  constructor(prescriptionService, medicineService, notification) {
    this.prescriptionService = prescriptionService;
    this.medicineService = medicineService;
    this.notification = notification;
    this.prescriptions = [];
    this.selectedPrescription = null;
    this.medicines = [];
    this.cartItems = /* @__PURE__ */ new Set();
    this.inventoryColumns = ["code", "name", "category", "stock", "price"];
  }
  ngOnInit() {
    this.load();
    this.medicineService.getAll().subscribe({
      next: (res) => {
        if (res.success)
          this.medicines = res.data;
      },
      error: () => {
      }
    });
  }
  load() {
    this.prescriptionService.getPendingForPharmacy().subscribe({
      next: (res) => {
        if (res.success)
          this.prescriptions = res.data;
      },
      error: () => this.notification.error("Error al cargar recetas. Verifique su rol (se requiere FARMAC\xC9UTICO).")
    });
  }
  selectPrescription(p) {
    this.selectedPrescription = p;
    this.cartItems.clear();
  }
  toggleCartItem(itemId) {
    if (this.cartItems.has(itemId)) {
      this.cartItems.delete(itemId);
    } else {
      this.cartItems.add(itemId);
    }
  }
  dispatch() {
    if (!this.selectedPrescription)
      return;
    const itemIds = Array.from(this.cartItems);
    this.prescriptionService.dispatch(this.selectedPrescription.id, itemIds).subscribe({
      next: (res) => {
        if (res.success) {
          this.notification.success("Medicamentos despachados exitosamente");
          this.cartItems.clear();
          this.load();
          this.selectedPrescription = null;
        }
      },
      error: () => this.notification.error("Error al despachar (RN-F01: Verifique stock)")
    });
  }
  getStatusClass(status) {
    const map = {
      "PENDING": "status-waiting",
      "DISPATCHED": "status-completed",
      "PARTIALLY_DISPATCHED": "status-being-called",
      "NOT_DISPATCHED": "status-absent"
    };
    return map[status] || "";
  }
  static {
    this.\u0275fac = function PharmacyComponent_Factory(t) {
      return new (t || _PharmacyComponent)(\u0275\u0275directiveInject(PrescriptionService), \u0275\u0275directiveInject(MedicineService), \u0275\u0275directiveInject(NotificationService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PharmacyComponent, selectors: [["app-pharmacy"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 39, vars: 7, consts: [[1, "page-container"], [1, "page-header"], [1, "pharmacy-layout"], [1, "prescriptions-panel"], ["class", "prescription-item", 3, "selected", "click", 4, "ngFor", "ngForOf"], ["class", "empty-msg", 4, "ngIf"], [1, "prescription-detail"], [4, "ngIf"], ["class", "empty-panel", 4, "ngIf"], [1, "mt-24"], ["mat-table", "", 3, "dataSource"], ["matColumnDef", "code"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "name"], ["matColumnDef", "category"], ["matColumnDef", "stock"], ["matColumnDef", "price"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], [1, "prescription-item", 3, "click"], [1, "patient-name"], [1, "rx-meta"], [2, "padding", "2px 8px", "border-radius", "8px", "font-size", "0.75rem"], [1, "empty-msg"], ["class", "medicine-item", 4, "ngFor", "ngForOf"], [1, "dispatch-actions"], [1, "payment-note"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], [1, "medicine-item"], [1, "medicine-info"], [1, "medicine-header"], ["class", "med-code", 4, "ngIf"], [1, "medicine-meta"], [1, "stock-info"], ["class", "stock-warn", 4, "ngIf"], [1, "item-actions"], ["style", "color:#2e7d32", 4, "ngIf"], ["mat-icon-button", "", "color", "primary", 3, "click", 4, "ngIf"], [1, "med-code"], [1, "stock-warn"], [2, "color", "#2e7d32"], ["mat-icon-button", "", "color", "primary", 3, "click"], [1, "empty-panel"], [1, "big-icon"], ["mat-header-cell", ""], ["mat-cell", ""], ["style", "color:#bbb", 4, "ngIf"], [2, "color", "#bbb"], ["class", "med-presentation", 4, "ngIf"], [1, "med-presentation"], ["class", "category-chip", 4, "ngIf"], [1, "category-chip"], [2, "font-size", "0.8rem", "color", "#888"], ["mat-header-row", ""], ["mat-row", ""]], template: function PharmacyComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
        \u0275\u0275text(3, "Farmacia");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(4, "div", 2)(5, "div", 3)(6, "mat-card")(7, "mat-card-header")(8, "mat-card-title");
        \u0275\u0275text(9, "Recetas Pendientes");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(10, "mat-card-content");
        \u0275\u0275template(11, PharmacyComponent_div_11_Template, 13, 12, "div", 4)(12, PharmacyComponent_p_12_Template, 2, 0, "p", 5);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(13, "div", 6);
        \u0275\u0275template(14, PharmacyComponent_mat_card_14_Template, 17, 5, "mat-card", 7)(15, PharmacyComponent_mat_card_15_Template, 5, 0, "mat-card", 8);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(16, "mat-card", 9)(17, "mat-card-header")(18, "mat-card-title");
        \u0275\u0275text(19, "Inventario de Medicamentos");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(20, "mat-card-content")(21, "table", 10);
        \u0275\u0275elementContainerStart(22, 11);
        \u0275\u0275template(23, PharmacyComponent_th_23_Template, 2, 0, "th", 12)(24, PharmacyComponent_td_24_Template, 3, 2, "td", 13);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(25, 14);
        \u0275\u0275template(26, PharmacyComponent_th_26_Template, 2, 0, "th", 12)(27, PharmacyComponent_td_27_Template, 4, 2, "td", 13);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(28, 15);
        \u0275\u0275template(29, PharmacyComponent_th_29_Template, 2, 0, "th", 12)(30, PharmacyComponent_td_30_Template, 2, 1, "td", 13);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(31, 16);
        \u0275\u0275template(32, PharmacyComponent_th_32_Template, 2, 0, "th", 12)(33, PharmacyComponent_td_33_Template, 5, 6, "td", 13);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(34, 17);
        \u0275\u0275template(35, PharmacyComponent_th_35_Template, 2, 0, "th", 12)(36, PharmacyComponent_td_36_Template, 2, 1, "td", 13);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275template(37, PharmacyComponent_tr_37_Template, 1, 0, "tr", 18)(38, PharmacyComponent_tr_38_Template, 1, 0, "tr", 19);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(11);
        \u0275\u0275property("ngForOf", ctx.prescriptions);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.prescriptions.length === 0);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.selectedPrescription);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.selectedPrescription);
        \u0275\u0275advance(6);
        \u0275\u0275property("dataSource", ctx.medicines);
        \u0275\u0275advance(16);
        \u0275\u0275property("matHeaderRowDef", ctx.inventoryColumns);
        \u0275\u0275advance();
        \u0275\u0275property("matRowDefColumns", ctx.inventoryColumns);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, DatePipe, MatCardModule, MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle, MatButtonModule, MatButton, MatIconButton, MatIconModule, MatIcon, MatTabsModule, MatTableModule, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatChipsModule], styles: ["\n\n.pharmacy-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 320px 1fr;\n  gap: 24px;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.6rem;\n  font-weight: 500;\n  color: #1565c0;\n  margin: 0;\n}\n.prescription-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  padding: 12px;\n  border-radius: 8px;\n  cursor: pointer;\n  border: 2px solid transparent;\n  margin-bottom: 8px;\n  transition: all 0.2s;\n}\n.prescription-item[_ngcontent-%COMP%]:hover {\n  background: #f5f5f5;\n}\n.prescription-item.selected[_ngcontent-%COMP%] {\n  border-color: #1565c0;\n  background: #e3f2fd;\n}\n.patient-name[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n.rx-meta[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #757575;\n}\n.medicine-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  padding: 12px;\n  border-radius: 8px;\n  margin-bottom: 8px;\n  background: #f8f9ff;\n}\n.medicine-meta[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #555;\n  margin: 4px 0;\n}\n.stock-info[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n}\n.stock-warn[_ngcontent-%COMP%] {\n  color: #c62828;\n  font-weight: 500;\n  margin-left: 4px;\n}\n.dispatch-actions[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.payment-note[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  background: #d0f4ef;\n  padding: 8px 12px;\n  border-radius: 8px;\n  font-size: 0.85rem;\n  color: #1D6C61;\n}\n.empty-panel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 60px;\n}\n.big-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  color: #3EB9A8;\n  margin-bottom: 16px;\n  opacity: 0.5;\n}\n.empty-msg[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #9e9e9e;\n  padding: 24px;\n}\n.mt-24[_ngcontent-%COMP%] {\n  margin-top: 24px;\n}\n.item-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.med-code[_ngcontent-%COMP%] {\n  font-family: monospace;\n  font-size: 0.75rem;\n  color: #1D6C61;\n  background: #d0f4ef;\n  padding: 1px 6px;\n  border-radius: 4px;\n  margin-right: 6px;\n}\n.med-presentation[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: #777;\n  margin-top: 2px;\n}\n.medicine-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  margin-bottom: 2px;\n}\n.category-chip[_ngcontent-%COMP%] {\n  background: #e8f5f3;\n  color: #1D6C61;\n  padding: 2px 8px;\n  border-radius: 8px;\n  font-size: 0.78rem;\n}\n.stock-low[_ngcontent-%COMP%] {\n  color: #c62828;\n  font-weight: 700;\n}\n.stock-ok[_ngcontent-%COMP%] {\n  color: #2e7d32;\n}\n/*# sourceMappingURL=pharmacy.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PharmacyComponent, { className: "PharmacyComponent", filePath: "src\\app\\modules\\pharmacy\\pharmacy.component.ts", lineNumber: 194 });
})();
export {
  PharmacyComponent
};
//# sourceMappingURL=chunk-DVNR53PO.js.map
