import { useEffect } from 'react';
import Hotspot from './Hotspot';
import type { SceneConfig, HotspotConfig } from './sceneTypes';

interface SceneViewProps {
  scene: SceneConfig;
  onHotspotActivate: (cfg: HotspotConfig) => void;
  onHoverChange: (cfg: HotspotConfig | null) => void;
  onBack?: () => void;
  debug?: boolean;
  devLabel?: boolean;
}

/**
 * Renders a single Omnibus tableau: background layer, overlay, hotspots,
 * and the standard back-arrow chrome.
 */
const SceneView = ({ scene, onHotspotActivate, onHoverChange, onBack, debug, devLabel }: SceneViewProps) => {
  // Adjacent-scene preload (placeholders only — real images later)
  useEffect(() => {
    // For real images this would create <link rel="prefetch"> tags
    // Placeholders are SVG/CSS so this is a no-op stub for now.
  }, [scene.id]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#0A0A0A',
        overflow: 'hidden',
      }}
    >
      {/* Background layer — fills viewport, 16:9 aspect target */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {scene.background}
      </div>

      {/* Overlay (chandelier, fog drift, etc.) */}
      {scene.overlay && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {scene.overlay}
        </div>
      )}

      {/* Hotspots */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {scene.hotspots.map((h, i) => (
          <Hotspot
            key={`${scene.id}-${i}-${h.label}`}
            config={h}
            onActivate={onHotspotActivate}
            onHoverChange={onHoverChange}
            debug={debug}
          />
        ))}
      </div>

      {/* Back arrow */}
      {!scene.hideBackArrow && onBack && (
        <button
          onClick={onBack}
          style={{
            position: 'fixed',
            top: 18,
            left: 18,
            zIndex: 50,
            fontFamily: '"Space Mono", monospace',
            fontSize: 10,
            letterSpacing: 2,
            textTransform: 'uppercase',
            padding: '8px 14px',
            background: 'rgba(10,10,10,0.7)',
            border: '1px solid #FFE800',
            color: '#FFE800',
            cursor: 'none',
          }}
        >
          ← BACK
        </button>
      )}

      {/* Audio slot */}
      <audio
        data-sound-id={scene.ambientSoundId}
        loop
        preload="auto"
      />

      {/* Dev label */}
      {devLabel && (
        <div style={{
          position: 'fixed',
          top: 14,
          right: 14,
          zIndex: 60,
          fontFamily: '"Space Mono", monospace',
          fontSize: 9,
          letterSpacing: 1.5,
          color: '#FF48B0',
          background: 'rgba(10,10,10,0.7)',
          padding: '4px 8px',
          border: '1px solid #FF48B0',
          pointerEvents: 'none',
        }}>
          {scene.id.toUpperCase()} — {scene.title.toUpperCase()} — PLACEHOLDER
        </div>
      )}
    </div>
  );
};

export default SceneView;
