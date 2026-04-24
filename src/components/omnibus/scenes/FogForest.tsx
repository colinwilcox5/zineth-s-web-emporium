// SCENE 02 — THE FOG FOREST
// 6-layer parallax composition with smoothed scroll-wheel zoom.
// Layers: locked sky + gash (horizon) + 4 tree layers (far/mid/near/front).
// Mouse-move drives parallax (unchanged). Scroll-wheel drives zoom (new).
// Click center horizon: steps zoom +0.5 (clamped to 1); at zoom ≥ 0.85, advances.
// Pixel grid preserved through CSS upscaling via image-rendering: pixelated.
// All motion disabled on touch devices.
import { useRef, useCallback, useEffect, useState } from 'react';
import type { SceneConfig } from '../sceneTypes';
import { DitherOverlay } from '../sceneShared';
import { TextureOverlay } from '../TextureOverlay';
import { ScanlineOverlay } from '../ScanlineOverlay';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import { useScrollZoom } from '@/hooks/useScrollZoom';

const ASSETS = {
  sky:   '/omnibus/assets/scene-02-fog-forest-sky.png',
  gash:  '/omnibus/assets/scene-02-fog-forest-gash.png',
  far:   '/omnibus/assets/scene-02-fog-forest-far.png',
  mid:   '/omnibus/assets/scene-02-fog-forest-mid.png',
  near:  '/omnibus/assets/scene-02-fog-forest-near.png',
  front: '/omnibus/assets/Scene-02-fog-forest-overhang.png',
};

const layerStyle = (
  src: string,
  scale: number,
  shift: { x: number; y: number },
  zIndex: number,
): React.CSSProperties => ({
  position: 'absolute',
  inset: 0,
  backgroundImage: `url(${src})`,
  backgroundSize: '100% 100%',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  imageRendering: 'pixelated',
  willChange: 'transform',
  transform: `translate3d(${shift.x}px, ${shift.y}px, 0) scale(${scale})`,
  transformOrigin: 'center center',
  zIndex,
  pointerEvents: 'none',
});

interface FogForestProps {
  onAdvance: () => void;
}

const FogForest = ({ onAdvance }: FogForestProps) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const parallax = useMouseParallax(sceneRef);
  const { zoom, setTargetZoom, getTargetZoom } = useScrollZoom(sceneRef, {
    sensitivity: 0.0015,
    lerp: 0.12,
  });

  // Hint visibility — fades after 5s, hides immediately on first interaction.
  const [hintVisible, setHintVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setHintVisible(false), 5200);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (getTargetZoom() > 0) setHintVisible(false);
  }, [zoom, getTargetZoom]);

  // Parallax shifts (unchanged from 5-layer version; gash gets a light shift)
  const SKY_SHIFT   = { x: 0, y: 0 };
  const GASH_SHIFT  = { x: parallax.x *  -1, y: parallax.y * -0.5 };
  const FAR_SHIFT   = { x: parallax.x *  -2, y: parallax.y * -1 };
  const MID_SHIFT   = { x: parallax.x *  -4, y: parallax.y * -2 };
  const NEAR_SHIFT  = { x: parallax.x *  -7, y: parallax.y * -3.5 };
  const FRONT_SHIFT = { x: parallax.x * -11, y: parallax.y * -5.5 };

  // Per-layer scale = base bleed + zoom growth. Larger growth = closer to camera.
  const SKY_SCALE   = 1.00 + zoom * 0.08;
  const GASH_SCALE  = 1.00 + zoom * 0.80;
  const FAR_SCALE   = 1.08 + zoom * 0.60;
  const MID_SCALE   = 1.13 + zoom * 1.20;
  const NEAR_SCALE  = 1.18 + zoom * 2.00;
  const FRONT_SCALE = 1.25 + zoom * 3.20;

  // Step-forward click: +0.5 zoom per click; advance at ≥ 0.85.
  const handleStep = useCallback(() => {
    const t = getTargetZoom();
    if (t >= 0.85) {
      onAdvance();
    } else {
      setTargetZoom(Math.min(1, t + 0.5));
      setHintVisible(false);
    }
  }, [getTargetZoom, setTargetZoom, onAdvance]);

  return (
    <div
      ref={sceneRef}
      style={{ position: 'absolute', inset: 0, background: '#0A0A0A', overflow: 'hidden' }}
    >
      {/* ===== FINAL ART SWAP POINT — SCENE 02 — 6-LAYER ZOOM ===== */}
      {/* Layer 1: Sky (locked, minimal zoom growth) */}
      <div style={layerStyle(ASSETS.sky,   SKY_SCALE,   SKY_SHIFT,   1)} aria-hidden />
      {/* Layer 2: Gash (horizon-distance, modest zoom growth) */}
      <div style={layerStyle(ASSETS.gash,  GASH_SCALE,  GASH_SHIFT,  2)} aria-hidden />
      {/* Layer 3: Far trees */}
      <div style={layerStyle(ASSETS.far,   FAR_SCALE,   FAR_SHIFT,   3)} aria-hidden />
      {/* Layer 4: Mid trees */}
      <div style={layerStyle(ASSETS.mid,   MID_SCALE,   MID_SHIFT,   4)} aria-hidden />
      {/* Layer 5: Near trees */}
      <div style={layerStyle(ASSETS.near,  NEAR_SCALE,  NEAR_SHIFT,  5)} aria-hidden />
      {/* Layer 6: Front trees + overhead arch (closest, grows most) */}
      <div style={layerStyle(ASSETS.front, FRONT_SCALE, FRONT_SHIFT, 6)} aria-hidden />
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

      {/* Step-forward hotspot — center horizon region covering the gash.
          Click steps zoom forward; at max zoom, advances to Idol Doorway. */}
      <button
        type="button"
        onClick={handleStep}
        aria-label="Approach the mansion"
        style={{
          position: 'absolute',
          left: '35%',
          top: '38%',
          width: '30%',
          height: '36%',
          background: 'transparent',
          border: 'none',
          padding: 0,
          cursor: 'none',
          zIndex: 10,
        }}
      />

      {/* Scroll hint — fades over 5s; hides on first interaction */}
      <div
        style={{
          position: 'absolute',
          right: 18,
          bottom: 18,
          zIndex: 15,
          fontFamily: '"Courier New", Courier, monospace',
          fontSize: 10,
          letterSpacing: 1,
          color: '#FF4C65',
          opacity: hintVisible ? 0.7 : 0,
          transition: 'opacity 5s ease-out',
          pointerEvents: 'none',
          textShadow: '0 0 6px rgba(255,76,101,0.4)',
        }}
      >
        scroll to approach.
      </div>
    </div>
  );
};

interface FogForestSceneProps {
  onAdvance: () => void;
}

export const fogForestScene = ({ onAdvance }: FogForestSceneProps): SceneConfig => ({
  id: 'fog-forest',
  title: 'The Fog Forest',
  preloadAdjacent: ['idol-doorway', 'observatory'],
  ambientSoundId: 'forest-ambient',
  hideBackArrow: true,
  background: <FogForest onAdvance={onAdvance} />,
  // Click handling lives inside the FogForest component (zoom-aware step-forward).
  hotspots: [],
});

export default FogForest;
