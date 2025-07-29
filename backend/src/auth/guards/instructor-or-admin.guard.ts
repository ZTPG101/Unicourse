import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable
} from '@nestjs/common';
import { InstructorsService } from 'src/instructors/instructors.service';

@Injectable()
export class InstructorOwnerOrAdminGuard implements CanActivate {
  constructor(private readonly instructorsService: InstructorsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const instructorId = parseInt(request.params.id, 10);

    if (!user || isNaN(instructorId)) {
      return false;
    }

    if (user.role === 'admin') {
      return true;
    }

    if (user.role === 'instructor') {
      const isOwner = await this.instructorsService.isUserOwnerOfProfile(instructorId, user.id);
      if (isOwner) {
        return true;
      }
    }

    throw new ForbiddenException('You do not have permission to modify this resource.');
  }
}