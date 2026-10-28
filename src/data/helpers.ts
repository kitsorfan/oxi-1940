import type { ChoiceQuestion, L, MapQuestion } from '../types';

export const t = (en: string, el: string): L => ({ en, el });

export const choice = (q: Omit<ChoiceQuestion, 'kind'>): ChoiceQuestion => ({ kind: 'choice', ...q });

export const map = (q: Omit<MapQuestion, 'kind' | 'radiusKm'> & { radiusKm?: number }): MapQuestion => ({
  kind: 'map',
  radiusKm: 35,
  ...q,
});
