import { CalendarClock, LayoutDashboard, PanelsTopLeft } from 'lucide-react';
import { useI18n } from '../../i18n/I18nProvider';

export default function SideProjects() {
  const { t } = useI18n();
  const list = [[PanelsTopLeft, t('side.portfolio'), t('side.portfolioDesc')], [LayoutDashboard, t('side.dashboard'), t('side.dashboardDesc')], [CalendarClock, t('side.booking'), t('side.bookingDesc')]] as const;
  return <section className="section"><div className="container-shell"><div className="grid lg:grid-cols-[.85fr_1.15fr] gap-8 items-start"><div><div className="section-kicker">{t('side.kicker')}</div><h2 className="section-title">{t('side.title')}</h2><p className="section-copy mt-5">{t('side.copy')}</p></div><div className="space-y-3">{list.map(([Icon, title, desc], i) => <article className="panel p-5 flex gap-4 items-start" key={title}><div className="w-10 h-10 rounded-xl border border-cyan-300/15 grid place-items-center text-cyan-300 shrink-0"><Icon size={18}/></div><div><div className="mono text-[10px] text-slate-600">SIDE / 0{i + 1}</div><h3 className="font-semibold mt-1">{title}</h3><p className="text-sm text-slate-500 leading-6 mt-2">{desc}</p></div></article>)}</div></div></div></section>;
}
