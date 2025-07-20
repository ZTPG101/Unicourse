import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createInstructorDto: CreateInstructorDto): Promise<Instructor> {
    const { userId, ...rest } = createInstructorDto;
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const instructor = this.instructorRepo.create({ ...rest, user });
    return this.instructorRepo.save(instructor);
  }

  async findById(id: number): Promise<Instructor | null> {
    return this.instructorRepo.findOne({ where: { id }, relations: ['user'] });
  }

  findAll(): Promise<Instructor[]> {
    return this.instructorRepo.find({ relations: ['user'] });
  }

  async update(id: number, updateInstructorDto: UpdateInstructorDto): Promise<Instructor | null> {
    const instructor = await this.instructorRepo.preload({ id, ...updateInstructorDto });
    if (!instructor) throw new NotFoundException(`Instructor with id ${id} not found`);
    return this.instructorRepo.save(instructor);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.instructorRepo.delete({ id });
    if (!result.affected) {
      throw new NotFoundException(`Instructor with id ${id} not found`);
    }
    return { message: 'Instructor deleted successfully.' };
  }
}
