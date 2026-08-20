import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mic, Square, Play, Pause, Check, RotateCcw, ChevronLeft, ChevronRight,
  Clock, Coins, Users2, Volume2, AlertCircle,
} from 'lucide-react';
import { VoiceVisualizer } from './ui/VoiceVisualizer';
import { getQuest, formatMeta, Quest, QuestFormat } from '../lib/quests';
import {
  LINES_CONTENT, SCENARIO_CONTENT, INTERVIEW_CONTENT, ROOM_CONTENT,
} from '../lib/questContent';
import { AcousticNoisePause } from './AcousticNoisePause';
import { useDevContext } from '../lib/DevContext';
import { ConsentSheet } from './ui/ConsentSheet';
import { hasConsented, advanceStage, getProfile } from '../lib/session';

/* ═══════════════════════════════════════════════════════════════════
   Dispatcher — consent gate, invalid/disabled guards, format routing
   ═══════════════════════════════════════════════════════════════════ */

export function Recording() {
  const navigate = useNavigate();
  const { questId } = useParams();
  const quest = getQuest(questId);

  const [consentPassed, setConsentPassed] = useState(hasConsented());

  /* Edge-swipe back */
  useEffect(() => {
    let startX = 0;
    const onStart = (e: TouchEvent) => { startX = e.touches[0].clientX; };
    const onEnd = (e: TouchEvent) => {
      if (e.changedTouches[0].clientX - startX > 72 && startX < 56) navigate(-1);
    };
    document.addEventListener('touchstart', onStart);
    document.addEventListener('touchend', onEnd);
    return () => {
      document.removeEventListener('touchstart', onStart);
      document.removeEventListener('touchend', onEnd);
    };
  }, [navigate]);

  /* Guard: unknown quest id — no silent fallback content (§ Pass 2). */
  if (!quest) return <NotFound onBack={() => navigate('/contributor/quests')} />;

  /* Guard: interview with no track yet — waiting for prompts. */
  if (quest.available === false || (quest.format === 'interview' && !quest.track)) {
    return <WaitingForPrompts quest={quest} onBack={() => navigate('/contributor/quests')} />;
  }

  if (!consentPassed) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--background)' }}>
        <ConsentSheet onComplete={() => setConsentPassed(true)} onCancel={() => navigate(-1)} />
      </div>
    );
  }

  return <Studio quest={quest} />;
}

/* ═══════════════════════════════════════════════════════════════════
   Studio — Brief → Capture → Review → Pending, shared across formats
   ═══════════════════════════════════════════════════════════════════ */

type Beat = 'brief' | 'capture' | 'review' | 'pending';

interface Clip { label: string; seconds: number; }

