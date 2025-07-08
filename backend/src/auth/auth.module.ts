import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';
import { SessionModule } from 'src/sessions/session.module';
import { SessionService } from 'src/sessions/session.service';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import jwtConfig from './config/jwt.config';
import refreshJwtConfig from './config/refresh-jwt.config';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshJwtStrategy } from './strategies/refresh.strategy';

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
