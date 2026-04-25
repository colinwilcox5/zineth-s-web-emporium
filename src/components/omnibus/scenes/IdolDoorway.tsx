// SCENE 03 — THE IDOL DOORWAY
// 6-layer parallax composition with smoothed hover-zoom (mouse near center → zoom in).
// Layers (back→front): sky, far columns, shrine archway (with carved sigil + black void),
//   mid columns, foreground steps, side stairs.
// Mouse-move drives parallax (sky locked). Hover-zoom is continuous, no scroll capture.
// Click archway: at zoom ≥ 0.7 → fire transition; otherwise auto-zoom to max then fire.
// Phase 2 will insert door layers between shrine and mid columns.
import { useRef, useCallback, useEffect, useState } from 'react';
import type { SceneConfig } from '../sceneTypes';
import { SIGIL_COLORS } from '../sceneTypes';
import { DitherOverlay } from '../sceneShared';
import { RealSigil } from '../RealSigil';
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

interface IdolDoorwayProps {
  onEnterMansion: () => void;
}

const IdolDoorway = ({ onEnterMansion }: IdolDoorwayProps) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const parallax = useMouseParallax(sceneRef);
  const { zoom, setTargetZoom, getTargetZoom } = useHoverZoom(sceneRef, {
    lerp: 0.08,
    falloff: 0.7,
  });

  // Auto-zoom-then-advance state
  const [autoZooming, setAutoZooming] = useState(false);

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

  // Click handler — auto-zoom-then-advance if not already zoomed in
  const handleArchClick = useCallback(() => {
    if (autoZooming) return;
    const t = getTargetZoom();
    if (t >= 0.7) {
      onEnterMansion();
      return;
    }
    // Animate target to 1 over ~1s, then fire transition
    setAutoZooming(true);
    const start = performance.now();
    const from = t;
    const duration = 1000;
    const animate = (now: number) => {
      const k = Math.min(1, (now - start) / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - k, 3);
      setTargetZoom(from + (1 - from) * eased);
      if (k < 1) requestAnimationFrame(animate);
      else onEnterMansion();
    };
    requestAnimationFrame(animate);
  }, [autoZooming, getTargetZoom, setTargetZoom, onEnterMansion]);

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
          Replace each <div> child with <img src="/omnibus/assets/scene-03-*.png" />
          when the painted layers arrive. Outer wrapper styles stay as-is. */}

      {/* Layer 1: Sky — locked, minimal zoom growth */}
      <div style={layerWrap(SKY_SCALE, SKY_SHIFT, 1)} aria-hidden>
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(180deg, ${SIGIL_COLORS.federalBlue} 0%, #2a2a3a 55%, #1a1410 100%)`,
        }} />
        {/* Spotlight from above — part of the sky/atmosphere layer */}
        <div style={{
          position: 'absolute', left: '20%', right: '20%', top: 0, bottom: 0,
          background: `radial-gradient(ellipse at 50% 25%, ${SIGIL_COLORS.cream}30 0%, ${SIGIL_COLORS.yellow}20 25%, transparent 60%), radial-gradient(ellipse at 50% 50%, ${SIGIL_COLORS.pink}20 0%, transparent 50%)`,
          pointerEvents: 'none',
        }} />
      </div>

      {/* Layer 2: Far columns — distant flanking pillars */}
      <div style={layerWrap(FAR_COL_SCALE, FAR_COL_SHIFT, 2)} aria-hidden>
        <div style={{
          position: 'absolute', left: '10%', top: '20%', width: '8%', bottom: '15%',
          background: 'linear-gradient(90deg, #2a2a30, #4a4a52, #2a2a30)',
          opacity: 0.65,
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.6)',
        }} />
        <div style={{
          position: 'absolute', right: '10%', top: '20%', width: '8%', bottom: '15%',
          background: 'linear-gradient(90deg, #2a2a30, #4a4a52, #2a2a30)',
          opacity: 0.65,
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.6)',
        }} />
      </div>

      {/* Layer 3: Shrine archway — central focal anchor with carved sigil + pure black void */}
      <div style={layerWrap(SHRINE_SCALE, SHRINE_SHIFT, 3)} aria-hidden>
        <div style={{
          position: 'absolute', left: '25%', right: '25%', top: '15%', bottom: '8%',
          background: `linear-gradient(180deg, #555 0%, #333 50%, #1a1a1a 100%)`,
          border: '4px solid #222',
          boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)',
        }}>
          {/* Stone crack lines */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            <path d="M 5% 18% L 12% 30% L 8% 48% L 18% 70%" stroke="rgba(0,0,0,0.45)" strokeWidth="1" fill="none" />
            <path d="M 90% 12% L 82% 28% L 88% 50% L 78% 80%" stroke="rgba(0,0,0,0.45)" strokeWidth="1" fill="none" />
            <path d="M 30% 8% L 42% 16%" stroke="rgba(0,0,0,0.35)" strokeWidth="0.8" fill="none" />
          </svg>

          {/* Top scrollwork band */}
          <div style={{
            position: 'absolute', left: 0, right: 0, top: 0, height: '12%',
            background: `repeating-linear-gradient(90deg, ${SIGIL_COLORS.yellow}, ${SIGIL_COLORS.yellow} 8px, #444 8px, #444 16px)`,
            opacity: 0.5,
            borderBottom: `2px solid ${SIGIL_COLORS.yellow}`,
          }} />

          {/* Carved sigil */}
          <div style={{
            position: 'absolute', left: '20%', right: '20%', top: '14%', height: '38%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <RealSigil size="100%" variant="stone" />
          </div>

          {/* Archway opening — pure black void where doors will sit (Phase 2) */}
          <div style={{
            position: 'absolute', left: '20%', right: '20%', top: '54%', bottom: '8%',
            background: '#000',
            boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.95), inset 0 0 30px rgba(0,0,0,0.9)',
            border: `1px solid ${SIGIL_COLORS.yellow}30`,
          }} />

          {/* Steps base — part of shrine layer */}
          <div style={{
            position: 'absolute', left: '-8%', right: '-8%', bottom: '-8%', height: '10%',
            background: `linear-gradient(180deg, #555, #2a2a2a)`,
            borderTop: '2px solid #666',
          }} />
        </div>
      </div>

      {/* Layer 4: Mid columns — closer flanking columns (Phase 2 will add doors here) */}
      <div style={layerWrap(MID_COL_SCALE, MID_COL_SHIFT, 4)} aria-hidden>
        <div style={{
          position: 'absolute', left: '18%', top: '18%', width: '6%', bottom: '6%',
          background: 'linear-gradient(90deg, #1a1a20, #3a3a44, #1a1a20)',
          boxShadow: 'inset 0 0 24px rgba(0,0,0,0.75)',
        }} />
        <div style={{
          position: 'absolute', right: '18%', top: '18%', width: '6%', bottom: '6%',
          background: 'linear-gradient(90deg, #1a1a20, #3a3a44, #1a1a20)',
          boxShadow: 'inset 0 0 24px rgba(0,0,0,0.75)',
        }} />
      </div>

      {/* Layer 5: Foreground steps — heavy parallax, prominent zoom */}
      <div style={layerWrap(STEPS_SCALE, STEPS_SHIFT, 5)} aria-hidden>
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: '0%', height: '14%',
          background: 'linear-gradient(180deg, #4a4a4a 0%, #2a2a2a 50%, #1a1a1a 100%)',
          borderTop: '3px solid #5a5a5a',
          boxShadow: 'inset 0 6px 12px rgba(0,0,0,0.6)',
        }} />
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: '8%', height: '4%',
          background: 'linear-gradient(180deg, #555, #333)',
          borderTop: '1px solid #666',
        }} />
      </div>

      {/* Layer 6: Side stairs — extreme foreground, slides past edges aggressively */}
      <div style={layerWrap(SIDE_SCALE, SIDE_SHIFT, 6)} aria-hidden>
        <div style={{
          position: 'absolute', left: 0, bottom: 0, width: '16%', height: '22%',
          background: 'linear-gradient(45deg, #1a1a1a 0%, #3a3a3a 60%, #1a1a1a 100%)',
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 40%, 0% 80%)',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.7)',
        }} />
        <div style={{
          position: 'absolute', right: 0, bottom: 0, width: '16%', height: '22%',
          background: 'linear-gradient(-45deg, #1a1a1a 0%, #3a3a3a 60%, #1a1a1a 100%)',
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 80%, 0% 40%)',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.7)',
        }} />
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
        aria-label="Enter the mansion"
        style={{
          position: 'absolute',
          left: '37%', top: '52%', width: '26%', height: '32%',
          background: 'transparent',
          border: 'none',
          padding: 0,
          cursor: 'none',
          zIndex: 10,
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
