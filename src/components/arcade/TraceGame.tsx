import { useState, useRef, useCallback, useEffect } from 'react';

export interface TraceShape {
  id: string;
  dots: Array<{ x: number; y: number }>;
  sequence: number[];
  onComplete: () => void;
  completionRevealSVG?: React.ReactNode;
}

const NEON_PINK = '#FF48B0';
const YELLOW = '#FFE800';
const DOT_RADIUS = 7;
const HIT_RADIUS = 28;

export const TraceGame = ({ dots, sequence, onComplete, completionRevealSVG }: TraceShape) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showReveal, setShowReveal] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [flashOpacity, setFlashOpacity] = useState(0);
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalSegments = sequence.length - 1;

  // Scale dots to viewport
  const getScaledDots = useCallback(() => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    return dots.map(d => ({
      x: cx + d.x,
      y: cy + d.y,
    }));
  }, [dots]);

  const [scaledDots, setScaledDots] = useState(getScaledDots);

  useEffect(() => {
    const handler = () => setScaledDots(getScaledDots());
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [getScaledDots]);

  const checkHit = useCallback((clientX: number, clientY: number) => {
    if (completed || currentStep >= totalSegments) return;
    const targetIdx = sequence[currentStep + 1];
    const target = scaledDots[targetIdx];
    const dx = clientX - target.x;
    const dy = clientY - target.y;
    if (dx * dx + dy * dy < HIT_RADIUS * HIT_RADIUS) {
      const nextStep = currentStep + 1;
      if (nextStep >= totalSegments) {
        setCurrentStep(nextStep);
        setCompleted(true);
        // Celebration sequence
        setFlashOpacity(1);
        setTimeout(() => setFlashOpacity(0), 300);
        if (completionRevealSVG) {
          setTimeout(() => setShowReveal(true), 400);
          setTimeout(() => {
            setShowReveal(false);
            setShowCelebration(true);
          }, 1900);
        } else {
          setTimeout(() => setShowCelebration(true), 400);
        }
        setTimeout(() => onComplete(), 2400);
      } else {
        setCurrentStep(nextStep);
      }
    }
  }, [completed, currentStep, totalSegments, sequence, scaledDots, onComplete, completionRevealSVG]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (completed) return;
    // Check if clicking the next dot
    checkHit(e.clientX, e.clientY);
    isDragging.current = true;
  }, [completed, checkHit]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || completed) return;
    checkHit(e.clientX, e.clientY);
  }, [completed, checkHit]);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (completed) return;
    const t = e.touches[0];
    checkHit(t.clientX, t.clientY);
    isDragging.current = true;
  }, [completed, checkHit]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current || completed) return;
    const t = e.touches[0];
    checkHit(t.clientX, t.clientY);
  }, [completed, checkHit]);

  // Completed segments as SVG lines
  const completedLines = [];
  for (let i = 0; i < Math.min(currentStep, totalSegments); i++) {
    const fromIdx = sequence[i];
    const toIdx = sequence[i + 1];
    const from = scaledDots[fromIdx];
    const to = scaledDots[toIdx];
    completedLines.push(
      <line
        key={`line-${i}`}
        x1={from.x} y1={from.y}
        x2={to.x} y2={to.y}
        stroke={NEON_PINK}
        strokeWidth={3}
        strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 6px ${NEON_PINK}80)` }}
      />
    );
  }

  // Pulse animation for active dot
  const activeDotIdx = currentStep < totalSegments ? sequence[currentStep + 1] : -1;

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => { isDragging.current = false; }}
      style={{
        position: 'fixed',
        inset: 0,
        top: 64,
        background: '#0A0A0A',
        cursor: 'crosshair',
        touchAction: 'none',
        userSelect: 'none',
      }}
    >
      {/* Scanlines */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        opacity: 0.04,
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.9) 0px, rgba(255,255,255,0.9) 1px, transparent 1px, transparent 3px)',
      }} />

      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 2 }}>
        {completedLines}
        {scaledDots.map((dot, i) => {
          const isActive = i === activeDotIdx;
          const isStart = i === sequence[0] && currentStep === 0;
          return (
            <g key={`dot-${i}`}>
              <circle
                cx={dot.x} cy={dot.y} r={DOT_RADIUS}
                fill={NEON_PINK}
                style={{
                  filter: isActive || isStart ? `drop-shadow(0 0 10px ${NEON_PINK})` : undefined,
                  animation: isActive ? 'dotPulse 0.8s ease-in-out infinite' : undefined,
                }}
                data-interactive="true"
              />
              {/* Dot number label */}
              <text
                x={dot.x} y={dot.y - 14}
                textAnchor="middle"
                fill="#ffffff40"
                fontSize={9}
                fontFamily="'Space Mono', monospace"
              >
                {i + 1}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Yellow flash */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 10,
        background: YELLOW,
        opacity: flashOpacity,
        transition: 'opacity 300ms ease-out',
        pointerEvents: 'none',
      }} />

      {/* Reveal SVG */}
      {showReveal && completionRevealSVG && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 11,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'fadeIn 400ms ease-out',
        }}>
          {completionRevealSVG}
        </div>
      )}

      {/* Celebration text */}
      {showCelebration && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'fadeInOut 1.6s ease-in-out forwards',
        }}>
          <span style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 800,
            fontSize: 48,
            color: YELLOW,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            textShadow: `0 0 30px ${YELLOW}80`,
          }}>
            UNLOCKED
          </span>
        </div>
      )}

      <style>{`
        @keyframes dotPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInOut {
          0% { opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default TraceGame;