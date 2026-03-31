import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Mic, ArrowRight, Lock, Clock, Flame, TrendingUp, ChevronRight, Users, Gift } from 'lucide-react';
import { FeulLogo } from './ui/FeulLogo';
import { Waveform } from './ui/Waveform';

/*
  NewUserHome — The "Locked Potential" screen.
  
  This is the first real home a new user sees after the voice calibration
  + ₹50 celebration. It needs to do three things:
  
  1. Show them proof — "You earned ₹50, it's real."
  2. Show them potential — "Here's ₹350+ waiting for you today."
  3. Give them one clear action — "Start your next quest."
  
  The wallet isn't empty anymore (they have ₹50), but the dashboard is
  intentionally sparse to NOT overwhelm. Every element is an invitation.
*/

const starterQuests = [
  {
    id: 'sq-1',
    title: 'Quick Phrases — Hindi',
    description: 'Record 5 everyday phrases',
    cash: 10,
    duration: '2 min',
    tag: 'Perfect for beginners',
  },
  {
    id: 'sq-2',
    title: 'Morning Greetings',
    description: 'Say hello in your natural voice',
    cash: 8,
    duration: '1 min',
    tag: 'Fastest payout',
  },
  {
    id: 'sq-3',
    title: 'Restaurant Ordering',
    description: 'Read a short ordering script',
    cash: 15,
    duration: '5 min',
    tag: 'High demand',
  },
];

const lockedMilestones = [
  { label: 'Complete 5 quests', reward: 'Unlock ₹50 bonus', progress: 1, total: 5 },
  { label: '3-day streak', reward: '1.1× payout multiplier', progress: 1, total: 3 },
  { label: 'Reach Level 2', reward: 'Priority access to high-paying quests', progress: 0, total: 1 },
];

