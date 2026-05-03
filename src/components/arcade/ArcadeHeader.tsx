import { useNavigate } from 'react-router-dom';

const NEON_PINK = '#FF48B0';
const YELLOW = '#FFE800';
const CREAM = '#f2f0ec';

interface ArcadeHeaderProps {
  title: string;
  backTo?: string;
  backLabel?: string;
  rightContent?: React.ReactNode;
}

export const ArcadeHeader = ({
  title,
  backTo = '/arcade',
  backLabel = '← BACK TO ARCADE',
  rightContent,
}: ArcadeHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      height: 64,
      background: '#0A0A0A',
      borderBottom: `1px solid ${NEON_PINK}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
    }}>
      <button
        onClick={() => navigate(backTo)}
        data-interactive="true"
        style={{
          background: 'none',
          border: 'none',
          fontFamily: '"Space Mono", monospace',
          fontSize: 12,
          letterSpacing: 2,
          textTransform: 'uppercase',
          color: CREAM,
          cursor: 'none',
          padding: 0,
        }}
        onMouseEnter={e => (e.currentTarget.style.color = NEON_PINK)}
        onMouseLeave={e => (e.currentTarget.style.color = CREAM)}
      >
        {backLabel}
      </button>

      <span style={{
        fontFamily: '"Space Grotesk", sans-serif',
        fontWeight: 800,
        fontSize: 22,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: title === 'PONG' ? YELLOW : NEON_PINK,
      }}>
        {title}
      </span>

      <div style={{ minWidth: 120, textAlign: 'right' }}>
        {rightContent}
      </div>
    </div>
  );
};

export default ArcadeHeader;