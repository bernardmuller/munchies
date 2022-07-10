import { Router } from 'express';
import { authenticateUser } from '../shared/utils';

export const catchAsync = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch(next);
  };
};

export const createEndpoint = (
  router: Router,
  endpoint: {
    method: string;
    path: string;
    handler: any;
    authenticate: boolean;
  },
) => {
  let middleware = [endpoint.authenticate ? [authenticateUser] : []];
  middleware = middleware.map((func) => catchAsync(func));

  router[endpoint.method.toLowerCase()](
    endpoint.path,
    ...middleware,
    catchAsync(endpoint.handler),
  );
};
