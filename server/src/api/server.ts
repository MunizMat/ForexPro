import { createServer, Server } from 'http';
import { Application } from 'express';
import { config } from 'dotenv';

config();

class MyServer {
  public server: Server;
  public port: string | 3000;
  constructor(app: Application) {
    this.server = createServer(app);
    this.port = process.env.PORT || 3000;
    this.listen();
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
      console.log(`http://localhost:${this.port}`);
    });
  }
}

export default MyServer;
