import { Pool } from 'pg'
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'

export interface InitPostgresOptions {
    url?: string;
}

let dbInstance: NodePgDatabase<Record<string, never>>;

export const initPostgres = async({ url }: InitPostgresOptions) => {

    const pool = new Pool({
        connectionString: url,
        ssl: true
    });

    const db = drizzle(pool);

    await migrate(db, {
        migrationsFolder: './migrations'
    });

    dbInstance = db;
    console.log('Postgres connection established')

}

export const getDbbINstance = () =>  dbInstance;