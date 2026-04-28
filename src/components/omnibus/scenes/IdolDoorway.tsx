// SCENE 03 — THE IDOL DOORWAY
// 6-layer parallax composition with smoothed hover-zoom (mouse near center → zoom in).
// Layers (back→front): sky, far columns, shrine archway (with carved sigil + black void),
//   mid columns, foreground steps, side stairs.
// Mouse-move drives parallax (sky locked). Hover-zoom is continuous, no scroll capture.
// Click archway: at zoom ≥ 0.7 → fire transition; otherwise auto-zoom to max then fire.
// Phase 2 will insert door layers between shrine and mid columns.
import { useRef, useCallback, useEffect, useState } from 'react';
import type { SceneConfig } from '../sceneTypes';
import { DitherOverlay } from '../sceneShared';
import { TextureOverlay } from '../TextureOverlay';
import { ScanlineOverlay } from '../ScanlineOverlay';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import { useHoverZoom } from '@/hooks/useHoverZoom';

// Shared layer style — accepts a child JSX block (placeholder art) until PNG assets land.
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

interface IdolDoorwayProps {
  onEnterMansion: () => void;
}

const IdolDoorway = ({ onEnterMansion }: IdolDoorwayProps) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const parallax = useMouseParallax(sceneRef);
  const { zoom, getTargetZoom } = useHoverZoom(sceneRef, {
    lerp: 0.08,
    falloff: 0.7,
  });

  // Door slide-apart animation state
  const [doorsOpening, setDoorsOpening] = useState(false);

  // Parallax shifts (sky locked; magnitudes increase toward camera)
  const SKY_SHIFT      = { x: 0, y: 0 };
  const FAR_COL_SHIFT  = { x: parallax.x *  -1.5, y: parallax.y * -0.8 };
  const SHRINE_SHIFT   = { x: parallax.x *  -2.5, y: parallax.y * -1.2 };
  const MID_COL_SHIFT  = { x: parallax.x *  -5,   y: parallax.y * -2.5 };
  const STEPS_SHIFT    = { x: parallax.x *  -8,   y: parallax.y * -4 };
  const SIDE_SHIFT     = { x: parallax.x * -12,   y: parallax.y * -6 };

  // Per-layer scale = base bleed + zoom growth.
  // Lighter overall growth than Fog Forest — this is a tactile lean-in, not a charge.
  const SKY_SCALE      = 1.00 + zoom * 0.04;
  const FAR_COL_SCALE  = 1.04 + zoom * 0.30;
  const SHRINE_SCALE   = 1.06 + zoom * 0.55;  // central focal anchor
  const MID_COL_SCALE  = 1.10 + zoom * 0.95;
  const STEPS_SCALE    = 1.16 + zoom * 1.60;  // slides past
  const SIDE_SCALE     = 1.22 + zoom * 2.40;  // extreme foreground

  // Doors share shrine-ish parallax/zoom (sit just in front of shrine, behind mid columns)
  const DOOR_SHIFT  = { x: parallax.x * -3.5, y: parallax.y * -1.8 };
  const DOOR_SCALE  = 1.08 + zoom * 0.75;
  const DOOR_L_OPEN = doorsOpening ? '-110%' : '0%';
  const DOOR_R_OPEN = doorsOpening ? '110%'  : '0%';

  // Click handler — play door slide-apart, then fire pixel-wipe transition
  const handleArchClick = useCallback(() => {
    if (doorsOpening) return;
    setDoorsOpening(true);
    setTimeout(() => onEnterMansion(), 1200);
  }, [doorsOpening, onEnterMansion]);

  // Subtle hint, fades after 5s
  const [hintVisible, setHintVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setHintVisible(false), 5200);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (getTargetZoom() > 0.05) setHintVisible(false);
  }, [zoom, getTargetZoom]);

  return (
    <div
      ref={sceneRef}
      style={{ position: 'absolute', inset: 0, background: '#0A0A0A', overflow: 'hidden' }}
    >
      {/* ===== FINAL ART SWAP POINT — SCENE 03 — 6-LAYER HOVER-ZOOM =====
          Painted PNGs supplied by user; outer wrapper styles unchanged. */}

      {/* Layer 1: Sky — locked, minimal zoom growth */}
      <div style={layerWrap(SKY_SCALE, SKY_SHIFT, 1)} aria-hidden>
        <img src="/omnibus/assets/scene-03-idol-doorway-sky.png" alt="" style={layerImg} draggable={false} />
      </div>

      {/* Layer 2: Far columns */}
      <div style={layerWrap(FAR_COL_SCALE, FAR_COL_SHIFT, 2)} aria-hidden>
        <img src="/omnibus/assets/scene-03-idol-doorway-far-columns.png" alt="" style={layerImg} draggable={false} />
      </div>

      {/* Layer 3: Shrine archway — central focal anchor */}
      <div style={layerWrap(SHRINE_SCALE, SHRINE_SHIFT, 3)} aria-hidden>
        <img src="/omnibus/assets/scene-03-idol-doorway-shrine.png" alt="" style={layerImg} draggable={false} />
      </div>

      {/* Layer 3.5: Doors — sit inside the archway opening, behind the mid columns.
          Outer wrapper handles parallax + zoom; inner halves carry slide-apart translateX. */}
      <div style={layerWrap(DOOR_SCALE, DOOR_SHIFT, 4)} aria-hidden>
        <div style={{ position: 'absolute', left: '42%', top: '28%', width: '16%', height: '27%', overflow: 'visible' }}>
          {/* Left half */}
          <img
            src="/omnibus/assets/scene-03-idol-doorway-door-left.png"
            alt=""
            draggable={false}
            style={{
              position: 'absolute',
              left: 0, top: 0, width: '50%', height: '100%',
              objectFit: 'cover',
              imageRendering: 'pixelated',
              userSelect: 'none',
              pointerEvents: 'none',
              transform: `translateX(${DOOR_L_OPEN})`,
              transition: doorsOpening ? 'transform 1.2s ease-in' : 'none',
              transformOrigin: 'right center',
            }}
          />
          {/* Right half */}
          <img
            src="/omnibus/assets/scene-03-idol-doorway-door-right.png"
            alt=""
            draggable={false}
            style={{
              position: 'absolute',
              left: '50%', top: 0, width: '50%', height: '100%',
              objectFit: 'cover',
              imageRendering: 'pixelated',
              userSelect: 'none',
              pointerEvents: 'none',
              transform: `translateX(${DOOR_R_OPEN})`,
              transition: doorsOpening ? 'transform 1.2s ease-in' : 'none',
              transformOrigin: 'left center',
            }}
          />
        </div>
      </div>

      {/* Layer 4: Mid columns (Phase 2 will add doors here) */}
      <div style={layerWrap(MID_COL_SCALE, MID_COL_SHIFT, 5)} aria-hidden>
        <img src="/omnibus/assets/scene-03-idol-doorway-mid-columns.png" alt="" style={layerImg} draggable={false} />
      </div>

      {/* Layer 5: Foreground steps */}
      <div style={layerWrap(STEPS_SCALE, STEPS_SHIFT, 6)} aria-hidden>
        <img src="/omnibus/assets/scene-03-idol-doorway-steps.png" alt="" style={layerImg} draggable={false} />
      </div>

      {/* Layer 6: Side stairs — extreme foreground */}
      <div style={layerWrap(SIDE_SCALE, SIDE_SHIFT, 7)} aria-hidden>
        <img src="/omnibus/assets/scene-03-idol-doorway-stairs-side.png" alt="" style={layerImg} draggable={false} />
      </div>
      {/* ===== END FINAL ART SWAP POINT ===== */}

      {/* Atmosphere overlays */}
      <DitherOverlay opacity={0.2} />
      <TextureOverlay intensity={0.4} />
      <ScanlineOverlay />

      {/* Archway click hotspot — covers the black void at the center of the shrine.
          At zoom ≥ 0.7: instant pixel-wipe. Otherwise: auto-zoom 1s then fire. */}
      <button
        type="button"
        onClick={handleArchClick}
        disabled={doorsOpening}
        aria-label="Enter the mansion"
        style={{
          position: 'absolute',
          left: '42%', top: '28%', width: '16%', height: '27%',
          background: 'transparent',
          border: 'none',
          padding: 0,
          cursor: 'none',
          zIndex: 20,
        }}
      />

      {/* Subtle hint — fades after 5s, hides on first hover-zoom */}
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
        lean in.
      </div>
    </div>
  );
};

interface IdolDoorwaySceneProps {
  onEnterMansion: () => void;
  onBack: () => void;
}

export const IdolDoorwayWithLogic = ({ onEnterMansion }: IdolDoorwaySceneProps) => (
  <IdolDoorway onEnterMansion={onEnterMansion} />
);

export const idolDoorwayScene = (handlers: { onEnterMansion: () => void; onBack: () => void }): SceneConfig => ({
  id: 'idol-doorway',
  title: 'The Idol Doorway',
  preloadAdjacent: ['foyer', 'fog-forest'],
  ambientSoundId: 'mansion-hall',
  background: <IdolDoorwayWithLogic {...handlers} />,
  hotspots: [],
  backTo: 'fog-forest',
});

export default IdolDoorway;
