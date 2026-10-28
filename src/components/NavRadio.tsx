import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { BULLETIN, BULLETIN_TITLE, RECORDING, lineAt } from '../game/radio';
import { isMuted, onMuteChange, radioStatic, setRadioOn } from '../game/sound';
import { useLang } from '../i18n/LangContext';

/** waiting: the browser blocked autoplay, so it starts on the first tap. */
export type RadioState = 'waiting' | 'playing' | 'off';

export interface Radio {
  state: RadioState;
  /** The sentence being read, or -1 for the opening announcement. */
  line: number;
  toggle: () => void;
  stop: () => void;
}

/** Taps on these do their own thing and should not switch the radio on. */
const OWN_ACTION = '.radio-btn, .ticker__btn, .welcome__start, .sound-btn';

/**
 * The 1940 broadcast, played from the navbar. With `autoStart` it tries to play at once
 * and, if the browser wants a tap first, starts on the first tap or key press anywhere.
 */
export function useRadio(autoStart: boolean): Radio {
  const [state, setState] = useState<RadioState>(autoStart && !isMuted() ? 'waiting' : 'off');
  const [line, setLine] = useState(-1);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const stopStatic = useRef<(() => void) | null>(null);
  const waiting = useRef(false);

  const audio = () => {
    if (!audioRef.current) {
      const a = new Audio(`${import.meta.env.BASE_URL}sounds/${RECORDING.src}`);
      a.preload = autoStart ? 'auto' : 'none';
      a.ontimeupdate = () => setLine(lineAt(a.currentTime));
      a.onended = () => {
        setRadioOn(false);
        setLine(-1);
        setState('off');
      };
      audioRef.current = a;
    }
    return audioRef.current;
  };

  const quietStatic = () => {
    stopStatic.current?.();
    stopStatic.current = null;
  };

  const start = () => {
    if (isMuted()) return Promise.resolve(false);
    const a = audio();
    a.currentTime = 0;
    setLine(-1);
    // The recording opens with a second of silence, which the tuning static fills.
    quietStatic();
    stopStatic.current = radioStatic();
    window.setTimeout(quietStatic, 1300);
    return a.play().then(
      () => {
        waiting.current = false;
        setRadioOn(true);
        setState('playing');
        return true;
      },
      () => {
        quietStatic();
        return false;
      },
    );
  };

  const stop = () => {
    waiting.current = false;
    audioRef.current?.pause();
    quietStatic();
    setRadioOn(false);
    setState('off');
  };

  useEffect(() => {
    const offMute = onMuteChange((muted) => muted && stop());
    if (!autoStart || isMuted()) return offMute;
    waiting.current = true;
    setState('waiting');
    const onGesture = (e: Event) => {
      if (!waiting.current || (e.target instanceof Element && e.target.closest(OWN_ACTION))) return;
      waiting.current = false;
      void start();
    };
    void start();
    document.addEventListener('pointerdown', onGesture, true);
    document.addEventListener('keydown', onGesture, true);
    return () => {
      document.removeEventListener('pointerdown', onGesture, true);
      document.removeEventListener('keydown', onGesture, true);
      offMute();
      // Silence only; the state is left alone, as React may run this effect again at once.
      waiting.current = false;
      audioRef.current?.pause();
      quietStatic();
      setRadioOn(false);
    };
  }, []);

  return {
    state,
    line,
    stop,
    toggle: () => (state === 'playing' ? stop() : void start()),
  };
}

const RadioIcon = () => (
  <svg viewBox="0 0 64 52" width="24" height="20" aria-hidden="true">
    <rect x="2" y="6" width="60" height="44" rx="10" className="radio-btn__case" />
    <path d="M18 6 30 0M46 6 34 0" className="radio-btn__antenna" />
    <circle cx="22" cy="28" r="12" className="radio-btn__grille" />
    <rect x="41" y="15" width="15" height="7" rx="2" className="radio-btn__dial" />
    <circle cx="48.5" cy="36" r="5" className="radio-btn__knob" />
  </svg>
);

/** The wireless set in the navbar: switches the broadcast on and off. */
export function RadioButton({ radio }: { radio: Radio }) {
  const { s } = useLang();
  const on = radio.state === 'playing';
  return (
    <button
      type="button"
      className={`radio-btn ${on ? 'radio-btn--on' : ''}`}
      onClick={radio.toggle}
      aria-pressed={on}
      aria-label={on ? s('radioStop') : s('radioPlay')}
      title={on ? s('radioStop') : s('radioPlay')}
    >
      <RadioIcon />
      <span className="radio-btn__waves" aria-hidden="true" />
    </button>
  );
}

/** A thin “on air” strip under the navbar, with the sentence being read sliding along. */
export function RadioTicker({ radio }: { radio: Radio }) {
  const { pick, s } = useLang();
  const boxRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [slide, setSlide] = useState<{ shift: number; seconds: number } | null>(null);

  const text =
    radio.state === 'waiting' ? s('radioTap') : radio.line < 0 ? pick(BULLETIN_TITLE) : pick(BULLETIN[radio.line]!.text);

  // A line too long for the strip slides left, at a pace close to the reading.
  useLayoutEffect(() => {
    const box = boxRef.current;
    const el = textRef.current;
    if (!box || !el) return;
    const overflow = el.scrollWidth - box.clientWidth;
    setSlide(overflow > 4 ? { shift: -overflow, seconds: Math.max(4, overflow / 28) } : null);
  }, [text]);

  return (
    <div className={`ticker ticker--${radio.state}`} role="status">
      <div className="ticker__inner">
        {radio.state === 'playing' ? <span className="ticker__light">{s('radioOnAir')}</span> : <span className="ticker__station">1940</span>}
        <span className="ticker__box" ref={boxRef}>
          <span
            key={text}
            ref={textRef}
            className={`ticker__text ${slide ? 'ticker__text--slide' : ''}`}
            style={slide ? ({ '--shift': `${slide.shift}px`, '--slide': `${slide.seconds}s` } as CSSProperties) : undefined}
          >
            {text}
          </span>
        </span>
        <button
          type="button"
          className="ticker__btn"
          onClick={radio.state === 'playing' ? radio.stop : radio.toggle}
          aria-label={radio.state === 'playing' ? s('radioStop') : s('radioPlay')}
        >
          {radio.state === 'playing' ? (
            <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
              <rect x="2" y="2" width="8" height="8" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
              <path d="M3 1.5v9l7.5-4.5z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
