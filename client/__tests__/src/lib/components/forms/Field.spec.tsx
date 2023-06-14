import { IFieldProps } from '../../../../../src/lib/interfaces/props/IFieldProps';
import Field from '../../../../../src/lib/components/forms/Field';
import { render, screen } from '@testing-library/react';

describe('Form Field component', () => {
  const mockFieldProps: IFieldProps = {
    isPasswordField: false,
    controlId: 'email',
    label: 'Email',
    type: 'email',
    value: '',
    onChange: () => null,
    isInvalid: false,
    errorMessage: undefined,
    passwordToggleIcon: <div>Fake Icon</div>,
  };

  it('should render a valid email field', () => {
    render(<Field {...mockFieldProps} />);

    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('should render a valid password field', () => {
    const mockProps: IFieldProps = {
      ...mockFieldProps,
      isPasswordField: true,
    };
    render(<Field {...mockProps} />);

    expect(screen.getByTestId('span')).toBeInTheDocument();
  });

  it('should render error message if there is one', () => {
    const mockProps: IFieldProps = {
      ...mockFieldProps,
      errorMessage: 'Invalid Field',
      isInvalid: true,
    };

    render(<Field {...mockProps} />);

    expect(screen.getByTestId('error-message')).toBeInTheDocument();
  });
});
