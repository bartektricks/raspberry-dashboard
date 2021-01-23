import "reflect-metadata";
import express from "express";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import { MikroORM } from "@mikro-orm/core";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { MyContext } from "./types";
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
  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  app.use(
    session({
      name: "qid",
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
        disableTTL: true
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 465 * 10, // 10 yrs.
        httpOnly: true,
        secure: __prod__,
        sameSite: "lax"
      },
      saveUninitialized: false,
      secret: "malinowy mus",
      resave: false
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false
    }),
    context: ({ req, res }): MyContext => ({
      em: orm.em,
      req,
      res
    })
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
