import { useNavigate } from 'react-router-dom';
import { ArcadeHeader } from '@/components/arcade/ArcadeHeader';
import { TraceGame } from '@/components/arcade/TraceGame';
import { addUnlock } from '@/data/arcadeUnlocks';

const R = 240;
const dots = Array.from({ length: 5 }, (_, i) => {
  const a = (Math.PI * 2 * i) / 5 - Math.PI / 2;
  return { x: R * Math.cos(a), y: R * Math.sin(a) };
});

const ArcadeTracePentagon = () => {
  const navigate = useNavigate();

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#0A0A0A' }}>
      <ArcadeHeader title="TRACE 01 · PENTAGON" />
      <TraceGame
        id="trace-pentagon"
        dots={dots}
        sequence={[0, 1, 2, 3, 4, 0]}
        onComplete={() => {
          addUnlock('trace-pentagon');
          navigate('/arcade');
        }}
      />
    </div>
  );
};

export default ArcadeTracePentagon;