function Studio({ quest }: { quest: Quest }) {
  const navigate = useNavigate();
  const [beat, setBeat] = useState<Beat>('brief');
  const [clips, setClips] = useState<Clip[]>([]);

  const submit = () => {
    // Blocker 2: first submitted session moves day0 → session.
    if (getProfile()?.stage === 'day0') advanceStage('session');
    setBeat('pending');
  };

  return (
    <AnimatePresence mode="wait">
      {beat === 'brief' && (
        <motion.div key="brief" {...beatFade}>
          <Brief quest={quest} onStart={() => setBeat('capture')} onBack={() => navigate('/contributor/quests')} />
        </motion.div>
      )}
      {beat === 'capture' && (
        <motion.div key="capture" {...beatFade}>
          <Capture
            quest={quest}
            onDone={(recorded) => { setClips(recorded); setBeat('review'); }}
            onBack={() => setBeat('brief')}
          />
        </motion.div>
      )}
      {beat === 'review' && (
        <motion.div key="review" {...beatFade}>
          <Review quest={quest} clips={clips} onSubmit={submit} onRetakeAll={() => setBeat('capture')} />
        </motion.div>
      )}
      {beat === 'pending' && (
        <motion.div key="pending" {...beatFade}>
          <Pending quest={quest} onHome={() => navigate('/contributor')} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const beatFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.22 },
};

/* ═══════════════════════════════════════════════════════════════════
   BEAT 1 — Brief (light, tab-bar world). ~10s of orientation.
   ═══════════════════════════════════════════════════════════════════ */

function Brief({ quest, onStart, onBack }: { quest: Quest; onStart: () => void; onBack: () => void }) {
  const meta = formatMeta[quest.format];
  const count = captureCount(quest);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--background)', fontFamily: 'var(--font-sans)' }}>
      <div className="px-6 pt-14 pb-4">
        <button onClick={onBack} style={backBtn}>
          <ChevronLeft style={{ width: 22, height: 22 }} strokeWidth={2.5} />
        </button>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: 'var(--accent-primary-deep)', textTransform: 'uppercase' }}>
          {meta.short}
        </span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', marginTop: 6, letterSpacing: '-0.01em' }}>
          {quest.title}
        </h1>
      </div>

      <div className="flex-1 px-6 pb-40 overflow-y-auto">
        {/* Meta row */}
        <div className="flex items-center gap-4 mb-6" style={{ flexWrap: 'wrap' }}>
          <MetaChip Icon={Coins} text={`₹${quest.cashPayout}`} accent />
          <MetaChip Icon={Clock} text={quest.duration} />
          <MetaChip
            Icon={Users2}
            text={
              quest.format === 'room' ? `${quest.speakers} people`
              : quest.format === 'interview' ? `${quest.questions} questions`
              : `${count} ${quest.format === 'lines' ? 'lines' : 'turns'}`
            }
          />
        </div>

        {/* Scene / setup card */}
        <SectionLabel>{quest.format === 'lines' ? 'What you\'ll read' : 'The scene'}</SectionLabel>
        <div style={briefCard}>
          <p style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            {briefScene(quest)}
          </p>
        </div>

        {/* How this format works */}
        <SectionLabel>How it works</SectionLabel>
        <div style={{ ...briefCard, padding: '4px 18px' }}>
          {howItWorks(quest.format).map((line, i, arr) => (
            <div key={line} className="flex items-start gap-3" style={{ padding: '13px 0', borderBottom: i < arr.length - 1 ? '1px solid var(--card-border)' : 'none' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: 'var(--accent-primary-deep)', width: 16, flexShrink: 0 }}>{i + 1}</span>
              <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{line}</p>
            </div>
          ))}
        </div>

        {/* Mic guidance */}
        <div className="flex items-center gap-2 mt-5" style={{ color: 'var(--text-muted)' }}>
          <Volume2 style={{ width: 15, height: 15 }} strokeWidth={2} />
          <p style={{ fontSize: 12, fontWeight: 500 }}>Find a quiet spot. Hold the phone a hand's width away.</p>
        </div>
      </div>

      {/* Start */}
      <div className="px-6 pb-10" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, var(--background) 68%, transparent)', paddingTop: 20 }}>
        <motion.button whileTap={{ scale: 0.97 }} onClick={onStart} style={primaryCta}>
          <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-on-accent)' }}>
            {quest.format === 'room' ? 'Everyone ready — start take' : 'Start recording'}
          </span>
          <ChevronRight style={{ width: 20, height: 20, color: 'var(--text-on-accent)' }} />
        </motion.button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   BEAT 2 — Capture (dim studio). Bottom-center control, sticky one-liner.
   ═══════════════════════════════════════════════════════════════════ */

function Capture({ quest, onDone, onBack }: { quest: Quest; onDone: (clips: Clip[]) => void; onBack: () => void }) {
  if (quest.format === 'room') return <RoomCapture quest={quest} onDone={onDone} onBack={onBack} />;
  return <StepCapture quest={quest} onDone={onDone} onBack={onBack} />;
}

/* ── Step-based capture: LINES · SCENARIO · INTERVIEW ─────────────── */

type StepState = 'ready' | 'listening' | 'yourturn' | 'recording' | 'kept';

