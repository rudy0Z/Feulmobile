import { motion, AnimatePresence } from 'motion/react';
import { X, RefreshCw, ShieldAlert, AlertTriangle, Coins, Mic, Swords, Users, MicOff, CloudOff, CreditCard, Timer, Lock } from 'lucide-react';
import { useDevContext, OverlayId, GradingMethodId } from '../lib/DevContext';
import { SpoofingVerificationHold } from './SpoofingVerificationHold';
import { DPDPConsentRevocation } from './DPDPConsentRevocation';
import { SilverTierReserveDrawer } from './SilverTierReserveDrawer';
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
        padding: '11px 16px', borderRadius: 12, border: 'none', cursor: 'pointer',
        background: value ? 'rgba(var(--accent-glow-rgb),0.10)' : 'rgba(255,255,255,0.04)',
        textAlign: 'left', transition: 'background 0.15s',
      }}
    >
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: value ? 'var(--accent-primary)' : 'rgba(255,255,255,0.75)' }}>
          {label}
        </div>
        {sublabel && (
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 1, fontFamily: 'var(--font-mono)' }}>
            {sublabel}
          </div>
        )}
      </div>
      {/* Toggle pill */}
      <div
        style={{
          width: 40, height: 22, borderRadius: 999, flexShrink: 0,
          background: value ? 'var(--accent-primary)' : 'rgba(255,255,255,0.12)',
          position: 'relative', transition: 'background 0.2s',
        }}
      >
        <div
          style={{
            position: 'absolute', top: 3, borderRadius: '50%',
            width: 16, height: 16, background: '#FFFFFF',
            left: value ? 21 : 3,
            transition: 'left 0.2s cubic-bezier(0.34,1.56,0.64,1)',
            boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
          }}
        />
      </div>
    </button>
  );
}

