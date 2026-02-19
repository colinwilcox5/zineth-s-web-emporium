import zLetter from "@/assets/zineth-z.png";
import ringPink from "@/assets/zineth-ring-pink.png";
import ringRed from "@/assets/zineth-ring-red.png";

interface ZinethLogoProps {
  size?: string; // Tailwind size class like "w-40 h-40"
}

const ZinethLogo = ({ size = "w-40 h-40" }: ZinethLogoProps) => {
  return (
    <div className={`${size} relative`}>
      {/* Pink ring - spins slowly */}
      <img
        src={ringPink}
        alt=""
        className="absolute inset-0 w-full h-full object-contain spin-slow"
        style={{ animationDuration: "10s" }}
      />
      {/* Red ring - spins opposite direction */}
      <img
        src={ringRed}
        alt=""
        className="absolute inset-0 w-full h-full object-contain spin-slow"
        style={{ animationDirection: "reverse", animationDuration: "7s" }}
      />
      {/* Z letter - stationary */}
      <img
        src={zLetter}
        alt="Zineth Logo"
        className="absolute inset-0 w-[70%] h-[70%] m-auto object-contain"
      />
    </div>
  );
};

export default ZinethLogo;
