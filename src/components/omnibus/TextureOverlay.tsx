// Reusable noise/dither overlay — drowns flat vector scenes in granularity.
// Apply once per scene root (above all content, below cursor).

const NOISE_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>
  <filter id='n'>
    <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' seed='5'/>
    <feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.5 0'/>
  </filter>
  <rect width='200' height='200' filter='url(#n)'/>
</svg>`;

const ENCODED = `url("data:image/svg+xml;utf8,${encodeURIComponent(NOISE_SVG)}")`;

interface TextureOverlayProps {
  intensity?: number;
  blend?: 'overlay' | 'multiply' | 'screen' | 'soft-light';
}

export const TextureOverlay = ({ intensity = 0.35, blend = 'multiply' }: TextureOverlayProps) => (
  <div
    aria-hidden
    style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 40,
      opacity: intensity,
      mixBlendMode: blend,
      backgroundImage: ENCODED,
      backgroundSize: '200px 200px',
      backgroundRepeat: 'repeat',
    }}
  />
);

export default TextureOverlay;
