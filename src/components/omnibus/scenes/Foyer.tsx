// SCENE 04 — THE FOYER
// Symmetrical: chalice on left, brazier on right. No instructional text.
import type { SceneConfig } from '../sceneTypes';
import { SIGIL_COLORS } from '../sceneTypes';
import { Archway, DitherOverlay } from '../sceneShared';
import { TextureOverlay } from '../TextureOverlay';

const Foyer = () => (
  <div style={{
    position: 'absolute', inset: 0,
    background: `linear-gradient(180deg, ${SIGIL_COLORS.federalBlue} 0%, #1a2440 60%, #0a0a18 100%)`,
    overflow: 'hidden',
  }}>
    {/* Side columns w/ dimensional cylindrical shading */}
    <div style={{
      position: 'absolute', left: 0, top: 0, bottom: '40%', width: '18%',
      background: `radial-gradient(ellipse at 80% 50%, ${SIGIL_COLORS.yellow}, ${SIGIL_COLORS.pink} 60%, ${SIGIL_COLORS.federalBlue})`,
      filter: 'brightness(0.78)',
      borderRight: `2px solid ${SIGIL_COLORS.yellow}`,
      backgroundImage: `repeating-linear-gradient(90deg, transparent 0 18%, rgba(0,0,0,0.3) 18%, rgba(0,0,0,0.3) 19%, transparent 19% 36%)`,
    }} />
    <div style={{
      position: 'absolute', right: 0, top: 0, bottom: '40%', width: '18%',
      background: `radial-gradient(ellipse at 20% 50%, ${SIGIL_COLORS.yellow}, ${SIGIL_COLORS.pink} 60%, ${SIGIL_COLORS.federalBlue})`,
      filter: 'brightness(0.78)',
      borderLeft: `2px solid ${SIGIL_COLORS.yellow}`,
      backgroundImage: `repeating-linear-gradient(90deg, transparent 0 18%, rgba(0,0,0,0.3) 18%, rgba(0,0,0,0.3) 19%, transparent 19% 36%)`,
    }} />

    {/* Central archway leading to Great Room (no label) */}
    <div style={{
      position: 'absolute', left: '32%', top: '12%', width: '36%', height: '60%',
    }}>
      <Archway glow />
    </div>

    {/* Reflective floor */}
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0, height: '40%',
      background: `linear-gradient(180deg, ${SIGIL_COLORS.federalBlue}, #050810)`,
      borderTop: `1px solid ${SIGIL_COLORS.yellow}40`,
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `repeating-linear-gradient(45deg, ${SIGIL_COLORS.yellow}10 0 2px, transparent 2px 30px), repeating-linear-gradient(-45deg, ${SIGIL_COLORS.pink}10 0 2px, transparent 2px 30px)`,
      }} />
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
      <div style={{
        position: 'absolute', left: '25%', right: '25%', bottom: '38%', height: '30%',
        background: `radial-gradient(ellipse at 50% 30%, ${SIGIL_COLORS.red}, ${SIGIL_COLORS.pink} 50%, ${SIGIL_COLORS.federalBlue})`,
        borderRadius: '50% 50% 30% 30%',
        boxShadow: `0 0 16px ${SIGIL_COLORS.pink}, 0 0 32px ${SIGIL_COLORS.red}80`,
        animation: 'lavaButtonPulse 3s ease-in-out infinite',
      }} />
    </div>

    {/* Pedestal w/ burning brazier — right (visual symmetry) */}
    <div style={{
      position: 'absolute', right: '6%', bottom: '18%', width: '12%', height: '32%',
    }}>
      <div style={{
        position: 'absolute', left: '20%', right: '20%', bottom: 0, height: '40%',
        background: `linear-gradient(180deg, #444, #1a1a1a)`,
        border: `1px solid ${SIGIL_COLORS.yellow}60`,
      }} />
      {/* Brazier bowl */}
      <div style={{
        position: 'absolute', left: '15%', right: '15%', bottom: '38%', height: '12%',
        background: `linear-gradient(180deg, #6a4818, #2a1a08)`,
        borderRadius: '50% 50% 20% 20%',
        border: `1px solid ${SIGIL_COLORS.yellow}`,
      }} />
      {/* Flame */}
      <div style={{
        position: 'absolute', left: '32%', right: '32%', bottom: '46%', height: '24%',
        background: `radial-gradient(ellipse at 50% 80%, ${SIGIL_COLORS.yellow}, ${SIGIL_COLORS.red} 50%, transparent 80%)`,
        borderRadius: '50% 50% 40% 40%',
        boxShadow: `0 0 32px ${SIGIL_COLORS.red}, 0 0 64px ${SIGIL_COLORS.yellow}80`,
        animation: 'lavaButtonPulse 1.4s ease-in-out infinite',
        filter: 'blur(1px)',
      }} />
    </div>

    <DitherOverlay opacity={0.15} />
    <TextureOverlay intensity={0.18} blend="overlay" />
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
    },
    {
      area: { left: 6, top: 50, width: 12, height: 32 },
      label: 'Inspect chalice',
      to: 'great-room',
    },
  ],
};

export default Foyer;
