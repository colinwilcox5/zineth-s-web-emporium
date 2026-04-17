// Omnibus scene type definitions
import type { ReactNode } from 'react';

export type SceneId =
  | 'observatory'
  | 'fog-forest'
  | 'idol-doorway'
  | 'foyer'
  | 'great-room'
  | 'art-gallery'
  | 'lore-vault'
  | 'arcade'
  | 'code-chamber'
  | 'utility-closet'
  | 'secret-alcove';

export interface HotspotConfig {
  /** Bounding box in % of scene container — left, top, width, height */
  area: { left: number; top: number; width: number; height: number };
  label: string;
  /** Where this hotspot leads. If omitted, onClick must be provided. */
  to?: SceneId;
  onClick?: () => void;
  /** Cursor preview shown in Observatory viewport */
  hoverPreview?: SceneId | 'home';
  /** Optional hover tooltip text */
  tooltip?: string;
  /** External URL — opens in new tab */
  href?: string;
  /** Suppress the cyan cursor glow (e.g. text input regions) */
  noCursorGlow?: boolean;
}

export interface SceneConfig {
  id: SceneId;
  title: string;
  /** Scenes that should be preloaded while on this one */
  preloadAdjacent: SceneId[];
  ambientSoundId: string;
  /** The placeholder background renderer */
  background: ReactNode;
  /** Scene-specific overlay UI (chandelier, fog drift, etc.) */
  overlay?: ReactNode;
  hotspots: HotspotConfig[];
  /** If true, hides the standard back-arrow chrome (Observatory, Forest) */
  hideBackArrow?: boolean;
  /** Where the back-arrow goes. Defaults to previous scene logic. */
  backTo?: SceneId;
}

// Riso palette — exact values from the prompt
export const SIGIL_COLORS = {
  yellow: '#FFE800',
  skyBlue: '#4982CF',
  federalBlue: '#3D5588',
  green: '#00A95C',
  pink: '#FF48B0',
  red: '#FF4C65',
  black: '#0A0A0A',
  cream: '#f2f0ec',
} as const;
