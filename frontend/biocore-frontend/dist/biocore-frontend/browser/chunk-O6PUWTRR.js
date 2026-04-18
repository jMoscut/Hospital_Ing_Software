import {
  environment
} from "./chunk-EURQNLKS.js";
import {
  Router
} from "./chunk-2UH3GGF7.js";
import {
  HttpClient,
  signal,
  tap,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-XHW7K2DC.js";

// src/app/core/auth/auth.service.ts
var AuthService = class _AuthService {
  constructor(http, router) {
    this.http = http;
    this.router = router;
    this.TOKEN_KEY = "biocore_token";
    this.USER_KEY = "biocore_user";
    this.currentUser = signal(null);
    const stored = localStorage.getItem(this.USER_KEY);
    if (stored) {
      this.currentUser.set(JSON.parse(stored));
    }
  }
  login(credentials) {
    return this.http.post(`${environment.apiUrl}/auth/login`, credentials).pipe(tap((response) => {
      if (response.success && response.data) {
        localStorage.setItem(this.TOKEN_KEY, response.data.token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(response.data));
        this.currentUser.set(response.data);
      }
    }));
  }
  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUser.set(null);
    this.router.navigate(["/login"]);
  }
  getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  isLoggedIn() {
    const token = this.getToken();
    if (!token)
      return false;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * 1e3 > Date.now();
    } catch {
      return false;
    }
  }
  hasRole(...roles) {
    const user = this.currentUser();
    return user ? roles.includes(user.role) : false;
  }
  getUserId() {
    return this.currentUser()?.userId ?? null;
  }
  getPatientId() {
    return this.currentUser()?.patientId ?? null;
  }
  updateCurrentUser(updated) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(updated));
    this.currentUser.set(updated);
  }
  changePassword(currentPassword, newPassword) {
    return this.http.put(`${environment.apiUrl}/public/change-password`, { currentPassword, newPassword });
  }
  static {
    this.\u0275fac = function AuthService_Factory(t) {
      return new (t || _AuthService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(Router));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
  }
};

export {
  AuthService
};
//# sourceMappingURL=chunk-O6PUWTRR.js.map
