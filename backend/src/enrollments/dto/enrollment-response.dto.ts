import { Enrollment } from 'src/database/entities/enrollment.entity';

export class EnrollmentResponseDto {
  id: number;
  courseId: number;
  userId: string;
  progress: number;
  enrolledAt: Date;

  constructor(enrollment: Enrollment) {
    this.id = enrollment.id;
    this.courseId = enrollment.course?.id;
    this.userId = enrollment.user?.id !== undefined ? String(enrollment.user.id) : '';
    this.progress = enrollment.progress;
    this.enrolledAt = enrollment.enrolledAt;
  }
}
