import type { FolderItem } from "./folderData";

interface FolderContentPageProps {
  folder: FolderItem;
  onBack: () => void;
}

const FolderContentPage = ({ folder, onBack }: FolderContentPageProps) => {
  return (
    <div
      className="fixed inset-0 z-[60] overflow-y-auto"
      style={{
        backgroundColor: '#f2f0ec',
        animation: 'fade-in 0.8s ease-in both',
      }}
    >
      {/* Hole-punch bar */}
      <div
        className="fixed left-0 top-0 bottom-0 flex flex-col items-center justify-center"
        style={{
          width: '40px',
          borderRight: '1px solid #ddd',
          backgroundColor: '#f2f0ec',
          gap: '50px',
          zIndex: 61,
        }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
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

      {/* Back button */}
      <button
        onClick={onBack}
        className="fixed top-6 right-6 z-[65] font-mono-retro"
        style={{ fontSize: '11px', color: '#3D5588', letterSpacing: '1px' }}
      >
        [ BACK TO FILES ]
      </button>

      {/* Content */}
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '60px 20px 120px 60px' }}>
        <div
          className="font-mono-retro pb-2 mb-4"
          style={{
            fontSize: '9px',
            color: '#999',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            borderBottom: '1px solid #ddd',
          }}
        >
          ZINETH ARCHIVE — FILE: {folder.id} — CLEARANCE: {folder.status}
        </div>

        <h1
          className="font-mono-retro mb-4"
          style={{ fontSize: '22px', fontWeight: 700, color: '#3D5588' }}
        >
          {folder.title}
        </h1>

        <span
          className="font-mono-retro inline-block px-3 py-1 rounded mb-8"
          style={{
            fontSize: '9px',
            color: '#FF48B0',
            border: '1px solid #FF48B0',
          }}
        >
          {folder.tag}
        </span>

        <p
          className="font-mono-retro mb-12"
          style={{ fontSize: '13px', color: '#555', lineHeight: 2 }}
        >
          {folder.body}
        </p>

        <div
          className="font-mono-retro pt-6"
          style={{
            fontSize: '10px',
            color: '#999',
            borderTop: '1px solid #ddd',
            letterSpacing: '2px',
          }}
        >
          [ END OF FILE ]
        </div>
      </div>

      {/* Bottom marquee */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[62] overflow-hidden py-2"
        style={{ backgroundColor: '#3D5588' }}
      >
        <div
          className="marquee-scroll font-mono-retro whitespace-nowrap"
          style={{ fontSize: '11px', color: '#FFE800', letterSpacing: '3px' }}
        >
          {'ZINETH \u00A0\u00A0\u00A0 '.repeat(20)}
        </div>
      </div>
    </div>
  );
};

export default FolderContentPage;
