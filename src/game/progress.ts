import { MEDAL_RANK, type Medal } from './engine';

export interface Best {
  correct: number;
  points: number;
  medal: Medal | null;
}

export type Progress = Record<string, Best>;

const KEY = 'oxi1940:progress:v1';

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Progress) : {};
  } catch {
    return {};
  }
}

export function isBetter(next: Best, prev: Best | undefined): boolean {
  if (!prev) return true;
  return next.correct > prev.correct || (next.correct === prev.correct && next.points > prev.points);
}

/** Keeps the best result per mode and the highest medal ever won in it. */
export function mergeBest(prev: Best | undefined, next: Best): Best {
  const best = isBetter(next, prev) ? next : prev!;
  const medals = [prev?.medal, next.medal].filter((m): m is Medal => m != null);
  const medal = medals.sort((a, b) => MEDAL_RANK[b] - MEDAL_RANK[a])[0] ?? null;
  return { ...best, medal };
}

export function saveResult(progress: Progress, modeId: string, result: Best): Progress {
  const next = { ...progress, [modeId]: mergeBest(progress[modeId], result) };
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Progress is a convenience; the game works without storage.
  }
  return next;
}
