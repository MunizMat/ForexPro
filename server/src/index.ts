import App from './api/app';
import Server from './api/server';
import Socket from './api/socket';

export class ForexPro {
  static init() {
    const app = new App();
    const server = new Server(app.app);
    const socket = new Socket(server.server);
    return socket;
  }
}

export const socket = ForexPro.init();
