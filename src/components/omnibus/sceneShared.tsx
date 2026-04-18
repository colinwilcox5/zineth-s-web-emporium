// Shared placeholder visual primitives for Omnibus scenes.
// Every scene uses these schematic stand-ins, swappable for real art later.
import { SigilSvg } from './CursorSigil';
import { SIGIL_COLORS } from './sceneTypes';

/** Diagonal-line dither overlay (subtle, riso-feel). */
export const DitherOverlay = ({ color = '#000', opacity = 0.18 }: { color?: string; opacity?: number }) => (
  <div style={{
    position: 'absolute', inset: 0, pointerEvents: 'none',
    backgroundImage: `repeating-linear-gradient(45deg, ${color} 0 1px, transparent 1px 3px), repeating-linear-gradient(-45deg, ${color} 0 1px, transparent 1px 4px)`,
    opacity,
    mixBlendMode: 'multiply',
  }} />
);

/** Reflective floor effect — a horizontally-flipped, blurred, faded duplicate. */
export const ReflectiveFloor = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    position: 'absolute',
    left: 0, right: 0, top: '60%', bottom: 0,
    overflow: 'hidden',
    background: 'linear-gradient(to bottom, transparent, rgba(10,10,10,0.6))',
  }}>
    <div style={{
      position: 'absolute', inset: 0,
      transform: 'scaleY(-1)',
      transformOrigin: 'top',
      opacity: 0.3,
      filter: 'blur(2px)',
    }}>
      {children}
    </div>
  </div>
);

/** Labeled placeholder rectangle — dotted border, riso color, label. */
export const Stub = ({
  color = SIGIL_COLORS.federalBlue,
  label,
  fontSize = 10,
}: { color?: string; label: string; fontSize?: number }) => (
  <div style={{
    width: '100%', height: '100%',
    border: `1.5px dotted ${color}`,
    background: `${color}1a`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: '"Space Mono", monospace',
    fontSize, letterSpacing: 2, color,
    textTransform: 'uppercase',
    textAlign: 'center', padding: 4,
  }}>
    {label}
  </div>
);

/** Small chrome sigil rendering — used for chandeliers, emblems, etc. */
export const ChromeSigil = ({ size, glow = false, spinDuration }: { size: number; glow?: boolean; spinDuration?: number }) => (
  <div style={{
    width: size, height: size,
    filter: glow ? 'drop-shadow(0 0 12px #4982CF) drop-shadow(0 0 24px rgba(73,130,207,0.4))' : 'drop-shadow(0 4px 12px rgba(0,0,0,0.6))',
    animation: spinDuration ? `chromeSigilSpin ${spinDuration}s linear infinite` : undefined,
  }}>
    <SigilSvg size={size} />
  </div>
);

/** Architectural arch placeholder — symmetric Riso pillar w/ archway.
 * Label rendered only when `showLabel` is true (dev / legacy). */
