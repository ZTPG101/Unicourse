import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { UsersService } from './users.service';
import { AuthModule } from 'src/auth/auth.module';
import { ProfileAccessGuard } from 'src/auth/guards/profile-access.guard';
import { SelfOrAdminGuard } from 'src/auth/guards/self-admin.guard';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    ...usersProviders,
    UsersService,
    ProfileAccessGuard,
    SelfOrAdminGuard,
  ],
  exports: [...usersProviders, UsersService],
})
export class UsersModule {}
