// SCENE 11 — THE SECRET ALCOVE
import type { SceneConfig } from '../sceneTypes';
import { SIGIL_COLORS } from '../sceneTypes';
import { DitherOverlay, ChromeSigil } from '../sceneShared';

const SecretAlcove = () => (
  <div style={{
    position: 'absolute', inset: 0,
    background: `radial-gradient(ellipse at 50% 40%, #1a1a2a 0%, ${SIGIL_COLORS.black} 70%)`,
    overflow: 'hidden',
  }}>
    {/* Spotlight on pedestal */}
    <div style={{
      position: 'absolute', left: '35%', right: '35%', top: 0, bottom: 0,
      background: `radial-gradient(ellipse at 50% 50%, ${SIGIL_COLORS.skyBlue}25 0%, transparent 60%)`,
    }} />

    {/* Pedestal */}
    <div style={{
      position: 'absolute', left: '40%', right: '40%', bottom: '12%', height: '32%',
      background: `linear-gradient(180deg, #444, #0a0a0a)`,
      border: `1px solid ${SIGIL_COLORS.yellow}80`,
      boxShadow: 'inset 0 0 24px rgba(0,0,0,0.8)',
    }} />

    {/* The reward — full-glow rotating sigil */}
    <div style={{
      position: 'absolute', left: '50%', top: '32%',
      transform: 'translateX(-50%)',
    }}>
      <ChromeSigil size={200} glow spinDuration={12} />
    </div>

    {/* Lore text */}
    <div style={{
      position: 'absolute', left: 0, right: 0, top: '8%',
      textAlign: 'center',
      fontFamily: '"Space Mono", monospace',
      fontSize: 11, letterSpacing: 4, color: SIGIL_COLORS.yellow,
      textTransform: 'uppercase',
    }}>
      YOU FOUND THE OMNIBUS.
    </div>

    <DitherOverlay opacity={0.18} />
  </div>
);

export const secretAlcoveScene: SceneConfig = {
  id: 'secret-alcove',
  title: 'The Secret Alcove',
  preloadAdjacent: ['great-room'],
  ambientSoundId: 'great-room',
  background: <SecretAlcove />,
  backTo: 'great-room',
  hotspots: [],
};

export default SecretAlcove;
