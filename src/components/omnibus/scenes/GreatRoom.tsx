// SCENE 05 — THE GREAT ROOM (central hub)
// Real Z-sigil chandelier as visual anchor, ornament-rich, no archway labels.
import type { SceneConfig } from '../sceneTypes';
import { SIGIL_COLORS } from '../sceneTypes';
import { Archway, DitherOverlay } from '../sceneShared';
import { RealSigil } from '../RealSigil';
import { TextureOverlay } from '../TextureOverlay';
import { ScanlineOverlay } from '../ScanlineOverlay';

const GreatRoom = () => (
  <div style={{
    position: 'absolute', inset: 0,
    background: `linear-gradient(180deg, ${SIGIL_COLORS.federalBlue} 0%, #2a3050 50%, #0a0a18 100%)`,
    overflow: 'hidden',
  }}>
    {/* Draped ceiling — pleated curves radiating from chandelier suspension */}
    <svg style={{
      position: 'absolute', left: 0, right: 0, top: 0, width: '100%', height: '32%',
      pointerEvents: 'none',
    }} preserveAspectRatio="none" viewBox="0 0 100 32">
      {Array.from({ length: 14 }).map((_, i) => {
        const startX = (i / 13) * 100;
        return (
          <path
            key={i}
            d={`M ${startX},0 Q ${startX + (50 - startX) * 0.4},${10 + Math.abs(50 - startX) * 0.18} 50,32`}
            stroke="rgba(10,18,40,0.6)"
            strokeWidth="0.4"
            fill="none"
          />
        );
      })}
      {/* Subtle highlight pleats */}
      {Array.from({ length: 7 }).map((_, i) => {
        const startX = (i / 6) * 100;
        return (
          <path
            key={`h-${i}`}
            d={`M ${startX},0 Q ${startX + (50 - startX) * 0.4},${10 + Math.abs(50 - startX) * 0.18} 50,32`}
            stroke="rgba(255,232,0,0.05)"
            strokeWidth="0.3"
            fill="none"
          />
        );
      })}
    </svg>

    {/* Chandelier chain (3 chrome ellipse links) */}
    <svg style={{
      position: 'absolute', left: '50%', top: 0, width: 14, height: '20%',
      transform: 'translateX(-50%)',
    }} viewBox="0 0 14 100" preserveAspectRatio="none">
      {[12, 32, 52, 72].map((cy, i) => (
        <ellipse key={i} cx="7" cy={cy} rx="3.5" ry="6"
          fill="none" stroke="#cdcdcd" strokeWidth="1.2" />
      ))}
    </svg>

    {/* Chandelier — REAL Z sigil hanging, scaled big */}
    <div style={{
      position: 'absolute', left: '50%', top: '18%',
      transform: 'translateX(-50%)',
      transformOrigin: 'top center',
      animation: 'chandelierSway 1.5s ease-in-out infinite',
      width: '22%', maxHeight: '38%',
      display: 'flex', justifyContent: 'center',
    }}>
      <RealSigil size="100%" glow spinDuration={40} />
    </div>

    {/* 4 large archways (no text labels) */}
    <div style={{ position: 'absolute', left: '2%', top: '22%', width: '20%', height: '52%' }}>
      <Archway />
    </div>
    <div style={{ position: 'absolute', right: '2%', top: '22%', width: '20%', height: '52%' }}>
      <Archway />
    </div>
    <div style={{ position: 'absolute', left: '26%', top: '30%', width: '18%', height: '40%' }}>
      <Archway />
    </div>
    <div style={{ position: 'absolute', right: '26%', top: '30%', width: '18%', height: '40%' }}>
      <Archway />
    </div>

    {/* Bas-relief panels flanking each archway */}
    {[
      { left: '22.2%', top: '22%' }, { left: '24.2%', top: '22%' },
      { left: '44.2%', top: '30%' }, { left: '46.2%', top: '30%' },
      { right: '44.2%', top: '30%' }, { right: '46.2%', top: '30%' },
      { right: '22.2%', top: '22%' }, { right: '24.2%', top: '22%' },
    ].slice(0, 4).map((pos, i) => (
      <div key={i} style={{
        position: 'absolute',
        ...pos,
        width: '1.6%', height: '50%',
        background: `repeating-linear-gradient(0deg, ${SIGIL_COLORS.yellow}80 0 6px, #6a4818 6px 12px, ${SIGIL_COLORS.yellow}80 12px 14px, #2a1a08 14px 24px)`,
        opacity: 0.55,
        border: `1px solid ${SIGIL_COLORS.black}`,
      }} />
    ))}

    {/* Mosaic floor with central medallion (orbital ring motif) */}
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0, height: '26%',
      background: SIGIL_COLORS.black,
      borderTop: `1px solid ${SIGIL_COLORS.yellow}`,
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `repeating-conic-gradient(from 0deg at 50% 0%, ${SIGIL_COLORS.yellow}20 0deg 10deg, transparent 10deg 20deg)`,
      }} />
      {/* Central orbital-ring medallion */}
      <svg style={{
        position: 'absolute', left: '38%', right: '38%', top: '10%', bottom: '10%',
        width: '24%', height: '80%', margin: 'auto',
      }} viewBox="0 0 100 100">
        <ellipse cx="50" cy="50" rx="44" ry="14" fill="none" stroke={`${SIGIL_COLORS.yellow}80`} strokeWidth="1" transform="rotate(32 50 50)" />
        <ellipse cx="50" cy="50" rx="44" ry="14" fill="none" stroke={`${SIGIL_COLORS.yellow}80`} strokeWidth="1" transform="rotate(-32 50 50)" />
        <ellipse cx="50" cy="50" rx="30" ry="9" fill="none" stroke={`${SIGIL_COLORS.pink}60`} strokeWidth="0.8" transform="rotate(0 50 50)" />
        <circle cx="50" cy="50" r="4" fill={`${SIGIL_COLORS.yellow}60`} />
      </svg>
    </div>

    {/* Wall sconces — Fluorescent Red glow */}
    {[15, 38, 62, 85].map((x) => (
      <div key={x} style={{
        position: 'absolute',
        left: `${x}%`, top: '38%',
        width: 16, height: 24,
        background: `radial-gradient(ellipse at 50% 30%, ${SIGIL_COLORS.red}, ${SIGIL_COLORS.yellow}80)`,
        boxShadow: `0 0 24px ${SIGIL_COLORS.red}90, 0 0 48px ${SIGIL_COLORS.red}50`,
        clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0 100%)',
      }} />
    ))}

    {/* Hidden service door — flush with right wall, very faint */}
    <div style={{
      position: 'absolute', right: '23%', top: '60%',
      width: '3%', height: '14%',
      background: `linear-gradient(180deg, #2a3050, #1a1a30)`,
      border: `1px solid ${SIGIL_COLORS.federalBlue}`,
      opacity: 0.5,
    }} />

    <DitherOverlay opacity={0.12} />
    <TextureOverlay intensity={0.35} />
    <ScanlineOverlay />
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
    { area: { left: 2, top: 22, width: 20, height: 52 }, label: 'Art Gallery', to: 'art-gallery' },
    { area: { left: 78, top: 22, width: 20, height: 52 }, label: 'Lore Vault', to: 'lore-vault' },
    { area: { left: 26, top: 30, width: 18, height: 40 }, label: 'Arcade', to: 'arcade' },
    { area: { left: 56, top: 30, width: 18, height: 40 }, label: 'Code Chamber', to: 'code-chamber' },
    // Hidden service door — no tooltip, smaller area
    { area: { left: 74, top: 60, width: 3, height: 14 }, label: 'Service door', to: 'utility-closet' },
  ],
};

export default GreatRoom;
