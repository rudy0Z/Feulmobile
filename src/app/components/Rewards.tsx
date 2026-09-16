import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Award, Lock, Check, ChevronLeft, Zap, Clock, BadgeCheck, Sparkles } from 'lucide-react';
import { useSession } from '../lib/session';

/**
 * Recognition — NOT a store. There is no spendable currency here.
 * Perks unlock through Standing (reliable, accepted work over time) and are
 * explicitly non-monetary: they never compete with, or convert into, the ₹ wallet.
 * Badges mark milestones already reached; perks are access & speed, not payouts.
 */

const STANDING_NAMES = ['', 'New', 'Verified', 'Trusted', 'Elite'];

interface Perk {
  id: string;
  name: string;
  description: string;
  icon: 'zap' | 'clock' | 'badge' | 'sparkles';
  /** Standing level (1–4) at which this perk becomes available. */
  unlocksAt: number;
}

const PERKS: Perk[] = [
  { id: 'verified-badge', name: 'Verified profile badge', description: 'A verified mark on your profile so labs know your work is trusted.', icon: 'badge', unlocksAt: 2 },
  { id: 'early-access',   name: 'Early access to campaigns', description: 'See and claim new high-coverage campaigns a day before they open widely.', icon: 'zap', unlocksAt: 3 },
  { id: 'priority-review', name: 'Priority review', description: 'Your submitted clips move to the front of the review queue — settle sooner.', icon: 'clock', unlocksAt: 3 },
  { id: 'elite-circle',   name: 'Elite contributor circle', description: 'Direct line to the labs that commission the work, and a say in what gets built next.', icon: 'sparkles', unlocksAt: 4 },
];

interface Badge {
  id: string;
  name: string;
  detail: string;
  earned: boolean;
}

const BADGES: Badge[] = [
  { id: 'first-clip',   name: 'First recording',    detail: 'Recorded your first clip',        earned: true  },
  { id: 'hundred',      name: '100 clips',          detail: 'Recorded 100 accepted clips',      earned: true  },
  { id: 'clarity',      name: 'Clarity master',     detail: '95%+ acceptance across 50 clips',  earned: true  },
  { id: 'multilingual', name: 'Two languages',      detail: 'Contributed in 2+ languages',      earned: false },
];

const PERK_ICONS = { zap: Zap, clock: Clock, badge: BadgeCheck, sparkles: Sparkles };

