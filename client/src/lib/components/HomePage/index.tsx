'use client';

import tradingImage from '@/images/tradingImage.jpg';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { useAPIHealthCheck } from 'src/lib/hooks/useAPIHealthCheck';
import { IDictionary } from 'src/lib/interfaces/IDictionary';

interface HomePageProps {
  dict: IDictionary;
}

export const HomePage: FC<HomePageProps> = ({ dict }) => {
  useAPIHealthCheck();

  return (
    <div className="flex flex-row gap-8 px-10 ">
      <div className="flex flex-col gap-6">
        <h1 className="text-7xl text-white">{dict.home.title}</h1>
        <h3 className="text-xl text-white font-light">{dict.home.subtitle}</h3>
        <div className="flex gap-2 items-center w-full">
          <button className="bg-blue-700 hover:bg-blue-800 text-white max-w-[200px] py-2 px-6 rounded-md text-md transition-all duration-300">
            <Link href="/signup" className="text-white no-underline">
              {dict.home.buttonText}
            </Link>
          </button>

          {/* <span className="uppercase">{dict.home.or}</span>

          <button className="bg-blue-700/20 hover:bg-blue-800/70 text-white max-w-[270px] py-2 px-6 rounded-md text-md transition-all duration-300">
            <Link href="/signup" className="text-white no-underline">
              {dict.home.demoAccountButtonText}
            </Link>
          </button> */}
        </div>
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
};