export function NewUserHome() {
  const navigate = useNavigate();
  const [totalEarned] = useState(50);
  const dailyPotential = 350;

  return (
    <div className="min-h-screen pb-6" style={{ background: '#F8F9FA', fontFamily: 'var(--font-sans)' }}>

      {/* Header */}
      <div className="px-6 pt-8 pb-2 flex items-center justify-between">
        <FeulLogo />
        <div className="flex items-center gap-2" style={{
          background: '#FFF0E8', borderRadius: 999, padding: '5px 12px',
        }}>
          <Flame className="w-4 h-4" style={{ color: '#E06C3A' }} />
          <span style={{ fontSize: 13, fontWeight: 700, color: '#E06C3A' }}>1 day streak</span>
        </div>
      </div>

      {/* ── Earnings Hero with Daily Goal Ring ── */}
      <div className="px-6 mb-2">
        <div style={{
          background: 'var(--navy)', borderRadius: 24,
          padding: '24px', position: 'relative', overflow: 'hidden',
        }}>
          <div className="absolute inset-0 flex items-center pointer-events-none" style={{ opacity: 0.06 }}>
            <Waveform color="#FFFFFF" opacity={1} height={80} />
          </div>

          <div className="relative z-10 flex items-center gap-6">
            {/* Daily Goal Ring */}
            <div style={{ position: 'relative', width: 100, height: 100, flexShrink: 0 }}>
              <svg width="100" height="100" viewBox="0 0 100 100">
                {/* Background ring */}
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                {/* Progress ring */}
                <motion.circle
                  cx="50" cy="50" r="42" fill="none"
                  stroke="#E06C3A" strokeWidth="6" strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 42}`}
                  strokeDashoffset={2 * Math.PI * 42 * (1 - totalEarned / dailyPotential)}
                  initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - totalEarned / dailyPotential) }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700, color: '#FFFFFF', lineHeight: 1 }}>
                  ₹{totalEarned}
                </p>
                <p style={{ fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>
                  of ₹{dailyPotential}
                </p>
              </div>
            </div>

            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)', marginBottom: 4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Daily Potential
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 34, fontWeight: 700, color: '#E06C3A', lineHeight: 1 }}>
                ₹{dailyPotential}
              </p>
              <p style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.4)', marginTop: 6 }}>
                You've unlocked ₹{totalEarned}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Welcome + motivation ── */}
      <div className="px-6 mb-5">
        <div className="flex items-center gap-3" style={{
          background: '#E6F4EC', borderRadius: 14, padding: '12px 16px',
          border: '1px solid #C5E1D0',
        }}>
          <TrendingUp className="w-5 h-5 flex-shrink-0" style={{ color: '#2D7A4F' }} />
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#1A5C35' }}>
              Your first ₹50 is in your wallet
            </p>
            <p style={{ fontSize: 11, fontWeight: 500, color: '#2D7A4F' }}>
              Complete 3 more quests to earn ₹50 withdrawal bonus
            </p>
          </div>
        </div>
      </div>

      {/* ── Start Your Next Quest ── */}
      <div className="px-6 mb-6">
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 700, color: '#1C2434', marginBottom: 3 }}>
          Recommended For You
        </h3>
        <p style={{ fontSize: 13, fontWeight: 500, color: '#8896A7', marginBottom: 14 }}>
          Easy quests matched to your voice calibration
        </p>

        <div className="space-y-3">
          {starterQuests.map((quest, idx) => (
            <motion.div
              key={quest.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.1, duration: 0.4 }}
              onClick={() => navigate(`/recording/${quest.id}`)}
              style={{
                background: '#FFFFFF', borderRadius: 18,
                border: '1px solid #E8EDF3', padding: '18px',
                cursor: 'pointer',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span style={{
                  fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999,
                  background: '#FEF0E8', color: '#8B3000',
                }}>
                  {quest.tag}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 style={{ fontSize: 15, fontWeight: 700, color: '#1C2434', marginBottom: 4 }}>
                    {quest.title}
                  </h4>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1" style={{ fontSize: 12, fontWeight: 500, color: '#8896A7' }}>
                      <Clock className="w-3.5 h-3.5" /> {quest.duration}
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700, color: '#E06C3A', lineHeight: 1 }}>
                    ₹{quest.cash}
                  </p>
                  <p style={{ fontSize: 11, fontWeight: 500, color: '#8896A7', marginTop: 2 }}>
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
            width: '100%', height: 60, borderRadius: 999,
            background: '#E06C3A', color: '#FFFFFF',
            fontSize: 17, fontWeight: 700, border: 'none', cursor: 'pointer',
            boxShadow: '0px 8px 24px rgba(224,108,58,0.30)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}
        >
          <Mic className="w-5 h-5" />
          Browse All Quests
        </motion.button>
      </div>

      {/* ── Unlock Milestones — gamification hook ── */}
      <div className="px-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Gift className="w-5 h-5" style={{ color: 'var(--accent-xp)' }} />
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 700, color: '#1C2434' }}>
            Locked Rewards
          </h3>
        </div>

        <div className="space-y-4">
          {lockedMilestones.map((milestone, idx) => (
            <div
              key={idx}
              style={{
                background: '#FFFFFF', borderRadius: 20,
                border: '1px solid #E8EDF3', padding: '18px 20px',
                display: 'flex', alignItems: 'center', gap: 16,
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 14,
                background: milestone.progress > 0 ? '#FFF0E8' : '#F0F4F8',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Lock className="w-5 h-5" style={{ color: milestone.progress > 0 ? '#E06C3A' : '#8896A7' }} />
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ fontSize: 14, fontWeight: 700, color: '#1C2434', marginBottom: 2 }}>
                  {milestone.label}
                </p>
                <p style={{ fontSize: 12, fontWeight: 500, color: '#8896A7' }}>
                  {milestone.reward}
                </p>
                {/* Mini progress */}
                <div className="mt-3" style={{ background: '#F0F4F8', borderRadius: 999, height: 5 }}>
                  <div style={{
                    background: '#E06C3A', borderRadius: 999, height: 5,
                    width: `${(milestone.progress / milestone.total) * 100}%`,
                    transition: 'width 0.5s ease',
                  }} />
                </div>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#1C2434', flexShrink: 0 }}>
                {milestone.progress}/{milestone.total}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── What Contributors Earn — social proof ── */}
      <div className="px-6">
        <div style={{
          background: '#FFFFFF', borderRadius: 18,
          border: '1px solid #E8EDF3', padding: '18px 20px',
        }}>
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4" style={{ color: '#8896A7' }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: '#8896A7' }}>
              What contributors earn weekly
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 700, color: '#1C2434' }}>₹250</p>
              <p style={{ fontSize: 10, fontWeight: 500, color: '#8896A7' }}>Casual (2h/wk)</p>
            </div>
            <div style={{ width: 1, height: 32, background: '#E8EDF3' }} />
            <div className="text-center flex-1">
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 700, color: '#C4622D' }}>₹1,200</p>
              <p style={{ fontSize: 10, fontWeight: 500, color: '#8896A7' }}>Active (8h/wk)</p>
            </div>
            <div style={{ width: 1, height: 32, background: '#E8EDF3' }} />
            <div className="text-center flex-1">
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 700, color: '#1C2434' }}>₹3,500+</p>
              <p style={{ fontSize: 10, fontWeight: 500, color: '#8896A7' }}>Power (20h/wk)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
