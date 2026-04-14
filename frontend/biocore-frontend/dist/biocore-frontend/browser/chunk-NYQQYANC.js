import {
  environment
} from "./chunk-2NM6KC74.js";
import {
  HttpClient,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-R33V2XU6.js";

// src/app/shared/services/lab.service.ts
var LabService = class _LabService {
  constructor(http) {
    this.http = http;
    this.url = `${environment.apiUrl}/lab-orders`;
  }
  getByPatient(patientId) {
    return this.http.get(`${this.url}/patient/${patientId}`);
  }
  getPending() {
    return this.http.get(`${this.url}/pending`);
  }
  create(data) {
    return this.http.post(this.url, data);
  }
  collectSample(id) {
    return this.http.put(`${this.url}/${id}/collect-sample`, {});
  }
  schedule(id, scheduledAt) {
    return this.http.put(`${this.url}/${id}/schedule`, { scheduledAt });
  }
  complete(id, notes, resultAvailableAt) {
    return this.http.put(`${this.url}/${id}/complete`, { notes, resultAvailableAt });
  }
  static {
    this.\u0275fac = function LabService_Factory(t) {
      return new (t || _LabService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _LabService, factory: _LabService.\u0275fac, providedIn: "root" });
  }
};
var MedicineService = class _MedicineService {
  constructor(http) {
    this.http = http;
    this.url = `${environment.apiUrl}/medicines`;
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
  updateStock(id, quantity) {
    return this.http.put(`${this.url}/${id}/stock?quantity=${quantity}`, {});
  }
  getLowStock(threshold = 10) {
    return this.http.get(`${this.url}/low-stock?threshold=${threshold}`);
  }
  static {
    this.\u0275fac = function MedicineService_Factory(t) {
      return new (t || _MedicineService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _MedicineService, factory: _MedicineService.\u0275fac, providedIn: "root" });
  }
};
var PrescriptionService = class _PrescriptionService {
  constructor(http) {
    this.http = http;
    this.url = `${environment.apiUrl}/prescriptions`;
  }
  create(data) {
    return this.http.post(this.url, data);
  }
  getById(id) {
    return this.http.get(`${this.url}/${id}`);
  }
  getByPatient(patientId) {
    return this.http.get(`${this.url}/patient/${patientId}`);
  }
  getPendingForPharmacy() {
    return this.http.get(`${this.url}/pharmacy`);
  }
  dispatch(id, itemIds) {
    return this.http.put(`${this.url}/${id}/dispatch`, itemIds);
  }
  static {
    this.\u0275fac = function PrescriptionService_Factory(t) {
      return new (t || _PrescriptionService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PrescriptionService, factory: _PrescriptionService.\u0275fac, providedIn: "root" });
  }
};

export {
  LabService,
  MedicineService,
  PrescriptionService
};
//# sourceMappingURL=chunk-NYQQYANC.js.map
