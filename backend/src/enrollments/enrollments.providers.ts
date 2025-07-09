import { Course } from 'src/database/entities/course.entity';
import { Enrollment } from 'src/database/entities/enrollment.entity';
import { User } from 'src/database/entities/user.entity';
import { DataSource } from 'typeorm';

export const enrollmentsProviders = [
  {
    provide: 'ENROLLMENT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Enrollment),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'COURSE_REPOSITORY',
    useFactory: (dataSource) => dataSource.getRepository(Course),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
