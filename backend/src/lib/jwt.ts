import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "quickhub-secret-key";

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};