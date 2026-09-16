import { Link } from 'react-router-dom';
import { profile } from '../../config/profile';
import { useI18n } from '../../i18n/I18nProvider';

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="container-shell flex flex-col md:flex-row gap-4 items-start md:items-center justify-between text-sm text-slate-500">
        <div><span className="footer-signature"><strong>GN</strong><i>/</i><span>INFRA</span></span> {t('footer.tagline')}</div>
        <div className="flex gap-4 flex-wrap">
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={`mailto:${profile.email}`}>E-mail</a>
          <Link to="/projects">{t('footer.projects')}</Link>
          <Link to="/lab">{t('footer.lab')}</Link>
        </div>
      </div>
    </footer>
  );
}
