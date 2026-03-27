import type { FolderItem } from "./folderData";

interface FolderCardProps {
  folder: FolderItem;
  onClick: () => void;
}

const backPageClipPath = `polygon(
  0% 0%,
  calc(100% - 40px) 0%,
  calc(100% - 36px) 0.2%,
  calc(100% - 33px) 0.6%,
  calc(100% - 30px) 1.2%,
  calc(100% - 28.5px) 1.8%,
  calc(100% - 28px) 2.5%,
  calc(100% - 28px) 13%,
  calc(100% - 27.5px) 13.4%,
  calc(100% - 27px) 13.8%,
  calc(100% - 26px) 14.2%,
  calc(100% - 24px) 14.7%,
  calc(100% - 21px) 15.2%,
  calc(100% - 18px) 15.5%,
  calc(100% - 14px) 15.7%,
  calc(100% - 10px) 15.85%,
  calc(100% - 5px) 15.95%,
  calc(100% - 3px) 16.1%,
  calc(100% - 1px) 16.4%,
  100% 16.8%,
  100% 17.2%,
  100% 34.8%,
  100% 35.2%,
  calc(100% - 1px) 35.6%,
  calc(100% - 3px) 35.9%,
  calc(100% - 5px) 36.05%,
  calc(100% - 10px) 36.15%,
  calc(100% - 14px) 36.3%,
  calc(100% - 18px) 36.5%,
  calc(100% - 21px) 36.8%,
  calc(100% - 24px) 37.3%,
  calc(100% - 26px) 37.8%,
  calc(100% - 27px) 38.2%,
  calc(100% - 27.5px) 38.6%,
  calc(100% - 28px) 39%,
  calc(100% - 28px) 100%,
  0% 100%
)`;

const frontCoverClipPath = `polygon(
  0% 0%,
  100% 0%,
  100% 13%,
  99.8% 13.4%,
  99.5% 13.8%,
  99% 14.2%,
  98% 14.7%,
  96.5% 15.2%,
  95% 15.5%,
  93.5% 15.7%,
  92.5% 15.85%,
  92% 16%,
  92% 36%,
  92.5% 36.15%,
  93.5% 36.3%,
  95% 36.5%,
  96.5% 36.8%,
  98% 37.3%,
  99% 37.8%,
  99.5% 38.2%,
  99.8% 38.6%,
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
          top: '3%',
          left: '3%',
          bottom: '3%',
          right: 'calc(28px + 4%)',
          backgroundColor: '#f2f0ec',
          border: '1px solid rgba(0,0,0,0.06)',
          zIndex: 0,
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
