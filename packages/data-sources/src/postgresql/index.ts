import { Client } from 'pg'
import {  drizzle } from 'drizzle-orm/node-postgres'
// import { migrate } from 'drizzle-orm/node-postgres/migrator'

// let dbInstance: NodePgDatabase<Record<string, never>>;
let dbClient: any;

// const { POSTGRESQL_URL } = process.env;
export interface InitPgsqlOptions {
    url?: string;
}
//   const { PGSQL_URL } = process.env;

export const initPostgresql = async({ url }: InitPgsqlOptions) => {
  // const parsedPOSTGRESQLUrl = new URL(pgUrl || '');

  // console.log({parsedPOSTGRESQLUrl})

  // const config = {
  //   user: parsedPOSTGRESQLUrl.username,
  //   password: parsedPOSTGRESQLUrl.password,
  //   host: parsedPOSTGRESQLUrl.hostname,
  //   port: 5432,
  //   database: parsedPOSTGRESQLUrl.pathname.replace(/^\/+|\/$/g, ''),
  //   requestTimeout: 60000,
  // };

  const client = new Client({
    connectionString: url,
    ssl: true
  });

  await client.connect();
  console.log('Pgsql successfully connected')

  const db = drizzle(client, { logger: true });
  dbClient = db;
}

// export const initPostgres = async({ url }: InitPostgresOptions) => {

//     const pool = new Pool({
//         connectionString: url,
//         ssl: true
//     });

//     const clientInfo = new Client({
//         connectionString: url,
//         ssl: true
//     });

//     await clientInfo.connect();

//     const db = drizzle(pool);

//     await migrate(db, {
//         migrationsFolder: './migrations'
//     });

//     dbInstance = db;
//     client = clientInfo;
//     console.log('Postgres connection established')
// }

export const clientDb = () => dbClient;
// export const clientDb = () =>  dbInstance;

// export interface InitPgsqlOptions {
//     pgUrl?: string;
// }
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