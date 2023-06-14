import TradeHistory from 'src/lib/components/tradeHistory';
import React, { ReactNode } from 'react';
import { getDictionary } from 'src/lib/i18n/getDictionary';
import { Locale } from 'src/lib/i18n/config';

interface Props {
  children: ReactNode;
  params: {
    lang: Locale;
  };
}

export default async function Layout({ children, params }: Props) {
  const dict = await getDictionary(params.lang);
  const childrenWithProps = React.Children.map(children, (child) =>
    React.cloneElement(child as React.ReactElement<any>, { dict })
  );
  return (
    <div>
      {childrenWithProps}
      <TradeHistory locale={params.lang} dict={dict} />
    </div>
  );
}
