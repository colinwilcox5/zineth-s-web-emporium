// SCENE 03 — THE IDOL DOORWAY
import { useState, useEffect } from 'react';
import type { SceneConfig } from '../sceneTypes';
import { SIGIL_COLORS } from '../sceneTypes';
import { DitherOverlay, ChromeSigil } from '../sceneShared';

interface IdolDoorwayProps {
  doorsOpening: boolean;
}

const IdolDoorway = ({ doorsOpening }: IdolDoorwayProps) => (
  <div style={{
    position: 'absolute', inset: 0,
    background: `linear-gradient(180deg, ${SIGIL_COLORS.federalBlue} 0%, #2a2a3a 40%, #1a1410 100%)`,
    overflow: 'hidden',
  }}>
    {/* Spotlight */}
    <div style={{
      position: 'absolute', left: '20%', right: '20%', top: 0, bottom: 0,
      background: `radial-gradient(ellipse at 50% 30%, ${SIGIL_COLORS.pink}25 0%, transparent 60%), radial-gradient(ellipse at 50% 50%, ${SIGIL_COLORS.yellow}18 0%, transparent 50%)`,
      pointerEvents: 'none',
    }} />

    {/* Stone shrine — central */}
    <div style={{
      position: 'absolute', left: '25%', right: '25%', top: '15%', bottom: '8%',
      background: `linear-gradient(180deg, #555 0%, #333 50%, #1a1a1a 100%)`,
      border: '4px solid #222',
      boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)',
    }}>
      {/* Top scrollwork */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 0, height: '12%',
        background: `repeating-linear-gradient(90deg, ${SIGIL_COLORS.yellow}, ${SIGIL_COLORS.yellow} 8px, #444 8px, #444 16px)`,
        opacity: 0.5,
        borderBottom: `2px solid ${SIGIL_COLORS.yellow}`,
      }} />

      {/* Bas-relief sigil */}
      <div style={{
        position: 'absolute', left: '25%', right: '25%', top: '15%', height: '35%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        filter: 'contrast(1.4) sepia(0.3) brightness(0.85)',
      }}>
        <ChromeSigil size={140} />
      </div>

      {/* Doors */}
      <div style={{
        position: 'absolute', left: '20%', right: '20%', top: '52%', bottom: '8%',
        display: 'flex',
      }}>
        <div style={{
          flex: 1,
          background: `linear-gradient(180deg, #3a2818, #1a1208)`,
          border: `2px solid ${SIGIL_COLORS.yellow}40`,
          borderRight: 'none',
          transform: doorsOpening ? 'translateX(-100%)' : 'translateX(0)',
          transition: 'transform 1s ease-in',
        }} />
        <div style={{
          flex: 1,
          background: `linear-gradient(180deg, #3a2818, #1a1208)`,
          border: `2px solid ${SIGIL_COLORS.yellow}40`,
          borderLeft: 'none',
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
      {/* Door click hotspot */}
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

// Scene config builder — needs handlers
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
