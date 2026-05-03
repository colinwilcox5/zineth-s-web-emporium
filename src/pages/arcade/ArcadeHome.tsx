import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUnlocks, arcadeUnlocks } from '@/data/arcadeUnlocks';
import { ArcadeHeader } from '@/components/arcade/ArcadeHeader';

const NEON_PINK = '#FF48B0';
const YELLOW = '#FFE800';
const SKY_BLUE = '#4982CF';
const CREAM = '#f2f0ec';

const gameCards = [
  { id: 'pong', title: 'PONG', subtitle: '1P · CLASSIC ARCADE.', route: '/arcade/pong', unlockId: null },
  { id: 'trace-pentagon', title: 'TRACE 01 · PENTAGON', subtitle: 'UNLOCK ARCHIVE VIDEO.', route: '/arcade/trace-pentagon', unlockId: 'trace-pentagon' },
  { id: 'trace-pentagram', title: 'TRACE 02 · PENTAGRAM', subtitle: 'UNLOCK ARCHIVE VIDEO.', route: '/arcade/trace-pentagram', unlockId: 'trace-pentagram' },
  { id: 'trace-spiral', title: 'TRACE 03 · SPIRAL', subtitle: 'UNLOCK MERCH DROP.', route: '/arcade/trace-spiral', unlockId: 'trace-spiral' },
];

// Shape preview SVGs
const ShapePreview = ({ id }: { id: string }) => {
  const size = 80;
  const cx = size / 2, cy = size / 2, r = 30;
  const pentPoints = Array.from({ length: 5 }, (_, i) => {
    const a = (Math.PI * 2 * i) / 5 - Math.PI / 2;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  });

  if (id === 'pong') {
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <rect x={12} y={20} width={4} height={24} fill={NEON_PINK} rx={2} />
        <rect x={size - 16} y={28} width={4} height={24} fill={NEON_PINK} rx={2} />
        <circle cx={cx} cy={cy} r={3} fill={YELLOW} />
        <line x1={cx} y1={8} x2={cx} y2={size - 8} stroke={NEON_PINK} strokeWidth={1} strokeDasharray="3,4" opacity={0.4} />
      </svg>
    );
  }
  if (id === 'trace-pentagon') {
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <polygon points={pentPoints.join(' ')} fill="none" stroke={NEON_PINK} strokeWidth={1.5} />
        {pentPoints.map((p, i) => {
          const [x, y] = p.split(',').map(Number);
          return <circle key={i} cx={x} cy={y} r={2.5} fill={NEON_PINK} />;
        })}
      </svg>
    );
  }
  if (id === 'trace-pentagram') {
    const starOrder = [0, 2, 4, 1, 3, 0];
    const starPath = starOrder.map(i => pentPoints[i]).join(' ');
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <polyline points={starPath} fill="none" stroke={NEON_PINK} strokeWidth={1.5} />
        {pentPoints.map((p, i) => {
          const [x, y] = p.split(',').map(Number);
          return <circle key={i} cx={x} cy={y} r={2.5} fill={NEON_PINK} />;
        })}
      </svg>
    );
  }
  // spiral
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {[30, 20, 10].map((radius, layer) => {
        const rot = layer * 24 * (Math.PI / 180);
        const pts = Array.from({ length: 5 }, (_, i) => {
          const a = (Math.PI * 2 * i) / 5 - Math.PI / 2 + rot;
          return `${cx + radius * Math.cos(a)},${cy + radius * Math.sin(a)}`;
        });
        return <polygon key={layer} points={pts.join(' ')} fill="none" stroke={NEON_PINK} strokeWidth={1} opacity={1 - layer * 0.2} />;
      })}
    </svg>
  );
};

const InsertCoin = () => (
  <span style={{
    fontFamily: '"Space Mono", monospace',
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: YELLOW,
    animation: 'coinBlink 1.2s ease infinite',
  }}>
    INSERT COIN
    <style>{`@keyframes coinBlink { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }`}</style>
  </span>
);

