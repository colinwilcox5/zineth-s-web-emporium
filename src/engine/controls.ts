// ZINETH — Input handling for desktop and mobile
// No React imports.

import { isWall, openSecretWall, isSecretWall } from './map';
import type { Player } from './raycaster';

export interface InputState {
  forward: boolean;
  backward: boolean;
  strafeLeft: boolean;
  strafeRight: boolean;
  turnLeft: boolean;
  turnRight: boolean;
  interact: boolean;
  swapItem: boolean;
  isMobile: boolean;
}

export function createInputState(): InputState {
  return {
    forward: false,
    backward: false,
    strafeLeft: false,
    strafeRight: false,
    turnLeft: false,
    turnRight: false,
    interact: false,
    swapItem: false,
    isMobile: false,
  };
}

export function setupDesktopControls(
  canvas: HTMLCanvasElement,
  input: InputState
): () => void {
  const onKeyDown = (e: KeyboardEvent) => {
    switch (e.code) {
      case 'KeyW': case 'ArrowUp': input.forward = true; break;
      case 'KeyS': case 'ArrowDown': input.backward = true; break;
      case 'KeyA': input.strafeLeft = true; break;
      case 'KeyD': input.strafeRight = true; break;
      case 'KeyQ': case 'ArrowLeft': input.turnLeft = true; break;
      case 'KeyE': case 'ArrowRight': input.turnRight = true; break;
      case 'Space': case 'KeyF': e.preventDefault(); input.interact = true; break;
      case 'KeyZ': input.swapItem = true; break;
    }
  };

  const onKeyUp = (e: KeyboardEvent) => {
    switch (e.code) {
      case 'KeyW': case 'ArrowUp': input.forward = false; break;
      case 'KeyS': case 'ArrowDown': input.backward = false; break;
      case 'KeyA': input.strafeLeft = false; break;
      case 'KeyD': input.strafeRight = false; break;
      case 'KeyQ': case 'ArrowLeft': input.turnLeft = false; break;
      case 'KeyE': case 'ArrowRight': input.turnRight = false; break;
      case 'Space': case 'KeyF': input.interact = false; break;
    }
  };

  const onClick = () => {
    input.interact = true;
  };

  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  canvas.addEventListener('click', onClick);

  return () => {
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('keyup', onKeyUp);
    canvas.removeEventListener('click', onClick);
  };
}

export function setupMobileControls(
  canvas: HTMLCanvasElement,
  input: InputState,
  player: Player
): () => void {
  input.isMobile = true;
  let touchStartX = 0;
  let touchStartY = 0;
  let touchStartTime = 0;

  const onTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    touchStartTime = Date.now();
  };

  const onTouchEnd = (e: TouchEvent) => {
    e.preventDefault();
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartX;
    const dy = touch.clientY - touchStartY;
    const dt = Date.now() - touchStartTime;

    // Tap (no significant movement)
    if (Math.abs(dx) < 30 && Math.abs(dy) < 30 && dt < 300) {
      input.interact = true;
      return;
    }

    // Swipe
    if (Math.abs(dx) > Math.abs(dy)) {
      // Horizontal swipe — rotate
      if (dx > 40) {
        player.angle += Math.PI / 2;
      } else if (dx < -40) {
        player.angle -= Math.PI / 2;
      }
    } else {
      // Vertical swipe — move
      if (dy < -40) {
        const newX = player.x + Math.cos(player.angle) * 1;
        const newY = player.y + Math.sin(player.angle) * 1;
        if (!isWall(newX, newY)) {
          player.x = Math.floor(newX) + 0.5;
          player.y = Math.floor(newY) + 0.5;
        } else if (isSecretWall(newX, newY)) {
          openSecretWall(newX, newY);
        }
      } else if (dy > 40) {
        const newX = player.x - Math.cos(player.angle) * 1;
        const newY = player.y - Math.sin(player.angle) * 1;
        if (!isWall(newX, newY)) {
          player.x = Math.floor(newX) + 0.5;
          player.y = Math.floor(newY) + 0.5;
        }
      }
    }
  };

  canvas.addEventListener('touchstart', onTouchStart, { passive: false });
  canvas.addEventListener('touchend', onTouchEnd, { passive: false });

  return () => {
    canvas.removeEventListener('touchstart', onTouchStart);
    canvas.removeEventListener('touchend', onTouchEnd);
  };
}

const MOVE_SPEED = 0.04;
const TURN_SPEED = 0.03;
const COLLISION_RADIUS = 0.2;

export function updatePlayer(player: Player, input: InputState): boolean {
  let moved = false;

  // Keyboard turn
  if (input.turnLeft) { player.angle -= TURN_SPEED; moved = true; }
  if (input.turnRight) { player.angle += TURN_SPEED; moved = true; }

  // Movement
  let moveX = 0;
  let moveY = 0;

  if (input.forward) {
    moveX += Math.cos(player.angle) * MOVE_SPEED;
    moveY += Math.sin(player.angle) * MOVE_SPEED;
  }
  if (input.backward) {
    moveX -= Math.cos(player.angle) * MOVE_SPEED;
    moveY -= Math.sin(player.angle) * MOVE_SPEED;
  }
  if (input.strafeLeft) {
    moveX += Math.cos(player.angle - Math.PI / 2) * MOVE_SPEED;
    moveY += Math.sin(player.angle - Math.PI / 2) * MOVE_SPEED;
  }
  if (input.strafeRight) {
    moveX += Math.cos(player.angle + Math.PI / 2) * MOVE_SPEED;
    moveY += Math.sin(player.angle + Math.PI / 2) * MOVE_SPEED;
  }

  if (moveX !== 0 || moveY !== 0) {
    const newX = player.x + moveX;
    const newY = player.y + moveY;

    // Check for secret walls
    if (isSecretWall(newX, player.y)) {
      openSecretWall(newX, player.y);
    }
    if (isSecretWall(player.x, newY)) {
      openSecretWall(player.x, newY);
    }

    // Sliding collision
    if (!isWall(newX + COLLISION_RADIUS * Math.sign(moveX), player.y) &&
        !isWall(newX - COLLISION_RADIUS * Math.sign(moveX), player.y)) {
      player.x = newX;
      moved = true;
    }
    if (!isWall(player.x, newY + COLLISION_RADIUS * Math.sign(moveY)) &&
        !isWall(player.x, newY - COLLISION_RADIUS * Math.sign(moveY))) {
      player.y = newY;
      moved = true;
    }
  }

  return moved;
}
