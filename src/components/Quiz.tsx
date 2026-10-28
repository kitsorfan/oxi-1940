import { useCallback, useEffect, useRef, useState, type ComponentType, type CSSProperties, type SVGProps } from 'react';
import { companyGuesses, companyPoll, fiftyFifty, mapSplit, pointsFor, type Help, type MapSplit, type RoundItem } from '../game/engine';
import { compassTo, distanceKm, project, unproject, type Compass, type Point } from '../game/geo';
import { sfx } from '../game/sound';
import { useLang } from '../i18n/LangContext';
import { fill, strings, type StringKey } from '../i18n/strings';
import type { L } from '../types';
import { Figure } from './Figure';
import {
  ArrowIcon,
  CheckIcon,
  CompanyIcon,
  CrossIcon,
  FlameIcon,
  PinIcon,
  RetryIcon,
  SplitIcon,
  StarIcon,
  TelegramIcon,
} from './Icons';
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

type UiKey = Exclude<StringKey, 'correct' | 'wrong'>;

const HELPS: { id: Help; Icon: ComponentType<SVGProps<SVGSVGElement>>; label: UiKey; hint: UiKey; mapHint: UiKey }[] = [
  { id: 'fifty', Icon: SplitIcon, label: 'fifty', hint: 'fiftyHint', mapHint: 'fiftyMapHint' },
  { id: 'poll', Icon: CompanyIcon, label: 'poll', hint: 'pollHint', mapHint: 'pollMapHint' },
  { id: 'second', Icon: RetryIcon, label: 'second', hint: 'secondHint', mapHint: 'secondMapHint' },
  { id: 'telegram', Icon: TelegramIcon, label: 'telegram', hint: 'telegramHint', mapHint: 'telegramHint' },
];

const DIRECTIONS: Record<Compass, UiKey> = { n: 'dirN', ne: 'dirNE', e: 'dirE', se: 'dirSE', s: 'dirS', sw: 'dirSW', w: 'dirW', nw: 'dirNW' };

const LETTERS = ['A', 'B', 'C', 'D'];
const randomOf = <T,>(list: readonly T[]) => list[Math.floor(Math.random() * list.length)]!;

