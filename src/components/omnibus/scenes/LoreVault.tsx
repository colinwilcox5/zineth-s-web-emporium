// SCENE 07 — THE LORE VAULT
import type { SceneConfig } from '../sceneTypes';
import { SIGIL_COLORS } from '../sceneTypes';
import { DitherOverlay } from '../sceneShared';
import { TextureOverlay } from '../TextureOverlay';
import { ScanlineOverlay } from '../ScanlineOverlay';

const SHELF_COLORS = [SIGIL_COLORS.pink, SIGIL_COLORS.yellow, SIGIL_COLORS.green, SIGIL_COLORS.skyBlue, SIGIL_COLORS.red];

const LoreVault = () => (
  <div style={{
    position: 'absolute', inset: 0,
    background: `linear-gradient(180deg, ${SIGIL_COLORS.federalBlue} 0%, #1a2030 60%, #0a0a18 100%)`,
    overflow: 'hidden',
  }}>
    {/* Tall narrow windows back wall */}
    {[20, 80].map((x) => (
      <div key={x} style={{
        position: 'absolute', left: `${x}%`, top: '8%', width: '4%', height: '50%',
        background: `linear-gradient(180deg, ${SIGIL_COLORS.pink}30, ${SIGIL_COLORS.federalBlue}10)`,
        border: `1px solid ${SIGIL_COLORS.yellow}40`,
        boxShadow: `0 0 24px ${SIGIL_COLORS.pink}30`,
      }} />
    ))}

    {/* 6 shelf sections (3 left, 3 right) */}
    {[0, 1, 2, 3, 4, 5].map((i) => {
      const side = i < 3 ? 'left' : 'right';
      const idx = i % 3;
      const xBase = side === 'left' ? 4 + idx * 9 : 60 + idx * 9;
      return (
        <div key={i} style={{
          position: 'absolute', left: `${xBase}%`, top: '16%', width: '8%', height: '52%',
          background: SIGIL_COLORS.black,
          border: `1px solid ${SIGIL_COLORS.yellow}80`,
          padding: 4,
          display: 'flex', flexDirection: 'column', gap: 3,
        }}>
          {Array.from({ length: 4 }).map((_, row) => (
            <div key={row} style={{
              flex: 1,
              display: 'flex', gap: 2,
              borderBottom: `1px solid ${SIGIL_COLORS.yellow}40`,
              alignItems: 'flex-end',
            }}>
              {Array.from({ length: 8 }).map((_, b) => (
                <div key={b} style={{
                  flex: 1,
                  height: `${65 + (b * 31 + row * 17) % 35}%`,
                  background: SHELF_COLORS[(b + row + i) % SHELF_COLORS.length],
                  border: '1px solid rgba(0,0,0,0.4)',
                }} />
              ))}
            </div>
          ))}
        </div>
      );
    })}

    {/* Center pedestal w/ open book */}
    <div style={{
      position: 'absolute', left: '42%', right: '42%', bottom: '8%', height: '32%',
    }}>
      {/* Pedestal */}
      <div style={{
        position: 'absolute', left: '15%', right: '15%', bottom: 0, height: '60%',
        background: `linear-gradient(180deg, #555, #1a1a1a)`,
        border: `1px solid ${SIGIL_COLORS.yellow}80`,
      }} />
      {/* Book */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: '55%', height: '40%',
        background: `linear-gradient(180deg, #c0392b, #8b1a0c)`,
        boxShadow: `0 0 28px ${SIGIL_COLORS.yellow}90, 0 0 56px ${SIGIL_COLORS.yellow}40`,
        border: `2px solid ${SIGIL_COLORS.yellow}`,
        animation: 'lavaButtonPulse 4s ease-in-out infinite',
      }} />
    </div>

    {/* Floor */}
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0, height: '8%',
      background: SIGIL_COLORS.black,
      borderTop: `1px solid ${SIGIL_COLORS.yellow}40`,
    }} />

    <DitherOverlay opacity={0.14} />
    <TextureOverlay intensity={0.4} />
    <ScanlineOverlay />
  </div>
);

export const loreVaultScene: SceneConfig = {
  id: 'lore-vault',
  title: 'The Lore Vault',
  preloadAdjacent: ['great-room'],
  ambientSoundId: 'mansion-hall',
  background: <LoreVault />,
  backTo: 'great-room',
  hotspots: [
    // Center pedestal book
    { area: { left: 42, top: 60, width: 16, height: 18 }, label: 'Open codex', to: 'great-room', tooltip: 'Read' },
    // Shelf groups (left)
    { area: { left: 4, top: 16, width: 8, height: 52 }, label: 'Shelf left 1', to: 'great-room' },
    { area: { left: 13, top: 16, width: 8, height: 52 }, label: 'Shelf left 2', to: 'great-room' },
    { area: { left: 22, top: 16, width: 8, height: 52 }, label: 'Shelf left 3', to: 'great-room' },
    // Shelf groups (right)
    { area: { left: 60, top: 16, width: 8, height: 52 }, label: 'Shelf right 1', to: 'great-room' },
    { area: { left: 69, top: 16, width: 8, height: 52 }, label: 'Shelf right 2', to: 'great-room' },
    { area: { left: 78, top: 16, width: 8, height: 52 }, label: 'Shelf right 3', to: 'great-room' },
  ],
};

export default LoreVault;
