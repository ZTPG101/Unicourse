import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../types/roles.enum';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);

// Semantic decorators matching your entity roles
export const AdminOnly = () => Roles(UserRole.ADMIN);
export const InstructorOnly = () => Roles(UserRole.INSTRUCTOR);
export const AdminOrInstructor = () => Roles(UserRole.ADMIN, UserRole.INSTRUCTOR);
export const StudentOnly = () => Roles(UserRole.STUDENT);