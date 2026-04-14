import {
  AuthService
} from "./chunk-N3CSS5F2.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-AY5RGERM.js";
import {
  Router,
  RouterLink
} from "./chunk-ZOTSATNJ.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-KK4M4ZLY.js";
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
  MatPrefix,
  MatSuffix
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
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardSubtitle,
  MatCardTitle
} from "./chunk-IVAI7UHG.js";
import {
  CommonModule,
  MatAnchor,
  MatButton,
  MatButtonModule,
  MatIcon,
  MatIconButton,
  MatIconModule,
  NgIf,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-R33V2XU6.js";

// src/app/modules/portal/login/login.component.ts
function LoginComponent_div_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "mat-icon");
    \u0275\u0275text(2, "error_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.errorMessage, " ");
  }
}
function LoginComponent_mat_error_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Usuario es requerido ");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_mat_error_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Contrase\xF1a es requerida ");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_mat_spinner_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 21);
  }
}
function LoginComponent_mat_icon_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "login");
    \u0275\u0275elementEnd();
  }
}
var LoginComponent = class _LoginComponent {
  constructor(fb, authService, router) {
    this.fb = fb;
    this.authService = authService;
    this.router = router;
    this.loading = false;
    this.errorMessage = "";
    this.hidePassword = true;
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
    if (this.authService.isLoggedIn()) {
      this.router.navigate(["/dashboard"]);
    }
  }
  onSubmit() {
    if (this.loginForm.invalid)
      return;
    this.loading = true;
    this.errorMessage = "";
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        if (res.success) {
          this.router.navigate(["/dashboard"]);
        } else {
          this.errorMessage = "Usuario o contrase\xF1a inv\xE1lidos. Intente de nuevo.";
        }
        this.loading = false;
      },
      error: () => {
        this.errorMessage = "Usuario o contrase\xF1a inv\xE1lidos. Intente de nuevo.";
        this.loading = false;
      }
    });
  }
  static {
    this.\u0275fac = function LoginComponent_Factory(t) {
      return new (t || _LoginComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 63, vars: 10, consts: [[1, "login-page"], [1, "login-left"], [1, "login-brand"], [1, "brand-icon"], [1, "login-features"], [1, "feature"], [1, "login-right"], [1, "login-card"], ["mat-card-avatar", ""], ["class", "error-alert", 4, "ngIf"], [3, "ngSubmit", "formGroup"], ["appearance", "outline", 1, "full-width"], ["matPrefix", ""], ["matInput", "", "formControlName", "username", "placeholder", "Ingresa tu usuario", "autocomplete", "username"], [4, "ngIf"], ["matInput", "", "formControlName", "password", "placeholder", "Ingresa tu contrase\xF1a", "autocomplete", "current-password", 3, "type"], ["mat-icon-button", "", "matSuffix", "", "type", "button", 3, "click"], ["mat-raised-button", "", "color", "primary", "type", "submit", 1, "full-width", "submit-btn", 3, "disabled"], ["diameter", "20", 4, "ngIf"], ["mat-button", "", "routerLink", "/portal"], [1, "error-alert"], ["diameter", "20"]], template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "mat-icon", 3);
        \u0275\u0275text(4, "local_hospital");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "h1");
        \u0275\u0275text(6, "BioCore Medical");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "p");
        \u0275\u0275text(8, "Sistema Integral de Gesti\xF3n Hospitalaria");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "div", 4)(10, "div", 5)(11, "mat-icon");
        \u0275\u0275text(12, "security");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "span");
        \u0275\u0275text(14, "Acceso seguro con JWT");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(15, "div", 5)(16, "mat-icon");
        \u0275\u0275text(17, "speed");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "span");
        \u0275\u0275text(19, "Atenci\xF3n r\xE1pida y eficiente");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(20, "div", 5)(21, "mat-icon");
        \u0275\u0275text(22, "medical_services");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "span");
        \u0275\u0275text(24, "Gesti\xF3n completa de pacientes");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(25, "div", 6)(26, "mat-card", 7)(27, "mat-card-header")(28, "mat-icon", 8);
        \u0275\u0275text(29, "lock");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "mat-card-title");
        \u0275\u0275text(31, "Iniciar Sesi\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "mat-card-subtitle");
        \u0275\u0275text(33, "Ingresa tus credenciales de acceso");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(34, "mat-card-content");
        \u0275\u0275template(35, LoginComponent_div_35_Template, 4, 1, "div", 9);
        \u0275\u0275elementStart(36, "form", 10);
        \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_36_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275elementStart(37, "mat-form-field", 11)(38, "mat-label");
        \u0275\u0275text(39, "Usuario");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(40, "mat-icon", 12);
        \u0275\u0275text(41, "person");
        \u0275\u0275elementEnd();
        \u0275\u0275element(42, "input", 13);
        \u0275\u0275template(43, LoginComponent_mat_error_43_Template, 2, 0, "mat-error", 14);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(44, "mat-form-field", 11)(45, "mat-label");
        \u0275\u0275text(46, "Contrase\xF1a");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(47, "mat-icon", 12);
        \u0275\u0275text(48, "lock");
        \u0275\u0275elementEnd();
        \u0275\u0275element(49, "input", 15);
        \u0275\u0275elementStart(50, "button", 16);
        \u0275\u0275listener("click", function LoginComponent_Template_button_click_50_listener() {
          return ctx.hidePassword = !ctx.hidePassword;
        });
        \u0275\u0275elementStart(51, "mat-icon");
        \u0275\u0275text(52);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(53, LoginComponent_mat_error_53_Template, 2, 0, "mat-error", 14);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(54, "button", 17);
        \u0275\u0275template(55, LoginComponent_mat_spinner_55_Template, 1, 0, "mat-spinner", 18)(56, LoginComponent_mat_icon_56_Template, 2, 0, "mat-icon", 14);
        \u0275\u0275text(57);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(58, "mat-card-actions")(59, "a", 19)(60, "mat-icon");
        \u0275\u0275text(61, "arrow_back");
        \u0275\u0275elementEnd();
        \u0275\u0275text(62, " Volver al Portal ");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        let tmp_2_0;
        let tmp_5_0;
        \u0275\u0275advance(35);
        \u0275\u0275property("ngIf", ctx.errorMessage);
        \u0275\u0275advance();
        \u0275\u0275property("formGroup", ctx.loginForm);
        \u0275\u0275advance(7);
        \u0275\u0275property("ngIf", (tmp_2_0 = ctx.loginForm.get("username")) == null ? null : tmp_2_0.hasError("required"));
        \u0275\u0275advance(6);
        \u0275\u0275property("type", ctx.hidePassword ? "password" : "text");
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.hidePassword ? "visibility" : "visibility_off");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", (tmp_5_0 = ctx.loginForm.get("password")) == null ? null : tmp_5_0.hasError("required"));
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.loginForm.invalid || ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.loading ? "Ingresando..." : "Ingresar", " ");
      }
    }, dependencies: [
      CommonModule,
      NgIf,
      ReactiveFormsModule,
      \u0275NgNoValidate,
      DefaultValueAccessor,
      NgControlStatus,
      NgControlStatusGroup,
      FormGroupDirective,
      FormControlName,
      RouterLink,
      MatCardModule,
      MatCard,
      MatCardActions,
      MatCardAvatar,
      MatCardContent,
      MatCardHeader,
      MatCardSubtitle,
      MatCardTitle,
      MatFormFieldModule,
      MatFormField,
      MatLabel,
      MatError,
      MatPrefix,
      MatSuffix,
      MatInputModule,
      MatInput,
      MatButtonModule,
      MatAnchor,
      MatButton,
      MatIconButton,
      MatIconModule,
      MatIcon,
      MatProgressSpinnerModule,
      MatProgressSpinner
    ], styles: ["\n\n.login-page[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n}\n.login-left[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  background:\n    linear-gradient(\n      135deg,\n      #1a237e,\n      #1565c0);\n  color: white;\n  padding: 60px 40px;\n}\n.login-brand[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 48px;\n}\n.brand-icon[_ngcontent-%COMP%] {\n  font-size: 80px;\n  width: 80px;\n  height: 80px;\n  color: #64b5f6;\n  margin-bottom: 16px;\n}\n.login-brand[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 700;\n  margin-bottom: 8px;\n}\n.login-brand[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.75);\n  font-size: 1rem;\n}\n.login-features[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.feature[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  font-size: 1rem;\n}\n.feature[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #64b5f6;\n}\n.login-right[_ngcontent-%COMP%] {\n  flex: 0 0 440px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #f5f7fa;\n  padding: 40px;\n}\n.login-card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 380px;\n  padding: 8px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-bottom: 8px;\n}\n.submit-btn[_ngcontent-%COMP%] {\n  height: 48px;\n  font-size: 1rem;\n  margin-top: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n}\n.error-alert[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  background: #ffebee;\n  color: #c62828;\n  border-radius: 8px;\n  padding: 12px 16px;\n  margin-bottom: 16px;\n  font-size: 0.9rem;\n}\n@media (max-width: 768px) {\n  .login-left[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .login-right[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n}\n/*# sourceMappingURL=login.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src\\app\\modules\\portal\\login\\login.component.ts", lineNumber: 129 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-4UMIVOJE.js.map
