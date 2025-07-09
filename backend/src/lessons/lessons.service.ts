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
      return this.LessonRepo.save(lesson);
    }
  
    async findById(id: number): Promise<Lesson | null> {
      return this.LessonRepo.findOne({
        where: { id },
      });
    }
  
    findAll(): Promise<Lesson[]> {
      return this.LessonRepo.find();
    }
  
    // findOne(id: number) {
    //   return `This action returns a #${id} lesson`;
    // }
  
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
      const result = await this.LessonRepo.delete({ id });
      if (!result.affected) {
        throw new NotFoundException(`Lesson with id ${id} not found`);
      }
      return { message: 'Lesson deleted successfully.' };
    }
}