function StepCapture({ quest, onDone, onBack }: { quest: Quest; onDone: (clips: Clip[]) => void; onBack: () => void }) {
  const dev = useDevContext();
  const steps = buildSteps(quest);
  const [idx, setIdx] = useState(0);
  const isInterview = quest.format === 'interview';
  const [state, setState] = useState<StepState>(isInterview ? 'listening' : 'ready');
  const [time, setTime] = useState(0);
  const [clips, setClips] = useState<Clip[]>([]);
  const [noise, setNoise] = useState(false);

  const step = steps[idx];
  const total = steps.length;

  /* Recording timer */
  useEffect(() => {
    if (state !== 'recording') return;
    const t = setInterval(() => setTime((p) => p + 1), 1000);
    return () => clearInterval(t);
  }, [state]);

  /* Interview: simulate the pre-recorded stem playing, then "your turn". */
  useEffect(() => {
    if (state !== 'listening') return;
    const t = setTimeout(() => setState('yourturn'), 2200);
    return () => clearTimeout(t);
  }, [state, idx]);

  const startRec = () => {
    setState('recording'); setTime(0);
    if (dev.forceNoisePause) setTimeout(() => setNoise(true), 2000);
  };
  const stopRec = () => setState('kept');

  const keep = () => {
    const next = [...clips, { label: step.clipLabel, seconds: time || 3 }];
    setClips(next);
    if (idx < total - 1) {
      setIdx(idx + 1); setTime(0);
      setState(isInterview ? 'listening' : 'ready');
    } else {
      onDone(next);
    }
  };
  const retake = () => { setState(isInterview ? 'yourturn' : 'ready'); setTime(0); };

  const stickyLine =
    isInterview ? `${step.context} · Q ${idx + 1} of ${total} · You`
    : quest.format === 'scenario' ? `${quest.title} · Turn ${idx + 1} of ${total}`
    : `${quest.title} · Line ${idx + 1} of ${total}`;

  return (
    <StudioShell sticky={stickyLine} progress={(idx + (state === 'kept' ? 1 : 0)) / total} onBack={onBack}>
      <div className="flex-1 flex flex-col items-center justify-center px-7 text-center">
        {/* Interview: the other voice, quiet */}
        {isInterview && (
          <div style={{ marginBottom: 28, width: '100%' }}>
            <div className="flex items-center justify-center gap-2 mb-3">
              <div style={{
                width: 30, height: 30, borderRadius: 999,
                background: state === 'listening' ? 'rgba(var(--accent-glow-rgb),0.22)' : 'rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {state === 'listening'
                  ? <Volume2 style={{ width: 15, height: 15, color: 'var(--accent-primary-light)' }} strokeWidth={2.2} />
                  : <Play style={{ width: 13, height: 13, color: 'rgba(255,255,255,0.4)' }} />}
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
                {step.speaker} {state === 'listening' ? '· speaking' : ''}
              </span>
            </div>
            <p style={{ fontSize: 15, fontWeight: 500, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, fontStyle: 'italic' }}>
              {step.stem}
            </p>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={idx + state}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.24 }}
            className="w-full"
          >
            {isInterview && (
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-primary-light)', marginBottom: 12 }}>
                {state === 'listening' ? 'Listen…' : 'Your answer'}
              </p>
            )}
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 29, fontWeight: 600, color: 'var(--text-on-navy)', lineHeight: 1.45, letterSpacing: '-0.01em' }}>
              {step.prompt}
            </p>
            {step.hint && (
              <p style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.4)', marginTop: 14, lineHeight: 1.5 }}>
                {step.hint}
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Waveform only while sound happens */}
        <div style={{ height: 84, width: '100%', marginTop: 30, display: 'flex', alignItems: 'center' }}>
          {state === 'recording' && <VoiceVisualizer active height={84} />}
        </div>
      </div>

      {/* Bottom-center control */}
      <ControlDock>
        {state === 'listening' && (
          <p style={dockHint}>Playing the prompt…</p>
        )}
        {(state === 'ready' || state === 'yourturn') && (
          <RecordButton onPress={startRec} />
        )}
        {state === 'recording' && (
          <div className="flex flex-col items-center">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 26, fontWeight: 700, color: 'var(--text-on-navy)', marginBottom: 14 }}>{fmt(time)}</div>
            <StopButton onPress={stopRec} />
          </div>
        )}
        {state === 'kept' && (
          <KeepRetake time={time} onKeep={keep} onRetake={retake} last={idx === total - 1} />
        )}
      </ControlDock>

      {noise && (
        <AcousticNoisePause
          onClose={() => { setNoise(false); setState(isInterview ? 'yourturn' : 'ready'); setTime(0); }}
          onResume={() => setNoise(false)}
        />
      )}
    </StudioShell>
  );
}

