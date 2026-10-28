import { useMemo, type CSSProperties } from 'react';

const COLORS = ['#0d5eaf', '#ffffff', '#d9a91a', '#4f8fd8', '#f3d36b'];

export function Confetti({ pieces = 90 }: { pieces?: number }) {
  const bits = useMemo(
    () =>
      Array.from({ length: pieces }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 1.2,
        duration: 2.6 + Math.random() * 2.2,
        drift: (Math.random() - 0.5) * 160,
        spin: 360 + Math.random() * 720,
        color: COLORS[i % COLORS.length],
        wide: Math.random() > 0.5,
      })),
    [pieces],
  );
  return (
    <div className="confetti" aria-hidden="true">
      {bits.map((b, i) => (
        <span
          key={i}
          className={b.wide ? 'confetti__bit confetti__bit--wide' : 'confetti__bit'}
          style={
            {
              left: `${b.left}%`,
              background: b.color,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.duration}s`,
              '--drift': `${b.drift}px`,
              '--spin': `${b.spin}deg`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
