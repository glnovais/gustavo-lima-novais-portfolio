import { Activity, ClipboardCheck, Network, Server, SlidersHorizontal, TerminalSquare, UsersRound, Wrench } from 'lucide-react';
import { useI18n } from '../../i18n/I18nProvider';

export default function Areas() {
  const { t } = useI18n();
  const areas = [
    [Network, t('areas.network.title'), t('areas.network.desc')], [UsersRound, t('areas.ad.title'), t('areas.ad.desc')],
    [Server, t('areas.server.title'), t('areas.server.desc')], [SlidersHorizontal, t('areas.gpo.title'), t('areas.gpo.desc')],
    [TerminalSquare, t('areas.ps.title'), t('areas.ps.desc')], [Activity, t('areas.monitor.title'), t('areas.monitor.desc')],
    [Wrench, t('areas.itsm.title'), t('areas.itsm.desc')], [ClipboardCheck, t('areas.gov.title'), t('areas.gov.desc')],
  ] as const;
  return <section className="section"><div className="container-shell"><div className="section-kicker">{t('areas.kicker')}</div><h2 className="section-title">{t('areas.title')}</h2><div className="grid md:grid-cols-2 xl:grid-cols-4 gap-3 mt-9">{areas.map(([Icon, title, desc]) => <article key={title} className="panel p-5 min-h-[220px] flex flex-col"><div className="w-10 h-10 rounded-xl border border-cyan-300/15 bg-cyan-300/[.045] grid place-items-center text-cyan-300"><Icon size={19}/></div><h3 className="font-semibold mt-6">{title}</h3><p className="text-sm leading-6 text-slate-500 mt-2">{desc}</p><span className="mt-auto pt-5 mono text-[10px] tracking-[.12em] text-slate-700">GN / INFRA</span></article>)}</div></div></section>;
}
