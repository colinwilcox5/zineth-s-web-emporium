// SCENE 02 — THE FOG FOREST
// Painterly tree silhouettes (irregular SVG paths, edge-wobble filter, 3 depth layers).
import type { SceneConfig } from '../sceneTypes';
import { SIGIL_COLORS } from '../sceneTypes';
import { DitherOverlay } from '../sceneShared';
import { RealSigil } from '../RealSigil';
import { TextureOverlay } from '../TextureOverlay';
import { ScanlineOverlay } from '../ScanlineOverlay';

// Irregular hand-drawn tree silhouettes — varied trunks, jagged branches, no equal angles.
// Each path is intentionally lopsided.
const TREE_SHAPES = [
  // Tall lopsided pine
  'M50,200 C49,180 47,160 44,142 C40,138 35,130 32,120 C36,118 40,114 43,108 C38,102 30,92 28,80 C34,80 41,82 46,78 C42,68 34,54 32,42 C40,46 49,52 52,46 C56,52 62,60 60,68 C66,70 72,68 70,76 C66,84 60,92 64,98 C70,104 74,110 70,118 C66,126 60,132 58,140 C56,160 54,180 53,200 Z',
  // Squat gnarled
  'M50,200 C48,184 44,170 38,156 C42,150 36,140 40,128 C34,124 30,114 36,104 C30,98 36,84 44,76 C38,68 46,56 52,52 C58,58 64,68 60,76 C68,82 72,94 66,104 C72,114 70,124 64,128 C68,140 62,150 66,156 C60,170 56,184 52,200 Z',
  // Leaning narrow
  'M50,200 C50,182 50,164 48,148 C44,144 42,134 44,124 C40,118 42,108 46,100 C42,94 44,82 48,74 C44,66 50,52 54,44 C58,52 64,66 60,74 C64,82 66,94 62,100 C66,108 68,118 64,124 C66,134 64,144 60,148 C58,164 56,182 54,200 Z',
  // Wide bushy
  'M50,200 C46,182 38,164 28,148 C32,144 24,134 30,122 C22,118 18,104 28,94 C20,86 28,68 42,58 C36,48 46,38 50,32 C54,38 64,48 58,58 C72,68 80,86 72,94 C82,104 78,118 70,122 C76,134 68,144 72,148 C62,164 54,182 52,200 Z',
  // Skeletal tall
  'M50,200 C49,182 48,164 46,146 C42,140 40,128 44,118 C38,112 40,98 44,88 C38,80 42,64 50,52 C58,64 62,80 56,88 C60,98 62,112 56,118 C60,128 58,140 54,146 C52,164 51,182 50,200 Z',
  // Hunched
  'M50,200 C48,186 42,172 36,160 C40,154 32,142 38,132 C30,124 36,108 46,98 C40,88 48,72 56,64 C62,72 70,88 64,98 C74,108 70,124 62,132 C68,142 60,154 64,160 C58,172 54,186 52,200 Z',
];

// Three depth layers — clusters not even spacing.
const FAR_LAYER = [
  { x: 6, s: 0.45, shape: 4 }, { x: 11, s: 0.4, shape: 2 }, { x: 13, s: 0.5, shape: 0 },
  { x: 28, s: 0.42, shape: 5 }, { x: 33, s: 0.48, shape: 1 }, { x: 41, s: 0.44, shape: 3 },
  { x: 56, s: 0.46, shape: 4 }, { x: 62, s: 0.4, shape: 2 }, { x: 67, s: 0.5, shape: 0 },
  { x: 81, s: 0.42, shape: 5 }, { x: 89, s: 0.48, shape: 1 }, { x: 94, s: 0.44, shape: 3 },
];

const MID_LAYER = [
  { x: 3, s: 0.7, shape: 1 }, { x: 9, s: 0.65, shape: 3 },
  { x: 24, s: 0.75, shape: 0 }, { x: 31, s: 0.68, shape: 5 },
  { x: 52, s: 0.72, shape: 2 }, { x: 59, s: 0.66, shape: 4 },
  { x: 76, s: 0.7, shape: 0 }, { x: 84, s: 0.74, shape: 3 },
];

