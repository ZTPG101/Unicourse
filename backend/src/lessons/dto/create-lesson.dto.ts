import { IsInt, IsNotEmpty, IsString, IsUrl, IsUUID, Min } from '@nestjs/class-validator';

export class CreateLessonDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  content: string;

  @IsString()
  @IsUrl()
  videoUrl: string;

  @IsUUID()
  courseId: string;

  @IsInt()
  @Min(0)
  order: number;
}