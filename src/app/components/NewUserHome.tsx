import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  Mic, Clock, Flame, TrendingUp, ChevronRight,
  Users, Gift, Lock, CreditCard, AlertCircle, CheckCircle2, Zap,
} from 'lucide-react';
import { FeulLogo } from './ui/FeulLogo';
import { Waveform } from './ui/Waveform';

interface FeulProfile {
  name: string;
  initials: string;
  languages: string[];
  upiId: string;
  setupComplete: boolean;
  walletBalance: number;
  upiLinked: boolean;
}

const starterQuests = [
  { id: 'sq-1', title: 'Quick Phrases — Hindi',  cash: 10, duration: '2 min', tag: 'Perfect for beginners', tagBg: 'var(--status-accent-bg)', tagText: 'var(--status-accent-text)' },
  { id: 'sq-2', title: 'Morning Greetings',       cash: 8,  duration: '1 min', tag: 'Fastest payout',       tagBg: 'var(--status-warning-bg)', tagText: 'var(--status-warning-text)' },
  { id: 'sq-3', title: 'Restaurant Ordering',     cash: 15, duration: '5 min', tag: 'High demand',          tagBg: 'var(--status-info-bg)', tagText: 'var(--status-info-text)' },
];

const lockedMilestones = [
  { label: 'Complete 5 quests',          reward: 'Unlock ₹50 bonus',                          progress: 1, total: 5 },
  { label: '3-day streak',               reward: '1.1× payout multiplier',                    progress: 1, total: 3 },
  { label: 'Reach Verified Contributor', reward: 'Priority access to high-paying quests',     progress: 0, total: 1 },
];

