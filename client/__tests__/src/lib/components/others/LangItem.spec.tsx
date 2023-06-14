import { render, screen } from '@testing-library/react';
import LangItem from '../../../../../src/lib/components/others/LangItem';

describe('LangItem', () => {
  it('should render Language Item', () => {
    render(<LangItem locale="en-US" />);

    expect(screen.getByText('US')).toBeInTheDocument();
  });
});
