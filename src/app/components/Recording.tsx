import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, Square, Play, Check, ArrowLeft } from 'lucide-react';
import { Waveform } from './ui/Waveform';
import { VoiceVisualizer } from './ui/VoiceVisualizer';

const sampleClips = [
  "Read the following sentence naturally: The quick brown fox jumps over the lazy dog.",
  "Describe your favorite meal in detail.",
  "Tell me about a memorable moment from your childhood.",
  "Explain how to make a cup of coffee.",
  "Describe the weather outside your window.",
  "What's your favorite book and why?",
  "Describe your ideal vacation destination.",
  "Tell me about a hobby you enjoy.",
];

type RecordingState = 'idle' | 'recording' | 'paused' | 'completed';

export function Recording() {
  const navigate = useNavigate();
  const { questId } = useParams();
  const [currentClip, setCurrentClip] = useState(0);
  const [recordingState, setRecordingState] = useState<RecordingState>('idle');
  const [recordingTime, setRecordingTime] = useState(0);
  const [completedClips, setCompletedClips] = useState<number[]>([]);
  const [showOffline, setShowOffline] = useState(false);

  const totalClips = sampleClips.length;
  const progress = (completedClips.length / totalClips) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (recordingState === 'recording') {
      interval = setInterval(() => setRecordingTime((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [recordingState]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = () => { setRecordingState('recording'); setRecordingTime(0); };
  const handleStopRecording = () => { setRecordingState('completed'); };

  const handleAcceptClip = () => {
    setCompletedClips([...completedClips, currentClip]);
    if (currentClip < totalClips - 1) {
      setCurrentClip(currentClip + 1);
      setRecordingState('idle');
      setRecordingTime(0);
    } else {
      navigate('/contributor');
    }
  };

  const handleRetryClip = () => { setRecordingState('idle'); setRecordingTime(0); };

  return (
    <div className="min-h-screen flex flex-col relative" style={{ background: '#F8F9FA', fontFamily: 'var(--font-sans)' }}>

      {/* Header */}
      <div className="px-6 pt-16 pb-4">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/contributor/quests')}
            style={{
              width: 40, height: 40, borderRadius: '50%',
              background: '#FFFFFF', border: '1px solid #E8EDF3',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0px 6px 18px rgba(28,36,52,0.05), inset 0px 1px 0px rgba(255,255,255,0.65)', cursor: 'pointer',
            }}
          >
            <ArrowLeft className="w-5 h-5" style={{ color: '#1C2434' }} />
          </button>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 700, color: '#1C2434' }}>
            Quest Recording
          </h2>
          <button
            onClick={() => setShowOffline(!showOffline)}
            style={{ fontSize: 11, fontWeight: 600, color: '#8896A7', border: '1px solid #E8EDF3', borderRadius: 8, padding: '4px 8px' }}
          >
            {showOffline ? 'Online' : 'Offline'}
          </button>
        </div>

        {/* Offline Banner */}
        {showOffline && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4"
          >
            <div className="flex items-center gap-3" style={{
              background: '#FEF7E6', borderRadius: 14, padding: '12px 16px',
              border: '1px solid #F5E4B8',
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%', background: '#B8860B',
                boxShadow: '0 0 0 3px rgba(184,134,11,0.2)',
              }} />
              <div className="flex-1">
                <p style={{ fontSize: 13, fontWeight: 700, color: '#6B4800' }}>
                  You're offline
                </p>
                <p style={{ fontSize: 11, fontWeight: 500, color: '#8B6914', lineHeight: 1.5 }}>
                  Recordings are saved locally. They'll auto-submit when you're back online.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Progress */}
        <div className="mb-2">
          <div className="flex items-center justify-between mb-2">
            <span style={{ fontSize: 13, fontWeight: 600, color: '#4A5568' }}>Progress</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#4A5568' }}>{completedClips.length} / {totalClips} clips</span>
          </div>
          <div style={{ background: '#E8EDF3', borderRadius: 999, height: 6 }}>
            <div
              style={{
                background: 'linear-gradient(90deg, #C4622D, oklch(0.63 0.25 34))',
                borderRadius: 999, height: 6,
                width: `${progress}%`,
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-32 relative">
        {/* Waveform bg — prominent on recording screen */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div style={{ width: '90%' }}>
            <Waveform color="#E8913A" opacity={recordingState === 'recording' ? 0.15 : 0.06} height={120} />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentClip}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md relative z-10"
          >
            {/* Clip counter */}
            <div className="flex justify-center mb-6">
              <span
                style={{
                  padding: '6px 18px', borderRadius: 999,
                  background: '#FFFFFF', border: '1px solid #E8EDF3',
                  fontSize: 13, fontWeight: 600, color: '#4A5568',
                }}
              >
                Clip {currentClip + 1} of {totalClips}
              </span>
            </div>

            {/* Prompt */}
            <div
              style={{
                background: '#FFFFFF', borderRadius: 16,
                border: '1px solid #E8EDF3',
                boxShadow: '0px 6px 18px rgba(28,36,52,0.05), inset 0px 1px 0px rgba(255,255,255,0.65)',
                padding: '28px', marginBottom: 32,
              }}
            >
              <p style={{ fontSize: 15, fontWeight: 500, color: '#1C2434', textAlign: 'center', lineHeight: 1.65 }}>
                {sampleClips[currentClip]}
              </p>
            </div>

            {/* Recording Controls */}
            <div className="text-center">
              {recordingState === 'idle' && (
                <motion.button
                  initial={{ scale: 0.9 }} animate={{ scale: 1 }}
                  onClick={handleStartRecording}
                  style={{
                    width: 80, height: 80, borderRadius: '50%',
                    background: 'linear-gradient(145deg, #E8743F, #C4622D)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto',
                    boxShadow: '0px 8px 24px rgba(196,98,45,0.45), inset 0px 1px 0px rgba(255,255,255,0.2)',
                    border: 'none', cursor: 'pointer',
                  }}
                >
                  <Mic className="w-10 h-10 text-white" />
                </motion.button>
              )}

              {recordingState === 'recording' && (
                <div className="flex flex-col items-center">
                  {/* Live voice coach */}
                  <div style={{ width: '100%', marginBottom: 20 }}>
                    <VoiceVisualizer active height={110} />
                  </div>

                  <motion.button
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    onClick={handleStopRecording}
                    style={{
                      width: 80, height: 80, borderRadius: '50%',
                      background: 'linear-gradient(145deg, #D9483A, #C0392B)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 16px',
                      boxShadow: '0px 8px 24px rgba(192,57,43,0.45), inset 0px 1px 0px rgba(255,255,255,0.15)',
                      border: 'none', cursor: 'pointer',
                    }}
                  >
                    <Square className="w-8 h-8 text-white fill-white" />
                  </motion.button>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 26, fontWeight: 700, color: '#1C2434' }}>
                    {formatTime(recordingTime)}
                  </div>
                  <p style={{ fontSize: 13, fontWeight: 500, color: '#C4622D', marginTop: 6 }}>Recording...</p>
                </div>
              )}

              {recordingState === 'completed' && (
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#2D7A4F' }}>
                    <Check className="w-10 h-10 text-white" />
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#1C2434', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>
                    {formatTime(recordingTime)}
                  </div>
                  {/* Emotional payoff copy */}
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#C4622D', marginBottom: 20 }}>
                    Clip submitted. Your voice just trained an AI.
                  </p>

                  {/* Playback */}
                  <button
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      padding: '11px 22px', borderRadius: 999,
                      background: '#FFFFFF', border: '1px solid #E8EDF3',
                      marginBottom: 20, cursor: 'pointer',
                    }}
                  >
                    <Play className="w-5 h-5" style={{ color: '#C4622D' }} />
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#1C2434' }}>Play Recording</span>
                  </button>

                  {/* Submit is the only CTA. Retry is text-only */}
                  <button
                    onClick={handleAcceptClip}
                    style={{
                      width: '100%', height: 56, borderRadius: 999,
                      background: 'linear-gradient(160deg, #E8743F 0%, #C4622D 100%)',
                      border: 'none', cursor: 'pointer',
                      boxShadow: '0px 8px 24px rgba(196,98,45,0.38), inset 0px 1px 0px rgba(255,255,255,0.18)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: 12,
                    }}
                  >
                    <span style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF' }}>Submit</span>
                  </button>
                  <button
                    onClick={handleRetryClip}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: 14, fontWeight: 600, color: '#8896A7',
                    }}
                  >
                    Retry
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}