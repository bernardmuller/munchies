import {v4 as uuid} from 'uuid'
import isStrongPassword from 'validator/lib/isStrongPassword'
import jwt from 'jsonwebtoken'

export const getUuid = () => {
  return uuid()
}

export const requireEnvVar = (key: string) => {
  const value = process.env[key]

  if (!value) {
    throw new Error(`No environment variable found with key: ${key}`)
  }

  return value
}

export const isValidPassword = (str: string) => {
  const score: boolean = isStrongPassword(str)
  if (!score)
    throw new Error(
      'Password not strong enough. Requires: Minlength(7), Special Char, Integer, 1 Lowercase, 1 Uppercase.',
    )
}

export const createJwtToken = ({
  userId,
  sessionId,
}: {
  userId: string
  sessionId: string
}) => {
  return jwt.sign({userId, sessionId}, requireEnvVar('JWT_SECRET'), {
    expiresIn: '10 minutes',
  })
}

export const decodeToken = (token: string) => {
  return jwt.verify(token, requireEnvVar('JWT_SECRET'), (err, decoded) => {
    if (err) throw new Error(`Error decoding token: ${err}`)
    return decoded
  })
}

export async function tradeTokenForUser(token: string): Promise<User> {
  // Here, use the `token` argument, check it's validity, and return
  // the user only if the token is valid.
  // You can also use external auth libraries, such as jsaccounts / passport, and
  // trigger it's logic from here.
}
