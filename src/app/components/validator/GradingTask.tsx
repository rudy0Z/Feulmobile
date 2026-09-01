import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, Flag, AlertTriangle, X, Check, Keyboard, ChevronLeft } from 'lucide-react';
import { useDevContext } from '../../lib/DevContext';

// The shipping validator surface renders the 5-point SegmentedControl — it
// preserves the full quality signal the taxonomy defines and supports keyboard
// grading. The alternative instruments are DEV-ONLY: switch via DevPanel →
// Grading Method. There is deliberately no in-app style switcher in production.
import { SegmentedControl } from './grading-variants/SegmentedControl';
import { LabelledPills } from './grading-variants/LabelledPills';
import { ThumbArc } from './grading-variants/ThumbArc';
import { KeyboardGrade } from './grading-variants/KeyboardGrade';
import { BinaryFlag } from './grading-variants/BinaryFlag';
import { UndoToast } from './UndoToast';

// Grade definitions
const gradeOptions = [
  { id: 1, label: 'Not Usable', description: 'Unusable for training',                   color: 'var(--state-failed)' },
  { id: 2, label: 'Poor',       description: 'Multiple quality issues',                  color: 'var(--accent-primary-deep)' },
  { id: 3, label: 'Neutral',    description: 'Acceptable with some issues',              color: 'var(--t-ochre-700)' },
  { id: 4, label: 'Good',       description: 'Good quality, minor issues acceptable',    color: 'var(--color-success)' },
  { id: 5, label: 'Perfect',    description: 'Clear, accurate, no issues',               color: 'var(--t-verdigris-700)' },
];

const sampleClips = [
  { id: 1, text: 'Hello, welcome to our restaurant. How many guests will be dining today?', duration: '00:04' },
  { id: 2, text: 'May I take your order? We have some excellent specials today.',            duration: '00:05' },
  { id: 3, text: 'Would you like any beverages to start with?',                             duration: '00:03' },
];

const CONSENSUS_MISMATCH_GRADE = 'Not Usable';

const cardStyle = {
  background: 'var(--surface-raised)',
  borderRadius: 'var(--r-md)',
  border: '1px solid var(--border-subtle)',
  boxShadow: 'var(--e-2)',
};

export function GradingTask() {
  const navigate = useNavigate();
  const dev = useDevContext();
  const { taskId } = useParams();

  // Core State
  const [currentClip, setCurrentClip]                       = useState(0);
  const [selectedGrade, setSelectedGrade]                   = useState<number | null>(null);
  const [isPlaying, setIsPlaying]                           = useState(false);
  const [gradedClips, setGradedClips]                       = useState<number[]>([]);
  const [flaggedFraud, setFlaggedFraud]                     = useState(false);
  const [showConsensusMismatch, setShowConsensusMismatch]   = useState(false);
  const [showSuccessFlash, setShowSuccessFlash]             = useState(false);
  const [tipDismissed, setTipDismissed]                     = useState(false);

  const [undoToastVisible, setUndoToastVisible]             = useState(false);
  const [lastGradeLabel, setLastGradeLabel]                 = useState('');
  const [history, setHistory]                               = useState<{ clipIndex: number; gradedIds: number[] }[]>([]);

  const advanceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const clip     = sampleClips[currentClip];
  const progress = (gradedClips.length / sampleClips.length) * 100;

  // Cleanup timers + swipe-from-left-edge to go back
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
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    };
  }, [navigate]);

  const handleGrade = (grade: number) => {
    setSelectedGrade(grade);
    
    // Check for consensus mismatch (Specific logic for demo)
    if (currentClip === 1 && grade === 4) {
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
      setShowConsensusMismatch(true);
      return;
    }

    // Auto-advance after 400ms
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    advanceTimerRef.current = setTimeout(() => {
      const label = gradeOptions.find(g => g.id === grade)?.label || (grade === 1 ? 'Rejected' : 'Accepted');
      setLastGradeLabel(label);
      setUndoToastVisible(true);
      advanceClip();
    }, 400);
  };

  // Keyboard grading — makes the "press 1–5" tip literally true. Skipped for
  // the binary instrument, which maps to Reject/Accept rather than a 1–5 scale.
  useEffect(() => {
    if (dev.gradingMethod === 'binary') return;
    const onKey = (e: KeyboardEvent) => {
      if (showConsensusMismatch) return;
      const n = Number(e.key);
      if (n >= 1 && n <= 5) handleGrade(n);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [currentClip, showConsensusMismatch, dev.gradingMethod]);

  const handleFlag = (tag: string) => {
    setLastGradeLabel(`Flagged: ${tag}`);
    setUndoToastVisible(true);
    advanceClip();
  };

  const advanceClip = () => {
    // Save state for undo
    setHistory(prev => [...prev, { clipIndex: currentClip, gradedIds: gradedClips }]);
    
    setGradedClips(prev => [...prev, currentClip]);
    setShowConsensusMismatch(false);
    setShowSuccessFlash(true);
    
    setTimeout(() => {
      setShowSuccessFlash(false);
      if (currentClip < sampleClips.length - 1) {
        setCurrentClip(currentClip + 1);
        setSelectedGrade(null);
        setIsPlaying(false);
      } else {
        // All clips done
        navigate('/validator');
      }
    }, 400);
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const lastState = history[history.length - 1];
      setCurrentClip(lastState.clipIndex);
      setGradedClips(lastState.gradedIds);
      setSelectedGrade(null);
      setHistory(prev => prev.slice(0, -1));
      setUndoToastVisible(false);
      setIsPlaying(false);
    }
  };

  const handleSkip = () => {
    if (currentClip < sampleClips.length - 1) {
      setCurrentClip(currentClip + 1);
      setSelectedGrade(null);
      setIsPlaying(false);
    }
  };

  const selectedGradeObj = gradeOptions.find(g => g.id === selectedGrade);

  // The instrument is fixed to 'segmented' in production; DevPanel can preview others.
  const method = dev.gradingMethod;
  const showKeyboardTip = method === 'segmented' || method === 'keyboard';
  const renderGradingMethod = () => {
    switch (method) {
      case 'pills':    return <LabelledPills   selectedGrade={selectedGrade} onGrade={handleGrade} gradeOptions={gradeOptions} />;
      case 'arc':      return <ThumbArc        selectedGrade={selectedGrade} onGrade={handleGrade} gradeOptions={gradeOptions} />;
      case 'keyboard': return <KeyboardGrade   selectedGrade={selectedGrade} onGrade={handleGrade} gradeOptions={gradeOptions} />;
      case 'binary':   return <BinaryFlag      selectedGrade={selectedGrade} onGrade={handleGrade} onFlag={handleFlag} gradeOptions={gradeOptions} />;
      case 'segmented':
      default:         return <SegmentedControl selectedGrade={selectedGrade} onGrade={handleGrade} gradeOptions={gradeOptions} />;
    }
  };

  return (
    <div
      className="theme-verdigris min-h-screen flex flex-col relative"
      style={{ background: 'var(--surface-sunken)', fontFamily: 'var(--font-ui)' }}
    >
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div
        style={{
          background: 'var(--surface-raised)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '64px 24px 16px',
        }}
      >
        <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-primary)', padding: '4px 0', marginBottom: 10 }}>
          <ChevronLeft style={{ width: 22, height: 22 }} strokeWidth={2.5} />
        </button>
        <div className="flex items-center justify-between mb-4">
          <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
            Hindi — Waiter Scenario
          </h2>

          <button
            onClick={handleSkip}
            style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
            disabled={currentClip === sampleClips.length - 1}
          >
            Skip
          </button>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between mb-2">
          <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)' }}>Progress</span>
          <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)' }}>
            {gradedClips.length} / {sampleClips.length} graded
          </span>
        </div>
        <div style={{ background: 'var(--neutral-100)', borderRadius: 'var(--r-full)', height: 6 }}>
          <div
            style={{
              background: 'linear-gradient(90deg, var(--t-verdigris-700), var(--t-verdigris-500))',
              borderRadius: 'var(--r-full)', height: 6,
              width: `${progress}%`,
              transition: 'width 0.4s ease',
            }}
          />
        </div>
      </div>

      <UndoToast 
        gradeLabel={lastGradeLabel} 
        onUndo={handleUndo} 
        onDismiss={() => setUndoToastVisible(false)} 
        visible={undoToastVisible} 
      />

      {/* ── Main Content ─────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col px-6 pt-10 pb-4 overflow-auto">

        {/* Clip counter */}
        <div className="flex justify-center mb-5">
          <span
            style={{
              padding: '6px 18px', borderRadius: 'var(--r-full)',
              background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)',
              fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)',
              boxShadow: 'var(--e-2)',
            }}
          >
            Clip {currentClip + 1} of {sampleClips.length}
          </span>
        </div>

        {/* Transcript Card */}
        <div style={{ ...cardStyle, padding: '20px', marginBottom: 20 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Transcript</p>
          <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.65 }}>{clip.text}</p>
        </div>

        {/* Audio Player */}
        <div
          style={{
            background: 'var(--surface-studio)',
            borderRadius: 'var(--r-md)',
            border: 'none',
            padding: '22px',
            marginBottom: 24,
            boxShadow: 'var(--e-2)',
          }}
        >
          {/* Waveform */}
          <div
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, height: 96, marginBottom: 16 }}
          >
            {[...Array(36)].map((_, i) => (
              <motion.div
                key={i}
                style={{ width: 3, background: isPlaying ? 'var(--t-verdigris-500)' : 'rgba(255,255,255,0.15)', borderRadius: 4 }}
                animate={{ height: isPlaying ? [Math.random() * 64 + 14, Math.random() * 64 + 14] : 24 }}
                transition={{ duration: 0.35, repeat: isPlaying ? Infinity : 0, repeatType: 'reverse', delay: i * 0.02 }}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mb-3">
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-on-studio)' }}>00:00</span>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'var(--accent-primary-deep)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0px 4px 16px rgba(var(--accent-deep-rgb),0.30)',
                border: 'none', cursor: 'pointer',
              }}
            >
              {isPlaying
                ? <Pause className="w-6 h-6 text-white" style={{ fill: 'var(--text-on-studio)' }} />
                : <Play  className="w-6 h-6 text-white" style={{ fill: 'var(--text-on-studio)' }} />
              }
            </button>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-on-studio)' }}>{clip.duration}</span>
          </div>

          <div className="flex items-center gap-3">
            <Volume2 className="w-4 h-4" style={{ color: 'var(--text-on-studio)' }} />
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.08)', borderRadius: 'var(--r-full)', height: 4 }}>
              <div style={{ background: 'var(--accent-primary-deep)', borderRadius: 'var(--r-full)', height: 4, width: '72%' }} />
            </div>
          </div>
        </div>

        {/* ── Grading Section ────────────────────────────────────────────────── */}
        <div className="mb-4">
          <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', textAlign: 'center', marginBottom: 16 }}>
            Grade this clip
          </h3>

          {/* Keyboard tip — the 1–5 shortcut is wired up in a keydown handler. */}
          {showKeyboardTip && !tipDismissed && (
            <div
              className="flex items-center justify-between px-3 py-2 rounded-xl mb-4"
              style={{ background: 'var(--neutral-100)', border: '1px solid var(--border-subtle)' }}
            >
              <span className="flex items-center gap-2" style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)' }}>
                <Keyboard className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
                Press <strong>1–5</strong> to grade faster
              </span>
              <button onClick={() => setTipDismissed(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px 4px' }}>
                <X className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
              </button>
            </div>
          )}

          <div className="min-h-[200px] flex flex-col justify-center">
            {renderGradingMethod()}
          </div>

          {/* Fraud / AI-generated flag — binary instrument has its own flag control. */}
          {method !== 'binary' && (
            <button
              onClick={() => setFlaggedFraud(!flaggedFraud)}
              style={{
                marginTop: 12, width: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '12px', borderRadius: 'var(--r-full)',
                border: flaggedFraud ? '2px solid var(--state-failed)' : '1.5px dashed var(--border-strong)',
                background: flaggedFraud ? 'var(--status-error-bg)' : 'transparent',
                color: flaggedFraud ? 'var(--status-error-text)' : 'var(--text-muted)',
                fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              <Flag className="w-4 h-4" />
              Flag as fraud or AI-generated
            </button>
          )}
        </div>
      </div>

      {/* ── Success Flash Overlay ───────────────────────────────────────────── */}
      <AnimatePresence>
        {showSuccessFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0,
              background: 'var(--t-verdigris-50)',
              zIndex: 100,
              pointerEvents: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{
                background: 'var(--color-success)', padding: '16px 24px', borderRadius: 'var(--r-full)',
                display: 'flex', alignItems: 'center', gap: 10,
                boxShadow: 'var(--e-3)'
              }}
            >
              <Check className="w-6 h-6 text-white" strokeWidth={3} />
              <span style={{ color: 'var(--text-on-studio)', fontWeight: 800 }}>SUBMITTED</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Consensus Mismatch Modal ─────────────────────────────────────────── */}
      <AnimatePresence>
        {(showConsensusMismatch || dev.activeOverlay === 'consensus') && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'fixed', inset: 0, background: 'rgba(var(--carbon-rgb),0.45)', zIndex: 300 }}
              onClick={() => { setShowConsensusMismatch(false); dev.dismissOverlay(); }}
            />
            <motion.div
              initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 340 }}
              style={{
                position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 301,
                background: 'var(--surface-raised)', borderRadius: '32px 32px 0 0',
                padding: '28px 24px 40px',
                maxWidth: 480, margin: '0 auto',
                boxShadow: 'var(--e-3)',
              }}
            >
              <div style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--border-subtle)', margin: '0 auto 24px' }} />
              <button
                onClick={() => { setShowConsensusMismatch(false); setSelectedGrade(null); dev.dismissOverlay(); }}
                style={{
                  position: 'absolute', top: 24, right: 24,
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'var(--neutral-100)', border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                }}
              >
                <X className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
              </button>

              <div style={{ width: 52, height: 52, borderRadius: 'var(--r-md)', background: 'var(--warning-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <AlertTriangle className="w-6 h-6" style={{ color: 'var(--t-ochre-700)' }} />
              </div>

              <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 10 }}>
                Your grade differs from others
              </h3>
              <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 20 }}>
                You graded this clip{' '}
                <strong style={{ color: 'var(--text-primary)' }}>'{selectedGradeObj?.label}'</strong>.
                Two other validators graded it{' '}
                <strong style={{ color: 'var(--text-primary)' }}>'{CONSENSUS_MISMATCH_GRADE}'</strong>.
                Listen again and confirm or update your grade.
              </p>

              {/* Mini audio player */}
              <div
                style={{
                  background: 'var(--background)', borderRadius: 'var(--r-md)',
                  border: '1px solid var(--border-subtle)',
                  padding: '14px 18px',
                  display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20,
                }}
              >
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'var(--accent-primary)',
                    border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', flexShrink: 0,
                    boxShadow: '0px 4px 12px rgba(var(--accent-glow-rgb),0.3)',
                  }}
                >
                  {isPlaying
                    ? <Pause className="w-4 h-4 text-white" style={{ fill: 'var(--text-on-accent)' }} />
                    : <Play  className="w-4 h-4 text-white" style={{ fill: 'var(--text-on-accent)' }} />
                  }
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                  {[...Array(24)].map((_, i) => (
                    <motion.div
                      key={i}
                      style={{ flex: 1, background: isPlaying ? 'var(--accent-primary)' : 'var(--border-subtle)', borderRadius: 2 }}
                      animate={{ height: isPlaying ? [Math.random() * 28 + 8, Math.random() * 28 + 8] : 12 }}
                      transition={{ duration: 0.3, repeat: isPlaying ? Infinity : 0, repeatType: 'reverse' }}
                    />
                  ))}
                </div>
                <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', flexShrink: 0 }}>{clip.duration}</span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    // C-17: standing by a grade that differs from consensus escalates the
                    // clip to a third reviewer (contributor sees an honest extended-review state).
                    setShowConsensusMismatch(false);
                    dev.dismissOverlay();
                    navigate('/validator/disagreement/' + (taskId ?? 'clip'));
                  }}
                  style={{
                    flex: 1, padding: '14px', borderRadius: 'var(--r-full)',
                    background: 'var(--neutral-100)', border: '1.5px solid var(--border-subtle)',
                    color: 'var(--text-secondary)', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                  }}
                >
                  Keep My Grade
                </button>
                <button
                  onClick={() => { setShowConsensusMismatch(false); setSelectedGrade(null); dev.dismissOverlay(); }}
                  style={{
                    flex: 1, padding: '14px', borderRadius: 'var(--r-full)',
                    background: 'var(--accent-primary)', border: 'none',
                    color: 'var(--text-on-accent)', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                    boxShadow: '0px 4px 12px rgba(var(--accent-glow-rgb),0.3)',
                  }}
                >
                  Change Grade
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}