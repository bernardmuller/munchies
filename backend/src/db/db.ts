import {PrismaClient} from '@prisma/client'
import shell from 'shelljs'
import {requireEnvVar} from '../shared/utils'

export const DATABASE_URL = requireEnvVar('DATABASE_URL')

export const db = new PrismaClient({datasources: {db: {url: DATABASE_URL}}})

export const dropAllTables = async () => {
  await db.$queryRaw`
    DROP schema public CASCADE;
  `
  await db.$queryRaw`
    CREATE schema public;
  `
}

export const migrateLatest = async () => {
  await shell.exec('npx prisma migrate dev')
}
