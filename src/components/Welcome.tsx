import { useEffect, useRef, type CSSProperties } from 'react';
import { RECORDING } from '../game/radio';
import { sfx } from '../game/sound';
import { useLang } from '../i18n/LangContext';
import { AUTHOR_URL } from '../i18n/strings';
import { ArrowIcon, PinIcon, SplitIcon, StarIcon } from './Icons';
import { MedalBadge } from './MedalBadge';

const SEEN_KEY = 'oxi1940:welcomed';

/** Whether this browser has already closed the welcome screen. */
export function isWelcomeSeen(): boolean {
  try {
    return localStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

/** The first-visit splash: what the game is and how it is played. It sits under the top bar, so language and sound stay at hand. */
export function Welcome({ onClose }: { onClose: () => void }) {
  const { s } = useLang();
  const startRef = useRef<HTMLButtonElement>(null);

  const close = () => {
    sfx.ready();
    try {
      localStorage.setItem(SEEN_KEY, '1');
    } catch {
      // It will just greet the player again next time.
    }
    onClose();
  };

  useEffect(() => {
    startRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, []);

  const items = [
    { icon: <StarIcon />, title: s('ruleQuestions'), text: s('welcomeQuestions') },
    { icon: <SplitIcon />, title: s('ruleLifeline'), text: s('welcomeLifeline') },
    { icon: <PinIcon />, title: s('ruleMaps'), text: s('welcomeMaps') },
    { icon: <MedalBadge medal="gold" size={20} />, title: s('ruleMedals'), text: s('welcomeMedals') },
  ];

  return (
    <div className="welcome" role="dialog" aria-labelledby="welcome-title" aria-describedby="welcome-text">
      <div className="welcome__panel">
        <p className="hero__eyebrow">28 · X · 1940</p>
        <h1 id="welcome-title" className="welcome__title">
          {s('welcomeTitle')}
        </h1>
        <p id="welcome-text" className="welcome__text">
          {s('welcomeText')}
        </p>
        <ul className="welcome__list">
          {items.map((item, i) => (
            <li key={i} className="welcome__item" style={{ '--i': i } as CSSProperties}>
              <span className="welcome__icon">{item.icon}</span>
              <span>
                <strong>{item.title}</strong>
                <span className="welcome__desc">{item.text}</span>
              </span>
            </li>
          ))}
        </ul>
        <button ref={startRef} type="button" className="btn btn--gold btn--lg btn--block welcome__start" onClick={close}>
          {s('welcomeStart')} <ArrowIcon />
        </button>
        <p className="welcome__credit">
          {s('madeBy')} Kitsos Orfanopoulos (<a href={AUTHOR_URL}>www.kitsorfan.com</a>)
          <br />
          {s('radioSource')}{' '}
          <a href={RECORDING.youtube} target="_blank" rel="noreferrer">
            YouTube
          </a>
        </p>
      </div>
    </div>
  );
}
