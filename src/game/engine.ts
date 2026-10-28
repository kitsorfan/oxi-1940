import type { Chapter, ChoiceQuestion, L, MapQuestion } from '../types';
import { VIEW, type Point } from './geo';

export type Rng = () => number;
export type Medal = 'gold' | 'silver' | 'bronze';

export const ROUND_SIZE = 20;
export const MIXED_ID = 'mixed';
const MIXED_PER_CHAPTER = 4;

export interface ChoiceItem {
  kind: 'choice';
  question: ChoiceQuestion;
  options: L[];
  correct: number;
}

export interface MapItem {
  kind: 'map';
  question: MapQuestion;
}

export type RoundItem = ChoiceItem | MapItem;

export function shuffle<T>(items: readonly T[], rng: Rng = Math.random): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}

function prepare(question: ChoiceQuestion | MapQuestion, rng: Rng): RoundItem {
  if (question.kind === 'map') return { kind: 'map', question };
  const options = shuffle([question.answer, ...question.wrong], rng);
  return { kind: 'choice', question, options, correct: options.indexOf(question.answer) };
}

/**
 * A chapter is played in its story order. The mixed challenge draws a few
 * questions from every chapter and keeps them in chronological order.
 */
export function buildRound(modeId: string, chapters: Chapter[], rng: Rng = Math.random): RoundItem[] {
  const questions =
    modeId === MIXED_ID
      ? chapters.flatMap((c) =>
          shuffle(c.questions.map((q, i) => ({ q, i })), rng)
            .slice(0, MIXED_PER_CHAPTER)
            .sort((a, b) => a.i - b.i)
            .map(({ q }) => q),
        )
      : (chapters.find((c) => c.id === modeId)?.questions ?? []);
  return questions.map((q) => prepare(q, rng));
}

/** Indices of the two wrong options the 50:50 lifeline removes. */
export function fiftyFifty(item: ChoiceItem, rng: Rng = Math.random): number[] {
  const wrong = item.options.map((_, i) => i).filter((i) => i !== item.correct);
  return shuffle(wrong, rng).slice(0, 2);
}

export interface MapSplit {
  axis: 'x' | 'y';
  at: number;
  /** Which side of `at` holds the target and stays visible. */
  keep: 'before' | 'after';
}

/** On map questions the 50:50 hides the half of the map without the target. */
export function mapSplit(target: Point): MapSplit {
  const cx = VIEW.x + VIEW.width / 2;
  const cy = VIEW.y + VIEW.height / 2;
  // Split along the axis where the target sits furthest from the middle, so it is never near the edge of the shade.
  const axis = Math.abs(target.x - cx) / VIEW.width >= Math.abs(target.y - cy) / VIEW.height ? 'x' : 'y';
  const at = axis === 'x' ? cx : cy;
  return { axis, at, keep: target[axis] < at ? 'before' : 'after' };
}

export function medalFor(correct: number, total: number = ROUND_SIZE): Medal | null {
  const missed = total - correct;
  if (missed <= 0) return 'gold';
  if (missed === 1) return 'silver';
  if (missed === 2) return 'bronze';
  return null;
}

export const MEDAL_RANK: Record<Medal, number> = { bronze: 1, silver: 2, gold: 3 };

/** `streak` counts the current answer, so the first correct answer has streak 1. */
export function pointsFor(correct: boolean, streak: number, usedFifty: boolean): number {
  if (!correct) return 0;
  const base = usedFifty ? 50 : 100;
  return base + 10 * Math.min(Math.max(streak - 1, 0), 5);
}
