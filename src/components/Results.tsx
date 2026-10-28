import { useState } from 'react';
import { renderCertificate } from '../game/certificate';
import { medalFor, type Medal } from '../game/engine';
import { shareLinks } from '../game/share';
import { useLang } from '../i18n/LangContext';
import { SITE_URL, fill } from '../i18n/strings';
import type { L } from '../types';
import { Confetti } from './Confetti';
import { ArrowIcon, CheckIcon, CrossIcon, DownloadIcon, LinkedInIcon } from './Icons';
import { MedalBadge } from './MedalBadge';
import type { AnswerRecord } from './Quiz';
import { ShareMenu } from './ShareMenu';

interface Props {
  title: L;
  records: AnswerRecord[];
  points: number;
  isNewBest: boolean;
  onReplay: () => void;
  onHome: () => void;
}

const NAME_KEY = 'oxi1940:name';
const MEDAL_TEXT = {
  gold: ['medalGold', 'rankGold'],
  silver: ['medalSilver', 'rankSilver'],
  bronze: ['medalBronze', 'rankBronze'],
} as const;

function savedName(): string {
  try {
    return localStorage.getItem(NAME_KEY) ?? '';
  } catch {
    return '';
  }
}

export function Results({ title, records, points, isNewBest, onReplay, onHome }: Props) {
  const { lang, pick, s } = useLang();
  const [name, setName] = useState(savedName);
  const [busy, setBusy] = useState(false);
  const total = records.length;
  const correct = records.filter((r) => r.ok).length;
  const medal = medalFor(correct, total);

  const message =
    correct === total ? s('msgPerfect') : medal ? s('msgMedal') : correct >= total - 6 ? s('msgClose') : correct >= total / 2 ? s('msgGood') : s('msgLow');

  const medalName = (m: Medal) => `${s(MEDAL_TEXT[m][0])} · ${s(MEDAL_TEXT[m][1])}`;
  const shareText = fill(s('shareText'), {
    n: correct,
    total,
    medal: medal ? ` (${s(MEDAL_TEXT[medal][0])})` : '',
  });

  const certificate = async () => {
    if (!medal) return null;
    try {
      localStorage.setItem(NAME_KEY, name.trim());
    } catch {
      // Remembering the name is optional.
    }
    const blob = await renderCertificate({ name: name.trim(), modeTitle: pick(title), correct, total, medal, lang });
    return new File([blob], 'oxi-1940-certificate.png', { type: 'image/png' });
  };

  const download = async () => {
    setBusy(true);
    try {
      const file = await certificate();
      if (!file) return;
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      a.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 2000);
    } finally {
      setBusy(false);
    }
  };

  const linkedIn = shareLinks(shareText, SITE_URL, s('appName')).linkedin;

  return (
    <div className="results">
      {medal && <Confetti pieces={medal === 'gold' ? 140 : 90} />}
      <section className={`card results__hero ${medal ? `results__hero--${medal}` : ''}`}>
        <p className="results__kicker">{s('resultsTitle')}</p>
        <h1 className="results__mode">{pick(title)}</h1>
        {medal ? (
          <div className="results__medal">
            <MedalBadge medal={medal} size={110} label={medalName(medal)} />
            <p className="results__medal-name">{medalName(medal)}</p>
          </div>
        ) : null}
        <p className="results__score">
          <span className="results__big">{correct}</span>
          <span className="results__of">/{total}</span>
        </p>
        <p className="results__line">{fill(s('youScored'), { n: correct, total })}</p>
        <p className="results__points">
          {fill(s('totalPoints'), { n: points })}
          {isNewBest && <span className="badge">{s('newBest')}</span>}
        </p>
        <p className="results__message">{message}</p>

        {medal && (
          <div className="cert">
            <h2>{s('certTitle')}</h2>
            <p>{s('certText')}</p>
            <label className="field">
              <span className="sr-only">{s('certName')}</span>
              <input
                type="text"
                value={name}
                maxLength={48}
                placeholder={s('certName')}
                autoComplete="name"
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <button type="button" className="btn btn--gold btn--block" onClick={download} disabled={!name.trim() || busy}>
              <DownloadIcon /> {s('certDownload')}
            </button>
          </div>
        )}

        <div className="results__share">
          <ShareMenu text={shareText} getFile={medal && name.trim() ? certificate : undefined} />
          <a className="btn btn--linkedin" href={linkedIn} target="_blank" rel="noreferrer">
            <LinkedInIcon /> {s('shareLinkedIn')}
          </a>
        </div>

        <div className="results__actions">
          <button type="button" className="btn btn--primary" onClick={onReplay}>
            {s('playAgain')} <ArrowIcon />
          </button>
          <button type="button" className="btn btn--ghost" onClick={onHome}>
            {s('backHome')}
          </button>
        </div>
      </section>

      <section className="card review" aria-labelledby="review-title">
        <h2 id="review-title">{s('review')}</h2>
        <ol className="review__list">
          {records.map((r, i) => (
            <li key={r.id} className={r.ok ? 'review__item review__item--ok' : 'review__item review__item--bad'}>
              <span className="review__mark">{r.ok ? <CheckIcon /> : <CrossIcon />}</span>
              <span className="review__text">
                <span className="review__q">
                  {i + 1}. {pick(r.prompt)}
                </span>
                <span className="review__a">
                  {pick(r.answer)}
                  {r.km !== undefined && ` · ${fill(s('kmAway'), { km: r.km })}`}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
