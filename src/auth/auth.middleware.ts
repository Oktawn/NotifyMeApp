import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";

const authService = new AuthService();

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = authService.verifyToken(token);

    (req as any).user = payload;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}