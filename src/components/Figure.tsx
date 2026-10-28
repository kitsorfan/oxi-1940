import { images, type ImageSlug } from '../data/images';
import { useLang } from '../i18n/LangContext';

export const imageUrl = (slug: ImageSlug) => `${import.meta.env.BASE_URL}img/${slug}.webp`;

export const commonsUrl = (file: string) => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replace(/ /g, '_'))}`;

interface Props {
  slug: ImageSlug;
  /** Captions can give away the answer, so they appear only after answering. */
  showCaption: boolean;
}

export function Figure({ slug, showCaption }: Props) {
  const { pick, s } = useLang();
  const img = images[slug];
  return (
    <figure className="figure">
      <div className="figure__frame">
        <img src={imageUrl(slug)} width={img.width} height={img.height} alt={showCaption ? pick(img.caption) : ''} decoding="async" />
      </div>
      <figcaption>
        {showCaption && <span className="figure__caption">{pick(img.caption)}</span>}
        <a className="figure__credit" href={commonsUrl(img.file)} target="_blank" rel="noreferrer">
          {s('photo')}: {img.author} · {img.license}
        </a>
      </figcaption>
    </figure>
  );
}
