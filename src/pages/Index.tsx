import { useState, useEffect, useRef, useCallback, lazy, Suspense } from "react";
import ZinethLogo from "@/components/ZinethLogo";
import GlitchTitle from "@/components/GlitchTitle";
import MarqueeBar from "@/components/MarqueeBar";
import RetroNav from "@/components/RetroNav";
import ArtGallery from "@/components/ArtGallery";
import ClothingShop from "@/components/ClothingShop";
import LoreSection from "@/components/LoreSection";
import RetroFooter from "@/components/RetroFooter";
import StaticTransition from "@/components/StaticTransition";

const VoidScene = lazy(() => import("@/components/VoidScene"));

const Index = () => {
  const [entered, setEntered] = useState(false);
  const [bootText, setBootText] = useState("");
  const [booting, setBooting] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [transitionDone, setTransitionDone] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleBoxRef = useRef<HTMLDivElement>(null);

  // Void scene state
  const [voidActive, setVoidActive] = useState(false);
  const [staticActive, setStaticActive] = useState(false);
  const [showVoid, setShowVoid] = useState(false);

  const bootSequence = [
    "INITIALIZING ZINETH PROTOCOL...",
    "SCANNING FREQUENCIES... ██████████ OK",
    "LOADING ARTIFACTS FROM VOID...",
    "SIGNAL LOCKED.",
    "WELCOME.",
  ];

  const handleEnter = () => {
    setBooting(true);
    let i = 0;
    const interval = setInterval(() => {
      if (i < bootSequence.length) {
        setBootText((prev) => prev + "\n" + bootSequence[i]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setEntered(true);
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setTransitioning(true);
            });
          });
        }, 600);
      }
    }, 500);
  };

  // After transition animation completes, mark done
  useEffect(() => {
    if (!transitioning) return;
    const timer = setTimeout(() => {
      setTransitionDone(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, [transitioning]);

  useEffect(() => {
    // Konami code easter egg
    const code = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let pos = 0;
    const handler = (e: KeyboardEvent) => {
      if (e.keyCode === code[pos]) {
        pos++;
        if (pos === code.length) {
          document.title = "Z̴̧I̸̡N̵̢E̶̡T̸̢H̵̡ ̶̧S̴̢E̵̡E̶̢S̵̡ ̸̢Y̶̡O̵̢U̴̡";
          pos = 0;
        }
      } else {
        pos = 0;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Hidden scroll detection — only on the pre-enter landing page
  useEffect(() => {
    if (entered || voidActive) return;

    const handleWheel = (e: WheelEvent) => {
      // Only trigger on scroll down
      if (e.deltaY > 30) {
        setStaticActive(true);
      }
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [entered, voidActive]);

  const handleStaticComplete = useCallback(() => {
    setStaticActive(false);
    setVoidActive(true);
    setShowVoid(true);
  }, []);

  const enterVoid = useCallback(() => {
    setVoidActive(true);
    setShowVoid(true);
  }, []);

  // Return from void with scroll up or Escape
  const exitVoid = useCallback(() => {
    setStaticActive(true);
    setTimeout(() => {
      setVoidActive(false);
      setShowVoid(false);
      setStaticActive(false);
    }, 800);
  }, []);

  useEffect(() => {
    if (!voidActive) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        exitVoid();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [voidActive]);

  // Static transition overlay
  const staticOverlay = (
    <StaticTransition active={staticActive} onComplete={handleStaticComplete} />
  );

  // Void scene — full takeover
  if (showVoid) {
    return (
      <>
        {staticOverlay}
        <Suspense
          fallback={
            <div className="w-full h-screen flex items-center justify-center" style={{ background: "#050505" }}>
              <p className="font-terminal text-neon-green text-xl neon-glow-green blink">
                ENTERING THE VOID...
              </p>
            </div>
          }
        >
          <VoidScene onExitVoid={exitVoid} />
        </Suspense>
        {/* Subtle escape hint — only appears after 5s */}
        <EscapeHint />
      </>
    );
  }

  if (!entered) {
    return (
      <>
        {staticOverlay}
        <div className="scanlines min-h-screen bg-void flex flex-col items-center justify-center text-center px-4">
          <ZinethLogo size="w-40 h-40 md:w-56 md:h-56" />
          <GlitchTitle />
          {!booting ? (
            <button
              onClick={handleEnter}
              className="mt-10 font-pixel text-sm text-foreground border-2 border-foreground px-8 py-3 hover:bg-foreground hover:text-background transition-all duration-200 flicker"
            >
              [ ENTER ]
            </button>
          ) : (
            <pre className="mt-8 font-terminal text-sm text-foreground text-left max-w-md neon-glow-green whitespace-pre-wrap">
              {bootText}
            </pre>
          )}
          <button
            onClick={enterVoid}
            className="easter-egg-text font-terminal text-xs mt-16 cursor-pointer hover:opacity-100 transition-opacity border-none bg-transparent"
          >
            you are being watched
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="scanlines min-h-screen bg-white">
      {/* Brown overlay that shrinks to the ZINETH title box */}
      {!transitionDone && (
        <div
          ref={overlayRef}
          className={`fixed inset-0 bg-void z-[100] transition-all duration-1000 ease-in-out ${
            transitioning ? "dolly-out-done" : ""
          }`}
          style={{
            pointerEvents: transitioning ? "none" : "auto",
          }}
        />
      )}

      <RetroNav />
      <button
        onClick={enterVoid}
        className="fixed top-4 right-4 z-50 font-pixel text-xs border-2 border-foreground bg-background/90 text-foreground px-3 py-2 hover:bg-foreground hover:text-background transition-all"
      >
        [ ENTER VOID ]
      </button>

      {/* Hero */}
      <section id="hero" className="py-20 flex flex-col items-center justify-center text-center px-4">
        <ZinethLogo size="w-32 h-32" />
        <div ref={titleBoxRef} className="relative">
          <div className="bg-void px-8 py-4 md:px-12 md:py-6 inline-block">
            <GlitchTitle />
          </div>
        </div>
        <p className="font-terminal text-muted-foreground text-lg mt-6 max-w-xl">
          A frequency for those who seek beyond the surface.
          <br />
          Digital artifacts. Limited armor. Ancient signals.
        </p>
      </section>

      <MarqueeBar text="▓▓▓ CLASSIFIED ▓▓▓ CLASSIFIED ▓▓▓ CLASSIFIED ▓▓▓ CLASSIFIED ▓▓▓ CLASSIFIED ▓▓▓ CLASSIFIED ▓▓▓" />

      {/* Gallery */}
      <div id="gallery">
        <ArtGallery />
      </div>

      {/* Shop */}
      <div id="shop">
        <ClothingShop />
      </div>

      {/* Lore */}
      <LoreSection />

      <MarqueeBar text="★ END OF TRANSMISSION ★ END OF TRANSMISSION ★ END OF TRANSMISSION ★ END OF TRANSMISSION ★" />

      <RetroFooter />
    </div>
  );
};

// Small hint that fades in after delay
const EscapeHint = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 font-terminal text-xs opacity-30 transition-opacity duration-1000" style={{ color: "#00ff66" }}>
      [ ESC to return ]
    </div>
  );
};

export default Index;
