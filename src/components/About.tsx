import { images, type ImageInfo, type ImageSlug } from '../data/images';
import { useLang } from '../i18n/LangContext';
import { AUTHOR_URL, REPO_URL } from '../i18n/strings';
import { commonsUrl, imageUrl } from './Figure';
import { BackIcon } from './Icons';

export function About({ onBack }: { onBack: () => void }) {
  const { pick, s } = useLang();
  const list = Object.entries(images) as [ImageSlug, ImageInfo][];
  return (
    <div className="about">
      <button type="button" className="btn btn--ghost btn--sm" onClick={onBack}>
        <BackIcon /> {s('back')}
      </button>
      <section className="card about__intro">
        <h1>{s('aboutTitle')}</h1>
        <p>{s('aboutText')}</p>
        <p>
          {s('madeBy')} Kitsos Orfanopoulos (<a href={AUTHOR_URL}>www.kitsorfan.com</a>) ·{' '}
          <a href={REPO_URL}>{s('sourceCode')}</a>
        </p>
      </section>
      <section className="card">
        <h2>{s('imageCredits')}</h2>
        <ul className="credits">
          {list.map(([slug, img]) => (
            <li key={slug} className="credit">
              <img src={imageUrl(slug)} alt="" loading="lazy" decoding="async" width={img.width} height={img.height} />
              <span className="credit__text">
                <span className="credit__caption">{pick(img.caption)}</span>
                <span className="credit__meta">
                  {img.author} ·{' '}
                  {img.licenseUrl ? (
                    <a href={img.licenseUrl} target="_blank" rel="noreferrer">
                      {img.license}
                    </a>
                  ) : (
                    img.license
                  )}{' '}
                  ·{' '}
                  <a href={commonsUrl(img.file)} target="_blank" rel="noreferrer">
                    Wikimedia Commons
                  </a>
                </span>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
