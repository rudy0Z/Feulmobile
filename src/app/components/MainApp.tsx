import { Outlet, useNavigate, useLocation } from 'react-router';
import { Home as HomeIcon, Compass, Wallet, User } from 'lucide-react';
import { motion } from 'motion/react';

const navItems = [
  { path: '/contributor',         label: 'Home',    icon: HomeIcon },
  { path: '/contributor/quests',  label: 'Jobs',  icon: Compass  },
  { path: '/contributor/wallet',  label: 'Wallet',  icon: Wallet   },
  { path: '/contributor/profile', label: 'Profile', icon: User     },
];

export function MainApp() {
  const navigate  = useNavigate();
  const location  = useLocation();

  const isActive = (path: string) => {
    if (path === '/contributor') return location.pathname === '/contributor';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--surface-ground)', fontFamily: 'var(--font-ui)' }}>
      <div className="flex-1 overflow-auto pb-20">
        <Outlet />
      </div>

      <nav
        className="fixed bottom-0 left-0 right-0 z-50"
        style={{
          background: 'color-mix(in srgb, var(--surface-raised) 88%, transparent)',
          backdropFilter: 'blur(20px) saturate(140%)',
          WebkitBackdropFilter: 'blur(20px) saturate(140%)',
        }}
      >
        <div className="flex justify-around items-center max-w-md mx-auto" style={{ height: 64 }}>
          {navItems.map((item) => {
            const Icon   = item.icon;
            const active = isActive(item.path);
            return (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                whileTap={{ scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                className="relative flex flex-col items-center justify-center flex-1 h-full gap-0.5"
                style={{ minWidth: 48, minHeight: 48 }}
              >
                <div className="relative flex items-center justify-center" style={{ width: 44, height: 28 }}>
                  {active && (
                    <motion.div
                      layoutId="nav-active-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      style={{
                        position: 'absolute', inset: 0,
                        background: 'var(--action-primary-soft)',
                        borderRadius: 'var(--r-full)',
                      }}
                    />
                  )}
                  <Icon
                    style={{ color: active ? 'var(--action-primary)' : 'var(--text-muted)', position: 'relative', zIndex: 1 }}
                    className="w-[22px] h-[22px]"
                    strokeWidth={active ? 2.4 : 1.75}
                    fill={active ? 'var(--action-primary-soft)' : 'none'}
                  />
                </div>
                {/* Label always visible — icon-only tabs fail recognition */}
                <span
                  style={{
                    fontSize: 'var(--fs-caption)',
                    color: active ? 'var(--action-primary)' : 'var(--text-muted)',
                    fontFamily: 'var(--font-ui)',
                    fontWeight: active ? 700 : 600,
                  }}
                >
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
