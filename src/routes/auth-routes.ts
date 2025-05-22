import { FastifyInstance } from "fastify";
import { getUser } from "../functions/users/get-user";
import { login } from "../functions/auth/login";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: { email: string; password: string } }>(
    "/login",
    async (request, reply) => {
      const { email, password } = request.body;

      console.log(email, password);

      if (!email || !password) {
        return reply
          .status(400)
          .send({ message: "Email and password are required." });
      }

      const user = await getUser({ email });

      if (!user) {
        return reply.status(404).send({ message: "User not found." });
      }

      const token = await login({ user, password });

      console.log(token);

      return reply.status(200).send(token);
    }
  );
}
