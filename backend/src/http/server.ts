import express, { application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { router } from './routes';
import { errorHandler } from './errors';
import path from 'path';
import { getSourceFolderfromCurrentDirectory } from './utils';

export const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      credentials: true,
      origin: [
        'https://munchiesapp.co.za',
        'http://localhost:3000',
        'http://192.168.8.160:19006',
        'http://localhost:19006',
        'http://localhost:4000',
        'https://munchies.bernardmuller.dev',
        'https://munchies.bernardmuller.co.za',
      ],
    }),
  );

  app.use(express.json());
  app.get('/', (req, res) => {
    res.send('Munchies api');
  });
  app.use('/api', router);
  // createSplashScreen(router);
  app.get('/api', (req, res) => {
    try {
      res.sendFile(
        path.join(
          getSourceFolderfromCurrentDirectory(__dirname) + '/views/home.html',
        ),
      );
    } catch (error) {
      res.send('munchies api');
    }
  });
  app.use(errorHandler);

  return app;
};
