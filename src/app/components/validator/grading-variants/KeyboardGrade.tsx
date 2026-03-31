import { motion, AnimatePresence } from 'motion/react';
import { useEffect } from 'react';

interface KeyboardGradeProps {
  selectedGrade: number | null;
  onGrade: (grade: number) => void;
  gradeOptions: { id: number; label: string; color: string }[];
}

export function KeyboardGrade({ selectedGrade, onGrade, gradeOptions }: KeyboardGradeProps) {
  const flashColors = ['#C0392B', '#C0392B', '#B8860B', '#2D7A4F', '#2D7A4F'];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const n = parseInt(e.key);
      if (n >= 1 && n <= 5) onGrade(n);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onGrade]);

  const selectedGradeObj = gradeOptions.find(g => g.id === selectedGrade);
  const flashColor = selectedGrade !== null ? flashColors[selectedGrade - 1] : 'transparent';

  return (
    <div className="w-full">
      <AnimatePresence>
        {selectedGrade !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            style={{
              position: 'fixed', inset: 0,
              background: flashColor,
              zIndex: 9999,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <motion.h2
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.05 }}
              style={{
                fontSize: 48, fontWeight: 900, color: '#FFFFFF',
                letterSpacing: 2, textShadow: '0px 4px 12px rgba(0,0,0,0.2)',
              }}
            >
              {selectedGradeObj?.label.toUpperCase()}
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex w-full h-16 bg-[#F1F3F5] rounded-xl overflow-hidden shadow-inner mb-4">
        {gradeOptions.map((opt, idx) => (
          <button
            key={opt.id}
            onClick={() => onGrade(opt.id)}
            style={{
              flex: 1,
              height: '100%',
              background: '#FFFFFF',
              border: '1px solid #E8EDF3',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background 0.1s',
            }}
            className="hover:bg-slate-50 active:bg-slate-100"
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 800, color: '#1C2434' }}>
                {opt.id}
              </span>
              <div 
                style={{ width: 8, height: 2, borderRadius: 2, background: flashColors[idx], marginTop: 4 }} 
              />
            </div>
          </button>
        ))}
      </div>
      
      <p style={{ textAlign: 'center', fontSize: 11, fontWeight: 600, color: '#8896A7', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Tap or Press keys 1–5 to grade
      </p>
    </div>
  );
}
