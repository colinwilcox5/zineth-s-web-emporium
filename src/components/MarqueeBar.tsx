const MarqueeBar = ({ text, className = "" }: { text: string; className?: string }) => (
  <div className={`marquee-bar py-1 ${className}`}>
    <div className="marquee-scroll text-foreground font-premiero text-lg tracking-widest">
      {text}
    </div>
  </div>
);

export default MarqueeBar;
