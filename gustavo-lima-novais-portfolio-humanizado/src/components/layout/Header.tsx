import { useEffect, useRef, useState } from 'react';
import { Check, Command, Globe2, Menu, Moon, Sun, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '../../i18n/I18nProvider';
import { localeLabels, localeShort, type Locale } from '../../locales/types';

type Props = { onOpenPalette?: () => void };

type NavItem = [string, string];

export default function Header({ onOpenPalette }: Props) {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => (localStorage.getItem('theme') as 'dark' | 'light') || 'dark');
  const location = useLocation();
  const languageRef = useRef<HTMLDivElement | null>(null);

  const nav: NavItem[] = [
    [t('nav.home'), '/#inicio'],
    [t('nav.about'), '/#sobre'],
    [t('nav.stack'), '/#stack'],
    [t('nav.projects'), '/#projetos'],
    [t('nav.experience'), '/#experiencia'],
    [t('nav.lab'), '/lab'],
    [t('nav.contact'), '/#contato'],
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 18);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    setOpen(false);
    setLanguageOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onPointer = (event: MouseEvent) => {
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) setLanguageOpen(false);
    };
    document.addEventListener('mousedown', onPointer);
    return () => document.removeEventListener('mousedown', onPointer);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.dataset.theme = next;
  };

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const chooseLocale = (next: Locale) => {
    setLocale(next);
    setLanguageOpen(false);
  };

  const renderNavItem = ([label, href]: NavItem, mobile = false) => {
    const className = mobile ? 'mobile-nav-item' : 'header-nav-link';

    if (href.startsWith('/#')) {
      return <a key={href} href={href} className={className} onClick={mobile ? () => setOpen(false) : undefined}>{label}</a>;
    }

    return <Link key={href} to={href} className={className} onClick={mobile ? () => setOpen(false) : undefined}>{label}</Link>;
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? 'header-scrolled' : 'bg-transparent'}`}>
      <a className="skip-link" href="#main">{t('a11y.skip')}</a>

      <div className="container-shell header-inner">
        <Link to="/" aria-label={t('a11y.home')} className="header-brand">
          <span className="header-brand-primary">GN</span>
          <span className="header-brand-divider" aria-hidden="true">/</span>
          <span className="header-brand-secondary">INFRA</span>
        </Link>

        <nav className="hidden xl:flex items-center" aria-label="Primary navigation">
          {nav.map((item) => renderNavItem(item))}
        </nav>

        <div className="header-actions">
          <div className="relative" ref={languageRef}>
            <button
              className="language-trigger"
              onClick={() => setLanguageOpen(v => !v)}
              aria-haspopup="menu"
              aria-expanded={languageOpen}
              aria-label={t('nav.language')}
            >
              <Globe2 size={15} />
              <span className="mono text-xs">{localeShort[locale]}</span>
            </button>

            {languageOpen && (
              <div className="language-menu" role="menu">
                {(Object.keys(localeLabels) as Locale[]).map((item) => (
                  <button key={item} role="menuitem" onClick={() => chooseLocale(item)} className="language-option">
                    <span>
                      <strong>{localeShort[item]}</strong>
                      <small>{localeLabels[item]}</small>
                    </span>
                    {item === locale && <Check size={15} className="text-cyan-300" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="palette-trigger hidden lg:inline-flex" onClick={onOpenPalette} aria-label={t('a11y.openPalette')}>
            <Command size={15} />
            <span className="mono">Ctrl K</span>
          </button>

          <button className="icon-button" onClick={toggleTheme} aria-label={t('a11y.toggleTheme')}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button className="icon-button xl:hidden" onClick={() => setOpen(v => !v)} aria-label={open ? t('a11y.closeMenu') : t('a11y.openMenu')}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="xl:hidden mobile-nav-shell">
          <div className="container-shell py-3 grid grid-cols-2 gap-2">
            {nav.map((item) => renderNavItem(item, true))}
            <button onClick={() => { setOpen(false); onOpenPalette?.(); }} className="mobile-nav-item text-cyan-200">
              <Command size={16} /> {t('nav.commands')}
            </button>
            <div className="col-span-2 mt-1 grid grid-cols-3 gap-2" aria-label={t('nav.language')}>
              {(Object.keys(localeLabels) as Locale[]).map((item) => (
                <button
                  key={item}
                  className={`min-h-11 rounded-xl border text-xs ${item === locale ? 'border-cyan-300/30 bg-cyan-300/[.06] text-cyan-200' : 'border-white/5 text-slate-400'}`}
                  onClick={() => chooseLocale(item)}
                >
                  {localeShort[item]} · {localeLabels[item]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
