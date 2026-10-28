import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const;

export const StarIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" fill="currentColor" stroke="none" />
  </svg>
);

export const FlameIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path
      d="M12 22c4 0 7-2.8 7-6.8 0-3.6-2.4-5.9-4.2-8.4-.5 2-1.6 3.2-2.8 3.7.4-3.3-.9-6.3-3.6-8.5.1 3.2-1.6 5.3-3.1 7.2C4.1 11 5 13.3 5 15.2 5 19.2 8 22 12 22Z"
      fill="currentColor"
      stroke="none"
    />
  </svg>
);

export const SplitIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3v18" />
    <path d="M12 3a9 9 0 0 1 0 18" fill="currentColor" stroke="none" />
  </svg>
);

/** Three soldiers' heads: the company. */
export const CompanyIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="7.5" r="3" />
    <path d="M6.5 20a5.5 5.5 0 0 1 11 0" />
    <circle cx="5" cy="10" r="2.2" />
    <path d="M1.5 19a4 4 0 0 1 4.6-4.3" />
    <circle cx="19" cy="10" r="2.2" />
    <path d="M22.5 19a4 4 0 0 0-4.6-4.3" />
  </svg>
);

export const RetryIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 12a8 8 0 1 0 2.4-5.7" />
    <path d="M4 4v4.5h4.5" />
  </svg>
);

/** A telegram envelope. */
export const TelegramIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="2" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
);

export const CheckIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const CrossIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const ArrowIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const BackIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);

export const PinIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 21s-6.5-5.7-6.5-11a6.5 6.5 0 1 1 13 0c0 5.3-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.3" />
  </svg>
);

export const DownloadIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
  </svg>
);

export const ShareIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="18" cy="5" r="2.5" />
    <circle cx="6" cy="12" r="2.5" />
    <circle cx="18" cy="19" r="2.5" />
    <path d="m8.2 10.8 7.6-4.5M8.2 13.2l7.6 4.5" />
  </svg>
);

export const LinkedInIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path
      d="M4.5 3A1.5 1.5 0 1 1 4.5 6a1.5 1.5 0 0 1 0-3ZM3.2 8h2.6v12H3.2zM9 8h2.5v1.7h.1c.4-.7 1.5-1.9 3.4-1.9 3.6 0 4.2 2.3 4.2 5.4V20h-2.6v-6.1c0-1.5 0-3.3-2-3.3s-2.4 1.6-2.4 3.2V20H9z"
      fill="currentColor"
      stroke="none"
    />
  </svg>
);

export const SoundIcon = ({ muted, ...p }: IconProps & { muted: boolean }) => (
  <svg {...base} {...p}>
    <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" />
    {muted ? <path d="m16 9.5 5 5M21 9.5l-5 5" /> : <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" />}
  </svg>
);

export const InfoIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 8h.01" />
  </svg>
);

/** The Greek flag, used as the logo. */
export const FlagMark = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={(size * 2) / 3} viewBox="0 0 27 18" aria-hidden="true" className="flag-mark">
    <rect width="27" height="18" fill="#0d5eaf" />
    {[1, 3, 5, 7].map((i) => (
      <rect key={i} y={i * 2} width="27" height="2" fill="#fff" />
    ))}
    <rect width="10" height="10" fill="#0d5eaf" />
    <rect x="4" width="2" height="10" fill="#fff" />
    <rect y="4" width="10" height="2" fill="#fff" />
  </svg>
);
