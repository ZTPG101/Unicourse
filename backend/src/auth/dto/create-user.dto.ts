import { IsEmail, IsNotEmpty, IsString, MinLength } from '@nestjs/class-validator';
import { IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @MinLength(6)
  password: string;
}
