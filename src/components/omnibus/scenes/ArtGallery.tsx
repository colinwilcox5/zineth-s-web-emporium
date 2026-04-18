// SCENE 06 — THE ART GALLERY
import type { SceneConfig } from '../sceneTypes';
import { SIGIL_COLORS } from '../sceneTypes';
import { DitherOverlay, Stub } from '../sceneShared';
import { TextureOverlay } from '../TextureOverlay';

const ArtGallery = () => (
  <div style={{
    position: 'absolute', inset: 0,
    background: `linear-gradient(180deg, ${SIGIL_COLORS.federalBlue} 0%, #1a1a30 70%, #0a0a18 100%)`,
    overflow: 'hidden',
  }}>
    {/* Wall band w/ alternating colors */}
    <div style={{
      position: 'absolute', left: 0, right: 0, top: '12%', height: '60%',
      background: `repeating-linear-gradient(90deg, ${SIGIL_COLORS.federalBlue} 0 12.5%, ${SIGIL_COLORS.black} 12.5% 25%)`,
      borderTop: `2px solid ${SIGIL_COLORS.yellow}`,
      borderBottom: `2px solid ${SIGIL_COLORS.yellow}`,
    }} />

    {/* 8 frames in a row */}
    {Array.from({ length: 8 }).map((_, i) => (
      <div key={i} style={{
        position: 'absolute',
        left: `${4 + i * 11.5}%`,
        top: '24%',
        width: '9%',
        height: '36%',
        padding: 8,
        background: `linear-gradient(135deg, ${SIGIL_COLORS.yellow}, ${SIGIL_COLORS.pink} 50%, ${SIGIL_COLORS.yellow})`,
        boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
      }}>
        <Stub color={SIGIL_COLORS.federalBlue} label={`ART SLOT [${String(i + 1).padStart(2, '0')}]`} fontSize={9} />
      </div>
    ))}

    {/* Rug running the length */}
    <div style={{
      position: 'absolute', left: '5%', right: '5%', bottom: '2%', height: '20%',
      background: `repeating-linear-gradient(90deg, ${SIGIL_COLORS.pink} 0 24px, ${SIGIL_COLORS.yellow} 24px 48px, ${SIGIL_COLORS.federalBlue} 48px 72px)`,
      opacity: 0.6,
      borderTop: `1px solid ${SIGIL_COLORS.yellow}`,
      borderBottom: `1px solid ${SIGIL_COLORS.yellow}`,
    }} />

    <DitherOverlay opacity={0.12} />
    <TextureOverlay intensity={0.18} />
  </div>
);

export const artGalleryScene: SceneConfig = {
  id: 'art-gallery',
  title: 'The Art Gallery',
  preloadAdjacent: ['great-room'],
  ambientSoundId: 'mansion-hall',
  background: <ArtGallery />,
  backTo: 'great-room',
  hotspots: Array.from({ length: 8 }).map((_, i) => ({
    area: { left: 4 + i * 11.5, top: 24, width: 9, height: 36 },
    label: `Art slot ${i + 1}`,
    to: 'great-room' as const, // close-up view stub
    tooltip: `[ ${String(i + 1).padStart(2, '0')} ]`,
  })),
};

export default ArtGallery;
