import { useState, useEffect } from "react";

const HitCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const base = 8413097;
    const randomAdd = Math.floor(Math.random() * 200);
    setCount(base + randomAdd);
  }, []);

  const digits = count.toString().padStart(8, "0").split("");

  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground font-terminal text-sm">YOU ARE VISITOR #</span>
      <div className="flex">
        {digits.map((d, i) => (
          <span
            key={i}
            className="bg-muted border border-border text-accent font-pixel text-xs px-1.5 py-0.5"
          >
            {d}
          </span>
        ))}
      </div>
    </div>
  );
};

export default HitCounter;
