import { Request, Response } from 'express';
import {
  createListing,
} from './actions';

const endpoints = [
  {
    method: 'post',
    path: '/listings',
    handler: async (req: Request, res: Response) => {
      const { itemId, price } = req.body;
      const listing = await createListing({ itemId, price });
      return res.send(listing);
    },
    authenticate: false,
  },
];

export default endpoints;
