import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { CoursesService } from 'src/courses/courses.service';

@Injectable()
export class CourseOwnerOrAdminGuard implements CanActivate {
  constructor(private readonly coursesService: CoursesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const courseId = parseInt(request.params.id, 10);

    if (!user || isNaN(courseId)) {
      return false;
    }

    if (user.role === 'admin') {
      return true;
    }

    if (user.role === 'instructor') {
      const isOwner = await this.coursesService.isInstructorOwnerOfCourse(courseId, user.id);
      if (isOwner) {
        return true;
      }
    }

    throw new ForbiddenException('You do not have permission to modify this course.');
  }
}