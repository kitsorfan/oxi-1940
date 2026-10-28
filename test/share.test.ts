import { describe, expect, it } from 'vitest';
import { sounds } from '../src/data/sounds';
import { shareLinks } from '../src/game/share';

describe('share links', () => {
  const links = shareLinks('I scored 20/20 — «ΟΧΙ»!', 'https://kitsorfan.github.io/oxi-1940/', 'ΟΧΙ 1940');

  it('builds a link for every app', () => {
    expect(Object.keys(links).sort()).toEqual(['email', 'facebook', 'linkedin', 'messenger', 'telegram', 'viber', 'whatsapp', 'x']);
  });

  it('puts the encoded message and URL in each link', () => {
    const url = encodeURIComponent('https://kitsorfan.github.io/oxi-1940/');
    for (const [app, link] of Object.entries(links)) expect(link, app).toContain(url);
    expect(decodeURIComponent(links.whatsapp)).toContain('I scored 20/20 — «ΟΧΙ»! https://kitsorfan.github.io/oxi-1940/');
    expect(links.viber.startsWith('viber://forward?text=')).toBe(true);
    expect(links.email.startsWith('mailto:?subject=')).toBe(true);
  });
});

describe('sounds', () => {
  it('ships every credited recording, and only those', () => {
    const files = Object.keys(import.meta.glob('../public/sounds/*')).map((path) => path.slice(path.lastIndexOf('/') + 1));
    expect(files.sort()).toEqual(sounds.map((sound) => sound.name).sort());
  });
});
