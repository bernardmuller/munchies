import { Request, Response } from 'express';
import {
  acceptHouseholdInvite,
  addUserToHousehold,
  createHousehold,
  getHouseholds,
  inviteUserToHousehold,
  removeUserFromHousehold,
} from './actions';
import { getUser } from '../users/actions';

const endpoints = [
  {
    method: 'get',
    path: '/households',
    handler: async (req: Request, res: Response) => {
      const households = await getHouseholds();
      return res.send(households);
    },
    authenticate: true,
  },
  {
    method: 'get',
    path: '/households/:id',
    handler: async (req: Request, res: Response) => {
      const { id } = req.params;
      const household = await getHouseholds({ filters: { id } });
      return res.send(household);
    },
    authenticate: true,
  },
  {
    method: 'post',
    path: '/households',
    handler: async (req: Request, res: Response) => {
      const userId = res.locals.userId;
      const household = await createHousehold({ userId });
      return res.send(household);
    },
    authenticate: true,
  },
  {
    method: 'put',
    path: '/households/:id/leave',
    handler: async (req: Request, res: Response) => {
      const userId = res.locals.userId;
      const household = await removeUserFromHousehold(userId, req.params.id);
      return res.send(household);
    },
    authenticate: true,
  },
  {
    method: 'put',
    path: '/households/:id/join',
    handler: async (req: Request, res: Response) => {
      const userId = res.locals.userId;
      const household = await addUserToHousehold(userId, req.params.id);
      return res.send(household);
    },
    authenticate: true,
  },
  {
    method: 'post',
    path: '/households/:id/invite-user',
    handler: async (req: Request, res: Response) => {
      const { id } = req.params;
      const { userId } = req.body;
      const currentUser = res.locals.userId;
      const invite = await inviteUserToHousehold({
        userId: userId,
        householdId: id,
        currentUser: currentUser,
      });
      return res.send(invite);
    },
    authenticate: true,
  },
  {
    method: 'put',
    path: '/households/:id/accept-invite',
    handler: async (req: Request, res: Response) => {
      const { id } = req.params;
      const response = await acceptHouseholdInvite(id);
      return res.send(response);
    },
    authenticate: true,
  },
  {
    method: 'get',
    path: '/current-user-household',
    handler: async (req: Request, res: Response) => {
      const currentUser = res.locals.userId;

      const user = await getUser(currentUser);

      if (!user.householdid) {
        return res.send({ message: 'User is not part of a household' });
      }

      const household = await getHouseholds({
        filters: { id: user.householdid },
      });

      return res.send(household);
    },
    authenticate: true,
  },
];

export default endpoints;
