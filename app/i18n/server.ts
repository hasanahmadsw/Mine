import { Locale, i18n } from './settings';
import type { TranslationsType } from './client.tsx';

// Load translations based on locale
export async function getTranslations(locale: Locale): Promise<TranslationsType> {
  try {
    return (await import(`./locales/${locale}.json`)).default;
  } catch (error) {
    console.error(`Error loading translations for locale "${locale}":`, error);
    return {};
  }
}

// Middleware function to validate locale or redirect to default locale
export function validateLocale(locale: string | undefined): locale is Locale {
  if (!locale || !i18n.locales.includes(locale as Locale)) {
    return false;
  }
  return true;
} 