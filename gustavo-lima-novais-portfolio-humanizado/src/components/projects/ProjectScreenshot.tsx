import { Maximize2, X } from 'lucide-react';
import { useEffect, useState, type MouseEvent } from 'react';
import { useI18n } from '../../i18n/I18nProvider';

type Props = {
  src: string;
  alt: string;
  caption: string;
};

export default function ProjectScreenshot({ src, alt, caption }: Props) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return <>
    <figure className="screenshot-frame">
      <div className="screenshot-toolbar"><i/><i/><i/><span>{t('screenshots.title')}</span></div>
      <button className="screenshot-image-button" onClick={() => setOpen(true)} aria-label={`${t('screenshots.title')}: ${caption}`}>
        <img src={src} alt={alt} loading="lazy" decoding="async"/>
        <span><Maximize2 size={15}/> Zoom</span>
      </button>
      <figcaption>{caption}<small>{t('screenshots.note')}</small></figcaption>
    </figure>
    {open && <div className="screenshot-modal" role="dialog" aria-modal="true" aria-label={caption} onMouseDown={(event: MouseEvent<HTMLDivElement>) => { if (event.currentTarget === event.target) setOpen(false); }}><button onClick={() => setOpen(false)} aria-label={t('a11y.closeMenu')}><X size={19}/></button><img src={src} alt={alt}/></div>}
  </>;
}
