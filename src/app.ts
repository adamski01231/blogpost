import 'reflect-metadata';
import 'dotenv/config';
import db from './services/_db';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/User';
import { RoleResolver } from './resolvers/Role';
import { PostResolver } from './resolvers/Post';
import { VoteResolver } from './resolvers/Vote';

class App {
  public static async start() {
    try {
      await db.connect();
      console.log('Db connected ...');

      const port = process.env.PORT || 5000;
      const app = express();

      const apolloServer = new ApolloServer({
        schema: await buildSchema({
          resolvers: [UserResolver, RoleResolver, PostResolver, VoteResolver],
          validate: true,
        }),
      });

      apolloServer.applyMiddleware({ app });

      app.listen(port, () => {
        console.log(`Server listenning on port ${port} ...`);
      });
    }
    catch(ex) {
      console.log(ex);
    }
  }
}

App.start();
