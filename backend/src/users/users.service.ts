import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@Inject('USER_REPOSITORY') private UserRepo: Repository<User>) {}

  // async updateHashedRefreshToken(userId: number, hashedRefreshToken: string) {
  //   return await this.UserRepo.update({ id: userId }, { hashedRefreshToken });
  // }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.UserRepo.create(createUserDto);
    return await this.UserRepo.save(user);
  }

  async findByEmail(email: string) {
    return await this.UserRepo.findOne({
      where: {
        email,
      },
    });
  }

  findAll(): Promise<User[]> {
    return this.UserRepo.find();
  }

  async findOne(id: number): Promise<User | null> {
    return this.UserRepo.findOne({
      where: { id },
      select: ['name', 'avatar',],
    });
  }

  async findById(id: number): Promise<User | null> {
    return this.UserRepo.findOne({
      where: { id },
      select: ['id', 'email', 'name', 'avatar', 'role'],
    });
  }

  async findPublicProfile(id: number): Promise<User | null> {
    return this.UserRepo.findOne({
      where: { id },
      select: ['name', 'avatar'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    const user = await this.UserRepo.preload({
      id,
      ...updateUserDto,
    });
    if (!user) return null;
    return this.UserRepo.save(user);
  }

  remove(id: number) {
    return this.UserRepo.delete({ id });
  }
}
