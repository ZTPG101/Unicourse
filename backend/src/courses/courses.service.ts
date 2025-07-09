import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Repository } from 'typeorm';
import { Course } from 'src/database/entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @Inject('COURSE_REPOSITORY') private CourseRepo: Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course | null> {
    const coursePayload = this.CourseRepo.create(createCourseDto);
    const course = await this.CourseRepo.save(coursePayload);
    return this.findById(course.id);
  }

  async findById(id: number): Promise<Course | null> {
    return this.CourseRepo.findOne({
      where: { id },
    });
  }

  findAll(): Promise<Course[]> {
    return this.CourseRepo.find();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} course`;
  // }

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
