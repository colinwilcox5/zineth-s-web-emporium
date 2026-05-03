import { useNavigate } from 'react-router-dom';
import { ArcadeHeader } from '@/components/arcade/ArcadeHeader';
import { TraceGame } from '@/components/arcade/TraceGame';
import { addUnlock } from '@/data/arcadeUnlocks';

const NEON_PINK = '#FF48B0';

// 3 nested pentagons
const makeRing = (radius: number, rotDeg: number) =>
  Array.from({ length: 5 }, (_, i) => {
    const a = (Math.PI * 2 * i) / 5 - Math.PI / 2 + (rotDeg * Math.PI) / 180;
    return { x: radius * Math.cos(a), y: radius * Math.sin(a) };
  });

const dots = [
  ...makeRing(240, 0),   // 0-4 outer
  ...makeRing(160, 24),  // 5-9 middle
  ...makeRing(80, 48),   // 10-14 inner
];

// Outer: 0→1→2→3→4→0, transition: 0→5, Middle: 5→6→7→8→9→5, transition: 5→10, Inner: 10→11→12→13→14→10
const sequence = [0, 1, 2, 3, 4, 0, 5, 6, 7, 8, 9, 5, 10, 11, 12, 13, 14, 10];

// Elaborate reveal SVG
const SpiralRevealSVG = () => {
  const size = 600;
  const cx = size / 2, cy = size / 2;
  const rings = [
    { r: 240, rot: 0 },
    { r: 200, rot: 12 },
    { r: 160, rot: 24 },
    { r: 120, rot: 36 },
    { r: 80, rot: 48 },
    { r: 40, rot: 60 },
  ];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ maxWidth: '80vw', maxHeight: '80vh' }}>
      {rings.map((ring, li) => {
        const pts = Array.from({ length: 5 }, (_, i) => {
          const a = (Math.PI * 2 * i) / 5 - Math.PI / 2 + (ring.rot * Math.PI) / 180;
          return [cx + ring.r * Math.cos(a), cy + ring.r * Math.sin(a)] as [number, number];
        });
        return (
          <polygon
            key={li}
            points={pts.map(p => p.join(',')).join(' ')}
            fill="none"
            stroke={NEON_PINK}
            strokeWidth={1.5}
            opacity={1 - li * 0.12}
            style={{
              animation: `spiralRevealDraw 1.2s ease-out ${li * 0.15}s both`,
              filter: `drop-shadow(0 0 4px ${NEON_PINK}60)`,
            }}
          />
        );
      })}
      {/* Connecting spiral lines */}
      {rings.slice(0, -1).map((ring, li) => {
        const nextRing = rings[li + 1];
        const a1 = (Math.PI * 2 * 0) / 5 - Math.PI / 2 + (ring.rot * Math.PI) / 180;
        const a2 = (Math.PI * 2 * 0) / 5 - Math.PI / 2 + (nextRing.rot * Math.PI) / 180;
        return (
          <line
            key={`conn-${li}`}
            x1={cx + ring.r * Math.cos(a1)} y1={cy + ring.r * Math.sin(a1)}
            x2={cx + nextRing.r * Math.cos(a2)} y2={cy + nextRing.r * Math.sin(a2)}
            stroke={NEON_PINK}
            strokeWidth={1}
            opacity={0.5}
            style={{ animation: `spiralRevealDraw 0.8s ease-out ${li * 0.15 + 0.3}s both` }}
          />
        );
      })}
      <style>{`
        @keyframes spiralRevealDraw {
          from { opacity: 0; stroke-dashoffset: 1000; }
          to { opacity: 1; stroke-dashoffset: 0; }
        }
      `}</style>
    </svg>
  );
};

const ArcadeTraceSpiral = () => {
  const navigate = useNavigate();

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#0A0A0A' }}>
      <ArcadeHeader title="TRACE 03 · SPIRAL" />
      <TraceGame
        id="trace-spiral"
        dots={dots}
        sequence={sequence}
        completionRevealSVG={<SpiralRevealSVG />}
        onComplete={() => {
          addUnlock('trace-spiral');
          navigate('/arcade');
        }}
      />
    </div>
  );
};

export default ArcadeTraceSpiral;