/* ── ROOM capture: one continuous take, one control, scrolling score ── */

function RoomCapture({ quest, onDone, onBack }: { quest: Quest; onDone: (clips: Clip[]) => void; onBack: () => void }) {
  const script = ROOM_CONTENT[quest.id];
  const [recording, setRecording] = useState(false);
  const [time, setTime] = useState(0);
  const [cue, setCue] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!recording) return;
    const t = setInterval(() => setTime((p) => p + 1), 1000);
    return () => clearInterval(t);
  }, [recording]);

  /* Advance the score cue every few seconds while rolling (mocked pacing). */
  useEffect(() => {
    if (!recording || !script) return;
    if (cue >= script.score.length - 1) return;
    const t = setTimeout(() => setCue((c) => Math.min(c + 1, script.score.length - 1)), 3400);
    return () => clearTimeout(t);
  }, [recording, cue, script]);

  useEffect(() => {
    scrollRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [cue]);

  if (!script) return null;

  const stop = () => onDone([{ label: 'Full room take', seconds: time || 30 }]);

  return (
    <StudioShell sticky={`${quest.title} · Room take · ${recording ? 'Rec' : 'Ready'}`} progress={recording ? cue / (script.score.length - 1) : 0} onBack={onBack} recDot={recording}>
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-7 pt-4 pb-6">
        {script.score.map((c, i) => {
          const active = i === cue && recording;
          const past = i < cue && recording;
          return (
            <div key={i} data-active={active} style={{ padding: '11px 0', opacity: active ? 1 : past ? 0.28 : 0.5 }}>
              <span style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                color: active ? 'var(--accent-primary-light)' : 'rgba(255,255,255,0.35)',
              }}>
                {active ? `Now: ${c.who}` : c.who}
              </span>
              <p style={{
                fontSize: active ? 22 : 15, fontWeight: active ? 600 : 500,
                color: active ? 'var(--text-on-navy)' : 'rgba(255,255,255,0.5)',
                lineHeight: 1.5, marginTop: 3,
              }}>
                {c.line}
              </p>
            </div>
          );
        })}
      </div>

      <ControlDock>
        {!recording ? (
          <>
            <p style={dockHint}>One take — don't stop between lines. Phone stays put.</p>
            <RecordButton onPress={() => setRecording(true)} />
          </>
        ) : (
          <div className="flex flex-col items-center">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 26, fontWeight: 700, color: 'var(--text-on-navy)', marginBottom: 14 }}>{fmt(time)}</div>
            <StopButton onPress={stop} />
            <p style={{ ...dockHint, marginTop: 12 }}>End take when the scene is done</p>
          </div>
        )}
      </ControlDock>
    </StudioShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   BEAT 3 — Review. Session list (LINES/SCEN/INT) or whole-tape (ROOM).
   ═══════════════════════════════════════════════════════════════════ */

