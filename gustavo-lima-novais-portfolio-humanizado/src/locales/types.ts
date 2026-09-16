export type Locale = 'pt-BR' | 'en-US' | 'es-ES';

export type LocaleDictionary = Record<string, string>;

export const localeLabels: Record<Locale, string> = {
  'pt-BR': 'Português',
  'en-US': 'English',
  'es-ES': 'Español',
};

export const localeShort: Record<Locale, string> = {
  'pt-BR': 'PT',
  'en-US': 'EN',
  'es-ES': 'ES',
};
