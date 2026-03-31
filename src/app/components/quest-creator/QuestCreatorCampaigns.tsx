import { useState } from 'react';
import { Play, Pause, Users, Clock, TrendingUp, IndianRupee, Plus, BarChart2 } from 'lucide-react';
import { FeulLogo } from '../ui/FeulLogo';
import { Waveform } from '../ui/Waveform';

const campaigns = [
  { id: 1, name: 'Customer Service Dataset',  status: 'Active', progress: 85, clips: 850,  target: 1000, contributors: 45, avgQuality: 92, daysLeft: 12, budget: 25000, spent: 21250 },
  { id: 2, name: 'Product Review Collection', status: 'Active', progress: 62, clips: 310,  target: 500,  contributors: 28, avgQuality: 88, daysLeft: 18, budget: 15000, spent: 9300  },
  { id: 3, name: 'Navigation Commands',       status: 'Active', progress: 94, clips: 470,  target: 500,  contributors: 32, avgQuality: 95, daysLeft: 5,  budget: 12500, spent: 11750 },
  { id: 4, name: 'Multi-language Greetings',  status: 'Active', progress: 45, clips: 225,  target: 500,  contributors: 19, avgQuality: 90, daysLeft: 25, budget: 18000, spent: 8100  },
  { id: 5, name: 'Technical Support Scripts', status: 'Paused', progress: 30, clips: 150,  target: 500,  contributors: 12, avgQuality: 87, daysLeft: 30, budget: 20000, spent: 6000  },
];

const filters = ['All Campaigns', 'Active', 'Paused', 'Completed'];

export function QuestCreatorCampaigns() {
  const [activeFilter, setActiveFilter] = useState('All Campaigns');

  const filtered = activeFilter === 'All Campaigns'
    ? campaigns
    : campaigns.filter(c => c.status === activeFilter);

  return (
    <div className="min-h-screen pb-6" style={{ background: '#F8F9FA', fontFamily: 'var(--font-sans)' }}>

      {/* ── Header ── */}
      <div className="px-6 pt-8 pb-4 flex items-center justify-between">
        <FeulLogo />
      </div>

      {/* ── Title ── */}
      <div className="px-6 pb-5">
        <div className="flex items-center gap-2 mb-1">
          <BarChart2 className="w-4 h-4" style={{ color: '#1C2434' }} strokeWidth={2} />
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 800, color: '#1C2434', letterSpacing: '-0.02em' }}>
            Campaign Manager
          </h1>
        </div>
        <p style={{ fontSize: 14, fontWeight: 500, color: '#4A5568' }}>Manage and monitor all your campaigns</p>

        <div style={{ marginTop: 12, opacity: 0.12 }}>
          <Waveform color="#1C2434" opacity={1} height={28} variant="data" />
        </div>
      </div>

      {/* ── Filter Pills ── */}
      <div className="flex gap-2 overflow-x-auto px-6 pb-4 mb-2" style={{ scrollbarWidth: 'none' }}>
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            style={{
              padding: '7px 18px', borderRadius: 999,
              fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', border: '1.5px solid',
              background: activeFilter === filter ? '#1C2434' : '#FFFFFF',
              borderColor: activeFilter === filter ? '#1C2434' : '#E8EDF3',
              color: activeFilter === filter ? '#FFFFFF' : '#4A5568',
              transition: 'all 0.15s',
            }}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* ── Campaign List ── */}
      <div className="px-6 space-y-3">
        {filtered.map((campaign) => {
          const isPaused = campaign.status === 'Paused';

          if (isPaused) {
            return (
              <div
                key={campaign.id}
                className="flex items-center justify-between"
                style={{
                  padding: '14px 16px',
                  background: '#FFFFFF',
                  borderRadius: 14,
                  border: '1px solid #E8EDF3',
                  opacity: 0.75,
                }}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1C2434' }}>{campaign.name}</h4>
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 999,
                      background: '#FEF7E6', color: '#6B4800',
                    }}>
                      Paused
                    </span>
                  </div>
                  <p style={{ fontSize: 12, fontWeight: 500, color: '#8896A7' }}>
                    {campaign.clips} / {campaign.target} clips · {campaign.progress}%
                  </p>
                </div>
                <button style={{
                  padding: '8px 18px', borderRadius: 999,
                  background: '#C4622D', color: '#FFFFFF',
                  fontSize: 12, fontWeight: 700, border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 6,
                  boxShadow: '0px 3px 10px rgba(196,98,45,0.25)',
                }}>
                  <Play className="w-3.5 h-3.5 fill-white" />
                  Resume
                </button>
              </div>
            );
          }

          return (
            <div
              key={campaign.id}
              style={{
                background: '#FFFFFF',
                borderRadius: 18,
                border: '1px solid #E8EDF3',
                padding: '20px',
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 700, color: '#1C2434', flex: 1, paddingRight: 12 }}>
                  {campaign.name}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                  <p style={{
                    fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 700, color: '#1C2434',
                  }}>
                    {campaign.progress}%
                  </p>
                  <button style={{
                    width: 38, height: 38, borderRadius: '50%',
                    background: '#F0F4F8', border: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                  }}>
                    <Pause className="w-4 h-4" style={{ color: '#8896A7' }} />
                  </button>
                </div>
              </div>

              {/* Status + clips */}
              <div className="flex items-center gap-2 mb-4">
                <span style={{
                  fontSize: 11, fontWeight: 700, padding: '3px 12px', borderRadius: 999,
                  background: '#F0F4F8', color: '#1C2434',
                }}>
                  Active
                </span>
                <span style={{ fontSize: 12, fontWeight: 500, color: '#8896A7' }}>
                  {campaign.clips.toLocaleString()} / {campaign.target.toLocaleString()} clips
                </span>
              </div>

              {/* Progress bar */}
              <div style={{ background: '#F0F4F8', borderRadius: 999, height: 6, marginBottom: 16 }}>
                <div style={{
                  background: '#C4622D',
                  borderRadius: 999, height: 6,
                  width: `${campaign.progress}%`,
                  transition: 'width 0.5s ease',
                }} />
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-4 gap-2" style={{ borderTop: '1px solid #E8EDF3', paddingTop: 14 }}>
                {[
                  { icon: Users,       value: campaign.contributors,                       label: 'Contributors' },
                  { icon: TrendingUp,  value: `${campaign.avgQuality}%`,                   label: 'Quality'      },
                  { icon: Clock,       value: `${campaign.daysLeft}d`,                     label: 'Remaining'    },
                  { icon: IndianRupee, value: `₹${(campaign.spent / 1000).toFixed(1)}k`,  label: 'Spent'        },
                ].map((s) => {
                  const SIcon = s.icon;
                  return (
                    <div key={s.label} style={{ textAlign: 'center' }}>
                      <SIcon className="w-3.5 h-3.5 mx-auto mb-1" style={{ color: '#8896A7' }} />
                      <p style={{ fontSize: 13, fontWeight: 700, color: '#1C2434' }}>{s.value}</p>
                      <p style={{ fontSize: 10, fontWeight: 500, color: '#8896A7' }}>{s.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Create CTA — brand orange ── */}
      <div className="px-6 mt-6">
        <button style={{
          width: '100%', height: 56, borderRadius: 999,
          background: '#C4622D',
          color: '#FFFFFF',
          fontSize: 15, fontWeight: 700, border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          boxShadow: '0px 6px 24px rgba(196,98,45,0.30)',
        }}>
          <Plus className="w-5 h-5" />
          Create New Campaign
        </button>
      </div>
    </div>
  );
}
