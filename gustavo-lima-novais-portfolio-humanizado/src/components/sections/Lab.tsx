import { Beaker, Box, Database, Network, Server } from 'lucide-react';
import { Link } from 'react-router-dom';
import { labStack } from '../../data/lab';
import { useI18n } from '../../i18n/I18nProvider';
import NetworkTopology from '../infrastructure/NetworkTopology';

export default function Lab() {
  const { t } = useI18n();
  return <section id="lab" className="section"><div className="container-shell"><div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5"><div><div className="section-kicker">{t('lab.kicker')}</div><h2 className="section-title">{t('lab.title')}</h2><p className="section-copy mt-4">{t('lab.copy')}</p></div><span className="badge"><i className="badge-dot status-pulse"/>{t('lab.status')}</span></div><div className="grid xl:grid-cols-[1.1fr_.9fr] gap-5 mt-9"><NetworkTopology/><div className="panel p-5 md:p-6"><div className="grid grid-cols-2 gap-2">{[[Network, 'Virtual Network'], [Server, 'Windows Server'], [Box, 'Docker'], [Database, 'PostgreSQL']].map(([Icon, label]: any) => <div key={label} className="rounded-xl border border-white/5 p-4"><Icon size={18} className="text-cyan-300"/><div className="text-sm mt-4">{label}</div></div>)}</div><div className="flex flex-wrap gap-2 mt-5">{labStack.map(x => <span className="badge" key={x}>{x}</span>)}</div><Link to="/lab" className="btn btn-ghost mt-6"><Beaker size={16}/>{t('lab.open')}</Link></div></div></div></section>;
}
