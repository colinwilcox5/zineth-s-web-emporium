import { useState, useEffect, useRef, useCallback } from 'react';
import { MAP as LEVEL_MAP } from '@/engine/map';
import { SCREEN_W, SCREEN_H, renderFrame, getInteractableObject } from '@/engine/raycaster';
import type { Player } from '@/engine/raycaster';
import { WORLD_OBJECTS, getRoomName, GLYPH_SEQUENCE, COLORS } from '@/engine/map';
import type { WorldObject } from '@/engine/map';
import { createInputState, setupDesktopControls, setupMobileControls, updatePlayer } from '@/engine/controls';
import { createBreakoutState, updateBreakout, renderBreakout, BREAKOUT_W, BREAKOUT_H } from '@/engine/minigame';
import { LORE_ENTRIES, ART_ENTRIES } from '@/engine/loreData';

type OverlayMode = 'none' | 'art' | 'lore' | 'arcade';

const WolfensteinRoom = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const arcadeCanvasRef = useRef<HTMLCanvasElement>(null);
  const [booted, setBooted] = useState(false);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [overlayMode, setOverlayMode] = useState<OverlayMode>('none');
  const [overlayId, setOverlayId] = useState('');
  const [roomName, setRoomName] = useState('HUB');
  const [interactHint, setInteractHint] = useState('');
  const [showMinimap, setShowMinimap] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [glyphSequence, setGlyphSequence] = useState<string[]>([]);
  const [secretUnlocked, setSecretUnlocked] = useState(false);

  const playerRef = useRef<Player>({ x: 4.5, y: 3.5, angle: 0 });
  const inputRef = useRef(createInputState());
  const animFrameRef = useRef(0);
  const breakoutRef = useRef(createBreakoutState());
  const cleanupRef = useRef<(() => void) | null>(null);

  // Boot sequence
  useEffect(() => {
    const lines = [
      'ZINETH RESTRICTED ACCESS v2.1',
      'SCANNING CREDENTIALS...',
      'LOADING SPATIAL DATA...',
      '> RAYCASTER ONLINE',
      '> COLLISION GRID MAPPED',
      '> ARTIFACTS LOADED: 4',
      '> TRANSMISSIONS LOADED: 4',
      '> ARCADE MODULE: READY',
      'ACCESS GRANTED.',
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < lines.length) {
        setBootLines((prev) => [...prev, lines[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setBooted(true), 600);
      }
    }, 280);
    return () => clearInterval(interval);
  }, []);

  // Detect mobile
  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
  }, []);

  // Main game loop
  useEffect(() => {
    if (!booted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    canvas.width = SCREEN_W;
    canvas.height = SCREEN_H;

    const player = playerRef.current;
    const input = inputRef.current;
    const zBuffer = new Float64Array(SCREEN_W);

    // Setup controls
    if (isMobile) {
      cleanupRef.current = setupMobileControls(canvas, input, player);
    } else {
      cleanupRef.current = setupDesktopControls(canvas, input);
    }

    let lastRoomUpdate = 0;

    const gameLoop = () => {
      updatePlayer(player, input);

      // Check interactable
      const interactable = getInteractableObject(player, WORLD_OBJECTS);
      if (interactable) {
        setInteractHint(isMobile ? 'TAP TO INTERACT' : 'PRESS E TO INTERACT');
      } else {
        setInteractHint('');
      }

      // Handle interaction
      if (input.interact && interactable) {
        input.interact = false;
        handleInteraction(interactable);
      } else if (input.interact) {
        input.interact = false;
      }

      // Update room name periodically
      const now = Date.now();
      if (now - lastRoomUpdate > 500) {
        setRoomName(getRoomName(player.x, player.y));
        lastRoomUpdate = now;
      }

      renderFrame(ctx, player, WORLD_OBJECTS, zBuffer);

      animFrameRef.current = requestAnimationFrame(gameLoop);
    };

    // Minimap toggle
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'KeyM') setShowMinimap((v) => !v);
      if (e.key === 'Escape' && overlayMode !== 'none') {
        setOverlayMode('none');
      }
    };
    window.addEventListener('keydown', handleKey);

    animFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      cleanupRef.current?.();
      window.removeEventListener('keydown', handleKey);
    };
  }, [booted, isMobile]);

  // Arcade mini-game loop
  useEffect(() => {
    if (overlayMode !== 'arcade' || !arcadeCanvasRef.current) return;
    const canvas = arcadeCanvasRef.current;
    const ctx = canvas.getContext('2d')!;
    canvas.width = BREAKOUT_W;
    canvas.height = BREAKOUT_H;
    const state = breakoutRef.current;

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = BREAKOUT_W / rect.width;
      state.paddleX = (e.clientX - rect.left) * scaleX - 20;
    };
    const onTouch = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = BREAKOUT_W / rect.width;
      state.paddleX = (e.touches[0].clientX - rect.left) * scaleX - 20;
    };
    const onClick = () => {
      if (!state.running && state.lives > 0 && !state.won) {
        state.running = true;
      }
    };

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('touchmove', onTouch, { passive: true });
    canvas.addEventListener('click', onClick);

    let frame = 0;
    const loop = () => {
      updateBreakout(state);
      renderBreakout(ctx, state);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('touchmove', onTouch);
      canvas.removeEventListener('click', onClick);
    };
  }, [overlayMode]);

  const handleInteraction = useCallback((obj: WorldObject) => {
    switch (obj.type) {
      case 'art':
        setOverlayId(obj.id);
        setOverlayMode('art');
        break;
      case 'lore':
        setOverlayId(obj.id);
        setOverlayMode('lore');
        break;
      case 'arcade':
        breakoutRef.current = createBreakoutState();
        setOverlayMode('arcade');
        break;
      case 'code_glyph':
        setGlyphSequence((prev) => {
          const next = [...prev, obj.id];
          if (next.length === GLYPH_SEQUENCE.length) {
            const correct = next.every((g, i) => g === GLYPH_SEQUENCE[i]);
            if (correct) {
              setSecretUnlocked(true);
              window.dispatchEvent(new CustomEvent('zineth-secret-unlocked'));
              setTimeout(() => setSecretUnlocked(false), 3000);
            }
            return [];
          }
          // Check if still valid prefix
          if (next[next.length - 1] !== GLYPH_SEQUENCE[next.length - 1]) {
            return []; // Reset
          }
          return next;
        });
        break;
    }
  }, []);

  const closeOverlay = () => setOverlayMode('none');

  // Boot screen
  if (!booted) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center"
        style={{ background: COLORS.federalBlue }}>
        <pre className="text-left text-sm font-mono whitespace-pre-wrap max-w-md px-4"
          style={{ color: COLORS.yellow }}>
          {bootLines.map((line, i) => (
            <div key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
              {line}
            </div>
          ))}
          <span className="inline-block w-2 h-4 ml-1 animate-pulse"
            style={{ background: COLORS.green }}>█</span>
        </pre>
      </div>
    );
  }

  return (
    <div className="fixed inset-0" style={{ background: '#000' }}>
      {/* Main canvas */}
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{ imageRendering: 'pixelated', cursor: 'none' }}
      />

      {/* HUD */}
      <div className="fixed top-3 left-3 font-mono text-xs pointer-events-none z-10"
        style={{ color: COLORS.green }}>
        {roomName}
      </div>

      {/* Interaction hint */}
      {interactHint && overlayMode === 'none' && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 font-mono text-xs z-10 pointer-events-none px-3 py-1"
          style={{ color: COLORS.pink, background: 'rgba(0,0,0,0.7)' }}>
          {interactHint}
        </div>
      )}

      {/* Glyph progress indicator */}
      {glyphSequence.length > 0 && (
        <div className="fixed top-3 right-3 font-mono text-xs z-10 pointer-events-none"
          style={{ color: COLORS.green }}>
          SEQUENCE: {glyphSequence.length}/{GLYPH_SEQUENCE.length}
        </div>
      )}

      {/* Secret unlocked flash */}
      {secretUnlocked && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none animate-pulse"
          style={{ background: 'rgba(255,76,101,0.2)' }}>
          <div className="font-mono text-2xl font-bold" style={{ color: COLORS.red }}>
            ◈ SECRET UNLOCKED ◈
          </div>
        </div>
      )}

      {/* Minimap */}
      {showMinimap && <Minimap player={playerRef.current} />}

      {/* Art overlay */}
      {overlayMode === 'art' && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.9)' }}>
          <div className="max-w-lg w-full p-1" style={{ border: `2px solid ${COLORS.pink}` }}>
            <div className="w-full aspect-[4/3]"
              style={{ background: ART_ENTRIES[overlayId]?.placeholder || COLORS.pink }} />
            <div className="p-4" style={{ background: '#000' }}>
              <h2 className="font-mono text-sm font-bold" style={{ color: COLORS.yellow }}>
                {ART_ENTRIES[overlayId]?.title}
              </h2>
              <p className="font-mono text-xs mt-2" style={{ color: COLORS.skyBlue }}>
                {ART_ENTRIES[overlayId]?.description}
              </p>
              <button onClick={closeOverlay} className="mt-4 font-mono text-xs px-4 py-1"
                style={{ color: COLORS.pink, border: `1px solid ${COLORS.pink}`, background: 'transparent' }}>
                [ CLOSE ]
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lore overlay */}
      {overlayMode === 'lore' && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.9)' }}>
          <div className="max-w-md w-full p-6 overflow-y-auto max-h-[80vh]"
            style={{ background: COLORS.federalBlue, border: `1px solid ${COLORS.green}` }}>
            <h2 className="font-mono text-sm font-bold mb-4" style={{ color: COLORS.yellow }}>
              {LORE_ENTRIES[overlayId]?.title}
            </h2>
            <pre className="font-mono text-xs whitespace-pre-wrap leading-relaxed"
              style={{ color: COLORS.yellow }}>
              {LORE_ENTRIES[overlayId]?.text}
            </pre>
            <button onClick={closeOverlay} className="mt-6 font-mono text-xs px-4 py-1"
              style={{ color: COLORS.green, border: `1px solid ${COLORS.green}`, background: 'transparent' }}>
              [ CLOSE TRANSMISSION ]
            </button>
          </div>
        </div>
      )}

      {/* Arcade overlay */}
      {overlayMode === 'arcade' && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.95)' }}>
          <h2 className="font-mono text-sm mb-3" style={{ color: COLORS.yellow }}>
            ZINETH BREAKOUT
          </h2>
          <canvas
            ref={arcadeCanvasRef}
            className="block border"
            style={{
              imageRendering: 'pixelated',
              width: Math.min(560, window.innerWidth - 32),
              borderColor: COLORS.pink,
            }}
          />
          <button onClick={closeOverlay} className="mt-4 font-mono text-xs px-4 py-1"
            style={{ color: COLORS.pink, border: `1px solid ${COLORS.pink}`, background: 'transparent' }}>
            [ EXIT ARCADE ]
          </button>
        </div>
      )}

      {/* Pointer lock prompt (desktop only) */}
      {!isMobile && overlayMode === 'none' && (
        <div className="fixed bottom-3 left-1/2 -translate-x-1/2 font-mono text-xs pointer-events-none opacity-40 z-10"
          style={{ color: COLORS.skyBlue }}>
          CLICK TO LOOK · WASD MOVE · E INTERACT · M MAP · ESC EXIT
        </div>
      )}

      {/* Back to site */}
      <a href="/" className="fixed top-3 right-3 font-mono text-xs z-10 px-2 py-1 opacity-50 hover:opacity-100 transition-opacity"
        style={{ color: COLORS.yellow, border: `1px solid ${COLORS.yellow}`, background: 'rgba(0,0,0,0.5)' }}>
        [ EXIT ]
      </a>
    </div>
  );
};

// Mini minimap component
const Minimap = ({ player }: { player: Player }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    canvas.width = 64;
    canvas.height = 64;

    const scale = 2;

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 64, 64);

    // Draw map centered on player
    const ox = Math.floor(player.x) - 16;
    const oy = Math.floor(player.y) - 16;
    for (let y = 0; y < 32; y++) {
      for (let x = 0; x < 32; x++) {
        if (MAP[y]?.[x] > 0) {
          ctx.fillStyle = 'rgba(0,255,92,0.3)';
          ctx.fillRect((x - ox) * scale, (y - oy) * scale, scale, scale);
        }
      }
    }

    // Player dot
    ctx.fillStyle = COLORS.pink;
    ctx.fillRect((player.x - ox) * scale - 1, (player.y - oy) * scale - 1, 3, 3);
  });

  return (
    <canvas ref={canvasRef}
      className="fixed bottom-3 right-3 z-20 border opacity-70"
      style={{ width: 96, height: 96, imageRendering: 'pixelated', borderColor: COLORS.green }}
    />
  );
};

export default WolfensteinRoom;
