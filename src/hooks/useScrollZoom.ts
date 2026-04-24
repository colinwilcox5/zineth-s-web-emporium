import { useEffect, useRef, useState } from 'react';

/**
 * Tracks a zoom level between 0 and 1 driven by scroll-wheel input on a container.
 * Zoom is smoothed via requestAnimationFrame lerp for buttery feel.
 * Each wheel tick adjusts a target value; the actual applied value chases it.
 *
 * Returns the smoothed current zoom level (0 = no zoom, 1 = max zoom).
 * Touch devices always return 0 (scroll-zoom disabled on touch).
 */
export function useScrollZoom(
  containerRef: React.RefObject<HTMLElement>,
  options: { sensitivity?: number; lerp?: number } = {}
) {
  const { sensitivity = 0.0015, lerp = 0.12 } = options;
  const [currentZoom, setCurrentZoom] = useState(0);
  const targetRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (isTouch) return;

    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      // deltaY positive = scroll down = zoom out; negative = scroll up = zoom in
      targetRef.current = Math.max(
        0,
        Math.min(1, targetRef.current - e.deltaY * sensitivity)
      );
    };

    el.addEventListener('wheel', handleWheel, { passive: false });

    const tick = () => {
      setCurrentZoom((prev) => {
        const next = prev + (targetRef.current - prev) * lerp;
        return Math.abs(next - targetRef.current) < 0.001 ? targetRef.current : next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener('wheel', handleWheel);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [containerRef, sensitivity, lerp]);

  const setTargetZoom = (value: number) => {
    targetRef.current = Math.max(0, Math.min(1, value));
  };

  return {
    zoom: currentZoom,
    setTargetZoom,
    getTargetZoom: () => targetRef.current,
  };
}
