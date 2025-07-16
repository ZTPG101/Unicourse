import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "@nestjs/class-validator";
import { IsInt } from "class-validator";

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsInt()
  categoryId: number;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  level?: string;

  @IsNumber()
  @IsOptional()
  durationMinutes?: number;

  @IsNumber()
  @IsOptional()
  reviewCount?: number;

  @IsNumber()
  @IsOptional()
  lessonCount?: number;

  @IsNumber()
  @IsNotEmpty()
  instructorId: number;
}
