// SCENE 03 — THE IDOL DOORWAY
// Spotlit Z-sigil carved into stone, double doors, no instructional text.
import { useState, useEffect } from 'react';
import type { SceneConfig } from '../sceneTypes';
import { SIGIL_COLORS } from '../sceneTypes';
import { DitherOverlay } from '../sceneShared';
import { RealSigil } from '../RealSigil';
import { TextureOverlay } from '../TextureOverlay';

interface IdolDoorwayProps {
  doorsOpening: boolean;
}

const IdolDoorway = ({ doorsOpening }: IdolDoorwayProps) => (
  <div style={{
    position: 'absolute', inset: 0,
    background: `linear-gradient(180deg, ${SIGIL_COLORS.federalBlue} 0%, #2a2a3a 40%, #1a1410 100%)`,
    overflow: 'hidden',
  }}>
    {/* Spotlight from above */}
    <div style={{
      position: 'absolute', left: '20%', right: '20%', top: 0, bottom: 0,
      background: `radial-gradient(ellipse at 50% 25%, ${SIGIL_COLORS.cream}30 0%, ${SIGIL_COLORS.yellow}20 25%, transparent 60%), radial-gradient(ellipse at 50% 50%, ${SIGIL_COLORS.pink}20 0%, transparent 50%)`,
      pointerEvents: 'none',
    }} />

    {/* Stone shrine — central */}
    <div style={{
      position: 'absolute', left: '25%', right: '25%', top: '15%', bottom: '8%',
      background: `linear-gradient(180deg, #555 0%, #333 50%, #1a1a1a 100%)`,
      border: '4px solid #222',
      boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)',
    }}>
      {/* Subtle stone crack lines */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        <path d="M 5% 18% L 12% 30% L 8% 48% L 18% 70%" stroke="rgba(0,0,0,0.45)" strokeWidth="1" fill="none" />
        <path d="M 90% 12% L 82% 28% L 88% 50% L 78% 80%" stroke="rgba(0,0,0,0.45)" strokeWidth="1" fill="none" />
        <path d="M 30% 8% L 42% 16%" stroke="rgba(0,0,0,0.35)" strokeWidth="0.8" fill="none" />
      </svg>

      {/* Top scrollwork */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 0, height: '12%',
        background: `repeating-linear-gradient(90deg, ${SIGIL_COLORS.yellow}, ${SIGIL_COLORS.yellow} 8px, #444 8px, #444 16px)`,
        opacity: 0.5,
        borderBottom: `2px solid ${SIGIL_COLORS.yellow}`,
      }} />

      {/* Carved sigil — REAL PNG with stone-carving filter */}
      <div style={{
        position: 'absolute', left: '20%', right: '20%', top: '14%', height: '38%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <RealSigil size="100%" variant="stone" />
      </div>

      {/* Double doors with vertical seam */}
      <div style={{
        position: 'absolute', left: '20%', right: '20%', top: '54%', bottom: '8%',
        display: 'flex',
        boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.8)',
      }}>
        <div style={{
          flex: 1,
          background: `linear-gradient(180deg, #3a2818, #1a1208)`,
          border: `2px solid ${SIGIL_COLORS.yellow}40`,
          borderRight: `1px solid ${SIGIL_COLORS.black}`,
          transform: doorsOpening ? 'translateX(-100%)' : 'translateX(0)',
          transition: 'transform 1s ease-in',
        }} />
        <div style={{
          flex: 1,
          background: `linear-gradient(180deg, #3a2818, #1a1208)`,
          border: `2px solid ${SIGIL_COLORS.yellow}40`,
          borderLeft: `1px solid ${SIGIL_COLORS.black}`,
          transform: doorsOpening ? 'translateX(100%)' : 'translateX(0)',
          transition: 'transform 1s ease-in',
        }} />
      </div>

      {/* Steps */}
      <div style={{
        position: 'absolute', left: '-8%', right: '-8%', bottom: '-8%', height: '10%',
        background: `linear-gradient(180deg, #555, #2a2a2a)`,
        borderTop: '2px solid #666',
      }} />
    </div>

    <DitherOverlay opacity={0.2} />
    <TextureOverlay intensity={0.22} blend="overlay" />
  </div>
);

interface IdolDoorwaySceneProps {
  onEnterMansion: () => void;
  onBack: () => void;
}

export const IdolDoorwayWithLogic = ({ onEnterMansion, onBack: _onBack }: IdolDoorwaySceneProps) => {
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    if (!opening) return;
    const t = setTimeout(() => onEnterMansion(), 1100);
    return () => clearTimeout(t);
  }, [opening, onEnterMansion]);

  return (
    <>
      <IdolDoorway doorsOpening={opening} />
      <div
        onClick={() => !opening && setOpening(true)}
        style={{
          position: 'absolute',
          left: '32%', top: '60%', width: '36%', height: '28%',
          cursor: 'none',
        }}
      />
    </>
  );
};

export const idolDoorwayScene = (handlers: { onEnterMansion: () => void; onBack: () => void }): SceneConfig => ({
  id: 'idol-doorway',
  title: 'The Idol Doorway',
  preloadAdjacent: ['foyer', 'fog-forest'],
  ambientSoundId: 'mansion-hall',
  background: <IdolDoorwayWithLogic {...handlers} />,
  hotspots: [],
  backTo: 'fog-forest',
});

export default IdolDoorway;
