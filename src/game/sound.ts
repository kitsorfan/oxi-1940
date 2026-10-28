// Sound effects. The two bugle calls are real recordings (see src/data/sounds.ts);
// everything else is synthesised with the Web Audio API, so it costs no downloads.

const MUTE_KEY = 'oxi1940:muted';
const CLIPS = { attention: 'attention.wav', charge: 'charge.wav' } as const;
type Clip = keyof typeof CLIPS;

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let muted = readMuted();
const buffers = new Map<Clip, Promise<AudioBuffer | null>>();
const playing = new Set<AudioScheduledSourceNode>();

function readMuted(): boolean {
  try {
    return localStorage.getItem(MUTE_KEY) === '1';
  } catch {
    return false;
  }
}

export const isMuted = () => muted;

export function setMuted(value: boolean) {
  muted = value;
  try {
    localStorage.setItem(MUTE_KEY, value ? '1' : '0');
  } catch {
    // The preference just won't be remembered.
  }
  if (value) {
    for (const node of playing) node.stop();
    playing.clear();
  }
}

/** The audio context, created on the first user gesture that makes a sound. */
function audio(): AudioContext | null {
  if (muted || typeof AudioContext === 'undefined') return null;
  if (!ctx) {
    ctx = new AudioContext();
    master = ctx.createGain();
    master.gain.value = 0.55;
    master.connect(ctx.destination);
    for (const name of Object.keys(CLIPS) as Clip[]) load(name);
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

function load(name: Clip): Promise<AudioBuffer | null> {
  let buffer = buffers.get(name);
  if (!buffer) {
    buffer = fetch(`${import.meta.env.BASE_URL}sounds/${CLIPS[name]}`)
      .then((r) => r.arrayBuffer())
      .then((bytes) => ctx!.decodeAudioData(bytes))
      .catch(() => null);
    buffers.set(name, buffer);
  }
  return buffer;
}

function track(node: AudioScheduledSourceNode) {
  playing.add(node);
  node.onended = () => playing.delete(node);
}

async function clip(name: Clip, volume = 1) {
  const ac = audio();
  if (!ac || !master) return;
  const buffer = await load(name);
  if (!buffer || muted) return;
  const src = ac.createBufferSource();
  const gain = ac.createGain();
  gain.gain.value = volume;
  src.buffer = buffer;
  src.connect(gain).connect(master);
  track(src);
  src.start();
}

interface ToneOptions {
  type?: OscillatorType;
  volume?: number;
  slideTo?: number;
}

function tone(ac: AudioContext, freq: number, at: number, dur: number, { type = 'sine', volume = 0.3, slideTo }: ToneOptions = {}) {
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, at);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, at + dur);
  gain.gain.setValueAtTime(0.0001, at);
  gain.gain.exponentialRampToValueAtTime(volume, at + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  osc.connect(gain).connect(master!);
  track(osc);
  osc.start(at);
  osc.stop(at + dur + 0.02);
}

/** One note of a synthesised bugle: a buzzy tone that brightens as it is blown, with a small pitch scoop. */
function bugleNote(ac: AudioContext, freq: number, at: number, dur: number, volume = 0.22) {
  const osc = ac.createOscillator();
  const filter = ac.createBiquadFilter();
  const gain = ac.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(freq * 0.97, at);
  osc.frequency.exponentialRampToValueAtTime(freq, at + 0.04);
  filter.type = 'lowpass';
  filter.Q.value = 1.2;
  filter.frequency.setValueAtTime(500, at);
  filter.frequency.exponentialRampToValueAtTime(3200, at + 0.05);
  filter.frequency.exponentialRampToValueAtTime(1600, at + dur);
  gain.gain.setValueAtTime(0.0001, at);
  gain.gain.exponentialRampToValueAtTime(volume, at + 0.03);
  gain.gain.setValueAtTime(volume, at + dur * 0.7);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  osc.connect(filter).connect(gain).connect(master!);
  track(osc);
  osc.start(at);
  osc.stop(at + dur + 0.02);
}

/** A notes-of-the-bugle flourish: a bugle can only play the harmonics G4, C5, E5, G5. */
function bugleCall(notes: [number, number][]) {
  const ac = audio();
  if (!ac) return;
  let at = ac.currentTime + 0.02;
  for (const [freq, dur] of notes) {
    bugleNote(ac, freq, at, dur);
    at += dur * 0.92;
  }
}

const G4 = 392;
const C5 = 523.25;
const E5 = 659.25;
const G5 = 783.99;

function vibrate(ms: number) {
  if (!muted && 'vibrate' in navigator) navigator.vibrate(ms);
}

export const sfx = {
  /** The real bugle call “Attention” as a game begins. */
  start: () => clip('attention', 0.8),
  /** The real “Charge” for a medal. */
  medal: () => clip('charge'),
  correct() {
    const ac = audio();
    if (!ac) return;
    const t = ac.currentTime;
    tone(ac, 1046.5, t, 0.16, { type: 'triangle', volume: 0.28 });
    tone(ac, 1568, t + 0.08, 0.3, { type: 'triangle', volume: 0.24 });
  },
  wrong() {
    const ac = audio();
    if (!ac) return;
    const t = ac.currentTime;
    tone(ac, 220, t, 0.32, { type: 'square', volume: 0.09, slideTo: 130 });
    tone(ac, 110, t, 0.35, { type: 'sine', volume: 0.3, slideTo: 70 });
    vibrate(60);
  },
  /** A short bugle flourish for every third correct answer in a row. */
  streak: () =>
    bugleCall([
      [G4, 0.11],
      [C5, 0.11],
      [E5, 0.11],
      [G5, 0.38],
    ]),
  pin() {
    const ac = audio();
    if (ac) tone(ac, 520, ac.currentTime, 0.09, { volume: 0.22, slideTo: 880 });
  },
  /** A softer buzz when the Second chance catches a wrong answer. */
  miss() {
    const ac = audio();
    if (ac) tone(ac, 247, ac.currentTime, 0.22, { type: 'square', volume: 0.06, slideTo: 196 });
    vibrate(30);
  },
  /** A whoosh as a help is used. */
  help() {
    const ac = audio();
    if (!ac || !master) return;
    const t = ac.currentTime;
    const noise = ac.createBuffer(1, ac.sampleRate * 0.45, ac.sampleRate);
    const data = noise.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const src = ac.createBufferSource();
    const filter = ac.createBiquadFilter();
    const gain = ac.createGain();
    src.buffer = noise;
    filter.type = 'bandpass';
    filter.Q.value = 2;
    filter.frequency.setValueAtTime(300, t);
    filter.frequency.exponentialRampToValueAtTime(3500, t + 0.4);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.5, t + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
    src.connect(filter).connect(gain).connect(master);
    track(src);
    src.start(t);
    tone(ac, 660, t + 0.3, 0.18, { type: 'triangle', volume: 0.15 });
  },
  /** A few taps of a telegraph key. */
  telegram() {
    const ac = audio();
    if (!ac) return;
    let at = ac.currentTime + 0.02;
    for (const dur of [0.18, 0.18, 0.06]) {
      tone(ac, 750, at, dur, { volume: 0.12 });
      at += dur + 0.07;
    }
  },
  tick() {
    const ac = audio();
    if (ac) tone(ac, 1400, ac.currentTime, 0.04, { type: 'triangle', volume: 0.08 });
  },
  /** A gentle two-note call when a game ends without a medal. */
  finish: () =>
    bugleCall([
      [C5, 0.22],
      [G4, 0.6],
    ]),
  /** A rising call as the player leaves the welcome screen. */
  ready: () =>
    bugleCall([
      [C5, 0.14],
      [E5, 0.14],
      [G5, 0.5],
    ]),
};

/**
 * Old-radio static for the 1940 bulletin: a tuning whistle, then a low crackle
 * that runs until the returned function stops it. Null when sound is off.
 */
export function radioStatic(): (() => void) | null {
  const ac = audio();
  if (!ac || !master) return null;
  const t = ac.currentTime;
  // Two seconds of brown noise with the odd pop, looped.
  const buffer = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < data.length; i++) {
    last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02;
    data[i] = last * 3.5 + (Math.random() < 0.0006 ? Math.random() - 0.5 : 0);
  }
  const src = ac.createBufferSource();
  const band = ac.createBiquadFilter();
  const gain = ac.createGain();
  src.buffer = buffer;
  src.loop = true;
  band.type = 'bandpass';
  band.frequency.value = 1700;
  band.Q.value = 0.6;
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(0.55, t + 0.12);
  gain.gain.exponentialRampToValueAtTime(0.1, t + 1.5);
  src.connect(band).connect(gain).connect(master);
  track(src);
  src.start(t);
  tone(ac, 2300, t + 0.05, 1.2, { volume: 0.05, slideTo: 440 });
  return () => {
    const now = ac.currentTime;
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(Math.max(gain.gain.value, 0.0002), now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
    src.stop(now + 0.45);
  };
}