export function NewUserHome() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<FeulProfile | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('feul_profile');
      if (stored) setProfile(JSON.parse(stored));
    } catch {/* ignore */}
  }, []);

  const displayName = profile?.name ?? 'there';
  const firstName   = displayName.split(' ')[0];
  const initials    = profile?.initials ?? '?';
  const walletBal   = profile?.walletBalance ?? 50;
  const upiLinked   = profile?.upiLinked ?? false;
  const upiId       = profile?.upiId ?? '';

  return (
    <div className="min-h-screen pb-6" style={{ background: 'var(--background)', fontFamily: 'var(--font-sans)' }}>

      {/* ── Header ── */}
      <div className="px-6 pt-8 pb-2 flex items-center justify-between">
        <FeulLogo />
        <div className="flex items-center gap-2" style={{ background: 'var(--accent-50)', borderRadius: 999, padding: '5px 12px' }}>
          <Flame style={{ width: 16, height: 16, color: 'var(--accent-primary)' }} />
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-primary)' }}>1 day streak</span>
        </div>
      </div>

      {/* ── Welcome greeting ── */}
      <div className="px-6 pt-3 pb-4">
        <div className="flex items-center gap-3">
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: 'var(--accent-primary-deep)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0px 4px 12px rgba(196,98,45,0.25)',
            flexShrink: 0,
          }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 800, color: '#FFFFFF' }}>
              {initials}
            </span>
          </div>
          <div>
            <p style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>
              Welcome, {firstName}
            </p>
            <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', marginTop: 1 }}>
              Your account is live. Start earning.
            </p>
          </div>
        </div>
      </div>

      {/* ── Wallet Hero — ₹50 is real, it's in the wallet ── */}
      <div className="px-6 mb-3">
        <div style={{
          background: 'radial-gradient(ellipse at 20% 35%, rgba(224,108,58,0.17) 0%, transparent 55%), linear-gradient(150deg, #0F1822 0%, var(--navy) 100%)',
          borderRadius: 24,
          padding: '24px', position: 'relative', overflow: 'hidden',
          boxShadow: 'var(--shadow-floating)',
        }}>
          {/* Static waveform texture at bottom — never overlaps text */}
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden" style={{ borderRadius: '0 0 24px 24px', opacity: 0.11 }}>
            <Waveform color="#FFFFFF" opacity={1} height={48} />
          </div>

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent-primary-deep)', marginBottom: 6, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Wallet Balance
                </p>
                <motion.p
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 160, damping: 14, delay: 0.2 }}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 44, fontWeight: 700, color: '#FFFFFF', lineHeight: 1, letterSpacing: '-0.02em' }}
                >
                  ₹{walletBal.toFixed(2)}
                </motion.p>
                <p style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.35)', marginTop: 5 }}>
                  Available to withdraw
                </p>
              </div>

              {/* Credited badge */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                style={{
                  background: 'rgba(45,122,79,0.25)', borderRadius: 12,
                  padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6,
                  border: '1px solid rgba(45,122,79,0.3)',
                }}
              >
                <CheckCircle2 style={{ width: 14, height: 14, color: 'var(--success-500)' }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--success-500)' }}>Credited</span>
              </motion.div>
            </div>

            {/* Transaction row */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 14 }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mic style={{ width: 13, height: 13, color: 'rgba(255,255,255,0.3)' }} />
                  <span style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.35)' }}>
                    Voice Calibration — Welcome Bonus
                  </span>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: 'var(--accent-primary-deep)' }}>
                  +₹50.00
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── UPI nudge (only if UPI not linked) ── */}
      {!upiLinked && (
        <div className="px-6 mb-4">
          <motion.div
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            onClick={() => navigate('/contributor/profile')}
            style={{
              background: 'var(--warning-50)', borderRadius: 16,
              border: '1px solid var(--warning-200)', padding: '14px 16px',
              display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
            }}
          >
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--warning-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <AlertCircle style={{ width: 18, height: 18, color: 'var(--warning-700)' }} />
            </div>
            <div className="flex-1">
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--status-warning-text)', marginBottom: 2 }}>
                Add UPI to withdraw your ₹50
              </p>
              <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--warning-700)' }}>
                Link a UPI ID to receive Monday payouts
              </p>
            </div>
            <ChevronRight style={{ width: 16, height: 16, color: 'var(--warning-700)', flexShrink: 0 }} />
          </motion.div>
        </div>
      )}

      {/* ── UPI confirmed (if linked) ── */}
      {upiLinked && upiId && (
        <div className="px-6 mb-4">
          <div style={{
            background: 'var(--status-success-bg)', borderRadius: 14,
            border: '1px solid var(--card-border)', padding: '12px 16px',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <CreditCard style={{ width: 16, height: 16, color: 'var(--color-success)', flexShrink: 0 }} />
            <div className="flex-1">
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--status-success-text)' }}>
                {upiId}
              </p>
              <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--color-success)' }}>
                UPI linked · ₹50 will be sent next Monday
              </p>
            </div>
            <CheckCircle2 style={{ width: 16, height: 16, color: 'var(--color-success)', flexShrink: 0 }} />
          </div>
        </div>
      )}

      {/* ── Languages confirmed ── */}
      {profile?.languages && profile.languages.length > 0 && (
        <div className="px-6 mb-5">
          <div style={{
            background: 'var(--surface)', borderRadius: 14,
            border: '1px solid var(--card-border)', padding: '12px 16px',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Your languages
              </p>
              <div className="flex flex-wrap gap-2">
                {profile.languages.map(l => (
                  <span key={l} style={{
                    fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 999,
                    background: 'var(--status-accent-bg)', color: 'var(--status-accent-text)',
                  }}>{l}</span>
                ))}
              </div>
            </div>
            <button
              onClick={() => navigate('/contributor/profile')}
              style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-primary-deep)', background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}
            >
              Edit
            </button>
          </div>
        </div>
      )}

      {/* ── Recommended quests ── */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>
              Recommended For You
            </h3>
            <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-muted)' }}>
              Matched to your voice calibration
            </p>
          </div>
          <button
            onClick={() => navigate('/contributor/quests')}
            className="flex items-center gap-1"
            style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)', padding: '6px 0 6px 12px', minHeight: 44, display: 'flex', alignItems: 'center' }}
          >
            All <ChevronRight style={{ width: 14, height: 14 }} />
          </button>
        </div>

        <div className="space-y-3">
          {starterQuests.map((quest, idx) => (
            <motion.div
              key={quest.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + idx * 0.08, duration: 0.35 }}
              onClick={() => navigate(`/recording/${quest.id}`)}
              style={{
                background: 'var(--surface)', borderRadius: 18,
                border: '1px solid var(--card-border)', padding: '18px',
                cursor: 'pointer', boxShadow: 'var(--shadow-card)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999, background: quest.tagBg, color: quest.tagText }}>
                  {quest.tag}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{quest.title}</h4>
                  <span className="flex items-center gap-1" style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)' }}>
                    <Clock style={{ width: 13, height: 13 }} /> {quest.duration}
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700, color: 'var(--accent-primary)', lineHeight: 1 }}>
                    ₹{quest.cash}
                  </p>
                  <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)', marginTop: 2 }}>
                    in {quest.duration}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Primary CTA ── */}
      <div className="px-6 mb-7">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/contributor/quests')}
          style={{
            width: '100%', height: 62, borderRadius: 999,
            background: 'linear-gradient(160deg, var(--accent-primary-light) 0%, var(--accent-primary-deep) 100%)',
            color: '#FFFFFF',
            fontSize: 17, fontWeight: 700, border: 'none', cursor: 'pointer',
            boxShadow: '0px 10px 28px rgba(224,108,58,0.42), inset 0px 1px 0px rgba(255,255,255,0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}
        >
          <Mic style={{ width: 20, height: 20 }} />
          Start Earning Now
        </motion.button>
      </div>

      {/* ── Trust Tier (minimal, new user) ── */}
      <div className="px-6 mb-6">
        <div style={{ background: 'var(--surface)', borderRadius: 20, border: '1px solid var(--card-border)', padding: '20px', boxShadow: 'var(--shadow-card)' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap style={{ width: 16, height: 16, color: 'var(--accent-primary)' }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>New Contributor</span>
            </div>
            <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)' }}>100 / 500 reputation</span>
          </div>
          <div style={{ background: 'var(--neutral-100)', borderRadius: 999, height: 8 }}>
            <div style={{ background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-400))', borderRadius: 999, height: 8, width: '20%' }} />
          </div>
          <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', marginTop: 10 }}>
            Reach <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>Verified Contributor</span> to unlock{' '}
            <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>priority access to high-paying quests</span>
          </p>
        </div>
      </div>

      {/* ── Locked Milestones ── */}
      <div className="px-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Gift style={{ width: 20, height: 20, color: 'var(--warning-700)' }} />
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
            Locked Rewards
          </h3>
        </div>
        <div className="space-y-3">
          {lockedMilestones.map((m, idx) => (
            <div key={idx} style={{
              background: 'var(--surface)', borderRadius: 18,
              border: '1px solid var(--card-border)', padding: '16px 18px',
              display: 'flex', alignItems: 'center', gap: 14,
              boxShadow: 'var(--shadow-card)',
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: m.progress > 0 ? 'var(--accent-50)' : 'var(--neutral-100)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Lock style={{ width: 18, height: 18, color: m.progress > 0 ? 'var(--accent-primary)' : 'var(--text-muted)' }} />
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{m.label}</p>
                <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)' }}>{m.reward}</p>
                <div style={{ background: 'var(--neutral-100)', borderRadius: 999, height: 4, marginTop: 8 }}>
                  <div style={{
                    background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-400))',
                    borderRadius: 999, height: 4,
                    width: `${(m.progress / m.total) * 100}%`,
                    transition: 'width 0.5s ease',
                  }} />
                </div>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-primary)', flexShrink: 0 }}>
                {m.progress}/{m.total}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Social proof ── */}
      <div className="px-6">
        <div style={{ background: 'var(--surface)', borderRadius: 18, border: '1px solid var(--card-border)', padding: '18px 20px', boxShadow: 'var(--shadow-card)' }}>
          <div className="flex items-center gap-2 mb-3">
            <Users style={{ width: 16, height: 16, color: 'var(--text-muted)' }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>What contributors earn weekly</span>
          </div>
          <div className="flex items-center justify-between">
            {[
              { label: 'Casual (2h/wk)', value: '₹250',    highlight: false },
              { label: 'Active (8h/wk)', value: '₹1,200',  highlight: true  },
              { label: 'Power (20h/wk)', value: '₹3,500+', highlight: false },
            ].map((s, idx, arr) => (
              <div key={s.label} className="flex items-center flex-1">
                <div className="text-center flex-1">
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700, color: s.highlight ? 'var(--accent-primary-deep)' : 'var(--text-primary)' }}>
                    {s.value}
                  </p>
                  <p style={{ fontSize: 10, fontWeight: 500, color: 'var(--text-muted)' }}>{s.label}</p>
                </div>
                {idx < arr.length - 1 && (
                  <div style={{ width: 1, height: 32, background: 'var(--divider)', flexShrink: 0 }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
