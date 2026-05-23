import { Component, computed } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { filter } from 'rxjs/operators';
import { AuthService } from './core/auth/auth.service';

interface NavItem {
  path: string;
  label: string;
  icon: string;
  roles: string[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, RouterLink, RouterLinkActive, CommonModule,
    MatToolbarModule, MatSidenavModule, MatListModule,
    MatIconModule, MatButtonModule, MatMenuModule
  ],
  template: `
    <ng-container *ngIf="showLayout; else noLayout">
      <mat-sidenav-container class="app-container">
        <mat-sidenav #sidenav mode="side" [opened]="true" class="app-sidenav">
          <div class="sidenav-header">
            <mat-icon class="logo-icon">local_hospital</mat-icon>
            <div>
              <div class="brand-name">BioCore</div>
              <div class="brand-sub">Medical System</div>
            </div>
          </div>

          <div class="nav-scroll">
            <mat-nav-list>
              <ng-container *ngFor="let item of visibleNavItems()">
                <a mat-list-item [routerLink]="item.path" routerLinkActive="active-link">
                  <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
                  <span matListItemTitle>{{ item.label }}</span>
                </a>
              </ng-container>
            </mat-nav-list>
          </div>

          <div class="sidenav-footer">
            <div class="user-info">
              <div class="user-avatar">{{ currentUser()?.firstName?.charAt(0) }}{{ currentUser()?.lastName?.charAt(0) }}</div>
              <div class="user-details">
                <div class="user-name" [title]="(currentUser()?.firstName || '') + ' ' + (currentUser()?.lastName || '')">{{ currentUser()?.firstName }} {{ currentUser()?.lastName }}</div>
                <div class="user-role">{{ getRoleDisplay(currentUser()?.role) }}</div>
              </div>
            </div>
            <button mat-icon-button class="logout-btn" (click)="logout()" title="Cerrar sesión">
              <mat-icon>logout</mat-icon>
            </button>
          </div>
        </mat-sidenav>

        <mat-sidenav-content class="app-content">
          <mat-toolbar color="primary" class="topbar">
            <button mat-icon-button (click)="sidenav.toggle()">
              <mat-icon>menu</mat-icon>
            </button>
            <span class="toolbar-title">BioCore Medical</span>
            <span class="spacer"></span>
            <button mat-button (click)="logout()">
              <mat-icon>logout</mat-icon> Salir
            </button>
          </mat-toolbar>
          <div class="main-content">
            <router-outlet></router-outlet>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </ng-container>

    <ng-template #noLayout>
      <router-outlet></router-outlet>
    </ng-template>
  `,
  styles: [`
    .app-container { height: 100vh; }

    /* ── SIDENAV ── */
    .app-sidenav {
      width: 252px;
      height: 100%;
      background: linear-gradient(180deg, #1a2f22 0%, #243C2C 100%);
      color: white;
      display: flex; flex-direction: column; overflow: hidden;
      border-right: none !important;
    }

    .sidenav-header {
      display: flex; align-items: center; gap: 12px;
      padding: 20px 18px 18px;
      border-bottom: 1px solid rgba(255,255,255,0.10);
      flex-shrink: 0;
      background: rgba(0,0,0,0.15);
    }
    .logo-icon {
      font-size: 30px !important; width: 30px !important; height: 30px !important;
      color: #ECE69D; flex-shrink: 0;
      filter: drop-shadow(0 0 8px rgba(236,230,157,0.4));
    }
    .brand-name { font-size: 1.15rem; font-weight: 700; color: #ECE69D; letter-spacing: -0.2px; }
    .brand-sub { font-size: 0.65rem; color: rgba(236,230,157,0.55); letter-spacing: 1.2px; text-transform: uppercase; margin-top: 1px; }

    .nav-scroll { flex: 1; overflow-y: auto; overflow-x: hidden; display: flex; flex-direction: column; }
    .nav-scroll::-webkit-scrollbar { width: 4px; }
    .nav-scroll::-webkit-scrollbar-track { background: transparent; }
    .nav-scroll::-webkit-scrollbar-thumb { background: rgba(236,230,157,0.2); border-radius: 4px; }
    mat-nav-list { padding: 10px 0 !important; }
    mat-nav-list a {
      color: rgba(236,230,157,0.80) !important;
      border-radius: 10px !important;
      margin: 1px 10px !important;
      height: 44px !important; min-height: 44px !important;
      transition: background 0.15s ease, color 0.15s ease !important;
    }
    mat-nav-list a:hover {
      background: rgba(236,230,157,0.10) !important;
      color: #ECE69D !important;
    }
    .active-link {
      background: rgba(89,120,159,0.30) !important;
      color: #ECE69D !important;
      font-weight: 600 !important;
      border-left: 3px solid #ECE69D;
      margin-left: 10px !important;
      padding-left: 13px !important;
    }
    mat-icon[matListItemIcon] {
      color: inherit !important;
      font-size: 20px !important; width: 20px !important; height: 20px !important;
    }
    [matListItemTitle] { font-size: 0.875rem !important; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: inherit !important; }

    .sidenav-footer {
      flex-shrink: 0;
      display: flex; align-items: center; justify-content: space-between; gap: 8px;
      padding: 14px 12px 14px 16px;
      border-top: 1px solid rgba(255,255,255,0.10);
      background: rgba(0,0,0,0.2);
    }
    .user-info { display: flex; align-items: center; gap: 10px; min-width: 0; overflow: hidden; flex: 1; }
    .user-avatar {
      width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;
      background: #59789F; color: #D6E3F0;
      font-size: 0.78rem; font-weight: 700; letter-spacing: 0.5px;
      display: flex; align-items: center; justify-content: center;
      text-transform: uppercase;
    }
    .user-details { min-width: 0; overflow: hidden; }
    .user-name { font-size: 0.82rem; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #ECE69D; }
    .user-role { font-size: 0.67rem; color: rgba(236,230,157,0.60); letter-spacing: 0.3px; margin-top: 1px; }
    .logout-btn { color: rgba(236,230,157,0.70) !important; flex-shrink: 0; }
    .logout-btn:hover { color: #ECE69D !important; background: rgba(236,230,157,0.10) !important; }

    /* ── TOPBAR ── */
    .app-content { display: flex; flex-direction: column; }
    .topbar {
      position: sticky; top: 0; z-index: 10;
      background: white !important; color: #243C2C !important;
      box-shadow: 0 1px 8px rgba(0,0,0,0.08) !important;
      border-bottom: 1px solid #D0D9E3;
    }
    .topbar button mat-icon { color: #59789F; }
    .toolbar-title { font-weight: 700; margin-left: 8px; color: #243C2C; font-size: 1rem; letter-spacing: -0.2px; }
    .spacer { flex: 1; }
    .topbar [mat-button] { color: #59789F !important; font-size: 0.875rem !important; font-weight: 500 !important; border-radius: 8px !important; }
    .topbar [mat-button]:hover { background: #F5F2DC !important; color: #243C2C !important; }
    .topbar [mat-button] mat-icon { color: #59789F !important; }

    /* ── MAIN CONTENT ── */
    .main-content { flex: 1; overflow-y: auto; background: #F5F2DC; }
  `]
})
export class AppComponent {
  showLayout = false;

