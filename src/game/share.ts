export type ShareTarget = 'whatsapp' | 'viber' | 'messenger' | 'telegram' | 'facebook' | 'linkedin' | 'x' | 'email';

/** Share links for each app. Viber and Messenger open their apps, so they only work where those are installed. */
export function shareLinks(text: string, url: string, subject: string): Record<ShareTarget, string> {
  const e = encodeURIComponent;
  const message = `${text} ${url}`;
  return {
    whatsapp: `https://wa.me/?text=${e(message)}`,
    viber: `viber://forward?text=${e(message)}`,
    messenger: `fb-messenger://share/?link=${e(url)}`,
    telegram: `https://t.me/share/url?url=${e(url)}&text=${e(text)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${e(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${e(url)}`,
    x: `https://twitter.com/intent/tweet?text=${e(text)}&url=${e(url)}`,
    email: `mailto:?subject=${e(subject)}&body=${e(`${text}\n\n${url}`)}`,
  };
}

export const isPhone = () => /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
