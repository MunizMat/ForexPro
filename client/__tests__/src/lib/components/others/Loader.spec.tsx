import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from '../../../../../src/lib/components/others/Loader';
import '@testing-library/jest-dom';

describe('Loader', () => {
  it('should render the loader component', () => {
    render(<Loader />);
    const spinnerElement = screen.getByRole('status');
    expect(spinnerElement).toBeInTheDocument();
    expect(spinnerElement).toHaveClass('loader');
  });
});
