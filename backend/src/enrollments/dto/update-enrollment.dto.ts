import { IsInt, Min, Max, IsOptional } from 'class-validator';

export class UpdateEnrollmentDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  progress?: number;
}
