// SCENE 08 — THE ARCADE
// Outer view of cabinet + close-up zoom showing game placeholder.
import { useState, useEffect, useRef } from 'react';
import type { SceneConfig } from '../sceneTypes';
import { SIGIL_COLORS } from '../sceneTypes';
import { DitherOverlay } from '../sceneShared';
import { TextureOverlay } from '../TextureOverlay';
import { ScanlineOverlay } from '../ScanlineOverlay';
import {
  createBreakoutState,
  updateBreakout,
  renderBreakout,
  BREAKOUT_W,
  BREAKOUT_H,
} from '@/engine/minigame';

const ArcadeBackground = () => {
  const [zoomed, setZoomed] = useState(false);

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: `radial-gradient(ellipse at 50% 40%, #2a1a30 0%, ${SIGIL_COLORS.black} 70%)`,
      overflow: 'hidden',
    }}>
      {/* Wallpaper pinstripe */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `repeating-linear-gradient(0deg, transparent 0 8px, ${SIGIL_COLORS.pink}15 8px 9px)`,
      }} />

      {!zoomed ? (
        <>
          {/* Cabinet — centered */}
          <div
            onClick={() => setZoomed(true)}
            style={{
              position: 'absolute', left: '38%', top: '15%', width: '24%', height: '70%',
              cursor: 'none',
            }}
          >
            <CabinetGraphic />
          </div>
          {/* Stool */}
          <div style={{
            position: 'absolute', left: '46%', bottom: '8%', width: '8%', height: '12%',
            background: `radial-gradient(ellipse at 50% 0%, #555, #1a1a1a)`,
            borderRadius: '40% 40% 8% 8%',
          }} />
        </>
      ) : (
        <CloseUpCabinet onExit={() => setZoomed(false)} />
      )}

      <DitherOverlay opacity={0.16} />
      <TextureOverlay intensity={0.3} />
      <ScanlineOverlay />
    </div>
  );
};

const CabinetGraphic = ({ closeUp = false }: { closeUp?: boolean }) => (
  <div style={{
    width: '100%', height: '100%',
    background: `linear-gradient(180deg, ${SIGIL_COLORS.federalBlue}, #1a1a30)`,
    border: `4px solid ${SIGIL_COLORS.yellow}`,
    boxShadow: '0 8px 24px rgba(0,0,0,0.8), inset 0 0 12px rgba(0,0,0,0.5)',
    display: 'flex', flexDirection: 'column',
    padding: closeUp ? 16 : 6,
  }}>
    {/* Marquee */}
    <div style={{
      background: SIGIL_COLORS.pink,
      borderBottom: `2px solid ${SIGIL_COLORS.yellow}`,
      padding: closeUp ? 10 : 4,
      textAlign: 'center',
      fontFamily: '"Space Mono", monospace',
      fontSize: closeUp ? 18 : 8,
      letterSpacing: 3,
      color: SIGIL_COLORS.black,
      fontWeight: 700,
    }}>
      ZINETH ARCADE
    </div>
    {/* Screen */}
    <div style={{
      flex: 1,
      background: SIGIL_COLORS.black,
      margin: closeUp ? 16 : 6,
      border: `2px solid ${SIGIL_COLORS.yellow}80`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: '"Space Mono", monospace',
      fontSize: closeUp ? 14 : 8,
      color: SIGIL_COLORS.green,
      letterSpacing: 2,
      textAlign: 'center',
      padding: 12,
    }}>
      {closeUp ? <BreakoutScreen /> : '...'}
    </div>
    {/* Controls */}
    <div style={{
      display: 'flex', gap: closeUp ? 12 : 4, justifyContent: 'center',
      padding: closeUp ? 12 : 4,
    }}>
      {[SIGIL_COLORS.red, SIGIL_COLORS.yellow, SIGIL_COLORS.green].map((c) => (
        <div key={c} style={{
          width: closeUp ? 22 : 8, height: closeUp ? 22 : 8,
          borderRadius: '50%', background: c,
          boxShadow: `0 0 6px ${c}`,
        }} />
      ))}
    </div>
  </div>
);

// Breakout mini-game embedded in the cabinet screen
const BreakoutScreen = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef(createBreakoutState());
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    canvas.width = BREAKOUT_W;
    canvas.height = BREAKOUT_H;
    const state = stateRef.current;

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = BREAKOUT_W / rect.width;
      state.paddleX = (e.clientX - rect.left) * scaleX - 40;
    };
    const onTouch = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = BREAKOUT_W / rect.width;
      state.paddleX = (e.touches[0].clientX - rect.left) * scaleX - 40;
    };
    const onClick = () => {
      if (state.won || state.lives <= 0) {
        stateRef.current = createBreakoutState();
        stateRef.current.running = true;
        return;
      }
      if (!state.running) state.running = true;
    };

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('touchmove', onTouch, { passive: true });
    canvas.addEventListener('click', onClick);

    let frame = 0;
    const loop = () => {
      updateBreakout(stateRef.current);
      renderBreakout(ctx, stateRef.current);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('touchmove', onTouch);
      canvas.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        width: '100%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'auto',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%', height: '100%',
          objectFit: 'contain',
          imageRendering: 'pixelated',
          cursor: 'none',
          display: 'block',
        }}
      />
    </div>
  );
};

const CloseUpCabinet = ({ onExit }: { onExit: () => void }) => (
  <>
    {/* Click outside to exit */}
    <div onClick={onExit} style={{
      position: 'absolute', inset: 0, cursor: 'none',
    }} />
    <div style={{
      position: 'absolute', left: '15%', right: '15%', top: '8%', bottom: '8%',
      pointerEvents: 'none',
    }}>
      <CabinetGraphic closeUp />
    </div>
  </>
);

export const arcadeScene: SceneConfig = {
  id: 'arcade',
  title: 'The Arcade',
  preloadAdjacent: ['great-room'],
  ambientSoundId: 'mansion-hall',
  background: <ArcadeBackground />,
  backTo: 'great-room',
  hotspots: [],
};

export default ArcadeBackground;
