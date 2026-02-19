import HitCounter from "./HitCounter";

const RetroFooter = () => (
  <footer className="border-t border-border py-8 px-4">
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <HitCounter />
        <div className="font-terminal text-sm text-muted-foreground flex items-center gap-2">
          <span className="text-foreground">◄</span>
          <span className="retro-link cursor-pointer">ZINETH WEBRING</span>
          <span className="text-muted-foreground">|</span>
          <span className="retro-link cursor-pointer">RANDOM</span>
          <span className="text-muted-foreground">|</span>
          <span className="retro-link cursor-pointer">NEXT</span>
          <span className="text-foreground">►</span>
        </div>
      </div>

      <div className="text-center font-terminal text-sm text-muted-foreground space-y-1">
        <p>BEST VIEWED IN NETSCAPE NAVIGATOR 4.0 AT 800x600</p>
        <p>© 1997-2026 ZINETH COLLECTIVE // ALL FREQUENCIES RESERVED</p>
        <p className="easter-egg-text text-xs">
          this site was built on a machine that no longer exists
        </p>
      </div>

      <div className="flex justify-center gap-4">
        <div className="retro-border px-3 py-1 font-pixel text-[10px] text-muted-foreground">
          HTML 3.2
        </div>
        <div className="retro-border px-3 py-1 font-pixel text-[10px] text-muted-foreground">
          JAVASCRIPT
        </div>
        <div className="retro-border px-3 py-1 font-pixel text-[10px] text-secondary text-xs">
          NETSCAPE NOW!
        </div>
      </div>
    </div>
  </footer>
);

export default RetroFooter;
