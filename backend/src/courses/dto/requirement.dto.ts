import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class RequirementDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsOptional()
  @IsString()
  icon?: string;
}
