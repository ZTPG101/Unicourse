import { Lesson } from 'src/database/entities/lesson.entity';
import { DataSource } from 'typeorm';

export const lessonsProviders = [
  {
    provide: 'LESSON_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Lesson),
    inject: ['DATA_SOURCE'],
  },
];
