import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, AlertCircle, CheckCircle2, Zap, Wallet,
  ShieldCheck, Mic, Bell, ArrowRight,
} from 'lucide-react';

type NotifType =
  | 'rejected'
  | 'approved'
  | 'xp_level'
  | 'payout'
  | 'validator_approved'
  | 'quest_new'
  | 'campaign_alert';

interface Notification {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  group: 'today' | 'yesterday' | 'earlier';
  unread: boolean;
  actionLabel?: string;
  actionPath?: string;
}

const allNotifications: Notification[] = [
  {
    id: 'n1', type: 'rejected', group: 'today', unread: true,
    title: 'Recording Rejected',
    body: '"Conversational Dialogue" — Background noise detected.',
    time: '9:45 AM',
    actionLabel: 'Re-record now',
  },
  {
    id: 'n2', type: 'approved', group: 'today', unread: true,
    title: '₹15 Approved & Credited',
    body: '"Morning News Reading" passed quality review.',
    time: '9:30 AM',
  },
  {
    id: 'n3', type: 'xp_level', group: 'today', unread: true,
    title: 'You hit Level 3! ⚡',
    body: 'Unlocked 1.2× payout multiplier & instant auto-approval.',
    time: '8:00 AM',
    actionLabel: 'View rewards',
  },
  {
    id: 'n4', type: 'quest_new', group: 'today', unread: false,
    title: 'New Quest: Marathi Reviews',
    body: '₹25 · 10 clips · Only 5 slots left. Expiring soon.',
    time: '7:15 AM',
    actionLabel: 'Start now',
  },
  {
    id: 'n5', type: 'payout', group: 'yesterday', unread: false,
    title: 'Payout Sent — ₹250',
    body: 'Transferred to your UPI ID ending in @okaxis.',
    time: 'Mon',
  },
  {
    id: 'n6', type: 'validator_approved', group: 'yesterday', unread: false,
    title: 'Validator Status Approved',
    body: 'Welcome to the Validator program. Start grading batches now.',
    time: 'Mon',
    actionLabel: 'Open Validator',
  },
  {
    id: 'n7', type: 'approved', group: 'earlier', unread: false,
    title: '₹30 Approved & Credited',
    body: '"Tech Support Dialogue" — 96% accuracy score.',
    time: 'Sun',
  },
  {
    id: 'n8', type: 'quest_new', group: 'earlier', unread: false,
    title: 'Bonus Active: +20% on all quests',
    body: 'Limited-time earnings boost. Complete quests before it expires.',
    time: 'Sat',
  },
];

const notifConfig: Record<NotifType, {
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  dot: string;
}> = {
  rejected:           { icon: AlertCircle,      iconColor: '#C0392B', iconBg: '#FDE8E8', dot: '#C0392B' },
  approved:           { icon: CheckCircle2,     iconColor: '#2D7A4F', iconBg: '#E6F4EC', dot: '#2D7A4F' },
  xp_level:          { icon: Zap,              iconColor: '#8B6914', iconBg: '#FFF3D6', dot: '#D4A017' },
  payout:             { icon: Wallet,           iconColor: '#1E3A6E', iconBg: '#E8EFF8', dot: '#3B62A8' },
  validator_approved: { icon: ShieldCheck,      iconColor: '#2D7A4F', iconBg: '#E6F4EC', dot: '#2D7A4F' },
  quest_new:          { icon: Mic,              iconColor: '#E06C3A', iconBg: '#FEF0E8', dot: '#E06C3A' },
  campaign_alert:     { icon: AlertCircle,      iconColor: '#8B6914', iconBg: '#FFF3D6', dot: '#D4A017' },
};

