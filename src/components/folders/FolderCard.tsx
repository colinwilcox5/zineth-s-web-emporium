import type { FolderItem } from "./folderData";

interface FolderCardProps {
  folder: FolderItem;
  onClick: () => void;
}

const FolderCard = ({ folder, onClick }: FolderCardProps) => {
  return (
    <button
      onClick={onClick}
      className="folder-card group relative w-full text-left transition-all duration-300 hover:-translate-y-1"
      style={{ aspectRatio: '3/4' }}
    >
      {/* Card body */}
      <div
        className="relative w-full h-full rounded-lg overflow-hidden"
        style={{ backgroundColor: '#dce4ed' }}
      >
        {/* Grid texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* Tab */}
        <div
          className="absolute top-0 right-4 px-3 py-1 rounded-b-md font-mono-retro"
          style={{
            backgroundColor: '#b8c8d8',
            fontSize: '7px',
            fontWeight: 700,
            color: '#3D5588',
            letterSpacing: '1px',
          }}
        >
          {folder.id}
        </div>

        {/* Content at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3
            className="font-mono-retro"
            style={{ fontSize: '13px', fontWeight: 700, color: '#3D5588' }}
          >
            {folder.title}
          </h3>
          <p className="font-mono-retro mt-1" style={{ fontSize: '10px', color: '#888' }}>
            STATUS: {folder.status}
          </p>
        </div>
      </div>
    </button>
  );
};

export default FolderCard;
