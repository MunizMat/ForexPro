import { ReactNode } from 'react';
import { Locale } from 'src/lib/i18n/config';

export default async function Layout({
  children,
}: {
  children: ReactNode;
  params: { lang: Locale };
}) {
  return (
    <div className="container bg-dark w-75 dashboard mt-5">{children}</div>
  );
}