const ArcadeHome = () => {
  const navigate = useNavigate();
  const [unlocks, setUnlocks] = useState<string[]>([]);
  const [modalUnlock, setModalUnlock] = useState<typeof arcadeUnlocks[0] | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    setUnlocks(getUnlocks());
  }, []);

  const earnedUnlocks = arcadeUnlocks.filter(u => unlocks.includes(u.unlockedBy));

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#0A0A0A', overflowY: 'auto' }}>
      {/* Scanlines */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 60,
        opacity: 0.04,
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.9) 0px, rgba(255,255,255,0.9) 1px, transparent 1px, transparent 3px)',
      }} />

      <ArcadeHeader
        title="ARCADE"
        backTo="/omnibus#great-room"
        backLabel="← BACK TO THE GREAT ROOM"
        rightContent={<InsertCoin />}
      />

      {/* Game Grid */}
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '64px 24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 32,
      }}>
        {gameCards.map(card => {
          const isCompleted = card.unlockId ? unlocks.includes(card.unlockId) : false;
          const isHovered = hoveredCard === card.id;
          return (
            <div
              key={card.id}
              data-interactive="true"
              onClick={() => navigate(card.route)}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                height: 280,
                background: '#0A0A0A',
                border: `2px solid ${isHovered ? YELLOW : NEON_PINK}`,
                borderRadius: 4,
                cursor: 'none',
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 250ms ease-out',
                transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                boxShadow: isHovered
                  ? `0 0 24px rgba(255, 72, 176, 0.4), 0 0 48px rgba(255, 72, 176, 0.15)`
                  : '0 0 8px rgba(255, 72, 176, 0.1)',
              }}
            >
              <div style={{ width: 120, height: 120 }}>
                <ShapePreview id={card.id} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div style={{
                    fontFamily: '"Space Grotesk", sans-serif',
                    fontWeight: 700,
                    fontSize: 24,
                    textTransform: 'uppercase',
                    color: NEON_PINK,
                    letterSpacing: '0.04em',
                  }}>
                    {card.title}
                  </div>
                  <div style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: 11,
                    color: CREAM,
                    textTransform: 'uppercase',
                    marginTop: 4,
                  }}>
                    {card.subtitle}
                  </div>
                </div>
                <div style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: 10,
                  textTransform: 'uppercase',
                  padding: '4px 8px',
                  border: `2px solid ${isCompleted ? SKY_BLUE : YELLOW}`,
                  borderRadius: 4,
                  color: isCompleted ? SKY_BLUE : YELLOW,
                  whiteSpace: 'nowrap',
                }}>
                  {isCompleted ? 'COMPLETED ✓' : 'AVAILABLE'}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* REWARDS separator */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        maxWidth: 1100,
        margin: '0 auto',
        padding: '0 24px',
      }}>
        <div style={{ flex: 1, height: 2, background: NEON_PINK }} />
        <span style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: 12,
          letterSpacing: 4,
          color: YELLOW,
          textTransform: 'uppercase',
        }}>
          EARNED
        </span>
        <div style={{ flex: 1, height: 2, background: NEON_PINK }} />
      </div>

      {/* REWARDS section */}
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '32px 24px 80px',
      }}>
        {earnedUnlocks.length === 0 ? (
          <p style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: 14,
            fontStyle: 'italic',
            color: CREAM,
            textAlign: 'center',
          }}>
            complete a game to earn rewards. each shape unlocks something.
          </p>
        ) : (
          <div style={{
            display: 'flex',
            gap: 24,
            overflowX: 'auto',
            paddingBottom: 8,
          }}>
            {earnedUnlocks.map(unlock => (
              <div
                key={unlock.id}
                data-interactive="true"
                onClick={() => setModalUnlock(unlock)}
                style={{
                  flex: '0 0 240px',
                  height: 240,
                  background: '#0A0A0A',
                  border: `2px solid ${SKY_BLUE}`,
                  borderRadius: 4,
                  cursor: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  flex: 1,
                  background: '#1a1a2a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}>
                  {unlock.thumbnailSrc ? (
                    <img
                      src={unlock.thumbnailSrc}
                      alt={unlock.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={e => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).parentElement!.innerHTML = `<div style="color:${NEON_PINK};font-family:'Space Mono',monospace;font-size:11px;text-transform:uppercase">ASSET PENDING</div>`;
                      }}
                    />
                  ) : (
                    <span style={{ color: NEON_PINK, fontFamily: '"Space Mono", monospace', fontSize: 11 }}>ASSET PENDING</span>
                  )}
                </div>
                <div style={{ padding: '12px 16px' }}>
                  <div style={{
                    fontFamily: '"Space Grotesk", sans-serif',
                    fontWeight: 700,
                    fontSize: 14,
                    textTransform: 'uppercase',
                    color: YELLOW,
                  }}>
                    {unlock.title}
                  </div>
                  <div style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: 10,
                    color: CREAM,
                    marginTop: 4,
                  }}>
                    FROM {unlock.unlockedBy.replace('-', ' ').toUpperCase()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modalUnlock && (
        <div
          onClick={() => setModalUnlock(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'none',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '70vw',
              maxHeight: '80vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <button
              onClick={() => setModalUnlock(null)}
              data-interactive="true"
              style={{
                position: 'absolute',
                top: -36,
                right: 0,
                background: 'none',
                border: 'none',
                color: NEON_PINK,
                fontSize: 24,
                cursor: 'none',
                fontFamily: '"Space Mono", monospace',
              }}
            >
              ✕
            </button>
            {modalUnlock.type === 'video' && modalUnlock.videoSrc ? (
              <video
                controls autoPlay loop muted playsInline
                src={modalUnlock.videoSrc}
                style={{ maxWidth: '100%', maxHeight: '60vh', background: '#000' }}
                onError={e => {
                  const v = e.target as HTMLVideoElement;
                  v.style.display = 'none';
                  v.parentElement!.insertAdjacentHTML('beforeend', `<div style="width:400px;height:240px;background:#1a1a2a;display:flex;align-items:center;justify-content:center;border:2px solid ${NEON_PINK};color:${NEON_PINK};font-family:'Space Mono',monospace;font-size:12px;text-transform:uppercase">VIDEO COMING SOON</div>`);
                }}
              />
            ) : modalUnlock.imageSrc ? (
              <img
                src={modalUnlock.imageSrc}
                alt={modalUnlock.title}
                style={{ maxWidth: '100%', maxHeight: '60vh', objectFit: 'contain' }}
                onError={e => {
                  const img = e.target as HTMLImageElement;
                  img.style.display = 'none';
                  img.parentElement!.insertAdjacentHTML('beforeend', `<div style="width:400px;height:400px;background:#1a1a2a;display:flex;align-items:center;justify-content:center;border:2px solid ${NEON_PINK};color:${NEON_PINK};font-family:'Space Mono',monospace;font-size:12px;text-transform:uppercase">IMAGE COMING SOON</div>`);
                }}
              />
            ) : null}
            {modalUnlock.description && (
              <p style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: 14,
                color: CREAM,
                textAlign: 'center',
                maxWidth: 480,
              }}>
                {modalUnlock.description}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArcadeHome;