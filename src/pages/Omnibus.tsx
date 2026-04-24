import { useState, useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CursorSigil from '@/components/omnibus/CursorSigil';
import PixelWipeTransition from '@/components/omnibus/PixelWipeTransition';
import SceneView from '@/components/omnibus/SceneView';
import type { HotspotConfig, SceneConfig, SceneId } from '@/components/omnibus/sceneTypes';
import { SharedSceneKeyframes } from '@/components/omnibus/sceneShared';
import { observatoryScene } from '@/components/omnibus/scenes/Observatory';
import { fogForestScene } from '@/components/omnibus/scenes/FogForest';
import { idolDoorwayScene } from '@/components/omnibus/scenes/IdolDoorway';
import { foyerScene } from '@/components/omnibus/scenes/Foyer';
import { greatRoomScene } from '@/components/omnibus/scenes/GreatRoom';
import { artGalleryScene } from '@/components/omnibus/scenes/ArtGallery';
import { loreVaultScene } from '@/components/omnibus/scenes/LoreVault';
import { arcadeScene } from '@/components/omnibus/scenes/Arcade';
import { codeChamberScene } from '@/components/omnibus/scenes/CodeChamber';
import { utilityClosetScene } from '@/components/omnibus/scenes/UtilityCloset';
import { secretAlcoveScene } from '@/components/omnibus/scenes/SecretAlcove';

const Omnibus = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const debug = useMemo(() => new URLSearchParams(location.search).has('debug'), [location.search]);
  const devLabel = useMemo(() => new URLSearchParams(location.search).has('dev'), [location.search]);

  const [currentSceneId, setCurrentSceneId] = useState<SceneId>('observatory');
  const [pendingSceneId, setPendingSceneId] = useState<SceneId | null>(null);
  const [transitionKey, setTransitionKey] = useState(0);
  const [hovered, setHovered] = useState<HotspotConfig | null>(null);

  // Trigger a transition to a new scene
  const goTo = useCallback((id: SceneId) => {
    if (id === currentSceneId) return;
    setPendingSceneId(id);
    setTransitionKey((k) => k + 1);
  }, [currentSceneId]);

  // Mid-transition swap
  const handleMid = useCallback(() => {
    if (pendingSceneId) {
      setCurrentSceneId(pendingSceneId);
      setPendingSceneId(null);
    }
  }, [pendingSceneId]);

  const onHotspotActivate = useCallback((cfg: HotspotConfig) => {
    if (cfg.to) goTo(cfg.to);
    else cfg.onClick?.();
  }, [goTo]);

  // Observatory hover preview signal
  const observatoryHover: SceneId | 'home' | null = useMemo(() => {
    if (currentSceneId !== 'observatory') return null;
    if (!hovered) return null;
    return hovered.hoverPreview ?? hovered.to ?? null;
  }, [hovered, currentSceneId]);

  // Build the scene registry — handlers pass through here
  const scenes: Record<SceneId, SceneConfig> = useMemo(() => ({
    observatory: observatoryScene({
      onEnter: () => goTo('fog-forest'),
      onQuit: () => navigate('/'),
      onBypass: () => { /* reserved for gated use */ },
      hovered: observatoryHover,
    }),
    'fog-forest': fogForestScene({
      onAdvance: () => goTo('idol-doorway'),
    }),
    'idol-doorway': idolDoorwayScene({
      onEnterMansion: () => goTo('foyer'),
      onBack: () => goTo('fog-forest'),
    }),
    foyer: foyerScene,
    'great-room': greatRoomScene,
    'art-gallery': artGalleryScene,
    'lore-vault': loreVaultScene,
    arcade: arcadeScene,
    'code-chamber': codeChamberScene,
    'utility-closet': utilityClosetScene,
    'secret-alcove': secretAlcoveScene,
  }), [navigate, goTo, observatoryHover]);

  const scene = scenes[currentSceneId];

  // Body cursor:none on Omnibus routes
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => { document.body.style.cursor = ''; };
  }, []);

  const onBack = scene.backTo ? () => goTo(scene.backTo!) : undefined;

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#0A0A0A', overflow: 'hidden', cursor: 'none' }}>
      <SharedSceneKeyframes />
      <PixelWipeTransition triggerKey={transitionKey} onMidTransition={handleMid}>
        <SceneView
          scene={scene}
          onHotspotActivate={onHotspotActivate}
          onHoverChange={setHovered}
          onBack={onBack}
          debug={debug}
          devLabel={devLabel}
        />
      </PixelWipeTransition>

      {/* Custom cursor */}
      <CursorSigil interactive={!!hovered} />

      {/* Exit-to-Zineth chrome (visible everywhere except Observatory which has QUIT button) */}
      {currentSceneId !== 'observatory' && (
        <button
          onClick={() => navigate('/')}
          style={{
            position: 'fixed', top: 18, right: 18, zIndex: 50,
            fontFamily: '"Space Mono", monospace',
            fontSize: 10, letterSpacing: 2,
            padding: '8px 14px',
            background: 'rgba(10,10,10,0.7)',
            border: '1px solid #FFE800',
            color: '#FFE800',
            textTransform: 'uppercase',
            cursor: 'none',
          }}
        >
          ← BACK TO ZINETH
        </button>
      )}
    </div>
  );
};

export default Omnibus;
