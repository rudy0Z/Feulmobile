import { Clock, IndianRupee, CheckCircle, TrendingUp, ArrowRight, BarChart3, Plus, Target, AlertTriangle, TrendingDown } from 'lucide-react';
import { FeulLogo } from '../ui/FeulLogo';
import { Waveform } from '../ui/Waveform';
import { useState } from 'react';

const campaigns = [
  { id: 1, name: 'Customer Service Dataset',  progress: 85, clips: 850,  target: 1000, status: 'Active', budget: 18000 },
  { id: 2, name: 'Product Review Collection', progress: 62, clips: 310,  target: 500,  status: 'Active', budget: 7500  },
  { id: 3, name: 'Navigation Commands',       progress: 94, clips: 470,  target: 500,  status: 'Active', budget: 9000  },
  { id: 4, name: 'Multi-language Greetings',  progress: 45, clips: 225,  target: 500,  status: 'Active', budget: 6000  },
];

/* Campaign underperformance — cold-start failure state */
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

export function QuestCreatorDashboard() {
  const [showUnderperform, setShowUnderperform] = useState(false);

  return (
    <div className="min-h-screen pb-6" style={{ background: '#F8F9FA', fontFamily: 'var(--font-sans)' }}>

      {/* ── Header ── */}
      <div className="px-6 pt-8 pb-4 flex items-center justify-between">
        <FeulLogo />
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowUnderperform(!showUnderperform)}
            style={{ fontSize: 11, fontWeight: 600, color: '#8896A7', border: '1px solid #E8EDF3', borderRadius: 8, padding: '4px 10px' }}
          >
            {showUnderperform ? 'Hide alert' : 'Underperform'}
          </button>
          <div style={{
            fontSize: 11, fontWeight: 700, color: '#1C2434',
            border: '1.5px solid #E8EDF3', borderRadius: 8, padding: '4px 10px',
            letterSpacing: '0.04em',
          }}>
            LIVE
          </div>
        </div>
      </div>

      {/* ── Hero — Ink-Navy Command Center (same surface as all roles) ── */}
      <div className="px-6 mb-6">
        <div style={{
          background: '#1A1F2E',
          borderRadius: 22,
          padding: '24px 24px 20px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Waveform texture — white, unified */}
          <div className="absolute inset-0 flex items-center pointer-events-none" style={{ opacity: 0.07 }}>
            <Waveform color="#FFFFFF" opacity={1} height={96} variant="data" />
          </div>

          <div className="relative z-10">
            {/* Role pill — muted slate, the ONLY role-specific color */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
              <Target className="w-3.5 h-3.5" style={{ color: '#6B7394' }} strokeWidth={2} />
              <span style={{ fontSize: 11, fontWeight: 700, color: '#6B7394', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Command Center
              </span>
            </div>

            {/* Dataset progress — hero number */}
            <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)', marginBottom: 6, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Overall Dataset Progress
            </p>

            <div className="flex items-end gap-5" style={{ marginBottom: 14 }}>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 54,
                fontWeight: 700,
                color: '#FFFFFF',
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}>
                75%
              </p>
              <div style={{ marginBottom: 10 }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>1,855</p>
                <p style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.35)' }}>of 2,500 clips</p>
              </div>
            </div>

            {/* Progress track */}
            <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 999, height: 5, marginBottom: 16 }}>
              <div style={{
                background: '#C4622D',
                borderRadius: 999, height: 5, width: '75%',
              }} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" style={{ color: '#C4622D' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: '#C4622D' }}>
                  +12% this week
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.35)' }}>
                  4 active campaigns
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Metric Cards — neutral with semantic colors only ── */}
      <div className="px-6 mb-7">
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Clock,       value: '48.5h',  label: 'Audio Hours',  color: '#1C2434' },
            { icon: CheckCircle, value: '92%',    label: 'Pass Rate',    color: '#2D7A4F' },
            { icon: IndianRupee, value: '₹1.8L', label: 'Budget Used',  color: '#1C2434' },
          ].map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.label}
                style={{
                  background: '#FFFFFF',
                  borderRadius: 16,
                  border: '1px solid #E8EDF3',
                  padding: '18px 10px',
                  textAlign: 'center',
                }}
              >
                <div style={{
                  width: 38, height: 38, borderRadius: 11,
                  background: '#F0F4F8',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 10px',
                }}>
                  <Icon className="w-4 h-4" style={{ color: '#8896A7' }} />
                </div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 19, fontWeight: 700, color: m.color, marginBottom: 3 }}>
                  {m.value}
                </p>
                <p style={{ fontSize: 10, fontWeight: 600, color: '#8896A7', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {m.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {showUnderperform && (
        <div className="px-6 mb-6">
          <div style={{
            background: '#FFF8F8', borderRadius: 18,
            border: '1px solid #F5C5C5',
            borderLeft: '4px solid #C0392B',
            padding: '20px',
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
                <h4 style={{ fontSize: 15, fontWeight: 700, color: '#1C2434', marginBottom: 2 }}>
                  Campaign Underperforming
                </h4>
                <p style={{ fontSize: 13, fontWeight: 500, color: '#4A5568', lineHeight: 1.5 }}>
                  {underperformingCampaign.name}
                </p>
              </div>
            </div>

            {/* Stats */}
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

            {/* Suggestions */}
            <div style={{
              background: 'rgba(255,255,255,0.8)', borderRadius: 12, padding: '14px',
            }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#8896A7', marginBottom: 8, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Suggested Fixes
              </p>
              {underperformingCampaign.suggestions.map((s, idx) => (
                <div key={idx} className="flex items-start gap-2 mb-2 last:mb-0">
                  <span style={{ fontSize: 12, color: '#C4622D', fontWeight: 700, marginTop: 1 }}>•</span>
                  <p style={{ fontSize: 12, fontWeight: 500, color: '#4A5568', lineHeight: 1.5 }}>{s}</p>
                </div>
              ))}
            </div>

            <button style={{
              marginTop: 14, width: '100%', padding: '12px', borderRadius: 999,
              background: '#C4622D', color: '#FFFFFF',
              fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer',
              boxShadow: '0px 3px 12px rgba(196,98,45,0.25)',
            }}>
              Adjust Campaign Settings
            </button>
          </div>
        </div>
      )}

      {/* ── Active Campaigns ── */}
      <div className="px-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" style={{ color: '#1C2434' }} strokeWidth={1.75} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 700, color: '#1C2434' }}>
              Active Campaigns
            </h3>
          </div>
          <button className="flex items-center gap-1" style={{ fontSize: 13, fontWeight: 700, color: '#C4622D' }}>
            View All <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 18,
            border: '1px solid #E8EDF3',
            overflow: 'hidden',
          }}
        >
          {campaigns.map((campaign, idx) => (
            <div
              key={campaign.id}
              style={{
                padding: '18px 18px 16px',
                borderBottom: idx < campaigns.length - 1 ? '1px solid #E8EDF3' : 'none',
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1C2434', flex: 1, paddingRight: 12 }}>
                  {campaign.name}
                </h4>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{
                    fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700,
                    color: '#1C2434', lineHeight: 1, marginBottom: 4,
                  }}>
                    {campaign.progress}%
                  </p>
                  <p style={{ fontSize: 11, fontWeight: 500, color: '#8896A7' }}>
                    {campaign.clips}/{campaign.target}
                  </p>
                </div>
              </div>

              {/* Progress bar — brand orange for all */}
              <div style={{ background: '#F0F4F8', borderRadius: 999, height: 5 }}>
                <div
                  style={{
                    background: '#C4622D',
                    borderRadius: 999, height: 5,
                    width: `${campaign.progress}%`,
                    transition: 'width 0.5s ease',
                  }}
                />
              </div>

              {/* Budget */}
              <div className="flex items-center gap-1 mt-3">
                <IndianRupee className="w-3 h-3" style={{ color: '#8896A7' }} />
                <span style={{ fontSize: 11, fontWeight: 500, color: '#8896A7' }}>
                  Budget: ₹{campaign.budget.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Create Campaign CTA — brand orange ── */}
        <button
          style={{
            marginTop: 20, width: '100%', height: 56, borderRadius: 999,
            background: '#C4622D',
            color: '#FFFFFF',
            fontSize: 15, fontWeight: 700, border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: '0px 6px 24px rgba(196,98,45,0.30)',
          }}
        >
          <Plus className="w-5 h-5" />
          Create New Campaign
        </button>
      </div>
    </div>
  );
}