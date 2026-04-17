import { useEffect, useRef, useState } from 'react';

/**
 * Custom Z-sigil cursor for the Omnibus.
 * Tracks mouse position via transform, two states (default / interactive).
 * Hidden on touch devices.
 */
const CursorSigil = ({ interactive }: { interactive: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [touchDevice, setTouchDevice] = useState(false);

  useEffect(() => {
    setTouchDevice('ontouchstart' in window && !window.matchMedia('(hover: hover)').matches);
  }, []);

  useEffect(() => {
    if (touchDevice) return;
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.transform = `translate3d(${e.clientX - 12}px, ${e.clientY - 12}px, 0)`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [touchDevice]);

  if (touchDevice) return null;

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 24,
        height: 24,
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'filter 150ms ease-out, opacity 150ms ease-out',
        opacity: interactive ? 1 : 0.65,
        filter: interactive
          ? 'drop-shadow(0 0 6px #4982CF) drop-shadow(0 0 12px #4982CF)'
          : 'none',
        animation: interactive ? 'sigilCursorSpin 2s linear infinite' : 'none',
      }}
    >
      <SigilSvg />
      <style>{`
        @keyframes sigilCursorSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// Inline SVG of the Z-in-crossed-orbits — chrome gradient stand-in
export const SigilSvg = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="sigilChrome" cx="35%" cy="30%" r="80%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="35%" stopColor="#dcdcdc" />
        <stop offset="65%" stopColor="#6a6a6a" />
        <stop offset="100%" stopColor="#1a1a1a" />
      </radialGradient>
    </defs>
    {/* crossed orbits */}
    <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="url(#sigilChrome)" strokeWidth="1.2" transform="rotate(30 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="url(#sigilChrome)" strokeWidth="1.2" transform="rotate(-30 12 12)" />
    {/* Z */}
    <path d="M 6 7 L 18 7 L 7 17 L 18 17" fill="none" stroke="url(#sigilChrome)" strokeWidth="2.2" strokeLinejoin="miter" strokeLinecap="square" />
  </svg>
);

export default CursorSigil;
