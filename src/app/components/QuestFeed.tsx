import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Clock, Mic, Languages, ArrowUpRight, Flame, Users, Timer, Star } from 'lucide-react';
import { Waveform } from './ui/Waveform';

const questCategories = [
  { id: 'all',          label: 'All Quests'   },
  { id: 'high-demand',  label: 'High Demand'  },
  { id: 'quick',        label: 'Quick Wins'   },
  { id: 'high-reward',  label: 'High Reward'  },
];

type QuestTag = 'high-demand' | 'bonus' | 'expiring' | 'limited' | 'new' | null;

interface Quest {
  id: string;
  title: string;
  description: string;
  cashPayout: number;
  xp: number;
  duration: string;
  clips: number;
  difficulty: string;
  category: string;
  language: string;
  tag: QuestTag;
  tagLabel?: string;
  slotsLeft?: number | null;
  featured?: boolean;
}

const quests: Quest[] = [
  {
    id: 'quest-1', title: 'Morning News Reading',
    description: 'Read 10 short news articles for natural language training',
    cashPayout: 15, xp: 150, duration: '8 min', clips: 10, difficulty: 'Easy', category: 'Reading',
    language: 'Hindi', tag: 'high-demand', tagLabel: '427 Hindi clips needed', slotsLeft: 18, featured: true,
  },
  {
    id: 'quest-2', title: 'Product Descriptions',
    description: 'Describe various products in natural, conversational tone',
    cashPayout: 25, xp: 200, duration: '12 min', clips: 15, difficulty: 'Medium', category: 'Description',
    language: 'Marathi', tag: 'bonus', tagLabel: '+20% Bonus Active',
  },
  {
    id: 'quest-3', title: 'Conversational Dialogue',
    description: 'Respond to prompts in a natural conversation style',
    cashPayout: 35, xp: 250, duration: '15 min', clips: 20, difficulty: 'Medium', category: 'Conversation',
    language: 'Hindi', tag: 'expiring', tagLabel: 'Campaign closes in 2h', slotsLeft: 7,
  },
  {
    id: 'quest-4', title: 'Short Story Narration',
    description: 'Narrate engaging short stories with emotion and clarity',
    cashPayout: 50, xp: 300, duration: '20 min', clips: 25, difficulty: 'Hard', category: 'Narration',
    language: 'English', tag: 'limited', tagLabel: '5 contributor spots left', slotsLeft: 5,
  },
  {
    id: 'quest-5', title: 'Quick Phrases',
    description: 'Record common phrases and expressions — fast and easy',
    cashPayout: 10, xp: 100, duration: '3 min', clips: 8, difficulty: 'Easy', category: 'Phrases',
    language: 'Marathi', tag: 'new', tagLabel: 'New Quest',
  },
];

const tagStyles: Record<string, { bg: string; text: string }> = {
  'high-demand': { bg: '#FEF0E8', text: '#8B3000' },
  'bonus':       { bg: '#F5F0DC', text: '#6B4800' },
  'expiring':    { bg: '#FDE8E8', text: '#8B0000' },
  'limited':     { bg: '#FDE8E8', text: '#8B0000' },
  'new':         { bg: '#E8EFF8', text: '#1E3A6E' },
};

const difficultyStyle: Record<string, { bg: string; text: string }> = {
  Easy:   { bg: '#E6F4EC', text: '#1A5C35' },
  Medium: { bg: '#FEF0E8', text: '#8B3000' },
  Hard:   { bg: '#FDE8E8', text: '#8B0000' },
};

function EmptyQuestFeed() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center px-8 py-16 relative" style={{ minHeight: '50vh' }}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div style={{ width: '80%' }}>
          <Waveform color="#D4744A" opacity={0.12} height={100} />
        </div>
      </div>
      <div className="relative z-10 flex flex-col items-center">
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 800, color: '#1C2434', textAlign: 'center', marginBottom: 12, lineHeight: 1.2 }}>
          New quests dropping soon
        </h2>
        <p style={{ fontSize: 14, fontWeight: 500, color: '#4A5568', textAlign: 'center', lineHeight: 1.65, maxWidth: 280, marginBottom: 8 }}>
          High-demand quests in <strong style={{ color: '#1C2434' }}>Hindi</strong> and <strong style={{ color: '#1C2434' }}>Marathi</strong> are coming. You'll be first to know.
        </p>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#C4622D', marginBottom: 32 }}>
          Turn on notifications to never miss a high-paying quest
        </p>
        <button
          onClick={() => navigate('/contributor/profile')}
          style={{
            background: 'transparent', color: '#C4622D', borderRadius: 999,
            padding: '13px 28px', fontSize: 14, fontWeight: 700,
            border: '1.5px solid #C4622D', cursor: 'pointer',
          }}
        >
          Update Language Preferences
        </button>
      </div>
    </div>
  );
}

