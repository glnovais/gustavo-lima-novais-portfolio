import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { ptBR } from '../locales/pt-BR';
import { enUS } from '../locales/en-US';
import { esES } from '../locales/es-ES';
import type { Locale, LocaleDictionary } from '../locales/types';

const dictionaries: Record<Locale, LocaleDictionary> = {
  'pt-BR': ptBR,
  'en-US': enUS,
  'es-ES': esES,
};

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const isLocale = (value: string | null): value is Locale => value === 'pt-BR' || value === 'en-US' || value === 'es-ES';

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = localStorage.getItem('portfolio-locale');
    return isLocale(saved) ? saved : 'pt-BR';
  });

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    localStorage.setItem('portfolio-locale', next);
  };

  const value = useMemo<I18nContextValue>(() => ({
    locale,
    setLocale,
    t: (key: string) => dictionaries[locale][key] ?? dictionaries['pt-BR'][key] ?? key,
  }), [locale]);

  useEffect(() => {
    const d = dictionaries[locale];
    document.documentElement.lang = locale;
    document.title = d['meta.title'];
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const ogDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    const twitterDescription = document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]');
    const ogLocale = document.querySelector<HTMLMetaElement>('meta[property="og:locale"]');
    description?.setAttribute('content', d['meta.description']);
    ogDescription?.setAttribute('content', d['meta.description']);
    twitterDescription?.setAttribute('content', d['meta.description']);
    ogLocale?.setAttribute('content', locale.replace('-', '_'));
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const value = useContext(I18nContext);
  if (!value) throw new Error('useI18n must be used inside I18nProvider');
  return value;
}
