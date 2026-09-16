import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  Play, Pause, Check, RotateCcw, ChevronLeft, ChevronRight,
  Clock, Volume2, AlertCircle,
} from 'lucide-react';
import {
  ScriptDisplay, LevelMeter, RecordTrigger, ProgressPill, Amount,
  AmountBreakdown, Button, IconButton } from './ui/Primitives';
import { getQuest, formatMeta, Quest, QuestFormat, FIRST_JOB_ID } from '../lib/quests';
import {
  LINES_CONTENT, SCENARIO_CONTENT, INTERVIEW_CONTENT, ROOM_CONTENT,
  CALIBRATION_LINES, CALIBRATION_POSTURE,
} from '../lib/questContent';
import { AcousticNoisePause } from './AcousticNoisePause';
import { useDevContext } from '../lib/DevContext';
import { ConsentSheet } from './ui/ConsentSheet';
import { hasConsented, advanceStage, getProfile, isMicPrimed, primeMic } from '../lib/session';
import { useRealMicLevel, MicLevelState } from '../lib/useRealMicLevel';
import { durations } from '../lib/motion';

/* ═══════════════════════════════════════════════════════════════════
   The Studio. Dark is used HERE and ONLY here — it means "you're
   recording". Brief and Review are the light tab-bar world; Capture is
   --surface-studio. Consent is provably taken before the mic is ever used.
   ═══════════════════════════════════════════════════════════════════ */

const DIM = 'rgba(var(--studio-ink-rgb),0.58)';
const FAINT = 'rgba(var(--studio-ink-rgb),0.34)';

export function Recording() {
  const navigate = useNavigate();
  const { questId } = useParams();
  const quest = getQuest(questId);
  const [consentPassed, setConsentPassed] = useState(hasConsented());
  const [micPrimed, setMicPrimed] = useState(isMicPrimed());

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

  if (!quest) return <NotFound onBack={() => navigate('/contributor/quests')} />;

  if (quest.available === false || (quest.format === 'interview' && !quest.track)) {
    return <WaitingForPrompts quest={quest} onBack={() => navigate('/contributor/quests')} />;
  }

  /* Consent gate — the mic is unreachable until this resolves. */
  if (!consentPassed) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--surface-ground)' }}>
        <ConsentSheet onComplete={() => setConsentPassed(true)} onCancel={() => navigate(-1)} />
      </div>
    );
  }

  /* In-context mic prime — asked once, right after consent, before capture. */
  if (!micPrimed) {
    return <MicPermissionPrime quest={quest} onAllow={() => { primeMic(); setMicPrimed(true); }} onBack={() => navigate(-1)} />;
  }

  return <Studio quest={quest} />;
}

/* ═══════════════════════════════════════════════════════════════════
   MicPermissionPrime — in-context, plain-language, right before capture
   ═══════════════════════════════════════════════════════════════════ */

