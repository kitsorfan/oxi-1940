import { useEffect, useRef, useState, type ReactNode } from 'react';
import { siFacebook, siMessenger, siTelegram, siViber, siWhatsapp, siX } from 'simple-icons';
import { isPhone, shareLinks, type ShareTarget } from '../game/share';
import { sfx } from '../game/sound';
import { useLang } from '../i18n/LangContext';
import { SITE_URL } from '../i18n/strings';
import { CrossIcon, LinkedInIcon, ShareIcon } from './Icons';

interface Props {
  text: string;
  /** Builds a file to attach in the phone’s own share sheet, such as the certificate. */
  getFile?: () => Promise<File | null>;
  className?: string;
  label?: string;
}

const brand = (icon: { path: string }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
    <path d={icon.path} fill="currentColor" />
  </svg>
);

const TARGETS: { id: ShareTarget; label: string; color: string; icon: ReactNode; phoneOnly?: boolean }[] = [
  { id: 'whatsapp', label: 'WhatsApp', color: '#25D366', icon: brand(siWhatsapp) },
  { id: 'viber', label: 'Viber', color: '#7360F2', icon: brand(siViber) },
  { id: 'messenger', label: 'Messenger', color: '#0866FF', icon: brand(siMessenger), phoneOnly: true },
  { id: 'telegram', label: 'Telegram', color: '#26A5E4', icon: brand(siTelegram) },
  { id: 'facebook', label: 'Facebook', color: '#0866FF', icon: brand(siFacebook) },
  { id: 'linkedin', label: 'LinkedIn', color: '#0A66C2', icon: <LinkedInIcon width={24} height={24} /> },
  { id: 'x', label: 'X', color: '#000000', icon: brand(siX) },
  {
    id: 'email',
    label: 'Email',
    color: '#0b2545',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    ),
  },
];

export function ShareMenu({ text, getFile, className = 'btn btn--ghost', label }: Props) {
  const { s } = useLang();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const firstRef = useRef<HTMLAnchorElement>(null);
  const links = shareLinks(text, SITE_URL, s('appName'));
  const phone = isPhone();
  const canNativeShare = typeof navigator.share === 'function';

  useEffect(() => {
    if (!open) return;
    firstRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const show = () => {
    sfx.tick();
    setCopied(false);
    setOpen(true);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${text} ${SITE_URL}`);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const nativeShare = async () => {
    try {
      const file = getFile ? await getFile() : null;
      const data: ShareData = { title: s('appName'), text, url: SITE_URL };
      if (file && navigator.canShare?.({ files: [file] })) data.files = [file];
      await navigator.share(data);
      setOpen(false);
    } catch {
      // The share sheet was closed.
    }
  };

  return (
    <>
      <button type="button" className={className} onClick={show} aria-haspopup="dialog">
        <ShareIcon /> {label ?? s('share')}
      </button>
      {open && (
        <div className="sheet" role="presentation" onClick={() => setOpen(false)}>
          <div className="sheet__panel" role="dialog" aria-modal="true" aria-labelledby="share-title" onClick={(e) => e.stopPropagation()}>
            <div className="sheet__head">
              <h2 id="share-title">{s('shareTitle')}</h2>
              <button type="button" className="icon-btn" onClick={() => setOpen(false)} aria-label={s('close')}>
                <CrossIcon />
              </button>
            </div>
            <p className="sheet__preview">
              {text} <span>{SITE_URL}</span>
            </p>
            <ul className="sheet__grid">
              {TARGETS.filter((t) => !t.phoneOnly || phone).map((t, i) => (
                <li key={t.id}>
                  <a
                    ref={i === 0 ? firstRef : undefined}
                    className="sheet__app"
                    href={links[t.id]}
                    target={links[t.id].startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sheet__icon" style={{ background: t.color }}>
                      {t.icon}
                    </span>
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="sheet__actions">
              <button type="button" className="btn btn--ghost" onClick={copy}>
                {copied ? s('copied') : s('copyLink')}
              </button>
              {canNativeShare && (
                <button type="button" className="btn btn--primary" onClick={nativeShare}>
                  <ShareIcon /> {s('moreApps')}
                </button>
              )}
            </div>
            {getFile && canNativeShare && <p className="sheet__note">{s('shareCertNote')}</p>}
          </div>
        </div>
      )}
    </>
  );
}
