import { compareSync, hashSync } from "bcrypt";
import { dataSource } from "../data-source";
import { UsersEntity } from "../entities/Users.entity";
import { appConfig } from "../config/app.config";
import { sign, verify } from "jsonwebtoken";
import { RefreshTokensEntity } from "../entities/RefreshTokens.entity";
import { LoginDTO, RegisterDTO } from "../commons/DTO/auth.dto";
import moment from "moment";

const userRepo = dataSource.getRepository(UsersEntity);
const tokensRepo = dataSource.getRepository(RefreshTokensEntity);
const secret = appConfig.get("JWT_SECRET");

export class AuthService {
  async register(body: RegisterDTO) {
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
    return "User registered successfully";
  };

  async login(body: LoginDTO) {
    const { email, password } = body;
    const user = await userRepo.findOneBy({ email: email });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
    const tokens = await this.generateTokens(user.id);
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
    const isTokenExists = await tokensRepo.findOne({ where: { user: { id: userId } }, relations: ['user'] });
    if (isTokenExists) {
      await tokensRepo.delete({ user: { id: userId } });
    }
    const t = tokensRepo.create({
      token,
      user: { id: userId },
      expires_at: moment().add(7, 'days')
    });
    tokensRepo.save(t);
    return token;
  }

  async updateRefreshToken(token: string) {
    const refreshToken = await tokensRepo.findOne({ where: { token: token }, relations: ["user"] });
    if (!refreshToken) {
      throw new Error("Invalid token");
    }
    return this.generateRefreshToken(refreshToken.user.id);
  }

  private generateAccessToken(userId: string) {
    const secret = appConfig.get("JWT_SECRET");
    return sign({ userId }, secret, { expiresIn: "15m" });
  }

  private async generateTokens(userId: string) {
    const accessToken = this.generateAccessToken(userId);
    const refreshToken = await this.generateRefreshToken(userId);
    return {
      accessToken, refreshToken
    };
  }
}
