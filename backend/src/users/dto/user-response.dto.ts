import { User } from 'src/database/entities/user.entity';

export class UserResponseDto {
  id: number;
  email: string;
  name: string;
  avatar: string;
  role: string;
  provider: string | null;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.avatar = user.avatar;
    this.role = user.role;
    // this.provider = user.provider || null;
  }
}
