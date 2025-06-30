import { IsIn } from '@nestjs/class-validator';

export class ChangeUserRoleDto {
  @IsIn(['admin', 'instructor', 'student'])
  role: 'admin' | 'instructor' | 'student';
}
