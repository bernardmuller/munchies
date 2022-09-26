import express, { application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { router } from './routes';
import { errorHandler } from './errors';
import { createSplashScreen } from './routes';
import path from 'path';
import { getSourceFolderfromCurrentDirectory } from './utils';

export const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      credentials: true,
      origin: ['https://munchiesapp.co.za', 'http://localhost:3000'],
    }),
  );

  app.use(express.json());
  app.use('/api', router);
  // createSplashScreen(router);
  app.get('/api', (req, res) => {
    res.sendFile(
      path.join(
        getSourceFolderfromCurrentDirectory(__dirname) + '/views/home.html',
      ),
    );
  });
  app.use(errorHandler);

  return app;
};
