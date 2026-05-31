import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Clock, IndianRupee, CheckCircle, TrendingUp, ArrowRight,
  BarChart3, Plus, Target, AlertTriangle, TrendingDown, ArrowUpRight,
} from 'lucide-react';
import { FeulLogo } from '../ui/FeulLogo';
import { Waveform } from '../ui/Waveform';
import { NotificationsPanel, BellButton } from '../ui/NotificationsPanel';

const campaigns = [
  { id: 1, name: 'Customer Service Dataset',  progress: 85, clips: 850,  target: 1000, status: 'Active', budget: 18000 },
  { id: 2, name: 'Product Review Collection', progress: 62, clips: 310,  target: 500,  status: 'Active', budget: 7500  },
  { id: 3, name: 'Navigation Commands',       progress: 94, clips: 470,  target: 500,  status: 'Active', budget: 9000  },
  { id: 4, name: 'Multi-language Greetings',  progress: 45, clips: 225,  target: 500,  status: 'Active', budget: 6000  },
];

const underperformingCampaign = {
  name: 'Bengali — Medical Terminology',
  progress: 8,
  clips: 40,
  target: 500,
  daysActive: 14,
  contributors: 3,
  issue: 'Low contributor pool for Bengali medical terms',
  suggestions: [
    'Increase per-clip payout from ₹15 to ₹25',
    'Expand language to include Bengali general',
    'Lower minimum quality threshold to 85%',
  ],
};

function getGreeting(): string {
  const h = new Date().getHours();
  if (h >= 5 && h < 12)  return 'Good morning';
  if (h >= 12 && h < 17) return 'Good afternoon';
  if (h >= 17 && h < 21) return 'Good evening';
  return 'Hey, night owl';
}

