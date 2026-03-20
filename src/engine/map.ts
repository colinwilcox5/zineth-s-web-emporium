// ZINETH Wolfenstein Room — Level Data
// Wall types: 0 = empty, 1 = Yellow wall, 2 = Sky Blue wall, 3 = Federal Blue wall
// 4 = Pink interactive wall (art), 5 = Secret/pushable wall
// Negative numbers = object placements (handled separately)

export const COLORS = {
  yellow: '#FFE800',
  skyBlue: '#4982CF',
  federalBlue: '#3D5588',
  green: '#00A95C',
  pink: '#FF48B0',
  red: '#FF4C65',
  black: '#000000',
  white: '#FFFFFF',
} as const;

export const WALL_COLORS: Record<number, string> = {
  1: COLORS.yellow,
  2: COLORS.skyBlue,
  3: COLORS.federalBlue,
  4: COLORS.pink,
  5: COLORS.yellow, // secret walls look like normal walls
};

// 32x32 map
// prettier-ignore
export const MAP: number[][] = [
  [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
  [3,0,0,0,0,0,0,0,3,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
  [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3],
  [3,0,0,0,0,0,0,0,3,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3],
  [3,0,0,0,0,0,0,0,3,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3],
  [3,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3],
  [3,0,0,0,0,0,0,0,3,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3],
  [3,3,3,3,0,3,3,3,3,3,3,0,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3],
  [3,3,3,3,0,3,3,3,3,3,3,0,3,3,3,3,3,3,3,3,3,3,0,3,3,3,3,3,3,3,3,3],
  [3,0,0,0,0,0,0,1,3,3,3,0,3,3,3,3,3,3,3,3,3,3,0,3,3,3,3,3,3,3,3,3],
  [3,0,0,0,0,0,0,0,2,2,1,0,1,2,2,3,3,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3],
  [3,0,0,0,0,0,0,1,3,3,3,0,3,3,3,3,3,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3],
  [3,0,0,0,0,0,0,0,3,3,3,0,3,3,3,3,3,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3],
  [3,4,0,0,0,0,4,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3],
  [3,0,0,0,0,0,0,0,3,3,3,3,3,3,3,0,3,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3],
  [3,4,0,0,0,0,4,0,3,3,3,3,3,3,3,0,3,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3],
  [3,0,0,0,0,0,0,0,3,3,3,3,3,3,3,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
  [3,3,3,3,0,3,3,3,3,3,3,3,3,3,3,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
  [3,3,3,3,0,3,3,3,3,3,3,3,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3],
  [3,3,1,2,0,2,1,3,3,3,3,3,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3],
  [3,3,3,3,0,3,3,3,3,3,3,3,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3],
  [3,0,0,0,0,0,0,0,0,3,3,3,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3],
  [3,0,0,0,0,0,0,0,0,5,3,3,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3],
  [3,0,0,0,0,0,0,0,0,3,3,3,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3],
  [3,0,0,0,0,0,0,0,0,3,3,3,3,3,3,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
  [3,0,0,0,0,0,0,0,0,3,3,3,3,3,3,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
  [3,0,0,0,0,0,0,0,0,3,3,3,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
  [3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
  [3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
  [3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
  [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
  [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
];

// Room definitions for HUD display
export interface RoomZone {
  name: string;
  x1: number; y1: number;
  x2: number; y2: number;
}

export const ROOMS: RoomZone[] = [
  { name: 'HUB', x1: 1, y1: 1, x2: 7, y2: 6 },
  { name: 'ART GALLERY', x1: 1, y1: 9, x2: 7, y2: 16 },
  { name: 'LORE VAULT', x1: 1, y1: 21, x2: 8, y2: 25 },
  { name: 'ARCADE ROOM', x1: 17, y1: 2, x2: 29, y2: 7 },
  { name: 'CODE CHAMBER', x1: 12, y1: 18, x2: 18, y2: 29 },
  { name: 'CORRIDOR', x1: 9, y1: 10, x2: 14, y2: 10 },
];

export function getRoomName(px: number, py: number): string {
  const tx = Math.floor(px);
  const ty = Math.floor(py);
  for (const room of ROOMS) {
    if (tx >= room.x1 && tx <= room.x2 && ty >= room.y1 && ty <= room.y2) {
      return room.name;
    }
  }
  return 'CORRIDOR';
}

export function isWall(x: number, y: number): boolean {
  const tx = Math.floor(x);
  const ty = Math.floor(y);
  if (tx < 0 || ty < 0 || tx >= 32 || ty >= 32) return true;
  return MAP[ty][tx] !== 0;
}

export function isSecretWall(x: number, y: number): boolean {
  const tx = Math.floor(x);
  const ty = Math.floor(y);
  if (tx < 0 || ty < 0 || tx >= 32 || ty >= 32) return false;
  return MAP[ty][tx] === 5;
}

export function openSecretWall(x: number, y: number): void {
  const tx = Math.floor(x);
  const ty = Math.floor(y);
  if (tx >= 0 && ty >= 0 && tx < 32 && ty < 32 && MAP[ty][tx] === 5) {
    MAP[ty][tx] = 0;
  }
}

// Sprite / interactive object types
export type ObjectType = 'art' | 'lore' | 'arcade' | 'code_glyph';

export interface WorldObject {
  x: number;
  y: number;
  type: ObjectType;
  id: string;
  color: string;
  label?: string;
}

export const WORLD_OBJECTS: WorldObject[] = [
  // Art Gallery pieces (near pink walls)
  { x: 2.5, y: 10.5, type: 'art', id: 'art-1', color: COLORS.pink, label: 'ARTIFACT I' },
  { x: 5.5, y: 10.5, type: 'art', id: 'art-2', color: COLORS.pink, label: 'ARTIFACT II' },
  { x: 2.5, y: 14.5, type: 'art', id: 'art-3', color: COLORS.pink, label: 'ARTIFACT III' },
  { x: 5.5, y: 14.5, type: 'art', id: 'art-4', color: COLORS.pink, label: 'ARTIFACT IV' },

  // Lore Vault pickups
  { x: 3.5, y: 22.5, type: 'lore', id: 'lore-1', color: COLORS.pink, label: 'TRANSMISSION 001' },
  { x: 6.5, y: 22.5, type: 'lore', id: 'lore-2', color: COLORS.pink, label: 'TRANSMISSION 002' },
  { x: 3.5, y: 24.5, type: 'lore', id: 'lore-3', color: COLORS.pink, label: 'TRANSMISSION 003' },
  { x: 6.5, y: 24.5, type: 'lore', id: 'lore-4', color: COLORS.pink, label: 'TRANSMISSION 004' },

  // Arcade cabinet
  { x: 23.5, y: 4.5, type: 'arcade', id: 'arcade-1', color: COLORS.red, label: 'ARCADE CABINET' },

  // Code Chamber glyphs
  { x: 13.5, y: 20.5, type: 'code_glyph', id: 'glyph-1', color: COLORS.green, label: '◈' },
  { x: 15.5, y: 20.5, type: 'code_glyph', id: 'glyph-2', color: COLORS.green, label: '◇' },
  { x: 17.5, y: 20.5, type: 'code_glyph', id: 'glyph-3', color: COLORS.green, label: '△' },
  { x: 15.5, y: 27.5, type: 'code_glyph', id: 'glyph-4', color: COLORS.green, label: '○' },
];

// Correct glyph sequence for Code Chamber puzzle
export const GLYPH_SEQUENCE = ['glyph-1', 'glyph-3', 'glyph-4', 'glyph-2'];
