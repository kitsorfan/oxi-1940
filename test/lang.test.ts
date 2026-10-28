import { describe, expect, it } from 'vitest';
import { pickLang } from '../src/i18n/strings';

const none = { param: null, choice: null };

describe('language detection', () => {
  it('picks Greek for a Greek browser', () => {
    expect(pickLang({ ...none, languages: ['el-GR', 'en'] })).toBe('el');
    expect(pickLang({ ...none, languages: ['el'] })).toBe('el');
  });

  it('picks Greek when Greek is any of the browser’s languages', () => {
    expect(pickLang({ ...none, languages: ['en-US', 'en', 'el'] })).toBe('el');
  });

  it('picks Greek for a clock set to Greece or Cyprus', () => {
    expect(pickLang({ ...none, languages: ['en-GB'], timeZone: 'Europe/Athens' })).toBe('el');
    expect(pickLang({ ...none, languages: ['en-US'], timeZone: 'Asia/Nicosia' })).toBe('el');
  });

  it('picks English for everyone else', () => {
    expect(pickLang({ ...none, languages: ['en-US'], timeZone: 'America/New_York' })).toBe('en');
    expect(pickLang({ ...none, languages: ['de-DE', 'fr'], timeZone: 'Europe/Berlin' })).toBe('en');
    expect(pickLang({ ...none, languages: [] })).toBe('en');
  });

  it('lets a link, then the visitor’s own choice, override detection', () => {
    expect(pickLang({ param: 'en', choice: 'el', languages: ['el-GR'], timeZone: 'Europe/Athens' })).toBe('en');
    expect(pickLang({ param: null, choice: 'en', languages: ['el-GR'] })).toBe('en');
    expect(pickLang({ param: null, choice: 'el', languages: ['en-US'] })).toBe('el');
    expect(pickLang({ param: 'xx', choice: 'zz', languages: ['el'] })).toBe('el');
  });
});
