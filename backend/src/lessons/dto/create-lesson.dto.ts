import { IsInt, IsNotEmpty, IsString, IsUrl, Min } from '@nestjs/class-validator';

export class CreateLessonDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  content: string;

  @IsString()
  @IsUrl()
  videoUrl: string;

  @IsInt()
  courseId: number;

  @IsInt()
  @Min(0)
  order: number;
}