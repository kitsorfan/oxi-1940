import { useEffect, useRef, useState } from 'react';
import { BULLETIN, BULLETIN_TITLE, RECORDING, lineAt } from '../game/radio';
import { radioStatic } from '../game/sound';
import { useLang } from '../i18n/LangContext';

type State = 'idle' | 'playing' | 'done';

/** A 1940 wireless set that plays the archive recording of the first communiqué of the war. */
export function RadioBulletin() {
  const { lang, pick, s } = useLang();
  const [state, setState] = useState<State>('idle');
  const [line, setLine] = useState(-1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const stopStatic = useRef<(() => void) | null>(null);

  const quietStatic = () => {
    stopStatic.current?.();
    stopStatic.current = null;
  };

  useEffect(() => quietStatic, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (state === 'playing') {
      audio.pause();
      quietStatic();
      setState('idle');
      return;
    }
    audio.currentTime = 0;
    setLine(-1);
    // play() must run inside the tap for phones to allow it. The recording opens with
    // a second of silence, which the tuning static fills.
    void audio.play().catch(() => setState('idle'));
    stopStatic.current = radioStatic();
    window.setTimeout(quietStatic, 1300);
    setState('playing');
  };

  return (
    <section className={`radio radio--${state}`} aria-label={s('radioTitle')}>
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}sounds/${RECORDING.src}`}
        preload="none"
        onTimeUpdate={(e) => setLine(lineAt(e.currentTarget.currentTime))}
        onEnded={() => {
          setLine(-1);
          setState('done');
        }}
      />
      <div className="radio__head">
        <button type="button" className="radio__set" onClick={toggle} aria-label={state === 'playing' ? s('radioStop') : s('radioPlay')} aria-pressed={state === 'playing'}>
          <svg viewBox="0 0 64 52" width="58" height="47" aria-hidden="true">
            <rect x="2" y="6" width="60" height="44" rx="10" className="radio__case" />
            <path d="M18 6 30 0M46 6 34 0" className="radio__antenna" />
            <circle cx="22" cy="28" r="13" className="radio__grille" />
            {[-8, -4, 0, 4, 8].map((dy) => (
              <path key={dy} d={`M${22 - Math.sqrt(169 - dy * dy) * 0.8} ${28 + dy}h${Math.sqrt(169 - dy * dy) * 1.6}`} className="radio__slot" />
            ))}
            <rect x="41" y="15" width="15" height="7" rx="2" className="radio__dial" />
            <circle cx="44.5" cy="36" r="4" className="radio__knob" />
            <circle cx="53" cy="36" r="4" className="radio__knob" />
          </svg>
          <span className="radio__play" aria-hidden="true">
            {state === 'playing' ? (
              <svg viewBox="0 0 12 12" width="12" height="12">
                <rect x="2" y="2" width="8" height="8" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 12 12" width="12" height="12">
                <path d="M3 1.5v9l7.5-4.5z" />
              </svg>
            )}
          </span>
        </button>
        <div className="radio__body">
          <p className="radio__title">
            {s('radioTitle')}
            {state === 'playing' && <span className="radio__onair">{s('radioOnAir')}</span>}
          </p>
          <button type="button" className="radio__cta" onClick={toggle}>
            {state === 'playing' ? s('radioStop') : s('radioPlay')}
          </button>
        </div>
      </div>

      <blockquote className="radio__text">
        <p className={`radio__heading ${state === 'playing' && line === -1 ? 'radio__line--on' : ''}`}>{pick(BULLETIN_TITLE)}</p>
        {BULLETIN.map((l, i) => (
          <p key={i} className={state === 'playing' && line === i ? 'radio__line--on' : undefined}>
            <span lang="el">{l.text.el}</span>
            {lang === 'en' && <span className="radio__en">{l.text.en}</span>}
          </p>
        ))}
      </blockquote>
      <p className="radio__note">
        {s('radioSource')}{' '}
        <a href={RECORDING.youtube} target="_blank" rel="noreferrer">
          YouTube
        </a>
      </p>
    </section>
  );
}
