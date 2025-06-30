import { IsInt, IsNotEmpty, IsString, IsUUID } from '@nestjs/class-validator';

export class CreateReviewDto {
  @IsInt()
  rating: number;

  @IsString()
  comment: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  courseId: string;
}
