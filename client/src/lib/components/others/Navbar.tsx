import Link from 'next/link';
import { IDictionary } from '../../interfaces/IDictionary';
import LanguageSwitcher from './LangSwitcher';
import { Locale } from '../../i18n/config';
import Navs from './Navs';

interface NavbarProps {
  dict: IDictionary;
  lang: Locale;
}

export default function Navbar({ dict, lang }: NavbarProps) {
  return (
    <nav className="flex items-center justify-between bg-blue-700 p-3">
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
        <Navs dict={dict} lang={lang} />
      </div>
    </nav>
  );
}
