import TradeType from '../../../../../src/lib/components/dashboard/TradeType';
import { render, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import mockDict from '../../../../../mocks/dict';
import { Locale } from '../../../../../src/lib/i18n/config';
import useTrade from '../../../../../src/lib/hooks/useTrade';

jest.mock('../../../../../src/lib/hooks/useTrade', () =>
  jest.fn().mockReturnValue({
    handleTrade: jest.fn(),
    setAmount: jest.fn(),
  })
);

describe('TradeType component', () => {
  const mockProps = {
    i18nData: {
      dict: mockDict,
      locale: 'en-US' as Locale,
    },
    tradeData: {
      baseCurrency: 'GBP',
      exchangeRate: 1.5,
      tradeType: 'Buy',
      currencyPair: 'GBPUSD',
    },
    updatedAt: '2022-01-01T00:00:00.000Z' as unknown as Date,
  };

  it('should render the component correctly', () => {
    render(<TradeType {...mockProps} />);

    expect(screen.getByText('1.5')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Amount')).toBeInTheDocument();
    expect(screen.getByText('Buy')).toBeInTheDocument();
  });

  it('should call tradeHandler when the button is clicked', () => {
    const hookSpy = jest.spyOn(useTrade('GBPUSD', mockDict), 'handleTrade');
    render(<TradeType {...mockProps} />);

    const amountInput = screen.getByPlaceholderText('Amount');
    const tradeButton = screen.getByText('Buy');

    fireEvent.change(amountInput, { target: { value: '10' } });
    fireEvent.click(tradeButton);

    expect(hookSpy).toHaveBeenCalledWith(mockProps.tradeData);
  });
});
