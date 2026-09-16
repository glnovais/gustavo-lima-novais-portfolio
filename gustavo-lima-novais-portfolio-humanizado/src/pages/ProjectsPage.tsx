import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import Projects from '../components/sections/Projects';
import { useI18n } from '../i18n/I18nProvider';

type Props = { onOpenPalette: () => void };

export default function ProjectsPage({ onOpenPalette }: Props) {
  const { locale, t } = useI18n();
  const copy = locale === 'en-US'
    ? 'Each project presents its context, adopted approach, technologies and practical outcomes.'
    : locale === 'es-ES'
      ? 'Cada proyecto presenta su contexto, el enfoque adoptado, las tecnologías y los resultados prácticos.'
      : 'Cada projeto apresenta o contexto, a abordagem adotada, as tecnologias envolvidas e os resultados práticos.';

  return <><Header onOpenPalette={onOpenPalette}/><main id="main" className="route-shell"><section className="section pt-16"><div className="container-shell"><div className="section-kicker">{t('projectsPage.kicker')}</div><h1 className="text-[clamp(3rem,7vw,6.5rem)] leading-[.9] tracking-[-.06em] font-semibold max-w-5xl">{t('projectsPage.title')}</h1><p className="section-copy mt-6 text-lg">{copy}</p></div></section><Projects/></main><Footer/></>;
}
