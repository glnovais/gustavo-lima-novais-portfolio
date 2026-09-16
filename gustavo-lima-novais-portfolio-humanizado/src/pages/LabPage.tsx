import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import MonitoringDashboard from '../components/infrastructure/MonitoringDashboard';
import NetworkTopology from '../components/infrastructure/NetworkTopology';
import { labStack } from '../data/lab';
import { useI18n } from '../i18n/I18nProvider';

type Props = { onOpenPalette: () => void };
export default function LabPage({ onOpenPalette }: Props) {
  const { t } = useI18n();
  return <><Header onOpenPalette={onOpenPalette}/><main id="main" className="route-shell"><section className="section pt-16"><div className="container-shell"><div className="section-kicker">{t('labPage.kicker')}</div><div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5"><div><h1 className="text-[clamp(3rem,7vw,6.5rem)] leading-[.9] tracking-[-.06em] font-semibold">{t('labPage.titleA')}<br/><span className="text-cyan-300">{t('labPage.titleB')}</span></h1><p className="section-copy mt-6">{t('labPage.copy')}</p></div><span className="badge"><i className="badge-dot status-pulse"/> LAB ACTIVE</span></div><div className="grid xl:grid-cols-2 gap-5 mt-12"><NetworkTopology/><MonitoringDashboard/></div><div className="panel p-6 mt-5"><div className="mono text-xs text-cyan-300">{t('labPage.stack')}</div><div className="flex flex-wrap gap-2 mt-4">{labStack.map(x => <span className="badge" key={x}>{x}</span>)}</div><p className="text-xs text-slate-600 mt-6">{t('labPage.privacy')}</p></div></div></section></main><Footer/></>;
}