export function Quiz({ title, round, onQuit, onFinish }: Props) {
  const { lang, pick, s } = useLang();
  const [index, setIndex] = useState(0);
  const [records, setRecords] = useState<AnswerRecord[]>([]);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  /** The question each help was used on. */
  const [used, setUsed] = useState<Partial<Record<Help, number>>>({});
  const [removed, setRemoved] = useState<number[]>([]);
  const [split, setSplit] = useState<MapSplit | null>(null);
  const [poll, setPoll] = useState<number[] | null>(null);
  const [crowd, setCrowd] = useState<Point[] | null>(null);
  /** The wrong option the Second chance struck out. */
  const [struck, setStruck] = useState<number | null>(null);
  /** The pin the Second chance caught, how far off it was and which way the target lies. */
  const [firstTry, setFirstTry] = useState<{ pin: Point; km: number; dir: Compass } | null>(null);
  const [hovered, setHovered] = useState<Help | null>(null);
  const [picked, setPicked] = useState<number | null>(null);
  const [guess, setGuess] = useState<Point | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [verdict, setVerdict] = useState<{ ok: boolean; text: string; gained: number; km?: number } | null>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement>(null);

  const item = round[index]!;
  const isLast = index === round.length - 1;
  const armed = used.second === index;
  // An armed Second chance only costs points once it has caught a wrong answer.
  const helped = struck !== null || firstTry !== null || used.fifty === index || used.poll === index || used.telegram === index;

  const settle = useCallback(
    (ok: boolean, km?: number) => {
      const nextStreak = ok ? streak + 1 : 0;
      const gained = pointsFor(ok, nextStreak, helped);
      const answer: L = item.kind === 'choice' ? item.question.answer : item.question.place;
      if (!ok) sfx.wrong();
      else if (nextStreak % 3 === 0) sfx.streak();
      else sfx.correct();
      setStreak(nextStreak);
      setPoints((p) => p + gained);
      setRecords((r) => [...r, { id: item.question.id, prompt: item.question.prompt, answer, ok, km }]);
      setVerdict({ ok, gained, km, text: pick(randomOf(ok ? strings.correct : strings.wrong)) });
      setRevealed(true);
    },
    [item, streak, helped, pick],
  );

  const choose = useCallback(
    (i: number) => {
      if (revealed || item.kind !== 'choice' || removed.includes(i) || i === struck) return;
      if (i !== item.correct && armed && struck === null) {
        setStruck(i);
        sfx.miss();
        return;
      }
      setPicked(i);
      settle(i === item.correct);
    },
    [revealed, item, removed, struck, armed, settle],
  );

  const confirmGuess = useCallback(() => {
    if (revealed || item.kind !== 'map' || !guess) return;
    const at = unproject(guess);
    const km = Math.round(distanceKm(at, item.question));
    const ok = km <= item.question.radiusKm;
    if (!ok && armed && !firstTry) {
      setFirstTry({ pin: guess, km, dir: compassTo(at, item.question) });
      setGuess(null);
      sfx.miss();
      return;
    }
    settle(ok, km);
  }, [revealed, item, guess, armed, firstTry, settle]);

  const takeHelp = (help: Help) => {
    if (used[help] !== undefined || revealed) return;
    setUsed((u) => ({ ...u, [help]: index }));
    setHovered(null);
    if (help === 'telegram') sfx.telegram();
    else sfx.help();
    if (help === 'fifty') {
      if (item.kind === 'choice') setRemoved(fiftyFifty(item));
      else setSplit(mapSplit(project(item.question.lat, item.question.lon)));
    } else if (help === 'poll') {
      if (item.kind === 'choice') setPoll(companyPoll(item, removed));
      else setCrowd(companyGuesses(item.question));
    }
  };

  const next = useCallback(() => {
    if (!revealed) return;
    if (isLast) {
      onFinish(records, points);
      return;
    }
    sfx.tick();
    setIndex((i) => i + 1);
    setPicked(null);
    setGuess(null);
    setRemoved([]);
    setSplit(null);
    setPoll(null);
    setCrowd(null);
    setStruck(null);
    setFirstTry(null);
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
  const hintFor = (help: (typeof HELPS)[number]) => s(item.kind === 'map' ? help.mapHint : help.hint);
  const hoveredHelp = HELPS.find((h) => h.id === hovered);

  const retryNote = !revealed && (struck !== null || firstTry) && (
    <p className="retry" role="status">
      <RetryIcon />
      {firstTry
        ? fill(s('secondMapRetry'), { km: Math.round(firstTry.km / 10) * 10, dir: s(DIRECTIONS[firstTry.dir]) })
        : s('secondRetry')}
    </p>
  );

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

          {used.telegram === index && (
            <div className="telegram" role="note">
              <p className="telegram__from">
                <TelegramIcon width={18} height={18} /> {s('telegramFrom')}
              </p>
              <p className="telegram__text">
                {pick(item.question.hint)} <span className="telegram__stop">{s('telegramStop')}</span>
              </p>
            </div>
          )}

          {item.kind === 'choice' ? (
            <>
              <ul className="options">
                {item.options.map((opt, i) => {
                  const gone = removed.includes(i);
                  const crossed = (revealed && i === picked && i !== item.correct) || i === struck;
                  let state = '';
                  if (revealed && i === item.correct) state = 'option--correct';
                  else if (crossed) state = 'option--wrong';
                  else if (revealed) state = 'option--dim';
                  return (
                    <li key={i}>
                      <button
                        type="button"
                        className={`option ${state} ${gone ? 'option--gone' : ''}`}
                        onClick={() => choose(i)}
                        disabled={revealed || gone || i === struck}
                      >
                        <span className="option__letter">{LETTERS[i]}</span>
                        <span className="option__text">{pick(opt)}</span>
                        {poll && (
                          <span className="option__poll" style={{ '--share': `${poll[i]}%` } as CSSProperties}>
                            {poll[i]}%
                          </span>
                        )}
                        {revealed && i === item.correct && <CheckIcon className="option__mark" />}
                        {crossed && <CrossIcon className="option__mark" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
              {retryNote}
            </>
          ) : (
            <>
              <MapPicker
                question={item.question}
                guess={guess}
                revealed={revealed}
                split={split}
                crowd={crowd}
                firstTry={firstTry?.pin ?? null}
                onGuess={(p) => {
                  sfx.pin();
                  setGuess(p);
                }}
              />
              {crowd && <p className="map-legend">{s('pollLegend')}</p>}
              {retryNote}
              {!revealed && (
                <button type="button" className="btn btn--primary btn--block" onClick={confirmGuess} disabled={!guess}>
                  <PinIcon /> {s('mapConfirm')}
                </button>
              )}
            </>
          )}

          {!revealed && (
            <div className="lifeline">
              <div className="lifeline__btns">
                {HELPS.map((help) => {
                  const { id, Icon } = help;
                  const taken = used[id] !== undefined;
                  const on = id === 'second' && armed;
                  return (
                    <button
                      key={id}
                      type="button"
                      className={`lifeline__btn ${on ? 'lifeline__btn--on' : ''}`}
                      onClick={() => takeHelp(id)}
                      disabled={taken}
                      aria-pressed={id === 'second' ? on : undefined}
                      aria-describedby={`help-${id}`}
                      onMouseEnter={() => setHovered(id)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(id)}
                      onBlur={() => setHovered(null)}
                    >
                      {taken && !on ? <CheckIcon /> : <Icon />} {s(help.label)}
                    </button>
                  );
                })}
              </div>
              {HELPS.map((help) => (
                <span key={help.id} id={`help-${help.id}`} className="sr-only">
                  {hintFor(help)}
                </span>
              ))}
              <p className="lifeline__hint">{hoveredHelp ? hintFor(hoveredHelp) : s('helpsRule')}</p>
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
