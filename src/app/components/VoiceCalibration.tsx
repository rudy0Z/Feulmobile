import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, Square, Check } from 'lucide-react';
import { Waveform } from './ui/Waveform';

const calibrationPrompts = [
  "Hello, my name is... and I'm from...",
  "The weather today is really nice outside.",
  "I'd like to order a coffee with milk please.",
  "Technology is a tool, but human creativity is the engine of progress.",
  "Artificial intelligence is trained on the diverse voices of humanity.",
];

export function VoiceCalibration() {
  const navigate = useNavigate();
  const [currentPrompt, setCurrentPrompt] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [completedPrompts, setCompletedPrompts] = useState<number[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 12) {
            // Auto-stop after 12 seconds
            setIsRecording(false);
            setCompletedPrompts(p => [...p, currentPrompt]);
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev + 0.1;
        });
      }, 100);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isRecording, currentPrompt]);

  useEffect(() => {
    if (completedPrompts.includes(currentPrompt) && !isRecording) {
      const timer = setTimeout(() => {
        if (currentPrompt < calibrationPrompts.length - 1) {
          setCurrentPrompt(prev => prev + 1);
        } else if (completedPrompts.length === calibrationPrompts.length) {
          // All done — navigate to celebration
          setTimeout(() => navigate('/earning-celebration'), 600);
        }
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [completedPrompts, isRecording, currentPrompt, navigate]);

  const handleToggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setCompletedPrompts(p => [...p, currentPrompt]);
      setRecordingTime(0);
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      setIsRecording(true);
      setRecordingTime(0);
    }
  };

  const progress = ((completedPrompts.length) / calibrationPrompts.length) * 100;
  const earningPerClip = 50 / calibrationPrompts.length;
  const currentEarning = completedPrompts.length * earningPerClip;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F8F9FA', fontFamily: 'var(--font-sans)' }}>

      {/* Header with live earnings */}
      <div className="px-6 pt-16 pb-4 flex items-center justify-between">
        <div>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#8896A7', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Voice Calibration
          </p>
          <p style={{ fontSize: 13, fontWeight: 500, color: '#8896A7', marginTop: 2 }}>
            {currentPrompt + 1} of {calibrationPrompts.length}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#8896A7', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Earned so far
          </p>
          <motion.p
            key={currentEarning}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700, color: '#C4622D' }}
          >
            ₹{currentEarning.toFixed(0)}
          </motion.p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-6 mb-8">
        <div style={{ background: '#E8EDF3', borderRadius: 999, height: 4 }}>
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ background: '#C4622D', borderRadius: 999, height: 4 }}
          />
        </div>
      </div>

      {/* Prompt card */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPrompt}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {/* Completed check */}
            {completedPrompts.includes(currentPrompt) ? (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center py-10"
              >
                <div style={{
                  width: 72, height: 72, borderRadius: '50%',
                  background: '#E6F4EC',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
                }}>
                  <Check className="w-8 h-8" style={{ color: '#2D7A4F' }} strokeWidth={2.5} />
                </div>
                <p style={{ fontSize: 16, fontWeight: 700, color: '#1C2434' }}>Perfect!</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700, color: '#C4622D', marginTop: 4 }}>
                  +₹{earningPerClip.toFixed(0)} earned
                </p>
              </motion.div>
            ) : (
              <>
                {/* Prompt text */}
                <div style={{
                  background: '#FFFFFF',
                  borderRadius: 20,
                  border: '1px solid #E8EDF3',
                  padding: '32px 24px',
                  textAlign: 'center',
                  marginBottom: 16,
                }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: '#8896A7', marginBottom: 16, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Say this naturally
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 22,
                    fontWeight: 700,
                    color: '#1C2434',
                    lineHeight: 1.4,
                  }}>
                    "{calibrationPrompts[currentPrompt]}"
                  </p>
                </div>

                {/* Earning preview */}
                <div className="text-center mb-6">
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#C4622D' }}>
                    Earn ₹{earningPerClip.toFixed(0)} for this clip
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Recording area */}
      <div className="px-6 pb-12 flex flex-col items-center">
        {/* Live waveform when recording */}
        {isRecording && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full mb-6"
            style={{ height: 48 }}
          >
            <Waveform color="#C4622D" opacity={0.6} height={48} />
          </motion.div>
        )}

        {/* Timer */}
        {isRecording && (
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 700, color: '#1C2434', marginBottom: 16 }}>
            {recordingTime.toFixed(1)}s
          </p>
        )}

        {/* Record button */}
        {!completedPrompts.includes(currentPrompt) && (
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleToggleRecording}
            style={{
              width: isRecording ? 72 : 80,
              height: isRecording ? 72 : 80,
              borderRadius: isRecording ? 20 : '50%',
              background: isRecording ? '#C0392B' : '#C4622D',
              border: 'none',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: isRecording
                ? '0px 0px 0px 8px rgba(192,57,43,0.15)'
                : '0px 8px 32px rgba(196,98,45,0.35)',
              transition: 'all 0.2s ease',
            }}
          >
            {isRecording ? (
              <Square className="w-7 h-7 text-white fill-white" />
            ) : (
              <Mic className="w-8 h-8 text-white" strokeWidth={1.75} />
            )}
          </motion.button>
        )}

        <p style={{ fontSize: 12, fontWeight: 500, color: '#8896A7', marginTop: 16 }}>
          {isRecording ? 'Tap to stop' : completedPrompts.includes(currentPrompt) ? 'Moving to next...' : 'Tap to record'}
        </p>
      </div>
    </div>
  );
}