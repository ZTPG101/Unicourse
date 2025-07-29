import { Inject, Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from 'src/database/entities/lesson.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Course } from 'src/database/entities/course.entity';

@Injectable()
export class LessonsService {
  constructor(
    @Inject('LESSON_REPOSITORY') private LessonRepo: Repository<Lesson>,
    @Inject('COURSE_REPOSITORY') private CourseRepo: Repository<Course>,
  ) {}

  async create(createLessonDto: CreateLessonDto): Promise<Lesson | null> {
    const { courseId, ...lessonData } = createLessonDto;
    const course = await this.CourseRepo.findOne({ where: { id: courseId } });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    const lesson = this.LessonRepo.create({
      ...lessonData,
      course,
    });

    await this.CourseRepo.increment({ id: courseId }, 'lessonCount', 1);
    return this.LessonRepo.save(lesson);
  }

  async findById(id: number): Promise<any> {
    const lesson = await this.LessonRepo.findOne({
      where: { id },
      relations: ['course'],
    });
    if (!lesson) return null;
    return {
      ...lesson,
      courseId: lesson.course?.id,
    };
  }

  findAll(): Promise<Lesson[]> {
    return this.LessonRepo.find();
  }

  async update(
    id: number,
    updateLessonDto: UpdateLessonDto,
  ): Promise<Lesson | null> {
    const lesson = await this.LessonRepo.preload({
      id,
      ...updateLessonDto,
    });
    if (!lesson) return null;
    return this.LessonRepo.save(lesson);
  }

  async remove(id: number): Promise<{ message: string }> {
    const lesson = await this.LessonRepo.findOne({
      where: { id },
      relations: ['course'],
    });
    if (!lesson) {
      throw new NotFoundException(`Lesson with id ${id} not found`);
    }
    const courseId = lesson.course.id;
    const result = await this.LessonRepo.delete({ id });
    if (!result.affected) {
      throw new NotFoundException(`Lesson with id ${id} not found`);
    }

    await this.CourseRepo.decrement({ id: courseId }, 'lessonCount', 1);
    return { message: 'Lesson deleted successfully.' };
  }
}
