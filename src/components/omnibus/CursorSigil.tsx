import { useEffect, useRef, useState } from 'react';

/**
 * Custom Z-sigil cursor for the Omnibus.
 * Static by default; scales up + glows red + rotates when hovering an
 * interactive element (button, a, [role="button"], [data-interactive="true"]).
 * Detection is global via document.elementFromPoint — no per-element wiring.
 * Hidden on touch devices.
 *
 * The legacy `interactive` prop is accepted but ignored (auto-detected now).
 */
const CursorSigil = (_props: { interactive?: boolean } = {}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastHoverRef = useRef(false);
  const [touchDevice, setTouchDevice] = useState(false);

  useEffect(() => {
    setTouchDevice('ontouchstart' in window && !window.matchMedia('(hover: hover)').matches);
  }, []);

  useEffect(() => {
    if (touchDevice) return;
    const onMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const wrap = wrapRef.current;
        const inner = innerRef.current;
        if (!wrap || !inner) return;
        wrap.style.transform = `translate3d(${e.clientX - 14}px, ${e.clientY - 14}px, 0)`;

        const el = document.elementFromPoint(e.clientX, e.clientY);
        const interactive = !!el?.closest(
          'button, a, [role="button"], [data-interactive="true"]'
        );
        if (interactive !== lastHoverRef.current) {
          lastHoverRef.current = interactive;
          inner.classList.toggle('is-hovering', interactive);
          inner.classList.toggle('is-default', !interactive);
        }
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [touchDevice]);

  if (touchDevice) return null;

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 28,
        height: 28,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      <div ref={innerRef} className="cursor-sigil is-default">
        <SigilSvg size={28} />
      </div>
    </div>
  );
};

// Inline SVG sigil — canonical form: lowercase Z silhouette + TWO crossed
// elliptical orbital rings forming an X + TWO terminal spheres
// (upper-right and lower-left termini). Chrome surface treatment.
export const SigilSvg = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="sigilChrome" cx="35%" cy="30%" r="80%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="35%" stopColor="#dcdcdc" />
        <stop offset="65%" stopColor="#6a6a6a" />
        <stop offset="100%" stopColor="#1a1a1a" />
      </radialGradient>
      <radialGradient id="sigilSphere" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="60%" stopColor="#9a9a9a" />
        <stop offset="100%" stopColor="#1a1a1a" />
      </radialGradient>
    </defs>
    {/* Two crossed orbital rings forming an X */}
    <ellipse cx="12" cy="12" rx="10.5" ry="3.6" fill="none" stroke="url(#sigilChrome)" strokeWidth="1.1" transform="rotate(32 12 12)" />
    <ellipse cx="12" cy="12" rx="10.5" ry="3.6" fill="none" stroke="url(#sigilChrome)" strokeWidth="1.1" transform="rotate(-32 12 12)" />
    {/* Z silhouette — thick rounded strokes */}
    <path d="M 6.5 7.5 L 17.5 7.5 L 7 16.5 L 17.5 16.5"
      fill="none"
      stroke="url(#sigilChrome)"
      strokeWidth="2.4"
      strokeLinejoin="round"
      strokeLinecap="round" />
    {/* Two terminal spheres at orbital ring termini (upper-right + lower-left) */}
    <circle cx="20.6" cy="6.6" r="1.6" fill="url(#sigilSphere)" stroke="#0a0a0a" strokeWidth="0.3" />
    <circle cx="3.4" cy="17.4" r="1.6" fill="url(#sigilSphere)" stroke="#0a0a0a" strokeWidth="0.3" />
  </svg>
);

export default CursorSigil;
