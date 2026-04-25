import { useEffect, useRef, useState } from 'react';

/**
 * Tracks zoom level [0, 1] driven by mouse proximity to the container's center.
 * Mouse at center = zoom 1 (max). Mouse at edges = zoom 0 (base).
 * Smoothed via requestAnimationFrame lerp for a tactile, continuous feel.
 *
 * Returns the smoothed current zoom level. Touch devices return 0 (zoom disabled).
 */
export function useHoverZoom(
  containerRef: React.RefObject<HTMLElement>,
  options: { lerp?: number; falloff?: number } = {}
) {
  const { lerp = 0.08, falloff = 0.7 } = options;
  const [currentZoom, setCurrentZoom] = useState(0);
  const targetRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      const distance = Math.sqrt(nx * nx + ny * ny);
      const target = Math.max(0, 1 - distance * falloff);
      targetRef.current = target;
    };

    const handleMouseLeave = () => {
      targetRef.current = 0;
    };

    const el = containerRef.current;
    window.addEventListener('mousemove', handleMouseMove);
    el?.addEventListener('mouseleave', handleMouseLeave);

    const tick = () => {
      setCurrentZoom((prev) => {
        const next = prev + (targetRef.current - prev) * lerp;
        return Math.abs(next - targetRef.current) < 0.001 ? targetRef.current : next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      el?.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [containerRef, lerp, falloff]);

  /** Imperatively set the target zoom (used by click-to-auto-zoom). */
  const setTargetZoom = (value: number) => {
    targetRef.current = Math.max(0, Math.min(1, value));
  };

  return {
    zoom: currentZoom,
    setTargetZoom,
    getTargetZoom: () => targetRef.current,
  };
}
