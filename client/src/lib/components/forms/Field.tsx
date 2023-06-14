'use client';
import { FC } from 'react';
import { IFieldProps } from '../../interfaces/props/IFieldProps';

const Field: FC<IFieldProps> = ({
  isPasswordField,
  passwordToggleIcon,
  controlId,
  label,
  type,
  value,
  onChange,
  isInvalid,
  errorMessage,
}) => {
  return (
    <div
      className={`form-group ${
        isPasswordField ? 'password-toggle-parent' : ''
      }`}
    >
      <label htmlFor={controlId} className="block">
        {label}
      </label>
      <input
        id={controlId}
        type={type}
        value={value}
        onChange={onChange}
        className={`form-control ${isInvalid ? 'is-invalid' : ''}`}
      />
      {isPasswordField && (
        <span data-testid="span" className="password-toggle-icon">
          {passwordToggleIcon}
        </span>
      )}
      {isInvalid && (
        <div data-testid="error-message" className="invalid-feedback">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default Field;
