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
  MatTab,
  MatTabGroup,
  MatTabLabel,
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
import {
  ClinicService
} from "./chunk-VSICXZFN.js";
import {
  UserService
} from "./chunk-LDLLK6DA.js";
import "./chunk-MHA7Y7AJ.js";
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatHint,
  MatLabel
} from "./chunk-QEMZUU6G.js";
import {
  CheckboxRequiredValidator,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  MaxValidator,
  MinValidator,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
  NumberValueAccessor,
  RangeValueAccessor,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
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
import {
  FocusMonitor,
  MatButton,
  MatButtonModule,
  MatCommonModule,
  MatIcon,
  MatIconButton,
  MatIconModule,
  MatOption,
  MatRipple,
  _MatInternalFormField
} from "./chunk-KREJ5GPI.js";
import {
  ANIMATION_MODULE_TYPE,
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  CommonModule,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  InputFlags,
  NgForOf,
  NgIf,
  NgModule,
  Optional,
  Output,
  ViewChild,
  ViewEncapsulation$1,
  __spreadValues,
  booleanAttribute,
  forwardRef,
  numberAttribute,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵInheritDefinitionFeature,
  ɵɵInputTransformsFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵhostProperty,
  ɵɵinjectAttribute,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-XHW7K2DC.js";

// node_modules/@angular/material/fesm2022/slide-toggle.mjs
var _c0 = ["switch"];
var _c1 = ["*"];
function MatSlideToggle_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 12);
    \u0275\u0275element(2, "path", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "svg", 14);
    \u0275\u0275element(4, "path", 15);
    \u0275\u0275elementEnd()();
  }
}
var MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS = new InjectionToken("mat-slide-toggle-default-options", {
  providedIn: "root",
  factory: () => ({
    disableToggleValue: false,
    hideIcon: false
  })
});
var MAT_SLIDE_TOGGLE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MatSlideToggle),
  multi: true
};
var MatSlideToggleChange = class {
  constructor(source, checked) {
    this.source = source;
    this.checked = checked;
  }
};
var nextUniqueId = 0;
var MatSlideToggle = class _MatSlideToggle {
  _createChangeEvent(isChecked) {
    return new MatSlideToggleChange(this, isChecked);
  }
  /** Returns the unique id for the visual hidden button. */
  get buttonId() {
    return `${this.id || this._uniqueId}-button`;
  }
  /** Focuses the slide-toggle. */
  focus() {
    this._switchElement.nativeElement.focus();
  }
  /** Whether the slide-toggle element is checked or not. */
  get checked() {
    return this._checked;
  }
  set checked(value) {
    this._checked = value;
    this._changeDetectorRef.markForCheck();
  }
  /** Returns the unique id for the visual hidden input. */
  get inputId() {
    return `${this.id || this._uniqueId}-input`;
  }
  constructor(_elementRef, _focusMonitor, _changeDetectorRef, tabIndex, defaults, animationMode) {
    this._elementRef = _elementRef;
    this._focusMonitor = _focusMonitor;
    this._changeDetectorRef = _changeDetectorRef;
    this.defaults = defaults;
    this._onChange = (_) => {
    };
    this._onTouched = () => {
    };
    this._validatorOnChange = () => {
    };
    this._checked = false;
    this.name = null;
    this.labelPosition = "after";
    this.ariaLabel = null;
    this.ariaLabelledby = null;
    this.disabled = false;
    this.disableRipple = false;
    this.tabIndex = 0;
    this.change = new EventEmitter();
    this.toggleChange = new EventEmitter();
    this.tabIndex = parseInt(tabIndex) || 0;
    this.color = defaults.color || "accent";
    this._noopAnimations = animationMode === "NoopAnimations";
    this.id = this._uniqueId = `mat-mdc-slide-toggle-${++nextUniqueId}`;
    this.hideIcon = defaults.hideIcon ?? false;
    this._labelId = this._uniqueId + "-label";
  }
  ngAfterContentInit() {
    this._focusMonitor.monitor(this._elementRef, true).subscribe((focusOrigin) => {
      if (focusOrigin === "keyboard" || focusOrigin === "program") {
        this._focused = true;
        this._changeDetectorRef.markForCheck();
      } else if (!focusOrigin) {
        Promise.resolve().then(() => {
          this._focused = false;
          this._onTouched();
          this._changeDetectorRef.markForCheck();
        });
      }
    });
  }
  ngOnChanges(changes) {
    if (changes["required"]) {
      this._validatorOnChange();
    }
  }
  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._elementRef);
  }
  /** Implemented as part of ControlValueAccessor. */
  writeValue(value) {
    this.checked = !!value;
  }
  /** Implemented as part of ControlValueAccessor. */
  registerOnChange(fn) {
    this._onChange = fn;
  }
  /** Implemented as part of ControlValueAccessor. */
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  /** Implemented as a part of Validator. */
  validate(control) {
    return this.required && control.value !== true ? {
      "required": true
    } : null;
  }
  /** Implemented as a part of Validator. */
  registerOnValidatorChange(fn) {
    this._validatorOnChange = fn;
  }
  /** Implemented as a part of ControlValueAccessor. */
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
    this._changeDetectorRef.markForCheck();
  }
  /** Toggles the checked state of the slide-toggle. */
  toggle() {
    this.checked = !this.checked;
    this._onChange(this.checked);
  }
  /**
   * Emits a change event on the `change` output. Also notifies the FormControl about the change.
   */
  _emitChangeEvent() {
    this._onChange(this.checked);
    this.change.emit(this._createChangeEvent(this.checked));
  }
  /** Method being called whenever the underlying button is clicked. */
  _handleClick() {
    this.toggleChange.emit();
    if (!this.defaults.disableToggleValue) {
      this.checked = !this.checked;
      this._onChange(this.checked);
      this.change.emit(new MatSlideToggleChange(this, this.checked));
    }
  }
  _getAriaLabelledBy() {
    if (this.ariaLabelledby) {
      return this.ariaLabelledby;
    }
    return this.ariaLabel ? null : this._labelId;
  }
  static {
    this.\u0275fac = function MatSlideToggle_Factory(t) {
      return new (t || _MatSlideToggle)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(FocusMonitor), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275injectAttribute("tabindex"), \u0275\u0275directiveInject(MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS), \u0275\u0275directiveInject(ANIMATION_MODULE_TYPE, 8));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MatSlideToggle,
      selectors: [["mat-slide-toggle"]],
      viewQuery: function MatSlideToggle_Query(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275viewQuery(_c0, 5);
        }
        if (rf & 2) {
          let _t;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._switchElement = _t.first);
        }
      },
      hostAttrs: [1, "mat-mdc-slide-toggle"],
      hostVars: 13,
      hostBindings: function MatSlideToggle_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275hostProperty("id", ctx.id);
          \u0275\u0275attribute("tabindex", null)("aria-label", null)("name", null)("aria-labelledby", null);
          \u0275\u0275classMap(ctx.color ? "mat-" + ctx.color : "");
          \u0275\u0275classProp("mat-mdc-slide-toggle-focused", ctx._focused)("mat-mdc-slide-toggle-checked", ctx.checked)("_mat-animation-noopable", ctx._noopAnimations);
        }
      },
      inputs: {
        name: "name",
        id: "id",
        labelPosition: "labelPosition",
        ariaLabel: [InputFlags.None, "aria-label", "ariaLabel"],
        ariaLabelledby: [InputFlags.None, "aria-labelledby", "ariaLabelledby"],
        ariaDescribedby: [InputFlags.None, "aria-describedby", "ariaDescribedby"],
        required: [InputFlags.HasDecoratorInputTransform, "required", "required", booleanAttribute],
        color: "color",
        disabled: [InputFlags.HasDecoratorInputTransform, "disabled", "disabled", booleanAttribute],
        disableRipple: [InputFlags.HasDecoratorInputTransform, "disableRipple", "disableRipple", booleanAttribute],
        tabIndex: [InputFlags.HasDecoratorInputTransform, "tabIndex", "tabIndex", (value) => value == null ? 0 : numberAttribute(value)],
        checked: [InputFlags.HasDecoratorInputTransform, "checked", "checked", booleanAttribute],
        hideIcon: [InputFlags.HasDecoratorInputTransform, "hideIcon", "hideIcon", booleanAttribute]
      },
      outputs: {
        change: "change",
        toggleChange: "toggleChange"
      },
      exportAs: ["matSlideToggle"],
      standalone: true,
      features: [\u0275\u0275ProvidersFeature([MAT_SLIDE_TOGGLE_VALUE_ACCESSOR, {
        provide: NG_VALIDATORS,
        useExisting: _MatSlideToggle,
        multi: true
      }]), \u0275\u0275InputTransformsFeature, \u0275\u0275NgOnChangesFeature, \u0275\u0275StandaloneFeature],
      ngContentSelectors: _c1,
      decls: 13,
      vars: 24,
      consts: [["switch", ""], ["mat-internal-form-field", "", 3, "labelPosition"], ["role", "switch", "type", "button", 1, "mdc-switch", 3, "click", "tabIndex", "disabled"], [1, "mdc-switch__track"], [1, "mdc-switch__handle-track"], [1, "mdc-switch__handle"], [1, "mdc-switch__shadow"], [1, "mdc-elevation-overlay"], [1, "mdc-switch__ripple"], ["mat-ripple", "", 1, "mat-mdc-slide-toggle-ripple", "mat-mdc-focus-indicator", 3, "matRippleTrigger", "matRippleDisabled", "matRippleCentered"], [1, "mdc-switch__icons"], [1, "mdc-label", 3, "click", "for"], ["viewBox", "0 0 24 24", "aria-hidden", "true", 1, "mdc-switch__icon", "mdc-switch__icon--on"], ["d", "M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z"], ["viewBox", "0 0 24 24", "aria-hidden", "true", 1, "mdc-switch__icon", "mdc-switch__icon--off"], ["d", "M20 13H4v-2h16v2z"]],
      template: function MatSlideToggle_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = \u0275\u0275getCurrentView();
          \u0275\u0275projectionDef();
          \u0275\u0275elementStart(0, "div", 1)(1, "button", 2, 0);
          \u0275\u0275listener("click", function MatSlideToggle_Template_button_click_1_listener() {
            \u0275\u0275restoreView(_r1);
            return \u0275\u0275resetView(ctx._handleClick());
          });
          \u0275\u0275element(3, "div", 3);
          \u0275\u0275elementStart(4, "div", 4)(5, "div", 5)(6, "div", 6);
          \u0275\u0275element(7, "div", 7);
          \u0275\u0275elementEnd();
          \u0275\u0275elementStart(8, "div", 8);
          \u0275\u0275element(9, "div", 9);
          \u0275\u0275elementEnd();
          \u0275\u0275template(10, MatSlideToggle_Conditional_10_Template, 5, 0, "div", 10);
          \u0275\u0275elementEnd()()();
          \u0275\u0275elementStart(11, "label", 11);
          \u0275\u0275listener("click", function MatSlideToggle_Template_label_click_11_listener($event) {
            \u0275\u0275restoreView(_r1);
            return \u0275\u0275resetView($event.stopPropagation());
          });
          \u0275\u0275projection(12);
          \u0275\u0275elementEnd()();
        }
        if (rf & 2) {
          const switch_r2 = \u0275\u0275reference(2);
          \u0275\u0275property("labelPosition", ctx.labelPosition);
          \u0275\u0275advance();
          \u0275\u0275classProp("mdc-switch--selected", ctx.checked)("mdc-switch--unselected", !ctx.checked)("mdc-switch--checked", ctx.checked)("mdc-switch--disabled", ctx.disabled);
          \u0275\u0275property("tabIndex", ctx.disabled ? -1 : ctx.tabIndex)("disabled", ctx.disabled);
          \u0275\u0275attribute("id", ctx.buttonId)("name", ctx.name)("aria-label", ctx.ariaLabel)("aria-labelledby", ctx._getAriaLabelledBy())("aria-describedby", ctx.ariaDescribedby)("aria-required", ctx.required || null)("aria-checked", ctx.checked);
          \u0275\u0275advance(8);
          \u0275\u0275property("matRippleTrigger", switch_r2)("matRippleDisabled", ctx.disableRipple || ctx.disabled)("matRippleCentered", true);
          \u0275\u0275advance();
          \u0275\u0275conditional(10, !ctx.hideIcon ? 10 : -1);
          \u0275\u0275advance();
          \u0275\u0275property("for", ctx.buttonId);
          \u0275\u0275attribute("id", ctx._labelId);
        }
      },
      dependencies: [MatRipple, _MatInternalFormField],
      styles: ['.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:var(--mdc-elevation-overlay-opacity);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1);background-color:var(--mdc-elevation-overlay-color)}.mdc-switch{align-items:center;background:none;border:none;cursor:pointer;display:inline-flex;flex-shrink:0;margin:0;outline:none;overflow:visible;padding:0;position:relative}.mdc-switch[hidden]{display:none}.mdc-switch:disabled{cursor:default;pointer-events:none}.mdc-switch__track{overflow:hidden;position:relative;width:100%}.mdc-switch__track::before,.mdc-switch__track::after{border:1px solid rgba(0,0,0,0);border-radius:inherit;box-sizing:border-box;content:"";height:100%;left:0;position:absolute;width:100%}@media screen and (forced-colors: active){.mdc-switch__track::before,.mdc-switch__track::after{border-color:currentColor}}.mdc-switch__track::before{transition:transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);transform:translateX(0)}.mdc-switch__track::after{transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);transform:translateX(-100%)}[dir=rtl] .mdc-switch__track::after,.mdc-switch__track[dir=rtl]::after{transform:translateX(100%)}.mdc-switch--selected .mdc-switch__track::before{transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);transform:translateX(100%)}[dir=rtl] .mdc-switch--selected .mdc-switch__track::before,.mdc-switch--selected .mdc-switch__track[dir=rtl]::before{transform:translateX(-100%)}.mdc-switch--selected .mdc-switch__track::after{transition:transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);transform:translateX(0)}.mdc-switch__handle-track{height:100%;pointer-events:none;position:absolute;top:0;transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);left:0;right:auto;transform:translateX(0)}[dir=rtl] .mdc-switch__handle-track,.mdc-switch__handle-track[dir=rtl]{left:auto;right:0}.mdc-switch--selected .mdc-switch__handle-track{transform:translateX(100%)}[dir=rtl] .mdc-switch--selected .mdc-switch__handle-track,.mdc-switch--selected .mdc-switch__handle-track[dir=rtl]{transform:translateX(-100%)}.mdc-switch__handle{display:flex;pointer-events:auto;position:absolute;top:50%;transform:translateY(-50%);left:0;right:auto}[dir=rtl] .mdc-switch__handle,.mdc-switch__handle[dir=rtl]{left:auto;right:0}.mdc-switch__handle::before,.mdc-switch__handle::after{border:1px solid rgba(0,0,0,0);border-radius:inherit;box-sizing:border-box;content:"";width:100%;height:100%;left:0;position:absolute;top:0;transition:background-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1),border-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);z-index:-1}@media screen and (forced-colors: active){.mdc-switch__handle::before,.mdc-switch__handle::after{border-color:currentColor}}.mdc-switch__shadow{border-radius:inherit;bottom:0;left:0;position:absolute;right:0;top:0}.mdc-elevation-overlay{bottom:0;left:0;right:0;top:0}.mdc-switch__ripple{left:50%;position:absolute;top:50%;transform:translate(-50%, -50%);z-index:-1}.mdc-switch:disabled .mdc-switch__ripple{display:none}.mdc-switch__icons{height:100%;position:relative;width:100%;z-index:1}.mdc-switch__icon{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0;opacity:0;transition:opacity 30ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-switch--selected .mdc-switch__icon--on,.mdc-switch--unselected .mdc-switch__icon--off{opacity:1;transition:opacity 45ms 30ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-slide-toggle .mdc-switch--disabled+label{color:var(--mdc-switch-disabled-label-text-color)}.mdc-switch{width:var(--mdc-switch-track-width)}.mdc-switch.mdc-switch--selected:enabled .mdc-switch__handle::after{background:var(--mdc-switch-selected-handle-color)}.mdc-switch.mdc-switch--selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:var(--mdc-switch-selected-hover-handle-color)}.mdc-switch.mdc-switch--selected:enabled:focus:not(:active) .mdc-switch__handle::after{background:var(--mdc-switch-selected-focus-handle-color)}.mdc-switch.mdc-switch--selected:enabled:active .mdc-switch__handle::after{background:var(--mdc-switch-selected-pressed-handle-color)}.mdc-switch.mdc-switch--selected:disabled .mdc-switch__handle::after{background:var(--mdc-switch-disabled-selected-handle-color)}.mdc-switch.mdc-switch--unselected:enabled .mdc-switch__handle::after{background:var(--mdc-switch-unselected-handle-color)}.mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:var(--mdc-switch-unselected-hover-handle-color)}.mdc-switch.mdc-switch--unselected:enabled:focus:not(:active) .mdc-switch__handle::after{background:var(--mdc-switch-unselected-focus-handle-color)}.mdc-switch.mdc-switch--unselected:enabled:active .mdc-switch__handle::after{background:var(--mdc-switch-unselected-pressed-handle-color)}.mdc-switch.mdc-switch--unselected:disabled .mdc-switch__handle::after{background:var(--mdc-switch-disabled-unselected-handle-color)}.mdc-switch .mdc-switch__handle::before{background:var(--mdc-switch-handle-surface-color)}.mdc-switch:enabled .mdc-switch__shadow{box-shadow:var(--mdc-switch-handle-elevation)}.mdc-switch:disabled .mdc-switch__shadow{box-shadow:var(--mdc-switch-disabled-handle-elevation)}.mdc-switch .mdc-switch__focus-ring-wrapper,.mdc-switch .mdc-switch__handle{height:var(--mdc-switch-handle-height)}.mdc-switch .mdc-switch__handle{border-radius:var(--mdc-switch-handle-shape)}.mdc-switch .mdc-switch__handle{width:var(--mdc-switch-handle-width)}.mdc-switch .mdc-switch__handle-track{width:calc(100% - var(--mdc-switch-handle-width))}.mdc-switch.mdc-switch--selected:enabled .mdc-switch__icon{fill:var(--mdc-switch-selected-icon-color)}.mdc-switch.mdc-switch--selected:disabled .mdc-switch__icon{fill:var(--mdc-switch-disabled-selected-icon-color)}.mdc-switch.mdc-switch--unselected:enabled .mdc-switch__icon{fill:var(--mdc-switch-unselected-icon-color)}.mdc-switch.mdc-switch--unselected:disabled .mdc-switch__icon{fill:var(--mdc-switch-disabled-unselected-icon-color)}.mdc-switch.mdc-switch--selected:disabled .mdc-switch__icons{opacity:var(--mdc-switch-disabled-selected-icon-opacity)}.mdc-switch.mdc-switch--unselected:disabled .mdc-switch__icons{opacity:var(--mdc-switch-disabled-unselected-icon-opacity)}.mdc-switch.mdc-switch--selected .mdc-switch__icon{width:var(--mdc-switch-selected-icon-size);height:var(--mdc-switch-selected-icon-size)}.mdc-switch.mdc-switch--unselected .mdc-switch__icon{width:var(--mdc-switch-unselected-icon-size);height:var(--mdc-switch-unselected-icon-size)}.mdc-switch.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::before,.mdc-switch.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::after{background-color:var(--mdc-switch-selected-hover-state-layer-color)}.mdc-switch.mdc-switch--selected:enabled:focus .mdc-switch__ripple::before,.mdc-switch.mdc-switch--selected:enabled:focus .mdc-switch__ripple::after{background-color:var(--mdc-switch-selected-focus-state-layer-color)}.mdc-switch.mdc-switch--selected:enabled:active .mdc-switch__ripple::before,.mdc-switch.mdc-switch--selected:enabled:active .mdc-switch__ripple::after{background-color:var(--mdc-switch-selected-pressed-state-layer-color)}.mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::before,.mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::after{background-color:var(--mdc-switch-unselected-hover-state-layer-color)}.mdc-switch.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::before,.mdc-switch.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::after{background-color:var(--mdc-switch-unselected-focus-state-layer-color)}.mdc-switch.mdc-switch--unselected:enabled:active .mdc-switch__ripple::before,.mdc-switch.mdc-switch--unselected:enabled:active .mdc-switch__ripple::after{background-color:var(--mdc-switch-unselected-pressed-state-layer-color)}.mdc-switch.mdc-switch--selected:enabled:hover:not(:focus):hover .mdc-switch__ripple::before,.mdc-switch.mdc-switch--selected:enabled:hover:not(:focus).mdc-ripple-surface--hover .mdc-switch__ripple::before{opacity:var(--mdc-switch-selected-hover-state-layer-opacity)}.mdc-switch.mdc-switch--selected:enabled:focus.mdc-ripple-upgraded--background-focused .mdc-switch__ripple::before,.mdc-switch.mdc-switch--selected:enabled:focus:not(.mdc-ripple-upgraded):focus .mdc-switch__ripple::before{transition-duration:75ms;opacity:var(--mdc-switch-selected-focus-state-layer-opacity)}.mdc-switch.mdc-switch--selected:enabled:active:not(.mdc-ripple-upgraded) .mdc-switch__ripple::after{transition:opacity 150ms linear}.mdc-switch.mdc-switch--selected:enabled:active:not(.mdc-ripple-upgraded):active .mdc-switch__ripple::after{transition-duration:75ms;opacity:var(--mdc-switch-selected-pressed-state-layer-opacity)}.mdc-switch.mdc-switch--selected:enabled:active.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-switch-selected-pressed-state-layer-opacity)}.mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus):hover .mdc-switch__ripple::before,.mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus).mdc-ripple-surface--hover .mdc-switch__ripple::before{opacity:var(--mdc-switch-unselected-hover-state-layer-opacity)}.mdc-switch.mdc-switch--unselected:enabled:focus.mdc-ripple-upgraded--background-focused .mdc-switch__ripple::before,.mdc-switch.mdc-switch--unselected:enabled:focus:not(.mdc-ripple-upgraded):focus .mdc-switch__ripple::before{transition-duration:75ms;opacity:var(--mdc-switch-unselected-focus-state-layer-opacity)}.mdc-switch.mdc-switch--unselected:enabled:active:not(.mdc-ripple-upgraded) .mdc-switch__ripple::after{transition:opacity 150ms linear}.mdc-switch.mdc-switch--unselected:enabled:active:not(.mdc-ripple-upgraded):active .mdc-switch__ripple::after{transition-duration:75ms;opacity:var(--mdc-switch-unselected-pressed-state-layer-opacity)}.mdc-switch.mdc-switch--unselected:enabled:active.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-switch-unselected-pressed-state-layer-opacity)}.mdc-switch .mdc-switch__ripple{height:var(--mdc-switch-state-layer-size);width:var(--mdc-switch-state-layer-size)}.mdc-switch .mdc-switch__track{height:var(--mdc-switch-track-height)}.mdc-switch:disabled .mdc-switch__track{opacity:var(--mdc-switch-disabled-track-opacity)}.mdc-switch:enabled .mdc-switch__track::after{background:var(--mdc-switch-selected-track-color)}.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after{background:var(--mdc-switch-selected-hover-track-color)}.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after{background:var(--mdc-switch-selected-focus-track-color)}.mdc-switch:enabled:active .mdc-switch__track::after{background:var(--mdc-switch-selected-pressed-track-color)}.mdc-switch:disabled .mdc-switch__track::after{background:var(--mdc-switch-disabled-selected-track-color)}.mdc-switch:enabled .mdc-switch__track::before{background:var(--mdc-switch-unselected-track-color)}.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before{background:var(--mdc-switch-unselected-hover-track-color)}.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before{background:var(--mdc-switch-unselected-focus-track-color)}.mdc-switch:enabled:active .mdc-switch__track::before{background:var(--mdc-switch-unselected-pressed-track-color)}.mdc-switch:disabled .mdc-switch__track::before{background:var(--mdc-switch-disabled-unselected-track-color)}.mdc-switch .mdc-switch__track{border-radius:var(--mdc-switch-track-shape)}.mdc-switch:enabled .mdc-switch__shadow{box-shadow:var(--mdc-switch-handle-elevation-shadow)}.mdc-switch:disabled .mdc-switch__shadow{box-shadow:var(--mdc-switch-disabled-handle-elevation-shadow)}.mat-mdc-slide-toggle{display:inline-block;-webkit-tap-highlight-color:rgba(0,0,0,0);outline:0}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple,.mat-mdc-slide-toggle .mdc-switch__ripple::after{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:50%;pointer-events:none}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple:not(:empty),.mat-mdc-slide-toggle .mdc-switch__ripple::after:not(:empty){transform:translateZ(0)}.mat-mdc-slide-toggle .mdc-switch__ripple::after{content:"";opacity:0}.mat-mdc-slide-toggle .mdc-switch:hover .mdc-switch__ripple::after{opacity:.04;transition:opacity 75ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mdc-switch .mdc-switch__ripple::after{opacity:.12}.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mat-mdc-focus-indicator::before{content:""}.mat-mdc-slide-toggle .mat-ripple-element{opacity:.12}.mat-mdc-slide-toggle .mat-mdc-focus-indicator::before{border-radius:50%}.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle-track,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-elevation-overlay,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__icon,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::before,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::after,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::before,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::after{transition:none}.mat-mdc-slide-toggle .mdc-switch:enabled+.mdc-label{cursor:pointer}.mdc-switch__handle{transition:width 75ms cubic-bezier(0.4, 0, 0.2, 1),height 75ms cubic-bezier(0.4, 0, 0.2, 1),margin 75ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-switch--selected .mdc-switch__track::before{opacity:var(--mat-switch-hidden-track-opacity);transition:var(--mat-switch-hidden-track-transition)}.mdc-switch--selected .mdc-switch__track::after{opacity:var(--mat-switch-visible-track-opacity);transition:var(--mat-switch-visible-track-transition)}.mdc-switch--unselected .mdc-switch__track::before{opacity:var(--mat-switch-visible-track-opacity);transition:var(--mat-switch-visible-track-transition)}.mdc-switch--unselected .mdc-switch__track::after{opacity:var(--mat-switch-hidden-track-opacity);transition:var(--mat-switch-hidden-track-transition)}.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle{width:var(--mat-switch-unselected-handle-size);height:var(--mat-switch-unselected-handle-size)}.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle{width:var(--mat-switch-selected-handle-size);height:var(--mat-switch-selected-handle-size)}.mat-mdc-slide-toggle .mdc-switch__handle:has(.mdc-switch__icons){width:var(--mat-switch-with-icon-handle-size);height:var(--mat-switch-with-icon-handle-size)}.mat-mdc-slide-toggle:active .mdc-switch:not(.mdc-switch--disabled) .mdc-switch__handle{width:var(--mat-switch-pressed-handle-size);height:var(--mat-switch-pressed-handle-size)}.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle{margin:var(--mat-switch-selected-handle-horizontal-margin)}.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle:has(.mdc-switch__icons){margin:var(--mat-switch-selected-with-icon-handle-horizontal-margin)}.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle{margin:var(--mat-switch-unselected-handle-horizontal-margin)}.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle:has(.mdc-switch__icons){margin:var(--mat-switch-unselected-with-icon-handle-horizontal-margin)}.mat-mdc-slide-toggle:active .mdc-switch--selected:not(.mdc-switch--disabled) .mdc-switch__handle{margin:var(--mat-switch-selected-pressed-handle-horizontal-margin)}.mat-mdc-slide-toggle:active .mdc-switch--unselected:not(.mdc-switch--disabled) .mdc-switch__handle{margin:var(--mat-switch-unselected-pressed-handle-horizontal-margin)}.mdc-switch__track::after,.mdc-switch__track::before{border-width:var(--mat-switch-track-outline-width);border-color:var(--mat-switch-track-outline-color)}.mdc-switch--selected .mdc-switch__track::after,.mdc-switch--selected .mdc-switch__track::before{border-width:var(--mat-switch-selected-track-outline-width)}.mdc-switch--disabled .mdc-switch__track::after,.mdc-switch--disabled .mdc-switch__track::before{border-width:var(--mat-switch-disabled-unselected-track-outline-width);border-color:var(--mat-switch-disabled-unselected-track-outline-color)}.mdc-switch--disabled.mdc-switch--selected .mdc-switch__handle::after{opacity:var(--mat-switch-disabled-selected-handle-opacity)}.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__handle::after{opacity:var(--mat-switch-disabled-unselected-handle-opacity)}'],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatSlideToggle, [{
    type: Component,
    args: [{
      selector: "mat-slide-toggle",
      host: {
        "class": "mat-mdc-slide-toggle",
        "[id]": "id",
        // Needs to be removed since it causes some a11y issues (see #21266).
        "[attr.tabindex]": "null",
        "[attr.aria-label]": "null",
        "[attr.name]": "null",
        "[attr.aria-labelledby]": "null",
        "[class.mat-mdc-slide-toggle-focused]": "_focused",
        "[class.mat-mdc-slide-toggle-checked]": "checked",
        "[class._mat-animation-noopable]": "_noopAnimations",
        "[class]": 'color ? "mat-" + color : ""'
      },
      exportAs: "matSlideToggle",
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [MAT_SLIDE_TOGGLE_VALUE_ACCESSOR, {
        provide: NG_VALIDATORS,
        useExisting: MatSlideToggle,
        multi: true
      }],
      standalone: true,
      imports: [MatRipple, _MatInternalFormField],
      template: `<div mat-internal-form-field [labelPosition]="labelPosition">
  <button
    class="mdc-switch"
    role="switch"
    type="button"
    [class.mdc-switch--selected]="checked"
    [class.mdc-switch--unselected]="!checked"
    [class.mdc-switch--checked]="checked"
    [class.mdc-switch--disabled]="disabled"
    [tabIndex]="disabled ? -1 : tabIndex"
    [disabled]="disabled"
    [attr.id]="buttonId"
    [attr.name]="name"
    [attr.aria-label]="ariaLabel"
    [attr.aria-labelledby]="_getAriaLabelledBy()"
    [attr.aria-describedby]="ariaDescribedby"
    [attr.aria-required]="required || null"
    [attr.aria-checked]="checked"
    (click)="_handleClick()"
    #switch>
    <div class="mdc-switch__track"></div>
    <div class="mdc-switch__handle-track">
      <div class="mdc-switch__handle">
        <div class="mdc-switch__shadow">
          <div class="mdc-elevation-overlay"></div>
        </div>
        <div class="mdc-switch__ripple">
          <div class="mat-mdc-slide-toggle-ripple mat-mdc-focus-indicator" mat-ripple
            [matRippleTrigger]="switch"
            [matRippleDisabled]="disableRipple || disabled"
            [matRippleCentered]="true"></div>
        </div>
        @if (!hideIcon) {
          <div class="mdc-switch__icons">
            <svg
              class="mdc-switch__icon mdc-switch__icon--on"
              viewBox="0 0 24 24"
              aria-hidden="true">
              <path d="M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z" />
            </svg>
            <svg
              class="mdc-switch__icon mdc-switch__icon--off"
              viewBox="0 0 24 24"
              aria-hidden="true">
              <path d="M20 13H4v-2h16v2z" />
            </svg>
          </div>
        }
      </div>
    </div>
  </button>

  <!--
    Clicking on the label will trigger another click event from the button.
    Stop propagation here so other listeners further up in the DOM don't execute twice.
  -->
  <label class="mdc-label" [for]="buttonId" [attr.id]="_labelId" (click)="$event.stopPropagation()">
    <ng-content></ng-content>
  </label>
</div>
`,
      styles: ['.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:var(--mdc-elevation-overlay-opacity);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1);background-color:var(--mdc-elevation-overlay-color)}.mdc-switch{align-items:center;background:none;border:none;cursor:pointer;display:inline-flex;flex-shrink:0;margin:0;outline:none;overflow:visible;padding:0;position:relative}.mdc-switch[hidden]{display:none}.mdc-switch:disabled{cursor:default;pointer-events:none}.mdc-switch__track{overflow:hidden;position:relative;width:100%}.mdc-switch__track::before,.mdc-switch__track::after{border:1px solid rgba(0,0,0,0);border-radius:inherit;box-sizing:border-box;content:"";height:100%;left:0;position:absolute;width:100%}@media screen and (forced-colors: active){.mdc-switch__track::before,.mdc-switch__track::after{border-color:currentColor}}.mdc-switch__track::before{transition:transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);transform:translateX(0)}.mdc-switch__track::after{transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);transform:translateX(-100%)}[dir=rtl] .mdc-switch__track::after,.mdc-switch__track[dir=rtl]::after{transform:translateX(100%)}.mdc-switch--selected .mdc-switch__track::before{transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);transform:translateX(100%)}[dir=rtl] .mdc-switch--selected .mdc-switch__track::before,.mdc-switch--selected .mdc-switch__track[dir=rtl]::before{transform:translateX(-100%)}.mdc-switch--selected .mdc-switch__track::after{transition:transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);transform:translateX(0)}.mdc-switch__handle-track{height:100%;pointer-events:none;position:absolute;top:0;transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);left:0;right:auto;transform:translateX(0)}[dir=rtl] .mdc-switch__handle-track,.mdc-switch__handle-track[dir=rtl]{left:auto;right:0}.mdc-switch--selected .mdc-switch__handle-track{transform:translateX(100%)}[dir=rtl] .mdc-switch--selected .mdc-switch__handle-track,.mdc-switch--selected .mdc-switch__handle-track[dir=rtl]{transform:translateX(-100%)}.mdc-switch__handle{display:flex;pointer-events:auto;position:absolute;top:50%;transform:translateY(-50%);left:0;right:auto}[dir=rtl] .mdc-switch__handle,.mdc-switch__handle[dir=rtl]{left:auto;right:0}.mdc-switch__handle::before,.mdc-switch__handle::after{border:1px solid rgba(0,0,0,0);border-radius:inherit;box-sizing:border-box;content:"";width:100%;height:100%;left:0;position:absolute;top:0;transition:background-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1),border-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);z-index:-1}@media screen and (forced-colors: active){.mdc-switch__handle::before,.mdc-switch__handle::after{border-color:currentColor}}.mdc-switch__shadow{border-radius:inherit;bottom:0;left:0;position:absolute;right:0;top:0}.mdc-elevation-overlay{bottom:0;left:0;right:0;top:0}.mdc-switch__ripple{left:50%;position:absolute;top:50%;transform:translate(-50%, -50%);z-index:-1}.mdc-switch:disabled .mdc-switch__ripple{display:none}.mdc-switch__icons{height:100%;position:relative;width:100%;z-index:1}.mdc-switch__icon{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0;opacity:0;transition:opacity 30ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-switch--selected .mdc-switch__icon--on,.mdc-switch--unselected .mdc-switch__icon--off{opacity:1;transition:opacity 45ms 30ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-slide-toggle .mdc-switch--disabled+label{color:var(--mdc-switch-disabled-label-text-color)}.mdc-switch{width:var(--mdc-switch-track-width)}.mdc-switch.mdc-switch--selected:enabled .mdc-switch__handle::after{background:var(--mdc-switch-selected-handle-color)}.mdc-switch.mdc-switch--selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:var(--mdc-switch-selected-hover-handle-color)}.mdc-switch.mdc-switch--selected:enabled:focus:not(:active) .mdc-switch__handle::after{background:var(--mdc-switch-selected-focus-handle-color)}.mdc-switch.mdc-switch--selected:enabled:active .mdc-switch__handle::after{background:var(--mdc-switch-selected-pressed-handle-color)}.mdc-switch.mdc-switch--selected:disabled .mdc-switch__handle::after{background:var(--mdc-switch-disabled-selected-handle-color)}.mdc-switch.mdc-switch--unselected:enabled .mdc-switch__handle::after{background:var(--mdc-switch-unselected-handle-color)}.mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:var(--mdc-switch-unselected-hover-handle-color)}.mdc-switch.mdc-switch--unselected:enabled:focus:not(:active) .mdc-switch__handle::after{background:var(--mdc-switch-unselected-focus-handle-color)}.mdc-switch.mdc-switch--unselected:enabled:active .mdc-switch__handle::after{background:var(--mdc-switch-unselected-pressed-handle-color)}.mdc-switch.mdc-switch--unselected:disabled .mdc-switch__handle::after{background:var(--mdc-switch-disabled-unselected-handle-color)}.mdc-switch .mdc-switch__handle::before{background:var(--mdc-switch-handle-surface-color)}.mdc-switch:enabled .mdc-switch__shadow{box-shadow:var(--mdc-switch-handle-elevation)}.mdc-switch:disabled .mdc-switch__shadow{box-shadow:var(--mdc-switch-disabled-handle-elevation)}.mdc-switch .mdc-switch__focus-ring-wrapper,.mdc-switch .mdc-switch__handle{height:var(--mdc-switch-handle-height)}.mdc-switch .mdc-switch__handle{border-radius:var(--mdc-switch-handle-shape)}.mdc-switch .mdc-switch__handle{width:var(--mdc-switch-handle-width)}.mdc-switch .mdc-switch__handle-track{width:calc(100% - var(--mdc-switch-handle-width))}.mdc-switch.mdc-switch--selected:enabled .mdc-switch__icon{fill:var(--mdc-switch-selected-icon-color)}.mdc-switch.mdc-switch--selected:disabled .mdc-switch__icon{fill:var(--mdc-switch-disabled-selected-icon-color)}.mdc-switch.mdc-switch--unselected:enabled .mdc-switch__icon{fill:var(--mdc-switch-unselected-icon-color)}.mdc-switch.mdc-switch--unselected:disabled .mdc-switch__icon{fill:var(--mdc-switch-disabled-unselected-icon-color)}.mdc-switch.mdc-switch--selected:disabled .mdc-switch__icons{opacity:var(--mdc-switch-disabled-selected-icon-opacity)}.mdc-switch.mdc-switch--unselected:disabled .mdc-switch__icons{opacity:var(--mdc-switch-disabled-unselected-icon-opacity)}.mdc-switch.mdc-switch--selected .mdc-switch__icon{width:var(--mdc-switch-selected-icon-size);height:var(--mdc-switch-selected-icon-size)}.mdc-switch.mdc-switch--unselected .mdc-switch__icon{width:var(--mdc-switch-unselected-icon-size);height:var(--mdc-switch-unselected-icon-size)}.mdc-switch.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::before,.mdc-switch.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::after{background-color:var(--mdc-switch-selected-hover-state-layer-color)}.mdc-switch.mdc-switch--selected:enabled:focus .mdc-switch__ripple::before,.mdc-switch.mdc-switch--selected:enabled:focus .mdc-switch__ripple::after{background-color:var(--mdc-switch-selected-focus-state-layer-color)}.mdc-switch.mdc-switch--selected:enabled:active .mdc-switch__ripple::before,.mdc-switch.mdc-switch--selected:enabled:active .mdc-switch__ripple::after{background-color:var(--mdc-switch-selected-pressed-state-layer-color)}.mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::before,.mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::after{background-color:var(--mdc-switch-unselected-hover-state-layer-color)}.mdc-switch.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::before,.mdc-switch.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::after{background-color:var(--mdc-switch-unselected-focus-state-layer-color)}.mdc-switch.mdc-switch--unselected:enabled:active .mdc-switch__ripple::before,.mdc-switch.mdc-switch--unselected:enabled:active .mdc-switch__ripple::after{background-color:var(--mdc-switch-unselected-pressed-state-layer-color)}.mdc-switch.mdc-switch--selected:enabled:hover:not(:focus):hover .mdc-switch__ripple::before,.mdc-switch.mdc-switch--selected:enabled:hover:not(:focus).mdc-ripple-surface--hover .mdc-switch__ripple::before{opacity:var(--mdc-switch-selected-hover-state-layer-opacity)}.mdc-switch.mdc-switch--selected:enabled:focus.mdc-ripple-upgraded--background-focused .mdc-switch__ripple::before,.mdc-switch.mdc-switch--selected:enabled:focus:not(.mdc-ripple-upgraded):focus .mdc-switch__ripple::before{transition-duration:75ms;opacity:var(--mdc-switch-selected-focus-state-layer-opacity)}.mdc-switch.mdc-switch--selected:enabled:active:not(.mdc-ripple-upgraded) .mdc-switch__ripple::after{transition:opacity 150ms linear}.mdc-switch.mdc-switch--selected:enabled:active:not(.mdc-ripple-upgraded):active .mdc-switch__ripple::after{transition-duration:75ms;opacity:var(--mdc-switch-selected-pressed-state-layer-opacity)}.mdc-switch.mdc-switch--selected:enabled:active.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-switch-selected-pressed-state-layer-opacity)}.mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus):hover .mdc-switch__ripple::before,.mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus).mdc-ripple-surface--hover .mdc-switch__ripple::before{opacity:var(--mdc-switch-unselected-hover-state-layer-opacity)}.mdc-switch.mdc-switch--unselected:enabled:focus.mdc-ripple-upgraded--background-focused .mdc-switch__ripple::before,.mdc-switch.mdc-switch--unselected:enabled:focus:not(.mdc-ripple-upgraded):focus .mdc-switch__ripple::before{transition-duration:75ms;opacity:var(--mdc-switch-unselected-focus-state-layer-opacity)}.mdc-switch.mdc-switch--unselected:enabled:active:not(.mdc-ripple-upgraded) .mdc-switch__ripple::after{transition:opacity 150ms linear}.mdc-switch.mdc-switch--unselected:enabled:active:not(.mdc-ripple-upgraded):active .mdc-switch__ripple::after{transition-duration:75ms;opacity:var(--mdc-switch-unselected-pressed-state-layer-opacity)}.mdc-switch.mdc-switch--unselected:enabled:active.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-switch-unselected-pressed-state-layer-opacity)}.mdc-switch .mdc-switch__ripple{height:var(--mdc-switch-state-layer-size);width:var(--mdc-switch-state-layer-size)}.mdc-switch .mdc-switch__track{height:var(--mdc-switch-track-height)}.mdc-switch:disabled .mdc-switch__track{opacity:var(--mdc-switch-disabled-track-opacity)}.mdc-switch:enabled .mdc-switch__track::after{background:var(--mdc-switch-selected-track-color)}.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after{background:var(--mdc-switch-selected-hover-track-color)}.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after{background:var(--mdc-switch-selected-focus-track-color)}.mdc-switch:enabled:active .mdc-switch__track::after{background:var(--mdc-switch-selected-pressed-track-color)}.mdc-switch:disabled .mdc-switch__track::after{background:var(--mdc-switch-disabled-selected-track-color)}.mdc-switch:enabled .mdc-switch__track::before{background:var(--mdc-switch-unselected-track-color)}.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before{background:var(--mdc-switch-unselected-hover-track-color)}.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before{background:var(--mdc-switch-unselected-focus-track-color)}.mdc-switch:enabled:active .mdc-switch__track::before{background:var(--mdc-switch-unselected-pressed-track-color)}.mdc-switch:disabled .mdc-switch__track::before{background:var(--mdc-switch-disabled-unselected-track-color)}.mdc-switch .mdc-switch__track{border-radius:var(--mdc-switch-track-shape)}.mdc-switch:enabled .mdc-switch__shadow{box-shadow:var(--mdc-switch-handle-elevation-shadow)}.mdc-switch:disabled .mdc-switch__shadow{box-shadow:var(--mdc-switch-disabled-handle-elevation-shadow)}.mat-mdc-slide-toggle{display:inline-block;-webkit-tap-highlight-color:rgba(0,0,0,0);outline:0}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple,.mat-mdc-slide-toggle .mdc-switch__ripple::after{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:50%;pointer-events:none}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple:not(:empty),.mat-mdc-slide-toggle .mdc-switch__ripple::after:not(:empty){transform:translateZ(0)}.mat-mdc-slide-toggle .mdc-switch__ripple::after{content:"";opacity:0}.mat-mdc-slide-toggle .mdc-switch:hover .mdc-switch__ripple::after{opacity:.04;transition:opacity 75ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mdc-switch .mdc-switch__ripple::after{opacity:.12}.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mat-mdc-focus-indicator::before{content:""}.mat-mdc-slide-toggle .mat-ripple-element{opacity:.12}.mat-mdc-slide-toggle .mat-mdc-focus-indicator::before{border-radius:50%}.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle-track,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-elevation-overlay,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__icon,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::before,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::after,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::before,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::after{transition:none}.mat-mdc-slide-toggle .mdc-switch:enabled+.mdc-label{cursor:pointer}.mdc-switch__handle{transition:width 75ms cubic-bezier(0.4, 0, 0.2, 1),height 75ms cubic-bezier(0.4, 0, 0.2, 1),margin 75ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-switch--selected .mdc-switch__track::before{opacity:var(--mat-switch-hidden-track-opacity);transition:var(--mat-switch-hidden-track-transition)}.mdc-switch--selected .mdc-switch__track::after{opacity:var(--mat-switch-visible-track-opacity);transition:var(--mat-switch-visible-track-transition)}.mdc-switch--unselected .mdc-switch__track::before{opacity:var(--mat-switch-visible-track-opacity);transition:var(--mat-switch-visible-track-transition)}.mdc-switch--unselected .mdc-switch__track::after{opacity:var(--mat-switch-hidden-track-opacity);transition:var(--mat-switch-hidden-track-transition)}.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle{width:var(--mat-switch-unselected-handle-size);height:var(--mat-switch-unselected-handle-size)}.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle{width:var(--mat-switch-selected-handle-size);height:var(--mat-switch-selected-handle-size)}.mat-mdc-slide-toggle .mdc-switch__handle:has(.mdc-switch__icons){width:var(--mat-switch-with-icon-handle-size);height:var(--mat-switch-with-icon-handle-size)}.mat-mdc-slide-toggle:active .mdc-switch:not(.mdc-switch--disabled) .mdc-switch__handle{width:var(--mat-switch-pressed-handle-size);height:var(--mat-switch-pressed-handle-size)}.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle{margin:var(--mat-switch-selected-handle-horizontal-margin)}.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle:has(.mdc-switch__icons){margin:var(--mat-switch-selected-with-icon-handle-horizontal-margin)}.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle{margin:var(--mat-switch-unselected-handle-horizontal-margin)}.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle:has(.mdc-switch__icons){margin:var(--mat-switch-unselected-with-icon-handle-horizontal-margin)}.mat-mdc-slide-toggle:active .mdc-switch--selected:not(.mdc-switch--disabled) .mdc-switch__handle{margin:var(--mat-switch-selected-pressed-handle-horizontal-margin)}.mat-mdc-slide-toggle:active .mdc-switch--unselected:not(.mdc-switch--disabled) .mdc-switch__handle{margin:var(--mat-switch-unselected-pressed-handle-horizontal-margin)}.mdc-switch__track::after,.mdc-switch__track::before{border-width:var(--mat-switch-track-outline-width);border-color:var(--mat-switch-track-outline-color)}.mdc-switch--selected .mdc-switch__track::after,.mdc-switch--selected .mdc-switch__track::before{border-width:var(--mat-switch-selected-track-outline-width)}.mdc-switch--disabled .mdc-switch__track::after,.mdc-switch--disabled .mdc-switch__track::before{border-width:var(--mat-switch-disabled-unselected-track-outline-width);border-color:var(--mat-switch-disabled-unselected-track-outline-color)}.mdc-switch--disabled.mdc-switch--selected .mdc-switch__handle::after{opacity:var(--mat-switch-disabled-selected-handle-opacity)}.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__handle::after{opacity:var(--mat-switch-disabled-unselected-handle-opacity)}']
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: FocusMonitor
  }, {
    type: ChangeDetectorRef
  }, {
    type: void 0,
    decorators: [{
      type: Attribute,
      args: ["tabindex"]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [ANIMATION_MODULE_TYPE]
    }]
  }], {
    _switchElement: [{
      type: ViewChild,
      args: ["switch"]
    }],
    name: [{
      type: Input
    }],
    id: [{
      type: Input
    }],
    labelPosition: [{
      type: Input
    }],
    ariaLabel: [{
      type: Input,
      args: ["aria-label"]
    }],
    ariaLabelledby: [{
      type: Input,
      args: ["aria-labelledby"]
    }],
    ariaDescribedby: [{
      type: Input,
      args: ["aria-describedby"]
    }],
    required: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    color: [{
      type: Input
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disableRipple: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    tabIndex: [{
      type: Input,
      args: [{
        transform: (value) => value == null ? 0 : numberAttribute(value)
      }]
    }],
    checked: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    hideIcon: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    change: [{
      type: Output
    }],
    toggleChange: [{
      type: Output
    }]
  });
})();
var MAT_SLIDE_TOGGLE_REQUIRED_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MatSlideToggleRequiredValidator),
  multi: true
};
var MatSlideToggleRequiredValidator = class _MatSlideToggleRequiredValidator extends CheckboxRequiredValidator {
  static {
    this.\u0275fac = /* @__PURE__ */ (() => {
      let \u0275MatSlideToggleRequiredValidator_BaseFactory;
      return function MatSlideToggleRequiredValidator_Factory(t) {
        return (\u0275MatSlideToggleRequiredValidator_BaseFactory || (\u0275MatSlideToggleRequiredValidator_BaseFactory = \u0275\u0275getInheritedFactory(_MatSlideToggleRequiredValidator)))(t || _MatSlideToggleRequiredValidator);
      };
    })();
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MatSlideToggleRequiredValidator,
      selectors: [["mat-slide-toggle", "required", "", "formControlName", ""], ["mat-slide-toggle", "required", "", "formControl", ""], ["mat-slide-toggle", "required", "", "ngModel", ""]],
      standalone: true,
      features: [\u0275\u0275ProvidersFeature([MAT_SLIDE_TOGGLE_REQUIRED_VALIDATOR]), \u0275\u0275InheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatSlideToggleRequiredValidator, [{
    type: Directive,
    args: [{
      selector: `mat-slide-toggle[required][formControlName],
             mat-slide-toggle[required][formControl], mat-slide-toggle[required][ngModel]`,
      providers: [MAT_SLIDE_TOGGLE_REQUIRED_VALIDATOR],
      standalone: true
    }]
  }], null, null);
})();
var _MatSlideToggleRequiredValidatorModule = class __MatSlideToggleRequiredValidatorModule {
  static {
    this.\u0275fac = function _MatSlideToggleRequiredValidatorModule_Factory(t) {
      return new (t || __MatSlideToggleRequiredValidatorModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
      type: __MatSlideToggleRequiredValidatorModule
    });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(_MatSlideToggleRequiredValidatorModule, [{
    type: NgModule,
    args: [{
      imports: [MatSlideToggleRequiredValidator],
      exports: [MatSlideToggleRequiredValidator]
    }]
  }], null, null);
})();
var MatSlideToggleModule = class _MatSlideToggleModule {
  static {
    this.\u0275fac = function MatSlideToggleModule_Factory(t) {
      return new (t || _MatSlideToggleModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
      type: _MatSlideToggleModule
    });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
      imports: [MatSlideToggle, MatCommonModule, MatCommonModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatSlideToggleModule, [{
    type: NgModule,
    args: [{
      imports: [MatSlideToggle, MatCommonModule],
      exports: [MatSlideToggle, MatCommonModule]
    }]
  }], null, null);
})();

