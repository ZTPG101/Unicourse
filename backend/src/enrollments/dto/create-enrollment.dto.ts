import { IsNotEmpty } from '@nestjs/class-validator';
import { IsInt } from 'class-validator';

export class CreateEnrollmentDto {
  @IsInt()
  @IsNotEmpty()
  courseId: number;
}
