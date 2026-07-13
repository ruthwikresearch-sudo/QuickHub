import { Router } from "express";

const router = Router();

router.get("/", (_, res) => {
  res.json({
    success: true,
    message: "🚀 QuickHub API is Running",
    version: "1.0.0",
  });
});

router.get("/health", (_, res) => {
  res.status(200).json({
    success: true,
    status: "Healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

export default router;