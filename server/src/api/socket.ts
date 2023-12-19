import { Server as HttpServer } from 'http';
import CurrencyServices from './services/currencyServices';
import { Socket as ioSocket, Server } from 'socket.io';

interface ConnectedClients {
  [id: number]: ioSocket;
}

class Socket {
  serverOptions: {
    cors: {
      origin: string;
      methods: string[];
    };
  };
  io: Server;
  connectedClients: ConnectedClients;

  constructor(server: HttpServer) {
    this.serverOptions = {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    };
    this.io = new Server(server, this.serverOptions);
    this.connectedClients = {};
    this.initConnection();
  }

  initConnection() {
    this.io.on('connection', async (socket) => {
      console.log('A client connected');
      socket.on('userId', (id) => {
        console.log(id);
        const previousSocket: ioSocket | undefined = this.connectedClients[id];
        if (previousSocket) {
          previousSocket.disconnect();
        }
        this.connectedClients[id] = socket;
      });
      const intervalId = await this.sendCurrencyRates(socket);

      socket.on('disconnect', () => {
        console.log('A user disconnected.');
        if (intervalId) clearInterval(intervalId);
      });
    });
  }

  async sendCurrencyRates(socket: ioSocket) {
    await CurrencyServices.init();

    socket.emit('sendRates', CurrencyServices.getRates('GBPUSD'));

    return setInterval(() => {
      socket.emit('sendRates', CurrencyServices.getRates('GBPUSD'));
    }, 1000);
  }

  emitToClient(userId: number, eventName: string, eventData: unknown) {
    const socket: ioSocket | undefined = this.connectedClients[userId];
    if (socket) {
      socket.emit(eventName, eventData);
    }
  }
}

export default Socket;