export function QuestFeed() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [showEmpty, setShowEmpty] = useState(false);

  if (showEmpty) {
    return (
      <div className="min-h-screen" style={{ background: '#F8F9FA', fontFamily: 'var(--font-sans)' }}>
        <div className="px-6 pt-16 pb-4 flex items-center justify-between">
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 800, color: '#1C2434', letterSpacing: '-0.02em' }}>Available Quests</h1>
          <button onClick={() => setShowEmpty(false)} style={{ fontSize: 11, fontWeight: 600, color: '#8896A7', border: '1px solid #E8EDF3', borderRadius: 8, padding: '4px 10px' }}>
            Show quests
          </button>
        </div>
        <EmptyQuestFeed />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-6" style={{ background: '#F8F9FA', fontFamily: 'var(--font-sans)' }}>
      {/* Header */}
      <div className="px-6 pt-16 pb-2 flex items-center justify-between">
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 800, color: '#1C2434', letterSpacing: '-0.02em' }}>Available Quests</h1>
        <button onClick={() => setShowEmpty(true)} style={{ fontSize: 11, fontWeight: 600, color: '#8896A7', border: '1px solid #E8EDF3', borderRadius: 8, padding: '4px 10px' }}>
          Empty state
        </button>
      </div>

      <div className="px-6 pt-1 pb-4">
        <p style={{ fontSize: 14, fontWeight: 500, color: '#4A5568', marginTop: 4 }}>
          Earn cash instantly for every clip
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto px-6 pb-4 mb-2" style={{ scrollbarWidth: 'none' }}>
        {questCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              padding: '7px 18px', borderRadius: 999, fontSize: 13, fontWeight: 600,
              whiteSpace: 'nowrap', border: '1.5px solid',
              background: activeCategory === cat.id ? '#1C2434' : '#FFFFFF',
              borderColor: activeCategory === cat.id ? '#1C2434' : '#E8EDF3',
              color: activeCategory === cat.id ? '#FFFFFF' : '#4A5568',
              transition: 'all 0.15s',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Featured Quest — NAVY card with urgency */}
      <div className="px-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-4 h-4" style={{ color: '#C4622D' }} />
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 600, color: '#1C2434' }}>
            Highest Earning
          </h3>
        </div>
        <div
          onClick={() => navigate(`/recording/${quests[0].id}`)}
          style={{
            background: '#1A1F2E', borderRadius: 20, padding: '22px',
            cursor: 'pointer', position: 'relative', overflow: 'hidden',
          }}
        >
          <div className="absolute inset-0 pointer-events-none flex items-center">
            <Waveform color="#FAD4BC" opacity={0.04} height={60} />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span style={{ background: '#C4622D', color: '#FFFFFF', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 999 }}>
                FEATURED
              </span>
              <span className="flex items-center gap-1" style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>
                <Flame className="w-3 h-3" /> 427 Hindi clips needed
              </span>
              {quests[0].slotsLeft && (
                <span className="flex items-center gap-1" style={{ fontSize: 11, fontWeight: 600, color: '#C4622D' }}>
                  <Users className="w-3 h-3" /> {quests[0].slotsLeft} slots left
                </span>
              )}
            </div>

            <h4 style={{ fontSize: 20, fontWeight: 700, color: '#FFFFFF', marginBottom: 6 }}>
              {quests[0].title}
            </h4>
            <p style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5, marginBottom: 16 }}>
              {quests[0].description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* THE HOOK: earning per time */}
                <div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700, color: '#C4622D', lineHeight: 1 }}>
                    ₹{quests[0].cashPayout}
                  </p>
                  <p style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>
                    in {quests[0].duration}
                  </p>
                </div>
              </div>
              <button style={{
                width: 48, height: 48, borderRadius: 14,
                background: '#C4622D', border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', boxShadow: '0px 4px 12px rgba(196,98,45,0.3)',
              }}>
                <ArrowUpRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* All Quests — Card list with urgency/scarcity */}
      <div className="px-6">
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 600, color: '#1C2434', marginBottom: 14 }}>
          All Quests
        </h3>
        <div className="space-y-3">
          {quests.map((quest) => {
            const diff = difficultyStyle[quest.difficulty];
            const ts = quest.tag ? tagStyles[quest.tag] : null;
            return (
              <div
                key={quest.id}
                onClick={() => navigate(`/recording/${quest.id}`)}
                style={{
                  background: '#FFFFFF', borderRadius: 18,
                  border: '1px solid #E8EDF3', padding: '18px',
                  cursor: 'pointer',
                }}
              >
                {/* Tags row */}
                {(quest.tag || quest.slotsLeft) && (
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    {ts && quest.tagLabel && (
                      <span style={{
                        fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999,
                        background: ts.bg, color: ts.text,
                      }}>
                        {quest.tagLabel}
                      </span>
                    )}
                    <span style={{
                      fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999,
                      background: diff.bg, color: diff.text,
                    }}>
                      {quest.difficulty}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex-1 pr-4">
                    <h4 style={{ fontSize: 15, fontWeight: 700, color: '#1C2434', marginBottom: 6 }}>
                      {quest.title}
                    </h4>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="flex items-center gap-1" style={{ fontSize: 12, fontWeight: 500, color: '#8896A7' }}>
                        <Clock className="w-3.5 h-3.5" /> {quest.duration}
                      </span>
                      <span className="flex items-center gap-1" style={{ fontSize: 12, fontWeight: 500, color: '#8896A7' }}>
                        <Mic className="w-3.5 h-3.5" /> {quest.clips} clips
                      </span>
                      <span className="flex items-center gap-1" style={{ fontSize: 12, fontWeight: 500, color: '#8896A7' }}>
                        <Languages className="w-3.5 h-3.5" /> {quest.language}
                      </span>
                    </div>
                  </div>

                  {/* Earning hook */}
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 700, color: '#C4622D', lineHeight: 1 }}>
                      ₹{quest.cashPayout}
                    </p>
                    <p style={{ fontSize: 11, fontWeight: 500, color: '#8896A7', marginTop: 3 }}>
                      in {quest.duration}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}