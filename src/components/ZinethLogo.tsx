import { useRef, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import zLetter from "@/assets/zineth-z.png";
import ringPink from "@/assets/zineth-ring-pink.png";
import ringRed from "@/assets/zineth-ring-red.png";

interface ZinethLogoProps {
  size?: string;
}

const ZinethLogo = ({ size = "w-40 h-40" }: ZinethLogoProps) => {
  const navigate = useNavigate();
  const [hovering, setHovering] = useState(false);
  const [resetting, setResetting] = useState(false);
  const pinkRef = useRef<HTMLImageElement>(null);
  const redRef = useRef<HTMLImageElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const pinkAngle = useRef(0);
  const redAngle = useRef(0);
  const lastTime = useRef(0);

  // Spin while hovering
  useEffect(() => {
    if (!hovering) return;
    setResetting(false);

    const animate = (time: number) => {
      if (lastTime.current === 0) lastTime.current = time;
      const dt = (time - lastTime.current) / 1000;
      lastTime.current = time;

      pinkAngle.current = (pinkAngle.current + dt * 36) % 360; // 10s full rotation
      redAngle.current = (redAngle.current - dt * 51.4) % 360; // 7s full rotation reverse

      if (pinkRef.current) pinkRef.current.style.transform = `rotate(${pinkAngle.current}deg)`;
      if (redRef.current) redRef.current.style.transform = `rotate(${redAngle.current}deg)`;

      animFrameRef.current = requestAnimationFrame(animate);
    };

    lastTime.current = 0;
    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [hovering]);

  // After 10s of no hover, ease back to 0
  useEffect(() => {
    if (hovering) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setResetting(true);
      // Animate back to 0 over 1.5s using CSS transition
      if (pinkRef.current) pinkRef.current.style.transform = "rotate(0deg)";
      if (redRef.current) redRef.current.style.transform = "rotate(0deg)";

      // After transition completes, reset angles
      setTimeout(() => {
        pinkAngle.current = 0;
        redAngle.current = 0;
        setResetting(false);
      }, 1500);
    }, 10000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [hovering]);

  const handleEnter = useCallback(() => setHovering(true), []);
  const handleLeave = useCallback(() => {
    setHovering(false);
    lastTime.current = 0;
  }, []);

  return (
    <div
      className={`${size} relative cursor-pointer`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={() => navigate('/wolfenstein')}
      role="button"
      tabIndex={0}
      aria-label="Enter the restricted zone"
    >
      <img
        ref={pinkRef}
        src={ringPink}
        alt=""
        className="absolute inset-0 w-full h-full object-contain"
        style={{ transition: resetting ? "transform 1.5s ease-in-out" : "none" }}
      />
      <img
        ref={redRef}
        src={ringRed}
        alt=""
        className="absolute inset-0 w-full h-full object-contain"
        style={{ transition: resetting ? "transform 1.5s ease-in-out" : "none" }}
      />
      <img
        src={zLetter}
        alt="Zineth Logo"
        className="absolute inset-0 w-[70%] h-[70%] m-auto object-contain"
      />
    </div>
  );
};

export default ZinethLogo;
