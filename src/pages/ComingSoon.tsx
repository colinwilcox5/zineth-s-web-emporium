import { useNavigate } from 'react-router-dom';

interface ComingSoonProps {
  title: string;
}

const ComingSoon = ({ title }: ComingSoonProps) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#0A0A0A',
        color: '#FFE800',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 32,
        fontFamily: '"Space Mono", monospace',
      }}
    >
      <h1
        style={{
          fontSize: 'clamp(32px, 8vw, 96px)',
          letterSpacing: 4,
          textTransform: 'uppercase',
          margin: 0,
        }}
      >
        {title} — coming soon
      </h1>
      <button
        onClick={() => navigate('/omnibus')}
        style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: 12,
          letterSpacing: 2,
          textTransform: 'uppercase',
          padding: '10px 18px',
          background: 'transparent',
          border: '1px solid #FFE800',
          color: '#FFE800',
          cursor: 'pointer',
        }}
      >
        ← back to omnibus
      </button>
    </div>
  );
};

export default ComingSoon;