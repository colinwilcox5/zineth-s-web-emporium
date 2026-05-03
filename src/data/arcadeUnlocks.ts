export const STORAGE_KEY = 'zineth_arcade_unlocks';

export function getUnlocks(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addUnlock(unlockId: string) {
  const current = getUnlocks();
  if (!current.includes(unlockId)) {
    const updated = [...current, unlockId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
}

export interface ArcadeUnlock {
  id: string;
  type: 'video' | 'merch';
  title: string;
  unlockedBy: string;
  videoSrc?: string;
  thumbnailSrc?: string;
  imageSrc?: string;
  description?: string;
}

export const arcadeUnlocks: ArcadeUnlock[] = [
  {
    id: 'unlock-trace-pentagon',
    type: 'video',
    title: 'ARCHIVE TRANSMISSION 01',
    unlockedBy: 'trace-pentagon',
    videoSrc: '/arcade/unlocks/video-01.mp4',
    thumbnailSrc: '/arcade/unlocks/video-01-poster.png',
    description: 'A short transmission from the field. Recorded in late autumn.',
  },
  {
    id: 'unlock-trace-pentagram',
    type: 'video',
    title: 'ARCHIVE TRANSMISSION 02',
    unlockedBy: 'trace-pentagram',
    videoSrc: '/arcade/unlocks/video-02.mp4',
    thumbnailSrc: '/arcade/unlocks/video-02-poster.png',
    description: 'Second transmission. Source is unconfirmed.',
  },
  {
    id: 'unlock-trace-spiral',
    type: 'merch',
    title: 'MERCH DROP — UNLOCKED',
    unlockedBy: 'trace-spiral',
    imageSrc: '/arcade/unlocks/merch-01.png',
    thumbnailSrc: '/arcade/unlocks/merch-01.png',
    description: 'A piece from the Spiral capsule. Earned, not bought.',
  },
];