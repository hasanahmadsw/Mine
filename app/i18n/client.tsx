'use client';

import { useParams } from 'next/navigation';
import { createContext, useContext, ReactNode } from 'react';
import { Locale, i18n } from './settings';

// Type for the translations object
export type TranslationsType = Record<string, any>;

// Create a context for translations
const TranslationsContext = createContext<TranslationsType>({});

// Context provider component
export function TranslationsProvider({
  children,
  translations,
}: {
  children: ReactNode;
  translations: TranslationsType;
}) {
  return (
    <TranslationsContext.Provider value={translations}>
      {children}
    </TranslationsContext.Provider>
  );
}

// Hook to use translations
export function useTranslations() {
  const translations = useContext(TranslationsContext);
  
  function t(key: string): string {
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      if (value === undefined) return key;
      value = value[k];
    }
    
    return value || key;
  }
  
  return { t };
}

// Hook to get the current locale
export function useCurrentLocale() {
  const params = useParams();
  const locale = params.lang as Locale;
  
  // Default to 'en' if locale is invalid
  if (!i18n.locales.includes(locale)) {
    return i18n.defaultLocale;
  }
  
  return locale;
}

// Utility function to switch languages
export function getAlternateLocale(locale: Locale): Locale {
  return locale === 'en' ? 'ar' : 'en';
} 