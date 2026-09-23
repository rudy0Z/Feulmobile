import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  Award, Lock, Check, ShieldCheck, Zap, Globe, Rocket, Handshake,
  Target, Layers, ChevronLeft,
} from 'lucide-react';

// Validator Recognition
// Reconceived (M4): no XP-as-money, no vouchers, no "redeem". Standing is competence —
// perks and badges unlock through accuracy + volume. They are recognition, NOT currency:
// they can't be bought and they never touch the ₹ wallet. Validator accent = verdigris
// (verification / trust earned over time).

const standing = {
  level: 4,
  title: 'Trusted Validator',
  accuracy: 96.2,          // % agreement with consensus
  clipsValidated: 2840,
  nextLevel: 5,
  nextTitle: 'Senior Validator',
  clipsToNext: 3500,       // volume gate for next standing
};

interface Perk {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  unlockedAtLevel: number;
}

// Perks unlock automatically by standing level — never purchased.
const perks: Perk[] = [
  { id: 'p-1', name: 'Priority batch access',   description: 'See and claim new grading batches before they open to everyone.', icon: Zap,     unlockedAtLevel: 3 },
  { id: 'p-2', name: 'Extra queue language',     description: 'Add another language you’re fluent in to your grading queue.', icon: Globe,   unlockedAtLevel: 4 },
  { id: 'p-3', name: 'Early access: new formats', description: 'Grade new task types (room, interview) as they roll out.',        icon: Rocket,  unlockedAtLevel: 6 },
  { id: 'p-4', name: 'Direct lab visibility',    description: 'Labs recruiting reviewers can see your standing and reach out.',    icon: Handshake, unlockedAtLevel: 8 },
];

interface Badge {
  id: string;
  name: string;
  icon: React.ElementType;
  earned: boolean;
  hint: string;
}

// Badges are earned recognition — milestones, not a store.
const badges: Badge[] = [
  { id: 'b-1', name: 'First 100 validated',  icon: Check,       earned: true,  hint: 'Graded your first 100 clips' },
  { id: 'b-2', name: 'Accuracy held',        icon: Target,      earned: true,  hint: 'Held 95%+ accuracy for a full month' },
  { id: 'b-3', name: '1,000 validated',      icon: Layers,      earned: true,  hint: 'Graded 1,000 clips' },
  { id: 'b-4', name: 'Dialect specialist',   icon: ShieldCheck, earned: false, hint: 'Grade 500 clips in a single dialect' },
];

const cardStyle: React.CSSProperties = {
  background: 'var(--surface-raised)',
  borderRadius: 'var(--r-md)',
  border: '1px solid var(--border-subtle)',
};

