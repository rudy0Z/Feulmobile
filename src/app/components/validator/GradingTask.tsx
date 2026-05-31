import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Play, Pause, Volume2, Flag, AlertTriangle, X, Check, LayoutGrid } from 'lucide-react';

// Components
import { SegmentedControl } from './grading-variants/SegmentedControl';
import { LabelledPills } from './grading-variants/LabelledPills';
import { ThumbArc } from './grading-variants/ThumbArc';
import { KeyboardGrade } from './grading-variants/KeyboardGrade';
import { BinaryFlag } from './grading-variants/BinaryFlag';
import { GradingStyleDrawer } from './GradingStyleDrawer';
import { UndoToast } from './UndoToast';

// Grade definitions
const gradeOptions = [
  { id: 1, label: 'Not Usable', description: 'Unusable for training',                   color: '#C0392B' },
  { id: 2, label: 'Poor',       description: 'Multiple quality issues',                  color: '#C4622D' },
  { id: 3, label: 'Neutral',    description: 'Acceptable with some issues',              color: '#B8860B' },
  { id: 4, label: 'Good',       description: 'Good quality, minor issues acceptable',    color: '#2D7A4F' },
  { id: 5, label: 'Perfect',    description: 'Clear, accurate, no issues',               color: '#1E6B40' },
];

const sampleClips = [
  { id: 1, text: 'Hello, welcome to our restaurant. How many guests will be dining today?', duration: '00:04' },
  { id: 2, text: 'May I take your order? We have some excellent specials today.',            duration: '00:05' },
  { id: 3, text: 'Would you like any beverages to start with?',                             duration: '00:03' },
];

const CONSENSUS_MISMATCH_GRADE = 'Not Usable';

const cardStyle = {
  background: '#FFFFFF',
  borderRadius: 16,
  border: '1px solid #E8EDF3',
  boxShadow: '0px 6px 18px rgba(28,36,52,0.05), inset 0px 1px 0px rgba(255,255,255,0.65)',
};

