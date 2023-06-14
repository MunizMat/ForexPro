import { IUser } from '../../../../src/lib/interfaces/IUser';
import mockDict from '../../../../mocks/dict';
import getTradeTypeTranslation from '../../../../src/lib/utils/getTradeTypeTranslation';

describe('getTradeTypeTranslation util function', () => {
  it('should get the correct translation for the specified component', () => {
    const mockUser = {
      id: 1,
      trades: [
        { tradeType: 'Sell' },
        { tradeType: 'Sell' },
        { tradeType: 'Buy' },
      ],
    } as IUser;
    const translation = getTradeTypeTranslation(mockUser, mockDict);

    expect(translation).toBe('Buy');
  });
});
