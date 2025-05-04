import { NextRequest, NextResponse } from 'next/server';
import { i18n } from './app/i18n/settings';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = i18n.locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );
  
  // Get language preference from request
  const locale = getLocaleFromRequest(request);
  
  // Redirect if there is no locale in the pathname
  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? pathname : `/${pathname}`}`, request.url)
    );
  }
  
  return NextResponse.next();
}

// Define paths that don't need the locale prefix
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicons|robots.txt).*)']
};

// Get locale preference from request (cookies or headers)
function getLocaleFromRequest(request: NextRequest): string {
  // Check cookie first
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && i18n.locales.includes(cookieLocale as any)) {
    return cookieLocale;
  }
  
  // Then check accepted languages header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    // Parse the accept-language header
    const acceptedLanguages = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim().substring(0, 2));
    
    // Find the first accepted language that matches our supported locales
    for (const lang of acceptedLanguages) {
      if (i18n.locales.includes(lang as any)) {
        return lang;
      }
    }
  }
  
  // Default to the default locale
  return i18n.defaultLocale;
} 