import type { Locale } from '../locales/types';

export type LocalizedText = Record<Locale, string>;

export const localized = (pt: string, en: string, es: string): LocalizedText => ({
  'pt-BR': pt,
  'en-US': en,
  'es-ES': es,
});

export const pickText = (value: LocalizedText, locale: Locale) => value[locale];
