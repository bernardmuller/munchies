import {z} from 'zod'
import {UserModel} from '../../../prisma/zod'
import {register, login} from './actions'

const registerSchema = z.object({
  emailAddress: z.string().email(),
  password: z.string(),
})

type Args = z.infer<typeof registerSchema>
type User = z.infer<typeof UserModel>

export const AuthResolvers = {
  Mutation: {
    register: async (parent, args: {input: Args}) => {
      const newUser: User = await register(args?.input)
      return newUser
    },
    login: async (parent, args: {input: Args}, context) => {
      const token = await login(args?.input)
      return token
    },
  },
}
