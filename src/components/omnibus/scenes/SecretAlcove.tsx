// SCENE 11 — THE SECRET ALCOVE
// Hero shot: full-size looping MP4 sigil on the pedestal.
import type { SceneConfig } from '../sceneTypes';
import { SIGIL_COLORS } from '../sceneTypes';
import { DitherOverlay } from '../sceneShared';
import { RealSigilVideo } from '../RealSigil';
import { TextureOverlay } from '../TextureOverlay';
import { ScanlineOverlay } from '../ScanlineOverlay';

const SecretAlcove = () => (
  <div style={{
    position: 'absolute', inset: 0,
    background: `radial-gradient(ellipse at 50% 40%, #1a1a2a 0%, ${SIGIL_COLORS.black} 70%)`,
    overflow: 'hidden',
  }}>
    {/* Spotlight on pedestal */}
    <div style={{
      position: 'absolute', left: '30%', right: '30%', top: 0, bottom: 0,
      background: `radial-gradient(ellipse at 50% 50%, ${SIGIL_COLORS.skyBlue}30 0%, transparent 60%)`,
    }} />

    {/* Pedestal */}
    <div style={{
      position: 'absolute', left: '38%', right: '38%', bottom: '10%', height: '28%',
      background: `linear-gradient(180deg, #444, #0a0a0a)`,
      border: `1px solid ${SIGIL_COLORS.yellow}80`,
      boxShadow: 'inset 0 0 24px rgba(0,0,0,0.8), 0 0 40px rgba(73,130,207,0.25)',
    }} />

    {/* Hero — looping video sigil */}
    <div style={{
      position: 'absolute', left: '50%', top: '28%',
      transform: 'translateX(-50%)',
      width: '36%', maxWidth: 520, aspectRatio: '1',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <RealSigilVideo size="100%" />
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
    <TextureOverlay intensity={0.4} />
    <ScanlineOverlay />
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
