import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@Inject('USER_REPOSITORY') private UserRepo: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User | null> {
    const userPayload = this.UserRepo.create(createUserDto);
    const user = await this.UserRepo.save(userPayload);
    return this.findById(user.id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.UserRepo.createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
  }

  findAll(): Promise<User[]> {
    return this.UserRepo.find();
  }

  async findOne(id: number): Promise<User | null> {
    return this.UserRepo.findOne({
      where: { id },
      select: ['name', 'avatar'],
    });
  }

  async findById(id: number): Promise<User | null> {
    return this.UserRepo.findOne({
      where: { id },
      // select: ['id', 'email', 'name', 'avatar', 'role'],
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
