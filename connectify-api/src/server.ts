import fastify from "fastify"
import fastifyJwt from "@fastify/jwt";

import { ZodError } from "zod";
import { env } from "@/env";

import { routesUser } from "@/http/controllers/users/routes";
import { routesPost } from '@/http/controllers/post/routes';
import { routesLike } from "./http/controllers/like/routes";
import { routesFollow } from "./http/controllers/follow/routes";

const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(routesUser);
app.register(routesPost);
app.register(routesLike)
app.register(routesFollow)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  console.log(error);

  return reply.status(500).send({ message: "Internal server error." });
});

app.listen({ port: env.PORT }, () => {
  console.log("Server is running");
});
