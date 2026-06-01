import { motion } from 'motion/react';

interface ThumbArcProps {
  selectedGrade: number | null;
  onGrade: (grade: number) => void;
  gradeOptions: { id: number; label: string; color: string }[];
}

export function ThumbArc({ selectedGrade, onGrade, gradeOptions }: ThumbArcProps) {
  const gradeColors = ['var(--status-error-text)', 'var(--accent-primary-deep)', 'var(--warning-700)', 'var(--color-success)', 'var(--success-900)'];

  const selectedGradeObj = gradeOptions.find(g => g.id === selectedGrade);

  return (
    <div className="w-full flex flex-col items-center justify-end mb-6">
      {/* Grade text above arc */}
      <div className="h-10 mb-2 flex items-center justify-center">
        {selectedGradeObj && (
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}
          >
            {selectedGradeObj.id} — {selectedGradeObj.label.toUpperCase()}
          </motion.span>
        )}
      </div>

      <div className="relative w-full flex items-end justify-between px-4" style={{ height: 100 }}>
        {gradeOptions.map((opt, idx) => {
          const isSelected = selectedGrade === opt.id;
          const isDimmed = selectedGrade !== null && !isSelected;
          
          // Calculate y offset for arc (0 for center, -24 for edges)
          // 0 1 2 3 4
          // offset: 24 12 0 12 24
          const yOffset = [24, 8, 0, 8, 24][idx];
          const color = gradeColors[idx];

          return (
            <button
              key={opt.id}
              onClick={() => onGrade(opt.id)}
              style={{
                width: 64, height: 64,
                borderRadius: '50%',
                background: isSelected ? color : '#FFFFFF',
                color: isSelected ? '#FFFFFF' : color,
                border: `2px solid ${color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: `translateY(${-yOffset}px) scale(${isSelected ? 1.15 : 1})`,
                opacity: isDimmed ? 0.3 : 1,
                boxShadow: isSelected ? `0px 8px 16px ${color}33` : '0px 4px 12px rgba(28,36,52,0.06)',
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 24, fontWeight: 800 }}>
                {opt.id}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
