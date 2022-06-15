import {v4 as uuid} from 'uuid'

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
