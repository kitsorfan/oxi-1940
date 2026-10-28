import type { Lang } from '../types';
import { SITE_URL, caps, fill, strings } from '../i18n/strings';
import type { Medal } from './engine';
import { MEDAL_TONES } from './medals';

export interface CertificateData {
  name: string;
  modeTitle: string;
  correct: number;
  total: number;
  medal: Medal;
  lang: Lang;
}

const W = 1600;
const H = 1131;
const NAVY = '#0b2545';
const BLUE = '#0d5eaf';
const INK = '#1d2633';
const MUTED = '#5b6573';
const HEAD = '"Fira Sans Extra Condensed", "Arial Narrow", sans-serif';
const BODY = 'Literata, Georgia, serif';

const MEDAL_KEYS = {
  gold: ['medalGold', 'rankGold'],
  silver: ['medalSilver', 'rankSilver'],
  bronze: ['medalBronze', 'rankBronze'],
} as const;

/** Three thin blue stripes, like those of the flag. */
function stripeBand(ctx: CanvasRenderingContext2D, y: number) {
  ctx.fillStyle = BLUE;
  for (let i = 0; i < 3; i++) ctx.fillRect(120, y + i * 10, W - 240, 4);
}

function drawMedal(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, medal: Medal, label: string) {
  const [light, base, dark] = MEDAL_TONES[medal];
  // Ribbon in the colours of the flag.
  const stripes = [BLUE, '#ffffff', BLUE, '#ffffff', BLUE];
  const rw = r * 1.1;
  stripes.forEach((color, i) => {
    ctx.fillStyle = color;
    ctx.fillRect(cx - rw / 2 + (i * rw) / stripes.length, cy - r * 2.1, rw / stripes.length + 0.5, r * 1.3);
  });
  ctx.strokeStyle = 'rgba(11,37,69,.35)';
  ctx.lineWidth = 2;
  ctx.strokeRect(cx - rw / 2, cy - r * 2.1, rw, r * 1.3);

  const g = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.4, r * 0.1, cx, cy, r);
  g.addColorStop(0, light);
  g.addColorStop(0.55, base);
  g.addColorStop(1, dark);
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = g;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = dark;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.8, 0, Math.PI * 2);
  ctx.setLineDash([6, 6]);
  ctx.strokeStyle = 'rgba(255,255,255,.7)';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = dark;
  ctx.font = `800 ${Math.round(r * 0.55)}px ${HEAD}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, cx, cy + 2);
}

export async function renderCertificate(d: CertificateData): Promise<Blob> {
  const s = (key: keyof typeof strings) => (strings[key] as Record<Lang, string>)[d.lang];
  const [medalKey, rankKey] = MEDAL_KEYS[d.medal];
  const lines = {
    eyebrow: '28 · X · 1940',
    heading: s('certHeading'),
    scored: fill(s('certScored'), { n: d.correct, total: d.total }),
    medal: `${s(medalKey)} · ${s(rankKey)}`,
    footer: s('certFooter'),
  };
  const text = [d.name, d.modeTitle, ...Object.values(lines)].join(' ');
  await Promise.all([
    document.fonts.load(`800 96px "Fira Sans Extra Condensed"`, text),
    document.fonts.load(`600 40px "Fira Sans Extra Condensed"`, text),
    document.fonts.load(`italic 400 76px Literata`, text),
    document.fonts.load(`400 34px Literata`, text),
  ]).catch(() => undefined);

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  const bg = ctx.createRadialGradient(W / 2, H / 2, 100, W / 2, H / 2, W * 0.7);
  bg.addColorStop(0, '#fffcf4');
  bg.addColorStop(1, '#efe5cf');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = NAVY;
  ctx.lineWidth = 14;
  ctx.strokeRect(40, 40, W - 80, H - 80);
  ctx.lineWidth = 2;
  ctx.strokeRect(66, 66, W - 132, H - 132);
  stripeBand(ctx, 96);
  stripeBand(ctx, H - 96 - 24);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = BLUE;
  ctx.font = `600 34px ${HEAD}`;
  ctx.fillText(lines.eyebrow.split('').join(' '), W / 2, 196);

  ctx.fillStyle = NAVY;
  ctx.font = `800 104px ${HEAD}`;
  ctx.fillText(caps(lines.heading, d.lang), W / 2, 300);

  ctx.fillStyle = INK;
  ctx.font = `italic 400 76px ${BODY}`;
  let nameSize = 76;
  while (ctx.measureText(d.name).width > W - 420 && nameSize > 36) {
    nameSize -= 4;
    ctx.font = `italic 400 ${nameSize}px ${BODY}`;
  }
  ctx.fillText(d.name, W / 2, 420);
  ctx.strokeStyle = 'rgba(11,37,69,.35)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 420, 450);
  ctx.lineTo(W / 2 + 420, 450);
  ctx.stroke();

  ctx.fillStyle = MUTED;
  ctx.font = `400 34px ${BODY}`;
  ctx.fillText(lines.scored, W / 2, 512);
  ctx.fillStyle = NAVY;
  ctx.font = `700 52px ${HEAD}`;
  ctx.fillText(`«${d.modeTitle}»`, W / 2, 574);

  drawMedal(ctx, W / 2, 772, 84, d.medal, `${d.correct}/${d.total}`);

  ctx.fillStyle = NAVY;
  ctx.font = `700 40px ${HEAD}`;
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(caps(lines.medal, d.lang), W / 2, 910);

  ctx.fillStyle = MUTED;
  ctx.font = `400 24px ${BODY}`;
  ctx.textAlign = 'left';
  ctx.fillText(new Date().toLocaleDateString(d.lang === 'el' ? 'el-GR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }), 130, H - 150);
  ctx.textAlign = 'right';
  ctx.fillText(SITE_URL.replace(/^https:\/\//, '').replace(/\/$/, ''), W - 130, H - 150);
  ctx.textAlign = 'center';
  ctx.fillText(lines.footer, W / 2, H - 150);

  return new Promise((resolve, reject) =>
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('Could not render certificate'))), 'image/png'),
  );
}
