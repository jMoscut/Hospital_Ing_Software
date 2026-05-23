import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-portal',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, MatToolbarModule, MatCardModule],
  template: `
    <!-- Header -->
    <mat-toolbar color="primary" class="portal-header">
      <mat-icon>local_hospital</mat-icon>
      <span class="brand">BioCore Medical</span>
      <span class="spacer"></span>
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
    * { box-sizing: border-box; }

    /* ── HEADER ── */
    .portal-header { position: sticky; top: 0; z-index: 100; box-shadow: 0 1px 12px rgba(0,0,0,0.15) !important; }
    .brand { font-size: 1.25rem; font-weight: 700; margin-left: 10px; letter-spacing: -0.2px; }
    .spacer { flex: 1; }
    .nav-links { display: flex; align-items: center; gap: 2px; margin-right: 20px; }
    .nav-links a {
      color: rgba(255,255,255,0.9); text-decoration: none; font-size: 0.9rem;
      padding: 6px 14px; border-radius: 8px; font-weight: 500; transition: all 0.15s;
    }
    .nav-links a:hover { background: rgba(255,255,255,0.12); color: white; }
    .nav-btn { color: rgba(255,255,255,0.9) !important; font-size: 0.9rem !important; font-weight: 500 !important; border-radius: 8px !important; }
    .nav-btn:hover { background: rgba(255,255,255,0.12) !important; }
    .dropdown-arrow { font-size: 16px !important; width: 16px !important; height: 16px !important; vertical-align: middle; margin-left: 2px; }

    /* ── HERO ── */
    .hero {
      display: flex; align-items: center; justify-content: space-between;
      min-height: 88vh; padding: 80px 80px;
      background: linear-gradient(150deg, #243C2C 0%, #243C2C 40%, #243C2C 80%, #243C2C 100%);
      color: white; position: relative; overflow: hidden;
    }
    .hero::before {
      content: ''; position: absolute; top: -200px; right: -200px;
      width: 600px; height: 600px; border-radius: 50%;
      background: radial-gradient(circle, rgba(89,120,159,0.15) 0%, transparent 65%);
      pointer-events: none;
    }
    .hero::after {
      content: ''; position: absolute; bottom: -150px; left: 30%;
      width: 400px; height: 400px; border-radius: 50%;
      background: radial-gradient(circle, rgba(89,120,159,0.08) 0%, transparent 65%);
      pointer-events: none;
    }
    .hero-content { flex: 1; position: relative; z-index: 1; }
    .hero h1 {
      font-size: 3.8rem; font-weight: 800; line-height: 1.05; margin: 0 0 14px;
      background: linear-gradient(135deg, #ffffff 40%, #a8e6df 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .hero-sub { font-size: 1.2rem; color: #7A9445; margin-bottom: 18px; font-weight: 500; }
    .hero-desc { font-size: 1.05rem; color: rgba(255,255,255,0.75); max-width: 520px; margin-bottom: 36px; line-height: 1.7; }
    .hero-actions { display: flex; gap: 14px; flex-wrap: wrap; }
    .cta-btn { padding: 0 32px !important; height: 52px !important; font-size: 1rem !important; font-weight: 600 !important; border-radius: 12px !important; background: #7A9445 !important; color: #E8F2D0 !important; }
    .cta-btn mat-icon { color: #E8F2D0 !important; }
    .hero-image { display: flex; align-items: center; justify-content: center; flex: 0.5; position: relative; z-index: 1; }
    .hero-icon {
      font-size: 200px !important; width: 200px !important; height: 200px !important;
      color: rgba(122,148,69,0.55);
      filter: drop-shadow(0 0 40px rgba(89,120,159,0.2));
    }

    /* ── SECTIONS ── */
    .section { padding: 90px 0; }
    .section-alt { background: #F0EDD5; }
    .section-container { max-width: 1200px; margin: 0 auto; padding: 0 48px; }
    .section-title {
      text-align: center; font-size: 2rem; font-weight: 700;
      color: #243C2C; margin-bottom: 56px;
      position: relative;
    }
    .section-title::after {
      content: ''; display: block; width: 48px; height: 3px;
      background: #7A9445; border-radius: 2px; margin: 14px auto 0;
    }

    /* ── SERVICES ── */
    .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
    .service-card {
      padding: 36px 24px; text-align: center;
      transition: transform 0.25s ease, box-shadow 0.25s ease;
      border-radius: 16px !important; border: 1px solid #C5CDD8 !important;
    }
    .service-card:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(36,60,44,0.12) !important; }
    .service-icon {
      font-size: 48px !important; width: 48px !important; height: 48px !important;
      color: #59789F; margin-bottom: 18px;
      background: transparent;
      display: inline-flex; align-items: center; justify-content: center;
    }
    .service-card h3 { font-size: 1.05rem; font-weight: 600; margin: 0 0 8px; color: #243C2C; }
    .service-card p { font-size: 0.88rem; color: #5a7068; line-height: 1.6; margin: 0; }

    /* ── ABOUT ── */
    .about-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
    .about-card { padding: 36px; border-radius: 16px !important; border: 1px solid #C5CDD8 !important; }
    .about-icon {
      font-size: 40px !important; width: 40px !important; height: 40px !important;
      color: #59789F; margin-bottom: 18px;
      background: transparent;
      display: inline-flex; align-items: center; justify-content: center;
    }
    .about-card h3 { font-size: 1.15rem; font-weight: 600; margin: 0 0 12px; color: #243C2C; }
    .about-card p, .about-card ul { color: #4a6560; line-height: 1.75; margin: 0; }
    .about-card ul { padding-left: 18px; }
    .about-card ul li { margin-bottom: 4px; }

    /* ── PATIENT ACTIONS ── */
    .patient-actions { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px; }
    .patient-card {
      padding: 48px 40px; text-align: center; cursor: pointer;
      transition: transform 0.25s ease, box-shadow 0.25s ease;
      border-radius: 20px !important; border: 1px solid #C5CDD8 !important;
    }
    .patient-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(36,60,44,0.12) !important; }
    .patient-card h3 { font-size: 1.3rem; font-weight: 600; margin: 0 0 12px; color: #243C2C; }
    .patient-card p { color: #4a6560; margin: 0 0 28px; line-height: 1.6; }

    /* ── FOOTER ── */
    .portal-footer {
      background: linear-gradient(135deg, #243C2C, #243C2C);
      color: white; padding: 48px;
      text-align: center;
    }
    .footer-brand {
      display: flex; align-items: center; justify-content: center;
      gap: 10px; font-size: 1.25rem; font-weight: 700; margin-bottom: 12px;
      color: #7A9445;
    }
    .portal-footer p { color: rgba(255,255,255,0.45); font-size: 0.875rem; margin: 0; }

    @media (max-width: 900px) {
      .hero { flex-direction: column; padding: 56px 28px; min-height: auto; gap: 40px; }
      .hero-image { display: none; }
      .hero h1 { font-size: 2.4rem; }
      .nav-links { display: none; }
      .section-container { padding: 0 24px; }
    }
  `]
})
export class PortalComponent {}
