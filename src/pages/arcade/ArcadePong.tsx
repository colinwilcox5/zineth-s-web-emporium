import { useEffect, useRef } from 'react';
import { ArcadeHeader } from '@/components/arcade/ArcadeHeader';
import {
  createBreakoutState,
  updateBreakout,
  renderBreakout,
  BREAKOUT_W,
  BREAKOUT_H,
} from '@/engine/minigame';

const ArcadePong = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef(createBreakoutState());

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
    <div style={{ position: 'fixed', inset: 0, background: '#0A0A0A', display: 'flex', flexDirection: 'column' }}>
      <ArcadeHeader title="PONG" />
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}>
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            maxWidth: 800,
            height: 'auto',
            aspectRatio: `${BREAKOUT_W}/${BREAKOUT_H}`,
            objectFit: 'contain',
            imageRendering: 'pixelated',
            cursor: 'none',
            border: '2px solid #FF48B040',
          }}
        />
      </div>
      <div style={{
        textAlign: 'center',
        padding: '8px 0 16px',
        fontFamily: '"Space Mono", monospace',
        fontSize: 10,
        letterSpacing: 2,
        color: '#FFE800',
        opacity: 0.6,
        textTransform: 'uppercase',
      }}>
        CLICK TO START · MOUSE = PADDLE
      </div>
    </div>
  );
};

export default ArcadePong;