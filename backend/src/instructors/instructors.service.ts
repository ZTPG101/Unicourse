import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Instructor } from 'src/database/entities/instructor.entity';
import { User } from 'src/database/entities/user.entity';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';

@Injectable()
export class InstructorsService {
  constructor(
    @Inject('INSTRUCTOR_REPOSITORY')
    private instructorRepo: Repository<Instructor>,
    @Inject('USER_REPOSITORY')
    private userRepo: Repository<User>,
  ) {}

  async isUserOwnerOfProfile(
    profileId: number,
    userId: number,
  ): Promise<boolean> {
    const count = await this.instructorRepo.count({
      where: { id: profileId, user: { id: userId } },
    });
    return count > 0;
  }

  async create(
    createDto: CreateInstructorDto,
    user: User,
  ): Promise<Instructor> {
    const targetUserId =
      user.role === 'admin' && createDto.userId ? createDto.userId : user.id;

    const existingProfile = await this.instructorRepo.findOne({
      where: { user: { id: targetUserId } },
    });
    if (existingProfile) {
      throw new ConflictException(
        `An instructor profile already exists for this user.`,
      );
    }

    const targetUser = await this.userRepo.findOne({
      where: { id: targetUserId },
    });
    if (!targetUser) {
      throw new NotFoundException(`User with ID ${targetUserId} not found.`);
    }

    const newProfile = this.instructorRepo.create({
      ...createDto,
      user: targetUser,
    });

    return this.instructorRepo.save(newProfile);
  }

  async update(
    id: number,
    updateDto: UpdateInstructorDto,
  ): Promise<Instructor> {
    const profile = await this.instructorRepo.preload({ id, ...updateDto });
    if (!profile) {
      throw new NotFoundException(
        `Instructor profile with ID ${id} not found.`,
      );
    }
    return this.instructorRepo.save(profile);
  }

  async findById(id: number): Promise<Instructor | null> {
    return await this.instructorRepo.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async findAll(): Promise<Instructor[]> {
    return await this.instructorRepo.find({ relations: ['user'] });
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.instructorRepo.delete({ id });
    if (!result.affected) {
      throw new NotFoundException(`Instructor with id ${id} not found`);
    }
    return { message: 'Instructor deleted successfully.' };
  }
}
