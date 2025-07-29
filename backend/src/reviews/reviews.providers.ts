import { Review } from 'src/database/entities/review.entity';
import { DataSource } from 'typeorm';
import { Course } from 'src/database/entities/course.entity';
import { Enrollment } from 'src/database/entities/enrollment.entity';

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
  {
    provide: 'ENROLLMENT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Enrollment),
    inject: ['DATA_SOURCE'],
  },
];