function MicPermissionPrime({ quest, onAllow, onBack }: { quest: Quest; onAllow: () => void; onBack: () => void }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--surface-ground)', fontFamily: 'var(--font-ui)' }}>
      <div className="px-6 pt-14">
        <IconButton label="Go back" onClick={onBack} variant="plain" style={{ marginBottom: 'var(--space-4)', marginLeft: 'calc(var(--space-5) * -1)' }}>
          <ChevronLeft size={22} strokeWidth={2.5} aria-hidden />
        </IconButton>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div style={{ width: 84, height: 84, borderRadius: 'var(--r-full)', background: 'var(--action-primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-10)'}}>
          <Volume2 style={{ width: 36, height: 36, color: 'var(--action-primary)' }} strokeWidth={2} />
        </div>
        <h1 style={{ fontSize: 'var(--fs-title)', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 var(--space-5)', letterSpacing: '-0.015em' }}>
          Allow microphone access
        </h1>
        <p style={{ fontSize: 'var(--fs-body)', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 300, margin: '0 0 6px' }}>
          "{quest.title}" needs your microphone to record. It's only on while you're actively recording, and you can stop any time.
        </p>
      </div>
      <div className="px-6 pb-10">
        <Button full size="lg" onClick={onAllow}>Allow microphone</Button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Studio flow — Brief → Capture → Review → Pending
   ═══════════════════════════════════════════════════════════════════ */

type Beat = 'brief' | 'capture' | 'review' | 'pending';
interface Clip { label: string; seconds: number; }

function Studio({ quest }: { quest: Quest }) {
  const navigate = useNavigate();
  const [beat, setBeat] = useState<Beat>('brief');
  const [clips, setClips] = useState<Clip[]>([]);

  const submit = () => {
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
          <Capture quest={quest} onDone={(r) => { setClips(r); setBeat('review'); }} onBack={() => setBeat('brief')} />
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
  initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 },
  transition: { duration: durations.base },
};

/* ═══════════════════════════════════════════════════════════════════
   BEAT 1 — Brief (light). Full pay breakdown + audio playback affordance.
   ═══════════════════════════════════════════════════════════════════ */

function Brief({ quest, onStart, onBack }: { quest: Quest; onStart: () => void; onBack: () => void }) {
  const meta = formatMeta[quest.format];
  const count = captureCount(quest);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--surface-ground)', fontFamily: 'var(--font-ui)' }}>
      <div className="px-6 pt-14 pb-4">
        <IconButton label="Go back" onClick={onBack} variant="plain" style={{ marginBottom: 'var(--space-4)', marginLeft: 'calc(var(--space-5) * -1)' }}>
          <ChevronLeft size={22} strokeWidth={2.5} aria-hidden />
        </IconButton>
        <span style={{ fontSize: 'var(--fs-caption)', fontWeight: 800, letterSpacing: '0.12em', color: 'var(--action-primary)', textTransform: 'uppercase' }}>
          {meta.short} · {quest.client}
        </span>
        <h1 style={{ fontSize: 'var(--fs-display)', fontWeight: 700, color: 'var(--text-primary)', marginTop: 'var(--space-3)', letterSpacing: '-0.015em' }}>
          {quest.title}
        </h1>
      </div>

      <div className="flex-1 px-6 pb-40 overflow-y-auto">
        {/* Pay breakdown — honest, itemised */}
        <SectionLabel>What you'll earn</SectionLabel>
        <div style={{ marginBottom: 'var(--space-9)'}}>
          <AmountBreakdown basePay={quest.basePay} coverageMult={quest.coverageMult} bonus={quest.bonus} />
        </div>

        <div className="flex items-center gap-4 mb-6" style={{ flexWrap: 'wrap' }}>
          <MetaChip Icon={Clock} text={quest.duration} />
          <MetaChip
            Icon={Volume2}
            text={
              quest.format === 'room' ? `${quest.speakers} people`
              : quest.format === 'interview' ? `${quest.questions} questions`
              : `${count} ${quest.format === 'lines' ? 'lines' : 'turns'}`
            }
          />
        </div>

        <SectionLabel>{quest.format === 'lines' ? "What you'll read" : 'The scene'}</SectionLabel>
        <div style={briefCard}>
          <p style={{ fontSize: 'var(--fs-body)', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.7, margin: '0'}}>
            {/* For LINES, briefScene() falls through to quest.excerpt — which
                then rendered a SECOND time in the script preview below, so the
                same two phrases appeared twice on the Brief. Use the job
                description as the intro for LINES instead. */}
            {quest.format === 'lines' ? quest.description : briefScene(quest)}
          </p>
          {/* Native-script preview + audio playback affordance */}
          <div style={{ marginTop: 'var(--space-7)', paddingTop: 'var(--space-7)', borderTop: '1px solid var(--divider)' }}>
            <p className="font-script" style={{ fontSize: 'var(--fs-subhead)', fontWeight: 500, color: 'var(--text-primary)', lineHeight: 'var(--lh-deva)', margin: '0 0 10px' }}>
              {quest.excerpt}
            </p>
            <PlaybackButton label="Hear a sample read" />
          </div>
        </div>

        <SectionLabel>How it works</SectionLabel>
        <div style={{ ...briefCard, padding: '4px 18px' }}>
          {howItWorks(quest.format).map((line, i, arr) => (
            <div key={line} className="flex items-start gap-3" style={{ padding: 'var(--space-6) 0', borderBottom: i < arr.length - 1 ? '1px solid var(--divider)' : 'none' }}>
              <span className="tabular" style={{ fontSize: 'var(--fs-secondary)', fontWeight: 700, color: 'var(--action-primary)', width: 16, flexShrink: 0 }}>{i + 1}</span>
              <p style={{ fontSize: 'var(--fs-body)', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0'}}>{line}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-5" style={{ color: 'var(--text-muted)' }}>
          <Volume2 style={{ width: 15, height: 15 }} strokeWidth={2} />
          <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, margin: '0'}}>Find a quiet spot. Hold the phone a hand's width away.</p>
        </div>
      </div>

      <div className="px-6 pb-10" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, var(--surface-ground) 68%, transparent)', paddingTop: 'var(--space-9)'}}>
        <Button full size="lg" icon={<ChevronRight size={20} />} onClick={onStart}>
          {quest.format === 'room' ? 'Everyone ready — start take' : 'Start recording'}
        </Button>
      </div>
    </div>
  );
}

function PlaybackButton({ label }: { label: string }) {
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setPlaying(false), 2400);
    return () => clearTimeout(t);
  }, [playing]);
  return (
    <button
      onClick={() => setPlaying((p) => !p)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 'var(--space-4)', height: 40, padding: '0 var(--space-7) 0 var(--space-6)',
        borderRadius: 'var(--r-full)', border: '1px solid var(--border-subtle)',
        background: 'var(--surface-sunken)', color: 'var(--text-secondary)', cursor: 'pointer',
        fontSize: 'var(--fs-secondary)', fontWeight: 700,
      }}
    >
      {playing ? <Pause size={16} style={{ color: 'var(--action-primary)' }} /> : <Play size={16} style={{ color: 'var(--action-primary)' }} />}
      {playing ? 'Playing…' : label}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   BEAT 2 — Capture (dark studio). One glowing trigger, real-level meter.
   ═══════════════════════════════════════════════════════════════════ */

