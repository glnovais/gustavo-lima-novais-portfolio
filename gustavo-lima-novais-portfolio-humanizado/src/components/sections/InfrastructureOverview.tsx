import { infrastructureProfile, type ProfileLevel } from '../../data/skills';
import { useI18n } from '../../i18n/I18nProvider';
import NetworkTopology from '../infrastructure/NetworkTopology';

export default function InfrastructureOverview() {
  const { t } = useI18n();
  const level = (value: ProfileLevel) => ({ professional: t('infra.professional'), practical: t('infra.practical'), lab: t('infra.lab'), evolving: t('infra.evolving') }[value]);
  return (
    <section id="infraestrutura" className="section">
      <div className="container-shell">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-9"><div><div className="section-kicker">{t('infra.kicker')}</div><h2 className="section-title">{t('infra.title')}</h2></div><p className="section-copy max-w-lg">{t('infra.copy')}</p></div>
        <div className="grid xl:grid-cols-[.9fr_1.1fr] gap-5">
          <div className="panel p-5 md:p-6">{infrastructureProfile.map((s, i) => <div key={s.name} className={i ? 'pt-5 mt-5 border-t border-white/5' : ''}><div className="flex justify-between gap-4 text-sm"><span className="font-medium">{s.name}</span><span className="text-slate-500 text-xs">{level(s.level)}</span></div><div className="profile-meter mt-3" aria-hidden="true">{Array.from({ length: 5 }, (_, j) => <span key={j} className={j < s.meter ? 'active' : ''}/>)}</div></div>)}</div>
          <NetworkTopology/>
        </div>
      </div>
    </section>
  );
}
