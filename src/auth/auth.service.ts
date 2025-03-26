import { compareSync, hashSync } from "bcrypt";
import { dataSource } from "../data-source";
import { UsersEntity } from "../entities/Users.entity";
import { appConfig } from "../config/app.config";
import { sign, verify } from "jsonwebtoken";
import { RefreshTokensEntity } from "../entities/RefreshTokens.entity";
import { LoginType, RegisterType } from "../types/types";

const userRepo = dataSource.getRepository(UsersEntity);
const tokensRepo = dataSource.getRepository(RefreshTokensEntity);
const secret = appConfig.get("JWT_SECRET");

export class AuthService {
  async register(body: RegisterType) {
    const { email, password, username } = body;
    const user = await userRepo.findOneBy({ email });
    if (user) {
      throw new Error("User already exists");
    }
    const hashPass = hashSync(password, 10);
    const newUser = userRepo.create({
      email: email,
      username: username,
      password: hashPass
    });
    userRepo.save(newUser);
  };

  async login(body: LoginType) {
    const { email, password } = body;
    const user = await userRepo.findOneBy({ email: email });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
    const tokens = this.generateTokens(user.id);
    return {
      "accessToken": tokens.accessToken,
      "refreshToken": tokens.refreshToken
    };
  }

  verifyToken(token: string) {
    return verify(token, secret);
  }

  async generateRefreshToken(userId: string) {
    const token = sign({ userId }, secret, { expiresIn: "7d" });
    const isTokenExists = await tokensRepo.findOneBy({ user: { id: userId } });
    if (isTokenExists) {
      await tokensRepo.delete({ user: { id: userId } });
    }
    tokensRepo.save({ token, user: { id: userId } });
    return token;
  }

  async updateRefreshToken(token: string) {
    const refreshToken = await tokensRepo.findOneBy({ token: token });
    if (!refreshToken) {
      throw new Error("Invalid token");
    }
    return this.generateRefreshToken(refreshToken.user.id);
  }

  private generateAccessToken(userId: string) {
    const secret = appConfig.get("JWT_SECRET");
    return sign({ userId }, secret, { expiresIn: "15m" });
  }

  private generateTokens(userId: string) {
    const accessToken = this.generateAccessToken(userId);
    const refreshToken = this.generateRefreshToken(userId).then((token) => token);
    return {
      accessToken, refreshToken
    };
  }
}
