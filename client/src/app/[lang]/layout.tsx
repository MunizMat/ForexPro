import Navbar from 'src/lib/components/others/Navbar';
import '@/styles/global.css';
import 'react-toastify/dist/ReactToastify.css';
import '/node_modules/flag-icons/css/flag-icons.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from 'src/lib/providers/AuthProvider';
import { getDictionary } from 'src/lib/i18n/getDictionary';
import { ReactNode } from 'react';
import { Locale, i18n } from 'src/lib/i18n/config';
import ClientToastContainer from 'src/lib/components/others/ClientToastContainer';
import ClientSSRProvider from 'src/lib/components/others/ClientSSRProvider';
import { Metadata } from 'next';

interface RootLayoutProps {
  children: ReactNode;
  params: {
    lang: Locale;
  };
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const metadata: Metadata = {
  title: 'ForexPro',
};

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const dict = await getDictionary(params.lang);
  return (
    <html lang={params.lang}>
      <body>
        <ClientSSRProvider>
          <AuthProvider dict={dict} locale={params.lang}>
            <ClientToastContainer />
            <Navbar lang={params.lang} dict={dict} />
            <div className="root flex flex-col justify-center align-center ">
              {children}
            </div>
          </AuthProvider>
        </ClientSSRProvider>
      </body>
    </html>
  );
}
