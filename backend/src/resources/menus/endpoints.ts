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

import { createMenu } from './actions';

const endpoints = [
  {
    method: 'POST',
    path: '/menus',
    handler: async (req: Request, res: Response) => {
      const menu = await createMenu({});
      return res.send(menu);
    },
    authenticate: true,
  },
];

export default endpoints;