export function Rewards() {
  const navigate = useNavigate();
  const { profile } = useSession();
  const standingLevel = profile?.standing?.level ?? 1;
  const reliability = profile?.standing?.reliability ?? 0;

  useEffect(() => {
    let sx = 0;
    const onStart = (e: TouchEvent) => { sx = e.touches[0].clientX; };
    const onEnd   = (e: TouchEvent) => { if (e.changedTouches[0].clientX - sx > 72 && sx < 56) navigate(-1); };
    document.addEventListener('touchstart', onStart);
    document.addEventListener('touchend',   onEnd);
    return () => {
      document.removeEventListener('touchstart', onStart);
      document.removeEventListener('touchend',   onEnd);
    };
  }, [navigate]);

  const activatePerk = (perk: Perk) => {
    navigate('/contributor/rewards/claim', {
      state: { perk: { id: perk.id, name: perk.name, description: perk.description } },
    });
  };

  const earnedBadges = BADGES.filter(b => b.earned).length;

  const card: React.CSSProperties = {
    background: 'var(--surface-raised)',
    borderRadius: 'var(--r-md)',
    border: '1px solid var(--border-subtle)',
    boxShadow: 'var(--e-0)',
  };

  return (
    <div className="min-h-screen pb-28" style={{ background: 'var(--surface-ground)', fontFamily: 'var(--font-ui)' }}>

      {/* Header */}
      <div className="px-6 pt-14 pb-4">
        <button
          onClick={() => navigate(-1)}
          style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--action-primary)', padding: 'var(--space-2) 0', marginBottom: 'var(--space-3)'}}
        >
          <ChevronLeft style={{ width: 22, height: 22 }} strokeWidth={2.5} />
        </button>
        <h1 style={{ fontSize: 'var(--fs-display)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 'var(--space-1)'}}>
          Recognition
        </h1>
        <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-secondary)' }}>
          What reliable work has earned you — perks and standing, not payouts.
        </p>
      </div>

      {/* Standing block — the ONE r-lg hero object on this screen */}
      <div className="px-6 mb-7">
        <div style={{
          background: 'var(--surface-raised)',
          borderRadius: 'var(--r-lg)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--e-2)',
          padding: 'var(--space-9) var(--space-10)',
        }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-8)'}}>
            <div>
              <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 'var(--space-3)'}}>
                Your standing
              </p>
              <p style={{ fontSize: 'var(--fs-display)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1, letterSpacing: '-0.02em' }}>
                {STANDING_NAMES[standingLevel]}
              </p>
            </div>
            <div style={{ width: 52, height: 52, borderRadius: 'var(--r-md)', background: 'var(--action-primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Award className="w-7 h-7" style={{ color: 'var(--action-primary)' }} strokeWidth={1.75} />
            </div>
          </div>
          {/* Reliability meter */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)'}}>
            <span style={{ fontSize: 'var(--fs-caption)', fontWeight: 600, color: 'var(--text-secondary)' }}>Reliability</span>
            <span style={{ fontSize: 'var(--fs-caption)', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-number)' }}>{reliability}%</span>
          </div>
          <div style={{ height: 8, borderRadius: 'var(--r-full)', background: 'var(--surface-sunken)', overflow: 'hidden' }}>
            <div style={{ width: `${Math.max(4, reliability)}%`, height: '100%', borderRadius: 'var(--r-full)', background: 'var(--state-settled)' }} />
          </div>
          <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', marginTop: 'var(--space-6)', lineHeight: 1.5 }}>
            Standing rises with on-time, accepted work. It unlocks the perks below — it is not money and can&apos;t be withdrawn.
          </p>
        </div>
      </div>

      {/* Perks */}
      <div className="px-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4" style={{ color: 'var(--action-primary)' }} />
          <h3 style={{ fontSize: 'var(--fs-subhead)', fontWeight: 700, color: 'var(--text-primary)' }}>Perks</h3>
        </div>
        <div className="space-y-3">
          {PERKS.map((perk) => {
            const Icon = PERK_ICONS[perk.icon];
            const unlocked = standingLevel >= perk.unlocksAt;
            return (
              <div
                key={perk.id}
                style={{
                  ...card,
                  padding: 'var(--space-8)',
                  display: 'flex', alignItems: 'flex-start', gap: 'var(--space-7)',
                  opacity: unlocked ? 1 : 0.92,
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 'var(--r-md)', flexShrink: 0,
                  background: unlocked ? 'var(--action-primary-soft)' : 'var(--surface-sunken)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon className="w-5 h-5" style={{ color: unlocked ? 'var(--action-primary)' : 'var(--text-faint)' }} strokeWidth={1.9} />
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-1)'}}>{perk.name}</p>
                  <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 'var(--space-6)'}}>{perk.description}</p>
                  {unlocked ? (
                    <button
                      onClick={() => activatePerk(perk)}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 'var(--space-3)',
                        fontSize: 'var(--fs-secondary)', fontWeight: 700, padding: '0 var(--space-9)',
                        minHeight: 'var(--tap)', borderRadius: 'var(--r-full)', border: 'none', cursor: 'pointer',
                        background: 'var(--action-primary)', color: 'var(--text-on-accent)',
                      }}
                    >
                      Activate
                    </button>
                  ) : (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-3)'}}>
                      <Lock className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
                      <span style={{ fontSize: 'var(--fs-caption)', fontWeight: 600, color: 'var(--text-muted)' }}>
                        Unlocks at {STANDING_NAMES[perk.unlocksAt]} standing
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges */}
      <div className="px-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BadgeCheck className="w-4 h-4" style={{ color: 'var(--action-primary)' }} />
            <h3 style={{ fontSize: 'var(--fs-subhead)', fontWeight: 700, color: 'var(--text-primary)' }}>Badges</h3>
          </div>
          <span style={{ fontSize: 'var(--fs-caption)', fontWeight: 600, color: 'var(--text-muted)', fontFamily: 'var(--font-number)' }}>
            {earnedBadges}/{BADGES.length}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {BADGES.map((badge) => (
            <div
              key={badge.id}
              style={{
                ...card,
                padding: 'var(--space-8)',
                opacity: badge.earned ? 1 : 0.6,
                background: badge.earned ? 'var(--surface-raised)' : 'var(--surface-sunken)',
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 'var(--r-full)', marginBottom: 'var(--space-6)',
                background: 'var(--surface-sunken)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {badge.earned
                  ? <Check className="w-5 h-5" style={{ color: 'var(--state-settled)' }} strokeWidth={2.5} />
                  : <Lock className="w-4 h-4" style={{ color: 'var(--text-faint)' }} />}
              </div>
              <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-1)'}}>{badge.name}</p>
              <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', lineHeight: 1.4 }}>{badge.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
