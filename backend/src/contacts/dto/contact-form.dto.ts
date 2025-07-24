import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ContactFormDataDto {
  @IsString({ message: 'Name must be a string.' })
  @IsNotEmpty({ message: 'Name should not be empty.' })
  @MaxLength(100, { message: 'Name must be shorter than or equal to 100 characters.' })
  name: string;

  @IsEmail({}, { message: 'Please provide a valid email address.' })
  @IsNotEmpty({ message: 'Email should not be empty.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Subject should not be empty.' })
  @MaxLength(200, { message: 'Subject must be shorter than or equal to 200 characters.' })
  subject: string;

  @IsString()
  @IsNotEmpty({ message: 'Message should not be empty.' })
  @MaxLength(5000, { message: 'Message must be shorter than or equal to 5000 characters.' })
  message: string;
}