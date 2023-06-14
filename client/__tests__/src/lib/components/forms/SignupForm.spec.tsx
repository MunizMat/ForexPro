import mockDict from '../../../../../mocks/dict';
import SignUpForm from '../../../../../src/lib/components/forms/SignUpForm';
import { fireEvent, render, screen } from '@testing-library/react';

describe('SignUp form component', () => {
  it('should render form fields', () => {
    render(<SignUpForm dict={mockDict} />);

    const emailInput = screen.getByLabelText('Email');
    const formButton = screen.getByText('Create Account');

    expect(screen.getByText('Sign Up for Free')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Confirm password')).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    fireEvent.click(formButton);

    expect(
      screen.getByText('Please enter a valid email address')
    ).toBeInTheDocument();
  });
});
