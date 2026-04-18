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
  MatInputModule
} from "./chunk-ZDRD2YW4.js";
import {
  Overlay,
  OverlayModule
} from "./chunk-SRE6VCYJ.js";
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
  MatChipsModule
} from "./chunk-PA55PL57.js";
import {
  ClinicService,
  TicketService
} from "./chunk-ELYEA2RZ.js";
import {
  CdkScrollableModule,
  ComponentPortal,
  ScrollDispatcher
} from "./chunk-MHA7Y7AJ.js";
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
  MatPrefix
} from "./chunk-QEMZUU6G.js";
import {
  FormBuilder,
  FormsModule,
  NgControlStatus,
  NgModel,
  ReactiveFormsModule
} from "./chunk-2J4O7HWV.js";
import "./chunk-EURQNLKS.js";
import {
  MatCard,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardSubtitle,
  MatCardTitle
} from "./chunk-ZXMIIXBI.js";
import "./chunk-2UH3GGF7.js";
import {
  A11yModule,
  AriaDescriber,
  Directionality,
  ESCAPE,
  FocusMonitor,
  MatButton,
  MatButtonModule,
  MatCommonModule,
  MatIcon,
  MatIconButton,
  MatIconModule,
  MatOption,
  Platform,
  animate,
  coerceBooleanProperty,
  coerceNumberProperty,
  hasModifierKey,
  normalizePassiveListenerOptions,
  state,
  style,
  transition,
  trigger
} from "./chunk-KREJ5GPI.js";
import {
  ANIMATION_MODULE_TYPE,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  CommonModule,
  Component,
  DOCUMENT,
  DatePipe,
  Directive,
  ElementRef,
  Inject,
  InjectionToken,
  Input,
  InputFlags,
  NgClass,
  NgForOf,
  NgIf,
  NgModule,
  NgZone,
  Optional,
  Subject,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation$1,
  __spreadValues,
  inject,
  setClassMetadata,
  take,
  takeUntil,
  ɵsetClassDebugInfo,
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
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
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

// node_modules/@angular/material/fesm2022/tooltip.mjs
var _c0 = ["tooltip"];
var SCROLL_THROTTLE_MS = 20;
function getMatTooltipInvalidPositionError(position) {
  return Error(`Tooltip position "${position}" is invalid.`);
}
var MAT_TOOLTIP_SCROLL_STRATEGY = new InjectionToken("mat-tooltip-scroll-strategy", {
  providedIn: "root",
  factory: () => {
    const overlay = inject(Overlay);
    return () => overlay.scrollStrategies.reposition({
      scrollThrottle: SCROLL_THROTTLE_MS
    });
  }
});
function MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY(overlay) {
  return () => overlay.scrollStrategies.reposition({
    scrollThrottle: SCROLL_THROTTLE_MS
  });
}
var MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER = {
  provide: MAT_TOOLTIP_SCROLL_STRATEGY,
  deps: [Overlay],
  useFactory: MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY
};
function MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY() {
  return {
    showDelay: 0,
    hideDelay: 0,
    touchendHideDelay: 1500
  };
}
var MAT_TOOLTIP_DEFAULT_OPTIONS = new InjectionToken("mat-tooltip-default-options", {
  providedIn: "root",
  factory: MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY
});
var PANEL_CLASS = "tooltip-panel";
var passiveListenerOptions = normalizePassiveListenerOptions({
  passive: true
});
var MIN_VIEWPORT_TOOLTIP_THRESHOLD = 8;
var UNBOUNDED_ANCHOR_GAP = 8;
var MIN_HEIGHT = 24;
var MAX_WIDTH = 200;
var MatTooltip = class _MatTooltip {
  /** Allows the user to define the position of the tooltip relative to the parent element */
  get position() {
    return this._position;
  }
  set position(value) {
    if (value !== this._position) {
      this._position = value;
      if (this._overlayRef) {
        this._updatePosition(this._overlayRef);
        this._tooltipInstance?.show(0);
        this._overlayRef.updatePosition();
      }
    }
  }
  /**
   * Whether tooltip should be relative to the click or touch origin
   * instead of outside the element bounding box.
   */
  get positionAtOrigin() {
    return this._positionAtOrigin;
  }
  set positionAtOrigin(value) {
    this._positionAtOrigin = coerceBooleanProperty(value);
    this._detach();
    this._overlayRef = null;
  }
  /** Disables the display of the tooltip. */
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = coerceBooleanProperty(value);
    if (this._disabled) {
      this.hide(0);
    } else {
      this._setupPointerEnterEventsIfNeeded();
    }
  }
  /** The default delay in ms before showing the tooltip after show is called */
  get showDelay() {
    return this._showDelay;
  }
  set showDelay(value) {
    this._showDelay = coerceNumberProperty(value);
  }
  /** The default delay in ms before hiding the tooltip after hide is called */
  get hideDelay() {
    return this._hideDelay;
  }
  set hideDelay(value) {
    this._hideDelay = coerceNumberProperty(value);
    if (this._tooltipInstance) {
      this._tooltipInstance._mouseLeaveHideDelay = this._hideDelay;
    }
  }
  /** The message to be displayed in the tooltip */
  get message() {
    return this._message;
  }
  set message(value) {
    this._ariaDescriber.removeDescription(this._elementRef.nativeElement, this._message, "tooltip");
    this._message = value != null ? String(value).trim() : "";
    if (!this._message && this._isTooltipVisible()) {
      this.hide(0);
    } else {
      this._setupPointerEnterEventsIfNeeded();
      this._updateTooltipMessage();
      this._ngZone.runOutsideAngular(() => {
        Promise.resolve().then(() => {
          this._ariaDescriber.describe(this._elementRef.nativeElement, this.message, "tooltip");
        });
      });
    }
  }
  /** Classes to be passed to the tooltip. Supports the same syntax as `ngClass`. */
  get tooltipClass() {
    return this._tooltipClass;
  }
  set tooltipClass(value) {
    this._tooltipClass = value;
    if (this._tooltipInstance) {
      this._setTooltipClass(this._tooltipClass);
    }
  }
  constructor(_overlay, _elementRef, _scrollDispatcher, _viewContainerRef, _ngZone, _platform, _ariaDescriber, _focusMonitor, scrollStrategy, _dir, _defaultOptions, _document) {
    this._overlay = _overlay;
    this._elementRef = _elementRef;
    this._scrollDispatcher = _scrollDispatcher;
    this._viewContainerRef = _viewContainerRef;
    this._ngZone = _ngZone;
    this._platform = _platform;
    this._ariaDescriber = _ariaDescriber;
    this._focusMonitor = _focusMonitor;
    this._dir = _dir;
    this._defaultOptions = _defaultOptions;
    this._position = "below";
    this._positionAtOrigin = false;
    this._disabled = false;
    this._viewInitialized = false;
    this._pointerExitEventsInitialized = false;
    this._tooltipComponent = TooltipComponent;
    this._viewportMargin = 8;
    this._cssClassPrefix = "mat-mdc";
    this.touchGestures = "auto";
    this._message = "";
    this._passiveListeners = [];
    this._destroyed = new Subject();
    this._scrollStrategy = scrollStrategy;
    this._document = _document;
    if (_defaultOptions) {
      this._showDelay = _defaultOptions.showDelay;
      this._hideDelay = _defaultOptions.hideDelay;
      if (_defaultOptions.position) {
        this.position = _defaultOptions.position;
      }
      if (_defaultOptions.positionAtOrigin) {
        this.positionAtOrigin = _defaultOptions.positionAtOrigin;
      }
      if (_defaultOptions.touchGestures) {
        this.touchGestures = _defaultOptions.touchGestures;
      }
    }
    _dir.change.pipe(takeUntil(this._destroyed)).subscribe(() => {
      if (this._overlayRef) {
        this._updatePosition(this._overlayRef);
      }
    });
    this._viewportMargin = MIN_VIEWPORT_TOOLTIP_THRESHOLD;
  }
  ngAfterViewInit() {
    this._viewInitialized = true;
    this._setupPointerEnterEventsIfNeeded();
    this._focusMonitor.monitor(this._elementRef).pipe(takeUntil(this._destroyed)).subscribe((origin) => {
      if (!origin) {
        this._ngZone.run(() => this.hide(0));
      } else if (origin === "keyboard") {
        this._ngZone.run(() => this.show());
      }
    });
  }
  /**
   * Dispose the tooltip when destroyed.
   */
  ngOnDestroy() {
    const nativeElement = this._elementRef.nativeElement;
    clearTimeout(this._touchstartTimeout);
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._tooltipInstance = null;
    }
    this._passiveListeners.forEach(([event, listener]) => {
      nativeElement.removeEventListener(event, listener, passiveListenerOptions);
    });
    this._passiveListeners.length = 0;
    this._destroyed.next();
    this._destroyed.complete();
    this._ariaDescriber.removeDescription(nativeElement, this.message, "tooltip");
    this._focusMonitor.stopMonitoring(nativeElement);
  }
  /** Shows the tooltip after the delay in ms, defaults to tooltip-delay-show or 0ms if no input */
  show(delay = this.showDelay, origin) {
    if (this.disabled || !this.message || this._isTooltipVisible()) {
      this._tooltipInstance?._cancelPendingAnimations();
      return;
    }
    const overlayRef = this._createOverlay(origin);
    this._detach();
    this._portal = this._portal || new ComponentPortal(this._tooltipComponent, this._viewContainerRef);
    const instance = this._tooltipInstance = overlayRef.attach(this._portal).instance;
    instance._triggerElement = this._elementRef.nativeElement;
    instance._mouseLeaveHideDelay = this._hideDelay;
    instance.afterHidden().pipe(takeUntil(this._destroyed)).subscribe(() => this._detach());
    this._setTooltipClass(this._tooltipClass);
    this._updateTooltipMessage();
    instance.show(delay);
  }
  /** Hides the tooltip after the delay in ms, defaults to tooltip-delay-hide or 0ms if no input */
  hide(delay = this.hideDelay) {
    const instance = this._tooltipInstance;
    if (instance) {
      if (instance.isVisible()) {
        instance.hide(delay);
      } else {
        instance._cancelPendingAnimations();
        this._detach();
      }
    }
  }
  /** Shows/hides the tooltip */
  toggle(origin) {
    this._isTooltipVisible() ? this.hide() : this.show(void 0, origin);
  }
  /** Returns true if the tooltip is currently visible to the user */
  _isTooltipVisible() {
    return !!this._tooltipInstance && this._tooltipInstance.isVisible();
  }
  /** Create the overlay config and position strategy */
  _createOverlay(origin) {
    if (this._overlayRef) {
      const existingStrategy = this._overlayRef.getConfig().positionStrategy;
      if ((!this.positionAtOrigin || !origin) && existingStrategy._origin instanceof ElementRef) {
        return this._overlayRef;
      }
      this._detach();
    }
    const scrollableAncestors = this._scrollDispatcher.getAncestorScrollContainers(this._elementRef);
    const strategy = this._overlay.position().flexibleConnectedTo(this.positionAtOrigin ? origin || this._elementRef : this._elementRef).withTransformOriginOn(`.${this._cssClassPrefix}-tooltip`).withFlexibleDimensions(false).withViewportMargin(this._viewportMargin).withScrollableContainers(scrollableAncestors);
    strategy.positionChanges.pipe(takeUntil(this._destroyed)).subscribe((change) => {
      this._updateCurrentPositionClass(change.connectionPair);
      if (this._tooltipInstance) {
        if (change.scrollableViewProperties.isOverlayClipped && this._tooltipInstance.isVisible()) {
          this._ngZone.run(() => this.hide(0));
        }
      }
    });
    this._overlayRef = this._overlay.create({
      direction: this._dir,
      positionStrategy: strategy,
      panelClass: `${this._cssClassPrefix}-${PANEL_CLASS}`,
      scrollStrategy: this._scrollStrategy()
    });
    this._updatePosition(this._overlayRef);
    this._overlayRef.detachments().pipe(takeUntil(this._destroyed)).subscribe(() => this._detach());
    this._overlayRef.outsidePointerEvents().pipe(takeUntil(this._destroyed)).subscribe(() => this._tooltipInstance?._handleBodyInteraction());
    this._overlayRef.keydownEvents().pipe(takeUntil(this._destroyed)).subscribe((event) => {
      if (this._isTooltipVisible() && event.keyCode === ESCAPE && !hasModifierKey(event)) {
        event.preventDefault();
        event.stopPropagation();
        this._ngZone.run(() => this.hide(0));
      }
    });
    if (this._defaultOptions?.disableTooltipInteractivity) {
      this._overlayRef.addPanelClass(`${this._cssClassPrefix}-tooltip-panel-non-interactive`);
    }
    return this._overlayRef;
  }
  /** Detaches the currently-attached tooltip. */
  _detach() {
    if (this._overlayRef && this._overlayRef.hasAttached()) {
      this._overlayRef.detach();
    }
    this._tooltipInstance = null;
  }
  /** Updates the position of the current tooltip. */
  _updatePosition(overlayRef) {
    const position = overlayRef.getConfig().positionStrategy;
    const origin = this._getOrigin();
    const overlay = this._getOverlayPosition();
    position.withPositions([this._addOffset(__spreadValues(__spreadValues({}, origin.main), overlay.main)), this._addOffset(__spreadValues(__spreadValues({}, origin.fallback), overlay.fallback))]);
  }
  /** Adds the configured offset to a position. Used as a hook for child classes. */
  _addOffset(position) {
    const offset = UNBOUNDED_ANCHOR_GAP;
    const isLtr = !this._dir || this._dir.value == "ltr";
    if (position.originY === "top") {
      position.offsetY = -offset;
    } else if (position.originY === "bottom") {
      position.offsetY = offset;
    } else if (position.originX === "start") {
      position.offsetX = isLtr ? -offset : offset;
    } else if (position.originX === "end") {
      position.offsetX = isLtr ? offset : -offset;
    }
    return position;
  }
  /**
   * Returns the origin position and a fallback position based on the user's position preference.
   * The fallback position is the inverse of the origin (e.g. `'below' -> 'above'`).
   */
  _getOrigin() {
    const isLtr = !this._dir || this._dir.value == "ltr";
    const position = this.position;
    let originPosition;
    if (position == "above" || position == "below") {
      originPosition = {
        originX: "center",
        originY: position == "above" ? "top" : "bottom"
      };
    } else if (position == "before" || position == "left" && isLtr || position == "right" && !isLtr) {
      originPosition = {
        originX: "start",
        originY: "center"
      };
    } else if (position == "after" || position == "right" && isLtr || position == "left" && !isLtr) {
      originPosition = {
        originX: "end",
        originY: "center"
      };
    } else if (typeof ngDevMode === "undefined" || ngDevMode) {
      throw getMatTooltipInvalidPositionError(position);
    }
    const {
      x,
      y
    } = this._invertPosition(originPosition.originX, originPosition.originY);
    return {
      main: originPosition,
      fallback: {
        originX: x,
        originY: y
      }
    };
  }
  /** Returns the overlay position and a fallback position based on the user's preference */
  _getOverlayPosition() {
    const isLtr = !this._dir || this._dir.value == "ltr";
    const position = this.position;
    let overlayPosition;
    if (position == "above") {
      overlayPosition = {
        overlayX: "center",
        overlayY: "bottom"
      };
    } else if (position == "below") {
      overlayPosition = {
        overlayX: "center",
        overlayY: "top"
      };
    } else if (position == "before" || position == "left" && isLtr || position == "right" && !isLtr) {
      overlayPosition = {
        overlayX: "end",
        overlayY: "center"
      };
    } else if (position == "after" || position == "right" && isLtr || position == "left" && !isLtr) {
      overlayPosition = {
        overlayX: "start",
        overlayY: "center"
      };
    } else if (typeof ngDevMode === "undefined" || ngDevMode) {
      throw getMatTooltipInvalidPositionError(position);
    }
    const {
      x,
      y
    } = this._invertPosition(overlayPosition.overlayX, overlayPosition.overlayY);
    return {
      main: overlayPosition,
      fallback: {
        overlayX: x,
        overlayY: y
      }
    };
  }
  /** Updates the tooltip message and repositions the overlay according to the new message length */
  _updateTooltipMessage() {
    if (this._tooltipInstance) {
      this._tooltipInstance.message = this.message;
      this._tooltipInstance._markForCheck();
      this._ngZone.onMicrotaskEmpty.pipe(take(1), takeUntil(this._destroyed)).subscribe(() => {
        if (this._tooltipInstance) {
          this._overlayRef.updatePosition();
        }
      });
    }
  }
  /** Updates the tooltip class */
  _setTooltipClass(tooltipClass) {
    if (this._tooltipInstance) {
      this._tooltipInstance.tooltipClass = tooltipClass;
      this._tooltipInstance._markForCheck();
    }
  }
  /** Inverts an overlay position. */
  _invertPosition(x, y) {
    if (this.position === "above" || this.position === "below") {
      if (y === "top") {
        y = "bottom";
      } else if (y === "bottom") {
        y = "top";
      }
    } else {
      if (x === "end") {
        x = "start";
      } else if (x === "start") {
        x = "end";
      }
    }
    return {
      x,
      y
    };
  }
  /** Updates the class on the overlay panel based on the current position of the tooltip. */
  _updateCurrentPositionClass(connectionPair) {
    const {
      overlayY,
      originX,
      originY
    } = connectionPair;
    let newPosition;
    if (overlayY === "center") {
      if (this._dir && this._dir.value === "rtl") {
        newPosition = originX === "end" ? "left" : "right";
      } else {
        newPosition = originX === "start" ? "left" : "right";
      }
    } else {
      newPosition = overlayY === "bottom" && originY === "top" ? "above" : "below";
    }
    if (newPosition !== this._currentPosition) {
      const overlayRef = this._overlayRef;
      if (overlayRef) {
        const classPrefix = `${this._cssClassPrefix}-${PANEL_CLASS}-`;
        overlayRef.removePanelClass(classPrefix + this._currentPosition);
        overlayRef.addPanelClass(classPrefix + newPosition);
      }
      this._currentPosition = newPosition;
    }
  }
  /** Binds the pointer events to the tooltip trigger. */
  _setupPointerEnterEventsIfNeeded() {
    if (this._disabled || !this.message || !this._viewInitialized || this._passiveListeners.length) {
      return;
    }
    if (this._platformSupportsMouseEvents()) {
      this._passiveListeners.push(["mouseenter", (event) => {
        this._setupPointerExitEventsIfNeeded();
        let point = void 0;
        if (event.x !== void 0 && event.y !== void 0) {
          point = event;
        }
        this.show(void 0, point);
      }]);
    } else if (this.touchGestures !== "off") {
      this._disableNativeGesturesIfNecessary();
      this._passiveListeners.push(["touchstart", (event) => {
        const touch = event.targetTouches?.[0];
        const origin = touch ? {
          x: touch.clientX,
          y: touch.clientY
        } : void 0;
        this._setupPointerExitEventsIfNeeded();
        clearTimeout(this._touchstartTimeout);
        const DEFAULT_LONGPRESS_DELAY = 500;
        this._touchstartTimeout = setTimeout(() => this.show(void 0, origin), this._defaultOptions.touchLongPressShowDelay ?? DEFAULT_LONGPRESS_DELAY);
      }]);
    }
    this._addListeners(this._passiveListeners);
  }
  _setupPointerExitEventsIfNeeded() {
    if (this._pointerExitEventsInitialized) {
      return;
    }
    this._pointerExitEventsInitialized = true;
    const exitListeners = [];
    if (this._platformSupportsMouseEvents()) {
      exitListeners.push(["mouseleave", (event) => {
        const newTarget = event.relatedTarget;
        if (!newTarget || !this._overlayRef?.overlayElement.contains(newTarget)) {
          this.hide();
        }
      }], ["wheel", (event) => this._wheelListener(event)]);
    } else if (this.touchGestures !== "off") {
      this._disableNativeGesturesIfNecessary();
      const touchendListener = () => {
        clearTimeout(this._touchstartTimeout);
        this.hide(this._defaultOptions.touchendHideDelay);
      };
      exitListeners.push(["touchend", touchendListener], ["touchcancel", touchendListener]);
    }
    this._addListeners(exitListeners);
    this._passiveListeners.push(...exitListeners);
  }
  _addListeners(listeners) {
    listeners.forEach(([event, listener]) => {
      this._elementRef.nativeElement.addEventListener(event, listener, passiveListenerOptions);
    });
  }
  _platformSupportsMouseEvents() {
    return !this._platform.IOS && !this._platform.ANDROID;
  }
  /** Listener for the `wheel` event on the element. */
  _wheelListener(event) {
    if (this._isTooltipVisible()) {
      const elementUnderPointer = this._document.elementFromPoint(event.clientX, event.clientY);
      const element = this._elementRef.nativeElement;
      if (elementUnderPointer !== element && !element.contains(elementUnderPointer)) {
        this.hide();
      }
    }
  }
  /** Disables the native browser gestures, based on how the tooltip has been configured. */
  _disableNativeGesturesIfNecessary() {
    const gestures = this.touchGestures;
    if (gestures !== "off") {
      const element = this._elementRef.nativeElement;
      const style2 = element.style;
      if (gestures === "on" || element.nodeName !== "INPUT" && element.nodeName !== "TEXTAREA") {
        style2.userSelect = style2.msUserSelect = style2.webkitUserSelect = style2.MozUserSelect = "none";
      }
      if (gestures === "on" || !element.draggable) {
        style2.webkitUserDrag = "none";
      }
      style2.touchAction = "none";
      style2.webkitTapHighlightColor = "transparent";
    }
  }
  static {
    this.\u0275fac = function MatTooltip_Factory(t) {
      return new (t || _MatTooltip)(\u0275\u0275directiveInject(Overlay), \u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(ScrollDispatcher), \u0275\u0275directiveInject(ViewContainerRef), \u0275\u0275directiveInject(NgZone), \u0275\u0275directiveInject(Platform), \u0275\u0275directiveInject(AriaDescriber), \u0275\u0275directiveInject(FocusMonitor), \u0275\u0275directiveInject(MAT_TOOLTIP_SCROLL_STRATEGY), \u0275\u0275directiveInject(Directionality), \u0275\u0275directiveInject(MAT_TOOLTIP_DEFAULT_OPTIONS, 8), \u0275\u0275directiveInject(DOCUMENT));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MatTooltip,
      selectors: [["", "matTooltip", ""]],
      hostAttrs: [1, "mat-mdc-tooltip-trigger"],
      hostVars: 2,
      hostBindings: function MatTooltip_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275classProp("mat-mdc-tooltip-disabled", ctx.disabled);
        }
      },
      inputs: {
        position: [InputFlags.None, "matTooltipPosition", "position"],
        positionAtOrigin: [InputFlags.None, "matTooltipPositionAtOrigin", "positionAtOrigin"],
        disabled: [InputFlags.None, "matTooltipDisabled", "disabled"],
        showDelay: [InputFlags.None, "matTooltipShowDelay", "showDelay"],
        hideDelay: [InputFlags.None, "matTooltipHideDelay", "hideDelay"],
        touchGestures: [InputFlags.None, "matTooltipTouchGestures", "touchGestures"],
        message: [InputFlags.None, "matTooltip", "message"],
        tooltipClass: [InputFlags.None, "matTooltipClass", "tooltipClass"]
      },
      exportAs: ["matTooltip"],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTooltip, [{
    type: Directive,
    args: [{
      selector: "[matTooltip]",
      exportAs: "matTooltip",
      host: {
        "class": "mat-mdc-tooltip-trigger",
        "[class.mat-mdc-tooltip-disabled]": "disabled"
      },
      standalone: true
    }]
  }], () => [{
    type: Overlay
  }, {
    type: ElementRef
  }, {
    type: ScrollDispatcher
  }, {
    type: ViewContainerRef
  }, {
    type: NgZone
  }, {
    type: Platform
  }, {
    type: AriaDescriber
  }, {
    type: FocusMonitor
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [MAT_TOOLTIP_SCROLL_STRATEGY]
    }]
  }, {
    type: Directionality
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [MAT_TOOLTIP_DEFAULT_OPTIONS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }], {
    position: [{
      type: Input,
      args: ["matTooltipPosition"]
    }],
    positionAtOrigin: [{
      type: Input,
      args: ["matTooltipPositionAtOrigin"]
    }],
    disabled: [{
      type: Input,
      args: ["matTooltipDisabled"]
    }],
    showDelay: [{
      type: Input,
      args: ["matTooltipShowDelay"]
    }],
    hideDelay: [{
      type: Input,
      args: ["matTooltipHideDelay"]
    }],
    touchGestures: [{
      type: Input,
      args: ["matTooltipTouchGestures"]
    }],
    message: [{
      type: Input,
      args: ["matTooltip"]
    }],
    tooltipClass: [{
      type: Input,
      args: ["matTooltipClass"]
    }]
  });
})();
var TooltipComponent = class _TooltipComponent {
  constructor(_changeDetectorRef, _elementRef, animationMode) {
    this._changeDetectorRef = _changeDetectorRef;
    this._elementRef = _elementRef;
    this._isMultiline = false;
    this._closeOnInteraction = false;
    this._isVisible = false;
    this._onHide = new Subject();
    this._showAnimation = "mat-mdc-tooltip-show";
    this._hideAnimation = "mat-mdc-tooltip-hide";
    this._animationsDisabled = animationMode === "NoopAnimations";
  }
  /**
   * Shows the tooltip with an animation originating from the provided origin
   * @param delay Amount of milliseconds to the delay showing the tooltip.
   */
  show(delay) {
    if (this._hideTimeoutId != null) {
      clearTimeout(this._hideTimeoutId);
    }
    this._showTimeoutId = setTimeout(() => {
      this._toggleVisibility(true);
      this._showTimeoutId = void 0;
    }, delay);
  }
  /**
   * Begins the animation to hide the tooltip after the provided delay in ms.
   * @param delay Amount of milliseconds to delay showing the tooltip.
   */
  hide(delay) {
    if (this._showTimeoutId != null) {
      clearTimeout(this._showTimeoutId);
    }
    this._hideTimeoutId = setTimeout(() => {
      this._toggleVisibility(false);
      this._hideTimeoutId = void 0;
    }, delay);
  }
  /** Returns an observable that notifies when the tooltip has been hidden from view. */
  afterHidden() {
    return this._onHide;
  }
  /** Whether the tooltip is being displayed. */
  isVisible() {
    return this._isVisible;
  }
  ngOnDestroy() {
    this._cancelPendingAnimations();
    this._onHide.complete();
    this._triggerElement = null;
  }
  /**
   * Interactions on the HTML body should close the tooltip immediately as defined in the
   * material design spec.
   * https://material.io/design/components/tooltips.html#behavior
   */
  _handleBodyInteraction() {
    if (this._closeOnInteraction) {
      this.hide(0);
    }
  }
  /**
   * Marks that the tooltip needs to be checked in the next change detection run.
   * Mainly used for rendering the initial text before positioning a tooltip, which
   * can be problematic in components with OnPush change detection.
   */
  _markForCheck() {
    this._changeDetectorRef.markForCheck();
  }
  _handleMouseLeave({
    relatedTarget
  }) {
    if (!relatedTarget || !this._triggerElement.contains(relatedTarget)) {
      if (this.isVisible()) {
        this.hide(this._mouseLeaveHideDelay);
      } else {
        this._finalizeAnimation(false);
      }
    }
  }
  /**
   * Callback for when the timeout in this.show() gets completed.
   * This method is only needed by the mdc-tooltip, and so it is only implemented
   * in the mdc-tooltip, not here.
   */
  _onShow() {
    this._isMultiline = this._isTooltipMultiline();
    this._markForCheck();
  }
  /** Whether the tooltip text has overflown to the next line */
  _isTooltipMultiline() {
    const rect = this._elementRef.nativeElement.getBoundingClientRect();
    return rect.height > MIN_HEIGHT && rect.width >= MAX_WIDTH;
  }
  /** Event listener dispatched when an animation on the tooltip finishes. */
  _handleAnimationEnd({
    animationName
  }) {
    if (animationName === this._showAnimation || animationName === this._hideAnimation) {
      this._finalizeAnimation(animationName === this._showAnimation);
    }
  }
  /** Cancels any pending animation sequences. */
  _cancelPendingAnimations() {
    if (this._showTimeoutId != null) {
      clearTimeout(this._showTimeoutId);
    }
    if (this._hideTimeoutId != null) {
      clearTimeout(this._hideTimeoutId);
    }
    this._showTimeoutId = this._hideTimeoutId = void 0;
  }
  /** Handles the cleanup after an animation has finished. */
  _finalizeAnimation(toVisible) {
    if (toVisible) {
      this._closeOnInteraction = true;
    } else if (!this.isVisible()) {
      this._onHide.next();
    }
  }
  /** Toggles the visibility of the tooltip element. */
  _toggleVisibility(isVisible) {
    const tooltip = this._tooltip.nativeElement;
    const showClass = this._showAnimation;
    const hideClass = this._hideAnimation;
    tooltip.classList.remove(isVisible ? hideClass : showClass);
    tooltip.classList.add(isVisible ? showClass : hideClass);
    if (this._isVisible !== isVisible) {
      this._isVisible = isVisible;
      this._changeDetectorRef.markForCheck();
    }
    if (isVisible && !this._animationsDisabled && typeof getComputedStyle === "function") {
      const styles = getComputedStyle(tooltip);
      if (styles.getPropertyValue("animation-duration") === "0s" || styles.getPropertyValue("animation-name") === "none") {
        this._animationsDisabled = true;
      }
    }
    if (isVisible) {
      this._onShow();
    }
    if (this._animationsDisabled) {
      tooltip.classList.add("_mat-animation-noopable");
      this._finalizeAnimation(isVisible);
    }
  }
  static {
    this.\u0275fac = function TooltipComponent_Factory(t) {
      return new (t || _TooltipComponent)(\u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(ANIMATION_MODULE_TYPE, 8));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _TooltipComponent,
      selectors: [["mat-tooltip-component"]],
      viewQuery: function TooltipComponent_Query(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275viewQuery(_c0, 7);
        }
        if (rf & 2) {
          let _t;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._tooltip = _t.first);
        }
      },
      hostAttrs: ["aria-hidden", "true"],
      hostVars: 2,
      hostBindings: function TooltipComponent_HostBindings(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275listener("mouseleave", function TooltipComponent_mouseleave_HostBindingHandler($event) {
            return ctx._handleMouseLeave($event);
          });
        }
        if (rf & 2) {
          \u0275\u0275styleProp("zoom", ctx.isVisible() ? 1 : null);
        }
      },
      standalone: true,
      features: [\u0275\u0275StandaloneFeature],
      decls: 4,
      vars: 4,
      consts: [["tooltip", ""], [1, "mdc-tooltip", "mdc-tooltip--shown", "mat-mdc-tooltip", 3, "animationend", "ngClass"], [1, "mdc-tooltip__surface", "mdc-tooltip__surface-animation"]],
      template: function TooltipComponent_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = \u0275\u0275getCurrentView();
          \u0275\u0275elementStart(0, "div", 1, 0);
          \u0275\u0275listener("animationend", function TooltipComponent_Template_div_animationend_0_listener($event) {
            \u0275\u0275restoreView(_r1);
            return \u0275\u0275resetView(ctx._handleAnimationEnd($event));
          });
          \u0275\u0275elementStart(2, "div", 2);
          \u0275\u0275text(3);
          \u0275\u0275elementEnd()();
        }
        if (rf & 2) {
          \u0275\u0275classProp("mdc-tooltip--multiline", ctx._isMultiline);
          \u0275\u0275property("ngClass", ctx.tooltipClass);
          \u0275\u0275advance(3);
          \u0275\u0275textInterpolate(ctx.message);
        }
      },
      dependencies: [NgClass],
      styles: ['.mdc-tooltip__surface{word-break:break-all;word-break:var(--mdc-tooltip-word-break, normal);overflow-wrap:anywhere}.mdc-tooltip--showing-transition .mdc-tooltip__surface-animation{transition:opacity 150ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-tooltip--hide-transition .mdc-tooltip__surface-animation{transition:opacity 75ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-tooltip{position:fixed;display:none;z-index:9}.mdc-tooltip-wrapper--rich{position:relative}.mdc-tooltip--shown,.mdc-tooltip--showing,.mdc-tooltip--hide{display:inline-flex}.mdc-tooltip--shown.mdc-tooltip--rich,.mdc-tooltip--showing.mdc-tooltip--rich,.mdc-tooltip--hide.mdc-tooltip--rich{display:inline-block;left:-320px;position:absolute}.mdc-tooltip__surface{line-height:16px;padding:4px 8px;min-width:40px;max-width:200px;min-height:24px;max-height:40vh;box-sizing:border-box;overflow:hidden;text-align:center}.mdc-tooltip__surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none}@media screen and (forced-colors: active){.mdc-tooltip__surface::before{border-color:CanvasText}}.mdc-tooltip--rich .mdc-tooltip__surface{align-items:flex-start;display:flex;flex-direction:column;min-height:24px;min-width:40px;max-width:320px;position:relative}.mdc-tooltip--multiline .mdc-tooltip__surface{text-align:left}[dir=rtl] .mdc-tooltip--multiline .mdc-tooltip__surface,.mdc-tooltip--multiline .mdc-tooltip__surface[dir=rtl]{text-align:right}.mdc-tooltip__surface .mdc-tooltip__title{margin:0 8px}.mdc-tooltip__surface .mdc-tooltip__content{max-width:calc(200px - 2*8px);margin:8px;text-align:left}[dir=rtl] .mdc-tooltip__surface .mdc-tooltip__content,.mdc-tooltip__surface .mdc-tooltip__content[dir=rtl]{text-align:right}.mdc-tooltip--rich .mdc-tooltip__surface .mdc-tooltip__content{max-width:calc(320px - 2*8px);align-self:stretch}.mdc-tooltip__surface .mdc-tooltip__content-link{text-decoration:none}.mdc-tooltip--rich-actions,.mdc-tooltip__content,.mdc-tooltip__title{z-index:1}.mdc-tooltip__surface-animation{opacity:0;transform:scale(0.8);will-change:transform,opacity}.mdc-tooltip--shown .mdc-tooltip__surface-animation{transform:scale(1);opacity:1}.mdc-tooltip--hide .mdc-tooltip__surface-animation{transform:scale(1)}.mdc-tooltip__caret-surface-top,.mdc-tooltip__caret-surface-bottom{position:absolute;height:24px;width:24px;transform:rotate(35deg) skewY(20deg) scaleX(0.9396926208)}.mdc-tooltip__caret-surface-top .mdc-elevation-overlay,.mdc-tooltip__caret-surface-bottom .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-tooltip__caret-surface-bottom{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);outline:1px solid rgba(0,0,0,0);z-index:-1}@media screen and (forced-colors: active){.mdc-tooltip__caret-surface-bottom{outline-color:CanvasText}}.mat-mdc-tooltip .mdc-tooltip__surface{background-color:var(--mdc-plain-tooltip-container-color)}.mat-mdc-tooltip .mdc-tooltip__surface{border-radius:var(--mdc-plain-tooltip-container-shape)}.mat-mdc-tooltip .mdc-tooltip__caret-surface-top,.mat-mdc-tooltip .mdc-tooltip__caret-surface-bottom{border-radius:var(--mdc-plain-tooltip-container-shape)}.mat-mdc-tooltip .mdc-tooltip__surface{color:var(--mdc-plain-tooltip-supporting-text-color)}.mat-mdc-tooltip .mdc-tooltip__surface{font-family:var(--mdc-plain-tooltip-supporting-text-font);line-height:var(--mdc-plain-tooltip-supporting-text-line-height);font-size:var(--mdc-plain-tooltip-supporting-text-size);font-weight:var(--mdc-plain-tooltip-supporting-text-weight);letter-spacing:var(--mdc-plain-tooltip-supporting-text-tracking)}.mat-mdc-tooltip{position:relative;transform:scale(0)}.mat-mdc-tooltip::before{content:"";top:0;right:0;bottom:0;left:0;z-index:-1;position:absolute}.mat-mdc-tooltip-panel-below .mat-mdc-tooltip::before{top:-8px}.mat-mdc-tooltip-panel-above .mat-mdc-tooltip::before{bottom:-8px}.mat-mdc-tooltip-panel-right .mat-mdc-tooltip::before{left:-8px}.mat-mdc-tooltip-panel-left .mat-mdc-tooltip::before{right:-8px}.mat-mdc-tooltip._mat-animation-noopable{animation:none;transform:scale(1)}.mat-mdc-tooltip-panel.mat-mdc-tooltip-panel-non-interactive{pointer-events:none}@keyframes mat-mdc-tooltip-show{0%{opacity:0;transform:scale(0.8)}100%{opacity:1;transform:scale(1)}}@keyframes mat-mdc-tooltip-hide{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(0.8)}}.mat-mdc-tooltip-show{animation:mat-mdc-tooltip-show 150ms cubic-bezier(0, 0, 0.2, 1) forwards}.mat-mdc-tooltip-hide{animation:mat-mdc-tooltip-hide 75ms cubic-bezier(0.4, 0, 1, 1) forwards}'],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TooltipComponent, [{
    type: Component,
    args: [{
      selector: "mat-tooltip-component",
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        // Forces the element to have a layout in IE and Edge. This fixes issues where the element
        // won't be rendered if the animations are disabled or there is no web animations polyfill.
        "[style.zoom]": "isVisible() ? 1 : null",
        "(mouseleave)": "_handleMouseLeave($event)",
        "aria-hidden": "true"
      },
      standalone: true,
      imports: [NgClass],
      template: '<div\n  #tooltip\n  class="mdc-tooltip mdc-tooltip--shown mat-mdc-tooltip"\n  [ngClass]="tooltipClass"\n  (animationend)="_handleAnimationEnd($event)"\n  [class.mdc-tooltip--multiline]="_isMultiline">\n  <div class="mdc-tooltip__surface mdc-tooltip__surface-animation">{{message}}</div>\n</div>\n',
      styles: ['.mdc-tooltip__surface{word-break:break-all;word-break:var(--mdc-tooltip-word-break, normal);overflow-wrap:anywhere}.mdc-tooltip--showing-transition .mdc-tooltip__surface-animation{transition:opacity 150ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-tooltip--hide-transition .mdc-tooltip__surface-animation{transition:opacity 75ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-tooltip{position:fixed;display:none;z-index:9}.mdc-tooltip-wrapper--rich{position:relative}.mdc-tooltip--shown,.mdc-tooltip--showing,.mdc-tooltip--hide{display:inline-flex}.mdc-tooltip--shown.mdc-tooltip--rich,.mdc-tooltip--showing.mdc-tooltip--rich,.mdc-tooltip--hide.mdc-tooltip--rich{display:inline-block;left:-320px;position:absolute}.mdc-tooltip__surface{line-height:16px;padding:4px 8px;min-width:40px;max-width:200px;min-height:24px;max-height:40vh;box-sizing:border-box;overflow:hidden;text-align:center}.mdc-tooltip__surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none}@media screen and (forced-colors: active){.mdc-tooltip__surface::before{border-color:CanvasText}}.mdc-tooltip--rich .mdc-tooltip__surface{align-items:flex-start;display:flex;flex-direction:column;min-height:24px;min-width:40px;max-width:320px;position:relative}.mdc-tooltip--multiline .mdc-tooltip__surface{text-align:left}[dir=rtl] .mdc-tooltip--multiline .mdc-tooltip__surface,.mdc-tooltip--multiline .mdc-tooltip__surface[dir=rtl]{text-align:right}.mdc-tooltip__surface .mdc-tooltip__title{margin:0 8px}.mdc-tooltip__surface .mdc-tooltip__content{max-width:calc(200px - 2*8px);margin:8px;text-align:left}[dir=rtl] .mdc-tooltip__surface .mdc-tooltip__content,.mdc-tooltip__surface .mdc-tooltip__content[dir=rtl]{text-align:right}.mdc-tooltip--rich .mdc-tooltip__surface .mdc-tooltip__content{max-width:calc(320px - 2*8px);align-self:stretch}.mdc-tooltip__surface .mdc-tooltip__content-link{text-decoration:none}.mdc-tooltip--rich-actions,.mdc-tooltip__content,.mdc-tooltip__title{z-index:1}.mdc-tooltip__surface-animation{opacity:0;transform:scale(0.8);will-change:transform,opacity}.mdc-tooltip--shown .mdc-tooltip__surface-animation{transform:scale(1);opacity:1}.mdc-tooltip--hide .mdc-tooltip__surface-animation{transform:scale(1)}.mdc-tooltip__caret-surface-top,.mdc-tooltip__caret-surface-bottom{position:absolute;height:24px;width:24px;transform:rotate(35deg) skewY(20deg) scaleX(0.9396926208)}.mdc-tooltip__caret-surface-top .mdc-elevation-overlay,.mdc-tooltip__caret-surface-bottom .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-tooltip__caret-surface-bottom{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);outline:1px solid rgba(0,0,0,0);z-index:-1}@media screen and (forced-colors: active){.mdc-tooltip__caret-surface-bottom{outline-color:CanvasText}}.mat-mdc-tooltip .mdc-tooltip__surface{background-color:var(--mdc-plain-tooltip-container-color)}.mat-mdc-tooltip .mdc-tooltip__surface{border-radius:var(--mdc-plain-tooltip-container-shape)}.mat-mdc-tooltip .mdc-tooltip__caret-surface-top,.mat-mdc-tooltip .mdc-tooltip__caret-surface-bottom{border-radius:var(--mdc-plain-tooltip-container-shape)}.mat-mdc-tooltip .mdc-tooltip__surface{color:var(--mdc-plain-tooltip-supporting-text-color)}.mat-mdc-tooltip .mdc-tooltip__surface{font-family:var(--mdc-plain-tooltip-supporting-text-font);line-height:var(--mdc-plain-tooltip-supporting-text-line-height);font-size:var(--mdc-plain-tooltip-supporting-text-size);font-weight:var(--mdc-plain-tooltip-supporting-text-weight);letter-spacing:var(--mdc-plain-tooltip-supporting-text-tracking)}.mat-mdc-tooltip{position:relative;transform:scale(0)}.mat-mdc-tooltip::before{content:"";top:0;right:0;bottom:0;left:0;z-index:-1;position:absolute}.mat-mdc-tooltip-panel-below .mat-mdc-tooltip::before{top:-8px}.mat-mdc-tooltip-panel-above .mat-mdc-tooltip::before{bottom:-8px}.mat-mdc-tooltip-panel-right .mat-mdc-tooltip::before{left:-8px}.mat-mdc-tooltip-panel-left .mat-mdc-tooltip::before{right:-8px}.mat-mdc-tooltip._mat-animation-noopable{animation:none;transform:scale(1)}.mat-mdc-tooltip-panel.mat-mdc-tooltip-panel-non-interactive{pointer-events:none}@keyframes mat-mdc-tooltip-show{0%{opacity:0;transform:scale(0.8)}100%{opacity:1;transform:scale(1)}}@keyframes mat-mdc-tooltip-hide{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(0.8)}}.mat-mdc-tooltip-show{animation:mat-mdc-tooltip-show 150ms cubic-bezier(0, 0, 0.2, 1) forwards}.mat-mdc-tooltip-hide{animation:mat-mdc-tooltip-hide 75ms cubic-bezier(0.4, 0, 1, 1) forwards}']
    }]
  }], () => [{
    type: ChangeDetectorRef
  }, {
    type: ElementRef
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [ANIMATION_MODULE_TYPE]
    }]
  }], {
    _tooltip: [{
      type: ViewChild,
      args: ["tooltip", {
        // Use a static query here since we interact directly with
        // the DOM which can happen before `ngAfterViewInit`.
        static: true
      }]
    }]
  });
})();
var matTooltipAnimations = {
  /** Animation that transitions a tooltip in and out. */
  tooltipState: trigger("state", [
    // TODO(crisbeto): these values are based on MDC's CSS.
    // We should be able to use their styles directly once we land #19432.
    state("initial, void, hidden", style({
      opacity: 0,
      transform: "scale(0.8)"
    })),
    state("visible", style({
      transform: "scale(1)"
    })),
    transition("* => visible", animate("150ms cubic-bezier(0, 0, 0.2, 1)")),
    transition("* => hidden", animate("75ms cubic-bezier(0.4, 0, 1, 1)"))
  ])
};
var MatTooltipModule = class _MatTooltipModule {
  static {
    this.\u0275fac = function MatTooltipModule_Factory(t) {
      return new (t || _MatTooltipModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
      type: _MatTooltipModule
    });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
      providers: [MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER],
      imports: [A11yModule, CommonModule, OverlayModule, MatCommonModule, MatCommonModule, CdkScrollableModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTooltipModule, [{
    type: NgModule,
    args: [{
      imports: [A11yModule, CommonModule, OverlayModule, MatCommonModule, MatTooltip, TooltipComponent],
      exports: [MatTooltip, TooltipComponent, MatCommonModule, CdkScrollableModule],
      providers: [MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER]
    }]
  }], null, null);
})();

