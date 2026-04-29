import en from '@/locales/en.json';
import es from '@/locales/es.json';

export type Locale = 'en' | 'es';

const dictionaries = {
  en,
  es,
};

export const defaultLocale: Locale = 'en';
export const locales: Locale[] = ['en', 'es'];

export function getDictionary(locale: Locale) {
  return dictionaries[locale] || dictionaries[defaultLocale];
}

export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split('/');
  const potentialLocale = segments[1] as Locale;
  return locales.includes(potentialLocale) ? potentialLocale : defaultLocale;
}
