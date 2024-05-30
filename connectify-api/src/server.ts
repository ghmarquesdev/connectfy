import fastify from "fastify";
import { env } from "./env";
import { routesUsers } from "./http/controllers/users/routes";
import { ZodError } from "zod";
import fastifyJwt from "@fastify/jwt";

const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(routesUsers);

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
