import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { Waveform } from './ui/Waveform';
import { CheckCircle2 } from 'lucide-react';

export function EarningCelebration() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: 'var(--navy)', fontFamily: 'var(--font-sans)' }}
    >
      {/* Background waveform */}
      <div className="absolute inset-0 flex items-center pointer-events-none" style={{ opacity: 0.06 }}>
        <Waveform color="var(--t-bone-0)" opacity={1} height={200} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        {/* Success ring */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
          style={{
            width: 120, height: 120, borderRadius: '50%',
            background: 'rgba(var(--accent-deep-rgb),0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.3 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <CheckCircle2 style={{ width: 56, height: 56, color: 'var(--accent-primary-deep)' }} strokeWidth={1.75} />
          </motion.div>
        </motion.div>

        {/* The number — BIG */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center"
        >
          <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent-primary-deep)', marginBottom: 12, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Credited to your wallet
          </p>
          <motion.p
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 150, damping: 10, delay: 0.7 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 72,
              fontWeight: 700,
              color: 'var(--t-bone-0)',
              lineHeight: 1,
              letterSpacing: '-0.03em',
            }}
          >
            +₹50
          </motion.p>
          <p style={{ fontSize: 15, fontWeight: 500, color: 'rgba(255,255,255,0.45)', marginTop: 12 }}>
            Your first earning on Feul
          </p>
        </motion.div>

        {/* Standing note — honest recognition, not a currency bonus */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
          className="flex items-center gap-3 mt-8"
          style={{
            background: 'rgba(255,255,255,0.06)',
            borderRadius: 999,
            padding: '10px 20px',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <TrendingUp className="w-4 h-4" style={{ color: 'var(--action-primary)' }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>
            First clip accepted · your standing starts building
          </span>
        </motion.div>

        {/* What's next teaser */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="flex items-center gap-2 justify-center mb-3">
            <TrendingUp className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.3)' }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              What's waiting for you
            </span>
          </div>
          <div className="flex items-center gap-4 justify-center">
            {[
              { label: 'Hindi Quests', amount: '₹15–50' },
              { label: 'Quick Phrases', amount: '₹10' },
              { label: 'High Demand', amount: '₹35+' },
            ].map((item) => (
              <div key={item.label} style={{
                background: 'rgba(255,255,255,0.04)',
                borderRadius: 12,
                padding: '10px 14px',
                textAlign: 'center',
              }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: 'var(--accent-primary-deep)', marginBottom: 2 }}>
                  {item.amount}
                </p>
                <p style={{ fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,0.35)' }}>{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.5 }}
        className="px-6 pb-10"
      >
        <button
          onClick={() => navigate('/profile-setup')}
          style={{
            width: '100%', height: 58, borderRadius: 999,
            background: 'var(--accent-primary-deep)', color: 'var(--t-bone-0)',
            fontSize: 17, fontWeight: 700, border: 'none', cursor: 'pointer',
            boxShadow: '0px 6px 28px rgba(var(--accent-deep-rgb),0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}
        >
          Keep Earning
          <ArrowRight className="w-5 h-5" />
        </button>
        <p style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.25)', textAlign: 'center', marginTop: 14 }}>
          High-paying quests available right now
        </p>
      </motion.div>
    </div>
  );
}