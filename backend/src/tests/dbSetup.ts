import {loadEnv} from './setup'
import {dropAllTables, migrateLatest} from '../db/db'

loadEnv()

const setup = async () => {
  await dropAllTables()
  await migrateLatest()
  process.exit(0)
}

// eslint-disable-next-line no-void
void setup()
