const RetroNav = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between px-4 py-2">
        <span className="font-pixel text-sm text-primary neon-glow-pink">Z</span>
        <div className="flex gap-1 flex-wrap">
          {[
            { label: "HOME", id: "hero" },
            { label: "ARTIFACTS", id: "gallery" },
            { label: "GOODS", id: "shop" },
            { label: "LORE", id: "lore" },
          ].map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="font-terminal text-sm text-foreground hover:text-primary hover:bg-muted px-3 py-1 border border-transparent hover:border-border transition-all"
            >
              [{link.label}]
            </button>
          ))}
        </div>
        <span className="font-terminal text-xs text-muted-foreground flicker">
          ONLINE
        </span>
      </div>
    </nav>
  );
};

export default RetroNav;
