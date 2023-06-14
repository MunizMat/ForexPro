import CurrencyServices from '../../../src/api/services/currencyServices';

jest.mock('metaapi.cloud-sdk', () => {
  const mockAccount = {
    getStreamingConnection: jest.fn().mockReturnValue({
      connect: jest.fn(),
      waitSynchronized: jest.fn(),
      terminalState: {
        price: jest.fn().mockReturnValue({
          ask: 1.2,
          bid: 1.1,
          time: 1622555555000,
          symbol: 'GBPUSD',
        }),
      },
      subscribeToMarketData: jest.fn(),
    }),
  };

  const mockMetaApi = jest.fn().mockImplementation(() => ({
    metatraderAccountApi: {
      getAccount: jest.fn().mockReturnValue(mockAccount),
    },
  }));

  const mockStreamingMetaApiConnectionInstance = {
    terminalState: {
      price: jest.fn(),
    },
  };

  return {
    __esModule: true,
    default: mockMetaApi,
    StreamingMetaApiConnectionInstance: mockStreamingMetaApiConnectionInstance,
  };
});

// Mock the dotenv library
jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

describe('CurrencyServices', () => {
  beforeEach(() => {
    process.env.META_API_ACCOUNT_ID = 'fakeId';
    process.env.META_API_TOKEN = 'fakeToken';
  });

  afterEach(() => {
    jest.clearAllMocks();
    delete process.env.META_API_ACCOUNT_ID;
    delete process.env.META_API_TOKEN;
  });

  it('should fetch rates for a currency pair', async () => {
    const currencyPair = 'GBPUSD';
    const currencyServices = await CurrencyServices.init();

    const rates = currencyServices.getRates(currencyPair);

    expect(rates).toEqual({
      askPrice: 1.2,
      bidPrice: 1.1,
      updatedAt: 1622555555000,
      symbol: 'GBPUSD',
    });
    expect(
      currencyServices.connection.terminalState.price,
    ).toHaveBeenCalledWith(currencyPair);
  });
});
