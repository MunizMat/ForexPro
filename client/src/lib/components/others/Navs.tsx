'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Locale } from '../../i18n/config';
import { IDictionary } from '../../interfaces/IDictionary';

interface Props {
  dict: IDictionary;
  lang: Locale;
}

function Navs({ dict, lang }: Props) {
  const { authState, logout } = useContext(AuthContext);

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

export default Navs;
