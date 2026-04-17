import { useState, useCallback, useEffect } from "react";
import FolderCard from "./FolderCard";
import FolderScene from "./FolderScene";
import FolderContentPage from "./FolderContentPage";
import { folders } from "./folderData";

export type Rect = { left: number; top: number; width: number; height: number };

interface FolderSectionProps {
  onOpenChange?: (open: boolean) => void;
}

const FolderSection = ({ onOpenChange }: FolderSectionProps) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [showScene, setShowScene] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [startRect, setStartRect] = useState<Rect | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    onOpenChange?.(showScene || showContent);
  }, [showScene, showContent, onOpenChange]);

  const handleCardClick = useCallback((idx: number, el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    setStartRect({ left: r.left, top: r.top, width: r.width, height: r.height });
    setSelectedIdx(idx);
    setShowScene(true);
    setShowContent(false);
  }, []);

  const handleClose = useCallback(() => {
    setShowScene(false);
    setShowContent(false);
    setSelectedIdx(null);
    setStartRect(null);
  }, []);

  const handleZoom = useCallback(() => {
    setShowContent(true);
  }, []);

  const handleBack = useCallback(() => {
    setShowContent(false);
    setShowScene(false);
    setSelectedIdx(null);
    setStartRect(null);
  }, []);

  const selectedFolder = selectedIdx !== null ? folders[selectedIdx] : null;

  return (
    <>
      <aside
        className={`folder-rail ${collapsed ? "collapsed" : ""}`}
        aria-label="Digital artifacts rail"
      >
        <button
          className="folder-rail-handle font-mono-retro"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? "Open files rail" : "Close files rail"}
        >
          {collapsed ? "◂ FILES" : "FILES ▸"}
        </button>

        <div
          className="font-mono-retro px-3 pt-3 pb-2"
          style={{
            fontSize: "9px",
            color: "#999",
            textTransform: "uppercase",
            letterSpacing: "2px",
            borderBottom: "1px solid #ddd",
          }}
        >
          [ ARTIFACTS ]
        </div>

        <div
          className="flex-1 overflow-y-auto px-3 py-3"
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          {folders.map((folder, idx) => (
            <FolderCard
              key={folder.id}
              folder={folder}
              onClick={(el) => handleCardClick(idx, el)}
            />
          ))}
        </div>
      </aside>

      {showScene && selectedFolder && !showContent && (
        <FolderScene
          folder={selectedFolder}
          onClose={handleClose}
          onZoom={handleZoom}
          startRect={startRect}
        />
      )}

      {showContent && selectedFolder && (
        <FolderContentPage folder={selectedFolder} onBack={handleBack} />
      )}
    </>
  );
};

export default FolderSection;
