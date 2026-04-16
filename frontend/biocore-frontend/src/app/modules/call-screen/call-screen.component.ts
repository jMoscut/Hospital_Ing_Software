import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const NOTIF_KEY = 'biocore_notification_settings';

@Component({
  selector: 'app-call-screen',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="screen-root">

      <!-- Header -->
      <div class="screen-header">
        <div class="brand">
          <span class="brand-icon">🏥</span>
          <div>
            <div class="brand-name">BioCore Medical</div>
            <div class="brand-sub">Sistema de Atención al Paciente</div>
          </div>
        </div>
        <div class="clock">{{ now | date:'HH:mm:ss' }}</div>
      </div>

      <!-- Main: current ticket being called -->
      <div class="main-area">
        <ng-container *ngIf="calledTickets.length > 0; else noCall">
          <div class="now-calling-label">
            <span class="pulse-dot"></span> LLAMANDO AHORA
          </div>
          <div class="called-cards">
            <div class="called-card" *ngFor="let t of calledTickets">
              <div class="ticket-number">{{ t.ticketNumber }}</div>
              <div class="patient-name">{{ t.patientName }}</div>
              <div class="clinic-arrow">
                <span class="arrow">→</span>
                <span class="clinic-name">{{ t.clinicName }}</span>
              </div>
            </div>
          </div>
        </ng-container>
        <ng-template #noCall>
          <div class="no-call">
            <div class="no-call-icon">⏳</div>
            <div class="no-call-text">En espera de llamado</div>
          </div>
        </ng-template>
      </div>

      <!-- Queue: next patients waiting -->
      <div class="queue-area" *ngIf="waitingTickets.length > 0">
        <div class="queue-title">Próximos en espera</div>
        <div class="queue-list">
          <div class="queue-item" *ngFor="let t of waitingTickets; let i = index">
            <span class="queue-pos">{{ i + 1 }}</span>
            <span class="queue-num">{{ t.ticketNumber }}</span>
            <span class="queue-patient">{{ t.patientName }}</span>
            <span class="queue-clinic">{{ t.clinicName }}</span>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="screen-footer">
        <span>Por favor manténgase atento a su número de turno</span>
        <span class="footer-dot">·</span>
        <span>Please remain attentive to your ticket number</span>
      </div>

    </div>
  `,
  styles: [`
    :host { display: block; width: 100vw; height: 100vh; overflow: hidden; }

    .screen-root {
      width: 100vw; height: 100vh;
      background: #0a1a16;
      display: flex; flex-direction: column;
      font-family: 'Segoe UI', Arial, sans-serif;
      color: white;
    }

    /* Header */
    .screen-header {
      display: flex; justify-content: space-between; align-items: center;
      padding: 16px 40px;
      background: rgba(62,185,168,0.15);
      border-bottom: 2px solid #3EB9A8;
    }
    .brand { display: flex; align-items: center; gap: 16px; }
    .brand-icon { font-size: 2rem; }
    .brand-name { font-size: 1.4rem; font-weight: 700; color: #3EB9A8; }
    .brand-sub { font-size: 0.75rem; color: rgba(255,255,255,0.5); letter-spacing: 1px; text-transform: uppercase; }
    .clock { font-size: 2.2rem; font-weight: 700; color: #3EB9A8; font-variant-numeric: tabular-nums; }

    /* Main area */
    .main-area {
      flex: 1; display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      padding: 32px;
    }
    .now-calling-label {
      display: flex; align-items: center; gap: 12px;
      font-size: 1rem; font-weight: 700; letter-spacing: 3px;
      color: #3EB9A8; text-transform: uppercase; margin-bottom: 32px;
    }
    .pulse-dot {
      width: 14px; height: 14px; border-radius: 50%;
      background: #3EB9A8;
      animation: pulse 1.2s infinite;
      display: inline-block;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.8); }
    }
    .called-cards {
      display: flex; gap: 32px; flex-wrap: wrap; justify-content: center;
    }
    .called-card {
      background: linear-gradient(135deg, #1D6C61, #3EB9A8);
      border-radius: 20px; padding: 32px 48px; text-align: center;
      min-width: 320px;
      box-shadow: 0 0 60px rgba(62,185,168,0.4);
      animation: fadeIn 0.4s ease;
    }
    @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
    .ticket-number { font-size: 5rem; font-weight: 900; line-height: 1; color: white; letter-spacing: 2px; }
    .patient-name { font-size: 1.6rem; font-weight: 600; color: rgba(255,255,255,0.9); margin: 12px 0 16px; }
    .clinic-arrow { display: flex; align-items: center; justify-content: center; gap: 12px; }
    .arrow { font-size: 2rem; color: rgba(255,255,255,0.7); }
    .clinic-name { font-size: 1.2rem; color: rgba(255,255,255,0.85); font-weight: 500; }

    .no-call { text-align: center; color: rgba(255,255,255,0.25); }
    .no-call-icon { font-size: 5rem; margin-bottom: 16px; }
    .no-call-text { font-size: 1.5rem; font-weight: 300; letter-spacing: 2px; }

    /* Queue */
    .queue-area {
      background: rgba(255,255,255,0.04);
      border-top: 1px solid rgba(62,185,168,0.2);
      padding: 16px 40px;
      max-height: 220px; overflow-y: auto;
    }
    .queue-title {
      font-size: 0.75rem; font-weight: 700; letter-spacing: 2px;
      color: rgba(255,255,255,0.4); text-transform: uppercase; margin-bottom: 10px;
    }
    .queue-list { display: flex; flex-direction: column; gap: 6px; }
    .queue-item {
      display: flex; align-items: center; gap: 16px;
      padding: 8px 16px; border-radius: 8px;
      background: rgba(255,255,255,0.05);
      font-size: 0.95rem;
    }
    .queue-pos { color: rgba(255,255,255,0.3); min-width: 20px; font-size: 0.8rem; }
    .queue-num { font-weight: 700; color: #3EB9A8; min-width: 80px; }
    .queue-patient { flex: 1; color: rgba(255,255,255,0.8); }
    .queue-clinic { font-size: 0.8rem; color: rgba(255,255,255,0.45); }

    /* Footer */
    .screen-footer {
      display: flex; justify-content: center; align-items: center; gap: 16px;
      padding: 12px; font-size: 0.8rem; color: rgba(255,255,255,0.3);
      border-top: 1px solid rgba(255,255,255,0.05);
    }
    .footer-dot { color: #3EB9A8; }
  `]
})
export class CallScreenComponent implements OnInit, OnDestroy {
  calledTickets: any[] = [];
  waitingTickets: any[] = [];
  now = new Date();

  private pollInterval: any;
  private clockInterval: any;
  private lastCalledIds = new Set<number>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.poll();
    this.pollInterval = setInterval(() => this.poll(), 5000);
    this.clockInterval = setInterval(() => { this.now = new Date(); }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.pollInterval);
    clearInterval(this.clockInterval);
    window.speechSynthesis?.cancel();
  }

  private poll(): void {
    this.http.get<any>(`${environment.apiUrl}/tickets`).subscribe({
      next: res => {
        if (!res.success) return;
        const newCalled = res.data.filter((t: any) => t.status === 'BEING_CALLED');
        const waiting   = res.data.filter((t: any) => t.status === 'WAITING').slice(0, 8);

        // Announce newly called tickets
        newCalled.forEach((t: any) => {
          if (!this.lastCalledIds.has(t.id)) {
            this.announce(t);
          }
        });
        this.lastCalledIds = new Set(newCalled.map((t: any) => t.id));

        this.calledTickets = newCalled;
        this.waitingTickets = waiting;
      },
      error: () => {}
    });
  }

  private announce(ticket: any): void {
    const settings = this.getSettings();
    if (!settings.audioEnabled) return;

    if (settings.alertType === 'voice' && 'speechSynthesis' in window) {
      const text = `Se llama turno ${ticket.ticketNumber.replace(/-/g, ' ')}, `
        + `${ticket.patientName}, `
        + `favor dirigirse a ${ticket.clinicName}.`;

      window.speechSynthesis.cancel();
      let count = 0;
      const go = () => {
        if (count >= (settings.repetitions ?? 2)) return;
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'es-ES';
        u.volume = (settings.volume ?? 80) / 100;
        u.rate = 0.85;
        u.onend = () => { count++; if (count < settings.repetitions) setTimeout(go, 800); };
        window.speechSynthesis.speak(u);
      };
      go();
    } else if (settings.alertType === 'tone') {
      this.playTone(settings.volume ?? 80);
    }
  }

  private playTone(vol: number): void {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sine'; osc.frequency.value = 880;
      gain.gain.value = vol / 100 * 0.6;
      osc.start(); osc.stop(ctx.currentTime + 0.5);
    } catch { /* */ }
  }

  private getSettings() {
    try {
      const s = localStorage.getItem(NOTIF_KEY);
      return s ? JSON.parse(s) : {};
    } catch { return {}; }
  }
}
