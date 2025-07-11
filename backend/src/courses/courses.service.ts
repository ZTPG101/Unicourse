import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Repository } from 'typeorm';
import { Course } from 'src/database/entities/course.entity';
import { User } from 'src/database/entities/user.entity';
import { BadRequestException } from '@nestjs/common';
import { UserRole } from 'src/auth/types/roles.enum';

@Injectable()
export class CoursesService {
  constructor(
    @Inject('COURSE_REPOSITORY') private CourseRepo: Repository<Course>,
    @Inject('USER_REPOSITORY') private UserRepo: Repository<User>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course | null> {
    const instructor = await this.UserRepo.findOne({
      where: { id: createCourseDto.instructorId }
    });

    if (!instructor) {
      throw new NotFoundException(`Instructor with id ${createCourseDto.instructorId} not found`);
    }

    if (instructor.role !== UserRole.INSTRUCTOR) {
      throw new BadRequestException(`User with id ${createCourseDto.instructorId} is not an instructor`);
    }

    const coursePayload = this.CourseRepo.create({
      ...createCourseDto,
      instructor: instructor
    });
    
    const course = await this.CourseRepo.save(coursePayload);
    return this.findById(course.id);
  }

  async findById(id: number): Promise<Course | null> {
    return this.CourseRepo.findOne({
      where: { id },
      relations: ['instructor', 'lessons', 'reviews'],
    });
  }

  findAll(): Promise<Course[]> {
    return this.CourseRepo.find({
      relations: ['instructor'],
    });
  }

  async update(
    id: number,
    updateCourseDto: UpdateCourseDto,
  ): Promise<Course | null> {
    const course = await this.CourseRepo.preload({
      id,
      ...updateCourseDto,
    });
    if (!course) return null;
    return this.CourseRepo.save(course);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.CourseRepo.delete({ id });
    if (!result.affected) {
      throw new NotFoundException(`Course with id ${id} not found`);
    }
    return { message: 'Course deleted successfully.' };
  }
}
