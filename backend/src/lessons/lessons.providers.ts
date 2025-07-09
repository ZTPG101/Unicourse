import { Course } from 'src/database/entities/course.entity';
import { Lesson } from 'src/database/entities/lesson.entity';
import { DataSource } from 'typeorm';

export const lessonsProviders = [
  {
    provide: 'LESSON_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Lesson),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'COURSE_REPOSITORY',
    useFactory: (dataSource) => dataSource.getRepository(Course),
    inject: ['DATA_SOURCE'],
  },
];
