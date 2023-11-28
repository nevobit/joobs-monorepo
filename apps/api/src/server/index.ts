import 'dotenv/config'
// import Logger from "bunyan";
// import { startStandaloneServer } from '@apollo/server/standalone';
import { expressMiddleware } from '@apollo/server/express4';
import { readFile } from 'fs/promises';
import path from 'path';
import { initDataSources } from '@joobs/data-sources';
import { createServer as createHttpServer } from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import cors from 'cors';

import resolvers from '../resolvers';
// @ts-ignore
import { name } from '../../package.json';
import { ApolloServer } from '@apollo/server';
import express from 'express';

const {
  PORT,
  DATABASE_URL
} = process.env;

// const logger: Logger = Logger.createLogger({
//   name,
//   streams: [
//     {
//       level: "debug",
//       stream: process.stdout,
//     },
//   ],

// });


const main = async () => {
  await initDataSources({
    postgres: {
      url: DATABASE_URL
    }
  });

  const filePath = path.resolve(__dirname, '../typeDefs/schema.graphql');
  const typeDefs = await readFile(filePath, 'utf8');;

  const app = express();
  app.use(cors(), express.json());

  // const getHttpContext = ({ req }: any) => {
  //   if (req.auth) {
  //     return { user: req.auth.sub };
  //   }
  //   return {};
  // }

  // const getWsContext = ({ connectionParams }: any) => {
  //   const accessToken = connectionParams?.accessToken;
  //   if (accessToken) {
  //     // const payload = decodeToken(accessToken);
  //     // return { user: payload.sub };
  //   }
  //   return {};
  // }
  
  const httpServer = createHttpServer(app);
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const server = new ApolloServer({ schema, plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ] });



  // const { url } = await startStandaloneServer(server, { 
  //   context: async ({ req }) => ({ req }),
  //   httpServer,
  //   listen: { port: Number(PORT) } })
  // logger.info(`🚀 Server listentinng on ${url}`)

  // // Websoket Server
  const wsServer = new WebSocketServer({ server: httpServer, path: '/graphql' });
  const serverCleanup = useServer({ schema }, wsServer);
  await server.start();

  app.use('/graphql', cors(), expressMiddleware(server, {
    context: async ({ req }) => ({req}),
  }))

  httpServer.listen({ port: Number(PORT)}, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
    })
}

void main();