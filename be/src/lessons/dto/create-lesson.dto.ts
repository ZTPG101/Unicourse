import { IsInt, IsNotEmpty, IsString, Min } from '@nestjs/class-validator';

export class CreateLessonDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  content: string;

  @IsString()
  videoUrl: string;

  @IsInt()
  @Min(0)
  order: number;
}
// TODO: lesson and review dtos