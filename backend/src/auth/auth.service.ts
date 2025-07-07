import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { AuthJwtpayload } from './types/auth-jwtPayload';
import { JwtService } from '@nestjs/jwt';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';
import * as argon2 from 'argon2';
import { CurrentUser } from './types/current-user';
import { SessionService } from 'src/session/session.service';
import { Session } from 'src/database/entities/session.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private sessionService: SessionService,
    private jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found!');
    const isPasswordMatch = await compare(password, user.password);
    if (!isPasswordMatch)
      throw new UnauthorizedException('Invalid credentials');
    return { id: user.id };
  }

  async login(userId: number, deviceInfo?: string) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);
    const hashedRefreshToken = await argon2.hash(refreshToken);

    const user = await this.userService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found!');
    }
    await this.sessionService.create(user, hashedRefreshToken, deviceInfo); // New session saved

    return {
      id: userId,
      accessToken,
      refreshToken,
    };
  }

  async generateTokens(userId: number) {
    const payload: AuthJwtpayload = { sub: userId };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfig),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(userId: number, oldRefreshToken: string) {
    const sessions = await this.sessionService.findSessionsByUser(userId);
    if (!sessions || sessions.length === 0) {
      throw new UnauthorizedException('No active sessions');
    }

    let targetSession: Session | null = null;

    for (const session of sessions) {
      const isMatch = await argon2.verify(
        session.hashedRefreshToken,
        oldRefreshToken,
      );
      if (isMatch) {
        targetSession = session;
        break;
      }
    }

    if (!targetSession) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const { accessToken, refreshToken } = await this.generateTokens(userId);
    const newHashedToken = await argon2.hash(refreshToken);

    // Update the session with the new hashed refresh token
    targetSession.hashedRefreshToken = newHashedToken;
    await this.sessionService.updateSession(targetSession);

    return {
      id: userId,
      accessToken,
      refreshToken,
    };
  }

  async validateRefreshToken(userId: number, refreshToken: string) {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new UnauthorizedException('Invalid Refresh Token (user not found)');
    }

    const sessions = await this.sessionService.findSessionsByUser(userId);
    if (!sessions || sessions.length === 0) {
      throw new UnauthorizedException('No active sessions for user');
    }

    for (const session of sessions) {
      const isMatch = await argon2.verify(
        session.hashedRefreshToken,
        refreshToken,
      );
      if (isMatch) {
        return { id: userId, sessionId: session.id }; // Return sessionId if needed
      }
    }

    throw new UnauthorizedException('Invalid Refresh Token');
  }

  async logout(userId: number, refreshToken: string) {
    const sessions = await this.sessionService.findSessionsByUser(userId);
    for (const session of sessions) {
      const match = await argon2.verify(
        session.hashedRefreshToken,
        refreshToken,
      );
      if (match) {
        await this.sessionService.removeSession(session.id);
        break;
      }
    }
    //TODO: can add remove all session later
  }

  async validateJwtUser(userId: number) {
    const user = await this.userService.findOne(userId);
    if (!user) throw new UnauthorizedException('User not found');
    const currentUser: CurrentUser = { id: user.id, role: user.role };
    return currentUser;
  }
}
