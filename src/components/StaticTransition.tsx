import { useEffect, useRef, useState } from "react";

interface StaticTransitionProps {
  active: boolean;
  onComplete?: () => void;
}

const StaticTransition = ({ active, onComplete }: StaticTransitionProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);
  const frameRef = useRef<number>(0);
  const startTimeRef = useRef(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!active) return;
    setVisible(true);
    startTimeRef.current = performance.now();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const duration = 800; // ms

    const drawStatic = (time: number) => {
      const elapsed = time - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      const { width, height } = canvas;
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      // Intensity peaks in the middle, fades in/out
      const intensity = Math.sin(progress * Math.PI);

      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 255 * intensity;
        // Green-tinted static to match the aesthetic
        data[i] = noise * 0.3;     // R
        data[i + 1] = noise;       // G
        data[i + 2] = noise * 0.4; // B
        data[i + 3] = 255 * intensity * 0.9; // A
      }

      ctx.putImageData(imageData, 0, 0);

      // Horizontal scan lines
      ctx.fillStyle = `rgba(0, 255, 100, ${0.05 * intensity})`;
      for (let y = 0; y < height; y += 4) {
        ctx.fillRect(0, y, width, 1);
      }

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(drawStatic);
      } else {
        setVisible(false);
        onCompleteRef.current?.();
      }
    };

    frameRef.current = requestAnimationFrame(drawStatic);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[200] pointer-events-none"
      style={{
        imageRendering: "pixelated",
        display: visible ? "block" : "none",
      }}
    />
  );
};

export default StaticTransition;
