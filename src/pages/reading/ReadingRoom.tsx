import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

const Pedestal = ({ char, onSelect }: { char: typeof readingCharacters[0]; onSelect: () => void }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      data-interactive="true"
      role="button"
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onSelect}
      onKeyDown={(e) => e.key === 'Enter' && onSelect()}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'none',
        position: 'relative',
        transition: 'transform 250ms ease-out',
      }}
    >
      {/* Spotlight */}
      <div
        style={{
          position: 'absolute',
          top: '-40px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.yellow}${hovered ? '59' : '26'} 0%, transparent 70%)`,
          transition: 'background 250ms ease-out',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Pink glow on hover */}
      {hovered && (
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '120px',
            height: '80%',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${COLORS.pink}1a 0%, transparent 70%)`,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      )}

      {/* Character image */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          transform: hovered ? 'translateY(-12px)' : 'translateY(0)',
          transition: 'transform 250ms ease-out',
        }}
      >
        <img
          src={hovered ? `/reading/${char.slug}.gif` : `/reading/${char.slug}.png`}
          alt={char.name}
          style={{
            maxHeight: '60vh',
            width: 'auto',
            objectFit: 'contain',
            imageRendering: 'pixelated',
            display: 'block',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
          draggable={false}
        />
      </div>

      {/* Pedestal base */}
      <div
        style={{
          width: '180px',
          height: '32px',
          background: COLORS.federalDark,
          border: `1px solid ${COLORS.federalLight}`,
          clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)',
          position: 'relative',
          zIndex: 1,
          marginTop: '-4px',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'transform 250ms ease-out',
        }}
      />

      {/* Name plate */}
      <div
        style={{
          textAlign: 'center',
          marginTop: '12px',
          position: 'relative',
          zIndex: 1,
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'transform 250ms ease-out',
        }}
      >
        <div
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: COLORS.yellow,
          }}
        >
          {char.name}
        </div>
        <div
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '9px',
            color: COLORS.federal,
            marginTop: '4px',
          }}
        >
          [{String(char.index).padStart(2, '0')} · {char.name}]
        </div>
      </div>
    </div>
  );
};

const ReadingRoom = () => {
  const navigate = useNavigate();

  // Preload gifs
  useEffect(() => {
    readingCharacters.forEach((c) => {
      const img = new Image();
      img.src = `/reading/${c.slug}.gif`;
    });
  }, []);

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
      {/* Floor with diagonal stripes */}
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
          onClick={() => navigate('/omnibus')}
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
          ← BACK TO THE GREAT ROOM
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
          READING ROOM
        </span>
        <span
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '11px',
            color: COLORS.federal,
          }}
        >
          [04 / 04]
        </span>
      </div>

      {/* Pedestal row */}
      <div
        style={{
          position: 'absolute',
          top: '60px',
          left: '15%',
          right: '15%',
          bottom: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          gap: '5vw',
        }}
      >
        {readingCharacters.map((char) => (
          <Pedestal
            key={char.slug}
            char={char}
            onSelect={() => navigate(`/reading/${char.slug}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default ReadingRoom;