export function GradingTask() {
  const navigate = useNavigate();
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

  // New Variant State
  const [gradingMethod, setGradingMethod]                   = useState('binary');
  const [isStyleDrawerOpen, setIsStyleDrawerOpen]           = useState(false);
  const [undoToastVisible, setUndoToastVisible]             = useState(false);
  const [lastGradeLabel, setLastGradeLabel]                 = useState('');
  const [history, setHistory]                               = useState<{ clipIndex: number; gradedIds: number[] }[]>([]);

  const advanceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const clip     = sampleClips[currentClip];
  const progress = (gradedClips.length / sampleClips.length) * 100;

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    };
  }, []);

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

  const renderGradingMethod = () => {
    switch (gradingMethod) {
      case 'segmented':
        return <SegmentedControl selectedGrade={selectedGrade} onGrade={handleGrade} gradeOptions={gradeOptions} />;
      case 'pills':
        return <LabelledPills selectedGrade={selectedGrade} onGrade={handleGrade} gradeOptions={gradeOptions} />;
      case 'arc':
        return <ThumbArc selectedGrade={selectedGrade} onGrade={handleGrade} gradeOptions={gradeOptions} />;
      case 'keyboard':
        return <KeyboardGrade selectedGrade={selectedGrade} onGrade={handleGrade} gradeOptions={gradeOptions} />;
      case 'binary':
        return <BinaryFlag selectedGrade={selectedGrade} onGrade={handleGrade} onFlag={handleFlag} gradeOptions={gradeOptions} />;
      default:
        return <SegmentedControl selectedGrade={selectedGrade} onGrade={handleGrade} gradeOptions={gradeOptions} />;
    }
  };

  const getMethodName = () => {
    switch (gradingMethod) {
      case 'segmented': return 'Segmented Control';
      case 'pills': return 'Labelled Pills';
      case 'arc': return 'Thumb Arc';
      case 'keyboard': return 'Keyboard Grade';
      case 'binary': return 'Binary + Flag';
      default: return 'Segmented Control';
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{ background: '#F8F9FA', fontFamily: 'var(--font-sans)' }}
    >
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div
        style={{
          background: '#FFFFFF',
          borderBottom: '1px solid #E8EDF3',
          padding: '64px 24px 16px',
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate('/validator/tasks')}
            style={{
              width: 40, height: 40, borderRadius: '50%',
              background: '#F8F9FA', border: '1px solid #E8EDF3',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}
          >
            <ArrowLeft className="w-5 h-5" style={{ color: '#1C2434' }} />
          </button>
          
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 700, color: '#1C2434' }}>
            Hindi — Waiter Scenario
          </h2>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsStyleDrawerOpen(true)}
              style={{ 
                fontSize: 13, fontWeight: 700, color: 'oklch(0.63 0.25 34)', 
                background: '#FDF1EC', border: '1px solid #FADED3', 
                padding: '8px 12px', borderRadius: 999,
                display: 'flex', alignItems: 'center', gap: 6,
                cursor: 'pointer' 
              }}
            >
              <LayoutGrid className="w-4 h-4" />
              Style
            </button>
            <button
              onClick={handleSkip}
              style={{ fontSize: 13, fontWeight: 600, color: '#8896A7', background: 'none', border: 'none', cursor: 'pointer' }}
              disabled={currentClip === sampleClips.length - 1}
            >
              Skip
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between mb-2">
          <span style={{ fontSize: 12, fontWeight: 500, color: '#8896A7' }}>Progress</span>
          <span style={{ fontSize: 12, fontWeight: 500, color: '#8896A7' }}>
            {gradedClips.length} / {sampleClips.length} graded
          </span>
        </div>
        <div style={{ background: '#F0F4F8', borderRadius: 999, height: 6 }}>
          <div
            style={{
              background: 'linear-gradient(90deg, oklch(0.63 0.25 34), #C4521D)',
              borderRadius: 999, height: 6,
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

      {/* ── Annotation Pill ─────────────────────────────────────────────────── */}
      <div className="absolute top-[152px] left-6 z-10 pointer-events-none">
        <div
          style={{
            padding: '4px 12px', borderRadius: 999,
            background: '#E8EDF3', color: '#4A5568',
            fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em',
            boxShadow: '0px 2px 8px rgba(0,0,0,0.05)',
          }}
        >
          Method {['segmented', 'pills', 'arc', 'keyboard', 'binary'].indexOf(gradingMethod) + 1}: {getMethodName()}
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col px-6 pt-10 pb-4 overflow-auto">

        {/* Clip counter */}
        <div className="flex justify-center mb-5">
          <span
            style={{
              padding: '6px 18px', borderRadius: 999,
              background: '#FFFFFF', border: '1px solid #E8EDF3',
              fontSize: 13, fontWeight: 600, color: '#4A5568',
              boxShadow: '0px 6px 18px rgba(28,36,52,0.05), inset 0px 1px 0px rgba(255,255,255,0.65)',
            }}
          >
            Clip {currentClip + 1} of {sampleClips.length}
          </span>
        </div>

        {/* Transcript Card */}
        <div style={{ ...cardStyle, padding: '20px', marginBottom: 20 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: '#8896A7', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Transcript</p>
          <p style={{ fontSize: 14, fontWeight: 500, color: '#1C2434', lineHeight: 1.65 }}>{clip.text}</p>
        </div>

        {/* Audio Player */}
        <div
          style={{
            background: '#1A1F2E',
            borderRadius: 20,
            border: 'none',
            padding: '22px',
            marginBottom: 24,
            boxShadow: '0px 4px 16px rgba(26,31,46,0.15)',
          }}
        >
          {/* Waveform */}
          <div
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, height: 96, marginBottom: 16 }}
          >
            {[...Array(36)].map((_, i) => (
              <motion.div
                key={i}
                style={{ width: 3, background: isPlaying ? '#3A9E6A' : 'rgba(255,255,255,0.15)', borderRadius: 4 }}
                animate={{ height: isPlaying ? [Math.random() * 64 + 14, Math.random() * 64 + 14] : 24 }}
                transition={{ duration: 0.35, repeat: isPlaying ? Infinity : 0, repeatType: 'reverse', delay: i * 0.02 }}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mb-3">
            <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.4)' }}>00:00</span>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                width: 56, height: 56, borderRadius: '50%',
                background: '#C4622D',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0px 4px 16px rgba(196,98,45,0.30)',
                border: 'none', cursor: 'pointer',
              }}
            >
              {isPlaying
                ? <Pause className="w-6 h-6 text-white" style={{ fill: '#FFFFFF' }} />
                : <Play  className="w-6 h-6 text-white" style={{ fill: '#FFFFFF' }} />
              }
            </button>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.4)' }}>{clip.duration}</span>
          </div>

          <div className="flex items-center gap-3">
            <Volume2 className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.3)' }} />
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.08)', borderRadius: 999, height: 4 }}>
              <div style={{ background: '#C4622D', borderRadius: 999, height: 4, width: '72%' }} />
            </div>
          </div>
        </div>

        {/* ── Grading Section ────────────────────────────────────────────────── */}
        <div className="mb-4">
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: '#1C2434', textAlign: 'center', marginBottom: 16 }}>
            Grade this clip
          </h3>

          {/* Keyboard tip (Only for segmented/keyboard) */}
          {(gradingMethod === 'segmented' || gradingMethod === 'keyboard') && !tipDismissed && (
            <div
              className="flex items-center justify-between px-3 py-2 rounded-xl mb-4"
              style={{ background: '#F0F4F8', border: '1px solid #E8EDF3' }}
            >
              <span style={{ fontSize: 12, fontWeight: 500, color: '#4A5568' }}>
                💡 <strong>Tip:</strong> Press <strong>1–5</strong> to grade faster
              </span>
              <button onClick={() => setTipDismissed(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px 4px' }}>
                <X className="w-3.5 h-3.5" style={{ color: '#8896A7' }} />
              </button>
            </div>
          )}

          <div className="min-h-[200px] flex flex-col justify-center">
            {renderGradingMethod()}
          </div>

          {/* Fraud Flag (Except binary which has its own) */}
          {gradingMethod !== 'binary' && (
            <button
              onClick={() => setFlaggedFraud(!flaggedFraud)}
              style={{
                marginTop: 12, width: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '12px', borderRadius: 999,
                border: flaggedFraud ? '2px solid #C0392B' : '1.5px dashed #CBD5E0',
                background: flaggedFraud ? '#FDE8E8' : 'transparent',
                color: flaggedFraud ? '#8B0000' : '#8896A7',
                fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              <Flag className="w-4 h-4" />
              🚩 Flag as Fraud / AI-Generated
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
              background: 'rgba(45, 122, 79, 0.15)',
              zIndex: 100,
              pointerEvents: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{
                background: '#2D7A4F', padding: '16px 24px', borderRadius: 999,
                display: 'flex', alignItems: 'center', gap: 10,
                boxShadow: '0px 12px 24px rgba(45,122,79,0.3)'
              }}
            >
              <Check className="w-6 h-6 text-white" strokeWidth={3} />
              <span style={{ color: '#FFFFFF', fontWeight: 800 }}>SUBMITTED</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Consensus Mismatch Modal ─────────────────────────────────────────── */}
      <AnimatePresence>
        {showConsensusMismatch && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'fixed', inset: 0, background: 'rgba(28,36,52,0.45)', zIndex: 300 }}
              onClick={() => setShowConsensusMismatch(false)}
            />
            <motion.div
              initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 340 }}
              style={{
                position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 301,
                background: '#FFFFFF', borderRadius: '32px 32px 0 0',
                padding: '28px 24px 40px',
                maxWidth: 480, margin: '0 auto',
                boxShadow: '0px -4px 32px rgba(28,36,52,0.10)',
              }}
            >
              <div style={{ width: 36, height: 4, borderRadius: 2, background: '#E1E8F0', margin: '0 auto 24px' }} />
              <button
                onClick={() => { setShowConsensusMismatch(false); setSelectedGrade(null); }}
                style={{
                  position: 'absolute', top: 24, right: 24,
                  width: 32, height: 32, borderRadius: '50%',
                  background: '#F0F4F8', border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                }}
              >
                <X className="w-4 h-4" style={{ color: '#4A5568' }} />
              </button>

              <div style={{ width: 52, height: 52, borderRadius: 16, background: '#FEF7E6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <AlertTriangle className="w-6 h-6" style={{ color: '#B8860B' }} />
              </div>

              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 800, color: '#1C2434', marginBottom: 10 }}>
                Your grade differs from others
              </h3>
              <p style={{ fontSize: 14, fontWeight: 500, color: '#4A5568', lineHeight: 1.65, marginBottom: 20 }}>
                You graded this clip{' '}
                <strong style={{ color: '#1C2434' }}>'{selectedGradeObj?.label}'</strong>.
                Two other validators graded it{' '}
                <strong style={{ color: '#1C2434' }}>'{CONSENSUS_MISMATCH_GRADE}'</strong>.
                Listen again and confirm or update your grade.
              </p>

              {/* Mini audio player */}
              <div
                style={{
                  background: '#F8F9FA', borderRadius: 14,
                  border: '1px solid #E8EDF3',
                  padding: '14px 18px',
                  display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20,
                }}
              >
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'oklch(0.63 0.25 34)',
                    border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', flexShrink: 0,
                    boxShadow: '0px 4px 12px rgba(224,108,58,0.3)',
                  }}
                >
                  {isPlaying
                    ? <Pause className="w-4 h-4 text-white" style={{ fill: '#FFFFFF' }} />
                    : <Play  className="w-4 h-4 text-white" style={{ fill: '#FFFFFF' }} />
                  }
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                  {[...Array(24)].map((_, i) => (
                    <motion.div
                      key={i}
                      style={{ flex: 1, background: isPlaying ? 'oklch(0.63 0.25 34)' : '#E1E8F0', borderRadius: 2 }}
                      animate={{ height: isPlaying ? [Math.random() * 28 + 8, Math.random() * 28 + 8] : 12 }}
                      transition={{ duration: 0.3, repeat: isPlaying ? Infinity : 0, repeatType: 'reverse' }}
                    />
                  ))}
                </div>
                <span style={{ fontSize: 12, fontWeight: 500, color: '#8896A7', flexShrink: 0 }}>{clip.duration}</span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    const label = gradeOptions.find(g => g.id === selectedGrade)?.label || '';
                    setLastGradeLabel(label);
                    setUndoToastVisible(true);
                    advanceClip();
                  }}
                  style={{
                    flex: 1, padding: '14px', borderRadius: 999,
                    background: '#F0F4F8', border: '1.5px solid #E8EDF3',
                    color: '#4A5568', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                  }}
                >
                  Keep My Grade
                </button>
                <button
                  onClick={() => { setShowConsensusMismatch(false); setSelectedGrade(null); }}
                  style={{
                    flex: 1, padding: '14px', borderRadius: 999,
                    background: 'oklch(0.63 0.25 34)', border: 'none',
                    color: '#FFFFFF', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                    boxShadow: '0px 4px 12px rgba(224,108,58,0.3)',
                  }}
                >
                  Change Grade
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <GradingStyleDrawer 
        currentMethod={gradingMethod} 
        onSelect={setGradingMethod} 
        open={isStyleDrawerOpen} 
        onOpenChange={setIsStyleDrawerOpen} 
      />
    </div>
  );
}