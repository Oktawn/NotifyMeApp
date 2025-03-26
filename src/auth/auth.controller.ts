import { Router } from "express";
import { AuthService } from "./auth.service";

const authRouter = Router();
const authService = new AuthService();

authRouter.post("/register", async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

authRouter.post("/refresh", async (req, res) => {
  const { refreshToken } = req.body;
  try {
    const result = await authService.updateRefreshToken(refreshToken);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { authRouter };