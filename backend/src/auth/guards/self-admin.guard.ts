import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class SelfOrAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const currentUser = request.user;
    const targetUserId = +request.params.id;

    if (currentUser.role === 'student' && currentUser.id !== targetUserId) {
      throw new ForbiddenException('Students can only modify their own account');
    }
    return true;
  }
}
