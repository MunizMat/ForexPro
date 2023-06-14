import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import errorHandler from './middlewares/errorHandler';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import { serverAdapter } from './config/bullBoard';

class App {
  app: Application;
  constructor() {
    this.app = express();
    this.useMiddlewares();
    this.useRoutes();
    this.useErrorHandler();
  }

  useMiddlewares() {
    this.app.use(cors({ origin: '*' }));
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
  }
  useRoutes() {
    this.app.use('/users', userRoutes);
    this.app.use('/auth', authRoutes);
    this.app.use('/admin/queues', serverAdapter.getRouter());
  }
  useErrorHandler() {
    this.app.use(errorHandler);
  }
}

export default App;
