import { Locale } from '../i18n/config';

export default function formatDate(
  date: Date,
  locale: Locale,
  timezone: string
) {
  const options = locale === 'pt-BR' ? {} : { timeZone: timezone };
  return `${date.toLocaleString(locale, options)} (${timezone})`;
}
