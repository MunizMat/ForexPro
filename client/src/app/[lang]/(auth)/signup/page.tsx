import SignUpForm from 'src/lib/components/forms/SignUpForm';
import { getDictionary } from 'src/lib/i18n/getDictionary';
import { IPageProps } from 'src/lib/interfaces/props/IPageProps';

export default async function Page({ params }: IPageProps) {
  const dict = await getDictionary(params.lang);
  return <SignUpForm locale={params.lang} dict={dict} />;
}
