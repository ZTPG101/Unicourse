import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateNested } from "@nestjs/class-validator";
import { Type } from "class-transformer";
import { IsInt } from "class-validator";
import { RequirementDto } from "./requirement.dto";

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

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  learningObjectives?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RequirementDto)
  requirements?: RequirementDto[];
}
