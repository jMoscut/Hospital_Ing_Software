import {
  environment
} from "./chunk-EURQNLKS.js";
import {
  CommonModule,
  DatePipe,
  HttpClient,
  NgForOf,
  NgIf,
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
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵreference,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-XHW7K2DC.js";

// src/app/modules/call-screen/call-screen.component.ts
function CallScreenComponent_ng_container_14_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "div", 18);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 19);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 20)(6, "span", 21);
    \u0275\u0275text(7, "\u2192");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 22);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const t_r1 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r1.ticketNumber);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r1.patientName);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(t_r1.clinicName);
  }
}
function CallScreenComponent_ng_container_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 13);
    \u0275\u0275element(2, "span", 14);
    \u0275\u0275text(3, " LLAMANDO AHORA ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 15);
    \u0275\u0275template(5, CallScreenComponent_ng_container_14_div_5_Template, 10, 3, "div", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx_r1.calledTickets);
  }
}
function CallScreenComponent_ng_template_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "div", 24);
    \u0275\u0275text(2, "\u23F3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 25);
    \u0275\u0275text(4, "En espera de llamado");
    \u0275\u0275elementEnd()();
  }
}
function CallScreenComponent_div_17_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "span", 31);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 32);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 33);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 34);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r3 = ctx.$implicit;
    const i_r4 = ctx.index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(i_r4 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r3.ticketNumber);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r3.patientName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r3.clinicName);
  }
}
function CallScreenComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26)(1, "div", 27);
    \u0275\u0275text(2, "Pr\xF3ximos en espera");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 28);
    \u0275\u0275template(4, CallScreenComponent_div_17_div_4_Template, 9, 4, "div", 29);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r1.waitingTickets);
  }
}
var NOTIF_KEY = "biocore_notification_settings";
var CallScreenComponent = class _CallScreenComponent {
  constructor(http) {
    this.http = http;
    this.calledTickets = [];
    this.waitingTickets = [];
    this.now = /* @__PURE__ */ new Date();
    this.lastCalledIds = /* @__PURE__ */ new Set();
  }
  ngOnInit() {
    this.poll();
    this.pollInterval = setInterval(() => this.poll(), 5e3);
    this.clockInterval = setInterval(() => {
      this.now = /* @__PURE__ */ new Date();
    }, 1e3);
  }
  ngOnDestroy() {
    clearInterval(this.pollInterval);
    clearInterval(this.clockInterval);
    window.speechSynthesis?.cancel();
  }
  poll() {
    this.http.get(`${environment.apiUrl}/tickets`).subscribe({
      next: (res) => {
        if (!res.success)
          return;
        const newCalled = res.data.filter((t) => t.status === "BEING_CALLED");
        const waiting = res.data.filter((t) => t.status === "WAITING").slice(0, 8);
        newCalled.forEach((t) => {
          if (!this.lastCalledIds.has(t.id)) {
            this.announce(t);
          }
        });
        this.lastCalledIds = new Set(newCalled.map((t) => t.id));
        this.calledTickets = newCalled;
        this.waitingTickets = waiting;
      },
      error: () => {
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
      const go = () => {
        if (count >= (settings.repetitions ?? 2))
          return;
        const u = new SpeechSynthesisUtterance(text);
        u.lang = "es-ES";
        u.volume = (settings.volume ?? 80) / 100;
        u.rate = 0.85;
        u.onend = () => {
          count++;
          if (count < settings.repetitions)
            setTimeout(go, 800);
        };
        window.speechSynthesis.speak(u);
      };
      go();
    } else if (settings.alertType === "tone") {
      this.playTone(settings.volume ?? 80);
    }
  }
  playTone(vol) {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.value = 880;
      gain.gain.value = vol / 100 * 0.6;
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch {
    }
  }
  getSettings() {
    try {
      const s = localStorage.getItem(NOTIF_KEY);
      return s ? JSON.parse(s) : {};
    } catch {
      return {};
    }
  }
  static {
    this.\u0275fac = function CallScreenComponent_Factory(t) {
      return new (t || _CallScreenComponent)(\u0275\u0275directiveInject(HttpClient));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CallScreenComponent, selectors: [["app-call-screen"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 25, vars: 7, consts: [["noCall", ""], [1, "screen-root"], [1, "screen-header"], [1, "brand"], [1, "brand-icon"], [1, "brand-name"], [1, "brand-sub"], [1, "clock"], [1, "main-area"], [4, "ngIf", "ngIfElse"], ["class", "queue-area", 4, "ngIf"], [1, "screen-footer"], [1, "footer-dot"], [1, "now-calling-label"], [1, "pulse-dot"], [1, "called-cards"], ["class", "called-card", 4, "ngFor", "ngForOf"], [1, "called-card"], [1, "ticket-number"], [1, "patient-name"], [1, "clinic-arrow"], [1, "arrow"], [1, "clinic-name"], [1, "no-call"], [1, "no-call-icon"], [1, "no-call-text"], [1, "queue-area"], [1, "queue-title"], [1, "queue-list"], ["class", "queue-item", 4, "ngFor", "ngForOf"], [1, "queue-item"], [1, "queue-pos"], [1, "queue-num"], [1, "queue-patient"], [1, "queue-clinic"]], template: function CallScreenComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "span", 4);
        \u0275\u0275text(4, "\u{1F3E5}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div")(6, "div", 5);
        \u0275\u0275text(7, "BioCore Medical");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "div", 6);
        \u0275\u0275text(9, "Sistema de Atenci\xF3n al Paciente");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(10, "div", 7);
        \u0275\u0275text(11);
        \u0275\u0275pipe(12, "date");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(13, "div", 8);
        \u0275\u0275template(14, CallScreenComponent_ng_container_14_Template, 6, 1, "ng-container", 9)(15, CallScreenComponent_ng_template_15_Template, 5, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
        \u0275\u0275elementEnd();
        \u0275\u0275template(17, CallScreenComponent_div_17_Template, 5, 1, "div", 10);
        \u0275\u0275elementStart(18, "div", 11)(19, "span");
        \u0275\u0275text(20, "Por favor mant\xE9ngase atento a su n\xFAmero de turno");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "span", 12);
        \u0275\u0275text(22, "\xB7");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "span");
        \u0275\u0275text(24, "Please remain attentive to your ticket number");
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        const noCall_r5 = \u0275\u0275reference(16);
        \u0275\u0275advance(11);
        \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(12, 4, ctx.now, "HH:mm:ss"));
        \u0275\u0275advance(3);
        \u0275\u0275property("ngIf", ctx.calledTickets.length > 0)("ngIfElse", noCall_r5);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngIf", ctx.waitingTickets.length > 0);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, DatePipe], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 100vw;\n  height: 100vh;\n  overflow: hidden;\n}\n.screen-root[_ngcontent-%COMP%] {\n  width: 100vw;\n  height: 100vh;\n  background: #0a1a16;\n  display: flex;\n  flex-direction: column;\n  font-family:\n    "Segoe UI",\n    Arial,\n    sans-serif;\n  color: white;\n}\n.screen-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 40px;\n  background: rgba(62, 185, 168, 0.15);\n  border-bottom: 2px solid #3EB9A8;\n}\n.brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.brand-icon[_ngcontent-%COMP%] {\n  font-size: 2rem;\n}\n.brand-name[_ngcontent-%COMP%] {\n  font-size: 1.4rem;\n  font-weight: 700;\n  color: #3EB9A8;\n}\n.brand-sub[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: rgba(255, 255, 255, 0.5);\n  letter-spacing: 1px;\n  text-transform: uppercase;\n}\n.clock[_ngcontent-%COMP%] {\n  font-size: 2.2rem;\n  font-weight: 700;\n  color: #3EB9A8;\n  font-variant-numeric: tabular-nums;\n}\n.main-area[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 32px;\n}\n.now-calling-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  font-size: 1rem;\n  font-weight: 700;\n  letter-spacing: 3px;\n  color: #3EB9A8;\n  text-transform: uppercase;\n  margin-bottom: 32px;\n}\n.pulse-dot[_ngcontent-%COMP%] {\n  width: 14px;\n  height: 14px;\n  border-radius: 50%;\n  background: #3EB9A8;\n  animation: _ngcontent-%COMP%_pulse 1.2s infinite;\n  display: inline-block;\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  0%, 100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n  50% {\n    opacity: 0.4;\n    transform: scale(0.8);\n  }\n}\n.called-cards[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 32px;\n  flex-wrap: wrap;\n  justify-content: center;\n}\n.called-card[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #1D6C61,\n      #3EB9A8);\n  border-radius: 20px;\n  padding: 32px 48px;\n  text-align: center;\n  min-width: 320px;\n  box-shadow: 0 0 60px rgba(62, 185, 168, 0.4);\n  animation: _ngcontent-%COMP%_fadeIn 0.4s ease;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: scale(0.95);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n.ticket-number[_ngcontent-%COMP%] {\n  font-size: 5rem;\n  font-weight: 900;\n  line-height: 1;\n  color: white;\n  letter-spacing: 2px;\n}\n.patient-name[_ngcontent-%COMP%] {\n  font-size: 1.6rem;\n  font-weight: 600;\n  color: rgba(255, 255, 255, 0.9);\n  margin: 12px 0 16px;\n}\n.clinic-arrow[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n}\n.arrow[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  color: rgba(255, 255, 255, 0.7);\n}\n.clinic-name[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  color: rgba(255, 255, 255, 0.85);\n  font-weight: 500;\n}\n.no-call[_ngcontent-%COMP%] {\n  text-align: center;\n  color: rgba(255, 255, 255, 0.25);\n}\n.no-call-icon[_ngcontent-%COMP%] {\n  font-size: 5rem;\n  margin-bottom: 16px;\n}\n.no-call-text[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 300;\n  letter-spacing: 2px;\n}\n.queue-area[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.04);\n  border-top: 1px solid rgba(62, 185, 168, 0.2);\n  padding: 16px 40px;\n  max-height: 220px;\n  overflow-y: auto;\n}\n.queue-title[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 700;\n  letter-spacing: 2px;\n  color: rgba(255, 255, 255, 0.4);\n  text-transform: uppercase;\n  margin-bottom: 10px;\n}\n.queue-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.queue-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 8px 16px;\n  border-radius: 8px;\n  background: rgba(255, 255, 255, 0.05);\n  font-size: 0.95rem;\n}\n.queue-pos[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.3);\n  min-width: 20px;\n  font-size: 0.8rem;\n}\n.queue-num[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: #3EB9A8;\n  min-width: 80px;\n}\n.queue-patient[_ngcontent-%COMP%] {\n  flex: 1;\n  color: rgba(255, 255, 255, 0.8);\n}\n.queue-clinic[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: rgba(255, 255, 255, 0.45);\n}\n.screen-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 16px;\n  padding: 12px;\n  font-size: 0.8rem;\n  color: rgba(255, 255, 255, 0.3);\n  border-top: 1px solid rgba(255, 255, 255, 0.05);\n}\n.footer-dot[_ngcontent-%COMP%] {\n  color: #3EB9A8;\n}\n/*# sourceMappingURL=call-screen.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CallScreenComponent, { className: "CallScreenComponent", filePath: "src\\app\\modules\\call-screen\\call-screen.component.ts", lineNumber: 172 });
})();
export {
  CallScreenComponent
};
//# sourceMappingURL=chunk-6KBKTHCB.js.map
