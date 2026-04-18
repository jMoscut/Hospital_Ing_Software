import {
  environment
} from "./chunk-EURQNLKS.js";
import {
  HttpClient,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-XHW7K2DC.js";

// src/app/shared/services/ticket.service.ts
var TicketService = class _TicketService {
  constructor(http) {
    this.http = http;
    this.url = `${environment.apiUrl}/tickets`;
  }
  getAll() {
    return this.http.get(this.url);
  }
  getByClinic(clinicId) {
    return this.http.get(`${this.url}/clinic/${clinicId}`);
  }
  getQueue(clinicId) {
    return this.http.get(`${this.url}/queue/${clinicId}`);
  }
  create(data) {
    return this.http.post(this.url, data);
  }
  callNext(clinicId) {
    return this.http.put(`${this.url}/clinic/${clinicId}/call-next`, {});
  }
  confirmArrival(ticketId) {
    return this.http.put(`${this.url}/${ticketId}/confirm-arrival`, {});
  }
  complete(ticketId) {
    return this.http.put(`${this.url}/${ticketId}/complete`, {});
  }
  markAbsent(ticketId) {
    return this.http.put(`${this.url}/${ticketId}/mark-absent`, {});
  }
  static {
    this.\u0275fac = function TicketService_Factory(t) {
      return new (t || _TicketService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TicketService, factory: _TicketService.\u0275fac, providedIn: "root" });
  }
};
var ClinicService = class _ClinicService {
  constructor(http) {
    this.http = http;
    this.url = `${environment.apiUrl}/clinics`;
  }
  getAll() {
    return this.http.get(this.url);
  }
  create(data) {
    return this.http.post(this.url, data);
  }
  static {
    this.\u0275fac = function ClinicService_Factory(t) {
      return new (t || _ClinicService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ClinicService, factory: _ClinicService.\u0275fac, providedIn: "root" });
  }
};
var AppointmentService = class _AppointmentService {
  constructor(http) {
    this.http = http;
    this.url = `${environment.apiUrl}/appointments`;
  }
  getAvailableSlots(date, clinicId) {
    return this.http.get(`${this.url}/available-slots?date=${date}&clinicId=${clinicId}`);
  }
  book(data) {
    return this.http.post(this.url, data);
  }
  confirmPayment(appointmentId, data) {
    return this.http.post(`${this.url}/${appointmentId}/confirm-payment`, data);
  }
  getByPatient(patientId) {
    return this.http.get(`${this.url}/patient/${patientId}`);
  }
  getByVoucherCode(code) {
    return this.http.get(`${this.url}/voucher/${code}`);
  }
  static {
    this.\u0275fac = function AppointmentService_Factory(t) {
      return new (t || _AppointmentService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AppointmentService, factory: _AppointmentService.\u0275fac, providedIn: "root" });
  }
};
var VitalSignsService = class _VitalSignsService {
  constructor(http) {
    this.http = http;
    this.url = `${environment.apiUrl}/vital-signs`;
  }
  register(data) {
    return this.http.post(this.url, data);
  }
  getByTicket(ticketId) {
    return this.http.get(`${this.url}/ticket/${ticketId}`);
  }
  static {
    this.\u0275fac = function VitalSignsService_Factory(t) {
      return new (t || _VitalSignsService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _VitalSignsService, factory: _VitalSignsService.\u0275fac, providedIn: "root" });
  }
};

export {
  TicketService,
  ClinicService,
  AppointmentService,
  VitalSignsService
};
//# sourceMappingURL=chunk-ELYEA2RZ.js.map
