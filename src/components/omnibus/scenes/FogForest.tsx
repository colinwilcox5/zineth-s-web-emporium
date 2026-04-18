// SCENE 02 — THE FOG FOREST
// Painterly tree silhouettes, oppressive fog, no instructional text.
import type { SceneConfig } from '../sceneTypes';
import { SIGIL_COLORS } from '../sceneTypes';
import { DitherOverlay } from '../sceneShared';
import { RealSigil } from '../RealSigil';
import { TextureOverlay } from '../TextureOverlay';

// Hand-drawn-feeling tree silhouettes via SVG path (no straight triangles).
const TREE_PATHS = [
  // each: [xPct, yBaseline%, scale, sway, dStr]
  { x: 4,  s: 0.95, sway: 9,  d: 'M50,180 C48,160 42,140 30,120 C28,118 36,108 42,100 C32,92 38,78 46,68 C40,60 44,46 52,40 C60,46 64,60 58,68 C66,78 72,92 62,100 C68,108 76,118 74,120 C62,140 56,160 54,180 Z' },
  { x: 14, s: 0.7,  sway: 11, d: 'M50,180 C46,158 40,138 32,118 C36,110 30,96 38,84 C32,76 40,60 50,48 C60,60 68,76 62,84 C70,96 64,110 68,118 C60,138 54,158 52,180 Z' },
  { x: 24, s: 1.05, sway: 12, d: 'M50,180 C44,156 36,134 22,114 C28,108 18,90 30,76 C22,68 32,52 50,42 C68,52 78,68 70,76 C82,90 72,108 78,114 C64,134 56,156 54,180 Z' },
  { x: 36, s: 0.62, sway: 8,  d: 'M50,180 C48,162 44,144 36,126 C40,118 34,104 42,92 C36,84 42,70 50,60 C58,70 64,84 58,92 C66,104 60,118 64,126 C56,144 52,162 50,180 Z' },
  { x: 60, s: 0.78, sway: 10, d: 'M50,180 C46,160 40,142 30,122 C34,114 28,100 36,88 C30,80 38,64 50,52 C62,64 70,80 64,88 C72,100 66,114 70,122 C60,142 54,160 52,180 Z' },
  { x: 70, s: 1.0,  sway: 13, d: 'M50,180 C42,156 34,134 20,114 C26,108 16,90 28,76 C20,68 30,52 50,40 C70,52 80,68 72,76 C84,90 74,108 80,114 C66,134 58,156 56,180 Z' },
  { x: 84, s: 0.85, sway: 9,  d: 'M50,180 C46,160 40,140 30,122 C34,114 28,100 36,86 C30,78 38,64 50,54 C62,64 70,78 64,86 C72,100 66,114 70,122 C60,140 54,160 52,180 Z' },
  { x: 92, s: 0.6,  sway: 11, d: 'M50,180 C48,164 44,148 38,132 C42,124 36,110 44,98 C38,90 44,76 50,68 C56,76 62,90 56,98 C64,110 58,124 62,132 C56,148 52,164 50,180 Z' },
];

const FogForest = () => (
  <div style={{
    position: 'absolute', inset: 0,
    background: `linear-gradient(180deg, ${SIGIL_COLORS.federalBlue} 0%, #16182a 50%, ${SIGIL_COLORS.black} 100%)`,
    overflow: 'hidden',
  }}>
    {/* Distant blurred fog mass — heavy oppressive base */}
    <div style={{
      position: 'absolute', inset: 0,
      background: `radial-gradient(ellipse at 50% 60%, rgba(40,50,90,0.55) 0%, transparent 70%)`,
      filter: 'blur(20px)',
    }} />

    {/* Distant mansion silhouette — feathered edges */}
    <div style={{
      position: 'absolute',
      left: '46%', top: '50%',
      width: '8%', height: '12%',
      background: SIGIL_COLORS.black,
      opacity: 0.55,
      clipPath: 'polygon(0 100%, 0 35%, 20% 35%, 20% 15%, 50% 0, 80% 15%, 80% 35%, 100% 35%, 100% 100%)',
      filter: 'blur(2.5px)',
    }} />

    {/* Beckoning sigil over the mansion — uses real PNG now */}
    <div style={{
      position: 'absolute',
      left: '50%', top: '46%',
      transform: 'translate(-50%, -50%)',
      opacity: 0.55,
      pointerEvents: 'none',
      animation: 'sigilBeacon 3.2s ease-in-out infinite',
    }}>
      <RealSigil size={84} glow />
    </div>

    {/* Three drifting fog bands (mid layer) */}
    {[
      { top: '38%', height: '14%', color: 'rgba(73,130,207,0.18)', dur: '24s', delay: '0s' },
      { top: '58%', height: '20%', color: 'rgba(255,72,176,0.10)', dur: '30s', delay: '-8s' },
      { top: '74%', height: '22%', color: 'rgba(20,30,60,0.45)', dur: '20s', delay: '-4s' },
    ].map((band, i) => (
      <div key={i} style={{
        position: 'absolute',
        left: '-10%', right: '-10%', top: band.top, height: band.height,
        background: `linear-gradient(90deg, transparent 0%, ${band.color} 40%, ${band.color} 60%, transparent 100%)`,
        filter: 'blur(28px)',
        animation: `fogBandDrift ${band.dur} ease-in-out infinite`,
        animationDelay: band.delay,
        pointerEvents: 'none',
      }} />
    ))}

    {/* Painterly trees — SVG paths, each unique */}
    {TREE_PATHS.map((t, i) => {
      const widthPct = 11 * t.s;
      const heightPct = 78 * t.s;
      return (
        <div key={i} style={{
          position: 'absolute',
          left: `${t.x}%`, bottom: '-2%',
          width: `${widthPct}%`, height: `${heightPct}%`,
          transformOrigin: 'bottom center',
          animation: `treeSway ${t.sway}s ease-in-out infinite`,
          animationDelay: `${i * 0.4}s`,
          filter: i < 4 ? 'blur(0.4px)' : 'blur(0.2px)',
        }}>
          <svg viewBox="0 0 100 200" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <path d={t.d} fill={SIGIL_COLORS.black} fillOpacity={0.92} />
          </svg>
        </div>
      );
    })}

    {/* Heavy global texture — forest needs to feel thick */}
    <DitherOverlay color={SIGIL_COLORS.green} opacity={0.18} />
    <DitherOverlay color={SIGIL_COLORS.pink} opacity={0.06} />
    <TextureOverlay intensity={0.4} blend="overlay" />

    {/* Vignette */}
    <div style={{
      position: 'absolute', inset: 0,
      background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(10,10,10,0.75) 90%)',
      pointerEvents: 'none',
    }} />
  </div>
);

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
      // No tooltip — cursor change is the affordance.
    },
  ],
};

export default FogForest;
