import { getDictionary } from 'src/lib/i18n/getDictionary';
import LoginForm from '../../../../lib/components/forms/LoginForm';
import { IPageProps } from 'src/lib/interfaces/props/IPageProps';

export default async function Page({ params }: IPageProps) {
  const dict = await getDictionary(params.lang);
  return <LoginForm dict={dict} />;
}
