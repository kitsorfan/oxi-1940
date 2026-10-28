import { useCallback, useEffect, useRef, useState } from 'react';
import { fiftyFifty, mapSplit, pointsFor, type MapSplit, type RoundItem } from '../game/engine';
import { distanceKm, project, unproject, type Point } from '../game/geo';
import { useLang } from '../i18n/LangContext';
import { fill, strings } from '../i18n/strings';
import type { L } from '../types';
import { Figure } from './Figure';
import { ArrowIcon, CheckIcon, CrossIcon, FlameIcon, PinIcon, SplitIcon, StarIcon } from './Icons';
import { MapPicker } from './MapPicker';

export interface AnswerRecord {
  id: string;
  prompt: L;
  answer: L;
  ok: boolean;
  km?: number;
}

interface Props {
  title: L;
  round: RoundItem[];
  onQuit: () => void;
  onFinish: (records: AnswerRecord[], points: number) => void;
}

const LETTERS = ['A', 'B', 'C', 'D'];
const randomOf = <T,>(list: readonly T[]) => list[Math.floor(Math.random() * list.length)]!;

export function Quiz({ title, round, onQuit, onFinish }: Props) {
  const { lang, pick, s } = useLang();
  const [index, setIndex] = useState(0);
  const [records, setRecords] = useState<AnswerRecord[]>([]);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [fiftyUsedAt, setFiftyUsedAt] = useState<number | null>(null);
  const [removed, setRemoved] = useState<number[]>([]);
  const [split, setSplit] = useState<MapSplit | null>(null);
  const [picked, setPicked] = useState<number | null>(null);
  const [guess, setGuess] = useState<Point | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [verdict, setVerdict] = useState<{ ok: boolean; text: string; gained: number; km?: number } | null>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement>(null);

  const item = round[index]!;
  const isLast = index === round.length - 1;
  const usedFiftyHere = fiftyUsedAt === index;

  const settle = useCallback(
    (ok: boolean, km?: number) => {
      const nextStreak = ok ? streak + 1 : 0;
      const gained = pointsFor(ok, nextStreak, usedFiftyHere);
      const answer: L = item.kind === 'choice' ? item.question.answer : item.question.place;
      setStreak(nextStreak);
      setPoints((p) => p + gained);
      setRecords((r) => [...r, { id: item.question.id, prompt: item.question.prompt, answer, ok, km }]);
      setVerdict({ ok, gained, km, text: pick(randomOf(ok ? strings.correct : strings.wrong)) });
      setRevealed(true);
    },
    [item, streak, usedFiftyHere, pick],
  );

  const choose = useCallback(
    (i: number) => {
      if (revealed || item.kind !== 'choice' || removed.includes(i)) return;
      setPicked(i);
      settle(i === item.correct);
    },
    [revealed, item, removed, settle],
  );

  const confirmGuess = useCallback(() => {
    if (revealed || item.kind !== 'map' || !guess) return;
    const km = Math.round(distanceKm(unproject(guess), item.question));
    settle(km <= item.question.radiusKm, km);
  }, [revealed, item, guess, settle]);

  const useFifty = () => {
    if (fiftyUsedAt !== null || revealed) return;
    setFiftyUsedAt(index);
    if (item.kind === 'choice') setRemoved(fiftyFifty(item));
    else setSplit(mapSplit(project(item.question.lat, item.question.lon)));
  };

  const next = useCallback(() => {
    if (!revealed) return;
    if (isLast) {
      onFinish(records, points);
      return;
    }
    setIndex((i) => i + 1);
    setPicked(null);
    setGuess(null);
    setRemoved([]);
    setSplit(null);
    setRevealed(false);
    setVerdict(null);
    cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [revealed, isLast, onFinish, records, points]);

  useEffect(() => {
    if (revealed) feedbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [revealed]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 'Enter') {
        if (revealed) next();
        else confirmGuess();
        return;
      }
      const n = '1234'.indexOf(e.key) >= 0 ? '1234'.indexOf(e.key) : 'abcd'.indexOf(e.key.toLowerCase());
      if (n >= 0) choose(n);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [revealed, next, confirmGuess, choose]);

  const quit = () => {
    if (records.length === 0 || window.confirm(s('quitConfirm'))) onQuit();
  };

  const image = item.kind === 'choice' ? ((lang === 'el' && item.question.imageEl) || item.question.image) : undefined;

  return (
    <div className="quiz">
      <div className="quiz__bar">
        <div className="quiz__bar-inner">
          <button type="button" className="icon-btn" onClick={quit} aria-label={s('quit')} title={s('quit')}>
            <CrossIcon />
          </button>
          <div className="quiz__title">
            <span className="quiz__mode">{pick(title)}</span>
            <span className="quiz__count">
              {s('question')} {index + 1}/{round.length}
            </span>
          </div>
          <div className="quiz__stats">
            <span className="stat" title={s('score')}>
              <StarIcon className="stat__icon stat__icon--star" />
              {points}
            </span>
            <span className={`stat ${streak >= 3 ? 'stat--hot' : ''}`} title={s('streak')}>
              <FlameIcon className="stat__icon stat__icon--flame" />
              {streak}
            </span>
          </div>
        </div>
        <ol className="progress" aria-hidden="true">
          {round.map((r, i) => {
            const rec = records[i];
            const state = rec ? (rec.ok ? 'ok' : 'bad') : i === index ? 'now' : '';
            return <li key={r.question.id} className={`progress__seg ${state && `progress__seg--${state}`}`} />;
          })}
        </ol>
      </div>

      <article className="card question" ref={cardRef} key={item.question.id}>
        {image && <Figure slug={image} showCaption={revealed} />}
        <div className="question__body">
          <p className="question__kicker">
            {item.kind === 'map' ? (
              <>
                <PinIcon width={16} height={16} /> {s('mapTap')}
              </>
            ) : (
              `${s('question')} ${index + 1}`
            )}
          </p>
          <h2 className="question__prompt">{pick(item.question.prompt)}</h2>

          {item.kind === 'choice' ? (
            <ul className="options">
              {item.options.map((opt, i) => {
                const gone = removed.includes(i);
                let state = '';
                if (revealed && i === item.correct) state = 'option--correct';
                else if (revealed && i === picked) state = 'option--wrong';
                else if (revealed) state = 'option--dim';
                return (
                  <li key={i}>
                    <button
                      type="button"
                      className={`option ${state} ${gone ? 'option--gone' : ''}`}
                      onClick={() => choose(i)}
                      disabled={revealed || gone}
                    >
                      <span className="option__letter">{LETTERS[i]}</span>
                      <span className="option__text">{pick(opt)}</span>
                      {revealed && i === item.correct && <CheckIcon className="option__mark" />}
                      {revealed && i === picked && i !== item.correct && <CrossIcon className="option__mark" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <>
              <MapPicker question={item.question} guess={guess} revealed={revealed} split={split} onGuess={setGuess} />
              {!revealed && (
                <button type="button" className="btn btn--primary btn--block" onClick={confirmGuess} disabled={!guess}>
                  <PinIcon /> {s('mapConfirm')}
                </button>
              )}
            </>
          )}

          {!revealed && (
            <div className="lifeline">
              <button
                type="button"
                className="lifeline__btn"
                onClick={useFifty}
                disabled={fiftyUsedAt !== null}
                aria-describedby="fifty-hint"
              >
                <SplitIcon /> {fiftyUsedAt !== null ? s('fiftyUsed') : s('fifty')}
              </button>
              {fiftyUsedAt === null && (
                <span id="fifty-hint" className="lifeline__hint">
                  {item.kind === 'map' ? s('fiftyMapHint') : s('fiftyHint')}
                </span>
              )}
            </div>
          )}
        </div>

        {revealed && verdict && (
          <div className={`feedback ${verdict.ok ? 'feedback--ok' : 'feedback--bad'}`} ref={feedbackRef} aria-live="polite">
            <div className="feedback__head">
              <span className="feedback__verdict">
                {verdict.ok ? <CheckIcon /> : <CrossIcon />}
                {verdict.text}
              </span>
              {verdict.km !== undefined && <span className="feedback__km">{fill(s('kmAway'), { km: verdict.km })}</span>}
              {verdict.gained > 0 && <span className="feedback__points">{fill(s('points'), { n: verdict.gained })}</span>}
            </div>
            {!verdict.ok && item.kind === 'choice' && (
              <p className="feedback__answer">{fill(s('answerWas'), { answer: pick(item.question.answer) })}</p>
            )}
            <p className="feedback__fact">
              <strong>{s('didYouKnow')}</strong> {pick(item.question.fact)}
            </p>
            <button type="button" className="btn btn--primary btn--block" onClick={next} autoFocus>
              {isLast ? s('seeResults') : s('next')} <ArrowIcon />
            </button>
          </div>
        )}
      </article>
    </div>
  );
}
