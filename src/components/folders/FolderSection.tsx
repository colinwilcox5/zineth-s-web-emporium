import { useState, useCallback } from "react";
import FolderCard from "./FolderCard";
import FolderScene from "./FolderScene";
import FolderContentPage from "./FolderContentPage";
import { folders } from "./folderData";

const FolderSection = () => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [showScene, setShowScene] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleCardClick = useCallback((idx: number) => {
    setSelectedIdx(idx);
    setShowScene(true);
    setShowContent(false);
  }, []);

  const handleClose = useCallback(() => {
    setShowScene(false);
    setShowContent(false);
    setSelectedIdx(null);
  }, []);

  const handleZoom = useCallback(() => {
    setShowContent(true);
  }, []);

  const handleBack = useCallback(() => {
    setShowContent(false);
    setShowScene(false);
    setSelectedIdx(null);
  }, []);

  const selectedFolder = selectedIdx !== null ? folders[selectedIdx] : null;

  return (
    <section className="py-16 px-6 md:px-12 max-w-6xl mx-auto">
      {/* Section header */}
      <div
        className="font-mono-retro pb-3 mb-10"
        style={{
          fontSize: '11px',
          color: '#999',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          borderBottom: '1px solid #ddd',
        }}
      >
        [ DIGITAL ARTIFACTS ] — SELECT FILE TO ACCESS
      </div>

      {/* Grid */}
      <div
        className="grid gap-8"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '40px' }}
      >
        {folders.map((folder, idx) => (
          <FolderCard key={folder.id} folder={folder} onClick={() => handleCardClick(idx)} />
        ))}
      </div>

      {/* Folder scene overlay */}
      {showScene && selectedFolder && !showContent && (
        <FolderScene folder={selectedFolder} onClose={handleClose} onZoom={handleZoom} />
      )}

      {/* Content page */}
      {showContent && selectedFolder && (
        <FolderContentPage folder={selectedFolder} onBack={handleBack} />
      )}
    </section>
  );
};

export default FolderSection;
