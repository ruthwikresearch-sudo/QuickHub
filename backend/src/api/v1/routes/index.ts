import { Router } from "express";

const router = Router();

router.get("/", (_, res) => {
  res.json({
    success: true,
    message: "🚀 QuickHub API v1 is Running",
    version: "1.0.0"
  });
});

router.get("/health", (_, res) => {
  res.json({
    success: true,
    status: "Healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

export default router;