import { ErrorRequestHandler } from 'express';
import { AuthenticationError } from '../shared/errors';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) {
    next(err);
  }
  switch (err) {
    case err instanceof AuthenticationError:
      console.log('check');
      res.status(401).json({ error: { message: err.message } });
    default:
      res.status(401).json({ error: { message: err.message } });
      break;
  }
};

// else if (err ) {

// } else if (err instanceof AuthorizationError) {
//   res.status(403).json({ error: { message: err.message } });
// } else if (err instanceof NotFoundError) {
//   res.status(404).json({ error: { message: err.message } });
// } else if (err instanceof InvalidRequestError) {
//   res.status(400).json({ error: { message: err.message } });
// } else {
//   console.error(err);
//   res.status(500).json({ error: { message: 'Internal server error' } });
// }
