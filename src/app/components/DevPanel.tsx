import { motion, AnimatePresence } from 'motion/react';
import { X, RefreshCw, ShieldAlert, AlertTriangle, Mic, Swords, Users, MicOff, CloudOff, CreditCard, Timer, Lock, ShieldCheck, MapPin, CalendarX, PhoneOff, UserX, Flame, Scale, BatteryLow } from 'lucide-react';
import { router } from '../routes';
import { useDevContext, OverlayId, GradingMethodId } from '../lib/DevContext';
import { SpoofingVerificationHold } from './SpoofingVerificationHold';
import { DPDPConsentRevocation } from './DPDPConsentRevocation';
import { AcousticNoisePause } from './AcousticNoisePause';
import { RoleCollisionLockout } from './RoleCollisionLockout';
import { MicPermissionDenied } from './MicPermissionDenied';
import { ClipUploadFailed } from './ClipUploadFailed';
import { PaymentFailed } from './PaymentFailed';
import { BatchExpired } from './BatchExpired';
import { DailyLimitReached } from './DailyLimitReached';

/* ── Toggle Row ──────────────────────────────────────── */
function ToggleRow({
  label, sublabel, value, onChange,
}: {
  label: string; sublabel?: string; value: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!value)}
      style={{
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: 'var(--space-5) var(--space-8)', borderRadius: 'var(--r-sm)', border: 'none', cursor: 'pointer',
        background: value ? 'rgba(var(--terracotta-500-rgb),0.10)' : 'rgba(var(--bone-0-rgb),0.04)',
        textAlign: 'left', transition: 'background 0.15s',
      }}
    >
      <div>
        <div style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: value ? 'var(--action-primary)' : 'rgba(var(--bone-0-rgb),0.75)' }}>
          {label}
        </div>
        {sublabel && (
          <div style={{ fontSize: 'var(--fs-caption)', color: 'rgba(var(--bone-0-rgb),0.35)', marginTop: 'var(--space-0)', fontFamily: 'var(--font-number)' }}>
            {sublabel}
          </div>
        )}
      </div>
      {/* Toggle pill */}
      <div
        style={{
          width: 40, height: 22, borderRadius: 'var(--r-full)', flexShrink: 0,
          background: value ? 'var(--action-primary)' : 'rgba(var(--bone-0-rgb),0.12)',
          position: 'relative', transition: 'background 0.2s',
        }}
      >
        <div
          style={{
            position: 'absolute', top: 3, borderRadius: '50%',
            width: 16, height: 16, background: 'var(--surface-raised)',
            left: value ? 21 : 3,
            transition: 'left 0.2s cubic-bezier(0.34,1.56,0.64,1)',
            boxShadow: '0 1px 4px rgba(var(--scrim-rgb),0.3)',
          }}
        />
      </div>
    </button>
  );
}

/* ── Launch Row ────────────────────────────────────────
   `accent` is a CSS colour *value* (a token), never a raw hex. Tints are
   composed with color-mix() so the palette stays in theme.css. ── */
