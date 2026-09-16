import { ArrowRight, CheckCircle2, Code2, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n/I18nProvider';
import ADArchitecture from '../infrastructure/ADArchitecture';
import MonitoringDashboard from '../infrastructure/MonitoringDashboard';

const code = `Get-ADComputer -Filter * |
  Select-Object Name, Enabled, LastLogonDate

Test-Connection -ComputerName "SERVER-01" -Count 1`;

export default function CaseSpotlight() {
  const { t } = useI18n();

  const automationItems = [
    t('case.automation.item1'),
    t('case.automation.item2'),
    t('case.automation.item3'),
    t('case.automation.item4'),
  ];

  const adOutcomes = [
    t('case.ad.outcome1'),
    t('case.ad.outcome2'),
    t('case.ad.outcome3'),
    t('case.ad.outcome4'),
  ];

  return <>
    <section id="projetos" className="section featured-case-section">
      <div className="container-shell">
        <div className="featured-case-shell">
          <div className="featured-case-copy">
            <div className="featured-case-index mono">{t('projects.label')} / 01</div>
            <div className="section-kicker">{t('case.ad.kicker')}</div>
            <h2 className="section-title">{t('case.ad.title')}</h2>
            <p className="section-copy mt-5">{t('case.ad.copy')}</p>

            <div className="featured-case-tags" aria-label="Active Directory">
              <span>OU Design</span>
              <span>Group Policy</span>
              <span>Security Groups</span>
              <span>Delegation</span>
              <span>Lifecycle</span>
              <span>Governance</span>
            </div>

            <div className="featured-case-outcomes">
              {adOutcomes.map((item) => (
                <div key={item}><CheckCircle2 size={15} /><span>{item}</span></div>
              ))}
            </div>

            <Link to="/projects/active-directory" className="btn btn-primary featured-case-action">
              {t('case.ad.open')} <ArrowRight size={16} />
            </Link>
          </div>

          <div className="featured-case-visual">
            <div className="featured-case-visual-head">
              <div>
                <span className="mono">{t('case.ad.architectureLabel')}</span>
                <small>{t('project.demoArchitecture')}</small>
              </div>
              <span className="badge">{t('projects.anonymized')}</span>
            </div>
            <ADArchitecture />
          </div>
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container-shell grid xl:grid-cols-2 gap-5">
        <div>
          <div className="section-kicker">{t('case.automation.kicker')}</div>
          <h2 className="section-title">{t('case.automation.title')}</h2>
          <p className="section-copy mt-5">{t('case.automation.copy')}</p>
          <div className="grid sm:grid-cols-2 gap-3 mt-7">
            {automationItems.map(item => (
              <div className="panel p-4 text-sm" key={item}>
                <ShieldCheck size={16} className="text-cyan-300 mb-4" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="panel overflow-hidden">
          <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2 text-sm">
            <Code2 size={16} className="text-cyan-300" />
            <span className="mono">automation.ps1</span>
            <span className="ml-auto text-xs text-slate-600">{t('case.automation.example')}</span>
          </div>
          <pre className="p-5 text-xs md:text-sm text-slate-300 leading-7 overflow-x-auto mono"><code>{code}</code></pre>
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container-shell">
        <div className="section-kicker">{t('case.monitor.kicker')}</div>
        <div className="grid xl:grid-cols-[.8fr_1.2fr] gap-7 items-center">
          <div>
            <h2 className="section-title">{t('case.monitor.title')}</h2>
            <p className="section-copy mt-5">{t('case.monitor.copy')}</p>
            <Link to="/projects/monitoring" className="btn btn-ghost mt-7">{t('case.monitor.open')}</Link>
          </div>
          <MonitoringDashboard />
        </div>
      </div>
    </section>
  </>;
}
