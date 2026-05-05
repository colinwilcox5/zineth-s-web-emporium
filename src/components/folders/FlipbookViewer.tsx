import { useEffect, useRef, useState, useCallback } from 'react';
import { PageFlip } from 'page-flip';

interface FlipbookViewerProps {
  manifestUrl: string;
  bookTitle: string;
  orientation: 'portrait' | 'landscape';
  onBack: () => void;
}

interface Manifest {
  title: string;
  totalPages: number;
  pages: string[];
}

const FEDERAL = '#3D5588';
const CREAM = '#f2f0ec';
const YELLOW = '#FFE800';
const ERROR_RED = '#FF4C65';

const FlipbookViewer = ({ manifestUrl, bookTitle, orientation, onBack }: FlipbookViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const flipbookRef = useRef<PageFlip | null>(null);
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);

  // Fetch manifest
  useEffect(() => {
    fetch(manifestUrl)
      .then((r) => {
        if (!r.ok) throw new Error('fetch failed');
        return r.json();
      })
      .then((data: Manifest) => {
        if (!data.pages || data.pages.length === 0) {
          setError(true);
        } else {
          setManifest(data);
        }
      })
      .catch(() => setError(true));
  }, [manifestUrl]);

  // Initialize PageFlip
  useEffect(() => {
    if (!manifest || !containerRef.current) return;

    // Calculate available space: viewport minus header (60px) and footer (50px) and padding
    const availableHeight = window.innerHeight - 160;
    const availableWidth = window.innerWidth - 80;
    
    // Page aspect ratio from source images (2000x2667 ≈ 0.75)
    const pageAspect = orientation === 'portrait' ? 0.75 : 1.333;
    
    // In portrait/cover mode, single page is shown — fit to available space
    let pageHeight = Math.min(availableHeight, 1200);
    let pageWidth = Math.round(pageHeight * pageAspect);
    
    if (pageWidth > availableWidth * 0.9) {
      pageWidth = Math.round(availableWidth * 0.9);
      pageHeight = Math.round(pageWidth / pageAspect);
    }

    const pf = new PageFlip(containerRef.current, {
      width: pageWidth,
      height: pageHeight,
      size: 'fixed',
      drawShadow: true,
      maxShadowOpacity: 0.5,
      showCover: true,
      mobileScrollSupport: true,
      usePortrait: orientation === 'portrait',
    });

    pf.loadFromImages(manifest.pages);
    pf.on('flip', (e: any) => setCurrentPage((e.data as number) + 1));
    flipbookRef.current = pf;

    // Small delay for init
    const t = setTimeout(() => setReady(true), 300);

    return () => {
      clearTimeout(t);
      pf.destroy();
      flipbookRef.current = null;
    };
  }, [manifest, orientation]);

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!flipbookRef.current) return;
      if (e.key === 'ArrowLeft') flipbookRef.current.flipPrev();
      if (e.key === 'ArrowRight') flipbookRef.current.flipNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const totalPages = manifest?.totalPages ?? manifest?.pages?.length ?? 0;
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  const handlePrev = useCallback(() => {
    flipbookRef.current?.flipPrev();
  }, []);

  const handleNext = useCallback(() => {
    flipbookRef.current?.flipNext();
  }, []);

  // Scanline overlay
  const scanlineStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    pointerEvents: 'none',
    zIndex: 62,
    opacity: 0.04,
    backgroundImage:
      'repeating-linear-gradient(0deg, rgba(0,0,0,0.9) 0px, rgba(0,0,0,0.9) 1px, transparent 1px, transparent 3px)',
    mixBlendMode: 'multiply',
  };

  if (error) {
    return (
      <div
        className="fixed inset-0 z-[60] flex items-center justify-center"
        style={{ backgroundColor: CREAM }}
      >
        <div style={scanlineStyle} />
        <button
          onClick={onBack}
          className="fixed top-6 left-6 z-[65] font-mono-retro"
          style={{ fontSize: '11px', color: FEDERAL, letterSpacing: '1px' }}
        >
          [ ← BACK TO FILES ]
        </button>
        <span
          className="font-mono-retro"
          style={{ fontSize: '14px', color: ERROR_RED, letterSpacing: '1px' }}
        >
          [ FILE CORRUPTED · CONTACT THE ARCHIVE ]
        </span>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col"
      style={{
        backgroundColor: CREAM,
        animation: 'fade-in 0.8s ease-in both',
      }}
    >
      <div style={scanlineStyle} />

      {/* Header */}
      <div
        className="flex items-center justify-between px-6 shrink-0"
        style={{ height: '60px', position: 'relative', zIndex: 63 }}
      >
        <button
          onClick={onBack}
          className="font-mono-retro"
          style={{
            fontSize: '11px',
            color: FEDERAL,
            letterSpacing: '1px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = YELLOW)}
          onMouseLeave={(e) => (e.currentTarget.style.color = FEDERAL)}
        >
          [ ← BACK TO FILES ]
        </button>

        <span
          className="font-mono-retro"
          style={{
            fontSize: '16px',
            fontWeight: 700,
            color: FEDERAL,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {bookTitle}
        </span>

        <span
          className="font-mono-retro"
          style={{ fontSize: '11px', color: FEDERAL, letterSpacing: '1px' }}
        >
          {ready ? `[ ${currentPage} / ${totalPages} ]` : ''}
        </span>
      </div>

      {/* Main stage */}
      <div
        className="flex-1 flex items-center justify-center relative"
        style={{ overflow: 'hidden', minHeight: 0 }}
      >
        {/* Loading state */}
        {!ready && !error && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <span
              className="font-mono-retro"
              style={{ fontSize: '14px', color: FEDERAL, letterSpacing: '1px' }}
            >
              [ LOADING ARCHIVE{' '}
              <span
                style={{
                  color: YELLOW,
                  animation: 'blink 1s step-end infinite',
                }}
              >
                |
              </span>{' '}
              ]
            </span>
          </div>
        )}

        {/* Flipbook container */}
        <div
          ref={containerRef}
          style={{
            opacity: ready ? 1 : 0,
            transition: 'opacity 0.5s ease',
            boxShadow: '0 8px 32px rgba(61, 85, 136, 0.2)',
            imageRendering: 'auto',
          }}
        />
      </div>

      {/* Footer nav */}
      <div
        className="flex items-center justify-center gap-6 shrink-0"
        style={{ height: '50px', position: 'relative', zIndex: 63 }}
      >
        <button
          onClick={handlePrev}
          disabled={isFirst}
          className="font-mono-retro"
          style={{
            fontSize: '11px',
            color: isFirst ? '#bbb' : FEDERAL,
            letterSpacing: '1px',
            padding: '4px 8px',
            border: `1px solid ${isFirst ? '#ddd' : FEDERAL}`,
            background: 'none',
            cursor: isFirst ? 'default' : 'pointer',
            opacity: isFirst ? 0.5 : 1,
          }}
        >
          ← PREV
        </button>

        <span
          className="font-mono-retro"
          style={{ fontSize: '12px', color: FEDERAL, letterSpacing: '1px' }}
        >
          {currentPage} / {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={isLast}
          className="font-mono-retro"
          style={{
            fontSize: '11px',
            color: isLast ? '#bbb' : FEDERAL,
            letterSpacing: '1px',
            padding: '4px 8px',
            border: `1px solid ${isLast ? '#ddd' : FEDERAL}`,
            background: 'none',
            cursor: isLast ? 'default' : 'pointer',
            opacity: isLast ? 0.5 : 1,
          }}
        >
          NEXT →
        </button>
      </div>

      {/* Blink keyframe for cursor */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default FlipbookViewer;