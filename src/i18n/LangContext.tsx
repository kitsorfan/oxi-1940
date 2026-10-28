import { createContext, useContext } from 'react';
import type { L, Lang } from '../types';
import { strings, type StringKey } from './strings';

interface LangValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** A UI string from the dictionary. */
  s: (key: Exclude<StringKey, 'correct' | 'wrong'>) => string;
  /** The current-language half of a bilingual text. */
  pick: (text: L) => string;
}

export const LangContext = createContext<LangValue | null>(null);

export function makeLangValue(lang: Lang, setLang: (lang: Lang) => void): LangValue {
  return {
    lang,
    setLang,
    s: (key) => strings[key][lang],
    pick: (text) => text[lang],
  };
}

export function useLang(): LangValue {
  const value = useContext(LangContext);
  if (!value) throw new Error('useLang must be used inside LangContext');
  return value;
}