export const Archway = ({ label, glow = false, showLabel = false }: { label?: string; glow?: boolean; showLabel?: boolean }) => (
  <div style={{
    width: '100%', height: '100%', position: 'relative',
    background: glow
      ? 'radial-gradient(ellipse at 50% 100%, rgba(255,232,0,0.35), transparent 60%)'
      : 'transparent',
  }}>
    {/* Left pillar */}
    <div style={{
      position: 'absolute', left: 0, top: 0, bottom: 0, width: '14%',
      background: `linear-gradient(to right, ${SIGIL_COLORS.yellow} 0%, ${SIGIL_COLORS.pink} 50%, ${SIGIL_COLORS.yellow} 100%)`,
      filter: 'brightness(0.85)',
    }}>
      <div style={{
        position: 'absolute', left: '-15%', right: '-15%', top: 0, height: '5%',
        background: `linear-gradient(180deg, ${SIGIL_COLORS.yellow}, #6a4818)`,
        borderBottom: `1px solid ${SIGIL_COLORS.black}`,
      }} />
      <div style={{
        position: 'absolute', inset: '5% 0 5% 0',
        backgroundImage: `repeating-linear-gradient(90deg, transparent 0 18%, rgba(0,0,0,0.35) 18%, rgba(0,0,0,0.35) 19%, transparent 19% 36%)`,
        opacity: 0.6,
      }} />
      <div style={{
        position: 'absolute', left: '-15%', right: '-15%', bottom: 0, height: '4%',
        background: `linear-gradient(180deg, #6a4818, ${SIGIL_COLORS.yellow})`,
        borderTop: `1px solid ${SIGIL_COLORS.black}`,
      }} />
    </div>
    {/* Right pillar */}
    <div style={{
      position: 'absolute', right: 0, top: 0, bottom: 0, width: '14%',
      background: `linear-gradient(to right, ${SIGIL_COLORS.yellow} 0%, ${SIGIL_COLORS.pink} 50%, ${SIGIL_COLORS.yellow} 100%)`,
      filter: 'brightness(0.85)',
    }}>
      <div style={{
        position: 'absolute', left: '-15%', right: '-15%', top: 0, height: '5%',
        background: `linear-gradient(180deg, ${SIGIL_COLORS.yellow}, #6a4818)`,
        borderBottom: `1px solid ${SIGIL_COLORS.black}`,
      }} />
      <div style={{
        position: 'absolute', inset: '5% 0 5% 0',
        backgroundImage: `repeating-linear-gradient(90deg, transparent 0 18%, rgba(0,0,0,0.35) 18%, rgba(0,0,0,0.35) 19%, transparent 19% 36%)`,
        opacity: 0.6,
      }} />
      <div style={{
        position: 'absolute', left: '-15%', right: '-15%', bottom: 0, height: '4%',
        background: `linear-gradient(180deg, #6a4818, ${SIGIL_COLORS.yellow})`,
        borderTop: `1px solid ${SIGIL_COLORS.black}`,
      }} />
    </div>
    {/* Arch crown */}
    <div style={{
      position: 'absolute', left: '14%', right: '14%', top: 0, height: '18%',
      borderBottom: `3px solid ${SIGIL_COLORS.yellow}`,
      borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
      background: SIGIL_COLORS.federalBlue,
    }} />
    {/* Keystone */}
    <div style={{
      position: 'absolute', left: '47%', right: '47%', top: '-2%', height: '8%',
      background: `linear-gradient(180deg, ${SIGIL_COLORS.yellow}, #6a4818)`,
      border: `1px solid ${SIGIL_COLORS.black}`,
      boxShadow: '0 2px 4px rgba(0,0,0,0.6)',
    }} />
    {/* Inner darkness / passage */}
    <div style={{
      position: 'absolute', left: '14%', right: '14%', top: '18%', bottom: 0,
      background: glow
        ? `radial-gradient(ellipse at 50% 80%, ${SIGIL_COLORS.yellow}40, ${SIGIL_COLORS.black})`
        : `radial-gradient(ellipse at 50% 80%, #0a1428 0%, ${SIGIL_COLORS.black} 80%)`,
    }} />
    {showLabel && label && (
      <div style={{
        position: 'absolute', left: '14%', right: '14%', top: '18%', bottom: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: '"Space Mono", monospace',
        fontSize: 9, letterSpacing: 2, color: SIGIL_COLORS.cream, opacity: 0.5,
        textTransform: 'uppercase',
        pointerEvents: 'none',
      }}>
        {label}
      </div>
    )}
  </div>
);

/** Global keyframes shared across Omnibus scenes. */
export const SharedSceneKeyframes = () => (
  <style>{`
    @keyframes chromeSigilSpin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes realSigilSpin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes lavaButtonPulse {
      0%, 100% { box-shadow: 0 0 12px #FF4C65, 0 0 24px rgba(255,232,0,0.5), inset 0 0 8px rgba(255,232,0,0.4); }
      50% { box-shadow: 0 0 20px #FF4C65, 0 0 40px rgba(255,232,0,0.8), inset 0 0 14px rgba(255,232,0,0.7); }
    }
    @keyframes fogDrift {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }
    @keyframes fogBandDrift {
      0% { transform: translateX(-12%); }
      50% { transform: translateX(12%); }
      100% { transform: translateX(-12%); }
    }
    @keyframes treeSway {
      0%, 100% { transform: rotate(-1deg); }
      50% { transform: rotate(1deg); }
    }
    @keyframes ledPulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
    @keyframes chandelierSway {
      0%, 100% { transform: translateX(-50%) rotate(-3deg); }
      50% { transform: translateX(-50%) rotate(3deg); }
    }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-6px); }
      75% { transform: translateX(6px); }
    }
    @keyframes sigilBeacon {
      0%, 100% { opacity: 0.35; }
      50% { opacity: 0.85; }
    }
  `}</style>
);
