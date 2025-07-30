import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { QueryFailedError } from 'typeorm';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginDto } from './dto/login.dto';
import { FacebookAuthGuard } from './guards/facebook-auth/facebook-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async create(@Body() body: CreateUserDto) {
    try {
      return await this.authService.register(body);
    } catch (err) {
      if (
        err instanceof QueryFailedError &&
        err.driverError &&
        err.driverError.number === 2627
      ) {
        throw new ConflictException('Email already in use');
      }

      if (err instanceof QueryFailedError) {
        throw new BadRequestException('Failed to create user');
      }

      throw err;
    }
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body.email, body.password);
    return this.authService.login(user);
  }

  @Post('refresh')
  @UseGuards(RefreshAuthGuard)
  refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user.id, req.body.refreshToken);
  }

  @Post('logout')
  logOut(@Request() req) {
    this.authService.logout(req.userId, req.body.refreshToken);
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Req() req, @Res() res) {
    const user = await this.authService.validategoogleUser(req.user);

    if (!user) {
      throw new UnauthorizedException('Could not process Google user.');
    }
    const tokens = await this.authService.login({ id: user.id });
    res.redirect(`http://localhost:5173?token=${tokens.accessToken}&refreshToken=${tokens.refreshToken}`);
  }

  @Get('facebook')
  @UseGuards(FacebookAuthGuard)
  async facebookLogin() {}

  @Get('facebook/callback')
  @UseGuards(FacebookAuthGuard)
  async facebookCallback(@Req() req, @Res() res) {
    const user = await this.authService.validateFacebookUser(req.user);

    if (!user) {
      throw new UnauthorizedException('Could not process Facebook user.');
    }
    const tokens = await this.authService.login({ id: user.id });
    res.redirect(`http://localhost:5173?token=${tokens.accessToken}&refreshToken=${tokens.refreshToken}`);
  }
}
