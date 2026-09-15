/**
 * Real microphone level via AnalyserNode (P0-1).
 * - Requests mic lazily, only while active; releases the track on stop.
 * - RMS smoothing, 0..1; frozen at 0 in silence; 0 under reduced motion is
 *   handled by the caller (meter renders static), not here.
 * - Falls back to a constant low level ONLY if permission is denied, and
 *   reports permission state so the UI can show guidance.
 */
export type MicLevelState = { level: number; denied: boolean };

export function useRealMicLevel(active: boolean, set: (s: MicLevelState) => void): () => void {
  let stream: MediaStream | null = null;
  let ctx: AudioContext | null = null;
  let raf = 0;
  let stopped = false;

  const cleanup = () => {
    stopped = true;
    cancelAnimationFrame(raf);
    try { stream?.getTracks().forEach(t => t.stop()); } catch { /* noop */ }
    try { ctx?.close(); } catch { /* noop */ }
    stream = null; ctx = null;
    set({ level: 0, denied: false });
  };

  if (!active || typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
    // Not recording (or no API): silent meter, never a fake signal.
    set({ level: 0, denied: false });
    return cleanup;
  }

  navigator.mediaDevices.getUserMedia({ audio: true }).then(s => {
    if (stopped) { s.getTracks().forEach(t => t.stop()); return; }
    stream = s;
    const AC: typeof AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new AC();
    const src = ctx.createMediaStreamSource(s);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 128;
    src.connect(analyser);
    const buf = new Float32Array(analyser.fftSize);
    let smooth = 0;
    const tick = () => {
      if (stopped || !analyser) return;
      analyser.getFloatTimeDomainData(buf);
      let sum = 0;
      for (let i = 0; i < buf.length; i++) sum += buf[i] * buf[i];
      const rms = Math.sqrt(sum / buf.length);          // 0..~1
      const norm = Math.min(1, rms * 4);                 // speech headroom
      smooth = norm > smooth ? norm * 0.6 + smooth * 0.4 : norm * 0.25 + smooth * 0.75; // fast attack, slow release
      set({ level: smooth, denied: false });
      raf = requestAnimationFrame(tick);
    };
    tick();
  }).catch(() => {
    // Permission denied: report it - UI must show guidance, never fake levels.
    set({ level: 0, denied: true });
  });

  return cleanup;
}
