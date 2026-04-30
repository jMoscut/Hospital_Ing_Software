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

          <mat-nav-list>
            <ng-container *ngFor="let item of visibleNavItems()">
              <a mat-list-item [routerLink]="item.path" routerLinkActive="active-link">
                <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
                <span matListItemTitle>{{ item.label }}</span>
              </a>
            </ng-container>
          </mat-nav-list>

          <div class="sidenav-footer">
            <div class="user-info">
              <mat-icon>account_circle</mat-icon>
              <div>
                <div class="user-name">{{ currentUser()?.firstName }} {{ currentUser()?.lastName }}</div>
                <div class="user-role">{{ currentUser()?.role }}</div>
              </div>
            </div>
            <button mat-icon-button (click)="logout()" title="Cerrar sesión">
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
    .app-sidenav { width: 240px; background: #193A31; color: white; display: flex; flex-direction: column; overflow: hidden; }
    .sidenav-header {
      display: flex; align-items: center; gap: 12px;
      padding: 18px 16px 16px; border-bottom: 1px solid rgba(255,255,255,0.12);
      flex-shrink: 0;
    }
    .logo-icon { font-size: 32px; width: 32px; height: 32px; color: #3EB9A8; flex-shrink: 0; }
    .brand-name { font-size: 1.2rem; font-weight: 700; color: white; }
    .brand-sub { font-size: 0.68rem; color: rgba(255,255,255,0.55); letter-spacing: 1px; text-transform: uppercase; }
    mat-nav-list { flex: 1; overflow: hidden; padding-top: 6px !important; padding-bottom: 6px !important; }
    mat-nav-list a {
      color: rgba(255,255,255,0.85) !important; border-radius: 8px; margin: 2px 8px;
      height: 44px !important; min-height: 44px !important;
    }
    mat-nav-list a:hover { background: rgba(62,185,168,0.15) !important; }
    .active-link { background: rgba(62,185,168,0.25) !important; color: #3EB9A8 !important; font-weight: 600; }
    mat-icon[matListItemIcon] { color: inherit !important; font-size: 22px !important; width: 22px !important; height: 22px !important; }
    [matListItemTitle] { font-size: 0.88rem !important; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .sidenav-footer {
      flex-shrink: 0;
      display: flex; align-items: center; justify-content: space-between;
      padding: 12px 14px; border-top: 1px solid rgba(255,255,255,0.12);
      background: rgba(0,0,0,0.25);
    }
    .user-info { display: flex; align-items: center; gap: 8px; color: white; min-width: 0; overflow: hidden; }
    .user-name { font-size: 0.83rem; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .user-role { font-size: 0.68rem; color: rgba(255,255,255,0.55); }
    .app-content { display: flex; flex-direction: column; }
    .topbar { position: sticky; top: 0; z-index: 10; background: #193A31 !important; }
    .toolbar-title { font-weight: 500; margin-left: 8px; }
    .spacer { flex: 1; }
    .main-content { flex: 1; overflow-y: auto; }
  `]
})
export class AppComponent {
  showLayout = false;

  navItems: NavItem[] = [
    { path: '/dashboard',    label: 'Dashboard',         icon: 'dashboard',        roles: ['HEALTH_STAFF', 'NURSE', 'ADMIN', 'DOCTOR', 'LAB_TECHNICIAN', 'CASHIER'] },
    { path: '/patients',     label: 'Pacientes',          icon: 'people',           roles: [] },
    { path: '/appointments', label: 'Monitoreo de Cola',  icon: 'queue',            roles: ['HEALTH_STAFF', 'NURSE', 'ADMIN', 'DOCTOR', 'LAB_TECHNICIAN', 'CASHIER'] },
    { path: '/health-staff', label: 'Recepción',         icon: 'health_and_safety',roles: ['HEALTH_STAFF', 'NURSE', 'ADMIN'] },
    { path: '/consultation',            label: 'Consulta Médica',    icon: 'medical_services', roles: ['DOCTOR', 'ADMIN'] },
    { path: '/emergency-consultation',  label: 'Emergencias Médicas', icon: 'emergency',         roles: ['DOCTOR', 'ADMIN'] },
    { path: '/laboratory',   label: 'Laboratorio',       icon: 'science',          roles: ['LAB_TECHNICIAN', 'ADMIN'] },
    { path: '/pharmacy',     label: 'Farmacia',          icon: 'medication',       roles: ['PHARMACIST', 'ADMIN'] },
    { path: '/payments',     label: 'Caja / Pagos',      icon: 'point_of_sale',    roles: ['CASHIER', 'ADMIN'] },
    { path: '/emergency',    label: 'Emergencias',       icon: 'emergency',        roles: ['HEALTH_STAFF', 'NURSE', 'ADMIN'] },
    { path: '/users',        label: 'Personal',          icon: 'manage_accounts',  roles: ['ADMIN'] },
    { path: '/reports',      label: 'Reportería',        icon: 'bar_chart',        roles: ['ADMIN'] },
    { path: '/call-screen',  label: 'Pantalla de Llamado', icon: 'tv',             roles: ['ADMIN', 'HEALTH_STAFF', 'NURSE'] },
  ];

  currentUser = computed(() => this.authService.currentUser());

  visibleNavItems = computed(() => {
    const user = this.authService.currentUser();
    if (!user) return [];
    return this.navItems.filter(item =>
      item.roles.length === 0 || item.roles.includes(user.role)
    );
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

  logout(): void {
    this.authService.logout();
  }
}
