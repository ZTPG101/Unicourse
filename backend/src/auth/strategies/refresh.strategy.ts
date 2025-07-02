import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthJwtpayload } from '../types/auth-jwtPayload';
import { Inject, Injectable } from '@nestjs/common';
import refreshJwtConfig from '../config/refresh-jwt.config';
import { Request } from 'supertest';
import { AuthService } from '../auth.service';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(
    @Inject(refreshJwtConfig.KEY)
    private refreshjwtConfiguration: ConfigType<typeof refreshJwtConfig>,
    private authservice: AuthService
  ) {
    if (!refreshjwtConfiguration.secret) {
      throw new Error('refresh JWT secret is not defined');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: refreshjwtConfiguration.secret,
      ignoreExpiration: false
    });
  }

  //authorization: Bearer klajshdfhjgasdjfhkgs
  validate(req: Request, payload: AuthJwtpayload) {
    const refreshToken = req.get("authoriztion").replace("Bearer","").trim()
    const userId = payload.sub
    return this.authservice.validateRefreshToken(userId, refreshToken)
  }
}
