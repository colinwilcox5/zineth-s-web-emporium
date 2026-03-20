// ZINETH — Breakout mini-game
// Self-contained, renders to a canvas overlay

import { COLORS } from './map';

const BRICK_COLORS = [COLORS.yellow, COLORS.skyBlue, COLORS.federalBlue, COLORS.green, COLORS.pink, COLORS.red];
const GAME_W = 560;
const GAME_H = 360;
const PADDLE_W = 80;
const PADDLE_H = 12;
const BALL_R = 6;
const BRICK_ROWS = 5;
const BRICK_COLS = 10;
const BRICK_W = GAME_W / BRICK_COLS;
const BRICK_H = 16;
const BRICK_TOP = 40;

export interface BreakoutState {
  paddleX: number;
  ballX: number;
  ballY: number;
  ballDX: number;
  ballDY: number;
  bricks: boolean[][];
  score: number;
  lives: number;
  running: boolean;
  won: boolean;
}

export function createBreakoutState(): BreakoutState {
  const bricks = Array.from({ length: BRICK_ROWS }, () =>
    Array.from({ length: BRICK_COLS }, () => true)
  );
  return {
    paddleX: GAME_W / 2 - PADDLE_W / 2,
    ballX: GAME_W / 2,
    ballY: GAME_H - 30,
    ballDX: 3,
    ballDY: -3,
    bricks,
    score: 0,
    lives: 3,
    running: false,
    won: false,
  };
}

export function updateBreakout(state: BreakoutState): void {
  if (!state.running) return;

  state.ballX += state.ballDX;
  state.ballY += state.ballDY;

  // Wall bounce
  if (state.ballX <= BALL_R || state.ballX >= GAME_W - BALL_R) {
    state.ballDX = -state.ballDX;
  }
  if (state.ballY <= BALL_R) {
    state.ballDY = -state.ballDY;
  }

  // Paddle collision
  if (
    state.ballY >= GAME_H - PADDLE_H - BALL_R - 20 &&
    state.ballY < GAME_H - 10 &&
    state.ballX >= state.paddleX &&
    state.ballX <= state.paddleX + PADDLE_W &&
    state.ballDY > 0
  ) {
    state.ballDY = -state.ballDY;
    // Angle based on where ball hits paddle
    const hitPos = (state.ballX - state.paddleX) / PADDLE_W - 0.5;
    state.ballDX = hitPos * 3;
  }

  // Ball out of bounds
  if (state.ballY > GAME_H) {
    state.lives--;
    if (state.lives <= 0) {
      state.running = false;
    } else {
      state.ballX = GAME_W / 2;
      state.ballY = GAME_H - 30;
      state.ballDY = -1.5;
      state.ballDX = 1.5;
    }
  }

  // Brick collision
  let bricksLeft = 0;
  for (let row = 0; row < BRICK_ROWS; row++) {
    for (let col = 0; col < BRICK_COLS; col++) {
      if (!state.bricks[row][col]) continue;
      bricksLeft++;
      const bx = col * BRICK_W;
      const by = BRICK_TOP + row * BRICK_H;
      if (
        state.ballX >= bx &&
        state.ballX <= bx + BRICK_W &&
        state.ballY >= by &&
        state.ballY <= by + BRICK_H
      ) {
        state.bricks[row][col] = false;
        state.ballDY = -state.ballDY;
        state.score += 10;
        bricksLeft--;
      }
    }
  }

  if (bricksLeft === 0) {
    state.running = false;
    state.won = true;
  }
}

export function renderBreakout(ctx: CanvasRenderingContext2D, state: BreakoutState): void {
  // Background
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, GAME_W, GAME_H);

  // Bricks
  for (let row = 0; row < BRICK_ROWS; row++) {
    for (let col = 0; col < BRICK_COLS; col++) {
      if (!state.bricks[row][col]) continue;
      ctx.fillStyle = BRICK_COLORS[row % BRICK_COLORS.length];
      ctx.fillRect(col * BRICK_W + 1, BRICK_TOP + row * BRICK_H + 1, BRICK_W - 2, BRICK_H - 2);
    }
  }

  // Paddle
  ctx.fillStyle = COLORS.pink;
  ctx.fillRect(state.paddleX, GAME_H - PADDLE_H - 10, PADDLE_W, PADDLE_H);

  // Ball
  ctx.fillStyle = COLORS.yellow;
  ctx.beginPath();
  ctx.arc(state.ballX, state.ballY, BALL_R, 0, Math.PI * 2);
  ctx.fill();

  // Score & Lives
  ctx.fillStyle = COLORS.white;
  ctx.font = '8px monospace';
  ctx.textAlign = 'left';
  ctx.fillText(`SCORE: ${state.score}`, 4, 12);
  ctx.textAlign = 'right';
  ctx.fillText(`LIVES: ${state.lives}`, GAME_W - 4, 12);

  if (!state.running && state.lives > 0 && !state.won) {
    ctx.fillStyle = COLORS.yellow;
    ctx.textAlign = 'center';
    ctx.font = '10px monospace';
    ctx.fillText('CLICK TO START', GAME_W / 2, GAME_H / 2);
  }

  if (state.won) {
    ctx.fillStyle = COLORS.green;
    ctx.textAlign = 'center';
    ctx.font = '12px monospace';
    ctx.fillText('YOU WIN', GAME_W / 2, GAME_H / 2);
  }

  if (state.lives <= 0) {
    ctx.fillStyle = COLORS.red;
    ctx.textAlign = 'center';
    ctx.font = '12px monospace';
    ctx.fillText('GAME OVER', GAME_W / 2, GAME_H / 2);
  }
}

export const BREAKOUT_W = GAME_W;
export const BREAKOUT_H = GAME_H;