function Review({ quest, clips, onSubmit, onRetakeAll }: { quest: Quest; clips: Clip[]; onSubmit: () => void; onRetakeAll: () => void }) {
  const isRoom = quest.format === 'room';
  const [playing, setPlaying] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--background)', fontFamily: 'var(--font-sans)' }}>
      <div className="px-6 pt-14 pb-4">
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: 'var(--accent-primary-deep)', textTransform: 'uppercase' }}>
          Review
        </span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 25, fontWeight: 800, color: 'var(--text-primary)', marginTop: 6, letterSpacing: '-0.01em' }}>
          {isRoom ? 'Listen back to your take' : `${clips.length} clips ready`}
        </h1>
        <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)', marginTop: 4 }}>
          {isRoom ? 'Play the whole take. Keep it, or record the scene again.' : 'Play any clip. Submit when they all sound right.'}
        </p>
      </div>

      <div className="flex-1 px-6 pb-40 overflow-y-auto">
        {clips.map((c, i) => (
          <div key={i} className="flex items-center gap-3" style={{ ...briefCard, marginBottom: 10, padding: '14px 16px' }}>
            <button
              onClick={() => setPlaying(playing === i ? null : i)}
              style={{
                width: 42, height: 42, borderRadius: 999, flexShrink: 0, border: 'none', cursor: 'pointer',
                background: 'var(--accent-50)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {playing === i
                ? <Pause style={{ width: 17, height: 17, color: 'var(--accent-primary-deep)' }} />
                : <Play style={{ width: 17, height: 17, color: 'var(--accent-primary-deep)' }} />}
            </button>
            <div className="flex-1 min-w-0">
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{c.label}</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500, color: 'var(--text-muted)' }}>{fmt(c.seconds)}</p>
            </div>
            <Check style={{ width: 18, height: 18, color: 'var(--success-500)' }} strokeWidth={2.5} />
          </div>
        ))}
      </div>

      <div className="px-6 pb-10" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, var(--background) 68%, transparent)', paddingTop: 20 }}>
        <motion.button whileTap={{ scale: 0.97 }} onClick={onSubmit} style={primaryCta}>
          <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-on-accent)' }}>Submit for review</span>
        </motion.button>
        <button onClick={onRetakeAll} style={{ ...ghostBtn, marginTop: 6 }}>
          <RotateCcw style={{ width: 15, height: 15 }} strokeWidth={2} />
          {isRoom ? 'Record the take again' : 'Record all again'}
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Pending — honest: expected ₹, NOT an instant credit.
   ═══════════════════════════════════════════════════════════════════ */

function Pending({ quest, onHome }: { quest: Quest; onHome: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 text-center" style={{ background: 'var(--background)', fontFamily: 'var(--font-sans)' }}>
      <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
        <div style={{ width: 76, height: 76, borderRadius: 999, background: 'var(--status-success-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <Check style={{ width: 38, height: 38, color: 'var(--status-success-text)' }} strokeWidth={2.5} />
        </div>
      </motion.div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 10, letterSpacing: '-0.01em' }}>
        Sent for review
      </h1>
      <p style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 22, maxWidth: 300 }}>
        A reviewer will check your recording. If it's approved, this lands in your wallet.
      </p>
      <div style={{ ...briefCard, padding: '16px 22px', marginBottom: 36 }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 4 }}>
          Expected on approval
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 30, fontWeight: 700, color: 'var(--accent-primary-deep)' }}>
          ₹{quest.cashPayout}
        </p>
      </div>
      <motion.button whileTap={{ scale: 0.97 }} onClick={onHome} style={{ ...primaryCta, maxWidth: 320 }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-on-accent)' }}>Back to home</span>
      </motion.button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Guard screens
   ═══════════════════════════════════════════════════════════════════ */

function NotFound({ onBack }: { onBack: () => void }) {
  return (
    <GuardScreen
      Icon={AlertCircle}
      title="Quest not found"
      body="This quest link is broken or the quest is no longer available."
      cta="Browse quests"
      onBack={onBack}
    />
  );
}

function WaitingForPrompts({ quest, onBack }: { quest: Quest; onBack: () => void }) {
  return (
    <GuardScreen
      Icon={Clock}
      title="Waiting for prompts"
      body={`"${quest.title}" is an interview quest, but its question track is still being prepared. It'll open for recording soon.`}
      cta="Browse other quests"
      onBack={onBack}
    />
  );
}

function GuardScreen({ Icon, title, body, cta, onBack }: {
  Icon: typeof AlertCircle; title: string; body: string; cta: string; onBack: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 text-center" style={{ background: 'var(--background)', fontFamily: 'var(--font-sans)' }}>
      <div style={{ width: 64, height: 64, borderRadius: 999, background: 'var(--surface-sunken)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 22 }}>
        <Icon style={{ width: 28, height: 28, color: 'var(--text-muted)' }} strokeWidth={2} />
      </div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 23, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 10 }}>{title}</h1>
      <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 30, maxWidth: 300 }}>{body}</p>
      <motion.button whileTap={{ scale: 0.97 }} onClick={onBack} style={{ ...primaryCta, maxWidth: 300 }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-on-accent)' }}>{cta}</span>
      </motion.button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Studio chrome — dim shell, sticky one-liner, bottom control dock
   ═══════════════════════════════════════════════════════════════════ */