// src/app/modules/appointments/appointments.component.ts
var _c02 = () => ({ standalone: true });
function AppointmentsComponent_div_15_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 27)(1, "span", 28);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 29);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 30);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 31);
    \u0275\u0275listener("click", function AppointmentsComponent_div_15_div_6_Template_button_click_7_listener() {
      const t_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.markAbsent(t_r2.id));
    });
    \u0275\u0275elementStart(8, "mat-icon");
    \u0275\u0275text(9, "person_off");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const t_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r2.ticketNumber);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r2.patientName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u2192 ", t_r2.clinicName, "");
  }
}
function AppointmentsComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "div", 24)(2, "mat-icon");
    \u0275\u0275text(3, "campaign");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " LLAMANDO AHORA ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 25);
    \u0275\u0275template(6, AppointmentsComponent_div_15_div_6_Template, 10, 3, "div", 26);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx_r2.calledTickets);
  }
}
function AppointmentsComponent_ng_template_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 32);
    \u0275\u0275text(1, "today");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Cola (", ctx_r2.activeTickets.length, ") ");
  }
}
function AppointmentsComponent_mat_card_20_mat_option_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 14);
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
function AppointmentsComponent_mat_card_20_mat_spinner_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 45);
  }
}
function AppointmentsComponent_mat_card_20_mat_icon_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "campaign");
    \u0275\u0275elementEnd();
  }
}
function AppointmentsComponent_mat_card_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card", 33)(1, "mat-card-header")(2, "mat-icon", 34);
    \u0275\u0275text(3, "campaign");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "mat-card-title");
    \u0275\u0275text(5, "Llamar Paciente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "mat-card-subtitle");
    \u0275\u0275text(7, "RN-CT03: orden cronol\xF3gico \xB7 RN-CT04: visual + audio");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "mat-card-content")(9, "div", 35)(10, "mat-form-field", 36)(11, "mat-label");
    \u0275\u0275text(12, "Cl\xEDnica a llamar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "mat-icon", 37);
    \u0275\u0275text(14, "local_hospital");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "mat-select", 38);
    \u0275\u0275twoWayListener("ngModelChange", function AppointmentsComponent_mat_card_20_Template_mat_select_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.callClinicId, $event) || (ctx_r2.callClinicId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(16, "mat-option", 39);
    \u0275\u0275text(17, "\u2014 Seleccione cl\xEDnica \u2014");
    \u0275\u0275elementEnd();
    \u0275\u0275template(18, AppointmentsComponent_mat_card_20_mat_option_18_Template, 2, 2, "mat-option", 15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "button", 40);
    \u0275\u0275listener("click", function AppointmentsComponent_mat_card_20_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.callNextTicket());
    });
    \u0275\u0275template(20, AppointmentsComponent_mat_card_20_mat_spinner_20_Template, 1, 0, "mat-spinner", 41)(21, AppointmentsComponent_mat_card_20_mat_icon_21_Template, 2, 0, "mat-icon", 42);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "p", 43)(24, "mat-icon", 44);
    \u0275\u0275text(25, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275text(26, " Llama al primer paciente en espera de la cl\xEDnica seleccionada. El turno se mostrar\xE1 en la pantalla de sala de espera. ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(15);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.callClinicId);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(8, _c02));
    \u0275\u0275advance();
    \u0275\u0275property("value", 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r2.clinics);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r2.callClinicId || ctx_r2.calling);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.calling);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.calling);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.calling ? "Llamando..." : "Llamar Siguiente", " ");
  }
}
function AppointmentsComponent_mat_option_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r6 = ctx.$implicit;
    \u0275\u0275property("value", c_r6.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r6.name);
  }
}
function AppointmentsComponent_div_36_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Dr. ", t_r7.doctorName, "");
  }
}
function AppointmentsComponent_div_36_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 57);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, t_r7.createdAt, "HH:mm"));
  }
}
function AppointmentsComponent_div_36_button_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 31);
    \u0275\u0275listener("click", function AppointmentsComponent_div_36_button_14_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const t_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.markAbsent(t_r7.id));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "person_off");
    \u0275\u0275elementEnd()();
  }
}
function AppointmentsComponent_div_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46)(1, "div", 47);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 48)(4, "div", 49);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 50);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, AppointmentsComponent_div_36_div_8_Template, 2, 1, "div", 51);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 52)(10, "span", 53);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275template(12, AppointmentsComponent_div_36_div_12_Template, 3, 4, "div", 54);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 55);
    \u0275\u0275template(14, AppointmentsComponent_div_36_button_14_Template, 3, 0, "button", 56);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r7 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("being-called", t_r7.status === "BEING_CALLED");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r7.ticketNumber);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(t_r7.patientName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", t_r7.clinicName, " \xB7 ", t_r7.type, "");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", t_r7.doctorName);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r2.getStatusClass(t_r7.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.statusLabel(t_r7.status));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", t_r7.createdAt);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", t_r7.status === "BEING_CALLED" && ctx_r2.canManage());
  }
}
function AppointmentsComponent_div_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 58)(1, "mat-icon");
    \u0275\u0275text(2, "event_available");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "No hay citas activas en este momento");
    \u0275\u0275elementEnd()();
  }
}
function AppointmentsComponent_ng_template_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 32);
    \u0275\u0275text(1, "task_alt");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Completados (", ctx_r2.completedTickets.length, ") ");
  }
}
function AppointmentsComponent_div_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 59)(1, "div", 47);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 48)(4, "div", 49);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 50);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "span", 60);
    \u0275\u0275text(9, "Completado");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r9 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r9.ticketNumber);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(t_r9.patientName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", t_r9.clinicName, " \xB7 ", t_r9.type, "");
  }
}
function AppointmentsComponent_div_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 58)(1, "mat-icon");
    \u0275\u0275text(2, "task_alt");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Sin citas completadas hoy");
    \u0275\u0275elementEnd()();
  }
}
var NOTIF_KEY = "biocore_notification_settings";
var AppointmentsComponent = class _AppointmentsComponent {
  constructor(fb, ticketService, clinicService, authService, notification) {
    this.fb = fb;
    this.ticketService = ticketService;
    this.clinicService = clinicService;
    this.authService = authService;
    this.notification = notification;
    this.clinics = [];
    this.activeTickets = [];
    this.filteredActive = [];
    this.calledTickets = [];
    this.completedTickets = [];
    this.selectedClinicFilter = 0;
    this.callClinicId = 0;
    this.calling = false;
    this.lastCalledIds = /* @__PURE__ */ new Set();
  }
  ngOnInit() {
    this.clinicService.getAll().subscribe((res) => {
      if (res.success)
        this.clinics = res.data;
    });
    this.loadAll();
    this.refreshInterval = setInterval(() => this.loadAll(), 2e4);
  }
  ngOnDestroy() {
    if (this.refreshInterval)
      clearInterval(this.refreshInterval);
    window.speechSynthesis?.cancel();
  }
  loadAll() {
    this.ticketService.getAll().subscribe({
      next: (res) => {
        if (!res.success)
          return;
        const all = res.data;
        this.activeTickets = all.filter((t) => ["WAITING", "BEING_CALLED", "IN_CONSULTATION"].includes(t.status));
        this.calledTickets = all.filter((t) => t.status === "BEING_CALLED");
        this.completedTickets = all.filter((t) => t.status === "COMPLETED");
        this.applyFilter();
      },
      error: () => {
      }
    });
  }
  applyFilter() {
    this.filteredActive = this.selectedClinicFilter === 0 ? this.activeTickets : this.activeTickets.filter((t) => t.clinicId === this.selectedClinicFilter);
  }
  countByStatus(status) {
    return this.activeTickets.filter((t) => t.status === status).length;
  }
  callNextTicket() {
    if (!this.callClinicId)
      return;
    this.calling = true;
    this.ticketService.callNext(this.callClinicId).subscribe({
      next: (res) => {
        if (res.success) {
          const t = res.data;
          this.announce(t);
          this.notification.success(`Llamando: ${t.ticketNumber} \u2014 ${t.patientName}`);
          this.loadAll();
        } else {
          this.notification.error(res.message || "No hay pacientes en espera en esta cl\xEDnica");
        }
        this.calling = false;
      },
      error: (err) => {
        this.notification.error(err.error?.message || "No hay pacientes en espera");
        this.calling = false;
      }
    });
  }
  announce(ticket) {
    const settings = this.getSettings();
    if (!settings.audioEnabled)
      return;
    if (settings.alertType === "voice" && "speechSynthesis" in window) {
      const text = `Se llama turno ${ticket.ticketNumber.replace(/-/g, " ")}, ${ticket.patientName}, favor dirigirse a ${ticket.clinicName}.`;
      window.speechSynthesis.cancel();
      let count = 0;
      const speakOnce = () => {
        if (count >= settings.repetitions)
          return;
        const u = new SpeechSynthesisUtterance(text);
        u.lang = "es-ES";
        u.volume = settings.volume / 100;
        u.rate = 0.85;
        u.onend = () => {
          count++;
          if (count < settings.repetitions)
            setTimeout(speakOnce, 800);
        };
        window.speechSynthesis.speak(u);
      };
      speakOnce();
    } else if (settings.alertType === "tone") {
      this.playTone();
    }
  }
  playTone() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.value = 880;
      gain.gain.value = 0.4;
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch {
    }
  }
  getSettings() {
    const stored = localStorage.getItem(NOTIF_KEY);
    return stored ? __spreadValues({ visualEnabled: true, audioEnabled: true, volume: 80, alertType: "voice", displaySeconds: 10, repetitions: 2 }, JSON.parse(stored)) : { visualEnabled: true, audioEnabled: true, volume: 80, alertType: "voice", displaySeconds: 10, repetitions: 2 };
  }
  openCallScreen() {
    window.open("/call-screen", "_blank", "width=1280,height=720");
  }
  markAbsent(ticketId) {
    this.ticketService.markAbsent(ticketId).subscribe({
      next: () => {
        this.notification.success("Paciente marcado como ausente");
        this.loadAll();
      },
      error: () => this.notification.error("Error al marcar ausente")
    });
  }
  canManage() {
    return this.authService.hasRole("ADMIN", "HEALTH_STAFF", "NURSE", "DOCTOR");
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
      COMPLETED: "Completado",
      ABSENT: "Ausente",
      CANCELLED_NO_PAYMENT: "Cancelado"
    };
    return m[s] ?? s;
  }
  static {
    this.\u0275fac = function AppointmentsComponent_Factory(t) {
      return new (t || _AppointmentsComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(TicketService), \u0275\u0275directiveInject(ClinicService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(NotificationService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppointmentsComponent, selectors: [["app-appointments"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 43, vars: 14, consts: [[1, "page-container"], [1, "page-header"], [2, "vertical-align", "middle", "margin-right", "8px"], [1, "header-actions"], ["mat-stroked-button", "", "color", "primary", "matTooltip", "Abrir pantalla de sala de espera en nueva ventana", 3, "click"], ["mat-stroked-button", "", 3, "click"], ["class", "calling-banner", 4, "ngIf"], ["animationDuration", "200ms"], ["mat-tab-label", ""], [1, "tab-content"], ["class", "call-panel", 4, "ngIf"], [1, "queue-toolbar"], ["appearance", "outline", 1, "filter-field"], [3, "ngModelChange", "selectionChange", "ngModel", "ngModelOptions"], [3, "value"], [3, "value", 4, "ngFor", "ngForOf"], [1, "queue-stats"], [1, "stat-chip", "waiting"], [1, "stat-chip", "calling"], [1, "stat-chip", "consulting"], ["class", "ticket-card", 3, "being-called", 4, "ngFor", "ngForOf"], ["class", "empty-state", 4, "ngIf"], ["class", "ticket-card completed", 4, "ngFor", "ngForOf"], [1, "calling-banner"], [1, "calling-label"], [1, "calling-tickets"], ["class", "calling-item", 4, "ngFor", "ngForOf"], [1, "calling-item"], [1, "calling-num"], [1, "calling-name"], [1, "calling-clinic"], ["mat-icon-button", "", "color", "warn", "matTooltip", "Marcar ausente", 3, "click"], [1, "tab-icon"], [1, "call-panel"], ["mat-card-avatar", "", 2, "color", "#1D6C61"], [1, "call-controls"], ["appearance", "outline", 1, "call-clinic-field"], ["matPrefix", ""], [3, "ngModelChange", "ngModel", "ngModelOptions"], ["disabled", "", 3, "value"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], ["diameter", "20", 4, "ngIf"], [4, "ngIf"], [1, "call-hint"], [2, "font-size", "15px", "vertical-align", "middle"], ["diameter", "20"], [1, "ticket-card"], [1, "ticket-num"], [1, "ticket-body"], [1, "ticket-name"], [1, "ticket-sub"], ["class", "ticket-sub", 4, "ngIf"], [1, "ticket-right"], [1, "status-chip"], ["class", "ticket-time", 4, "ngIf"], [1, "ticket-actions"], ["mat-icon-button", "", "color", "warn", "matTooltip", "Marcar ausente", 3, "click", 4, "ngIf"], [1, "ticket-time"], [1, "empty-state"], [1, "ticket-card", "completed"], [1, "status-chip", "status-completed"]], template: function AppointmentsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1")(3, "mat-icon", 2);
        \u0275\u0275text(4, "queue");
        \u0275\u0275elementEnd();
        \u0275\u0275text(5, "Monitoreo de Cola");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "div", 3)(7, "button", 4);
        \u0275\u0275listener("click", function AppointmentsComponent_Template_button_click_7_listener() {
          return ctx.openCallScreen();
        });
        \u0275\u0275elementStart(8, "mat-icon");
        \u0275\u0275text(9, "tv");
        \u0275\u0275elementEnd();
        \u0275\u0275text(10, " Pantalla de Sala ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "button", 5);
        \u0275\u0275listener("click", function AppointmentsComponent_Template_button_click_11_listener() {
          return ctx.loadAll();
        });
        \u0275\u0275elementStart(12, "mat-icon");
        \u0275\u0275text(13, "refresh");
        \u0275\u0275elementEnd();
        \u0275\u0275text(14, " Actualizar ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(15, AppointmentsComponent_div_15_Template, 7, 1, "div", 6);
        \u0275\u0275elementStart(16, "mat-tab-group", 7)(17, "mat-tab");
        \u0275\u0275template(18, AppointmentsComponent_ng_template_18_Template, 3, 1, "ng-template", 8);
        \u0275\u0275elementStart(19, "div", 9);
        \u0275\u0275template(20, AppointmentsComponent_mat_card_20_Template, 27, 9, "mat-card", 10);
        \u0275\u0275elementStart(21, "div", 11)(22, "mat-form-field", 12)(23, "mat-label");
        \u0275\u0275text(24, "Filtrar por cl\xEDnica");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "mat-select", 13);
        \u0275\u0275twoWayListener("ngModelChange", function AppointmentsComponent_Template_mat_select_ngModelChange_25_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.selectedClinicFilter, $event) || (ctx.selectedClinicFilter = $event);
          return $event;
        });
        \u0275\u0275listener("selectionChange", function AppointmentsComponent_Template_mat_select_selectionChange_25_listener() {
          return ctx.applyFilter();
        });
        \u0275\u0275elementStart(26, "mat-option", 14);
        \u0275\u0275text(27, "Todas las cl\xEDnicas");
        \u0275\u0275elementEnd();
        \u0275\u0275template(28, AppointmentsComponent_mat_option_28_Template, 2, 2, "mat-option", 15);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(29, "div", 16)(30, "span", 17);
        \u0275\u0275text(31);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "span", 18);
        \u0275\u0275text(33);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "span", 19);
        \u0275\u0275text(35);
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(36, AppointmentsComponent_div_36_Template, 15, 12, "div", 20)(37, AppointmentsComponent_div_37_Template, 5, 0, "div", 21);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(38, "mat-tab");
        \u0275\u0275template(39, AppointmentsComponent_ng_template_39_Template, 3, 1, "ng-template", 8);
        \u0275\u0275elementStart(40, "div", 9);
        \u0275\u0275template(41, AppointmentsComponent_div_41_Template, 10, 4, "div", 22)(42, AppointmentsComponent_div_42_Template, 5, 0, "div", 21);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(15);
        \u0275\u0275property("ngIf", ctx.calledTickets.length > 0);
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", ctx.canManage());
        \u0275\u0275advance(5);
        \u0275\u0275twoWayProperty("ngModel", ctx.selectedClinicFilter);
        \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(13, _c02));
        \u0275\u0275advance();
        \u0275\u0275property("value", 0);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.clinics);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate1("", ctx.countByStatus("WAITING"), " en espera");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1("", ctx.countByStatus("BEING_CALLED"), " siendo llamados");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1("", ctx.countByStatus("IN_CONSULTATION"), " en consulta");
        \u0275\u0275advance();
        \u0275\u0275property("ngForOf", ctx.filteredActive);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.filteredActive.length === 0);
        \u0275\u0275advance(4);
        \u0275\u0275property("ngForOf", ctx.completedTickets);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.completedTickets.length === 0);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, DatePipe, ReactiveFormsModule, NgControlStatus, FormsModule, NgModel, MatCardModule, MatCard, MatCardAvatar, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle, MatButtonModule, MatButton, MatIconButton, MatIconModule, MatIcon, MatFormFieldModule, MatFormField, MatLabel, MatPrefix, MatInputModule, MatSelectModule, MatSelect, MatOption, MatTabsModule, MatTabLabel, MatTab, MatTabGroup, MatProgressSpinnerModule, MatProgressSpinner, MatChipsModule, MatTooltipModule, MatTooltip], styles: ["\n\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n  gap: 12px;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.6rem;\n  font-weight: 500;\n  color: #1D6C61;\n  margin: 0;\n}\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.tab-content[_ngcontent-%COMP%] {\n  padding: 20px 0;\n}\n.tab-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  margin-right: 6px;\n  vertical-align: middle;\n}\nh3[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 600;\n  color: #1D6C61;\n  margin-bottom: 12px;\n  margin-top: 4px;\n}\n.calling-banner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  flex-wrap: wrap;\n  background:\n    linear-gradient(\n      90deg,\n      #1D6C61,\n      #3EB9A8);\n  color: white;\n  border-radius: 10px;\n  padding: 12px 20px;\n  margin-bottom: 20px;\n  box-shadow: 0 4px 16px rgba(29, 108, 97, 0.3);\n}\n.calling-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-weight: 700;\n  font-size: 0.85rem;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  white-space: nowrap;\n}\n.calling-tickets[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n  flex: 1;\n}\n.calling-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  background: rgba(255, 255, 255, 0.15);\n  border-radius: 8px;\n  padding: 6px 12px;\n}\n.calling-num[_ngcontent-%COMP%] {\n  font-size: 1.4rem;\n  font-weight: 700;\n}\n.calling-name[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n.calling-clinic[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  opacity: 0.9;\n}\n.call-panel[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n  border-left: 4px solid #1D6C61;\n}\n.call-controls[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n.call-clinic-field[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 220px;\n}\n.call-hint[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: #757575;\n  margin: 6px 0 0;\n}\n.queue-toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 16px;\n  flex-wrap: wrap;\n}\n.filter-field[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 200px;\n}\n.queue-stats[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.stat-chip[_ngcontent-%COMP%] {\n  padding: 4px 12px;\n  border-radius: 12px;\n  font-size: 0.78rem;\n  font-weight: 500;\n}\n.waiting[_ngcontent-%COMP%] {\n  background: #fff8e1;\n  color: #f57f17;\n}\n.calling[_ngcontent-%COMP%] {\n  background: #e3f2fd;\n  color: #1565c0;\n}\n.consulting[_ngcontent-%COMP%] {\n  background: #e8f5e9;\n  color: #2e7d32;\n}\n.ticket-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 14px 18px;\n  background: white;\n  border-radius: 10px;\n  margin-bottom: 10px;\n  box-shadow: 0 2px 8px rgba(29, 108, 97, 0.07);\n  border: 1px solid #e8e8e8;\n  transition: border-color 0.2s;\n}\n.ticket-card.being-called[_ngcontent-%COMP%] {\n  border-color: #3EB9A8;\n  box-shadow: 0 2px 12px rgba(62, 185, 168, 0.25);\n}\n.ticket-card.completed[_ngcontent-%COMP%] {\n  opacity: 0.7;\n}\n.ticket-num[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #1D6C61;\n  min-width: 85px;\n}\n.ticket-body[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.ticket-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.ticket-sub[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #757575;\n  margin-top: 2px;\n}\n.ticket-right[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 4px;\n}\n.ticket-time[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #9e9e9e;\n}\n.ticket-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n}\n.status-chip[_ngcontent-%COMP%] {\n  padding: 4px 12px;\n  border-radius: 12px;\n  font-size: 0.8rem;\n  font-weight: 500;\n}\n.search-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  margin-bottom: 12px;\n  flex-wrap: wrap;\n}\n.search-field[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 250px;\n}\n.search-results[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\n.result-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 10px 14px;\n  border-radius: 8px;\n  cursor: pointer;\n  border: 2px solid transparent;\n  margin-bottom: 6px;\n  background: #f8f9ff;\n  transition: all 0.15s;\n}\n.result-item[_ngcontent-%COMP%]:hover {\n  background: #e3f2fd;\n}\n.result-item.selected[_ngcontent-%COMP%] {\n  border-color: #1D6C61;\n  background: #d0f4ef;\n}\n.result-name[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n.result-meta[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: #757575;\n}\n.check-icon[_ngcontent-%COMP%] {\n  color: #1D6C61;\n  margin-left: auto;\n}\n.no-results[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: #757575;\n  font-size: 0.85rem;\n  padding: 8px 0;\n}\n.selected-patient-box[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  background: #e8f5e9;\n  padding: 14px;\n  border-radius: 8px;\n  margin-bottom: 8px;\n  color: #2e7d32;\n}\n.selected-patient-box[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 36px;\n  width: 36px;\n  height: 36px;\n}\n.selected-patient-box[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-left: auto;\n  color: #757575;\n}\n.appt-form[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 12px;\n  margin-top: 8px;\n}\n.full-width[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 48px;\n  color: #9e9e9e;\n}\n.empty-state[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  color: #3EB9A8;\n  opacity: 0.5;\n  margin-bottom: 8px;\n}\n/*# sourceMappingURL=appointments.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppointmentsComponent, { className: "AppointmentsComponent", filePath: "src\\app\\modules\\appointments\\appointments.component.ts", lineNumber: 253 });
})();
export {
  AppointmentsComponent
};
//# sourceMappingURL=chunk-FB3ZGTNC.js.map
