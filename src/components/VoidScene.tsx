import { useRef, useState, useCallback, useMemo, Suspense } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import spaceshipImg from "@/assets/icons/spaceship.png";
import planetImg from "@/assets/icons/planet.png";
import lizardImg from "@/assets/icons/lizard.png";
import yinyangImg from "@/assets/icons/yinyang.png";
import symbolImg from "@/assets/icons/symbol.png";
import globeImg from "@/assets/icons/globe.gif";
import mothmanImg from "@/assets/icons/mothman.png";
import spacewyrmImg from "@/assets/icons/spacewyrm.png";
import cosmicwyrmImg from "@/assets/icons/cosmicwyrm.png";
import bigfootImg from "@/assets/icons/bigfoot.png";
import chupacabraImg from "@/assets/icons/chupacabra.png";
import zinethZ from "@/assets/zineth-z.png";
import ringPink from "@/assets/zineth-ring-pink.png";
import ringRed from "@/assets/zineth-ring-red.png";

// Seeded random for deterministic placement
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

interface FloatingIconProps {
  position: [number, number, number];
  texture: THREE.Texture;
  scale: number;
  orbitSpeed: number;
  orbitRadius: number;
  orbitOffset: number;
  bobSpeed: number;
  bobAmount: number;
  onClick?: () => void;
}

const FloatingIcon = ({
  position,
  texture,
  scale,
  orbitSpeed,
  orbitRadius,
  orbitOffset,
  bobSpeed,
  bobAmount,
  onClick,
}: FloatingIconProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const glitchTime = useRef(0);
  const basePos = useRef(new THREE.Vector3(...position));

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    // Orbit around base position
    const ox = Math.cos(t * orbitSpeed + orbitOffset) * orbitRadius;
    const oz = Math.sin(t * orbitSpeed + orbitOffset) * orbitRadius;
    const bob = Math.sin(t * bobSpeed) * bobAmount;

    meshRef.current.position.set(
      basePos.current.x + ox,
      basePos.current.y + bob,
      basePos.current.z + oz
    );

    // Slow rotation
    meshRef.current.rotation.z = Math.sin(t * 0.5 + orbitOffset) * 0.15;

    // Glitch effect on click
    if (clicked) {
      glitchTime.current += 0.1;
      const glitchOffset = (Math.random() - 0.5) * 0.3;
      meshRef.current.position.x += glitchOffset;
      meshRef.current.position.y += glitchOffset * 0.5;
      if (glitchTime.current > 2) {
        setClicked(false);
        glitchTime.current = 0;
      }
    }

    // Hover scale pulse
    const targetScale = hovered ? scale * 1.3 : scale;
    const currentScale = meshRef.current.scale.x;
    const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.1);
    meshRef.current.scale.setScalar(newScale);
  });

  const handleClick = useCallback(() => {
    setClicked(true);
    onClick?.();
  }, [onClick]);

  return (
    <group
      ref={meshRef as any}
      position={position}
      onClick={handleClick}
      onPointerEnter={() => {
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerLeave={() => {
        setHovered(false);
        document.body.style.cursor = "";
      }}
    >
      {/* Layered depth stack for volumetric effect */}
      {[0, 0.03, 0.06, 0.09, 0.12].map((zOff, idx) => (
        <mesh key={idx} position={[0, 0, -zOff]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={texture}
            transparent
            alphaTest={0.1}
            side={THREE.DoubleSide}
            opacity={(clicked ? 0.5 + Math.random() * 0.5 : 1) * (1 - idx * 0.18)}
          />
        </mesh>
      ))}
    </group>
  );
};

// Special Z Logo with animated rings
const ZinethLogoObject = ({
  position,
  onClickLogo,
}: {
  position: [number, number, number];
  onClickLogo?: () => void;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const pinkRingRef = useRef<THREE.Mesh>(null);
  const redRingRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const zTex = useLoader(THREE.TextureLoader, zinethZ);
  const pinkTex = useLoader(THREE.TextureLoader, ringPink);
  const redTex = useLoader(THREE.TextureLoader, ringRed);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Float
    groupRef.current.position.y =
      position[1] + Math.sin(t * 0.4) * 0.5;

    // Rings rotate
    if (pinkRingRef.current) {
      pinkRingRef.current.rotation.z = t * 0.3;
    }
    if (redRingRef.current) {
      redRingRef.current.rotation.z = -t * 0.45;
    }

    // Hover scale
    const target = hovered ? 2.2 : 1.8;
    const cur = groupRef.current.scale.x;
    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(cur, target, 0.08)
    );
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={onClickLogo}
      onPointerEnter={() => {
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerLeave={() => {
        setHovered(false);
        document.body.style.cursor = "";
      }}
    >
      {/* Pink ring */}
      <mesh ref={pinkRingRef}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={pinkTex} transparent alphaTest={0.1} side={THREE.DoubleSide} />
      </mesh>
      {/* Red ring */}
      <mesh ref={redRingRef}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={redTex} transparent alphaTest={0.1} side={THREE.DoubleSide} />
      </mesh>
      {/* Z letter */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[0.7, 0.7]} />
        <meshBasicMaterial map={zTex} transparent alphaTest={0.1} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

// Generate scattered icon data
function generateIcons(count: number, spread: number) {
  const rand = seededRandom(42);
  const iconTypes = ["spaceship", "planet", "lizard", "yinyang", "symbol", "globe", "mothman", "spacewyrm", "cosmicwyrm", "bigfoot", "chupacabra"];
  const icons = [];

  for (let i = 0; i < count; i++) {
    icons.push({
      type: iconTypes[Math.floor(rand() * iconTypes.length)],
      position: [
        (rand() - 0.5) * spread,
        (rand() - 0.5) * spread,
        (rand() - 0.5) * spread,
      ] as [number, number, number],
      scale: 0.4 + rand() * 0.6,
      orbitSpeed: 0.1 + rand() * 0.4,
      orbitRadius: 0.2 + rand() * 0.8,
      orbitOffset: rand() * Math.PI * 2,
      bobSpeed: 0.3 + rand() * 0.7,
      bobAmount: 0.1 + rand() * 0.4,
    });
  }
  return icons;
}

// Hook to create an animated GIF texture using browser-native decoding
function useAnimatedGifTexture(src: string) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const textureRef = useRef<THREE.CanvasTexture | null>(null);

  if (!imgRef.current) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    imgRef.current = img;
  }

  if (!canvasRef.current) {
    canvasRef.current = document.createElement("canvas");
  }

  if (!textureRef.current) {
    textureRef.current = new THREE.CanvasTexture(canvasRef.current);
    textureRef.current.magFilter = THREE.NearestFilter;
    textureRef.current.minFilter = THREE.NearestFilter;
  }

  useFrame(() => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    const texture = textureRef.current;
    if (!img || !canvas || !texture || !img.complete || img.naturalWidth === 0) return;

    if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    // Strip white/light backgrounds
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2];
      if (r > 200 && g > 200 && b > 200) data[i + 3] = 0;
      if (r > 180 && g > 180 && b > 180 && Math.abs(r - g) < 20 && Math.abs(g - b) < 20) data[i + 3] = 0;
    }
    ctx.putImageData(imageData, 0, 0);

    texture.needsUpdate = true;
  });

  return textureRef.current;
}

