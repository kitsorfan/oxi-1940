import { useId } from 'react';
import type { Medal } from '../game/engine';
import { MEDAL_TONES } from '../game/medals';

interface Props {
  medal: Medal | null;
  size?: number;
  label?: string;
}

/** A medal on a blue-and-white ribbon. An empty slot is drawn when `medal` is null. */
export function MedalBadge({ medal, size = 64, label }: Props) {
  const id = useId();
  if (!medal) {
    return (
      <svg width={size} height={size * 1.4} viewBox="0 0 100 140" className="medal medal--empty" aria-hidden="true">
        <circle cx="50" cy="90" r="38" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="6 6" />
      </svg>
    );
  }
  const [light, base, dark] = MEDAL_TONES[medal];
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 100 140" className="medal" role="img" aria-label={label ?? medal}>
      <defs>
        <radialGradient id={id} cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor={light} />
          <stop offset=".55" stopColor={base} />
          <stop offset="1" stopColor={dark} />
        </radialGradient>
      </defs>
      <path d="M28 0h44l-8 58H36z" fill="#0d5eaf" />
      <path d="M41 0h6l-3 58h-4zM53 0h6l-1 58h-4z" fill="#fff" />
      <circle cx="50" cy="90" r="40" fill={`url(#${id})`} stroke={dark} strokeWidth="3" />
      <circle cx="50" cy="90" r="31" fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="1.5" strokeDasharray="4 4" />
      <path
        d="m50 70 5.9 12 13.1 1.9-9.5 9.3 2.3 13.1L50 100.1l-11.8 6.2 2.3-13.1-9.5-9.3 13.1-1.9z"
        fill={dark}
        fillOpacity=".85"
      />
    </svg>
  );
}
