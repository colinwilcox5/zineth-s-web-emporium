import { useParams, useNavigate } from 'react-router-dom';
import { readingCharacters } from '@/data/readingCharacters';

const COLORS = {
  bg: '#0A0A0A',
  federal: '#3D5588',
  federalLight: '#4982CF',
  federalDark: '#2d3f66',
  cream: '#f2f0ec',
  yellow: '#FFE800',
  pink: '#FF48B0',
};

const ReadingDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const char = readingCharacters.find((c) => c.slug === slug);
  const charIndex = readingCharacters.findIndex((c) => c.slug === slug);

  if (!char) {
    return (
      <div style={{ position: 'fixed', inset: 0, background: COLORS.bg, color: COLORS.cream, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Space Mono", monospace' }}>
        Character not found.
        <button onClick={() => navigate('/reading')} style={{ marginLeft: 16, color: COLORS.yellow, background: 'none', border: 'none', cursor: 'pointer', fontFamily: '"Space Mono", monospace' }}>
          ← Back
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        background: `linear-gradient(to bottom, ${COLORS.bg} 0%, ${COLORS.federal} 70%, ${COLORS.federal} 100%)`,
        fontFamily: '"Space Mono", monospace',
      }}
    >
      {/* Floor */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '30%',
          background: COLORS.federalLight,
          opacity: 0.15,
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.04) 10px, rgba(255,255,255,0.04) 11px)`,
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          zIndex: 10,
        }}
      >
        <button
          data-interactive="true"
          onClick={() => navigate(-1)}
          style={{
            background: 'none',
            border: 'none',
            fontFamily: '"Space Mono", monospace',
            fontSize: '12px',
            textTransform: 'uppercase',
            color: COLORS.cream,
            cursor: 'none',
            letterSpacing: '0.05em',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.yellow)}
          onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.cream)}
        >
          ← BACK TO READING ROOM
        </button>
        <span
          style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 700,
            fontSize: '16px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: COLORS.cream,
          }}
        >
          {char.name}
        </span>
        <span
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '11px',
            color: COLORS.federal,
          }}
        >
          [{String(charIndex + 1).padStart(2, '0')} / {String(readingCharacters.length).padStart(2, '0')}]
        </span>
      </div>

      {/* Two-column body */}
      <div
        style={{
          position: 'absolute',
          top: '60px',
          left: 0,
          right: 0,
          bottom: '80px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Left — character */}
        <div
          style={{
            width: '50%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Spotlight */}
          <div
            style={{
              position: 'absolute',
              top: '5%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '240px',
              height: '240px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${COLORS.yellow}59 0%, transparent 70%)`,
              pointerEvents: 'none',
            }}
          />
          <img
            src={`/reading/${char.slug}.gif`}
            alt={char.name}
            style={{
              maxHeight: '75vh',
              width: 'auto',
              objectFit: 'contain',
              imageRendering: 'pixelated',
              position: 'relative',
              zIndex: 1,
              userSelect: 'none',
              pointerEvents: 'none',
            }}
            draggable={false}
          />
          {/* Pedestal */}
          <div
            style={{
              width: '220px',
              height: '40px',
              background: COLORS.federalDark,
              border: `1px solid ${COLORS.federalLight}`,
              clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)',
              marginTop: '-4px',
              position: 'relative',
              zIndex: 1,
            }}
          />
        </div>

        {/* Right — metadata */}
        <div
          style={{
            width: '40%',
            padding: '0 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '20px',
          }}
        >
          <h1
            style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 800,
              fontSize: '48px',
              textTransform: 'uppercase',
              color: COLORS.cream,
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            {char.name}
          </h1>
          <div
            style={{
              width: '60px',
              height: '2px',
              background: COLORS.yellow,
            }}
          />
          <div
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '11px',
              color: COLORS.federal,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {char.source}
          </div>
          <p
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '13px',
              color: COLORS.cream,
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {char.description}
          </p>
        </div>
      </div>

      {/* Bottom thumbnail row */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          zIndex: 10,
        }}
      >
        {readingCharacters.map((c) => (
          <button
            key={c.slug}
            data-interactive="true"
            onClick={() => navigate(`/reading/${c.slug}`)}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <img
              src={`/reading/${c.slug}.png`}
              alt={c.name}
              style={{
                height: '48px',
                width: 'auto',
                objectFit: 'contain',
                imageRendering: 'pixelated',
                opacity: c.slug === slug ? 1 : 0.5,
                transition: 'opacity 200ms',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
              draggable={false}
            />
            <div
              style={{
                width: '24px',
                height: '2px',
                background: c.slug === slug ? COLORS.yellow : 'transparent',
                transition: 'background 200ms',
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReadingDetail;