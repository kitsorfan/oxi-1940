import { describe, expect, it } from 'vitest';
import { chapters } from '../src/data/chapters';
import {
  MIXED_ID,
  ROUND_SIZE,
  buildRound,
  companyGuesses,
  companyPoll,
  fiftyFifty,
  mapSplit,
  medalFor,
  pointsFor,
  shuffle,
  type ChoiceItem,
} from '../src/game/engine';
import { VIEW, compassTo, distanceKm, offsetKm, project, unproject } from '../src/game/geo';
import { mergeBest } from '../src/game/progress';
import { caps } from '../src/i18n/strings';

/** Small deterministic generator so the tests do not depend on Math.random. */
function seeded(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 2 ** 32;
    return seed / 2 ** 32;
  };
}

describe('buildRound', () => {
  it('plays a chapter in story order with the answer somewhere among the options', () => {
    const round = buildRound('pindus', chapters, seeded(1));
    expect(round.map((r) => r.question.id)).toEqual(chapters[1]!.questions.map((q) => q.id));
    for (const item of round) {
      if (item.kind === 'choice') expect(item.options[item.correct]).toBe(item.question.answer);
    }
  });

  it('draws the mixed challenge from every chapter, in chapter order', () => {
    const round = buildRound(MIXED_ID, chapters, seeded(7));
    expect(round).toHaveLength(ROUND_SIZE);
    const order = chapters.flatMap((c) => c.questions.map((q) => q.id));
    const positions = round.map((r) => order.indexOf(r.question.id));
    expect([...positions].sort((a, b) => a - b)).toEqual(positions);
    for (const c of chapters) {
      expect(round.filter((r) => c.questions.includes(r.question)).length).toBe(4);
    }
  });

  it('shuffles without losing items', () => {
    const items = Array.from({ length: 30 }, (_, i) => i);
    expect(shuffle(items, seeded(3)).sort((a, b) => a - b)).toEqual(items);
  });
});

describe('50:50', () => {
  it('removes exactly two wrong options and never the answer', () => {
    const items = buildRound('ultimatum', chapters, seeded(11)).filter((r): r is ChoiceItem => r.kind === 'choice');
    for (let seed = 0; seed < 50; seed++) {
      for (const item of items) {
        const removed = fiftyFifty(item, seeded(seed));
        expect(removed).toHaveLength(2);
        expect(new Set(removed).size).toBe(2);
        expect(removed).not.toContain(item.correct);
      }
    }
  });

  it('keeps the target visible on map questions', () => {
    for (const q of chapters.flatMap((c) => c.questions)) {
      if (q.kind !== 'map') continue;
      const p = project(q.lat, q.lon);
      const split = mapSplit(p);
      expect(split.keep === 'before' ? p[split.axis] < split.at : p[split.axis] > split.at, q.id).toBe(true);
      expect(split.at).toBe(split.axis === 'x' ? VIEW.x + VIEW.width / 2 : VIEW.y + VIEW.height / 2);
    }
  });
});

describe('Ask the company', () => {
  const items = chapters
    .flatMap((c) => buildRound(c.id, chapters, seeded(5)))
    .filter((r): r is ChoiceItem => r.kind === 'choice');

  it('splits whole percentages that add up to 100, with none for removed options', () => {
    for (const [n, item] of items.entries()) {
      const removed = n % 2 ? fiftyFifty(item, seeded(n)) : [];
      const poll = companyPoll(item, removed, seeded(n));
      expect(poll).toHaveLength(4);
      expect(poll.reduce((a, b) => a + b, 0)).toBe(100);
      expect(poll.every(Number.isInteger)).toBe(true);
      for (const i of removed) expect(poll[i]).toBe(0);
    }
  });

  it('usually backs the answer, but not always', () => {
    const polls = Array.from({ length: 400 }, (_, seed) => companyPoll(items[seed % items.length]!, [], seeded(seed)));
    const right = polls.filter((poll, seed) => Math.max(...poll) === poll[items[seed % items.length]!.correct]).length;
    expect(right / polls.length).toBeGreaterThan(0.7);
    expect(right / polls.length).toBeLessThan(0.98);
  });

  it('drops the pins near the target on map questions, all on the visible map', () => {
    for (const q of chapters.flatMap((c) => c.questions)) {
      if (q.kind !== 'map') continue;
      const pins = companyGuesses(q, seeded(q.id.length * 31 + q.lat));
      expect(pins).toHaveLength(20);
      for (const p of pins) {
        expect(p.x, q.id).toBeGreaterThanOrEqual(VIEW.x);
        expect(p.x, q.id).toBeLessThanOrEqual(VIEW.x + VIEW.width);
        expect(p.y, q.id).toBeGreaterThanOrEqual(VIEW.y);
        expect(p.y, q.id).toBeLessThanOrEqual(VIEW.y + VIEW.height);
      }
      const near = pins.filter((p) => distanceKm(unproject(p), q) < 150).length;
      expect(near, q.id).toBeGreaterThanOrEqual(10);
    }
  });
});

