import { IsNotEmpty } from '@nestjs/class-validator';
import { IsInt, IsNumber, Max, Min } from 'class-validator';

export class CreateEnrollmentDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  courseId: number;
}