function StudioShell({ children, sticky, progress, onBack, recDot }: {
  children: React.ReactNode; sticky: string; progress: number; onBack: () => void; recDot?: boolean;
}) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--navy)', fontFamily: 'var(--font-sans)' }}>
      {/* Sticky one-liner */}
      <div className="px-6 pt-14 pb-3" style={{ flexShrink: 0 }}>
        <div className="flex items-center gap-3 mb-3">
          <button onClick={onBack} style={{ ...backBtn, color: 'rgba(255,255,255,0.5)', marginBottom: 0 }}>
            <ChevronLeft style={{ width: 20, height: 20 }} strokeWidth={2.5} />
          </button>
          {recDot && (
            <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--accent-primary)', boxShadow: '0 0 0 4px rgba(var(--accent-glow-rgb),0.25)' }} />
          )}
          <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.01em' }}>{sticky}</span>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 999, height: 3 }}>
          <motion.div
            animate={{ width: `${Math.max(0, Math.min(1, progress)) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ background: 'var(--accent-primary)', borderRadius: 999, height: 3 }}
          />
        </div>
      </div>
      {children}
    </div>
  );
}

/** Bottom-center dock, ≥72px control, safely above the home indicator. */
function ControlDock({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ flexShrink: 0, padding: '18px 24px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {children}
    </div>
  );
}

function RecordButton({ onPress }: { onPress: () => void }) {
  return (
    <motion.button
      whileTap={{ scale: 0.93 }} onClick={onPress}
      style={{
        width: 84, height: 84, borderRadius: 999, border: 'none', cursor: 'pointer',
        background: 'linear-gradient(145deg, var(--accent-primary-light), var(--accent-primary-deep))',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0px 10px 30px rgba(var(--accent-glow-rgb),0.45), inset 0px 1px 0px rgba(255,255,255,0.2)',
      }}
    >
      <Mic style={{ width: 34, height: 34, color: 'var(--text-on-accent)' }} />
    </motion.button>
  );
}

function StopButton({ onPress }: { onPress: () => void }) {
  return (
    <motion.button
      animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 1.8 }}
      whileTap={{ scale: 0.93 }} onClick={onPress}
      style={{
        width: 84, height: 84, borderRadius: 999, border: 'none', cursor: 'pointer',
        background: 'var(--accent-primary-deep)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0px 10px 32px rgba(var(--accent-deep-rgb),0.55), inset 0px 1px 0px rgba(255,255,255,0.15)',
      }}
    >
      <Square style={{ width: 30, height: 30, color: 'var(--text-on-accent)', fill: 'var(--text-on-accent)' }} />
    </motion.button>
  );
}

function KeepRetake({ time, onKeep, onRetake, last }: { time: number; onKeep: () => void; onRetake: () => void; last: boolean }) {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex items-center gap-2 mb-4">
        <Check style={{ width: 16, height: 16, color: 'var(--success-500)' }} strokeWidth={2.5} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 600, color: 'var(--text-on-navy)' }}>{fmt(time)} recorded</span>
      </div>
      <motion.button whileTap={{ scale: 0.97 }} onClick={onKeep} style={{ ...primaryCta, maxWidth: 320 }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-on-accent)' }}>{last ? 'Keep & review all' : 'Keep & next'}</span>
      </motion.button>
      <button onClick={onRetake} style={{ ...ghostBtn, color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>
        <RotateCcw style={{ width: 15, height: 15 }} strokeWidth={2} />
        Retake this one
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Small presentational helpers
   ═══════════════════════════════════════════════════════════════════ */

function MetaChip({ Icon, text, accent }: { Icon: typeof Coins; text: string; accent?: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <Icon style={{ width: 15, height: 15, color: accent ? 'var(--accent-primary-deep)' : 'var(--text-muted)' }} strokeWidth={2} />
      <span style={{
        fontSize: 14, fontWeight: 700,
        fontFamily: accent ? 'var(--font-mono)' : 'var(--font-sans)',
        color: accent ? 'var(--accent-primary-deep)' : 'var(--text-secondary)',
      }}>
        {text}
      </span>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 10, marginTop: 8 }}>
      {children}
    </p>
  );
}

const backBtn: React.CSSProperties = {
  display: 'flex', alignItems: 'center', background: 'none', border: 'none',
  cursor: 'pointer', color: 'var(--accent-primary-deep)', padding: '4px 0', marginBottom: 8,
};

const briefCard: React.CSSProperties = {
  background: 'var(--surface)', borderRadius: 16, border: '1px solid var(--card-border)',
  padding: '18px 20px', marginBottom: 20,
  boxShadow: '0 1px 2px rgba(var(--accent-deep-rgb),0.04)',
};

const primaryCta: React.CSSProperties = {
  width: '100%', height: 56, borderRadius: 999, border: 'none', cursor: 'pointer',
  background: 'var(--accent-primary-deep)',
  boxShadow: '0px 8px 24px rgba(var(--accent-glow-rgb),0.32)',
  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
};

const ghostBtn: React.CSSProperties = {
  width: '100%', background: 'none', border: 'none', cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
  fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', padding: '10px 0',
};

const dockHint: React.CSSProperties = {
  fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.45)', marginBottom: 14, textAlign: 'center', lineHeight: 1.5,
};

/* ═══════════════════════════════════════════════════════════════════
   Content adapters — turn quest data into capture steps
   ═══════════════════════════════════════════════════════════════════ */

interface Step {
  prompt: string;       // the big line you read/answer
  hint?: string;        // quiet helper under the prompt
  clipLabel: string;    // label in the review list
  stem?: string;        // interview: the other voice line
  speaker?: string;     // interview: who's asking
  context?: string;     // interview: sticky context word
}

function buildSteps(quest: Quest): Step[] {
  if (quest.format === 'lines') {
    const lines = LINES_CONTENT[quest.id] ?? [];
    return lines.map((text, i) => ({ prompt: text, clipLabel: `Line ${i + 1}` }));
  }
  if (quest.format === 'scenario') {
    const script = SCENARIO_CONTENT[quest.id];
    if (!script) return [];
    const you = script.turns.filter((t) => t.role === 'you');
    return you.map((t, i) => ({ prompt: t.text, clipLabel: `Turn ${i + 1}` }));
  }
  if (quest.format === 'interview') {
    const script = INTERVIEW_CONTENT[quest.id];
    if (!script) return [];
    const ctx = script.setup.split(',')[0].split('.')[0].slice(0, 22);
    return script.questions.map((q, i) => ({
      prompt: q.youHint,
      clipLabel: `Answer ${i + 1}`,
      stem: q.stem,
      speaker: script.interviewer,
      context: ctx,
    }));
  }
  return [];
}

function captureCount(quest: Quest): number {
  if (quest.format === 'lines') return (LINES_CONTENT[quest.id] ?? []).length;
  if (quest.format === 'scenario') return quest.turns ?? 0;
  if (quest.format === 'interview') return quest.questions ?? 0;
  return quest.speakers ?? 0;
}

function briefScene(quest: Quest): string {
  if (quest.format === 'scenario') return SCENARIO_CONTENT[quest.id]?.setup ?? quest.excerpt;
  if (quest.format === 'interview') return INTERVIEW_CONTENT[quest.id]?.setup ?? quest.excerpt;
  if (quest.format === 'room') return ROOM_CONTENT[quest.id]?.scene ?? quest.excerpt;
  return quest.excerpt;
}

function howItWorks(format: QuestFormat): string[] {
  switch (format) {
    case 'lines':
      return [
        'A short line appears — read it once, naturally.',
        'Tap record, say the line, tap stop.',
        'Keep it or retake, then move to the next line.',
      ];
    case 'scenario':
      return [
        'You play one role across the whole scene.',
        'Each turn shows your line — read only your side.',
        'Record turn by turn; keep or retake each one.',
      ];
    case 'interview':
      return [
        "You'll hear the interviewer ask a question.",
        'When it\'s your turn, record your answer naturally.',
        'Play back, keep or retake, then the next question.',
      ];
    case 'room':
      return [
        'Gather everyone around this one phone and leave it put.',
        'Follow the scrolling score — one continuous take.',
        "Don't stop between lines; end the take when the scene's done.",
      ];
    default:
      return [];
  }
}

function fmt(s: number): string {
  return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
}
