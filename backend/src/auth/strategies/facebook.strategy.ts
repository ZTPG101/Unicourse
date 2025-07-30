// auth/strategies/facebook.strategy.ts
import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, StrategyOptions } from 'passport-facebook';
import { ConfigType } from '@nestjs/config';
import facebookOauthConfig from '../config/facebook-oauth.config';
import { AuthService } from '../auth.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    @Inject(facebookOauthConfig.KEY)
    private fbConfig: ConfigType<typeof facebookOauthConfig>,
    private authService: AuthService,
  ) {
    super({
      clientID: fbConfig.clientID,
      clientSecret: fbConfig.clientSecret,
      callbackURL: fbConfig.callbackURL,
      profileFields: ['id', 'emails', 'name', 'photos'],
      scope: ['email'],
    } as StrategyOptions);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ) {
    const user = await this.authService.validateFacebookUser({
      email: profile.emails?.[0]?.value || '',
      name: `${profile.name?.givenName || ''} ${profile.name?.familyName || ''}`,
      avatar: profile.photos?.[0]?.value || '',
      password: '',
    });
    return user;
  }
}