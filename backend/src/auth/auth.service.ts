import {
  Body,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { compare } from 'bcrypt';
import { Session } from 'src/database/entities/session.entity';
import { SessionService } from 'src/sessions/session.service';
import { UsersService } from 'src/users/users.service';
import refreshJwtConfig from './config/refresh-jwt.config';
import { AuthJwtpayload } from './types/auth-jwtPayload';
import { CurrentUser } from './types/current-user';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

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
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (password === '')
      throw new UnauthorizedException('Please provide the password');
    const isPasswordMatch = await compare(password, user.password);
    if (!isPasswordMatch)
      throw new UnauthorizedException('Invalid credentials');

    return { id: user.id };
  }

  async register(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  async login(user: { id: number }, deviceInfo?: string) {
    const { accessToken, refreshToken } = await this.generateTokens(user.id);
    const hashedRefreshToken = await argon2.hash(refreshToken);

    const userEntity = await this.userService.findById(user.id);
    if (!userEntity) {
      throw new UnauthorizedException('User not found!');
    }

    await this.sessionService.create(
      userEntity,
      hashedRefreshToken,
      deviceInfo,
    );

    return {
      id: user.id,
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

  async refreshToken(userId: number, RefreshToken: string) {
    const sessions = await this.sessionService.findSessionsByUser(userId);
    if (!sessions || sessions.length === 0) {
      throw new UnauthorizedException('No active sessions');
    }

    let targetSession: Session | null = null;

    for (const session of sessions) {
      if (!session.hashedRefreshToken) {
        continue;
      }

      const isMatch = await argon2.verify(
        session.hashedRefreshToken,
        RefreshToken,
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
      if (!refreshToken || !session.hashedRefreshToken) {
        continue;
      }

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
      if (!refreshToken || !session.hashedRefreshToken) {
        continue;
      }

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
    const user = await this.userService.findById(userId);
    if (!user) throw new UnauthorizedException('User not found');
    const currentUser: CurrentUser = { id: user.id, role: user.role };
    return currentUser;
  }

  async validategoogleUser(googleUser: CreateUserDto) {
    const user = await this.userService.findByEmail(googleUser.email);
    if (user) return user;
    return await this.userService.create(googleUser);
  }

  async validateFacebookUser(facebookUser: any) {
    const user = await this.userService.findByEmail(facebookUser.email);
    if (user) return user;
    return await this.userService.create(facebookUser);
  }
}
