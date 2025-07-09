import { Inject, Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from 'src/database/entities/lesson.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class LessonsService {
  constructor(
      @Inject('LESSON_REPOSITORY') private LessonRepo: Repository<Lesson>,
    ) {}
  
    async create(createLessonDto: CreateLessonDto): Promise<Lesson | null> {
      const lessonPayload = this.LessonRepo.create(createLessonDto);
      const lesson = await this.LessonRepo.save(lessonPayload);
      return this.findById(lesson.id);
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
