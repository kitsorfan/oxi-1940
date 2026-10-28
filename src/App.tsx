import { useEffect, useMemo, useState } from 'react';
import { About } from './components/About';
import { Home } from './components/Home';
import { FlagMark, SoundIcon } from './components/Icons';
import { Quiz, type AnswerRecord } from './components/Quiz';
import { Results } from './components/Results';
import { chapters } from './data/chapters';
import { buildRound, medalFor, type RoundItem } from './game/engine';
import { isBetter, loadProgress, saveResult, type Progress } from './game/progress';
import { isMuted, setMuted, sfx } from './game/sound';
import { LangContext, makeLangValue } from './i18n/LangContext';
import { AUTHOR_URL, detectLang, strings } from './i18n/strings';
import type { L, Lang } from './types';

type Screen =
  | { name: 'home' }
  | { name: 'about' }
  | { name: 'quiz'; modeId: string; round: RoundItem[]; run: number }
  | { name: 'results'; modeId: string; records: AnswerRecord[]; points: number; isNewBest: boolean };

const titleFor = (modeId: string): L => chapters.find((c) => c.id === modeId)?.title ?? strings.mixedTitle;

export function App() {
  const [lang, setLangState] = useState<Lang>(detectLang);
  const [screen, setScreen] = useState<Screen>({ name: 'home' });
  const [progress, setProgress] = useState<Progress>(loadProgress);
  const [muted, setMutedState] = useState(isMuted);
  const value = useMemo(() => makeLangValue(lang, setLangState), [lang]);

  const toggleSound = () => {
    setMuted(!muted);
    setMutedState(!muted);
    if (muted) sfx.tick();
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = `${strings.appName[lang]} · ${strings.tagline[lang]}`;
    try {
      localStorage.setItem('oxi1940:lang', lang);
    } catch {
      // Not remembering the language is fine.
    }
  }, [lang]);

  // Give the phone's back button somewhere to go: every screen but home is one history entry deep.
  useEffect(() => {
    const onPop = () => setScreen({ name: 'home' });
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const go = (next: Screen) => {
    if (next.name === 'home') {
      if (window.history.state?.oxi) window.history.back();
      else setScreen(next);
    } else {
      if (!window.history.state?.oxi) window.history.pushState({ oxi: true }, '');
      setScreen(next);
    }
    window.scrollTo({ top: 0 });
  };

  const start = (modeId: string) => {
    void sfx.start();
    go({ name: 'quiz', modeId, round: buildRound(modeId, chapters), run: Date.now() });
  };

  const finish = (modeId: string, records: AnswerRecord[], points: number) => {
    const correct = records.filter((r) => r.ok).length;
    const result = { correct, points, medal: medalFor(correct, records.length) };
    // A bugle charge for a medal, a quieter call otherwise.
    if (result.medal) void sfx.medal();
    else sfx.finish();
    const isNewBest = isBetter(result, progress[modeId]);
    setProgress(saveResult(progress, modeId, result));
    go({ name: 'results', modeId, records, points, isNewBest });
  };

  const home = () => {
    if (screen.name === 'quiz' && !window.confirm(strings.quitConfirm[lang])) return;
    go({ name: 'home' });
  };

  return (
    <LangContext.Provider value={value}>
      <header className="topbar">
        <div className="topbar__inner">
          <button type="button" className="brand" onClick={home}>
            <FlagMark />
            <span className="brand__name">{strings.appName[lang]}</span>
          </button>
          <div className="topbar__tools">
            <button
              type="button"
              className="sound-btn"
              onClick={toggleSound}
              aria-pressed={!muted}
              aria-label={muted ? strings.soundOff[lang] : strings.soundOn[lang]}
              title={muted ? strings.soundOff[lang] : strings.soundOn[lang]}
            >
              <SoundIcon muted={muted} />
            </button>
            <div className="lang" role="group" aria-label="Language">
              {(['en', 'el'] as const).map((l) => (
                <button key={l} type="button" className={l === lang ? 'lang__btn lang__btn--on' : 'lang__btn'} onClick={() => setLangState(l)} aria-pressed={l === lang}>
                  {l === 'en' ? 'EN' : 'ΕΛ'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className={`main main--${screen.name}`}>
        {screen.name === 'home' && <Home progress={progress} onPlay={start} />}
        {screen.name === 'about' && <About onBack={() => go({ name: 'home' })} />}
        {screen.name === 'quiz' && (
          <Quiz
            key={screen.run}
            title={titleFor(screen.modeId)}
            round={screen.round}
            onQuit={() => go({ name: 'home' })}
            onFinish={(records, points) => finish(screen.modeId, records, points)}
          />
        )}
        {screen.name === 'results' && (
          <Results
            title={titleFor(screen.modeId)}
            records={screen.records}
            points={screen.points}
            isNewBest={screen.isNewBest}
            onReplay={() => start(screen.modeId)}
            onHome={() => go({ name: 'home' })}
          />
        )}
      </main>

      {screen.name !== 'quiz' && (
        <footer className="footer">
          <p>
            {lang === 'el' ? 'Φωτογραφίες και χάρτες: Wikimedia Commons' : 'Photos and maps: Wikimedia Commons'} ·{' '}
            <button type="button" className="link" onClick={() => go({ name: 'about' })}>
              {strings.aboutTitle[lang]}
            </button>
          </p>
          <p>
            {strings.madeBy[lang]} Kitsos Orfanopoulos (<a href={AUTHOR_URL}>www.kitsorfan.com</a>) · 28.10.{new Date().getFullYear()}
          </p>
        </footer>
      )}
    </LangContext.Provider>
  );
}

