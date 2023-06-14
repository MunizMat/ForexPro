'use client';
import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Link from 'next/link';
import { IDictionary } from '../../interfaces/IDictionary';
import LanguageSwitcher from './LangSwitcher';
import { Locale } from '../../i18n/config';

interface NavbarProps {
  dict: IDictionary;
  lang: Locale;
}

export default function Navbar({ dict, lang }: NavbarProps) {
  const { authState, logout } = useContext(AuthContext);

  function getNavs() {
    return authState.isAuthenticated ? (
      <button className="text-white no-underline" onClick={logout}>
        {dict.navbar.logout}
      </button>
    ) : (
      <>
        <Link href={`/${lang}/signup`} className="mr-4 text-white no-underline">
          {dict.navbar.signup}
        </Link>
        <Link href={`/${lang}/login`} className="text-white no-underline">
          {dict.navbar.login}
        </Link>
      </>
    );
  }

  return (
    <nav className="flex flex items-center justify-between bg-blue-700 p-3">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link
          href={`/${lang}`}
          className="text-white no-underline font-semibold text-2xl tracking-tight"
        >
          ForexPro
        </Link>
      </div>
      <div className="flex mr-6 items-center">
        <LanguageSwitcher locale={lang} />
        {getNavs()}
      </div>
    </nav>
  );
}
