import artPiece1 from "@/assets/art-piece-1.png";
import artPiece2 from "@/assets/art-piece-2.png";
import artPiece3 from "@/assets/art-piece-3.png";
import artPiece2Video from "@/assets/art-piece-2.mp4.asset.json";
import { useRef } from "react";

const pieces = [
  { src: artPiece1, title: "VOID_GEOMETRY.exe", id: "ZN-001", status: "ARCHIVED" },
  { src: artPiece2, video: artPiece2Video.url, title: "DATAMIND_v3.corrupt", id: "ZN-002", status: "ACTIVE" },
  { src: artPiece3, title: "ALL_SEEING.ritual", id: "ZN-003", status: "SEALED" },
];

const ArtGallery = () => {
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const handleEnter = (id: string) => {
    const v = videoRefs.current[id];
    if (!v) return;
    v.playbackRate = 0.25;
    v.play().catch(() => {});
  };
  const handleLeave = (id: string) => {
    const v = videoRefs.current[id];
    if (!v) return;
    v.pause();
  };

  return (
  <section className="py-16 px-4">
    <div className="max-w-5xl mx-auto">
      <div className="retro-border p-4 mb-8 inline-block">
        <h2 className="font-pixel text-xl md:text-2xl text-accent">
          {">> "}DIGITAL_ARTIFACTS
        </h2>
      </div>
      <p className="font-terminal text-lg text-muted-foreground mb-8">
        [ RECOVERED FROM THE ARCHIVE // HANDLE WITH CAUTION ]
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pieces.map((piece, i) => (
          <div
            key={piece.id}
            className="retro-border bg-card p-3 group hover:border-primary transition-colors duration-300"
            style={{ animationDelay: `${i * 0.2}s` }}
            onMouseEnter={() => piece.video && handleEnter(piece.id)}
            onMouseLeave={() => piece.video && handleLeave(piece.id)}
          >
            <div className="overflow-hidden mb-3">
              {piece.video ? (
                <video
                  ref={(el) => { videoRefs.current[piece.id] = el; }}
                  src={piece.video}
                  poster={piece.src}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={piece.title}
                  className="w-full aspect-square object-cover group-hover:rgb-cycle transition-all duration-500"
                />
              ) : (
                <img
                  src={piece.src}
                  alt={piece.title}
                  className="w-full aspect-square object-cover group-hover:rgb-cycle transition-all duration-500"
                />
              )}
            </div>
            <div className="font-terminal">
              <p className="text-foreground text-lg">{piece.title}</p>
              <div className="flex justify-between mt-1">
                <span className="text-muted-foreground text-sm">{piece.id}</span>
                <span className={`text-sm ${piece.status === "ACTIVE" ? "text-foreground blink" : piece.status === "SEALED" ? "text-destructive" : "text-muted-foreground"}`}>
                  [{piece.status}]
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="easter-egg-text font-terminal text-sm mt-6 text-center">
        the seventh file was never meant to be opened
      </p>
    </div>
  </section>
  );
};

export default ArtGallery;
