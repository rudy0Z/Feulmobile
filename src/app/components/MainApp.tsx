import { Outlet, useNavigate, useLocation } from 'react-router';
import { Home as HomeIcon, Compass, Wallet, User } from 'lucide-react';
import { motion } from 'motion/react';

const navItems = [
  { path: '/contributor',         label: 'Home',    icon: HomeIcon },
  { path: '/contributor/quests',  label: 'Quests',  icon: Compass  },
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
    <div className="min-h-screen flex flex-col" style={{ background: '#F8F9FA', fontFamily: 'var(--font-sans)' }}>
      <div className="flex-1 overflow-auto pb-20">
        <Outlet />
      </div>

      <nav
        className="fixed bottom-0 left-0 right-0 z-50"
        style={{
          background: '#FFFFFF',
          borderTop: '1px solid #E8EDF3',
          boxShadow: '0px -2px 12px rgba(28,36,52,0.05)',
        }}
      >
        <div className="flex justify-around items-center max-w-md mx-auto" style={{ height: 64 }}>
          {navItems.map((item) => {
            const Icon   = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-colors"
                style={{ minWidth: 48, minHeight: 48 }}
              >
                <motion.div
                  animate={{ scale: active ? 1 : 0.9, y: active ? -2 : 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Icon
                    style={{ color: active ? '#1C2434' : '#8896A7' }}
                    className="w-6 h-6"
                    strokeWidth={active ? 2.25 : 1.75}
                  />
                </motion.div>
                {active && (
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10px]"
                    style={{ color: '#1C2434', fontFamily: 'var(--font-sans)', fontWeight: 700 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}