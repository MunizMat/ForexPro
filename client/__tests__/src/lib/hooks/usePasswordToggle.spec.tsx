import { fireEvent, render, screen } from '@testing-library/react';
import { usePasswordToggle } from '../../../../src/lib/hooks/usePasswordToggle';

describe('usePasswordToggle hook', () => {
  it('should toggle password visibility', () => {
    const TestComponent = () => {
      const [passwordInputType, toggleIcon] = usePasswordToggle();
      return (
        <>
          {toggleIcon}
          <input type={passwordInputType} data-testid="password-input" />
        </>
      );
    };

    const { container } = render(<TestComponent />);
    const passwordInput = screen.getByTestId('password-input');
    const toggleIcon = container.firstElementChild!;

    expect(passwordInput.getAttribute('type')).toBe('password');
    expect(toggleIcon.id).toBe('bs-eye');

    fireEvent.click(toggleIcon);

    expect(passwordInput.getAttribute('type')).toBe('text');
  });
});
