// SCENE 09 — THE CODE CHAMBER
import { useState } from 'react';
import type { SceneConfig } from '../sceneTypes';
import { SIGIL_COLORS } from '../sceneTypes';
import { DitherOverlay } from '../sceneShared';
import { TextureOverlay } from '../TextureOverlay';

const CodeChamber = () => {
  const [code, setCode] = useState('');
  const [shake, setShake] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const submit = () => {
    if (/^[A-Z0-9]{4}-\d{4}$/i.test(code.trim())) {
      setUnlocked(true);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
  };

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: `linear-gradient(180deg, ${SIGIL_COLORS.federalBlue} 0%, #1a1a30 70%, #050510 100%)`,
      overflow: 'hidden',
    }}>
      {/* Letterbox side panels */}
      {[0, 1].map((i) => (
        <div key={i} style={{
          position: 'absolute',
          [i === 0 ? 'left' : 'right']: 0, top: 0, bottom: 0,
          width: '14%',
          background: `repeating-linear-gradient(0deg, ${SIGIL_COLORS.pink} 0 8px, ${SIGIL_COLORS.federalBlue} 8px 16px)`,
          opacity: 0.5,
          borderInline: `2px solid ${SIGIL_COLORS.yellow}`,
        }} />
      ))}

      {/* Marbled columns (inside letterbox) */}
      {[16, 80].map((x) => (
        <div key={x} style={{
          position: 'absolute', left: `${x}%`, top: '5%', width: '6%', height: '90%',
          background: `linear-gradient(180deg, ${SIGIL_COLORS.yellow}, ${SIGIL_COLORS.pink} 50%, ${SIGIL_COLORS.yellow})`,
          filter: 'brightness(0.85)',
          border: `1px solid ${SIGIL_COLORS.yellow}80`,
        }} />
      ))}

      {/* Drape backdrop */}
      <div style={{
        position: 'absolute', left: '24%', right: '24%', top: '5%', bottom: '5%',
        background: `repeating-linear-gradient(90deg, ${SIGIL_COLORS.federalBlue} 0 12px, #1a2050 12px 24px)`,
        border: `1px solid ${SIGIL_COLORS.yellow}40`,
      }} />

      {/* Suspended chalice */}
      <div style={{
        position: 'absolute', left: '50%', top: '20%',
        transform: 'translateX(-50%)',
      }}>
        <div style={{ width: 2, height: 60, background: SIGIL_COLORS.yellow, margin: '0 auto' }} />
        <div style={{
          width: 100, height: 70,
          background: `radial-gradient(ellipse at 50% 30%, ${SIGIL_COLORS.red}, ${SIGIL_COLORS.pink} 50%, ${SIGIL_COLORS.federalBlue})`,
          borderRadius: '50% 50% 30% 30%',
          boxShadow: unlocked
            ? `0 0 60px ${SIGIL_COLORS.yellow}, 0 0 120px ${SIGIL_COLORS.yellow}80`
            : `0 0 16px ${SIGIL_COLORS.pink}`,
          animation: shake ? 'shake 0.4s ease-in-out' : (unlocked ? undefined : 'lavaButtonPulse 3s ease-in-out infinite'),
        }} />
        {/* Glyph key */}
        <div style={{
          width: 30, height: 40,
          margin: '8px auto 0',
          background: SIGIL_COLORS.yellow,
          clipPath: 'polygon(40% 0, 60% 0, 60% 60%, 100% 60%, 100% 80%, 60% 80%, 60% 100%, 40% 100%, 40% 80%, 0 80%, 0 60%, 40% 60%)',
          opacity: unlocked ? 1 : 0.7,
        }} />
      </div>

      {/* Brass-framed input */}
      <div style={{
        position: 'absolute', left: '50%', bottom: '12%',
        transform: 'translateX(-50%)',
        width: '32%',
        background: `linear-gradient(180deg, #6a4818, #2a1a08)`,
        border: `2px solid ${SIGIL_COLORS.yellow}`,
        padding: 14,
      }}>
        <div style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: 9, letterSpacing: 2, color: SIGIL_COLORS.yellow,
          marginBottom: 8, textTransform: 'uppercase',
        }}>
          {unlocked ? '— ACCESS GRANTED —' : 'ENTER ZINE CODE'}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
            placeholder="XXXX-####"
            disabled={unlocked}
            style={{
              flex: 1,
              fontFamily: '"Space Mono", monospace',
              fontSize: 14, letterSpacing: 3,
              padding: 8,
              background: SIGIL_COLORS.black,
              border: `1px solid ${SIGIL_COLORS.yellow}`,
              color: SIGIL_COLORS.cream,
              outline: 'none',
              cursor: 'auto',
            }}
          />
          <button
            onClick={submit}
            disabled={unlocked}
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: 10, letterSpacing: 2,
              padding: '8px 14px',
              background: SIGIL_COLORS.yellow,
              color: SIGIL_COLORS.black,
              border: 'none',
              cursor: 'none',
              fontWeight: 700,
            }}
          >
            SUBMIT
          </button>
        </div>
      </div>

      <DitherOverlay opacity={0.15} />
      <TextureOverlay intensity={0.18} />
    </div>
  );
};

export const codeChamberScene: SceneConfig = {
  id: 'code-chamber',
  title: 'The Code Chamber',
  preloadAdjacent: ['great-room', 'secret-alcove'],
  ambientSoundId: 'mansion-hall',
  background: <CodeChamber />,
  backTo: 'great-room',
  hotspots: [],
};

export default CodeChamber;