const NEAR_LAYER = [
  { x: -2, s: 1.1, shape: 3, sway: 9 },
  { x: 8, s: 0.95, shape: 0, sway: 11 },
  { x: 22, s: 1.2, shape: 5, sway: 8 },
  { x: 38, s: 0.9, shape: 1, sway: 12 },
  { x: 64, s: 1.05, shape: 2, sway: 10 },
  { x: 78, s: 1.15, shape: 3, sway: 9 },
  { x: 92, s: 1.0, shape: 4, sway: 11 },
];

const FogForest = () => (
  <div style={{
    position: 'absolute', inset: 0,
    background: `linear-gradient(180deg, ${SIGIL_COLORS.federalBlue} 0%, #16182a 50%, ${SIGIL_COLORS.black} 100%)`,
    overflow: 'hidden',
  }}>
    {/* SVG defs — edge-wobble filter shared by all tree paths */}
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
      <defs>
        <filter id="tree-edge-wobble" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="3" />
        </filter>
        <filter id="tree-edge-wobble-strong" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="2" seed="13" />
          <feDisplacementMap in="SourceGraphic" scale="5" />
        </filter>
      </defs>
    </svg>

    {/* Distant blurred fog mass */}
    <div style={{
      position: 'absolute', inset: 0,
      background: `radial-gradient(ellipse at 50% 60%, rgba(40,50,90,0.55) 0%, transparent 70%)`,
      filter: 'blur(20px)',
    }} />

    {/* Distant mansion silhouette */}
    <div style={{
      position: 'absolute',
      left: '46%', top: '50%',
      width: '8%', height: '12%',
      background: SIGIL_COLORS.black,
      opacity: 0.55,
      clipPath: 'polygon(0 100%, 0 35%, 20% 35%, 20% 15%, 50% 0, 80% 15%, 80% 35%, 100% 35%, 100% 100%)',
      filter: 'blur(2.5px)',
    }} />

    {/* Beckoning sigil */}
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

    {/* Drifting fog bands */}
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

    {/* FAR layer — tiny, lost in haze */}
    {FAR_LAYER.map((t, i) => (
      <div key={`far-${i}`} style={{
        position: 'absolute',
        left: `${t.x}%`, bottom: '8%',
        width: `${8 * t.s}%`, height: `${48 * t.s}%`,
        opacity: 0.25,
        filter: 'blur(2px)',
      }}>
        <svg viewBox="0 0 100 200" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
          <path d={TREE_SHAPES[t.shape]} fill="#3a3050" filter="url(#tree-edge-wobble)" />
        </svg>
      </div>
    ))}

    {/* MID layer — purple, semi-transparent */}
    {MID_LAYER.map((t, i) => (
      <div key={`mid-${i}`} style={{
        position: 'absolute',
        left: `${t.x}%`, bottom: '0%',
        width: `${10 * t.s}%`, height: `${64 * t.s}%`,
        opacity: 0.55,
        filter: 'blur(0.8px)',
      }}>
        <svg viewBox="0 0 100 200" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
          <path d={TREE_SHAPES[t.shape]} fill="#1a1530" filter="url(#tree-edge-wobble)" />
        </svg>
      </div>
    ))}

    {/* NEAR layer — darkest, largest, most irregular, swaying */}
    {NEAR_LAYER.map((t, i) => (
      <div key={`near-${i}`} style={{
        position: 'absolute',
        left: `${t.x}%`, bottom: '-3%',
        width: `${12 * t.s}%`, height: `${82 * t.s}%`,
        transformOrigin: 'bottom center',
        animation: `treeSway ${t.sway}s ease-in-out infinite`,
        animationDelay: `${i * 0.5}s`,
      }}>
        <svg viewBox="0 0 100 200" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
          <path d={TREE_SHAPES[t.shape]} fill={SIGIL_COLORS.black} fillOpacity={0.96} filter="url(#tree-edge-wobble-strong)" />
        </svg>
      </div>
    ))}

    {/* Heavy global texture */}
    <DitherOverlay color={SIGIL_COLORS.green} opacity={0.18} />
    <DitherOverlay color={SIGIL_COLORS.pink} opacity={0.06} />
    <TextureOverlay intensity={0.5} />
    <ScanlineOverlay />

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