const groupLabels: Record<string, string> = {
  today:     'Today',
  yesterday: 'Yesterday',
  earlier:   'Earlier',
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationsPanel({ isOpen, onClose }: Props) {
  const [notifs, setNotifs] = useState(allNotifications);

  const unreadCount = notifs.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const markRead = (id: string) => {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const groups: Array<'today' | 'yesterday' | 'earlier'> = ['today', 'yesterday', 'earlier'];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="notif-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 100,
              background: 'rgba(10,12,16,0.55)',
              backdropFilter: 'blur(4px)',
            }}
          />

          {/* Panel — slides up as a tall sheet */}
          <motion.div
            key="notif-panel"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            style={{
              position: 'fixed', bottom: 0, left: 0, right: 0,
              zIndex: 101,
              height: '88%',
              background: '#F4F6F8',
              borderRadius: '28px 28px 0 0',
              display: 'flex', flexDirection: 'column',
              boxShadow: '0px -8px 40px rgba(0,0,0,0.2)',
              overflow: 'hidden',
            }}
          >
            {/* Drag handle */}
            <div style={{
              width: 36, height: 4, borderRadius: 999,
              background: '#DDE2EA', margin: '12px auto 0', flexShrink: 0,
            }} />

            {/* Header */}
            <div
              style={{
                padding: '16px 20px 14px',
                borderBottom: '1px solid #EDF0F5',
                background: '#FFFFFF',
                flexShrink: 0,
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div style={{ position: 'relative' }}>
                    <Bell className="w-5 h-5" style={{ color: '#1C2434' }} />
                    {unreadCount > 0 && (
                      <span style={{
                        position: 'absolute', top: -5, right: -6,
                        width: 16, height: 16, borderRadius: '50%',
                        background: '#E06C3A', border: '2px solid #FFFFFF',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 9, fontWeight: 800, color: '#FFFFFF',
                      }}>
                        {unreadCount}
                      </span>
                    )}
                  </div>
                  <h2 style={{ fontSize: 18, fontWeight: 800, color: '#1C2434', letterSpacing: '-0.3px' }}>
                    Notifications
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      style={{ fontSize: 12, fontWeight: 700, color: '#E06C3A', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      Mark all read
                    </button>
                  )}
                  <button
                    onClick={onClose}
                    style={{
                      width: 30, height: 30, borderRadius: '50%',
                      background: '#F0F4F8', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <X className="w-4 h-4" style={{ color: '#4A5568' }} />
                  </button>
                </div>
              </div>
            </div>

            {/* Scrollable list */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0 32px' }}>
              {groups.map((group) => {
                const items = notifs.filter(n => n.group === group);
                if (!items.length) return null;

                return (
                  <div key={group}>
                    {/* Group label */}
                    <div style={{ padding: '16px 20px 8px' }}>
                      <p style={{
                        fontSize: 11, fontWeight: 700, color: '#8896A7',
                        textTransform: 'uppercase', letterSpacing: '0.08em',
                      }}>
                        {groupLabels[group]}
                      </p>
                    </div>

                    {/* Cards */}
                    <div className="px-4 space-y-2">
                      {items.map((notif, i) => {
                        const cfg = notifConfig[notif.type];
                        const Icon = cfg.icon;

                        return (
                          <motion.div
                            key={notif.id}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25, delay: i * 0.04 }}
                            onClick={() => markRead(notif.id)}
                            style={{
                              background: '#FFFFFF',
                              borderRadius: 18,
                              padding: '14px 16px',
                              border: notif.unread
                                ? `1.5px solid ${cfg.dot}30`
                                : '1.5px solid #EDF0F5',
                              cursor: 'pointer',
                              position: 'relative',
                              overflow: 'hidden',
                            }}
                          >
                            {/* Unread tint bar */}
                            {notif.unread && (
                              <div style={{
                                position: 'absolute', top: 0, left: 0, bottom: 0,
                                width: 3, background: cfg.dot, borderRadius: '18px 0 0 18px',
                              }} />
                            )}

                            <div className="flex items-start gap-3" style={{ paddingLeft: notif.unread ? 4 : 0 }}>
                              {/* Icon */}
                              <div style={{
                                width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                                background: cfg.iconBg,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                              }}>
                                <Icon className="w-4.5 h-4.5" style={{ color: cfg.iconColor, width: 18, height: 18 }} />
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <p style={{
                                    fontSize: 13, fontWeight: notif.unread ? 700 : 600,
                                    color: '#1C2434', lineHeight: 1.35,
                                  }}>
                                    {notif.title}
                                  </p>
                                  <div className="flex items-center gap-1.5 flex-shrink-0">
                                    {notif.unread && (
                                      <div style={{
                                        width: 7, height: 7, borderRadius: '50%',
                                        background: cfg.dot, flexShrink: 0,
                                      }} />
                                    )}
                                    <p style={{ fontSize: 11, fontWeight: 500, color: '#B0BBCA', whiteSpace: 'nowrap' }}>
                                      {notif.time}
                                    </p>
                                  </div>
                                </div>

                                <p style={{
                                  fontSize: 12, fontWeight: 500, color: '#4A5568',
                                  lineHeight: 1.5, marginTop: 3,
                                }}>
                                  {notif.body}
                                </p>

                                {notif.actionLabel && (
                                  <button
                                    style={{
                                      marginTop: 8,
                                      display: 'inline-flex', alignItems: 'center', gap: 4,
                                      fontSize: 12, fontWeight: 700, color: '#E06C3A',
                                      background: 'none', border: 'none', cursor: 'pointer',
                                      padding: 0,
                                    }}
                                  >
                                    {notif.actionLabel}
                                    <ArrowRight className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Empty state */}
              {notifs.length === 0 && (
                <div className="flex flex-col items-center justify-center" style={{ paddingTop: 80 }}>
                  <Bell className="w-12 h-12" style={{ color: '#DDE2EA', marginBottom: 16 }} />
                  <p style={{ fontSize: 16, fontWeight: 700, color: '#1C2434', marginBottom: 6 }}>All caught up</p>
                  <p style={{ fontSize: 13, fontWeight: 500, color: '#8896A7' }}>No new notifications</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* Bell icon with badge — for use in headers */
interface BellButtonProps {
  unreadCount: number;
  onClick: () => void;
}
export function BellButton({ unreadCount, onClick }: BellButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'relative',
        width: 36, height: 36, borderRadius: '50%',
        background: '#FFFFFF',
        border: '1px solid #EDF0F5',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0px 2px 8px rgba(28,36,52,0.07)',
      }}
    >
      <Bell className="w-4 h-4" style={{ color: '#1C2434' }} />
      {unreadCount > 0 && (
        <span style={{
          position: 'absolute', top: -2, right: -2,
          minWidth: 16, height: 16, borderRadius: 999,
          background: '#E06C3A', border: '2px solid #F4F6F8',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 9, fontWeight: 800, color: '#FFFFFF', padding: '0 3px',
        }}>
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  );
}
