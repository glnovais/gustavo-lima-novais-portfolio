import { skillGroups } from '../../data/skills';
import { useI18n } from '../../i18n/I18nProvider';

export default function Skills() {
  const { t } = useI18n();
  return <section id="stack" className="section"><div className="container-shell"><div className="flex flex-col md:flex-row md:items-end justify-between gap-5"><div><div className="section-kicker">{t('skills.kicker')}</div><h2 className="section-title">{t('skills.title')}</h2></div><span className="badge mono">stack.index / {skillGroups.length} {t('skills.counter')}</span></div><div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3 mt-9">{skillGroups.map((g, i) => <div key={g.category} className={`panel p-5 ${i === 0 ? 'xl:row-span-2' : ''}`}><div className="flex items-center justify-between"><h3 className="font-semibold">{g.category}</h3><span className="mono text-[10px] text-slate-600">0{i + 1}</span></div><div className="flex flex-wrap gap-2 mt-5">{g.items.map(x => <span className="badge" key={x}>{x}</span>)}</div></div>)}</div></div></section>;
}
