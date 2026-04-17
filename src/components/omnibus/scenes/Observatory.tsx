// SCENE 01 — THE OBSERVATORY
// Cosmic black menu screen with rotating chrome sigil, picture-frame viewport,
// and metal control panel (QUIT / BYPASS / ENTER).
import { useState, useMemo } from 'react';
import type { SceneConfig, SceneId } from '../sceneTypes';
import { SIGIL_COLORS } from '../sceneTypes';
import { ChromeSigil, DitherOverlay } from '../sceneShared';

interface ObservatoryProps {
  hovered: SceneId | 'home' | null;
  onEnter: () => void;
  onQuit: () => void;
  onBypass: () => void;
}

const Observatory = ({ hovered, onEnter, onQuit, onBypass }: ObservatoryProps) => {
  // Stable starfield positions
  const stars = useMemo(() =>
    Array.from({ length: 90 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 1.6 + 0.4,
      opacity: Math.random() * 0.6 + 0.2,
    })),
  []);

  // Constellation lines
  const lines = useMemo(() =>
    Array.from({ length: 12 }, () => ({
      x1: Math.random() * 100, y1: Math.random() * 100,
      x2: Math.random() * 100, y2: Math.random() * 100,
    })),
  []);

  return (
    <div style={{ position: 'absolute', inset: 0, background: SIGIL_COLORS.black, overflow: 'hidden' }}>
      {/* Starfield */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {lines.map((l, i) => (
          <line
            key={i}
            x1={`${l.x1}%`} y1={`${l.y1}%`} x2={`${l.x2}%`} y2={`${l.y2}%`}
            stroke={SIGIL_COLORS.skyBlue} strokeOpacity={0.12} strokeWidth={0.5}
          />
        ))}
        {stars.map((s, i) => (
          <circle
            key={i}
            cx={`${s.left}%`} cy={`${s.top}%`} r={s.size}
            fill={SIGIL_COLORS.cream} fillOpacity={s.opacity}
          />
        ))}
      </svg>

      {/* Tiny constellation sigil — easter egg */}
      <div style={{ position: 'absolute', left: '78%', top: '15%', opacity: 0.25 }}>
        <ChromeSigil size={14} />
      </div>

      {/* Left: rotating big sigil */}
      <div style={{
        position: 'absolute', left: '8%', top: '20%',
        width: '28%', aspectRatio: '1',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <ChromeSigil size={260} spinDuration={20} glow />
      </div>

      {/* Right: picture-frame viewport */}
      <div style={{
        position: 'absolute', right: '8%', top: '15%',
        width: '46%', aspectRatio: '16 / 10',
      }}>
        {/* Frame */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(135deg, #6a6a6a, #1a1a1a 40%, #6a6a6a 80%, #2a2a2a)`,
          padding: 18,
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            border: `2px solid ${SIGIL_COLORS.yellow}`,
            opacity: 0.4,
          }} />
          <div style={{
            position: 'absolute', inset: 6,
            border: `1px solid ${SIGIL_COLORS.pink}`,
            opacity: 0.5,
          }} />
          {/* Viewport content */}
          <div style={{
            position: 'absolute', inset: 18,
            background: SIGIL_COLORS.black,
            overflow: 'hidden',
          }}>
            <ViewportContent hovered={hovered} />
          </div>
        </div>
      </div>

      {/* Bottom: control panel */}
      <div style={{
        position: 'absolute', left: '50%', bottom: '6%',
        transform: 'translateX(-50%)',
        width: '78%', height: 110,
        background: `linear-gradient(180deg, #4a4a4a, #1a1a1a 50%, #2a2a2a)`,
        borderTop: '2px solid #888',
        borderBottom: '2px solid #1a1a1a',
        display: 'flex', alignItems: 'center', justifyContent: 'space-around',
        padding: '0 60px',
        boxShadow: 'inset 0 4px 16px rgba(0,0,0,0.6)',
      }}>
        <LavaButton label="QUIT" size={64} color="dim" onClick={onQuit} />
        <LavaButton label="BYPASS" size={84} color="medium" onClick={onBypass} />
        <LavaButton label="ENTER" size={110} color="hot" onClick={onEnter} pulse />
      </div>

      <DitherOverlay color={SIGIL_COLORS.black} opacity={0.12} />
    </div>
  );
};

const ViewportContent = ({ hovered }: { hovered: SceneId | 'home' | null }) => {
  if (!hovered) {
    return (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: '"Space Mono", monospace',
        fontSize: 11, color: SIGIL_COLORS.skyBlue, opacity: 0.4, letterSpacing: 3,
      }}>
        — STANDBY —
      </div>
    );
  }
  if (hovered === 'home') {
    return (
      <div style={{ width: '100%', height: '100%', background: '#3a2418', display: 'flex', alignItems: 'center', justifyContent: 'center', filter: 'contrast(1.4) saturate(0.5)' }}>
        <div style={{ fontFamily: '"Space Mono", monospace', fontSize: 14, color: SIGIL_COLORS.cream, letterSpacing: 4 }}>ZINETH</div>
      </div>
    );
  }
  if (hovered === 'fog-forest') {
    return (
      <div style={{
        width: '100%', height: '100%',
        background: `radial-gradient(ellipse at 50% 70%, ${SIGIL_COLORS.federalBlue} 0%, ${SIGIL_COLORS.black} 70%)`,
        position: 'relative',
        filter: 'contrast(1.3)',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `repeating-linear-gradient(0deg, rgba(0,169,92,0.15) 0 1px, transparent 1px 3px)`,
        }} />
        <div style={{
          position: 'absolute', left: '47%', top: '55%', width: '6%', height: '12%',
          background: SIGIL_COLORS.black,
          opacity: 0.7,
        }} />
      </div>
    );
  }
  return (
    <div style={{ width: '100%', height: '100%', background: SIGIL_COLORS.federalBlue, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Space Mono", monospace', fontSize: 10, color: SIGIL_COLORS.cream, letterSpacing: 2 }}>
      — UNKNOWN SIGNAL —
    </div>
  );
};

const LavaButton = ({
  label, size, color, onClick, pulse,
}: {
  label: string;
  size: number;
  color: 'dim' | 'medium' | 'hot';
  onClick: () => void;
  pulse?: boolean;
}) => {
  const [hover, setHover] = useState(false);
  const palette = {
    dim: { base: '#3a1a1a', glow: SIGIL_COLORS.red, hot: SIGIL_COLORS.red },
    medium: { base: '#2a2a2a', glow: SIGIL_COLORS.skyBlue, hot: SIGIL_COLORS.cream },
    hot: { base: '#5a2008', glow: SIGIL_COLORS.red, hot: SIGIL_COLORS.yellow },
  }[color];

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: size, height: size,
        borderRadius: '50%',
        border: '3px solid #555',
        background: `radial-gradient(circle at 35% 30%, ${hover || pulse ? palette.hot : palette.base} 0%, ${palette.base} 50%, #0a0a0a 100%)`,
        boxShadow: hover || pulse
          ? `0 0 ${size/3}px ${palette.glow}, 0 0 ${size/2}px ${palette.glow}80, inset 0 0 ${size/4}px ${palette.hot}`
          : 'inset 0 4px 12px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.6)',
        cursor: 'none',
        fontFamily: '"Space Mono", monospace',
        fontSize: size > 90 ? 12 : 9,
        fontWeight: 700,
        letterSpacing: 2,
        color: hover || pulse ? palette.hot : palette.glow,
        textShadow: hover || pulse ? `0 0 6px ${palette.hot}` : 'none',
        animation: pulse ? 'lavaButtonPulse 2.4s ease-in-out infinite' : 'none',
        transition: 'color 200ms, box-shadow 200ms, background 200ms',
      }}
    >
      {label}
    </button>
  );
};

export const observatoryScene = (handlers: {
  onEnter: () => void;
  onQuit: () => void;
  onBypass: () => void;
  hovered: SceneId | 'home' | null;
}): SceneConfig => ({
  id: 'observatory',
  title: 'The Observatory',
  preloadAdjacent: ['fog-forest'],
  ambientSoundId: 'observatory-ambient',
  hideBackArrow: true,
  background: <Observatory {...handlers} />,
  hotspots: [], // Buttons handle their own clicks
});

export default Observatory;
