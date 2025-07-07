import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/database/entities/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';
import refreshJwtConfig from './config/refresh-jwt.config';
import { RefreshJwtStrategy } from './strategies/refresh.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from './guards/roles/roles.guard';
import { DatabaseModule } from 'src/database/database.module';
import { SessionModule } from 'src/session/session.module';
import { SessionService } from 'src/session/session.service';

@Module({
  imports: [
    // TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshJwtConfig),
    DatabaseModule,
    UsersModule,
    SessionModule

  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    SessionService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
    { 
      provide: APP_GUARD,
      useClass: JwtAuthGuard //@UseGuards(JwtAuthGuard) applied on all API endpoints
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard
    // }
  ],
  exports: [AuthService],
})
export class AuthModule {}
