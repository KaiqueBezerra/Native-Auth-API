import { prisma } from "../../db/prisma-client";

export async function getUser({ email }: { email: string }) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  return user;
}
