import { Drawer } from 'vaul';
import { motion } from 'motion/react';
import { Check, LayoutGrid } from 'lucide-react';

interface GradingStyleDrawerProps {
  currentMethod: string;
  onSelect: (method: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const METHODS = [
  {
    id: 'segmented',
    name: 'Segmented Control',
    description: 'Tap 1–5 on a horizontal scale. Builds speed with practice.',
    preview: (active: boolean) => (
      <div style={{ width: 64, height: 40, background: '#F8F9FA', borderRadius: 8, padding: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} style={{ flex: 1, height: 16, borderRadius: 2, background: i === 4 ? '#2D7A4F' : '#E8EDF3', opacity: i === 4 ? 1 : 0.4 }} />
        ))}
      </div>
    )
  },
  {
    id: 'pills',
    name: 'Labelled Pills',
    description: 'Five full-width buttons with grade labels always visible.',
    preview: (active: boolean) => (
      <div style={{ width: 64, height: 40, background: '#F8F9FA', borderRadius: 8, padding: 4, display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center' }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{ width: '100%', height: 8, borderRadius: 4, background: i === 1 ? '#C0392B' : '#E8EDF3', opacity: i === 1 ? 1 : 0.4 }} />
        ))}
      </div>
    )
  },
  {
    id: 'arc',
    name: 'Thumb Arc',
    description: 'Five grade zones mapped to your thumb\'s natural reach across the screen bottom.',
    preview: (active: boolean) => (
      <div style={{ width: 64, height: 40, background: '#F8F9FA', borderRadius: 8, padding: '8px 4px 4px', display: 'flex', gap: 2, alignItems: 'flex-end', justifyContent: 'center' }}>
        {[1, 2, 3, 4, 5].map(i => {
          const y = [6, 2, 0, 2, 6][i-1];
          return (
            <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: i === 5 ? '#1E6B40' : '#E8EDF3', transform: `translateY(${-y}px)`, opacity: i === 5 ? 1 : 0.4 }} />
          );
        })}
      </div>
    )
  },
  {
    id: 'keyboard',
    name: 'Keyboard Grade',
    description: 'Press 1–5 to grade instantly. Colour confirmation flash on each input.',
    preview: (active: boolean) => (
      <div style={{ width: 64, height: 40, background: '#F8F9FA', borderRadius: 8, padding: 4, display: 'flex', gap: 1, alignItems: 'flex-end' }}>
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} style={{ flex: 1, height: 24, borderRadius: 2, background: '#FFFFFF', border: '1px solid #E8EDF3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#E8EDF3' }} />
          </div>
        ))}
      </div>
    )
  },
  {
    id: 'binary',
    name: 'Binary + Flag',
    description: 'Accept or reject only. Flag edge cases for senior review.',
    preview: (active: boolean) => (
      <div style={{ width: 64, height: 40, background: '#F8F9FA', borderRadius: 8, padding: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{ display: 'flex', gap: 2 }}>
          <div style={{ flex: 1, height: 16, borderRadius: 4, background: '#FDE8E8' }} />
          <div style={{ flex: 1, height: 16, borderRadius: 4, background: '#ECFDF5' }} />
        </div>
        <div style={{ width: '100%', height: 8, borderRadius: 4, background: '#E8EDF3' }} />
      </div>
    )
  }
];

export function GradingStyleDrawer({ currentMethod, onSelect, open, onOpenChange }: GradingStyleDrawerProps) {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-[200]" />
        <Drawer.Content className="bg-white flex flex-col rounded-t-[32px] fixed bottom-0 left-0 right-0 max-h-[92%] z-[201] outline-none">
          <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-slate-200 my-4" />
          
          <div className="px-6 pb-8 overflow-y-auto">
            <Drawer.Title style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 800, color: '#1C2434', marginBottom: 8, textAlign: 'center' }}>
              Choose Grading Style
            </Drawer.Title>
            <Drawer.Description style={{ fontSize: 14, fontWeight: 500, color: '#8896A7', textAlign: 'center', marginBottom: 24 }}>
              Select an interface that matches your validation speed and comfort.
            </Drawer.Description>
            
            <div className="flex flex-col gap-3">
              {METHODS.map((method) => {
                const isSelected = currentMethod === method.id;
                return (
                  <button
                    key={method.id}
                    onClick={() => {
                      onSelect(method.id);
                      onOpenChange(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '16px',
                      borderRadius: 24,
                      background: isSelected ? '#FDF1EC' : '#FFFFFF',
                      border: isSelected ? '2px solid #E06C3A' : '1px solid #E8EDF3',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div className="flex-shrink-0">
                      {method.preview(isSelected)}
                    </div>
                    
                    <div className="flex-1">
                      <p style={{ fontSize: 14, fontWeight: 700, color: '#1C2434', marginBottom: 2 }}>
                        {method.name}
                      </p>
                      <p style={{ fontSize: 12, fontWeight: 500, color: '#8896A7', lineHeight: 1.4 }}>
                        {method.description}
                      </p>
                    </div>
                    
                    {isSelected && (
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#E06C3A] flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
