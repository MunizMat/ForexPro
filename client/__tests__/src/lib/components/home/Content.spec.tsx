import { render, screen } from '@testing-library/react';
import Content from '../../../../../src/lib/components/home/Content';
import React from 'react';
import '@testing-library/jest-dom';

describe('Home Content', () => {
  it('should render the home page title', () => {
    render(<Content />);

    const title = screen.getByText('ForexPro');

    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H1');
    expect(title).toHaveClass('display-1 fw-bold');
  });

  it('should render the home page subtitle', () => {
    render(<Content />);

    const subtitle = screen.getByText(
      'Empower Your Forex Trading Journey with Real-Time Data and Seamless User Experience'
    );

    expect(subtitle).toBeInTheDocument();
    expect(subtitle.tagName).toBe('H3');
    expect(subtitle).toHaveClass('fw-light');
  });

  it('should render the home page button', () => {
    render(<Content />);

    const button = screen.getByText('Start trading today');

    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe('A');
    expect(button).toHaveAttribute('href', '/signup');
  });
});
