// SCENE 04 — THE FOYER
import type { SceneConfig } from '../sceneTypes';
import { SIGIL_COLORS } from '../sceneTypes';
import { Archway, DitherOverlay } from '../sceneShared';

const Foyer = () => (
  <div style={{
    position: 'absolute', inset: 0,
    background: `linear-gradient(180deg, ${SIGIL_COLORS.federalBlue} 0%, #1a2440 60%, #0a0a18 100%)`,
    overflow: 'hidden',
  }}>
    {/* Side columns */}
    <div style={{
      position: 'absolute', left: 0, top: 0, bottom: '40%', width: '18%',
      background: `linear-gradient(90deg, ${SIGIL_COLORS.yellow}, ${SIGIL_COLORS.pink} 50%, ${SIGIL_COLORS.yellow})`,
      filter: 'brightness(0.7)',
      borderRight: `2px solid ${SIGIL_COLORS.yellow}`,
    }} />
    <div style={{
      position: 'absolute', right: 0, top: 0, bottom: '40%', width: '18%',
      background: `linear-gradient(90deg, ${SIGIL_COLORS.yellow}, ${SIGIL_COLORS.pink} 50%, ${SIGIL_COLORS.yellow})`,
      filter: 'brightness(0.7)',
      borderLeft: `2px solid ${SIGIL_COLORS.yellow}`,
    }} />

    {/* Central archway leading to Great Room */}
    <div style={{
      position: 'absolute', left: '32%', top: '12%', width: '36%', height: '60%',
    }}>
      <Archway label="GREAT ROOM AHEAD" glow />
    </div>

    {/* Reflective floor */}
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0, height: '40%',
      background: `linear-gradient(180deg, ${SIGIL_COLORS.federalBlue}, #050810)`,
      borderTop: `1px solid ${SIGIL_COLORS.yellow}40`,
    }}>
      {/* Inlay pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `repeating-linear-gradient(45deg, ${SIGIL_COLORS.yellow}10 0 2px, transparent 2px 30px), repeating-linear-gradient(-45deg, ${SIGIL_COLORS.pink}10 0 2px, transparent 2px 30px)`,
      }} />
      {/* Reflection of arch glow */}
      <div style={{
        position: 'absolute', left: '40%', right: '40%', top: 0, height: '30%',
        background: `radial-gradient(ellipse at center top, ${SIGIL_COLORS.yellow}30, transparent 70%)`,
        filter: 'blur(8px)',
      }} />
    </div>

    {/* Pedestal w/ chalice — left */}
    <div style={{
      position: 'absolute', left: '6%', bottom: '18%', width: '12%', height: '32%',
    }}>
      <div style={{
        position: 'absolute', left: '20%', right: '20%', bottom: 0, height: '40%',
        background: `linear-gradient(180deg, #444, #1a1a1a)`,
        border: `1px solid ${SIGIL_COLORS.yellow}60`,
      }} />
      {/* Chalice */}
      <div style={{
        position: 'absolute', left: '25%', right: '25%', bottom: '38%', height: '30%',
        background: `radial-gradient(ellipse at 50% 30%, ${SIGIL_COLORS.red}, ${SIGIL_COLORS.pink} 50%, ${SIGIL_COLORS.federalBlue})`,
        borderRadius: '50% 50% 30% 30%',
        boxShadow: `0 0 16px ${SIGIL_COLORS.pink}, 0 0 32px ${SIGIL_COLORS.red}80`,
        animation: 'lavaButtonPulse 3s ease-in-out infinite',
      }} />
      {/* Z-key dangle */}
      <div style={{
        position: 'absolute', left: '46%', top: '35%', width: 2, height: '20%',
        background: SIGIL_COLORS.yellow,
      }} />
      <div style={{
        position: 'absolute', left: '38%', top: '52%', width: '20%', height: '12%',
        background: SIGIL_COLORS.yellow,
        clipPath: 'polygon(0 0, 100% 0, 100% 30%, 30% 30%, 30% 70%, 100% 70%, 100% 100%, 0 100%)',
      }} />
    </div>

    <DitherOverlay opacity={0.15} />
  </div>
);

export const foyerScene: SceneConfig = {
  id: 'foyer',
  title: 'The Foyer',
  preloadAdjacent: ['great-room', 'idol-doorway'],
  ambientSoundId: 'mansion-hall',
  background: <Foyer />,
  backTo: 'idol-doorway',
  hotspots: [
    {
      area: { left: 32, top: 12, width: 36, height: 60 },
      label: 'Enter Great Room',
      to: 'great-room',
      tooltip: 'Forward',
    },
    {
      area: { left: 6, top: 50, width: 12, height: 32 },
      label: 'Inspect chalice',
      to: 'great-room', // Placeholder — real lore-zoom view TBD
      tooltip: 'The chalice',
    },
  ],
};

export default Foyer;
