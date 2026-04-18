import {
  SAMPLE_TYPE_LABELS
} from "./chunk-3ZPA2CFB.js";
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
  LabExamService,
  LabService
} from "./chunk-6SNY3ZGW.js";
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
import "./chunk-MHA7Y7AJ.js";
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
  MatSuffix
} from "./chunk-QEMZUU6G.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-2J4O7HWV.js";
import "./chunk-EURQNLKS.js";
import {
  MatCardModule
} from "./chunk-ZXMIIXBI.js";
import {
  A11yModule,
  AriaDescriber,
  InteractivityChecker,
  MatButton,
  MatButtonModule,
  MatCommonModule,
  MatIcon,
  MatIconModule,
  MatOption
} from "./chunk-KREJ5GPI.js";
import {
  ANIMATION_MODULE_TYPE,
  ApplicationRef,
  ChangeDetectionStrategy,
  CommonModule,
  Component,
  DOCUMENT,
  DatePipe,
  Directive,
  ElementRef,
  EnvironmentInjector,
  Inject,
  Input,
  InputFlags,
  NgForOf,
  NgIf,
  NgModule,
  NgZone,
  Optional,
  Renderer2,
  ViewEncapsulation$1,
  booleanAttribute,
  createComponent,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵInputTransformsFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
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
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-XHW7K2DC.js";

// node_modules/@angular/material/fesm2022/badge.mjs
var nextId = 0;
var BADGE_CONTENT_CLASS = "mat-badge-content";
var badgeApps = /* @__PURE__ */ new Set();
var _MatBadgeStyleLoader = class __MatBadgeStyleLoader {
  static {
    this.\u0275fac = function _MatBadgeStyleLoader_Factory(t) {
      return new (t || __MatBadgeStyleLoader)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: __MatBadgeStyleLoader,
      selectors: [["ng-component"]],
      standalone: true,
      features: [\u0275\u0275StandaloneFeature],
      decls: 0,
      vars: 0,
      template: function _MatBadgeStyleLoader_Template(rf, ctx) {
      },
      styles: [".mat-badge{position:relative}.mat-badge.mat-badge{overflow:visible}.mat-badge-content{position:absolute;text-align:center;display:inline-block;transition:transform 200ms ease-in-out;transform:scale(0.6);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;box-sizing:border-box;pointer-events:none;background-color:var(--mat-badge-background-color);color:var(--mat-badge-text-color);font-family:var(--mat-badge-text-font);font-weight:var(--mat-badge-text-weight);border-radius:var(--mat-badge-container-shape)}.cdk-high-contrast-active .mat-badge-content{outline:solid 1px;border-radius:0}.mat-badge-above .mat-badge-content{bottom:100%}.mat-badge-below .mat-badge-content{top:100%}.mat-badge-before .mat-badge-content{right:100%}[dir=rtl] .mat-badge-before .mat-badge-content{right:auto;left:100%}.mat-badge-after .mat-badge-content{left:100%}[dir=rtl] .mat-badge-after .mat-badge-content{left:auto;right:100%}.mat-badge-disabled .mat-badge-content{background-color:var(--mat-badge-disabled-state-background-color);color:var(--mat-badge-disabled-state-text-color)}.mat-badge-hidden .mat-badge-content{display:none}.ng-animate-disabled .mat-badge-content,.mat-badge-content._mat-animation-noopable{transition:none}.mat-badge-content.mat-badge-active{transform:none}.mat-badge-small .mat-badge-content{width:var(--mat-badge-legacy-small-size-container-size, unset);height:var(--mat-badge-legacy-small-size-container-size, unset);min-width:var(--mat-badge-small-size-container-size, unset);min-height:var(--mat-badge-small-size-container-size, unset);line-height:var(--mat-badge-legacy-small-size-container-size, var(--mat-badge-small-size-container-size));padding:var(--mat-badge-small-size-container-padding);font-size:var(--mat-badge-small-size-text-size);margin:var(--mat-badge-small-size-container-offset)}.mat-badge-small.mat-badge-overlap .mat-badge-content{margin:var(--mat-badge-small-size-container-overlap-offset)}.mat-badge-medium .mat-badge-content{width:var(--mat-badge-legacy-container-size, unset);height:var(--mat-badge-legacy-container-size, unset);min-width:var(--mat-badge-container-size, unset);min-height:var(--mat-badge-container-size, unset);line-height:var(--mat-badge-legacy-container-size, var(--mat-badge-container-size));padding:var(--mat-badge-container-padding);font-size:var(--mat-badge-text-size);margin:var(--mat-badge-container-offset)}.mat-badge-medium.mat-badge-overlap .mat-badge-content{margin:var(--mat-badge-container-overlap-offset)}.mat-badge-large .mat-badge-content{width:var(--mat-badge-legacy-large-size-container-size, unset);height:var(--mat-badge-legacy-large-size-container-size, unset);min-width:var(--mat-badge-large-size-container-size, unset);min-height:var(--mat-badge-large-size-container-size, unset);line-height:var(--mat-badge-legacy-large-size-container-size, var(--mat-badge-large-size-container-size));padding:var(--mat-badge-large-size-container-padding);font-size:var(--mat-badge-large-size-text-size);margin:var(--mat-badge-large-size-container-offset)}.mat-badge-large.mat-badge-overlap .mat-badge-content{margin:var(--mat-badge-large-size-container-overlap-offset)}"],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(_MatBadgeStyleLoader, [{
    type: Component,
    args: [{
      standalone: true,
      encapsulation: ViewEncapsulation$1.None,
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush,
      styles: [".mat-badge{position:relative}.mat-badge.mat-badge{overflow:visible}.mat-badge-content{position:absolute;text-align:center;display:inline-block;transition:transform 200ms ease-in-out;transform:scale(0.6);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;box-sizing:border-box;pointer-events:none;background-color:var(--mat-badge-background-color);color:var(--mat-badge-text-color);font-family:var(--mat-badge-text-font);font-weight:var(--mat-badge-text-weight);border-radius:var(--mat-badge-container-shape)}.cdk-high-contrast-active .mat-badge-content{outline:solid 1px;border-radius:0}.mat-badge-above .mat-badge-content{bottom:100%}.mat-badge-below .mat-badge-content{top:100%}.mat-badge-before .mat-badge-content{right:100%}[dir=rtl] .mat-badge-before .mat-badge-content{right:auto;left:100%}.mat-badge-after .mat-badge-content{left:100%}[dir=rtl] .mat-badge-after .mat-badge-content{left:auto;right:100%}.mat-badge-disabled .mat-badge-content{background-color:var(--mat-badge-disabled-state-background-color);color:var(--mat-badge-disabled-state-text-color)}.mat-badge-hidden .mat-badge-content{display:none}.ng-animate-disabled .mat-badge-content,.mat-badge-content._mat-animation-noopable{transition:none}.mat-badge-content.mat-badge-active{transform:none}.mat-badge-small .mat-badge-content{width:var(--mat-badge-legacy-small-size-container-size, unset);height:var(--mat-badge-legacy-small-size-container-size, unset);min-width:var(--mat-badge-small-size-container-size, unset);min-height:var(--mat-badge-small-size-container-size, unset);line-height:var(--mat-badge-legacy-small-size-container-size, var(--mat-badge-small-size-container-size));padding:var(--mat-badge-small-size-container-padding);font-size:var(--mat-badge-small-size-text-size);margin:var(--mat-badge-small-size-container-offset)}.mat-badge-small.mat-badge-overlap .mat-badge-content{margin:var(--mat-badge-small-size-container-overlap-offset)}.mat-badge-medium .mat-badge-content{width:var(--mat-badge-legacy-container-size, unset);height:var(--mat-badge-legacy-container-size, unset);min-width:var(--mat-badge-container-size, unset);min-height:var(--mat-badge-container-size, unset);line-height:var(--mat-badge-legacy-container-size, var(--mat-badge-container-size));padding:var(--mat-badge-container-padding);font-size:var(--mat-badge-text-size);margin:var(--mat-badge-container-offset)}.mat-badge-medium.mat-badge-overlap .mat-badge-content{margin:var(--mat-badge-container-overlap-offset)}.mat-badge-large .mat-badge-content{width:var(--mat-badge-legacy-large-size-container-size, unset);height:var(--mat-badge-legacy-large-size-container-size, unset);min-width:var(--mat-badge-large-size-container-size, unset);min-height:var(--mat-badge-large-size-container-size, unset);line-height:var(--mat-badge-legacy-large-size-container-size, var(--mat-badge-large-size-container-size));padding:var(--mat-badge-large-size-container-padding);font-size:var(--mat-badge-large-size-text-size);margin:var(--mat-badge-large-size-container-offset)}.mat-badge-large.mat-badge-overlap .mat-badge-content{margin:var(--mat-badge-large-size-container-overlap-offset)}"]
    }]
  }], null, null);
})();
var MatBadge = class _MatBadge {
  /** The color of the badge. Can be `primary`, `accent`, or `warn`. */
  get color() {
    return this._color;
  }
  set color(value) {
    this._setColor(value);
    this._color = value;
  }
  /** The content for the badge */
  get content() {
    return this._content;
  }
  set content(newContent) {
    this._updateRenderedContent(newContent);
  }
  /** Message used to describe the decorated element via aria-describedby */
  get description() {
    return this._description;
  }
  set description(newDescription) {
    this._updateDescription(newDescription);
  }
  constructor(_ngZone, _elementRef, _ariaDescriber, _renderer, _animationMode) {
    this._ngZone = _ngZone;
    this._elementRef = _elementRef;
    this._ariaDescriber = _ariaDescriber;
    this._renderer = _renderer;
    this._animationMode = _animationMode;
    this._color = "primary";
    this.overlap = true;
    this.position = "above after";
    this.size = "medium";
    this._id = nextId++;
    this._isInitialized = false;
    this._interactivityChecker = inject(InteractivityChecker);
    this._document = inject(DOCUMENT);
    const appRef = inject(ApplicationRef);
    if (!badgeApps.has(appRef)) {
      badgeApps.add(appRef);
      const componentRef = createComponent(_MatBadgeStyleLoader, {
        environmentInjector: inject(EnvironmentInjector)
      });
      appRef.onDestroy(() => {
        badgeApps.delete(appRef);
        if (badgeApps.size === 0) {
          componentRef.destroy();
        }
      });
    }
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      const nativeElement = _elementRef.nativeElement;
      if (nativeElement.nodeType !== nativeElement.ELEMENT_NODE) {
        throw Error("matBadge must be attached to an element node.");
      }
      const matIconTagName = "mat-icon";
      if (nativeElement.tagName.toLowerCase() === matIconTagName && nativeElement.getAttribute("aria-hidden") === "true") {
        console.warn(`Detected a matBadge on an "aria-hidden" "<mat-icon>". Consider setting aria-hidden="false" in order to surface the information assistive technology.
${nativeElement.outerHTML}`);
      }
    }
  }
  /** Whether the badge is above the host or not */
  isAbove() {
    return this.position.indexOf("below") === -1;
  }
  /** Whether the badge is after the host or not */
  isAfter() {
    return this.position.indexOf("before") === -1;
  }
  /**
   * Gets the element into which the badge's content is being rendered. Undefined if the element
   * hasn't been created (e.g. if the badge doesn't have content).
   */
  getBadgeElement() {
    return this._badgeElement;
  }
  ngOnInit() {
    this._clearExistingBadges();
    if (this.content && !this._badgeElement) {
      this._badgeElement = this._createBadgeElement();
      this._updateRenderedContent(this.content);
    }
    this._isInitialized = true;
  }
  ngOnDestroy() {
    if (this._renderer.destroyNode) {
      this._renderer.destroyNode(this._badgeElement);
      this._inlineBadgeDescription?.remove();
    }
    this._ariaDescriber.removeDescription(this._elementRef.nativeElement, this.description);
  }
  /** Gets whether the badge's host element is interactive. */
  _isHostInteractive() {
    return this._interactivityChecker.isFocusable(this._elementRef.nativeElement, {
      ignoreVisibility: true
    });
  }
  /** Creates the badge element */
  _createBadgeElement() {
    const badgeElement = this._renderer.createElement("span");
    const activeClass = "mat-badge-active";
    badgeElement.setAttribute("id", `mat-badge-content-${this._id}`);
    badgeElement.setAttribute("aria-hidden", "true");
    badgeElement.classList.add(BADGE_CONTENT_CLASS);
    if (this._animationMode === "NoopAnimations") {
      badgeElement.classList.add("_mat-animation-noopable");
    }
    this._elementRef.nativeElement.appendChild(badgeElement);
    if (typeof requestAnimationFrame === "function" && this._animationMode !== "NoopAnimations") {
      this._ngZone.runOutsideAngular(() => {
        requestAnimationFrame(() => {
          badgeElement.classList.add(activeClass);
        });
      });
    } else {
      badgeElement.classList.add(activeClass);
    }
    return badgeElement;
  }
  /** Update the text content of the badge element in the DOM, creating the element if necessary. */
  _updateRenderedContent(newContent) {
    const newContentNormalized = `${newContent ?? ""}`.trim();
    if (this._isInitialized && newContentNormalized && !this._badgeElement) {
      this._badgeElement = this._createBadgeElement();
    }
    if (this._badgeElement) {
      this._badgeElement.textContent = newContentNormalized;
    }
    this._content = newContentNormalized;
  }
  /** Updates the host element's aria description via AriaDescriber. */
  _updateDescription(newDescription) {
    this._ariaDescriber.removeDescription(this._elementRef.nativeElement, this.description);
    if (!newDescription || this._isHostInteractive()) {
      this._removeInlineDescription();
    }
    this._description = newDescription;
    if (this._isHostInteractive()) {
      this._ariaDescriber.describe(this._elementRef.nativeElement, newDescription);
    } else {
      this._updateInlineDescription();
    }
  }
  _updateInlineDescription() {
    if (!this._inlineBadgeDescription) {
      this._inlineBadgeDescription = this._document.createElement("span");
      this._inlineBadgeDescription.classList.add("cdk-visually-hidden");
    }
    this._inlineBadgeDescription.textContent = this.description;
    this._badgeElement?.appendChild(this._inlineBadgeDescription);
  }
  _removeInlineDescription() {
    this._inlineBadgeDescription?.remove();
    this._inlineBadgeDescription = void 0;
  }
  /** Adds css theme class given the color to the component host */
  _setColor(colorPalette) {
    const classList = this._elementRef.nativeElement.classList;
    classList.remove(`mat-badge-${this._color}`);
    if (colorPalette) {
      classList.add(`mat-badge-${colorPalette}`);
    }
  }
  /** Clears any existing badges that might be left over from server-side rendering. */
  _clearExistingBadges() {
    const badges = this._elementRef.nativeElement.querySelectorAll(`:scope > .${BADGE_CONTENT_CLASS}`);
    for (const badgeElement of Array.from(badges)) {
      if (badgeElement !== this._badgeElement) {
        badgeElement.remove();
      }
    }
  }
  static {
    this.\u0275fac = function MatBadge_Factory(t) {
      return new (t || _MatBadge)(\u0275\u0275directiveInject(NgZone), \u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(AriaDescriber), \u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(ANIMATION_MODULE_TYPE, 8));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MatBadge,
      selectors: [["", "matBadge", ""]],
      hostAttrs: [1, "mat-badge"],
      hostVars: 20,
      hostBindings: function MatBadge_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275classProp("mat-badge-overlap", ctx.overlap)("mat-badge-above", ctx.isAbove())("mat-badge-below", !ctx.isAbove())("mat-badge-before", !ctx.isAfter())("mat-badge-after", ctx.isAfter())("mat-badge-small", ctx.size === "small")("mat-badge-medium", ctx.size === "medium")("mat-badge-large", ctx.size === "large")("mat-badge-hidden", ctx.hidden || !ctx.content)("mat-badge-disabled", ctx.disabled);
        }
      },
      inputs: {
        color: [InputFlags.None, "matBadgeColor", "color"],
        overlap: [InputFlags.HasDecoratorInputTransform, "matBadgeOverlap", "overlap", booleanAttribute],
        disabled: [InputFlags.HasDecoratorInputTransform, "matBadgeDisabled", "disabled", booleanAttribute],
        position: [InputFlags.None, "matBadgePosition", "position"],
        content: [InputFlags.None, "matBadge", "content"],
        description: [InputFlags.None, "matBadgeDescription", "description"],
        size: [InputFlags.None, "matBadgeSize", "size"],
        hidden: [InputFlags.HasDecoratorInputTransform, "matBadgeHidden", "hidden", booleanAttribute]
      },
      standalone: true,
      features: [\u0275\u0275InputTransformsFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatBadge, [{
    type: Directive,
    args: [{
      selector: "[matBadge]",
      host: {
        "class": "mat-badge",
        "[class.mat-badge-overlap]": "overlap",
        "[class.mat-badge-above]": "isAbove()",
        "[class.mat-badge-below]": "!isAbove()",
        "[class.mat-badge-before]": "!isAfter()",
        "[class.mat-badge-after]": "isAfter()",
        "[class.mat-badge-small]": 'size === "small"',
        "[class.mat-badge-medium]": 'size === "medium"',
        "[class.mat-badge-large]": 'size === "large"',
        "[class.mat-badge-hidden]": "hidden || !content",
        "[class.mat-badge-disabled]": "disabled"
      },
      standalone: true
    }]
  }], () => [{
    type: NgZone
  }, {
    type: ElementRef
  }, {
    type: AriaDescriber
  }, {
    type: Renderer2
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [ANIMATION_MODULE_TYPE]
    }]
  }], {
    color: [{
      type: Input,
      args: ["matBadgeColor"]
    }],
    overlap: [{
      type: Input,
      args: [{
        alias: "matBadgeOverlap",
        transform: booleanAttribute
      }]
    }],
    disabled: [{
      type: Input,
      args: [{
        alias: "matBadgeDisabled",
        transform: booleanAttribute
      }]
    }],
    position: [{
      type: Input,
      args: ["matBadgePosition"]
    }],
    content: [{
      type: Input,
      args: ["matBadge"]
    }],
    description: [{
      type: Input,
      args: ["matBadgeDescription"]
    }],
    size: [{
      type: Input,
      args: ["matBadgeSize"]
    }],
    hidden: [{
      type: Input,
      args: [{
        alias: "matBadgeHidden",
        transform: booleanAttribute
      }]
    }]
  });
})();
var MatBadgeModule = class _MatBadgeModule {
  static {
    this.\u0275fac = function MatBadgeModule_Factory(t) {
      return new (t || _MatBadgeModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
      type: _MatBadgeModule
    });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
      imports: [A11yModule, MatCommonModule, MatCommonModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatBadgeModule, [{
    type: NgModule,
    args: [{
      // Note: we _shouldn't_ have to import `_MatBadgeStyleLoader`,
      // but it seems to be necessary for tests.
      imports: [A11yModule, MatCommonModule, MatBadge, _MatBadgeStyleLoader],
      exports: [MatBadge, MatCommonModule]
    }]
  }], null, null);
})();

