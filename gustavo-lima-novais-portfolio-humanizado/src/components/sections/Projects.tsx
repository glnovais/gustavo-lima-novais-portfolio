import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../../data/portfolioProjects';
import { pickText } from '../../i18n/text';
import { useI18n } from '../../i18n/I18nProvider';
import type { ProjectStatus } from '../../types';

export default function Projects({ limit }: { limit?: number }) {
  const { locale, t } = useI18n();
  const list = limit ? projects.slice(0, limit) : projects;
  const statusLabel = (status: ProjectStatus) => ({
    applied: locale === 'en-US' ? 'Applied project' : locale === 'es-ES' ? 'Proyecto aplicado' : 'Projeto aplicado',
    lab: locale === 'en-US' ? 'Lab' : locale === 'es-ES' ? 'Laboratorio' : 'Laboratório',
    concept: locale === 'en-US' ? 'Concept / Lab' : locale === 'es-ES' ? 'Concepto / Lab' : 'Conceitual / Lab',
  }[status]);
  return <section id="project-index" className="section"><div className="container-shell"><div className="flex flex-col md:flex-row md:items-end justify-between gap-5"><div><div className="section-kicker">{t('projects.kicker')}</div><h2 className="section-title">{t('projects.title')}</h2></div>{limit && <Link to="/projects" className="btn btn-ghost">{t('projects.all')} <ArrowUpRight size={16}/></Link>}</div><div className="grid lg:grid-cols-2 gap-4 mt-10">{list.map((p, index) => <article className={`panel project-card p-5 md:p-6 group ${p.featured ? 'project-featured lg:col-span-2' : ''}`} key={p.slug}><div className="flex justify-between gap-4"><div><div className="mono text-[11px] text-cyan-300">{t('projects.label')} / {p.index} {p.featured ? `· ${t('projects.mainCase')}` : ''}</div><div className="text-xs text-slate-600 mt-1">{p.category}</div></div><span className="badge"><i className={`w-1.5 h-1.5 rounded-full ${p.status === 'lab' ? 'bg-yellow-400' : p.status === 'concept' ? 'bg-blue-400' : 'bg-emerald-400'}`}/>{statusLabel(p.status)}</span></div><h3 className={`${p.featured ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl'} font-semibold tracking-tight mt-8`}>{pickText(p.title, locale)}</h3><p className="text-sm md:text-base text-slate-400 leading-7 mt-3 max-w-3xl">{pickText(p.summary, locale)}</p><div className="flex flex-wrap gap-2 mt-5">{p.technologies.slice(0, p.featured ? 6 : 4).map(tag => <span className="badge" key={tag}>{tag}</span>)}</div><div className="mt-7 pt-5 border-t border-white/5 flex items-center justify-end"><Link to={`/projects/${p.slug}`} className="inline-flex items-center gap-2 text-sm text-cyan-300 group-hover:gap-3 transition-all shrink-0">{t('projects.view')} <ArrowUpRight size={15}/></Link></div>{p.featured && <span className="project-card-index" aria-hidden="true">0{index + 1}</span>}</article>)}</div></div></section>;
}
