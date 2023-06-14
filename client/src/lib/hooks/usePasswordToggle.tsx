import { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

type PasswordInputType = 'text' | 'password';

export const usePasswordToggle = (): [PasswordInputType, JSX.Element] => {
  const [isVisible, setVisibility] = useState(false);

  const toggleIcon = isVisible ? (
    <BsEyeSlash
      id="bs-eyeslash"
      data-testid="bs-eyeslash"
      size={25}
      onClick={() => {
        setVisibility(false);
      }}
    />
  ) : (
    <BsEye
      id="bs-eye"
      data-testid="bs-eye"
      size={25}
      onClick={() => {
        setVisibility(true);
      }}
    />
  );

  const passwordInputType: PasswordInputType = isVisible ? 'text' : 'password';

  return [passwordInputType, toggleIcon];
};