function Capture({ quest, onDone, onBack }: { quest: Quest; onDone: (clips: Clip[]) => void; onBack: () => void }) {
  if (quest.format === 'room') return <RoomCapture quest={quest} onDone={onDone} onBack={onBack} />;
  return <StepCapture quest={quest} onDone={onDone} onBack={onBack} />;
}

/** Real mic level via AnalyserNode (P0-1): RMS, fast attack / slow release.
 *  Zero in silence, zero when idle, zero under reduced motion (static meter).
 *  Permission denial surfaces via .denied - the meter never fakes a signal. */
function useMicLevel(active: boolean) {
  const [mic, setMic] = useState<MicLevelState>({ level: 0, denied: false });
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!active || reduce) { setMic({ level: 0, denied: false }); return; }
    return useRealMicLevel(true, setMic);
  }, [active, reduce]);
  return mic.level;
}

/** True when the browser blocked mic access while recording (guidance state). */
function useMicDenied() {
  // lightweight companion: derive from last mic state via a module-level ref
  return micDeniedRef.current;
}
let micDeniedRef = { current: false };

type StepState = 'ready' | 'listening' | 'yourturn' | 'recording' | 'kept';

function StepCapture({ quest, onDone, onBack }: { quest: Quest; onDone: (clips: Clip[]) => void; onBack: () => void }) {
  const dev = useDevContext();
  const reduce = useReducedMotion();
  const steps = buildSteps(quest);
  const [idx, setIdx] = useState(0);
  const isInterview = quest.format === 'interview';
  const [state, setState] = useState<StepState>(isInterview ? 'listening' : 'ready');
  const [time, setTime] = useState(0);
  const [clips, setClips] = useState<Clip[]>([]);
  const [noise, setNoise] = useState(false);

  /* First-ever LINES capture folds a 2-phrase mic check into the take —
     no standalone calibration screen (08-PHASE-1 §1.6). The contributor
     watches the meter move on real words before the real take starts, so
     they trust the instrument before it matters. Only the first job in the
     newcomer chain carries calibration lines, and only at stage 'day0'. */
  const calibLines = CALIBRATION_LINES[quest.id];
  const needsCalibration = !!calibLines && quest.id === FIRST_JOB_ID && getProfile()?.stage === 'day0';
  const [calibrated, setCalibrated] = useState(!needsCalibration);
  const [calibIdx, setCalibIdx] = useState(0);
  const [calibRec, setCalibRec] = useState(false);

  const level = useMicLevel(state === 'recording' || calibRec);

  const step = steps[idx];
  const total = steps.length;

  useEffect(() => {
    if (state !== 'recording') return;
    const t = setInterval(() => setTime((p) => p + 1), 1000);
    return () => clearInterval(t);
  }, [state]);

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
    if (idx < total - 1) { setIdx(idx + 1); setTime(0); setState(isInterview ? 'listening' : 'ready'); }
    else onDone(next);
  };
  const retake = () => { setState(isInterview ? 'yourturn' : 'ready'); setTime(0); };

  const sticky =
    isInterview ? `${step.context} · Q ${idx + 1} of ${total}`
    : quest.format === 'scenario' ? `${quest.title} · Turn ${idx + 1} of ${total}`
    : `${quest.title} · Line ${idx + 1} of ${total}`;

  /* ── Calibration beat (first job only) ──
     Rendered as part of the Studio, not a separate screen: the contributor
     is already in the dark ground with the trigger under their thumb, so
     there is nothing to re-orient to. Posture cue first, then two short
     phrases with the real level meter live. */
  if (!calibrated && calibLines) {
    const phrase = calibLines[calibIdx];
    const isLast = calibIdx === calibLines.length - 1;
    const advance = () => {
      setCalibRec(false);
      if (isLast) setCalibrated(true);
      else setCalibIdx(calibIdx + 1);
    };

    return (
      <StudioShell
        sticky={`Mic check · ${calibIdx + 1} of ${calibLines.length}`}
        done={calibIdx}
        total={calibLines.length}
        onBack={onBack}
        recording={calibRec}
      >
        <div className="flex-1 flex flex-col items-center justify-center px-7 text-center">
          <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: DIM, marginBottom: 'var(--space-11)', lineHeight: 1.5 }}>
            {CALIBRATION_POSTURE}
          </p>
          <ScriptDisplay text={phrase} size={26} />
          <div style={{ height: 40, marginTop: 'var(--space-11)', display: 'flex', alignItems: 'center' }}>
            {calibRec && <LevelMeter level={level} bars={7} />}
          </div>
        </div>

        <ControlDock>
          {!calibRec && <p style={dockHint}>Say this out loud so we can check your mic</p>}
          {!calibRec
            ? <RecordTrigger recording={false} onPress={() => setCalibRec(true)} reducedMotion={!!reduce} />
            : <RecordTrigger recording onPress={advance} reducedMotion={!!reduce} />}
        </ControlDock>
      </StudioShell>
    );
  }

  return (
    <StudioShell sticky={sticky} done={idx + (state === 'kept' ? 1 : 0)} total={total} onBack={onBack} recording={state === 'recording'}>
      <div className="flex-1 flex flex-col items-center justify-center px-7 text-center">
        {isInterview && (
          <div style={{ marginBottom: 'var(--space-11)', width: '100%' }}>
            <div className="flex items-center justify-center gap-2 mb-3">
              <div style={{
                width: 30, height: 30, borderRadius: 'var(--r-full)',
                background: state === 'listening' ? 'rgba(var(--terracotta-500-rgb),0.22)' : 'rgba(var(--studio-ink-rgb),0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {state === 'listening'
                  ? <Volume2 style={{ width: 15, height: 15, color: 'var(--t-terracotta-300)' }} strokeWidth={2.2} />
                  : <Play style={{ width: 13, height: 13, color: FAINT }} />}
              </div>
              <span style={{ fontSize: 'var(--fs-caption)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: FAINT }}>
                {step.speaker} {state === 'listening' ? '· speaking' : ''}
              </span>
            </div>
            <p className="font-script" style={{ fontSize: 'var(--fs-body)', fontWeight: 500, color: DIM, lineHeight: 'var(--lh-deva)' }}>
              {step.stem}
            </p>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={idx + state}
            initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: durations.base }}
            className="w-full"
          >
            {isInterview && (
              <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--t-terracotta-300)', marginBottom: 'var(--space-6)'}}>
                {state === 'listening' ? 'Listen…' : 'Your answer'}
              </p>
            )}
            <ScriptDisplay text={step.prompt} size={26} />
            {step.hint && (
              <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: FAINT, marginTop: 'var(--space-7)', lineHeight: 1.5 }}>{step.hint}</p>
            )}
          </motion.div>
        </AnimatePresence>

        <div style={{ height: 40, marginTop: 'var(--space-11)', display: 'flex', alignItems: 'center' }}>
          {state === 'recording' && <LevelMeter level={level} bars={7} />}
        </div>
      </div>

      <ControlDock>
        {state === 'listening' && <p style={dockHint}>Playing the prompt…</p>}
        {(state === 'ready' || state === 'yourturn') && (
          <RecordTrigger recording={false} onPress={startRec} reducedMotion={!!reduce} />
        )}
        {state === 'recording' && (
          <div className="flex flex-col items-center gap-3">
            <span className="tabular" style={{ fontSize: 'var(--fs-title)', fontWeight: 700, color: 'var(--text-on-studio)' }}>{fmt(time)}</span>
            <RecordTrigger recording onPress={stopRec} reducedMotion={!!reduce} />
          </div>
        )}
        {state === 'kept' && <KeepRetake time={time} onKeep={keep} onRetake={retake} last={idx === total - 1} />}
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

function RoomCapture({ quest, onDone, onBack }: { quest: Quest; onDone: (clips: Clip[]) => void; onBack: () => void }) {
  const reduce = useReducedMotion();
  const script = ROOM_CONTENT[quest.id];
  const [recording, setRecording] = useState(false);
  const [time, setTime] = useState(0);
  const [cue, setCue] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const level = useMicLevel(recording);

  useEffect(() => {
    if (!recording) return;
    const t = setInterval(() => setTime((p) => p + 1), 1000);
    return () => clearInterval(t);
  }, [recording]);

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
    <StudioShell sticky={`${quest.title} · Room take`} done={recording ? cue + 1 : 0} total={script.score.length} onBack={onBack} recording={recording}>
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-7 pt-4 pb-6">
        {script.score.map((c, i) => {
          const active = i === cue && recording;
          const past = i < cue && recording;
          return (
            <div key={i} data-active={active} style={{ padding: 'var(--space-5) 0', opacity: active ? 1 : past ? 0.3 : 0.5 }}>
              <span style={{
                fontSize: 'var(--fs-caption)', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase',
                color: active ? 'var(--t-terracotta-300)' : FAINT,
              }}>
                {active ? `Now: ${c.who}` : c.who}
              </span>
              {active
                ? <ScriptDisplay text={c.line} size={22} />
                : <p className="font-script" style={{ fontSize: 'var(--fs-body)', fontWeight: 500, color: DIM, lineHeight: 'var(--lh-deva)', marginTop: 'var(--space-1)'}}>{c.line}</p>}
            </div>
          );
        })}
      </div>

      <ControlDock>
        {!recording ? (
          <>
            <p style={dockHint}>One take — don't stop between lines. Phone stays put.</p>
            <RecordTrigger recording={false} onPress={() => setRecording(true)} reducedMotion={!!reduce} />
          </>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <span className="tabular" style={{ fontSize: 'var(--fs-title)', fontWeight: 700, color: 'var(--text-on-studio)' }}>{fmt(time)}</span>
            <LevelMeter level={level} bars={7} />
            <RecordTrigger recording onPress={stop} reducedMotion={!!reduce} />
            <p style={{ ...dockHint, marginTop: 'var(--space-2)', marginBottom: '0'}}>End take when the scene is done</p>
          </div>
        )}
      </ControlDock>
    </StudioShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   BEAT 3 — Review (light)
   ═══════════════════════════════════════════════════════════════════ */

function Review({ quest, clips, onSubmit, onRetakeAll }: { quest: Quest; clips: Clip[]; onSubmit: () => void; onRetakeAll: () => void }) {
  const isRoom = quest.format === 'room';
  const [playing, setPlaying] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--surface-ground)', fontFamily: 'var(--font-ui)' }}>
      <div className="px-6 pt-14 pb-4">
        <span style={{ fontSize: 'var(--fs-caption)', fontWeight: 800, letterSpacing: '0.12em', color: 'var(--action-primary)', textTransform: 'uppercase' }}>Review</span>
        <h1 style={{ fontSize: 'var(--fs-display)', fontWeight: 700, color: 'var(--text-primary)', marginTop: 'var(--space-3)', letterSpacing: '-0.015em' }}>
          {isRoom ? 'Listen back to your take' : `${clips.length} clips ready`}
        </h1>
        <p style={{ fontSize: 'var(--fs-body)', fontWeight: 500, color: 'var(--text-secondary)', marginTop: 'var(--space-2)'}}>
          {isRoom ? 'Play the whole take. Keep it, or record the scene again.' : 'Play any clip. Submit when they all sound right.'}
        </p>
      </div>

      <div className="flex-1 px-6 pb-40 overflow-y-auto">
        {clips.map((c, i) => (
          <div key={i} className="flex items-center gap-3" style={{ ...briefCard, marginBottom: 'var(--space-5)', padding: '14px 16px' }}>
            <button
              onClick={() => setPlaying(playing === i ? null : i)}
              style={{
                width: 44, height: 44, borderRadius: 'var(--r-full)', flexShrink: 0, border: 'none', cursor: 'pointer',
                background: 'var(--action-primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {playing === i
                ? <Pause style={{ width: 17, height: 17, color: 'var(--action-primary)' }} />
                : <Play style={{ width: 17, height: 17, color: 'var(--action-primary)' }} />}
            </button>
            <div className="flex-1 min-w-0">
              <p style={{ fontSize: 'var(--fs-body)', fontWeight: 600, color: 'var(--text-primary)', margin: '0'}}>{c.label}</p>
              <p className="tabular" style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', margin: '2px 0 0' }}>{fmt(c.seconds)}</p>
            </div>
            <Check style={{ width: 18, height: 18, color: 'var(--state-settled)' }} strokeWidth={2.5} />
          </div>
        ))}
      </div>

      <div className="px-6 pb-10" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, var(--surface-ground) 68%, transparent)', paddingTop: 'var(--space-9)'}}>
        <Button full size="lg" onClick={onSubmit}>Submit for review</Button>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-3)'}}>
          <Button variant="ghost" size="sm" icon={<RotateCcw size={15} />} onClick={onRetakeAll}>
            {isRoom ? 'Record the take again' : 'Record all again'}
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Pending — honest: expected on approval, NOT an instant credit
   ═══════════════════════════════════════════════════════════════════ */

function Pending({ quest, onHome }: { quest: Quest; onHome: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 text-center" style={{ background: 'var(--surface-ground)', fontFamily: 'var(--font-ui)' }}>
      <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
        <div style={{ width: 76, height: 76, borderRadius: 'var(--r-full)', background: 'var(--state-settled-container)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <Check style={{ width: 38, height: 38, color: 'var(--state-settled-text)' }} strokeWidth={2.5} />
        </div>
      </motion.div>
      <h1 style={{ fontSize: 'var(--fs-display)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-5)', letterSpacing: '-0.015em' }}>
        Sent for review
      </h1>
      <p style={{ fontSize: 'var(--fs-body)', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-10)', maxWidth: 300 }}>
        A reviewer checks your recording. If it's approved, this lands in your wallet — usually within a day.
      </p>
      <div style={{ ...briefCard, padding: 'var(--space-8) var(--space-10)', marginBottom: 'var(--space-12)', textAlign: 'center' }}>
        <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 'var(--space-3)'}}>
          Expected on approval
        </p>
        <Amount value={quest.cashPayout} size={38} color="var(--money-pending)" />
      </div>
      <Button size="lg" onClick={onHome}>Back to home</Button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Guard screens
   ═══════════════════════════════════════════════════════════════════ */

function NotFound({ onBack }: { onBack: () => void }) {
  return <GuardScreen Icon={AlertCircle} title="Quest not found" body="This quest link is broken or the quest is no longer available." cta="Browse quests" onBack={onBack} />;
}
function WaitingForPrompts({ quest, onBack }: { quest: Quest; onBack: () => void }) {
  return <GuardScreen Icon={Clock} title="Waiting for prompts" body={`"${quest.title}" is an interview quest, but its question track is still being prepared. It'll open for recording soon.`} cta="Browse other quests" onBack={onBack} />;
}
function GuardScreen({ Icon, title, body, cta, onBack }: { Icon: typeof AlertCircle; title: string; body: string; cta: string; onBack: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 text-center" style={{ background: 'var(--surface-ground)', fontFamily: 'var(--font-ui)' }}>
      <div style={{ width: 64, height: 64, borderRadius: 'var(--r-full)', background: 'var(--surface-sunken)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-9)'}}>
        <Icon style={{ width: 28, height: 28, color: 'var(--text-muted)' }} strokeWidth={2} />
      </div>
      <h1 style={{ fontSize: 'var(--fs-title)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-5)'}}>{title}</h1>
      <p style={{ fontSize: 'var(--fs-body)', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-11)', maxWidth: 300 }}>{body}</p>
      <Button size="lg" onClick={onBack}>{cta}</Button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Studio chrome — dark shell, context bar + ProgressPill, control dock
   ═══════════════════════════════════════════════════════════════════ */

function StudioShell({ children, sticky, done, total, onBack, recording }: {
  children: React.ReactNode; sticky: string; done: number; total: number; onBack: () => void; recording?: boolean;
}) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--surface-studio)', fontFamily: 'var(--font-ui)' }}>
      <div className="px-6 pt-14 pb-3" style={{ flexShrink: 0 }}>
        <div className="flex items-center gap-3 mb-3">
          <IconButton
            label="Go back"
            onClick={onBack}
            variant="studio"
            style={{ background: 'transparent', marginLeft: -10, color: DIM }}
          >
            <ChevronLeft size={22} strokeWidth={2.5} aria-hidden />
          </IconButton>
          {recording && (
            <span style={{ width: 8, height: 8, borderRadius: 'var(--r-full)', background: 'var(--action-accent)', boxShadow: '0 0 0 4px rgba(var(--terracotta-500-rgb),0.22)' }} />
          )}
          <span style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: DIM }}>{sticky}</span>
        </div>
        <ProgressPill done={Math.min(done, total)} total={total} />
      </div>
      {children}
    </div>
  );
}

function ControlDock({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ flexShrink: 0, padding: 'var(--space-8) var(--space-10) var(--space-13)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {children}
    </div>
  );
}

function KeepRetake({ time, onKeep, onRetake, last }: { time: number; onKeep: () => void; onRetake: () => void; last: boolean }) {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex items-center gap-2 mb-4">
        <Check style={{ width: 16, height: 16, color: 'var(--state-settled-on-studio)' }} strokeWidth={2.5} />
        <span className="tabular" style={{ fontSize: 'var(--fs-body)', fontWeight: 600, color: 'var(--text-on-studio)' }}>{fmt(time)} recorded</span>
      </div>
      <Button full size="lg" onClick={onKeep}>{last ? 'Keep & review all' : 'Keep & next'}</Button>
      <button onClick={onRetake} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', background: 'none', border: 'none', cursor: 'pointer', color: DIM, fontSize: 'var(--fs-secondary)', fontWeight: 700, padding: '12px 0' }}>
        <RotateCcw style={{ width: 15, height: 15 }} strokeWidth={2} /> Retake this one
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Small helpers
   ═══════════════════════════════════════════════════════════════════ */

function MetaChip({ Icon, text }: { Icon: typeof Clock; text: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <Icon style={{ width: 15, height: 15, color: 'var(--text-muted)' }} strokeWidth={2} />
      <span style={{ fontSize: 'var(--fs-secondary)', fontWeight: 700, color: 'var(--text-secondary)' }}>{text}</span>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 'var(--space-5)', marginTop: 'var(--space-4)'}}>
      {children}
    </p>
  );
}

const briefCard: React.CSSProperties = {
  background: 'var(--surface-raised)', borderRadius: 'var(--r-md)', border: '1px solid var(--border-subtle)',
  padding: 'var(--space-8) var(--space-9)', marginBottom: 'var(--space-9)', boxShadow: 'var(--e-1)',
};

const dockHint: React.CSSProperties = {
  fontSize: 'var(--fs-secondary)', fontWeight: 500, color: FAINT, marginBottom: 'var(--space-7)', textAlign: 'center', lineHeight: 1.5,
};

/* ═══════════════════════════════════════════════════════════════════
   Content adapters — quest data → capture steps (unchanged logic)
   ═══════════════════════════════════════════════════════════════════ */

interface Step { prompt: string; hint?: string; clipLabel: string; stem?: string; speaker?: string; context?: string; }

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
      prompt: q.youHint, clipLabel: `Answer ${i + 1}`, stem: q.stem, speaker: script.interviewer, context: ctx,
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
    case 'lines':     return ['A short line appears — read it once, naturally.', 'Tap record, say the line, tap stop.', 'Keep it or retake, then move to the next line.'];
    case 'scenario':  return ['You play one role across the whole scene.', 'Each turn shows your line — read only your side.', 'Record turn by turn; keep or retake each one.'];
    case 'interview': return ["You'll hear the interviewer ask a question.", "When it's your turn, record your answer naturally.", 'Play back, keep or retake, then the next question.'];
    case 'room':      return ['Gather everyone around this one phone and leave it put.', 'Follow the scrolling score — one continuous take.', "Don't stop between lines; end the take when the scene's done."];
    default:          return [];
  }
}

function fmt(s: number): string {
  return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
}
