import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Max, Min } from '@nestjs/class-validator';

export class CreateReviewDto {

  @IsUUID()
  courseId: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsString()
  comment?: string;
}
