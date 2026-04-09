import type { FolderItem } from "./folderData";

interface FolderCardProps {
  folder: FolderItem;
  onClick: () => void;
}

const backPageClipPath = `polygon(
  0% 0%,
  calc(100% - 40px) 0%,
  calc(100% - 34px) 0.4%,
  calc(100% - 30px) 1.2%,
  calc(100% - 28px) 2.2%,
  calc(100% - 27px) 3.5%,
  calc(100% - 27px) 13%,
  calc(100% - 26px) 14%,
  calc(100% - 23px) 15%,
  calc(100% - 18px) 15.8%,
  calc(100% - 12px) 16.3%,
  calc(100% - 6px) 16.6%,
  calc(100% - 2px) 16.8%,
  100% 17.2%,
  100% 34.8%,
  calc(100% - 2px) 35.2%,
  calc(100% - 6px) 35.4%,
  calc(100% - 12px) 35.7%,
  calc(100% - 18px) 36.2%,
  calc(100% - 23px) 37%,
  calc(100% - 26px) 38%,
  calc(100% - 27px) 39%,
  calc(100% - 27px) 100%,
  0% 100%
)`;

const frontCoverClipPath = `polygon(
  0% 0%,
  100% 0%,
  100% 13%,
  99.6% 14%,
  98.5% 15%,
  97% 15.8%,
  95% 16.3%,
  93.5% 16.6%,
  92.5% 16.8%,
  92% 17%,
  92% 35%,
  92.5% 35.2%,
  93.5% 35.4%,
  95% 35.7%,
  97% 36.2%,
  98.5% 37%,
  99.6% 38%,
  100% 39%,
  100% 100%,
  0% 100%
)`;

const FolderCard = ({ folder, onClick }: FolderCardProps) => {
  return (
    <button
      onClick={onClick}
      className="folder-card group relative w-full text-left transition-all duration-300 hover:-translate-y-1"
      style={{ paddingRight: '28px' }}
    >
      {/* Layer 1 — Back page (with tab via clip-path) */}
      <div
        className="absolute inset-0"
        style={{ zIndex: 0 }}
      >
        {/* Border pseudo-layer */}
        <div
          className="absolute"
          style={{
            top: '-1.5px',
            left: '-1.5px',
            right: '-1.5px',
            bottom: '-1.5px',
            backgroundColor: 'rgba(0,0,0,0.15)',
            clipPath: backPageClipPath,
          }}
        />
        {/* Fill pseudo-layer */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: '#dce4ed',
            clipPath: backPageClipPath,
          }}
        />
        {/* Tab label */}
        <div
          className="absolute font-mono-retro flex items-center justify-center"
          style={{
            right: '4px',
            top: '16%',
            bottom: '64%',
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            fontSize: '6px',
            fontWeight: 700,
            color: '#3D5588',
            zIndex: 2,
          }}
        >
          {folder.id}
        </div>
      </div>

      {/* Layer 2 — Page peek */}
      <div
        className="absolute rounded-lg"
        style={{
          top: '2%',
          left: '3%',
          bottom: '3%',
          right: 'calc(28px + 2%)',
          backgroundColor: '#f2f0ec',
          border: '1px solid rgba(0,0,0,0.06)',
          zIndex: 0,
          borderTopRightRadius: '8px',
        }}
      />

      {/* Layer 3 — Front cover */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: '3/4',
          backgroundColor: '#dce4ed',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          border: '1.5px solid rgba(0,0,0,0.15)',
          clipPath: frontCoverClipPath,
          zIndex: 1,
        }}
      >
        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* Content at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3
            className="font-mono-retro"
            style={{ fontSize: '12px', fontWeight: 700, color: '#3D5588' }}
          >
            {folder.title}
          </h3>
          <p className="font-mono-retro mt-1" style={{ fontSize: '9px', color: '#888' }}>
            STATUS: {folder.status}
          </p>
        </div>
      </div>
    </button>
  );
};

export default FolderCard;
