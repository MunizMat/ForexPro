import { render, screen } from '@testing-library/react';
import LanguageSwitcher from '../../../../../src/lib/components/others/LangSwitcher';

describe('Language Switcher', () => {
  it('should render dropdown', () => {
    render(<LanguageSwitcher locale="en-US" />);
    expect(screen.getByText('US')).toBeInTheDocument();
  });
});
