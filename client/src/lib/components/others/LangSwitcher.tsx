'use client';
import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { Locale, i18n } from '../../i18n/config';
import Link from 'next/link';
import LangItem from './LangItem';
import { usePathname } from 'next/navigation';

const LanguageSwitcher = ({ locale }: { locale: Locale }) => {
  const pathName = usePathname();
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };
  const country = locale.split('-')[1];

  return (
    <NavDropdown
      style={{ maxHeight: '30px' }}
      className="mr-6 text-white  rounded-md d-flex  justify-content-center"
      title={
        <span
          style={{ width: '2.5rem', lineHeight: '1.3rem' }}
          className={`fi fi-${country.toLowerCase()}`}
        ></span>
      }
      id="language-switcher"
    >
      {i18n.locales.map((locale) => (
        <NavDropdown.Item key={locale}>
          <Link
            className="text-black no-underline"
            href={redirectedPathName(locale)}
          >
            <LangItem locale={locale} />
          </Link>
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  );
};

export default LanguageSwitcher;