export function ValidatorRewards() {
  const navigate = useNavigate();

  useEffect(() => {
    let sx = 0;
    const onStart = (e: TouchEvent) => { sx = e.touches[0].clientX; };
    const onEnd = (e: TouchEvent) => { if (e.changedTouches[0].clientX - sx > 72 && sx < 56) navigate(-1); };
    document.addEventListener('touchstart', onStart);
    document.addEventListener('touchend', onEnd);
    return () => { document.removeEventListener('touchstart', onStart); document.removeEventListener('touchend', onEnd); };
  }, [navigate]);

  const volumePct = Math.min(100, (standing.clipsValidated / standing.clipsToNext) * 100);

  return (
    <div className="min-h-screen pb-6" style={{ background: 'var(--surface-ground)', fontFamily: 'var(--font-ui)' }}>

      {/* Header */}
      <div className="px-6 pt-14 pb-4">
        <button
          onClick={() => navigate(-1)}
          style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--action-primary)', padding: 'var(--space-2) 0', marginBottom: 'var(--space-3)'}}
        >
          <ChevronLeft style={{ width: 22, height: 22 }} strokeWidth={2.5} />
        </button>
        <h1 style={{ fontSize: 'var(--fs-title)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 'var(--space-1)'}}>
          Recognition
        </h1>
        <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-secondary)' }}>
          Standing you’ve earned by grading well — not money, status.
        </p>
      </div>

      {/* Standing card — the single --r-lg hero */}
      <div className="px-6 mb-4">
        <div style={{
          ...cardStyle,
          borderRadius: 'var(--r-lg)',
          boxShadow: 'var(--e-2)',
          padding: 'var(--space-9) var(--space-10)',
          borderLeft: '1px solid var(--state-settled)',
        }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 'var(--space-3)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Level {standing.level} · Standing
              </p>
              <p style={{ fontSize: 'var(--fs-title)', fontWeight: 800, color: 'var(--state-settled-deep)', lineHeight: 1.1 }}>
                {standing.title}
              </p>
              <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', marginTop: 'var(--space-3)'}}>
                Recognition unlocks through accuracy &amp; volume — never expires
              </p>
            </div>
            <div style={{ width: 52, height: 52, borderRadius: 'var(--r-md)', background: 'var(--state-settled-container)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ShieldCheck className="w-7 h-7" style={{ color: 'var(--state-settled-deep)' }} />
            </div>
          </div>

          {/* Two competence figures — accuracy + volume, no currency */}
          <div className="flex gap-3 mb-4">
            <div style={{ flex: 1, background: 'var(--surface-sunken)', borderRadius: 'var(--r-md)', padding: '12px 14px' }}>
              <p className="tabular" style={{ fontSize: 'var(--fs-title)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>{standing.accuracy}%</p>
              <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', marginTop: 'var(--space-2)'}}>Accuracy vs consensus</p>
            </div>
            <div style={{ flex: 1, background: 'var(--surface-sunken)', borderRadius: 'var(--r-md)', padding: '12px 14px' }}>
              <p className="tabular" style={{ fontSize: 'var(--fs-title)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>{standing.clipsValidated.toLocaleString()}</p>
              <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', marginTop: 'var(--space-2)'}}>Clips validated</p>
            </div>
          </div>

          {/* Progress to next standing (volume-gated) */}
          <div style={{ borderTop: '1px solid var(--divider)', paddingTop: 'var(--space-7)'}}>
            <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-4)'}}>
              <span style={{ fontSize: 'var(--fs-secondary)', fontWeight: 700, color: 'var(--state-settled-deep)' }}>
                Next: {standing.nextTitle}
              </span>
              <span className="tabular" style={{ fontSize: 'var(--fs-caption)', fontWeight: 500, color: 'var(--text-muted)' }}>
                {standing.clipsValidated.toLocaleString()} / {standing.clipsToNext.toLocaleString()} clips
              </span>
            </div>
            <div style={{ background: 'var(--divider)', borderRadius: 'var(--r-full)', height: 6, overflow: 'hidden' }}>
              <div style={{ background: 'var(--state-settled)', borderRadius: 'var(--r-full)', height: 6, width: `${volumePct}%`, transition: 'width 0.6s var(--ease)' }} />
            </div>
            <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', marginTop: 'var(--space-3)'}}>
              {(standing.clipsToNext - standing.clipsValidated).toLocaleString()} more clips at 95%+ accuracy to reach Level {standing.nextLevel}
            </p>
          </div>
        </div>
      </div>

      {/* Honest framing strip */}
      <div className="px-6 mb-6">
        <div style={{ background: 'var(--surface-sunken)', borderRadius: 'var(--r-md)', padding: 'var(--space-6) var(--space-8)', border: '1px solid var(--border-subtle)' }}>
          <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Perks and badges are recognition, not currency. You can’t buy them, and they never
            touch your ₹ wallet — your earnings live entirely on the Wallet tab.
          </p>
        </div>
      </div>

      {/* ── Perks (unlock by standing) ── */}
      <div className="px-6 mb-8">
        <h3 style={{ fontSize: 'var(--fs-section)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-2)'}}>Perks</h3>
        <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', marginBottom: 'var(--space-7)'}}>Unlock automatically as your standing rises.</p>
        <div className="grid grid-cols-2 gap-3">
          {perks.map((perk) => {
            const Icon = perk.icon;
            const unlocked = standing.level >= perk.unlockedAtLevel;
            return (
              <div
                key={perk.id}
                style={{
                  ...cardStyle,
                  padding: 'var(--space-8)',
                  opacity: unlocked ? 1 : 0.72,
                  borderColor: unlocked ? 'var(--state-settled)' : 'var(--border-subtle)',
                  background: unlocked ? 'var(--surface-raised)' : 'var(--surface-sunken)',
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div style={{ width: 40, height: 40, borderRadius: 'var(--r-md)', background: unlocked ? 'var(--state-settled-container)' : 'var(--divider)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {unlocked
                      ? <Icon className="w-5 h-5" style={{ color: 'var(--state-settled-deep)' }} strokeWidth={1.9} />
                      : <Lock className="w-4 h-4" style={{ color: 'var(--text-faint)' }} />}
                  </div>
                  {unlocked
                    ? <span className="flex items-center gap-1" style={{ fontSize: 'var(--fs-caption)', fontWeight: 700, color: 'var(--state-settled-deep)' }}><Check className="w-3 h-3" />Active</span>
                    : <span style={{ fontSize: 'var(--fs-caption)', fontWeight: 600, color: 'var(--text-muted)' }}>Level {perk.unlockedAtLevel}</span>}
                </div>
                <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-2)'}}>{perk.name}</p>
                <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.45 }}>{perk.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Badges (earned recognition) ── */}
      <div className="px-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-4 h-4" style={{ color: 'var(--state-settled-deep)' }} />
          <h3 style={{ fontSize: 'var(--fs-section)', fontWeight: 700, color: 'var(--text-primary)' }}>Badges</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.id}
                style={{
                  ...cardStyle, padding: 'var(--space-8)',
                  display: 'flex', alignItems: 'center', gap: 'var(--space-6)',
                  opacity: badge.earned ? 1 : 0.72,
                }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 'var(--r-full)', background: badge.earned ? 'var(--state-settled-container)' : 'var(--divider)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {badge.earned
                    ? <Icon className="w-5 h-5" style={{ color: 'var(--state-settled-deep)' }} strokeWidth={1.9} />
                    : <Lock className="w-4 h-4" style={{ color: 'var(--text-faint)' }} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 700, color: 'var(--text-primary)' }}>{badge.name}</p>
                  <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', lineHeight: 1.4, marginTop: 'var(--space-1)'}}>{badge.hint}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Keep grading CTA ── */}
      <div className="px-6">
        <div style={{
          background: 'var(--state-settled-container)',
          borderRadius: 'var(--r-md)',
          border: '1px solid var(--state-settled)',
          padding: 'var(--space-10)',
          textAlign: 'center',
        }}>
          <ShieldCheck className="w-10 h-10 mx-auto mb-3" style={{ color: 'var(--state-settled-deep)' }} strokeWidth={1.5} />
          <h3 style={{ fontSize: 'var(--fs-section)', fontWeight: 800, color: 'var(--state-settled-deep)', marginBottom: 'var(--space-4)'}}>
            Grade well, rise faster
          </h3>
          <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 'var(--space-9)'}}>
            High accuracy and steady volume raise your standing and open new perks. Your pay is
            unchanged — same work, same rate.
          </p>
          <button
            onClick={() => navigate('/validator/tasks')}
            style={{
              background: 'var(--state-settled-deep)', color: 'var(--text-on-accent)',
              padding: 'var(--space-6) var(--space-12)', borderRadius: 'var(--r-full)',
              fontSize: 'var(--fs-secondary)', fontWeight: 700, border: 'none', cursor: 'pointer',
            }}
          >
            Open Tasks
          </button>
        </div>
      </div>
    </div>
  );
}
