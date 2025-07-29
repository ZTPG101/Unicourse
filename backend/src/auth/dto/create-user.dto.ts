import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from '@nestjs/class-validator';
import { IsOptional, IsUrl } from 'class-validator';
import { UserRoleType } from '../types/roles.enum';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;
  @IsEmail()
  email: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  avatar?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  role?: UserRoleType;
}
