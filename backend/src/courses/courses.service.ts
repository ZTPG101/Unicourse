import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Repository } from 'typeorm';
import { Course } from 'src/database/entities/course.entity';
import { User } from 'src/database/entities/user.entity';
import { Category } from 'src/database/entities/category.entity';
import { BadRequestException } from '@nestjs/common';
import { UserRole } from 'src/auth/types/roles.enum';
import { Instructor } from 'src/database/entities/instructor.entity';

@Injectable()
export class CoursesService {
  constructor(
    @Inject('COURSE_REPOSITORY') private CourseRepo: Repository<Course>,
    @Inject('INSTRUCTOR_REPOSITORY')
    private InstructorRepo: Repository<Instructor>,
    @Inject('CATEGORY_REPOSITORY') private CategoryRepo: Repository<Category>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course | null> {
    const instructor = await this.InstructorRepo.findOne({
      where: { id: createCourseDto.instructorId },
    });

    if (!instructor) {
      throw new NotFoundException(
        `Instructor with id ${createCourseDto.instructorId} not found`,
      );
    }

    const category = await this.CategoryRepo.findOne({
      where: { id: createCourseDto.categoryId },
    });
    if (!category) {
      throw new NotFoundException(
        `Category with id ${createCourseDto.categoryId} not found`,
      );
    }

    const coursePayload = this.CourseRepo.create({
      ...createCourseDto,
      instructor: instructor,
      category: category,
    });

    const course = await this.CourseRepo.save(coursePayload);
    return this.findById(course.id);
  }

  async findById(id: number): Promise<Course | null> {
    return this.CourseRepo.findOne({
      where: { id },
      relations: [
        'instructor',
        'instructor.user',
        'lessons',
        'reviews',
        'category'
      ],
    });
  }

  findAll(limit?: number, offset?: number): Promise<Course[]> {
    return this.CourseRepo.find({
      relations: ['instructor', 'instructor.user', 'category'],
      take: limit,
      skip: offset,
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

  async getCoursesMetadata(filters: {
    search?: string;
    priceMin?: number;
    priceMax?: number;
  }) {
    const query = this.CourseRepo.createQueryBuilder('course').leftJoin(
      'course.category',
      'category',
    );

    // Apply filters if provided
    if (filters.search) {
      query.andWhere(
        'course.title LIKE :search OR course.description LIKE :search',
        { search: `%${filters.search}%` },
      );
    }
    if (filters.priceMin !== undefined) {
      query.andWhere('course.price >= :min', { min: filters.priceMin });
    }
    if (filters.priceMax !== undefined) {
      query.andWhere('course.price <= :max', { max: filters.priceMax });
    }

    // Get total count
    const totalCourses = await query.getCount();

    // Get counts per category
    const categoryCounts = await this.CourseRepo.createQueryBuilder('course')
      .leftJoin('course.category', 'category')
      .select('category.id', 'id')
      .addSelect('category.name', 'name')
      .addSelect('COUNT(course.id)', 'count')
      .groupBy('category.id')
      .addGroupBy('category.name')
      .getRawMany();

    // Get counts per skill level
    const skillLevelCounts = await this.CourseRepo.createQueryBuilder('course')
      .select('course.level', 'level')
      .addSelect('COUNT(course.id)', 'count')
      .groupBy('course.level')
      .getRawMany();

    return {
      totalCourses,
      categories: categoryCounts,
      skillLevels: skillLevelCounts,
    };
  }
}
