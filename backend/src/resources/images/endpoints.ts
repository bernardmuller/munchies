import { Request, Response } from 'express';
import { uploadImage } from './actions';

const endpoints = [
  {
    method: 'post',
    path: '/images/upload',
    handler: async (req: Request, res: Response) => {
      const { file } = req.body;
      if (!file) throw new Error('No file provided');
      const response = await uploadImage(file);
      return res.status(200).send(response);
    },
    authenticate: true,
  },
];

export default endpoints;
