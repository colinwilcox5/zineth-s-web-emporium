import { useEffect, useRef, useState } from 'react';

/**
 * Tracks mouse position relative to a container element, normalized to [-1, 1]
 * on both axes. Returns { x, y } for use in translate3d-based parallax transforms.
 * Throttled via requestAnimationFrame for 60fps performance.
 * Returns { x: 0, y: 0 } on touch devices (parallax disabled on touch).
 */
export function useMouseParallax(containerRef: React.RefObject<HTMLElement>) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const el = containerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        setOffset({
          x: Math.max(-1, Math.min(1, x)),
          y: Math.max(-1, Math.min(1, y)),
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [containerRef]);

  return offset;
}