// NominationTerminal — CRT-bezel-framed embed of the existing nomination console.
// Reuses the existing NominationConsole component, scaled to fit a CRT.
import NominationConsole from '../NominationConsole';
import { SIGIL_COLORS } from '../sceneTypes';

const NominationTerminal = () => (
  <div style={{
    width: '100%', height: '100%',
    background: `linear-gradient(180deg, #4a4a4a, #1a1a1a)`,
    border: `4px solid #2a2a2a`,
    borderRadius: 8,
    padding: 12,
    boxShadow: '0 8px 24px rgba(0,0,0,0.8), inset 0 0 12px rgba(0,0,0,0.5)',
    display: 'flex', flexDirection: 'column',
  }}>
    {/* CRT bezel inner */}
    <div style={{
      flex: 1,
      background: SIGIL_COLORS.black,
      border: `2px inset #555`,
      borderRadius: 6,
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Scanlines */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
        backgroundImage: `repeating-linear-gradient(0deg, rgba(0,0,0,0.25) 0 1px, transparent 1px 3px)`,
      }} />
      {/* Curved screen vignette */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
        background: `radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.5) 100%)`,
      }} />
      {/* Console content — scaled and scrollable */}
      <div style={{
        position: 'absolute', inset: 0,
        overflow: 'auto',
        transform: 'scale(0.5)',
        transformOrigin: 'top left',
        width: '200%', height: '200%',
        cursor: 'auto',
      }}>
        <NominationConsole />
      </div>
    </div>
    {/* Plate */}
    <div style={{
      marginTop: 6, padding: 4, textAlign: 'center',
      fontFamily: '"Space Mono", monospace',
      fontSize: 8, letterSpacing: 2, color: SIGIL_COLORS.yellow,
      textTransform: 'uppercase',
    }}>
      NOMINATION TERMINAL — ZN-0042
    </div>
  </div>
);

export default NominationTerminal;
