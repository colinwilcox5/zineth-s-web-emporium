// CRT scanline overlay — pairs with TextureOverlay for "photographed through a CRT" feel.
interface ScanlineOverlayProps {
  intensity?: number;
}

export const ScanlineOverlay = ({ intensity = 0.06 }: ScanlineOverlayProps) => (
  <div
    aria-hidden
    style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 41,
      opacity: intensity,
      backgroundImage:
        'repeating-linear-gradient(0deg, rgba(0,0,0,0.9) 0px, rgba(0,0,0,0.9) 1px, transparent 1px, transparent 3px)',
      mixBlendMode: 'multiply',
    }}
  />
);

export default ScanlineOverlay;
