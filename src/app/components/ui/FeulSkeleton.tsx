import { motion } from 'motion/react';

export function FeulSkeleton({
  width = '100%',
  height = 16,
  borderRadius = 8,
  style,
}: {
  width?: number | string;
  height?: number | string;
  borderRadius?: number | string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      animate={{ opacity: [0.45, 0.85, 0.45] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        width, height, borderRadius,
        background: 'linear-gradient(90deg, #EEF1F5 0%, #F6F8FB 50%, #EEF1F5 100%)',
        backgroundSize: '200% 100%',
        ...style,
      }}
    />
  );
}

export function QuestCardSkeleton() {
  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: 18,
        border: '1px solid var(--card-border)',
        borderLeft: '3px solid var(--divider)',
        padding: '16px 18px 16px 16px',
        display: 'flex',
        gap: 14,
        alignItems: 'stretch',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <FeulSkeleton width={52} height={52} borderRadius={14} style={{ flexShrink: 0 }} />
      <div className="flex-1" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <FeulSkeleton width={72} height={14} borderRadius={999} />
        <FeulSkeleton width="80%" height={16} />
        <FeulSkeleton width="55%" height={12} />
      </div>
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
        <FeulSkeleton width={44} height={20} />
        <FeulSkeleton width={36} height={10} />
      </div>
    </div>
  );
}
