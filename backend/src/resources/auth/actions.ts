import {z} from 'zod'
import {compare, hash, genSalt} from 'bcrypt'
import {isValidPassword, createJwtToken, getUuid} from '../../shared/utils'
import {db} from '../../db/db'
import {UserModel} from '../../../prisma/zod'

export const login = async (data: {emailAddress: string; password: string}) => {
  const user = await db.user.findUnique({
    where: {
      emailAddress: data.emailAddress,
    },
  })

  if (!user) throw new Error('Invalid email and/or password')

  const isPasswordValid = await compare(data.password, user.password)
  if (!isPasswordValid) throw new Error('Invalid email and/or password')

  const session = await db.session.create({
    data: {
      id: getUuid(),
      userId: user.id,
    },
  })

  const token = createJwtToken({
    userId: user.id,
    sessionId: session.id,
  })

  return {token}
}

const registerSchema = z.object({
  emailAddress: z.string().email(),
  password: z.string(),
})

type Schema = z.infer<typeof registerSchema>
type User = z.infer<typeof UserModel>

export const register = async (data: {
  emailAddress: string
  password: string
}) => {
  const existingUser = await db.user.findUnique({
    where: {
      emailAddress: data.emailAddress,
    },
  })

  if (existingUser) throw new Error('User with that email already exists.')
  if (!data.password) throw new Error('Provide a valid password.')

  isValidPassword(data?.password)

  const salt = await genSalt(10)
  const passwordHash = await hash(data.password, salt)

  const userData: Schema = registerSchema.parse({
    emailAddress: data.emailAddress,
    password: passwordHash,
  })

  const newUser: User = await createUser(userData)
  return newUser
}
