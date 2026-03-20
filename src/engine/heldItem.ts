// ZINETH — First-person held item renderer
// No React imports.

import { SCREEN_W, SCREEN_H } from './raycaster';
import { COLORS } from './map';

const RISO_CYCLE = [
  COLORS.yellow,
  COLORS.skyBlue,
  COLORS.green,
  COLORS.pink,
  COLORS.red,
  COLORS.federalBlue,
];

export type HeldItemType = 'orb' | 'zine';

export interface HeldItemState {
  current: HeldItemType;
  swapping: boolean;
  swapTimer: number;
  swapDuration: number;
  stepCounter: number;
  bobX: number;
  bobY: number;
  colorCycleT: number;
}

export function createHeldItemState(): HeldItemState {
  return {
    current: 'orb',
    swapping: false,
    swapTimer: 0,
    swapDuration: 400,
    stepCounter: 0,
    bobX: 0,
    bobY: 0,
    colorCycleT: 0,
  };
}

function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

function lerpColor(a: string, b: string, t: number): string {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `rgb(${r},${g},${bl})`;
}

export function updateHeldItem(
  state: HeldItemState,
  isMoving: boolean,
  dt: number
): void {
  // Color cycle
  state.colorCycleT += dt * 0.0005; // ~2s full cycle
  if (state.colorCycleT >= RISO_CYCLE.length) state.colorCycleT -= RISO_CYCLE.length;

  // Bob
  if (isMoving) {
    state.stepCounter += 1;
  } else {
    // Smooth return to rest
    state.bobX *= 0.9;
    state.bobY *= 0.9;
  }

  if (isMoving) {
    state.bobY = Math.sin(state.stepCounter * 0.15) * 8;
    state.bobX = Math.cos(state.stepCounter * 0.075) * 4;
  }

  // Swap animation
  if (state.swapping) {
    state.swapTimer += dt;
    if (state.swapTimer >= state.swapDuration / 2 && state.swapTimer - dt < state.swapDuration / 2) {
      // Swap at midpoint
      state.current = state.current === 'orb' ? 'zine' : 'orb';
    }
    if (state.swapTimer >= state.swapDuration) {
      state.swapping = false;
      state.swapTimer = 0;
    }
  }
}

export function startSwap(state: HeldItemState): void {
  if (state.swapping) return;
  state.swapping = true;
  state.swapTimer = 0;
}

export function renderHeldItem(
  ctx: CanvasRenderingContext2D,
  state: HeldItemState,
  isNearInteractable: boolean
): void {
  const centerX = SCREEN_W / 2;
  const baseY = SCREEN_H - 20;

  // Calculate swap offset
  let swapOffsetY = 0;
  if (state.swapping) {
    const t = state.swapTimer / state.swapDuration;
    swapOffsetY = Math.sin(t * Math.PI) * 80;
  }

  const x = centerX + state.bobX;
  const y = baseY + state.bobY + swapOffsetY;

  // Draw hands
  drawHands(ctx, x, y);

  // Draw item
  if (state.current === 'orb') {
    drawOrb(ctx, x, y - 32, state, isNearInteractable);
  } else {
    drawZine(ctx, x, y - 40, isNearInteractable);
  }
}

function drawHands(ctx: CanvasRenderingContext2D, x: number, y: number): void {
  // Left hand
  ctx.fillStyle = '#2a3f5f';
  ctx.fillRect(x - 32, y - 12, 20, 28);
  ctx.fillStyle = COLORS.federalBlue;
  ctx.fillRect(x - 30, y - 10, 16, 24);

  // Right hand
  ctx.fillStyle = '#2a3f5f';
  ctx.fillRect(x + 12, y - 12, 20, 28);
  ctx.fillStyle = COLORS.federalBlue;
  ctx.fillRect(x + 14, y - 10, 16, 24);
}

function drawOrb(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  state: HeldItemState,
  isNearInteractable: boolean
): void {
  const radius = 11;

  if (isNearInteractable) {
    // Proximity glow — pulsing pink
    const pulseT = Date.now() * 0.003; // ~3 pulses/sec
    const glowAlpha = 0.3 + Math.sin(pulseT * Math.PI * 2) * 0.2;
    ctx.beginPath();
    ctx.arc(x, y, radius + 6, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,72,176,${glowAlpha})`;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = COLORS.pink;
    ctx.fill();
  } else {
    // Idle color cycle
    const idx = Math.floor(state.colorCycleT);
    const nextIdx = (idx + 1) % RISO_CYCLE.length;
    const frac = state.colorCycleT - idx;
    const color = lerpColor(RISO_CYCLE[idx], RISO_CYCLE[nextIdx], frac);

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }

  // Highlight
  ctx.beginPath();
  ctx.arc(x - 3, y - 3, 3, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.fill();
}

function drawZine(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  isNearInteractable: boolean
): void {
  const w = 24;
  const h = 32;
  const left = x - w / 2;
  const top = y - h / 2;

  // Glow outline when near interactable
  if (isNearInteractable) {
    ctx.strokeStyle = COLORS.pink;
    ctx.lineWidth = 2;
    ctx.strokeRect(left - 2, top - 2, w + 4, h + 4);
  }

  // Zine body
  ctx.fillStyle = COLORS.yellow;
  ctx.fillRect(left, top, w, h);

  // "Z" letter
  ctx.fillStyle = COLORS.skyBlue;
  ctx.font = 'bold 14px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Z', x, y);

  // Spine line
  ctx.strokeStyle = COLORS.federalBlue;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(left + 2, top);
  ctx.lineTo(left + 2, top + h);
  ctx.stroke();
}
