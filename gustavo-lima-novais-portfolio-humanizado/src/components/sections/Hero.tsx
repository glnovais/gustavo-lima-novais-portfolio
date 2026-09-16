import {
  Activity,
  ArrowRight,
  ClipboardCheck,
  Download,
  Linkedin,
  Mail,
  Network,
  Server,
  ShieldCheck,
  TerminalSquare,
} from 'lucide-react';
import { profile } from '../../config/profile';
import { useI18n } from '../../i18n/I18nProvider';

export default function Hero() {
  const { t } = useI18n();

  const areas = [
    [t('hero.ad'), ShieldCheck],
    [t('hero.windows'), Server],
    [t('hero.networks'), Network],
    [t('hero.automation'), TerminalSquare],
    [t('hero.monitoring'), Activity],
    [t('hero.governance'), ClipboardCheck],
  ] as const;

  const focus = [
    'Active Directory',
    'Windows Server',
    'PowerShell',
    t('hero.monitoring'),
  ] as const;

  return (
    <section id="inicio" className="hero-section">
      <div className="hero-orbit hero-orbit-a" />
      <div className="hero-orbit hero-orbit-b" />
      <div className="hero-network-bg" aria-hidden="true">
        <i /><i /><i /><i /><i />
      </div>

      <div className="container-shell hero-grid">
        <div className="reveal min-w-0 hero-content">
          <div className="section-kicker">{t('hero.kicker')}</div>
          <div className="hero-nameplate">{t('hero.eyebrow')}</div>

          <h1 className="hero-title">
            <span>{t('hero.titleA')}</span>
            <strong>{t('hero.titleB')}</strong>
          </h1>

          <div className="hero-identity">
            <div className="hero-identity-line" />
            <div>
              <p className="hero-person">{profile.name}</p>
              <p className="hero-role">{profile.role}</p>
              <div className="hero-specialties" aria-label={t('hero.coreTechnologies')}>
                <span>Active Directory</span>
                <span>Windows Server</span>
                <span>PowerShell</span>
                <span>{t('hero.monitoring')}</span>
              </div>
            </div>
          </div>

          <p className="hero-copy">{t('hero.body')}</p>

          <div className="hero-actions">
            <a href="#projetos" className="btn btn-primary">{t('hero.primary')} <ArrowRight size={17} /></a>
            <a href="#experiencia" className="btn btn-ghost">{t('hero.secondary')}</a>
            {profile.resumeAvailable && (
              <a
                className="hero-resume-link"
                href={profile.resume}
                download="Gustavo_Lima_Novais.pdf"
                type="application/pdf"
              >
                <Download size={16} />{t('hero.resume')}
              </a>
            )}
          </div>

          <div className="hero-contact-links">
            <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={15} /> LinkedIn</a>
            <a href={`mailto:${profile.email}`}><Mail size={15} /> {profile.email}</a>
          </div>
        </div>

        <div className="hero-visual reveal">
          <div className="portrait-grid" aria-hidden="true" />
          <div className="portrait-frame">
            <div className="portrait-corner portrait-corner-a" />
            <div className="portrait-corner portrait-corner-b" />
            <picture>
              <source srcSet={profile.photo} type="image/webp" />
              <img
                src={profile.photoFallback}
                alt={`${t('hero.photoAlt')} ${profile.name}`}
                className="portrait-image"
                loading="eager"
                fetchPriority="high"
              />
            </picture>
            <div className="portrait-caption">
              <span className="mono">{profile.shortName.toUpperCase()}</span>
              <strong>{t('hero.photoRole')}</strong>
            </div>
          </div>

          <div className="profile-status-panel" aria-label={t('hero.focusLabel')}>
            <div className="profile-status-head">
              <span className="mono">{t('hero.focusLabel')}</span>
            </div>
            <div className="profile-status-grid">
              {focus.map((label) => (
                <div className="profile-status-row" key={label}>
                  <span>{label}</span>
                  <i className="w-1.5 h-1.5 rounded-full bg-cyan-300/70" aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container-shell hero-technology-wrap">
        <div className="technology-rail">
          <div className="technology-rail-intro">
            <span className="mono">{t('hero.snapshot')}</span>
            <small>{t('hero.snapshotNote')}</small>
          </div>
          <div className="technology-rail-items">
            {areas.map(([label, Icon]) => (
              <div className="technology-rail-item" key={label}>
                <Icon size={15} />
                <span>{label}</span>
                <i />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
