import { IsInt, IsOptional, IsString, Max, Min, IsNumber } from '@nestjs/class-validator';

export class CreateReviewDto {
  @IsNumber()
  courseId: number;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsString()
  comment?: string;
}
