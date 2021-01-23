import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { __prod__ } from "./constants";
import microConfig from "./mikro-orm.config";
import { HelloResolver } from "./resolvers/Hello";
import { PostResolver } from "./resolvers/Post";
import { UserResolver } from "./resolvers/User";

require("dotenv").config();

const PORT = process.env.PORT || 2137;

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: () => ({
      em: orm.em,
    }),
  });

  apolloServer.applyMiddleware({ app });

  app.get("/", (_, res) => {
    res.send("Hello");
  });

  app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:%d`, PORT);
  });
};

main();
