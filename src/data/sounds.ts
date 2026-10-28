// Recordings used by the game, all in the public domain. The bugle calls come from
// Wikimedia Commons (works of the US armed forces), trimmed and converted to mono WAV;
// the 1940 communiqué is an archive radio recording, taken from a copy on YouTube.
import type { L } from '../types';

export interface SoundInfo {
  name: string;
  title: L;
  author: string;
  license: string;
  /** Where the recording was taken from. */
  source: { label: string; url: string };
}

const commons = (file: string) => ({
  label: 'Wikimedia Commons',
  url: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replace(/ /g, '_'))}`,
});

export const sounds: SoundInfo[] = [
  {
    name: 'communique-1940.m4a',
    title: {
      en: 'Communiqué of the General Headquarters, 28 October 1940, played by the radio in the top bar',
      el: 'Ανακοινωθέν του Γενικού Στρατηγείου, 28 Οκτωβρίου 1940, από το ραδιόφωνο στην πάνω μπάρα',
    },
    author: 'Greek public radio, 1940',
    license: 'Public domain',
    source: { label: 'YouTube', url: 'https://www.youtube.com/watch?v=RnAPb6-UEFY' },
  },
  {
    name: 'attention.wav',
    title: { en: 'Bugle call “Attention”, played when a game starts', el: 'Σάλπισμα «Προσοχή», στην αρχή κάθε παιχνιδιού' },
    author: 'Sgt. Codie Lynn Williams, United States Marine Band',
    license: 'Public domain',
    source: commons('Attention (United States Marine Band version).ogg'),
  },
  {
    name: 'charge.wav',
    title: { en: 'Bugle call “Charge”, played when you win a medal', el: 'Σάλπισμα «Έφοδος», όταν κερδίζεις μετάλλιο' },
    author: 'United States Air Force Heritage of America Band',
    license: 'Public domain',
    source: commons('Charge - Concert Band - United States Air Force Heritage of America Band.mp3'),
  },
];