/* ── Launch Row ──────────────────────────────────────── */
function LaunchRow({
  icon: Icon, label, sublabel, accentColor, onLaunch,
}: {
  icon: React.ElementType; label: string; sublabel: string; accentColor: string; onLaunch: () => void;
}) {
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '10px 16px', borderRadius: 12,
        background: 'rgba(255,255,255,0.04)',
      }}
    >
      <div style={{
        width: 36, height: 36, borderRadius: 12, flexShrink: 0,
        background: `${accentColor}18`, border: `1px solid ${accentColor}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon style={{ width: 16, height: 16, color: accentColor }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.75)', lineHeight: 1.3 }}>{label}</div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.30)', fontFamily: 'var(--font-mono)', marginTop: 1 }}>{sublabel}</div>
      </div>
      <button
        onClick={onLaunch}
        style={{
          padding: '5px 12px', borderRadius: 999, flexShrink: 0,
          background: `${accentColor}20`, border: `1px solid ${accentColor}40`,
          color: accentColor, fontSize: 11, fontWeight: 700,
          fontFamily: 'var(--font-mono)', cursor: 'pointer', letterSpacing: '0.04em',
        }}
      >
        LAUNCH
      </button>
    </div>
  );
}

/* ── Method Selector ─────────────────────────────────── */
const GRADING_METHODS: { id: GradingMethodId; label: string }[] = [
  { id: 'binary',    label: 'Binary' },
  { id: 'segmented', label: 'Segmented' },
  { id: 'pills',     label: 'Pills' },
  { id: 'arc',       label: 'Arc' },
  { id: 'keyboard',  label: 'Keys' },
];

function MethodSelector() {
  const dev = useDevContext();
  return (
    <div style={{ padding: '10px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.04)' }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.55)', marginBottom: 8 }}>
        Grading Method
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {GRADING_METHODS.map(m => (
          <button
            key={m.id}
            onClick={() => dev.setGradingMethod(m.id)}
            style={{
              padding: '5px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700,
              border: `1px solid ${dev.gradingMethod === m.id ? 'rgba(var(--accent-glow-rgb),0.5)' : 'rgba(255,255,255,0.08)'}`,
              background: dev.gradingMethod === m.id ? 'rgba(var(--accent-glow-rgb),0.18)' : 'transparent',
              color: dev.gradingMethod === m.id ? 'var(--accent-primary)' : 'rgba(255,255,255,0.4)',
              cursor: 'pointer', transition: 'all 0.15s',
            }}
          >
            {m.label}
          </button>
        ))}
      </div>
      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginTop: 6, fontFamily: 'var(--font-mono)' }}>
        applied on next grading session open
      </div>
    </div>
  );
}

/* ── Section Header ──────────────────────────────────── */
function SectionHeader({ label }: { label: string }) {
  return (
    <div style={{
      fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.25)',
      letterSpacing: '0.12em', textTransform: 'uppercase',
      fontFamily: 'var(--font-mono)', marginBottom: 6, paddingLeft: 4,
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
      {dev.activeOverlay === 'reserve' && (
        <SilverTierReserveDrawer
          key="dev-reserve"
          onClose={dev.dismissOverlay}
          onStartQuests={dev.dismissOverlay}
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
              style={{ position: 'fixed', inset: 0, zIndex: 8000, background: 'rgba(0,0,0,0.55)' }}
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
                background: '#0F1117',
                borderRadius: '24px 24px 0 0',
                boxShadow: '0 -8px 48px rgba(0,0,0,0.6)',
                maxHeight: '76vh',
                display: 'flex', flexDirection: 'column',
              }}
            >
              {/* Handle + header */}
              <div style={{ padding: '12px 16px 0', flexShrink: 0 }}>
                <div style={{ width: 36, height: 3, borderRadius: 999, background: 'rgba(255,255,255,0.12)', margin: '0 auto 14px' }} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <div>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '3px 8px', borderRadius: 6,
                      background: 'rgba(var(--accent-glow-rgb),0.15)', border: '1px solid rgba(var(--accent-glow-rgb),0.25)',
                      marginBottom: 4,
                    }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.1em' }}>
                        DEV MODE
                      </span>
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-display)' }}>
                      State Controls
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={dev.resetAll}
                      title="Reset all"
                      style={{
                        width: 32, height: 32, borderRadius: 8, border: 'none',
                        background: 'rgba(255,255,255,0.06)', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      <RefreshCw style={{ width: 14, height: 14, color: 'rgba(255,255,255,0.45)' }} />
                    </button>
                    <button
                      onClick={dev.closePanel}
                      style={{
                        width: 32, height: 32, borderRadius: 8, border: 'none',
                        background: 'rgba(255,255,255,0.06)', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      <X style={{ width: 14, height: 14, color: 'rgba(255,255,255,0.45)' }} />
                    </button>
                  </div>
                </div>

                {/* Active state badges */}
                {(dev.homeState !== 'auto' || dev.tierLockBypassed || dev.walletEmpty || dev.questsEmpty || dev.forceNoisePause || dev.validatorHomeEmpty || dev.validatorTasksEmpty || dev.validatorWalletEmpty) && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
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
              <div style={{ overflowY: 'auto', padding: '0 16px 32px', flex: 1 }}>

                {/* ── Contributor States ── */}
                <div style={{ marginBottom: 20 }}>
                  <SectionHeader label="Contributor" />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {/* Home data state — same dashboard, different data (§ amended Pass 3) */}
                    <div style={{ padding: '8px 12px 10px' }}>
                      <p style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>Home Data State</p>
                      <p style={{ fontSize: 10.5, fontWeight: 500, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>
                        Same dashboard · auto follows the profile
                      </p>
                      <div style={{ display: 'flex', gap: 6 }}>
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
                                flex: 1, padding: '7px 4px', borderRadius: 999,
                                fontSize: 11, fontWeight: 700, cursor: 'pointer',
                                border: '1px solid',
                                background: active ? 'var(--accent-primary-deep)' : 'transparent',
                                borderColor: active ? 'var(--accent-primary-deep)' : 'rgba(255,255,255,0.16)',
                                color: active ? '#FFFFFF' : 'rgba(255,255,255,0.6)',
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
                </div>

                {/* ── Validator States ── */}
                <div style={{ marginBottom: 20 }}>
                  <SectionHeader label="Validator" />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
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
                  <div style={{ marginTop: 8 }}>
                    <MethodSelector />
                  </div>
                </div>

                {/* ── Technical Failure Overlays ── */}
                <div style={{ marginBottom: 20 }}>
                  <SectionHeader label="Technical Failures" />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <LaunchRow
                      icon={MicOff}
                      label="Mic Permission Denied"
                      sublabel="Recording → browser blocked mic access"
                      accentColor="#F87171"
                      onLaunch={() => dev.launchOverlay('mic-denied')}
                    />
                    <LaunchRow
                      icon={CloudOff}
                      label="Clip Upload Failed"
                      sublabel="Post-record → ERR_NETWORK_TIMEOUT"
                      accentColor="#F87171"
                      onLaunch={() => dev.launchOverlay('upload-failed')}
                    />
                    <LaunchRow
                      icon={CreditCard}
                      label="Payment Failed"
                      sublabel="Payout → UPI gateway timeout"
                      accentColor="#F87171"
                      onLaunch={() => dev.launchOverlay('payment-failed')}
                    />
                    <LaunchRow
                      icon={Timer}
                      label="Batch Session Expired"
                      sublabel="Grading → held too long, released"
                      accentColor="#CA8A04"
                      onLaunch={() => dev.launchOverlay('batch-expired')}
                    />
                    <LaunchRow
                      icon={Lock}
                      label="Daily Limit Reached"
                      sublabel="Recording → clip quota exhausted"
                      accentColor="var(--text-muted)"
                      onLaunch={() => dev.launchOverlay('daily-limit')}
                    />
                  </div>
                </div>

                {/* ── Flow & Edge-Case Overlays ── */}
                <div style={{ marginBottom: 8 }}>
                  <SectionHeader label="Flow & Edge-Case Overlays" />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <LaunchRow
                      icon={ShieldAlert}
                      label="Spoofing Verification Hold"
                      sublabel="Payout → Step 2 biometric check"
                      accentColor="rgba(var(--accent-glow-rgb),1)"
                      onLaunch={() => dev.launchOverlay('spoofing')}
                    />
                    <LaunchRow
                      icon={AlertTriangle}
                      label="DPDP Consent Revocation"
                      sublabel="Profile → Revoke Consent"
                      accentColor="#E53E3E"
                      onLaunch={() => dev.launchOverlay('dpdp')}
                    />
                    <LaunchRow
                      icon={Coins}
                      label="Silver Tier Reserve Drawer"
                      sublabel="Wallet → Withdraw Funds"
                      accentColor="#B8860B"
                      onLaunch={() => dev.launchOverlay('reserve')}
                    />
                    <LaunchRow
                      icon={Mic}
                      label="Acoustic Noise Pause"
                      sublabel="Recording → ambient noise detected"
                      accentColor="#CA8A04"
                      onLaunch={() => dev.launchOverlay('noise')}
                    />
                    <LaunchRow
                      icon={Swords}
                      label="Role Collision Lockout"
                      sublabel="Grading → policy violation block"
                      accentColor="#E53E3E"
                      onLaunch={() => dev.launchOverlay('collision')}
                    />
                    <LaunchRow
                      icon={Users}
                      label="Consensus Mismatch"
                      sublabel="Grading → grade differs from peers"
                      accentColor="#B8860B"
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
      padding: '3px 8px', borderRadius: 6,
      background: 'rgba(var(--accent-glow-rgb),0.15)', border: '1px solid rgba(var(--accent-glow-rgb),0.3)',
      fontSize: 10, fontWeight: 700, color: 'var(--accent-primary)',
      fontFamily: 'var(--font-mono)',
    }}>
      {label}
    </div>
  );
}