export function QuestCreatorDashboard() {
  const [showUnderperform, setShowUnderperform] = useState(false);
  const [greeting, setGreeting] = useState(getGreeting());
  const [notifOpen, setNotifOpen] = useState(false);
  const unreadCount = 2;

  const overallProgress = 75;
  const totalClips = 1855;
  const targetClips = 2500;
  const activeCampaigns = 4;

  useEffect(() => {
    const id = setInterval(() => setGreeting(getGreeting()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen pb-24" style={{ background: '#F4F6F8', fontFamily: 'var(--font-sans)' }}>

      {/* Notifications Panel */}
      <NotificationsPanel isOpen={notifOpen} onClose={() => setNotifOpen(false)} />

      {/* ── WARM GREETING HERO ──────────────────────────────── */}
      <div
        style={{
          background: 'linear-gradient(175deg, #F2F4FF 0%, #EEF0FF 40%, #F4F6F8 100%)',
          padding: '64px 24px 24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle waveform bg */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, opacity: 0.04, pointerEvents: 'none' }}>
          <Waveform color="#6B7394" opacity={1} height={60} variant="data" />
        </div>

        {/* Logo row */}
        <div className="flex items-center justify-between mb-6">
          <FeulLogo />
          <div className="flex items-center gap-2">
            <BellButton unreadCount={unreadCount} onClick={() => setNotifOpen(true)} />
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowUnderperform(!showUnderperform)}
                style={{ fontSize: 10, fontWeight: 600, color: '#B0BBCA', border: '1px solid #E8EDF3', borderRadius: 8, padding: '3px 8px' }}
              >
                {showUnderperform ? 'Hide alert' : 'Underperform'}
              </button>
              <div style={{
                fontSize: 10, fontWeight: 700, color: '#2D7A4F',
                background: '#E8F5EE', border: '1px solid rgba(45,122,79,0.2)',
                borderRadius: 8, padding: '3px 8px', letterSpacing: '0.04em',
              }}>
                LIVE
              </div>
            </div>
          </div>
        </div>

        {/* Greeting row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{ fontSize: 13, fontWeight: 600, color: '#5058A4', marginBottom: 4 }}
            >
              {greeting} 👋
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.07 }}
              style={{ fontSize: 26, fontWeight: 800, color: '#1C2434', lineHeight: 1.1, marginBottom: 8, letterSpacing: '-0.4px' }}
            >
              Rohan Mehta
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.14 }}
              style={{ fontSize: 13, fontWeight: 500, color: '#4A5568', lineHeight: 1.5 }}
            >
              {activeCampaigns} active campaigns · {totalClips.toLocaleString()} clips collected.
            </motion.p>
          </div>

          {/* Avatar + role badge */}
          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1, type: 'spring', stiffness: 280, damping: 22 }}
              style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'linear-gradient(135deg, #7B83C4 0%, #5058A4 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0px 6px 20px rgba(80,88,164,0.3)',
              }}
            >
              <span style={{ fontSize: 22, fontWeight: 800, color: '#FFFFFF', lineHeight: 1 }}>R</span>
            </motion.div>

            {/* Role badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 0.2 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 4,
                background: '#EEEFFE', borderRadius: 999,
                padding: '4px 10px',
                border: '1px solid rgba(80,88,164,0.2)',
              }}
            >
              <Target className="w-3 h-3" style={{ color: '#5058A4' }} />
              <span style={{ fontSize: 10, fontWeight: 700, color: '#5058A4' }}>Creator</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── DATASET PROGRESS HERO CARD ──────────────────────── */}
      <div className="px-5 mt-4 mb-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.28 }}
          style={{
            background: 'radial-gradient(ellipse at 20% 35%, rgba(80,88,164,0.14) 0%, transparent 55%), linear-gradient(150deg, #0F1822 0%, #0A0C10 100%)',
            borderRadius: 24,
            padding: '20px 22px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0px 12px 40px rgba(0,0,0,0.22), inset 0 0 0 0.5px rgba(255,255,255,0.06)',
          }}
        >
          <div className="absolute inset-0 flex items-center pointer-events-none" style={{ opacity: 0.05 }}>
            <Waveform color="#FFFFFF" opacity={1} height={70} variant="data" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Dataset Progress
              </p>
              <div className="flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" style={{ color: 'oklch(0.63 0.25 34)' }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: 'oklch(0.63 0.25 34)' }}>+12% this week</span>
              </div>
            </div>

            {/* Big number + sub */}
            <div className="flex items-end gap-5 mb-4">
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: 52, fontWeight: 700,
                color: '#FFFFFF', lineHeight: 1, letterSpacing: '-0.02em',
              }}>
                {overallProgress}%
              </p>
              <div style={{ marginBottom: 8 }}>
                <p style={{ fontSize: 16, fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>
                  {totalClips.toLocaleString()}
                </p>
                <p style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.3)' }}>
                  of {targetClips.toLocaleString()} clips
                </p>
              </div>
            </div>

            {/* Progress track */}
            <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 999, height: 5, marginBottom: 14 }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 1.3, ease: 'easeOut', delay: 0.4 }}
                style={{ background: 'linear-gradient(90deg, oklch(0.63 0.25 34), #FF9D6C)', borderRadius: 999, height: 5 }}
              />
            </div>

            <div className="flex items-center justify-between">
              <span style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.35)' }}>
                {activeCampaigns} active campaigns
              </span>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)' }}>
                ~{targetClips - totalClips} clips remaining
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Metric Cards ── */}
      <div className="px-5 mb-4">
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { icon: Clock,       value: '48.5h', label: 'Audio Hours', color: '#1C2434' },
            { icon: CheckCircle, value: '92%',   label: 'Pass Rate',   color: '#2D7A4F' },
            { icon: IndianRupee, value: '₹1.8L', label: 'Budget Used', color: '#1C2434' },
          ].map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.label}
                style={{
                  background: '#FFFFFF',
                  borderRadius: 16,
                  border: '1px solid #EDF0F5',
                  padding: '16px 10px',
                  textAlign: 'center',
                  boxShadow: '0px 2px 8px rgba(28,36,52,0.04)',
                }}
              >
                <div style={{
                  width: 34, height: 34, borderRadius: 10,
                  background: '#F4F6F8',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 8px',
                }}>
                  <Icon className="w-4 h-4" style={{ color: '#8896A7' }} />
                </div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 17, fontWeight: 700, color: m.color, marginBottom: 3 }}>
                  {m.value}
                </p>
                <p style={{ fontSize: 9, fontWeight: 600, color: '#8896A7', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {m.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Underperformance Alert (conditional) ── */}
      {showUnderperform && (
        <div className="px-5 mb-4">
          <div style={{
            background: '#FFF8F8', borderRadius: 18,
            border: '1px solid #F5C5C5',
            borderLeft: '4px solid #C0392B',
            padding: '18px',
          }}>
            <div className="flex items-start gap-3 mb-4">
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: '#FDE8E8',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <AlertTriangle className="w-5 h-5" style={{ color: '#C0392B' }} />
              </div>
              <div>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1C2434', marginBottom: 2 }}>
                  Campaign Underperforming
                </h4>
                <p style={{ fontSize: 13, fontWeight: 500, color: '#4A5568', lineHeight: 1.5 }}>
                  {underperformingCampaign.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4 flex-wrap">
              <div className="flex items-center gap-1.5">
                <TrendingDown className="w-3.5 h-3.5" style={{ color: '#C0392B' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: '#C0392B' }}>
                  {underperformingCampaign.progress}%
                </span>
                <span style={{ fontSize: 12, fontWeight: 500, color: '#8896A7' }}>in {underperformingCampaign.daysActive} days</span>
              </div>
              <span style={{ fontSize: 12, fontWeight: 500, color: '#8896A7' }}>
                {underperformingCampaign.contributors} contributors
              </span>
            </div>

            <p style={{ fontSize: 12, fontWeight: 600, color: '#8B0000', marginBottom: 10 }}>
              Issue: {underperformingCampaign.issue}
            </p>

            <div style={{ background: 'rgba(255,255,255,0.8)', borderRadius: 12, padding: '14px' }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#8896A7', marginBottom: 8, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Suggested Fixes
              </p>
              {underperformingCampaign.suggestions.map((s, idx) => (
                <div key={idx} className="flex items-start gap-2 mb-2 last:mb-0">
                  <span style={{ fontSize: 12, color: 'oklch(0.63 0.25 34)', fontWeight: 700, marginTop: 1 }}>•</span>
                  <p style={{ fontSize: 12, fontWeight: 500, color: '#4A5568', lineHeight: 1.5 }}>{s}</p>
                </div>
              ))}
            </div>

            <button style={{
              marginTop: 14, width: '100%', padding: '12px', borderRadius: 999,
              background: 'linear-gradient(160deg, #E8743F 0%, #C4622D 100%)',
              color: '#FFFFFF', fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer',
              boxShadow: '0px 4px 16px rgba(196,98,45,0.3)',
            }}>
              Adjust Campaign Settings
            </button>
          </div>
        </div>
      )}

      {/* ── Active Campaigns ── */}
      <div className="px-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 700, color: '#1C2434' }}>
              Active Campaigns
            </h3>
            <p style={{ fontSize: 11, fontWeight: 500, color: '#8896A7', marginTop: 1 }}>
              Tap to manage or adjust
            </p>
          </div>
          <button className="flex items-center gap-1" style={{ fontSize: 12, fontWeight: 700, color: 'oklch(0.63 0.25 34)' }}>
            View all <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: 20, border: '1px solid #EDF0F5', overflow: 'hidden', boxShadow: '0px 6px 18px rgba(28,36,52,0.05), inset 0px 1px 0px rgba(255,255,255,0.65)' }}>
          {campaigns.map((campaign, idx) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.38 + idx * 0.06 }}
              style={{
                padding: '16px 18px',
                borderBottom: idx < campaigns.length - 1 ? '1px solid #F2F5F9' : 'none',
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 style={{ fontSize: 13, fontWeight: 700, color: '#1C2434', flex: 1, paddingRight: 12, lineHeight: 1.35 }}>
                  {campaign.name}
                </h4>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 17, fontWeight: 700, color: '#1C2434', lineHeight: 1, marginBottom: 2 }}>
                    {campaign.progress}%
                  </p>
                  <p style={{ fontSize: 10, fontWeight: 500, color: '#8896A7' }}>
                    {campaign.clips}/{campaign.target}
                  </p>
                </div>
              </div>

              <div style={{ background: '#F0F4F8', borderRadius: 999, height: 4 }}>
                <div style={{
                  background: campaign.progress >= 90
                    ? 'linear-gradient(90deg, #2D7A4F, #4EC992)'
                    : 'linear-gradient(90deg, oklch(0.63 0.25 34), #FF9D6C)',
                  borderRadius: 999, height: 4, width: `${campaign.progress}%`,
                  transition: 'width 0.5s ease',
                }} />
              </div>

              <div className="flex items-center gap-1 mt-2">
                <IndianRupee className="w-3 h-3" style={{ color: '#B0BBCA' }} />
                <span style={{ fontSize: 11, fontWeight: 500, color: '#8896A7' }}>
                  Budget: ₹{campaign.budget.toLocaleString()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Create Campaign CTA */}
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          whileTap={{ scale: 0.97 }}
          style={{
            marginTop: 16, width: '100%', height: 62, borderRadius: 999,
            background: 'linear-gradient(160deg, #E8743F 0%, #C4622D 100%)',
            color: '#FFFFFF',
            fontSize: 17, fontWeight: 700, border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            boxShadow: '0px 10px 28px rgba(224,108,58,0.42), inset 0px 1px 0px rgba(255,255,255,0.18)',
          }}
        >
          <Plus className="w-5 h-5" />
          Create New Campaign
        </motion.button>
      </div>
    </div>
  );
}