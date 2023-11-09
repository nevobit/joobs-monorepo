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

export const clientDb = () => client;
export const getDbInstance = () =>  dbInstance;

export interface InitPgsqlOptions {
    pgUrl?: string;
}
//   const { PGSQL_URL } = process.env;

// const initPostgresql = async ({ pgUrl }:InitPgsqlOptions): Promise<Pool | void> => {
//     try {
//         const parsedPGSQLUrl = new URL(pgUrl || PGSQL_URL || '');

//         const config = {
//             username: parsedPGSQLUrl.username,
//             password: parsedPGSQLUrl.password,
//             host: parsedPGSQLUrl.hostname,
//             database: parsedPGSQLUrl.pathname.replace(/^\/+|\/$/g, ''),
//             requestTimeout: 60000,
//             max: 10,
//             min: 0,
//             idleTimeoutMillis: 30000,
//         };

//         const connectionPool = new Pool(config);
//         await connectionPool.connect();

//         console.log('Pgsql successfully connected')

//     }catch(error){
//         console.log(error);
//     }
// }