import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import Projects from '../components/sections/Projects';
import { useI18n } from '../i18n/I18nProvider';

type Props = { onOpenPalette: () => void };
export default function ProjectsPage({ onOpenPalette }: Props) {
  const { t } = useI18n();
  return <><Header onOpenPalette={onOpenPalette}/><main id="main" className="route-shell"><section className="section pt-16"><div className="container-shell"><div className="section-kicker">{t('projectsPage.kicker')}</div><h1 className="text-[clamp(3rem,7vw,6.5rem)] leading-[.9] tracking-[-.06em] font-semibold max-w-5xl">{t('projectsPage.title')}</h1><p className="section-copy mt-6 text-lg">{t('projectsPage.copy')}</p></div></section><Projects/></main><Footer/></>;
}
