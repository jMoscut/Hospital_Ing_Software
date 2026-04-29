import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const NOTIF_KEY = 'biocore_notification_settings';

@Component({
  selector: 'app-call-screen',
  standalone: true,
  imports: [CommonModule, MatIconModule],
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
            <div *ngFor="let t of calledTickets"
                 [class]="'called-card' + (t.status === 'CALLED_TO_VITAL_SIGNS' ? ' card-vitals' : '') + (t.priority === 'URGENT' ? ' card-emergency' : '')">
              <div class="emergency-banner" *ngIf="t.priority === 'URGENT'">
                <span class="emg-pulse"></span> EMERGENCIA — ATENCIÓN INMEDIATA
              </div>
              <div class="ticket-number">{{ t.ticketNumber }}</div>
              <div class="patient-name">{{ t.patientName }}</div>
              <div class="clinic-arrow">
                <span class="arrow">→</span>
                <span class="clinic-name" *ngIf="t.status === 'CALLED_TO_VITAL_SIGNS'">Área de Signos Vitales</span>
                <span class="clinic-name" *ngIf="t.status !== 'CALLED_TO_VITAL_SIGNS'">{{ t.clinicName }}{{ t.doctorName ? ' — Dr. ' + t.doctorName : '' }}</span>
              </div>
              <div class="destination-badge" *ngIf="t.status === 'CALLED_TO_VITAL_SIGNS'">
                <mat-icon style="font-size:16px;vertical-align:middle">monitor_heart</mat-icon> Signos Vitales
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
          <div [class]="'queue-item' + (t.priority === 'URGENT' ? ' queue-item-urgent' : '')"
               *ngFor="let t of waitingTickets; let i = index">
            <span class="queue-pos">{{ i + 1 }}</span>
            <span class="queue-num" [class.queue-num-urgent]="t.priority === 'URGENT'">{{ t.ticketNumber }}</span>
            <span class="queue-urgent-badge" *ngIf="t.priority === 'URGENT'">URGENTE</span>
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
    .card-vitals { background: linear-gradient(135deg, #1a5c6e, #2ea8c4) !important; box-shadow: 0 0 60px rgba(46,168,196,0.4) !important; }
    .card-emergency { background: linear-gradient(135deg, #7f0000, #c62828) !important; box-shadow: 0 0 80px rgba(198,40,40,0.7) !important; animation: fadeIn 0.4s ease, emg-pulse-border 1s infinite !important; }
    .emergency-banner { font-size: 0.85rem; font-weight: 800; letter-spacing: 2px; color: #ffcdd2; background: rgba(0,0,0,0.3); border-radius: 6px; padding: 4px 14px; margin-bottom: 16px; display: flex; align-items: center; gap: 10px; }
    .emg-pulse { width: 10px; height: 10px; border-radius: 50%; background: #ff5252; display: inline-block; animation: pulse 0.7s infinite; flex-shrink: 0; }
    @keyframes emg-pulse-border { 0%,100% { box-shadow: 0 0 80px rgba(198,40,40,0.7); } 50% { box-shadow: 0 0 120px rgba(255,82,82,1); } }
    .destination-badge { margin-top: 12px; font-size: 0.85rem; background: rgba(255,255,255,0.2); border-radius: 20px; padding: 4px 14px; display: inline-flex; align-items: center; gap: 6px; }

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
    .queue-num-urgent { color: #ff5252 !important; }
    .queue-patient { flex: 1; color: rgba(255,255,255,0.8); }
    .queue-clinic { font-size: 0.8rem; color: rgba(255,255,255,0.45); }
    .queue-item-urgent { background: rgba(198,40,40,0.18) !important; border-left: 3px solid #ff5252; }
    .queue-urgent-badge { background: #c62828; color: white; font-size: 0.65rem; font-weight: 700; padding: 2px 7px; border-radius: 4px; letter-spacing: 0.05em; margin-right: 4px; flex-shrink: 0; }

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

  // Auto-announce emergency state
  private emgAnnounceCount = new Map<number, number>();
  private emgLastAnnounced = new Map<number, number>();
  private readonly EMG_REPEAT_MS = 25000; // 25s between each of the 3 calls
  private readonly EMG_MAX_CALLS = 3;

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
        const all = res.data as any[];

        // Emergency tickets: WAITING + URGENT → auto-announced
        const urgentWaiting = all.filter(t => t.status === 'WAITING' && t.priority === 'URGENT');

        // Normal called tickets (by staff)
        const normalCalled = all.filter(t =>
          t.status === 'BEING_CALLED' || t.status === 'CALLED_TO_VITAL_SIGNS');

        // ── Auto-announce emergency ──────────────────────────────────────────
        const urgentIds = new Set(urgentWaiting.map(t => t.id));
        const now = Date.now();

        urgentWaiting.forEach(t => {
          const count = this.emgAnnounceCount.get(t.id) ?? 0;
          const lastTime = this.emgLastAnnounced.get(t.id) ?? 0;

          if (count > this.EMG_MAX_CALLS) {
            // Already marked attended — waiting for backend to flip status, skip
            return;
          }
          if (count === this.EMG_MAX_CALLS) {
            // 3 calls done → auto-mark attended (sets count to MAX+1 to block re-entry)
            this.autoMarkAttended(t.id);
            return;
          }
          if (count === 0 || (now - lastTime) >= this.EMG_REPEAT_MS) {
            this.emgAnnounceCount.set(t.id, count + 1);
            this.emgLastAnnounced.set(t.id, now);
            this.announce(t);
          }
        });

        // Clean tracking for tickets no longer urgent-waiting
        for (const id of this.emgAnnounceCount.keys()) {
          if (!urgentIds.has(id)) {
            this.emgAnnounceCount.delete(id);
            this.emgLastAnnounced.delete(id);
          }
        }

        // ── Normal announce ──────────────────────────────────────────────────
        normalCalled.forEach(t => {
          if (!this.lastCalledIds.has(t.id)) this.announce(t);
        });
        this.lastCalledIds = new Set(normalCalled.map(t => t.id));

        // Display: emergency urgent on top, then normal called
        this.calledTickets = [...urgentWaiting, ...normalCalled];

        // Queue: non-urgent WAITING only
        this.waitingTickets = all
          .filter(t => t.status === 'WAITING' && t.priority !== 'URGENT')
          .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
          .slice(0, 8);
      },
      error: () => {}
    });
  }

  private autoMarkAttended(ticketId: number): void {
    // Set count above MAX so subsequent polls skip this ticket until backend confirms COMPLETED
    this.emgAnnounceCount.set(ticketId, this.EMG_MAX_CALLS + 1);
    this.emgLastAnnounced.delete(ticketId);
    this.http.put(`${environment.apiUrl}/emergency/tickets/${ticketId}/mark-attended`, {})
      .subscribe({ error: () => {} });
  }

  private announce(ticket: any): void {
    const settings = this.getSettings();
    if (!settings.audioEnabled) return;

    const destination = ticket.status === 'CALLED_TO_VITAL_SIGNS'
      ? 'el área de signos vitales'
      : `${ticket.clinicName}${ticket.doctorName ? ', con el doctor ' + ticket.doctorName : ''}`;

    if (settings.alertType === 'voice' && 'speechSynthesis' in window) {
      const isEmergency = ticket.priority === 'URGENT';
      const prefix = isEmergency ? 'EMERGENCIA. ATENCIÓN INMEDIATA. ' : '';
      const text = prefix
        + `Se llama turno ${ticket.ticketNumber.split('').join(' ')}, `
        + `${ticket.patientName}, `
        + `favor dirigirse a ${destination}.`;

      window.speechSynthesis.cancel();
      const repetitions = settings.repetitions ?? 2;
      let count = 0;
      const speak = () => {
        if (count >= repetitions) return;
        const u = new SpeechSynthesisUtterance(text);
        const voices = window.speechSynthesis.getVoices();
        const spanish = voices.find(v => v.lang.startsWith('es'));
        if (spanish) u.voice = spanish;
        u.lang = 'es-ES';
        u.volume = (settings.volume ?? 80) / 100;
        u.rate = 0.85;
        u.onend = () => { count++; setTimeout(speak, 800); };
        if (window.speechSynthesis.paused) window.speechSynthesis.resume();
        window.speechSynthesis.speak(u);
      };
      const doSpeak = () => {
        if (window.speechSynthesis.getVoices().length === 0) {
          window.speechSynthesis.onvoiceschanged = () => { window.speechSynthesis.onvoiceschanged = null; setTimeout(speak, 150); };
          window.speechSynthesis.getVoices();
        } else {
          setTimeout(speak, 150);
        }
      };
      doSpeak();
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
    const defaults = { audioEnabled: true, alertType: 'voice', volume: 80, repetitions: 2 };
    try {
      const s = localStorage.getItem(NOTIF_KEY);
      return s ? { ...defaults, ...JSON.parse(s) } : defaults;
    } catch { return defaults; }
  }
}
