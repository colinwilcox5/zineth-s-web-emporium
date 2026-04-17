import { useState } from 'react';
import type { HotspotConfig } from './sceneTypes';

interface HotspotProps {
  config: HotspotConfig;
  onActivate: (cfg: HotspotConfig) => void;
  onHoverChange: (cfg: HotspotConfig | null) => void;
  debug?: boolean;
}

/** Invisible (or debug-pink) clickable region positioned in % over a scene. */
const Hotspot = ({ config, onActivate, onHoverChange, debug }: HotspotProps) => {
  const [hover, setHover] = useState(false);

  const handleClick = () => {
    if (config.href) {
      window.open(config.href, '_blank', 'noopener,noreferrer');
      return;
    }
    onActivate(config);
  };

  return (
    <div
      role="button"
      aria-label={config.label}
      onClick={handleClick}
      onMouseEnter={() => { setHover(true); onHoverChange(config); }}
      onMouseLeave={() => { setHover(false); onHoverChange(null); }}
      style={{
        position: 'absolute',
        left: `${config.area.left}%`,
        top: `${config.area.top}%`,
        width: `${config.area.width}%`,
        height: `${config.area.height}%`,
        cursor: config.noCursorGlow ? 'auto' : 'none',
        background: debug
          ? (hover ? 'rgba(255,72,176,0.25)' : 'rgba(255,72,176,0.05)')
          : 'transparent',
        border: debug ? '1px dashed #FF48B0' : 'none',
        filter: hover ? 'brightness(1.1)' : 'none',
        transition: 'filter 150ms ease',
      }}
    >
      {debug && (
        <span style={{
          position: 'absolute', top: 2, left: 4,
          fontSize: 9, color: '#FF48B0',
          fontFamily: '"Space Mono", monospace',
          textShadow: '0 0 3px #000',
          pointerEvents: 'none',
        }}>
          {config.label}
        </span>
      )}
      {hover && config.tooltip && !debug && (
        <span style={{
          position: 'absolute', bottom: '102%', left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 10, color: '#f2f0ec',
          fontFamily: '"Space Mono", monospace',
          background: 'rgba(10,10,10,0.85)',
          border: '1px solid #FFE800',
          padding: '4px 8px',
          whiteSpace: 'nowrap',
          letterSpacing: 1,
          textTransform: 'uppercase',
          pointerEvents: 'none',
        }}>
          {config.tooltip}
        </span>
      )}
    </div>
  );
};

export default Hotspot;
