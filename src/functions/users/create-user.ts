import { prisma } from "../../db/prisma-client";

import bcrypt from "bcrypt";

export async function createUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return user;
}
