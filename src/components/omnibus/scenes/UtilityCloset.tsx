// SCENE 10 — THE UTILITY CLOSET (contains migrated Omnibus-of-Fun webchain)
import type { SceneConfig } from '../sceneTypes';
import { SIGIL_COLORS } from '../sceneTypes';
import { DitherOverlay } from '../sceneShared';
import PatchPanel from '../patchPanel/PatchPanel';
import NominationTerminal from '../patchPanel/NominationTerminal';

const UtilityCloset = () => (
  <div style={{
    position: 'absolute', inset: 0,
    background: `linear-gradient(180deg, #2a3040 0%, #1a2030 60%, #0a0f18 100%)`,
    overflow: 'hidden',
  }}>
    {/* Exposed pipes ceiling */}
    {[8, 14, 20].map((y) => (
      <div key={y} style={{
        position: 'absolute', left: 0, right: 0, top: `${y}%`,
        height: 6,
        background: `linear-gradient(180deg, #555, #2a2a2a)`,
        boxShadow: '0 2px 4px rgba(0,0,0,0.6)',
      }} />
    ))}

    {/* Pendant bulb */}
    <div style={{
      position: 'absolute', left: '50%', top: '8%',
      transform: 'translateX(-50%)',
      width: 2, height: 60,
      background: SIGIL_COLORS.black,
    }} />
    <div style={{
      position: 'absolute', left: '50%', top: '22%',
      transform: 'translateX(-50%)',
      width: 24, height: 24,
      borderRadius: '50%',
      background: `radial-gradient(circle, ${SIGIL_COLORS.yellow}, ${SIGIL_COLORS.red} 80%)`,
      boxShadow: `0 0 80px ${SIGIL_COLORS.yellow}80, 0 0 160px ${SIGIL_COLORS.yellow}40`,
    }} />

    {/* Concrete walls */}
    <div style={{
      position: 'absolute', inset: '26% 0 0 0',
      background: `repeating-linear-gradient(0deg, transparent 0 60px, rgba(0,0,0,0.15) 60px 61px), repeating-linear-gradient(90deg, transparent 0 80px, rgba(0,0,0,0.15) 80px 81px)`,
    }} />

    {/* Patch Panel — back wall, large */}
    <div style={{
      position: 'absolute', left: '22%', right: '22%', top: '30%', bottom: '24%',
    }}>
      <PatchPanel />
    </div>

    {/* CRT monitor — right of panel */}
    <div style={{
      position: 'absolute', right: '2%', top: '34%', width: '18%', bottom: '24%',
    }}>
      <NominationTerminal />
    </div>

    {/* Binders shelf — left of panel */}
    <div style={{
      position: 'absolute', left: '2%', top: '34%', width: '18%', bottom: '24%',
      background: `linear-gradient(180deg, #444, #1a1a1a)`,
      border: `1px solid ${SIGIL_COLORS.yellow}40`,
      padding: 8,
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      {['CHAIN OF TRUST', 'NODE REGISTRY', 'SIGNAL MAP', 'INDEX'].map((label, i) => (
        <div key={label} style={{
          flex: 1,
          background: [SIGIL_COLORS.pink, SIGIL_COLORS.yellow, SIGIL_COLORS.skyBlue, SIGIL_COLORS.green][i],
          border: `1px solid ${SIGIL_COLORS.black}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: '"Space Mono", monospace',
          fontSize: 9, letterSpacing: 1.5, color: SIGIL_COLORS.black,
          fontWeight: 700,
        }}>
          {label}
        </div>
      ))}
    </div>

    {/* Industrial floor */}
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0, height: '20%',
      background: `repeating-linear-gradient(0deg, #1a1a1a 0 3px, #0a0a0a 3px 6px)`,
    }} />

    <DitherOverlay opacity={0.18} color="#000" />
  </div>
);

export const utilityClosetScene: SceneConfig = {
  id: 'utility-closet',
  title: 'The Utility Closet',
  preloadAdjacent: ['great-room'],
  ambientSoundId: 'utility-closet',
  background: <UtilityCloset />,
  backTo: 'great-room',
  hotspots: [],
};

export default UtilityCloset;
