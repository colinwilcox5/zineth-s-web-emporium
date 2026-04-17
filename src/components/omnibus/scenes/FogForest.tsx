// SCENE 02 — THE FOG FOREST
import type { SceneConfig } from '../sceneTypes';
import { SIGIL_COLORS } from '../sceneTypes';
import { DitherOverlay, ChromeSigil } from '../sceneShared';

const FogForest = () => {
  // Tree silhouettes
  const trees = [
    { x: 4, w: 8, h: 78, sway: 9 },
    { x: 14, w: 6, h: 65, sway: 11 },
    { x: 24, w: 10, h: 85, sway: 12 },
    { x: 36, w: 5, h: 60, sway: 8 },
    { x: 60, w: 6, h: 70, sway: 10 },
    { x: 70, w: 9, h: 82, sway: 13 },
    { x: 84, w: 8, h: 75, sway: 9 },
    { x: 92, w: 5, h: 58, sway: 11 },
  ];

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: `linear-gradient(180deg, ${SIGIL_COLORS.federalBlue} 0%, #1a1a2a 50%, ${SIGIL_COLORS.black} 100%)`,
      overflow: 'hidden',
    }}>
      {/* Distant fog layers (drifting) */}
      <div style={{
        position: 'absolute', inset: 0,
        animation: 'fogDrift 60s linear infinite',
        background: `repeating-linear-gradient(90deg, transparent 0 80px, rgba(255,72,176,0.04) 80px 200px, transparent 200px 360px)`,
        width: '200%',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        animation: 'fogDrift 90s linear infinite',
        background: `repeating-linear-gradient(90deg, transparent 0 120px, rgba(0,169,92,0.06) 120px 280px, transparent 280px 500px)`,
        width: '200%',
      }} />

      {/* Distant mansion silhouette */}
      <div style={{
        position: 'absolute',
        left: '46%', top: '52%',
        width: '8%', height: '10%',
        background: SIGIL_COLORS.black,
        opacity: 0.7,
        clipPath: 'polygon(0 100%, 0 35%, 20% 35%, 20% 15%, 50% 0, 80% 15%, 80% 35%, 100% 35%, 100% 100%)',
        filter: 'blur(0.6px)',
      }} />

      {/* Foreground trees */}
      {trees.map((t, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${t.x}%`, bottom: 0,
          width: `${t.w}%`, height: `${t.h}%`,
          background: SIGIL_COLORS.black,
          clipPath: 'polygon(45% 100%, 45% 30%, 30% 30%, 50% 0, 70% 30%, 55% 30%, 55% 100%)',
          transformOrigin: 'bottom center',
          animation: `treeSway ${t.sway}s ease-in-out infinite`,
          animationDelay: `${i * 0.4}s`,
        }} />
      ))}

      {/* Beckoning sigil over the mansion */}
      <div style={{
        position: 'absolute',
        left: '50%', top: '47%',
        transform: 'translate(-50%, -50%)',
        opacity: 0.55,
        pointerEvents: 'none',
        animation: 'sigilBeacon 3.2s ease-in-out infinite',
        filter: `drop-shadow(0 0 12px ${SIGIL_COLORS.pink})`,
      }}>
        <ChromeSigil size={72} />
      </div>

      {/* Path hint text */}
      <div style={{
        position: 'absolute',
        left: '50%', bottom: '8%',
        transform: 'translateX(-50%)',
        fontFamily: '"Space Mono", monospace',
        fontSize: 11,
        letterSpacing: 4,
        color: SIGIL_COLORS.cream,
        opacity: 0.55,
        pointerEvents: 'none',
        textShadow: '0 0 8px rgba(0,0,0,0.9)',
        animation: 'sigilBeacon 3.2s ease-in-out infinite',
      }}>
        — APPROACH THE MANSION —
      </div>

      <style>{`
        @keyframes sigilBeacon {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.85; }
        }
      `}</style>

      {/* Heavy dither */}
      <DitherOverlay color={SIGIL_COLORS.green} opacity={0.18} />
      <DitherOverlay color={SIGIL_COLORS.pink} opacity={0.06} />

      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(10,10,10,0.7) 90%)',
        pointerEvents: 'none',
      }} />
    </div>
  );
};

export const fogForestScene: SceneConfig = {
  id: 'fog-forest',
  title: 'The Fog Forest',
  preloadAdjacent: ['idol-doorway', 'observatory'],
  ambientSoundId: 'forest-ambient',
  hideBackArrow: true,
  background: <FogForest />,
  hotspots: [
    {
      area: { left: 35, top: 38, width: 30, height: 36 },
      label: 'Approach the mansion',
      to: 'idol-doorway',
      tooltip: 'Approach',
    },
  ],
};

export default FogForest;
