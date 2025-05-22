import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

const JWT_SECRET = "seu_segredo_supersecreto";

type User = {
  id: string;
  email: string;
  password: string;
};

export async function login({
  user,
  password,
}: {
  user: User;
  password: string;
}) {
  // Hash password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password.");
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
}
