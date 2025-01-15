import { createDatabase } from 'db0'
import sqlite from 'db0/connectors/better-sqlite3'
import * as schema from '../db/schema'
import { drizzle } from 'db0/integrations/drizzle'

const db = createDatabase(
  sqlite({
    path: process.env.DB_FILE_NAME!,
  })
)

export const useDatabase = () => drizzle(db)

export const tables = schema
