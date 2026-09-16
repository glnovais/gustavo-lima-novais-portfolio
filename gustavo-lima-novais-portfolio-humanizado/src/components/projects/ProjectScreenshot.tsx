import { ImageOff, Maximize2, X } from 'lucide-react';
import { useEffect, useMemo, useState, type MouseEvent } from 'react';
import { useI18n } from '../../i18n/I18nProvider';

type Props = {
  src: string;
  alt: string;
  caption: string;
};

const ASSET_VERSION = '20260916-4';

export default function ProjectScreenshot({ src, alt, caption }: Props) {
  const { locale, t } = useI18n();
  const zoomLabel = locale === 'en-US' ? 'Expand' : locale === 'es-ES' ? 'Ampliar' : 'Ampliar';
  const unavailableLabel = locale === 'en-US'
    ? 'Preview unavailable'
    : locale === 'es-ES'
      ? 'Vista previa no disponible'
      : 'Visualização indisponível';
  const resolvedSrc = useMemo(() => `${src}${src.includes('?') ? '&' : '?'}v=${ASSET_VERSION}`, [src]);
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
    setOpen(false);
  }, [resolvedSrc]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return <>
    <figure className="screenshot-frame">
      <div className="screenshot-toolbar"><i/><i/><i/><span>{t('screenshots.title')}</span></div>
      {failed ? (
        <div className="screenshot-image-button min-h-[220px] grid place-items-center text-slate-500" role="img" aria-label={`${alt} — ${unavailableLabel}`}>
          <span className="flex items-center gap-2 text-sm"><ImageOff size={17}/>{unavailableLabel}</span>
        </div>
      ) : (
        <button className="screenshot-image-button" onClick={() => setOpen(true)} aria-label={`${t('screenshots.title')}: ${caption}`}>
          <img src={resolvedSrc} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)}/>
          <span><Maximize2 size={15}/> {zoomLabel}</span>
        </button>
      )}
      <figcaption>{caption}</figcaption>
    </figure>
    {open && !failed && (
      <div className="screenshot-modal" role="dialog" aria-modal="true" aria-label={caption} onMouseDown={(event: MouseEvent<HTMLDivElement>) => { if (event.currentTarget === event.target) setOpen(false); }}>
        <button onClick={() => setOpen(false)} aria-label={t('a11y.closeMenu')}><X size={19}/></button>
        <img src={resolvedSrc} alt={alt} onError={() => { setFailed(true); setOpen(false); }}/>
      </div>
    )}
  </>;
}
