'use client';

import { ReactNode } from 'react';
import { SSRProvider } from 'react-bootstrap';

export default function ClientSSRProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <SSRProvider>{children}</SSRProvider>;
}
