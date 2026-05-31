import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, TrendingUp, Mic2, Activity, Languages, CheckCircle2 } from 'lucide-react';
import { tierName } from '../lib/tier';

const metrics = [
  {
    id: 'acceptance',
    label: 'Acceptance Rate',
    value: '94%',
    delta: '+3% vs last month',
    deltaPositive: true,
    description: 'Share of submissions approved by validators',
    icon: CheckCircle2,
    tint: '#E6F4EC',
    iconColor: '#1A5C35',
  },
  {
    id: 'quality',
    label: 'Audio Quality Score',
    value: '8.6 / 10',
    delta: '+0.4 vs last month',
    deltaPositive: true,
    description: 'Signal clarity, noise floor, mic technique',
    icon: Mic2,
    tint: '#FFF0E8',
    iconColor: '#C4622D',
  },
  {
    id: 'consistency',
    label: 'Consistency Score',
    value: '7.9 / 10',
    delta: 'Steady',
    deltaPositive: true,
    description: 'Reliability across recent submissions',
    icon: Activity,
    tint: '#E8EFF8',
    iconColor: '#1E3A6E',
  },
];

const languageExpertise = [
  { language: 'Hindi',    accepted: 142, level: 'Expert',     bar: 0.92 },
  { language: 'Marathi',  accepted:  47, level: 'Proficient', bar: 0.62 },
  { language: 'English',  accepted:  18, level: 'Developing', bar: 0.28 },
];

export function Performance() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-12" style={{ background: '#F8F9FA', fontFamily: 'var(--font-sans)' }}>
      {/* Header */}
      <div className="px-6 pt-16 pb-2 flex items-center gap-4">
        <button
          onClick={() => navigate('/contributor/profile')}
          style={{
            width: 40, height: 40, borderRadius: '50%',
            background: '#FFFFFF', border: '1px solid #E8EDF3',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0px 6px 18px rgba(28,36,52,0.05), inset 0px 1px 0px rgba(255,255,255,0.65)', cursor: 'pointer',
          }}
        >
          <ArrowLeft className="w-5 h-5" style={{ color: '#1C2434' }} />
        </button>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 800, color: '#1C2434' }}>
            Performance
          </h1>
          <p style={{ fontSize: 12, fontWeight: 500, color: '#8896A7' }}>How you compare to last month</p>
        </div>
      </div>

      {/* Hero — trust tier + total accepted */}
      <div className="px-6 mt-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            background: 'radial-gradient(ellipse at 20% 35%, rgba(224,108,58,0.17) 0%, transparent 55%), linear-gradient(150deg, #0F1822 0%, #0A0C10 100%)',
            borderRadius: 24,
            padding: '22px 22px',
            boxShadow: '0px 12px 40px rgba(0,0,0,0.22), inset 0 0 0 0.5px rgba(255,255,255,0.06)',
          }}
        >
          <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
            Total Accepted Contributions
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 44, fontWeight: 700, color: '#FFFFFF', lineHeight: 1, marginBottom: 6, letterSpacing: '-0.02em' }}>
            207
          </p>
          <p style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.45)' }}>
            clips contributed to live datasets as a{' '}
            <span style={{ color: 'oklch(0.63 0.25 34)', fontWeight: 700 }}>{tierName(3)}</span>
          </p>
        </motion.div>
      </div>

      {/* Metric cards */}
      <div className="px-6 space-y-3 mb-6">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.08 + idx * 0.06 }}
              style={{
                background: '#FFFFFF',
                borderRadius: 18,
                border: '1px solid #EDF0F5',
                padding: '18px',
                boxShadow: '0px 6px 18px rgba(28,36,52,0.05), inset 0px 1px 0px rgba(255,255,255,0.65)',
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div style={{
                  width: 38, height: 38, borderRadius: 11,
                  background: m.tint,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Icon className="w-4.5 h-4.5" style={{ color: m.iconColor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#1C2434' }}>{m.label}</p>
                  <p style={{ fontSize: 11, fontWeight: 500, color: '#8896A7', lineHeight: 1.45 }}>{m.description}</p>
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 26, fontWeight: 700, color: '#1C2434', letterSpacing: '-0.01em' }}>
                  {m.value}
                </p>
                <span className="flex items-center gap-1" style={{
                  fontSize: 11, fontWeight: 700,
                  color: m.deltaPositive ? '#1A5C35' : '#8B0000',
                }}>
                  <TrendingUp className="w-3 h-3" />
                  {m.delta}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Language expertise */}
      <div className="px-6">
        <div className="flex items-center gap-2 mb-3">
          <Languages className="w-5 h-5" style={{ color: '#1C2434' }} />
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 700, color: '#1C2434' }}>
            Language Expertise
          </h2>
        </div>
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 18,
            border: '1px solid #EDF0F5',
            padding: '18px',
            boxShadow: '0px 6px 18px rgba(28,36,52,0.05), inset 0px 1px 0px rgba(255,255,255,0.65)',
          }}
        >
          {languageExpertise.map((lang, idx) => (
            <div
              key={lang.language}
              style={{
                paddingTop: idx === 0 ? 0 : 14,
                paddingBottom: idx === languageExpertise.length - 1 ? 0 : 14,
                borderBottom: idx < languageExpertise.length - 1 ? '1px solid #F2F5F9' : 'none',
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#1C2434' }}>{lang.language}</p>
                  <p style={{ fontSize: 11, fontWeight: 500, color: '#8896A7' }}>{lang.accepted} accepted clips</p>
                </div>
                <span style={{
                  fontSize: 11, fontWeight: 700,
                  padding: '4px 12px', borderRadius: 999,
                  background: lang.bar > 0.8 ? '#E6F4EC' : lang.bar > 0.5 ? '#FFF0E8' : '#F0F4F8',
                  color:      lang.bar > 0.8 ? '#1A5C35' : lang.bar > 0.5 ? '#8B3000' : '#4A5568',
                }}>
                  {lang.level}
                </span>
              </div>
              <div style={{ background: '#F0F4F8', borderRadius: 999, height: 6 }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${lang.bar * 100}%` }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.3 + idx * 0.1 }}
                  style={{
                    background: 'linear-gradient(90deg, oklch(0.63 0.25 34), #FF9D6C)',
                    borderRadius: 999, height: 6,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 11, fontWeight: 500, color: '#8896A7', textAlign: 'center', marginTop: 14, lineHeight: 1.5 }}>
          Expertise grows with every accepted clip in a given language.
        </p>
      </div>
    </div>
  );
}
