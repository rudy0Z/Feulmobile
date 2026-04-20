import { ReactNode, useEffect, useState } from 'react';

/* ─── iOS Status Bar ─────────────────────────────────── */
function IOSStatusBar() {
  const [time, setTime] = useState(() => {
    const n = new Date();
    return `${n.getHours()}:${n.getMinutes().toString().padStart(2, '0')}`;
  });

  useEffect(() => {
    const tick = () => {
      const n = new Date();
      setTime(`${n.getHours()}:${n.getMinutes().toString().padStart(2, '0')}`);
    };
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  const c = '#1C2434';

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 54,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingLeft: 26,
        paddingRight: 20,
        paddingBottom: 11,
        pointerEvents: 'none',
      }}
    >
      {/* Time */}
      <span
        style={{
          fontSize: 15,
          fontWeight: 700,
          color: c,
          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
          letterSpacing: '-0.3px',
        }}
      >
        {time}
      </span>

      {/* Right icons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        {/* Signal bars */}
        <svg width="17" height="13" viewBox="0 0 17 13" fill="none">
          <rect x="0"    y="7"   width="3" height="6"  rx="1" fill={c} />
          <rect x="4.5"  y="4.5" width="3" height="8.5" rx="1" fill={c} />
          <rect x="9"    y="2"   width="3" height="11" rx="1" fill={c} />
          <rect x="13.5" y="0"   width="3" height="13" rx="1" fill={c} />
        </svg>

        {/* WiFi */}
        <svg width="16" height="13" viewBox="0 0 20 15" fill="none">
          <circle cx="10" cy="13.5" r="2" fill={c} />
          <path
            d="M5.8 9.3C7.1 8 8.5 7.3 10 7.3s2.9.7 4.2 2"
            stroke={c} strokeWidth="2" strokeLinecap="round" fill="none"
          />
          <path
            d="M2.5 6C4.6 3.9 7.1 2.7 10 2.7s5.4 1.2 7.5 3.3"
            stroke={c} strokeWidth="2" strokeLinecap="round" fill="none"
          />
        </svg>

        {/* Battery */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: 27,
              height: 13,
              borderRadius: 4,
              border: `1.5px solid ${c}`,
              padding: '2px 2px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '78%',
                height: '100%',
                borderRadius: 2,
                background: c,
              }}
            />
          </div>
          <div
            style={{
              width: 2,
              height: 6,
              borderRadius: '0 2px 2px 0',
              background: c,
              opacity: 0.5,
              marginLeft: 1,
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Home Indicator ─────────────────────────────────── */
function HomeIndicator() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 8,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 134,
        height: 5,
        borderRadius: 3,
        background: 'rgba(28,36,52,0.22)',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    />
  );
}

/* ─── Decorative background blobs ───────────────────── */
function BackgroundDecor() {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      {/* Brand-orange glow behind phone */}
      <div
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(224,108,58,0.12) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(40px)',
        }}
      />
      {/* Top-left accent */}
      <div
        style={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(139,105,20,0.08) 0%, transparent 70%)',
          top: '10%',
          left: '10%',
          filter: 'blur(60px)',
        }}
      />
    </div>
  );
}

