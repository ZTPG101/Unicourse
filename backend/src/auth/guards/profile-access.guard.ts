import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProfileAccessGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const currentUser = request.user;
    const targetUserId = +request.params.id;

    if (currentUser.role === 'student') {
      const targetUser = await this.usersService.findById(targetUserId);
      if (!targetUser || !['student', 'instructor'].includes(targetUser.role)) {
        throw new ForbiddenException('Students can only view students or instructors');
      }
    }
    return true;
  }
}
