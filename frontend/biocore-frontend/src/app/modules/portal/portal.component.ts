import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-portal',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, MatToolbarModule, MatCardModule, MatMenuModule],
  template: `
    <!-- Header -->
    <mat-toolbar color="primary" class="portal-header">
      <mat-icon>local_hospital</mat-icon>
      <span class="brand">BioCore Medical</span>
      <span class="spacer"></span>
      <nav class="nav-links">
        <a href="#inicio">Inicio</a>

        <!-- Nosotros dropdown -->
        <button mat-button [matMenuTriggerFor]="menuNosotros" class="nav-btn">
          Nosotros <mat-icon class="dropdown-arrow">expand_more</mat-icon>
        </button>
        <mat-menu #menuNosotros="matMenu">
          <a mat-menu-item href="#nosotros"><mat-icon>flag</mat-icon> Misión</a>
          <a mat-menu-item href="#nosotros"><mat-icon>visibility</mat-icon> Visión</a>
          <a mat-menu-item href="#nosotros"><mat-icon>star</mat-icon> Valores</a>
        </mat-menu>

        <!-- Servicios dropdown -->
        <button mat-button [matMenuTriggerFor]="menuServicios" class="nav-btn">
          Servicios <mat-icon class="dropdown-arrow">expand_more</mat-icon>
        </button>
        <mat-menu #menuServicios="matMenu">
          <a mat-menu-item href="#servicios"><mat-icon>medical_services</mat-icon> Consulta Externa</a>
          <a mat-menu-item href="#servicios"><mat-icon>healing</mat-icon> Medicina General</a>
          <a mat-menu-item href="#servicios"><mat-icon>science</mat-icon> Laboratorio</a>
          <a mat-menu-item href="#servicios"><mat-icon>medication</mat-icon> Farmacia</a>
        </mat-menu>

        <!-- Pacientes dropdown -->
        <button mat-button [matMenuTriggerFor]="menuPacientes" class="nav-btn">
          Pacientes <mat-icon class="dropdown-arrow">expand_more</mat-icon>
        </button>
        <mat-menu #menuPacientes="matMenu">
          <a mat-menu-item routerLink="/register"><mat-icon>person_add</mat-icon> Registro</a>
          <a mat-menu-item routerLink="/login"><mat-icon>folder_shared</mat-icon> Ver historial</a>
        </mat-menu>
      </nav>
      <button mat-raised-button color="accent" routerLink="/login">
        <mat-icon>login</mat-icon> Ingresar
      </button>
    </mat-toolbar>

    <!-- Hero -->
    <section id="inicio" class="hero">
      <div class="hero-content">
        <h1>BioCore Medical</h1>
        <p class="hero-sub">Sistema Integral de Gestión Hospitalaria</p>
        <p class="hero-desc">Cuidamos tu salud con tecnología de vanguardia. Atención médica de calidad, laboratorio, farmacia y más.</p>
        <div class="hero-actions">
          <button mat-raised-button color="primary" routerLink="/login" class="cta-btn">
            <mat-icon>login</mat-icon> Acceder al Sistema
          </button>
          <a href="#servicios">
            <button mat-stroked-button color="primary" class="cta-btn">
              <mat-icon>info</mat-icon> Nuestros Servicios
            </button>
          </a>
        </div>
      </div>
      <div class="hero-image">
        <mat-icon class="hero-icon">local_hospital</mat-icon>
      </div>
    </section>

    <!-- Servicios -->
    <section id="servicios" class="section">
      <div class="section-container">
        <h2 class="section-title">Nuestros Servicios</h2>
        <div class="services-grid">
          <mat-card class="service-card">
            <mat-icon class="service-icon">medical_services</mat-icon>
            <h3>Consulta Externa</h3>
            <p>Atención médica especializada con los mejores profesionales de la salud.</p>
          </mat-card>
          <mat-card class="service-card">
            <mat-icon class="service-icon">healing</mat-icon>
            <h3>Medicina General</h3>
            <p>Diagnóstico y tratamiento de enfermedades comunes con atención integral.</p>
          </mat-card>
          <mat-card class="service-card">
            <mat-icon class="service-icon">science</mat-icon>
            <h3>Laboratorio</h3>
            <p>Análisis clínicos con tecnología de última generación y resultados confiables.</p>
          </mat-card>
          <mat-card class="service-card">
            <mat-icon class="service-icon">medication</mat-icon>
            <h3>Farmacia</h3>
            <p>Despacho de medicamentos con receta electrónica verificada por nuestros médicos.</p>
          </mat-card>
          <mat-card class="service-card">
            <mat-icon class="service-icon">emergency</mat-icon>
            <h3>Emergencias</h3>
            <p>Atención de urgencias las 24 horas, con personal altamente capacitado.</p>
          </mat-card>
        </div>
      </div>
    </section>

    <!-- Nosotros -->
    <section id="nosotros" class="section section-alt">
      <div class="section-container">
        <h2 class="section-title">Nosotros</h2>
        <div class="about-grid">
          <mat-card class="about-card">
            <mat-icon class="about-icon">flag</mat-icon>
            <h3>Misión</h3>
            <p>Brindar atención médica integral de alta calidad, accesible y humanizada, con tecnología de vanguardia para mejorar la salud y calidad de vida de nuestros pacientes.</p>
          </mat-card>
          <mat-card class="about-card">
            <mat-icon class="about-icon">visibility</mat-icon>
            <h3>Visión</h3>
            <p>Ser el hospital de referencia en Guatemala, reconocido por la excelencia médica, la innovación tecnológica y el compromiso con el bienestar de la comunidad.</p>
          </mat-card>
          <mat-card class="about-card">
            <mat-icon class="about-icon">star</mat-icon>
            <h3>Valores</h3>
            <ul>
              <li>Excelencia médica</li>
              <li>Compromiso con el paciente</li>
              <li>Ética e integridad</li>
              <li>Innovación continua</li>
              <li>Trabajo en equipo</li>
            </ul>
          </mat-card>
        </div>
      </div>
    </section>

    <!-- Pacientes -->
    <section id="pacientes" class="section">
      <div class="section-container">
        <h2 class="section-title">Para Pacientes</h2>
        <div class="patient-actions">
          <mat-card class="patient-card" routerLink="/register">
            <mat-icon class="service-icon">person_add</mat-icon>
            <h3>Registro en Línea</h3>
            <p>Pre-regístrate en nuestro sistema desde casa. Al llegar, el personal te asignará tu turno de inmediato.</p>
            <button mat-raised-button color="primary">Registrarme Ahora</button>
          </mat-card>
          <mat-card class="patient-card" routerLink="/login">
            <mat-icon class="service-icon">folder_shared</mat-icon>
            <h3>Acceso al Sistema</h3>
            <p>Accede al sistema hospitalario si eres personal autorizado de BioCore Medical.</p>
            <button mat-raised-button color="accent">Ingresar</button>
          </mat-card>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="portal-footer">
      <div class="footer-content">
        <div class="footer-brand">
          <mat-icon>local_hospital</mat-icon>
          <span>BioCore Medical</span>
        </div>
        <p>© 2026 BioCore Medical. Hospital Information System.</p>
      </div>
    </footer>
  `,
  styles: [`
    .portal-header { position: sticky; top: 0; z-index: 100; }
    .brand { font-size: 1.3rem; font-weight: 700; margin-left: 8px; }
    .spacer { flex: 1; }
    .nav-links { display: flex; align-items: center; gap: 4px; margin-right: 16px; }
    .nav-links a { color: white; text-decoration: none; font-size: 0.95rem; padding: 4px 12px; border-radius: 4px; }
    .nav-links a:hover { color: #bbdefb; background: rgba(255,255,255,0.1); }
    .nav-btn { color: white !important; font-size: 0.95rem !important; }
    .nav-btn:hover { background: rgba(255,255,255,0.1) !important; }
    .dropdown-arrow { font-size: 18px !important; width: 18px !important; height: 18px !important; vertical-align: middle; margin-left: 2px; }

    .hero {
      display: flex; align-items: center; justify-content: space-between;
      min-height: 80vh; padding: 80px 80px;
      background: linear-gradient(135deg, #1a237e 0%, #1565c0 50%, #0288d1 100%);
      color: white;
    }
    .hero-content { flex: 1; }
    .hero h1 { font-size: 3.5rem; font-weight: 700; line-height: 1.1; margin-bottom: 12px; }
    .hero-sub { font-size: 1.3rem; color: #90caf9; margin-bottom: 16px; }
    .hero-desc { font-size: 1.1rem; color: rgba(255,255,255,0.85); max-width: 500px; margin-bottom: 32px; line-height: 1.6; }
    .hero-actions { display: flex; gap: 16px; flex-wrap: wrap; }
    .cta-btn { padding: 12px 28px !important; font-size: 1rem !important; }
    .hero-image { display: flex; align-items: center; justify-content: center; flex: 0.5; }
    .hero-icon { font-size: 180px; width: 180px; height: 180px; color: rgba(255,255,255,0.2); }

    .section { padding: 80px 0; }
    .section-alt { background: #f8f9ff; }
    .section-container { max-width: 1200px; margin: 0 auto; padding: 0 40px; }
    .section-title { text-align: center; font-size: 2rem; font-weight: 600; color: #1a237e; margin-bottom: 48px; }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 24px;
    }
    .service-card { padding: 32px 24px; text-align: center; transition: transform 0.2s, box-shadow 0.2s; }
    .service-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.15) !important; }
    .service-icon { font-size: 48px; width: 48px; height: 48px; color: #1565c0; margin-bottom: 16px; }
    .service-card h3 { font-size: 1.1rem; font-weight: 600; margin-bottom: 8px; color: #1a237e; }
    .service-card p { font-size: 0.9rem; color: #555; line-height: 1.5; }

    .about-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
    .about-card { padding: 32px; }
    .about-icon { font-size: 40px; width: 40px; height: 40px; color: #1565c0; margin-bottom: 16px; }
    .about-card h3 { font-size: 1.2rem; font-weight: 600; margin-bottom: 12px; color: #1a237e; }
    .about-card p, .about-card ul { color: #555; line-height: 1.7; }
    .about-card ul { padding-left: 20px; }

    .patient-actions { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 32px; }
    .patient-card { padding: 40px; text-align: center; cursor: pointer; transition: transform 0.2s; }
    .patient-card:hover { transform: translateY(-4px); }
    .patient-card h3 { font-size: 1.3rem; font-weight: 600; margin-bottom: 12px; color: #1a237e; }
    .patient-card p { color: #555; margin-bottom: 24px; }

    .portal-footer {
      background: #1a237e; color: white; padding: 40px;
      text-align: center;
    }
    .footer-brand { display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 1.3rem; font-weight: 700; margin-bottom: 12px; }
    .portal-footer p { color: rgba(255,255,255,0.7); font-size: 0.9rem; }

    @media (max-width: 768px) {
      .hero { flex-direction: column; padding: 40px 24px; }
      .hero-image { display: none; }
      .hero h1 { font-size: 2rem; }
      .nav-links { display: none; }
    }
  `]
})
export class PortalComponent {}
