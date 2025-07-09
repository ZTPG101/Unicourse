import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { QueryFailedError } from 'typeorm';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
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
}
