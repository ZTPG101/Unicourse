import { IsNumber, Max, Min } from '@nestjs/class-validator';
import { IsInt } from 'class-validator';

export class UpdateProgressDto {
  @IsInt()
  @Min(0)
  @Max(100)
  progress: number;
}
