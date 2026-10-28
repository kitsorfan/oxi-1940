// The first communiqué of the Greek General Headquarters, as broadcast on the morning of
// 28 October 1940. A public-domain archive recording, taken from a copy shared on YouTube.
import type { L } from '../types';

export const BULLETIN_TITLE: L = {
  el: 'Ανακοινωθέν του Γενικού Στρατηγείου, 28 Οκτωβρίου 1940',
  en: 'Communiqué of the General Headquarters, 28 October 1940',
};

/** The text of the communiqué, and the second of the recording at which each line is read. */
export const BULLETIN: { text: L; at: number }[] = [
  {
    at: 13.8,
    text: {
      el: 'Αι ιταλικαί στρατιωτικαί δυνάμεις προσβάλλουν από της 5:30 πρωινής της σήμερον τα ημέτερα τμήματα προκαλύψεως της ελληνοαλβανικής μεθορίου.',
      en: 'Since 5:30 this morning, the Italian military forces have been attacking our covering units on the Greek–Albanian border.',
    },
  },
  {
    at: 29,
    text: {
      el: 'Αι ημέτεραι δυνάμεις αμύνονται του πατρίου εδάφους.',
      en: 'Our forces are defending the soil of the fatherland.',
    },
  },
];

/** Credited, with its source, in src/data/sounds.ts. */
export const RECORDING = {
  src: 'communique-1940.m4a',
};

/** Which line is being read at `time` seconds: -1 for the opening announcement. */
export function lineAt(time: number): number {
  let line = -1;
  BULLETIN.forEach((l, i) => {
    if (time >= l.at) line = i;
  });
  return line;
}
