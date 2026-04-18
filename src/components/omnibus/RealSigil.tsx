// Canonical Z sigil — uses the user-provided PNG asset. Never redraw.
// Variants:
//   - default: chrome PNG with optional cyan glow
//   - stone: contrast/sepia treatment for carved-on-stone look
//   - video: looping MP4 (hero shots only)

interface RealSigilProps {
  size?: number | string;
  glow?: boolean;
  spinDuration?: number; // seconds per full rotation
  variant?: 'chrome' | 'stone';
  className?: string;
}

export const RealSigil = ({
  size = 200,
  glow = false,
  spinDuration,
  variant = 'chrome',
}: RealSigilProps) => {
  const filter =
    variant === 'stone'
      ? 'contrast(1.4) sepia(0.15) brightness(0.85) drop-shadow(0 4px 8px rgba(0,0,0,0.6))'
      : glow
      ? 'drop-shadow(0 0 40px rgba(73, 130, 207, 0.55)) drop-shadow(0 0 14px rgba(73, 130, 207, 0.3))'
      : 'drop-shadow(0 4px 12px rgba(0,0,0,0.6))';

  return (
    <div
      style={{
        width: size,
        height: size,
        display: 'inline-block',
        animation: spinDuration ? `realSigilSpin ${spinDuration}s linear infinite` : undefined,
      }}
    >
      <img
        src="/omnibus/sigil/Z-grey.png"
        alt=""
        aria-hidden
        draggable={false}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          filter,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export const RealSigilVideo = ({ size = 320 }: { size?: number | string }) => (
  <video
    src="/omnibus/sigil/metal-logo-short.mp4"
    autoPlay
    loop
    muted
    playsInline
    poster="/omnibus/sigil/Z-grey.png"
    style={{
      width: size,
      height: size,
      objectFit: 'contain',
      filter: 'drop-shadow(0 0 40px rgba(73,130,207,0.55))',
      pointerEvents: 'none',
    }}
  />
);

export default RealSigil;
