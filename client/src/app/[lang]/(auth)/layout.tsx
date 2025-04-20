import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="container p-0 mx-auto w-75 bg-white my-10">
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 p-0">
          <div data-testid="background-image" className="h-full binance-img" />
        </div>
        <div className="w-full md:w-1/2">{children}</div>
      </div>
    </div>
  );
}
