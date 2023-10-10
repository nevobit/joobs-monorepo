import 'dotenv/config'
import Logger from "bunyan";
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFile } from 'fs/promises';
import path from 'path';
import { initDataSources } from '@joobs/data-sources';

// @ts-ignore
import { name } from '../../package.json';
import { ApolloServer } from '@apollo/server';

const {
  PORT,
  DATABASE_URL
} = process.env;

const logger: Logger = Logger.createLogger({
  name,
  streams: [
    {
      level: "debug",
      stream: process.stdout,
    },
  ],

});


const main = async () => {
  await initDataSources({
    postgres: {
      url: DATABASE_URL
    }
  });

  const filePath = path.resolve(__dirname, '../typeDefs/schema.graphql');
  const typeDefs = await readFile(filePath, 'utf8');;
  const server = new ApolloServer({ typeDefs });
  const { url } = await startStandaloneServer(server, { listen: { port: Number(PORT) } })
  logger.info(`🚀 Server listentinng on ${url}`)
}

void main();