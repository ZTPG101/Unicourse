import { IsInt, IsNumber, IsOptional, IsString } from '@nestjs/class-validator';

export class CreateInstructorDto {
  @IsInt()
  userId: number;

  @IsString()
  occupation: string;

  @IsString()
  bio: string;

  @IsString()
  education: string;

  @IsNumber()
  experience: number;

  @IsOptional()
  @IsNumber()
  studentsTrained?: number;

  @IsOptional()
  @IsNumber()
  coursesCount?: number;

  @IsOptional()
  @IsString()
  linkedin?: string;

  @IsOptional()
  @IsString()
  pinterest?: string;

  @IsOptional()
  @IsString()
  facebook?: string;

  @IsOptional()
  @IsString()
  instagram?: string;
}
