import { login } from './actions';

const endpoints = [
  {
    method: 'POST',
    path: '/auth/login',
    handler: async (req, res) => {
      const { emailAddress, password } = req.body;
      const token = await login({
        emailAddress,
        password,
      });
      return res.send(token);
    },
    authenticate: false,
  },
];

export default endpoints;
