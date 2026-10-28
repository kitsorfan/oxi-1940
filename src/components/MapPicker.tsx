import { useLayoutEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import type { MapSplit } from '../game/engine';
import { MAP, VIEW, project, type Point } from '../game/geo';
import { useLang } from '../i18n/LangContext';
import type { MapQuestion } from '../types';
import { imageUrl } from './Figure';

interface Props {
  question: MapQuestion;
  guess: Point | null;
  revealed: boolean;
  split: MapSplit | null;
  /** The company's pins, after Ask the company. */
  crowd: Point[] | null;
  /** The first pin, when the Second chance caught a miss. */
  firstTry: Point | null;
  onGuess: (point: Point) => void;
}

// Map units per kilometre, from the projection bounds.
const UNITS_PER_KM_Y = MAP.height / (MAP.north - MAP.south) / 111.2;
const unitsPerKmX = (lat: number) => MAP.width / (MAP.east - MAP.west) / (111.32 * Math.cos((lat * Math.PI) / 180));

function Pin({ at, scale, variant }: { at: Point; scale: number; variant: 'guess' | 'miss' | 'first' | 'target' }) {
  return (
    <g transform={`translate(${at.x} ${at.y}) scale(${scale})`} className={`map__pin map__pin--${variant}`}>
      <path d="M0 0C-7-9-11-14-11-20a11 11 0 1 1 22 0c0 6-4 11-11 20Z" />
      <circle cy="-20" r="4.2" />
    </g>
  );
}

export function MapPicker({ question, guess, revealed, split, crowd, firstTry, onGuess }: Props) {
  const { pick, s } = useLang();
  const svgRef = useRef<SVGSVGElement>(null);
  // Scale that keeps pins the same size on screen however wide the map is drawn.
  const [scale, setScale] = useState(1.6);

  useLayoutEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth ? VIEW.width / el.clientWidth : 1.6);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleClick = (e: MouseEvent<SVGSVGElement>) => {
    if (revealed) return;
    const svg = svgRef.current;
    const ctm = svg?.getScreenCTM();
    if (!ctm) return;
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
    onGuess({ x: p.x, y: p.y });
  };

  const target = project(question.lat, question.lon);
  const shade = split && shadeRect(split);

  return (
    <div className={`map ${revealed ? 'map--revealed' : ''}`}>
      <svg
        ref={svgRef}
        viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.width} ${VIEW.height}`}
        onClick={handleClick}
        role="img"
        aria-label={s('mapTap')}
      >
        <image href={imageUrl('greece-relief')} width={MAP.width} height={MAP.height} />
        {crowd?.map((p, i) => (
          <circle key={i} className="map__crowd" cx={p.x} cy={p.y} r={5 * scale} strokeWidth={1.5 * scale} style={{ '--i': i } as CSSProperties} />
        ))}
        {shade && <rect className="map__shade" {...shade} />}
        {revealed && (
          <ellipse
            className="map__radius"
            cx={target.x}
            cy={target.y}
            rx={question.radiusKm * unitsPerKmX(question.lat)}
            ry={question.radiusKm * UNITS_PER_KM_Y}
          />
        )}
        {firstTry && <Pin at={firstTry} scale={scale} variant="first" />}
        {revealed && guess && <line className="map__line" x1={guess.x} y1={guess.y} x2={target.x} y2={target.y} strokeWidth={2 * scale} />}
        {guess && <Pin at={guess} scale={scale} variant={revealed ? 'miss' : 'guess'} />}
        {revealed && (
          <>
            <Pin at={target} scale={scale} variant="target" />
            <text className="map__label" x={target.x} y={target.y - 38 * scale} fontSize={15 * scale} strokeWidth={4 * scale}>
              {pick(question.place)}
            </text>
          </>
        )}
      </svg>
    </div>
  );
}

function shadeRect({ axis, at, keep }: MapSplit) {
  const end = axis === 'x' ? VIEW.x + VIEW.width : VIEW.y + VIEW.height;
  const start = axis === 'x' ? VIEW.x : VIEW.y;
  const [from, to] = keep === 'before' ? [at, end] : [start, at];
  return axis === 'x'
    ? { x: from, y: VIEW.y, width: to - from, height: VIEW.height }
    : { x: VIEW.x, y: from, width: VIEW.width, height: to - from };
}
