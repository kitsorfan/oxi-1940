import { chapters } from '../data/chapters';
import { MIXED_ID, ROUND_SIZE } from '../game/engine';
import type { Progress } from '../game/progress';
import { useLang } from '../i18n/LangContext';
import { imageUrl } from './Figure';
import { ArrowIcon, PinIcon, SplitIcon, StarIcon } from './Icons';
import { MedalBadge } from './MedalBadge';
import { ShareMenu } from './ShareMenu';

interface Props {
  progress: Progress;
  onPlay: (modeId: string) => void;
}

export function Home({ progress, onPlay }: Props) {
  const { pick, s } = useLang();
  const modes = [...chapters.map((c) => c.id), MIXED_ID];
  const medalsWon = modes.filter((id) => progress[id]?.medal).length;

  const bestLine = (id: string) => {
    const best = progress[id];
    return best ? `${s('best')}: ${best.correct}/${ROUND_SIZE}` : s('notPlayed');
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero__inner">
          <p className="hero__eyebrow">28 · X · 1940</p>
          <h1 className="hero__title">
            <span className="hero__oxi">ΟΧΙ</span>
            <span className="hero__sub">{s('tagline')}</span>
          </h1>
          <p className="hero__text">{s('heroText')}</p>
          <ul className="rules">
            <li>
              <StarIcon /> {s('ruleQuestions')}
            </li>
            <li>
              <SplitIcon /> {s('ruleLifeline')}
            </li>
            <li>
              <PinIcon /> {s('ruleMaps')}
            </li>
            <li>
              <MedalBadge medal="gold" size={16} /> {s('ruleMedals')}
            </li>
          </ul>
          <div className="hero__cta">
            <ShareMenu text={s('shareInvite')} className="btn btn--outline-light btn--lg" label={s('shareGame')} />
            <button type="button" className="btn btn--gold btn--lg" onClick={() => onPlay(MIXED_ID)}>
              {s('heroTitle')} <ArrowIcon />
            </button>
          </div>
        </div>
      </section>

      <section className="section cabinet" aria-labelledby="cabinet-title">
        <div className="section__head">
          <h2 id="cabinet-title">{s('cabinetTitle')}</h2>
          <span className="cabinet__count">
            {medalsWon}/{modes.length}
          </span>
        </div>
        <ul className="cabinet__slots">
          {modes.map((id, i) => (
            <li key={id} className="cabinet__slot">
              <MedalBadge medal={progress[id]?.medal ?? null} size={40} />
              <span>{id === MIXED_ID ? '★' : i + 1}</span>
            </li>
          ))}
        </ul>
        {medalsWon === 0 && <p className="cabinet__empty">{s('cabinetEmpty')}</p>}
      </section>

      <section className="section" aria-labelledby="chapters-title">
        <div className="section__head">
          <h2 id="chapters-title">{s('chaptersTitle')}</h2>
        </div>
        <ul className="chapters">
          {chapters.map((c, i) => (
            <li key={c.id}>
              <button type="button" className="chapter" onClick={() => onPlay(c.id)}>
                <span className="chapter__cover">
                  <img src={imageUrl(c.cover)} alt="" loading="lazy" decoding="async" />
                  <span className="chapter__num">
                    {s('chapter')} {i + 1}
                  </span>
                  {progress[c.id]?.medal && (
                    <span className="chapter__medal">
                      <MedalBadge medal={progress[c.id]!.medal} size={34} />
                    </span>
                  )}
                </span>
                <span className="chapter__body">
                  <span className="chapter__period">{pick(c.period)}</span>
                  <span className="chapter__title">{pick(c.title)}</span>
                  <span className="chapter__blurb">{pick(c.blurb)}</span>
                  <span className="chapter__foot">
                    <span className="chapter__best">{bestLine(c.id)}</span>
                    <span className="chapter__play">
                      {s('play')} <ArrowIcon width={16} height={16} />
                    </span>
                  </span>
                </span>
              </button>
            </li>
          ))}
          <li>
            <button type="button" className="chapter chapter--mixed" onClick={() => onPlay(MIXED_ID)}>
              <span className="chapter__cover">
                <img src={imageUrl('soldier-mother')} alt="" loading="lazy" decoding="async" />
                <span className="chapter__num">★ 20 / 100</span>
                {progress[MIXED_ID]?.medal && (
                  <span className="chapter__medal">
                    <MedalBadge medal={progress[MIXED_ID]!.medal} size={34} />
                  </span>
                )}
              </span>
              <span className="chapter__body">
                <span className="chapter__period">{s('mixedPeriod')}</span>
                <span className="chapter__title">{s('mixedTitle')}</span>
                <span className="chapter__blurb">{s('mixedBlurb')}</span>
                <span className="chapter__foot">
                  <span className="chapter__best">{bestLine(MIXED_ID)}</span>
                  <span className="chapter__play">
                    {s('play')} <ArrowIcon width={16} height={16} />
                  </span>
                </span>
              </span>
            </button>
          </li>
        </ul>
      </section>
    </div>
  );
}