// src/app/modules/user-management/user-management.component.ts
var _c02 = () => ["DOCTOR", "LAB_TECHNICIAN", "HEALTH_STAFF"];
var _c12 = () => ({ standalone: true });
function UserManagementComponent_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 46);
    \u0275\u0275text(1, "people");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Personal (", ctx_r0.users.length, ") ");
  }
}
function UserManagementComponent_div_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47)(1, "mat-icon");
    \u0275\u0275text(2, "info_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Este rol se asigna autom\xE1ticamente a: ");
    \u0275\u0275elementStart(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const area_r2 = ctx.ngIf;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(area_r2);
  }
}
function UserManagementComponent_mat_form_field_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-form-field", 9)(1, "mat-label");
    \u0275\u0275text(2, "Especialidad");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "input", 48);
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_mat_form_field_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-form-field", 9)(1, "mat-label");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "input", 49);
    \u0275\u0275elementStart(4, "mat-error");
    \u0275\u0275text(5, "Requerido para este rol (RN-M05: debe ser \xFAnico)");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("N\xB0 Colegiado ", ctx_r0.isCollegiateRequired() ? "*" : "(opcional)", "");
  }
}
function UserManagementComponent_div_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50)(1, "mat-icon");
    \u0275\u0275text(2, "error_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.createError, " ");
  }
}
function UserManagementComponent_th_88_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 51);
    \u0275\u0275text(1, "Nombre");
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_td_89_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 52)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 53);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const u_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", u_r3.firstName, " ", u_r3.lastName, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(u_r3.username);
  }
}
function UserManagementComponent_th_91_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 51);
    \u0275\u0275text(1, "Rol");
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_td_92_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 52)(1, "span", 54);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const u_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r0.getRoleClass(u_r4.role));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.roleLabel(u_r4.role));
  }
}
function UserManagementComponent_th_94_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 51);
    \u0275\u0275text(1, "Especialidad / Colegiado");
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_td_95_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const u_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(u_r5.specialty);
  }
}
function UserManagementComponent_td_95_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 58);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const u_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(u_r5.collegiateNumber);
  }
}
function UserManagementComponent_td_95_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 59);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_td_95_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 52);
    \u0275\u0275template(1, UserManagementComponent_td_95_span_1_Template, 2, 1, "span", 55)(2, UserManagementComponent_td_95_span_2_Template, 2, 1, "span", 56)(3, UserManagementComponent_td_95_span_3_Template, 2, 0, "span", 57);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const u_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", u_r5.specialty);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", u_r5.collegiateNumber);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !u_r5.specialty && !u_r5.collegiateNumber);
  }
}
function UserManagementComponent_th_97_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 51);
    \u0275\u0275text(1, "\xC1rea / Cl\xEDnica");
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_td_98_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 63)(1, "mat-icon", 64);
    \u0275\u0275text(2, "local_hospital");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const u_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", u_r6.assignedClinic, " ");
  }
}
function UserManagementComponent_td_98_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 65);
    \u0275\u0275text(1, "Sin asignar");
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_td_98_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 66)(1, "mat-icon", 67);
    \u0275\u0275text(2, "place");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const u_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.getAutoArea(u_r6.role), " ");
  }
}
function UserManagementComponent_td_98_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 52);
    \u0275\u0275template(1, UserManagementComponent_td_98_span_1_Template, 4, 1, "span", 60)(2, UserManagementComponent_td_98_span_2_Template, 2, 0, "span", 61)(3, UserManagementComponent_td_98_span_3_Template, 4, 1, "span", 62);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const u_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", u_r6.role === "DOCTOR" && u_r6.assignedClinic);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", u_r6.role === "DOCTOR" && !u_r6.assignedClinic);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", u_r6.role !== "DOCTOR");
  }
}
function UserManagementComponent_th_100_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 51);
    \u0275\u0275text(1, "Acciones");
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_td_101_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 70);
    \u0275\u0275listener("click", function UserManagementComponent_td_101_button_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const u_r9 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.openAssignDialog(u_r9));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const u_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("title", u_r9.assignedClinic ? "Reasignar cl\xEDnica (FA03)" : "Asignar cl\xEDnica (FA04)");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(u_r9.assignedClinic ? "sync_alt" : "add_location");
  }
}
function UserManagementComponent_td_101_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 52);
    \u0275\u0275template(1, UserManagementComponent_td_101_button_1_Template, 3, 2, "button", 68);
    \u0275\u0275elementStart(2, "button", 69);
    \u0275\u0275listener("click", function UserManagementComponent_td_101_Template_button_click_2_listener() {
      const u_r9 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.deleteUser(u_r9.id));
    });
    \u0275\u0275elementStart(3, "mat-icon");
    \u0275\u0275text(4, "person_off");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const u_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", u_r9.role === "DOCTOR");
  }
}
function UserManagementComponent_tr_102_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 71);
  }
}
function UserManagementComponent_tr_103_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 72);
  }
}
function UserManagementComponent_div_104_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 73)(1, "mat-icon");
    \u0275\u0275text(2, "people");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "No hay usuarios registrados");
    \u0275\u0275elementEnd()();
  }
}
function UserManagementComponent_ng_template_106_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 46);
    \u0275\u0275text(1, "notifications");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Notificaciones ");
  }
}
function UserManagementComponent_div_130_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 40)(1, "div")(2, "strong");
    \u0275\u0275text(3, "Tiempo de visualizaci\xF3n del llamado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "Segundos que permanece visible en pantalla el turno llamado");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 74)(7, "input", 75);
    \u0275\u0275twoWayListener("ngModelChange", function UserManagementComponent_div_130_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.notifSettings.displaySeconds, $event) || (ctx_r0.notifSettings.displaySeconds = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function UserManagementComponent_div_130_Template_input_change_7_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.saveSettings());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span");
    \u0275\u0275text(9, "seg");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.notifSettings.displaySeconds);
  }
}
function UserManagementComponent_div_144_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 40)(1, "div")(2, "strong");
    \u0275\u0275text(3, "Volumen del audio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "Porcentaje de volumen (0 = silencio, 100 = m\xE1ximo)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 74)(7, "input", 76);
    \u0275\u0275twoWayListener("ngModelChange", function UserManagementComponent_div_144_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.notifSettings.volume, $event) || (ctx_r0.notifSettings.volume = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function UserManagementComponent_div_144_Template_input_change_7_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.saveSettings());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.notifSettings.volume);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.notifSettings.volume, "%");
  }
}
function UserManagementComponent_div_145_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 40)(1, "div")(2, "strong");
    \u0275\u0275text(3, "Tipo de alerta");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "Voz sintetizada anuncia nombre y turno; tono emite un beep");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "mat-select", 77);
    \u0275\u0275twoWayListener("ngModelChange", function UserManagementComponent_div_145_Template_mat_select_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.notifSettings.alertType, $event) || (ctx_r0.notifSettings.alertType = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("selectionChange", function UserManagementComponent_div_145_Template_mat_select_selectionChange_6_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.saveSettings());
    });
    \u0275\u0275elementStart(7, "mat-option", 78);
    \u0275\u0275text(8, "Voz sintetizada");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "mat-option", 79);
    \u0275\u0275text(10, "Tono de alerta");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.notifSettings.alertType);
  }
}
function UserManagementComponent_div_146_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 40)(1, "div")(2, "strong");
    \u0275\u0275text(3, "Repeticiones del llamado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "N\xFAmero de veces que se repite el anuncio al llamar al paciente");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 74)(7, "input", 80);
    \u0275\u0275twoWayListener("ngModelChange", function UserManagementComponent_div_146_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.notifSettings.repetitions, $event) || (ctx_r0.notifSettings.repetitions = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function UserManagementComponent_div_146_Template_input_change_7_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.saveSettings());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span");
    \u0275\u0275text(9, "veces");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.notifSettings.repetitions);
  }
}
function UserManagementComponent_div_147_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 40)(1, "button", 81);
    \u0275\u0275listener("click", function UserManagementComponent_div_147_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.testAudio());
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "play_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Probar audio ");
    \u0275\u0275elementEnd()();
  }
}
function UserManagementComponent_div_153_span_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \xB7 Actual: ", ctx_r0.selectedUser == null ? null : ctx_r0.selectedUser.assignedClinic, "");
  }
}
function UserManagementComponent_div_153_mat_option_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 91);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "span", 92);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const c_r16 = ctx.$implicit;
    \u0275\u0275property("value", c_r16.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", c_r16.name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(m\xE1x. ", c_r16.maxDoctors, " m\xE9dicos)");
  }
}
function UserManagementComponent_div_153_button_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 93);
    \u0275\u0275listener("click", function UserManagementComponent_div_153_button_26_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.unassignClinic());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "location_off");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Desasignar ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r0.assigning);
  }
}
function UserManagementComponent_div_153_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 82)(1, "mat-card", 83)(2, "mat-card-header")(3, "mat-icon", 7);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "mat-card-title");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "mat-card-subtitle");
    \u0275\u0275text(8);
    \u0275\u0275template(9, UserManagementComponent_div_153_span_9_Template, 2, 1, "span", 55);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "mat-card-content")(11, "p", 84);
    \u0275\u0275text(12, "RN-M01: M\xE1x. de m\xE9dicos por cl\xEDnica. RN-M02: Solo una cl\xEDnica activa por m\xE9dico.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "mat-form-field", 85)(14, "mat-label");
    \u0275\u0275text(15, "Cl\xEDnica de Destino");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "mat-select", 86);
    \u0275\u0275twoWayListener("ngModelChange", function UserManagementComponent_div_153_Template_mat_select_ngModelChange_16_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.selectedClinicId, $event) || (ctx_r0.selectedClinicId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275template(17, UserManagementComponent_div_153_mat_option_17_Template, 4, 3, "mat-option", 87);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "mat-card-actions", 88)(19, "div", 89)(20, "button", 26);
    \u0275\u0275listener("click", function UserManagementComponent_div_153_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.assignClinic());
    });
    \u0275\u0275elementStart(21, "mat-icon");
    \u0275\u0275text(22, "check");
    \u0275\u0275elementEnd();
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "button", 27);
    \u0275\u0275listener("click", function UserManagementComponent_div_153_Template_button_click_24_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.assignDialogOpen = false);
    });
    \u0275\u0275text(25, "Cancelar");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(26, UserManagementComponent_div_153_button_26_Template, 4, 1, "button", 90);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate((ctx_r0.selectedUser == null ? null : ctx_r0.selectedUser.assignedClinic) ? "sync_alt" : "add_location");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((ctx_r0.selectedUser == null ? null : ctx_r0.selectedUser.assignedClinic) ? "Reasignar Cl\xEDnica" : "Asignar Cl\xEDnica");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" Dr. ", ctx_r0.selectedUser == null ? null : ctx_r0.selectedUser.firstName, " ", ctx_r0.selectedUser == null ? null : ctx_r0.selectedUser.lastName, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.selectedUser == null ? null : ctx_r0.selectedUser.assignedClinic);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.selectedClinicId);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(11, _c12));
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.clinics);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", !ctx_r0.selectedClinicId || ctx_r0.assigning);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.assigning ? "Guardando..." : "Confirmar", " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r0.selectedUser == null ? null : ctx_r0.selectedUser.assignedClinic);
  }
}
var NOTIF_KEY = "biocore_notification_settings";
function defaultSettings() {
  return { visualEnabled: true, audioEnabled: true, volume: 80, alertType: "voice", displaySeconds: 10, repetitions: 2 };
}
var UserManagementComponent = class _UserManagementComponent {
  constructor(fb, userService, clinicService, notification) {
    this.fb = fb;
    this.userService = userService;
    this.clinicService = clinicService;
    this.notification = notification;
    this.users = [];
    this.clinics = [];
    this.assignDialogOpen = false;
    this.selectedUser = null;
    this.selectedClinicId = null;
    this.assigning = false;
    this.createError = "";
    this.creating = false;
    this.columns = ["name", "role", "specialty", "clinic", "actions"];
    this.notifSettings = defaultSettings();
  }
  ngOnInit() {
    const stored = localStorage.getItem(NOTIF_KEY);
    if (stored)
      this.notifSettings = __spreadValues(__spreadValues({}, defaultSettings()), JSON.parse(stored));
    this.userForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      username: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(8)]],
      email: ["", [Validators.required, Validators.email]],
      role: ["DOCTOR", Validators.required],
      specialty: [""],
      collegiateNumber: [""]
    });
    this.userForm.get("role")?.valueChanges.subscribe((role) => {
      const ctrl = this.userForm.get("collegiateNumber");
      if (this.isCollegiateRequired(role)) {
        ctrl.setValidators([Validators.required]);
      } else {
        ctrl.clearValidators();
      }
      ctrl.updateValueAndValidity();
    });
    this.load();
    const allowedClinics = ["Consulta Externa", "Medicina General", "Emergencias"];
    this.clinicService.getAll().subscribe((res) => {
      if (res.success)
        this.clinics = res.data.filter((c) => allowedClinics.includes(c.name));
    });
  }
  isCollegiateRequired(role) {
    const r = role ?? this.userForm?.value?.role;
    return ["DOCTOR", "LAB_TECHNICIAN", "HEALTH_STAFF"].includes(r);
  }
  getAutoArea(role) {
    const m = {
      HEALTH_STAFF: "Signos Vitales / Recepci\xF3n",
      LAB_TECHNICIAN: "Laboratorio Cl\xEDnico",
      PHARMACIST: "Farmacia",
      CASHIER: "Caja / Pagos",
      ADMIN: "Administraci\xF3n"
    };
    return m[role] ?? "";
  }
  load() {
    this.userService.getAll().subscribe({
      next: (res) => {
        if (res.success)
          this.users = res.data.filter((u) => u.active && u.role !== "PATIENT");
      },
      error: () => this.notification.error("Error al cargar usuarios")
    });
  }
  createUser() {
    this.creating = true;
    this.createError = "";
    this.userService.create(this.userForm.value).subscribe({
      next: (res) => {
        if (res.success) {
          this.notification.success("Usuario creado exitosamente");
          this.userForm.reset({ role: "DOCTOR" });
          this.load();
        } else {
          this.createError = res.message || "Error al crear usuario";
        }
        this.creating = false;
      },
      error: (err) => {
        this.createError = err.error?.message || "Error al crear usuario (verifique colegiado duplicado)";
        this.creating = false;
      }
    });
  }
  openAssignDialog(user) {
    this.selectedUser = user;
    this.selectedClinicId = null;
    this.assignDialogOpen = true;
  }
  assignClinic() {
    if (!this.selectedUser || !this.selectedClinicId)
      return;
    this.assigning = true;
    const doAssign = () => {
      this.userService.assignClinic(this.selectedUser.id, this.selectedClinicId).subscribe({
        next: (res) => {
          if (res.success) {
            this.notification.success(`Dr. ${this.selectedUser.firstName} asignado a ${res.data.assignedClinic}`);
            this.assignDialogOpen = false;
            this.load();
          } else {
            this.notification.error(res.message || "Error en la asignaci\xF3n");
          }
          this.assigning = false;
        },
        error: (err) => {
          this.notification.error(err.error?.message || "Error: Verifique capacidad (RN-M01)");
          this.assigning = false;
        }
      });
    };
    if (this.selectedUser.assignedClinic) {
      this.userService.unassignClinic(this.selectedUser.id).subscribe({
        next: () => doAssign(),
        error: () => doAssign()
        // continuar aunque falle el unassign
      });
    } else {
      doAssign();
    }
  }
  unassignClinic() {
    if (!this.selectedUser)
      return;
    if (!confirm(`\xBFQuitar a Dr. ${this.selectedUser.firstName} de ${this.selectedUser.assignedClinic}?`))
      return;
    this.assigning = true;
    this.userService.unassignClinic(this.selectedUser.id).subscribe({
      next: () => {
        this.notification.info(`Dr. ${this.selectedUser.firstName} desasignado`);
        this.assignDialogOpen = false;
        this.load();
        this.assigning = false;
      },
      error: (err) => {
        this.notification.error(err.error?.message || "Error al desasignar");
        this.assigning = false;
      }
    });
  }
  deleteUser(id) {
    if (!confirm("\xBFDesactivar este usuario?"))
      return;
    this.userService.delete(id).subscribe({
      next: () => {
        this.notification.info("Usuario desactivado");
        this.load();
      },
      error: () => this.notification.error("Error al desactivar usuario")
    });
  }
  saveSettings() {
    localStorage.setItem(NOTIF_KEY, JSON.stringify(this.notifSettings));
  }
  testAudio() {
    if (!("speechSynthesis" in window)) {
      this.notification.info("El navegador no soporta s\xEDntesis de voz");
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance("Prueba de audio. Turno A-cero-cero-uno. Por favor dirigirse a Cl\xEDnica de Consulta Externa.");
    utter.lang = "es-ES";
    utter.volume = this.notifSettings.volume / 100;
    utter.rate = 0.85;
    window.speechSynthesis.speak(utter);
  }
  roleLabel(r) {
    const m = {
      ADMIN: "Administrador",
      DOCTOR: "M\xE9dico",
      HEALTH_STAFF: "Personal Salud / Enf.",
      LAB_TECHNICIAN: "Lab. T\xE9cnico",
      PHARMACIST: "Farmac\xE9utico",
      CASHIER: "Cajero/a",
      PATIENT: "Paciente"
    };
    return m[r] ?? r;
  }
  getRoleClass(r) {
    const m = {
      ADMIN: "role-admin",
      DOCTOR: "role-doctor",
      HEALTH_STAFF: "role-staff",
      LAB_TECHNICIAN: "role-lab",
      PHARMACIST: "role-pharmacy",
      CASHIER: "role-cashier"
    };
    return m[r] ?? "";
  }
  static {
    this.\u0275fac = function UserManagementComponent_Factory(t) {
      return new (t || _UserManagementComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(UserService), \u0275\u0275directiveInject(ClinicService), \u0275\u0275directiveInject(NotificationService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UserManagementComponent, selectors: [["app-user-management"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 154, vars: 22, consts: [[1, "page-container"], [1, "page-header"], [2, "vertical-align", "middle", "margin-right", "8px"], ["animationDuration", "200ms"], ["mat-tab-label", ""], [1, "tab-content"], [1, "mb-16"], ["mat-card-avatar", ""], [1, "form-grid", 3, "formGroup"], ["appearance", "outline"], ["matInput", "", "formControlName", "firstName"], ["matInput", "", "formControlName", "lastName"], ["matInput", "", "formControlName", "username"], ["matInput", "", "type", "password", "formControlName", "password"], ["matInput", "", "type", "email", "formControlName", "email"], ["formControlName", "role"], ["value", "ADMIN"], ["value", "DOCTOR"], ["value", "HEALTH_STAFF"], ["value", "LAB_TECHNICIAN"], ["value", "PHARMACIST"], ["value", "CASHIER"], ["class", "auto-area-info", 4, "ngIf"], ["appearance", "outline", 4, "ngIf"], ["class", "error-msg", 4, "ngIf"], [2, "display", "flex", "gap", "12px", "margin-top", "8px"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], ["mat-button", "", 3, "click"], ["mat-table", "", 1, "user-table", 3, "dataSource"], ["matColumnDef", "name"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "role"], ["matColumnDef", "specialty"], ["matColumnDef", "clinic"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["class", "empty-state", 4, "ngIf"], [1, "notif-section"], [1, "notif-row"], ["color", "primary", 3, "ngModelChange", "change", "ngModel"], ["class", "notif-row", 4, "ngIf"], [1, "save-row"], [2, "color", "#2e7d32"], ["class", "assign-overlay", 4, "ngIf"], [1, "tab-icon"], [1, "auto-area-info"], ["matInput", "", "formControlName", "specialty"], ["matInput", "", "formControlName", "collegiateNumber"], [1, "error-msg"], ["mat-header-cell", ""], ["mat-cell", ""], [2, "font-size", "0.75rem", "color", "#9e9e9e"], [1, "role-chip"], [4, "ngIf"], ["class", "collegiate-badge", 4, "ngIf"], ["style", "color:#bbb", 4, "ngIf"], [1, "collegiate-badge"], [2, "color", "#bbb"], ["class", "clinic-badge", 4, "ngIf"], ["class", "unassigned-badge", 4, "ngIf"], ["class", "area-badge", 4, "ngIf"], [1, "clinic-badge"], [2, "font-size", "14px", "vertical-align", "middle"], [1, "unassigned-badge"], [1, "area-badge"], [2, "font-size", "13px", "vertical-align", "middle"], ["mat-icon-button", "", "color", "primary", 3, "title", "click", 4, "ngIf"], ["mat-icon-button", "", "color", "warn", "title", "Desactivar usuario", 3, "click"], ["mat-icon-button", "", "color", "primary", 3, "click", "title"], ["mat-header-row", ""], ["mat-row", ""], [1, "empty-state"], [1, "notif-input"], ["type", "number", "min", "3", "max", "60", 1, "number-input", 3, "ngModelChange", "change", "ngModel"], ["type", "range", "min", "0", "max", "100", "step", "5", 1, "volume-slider", 3, "ngModelChange", "change", "ngModel"], [1, "notif-select", 3, "ngModelChange", "selectionChange", "ngModel"], ["value", "voice"], ["value", "tone"], ["type", "number", "min", "1", "max", "5", 1, "number-input", 3, "ngModelChange", "change", "ngModel"], ["mat-stroked-button", "", "color", "primary", 3, "click"], [1, "assign-overlay"], [1, "assign-dialog"], [1, "hint-text"], ["appearance", "outline", 1, "full-width"], [3, "ngModelChange", "ngModel", "ngModelOptions"], [3, "value", 4, "ngFor", "ngForOf"], [2, "display", "flex", "justify-content", "space-between", "align-items", "center"], [2, "display", "flex", "gap", "8px"], ["mat-stroked-button", "", "color", "warn", "title", "Quitar al m\xE9dico de su cl\xEDnica actual", 3, "disabled", "click", 4, "ngIf"], [3, "value"], [2, "color", "#9e9e9e", "font-size", "0.8rem"], ["mat-stroked-button", "", "color", "warn", "title", "Quitar al m\xE9dico de su cl\xEDnica actual", 3, "click", "disabled"]], template: function UserManagementComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1")(3, "mat-icon", 2);
        \u0275\u0275text(4, "manage_accounts");
        \u0275\u0275elementEnd();
        \u0275\u0275text(5, "Gesti\xF3n de Personal");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "mat-tab-group", 3)(7, "mat-tab");
        \u0275\u0275template(8, UserManagementComponent_ng_template_8_Template, 3, 1, "ng-template", 4);
        \u0275\u0275elementStart(9, "div", 5)(10, "mat-card", 6)(11, "mat-card-header")(12, "mat-icon", 7);
        \u0275\u0275text(13, "person_add");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "mat-card-title");
        \u0275\u0275text(15, "Nuevo Usuario");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "mat-card-subtitle");
        \u0275\u0275text(17, "FA01 \xB7 Registrar personal m\xE9dico o administrativo");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(18, "mat-card-content")(19, "form", 8)(20, "mat-form-field", 9)(21, "mat-label");
        \u0275\u0275text(22, "Nombres *");
        \u0275\u0275elementEnd();
        \u0275\u0275element(23, "input", 10);
        \u0275\u0275elementStart(24, "mat-error");
        \u0275\u0275text(25, "Requerido");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(26, "mat-form-field", 9)(27, "mat-label");
        \u0275\u0275text(28, "Apellidos *");
        \u0275\u0275elementEnd();
        \u0275\u0275element(29, "input", 11);
        \u0275\u0275elementStart(30, "mat-error");
        \u0275\u0275text(31, "Requerido");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(32, "mat-form-field", 9)(33, "mat-label");
        \u0275\u0275text(34, "Usuario *");
        \u0275\u0275elementEnd();
        \u0275\u0275element(35, "input", 12);
        \u0275\u0275elementStart(36, "mat-error");
        \u0275\u0275text(37, "Requerido");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(38, "mat-form-field", 9)(39, "mat-label");
        \u0275\u0275text(40, "Contrase\xF1a *");
        \u0275\u0275elementEnd();
        \u0275\u0275element(41, "input", 13);
        \u0275\u0275elementStart(42, "mat-hint");
        \u0275\u0275text(43, "M\xEDn. 8 caracteres");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(44, "mat-error");
        \u0275\u0275text(45, "M\xEDn. 8 caracteres");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(46, "mat-form-field", 9)(47, "mat-label");
        \u0275\u0275text(48, "Correo Electr\xF3nico *");
        \u0275\u0275elementEnd();
        \u0275\u0275element(49, "input", 14);
        \u0275\u0275elementStart(50, "mat-error");
        \u0275\u0275text(51, "Correo inv\xE1lido");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(52, "mat-form-field", 9)(53, "mat-label");
        \u0275\u0275text(54, "Rol *");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(55, "mat-select", 15)(56, "mat-option", 16);
        \u0275\u0275text(57, "Administrador");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(58, "mat-option", 17);
        \u0275\u0275text(59, "M\xE9dico");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(60, "mat-option", 18);
        \u0275\u0275text(61, "Personal de Salud / Enfermer\xEDa");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(62, "mat-option", 19);
        \u0275\u0275text(63, "T\xE9cnico de Laboratorio");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(64, "mat-option", 20);
        \u0275\u0275text(65, "Farmac\xE9utico/a");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(66, "mat-option", 21);
        \u0275\u0275text(67, "Cajero/a");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(68, "mat-error");
        \u0275\u0275text(69, "Requerido");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(70, UserManagementComponent_div_70_Template, 6, 1, "div", 22)(71, UserManagementComponent_mat_form_field_71_Template, 4, 0, "mat-form-field", 23)(72, UserManagementComponent_mat_form_field_72_Template, 6, 1, "mat-form-field", 23);
        \u0275\u0275elementEnd();
        \u0275\u0275template(73, UserManagementComponent_div_73_Template, 4, 1, "div", 24);
        \u0275\u0275elementStart(74, "div", 25)(75, "button", 26);
        \u0275\u0275listener("click", function UserManagementComponent_Template_button_click_75_listener() {
          return ctx.createUser();
        });
        \u0275\u0275elementStart(76, "mat-icon");
        \u0275\u0275text(77, "save");
        \u0275\u0275elementEnd();
        \u0275\u0275text(78);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(79, "button", 27);
        \u0275\u0275listener("click", function UserManagementComponent_Template_button_click_79_listener() {
          ctx.userForm.reset({ role: "DOCTOR" });
          return ctx.createError = "";
        });
        \u0275\u0275text(80, " Limpiar ");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(81, "mat-card")(82, "mat-card-header")(83, "mat-card-title");
        \u0275\u0275text(84, "Personal Registrado");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(85, "mat-card-content")(86, "table", 28);
        \u0275\u0275elementContainerStart(87, 29);
        \u0275\u0275template(88, UserManagementComponent_th_88_Template, 2, 0, "th", 30)(89, UserManagementComponent_td_89_Template, 5, 3, "td", 31);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(90, 32);
        \u0275\u0275template(91, UserManagementComponent_th_91_Template, 2, 0, "th", 30)(92, UserManagementComponent_td_92_Template, 3, 3, "td", 31);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(93, 33);
        \u0275\u0275template(94, UserManagementComponent_th_94_Template, 2, 0, "th", 30)(95, UserManagementComponent_td_95_Template, 4, 3, "td", 31);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(96, 34);
        \u0275\u0275template(97, UserManagementComponent_th_97_Template, 2, 0, "th", 30)(98, UserManagementComponent_td_98_Template, 4, 3, "td", 31);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(99, 35);
        \u0275\u0275template(100, UserManagementComponent_th_100_Template, 2, 0, "th", 30)(101, UserManagementComponent_td_101_Template, 5, 1, "td", 31);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275template(102, UserManagementComponent_tr_102_Template, 1, 0, "tr", 36)(103, UserManagementComponent_tr_103_Template, 1, 0, "tr", 37);
        \u0275\u0275elementEnd();
        \u0275\u0275template(104, UserManagementComponent_div_104_Template, 5, 0, "div", 38);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(105, "mat-tab");
        \u0275\u0275template(106, UserManagementComponent_ng_template_106_Template, 3, 0, "ng-template", 4);
        \u0275\u0275elementStart(107, "div", 5)(108, "mat-card")(109, "mat-card-header")(110, "mat-icon", 7);
        \u0275\u0275text(111, "notifications_active");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(112, "mat-card-title");
        \u0275\u0275text(113, "Configuraci\xF3n de Notificaciones");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(114, "mat-card-subtitle");
        \u0275\u0275text(115, "FA02 \xB7 Pantallas de llamado y sistema de audio (RN-N01, RN-N02)");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(116, "mat-card-content")(117, "div", 39)(118, "h3")(119, "mat-icon");
        \u0275\u0275text(120, "tv");
        \u0275\u0275elementEnd();
        \u0275\u0275text(121, " Notificaciones Visuales");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(122, "div", 40)(123, "div")(124, "strong");
        \u0275\u0275text(125, "Activar pantalla de llamado");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(126, "p");
        \u0275\u0275text(127, "Muestra el turno del paciente en la pantalla de sala de espera [RN-N01]");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(128, "mat-slide-toggle", 41);
        \u0275\u0275twoWayListener("ngModelChange", function UserManagementComponent_Template_mat_slide_toggle_ngModelChange_128_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.notifSettings.visualEnabled, $event) || (ctx.notifSettings.visualEnabled = $event);
          return $event;
        });
        \u0275\u0275listener("change", function UserManagementComponent_Template_mat_slide_toggle_change_128_listener() {
          return ctx.saveSettings();
        });
        \u0275\u0275text(129);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(130, UserManagementComponent_div_130_Template, 10, 1, "div", 42);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(131, "div", 39)(132, "h3")(133, "mat-icon");
        \u0275\u0275text(134, "volume_up");
        \u0275\u0275elementEnd();
        \u0275\u0275text(135, " Notificaciones Auditivas");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(136, "div", 40)(137, "div")(138, "strong");
        \u0275\u0275text(139, "Activar sistema de audio");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(140, "p");
        \u0275\u0275text(141, "Anuncia en voz alta el turno y cl\xEDnica del paciente [RN-N02]");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(142, "mat-slide-toggle", 41);
        \u0275\u0275twoWayListener("ngModelChange", function UserManagementComponent_Template_mat_slide_toggle_ngModelChange_142_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.notifSettings.audioEnabled, $event) || (ctx.notifSettings.audioEnabled = $event);
          return $event;
        });
        \u0275\u0275listener("change", function UserManagementComponent_Template_mat_slide_toggle_change_142_listener() {
          return ctx.saveSettings();
        });
        \u0275\u0275text(143);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(144, UserManagementComponent_div_144_Template, 10, 2, "div", 42)(145, UserManagementComponent_div_145_Template, 11, 1, "div", 42)(146, UserManagementComponent_div_146_Template, 10, 1, "div", 42)(147, UserManagementComponent_div_147_Template, 5, 0, "div", 42);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(148, "div", 43)(149, "mat-icon", 44);
        \u0275\u0275text(150, "check_circle");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(151, "span");
        \u0275\u0275text(152, "Los cambios se guardan autom\xE1ticamente y se aplican en tiempo real [RN-N03]");
        \u0275\u0275elementEnd()()()()()()()();
        \u0275\u0275template(153, UserManagementComponent_div_153_Template, 27, 12, "div", 45);
      }
      if (rf & 2) {
        \u0275\u0275advance(19);
        \u0275\u0275property("formGroup", ctx.userForm);
        \u0275\u0275advance(51);
        \u0275\u0275property("ngIf", ctx.getAutoArea(ctx.userForm.value.role));
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.userForm.value.role === "DOCTOR");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", \u0275\u0275pureFunction0(21, _c02).includes(ctx.userForm.value.role));
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.createError);
        \u0275\u0275advance(2);
        \u0275\u0275property("disabled", ctx.userForm.invalid || ctx.creating);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate1(" ", ctx.creating ? "Guardando..." : "Guardar Usuario", " ");
        \u0275\u0275advance(8);
        \u0275\u0275property("dataSource", ctx.users);
        \u0275\u0275advance(16);
        \u0275\u0275property("matHeaderRowDef", ctx.columns);
        \u0275\u0275advance();
        \u0275\u0275property("matRowDefColumns", ctx.columns);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.users.length === 0);
        \u0275\u0275advance(24);
        \u0275\u0275twoWayProperty("ngModel", ctx.notifSettings.visualEnabled);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.notifSettings.visualEnabled ? "Activa" : "Inactiva", " ");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.notifSettings.visualEnabled);
        \u0275\u0275advance(12);
        \u0275\u0275twoWayProperty("ngModel", ctx.notifSettings.audioEnabled);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.notifSettings.audioEnabled ? "Activo" : "Inactivo", " ");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.notifSettings.audioEnabled);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.notifSettings.audioEnabled);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.notifSettings.audioEnabled);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.notifSettings.audioEnabled);
        \u0275\u0275advance(6);
        \u0275\u0275property("ngIf", ctx.assignDialogOpen);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, RangeValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, MaxValidator, FormGroupDirective, FormControlName, FormsModule, NgModel, MatCardModule, MatCard, MatCardActions, MatCardAvatar, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle, MatButtonModule, MatButton, MatIconButton, MatIconModule, MatIcon, MatTableModule, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatFormFieldModule, MatFormField, MatLabel, MatHint, MatError, MatInputModule, MatInput, MatSelectModule, MatSelect, MatOption, MatChipsModule, MatTabsModule, MatTabLabel, MatTab, MatTabGroup, MatSlideToggleModule, MatSlideToggle], styles: ["\n\n.tab-content[_ngcontent-%COMP%] {\n  padding: 24px 0;\n}\n.tab-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  margin-right: 6px;\n  vertical-align: middle;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.6rem;\n  font-weight: 500;\n  color: #1D6C61;\n  margin: 0;\n}\n.form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 12px;\n  margin-bottom: 8px;\n}\n.mb-16[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.hint-text[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: #757575;\n  margin-bottom: 12px;\n}\n.user-table[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.role-chip[_ngcontent-%COMP%] {\n  padding: 3px 10px;\n  border-radius: 10px;\n  font-size: 0.78rem;\n  font-weight: 600;\n}\n.role-doctor[_ngcontent-%COMP%] {\n  background: #e3f2fd;\n  color: #1565c0;\n}\n.role-admin[_ngcontent-%COMP%] {\n  background: #fce4ec;\n  color: #c62828;\n}\n.role-nurse[_ngcontent-%COMP%] {\n  background: #f3e5f5;\n  color: #6a1b9a;\n}\n.role-lab[_ngcontent-%COMP%] {\n  background: #e8f5e9;\n  color: #2e7d32;\n}\n.role-pharmacy[_ngcontent-%COMP%] {\n  background: #fff3e0;\n  color: #e65100;\n}\n.role-cashier[_ngcontent-%COMP%] {\n  background: #f5f5f5;\n  color: #424242;\n}\n.role-staff[_ngcontent-%COMP%] {\n  background: #e0f7fa;\n  color: #006064;\n}\n.clinic-badge[_ngcontent-%COMP%] {\n  background: #d0f4ef;\n  color: #1D6C61;\n  padding: 3px 10px;\n  border-radius: 10px;\n  font-size: 0.78rem;\n}\n.unassigned-badge[_ngcontent-%COMP%] {\n  background: #fff3e0;\n  color: #e65100;\n  padding: 3px 10px;\n  border-radius: 10px;\n  font-size: 0.78rem;\n}\n.collegiate-badge[_ngcontent-%COMP%] {\n  background: #e8eaf6;\n  color: #3949ab;\n  padding: 2px 8px;\n  border-radius: 6px;\n  font-size: 0.75rem;\n  margin-left: 6px;\n}\n.area-badge[_ngcontent-%COMP%] {\n  background: #e8f5e9;\n  color: #2e7d32;\n  padding: 3px 10px;\n  border-radius: 10px;\n  font-size: 0.78rem;\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n}\n.auto-area-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  background: #e8f5e9;\n  color: #2e7d32;\n  border-radius: 8px;\n  padding: 8px 12px;\n  font-size: 0.82rem;\n  margin-top: -4px;\n}\n.error-msg[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: #c62828;\n  font-size: 0.88rem;\n  margin-top: 4px;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 32px;\n  color: #9e9e9e;\n}\n.empty-state[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 40px;\n  width: 40px;\n  height: 40px;\n}\n.notif-section[_ngcontent-%COMP%] {\n  margin-bottom: 32px;\n}\n.notif-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 1rem;\n  font-weight: 600;\n  color: #1D6C61;\n  margin-bottom: 16px;\n  border-bottom: 1px solid #e0e0e0;\n  padding-bottom: 8px;\n}\n.notif-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 12px 0;\n  border-bottom: 1px solid #f5f5f5;\n  gap: 16px;\n}\n.notif-row[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.notif-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 0.92rem;\n}\n.notif-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: #757575;\n  margin: 2px 0 0;\n}\n.notif-input[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.number-input[_ngcontent-%COMP%] {\n  width: 64px;\n  padding: 6px 10px;\n  border: 1px solid #bbb;\n  border-radius: 6px;\n  font-size: 1rem;\n  text-align: center;\n}\n.volume-slider[_ngcontent-%COMP%] {\n  width: 140px;\n  accent-color: #1D6C61;\n}\n.notif-select[_ngcontent-%COMP%] {\n  width: 180px;\n}\n.save-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: #2e7d32;\n  font-size: 0.85rem;\n  margin-top: 24px;\n  background: #e8f5e9;\n  padding: 12px 16px;\n  border-radius: 8px;\n}\n.assign-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n}\n.assign-dialog[_ngcontent-%COMP%] {\n  width: 420px;\n}\n/*# sourceMappingURL=user-management.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UserManagementComponent, { className: "UserManagementComponent", filePath: "src\\app\\modules\\user-management\\user-management.component.ts", lineNumber: 398 });
})();
export {
  UserManagementComponent
};
//# sourceMappingURL=chunk-HYRJCGQ6.js.map
