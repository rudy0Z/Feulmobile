import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Mic, Clock, Zap, ChevronRight } from 'lucide-react';
import { Waveform } from './ui/Waveform';

export function FirstEarning() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: 'var(--navy)', fontFamily: 'var(--font-sans)' }}
    >
      {/* Background waveform */}
      <div className="absolute inset-0 flex items-center pointer-events-none" style={{ opacity: 0.05 }}>
        <Waveform color="#FFFFFF" opacity={1} height={200} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        {/* Pulsing mic icon */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 100, height: 100, borderRadius: '50%',
            background: 'rgba(196,98,45,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'var(--accent-primary-deep)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0px 8px 32px rgba(196,98,45,0.4)',
          }}>
            <Mic className="w-8 h-8 text-white" strokeWidth={1.75} />
          </div>
        </motion.div>

        {/* The hook */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center"
        >
          <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent-primary-deep)', marginBottom: 16, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Your first earning
          </p>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 44,
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: 12,
          }}>
            Earn <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-primary-deep)' }}>₹50</span>
            <br />in 2 minutes.
          </h1>
          <p style={{ fontSize: 15, fontWeight: 500, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: 300, margin: '0 auto' }}>
            Complete a quick voice calibration. Your wallet gets credited instantly.
          </p>
        </motion.div>

        {/* Trust builders */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex items-center gap-6 mt-10"
        >
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.3)' }} />
            <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.35)' }}>~2 minutes</span>
          </div>
          <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.1)' }} />
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.3)' }} />
            <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.35)' }}>Instant payout</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="px-6 pb-10"
      >
        <button
          onClick={() => navigate('/data-consent')}
          style={{
            width: '100%', height: 58, borderRadius: 999,
            background: 'var(--accent-primary-deep)', color: '#FFFFFF',
            fontSize: 17, fontWeight: 700, border: 'none', cursor: 'pointer',
            boxShadow: '0px 6px 28px rgba(196,98,45,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}
        >
          Start Earning
          <ChevronRight className="w-5 h-5" />
        </button>
        <p style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.25)', textAlign: 'center', marginTop: 14 }}>
          No setup needed. Just speak naturally.
        </p>

        {/* Returning user shortcut — explicit, intentional */}
        <div style={{ textAlign: 'center', marginTop: 18 }}>
          <button
            onClick={() => navigate('/contributor')}
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: 'rgba(255,255,255,0.55)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Returning user?{' '}
            <span style={{ color: '#E8913A', fontWeight: 700 }}>Go to wallet</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}