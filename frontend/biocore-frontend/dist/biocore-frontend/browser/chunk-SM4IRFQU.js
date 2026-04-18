import {
  environment
} from "./chunk-EURQNLKS.js";
import {
  HttpClient,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-XHW7K2DC.js";

// src/app/shared/services/patient.service.ts
var PatientService = class _PatientService {
  constructor(http) {
    this.http = http;
    this.url = `${environment.apiUrl}/patients`;
  }
  getAll() {
    return this.http.get(this.url);
  }
  getById(id) {
    return this.http.get(`${this.url}/${id}`);
  }
  getByDpi(dpi) {
    return this.http.get(`${this.url}/dpi/${dpi}`);
  }
  search(q) {
    return this.http.get(`${this.url}/search?q=${q}`);
  }
  create(data) {
    return this.http.post(this.url, data);
  }
  update(id, data) {
    return this.http.put(`${this.url}/${id}`, data);
  }
  static {
    this.\u0275fac = function PatientService_Factory(t) {
      return new (t || _PatientService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PatientService, factory: _PatientService.\u0275fac, providedIn: "root" });
  }
};

export {
  PatientService
};
//# sourceMappingURL=chunk-SM4IRFQU.js.map
