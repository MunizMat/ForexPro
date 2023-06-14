import tradingImage from '@/images/tradingImage.jpg';
import Image from 'next/image';
import Link from 'next/link';
import { Locale } from 'src/lib/i18n/config';
import { getDictionary } from '../../lib/i18n/getDictionary';

interface PageProps {
  params: {
    lang: Locale;
  };
}

export default async function Page({ params: { lang } }: PageProps) {
  const dict = await getDictionary(lang);
  return (
    <div className="flex flex-row gap-8 px-10 ">
      <div className="flex flex-col gap-6">
        <h1 className="text-9xl text-white">{dict.home.title}</h1>
        <h3 className="text-4xl text-white font-light">{dict.home.subtitle}</h3>
        <button className="bg-blue-700 hover:bg-blue-800 text-white w-1/2  py-3 px-6 rounded-lg text-lg">
          <Link href="/signup" className="text-white no-underline">
            {dict.home.buttonText}
          </Link>
        </button>
      </div>
      <Image
        data-testid="home-image"
        className="rounded-lg"
        alt="trading-image"
        src={tradingImage}
        width={600}
      />
    </div>
  );
}
