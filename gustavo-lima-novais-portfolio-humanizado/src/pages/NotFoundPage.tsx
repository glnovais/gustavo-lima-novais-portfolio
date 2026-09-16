import { RadioTower } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nProvider';

export default function NotFoundPage() {
  const { t } = useI18n();
  return <main className="min-h-screen grid place-items-center p-5"><div className="text-center max-w-xl"><div className="w-20 h-20 rounded-full border border-cyan-300/20 grid place-items-center mx-auto relative"><RadioTower className="text-cyan-300"/><span className="absolute inset-0 rounded-full border border-cyan-300/15 animate-ping"/></div><div className="mono text-xs text-cyan-300 mt-8">{t('404.kicker')}</div><h1 className="text-8xl font-semibold tracking-[-.08em] mt-3">404</h1><p className="text-slate-500 mt-4">{t('404.copy')}</p><Link to="/" className="btn btn-primary mt-8">{t('404.return')}</Link></div></main>;
}
