import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { Public } from './decorators/public.deocrator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.userId);
  }

  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  refreshToken(@Request() req) {
    return this.authService.refreshtoken(req.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logOut(@Request() req) {
    this.authService.logOut(req.userId);
  }
}
