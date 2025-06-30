import { IsEmail, IsNotEmpty, IsString, MinLength } from '@nestjs/class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsNotEmpty()
  name: string;
}
