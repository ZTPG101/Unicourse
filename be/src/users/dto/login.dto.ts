import { IsEmail, IsString, MinLength } from '@nestjs/class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
