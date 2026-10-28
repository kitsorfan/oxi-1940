// Recordings from Wikimedia Commons, trimmed and converted to mono WAV.
// Both are works of the US armed forces and in the public domain.
import type { L } from '../types';

export interface SoundInfo {
  name: string;
  file: string;
  title: L;
  author: string;
  license: string;
}

export const sounds: SoundInfo[] = [
  {
    name: 'attention.wav',
    file: 'Attention (United States Marine Band version).ogg',
    title: { en: 'Bugle call “Attention”, played when a game starts', el: 'Σάλπισμα «Προσοχή», στην αρχή κάθε παιχνιδιού' },
    author: 'Sgt. Codie Lynn Williams, United States Marine Band',
    license: 'Public domain',
  },
  {
    name: 'charge.wav',
    file: 'Charge - Concert Band - United States Air Force Heritage of America Band.mp3',
    title: { en: 'Bugle call “Charge”, played when you win a medal', el: 'Σάλπισμα «Έφοδος», όταν κερδίζεις μετάλλιο' },
    author: 'United States Air Force Heritage of America Band',
    license: 'Public domain',
  },
];
