import { Request, Response } from 'express';

// const getUsers = endpoint({
//   method: 'post',
//   path: '/profile/invitations/:invitationId/accept',
//   authenticate: true,
//   authorize: {
//     invitationId: (req) => req.params.invitationId,
//   },
//   validate: {
//     params: z.object({
//       invitationId: z.string().uuid(),
//     }),
//   },
//   handler: async (req, res) => {
//     const {invitationId} = req.params

//     await acceptUserInvitation({invitationId})

//     res.sendStatus(200)
//   },
// })

import { getUsers } from './actions';

const endpoints = [
  {
    method: 'GET',
    path: '/users',
    handler: async (req: Request, res: Response) => {
      const users = await getUsers();
      return res.send(users);
    },
    authenticate: true,
  },
];

export default endpoints;
