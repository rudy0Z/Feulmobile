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
        {/* Frosted status-bar backdrop so content never bleeds into the bar */}
        <div
          aria-hidden
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: 54,
            background: 'rgba(248,249,250,0.72)',
            backdropFilter: 'blur(14px) saturate(140%)',
            WebkitBackdropFilter: 'blur(14px) saturate(140%)',
            zIndex: 9998,
            pointerEvents: 'none',
          }}
        />
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
        background: '#0A0C10',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Outer phone body — flat, no halo, no caption */}
      <div
        style={{
          position: 'relative',
          flexShrink: 0,
          zIndex: 1,
        }}
      >
        {/* Phone body — minimal bezel, no orange glow, no oversized drop */}
        <div
          style={{
            width: 412,
            height: 868,
            borderRadius: 58,
            background: '#1a1a1a',
            boxShadow: '0 0 0 0.5px rgba(255,255,255,0.06)',
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
              }}
            />

            {/*
             * Frosted status-bar backdrop: a thin opaque/blurred band at the
             * top of the screen so scrolling content never reads INTO the
             * iOS status bar or the Dynamic Island — it slides cleanly
             * underneath, exactly like a real iPhone.
             */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 54,
                background: 'rgba(248,249,250,0.72)',
                backdropFilter: 'blur(14px) saturate(140%)',
                WebkitBackdropFilter: 'blur(14px) saturate(140%)',
                zIndex: 9998,
                pointerEvents: 'none',
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
          </div>
        </div>
      </div>
    </div>
  );
}