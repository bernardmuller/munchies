import { Router } from 'express';
import { endpoints } from './endpoints';
import {
  Endpoint,
  createEndpoint,
  getSourceFolderfromCurrentDirectory,
} from './utils';
import path from 'path';

export const router = Router();

export const endpoint = (endpoint: any) => endpoint;
endpoints.forEach((endpoint) => createEndpoint(router, endpoint as Endpoint));

export const createSplashScreen = (router: Router) => {
  router.get('/api', (req, res) => {
    res.sendFile(
      path.join(
        getSourceFolderfromCurrentDirectory(__dirname) + 'src/views/home.html',
      ),
    );
  });
};
