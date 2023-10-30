import { Client, Pool } from 'pg'
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
export interface InitPostgresOptions {
    url?: string;
}

let dbInstance: NodePgDatabase<Record<string, never>>;
let client: any;
export const initPostgres = async({ url }: InitPostgresOptions) => {

    const pool = new Pool({
        connectionString: url,
        ssl: true
    });

    const clientInfo = new Client({
        connectionString: url,
        ssl: true
    });

    await clientInfo.connect();

    const db = drizzle(pool);

    await migrate(db, {
        migrationsFolder: './migrations'
    });

    dbInstance = db;
    client = clientInfo;
    console.log('Postgres connection established')
}

export const clientDb =  () => client;
export const getDbInstance = () =>  dbInstance;