// SCENE 02 — THE FOG FOREST
// 5-layer parallax composition: locked sky plate + 4 tree layers (far/mid/near/front)
// driven by useMouseParallax. Pixel grid preserved through CSS upscaling via
// image-rendering: pixelated. Disabled on touch devices.
import { useRef } from 'react';
import type { SceneConfig } from '../sceneTypes';
import { DitherOverlay } from '../sceneShared';
import { TextureOverlay } from '../TextureOverlay';
import { ScanlineOverlay } from '../ScanlineOverlay';
import { useMouseParallax } from '@/hooks/useMouseParallax';

const ASSETS = {
  sky:    '/omnibus/assets/scene-02-fog-forest-sky.png',
  far:    '/omnibus/assets/scene-02-fog-forest-far.png',
  mid:    '/omnibus/assets/scene-02-fog-forest-mid.png',
  near:   '/omnibus/assets/scene-02-fog-forest-near.png',
  front:  '/omnibus/assets/Scene-02-fog-forest-overhang.png',
};

const layerStyle = (
  src: string,
  scalePct: number,
  shift: { x: number; y: number },
  zIndex: number,
): React.CSSProperties => ({
  position: 'absolute',
  inset: 0,
  backgroundImage: `url(${src})`,
  backgroundSize: `${scalePct}% ${scalePct}%`,
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  imageRendering: 'pixelated',
  willChange: 'transform',
  transform: `translate3d(${shift.x}px, ${shift.y}px, 0)`,
  zIndex,
  pointerEvents: 'none',
});

const FogForest = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const parallax = useMouseParallax(sceneRef);

  // Tree layers shift OPPOSITE to mouse, magnitude grows toward foreground.
  // Sky locked at 0 to anchor the frame.
  const SKY_SHIFT   = { x: 0, y: 0 };
  const FAR_SHIFT   = { x: parallax.x *  -2, y: parallax.y * -1 };
  const MID_SHIFT   = { x: parallax.x *  -4, y: parallax.y * -2 };
  const NEAR_SHIFT  = { x: parallax.x *  -7, y: parallax.y * -3.5 };
  const FRONT_SHIFT = { x: parallax.x * -11, y: parallax.y * -5.5 };

  return (
    <div
      ref={sceneRef}
      style={{ position: 'absolute', inset: 0, background: '#0A0A0A', overflow: 'hidden' }}
    >
      {/* ===== FINAL ART SWAP POINT — SCENE 02 ===== */}
      {/* Layer 1: Sky (locked) */}
      <div style={layerStyle(ASSETS.sky,   100, SKY_SHIFT,   1)} aria-hidden />
      {/* Layer 2: Far trees */}
      <div style={layerStyle(ASSETS.far,   108, FAR_SHIFT,   2)} aria-hidden />
      {/* Layer 3: Mid trees */}
      <div style={layerStyle(ASSETS.mid,   113, MID_SHIFT,   3)} aria-hidden />
      {/* Layer 4: Near trees */}
      <div style={layerStyle(ASSETS.near,  118, NEAR_SHIFT,  4)} aria-hidden />
      {/* Layer 5: Front trees + overhead arch */}
      <div style={layerStyle(ASSETS.front, 125, FRONT_SHIFT, 5)} aria-hidden />
      {/* ===== END FINAL ART SWAP POINT ===== */}

      {/* Hidden preload for next scene (idol doorway) */}
      <img
        src="/omnibus/assets/scene-03-idol-doorway.png"
        alt=""
        aria-hidden
        style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}
      />

      {/* Atmosphere overlays (above art layers, below scene UI chrome) */}
      <DitherOverlay color="#7CFF6B" opacity={0.12} />
      <TextureOverlay intensity={0.5} />
      <ScanlineOverlay />
    </div>
  );
};

export const fogForestScene: SceneConfig = {
  id: 'fog-forest',
  title: 'The Fog Forest',
  preloadAdjacent: ['idol-doorway', 'observatory'],
  ambientSoundId: 'forest-ambient',
  hideBackArrow: true,
  background: <FogForest />,
  hotspots: [
    {
      area: { left: 35, top: 38, width: 30, height: 36 },
      label: 'Approach the mansion',
      to: 'idol-doorway',
      // No tooltip — cursor change is the affordance.
    },
  ],
};

export default FogForest;
