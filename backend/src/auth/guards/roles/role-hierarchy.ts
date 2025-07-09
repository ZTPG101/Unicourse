import { UserRole } from '../../types/roles.enum';

export class RoleHierarchy {
  private static hierarchy = {
    [UserRole.ADMIN]: [UserRole.ADMIN, UserRole.INSTRUCTOR, UserRole.STUDENT],
    [UserRole.INSTRUCTOR]: [UserRole.INSTRUCTOR, UserRole.STUDENT],
    [UserRole.STUDENT]: [UserRole.STUDENT],
  };

  static hasPermission(userRole: string, requiredRole: string): boolean {
    const userPermissions = this.hierarchy[userRole] || [];
    return userPermissions.includes(requiredRole);
  }

  static getUserPermissions(userRole: string): string[] {
    return this.hierarchy[userRole] || [];
  }

  static isAdmin(userRole: string): boolean {
    return userRole === UserRole.ADMIN;
  }

  static isInstructor(userRole: string): boolean {
    return userRole === UserRole.INSTRUCTOR || userRole === UserRole.ADMIN;
  }
}
