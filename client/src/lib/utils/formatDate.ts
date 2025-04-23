import { Locale } from '../i18n/config';

export default function formatDate(date: Date, locale: Locale) {
  const formatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
    timeZone: 'America/Sao_Paulo',
    hour12: true,
  });

  return formatter.format(date);
}