  navItems: NavItem[] = [
    { path: '/dashboard',    label: 'Dashboard',         icon: 'dashboard',        roles: ['HEALTH_STAFF', 'NURSE', 'ADMIN', 'DOCTOR', 'LAB_TECHNICIAN', 'CASHIER'] },
    { path: '/patients',     label: 'Pacientes',          icon: 'people',           roles: [] },
    { path: '/appointments', label: 'Monitoreo de Cola',  icon: 'queue',            roles: ['HEALTH_STAFF', 'NURSE', 'ADMIN', 'DOCTOR', 'LAB_TECHNICIAN', 'CASHIER'] },
    { path: '/health-staff', label: 'Recepción',         icon: 'health_and_safety',roles: ['HEALTH_STAFF', 'NURSE'] },
    { path: '/consultation',            label: 'Consulta Médica',    icon: 'medical_services', roles: ['DOCTOR'] },
    { path: '/emergency-consultation',  label: 'Emergencias Médicas', icon: 'emergency',         roles: ['DOCTOR'] },
    { path: '/laboratory',   label: 'Laboratorio',       icon: 'science',          roles: ['LAB_TECHNICIAN'] },
    { path: '/pharmacy',     label: 'Farmacia',          icon: 'medication',       roles: ['PHARMACIST'] },
    { path: '/payments',     label: 'Caja / Pagos',      icon: 'point_of_sale',    roles: ['CASHIER'] },
    { path: '/emergency',    label: 'Emergencias',       icon: 'emergency',        roles: ['HEALTH_STAFF', 'NURSE'] },
    { path: '/users',        label: 'Personal',          icon: 'manage_accounts',  roles: ['ADMIN'] },
    { path: '/reports',      label: 'Reportería',        icon: 'bar_chart',        roles: ['ADMIN'] },
  ];

  currentUser = computed(() => this.authService.currentUser());

  visibleNavItems = computed(() => {
    const user = this.authService.currentUser();
    if (!user) return [];
    const clinicType = this.authService.doctorClinicType();
    const isEmergencyDoctor = user.role === 'DOCTOR' && clinicType === 'EMERGENCY';
    return this.navItems.filter(item => {
      if (!item.roles.length && item.roles.length === 0) return true;
      if (!item.roles.includes(user.role)) return false;
      if (user.role === 'DOCTOR') {
        if (item.path === '/emergency-consultation') return isEmergencyDoctor;
        if (item.path === '/consultation') return !isEmergencyDoctor;
      }
      return true;
    });
  });

  constructor(private authService: AuthService, private router: Router) {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: any) => {
        const noLayoutRoutes = ['/login', '/portal', '/register', '/mis-citas', '/call-screen'];
      this.showLayout = this.authService.isLoggedIn() &&
        !noLayoutRoutes.some(r => e.url.startsWith(r));
    });
  }

  getRoleDisplay(role?: string): string {
    const labels: Record<string, string> = {
      ADMIN: 'Administrador', HEALTH_STAFF: 'Recepcionista',
      DOCTOR: 'Doctor', NURSE: 'Enfermería',
      LAB_TECHNICIAN: 'Laboratorista', PHARMACIST: 'Farmacéutico',
      CASHIER: 'Cajero'
    };
    return role ? (labels[role] ?? role) : '';
  }

  logout(): void {
    this.authService.logout();
  }
}
