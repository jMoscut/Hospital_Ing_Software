import {
  environment
} from "./chunk-EURQNLKS.js";
import {
  HttpClient,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-XHW7K2DC.js";

// src/app/shared/services/payment.service.ts
var PaymentService = class _PaymentService {
  constructor(http) {
    this.http = http;
    this.url = `${environment.apiUrl}/payments`;
  }
  getByPatient(patientId) {
    return this.http.get(`${this.url}/patient/${patientId}`);
  }
  getPending(patientId) {
    return this.http.get(`${this.url}/pending/${patientId}`);
  }
  create(data) {
    return this.http.post(this.url, data);
  }
  process(id, method) {
    return this.http.put(`${this.url}/${id}/process?method=${method}`, {});
  }
  static {
    this.\u0275fac = function PaymentService_Factory(t) {
      return new (t || _PaymentService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PaymentService, factory: _PaymentService.\u0275fac, providedIn: "root" });
  }
};
var ReportService = class _ReportService {
  constructor(http) {
    this.http = http;
    this.url = `${environment.apiUrl}/reports`;
  }
  getDashboard() {
    return this.http.get(`${this.url}/dashboard`);
  }
  getPatientExpedient(patientCode) {
    return this.http.get(`${this.url}/patient/${patientCode}`);
  }
  static {
    this.\u0275fac = function ReportService_Factory(t) {
      return new (t || _ReportService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ReportService, factory: _ReportService.\u0275fac, providedIn: "root" });
  }
};
var UserService = class _UserService {
  constructor(http) {
    this.http = http;
    this.url = `${environment.apiUrl}/users`;
  }
  getAll() {
    return this.http.get(this.url);
  }
  create(data) {
    return this.http.post(this.url, data);
  }
  update(id, data) {
    return this.http.put(`${this.url}/${id}`, data);
  }
  delete(id) {
    return this.http.delete(`${this.url}/${id}`);
  }
  assignClinic(doctorId, clinicId) {
    return this.http.post(`${this.url}/assign-clinic`, { doctorId, clinicId });
  }
  unassignClinic(doctorId) {
    return this.http.delete(`${this.url}/${doctorId}/unassign-clinic`);
  }
  static {
    this.\u0275fac = function UserService_Factory(t) {
      return new (t || _UserService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _UserService, factory: _UserService.\u0275fac, providedIn: "root" });
  }
};
var EmergencyService = class _EmergencyService {
  constructor(http) {
    this.http = http;
    this.url = `${environment.apiUrl}/emergency`;
  }
  register(data) {
    return this.http.post(`${this.url}/register`, data);
  }
  static {
    this.\u0275fac = function EmergencyService_Factory(t) {
      return new (t || _EmergencyService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _EmergencyService, factory: _EmergencyService.\u0275fac, providedIn: "root" });
  }
};
var InsuranceService = class _InsuranceService {
  constructor(http) {
    this.http = http;
  }
  getAll() {
    return this.http.get(`${environment.apiUrl}/insurances`);
  }
  getAllPublic() {
    return this.http.get(`${environment.apiUrl}/public/insurances`);
  }
  static {
    this.\u0275fac = function InsuranceService_Factory(t) {
      return new (t || _InsuranceService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _InsuranceService, factory: _InsuranceService.\u0275fac, providedIn: "root" });
  }
};

export {
  PaymentService,
  ReportService,
  UserService,
  EmergencyService,
  InsuranceService
};
//# sourceMappingURL=chunk-LDLLK6DA.js.map
