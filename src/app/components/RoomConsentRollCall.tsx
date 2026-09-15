import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Mic,
  QrCode,
  UserX,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Check,
} from 'lucide-react';

// C-01 + C-10 (P0) — On-tape consent roll-call for a multi-person ROOM take.
// Under India's DPDP Act every person in the room is a data principal and must
// consent on tape before capture. A minor gate (C-10) blocks recording until a
// guardian consents or the minor is removed. No data is retained for anyone
// excluded or blocked. Consent is a contract, not a formality.

type ConsentStatus = 'consented' | 'pending' | 'blocked';

type Participant = {
  id: string;
  name: string;
  isYou?: boolean;
  status: ConsentStatus;
  excluded?: boolean;
};

const STATUS_META: Record<ConsentStatus, { label: string; tint: string; ink: string }> = {
  consented: { label: 'On tape', tint: 'var(--t-verdigris-50)', ink: 'var(--state-settled)' },
  pending: { label: 'Waiting', tint: 'var(--t-ochre-50)', ink: 'var(--state-pending)' },
  blocked: { label: 'Blocked', tint: 'var(--t-crimson-50)', ink: 'var(--state-failed)' },
};

export function RoomConsentRollCall() {
  const navigate = useNavigate();

  const [participants, setParticipants] = useState<Participant[]>([
    { id: 'you', name: 'You', isYou: true, status: 'consented' },
    { id: 'priya', name: 'Priya', status: 'consented' },
    { id: 'anil', name: 'Anil', status: 'pending' },
    { id: 'guest', name: 'Guest', status: 'pending' },
  ]);
  const [minorPresent, setMinorPresent] = useState(false);
  const [minorResolved, setMinorResolved] = useState(false);

  const giveConsent = (id: string) =>
    setParticipants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'consented' } : p)),
    );

  const removeSpeaker = (id: string) => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, excluded: true, status: 'blocked' } : p)),
    );
    setMinorResolved(true);
  };

  const active = participants.filter((p) => !p.excluded);
  const notConsented = active.filter((p) => p.status !== 'consented');
  const minorUnresolved = minorPresent && !minorResolved;
  const ready = notConsented.length === 0 && !minorUnresolved;

  const blockingLine = minorUnresolved
    ? 'A minor is present — resolve guardian consent to continue.'
    : notConsented.length > 0
      ? `${notConsented.map((p) => (p.isYou ? 'You' : p.name)).join(' and ')} ${
          notConsented.length > 1 ? "haven't" : "hasn't"
        } consented yet.`
      : '';

  return (
    <div
      className="min-h-screen pb-40"
      style={{ background: 'var(--surface-ground)', fontFamily: 'var(--font-ui)' }}
    >
      {/* Header */}
      <div className="px-6 pt-14">
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          style={{
            width: 40,
            height: 40,
            borderRadius: 'var(--r-full)',
            background: 'var(--surface-raised)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <ChevronLeft className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
        </button>
      </div>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="px-6 mt-5"
      >
        <div
          style={{
            borderRadius: 'var(--r-lg)',
            background: 'var(--surface-studio)',
            padding: '24px 22px',
            boxShadow: 'var(--e-2)',
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 'var(--r-md)',
              background: 'var(--t-verdigris-50)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
            }}
          >
            <ShieldCheck className="w-6 h-6" style={{ color: 'var(--t-verdigris-700)' }} strokeWidth={1.9} />
          </div>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: 'var(--text-on-studio)',
              letterSpacing: '-0.01em',
              marginBottom: 8,
            }}
          >
            Who&rsquo;s in the room?
          </h1>
          <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-on-studio)', opacity: 0.75, lineHeight: 1.55 }}>
            Everyone here is part of the recording, so everyone gets a say. Each person consents on
            tape before we start — that&rsquo;s the contract.
          </p>
        </div>
      </motion.div>

      {/* Roll-call list */}
      <div className="px-6 mt-6">
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 10 }}>
          {active.length} in the room
        </p>
        <div className="flex flex-col gap-3">
          {participants.map((p) => {
            const meta = STATUS_META[p.status];
            return (
              <div
                key={p.id}
                style={{
                  background: 'var(--surface-raised)',
                  borderRadius: 'var(--r-md)',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--e-1)',
                  padding: '14px 16px',
                  opacity: p.excluded ? 0.55 : 1,
                }}
                className="flex items-center gap-3"
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 'var(--r-full)',
                    background: meta.tint,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {p.status === 'consented' ? (
                    <UserCheck className="w-5 h-5" style={{ color: meta.ink }} strokeWidth={1.9} />
                  ) : p.excluded ? (
                    <UserX className="w-5 h-5" style={{ color: meta.ink }} strokeWidth={1.9} />
                  ) : (
                    <Mic className="w-5 h-5" style={{ color: meta.ink }} strokeWidth={1.9} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{p.name}</p>
                  <span style={{ fontSize: 12, fontWeight: 600, color: meta.ink }}>
                    {p.excluded ? 'Removed — nothing kept' : meta.label}
                  </span>
                </div>

                {p.status === 'pending' && !p.excluded ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => giveConsent(p.id)}
                      aria-label={`${p.name} consents on tape`}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 'var(--r-full)',
                        background: 'var(--t-terracotta-50)',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Mic className="w-4 h-4" style={{ color: 'var(--action-primary)' }} strokeWidth={2} />
                    </button>
                    <button
                      onClick={() => giveConsent(p.id)}
                      aria-label={`${p.name} consents by QR`}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 'var(--r-full)',
                        background: 'var(--surface-sunken)',
                        border: '1px solid var(--border-subtle)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <QrCode className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} strokeWidth={2} />
                    </button>
                  </div>
                ) : p.status === 'consented' ? (
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 'var(--r-full)',
                      background: 'var(--state-settled)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Check className="w-4 h-4" style={{ color: 'var(--text-on-accent)' }} strokeWidth={2.6} />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {/* Minor gate question */}
      <div className="px-6 mt-6">
        <div
          style={{
            background: 'var(--surface-raised)',
            borderRadius: 'var(--r-md)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--e-1)',
            padding: '16px',
          }}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
                Is anyone under 18 present?
              </p>
              <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', marginTop: 2 }}>
                We have to ask — the law protects them a little differently.
              </p>
            </div>
            <div
              className="flex"
              style={{
                borderRadius: 'var(--r-full)',
                background: 'var(--surface-sunken)',
                padding: 3,
                border: '1px solid var(--border-subtle)',
              }}
            >
              {(['No', 'Yes'] as const).map((opt) => {
                const on = (opt === 'Yes') === minorPresent;
                return (
                  <button
                    key={opt}
                    onClick={() => {
                      setMinorPresent(opt === 'Yes');
                      setMinorResolved(false);
                    }}
                    style={{
                      minWidth: 52,
                      height: 34,
                      borderRadius: 'var(--r-full)',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: 13,
                      fontWeight: 700,
                      background: on ? 'var(--action-primary)' : 'transparent',
                      color: on ? 'var(--text-on-accent)' : 'var(--text-secondary)',
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Minor branch card (C-10) */}
      {minorUnresolved && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="px-6 mt-4"
        >
          <div
            style={{
              background: 'var(--t-crimson-50)',
              borderRadius: 'var(--r-md)',
              border: '1px solid var(--border-subtle)',
              padding: '18px',
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 'var(--r-full)',
                  background: 'var(--surface-raised)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <AlertTriangle className="w-5 h-5" style={{ color: 'var(--state-failed)' }} strokeWidth={1.9} />
              </div>
              <p style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)' }}>
                A guardian needs to say yes first
              </p>
            </div>
            <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: 14 }}>
              We can&rsquo;t record someone under 18 without their guardian&rsquo;s consent on tape. Nothing
              is kept for a speaker we exclude — their voice never touches our servers.
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setMinorResolved(true)}
                style={{
                  width: '100%',
                  height: 48,
                  borderRadius: 'var(--r-full)',
                  background: 'var(--action-primary)',
                  color: 'var(--text-on-accent)',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                <Mic className="w-4 h-4" /> Capture guardian consent on tape
              </button>
              <button
                onClick={() => removeSpeaker('guest')}
                style={{
                  width: '100%',
                  height: 48,
                  borderRadius: 'var(--r-full)',
                  background: 'var(--surface-raised)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-strong)',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                <UserX className="w-4 h-4" /> Remove this speaker &amp; continue
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Sticky footer CTA */}
      <div
        className="fixed bottom-0 left-0 right-0 px-6 pt-4 pb-8"
        style={{ background: 'var(--surface-ground)', borderTop: '1px solid var(--divider)' }}
      >
        {!ready && blockingLine && (
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4" style={{ color: 'var(--state-pending)' }} strokeWidth={2} />
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>{blockingLine}</p>
          </div>
        )}
        <button
          disabled={!ready}
          onClick={() => ready && navigate('/recording/q-room-1')}
          style={{
            width: '100%',
            height: 56,
            borderRadius: 'var(--r-full)',
            border: 'none',
            cursor: ready ? 'pointer' : 'not-allowed',
            fontSize: 15,
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            background: ready ? 'var(--action-primary)' : 'var(--surface-sunken)',
            color: ready ? 'var(--text-on-accent)' : 'var(--text-faint)',
            boxShadow: ready ? 'var(--e-glow)' : 'none',
          }}
        >
          {ready ? (
            <>
              Everyone&rsquo;s consented — start the room take <ChevronRight className="w-5 h-5" />
            </>
          ) : (
            'Start recording'
          )}
        </button>
      </div>
    </div>
  );
}
