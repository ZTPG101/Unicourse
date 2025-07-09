import { IsInt, IsNotEmpty, IsString, IsUrl, IsUUID, Min } from '@nestjs/class-validator';
import { IsNumber } from 'class-validator';

export class CreateLessonDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  content: string;

  @IsString()
  @IsUrl()
  videoUrl: string;

  @IsNumber()
  courseId: number;

  @IsInt()
  @Min(0)
  order: number;
}