describe('prizes and points', () => {
  it('awards gold, silver and bronze for 20, 19 and 18 out of 20', () => {
    expect(medalFor(20)).toBe('gold');
    expect(medalFor(19)).toBe('silver');
    expect(medalFor(18)).toBe('bronze');
    expect(medalFor(17)).toBeNull();
    expect(medalFor(0)).toBeNull();
  });

  it('rewards streaks and halves the base after a help', () => {
    expect(pointsFor(false, 0, false)).toBe(0);
    expect(pointsFor(true, 1, false)).toBe(100);
    expect(pointsFor(true, 3, false)).toBe(120);
    expect(pointsFor(true, 20, false)).toBe(150);
    expect(pointsFor(true, 1, true)).toBe(50);
  });

  it('keeps the best score and the highest medal ever won', () => {
    const gold = { correct: 20, points: 2600, medal: 'gold' as const };
    const weaker = { correct: 15, points: 1600, medal: null };
    expect(mergeBest(gold, weaker)).toEqual(gold);
    expect(mergeBest(undefined, weaker)).toEqual(weaker);
    expect(mergeBest({ correct: 18, points: 2000, medal: 'bronze' }, { correct: 19, points: 1900, medal: 'silver' }).medal).toBe('silver');
  });
});

describe('Greek capitals', () => {
  it('drops the tonos and keeps the dialytika', () => {
    expect(caps('Δίπλωμα Τιμής', 'el')).toBe('ΔΙΠΛΩΜΑ ΤΙΜΗΣ');
    expect(caps('Αργυρό Μετάλλιο · Φρουρός της Πίνδου', 'el')).toBe('ΑΡΓΥΡΟ ΜΕΤΑΛΛΙΟ · ΦΡΟΥΡΟΣ ΤΗΣ ΠΙΝΔΟΥ');
    expect(caps('Προϊστορία, ΐ', 'el')).toBe('ΠΡΟΪΣΤΟΡΙΑ, Ϊ');
    expect(caps('Hero of ’40', 'en')).toBe('HERO OF ’40');
  });
});

describe('geography', () => {
  it('measures real distances', () => {
    const athens = { lat: 37.98, lon: 23.73 };
    const thessaloniki = { lat: 40.64, lon: 22.94 };
    expect(distanceKm(athens, thessaloniki)).toBeGreaterThan(295);
    expect(distanceKm(athens, thessaloniki)).toBeLessThan(310);
  });

  it('points the way for the Second chance', () => {
    const athens = { lat: 37.98, lon: 23.73 };
    expect(compassTo(athens, { lat: 40.64, lon: 22.94 })).toBe('n');
    expect(compassTo({ lat: 40.64, lon: 22.94 }, athens)).toBe('s');
    expect(compassTo({ lat: 39.67, lon: 20.85 }, athens)).toBe('se');
    expect(compassTo(athens, { lat: 39.62, lon: 19.92 })).toBe('nw');
    expect(compassTo(athens, { lat: 37.98, lon: 26 })).toBe('e');
  });

  it('offsets a point by kilometres', () => {
    const athens = { lat: 37.98, lon: 23.73 };
    expect(distanceKm(athens, offsetKm(athens, 0, 100))).toBeCloseTo(100, 0);
    expect(distanceKm(athens, offsetKm(athens, 60, -80))).toBeCloseTo(100, 0);
  });

  it('round-trips map coordinates', () => {
    const back = unproject(project(40.62, 20.78));
    expect(back.lat).toBeCloseTo(40.62, 6);
    expect(back.lon).toBeCloseTo(20.78, 6);
  });
});
