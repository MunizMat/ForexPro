import mockDict from '../../../../../mocks/dict';
import LoginForm from '../../../../../src/lib/components/forms/LoginForm';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Login form component', () => {
  it('should render form fields', () => {
    render(<LoginForm dict={mockDict} />);

    const emailInput = screen.getByLabelText('Email');
    const formButton = screen.getByText('Enter');

    expect(screen.getByText('Login to your account')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    fireEvent.click(formButton);

    expect(
      screen.getByText('Please enter a valid email address')
    ).toBeInTheDocument();
  });
});
