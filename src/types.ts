import type { ImageSlug } from './data/images';

export type Lang = 'en' | 'el';

/** A piece of text in both languages. */
export type L = Record<Lang, string>;

interface BaseQuestion {
  id: string;
  prompt: L;
  /** Shown after answering: the history behind the question. */
  fact: L;
}

export interface ChoiceQuestion extends BaseQuestion {
  kind: 'choice';
  answer: L;
  wrong: [L, L, L];
  image?: ImageSlug;
  /** Greek-labelled variant of `image`, when one exists. */
  imageEl?: ImageSlug;
}

export interface MapQuestion extends BaseQuestion {
  kind: 'map';
  /** Name of the place, revealed on the map after answering. */
  place: L;
  lat: number;
  lon: number;
  /** A tap within this distance of the target counts as correct. */
  radiusKm: number;
}

export type Question = ChoiceQuestion | MapQuestion;

export interface Chapter {
  id: string;
  title: L;
  period: L;
  blurb: L;
  cover: ImageSlug;
  questions: Question[];
}
