import { Activity, ArrowRight, Building2, ClipboardCheck, Network, ShieldCheck, TerminalSquare } from 'lucide-react';
import { useI18n } from '../../i18n/I18nProvider';

export default function About() {
  const { t } = useI18n();
  const path = [
    [Building2, t('about.support'), t('about.supportDesc')],
    [Network, t('about.infrastructure'), t('about.infrastructureDesc')],
    [ShieldCheck, t('about.identity'), t('about.identityDesc')],
    [TerminalSquare, t('about.auto'), t('about.autoDesc')],
    [Activity, t('about.observe'), t('about.observeDesc')],
    [ClipboardCheck, t('about.governance'), t('about.governanceDesc')],
  ] as const;

  return (
    <section id="sobre" className="section about-section">
      <div className="container-shell">
        <div className="grid lg:grid-cols-[.88fr_1.12fr] gap-10 lg:gap-14 items-start">
          <div className="lg:sticky lg:top-28">
            <div className="section-kicker">{t('about.kicker')}</div>
            <h2 className="section-title">{t('about.title')}</h2>
          </div>
          <div>
            <p className="section-copy text-lg">{t('about.p1')}</p>
            <p className="section-copy mt-5">{t('about.p2')}</p>
          </div>
        </div>

        <div className="career-path-header">
          <div>
            <span className="mono">{t('about.pathKicker')}</span>
            <strong>{t('about.pathTitle')}</strong>
          </div>
          <p>{t('about.pathCopy')}</p>
        </div>

        <div className="career-path" aria-label={t('about.pathTitle')}>
          {path.map(([Icon, title, desc], index) => (
            <div className={`career-step ${index === 0 ? 'career-step-foundation' : ''} ${index >= 3 ? 'career-step-expansion' : ''}`} key={title}>
              <div className="career-step-head">
                <span className="career-step-index">0{index + 1}</span>
                <Icon size={18} />
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
              {index < path.length - 1 && <ArrowRight className="career-arrow" size={16} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
