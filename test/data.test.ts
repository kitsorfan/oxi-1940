import { describe, expect, it } from 'vitest';
import { chapters } from '../src/data/chapters';
import { images, type ImageSlug } from '../src/data/images';
import { MAP, VIEW, project } from '../src/game/geo';
import type { L } from '../src/types';

const questions = chapters.flatMap((c) => c.questions);
const filled = (text: L) => text.en.trim().length > 0 && text.el.trim().length > 0;
const imageFiles = new Set(Object.keys(import.meta.glob('../public/img/*.webp')).map((path) => path.slice(path.lastIndexOf('/') + 1, -'.webp'.length)));

describe('question bank', () => {
  it('has five chapters of twenty questions, 100 in all', () => {
    expect(chapters).toHaveLength(5);
    for (const c of chapters) expect(c.questions, c.id).toHaveLength(20);
    expect(questions).toHaveLength(100);
  });

  it('uses unique ids', () => {
    const ids = questions.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(chapters.map((c) => c.id)).size).toBe(chapters.length);
  });

  it('has every text in English and Greek', () => {
    for (const c of chapters) {
      expect(filled(c.title) && filled(c.period) && filled(c.blurb), c.id).toBe(true);
    }
    for (const q of questions) {
      expect(filled(q.prompt), `${q.id} prompt`).toBe(true);
      expect(filled(q.fact), `${q.id} fact`).toBe(true);
      if (q.kind === 'choice') {
        expect([q.answer, ...q.wrong].every(filled), `${q.id} options`).toBe(true);
      } else {
        expect(filled(q.place), `${q.id} place`).toBe(true);
      }
    }
  });

  it('gives each choice question four distinct options in both languages', () => {
    for (const q of questions) {
      if (q.kind !== 'choice') continue;
      const options = [q.answer, ...q.wrong];
      for (const lang of ['en', 'el'] as const) {
        expect(new Set(options.map((o) => o[lang])).size, `${q.id} ${lang}`).toBe(4);
      }
    }
  });

  it('includes map questions in every chapter', () => {
    for (const c of chapters) {
      expect(c.questions.filter((q) => q.kind === 'map').length, c.id).toBeGreaterThanOrEqual(3);
    }
  });

  it('places every map target inside the visible part of the map', () => {
    for (const q of questions) {
      if (q.kind !== 'map') continue;
      const p = project(q.lat, q.lon);
      expect(p.x, q.id).toBeGreaterThan(VIEW.x);
      expect(p.x, q.id).toBeLessThan(VIEW.x + VIEW.width);
      expect(p.y, q.id).toBeGreaterThan(VIEW.y);
      expect(p.y, q.id).toBeLessThan(VIEW.y + VIEW.height);
      expect(q.radiusKm, q.id).toBeGreaterThan(0);
    }
  });
});

describe('images', () => {
  const used = new Set<string>([MAP.image, 'soldier-mother', ...chapters.map((c) => c.cover)]);
  for (const q of questions) {
    if (q.kind === 'choice') {
      if (q.image) used.add(q.image);
      if (q.imageEl) used.add(q.imageEl);
    }
  }

  it('has a file, caption and licence for every registered image', () => {
    for (const [slug, img] of Object.entries(images)) {
      expect(imageFiles.has(slug), slug).toBe(true);
      expect(filled(img.caption), slug).toBe(true);
      expect(img.license.length, slug).toBeGreaterThan(0);
      expect(img.author.length, slug).toBeGreaterThan(0);
    }
  });

  it('has no stray image files', () => {
    expect([...imageFiles].filter((slug) => !(slug in images))).toEqual([]);
  });

  it('uses every registered image and only registered images', () => {
    expect([...used].filter((slug) => !(slug in images))).toEqual([]);
    expect(Object.keys(images).filter((slug) => !used.has(slug as ImageSlug))).toEqual([]);
  });
});