/* ─── Phone Frame Component ──────────────────────────── */
export function PhoneFrame({ children }: { children: ReactNode }) {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 520);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 520);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* ── Mobile: render children as-is with status bar overlay ── */
  if (!isDesktop) {
    return (
      <div style={{ position: 'relative', minHeight: '100dvh' }}>
        <IOSStatusBar />
        {children}
        <HomeIndicator />
      </div>
    );
  }

  /* ── Desktop: render inside iPhone shell ── */
  return (
    <div
      style={{
        minHeight: '100vh',
        minWidth: '100vw',
        background: `
          radial-gradient(ellipse at 25% 55%, rgba(224,108,58,0.09) 0%, transparent 45%),
          radial-gradient(ellipse at 78% 20%, rgba(139,105,20,0.06) 0%, transparent 38%),
          linear-gradient(155deg, #0d1018 0%, #11161e 55%, #0a0c10 100%)
        `,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <BackgroundDecor />

      {/* Outer phone body */}
      <div
        style={{
          position: 'relative',
          flexShrink: 0,
          zIndex: 1,
        }}
      >
        {/* Left side buttons */}
        <div style={{ position: 'absolute', left: -3.5, top: 114, width: 3.5, height: 32, borderRadius: '3px 0 0 3px', background: 'linear-gradient(180deg, #333, #222)', boxShadow: '-1px 0 2px rgba(0,0,0,0.4)' }} />
        <div style={{ position: 'absolute', left: -3.5, top: 162, width: 3.5, height: 62, borderRadius: '3px 0 0 3px', background: 'linear-gradient(180deg, #333, #222)', boxShadow: '-1px 0 2px rgba(0,0,0,0.4)' }} />
        <div style={{ position: 'absolute', left: -3.5, top: 240, width: 3.5, height: 62, borderRadius: '3px 0 0 3px', background: 'linear-gradient(180deg, #333, #222)', boxShadow: '-1px 0 2px rgba(0,0,0,0.4)' }} />
        {/* Right side button */}
        <div style={{ position: 'absolute', right: -3.5, top: 178, width: 3.5, height: 90, borderRadius: '0 3px 3px 0', background: 'linear-gradient(180deg, #333, #222)', boxShadow: '1px 0 2px rgba(0,0,0,0.4)' }} />

        {/* Phone body */}
        <div
          style={{
            width: 412,
            height: 868,
            borderRadius: 58,
            background: 'linear-gradient(145deg, #2e2e2e 0%, #1c1c1c 35%, #111 100%)',
            boxShadow: `
              0 0 0 0.5px rgba(255,255,255,0.09),
              inset 0 0 0 1px rgba(255,255,255,0.025),
              0 60px 180px rgba(0,0,0,0.9),
              0 20px 60px rgba(0,0,0,0.6),
              0 0 100px rgba(224,108,58,0.07)
            `,
            padding: 11,
            position: 'relative',
          }}
        >
          {/* Screen */}
          <div
            style={{
              width: 390,
              height: 844,
              borderRadius: 48,
              overflow: 'hidden',
              position: 'relative',
              background: '#F8F9FA',
              /*
               * CRITICAL: transform creates a new containing block for
               * position:fixed children, keeping all fixed navs/overlays
               * constrained inside the phone frame.
               */
              transform: 'translate3d(0,0,0)',
            }}
          >
            {/* Dynamic Island */}
            <div
              style={{
                position: 'absolute',
                top: 12,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 126,
                height: 37,
                borderRadius: 20,
                background: '#000000',
                zIndex: 10000,
                boxShadow: '0 0 0 1px rgba(255,255,255,0.04), inset 0 0 8px rgba(0,0,0,0.8)',
              }}
            />

            {/* iOS Status Bar */}
            <IOSStatusBar />

            {/* Scrollable content */}
            <div
              style={{
                height: '100%',
                overflowY: 'auto',
                overflowX: 'hidden',
                scrollbarWidth: 'none',
              }}
            >
              {children}
            </div>

            {/* Home Indicator */}
            <HomeIndicator />

            {/* Screen glare — very subtle top-right reflection */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '55%',
                height: '30%',
                background:
                  'radial-gradient(ellipse at 80% 10%, rgba(255,255,255,0.04) 0%, transparent 65%)',
                pointerEvents: 'none',
                zIndex: 9998,
                borderRadius: '0 48px 0 0',
              }}
            />
          </div>
        </div>

        {/* Feul label below phone */}
        <div
          style={{
            textAlign: 'center',
            marginTop: 28,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: 'rgba(255,255,255,0.15)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-sans)',
            }}
          >
            Feul · AI Data Marketplace
          </span>
        </div>
      </div>
    </div>
  );
}