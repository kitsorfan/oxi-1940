import type { Chapter, ChoiceQuestion, L, MapQuestion } from '../types';
import { VIEW, offsetKm, project, type Point } from './geo';

export type Rng = () => number;
export type Medal = 'gold' | 'silver' | 'bronze';
/** The helps a player can use, each once per game. */
export type Help = 'fifty' | 'poll' | 'second' | 'telegram';

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

/**
 * How the company votes on a choice question, in whole percent per option.
 * The answer usually leads, not always clearly, and now and then the crowd is wrong.
 * Options the 50:50 removed get no votes.
 */
export function companyPoll(item: ChoiceItem, removed: number[] = [], rng: Rng = Math.random): number[] {
  const weights = item.options.map((_, i) => {
    if (removed.includes(i)) return 0;
    return i === item.correct ? 25 + rng() * 40 : 5 + rng() * 35;
  });
  const total = weights.reduce((a, b) => a + b, 0);
  const exact = weights.map((w) => (w / total) * 100);
  const shares = exact.map(Math.floor);
  // Hand the points lost to rounding down to the largest remainders, so the shares add up to 100.
  const missing = 100 - shares.reduce((a, b) => a + b, 0);
  const byRemainder = exact.map((e, i) => ({ i, rest: e - Math.floor(e) })).sort((a, b) => b.rest - a.rest);
  for (const { i } of byRemainder.slice(0, missing)) shares[i]! += 1;
  return shares;
}

const CROWD_SIZE = 20;
const CROWD_STRAYS = 3;

/** A standard normal sample (Box–Muller). */
function gaussian(rng: Rng): number {
  return Math.sqrt(-2 * Math.log(1 - rng())) * Math.cos(2 * Math.PI * rng());
}

/**
 * Where the company would drop their pins on a map question: a cloud around a spot
 * a little off the target, plus a few soldiers far astray. All inside the visible map.
 */
export function companyGuesses(target: { lat: number; lon: number }, rng: Rng = Math.random): Point[] {
  const angle = rng() * 2 * Math.PI;
  const offKm = 10 + rng() * 35;
  const centre = offsetKm(target, offKm * Math.sin(angle), offKm * Math.cos(angle));
  return Array.from({ length: CROWD_SIZE }, (_, i) => {
    const spreadKm = i < CROWD_STRAYS ? 140 : 45;
    // A pin that lands off the map is drawn again; pinning it to the edge would line the edge with dots.
    let p: Point;
    let tries = 0;
    do {
      const { lat, lon } = offsetKm(centre, gaussian(rng) * spreadKm, gaussian(rng) * spreadKm);
      p = project(lat, lon);
    } while (!onMap(p) && ++tries < 50);
    return {
      x: Math.min(Math.max(p.x, VIEW.x + 8), VIEW.x + VIEW.width - 8),
      y: Math.min(Math.max(p.y, VIEW.y + 8), VIEW.y + VIEW.height - 8),
    };
  });
}

const onMap = (p: Point) => p.x > VIEW.x && p.x < VIEW.x + VIEW.width && p.y > VIEW.y && p.y < VIEW.y + VIEW.height;

export function medalFor(correct: number, total: number = ROUND_SIZE): Medal | null {
  const missed = total - correct;
  if (missed <= 0) return 'gold';
  if (missed === 1) return 'silver';
  if (missed === 2) return 'bronze';
  return null;
}

export const MEDAL_RANK: Record<Medal, number> = { bronze: 1, silver: 2, gold: 3 };

/**
 * `streak` counts the current answer, so the first correct answer has streak 1.
 * `helped` is whether a help was used on this question; it halves the base.
 */
export function pointsFor(correct: boolean, streak: number, helped: boolean): number {
  if (!correct) return 0;
  const base = helped ? 50 : 100;
  return base + 10 * Math.min(Math.max(streak - 1, 0), 5);
}
