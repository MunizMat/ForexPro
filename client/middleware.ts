import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from './src/lib/i18n/config';
import { getLocale } from './src/lib/i18n/getLocale';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (['/images', '/favicon.ico'].includes(pathname)) return;

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url)
    );
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
