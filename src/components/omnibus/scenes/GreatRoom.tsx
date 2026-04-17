// SCENE 05 — THE GREAT ROOM (central hub, 5 hotspots + secret door)
import type { SceneConfig } from '../sceneTypes';
import { SIGIL_COLORS } from '../sceneTypes';
import { Archway, DitherOverlay, ChromeSigil } from '../sceneShared';

const GreatRoom = () => (
  <div style={{
    position: 'absolute', inset: 0,
    background: `linear-gradient(180deg, ${SIGIL_COLORS.federalBlue} 0%, #2a3050 50%, #0a0a18 100%)`,
    overflow: 'hidden',
  }}>
    {/* Draped ceiling canopy */}
    <div style={{
      position: 'absolute', inset: 0, height: '20%',
      background: `linear-gradient(180deg, ${SIGIL_COLORS.federalBlue}, transparent)`,
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `repeating-linear-gradient(90deg, transparent 0 20px, rgba(0,0,0,0.3) 20px 22px)`,
        clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
      }} />
    </div>

    {/* Chandelier — Z sigil hanging from ceiling */}
    <div style={{ position: 'absolute', left: '50%', top: 0, height: '38%', width: 2, transform: 'translateX(-50%)', background: `linear-gradient(180deg, transparent, ${SIGIL_COLORS.yellow}40)` }} />
    <div style={{
      position: 'absolute', left: '50%', top: '20%',
      transform: 'translateX(-50%)',
      transformOrigin: 'top center',
      animation: 'chandelierSway 6s ease-in-out infinite',
    }}>
      <ChromeSigil size={120} glow spinDuration={40} />
      {/* Pendants */}
      {[15, 35, 55, 75].map((angle) => (
        <div key={angle} style={{
          position: 'absolute', top: '90%', left: '50%',
          width: 2, height: 30,
          background: SIGIL_COLORS.yellow,
          transform: `rotate(${angle - 45}deg) translateY(0)`,
          transformOrigin: 'top center',
          opacity: 0.5,
        }} />
      ))}
    </div>

    {/* 4 large archways — left wall, right wall, forward-left, forward-right */}
    {/* Left archway → Art Gallery */}
    <div style={{ position: 'absolute', left: '2%', top: '22%', width: '20%', height: '52%' }}>
      <Archway label="GALLERY" />
    </div>
    {/* Right archway → Lore Vault */}
    <div style={{ position: 'absolute', right: '2%', top: '22%', width: '20%', height: '52%' }}>
      <Archway label="VAULT" />
    </div>
    {/* Forward-left smaller → Arcade */}
    <div style={{ position: 'absolute', left: '26%', top: '30%', width: '18%', height: '40%' }}>
      <Archway label="ARCADE" />
    </div>
    {/* Forward-right smaller → Code Chamber */}
    <div style={{ position: 'absolute', right: '26%', top: '30%', width: '18%', height: '40%' }}>
      <Archway label="CHAMBER" />
    </div>

    {/* Mosaic floor with central medallion */}
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0, height: '26%',
      background: SIGIL_COLORS.black,
      borderTop: `1px solid ${SIGIL_COLORS.yellow}`,
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `repeating-conic-gradient(from 0deg at 50% 0%, ${SIGIL_COLORS.yellow}20 0deg 10deg, transparent 10deg 20deg)`,
      }} />
      {/* Central compass medallion */}
      <div style={{
        position: 'absolute', left: '40%', right: '40%', top: '20%', bottom: '20%',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${SIGIL_COLORS.yellow}30, ${SIGIL_COLORS.pink}20, transparent 70%)`,
        border: `1px solid ${SIGIL_COLORS.yellow}60`,
      }} />
    </div>

    {/* Wall sconces */}
    {[15, 85].map((x) => (
      <div key={x} style={{
        position: 'absolute',
        left: `${x}%`, top: '38%',
        width: 16, height: 24,
        background: `radial-gradient(ellipse at 50% 30%, ${SIGIL_COLORS.red}, ${SIGIL_COLORS.yellow}80)`,
        boxShadow: `0 0 24px ${SIGIL_COLORS.red}90`,
        clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0 100%)',
      }} />
    ))}

    {/* Hidden service door — flush with right wall bas-relief */}
    <div style={{
      position: 'absolute', right: '23%', top: '60%',
      width: '3%', height: '14%',
      background: `linear-gradient(180deg, #2a3050, #1a1a30)`,
      border: `1px solid ${SIGIL_COLORS.federalBlue}`,
      opacity: 0.6,
    }} />

    <DitherOverlay opacity={0.12} />
  </div>
);

export const greatRoomScene: SceneConfig = {
  id: 'great-room',
  title: 'The Great Room',
  preloadAdjacent: ['art-gallery', 'lore-vault', 'arcade', 'code-chamber', 'utility-closet'],
  ambientSoundId: 'great-room',
  background: <GreatRoom />,
  backTo: 'foyer',
  hotspots: [
    { area: { left: 2, top: 22, width: 20, height: 52 }, label: 'Art Gallery', to: 'art-gallery', tooltip: 'Gallery' },
    { area: { left: 78, top: 22, width: 20, height: 52 }, label: 'Lore Vault', to: 'lore-vault', tooltip: 'Vault' },
    { area: { left: 26, top: 30, width: 18, height: 40 }, label: 'Arcade', to: 'arcade', tooltip: 'Arcade' },
    { area: { left: 56, top: 30, width: 18, height: 40 }, label: 'Code Chamber', to: 'code-chamber', tooltip: 'Chamber' },
    // Hidden service door — no tooltip, smaller area
    { area: { left: 74, top: 60, width: 3, height: 14 }, label: 'Service door', to: 'utility-closet' },
  ],
};

export default GreatRoom;
