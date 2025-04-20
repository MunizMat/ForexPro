'use client';

import { FormEvent, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Stack } from 'react-bootstrap';
import { usePasswordToggle } from '../../hooks/usePasswordToggle';
import Field from './Field';
import { AuthContext } from '../../contexts/AuthContext';
import Link from 'next/link';
import { IFormProps } from '../../interfaces/props/IFormProps';
import useField from '../../hooks/useField';
import useFormValidation from '../../hooks/useFormValidation';
import { ILoginCredentials } from '../../interfaces/IUser';
import getLoginSchema from '../../validations/loginSchema';

export default function LoginForm({ dict }: IFormProps) {
  const { login } = useContext(AuthContext);
  //    Custom hooks
  const { errors, validateForm } = useFormValidation<ILoginCredentials>(
    dict,
    getLoginSchema
  );

  const { value: email, onChange: emailOnChange } = useField();
  const { value: password, onChange: passwordOnChange } = useField();

  const [passwordInputType, passwordToggleIcon] = usePasswordToggle();

  // Destructuring

  // Handlers
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm({ email, password })) return;
    await login({ email, password });
  };

  return (
    <Stack
      as={Form}
      noValidate
      gap={3}
      className="text-black p-4 h-100 d-flex flex-column"
      onSubmit={handleSubmit}
    >
      <h1 className="display-5">{dict.login.title}</h1>
      <small>
        {dict.login.dontHaveAccount}{' '}
        <Link
          style={{ color: 'blue', textDecoration: 'underline' }}
          href="/signup"
        >
          {dict.login.clickHere}
        </Link>{' '}
        {dict.login.toCreateAccount}
      </small>
      <Field
        controlId="email"
        label={dict.formLabels.email}
        type="email"
        value={email}
        onChange={emailOnChange}
        isInvalid={!!errors.email}
        isPasswordField={false}
        errorMessage={errors.email}
        passwordToggleIcon={null}
      />
      <Field
        controlId="password"
        label={dict.formLabels.password}
        type={passwordInputType}
        value={password}
        onChange={passwordOnChange}
        isInvalid={!!errors.password}
        isPasswordField={true}
        errorMessage={errors.password}
        passwordToggleIcon={passwordToggleIcon}
      />

      <Button variant="primary" type="submit">
        {dict.login.buttonText}
      </Button>
    </Stack>
  );
}
