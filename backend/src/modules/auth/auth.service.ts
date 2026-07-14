import prisma from "../../lib/prisma";
import { hashPassword } from "../../lib/bcrypt";
import { generateToken } from "../../lib/jwt";
import { RegisterUserDto } from "./auth.types";

export const registerUser = async (data: RegisterUserDto) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  });

  const token = generateToken({
    id: user.id,
    email: user.email,
  });

  return {
    success: true,
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};