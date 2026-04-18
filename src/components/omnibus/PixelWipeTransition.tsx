import { useEffect, useState, useRef } from 'react';
import { SigilSvg } from './CursorSigil';

const COLS = 40;
const ROWS = 24;
const FADE_IN_DURATION = 800;  // cells fade to black
const HOLD_DURATION = 220;     // sigil flash on black
const FADE_OUT_DURATION = 800; // cells reveal new scene

/**
 * Wraps children. When `triggerKey` changes, plays a pixel-wipe transition,
 * firing onMidTransition during the all-black hold (parent should swap content
 * THEN, but here we use triggerKey itself as the swap signal).
 */
interface PixelWipeProps {
  triggerKey: string | number;
  onMidTransition?: () => void;
  children: React.ReactNode;
}

const PixelWipeTransition = ({ triggerKey, onMidTransition, children }: PixelWipeProps) => {
  const [phase, setPhase] = useState<'idle' | 'in' | 'hold' | 'out'>('idle');
  const lastKey = useRef<string | number>(triggerKey);
  const cellDelays = useRef<{ inDelay: number; outDelay: number }[]>([]);
  const midRef = useRef(onMidTransition);
  midRef.current = onMidTransition;

  useEffect(() => {
    // Only run when triggerKey actually changes from its previous value.
    // Survives StrictMode double-mount and avoids the "swallowed first click" bug.
    if (lastKey.current === triggerKey) return;
    lastKey.current = triggerKey;

    cellDelays.current = Array.from({ length: COLS * ROWS }, () => ({
      inDelay: Math.random() * 600,
      outDelay: Math.random() * 600,
    }));
    setPhase('in');
    const t1 = setTimeout(() => {
      midRef.current?.();
      setPhase('hold');
    }, FADE_IN_DURATION);
    const t2 = setTimeout(() => setPhase('out'), FADE_IN_DURATION + HOLD_DURATION);
    const t3 = setTimeout(() => setPhase('idle'), FADE_IN_DURATION + HOLD_DURATION + FADE_OUT_DURATION);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [triggerKey]);

  const showOverlay = phase !== 'idle';

  return (
    <>
      {children}
      {showOverlay && (
        <div
          aria-hidden
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9998,
            pointerEvents: 'none',
            display: 'grid',
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          }}
        >
          {Array.from({ length: COLS * ROWS }).map((_, i) => {
            const d = cellDelays.current[i] || { inDelay: 0, outDelay: 0 };
            let opacity = 0;
            let transition = '';
            if (phase === 'in') {
              opacity = 1;
              transition = `opacity 200ms ease-in ${d.inDelay}ms`;
            } else if (phase === 'hold') {
              opacity = 1;
              transition = 'none';
            } else if (phase === 'out') {
              opacity = 0;
              transition = `opacity 200ms ease-out ${d.outDelay}ms`;
            }
            return (
              <div
                key={i}
                style={{
                  background: '#0A0A0A',
                  opacity,
                  transition,
                }}
              />
            );
          })}
          {phase === 'hold' && (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              animation: 'sigilFlash 220ms ease-out',
            }}>
              {/* MP4 hero sigil; SVG fallback rendered behind for safety */}
              <div style={{ position: 'absolute', filter: 'drop-shadow(0 0 18px #4982CF)' }}>
                <SigilSvg size={120} />
              </div>
              <video
                src="/omnibus/sigil/metal-logo-short.mp4"
                autoPlay
                muted
                playsInline
                style={{
                  width: 200,
                  height: 200,
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 0 18px #4982CF)',
                }}
              />
            </div>
          )}
          <style>{`
            @keyframes sigilFlash {
              0% { opacity: 0; transform: scale(0.8); }
              50% { opacity: 1; transform: scale(1); }
              100% { opacity: 0.7; transform: scale(1.05); }
            }
          `}</style>
        </div>
      )}
    </>
  );
};

export default PixelWipeTransition;
