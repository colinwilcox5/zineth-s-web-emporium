import { useEffect, useRef, useState, useCallback } from "react";
import type { FolderItem } from "./folderData";

interface FolderSceneProps {
  folder: FolderItem;
  onClose: () => void;
  onZoom: () => void;
}

const FolderScene = ({ folder, onClose, onZoom }: FolderSceneProps) => {
  const [opening, setOpening] = useState(false);
  const [docVisible, setDocVisible] = useState(false);
  const [interiorGrid, setInteriorGrid] = useState(false);
  const [showClose, setShowClose] = useState(false);
  const [zooming, setZooming] = useState(false);
  const coverRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  const addTimer = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  useEffect(() => {
    if (coverRef.current) {
      void coverRef.current.offsetHeight;
    }
    addTimer(() => setOpening(true), 300);
    addTimer(() => setDocVisible(true), 500);
    addTimer(() => setInteriorGrid(true), 1100);
    addTimer(() => setShowClose(true), 500);

    return () => timers.current.forEach(clearTimeout);
  }, []);

  const handleDocClick = useCallback(() => {
    setZooming(true);
    addTimer(() => onZoom(), 1400);
  }, [onZoom]);

  const gridBg = (opacity: number, size: number) => ({
    backgroundImage: `linear-gradient(rgba(0,0,0,${opacity}) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,${opacity}) 1px, transparent 1px)`,
    backgroundSize: `${size}px ${size}px`,
  });

  const interiorGridBg = {
    backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
    backgroundSize: '24px 24px',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in"
      style={{ backgroundColor: 'rgba(245, 245, 240, 0.95)' }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-[55] font-mono-retro text-xs transition-opacity duration-500"
        style={{
          color: '#3D5588',
          opacity: showClose ? 1 : 0,
          fontSize: '11px',
          letterSpacing: '1px',
        }}
      >
        [ CLOSE ]
      </button>

      {/* Folder container */}
      <div
        className={`relative ${zooming ? 'folder-container-zooming' : ''}`}
        style={{
          width: '1000px',
          height: '700px',
          maxWidth: '95vw',
          maxHeight: '85vh',
          overflow: 'visible',
        }}
      >
        {/* Right panel (folder body) */}
        <div
          className="absolute top-0 right-0 bottom-0"
          style={{
            width: '502px',
            backgroundColor: '#dce4ed',
            borderRadius: '0 12px 12px 0',
            border: '1.5px solid rgba(0,0,0,0.15)',
            borderLeft: 'none',
            ...gridBg(0.02, 24),
          }}
        >
          {/* Tab extending right */}
          <div
            className="absolute font-mono-retro flex items-center justify-center"
            style={{
              top: '80px',
              right: '-40px',
              width: '40px',
              height: '90px',
              backgroundColor: '#dce4ed',
              borderRadius: '0 10px 10px 0',
              border: '1.5px solid rgba(0,0,0,0.15)',
              borderLeft: 'none',
              writingMode: 'vertical-rl',
              fontSize: '8px',
              fontWeight: 700,
              color: '#3D5588',
            }}
          >
            {folder.id}
          </div>

          <div
            className="absolute inset-0 flex items-center justify-center font-mono-retro"
            style={{ color: '#3D5588', fontSize: '14px', opacity: 0.15, letterSpacing: '4px' }}
          >
            ZINETH
          </div>
        </div>

        {/* Document */}
        <div
          onClick={handleDocClick}
          className="absolute cursor-pointer transition-opacity duration-[600ms]"
          style={{
            left: '520px',
            right: '20px',
            top: '20px',
            bottom: '20px',
            backgroundColor: '#f2f0ec',
            borderRadius: '4px',
            opacity: docVisible ? 1 : 0,
            boxShadow: '2px 2px 10px rgba(0,0,0,0.1)',
          }}
        >
          {/* Hole punches */}
          <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col items-center" style={{ gap: '60px' }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-full"
                style={{
                  width: '10px',
                  height: '10px',
                  backgroundColor: '#a0b0c0',
                  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)',
                }}
              />
            ))}
          </div>

          {/* Document content */}
          <div style={{ marginLeft: '35px', padding: '30px' }}>
            <div
              className="font-mono-retro pb-2 mb-3"
              style={{
                fontSize: '9px',
                color: '#999',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                borderBottom: '1px solid #ddd',
              }}
            >
              FILE: {folder.id} — {folder.status}
            </div>
            <h3
              className="font-mono-retro mb-3"
              style={{ fontSize: '16px', fontWeight: 700, color: '#3D5588' }}
            >
              {folder.title}
            </h3>
            <p
              className="font-mono-retro mb-6"
              style={{ fontSize: '10px', color: '#777', lineHeight: 1.9 }}
            >
              {folder.body.substring(0, 200)}...
            </p>
            <span
              className="font-mono-retro inline-block px-2 py-1 rounded"
              style={{
                fontSize: '9px',
                color: '#FF48B0',
                border: '1px solid #FF48B0',
              }}
            >
              [CLICK TO VIEW FULL FILE]
            </span>
          </div>
        </div>

        {/* Cover (single element) */}
        <div
          ref={coverRef}
          className={`absolute top-0 bottom-0 z-[3] ${opening ? 'folder-cover-opening' : ''}`}
          style={{
            left: 0,
            width: '1000px',
            backgroundColor: '#dce4ed',
            borderRadius: '12px',
            border: '1.5px solid rgba(0,0,0,0.15)',
            ...(interiorGrid ? interiorGridBg : gridBg(0.03, 20)),
          }}
        />
      </div>
    </div>
  );
};

export default FolderScene;