// List of GIF sources that need animated textures
const GIF_TYPES = new Set(["globe"]);

const SceneContent = ({ onLogoClick }: { onLogoClick?: () => void }) => {
  const iconData = useMemo(() => generateIcons(60, 20), []);

  // Static textures (non-GIF)
  const staticTextures = {
    spaceship: useLoader(THREE.TextureLoader, spaceshipImg),
    planet: useLoader(THREE.TextureLoader, planetImg),
    lizard: useLoader(THREE.TextureLoader, lizardImg),
    yinyang: useLoader(THREE.TextureLoader, yinyangImg),
    symbol: useLoader(THREE.TextureLoader, symbolImg),
    mothman: useLoader(THREE.TextureLoader, mothmanImg),
    spacewyrm: useLoader(THREE.TextureLoader, spacewyrmImg),
    cosmicwyrm: useLoader(THREE.TextureLoader, cosmicwyrmImg),
    bigfoot: useLoader(THREE.TextureLoader, bigfootImg),
    chupacabra: useLoader(THREE.TextureLoader, chupacabraImg),
  };

  // Animated GIF texture
  const globeAnimated = useAnimatedGifTexture(globeImg);

  // Set nearest filter + strip backgrounds for static textures
  Object.values(staticTextures).forEach((tex) => {
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;

    if (tex.image) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (ctx && tex.image instanceof HTMLImageElement) {
        canvas.width = tex.image.width;
        canvas.height = tex.image.height;
        ctx.drawImage(tex.image, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i], g = data[i + 1], b = data[i + 2];
          if (r > 200 && g > 200 && b > 200) data[i + 3] = 0;
          if (r > 180 && g > 180 && b > 180 && Math.abs(r - g) < 20 && Math.abs(g - b) < 20) data[i + 3] = 0;
        }
        ctx.putImageData(imageData, 0, 0);
        tex.image = canvas as unknown as HTMLImageElement;
        tex.needsUpdate = true;
      }
    }
  });

  const textures: Record<string, THREE.Texture> = {
    ...staticTextures,
    globe: globeAnimated,
  };

  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={1.5} />

      {/* Fog for depth */}
      <fog attach="fog" args={["#050505", 8, 30]} />

      {/* Orbit controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        maxDistance={25}
        minDistance={5}
        autoRotate
        autoRotateSpeed={0.3}
        dampingFactor={0.05}
        enableDamping
      />

      {/* Z Logo - center-ish, slightly offset */}
      <ZinethLogoObject position={[0, 0.5, 0]} onClickLogo={onLogoClick} />

      {/* Scattered icons */}
      {iconData.map((icon, i) => (
        <FloatingIcon
          key={i}
          position={icon.position}
          texture={textures[icon.type as keyof typeof textures]}
          scale={icon.scale}
          orbitSpeed={icon.orbitSpeed}
          orbitRadius={icon.orbitRadius}
          orbitOffset={icon.orbitOffset}
          bobSpeed={icon.bobSpeed}
          bobAmount={icon.bobAmount}
        />
      ))}

      {/* Particles / stars background */}
      <Stars />
    </>
  );
};

// Simple star particles
const Stars = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(500 * 3);
    const rand = seededRandom(99);
    for (let i = 0; i < 500; i++) {
      arr[i * 3] = (rand() - 0.5) * 50;
      arr[i * 3 + 1] = (rand() - 0.5) * 50;
      arr[i * 3 + 2] = (rand() - 0.5) * 50;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={500}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#00ff66" size={0.05} sizeAttenuation transparent opacity={0.6} />
    </points>
  );
};

const VoidScene = ({ onExitVoid }: { onExitVoid?: () => void }) => {
  return (
    <div className="w-full h-screen" style={{ background: "#050505" }}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor("#050505");
        }}
      >
        <Suspense fallback={null}>
          <SceneContent onLogoClick={onExitVoid} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default VoidScene;
