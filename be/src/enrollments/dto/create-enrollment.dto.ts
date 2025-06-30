import { IsNotEmpty, IsUUID } from '@nestjs/class-validator';

export class CreateEnrollmentDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  courseId: string;
}
