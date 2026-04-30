// SCENE 05 — THE GREAT ROOM
// 13-layer parallax tableau. Each PNG is full-frame transparent w/ baked-in
// composition — drop layers at inset:0, no per-layer positioning math.
import { useRef, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { SceneConfig } from '../sceneTypes';
import { DitherOverlay } from '../sceneShared';
import { TextureOverlay } from '../TextureOverlay';
import { ScanlineOverlay } from '../ScanlineOverlay';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import { useHoverZoom } from '@/hooks/useHoverZoom';

const ASSETS = '/omnibus/assets';

const layerWrap = (
  shift: { x: number; y: number },
  zIndex: number,
  scale = 1,
  pointerEvents: 'auto' | 'none' = 'none',
): React.CSSProperties => ({
  position: 'absolute',
  inset: 0,
  willChange: 'transform',
  transform: `translate3d(${shift.x}px, ${shift.y}px, 0) scale(${scale})`,
  transformOrigin: 'center center',
  zIndex,
  pointerEvents,
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

const GreatRoom = () => {
  const navigate = useNavigate();
  const sceneRef = useRef<HTMLDivElement>(null);
  const parallax = useMouseParallax(sceneRef);
  const { zoom } = useHoverZoom(sceneRef, { lerp: 0.08, falloff: 0.7 });

  // Hover state for the three glow/door zones
  const [leftHover, setLeftHover] = useState(false);
  const [rightHover, setRightHover] = useState(false);
  const [centerHover, setCenterHover] = useState(false);

  // Door slide-apart + panel reveal state
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

  // Per-axis multipliers from spec
  const SH = (mx: number, my: number) => ({ x: parallax.x * mx, y: parallax.y * my });

  const CEILING_SHIFT       = SH(-1.5, -1);
  const ARCH_SHIFT          = SH(-1.5,  0);
  const CENTRAL_DOORS_SHIFT = SH(-2,    0);
  const LWALL_SHIFT         = SH(-3,    0);
  const LDOOR_SHIFT         = SH(-3.5,  0);
  const RWALL_SHIFT         = SH(-3,    0);
  const RDOOR_SHIFT         = SH(-3.5,  0);
  const BAS_SHIFT           = SH(-4,    0);
  const PANEL_SHIFT         = SH(-4.5,  0);
  const FLOOR_SHIFT         = SH(-5,   -2);

  // Subtle hover-zoom on the doors (matches Foyer/Idol Doorway feel)
  const CENTRAL_SCALE = 1.0 + (centerHover ? zoom * 0.06 : 0);
  const LDOOR_SCALE   = 1.0 + (leftHover   ? zoom * 0.06 : 0);
  const RDOOR_SCALE   = 1.0 + (rightHover  ? zoom * 0.06 : 0);

  // ---------- Click handlers ----------
  const handleCenterClick = useCallback(() => {
    if (doorsOpen) return;
    setDoorsOpen(true);
    // Slide is 1.2s, then route
    setTimeout(() => navigate('/shop'), 1300);
  }, [doorsOpen, navigate]);

  const handleLeftClick = useCallback(() => {
    navigate('/reading');
  }, [navigate]);

  const handleRightClick = useCallback(() => {
    navigate('/arcade');
  }, [navigate]);

  const handlePanelClick = useCallback(() => {
    if (panelOpen) return;
    setPanelOpen(true);
    // Quantized wipe (~600ms) + 200ms hold, then route
    setTimeout(() => navigate('/wolfenstein'), 800);
  }, [panelOpen, navigate]);

  // Preload nothing extra for now
  useEffect(() => { /* placeholder */ }, []);

  // Door split halves — render two clipped copies of the same PNG
  const doorHalf = (side: 'left' | 'right'): React.CSSProperties => ({
    ...layerImg,
    clipPath: side === 'left' ? 'inset(0 50% 0 0)' : 'inset(0 0 0 50%)',
    transform: doorsOpen
      ? `translate3d(${side === 'left' ? '-15%' : '15%'}, 0, 0)`
      : 'translate3d(0,0,0)',
    transition: 'transform 1.2s ease-out',
  });

  return (
    <div
      ref={sceneRef}
      style={{ position: 'absolute', inset: 0, background: '#0A0A0A', overflow: 'hidden' }}
      data-scene-id="great-room"
    >
      {/* z=1 ceiling */}
      <div style={layerWrap(CEILING_SHIFT, 1)} aria-hidden>
        <img src={`${ASSETS}/scene-05-great-room-ceiling.png`} alt="" style={layerImg} draggable={false} />
      </div>

      {/* z=2 archway frame */}
      <div style={layerWrap(ARCH_SHIFT, 2)} aria-hidden>
        <img src={`${ASSETS}/scene-05-great-room-archway-frame.png`} alt="" style={layerImg} draggable={false} />
      </div>

      {/* z=3 central doors (split into two clipped halves for slide-apart) */}
      <div style={layerWrap(CENTRAL_DOORS_SHIFT, 3, CENTRAL_SCALE)} aria-hidden>
        <img src={`${ASSETS}/scene-05-great-room-central-doors.png`} alt="" style={doorHalf('left')} draggable={false} />
        <img src={`${ASSETS}/scene-05-great-room-central-doors.png`} alt="" style={doorHalf('right')} draggable={false} />
      </div>

      {/* z=4 left wall */}
      <div style={layerWrap(LWALL_SHIFT, 4)} aria-hidden>
        <img src={`${ASSETS}/scene-05-great-room-left-wall.png`} alt="" style={layerImg} draggable={false} />
      </div>

      {/* z=5 left door */}
      <div style={layerWrap(LDOOR_SHIFT, 5, LDOOR_SCALE)} aria-hidden>
        <img src={`${ASSETS}/scene-05-great-room-left-door.png`} alt="" style={layerImg} draggable={false} />
      </div>

      {/* z=6 left door glow (hover-only) */}
      <div style={layerWrap(LDOOR_SHIFT, 6)} aria-hidden>
        <img
          src={`${ASSETS}/scene-05-great-room-left-door-glow.png`}
          alt=""
          style={{
            ...layerImg,
            opacity: leftHover ? 1 : 0,
            transform: `scale(${leftHover ? 1.0 : 0.8})`,
            transition: 'opacity 350ms ease-out, transform 350ms ease-out',
          }}
          draggable={false}
        />
      </div>

      {/* z=7 right wall */}
      <div style={layerWrap(RWALL_SHIFT, 7)} aria-hidden>
        <img src={`${ASSETS}/scene-05-great-room-right-wall.png`} alt="" style={layerImg} draggable={false} />
      </div>

      {/* z=8 right door */}
      <div style={layerWrap(RDOOR_SHIFT, 8, RDOOR_SCALE)} aria-hidden>
        <img src={`${ASSETS}/scene-05-great-room-right-door.png`} alt="" style={layerImg} draggable={false} />
      </div>

      {/* z=9 right door glow (hover-only) */}
      <div style={layerWrap(RDOOR_SHIFT, 9)} aria-hidden>
        <img
          src={`${ASSETS}/scene-05-great-room-right-door-glow.png`}
          alt=""
          style={{
            ...layerImg,
            opacity: rightHover ? 1 : 0,
            transform: `scale(${rightHover ? 1.0 : 0.8})`,
            transition: 'opacity 350ms ease-out, transform 350ms ease-out',
          }}
          draggable={false}
        />
      </div>

      {/* z=10 bas-relief (decorative) */}
      <div style={layerWrap(BAS_SHIFT, 10)} aria-hidden>
        <img src={`${ASSETS}/scene-05-great-room-bas-relief.png`} alt="" style={layerImg} draggable={false} />
      </div>

      {/* z=11 hidden panel — closed (always rendered as base) */}
      <div style={layerWrap(PANEL_SHIFT, 11)} aria-hidden>
        <img src={`${ASSETS}/scene-05-great-room-hidden-panel-closed.png`} alt="" style={layerImg} draggable={false} />
      </div>

      {/* z=12 hidden panel — open (quantized pixel wipe in via steps()) */}
      <div style={layerWrap(PANEL_SHIFT, 12)} aria-hidden>
        <img
          src={`${ASSETS}/scene-05-great-room-hidden-panel-open.png`}
          alt=""
          style={{
            ...layerImg,
            opacity: panelOpen ? 1 : 0,
            transition: 'opacity 600ms steps(8, end)',
          }}
          draggable={false}
        />
      </div>

      {/* z=13 floor (foreground) */}
      <div style={layerWrap(FLOOR_SHIFT, 13)} aria-hidden>
        <img src={`${ASSETS}/scene-05-great-room-floor.png`} alt="" style={layerImg} draggable={false} />
      </div>

      {/* Atmosphere overlays */}
      <DitherOverlay opacity={0.12} />
      <TextureOverlay intensity={0.35} />
      <ScanlineOverlay />

      {/* ===== Click hotspots (kept above overlays) ===== */}
      {/* Central doors → /shop */}
      <button
        type="button"
        data-interactive="true"
        onMouseEnter={() => setCenterHover(true)}
        onMouseLeave={() => setCenterHover(false)}
        onClick={handleCenterClick}
        aria-label="Enter the Shop"
        style={{
          position: 'absolute',
          left: '40%', top: '34%', width: '20%', height: '44%',
          background: 'transparent', border: 'none', padding: 0,
          cursor: 'none', zIndex: 30,
        }}
      />
      {/* Left door → /reading */}
      <button
        type="button"
        data-interactive="true"
        onMouseEnter={() => setLeftHover(true)}
        onMouseLeave={() => setLeftHover(false)}
        onClick={handleLeftClick}
        aria-label="Enter the Reading Room"
        style={{
          position: 'absolute',
          left: '8%', top: '38%', width: '16%', height: '40%',
          background: 'transparent', border: 'none', padding: 0,
          cursor: 'none', zIndex: 30,
        }}
      />
      {/* Right door → /arcade */}
      <button
        type="button"
        data-interactive="true"
        onMouseEnter={() => setRightHover(true)}
        onMouseLeave={() => setRightHover(false)}
        onClick={handleRightClick}
        aria-label="Enter the Arcade"
        style={{
          position: 'absolute',
          right: '8%', top: '38%', width: '16%', height: '40%',
          background: 'transparent', border: 'none', padding: 0,
          cursor: 'none', zIndex: 30,
        }}
      />
      {/* Hidden panel → /wolfenstein */}
      <button
        type="button"
        data-interactive="true"
        onClick={handlePanelClick}
        aria-label="Hidden passage"
        style={{
          position: 'absolute',
          left: '46%', top: '76%', width: '8%', height: '12%',
          background: 'transparent', border: 'none', padding: 0,
          cursor: 'none', zIndex: 30,
        }}
      />
    </div>
  );
};

export const greatRoomScene: SceneConfig = {
  id: 'great-room',
  title: 'The Great Room',
  preloadAdjacent: ['foyer'],
  ambientSoundId: 'great-room',
  background: <GreatRoom />,
  backTo: 'foyer',
  hotspots: [],
};

export default GreatRoom;
