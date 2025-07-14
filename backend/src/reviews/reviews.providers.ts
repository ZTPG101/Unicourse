import { Review } from 'src/database/entities/review.entity';
import { DataSource } from 'typeorm';
import { Course } from 'src/database/entities/course.entity';

export const reviewsProviders = [
  {
    provide: 'REVIEW_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Review),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'COURSE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Course),
    inject: ['DATA_SOURCE'],
  },
];
