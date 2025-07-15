import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  IsNumber,
} from '@nestjs/class-validator';

export class CreateReviewDto {
  @IsNumber()
  courseId: number;

  @IsString()
  fullName: string;

  @IsOptional()
  @IsString()
  occupation?: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsString()
  review?: string;
}
