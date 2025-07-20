import { PartialType } from '@nestjs/mapped-types';
import { CreateInstructorDto } from './create-instructor.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateInstructorDto extends PartialType(CreateInstructorDto) {
  @IsOptional()
  @IsString()
  occupation: string;

  @IsOptional()
  @IsString()
  bio: string;

  @IsOptional()
  @IsString()
  education: string;

  @IsOptional()
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
