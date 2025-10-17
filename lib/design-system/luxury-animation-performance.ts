/**
 * Luxury Animation Performance Monitoring
 */

export interface AnimationPerformanceSample {
  ts: number;
  fps: number;
  droppedFrames: number;
}

export class LuxuryAnimationPerformance {
  private static samples: AnimationPerformanceSample[] = [];
  private static rafId: number | null = null;
  private static lastTs = 0;
  private static frames = 0;

  static start(): void {
    if (typeof window === 'undefined' || this.rafId) return;
    this.samples = [];
    this.frames = 0;
    this.lastTs = performance.now();

    const tick = (ts: number) => {
      this.frames += 1;
      const dt = ts - this.lastTs;
      if (dt >= 1000) {
        const fps = Math.round((this.frames * 1000) / dt);
        const droppedFrames = Math.max(0, 60 - fps);
        this.samples.push({ ts, fps, droppedFrames });
        this.frames = 0;
        this.lastTs = ts;
      }
      this.rafId = requestAnimationFrame(tick);
    };

    this.rafId = requestAnimationFrame(tick);
  }

  static stop(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = null;
  }

  static getSamples(): AnimationPerformanceSample[] {
    return this.samples.slice(-60);
  }

  static getSummary(): { avgFps: number; avgDropped: number } {
    const s = this.getSamples();
    if (!s.length) return { avgFps: 0, avgDropped: 0 };
    const avgFps = Math.round(s.reduce((a, b) => a + b.fps, 0) / s.length);
    const avgDropped = Math.round(s.reduce((a, b) => a + b.droppedFrames, 0) / s.length);
    return { avgFps, avgDropped };
  }
}

export default LuxuryAnimationPerformance;


