// SCENE 04 — THE FOYER
// 7-layer parallax + mouse-proximity hover-zoom toward the central portal.
// Layers (back→front): back wall + sconces + portal glow, archway frame,
//   left wall, right wall, ceiling trim, floor reflection, columns.
import { useRef, useCallback, useEffect } from 'react';
import type { SceneConfig } from '../sceneTypes';
import { DitherOverlay } from '../sceneShared';
import { TextureOverlay } from '../TextureOverlay';
import { ScanlineOverlay } from '../ScanlineOverlay';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import { useHoverZoom } from '@/hooks/useHoverZoom';

const layerWrap = (
  scale: number,
  shift: { x: number; y: number },
  zIndex: number,
): React.CSSProperties => ({
  position: 'absolute',
  inset: 0,
  willChange: 'transform',
  transform: `translate3d(${shift.x}px, ${shift.y}px, 0) scale(${scale})`,
  transformOrigin: 'center center',
  zIndex,
  pointerEvents: 'none',
});

const layerImg: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center center',
  imageRendering: 'pixelated',
  userSelect: 'none',
  pointerEvents: 'none',
};

interface FoyerProps {
  onEnterGreatRoom: () => void;
}

const Foyer = ({ onEnterGreatRoom }: FoyerProps) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const parallax = useMouseParallax(sceneRef);
  const { zoom } = useHoverZoom(sceneRef, { lerp: 0.08, falloff: 0.7 });

  // Parallax shifts (back wall locked-ish, columns shift most)
  const BACK_SHIFT    = { x: parallax.x *  -1.5, y: parallax.y * -0.8 };
  const ARCH_SHIFT    = { x: parallax.x *  -2,   y: parallax.y * -1 };
  const LWALL_SHIFT   = { x: parallax.x *  -3.5, y: parallax.y * -1.8 };
  const RWALL_SHIFT   = { x: parallax.x *  -3.5, y: parallax.y * -1.8 };
  const CEILING_SHIFT = { x: parallax.x *  -2.5, y: parallax.y * -1.5 };
  const FLOOR_SHIFT   = { x: parallax.x *  -7,   y: parallax.y * -3.5 };
  const COLUMNS_SHIFT = { x: parallax.x * -10,   y: parallax.y * -5 };

  // Scales: base bleed + zoom growth
  const BACK_SCALE    = 1.04 + zoom * 0.10;
  const ARCH_SCALE    = 1.06 + zoom * 0.20;
  const LWALL_SCALE   = 1.08 + zoom * 0.50;
  const RWALL_SCALE   = 1.08 + zoom * 0.50;
  const CEILING_SCALE = 1.06 + zoom * 0.30;
  const FLOOR_SCALE   = 1.14 + zoom * 1.20;
  const COLUMNS_SCALE = 1.20 + zoom * 1.80;

  const handleClick = useCallback(() => {
    if (zoom >= 0.7) {
      onEnterGreatRoom();
    } else {
      setTimeout(() => onEnterGreatRoom(), 1000);
    }
  }, [zoom, onEnterGreatRoom]);

  // Preload Great Room assets
  useEffect(() => {
    const urls = [
      '/omnibus/assets/scene-05-great-room-back-wall.png',
      '/omnibus/assets/scene-05-great-room-floor.png',
    ];
    urls.forEach((href) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.as = 'image';
      link.href = href;
      document.head.appendChild(link);
    });
  }, []);

  return (
    <div
      ref={sceneRef}
      style={{ position: 'absolute', inset: 0, background: '#0A0A0A', overflow: 'hidden' }}
      data-scene-id="foyer"
    >
      {/* ===== FINAL ART SWAP POINT — SCENE 04 — 7-LAYER HOVER-ZOOM ===== */}

      {/* Layer 1: Back wall + sconces + portal glow */}
      <div style={layerWrap(BACK_SCALE, BACK_SHIFT, 1)} aria-hidden>
        <img src="/omnibus/assets/scene-04-foyer-back-wall.png" alt="" style={layerImg} draggable={false} />
      </div>

      {/* Layer 2: Archway frame */}
      <div style={layerWrap(ARCH_SCALE, ARCH_SHIFT, 2)} aria-hidden>
        <img src="/omnibus/assets/scene-04-foyer-archway.png" alt="" style={layerImg} draggable={false} />
      </div>

      {/* Layer 3: Left side wall */}
      <div style={layerWrap(LWALL_SCALE, LWALL_SHIFT, 3)} aria-hidden>
        <img src="/omnibus/assets/scene-04-foyer-left-wall.png" alt="" style={layerImg} draggable={false} />
      </div>

      {/* Layer 4: Right side wall */}
      <div style={layerWrap(RWALL_SCALE, RWALL_SHIFT, 4)} aria-hidden>
        <img src="/omnibus/assets/scene-04-foyer-right-wall.png" alt="" style={layerImg} draggable={false} />
      </div>

      {/* Layer 5: Ceiling trim — asset pending; render when present */}
      <div style={layerWrap(CEILING_SCALE, CEILING_SHIFT, 5)} aria-hidden>
        <img
          src="/omnibus/assets/scene-04-foyer-ceiling.png"
          alt=""
          style={layerImg}
          draggable={false}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
        />
      </div>

      {/* Layer 6: Floor reflection */}
      <div style={layerWrap(FLOOR_SCALE, FLOOR_SHIFT, 6)} aria-hidden>
        <img src="/omnibus/assets/scene-04-foyer-floor.png" alt="" style={layerImg} draggable={false} />
      </div>

      {/* Layer 7: Columns (closest foreground) */}
      <div style={layerWrap(COLUMNS_SCALE, COLUMNS_SHIFT, 7)} aria-hidden>
        <img src="/omnibus/assets/scene-04-foyer-columns.png" alt="" style={layerImg} draggable={false} />
      </div>

      {/* ===== END FINAL ART SWAP POINT ===== */}

      {/* Atmosphere overlays */}
      <DitherOverlay opacity={0.15} />
      <TextureOverlay intensity={0.4} />
      <ScanlineOverlay />

      {/* Click hotspot — central archway / portal region */}
      <button
        type="button"
        onClick={handleClick}
        aria-label="Enter the Great Room"
        style={{
          position: 'absolute',
          left: '40%', top: '38%', width: '20%', height: '40%',
          background: 'transparent',
          border: 'none',
          padding: 0,
          cursor: 'none',
          zIndex: 20,
        }}
      />
    </div>
  );
};

export const foyerScene = (handlers: { onEnterGreatRoom: () => void }): SceneConfig => ({
  id: 'foyer',
  title: 'The Foyer',
  preloadAdjacent: ['great-room', 'idol-doorway'],
  ambientSoundId: 'mansion-hall',
  background: <Foyer onEnterGreatRoom={handlers.onEnterGreatRoom} />,
  backTo: 'idol-doorway',
  hotspots: [],
});

export default Foyer;
