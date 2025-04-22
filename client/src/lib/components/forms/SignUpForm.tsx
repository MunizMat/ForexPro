'use client';

import { FormEvent, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Stack } from 'react-bootstrap';
import Field from './Field';
import { usePasswordToggle } from '../../hooks/usePasswordToggle';
import Link from 'next/link';
import { IFormProps } from '../../interfaces/props/IFormProps';
import useField from '../../hooks/useField';
import useFormValidation from '../../hooks/useFormValidation';
import { ISignUpFields } from '../../interfaces/ISignUpFields';
import getSignupSchema from '../../validations/signUpSchema';
import { AuthContext } from '../../contexts/AuthContext';
import { useAPIHealthCheck } from 'src/lib/hooks/useAPIHealthCheck';

function SignUpForm({ dict }: IFormProps) {
  const { signup } = useContext(AuthContext);
  useAPIHealthCheck();
  //    Custom hooks
  const { errors, validateForm } = useFormValidation<ISignUpFields>(
    dict,
    getSignupSchema
  );
  const [passwordInputType, passwordToggleIcon] = usePasswordToggle();
  const [passwordConfirmationInputType, passwordConfirmationToggleIcon] =
    usePasswordToggle();

  const { value: name, onChange: nameOnChange } = useField();
  const { value: email, onChange: emailOnChange } = useField();
  const { value: password, onChange: passwordOnChange } = useField();
  const { value: passwordConfirmation, onChange: passwordConfOnChange } =
    useField();

  // Handlers
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm({ name, email, password, passwordConfirmation })) return;

    await signup({ name, email, password });
  };
  return (
    <Stack
      as={Form}
      noValidate
      gap={3}
      className="text-black p-4"
      onSubmit={handleSubmit}
    >
      <h1 className="display-5">{dict.signup.title}</h1>
      <small>
        {dict.signup.alreadyHaveAccount}{' '}
        <Link
          style={{ color: 'blue', textDecoration: 'underline' }}
          href="/login"
        >
          {dict.signup.clickHere}
        </Link>{' '}
        {dict.signup.toLogin}
      </small>
      <Field
        controlId="name"
        label={dict.formLabels.name}
        type="text"
        value={name}
        onChange={nameOnChange}
        isInvalid={!!errors.name}
        isPasswordField={false}
        errorMessage={errors.name}
        passwordToggleIcon={null}
      />
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
      <small className="my-1" style={{ color: 'black' }}>
        {dict.signup.passwordRequirements}
        <br />
        {dict.signup.passwordRequirements1}
        <br />
        {dict.signup.passwordRequirements2}
        <br />
        {dict.signup.passwordRequirements3}
      </small>
      <Field
        controlId="passwordConfirmation"
        label={dict.formLabels.confirmPassword}
        type={passwordConfirmationInputType}
        value={passwordConfirmation}
        onChange={passwordConfOnChange}
        isInvalid={!!errors.passwordConfirmation}
        isPasswordField={true}
        errorMessage={errors.passwordConfirmation}
        passwordToggleIcon={passwordConfirmationToggleIcon}
      />
      <Button variant="primary" type="submit">
        {dict.signup.buttonText}
      </Button>
    </Stack>
  );
}

export default SignUpForm;
