import { FastifyInstance } from "fastify";

import { createUser } from "../functions/users/create-user";
import { getUser } from "../functions/users/get-user";

export async function userRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: { name: string; email: string; password: string } }>(
    "/",
    async (request, reply) => {
      const { email, password } = request.body;

      if (!email || !password) {
        return reply
          .status(400)
          .send({ message: "Email and password are required." });
      }

      try {
        // Verify user exists
        const user = await getUser({ email });
        if (user) {
          return reply.status(400).send({ error: "User already exists" });
        }

        await createUser({ email, password });
        return reply.status(201).send();
      } catch (error) {
        return reply.status(500).send(error);
      }
    }
  );
}
