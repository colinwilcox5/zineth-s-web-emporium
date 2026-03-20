// ZINETH — Pure TypeScript DDA Raycaster
// No React imports. Works with any canvas.

import { MAP, WALL_COLORS, COLORS, isWall } from './map';
import type { WorldObject } from './map';

export const SCREEN_W = 640;
export const SCREEN_H = 400;
const FOV = Math.PI / 3; // 60 degrees
const HALF_FOV = FOV / 2;
const MAX_DEPTH = 20;

export interface Player {
  x: number;
  y: number;
  angle: number;
}

export interface RayHit {
  distance: number;
  wallType: number;
  side: number; // 0 = vertical, 1 = horizontal
  mapX: number;
  mapY: number;
}

export function castRay(player: Player, angle: number): RayHit {
  const sinA = Math.sin(angle);
  const cosA = Math.cos(angle);

  let mapX = Math.floor(player.x);
  let mapY = Math.floor(player.y);

  const deltaDistX = cosA === 0 ? 1e10 : Math.abs(1 / cosA);
  const deltaDistY = sinA === 0 ? 1e10 : Math.abs(1 / sinA);

  let stepX: number, stepY: number;
  let sideDistX: number, sideDistY: number;

  if (cosA < 0) {
    stepX = -1;
    sideDistX = (player.x - mapX) * deltaDistX;
  } else {
    stepX = 1;
    sideDistX = (mapX + 1 - player.x) * deltaDistX;
  }
  if (sinA < 0) {
    stepY = -1;
    sideDistY = (player.y - mapY) * deltaDistY;
  } else {
    stepY = 1;
    sideDistY = (mapY + 1 - player.y) * deltaDistY;
  }

  let side = 0;
  let depth = 0;

  while (depth < MAX_DEPTH) {
    if (sideDistX < sideDistY) {
      sideDistX += deltaDistX;
      mapX += stepX;
      side = 0;
    } else {
      sideDistY += deltaDistY;
      mapY += stepY;
      side = 1;
    }
    depth++;

    if (mapX < 0 || mapY < 0 || mapX >= 32 || mapY >= 32) break;
    const cell = MAP[mapY][mapX];
    if (cell !== 0) {
      let perpDist: number;
      if (side === 0) {
        perpDist = (mapX - player.x + (1 - stepX) / 2) / cosA;
      } else {
        perpDist = (mapY - player.y + (1 - stepY) / 2) / sinA;
      }
      return { distance: Math.abs(perpDist), wallType: cell, side, mapX, mapY };
    }
  }

  return { distance: MAX_DEPTH, wallType: 0, side: 0, mapX, mapY };
}

function darkenColor(hex: string, factor: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const f = Math.max(0, Math.min(1, factor));
  return `rgb(${Math.floor(r * f)},${Math.floor(g * f)},${Math.floor(b * f)})`;
}

export function renderFrame(
  ctx: CanvasRenderingContext2D,
  player: Player,
  objects: WorldObject[],
  zBuffer: Float64Array
): void {
  // Ceiling
  ctx.fillStyle = COLORS.federalBlue;
  ctx.fillRect(0, 0, SCREEN_W, SCREEN_H / 2);

  // Perspective floor grid via ImageData buffer
  const floorStartY = Math.floor(SCREEN_H / 2) + 1;
  const floorH = SCREEN_H - floorStartY;
  const imgData = ctx.createImageData(SCREEN_W, floorH);
  const pixels = imgData.data;

  const floorBaseR = 0x3D * 0.5, floorBaseG = 0x55 * 0.5, floorBaseB = 0x88 * 0.5;
  const gridR = 0x00, gridG = 0xA9, gridB = 0x5C;

  const leftAngle = player.angle - HALF_FOV;
  const cosL = Math.cos(leftAngle);
  const sinL = Math.sin(leftAngle);
  const rightAngle = player.angle + HALF_FOV;
  const cosR = Math.cos(rightAngle);
  const sinR = Math.sin(rightAngle);

  for (let row = 0; row < floorH; row++) {
    const screenY = floorStartY + row;
    const rowDist = (SCREEN_H * 0.5) / (screenY - SCREEN_H * 0.5);
    if (rowDist > MAX_DEPTH) continue;

    const shade = Math.max(0.05, 1 - rowDist / MAX_DEPTH);

    const floorXL = player.x + rowDist * cosL;
    const floorYL = player.y + rowDist * sinL;
    const floorXR = player.x + rowDist * cosR;
    const floorYR = player.y + rowDist * sinR;
    const dxRow = (floorXR - floorXL) / SCREEN_W;
    const dyRow = (floorYR - floorYL) / SCREEN_W;

    let worldX = floorXL;
    let worldY = floorYL;
    const rowOffset = row * SCREEN_W * 4;

    for (let x = 0; x < SCREEN_W; x++) {
      const fracX = worldX - Math.floor(worldX);
      const fracY = worldY - Math.floor(worldY);
      const lineThreshold = 0.04;
      const onGrid = fracX < lineThreshold || fracX > 1 - lineThreshold ||
                     fracY < lineThreshold || fracY > 1 - lineThreshold;

      const idx = rowOffset + x * 4;
      if (onGrid) {
        pixels[idx] = Math.floor(gridR * shade);
        pixels[idx + 1] = Math.floor(gridG * shade);
        pixels[idx + 2] = Math.floor(gridB * shade);
      } else {
        pixels[idx] = Math.floor(floorBaseR * shade);
        pixels[idx + 1] = Math.floor(floorBaseG * shade);
        pixels[idx + 2] = Math.floor(floorBaseB * shade);
      }
      pixels[idx + 3] = 255;

      worldX += dxRow;
      worldY += dyRow;
    }
  }
  ctx.putImageData(imgData, 0, floorStartY);

  // Cast rays
  for (let col = 0; col < SCREEN_W; col++) {
    const rayAngle = player.angle - HALF_FOV + (col / SCREEN_W) * FOV;
    const hit = castRay(player, rayAngle);

    // Fix fisheye
    const correctedDist = hit.distance * Math.cos(rayAngle - player.angle);
    zBuffer[col] = correctedDist;

    if (hit.wallType === 0) continue;

    const wallHeight = Math.min(SCREEN_H, SCREEN_H / correctedDist);
    const drawStart = (SCREEN_H - wallHeight) / 2;

    const baseColor = WALL_COLORS[hit.wallType] || COLORS.yellow;
    const shade = Math.max(0.15, 1 - correctedDist / MAX_DEPTH);
    const sideDim = hit.side === 1 ? 0.75 : 1;

    ctx.fillStyle = darkenColor(baseColor, shade * sideDim);
    ctx.fillRect(col, drawStart, 1, wallHeight);
  }

  // Render sprites (sorted back to front)
  renderSprites(ctx, player, objects, zBuffer);
}

