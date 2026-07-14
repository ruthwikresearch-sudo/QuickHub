import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";
import { hashPassword } from "../../lib/bcrypt";
import { generateToken } from "../../lib/jwt";
import { RegisterDto, LoginDto } from "./auth.types";
import { validateLogin } from "./auth.validation";

// ==========================
// Register User
// ==========================
export const registerUser = async (data: RegisterDto) => {
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

// ==========================
// Login User
// ==========================
export const loginUser = async (data: LoginDto) => {
  // Validate login input
  validateLogin(data);

  // Find user by email
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  // User not found
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Compare password
  const isPasswordValid = await bcrypt.compare(
    data.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // Generate JWT
  const token = generateToken({
    id: user.id,
    email: user.email,
  });

  // Return response
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