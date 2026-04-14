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
    .app-sidenav { width: 240px; background: #1a237e; color: white; }
    .sidenav-header {
      display: flex; align-items: center; gap: 12px;
      padding: 24px 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.15);
    }
    .logo-icon { font-size: 36px; width: 36px; height: 36px; color: #64b5f6; }
    .brand-name { font-size: 1.3rem; font-weight: 700; color: white; }
    .brand-sub { font-size: 0.7rem; color: rgba(255,255,255,0.6); letter-spacing: 1px; text-transform: uppercase; }
    mat-nav-list a { color: rgba(255,255,255,0.85) !important; border-radius: 8px; margin: 2px 8px; }
    mat-nav-list a:hover { background: rgba(255,255,255,0.1) !important; }
    .active-link { background: rgba(100,181,246,0.25) !important; color: #64b5f6 !important; }
    mat-icon[matListItemIcon] { color: inherit !important; }
    .sidenav-footer {
      position: absolute; bottom: 0; left: 0; right: 0;
      display: flex; align-items: center; justify-content: space-between;
      padding: 12px 16px; border-top: 1px solid rgba(255,255,255,0.15);
      background: rgba(0,0,0,0.2);
    }
    .user-info { display: flex; align-items: center; gap: 8px; color: white; }
    .user-name { font-size: 0.85rem; font-weight: 500; }
    .user-role { font-size: 0.7rem; color: rgba(255,255,255,0.6); }
    .app-content { display: flex; flex-direction: column; }
    .topbar { position: sticky; top: 0; z-index: 10; }
    .toolbar-title { font-weight: 500; margin-left: 8px; }
    .spacer { flex: 1; }
    .main-content { flex: 1; overflow-y: auto; }
  `]
})
export class AppComponent {
  showLayout = false;

  navItems: NavItem[] = [
    { path: '/dashboard', label: 'Dashboard', icon: 'dashboard', roles: [] },
    { path: '/patients', label: 'Pacientes', icon: 'people', roles: [] },
    { path: '/consultation', label: 'Consulta Médica', icon: 'medical_services', roles: ['DOCTOR'] },
    { path: '/laboratory', label: 'Laboratorio', icon: 'science', roles: ['LAB_TECHNICIAN'] },
    { path: '/pharmacy', label: 'Farmacia', icon: 'medication', roles: ['PHARMACIST'] },
    { path: '/payments', label: 'Caja / Pagos', icon: 'point_of_sale', roles: ['CASHIER', 'ADMIN'] },
    { path: '/emergency', label: 'Emergencias', icon: 'emergency', roles: ['HEALTH_STAFF', 'NURSE', 'ADMIN'] },
    { path: '/users', label: 'Personal', icon: 'manage_accounts', roles: ['ADMIN'] },
    { path: '/reports', label: 'Reportería', icon: 'bar_chart', roles: ['ADMIN'] },
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
      const noLayoutRoutes = ['/login', '/portal'];
      this.showLayout = this.authService.isLoggedIn() &&
        !noLayoutRoutes.some(r => e.url.startsWith(r));
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