function renderSprites(
  ctx: CanvasRenderingContext2D,
  player: Player,
  objects: WorldObject[],
  zBuffer: Float64Array
): void {
  // Calculate distance and angle for each sprite
  const spriteData = objects.map((obj) => {
    const dx = obj.x - player.x;
    const dy = obj.y - player.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    return { obj, dist, angle };
  });

  // Sort back to front
  spriteData.sort((a, b) => b.dist - a.dist);

  for (const { obj, dist, angle } of spriteData) {
    if (dist < 0.3 || dist > MAX_DEPTH) continue;

    let relAngle = angle - player.angle;
    // Normalize to [-PI, PI]
    while (relAngle > Math.PI) relAngle -= 2 * Math.PI;
    while (relAngle < -Math.PI) relAngle += 2 * Math.PI;

    if (Math.abs(relAngle) > HALF_FOV + 0.2) continue;

    const screenX = (0.5 + relAngle / FOV) * SCREEN_W;
    const spriteHeight = Math.min(SCREEN_H, (SCREEN_H * 0.6) / dist);
    const spriteWidth = spriteHeight * 0.6;
    const drawX = screenX - spriteWidth / 2;
    const drawY = (SCREEN_H - spriteHeight) / 2;

    const shade = Math.max(0.3, 1 - dist / MAX_DEPTH);

    // Draw sprite columns (respecting z-buffer)
    for (let sx = Math.max(0, Math.floor(drawX)); sx < Math.min(SCREEN_W, Math.ceil(drawX + spriteWidth)); sx++) {
      if (dist < zBuffer[sx]) {
        // Diamond shape for sprite
        const localX = (sx - drawX) / spriteWidth;
        const centerDist = Math.abs(localX - 0.5) * 2;
        const topCut = drawY + spriteHeight * centerDist * 0.3;
        const botCut = drawY + spriteHeight - spriteHeight * centerDist * 0.3;

        ctx.fillStyle = darkenColor(obj.color, shade);
        ctx.fillRect(sx, topCut, 1, botCut - topCut);
      }
    }

    // Label
    if (dist < 5 && obj.label) {
      const labelX = Math.floor(screenX);
      const labelY = Math.floor(drawY - 12);
      if (labelX > 20 && labelX < SCREEN_W - 80) {
        ctx.fillStyle = darkenColor(COLORS.white, shade);
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(obj.label, labelX, labelY);
      }
    }
  }
}

export function getInteractableObject(
  player: Player,
  objects: WorldObject[],
  maxDist = 2.5
): WorldObject | null {
  let closest: WorldObject | null = null;
  let closestDist = maxDist;

  for (const obj of objects) {
    const dx = obj.x - player.x;
    const dy = obj.y - player.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > maxDist) continue;

    // Check if facing the object
    let angleToObj = Math.atan2(dy, dx);
    let relAngle = angleToObj - player.angle;
    while (relAngle > Math.PI) relAngle -= 2 * Math.PI;
    while (relAngle < -Math.PI) relAngle += 2 * Math.PI;

    if (Math.abs(relAngle) < 0.5 && dist < closestDist) {
      closest = obj;
      closestDist = dist;
    }
  }

  return closest;
}
