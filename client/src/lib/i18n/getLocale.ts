import Negotiator from 'negotiator';
import { NextRequest } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import { i18n } from './config';

export function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Use negotiator and intl-localematcher to get best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;
  return match(languages, locales, i18n.defaultLocale);
}
