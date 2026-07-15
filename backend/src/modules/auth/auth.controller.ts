import { Request, Response } from "express";
import { registerUser, loginUser } from "./auth.service";

// Register
export const register = async (req: Request, res: Response) => {
  try {
    const result = await registerUser(req.body);

    return res.status(201).json(result);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Login
export const login = async (req: Request, res: Response) => {
  try {
    const result = await loginUser(req.body);

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const me = async (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
};