// src/app/modules/laboratory/laboratory.component.ts
function LaboratoryComponent_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 25);
    \u0275\u0275text(1, "pending_actions");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Pendientes (", ctx_r0.pending.length, ") ");
  }
}
function LaboratoryComponent_div_10_span_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 41);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(o_r2.labExamCode);
  }
}
function LaboratoryComponent_div_10_span_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const o_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(o_r2.labExamName);
  }
}
function LaboratoryComponent_div_10_span_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.sampleLabel(o_r2.sampleType));
  }
}
function LaboratoryComponent_div_10_strong_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "strong");
    \u0275\u0275text(1, " \u26A0 Pr\xF3ximo a vencer");
    \u0275\u0275elementEnd();
  }
}
function LaboratoryComponent_div_10_div_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33)(1, "mat-icon");
    \u0275\u0275text(2, "schedule");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const o_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Cita: ", \u0275\u0275pipeBind2(5, 1, o_r2.scheduledAt, "dd/MM/yyyy HH:mm"), "");
  }
}
function LaboratoryComponent_div_10_button_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 42);
    \u0275\u0275listener("click", function LaboratoryComponent_div_10_button_34_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const o_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.collectSample(o_r2.id));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "colorize");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Tomar Muestra ");
    \u0275\u0275elementEnd();
  }
}
function LaboratoryComponent_div_10_button_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 43);
    \u0275\u0275listener("click", function LaboratoryComponent_div_10_button_35_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const o_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.openScheduleForm(o_r2));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "event");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Programar Cita ");
    \u0275\u0275elementEnd();
  }
}
function LaboratoryComponent_div_10_button_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 44);
    \u0275\u0275listener("click", function LaboratoryComponent_div_10_button_36_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const o_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.openCompleteForm(o_r2));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Registrar Resultado ");
    \u0275\u0275elementEnd();
  }
}
function LaboratoryComponent_div_10_div_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 45)(1, "mat-form-field", 10)(2, "mat-label");
    \u0275\u0275text(3, "Fecha y hora de la cita");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 46);
    \u0275\u0275twoWayListener("ngModelChange", function LaboratoryComponent_div_10_div_37_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.scheduleDateTime, $event) || (ctx_r0.scheduleDateTime = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 47)(6, "button", 48);
    \u0275\u0275listener("click", function LaboratoryComponent_div_10_div_37_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.schedulingOrder = null);
    });
    \u0275\u0275text(7, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 49);
    \u0275\u0275listener("click", function LaboratoryComponent_div_10_div_37_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r6);
      const o_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.saveSchedule(o_r2.id));
    });
    \u0275\u0275elementStart(9, "mat-icon");
    \u0275\u0275text(10, "save");
    \u0275\u0275elementEnd();
    \u0275\u0275text(11, " Confirmar Cita ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.scheduleDateTime);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", !ctx_r0.scheduleDateTime);
  }
}
function LaboratoryComponent_div_10_div_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 45)(1, "form", 50)(2, "mat-form-field", 51)(3, "mat-label");
    \u0275\u0275text(4, "Notas del resultado");
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "textarea", 52);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "mat-form-field", 10)(7, "mat-label");
    \u0275\u0275text(8, "Disponible a partir de");
    \u0275\u0275elementEnd();
    \u0275\u0275element(9, "input", 53);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 47)(11, "button", 48);
    \u0275\u0275listener("click", function LaboratoryComponent_div_10_div_38_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.showCompleteForm = false);
    });
    \u0275\u0275text(12, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 49);
    \u0275\u0275listener("click", function LaboratoryComponent_div_10_div_38_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r7);
      const o_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.completeOrder(o_r2.id));
    });
    \u0275\u0275elementStart(14, "mat-icon");
    \u0275\u0275text(15, "send");
    \u0275\u0275elementEnd();
    \u0275\u0275text(16, " Guardar y Notificar al Paciente ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r0.completeForm);
    \u0275\u0275advance(12);
    \u0275\u0275property("disabled", ctx_r0.completeForm.invalid);
  }
}
function LaboratoryComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26)(1, "div", 27)(2, "div", 28)(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 29);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, LaboratoryComponent_div_10_span_7_Template, 2, 1, "span", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 31);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 32)(11, "div", 33)(12, "mat-icon");
    \u0275\u0275text(13, "biotech");
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, LaboratoryComponent_div_10_span_14_Template, 3, 1, "span", 34)(15, LaboratoryComponent_div_10_span_15_Template, 2, 1, "span", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 33)(17, "mat-icon");
    \u0275\u0275text(18, "water_drop");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span");
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 33)(22, "mat-icon");
    \u0275\u0275text(23, "calendar_today");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span");
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 33)(27, "mat-icon");
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "span");
    \u0275\u0275text(30);
    \u0275\u0275template(31, LaboratoryComponent_div_10_strong_31_Template, 2, 0, "strong", 34);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(32, LaboratoryComponent_div_10_div_32_Template, 6, 4, "div", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "div", 36);
    \u0275\u0275template(34, LaboratoryComponent_div_10_button_34_Template, 4, 0, "button", 37)(35, LaboratoryComponent_div_10_button_35_Template, 4, 0, "button", 38)(36, LaboratoryComponent_div_10_button_36_Template, 4, 0, "button", 39);
    \u0275\u0275elementEnd();
    \u0275\u0275template(37, LaboratoryComponent_div_10_div_37_Template, 12, 2, "div", 40)(38, LaboratoryComponent_div_10_div_38_Template, 17, 2, "div", 40);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r2 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(o_r2.patientName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Orden #", o_r2.id, "");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", o_r2.labExamCode);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r0.getStatusClass(o_r2.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.statusLabel(o_r2.status), " ");
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", o_r2.labExamName);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !o_r2.labExamName);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("Muestra: ", ctx_r0.sampleLabel(o_r2.sampleType), "");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("Emitida: ", o_r2.orderDate, "");
    \u0275\u0275advance();
    \u0275\u0275classProp("expiring", ctx_r0.isExpiringSoon(o_r2.expirationDate));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.isExpiringSoon(o_r2.expirationDate) ? "warning" : "event");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Vence: ", o_r2.expirationDate, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isExpiringSoon(o_r2.expirationDate));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", o_r2.scheduledAt);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", o_r2.status === "PENDING");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", o_r2.status === "PENDING" || o_r2.status === "SAMPLE_COLLECTED");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", o_r2.status === "SAMPLE_COLLECTED" || o_r2.status === "SCHEDULED");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (ctx_r0.schedulingOrder == null ? null : ctx_r0.schedulingOrder.id) === o_r2.id);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (ctx_r0.selectedOrder == null ? null : ctx_r0.selectedOrder.id) === o_r2.id && ctx_r0.showCompleteForm);
  }
}
function LaboratoryComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 54)(1, "mat-icon");
    \u0275\u0275text(2, "check_circle_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "No hay \xF3rdenes pendientes");
    \u0275\u0275elementEnd()();
  }
}
function LaboratoryComponent_ng_template_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 25);
    \u0275\u0275text(1, "task_alt");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Completadas (", ctx_r0.completed.length, ") ");
  }
}
function LaboratoryComponent_div_15_span_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 41);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(o_r8.labExamCode);
  }
}
function LaboratoryComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 55)(1, "div", 27)(2, "div", 28)(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 29);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, LaboratoryComponent_div_15_span_7_Template, 2, 1, "span", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 56);
    \u0275\u0275text(9, "Completado");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 32)(11, "div", 33)(12, "mat-icon");
    \u0275\u0275text(13, "biotech");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 33)(17, "mat-icon");
    \u0275\u0275text(18, "notifications_active");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span");
    \u0275\u0275text(20);
    \u0275\u0275pipe(21, "date");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const o_r8 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(o_r8.patientName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Orden #", o_r8.id, "");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", o_r8.labExamCode);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(o_r8.labExamName || ctx_r0.sampleLabel(o_r8.sampleType));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("Resultados disponibles: ", \u0275\u0275pipeBind2(21, 5, o_r8.resultAvailableAt, "dd/MM/yyyy HH:mm"), "");
  }
}
function LaboratoryComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 54)(1, "mat-icon");
    \u0275\u0275text(2, "science");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Sin resultados registrados");
    \u0275\u0275elementEnd()();
  }
}
function LaboratoryComponent_ng_template_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 25);
    \u0275\u0275text(1, "menu_book");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Cat\xE1logo (", ctx_r0.labExams.length, ") ");
  }
}
function LaboratoryComponent_mat_option_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 57);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cat_r9 = ctx.$implicit;
    \u0275\u0275property("value", cat_r9);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(cat_r9);
  }
}
function LaboratoryComponent_th_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 58);
    \u0275\u0275text(1, "C\xF3digo");
    \u0275\u0275elementEnd();
  }
}
function LaboratoryComponent_td_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 59)(1, "span", 41);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const e_r10 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r10.code);
  }
}
function LaboratoryComponent_th_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 58);
    \u0275\u0275text(1, "Examen");
    \u0275\u0275elementEnd();
  }
}
function LaboratoryComponent_td_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 59)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const e_r11 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r11.name);
  }
}
function LaboratoryComponent_th_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 58);
    \u0275\u0275text(1, "Muestra");
    \u0275\u0275elementEnd();
  }
}
function LaboratoryComponent_td_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 59);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r12 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.sampleLabel(e_r12.sampleType));
  }
}
function LaboratoryComponent_th_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 58);
    \u0275\u0275text(1, "Categor\xEDa");
    \u0275\u0275elementEnd();
  }
}
function LaboratoryComponent_td_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 59)(1, "span", 60);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const e_r13 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r13.category);
  }
}
function LaboratoryComponent_tr_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 61);
  }
}
function LaboratoryComponent_tr_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 62);
  }
}
var LaboratoryComponent = class _LaboratoryComponent {
  constructor(fb, labService, labExamService, notification) {
    this.fb = fb;
    this.labService = labService;
    this.labExamService = labExamService;
    this.notification = notification;
    this.pending = [];
    this.completed = [];
    this.labExams = [];
    this.filteredExams = [];
    this.categories = [];
    this.selectedCategory = "";
    this.searchQuery = "";
    this.selectedOrder = null;
    this.schedulingOrder = null;
    this.scheduleDateTime = "";
    this.showCompleteForm = false;
    this.catalogColumns = ["code", "name", "sampleType", "category"];
  }
  ngOnInit() {
    this.completeForm = this.fb.group({
      notes: [""],
      resultAvailableAt: ["", Validators.required]
    });
    this.load();
    this.loadCatalog();
  }
  load() {
    this.labService.getPending().subscribe({
      next: (res) => {
        if (res.success) {
          this.pending = res.data.filter((o) => o.status !== "COMPLETED" && o.status !== "EXPIRED");
          this.completed = res.data.filter((o) => o.status === "COMPLETED");
        }
      },
      error: () => this.notification.error("Error al cargar \xF3rdenes")
    });
  }
  loadCatalog() {
    this.labExamService.getAll().subscribe((res) => {
      if (res.success) {
        this.labExams = res.data;
        this.filteredExams = res.data;
      }
    });
    this.labExamService.getCategories().subscribe((res) => {
      if (res.success)
        this.categories = res.data;
    });
  }
  filterExams() {
    let result = this.labExams;
    if (this.selectedCategory) {
      result = result.filter((e) => e.category === this.selectedCategory);
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter((e) => e.name.toLowerCase().includes(q) || e.code.toLowerCase().includes(q));
    }
    this.filteredExams = result;
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
  openScheduleForm(order) {
    this.schedulingOrder = order;
    this.scheduleDateTime = "";
  }
  saveSchedule(id) {
    this.labService.schedule(id, this.scheduleDateTime).subscribe({
      next: () => {
        this.notification.success("Cita programada");
        this.schedulingOrder = null;
        this.load();
      },
      error: () => this.notification.error("Error al programar cita")
    });
  }
  openCompleteForm(order) {
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
      error: () => this.notification.error("Verifique que el paciente tenga correo registrado (Regla L03)")
    });
  }
  isExpiringSoon(expirationDate) {
    const diff = (new Date(expirationDate).getTime() - Date.now()) / (1e3 * 60 * 60 * 24);
    return diff <= 5 && diff > 0;
  }
  sampleLabel(s) {
    return SAMPLE_TYPE_LABELS[s] ?? s;
  }
  statusLabel(s) {
    const m = {
      PENDING: "Pendiente",
      SAMPLE_COLLECTED: "Muestra Recolectada",
      SCHEDULED: "Cita Programada",
      COMPLETED: "Completado",
      EXPIRED: "Expirado"
    };
    return m[s] ?? s;
  }
  getStatusClass(status) {
    const m = {
      PENDING: "status-waiting",
      SAMPLE_COLLECTED: "status-being-called",
      SCHEDULED: "status-in-consultation",
      COMPLETED: "status-completed",
      EXPIRED: "status-absent"
    };
    return m[status] ?? "";
  }
  static {
    this.\u0275fac = function LaboratoryComponent_Factory(t) {
      return new (t || _LaboratoryComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(LabService), \u0275\u0275directiveInject(LabExamService), \u0275\u0275directiveInject(NotificationService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LaboratoryComponent, selectors: [["app-laboratory"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 49, vars: 10, consts: [[1, "page-container"], [1, "page-header"], [2, "vertical-align", "middle", "margin-right", "8px"], ["animationDuration", "200ms"], ["mat-tab-label", ""], [1, "tab-content"], ["class", "lab-order", 4, "ngFor", "ngForOf"], ["class", "empty-state", 4, "ngIf"], ["class", "lab-order completed", 4, "ngFor", "ngForOf"], [1, "catalog-filters"], ["appearance", "outline"], [3, "ngModelChange", "selectionChange", "ngModel"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["matInput", "", "placeholder", "Nombre o c\xF3digo", 3, "ngModelChange", "input", "ngModel"], ["matSuffix", ""], ["mat-table", "", 1, "catalog-table", 3, "dataSource"], ["matColumnDef", "code"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "name"], ["matColumnDef", "sampleType"], ["matColumnDef", "category"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], [1, "tab-icon"], [1, "lab-order"], [1, "order-header"], [1, "order-title"], [1, "code-badge"], ["class", "exam-badge", 4, "ngIf"], [1, "status-chip"], [1, "order-details"], [1, "detail-item"], [4, "ngIf"], ["class", "detail-item", 4, "ngIf"], [1, "order-actions"], ["mat-stroked-button", "", "color", "primary", 3, "click", 4, "ngIf"], ["mat-stroked-button", "", 3, "click", 4, "ngIf"], ["mat-raised-button", "", "color", "primary", 3, "click", 4, "ngIf"], ["class", "sub-panel", 4, "ngIf"], [1, "exam-badge"], ["mat-stroked-button", "", "color", "primary", 3, "click"], ["mat-stroked-button", "", 3, "click"], ["mat-raised-button", "", "color", "primary", 3, "click"], [1, "sub-panel"], ["matInput", "", "type", "datetime-local", 3, "ngModelChange", "ngModel"], [1, "sub-panel-actions"], ["mat-button", "", 3, "click"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], [3, "formGroup"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "formControlName", "notes", "rows", "3"], ["matInput", "", "type", "datetime-local", "formControlName", "resultAvailableAt"], [1, "empty-state"], [1, "lab-order", "completed"], [1, "status-chip", "status-completed"], [3, "value"], ["mat-header-cell", ""], ["mat-cell", ""], [1, "category-chip"], ["mat-header-row", ""], ["mat-row", ""]], template: function LaboratoryComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1")(3, "mat-icon", 2);
        \u0275\u0275text(4, "science");
        \u0275\u0275elementEnd();
        \u0275\u0275text(5, "Laboratorio");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "mat-tab-group", 3)(7, "mat-tab");
        \u0275\u0275template(8, LaboratoryComponent_ng_template_8_Template, 3, 1, "ng-template", 4);
        \u0275\u0275elementStart(9, "div", 5);
        \u0275\u0275template(10, LaboratoryComponent_div_10_Template, 39, 21, "div", 6)(11, LaboratoryComponent_div_11_Template, 5, 0, "div", 7);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(12, "mat-tab");
        \u0275\u0275template(13, LaboratoryComponent_ng_template_13_Template, 3, 1, "ng-template", 4);
        \u0275\u0275elementStart(14, "div", 5);
        \u0275\u0275template(15, LaboratoryComponent_div_15_Template, 22, 8, "div", 8)(16, LaboratoryComponent_div_16_Template, 5, 0, "div", 7);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(17, "mat-tab");
        \u0275\u0275template(18, LaboratoryComponent_ng_template_18_Template, 3, 1, "ng-template", 4);
        \u0275\u0275elementStart(19, "div", 5)(20, "div", 9)(21, "mat-form-field", 10)(22, "mat-label");
        \u0275\u0275text(23, "Filtrar por categor\xEDa");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "mat-select", 11);
        \u0275\u0275twoWayListener("ngModelChange", function LaboratoryComponent_Template_mat_select_ngModelChange_24_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.selectedCategory, $event) || (ctx.selectedCategory = $event);
          return $event;
        });
        \u0275\u0275listener("selectionChange", function LaboratoryComponent_Template_mat_select_selectionChange_24_listener() {
          return ctx.filterExams();
        });
        \u0275\u0275elementStart(25, "mat-option", 12);
        \u0275\u0275text(26, "Todas las categor\xEDas");
        \u0275\u0275elementEnd();
        \u0275\u0275template(27, LaboratoryComponent_mat_option_27_Template, 2, 2, "mat-option", 13);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(28, "mat-form-field", 10)(29, "mat-label");
        \u0275\u0275text(30, "Buscar");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(31, "input", 14);
        \u0275\u0275twoWayListener("ngModelChange", function LaboratoryComponent_Template_input_ngModelChange_31_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event);
          return $event;
        });
        \u0275\u0275listener("input", function LaboratoryComponent_Template_input_input_31_listener() {
          return ctx.filterExams();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "mat-icon", 15);
        \u0275\u0275text(33, "search");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(34, "table", 16);
        \u0275\u0275elementContainerStart(35, 17);
        \u0275\u0275template(36, LaboratoryComponent_th_36_Template, 2, 0, "th", 18)(37, LaboratoryComponent_td_37_Template, 3, 1, "td", 19);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(38, 20);
        \u0275\u0275template(39, LaboratoryComponent_th_39_Template, 2, 0, "th", 18)(40, LaboratoryComponent_td_40_Template, 3, 1, "td", 19);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(41, 21);
        \u0275\u0275template(42, LaboratoryComponent_th_42_Template, 2, 0, "th", 18)(43, LaboratoryComponent_td_43_Template, 2, 1, "td", 19);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(44, 22);
        \u0275\u0275template(45, LaboratoryComponent_th_45_Template, 2, 0, "th", 18)(46, LaboratoryComponent_td_46_Template, 3, 1, "td", 19);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275template(47, LaboratoryComponent_tr_47_Template, 1, 0, "tr", 23)(48, LaboratoryComponent_tr_48_Template, 1, 0, "tr", 24);
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(10);
        \u0275\u0275property("ngForOf", ctx.pending);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.pending.length === 0);
        \u0275\u0275advance(4);
        \u0275\u0275property("ngForOf", ctx.completed);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.completed.length === 0);
        \u0275\u0275advance(8);
        \u0275\u0275twoWayProperty("ngModel", ctx.selectedCategory);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngForOf", ctx.categories);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery);
        \u0275\u0275advance(3);
        \u0275\u0275property("dataSource", ctx.filteredExams);
        \u0275\u0275advance(13);
        \u0275\u0275property("matHeaderRowDef", ctx.catalogColumns);
        \u0275\u0275advance();
        \u0275\u0275property("matRowDefColumns", ctx.catalogColumns);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, DatePipe, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, FormsModule, NgModel, MatCardModule, MatButtonModule, MatButton, MatIconModule, MatIcon, MatTabsModule, MatTabLabel, MatTab, MatTabGroup, MatTableModule, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatChipsModule, MatFormFieldModule, MatFormField, MatLabel, MatSuffix, MatInputModule, MatInput, MatSelectModule, MatSelect, MatOption, MatBadgeModule], styles: ["\n\n.tab-content[_ngcontent-%COMP%] {\n  padding: 24px 0;\n}\n.tab-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  margin-right: 6px;\n  vertical-align: middle;\n}\n.lab-order[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 20px;\n  margin-bottom: 16px;\n  box-shadow: 0 2px 8px rgba(29, 108, 97, 0.08);\n  border: 1px solid #d4e8e5;\n}\n.lab-order.completed[_ngcontent-%COMP%] {\n  opacity: 0.85;\n}\n.order-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 12px;\n}\n.order-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.order-title[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.code-badge[_ngcontent-%COMP%] {\n  background: #d0f4ef;\n  color: #1D6C61;\n  padding: 2px 8px;\n  border-radius: 8px;\n  font-size: 0.78rem;\n  font-weight: 600;\n}\n.exam-badge[_ngcontent-%COMP%] {\n  background: #193A31;\n  color: #3EB9A8;\n  padding: 2px 8px;\n  border-radius: 8px;\n  font-size: 0.78rem;\n  font-weight: 600;\n}\n.status-chip[_ngcontent-%COMP%] {\n  padding: 4px 12px;\n  border-radius: 12px;\n  font-size: 0.8rem;\n  font-weight: 500;\n}\n.order-details[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  margin-bottom: 14px;\n}\n.detail-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 0.88rem;\n  color: #444;\n}\n.detail-item[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n  color: #1D6C61;\n}\n.detail-item.expiring[_ngcontent-%COMP%] {\n  color: #e65100;\n}\n.detail-item.expiring[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #e65100;\n}\n.order-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.sub-panel[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  padding: 16px;\n  background: #f0f7f6;\n  border-radius: 8px;\n  border: 1px solid #d4e8e5;\n}\n.sub-panel-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  margin-top: 12px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.catalog-filters[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 16px;\n  flex-wrap: wrap;\n}\n.catalog-filters[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 200px;\n}\n.catalog-table[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.category-chip[_ngcontent-%COMP%] {\n  background: #e8f5f3;\n  color: #1D6C61;\n  padding: 2px 8px;\n  border-radius: 8px;\n  font-size: 0.78rem;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 48px;\n  color: #9e9e9e;\n}\n.empty-state[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  margin-bottom: 8px;\n  color: #3EB9A8;\n  opacity: 0.5;\n}\n/*# sourceMappingURL=laboratory.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LaboratoryComponent, { className: "LaboratoryComponent", filePath: "src\\app\\modules\\laboratory\\laboratory.component.ts", lineNumber: 272 });
})();
export {
  LaboratoryComponent
};
//# sourceMappingURL=chunk-IUJZJRCZ.js.map
