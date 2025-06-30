import { Enrollment } from 'src/entities/enrollment.entity';

export class EnrollmentResponseDto {
  id: number;
  courseId: string;
  userId: string;
  progress: number;
  enrolledAt: Date;

  constructor(enrollment: Enrollment) {
    this.id = enrollment.id;
    this.courseId = enrollment.course?.id || '';
    this.userId = enrollment.user?.id !== undefined ? String(enrollment.user.id) : '';
    this.progress = enrollment.progress;
    this.enrolledAt = enrollment.enrolledAt;
  }
}
