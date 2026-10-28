import type { Medal } from './engine';

/** Light, base and dark tones of each medal, shared by the SVG medal and the certificate. */
export const MEDAL_TONES: Record<Medal, [string, string, string]> = {
  gold: ['#fbe7a1', '#d9a91a', '#8c6508'],
  silver: ['#f4f6f8', '#b7bfc7', '#6f7984'],
  bronze: ['#f3c39b', '#b8743f', '#6f3f1b'],
};