function LaunchRow({
  icon: Icon, label, sublabel, accent, onLaunch,
}: {
  icon: React.ElementType; label: string; sublabel: string; accent: string; onLaunch: () => void;
}) {
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 'var(--space-6)',
        padding: 'var(--space-5) var(--space-8)', borderRadius: 'var(--r-sm)',
        background: 'rgba(var(--bone-0-rgb),0.04)',
      }}
    >
      <div style={{
        width: 36, height: 36, borderRadius: 'var(--r-sm)', flexShrink: 0,
        background: `color-mix(in srgb, ${accent} 12%, transparent)`,
        border: `1px solid color-mix(in srgb, ${accent} 26%, transparent)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon style={{ width: 16, height: 16, color: accent }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 'var(--fs-caption)', fontWeight: 600, color: 'rgba(var(--bone-0-rgb),0.75)', lineHeight: 1.3 }}>{label}</div>
        <div style={{ fontSize: 'var(--fs-caption)', color: 'rgba(var(--bone-0-rgb),0.30)', fontFamily: 'var(--font-number)', marginTop: 'var(--space-0)'}}>{sublabel}</div>
      </div>
      <button
        onClick={onLaunch}
        style={{
          padding: 'var(--space-2) var(--space-6)', borderRadius: 'var(--r-full)', flexShrink: 0,
          background: `color-mix(in srgb, ${accent} 16%, transparent)`,
          border: `1px solid color-mix(in srgb, ${accent} 32%, transparent)`,
          color: accent, fontSize: 'var(--fs-caption)', fontWeight: 700,
          fontFamily: 'var(--font-number)', cursor: 'pointer', letterSpacing: '0.04em',
        }}
      >
        LAUNCH
      </button>
    </div>
  );
}

/* ── Grading Method Selector (DEV-ONLY) ──────────────────
   The shipping validator surface always renders the segmented instrument;
   this previews the alternative grading controls without exposing an in-app
   style switcher. Applied on next grading-session open. */
const GRADING_METHODS: { id: GradingMethodId; label: string }[] = [
  { id: 'segmented', label: 'Segmented' },
  { id: 'pills',     label: 'Pills' },
  { id: 'arc',       label: 'Arc' },
  { id: 'keyboard',  label: 'Keys' },
  { id: 'binary',    label: 'Binary' },
];

function MethodSelector() {
  const dev = useDevContext();
  return (
    <div style={{ padding: 'var(--space-5) var(--space-8)', borderRadius: 'var(--r-sm)', background: 'rgba(var(--bone-0-rgb),0.04)' }}>
      <div style={{ fontSize: 'var(--fs-caption)', fontWeight: 600, color: 'rgba(var(--bone-0-rgb),0.55)', marginBottom: 'var(--space-4)'}}>
        Grading Method
      </div>
      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        {GRADING_METHODS.map(m => (
          <button
            key={m.id}
            onClick={() => dev.setGradingMethod(m.id)}
            style={{
              padding: 'var(--space-2) var(--space-5)', borderRadius: 'var(--r-xs)', fontSize: 'var(--fs-caption)', fontWeight: 700,
              border: `1px solid ${dev.gradingMethod === m.id ? 'rgba(var(--terracotta-500-rgb),0.5)' : 'rgba(var(--bone-0-rgb),0.08)'}`,
              background: dev.gradingMethod === m.id ? 'rgba(var(--terracotta-500-rgb),0.18)' : 'transparent',
              color: dev.gradingMethod === m.id ? 'var(--action-primary)' : 'rgba(var(--bone-0-rgb),0.4)',
              cursor: 'pointer', transition: 'background-color 0.15s ease-out, border-color 0.15s ease-out, color 0.15s ease-out, transform 0.15s ease-out',
            }}
          >
            {m.label}
          </button>
        ))}
      </div>
      <div style={{ fontSize: 'var(--fs-caption)', color: 'rgba(var(--bone-0-rgb),0.25)', marginTop: 'var(--space-3)', fontFamily: 'var(--font-number)' }}>
        dev-only · applied on next grading session open
      </div>
    </div>
  );
}

/* ── Section Header ──────────────────────────────────── */
function SectionHeader({ label }: { label: string }) {
  return (
    <div style={{
      fontSize: 'var(--fs-caption)', fontWeight: 800, color: 'rgba(var(--bone-0-rgb),0.25)',
      letterSpacing: '0.12em', textTransform: 'uppercase',
      fontFamily: 'var(--font-number)', marginBottom: 'var(--space-3)', paddingLeft: 'var(--space-2)',
    }}>
      {label}
    </div>
  );
}

/* ── Overlay Host (renders inside phone frame) ───────── */
export function DevOverlayHost() {
  const dev = useDevContext();
  return (
    <AnimatePresence>
      {dev.activeOverlay === 'spoofing' && (
        <SpoofingVerificationHold
          key="dev-spoofing"
          onClose={dev.dismissOverlay}
          onVerified={dev.dismissOverlay}
        />
      )}
      {dev.activeOverlay === 'dpdp' && (
        <DPDPConsentRevocation
          key="dev-dpdp"
          onClose={dev.dismissOverlay}
          onRevoked={dev.dismissOverlay}
        />
      )}
      {dev.activeOverlay === 'noise' && (
        <AcousticNoisePause
          key="dev-noise"
          onClose={dev.dismissOverlay}
          onResume={dev.dismissOverlay}
        />
      )}
      {dev.activeOverlay === 'collision' && (
        <RoleCollisionLockout
          key="dev-collision"
          onClose={dev.dismissOverlay}
          onSwitchRole={dev.dismissOverlay}
        />
      )}
      {dev.activeOverlay === 'mic-denied' && (
        <MicPermissionDenied
          key="dev-mic-denied"
          onClose={dev.dismissOverlay}
          onRetry={dev.dismissOverlay}
        />
      )}
      {dev.activeOverlay === 'upload-failed' && (
        <ClipUploadFailed
          key="dev-upload-failed"
          onClose={dev.dismissOverlay}
          onRetry={dev.dismissOverlay}
          onSaveDraft={dev.dismissOverlay}
        />
      )}
      {dev.activeOverlay === 'payment-failed' && (
        <PaymentFailed
          key="dev-payment-failed"
          onClose={dev.dismissOverlay}
          onRetry={dev.dismissOverlay}
        />
      )}
      {dev.activeOverlay === 'batch-expired' && (
        <BatchExpired
          key="dev-batch-expired"
          onClose={dev.dismissOverlay}
          onPickNew={dev.dismissOverlay}
        />
      )}
      {dev.activeOverlay === 'daily-limit' && (
        <DailyLimitReached
          key="dev-daily-limit"
          onClose={dev.dismissOverlay}
          onViewEarnings={dev.dismissOverlay}
        />
      )}
    </AnimatePresence>
  );
}

/* ── Dev Panel Menu (renders outside phone frame) ────── */
export function DevPanel() {
  const dev = useDevContext();

  // DevPanel is mounted outside the RouterProvider, so useNavigate() isn't
  // available here — drive the router instance directly instead.
  const jump = (path: string) => { dev.closePanel(); router.navigate(path); };

  return (
    <>
      {/* ── Panel sheet ── */}
      <AnimatePresence>
        {dev.isPanelOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="dev-backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={dev.closePanel}
              style={{ position: 'fixed', inset: 0, zIndex: 8000, background: 'rgba(var(--scrim-rgb),0.55)' }}
            />

            {/* Sheet */}
            <motion.div
              key="dev-sheet"
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 360, damping: 36 }}
              style={{
                position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                width: '100%', maxWidth: 412,
                zIndex: 8001,
                background: 'var(--surface-studio)',
                borderRadius: 'var(--r-lg) var(--r-lg) 0 0',
                boxShadow: '0 -8px 48px rgba(var(--scrim-rgb),0.6)',
                maxHeight: '76vh',
                display: 'flex', flexDirection: 'column',
              }}
            >
              {/* Handle + header */}
              <div style={{ padding: 'var(--space-6) var(--space-8) 0', flexShrink: 0 }}>
                <div style={{ width: 36, height: 3, borderRadius: 'var(--r-full)', background: 'rgba(var(--bone-0-rgb),0.12)', margin: '0 auto 14px' }} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-7)'}}>
                  <div>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 'var(--space-3)',
                      padding: 'var(--space-1) var(--space-4)', borderRadius: 'var(--r-xs)',
                      background: 'rgba(var(--terracotta-500-rgb),0.15)', border: '1px solid rgba(var(--terracotta-500-rgb),0.25)',
                      marginBottom: 'var(--space-2)',
                    }}>
                      <span style={{ fontFamily: 'var(--font-number)', fontSize: 'var(--fs-caption)', fontWeight: 800, color: 'var(--action-primary)', letterSpacing: '0.1em' }}>
                        DEV MODE
                      </span>
                    </div>
                    <div style={{ fontSize: 'var(--fs-body)', fontWeight: 800, color: 'var(--text-on-dark)', fontFamily: 'var(--font-ui)' }}>
                      State Controls
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--space-4)'}}>
                    <button
                      onClick={dev.resetAll}
                      title="Reset all"
                      style={{
                        width: 32, height: 32, borderRadius: 'var(--r-xs)', border: 'none',
                        background: 'rgba(var(--bone-0-rgb),0.06)', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      <RefreshCw style={{ width: 14, height: 14, color: 'rgba(var(--bone-0-rgb),0.45)' }} />
                    </button>
                    <button
                      onClick={dev.closePanel}
                      style={{
                        width: 32, height: 32, borderRadius: 'var(--r-xs)', border: 'none',
                        background: 'rgba(var(--bone-0-rgb),0.06)', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      <X style={{ width: 14, height: 14, color: 'rgba(var(--bone-0-rgb),0.45)' }} />
                    </button>
                  </div>
                </div>

                {/* Active state badges */}
                {(dev.homeState !== 'auto' || dev.tierLockBypassed || dev.walletEmpty || dev.questsEmpty || dev.forceNoisePause || dev.validatorHomeEmpty || dev.validatorTasksEmpty || dev.validatorWalletEmpty) && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', marginBottom: 'var(--space-7)'}}>
                    {dev.homeState !== 'auto'  && <ActiveBadge label={`Home: ${dev.homeState}`} />}
                    {dev.tierLockBypassed      && <ActiveBadge label="Tier Bypassed" />}
                    {dev.walletEmpty           && <ActiveBadge label="Wallet Empty" />}
                    {dev.questsEmpty           && <ActiveBadge label="Quests Empty" />}
                    {dev.forceNoisePause       && <ActiveBadge label="Noise Trigger" />}
                    {dev.validatorHomeEmpty    && <ActiveBadge label="V·Home Empty" />}
                    {dev.validatorTasksEmpty   && <ActiveBadge label="V·Tasks Empty" />}
                    {dev.validatorWalletEmpty  && <ActiveBadge label="V·Wallet Empty" />}
                  </div>
                )}
              </div>

              {/* Scrollable content */}
              <div style={{ overflowY: 'auto', padding: '0 var(--space-8) var(--space-12)', flex: 1 }}>

                {/* ── Contributor States ── */}
                <div style={{ marginBottom: 'var(--space-9)'}}>
                  <SectionHeader label="Contributor" />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)'}}>
                    {/* Home data state — same dashboard, different data (§ amended Pass 3) */}
                    <div style={{ padding: '8px 12px 10px' }}>
                      <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 700, color: 'rgba(var(--bone-0-rgb),0.85)' }}>Home Data State</p>
                      <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'rgba(var(--bone-0-rgb),0.4)', marginBottom: 'var(--space-4)'}}>
                        Same dashboard · auto follows the profile
                      </p>
                      <div style={{ display: 'flex', gap: 'var(--space-3)'}}>
                        {([
                          { id: 'auto', label: 'Auto' },
                          { id: 'empty', label: 'Empty' },
                          { id: 'pending', label: 'Pending' },
                          { id: 'live', label: 'Live' },
                        ] as const).map(s => {
                          const active = dev.homeState === s.id;
                          return (
                            <button
                              key={s.id}
                              onClick={() => dev.setHomeState(s.id)}
                              style={{
                                flex: 1, padding: 'var(--space-3) var(--space-2)', borderRadius: 'var(--r-full)',
                                fontSize: 'var(--fs-caption)', fontWeight: 700, cursor: 'pointer',
                                border: '1px solid',
                                background: active ? 'var(--action-primary-pressed)' : 'transparent',
                                borderColor: active ? 'var(--action-primary-pressed)' : 'rgba(var(--bone-0-rgb),0.16)',
                                color: active ? 'var(--text-on-dark)' : 'rgba(var(--bone-0-rgb),0.6)',
                              }}
                            >
                              {s.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <ToggleRow
                      label="Bypass Tier Lock"
                      sublabel="Withdraw → payout directly"
                      value={dev.tierLockBypassed}
                      onChange={v => dev.setToggle('tierLockBypassed', v)}
                    />
                    <ToggleRow
                      label="Wallet Empty State"
                      sublabel="No transactions, zero balance"
                      value={dev.walletEmpty}
                      onChange={v => dev.setToggle('walletEmpty', v)}
                    />
                    <ToggleRow
                      label="Quests Empty State"
                      sublabel="No available quests"
                      value={dev.questsEmpty}
                      onChange={v => dev.setToggle('questsEmpty', v)}
                    />
                    <ToggleRow
                      label="Force Noise Detection"
                      sublabel="Triggers on recording start"
                      value={dev.forceNoisePause}
                      onChange={v => dev.setToggle('forceNoisePause', v)}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-3)'}}>
                    <LaunchRow
                      icon={ShieldCheck}
                      label="Room Consent Roll-Call"
                      sublabel="C-01/C-10 · on-tape consent + minor gate"
                      accent="var(--state-settled)"
                      onLaunch={() => jump('/contributor/room-consent')}
                    />
                    <LaunchRow
                      icon={Users}
                      label="Coverage Full → Redirect"
                      sublabel="C-02 · quota met, redirect to rarity"
                      accent="var(--state-settled)"
                      onLaunch={() => jump('/contributor/coverage-full')}
                    />
                    <LaunchRow
                      icon={CalendarX}
                      label="Campaign Closed (honoured)"
                      sublabel="C-03/C-16 · filled or lab withdrew"
                      accent="var(--state-pending)"
                      onLaunch={() => jump('/contributor/campaign-closed')}
                    />
                    <LaunchRow
                      icon={MapPin}
                      label="Dialect Mismatch → base pay"
                      sublabel="C-07 · rarity bonus removed, honest"
                      accent="var(--state-pending)"
                      onLaunch={() => jump('/contributor/dialect-mismatch')}
                    />
                    <LaunchRow
                      icon={PhoneOff}
                      label="Session Interrupted"
                      sublabel="C-04 · 19-min take saved, resume in 24h"
                      accent="var(--state-settled)"
                      onLaunch={() => jump('/contributor/session-interrupted')}
                    />
                    <LaunchRow
                      icon={UserX}
                      label="Silent Room Participant"
                      sublabel="C-08 · 4-lane review, one voice missing"
                      accent="var(--state-pending)"
                      onLaunch={() => jump('/contributor/silent-room')}
                    />
                    <LaunchRow
                      icon={Flame}
                      label="Campaign Oversubscribed"
                      sublabel="C-21 · slots tick down → Filled"
                      accent="var(--state-pending)"
                      onLaunch={() => jump('/contributor/campaign-oversubscribed')}
                    />
                    <LaunchRow
                      icon={Scale}
                      label="Quality Grade Dispute"
                      sublabel="C-09 · 7-day appeal → 3rd reviewer"
                      accent="var(--state-pending)"
                      onLaunch={() => jump('/contributor/quality-dispute')}
                    />
                    <LaunchRow
                      icon={BatteryLow}
                      label="Battery Warning (Brief)"
                      sublabel="C-15 · low battery before room take"
                      accent="var(--state-pending)"
                      onLaunch={() => jump('/contributor/battery-warning')}
                    />
                  </div>
                </div>

                {/* ── Validator States ── */}
                <div style={{ marginBottom: 'var(--space-9)'}}>
                  <SectionHeader label="Validator" />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)'}}>
                    <ToggleRow
                      label="Home Empty State"
                      sublabel="No pending batch — all caught up"
                      value={dev.validatorHomeEmpty}
                      onChange={v => dev.setToggle('validatorHomeEmpty', v)}
                    />
                    <ToggleRow
                      label="Tasks Empty State"
                      sublabel="No available grading tasks"
                      value={dev.validatorTasksEmpty}
                      onChange={v => dev.setToggle('validatorTasksEmpty', v)}
                    />
                    <ToggleRow
                      label="Wallet Empty State"
                      sublabel="No earnings yet"
                      value={dev.validatorWalletEmpty}
                      onChange={v => dev.setToggle('validatorWalletEmpty', v)}
                    />
                  </div>
                  <div style={{ marginTop: 'var(--space-4)'}}>
                    <MethodSelector />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-3)'}}>
                    <LaunchRow
                      icon={Users}
                      label="Disagreement Escalation"
                      sublabel="C-17 · Grading → two reviewers disagree"
                      accent="var(--state-pending)"
                      onLaunch={() => jump('/validator/disagreement/dev')}
                    />
                    <LaunchRow
                      icon={ShieldAlert}
                      label="Accuracy Warning + Throttle"
                      sublabel="C-18 · agreement drop → queue slowed"
                      accent="var(--state-pending)"
                      onLaunch={() => jump('/validator/accuracy-warning')}
                    />
                  </div>
                </div>

                {/* ── Technical Failure Overlays ── */}
                <div style={{ marginBottom: 'var(--space-9)'}}>
                  <SectionHeader label="Technical Failures" />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)'}}>
                    <LaunchRow
                      icon={MicOff}
                      label="Mic Permission Denied"
                      sublabel="Recording → browser blocked mic access"
                      accent="var(--state-failed-on-studio)"
                      onLaunch={() => dev.launchOverlay('mic-denied')}
                    />
                    <LaunchRow
                      icon={CloudOff}
                      label="Clip Upload Failed"
                      sublabel="Post-record → ERR_NETWORK_TIMEOUT"
                      accent="var(--state-failed-on-studio)"
                      onLaunch={() => dev.launchOverlay('upload-failed')}
                    />
                    <LaunchRow
                      icon={CreditCard}
                      label="Payment Failed"
                      sublabel="Payout → UPI gateway timeout"
                      accent="var(--state-failed-on-studio)"
                      onLaunch={() => dev.launchOverlay('payment-failed')}
                    />
                    <LaunchRow
                      icon={Timer}
                      label="Batch Session Expired"
                      sublabel="Grading → held too long, released"
                      accent="var(--state-pending-on-studio)"
                      onLaunch={() => dev.launchOverlay('batch-expired')}
                    />
                    <LaunchRow
                      icon={Lock}
                      label="Daily Limit Reached"
                      sublabel="Recording → clip quota exhausted"
                      accent="var(--text-muted)"
                      onLaunch={() => dev.launchOverlay('daily-limit')}
                    />
                  </div>
                </div>

                {/* ── Flow & Edge-Case Overlays ── */}
                <div style={{ marginBottom: 'var(--space-4)'}}>
                  <SectionHeader label="Flow & Edge-Case Overlays" />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)'}}>
                    <LaunchRow
                      icon={ShieldAlert}
                      label="Spoofing Verification Hold"
                      sublabel="Payout → Step 2 biometric check"
                      accent="var(--action-primary)"
                      onLaunch={() => dev.launchOverlay('spoofing')}
                    />
                    <LaunchRow
                      icon={AlertTriangle}
                      label="DPDP Consent Revocation"
                      sublabel="Profile → Revoke Consent"
                      accent="var(--state-failed-on-studio)"
                      onLaunch={() => dev.launchOverlay('dpdp')}
                    />
                    <LaunchRow
                      icon={Mic}
                      label="Acoustic Noise Pause"
                      sublabel="Recording → ambient noise detected"
                      accent="var(--state-pending-on-studio)"
                      onLaunch={() => dev.launchOverlay('noise')}
                    />
                    <LaunchRow
                      icon={Swords}
                      label="Role Collision Lockout"
                      sublabel="Grading → policy violation block"
                      accent="var(--state-failed-on-studio)"
                      onLaunch={() => dev.launchOverlay('collision')}
                    />
                    <LaunchRow
                      icon={Users}
                      label="Consensus Mismatch"
                      sublabel="Grading → grade differs from peers"
                      accent="var(--state-pending-on-studio)"
                      onLaunch={() => dev.launchOverlay('consensus')}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </>
  );
}

function ActiveBadge({ label }: { label: string }) {
  return (
    <div style={{
      padding: 'var(--space-1) var(--space-4)', borderRadius: 'var(--r-xs)',
      background: 'rgba(var(--terracotta-500-rgb),0.15)', border: '1px solid rgba(var(--terracotta-500-rgb),0.3)',
      fontSize: 'var(--fs-caption)', fontWeight: 700, color: 'var(--action-primary)',
      fontFamily: 'var(--font-number)',
    }}>
      {label}
    </div>
  );
}
