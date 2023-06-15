import { ForexPro } from '../src/index';
import App from '../src/api/app';
import Server from '../src/api/server';
import Socket from '../src/api/socket';

jest.mock('../src/api/app', () =>
  jest.fn().mockReturnValue({ app: jest.fn() }),
);
jest.mock('../src/api/server', () =>
  jest.fn().mockReturnValue({ server: jest.fn() }),
);
jest.mock('../src/api/socket', () => jest.fn());

describe('Application entry point', () => {
  it('should initialize the app', () => {
    ForexPro.init();
    expect(App).toHaveBeenCalled();
    expect(Server).toHaveBeenCalled();
    expect(Socket).toHaveBeenCalled();
  });
});
